import { useParams } from "react-router-dom";
import { getApiUrl, getApiOptions } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import Layout from "../../components/Layout/Layout";
import "./ActivityDetail.css";

export default function ActivityDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(getApiUrl(`/activities/${id}`), getApiOptions());

  const activity = Array.isArray(data) ? data[0] : data;

  if (loading) return <p className="loading">Cargando actividad...</p>;
  if (error) return <p className="error">Error al cargar: {error.message}</p>;
  if (!activity) return <p>No se encontró la actividad.</p>;

  return (
    <Layout>
      <div className="activity-detail">
        <h2>{activity.name}</h2>
        <p className="price">Precio: €{activity.price}</p>
        <p className="long-description">{activity.long_description}</p>

        <div className="detail-info">
          <p><strong>Duración:</strong> {activity.duration} min</p>
          <p><strong>Instructor:</strong> {activity.instructor}</p>
          <p><strong>Categoría:</strong> {activity.category}</p>
          <p><strong>Idioma:</strong> {activity.language}</p>
          <p><strong>Incluye material:</strong> {activity.includes_material ? "Sí" : "No"}</p>
        </div>

        <div className="images">
          {activity.images?.map((url, index) => (
            <img key={index} src={url} alt={`actividad-${index}`} />
          ))}
        </div>

        <div className="dates">
          <h4>Fechas disponibles:</h4>
          <div className="date-badges">
            {activity.available_dates?.map((date) => (
              <span key={date} className="badge">
                {new Date(date).toLocaleDateString()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
