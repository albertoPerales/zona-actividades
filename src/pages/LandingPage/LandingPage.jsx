import { useFetch } from "../../hooks/useFetch";
import { getApiUrl, getApiOptions } from "../../api/api";
import Layout from "../../components/Layout/Layout";
import "./LandingPage.css";

export default function LandingPage() {
  const { data, loading, error } = useFetch(getApiUrl("/store"), getApiOptions());

  if (loading) {
    return (
      <Layout>
        <div className="landing">
          <p>Cargando información de la tienda...</p>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="landing">
          <p>Error al cargar la información: {error?.message}</p>
        </div>
      </Layout>
    );
  }

  const { name, address, contact, hours, additional_info } = data;

  return (
    <Layout>

      <div className="carousel">
        <div className="carousel-content">
          <h1>Bienvenido a {name}</h1>
          <p>{additional_info?.description}</p>
        </div>
      </div>

      <div className="landing">
        <div className="store-section">
          <h3>Dirección</h3>
          <p>
            {address?.street}, {address?.number}<br />
            {address?.postal_code} {address?.city}, {address?.country}
          </p>

          <h3>Contacto</h3>
          <p>
            Teléfono: {contact?.phone}<br />
            Email: <a href={`mailto:${contact?.email}`}>{contact?.email}</a><br />
            Web: <a href={contact?.website} target="_blank" rel="noopener noreferrer">{contact?.website}</a>
          </p>

          <h3>Horario</h3>
          <ul className="store-hours">
            {Object.entries(hours || {}).map(([day, time]) => (
              <li key={day}><strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {time}</li>
            ))}
          </ul>

          <h3>Formas de pago</h3>
          <ul>
            {additional_info?.payment_methods?.map((method, i) => (
              <li key={i}>{method}</li>
            ))}
          </ul>

          <h3>Política de cancelación</h3>
          <p>{additional_info?.cancellation_policy}</p>
        </div>
      </div>
    </Layout>
  );
}
