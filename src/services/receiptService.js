import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";

const receiptsCollection = collection(db, "receipts");

export function subscribeToReceipts(callback) {
  const q = query(receiptsCollection, orderBy("createdAtMs", "desc"));
  return onSnapshot(q, (snapshot) => {
    const rows = snapshot.docs.map((entry) => entry.data());
    callback(rows);
  });
}

export async function createReceipt({ id, name, status }) {
  const receiptRef = doc(db, "receipts", id);
  await setDoc(receiptRef, {
    id,
    name,
    status,
    createdAtMs: Date.now(),
    serverCreatedAt: serverTimestamp()
  });
}

export async function updateReceiptStatus(id, status) {
  const receiptRef = doc(db, "receipts", id);
  await updateDoc(receiptRef, { status });
}

export async function deleteReceipt(id) {
  const receiptRef = doc(db, "receipts", id);
  await deleteDoc(receiptRef);
}