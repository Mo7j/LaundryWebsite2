import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function StaffLogin({ onLogin, error }) {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();
    onLogin({ username, password });
  };

  return (
    <section className="card staff-login section-glow">
      <h1>{t.staffLoginTitle}</h1>
      <form onSubmit={submit}>
        <label>
          {t.username}
          <input value={username} onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label>
          {t.password}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="btn btn-primary full-width" type="submit">
          {t.login}
        </button>
      </form>
      {error && <p className="error-text">{t.invalidLogin}</p>}
    </section>
  );
}