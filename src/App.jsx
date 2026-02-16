import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StaffPage from "./pages/StaffPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;