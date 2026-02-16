import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { createReceipt, deleteReceipt, updateReceiptStatus } from "../../services/receiptService";

function formatDate(createdAtMs) {
  return new Date(createdAtMs).toLocaleString();
}

export default function StaffDashboard({ receipts, onLogout }) {
  const { t } = useLanguage();
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const addReceipt = async (event) => {
    event.preventDefault();
    await createReceipt({
      id: id.trim(),
      name: name.trim(),
      status: "not_ready"
    });
    setId("");
    setName("");
  };

  const generateReceiptId = () => {
    const seed = Date.now().toString().slice(-6);
    setId(seed);
  };

  return (
    <section className="staff-wrap">
      <div className="card section-glow">
        <div className="dashboard-title-row">
          <h1>{t.staffDashboard}</h1>
          <button className="btn btn-outline" onClick={onLogout} type="button">
            {t.logout}
          </button>
        </div>

        <form className="create-receipt" onSubmit={addReceipt}>
          <h2>{t.createReceipt}</h2>
          <label>
            {t.receiptId}
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              value={id}
              onChange={(event) => setId(event.target.value.replace(/[^0-9]/g, ""))}
              required
            />
          </label>
          <button className="btn btn-outline" onClick={generateReceiptId} type="button">
            {t.generateId}
          </button>
          <label>
            {t.customerName}
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <button className="btn btn-primary" type="submit">
            {t.addReceipt}
          </button>
        </form>
      </div>

      <div className="card section-glow">
        <h2>{t.activeOrders}</h2>
        {receipts.length === 0 ? (
          <p>{t.noOrders}</p>
        ) : (
          <div className="order-list">
            {receipts.map((receipt) => (
              <article key={receipt.id} className="order-item">
                <div>
                  <strong>#{receipt.id}</strong>
                  <p>{receipt.name}</p>
                  <small>
                    {t.createdAt}: {formatDate(receipt.createdAtMs)}
                  </small>
                </div>

                <div className="order-actions">
                  <select
                    value={receipt.status}
                    onChange={(event) => updateReceiptStatus(receipt.id, event.target.value)}
                  >
                    <option value="not_ready">{t.notReady}</option>
                    <option value="ready">{t.ready}</option>
                  </select>

                  <button className="btn btn-outline" onClick={() => deleteReceipt(receipt.id)} type="button">
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
