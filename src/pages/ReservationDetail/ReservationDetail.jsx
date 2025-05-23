import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiUrl, getApiOptions } from "../../api/api";
import Layout from "../../components/Layout/Layout";
import "./ReservationDetail.css";

export default function ReservationDetail() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(getApiUrl(`/reservations/${id}`), getApiOptions());
        const reservationRaw = await res.json();
        const reservation = Array.isArray(reservationRaw) ? reservationRaw[0] : reservationRaw;

        const activityRes = await fetch(getApiUrl(`/activities/${reservation.activity_id}`), getApiOptions());
        const activityData = await activityRes.json();
        const activityObj = Array.isArray(activityData) ? activityData[0] : activityData;

        setReservation(reservation);
        setActivity(activityObj);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  if (loading) {
    return <Layout><p>Cargando...</p></Layout>;
  }

  if (error || !reservation) {
    return <Layout><p>Error al cargar la reserva.</p></Layout>;
  }

  return (
    <Layout>
      <div className="reservation-detail">
        <h2>Detalle de la reserva #{reservation.reservation_id}</h2>
        <p><strong>Fecha:</strong> {new Date(reservation.selected_date).toLocaleDateString()}</p>
        <p><strong>Personas:</strong> {reservation.number_of_people}</p>
        <p><strong>Comentarios:</strong> {reservation.reservation_comments}</p>

        {activity && (
          <>
            <h3>Actividad: {activity.name}</h3>
            {Array.isArray(activity.images) && activity.images[0] && (
              <img src={activity.images[0]} alt={activity.name} />
            )}
            <p><strong>Descripción:</strong> {activity.short_description}</p>
            <p><strong>Precio:</strong> {activity.price} €</p>
          </>
        )}
      </div>
    </Layout>
  );
}
