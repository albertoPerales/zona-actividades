import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getApiUrl, getApiOptions } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import "./LoginPage.css";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: users, loading, error: fetchError } = useFetch(
    getApiUrl("/users"),
    getApiOptions()
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!users) return;

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // console.log(foundUser)
      login(email);
      localStorage.setItem("user", JSON.stringify({
        id: foundUser.user_id,
        name: foundUser.name,
        email: foundUser.email,
      }));
      setError("");
      navigate("/activities");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />

      <button type="submit" disabled={loading}>Entrar</button>

      {error && <p className="error">{error}</p>}
      {fetchError && <p className="error">Error cargando usuarios: {fetchError.message}</p>}
    </form>
  );
}
