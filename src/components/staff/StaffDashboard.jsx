import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { createReceipt, deleteReceipt, updateReceiptStatus } from "../../services/receiptService";

const STATUS_FLOW = ["we_got_it", "working_on_it", "ready", "delivered"];

const LEGACY_STATUS_MAP = {
  not_ready: "working_on_it",
  ready: "ready"
};

const STATUS_LABELS = {
  en: {
    all: "All",
    we_got_it: "We got it",
    working_on_it: "Working on it",
    ready: "Ready",
    delivered: "Delivered",
    guest: "Guest",
    created: "Receipt created"
  },
  ar: {
    all: "الكل",
    we_got_it: "استلمنا الطلب",
    working_on_it: "قيد التجهيز",
    ready: "جاهز",
    delivered: "تم التسليم",
    guest: "ضيف",
    created: "تم إنشاء الإيصال"
  }
};

function normalizeStatus(status) {
  if (STATUS_FLOW.includes(status)) return status;
  return LEGACY_STATUS_MAP[status] ?? "working_on_it";
}

export default function StaffDashboard({ receipts }) {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderSuccess, setOrderSuccess] = useState("");
  const labels = STATUS_LABELS[language] ?? STATUS_LABELS.en;

  const generateReceiptId = () => {
    const used = new Set(
      receipts
        .map((receipt) => Number.parseInt(String(receipt.id), 10))
        .filter((value) => Number.isInteger(value) && value > 0)
    );
    let nextId = 1;
    while (used.has(nextId)) nextId += 1;
    return String(nextId);
  };

  const statusCounts = useMemo(() => {
    return STATUS_FLOW.reduce((acc, key) => {
      acc[key] = receipts.filter((receipt) => normalizeStatus(receipt.status) === key).length;
      return acc;
    }, {});
  }, [receipts]);

  const filteredReceipts = useMemo(() => {
    return [...receipts]
      .sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0))
      .filter((receipt) => statusFilter === "all" || normalizeStatus(receipt.status) === statusFilter);
  }, [receipts, statusFilter]);

  const addReceipt = async (event) => {
    event.preventDefault();
    const receiptId = generateReceiptId();
    await createReceipt({
      id: receiptId,
      name: name.trim() || labels.guest,
      status: "we_got_it"
    });
    setName("");
    setOrderSuccess(`${labels.created}: #${receiptId}`);
  };

  const formatDate = (createdAtMs) => {
    const value = Number(createdAtMs);
    if (!Number.isFinite(value)) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString(language === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <section className="staff-wrap">
      <div className="card section-glow">
        <h1>{t.staffDashboard}</h1>

        <form className="create-receipt" onSubmit={addReceipt}>
          <h2>{t.createReceipt}</h2>
          <label>
            {t.customerName}
            <input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <button className="btn btn-primary" type="submit">
            {t.addReceipt}
          </button>
          {orderSuccess && <p className="status-result">{orderSuccess}</p>}
        </form>
      </div>

      <div className="card section-glow">
        <h2>{t.activeOrders}</h2>
        <div className="status-filter-row">
          <button
            className={`btn btn-outline status-chip ${statusFilter === "all" ? "is-active" : ""}`}
            type="button"
            onClick={() => setStatusFilter("all")}
          >
            {labels.all} ({receipts.length})
          </button>
          {STATUS_FLOW.map((status) => (
            <button
              key={`filter-${status}`}
              className={`btn btn-outline status-chip ${statusFilter === status ? "is-active" : ""}`}
              type="button"
              onClick={() => setStatusFilter(status)}
            >
              {labels[status]} ({statusCounts[status] || 0})
            </button>
          ))}
        </div>
        {filteredReceipts.length === 0 ? (
          <p>{t.noOrders}</p>
        ) : (
          <div className="order-list">
            {filteredReceipts.map((receipt) => (
              <article key={receipt.id} className="order-item">
                <div>
                  <strong>#{receipt.id}</strong>
                  <p>{receipt.name}</p>
                  <small>
                    {t.createdAt}: {formatDate(receipt.createdAtMs)}
                  </small>
                </div>

                <div className="order-actions">
                  <span className={`status-pill status-${normalizeStatus(receipt.status)}`}>
                    {labels[normalizeStatus(receipt.status)]}
                  </span>
                  <div className="status-actions">
                    {STATUS_FLOW.map((status) => (
                      <button
                        key={`${receipt.id}-${status}`}
                        className="btn btn-outline status-chip"
                        type="button"
                        onClick={() => updateReceiptStatus(receipt.id, status)}
                      >
                        {labels[status]}
                      </button>
                    ))}
                  </div>

                  <button className="btn btn-danger" onClick={() => deleteReceipt(receipt.id)} type="button">
                    {t.delete}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
