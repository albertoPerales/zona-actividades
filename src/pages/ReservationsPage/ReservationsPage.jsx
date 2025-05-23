import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApiUrl, getApiOptions } from "../../api/api";
import Layout from "../../components/Layout/Layout";
import "./ReservationsPage.css";

export default function ReservationsPage() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchReservations = async () => {
      try {
        const res = await fetch(getApiUrl(`/reservations/user/${user.id}`), getApiOptions());
        const reservationsData = await res.json();

        const detailedReservations = await Promise.all(
          reservationsData.map(async (res) => {
            const activityRes = await fetch(getApiUrl(`/activities/${res.activity_id}`), getApiOptions());
            const activityRaw = await activityRes.json();
            const activity = Array.isArray(activityRaw) ? activityRaw[0] : activityRaw;

            return {
              ...res,
              activityName: activity.name,
              activityImage:
                Array.isArray(activity.images) && activity.images.length > 0
                  ? activity.images[0]
                  : "https://via.placeholder.com/600x300?text=Sin+imagen",
            };
          })
        );

        setReservations(detailedReservations);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  if (!user || !user.id) {
    return (
      <Layout>
        <p>No has iniciado sesión correctamente.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="reservations-page">
        <h2>Mis Reservas</h2>

        {loading && <p>Cargando reservas...</p>}
        {error && <p>Error al cargar reservas: {error.message}</p>}

        {reservations.length > 0 ? (
          <ul className="reservations-list">
            {reservations.map((res) => (
              <li key={res.reservation_id} className="reservation-item">
                <div className="reservation-left">
                  <h3>
                    <Link to={`/reservations/${res.reservation_id}`}>
                      {res.activityName}
                    </Link>
                  </h3>
                  {res.activityImage && (
                    <img
                      src={res.activityImage}
                      alt={res.activityName}
                      className="reservation-img"
                    />
                  )}
                </div>
                <div className="reservation-right">
                  <p><strong>Fecha reservada:</strong> {new Date(res.selected_date).toLocaleDateString()}</p>
                  <p><strong>Personas:</strong> {res.number_of_people}</p>
                  <p><strong>Comentarios:</strong> {res.reservation_comments}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : !loading && (
          <p>No tienes reservas registradas.</p>
        )}
      </div>
    </Layout>
  );
}
