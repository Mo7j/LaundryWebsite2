import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const READY_STATUSES = new Set(["ready", "delivered"]);
const LEGACY_STATUS_MAP = {
  not_ready: "working_on_it",
  ready: "ready"
};

function normalizeReceiptId(value) {
  return String(value || "")
    .trim()
    .toUpperCase();
}

function normalizeStatus(status) {
  if (READY_STATUSES.has(status) || status === "working_on_it" || status === "we_got_it") return status;
  return LEGACY_STATUS_MAP[status] ?? "working_on_it";
}

export default function StatusCard({ receipts }) {
  const { t } = useLanguage();
  const [queryId, setQueryId] = useState("");
  const [result, setResult] = useState("");

  const receiptMap = useMemo(() => {
    const map = new Map();
    receipts.forEach((entry) => map.set(normalizeReceiptId(entry.id), entry));
    return map;
  }, [receipts]);

  const handleCheck = (event) => {
    event.preventDefault();
    const receipt = receiptMap.get(normalizeReceiptId(queryId));
    if (!receipt) {
      setResult(t.resultNotFound);
      return;
    }
    const status = normalizeStatus(receipt.status);
    setResult(READY_STATUSES.has(status) ? t.resultReady : t.resultNotReady);
  };

  return (
    <section id="status" className="card status-card section-glow">
      <h2>{t.checkStatusTitle}</h2>
      <form onSubmit={handleCheck}>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          value={queryId}
          onChange={(event) => setQueryId(event.target.value.replace(/[^0-9]/g, ""))}
          placeholder={t.checkStatusHint}
          required
        />
        <button type="submit" className="btn btn-primary full-width">
          {t.checkButton}
        </button>
      </form>
      {result && <p className="status-result">{result}</p>}
    </section>
  );
}
