import { getApiUrl, getApiOptions } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import Layout from "../../components/Layout/Layout";
import "./ActivitiesPage.css";

export default function ActivitiesPage() {
  const { data: activities, loading, error } = useFetch(getApiUrl("/activities"), getApiOptions());

  return (
    <Layout>
      <div className="activities-page">
        <h2>Actividades</h2>
        {loading ? (
          <p>Cargando actividades...</p>
        ) : error ? (
          <p>Error al cargar actividades: {error.message}</p>
        ) : (
          <div className="activities-grid">
            {activities.map((act) => (
              <ActivityCard key={act.activity_id} activity={act} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}