import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getApiUrl, getApiOptions } from "../../api/api";
import { useDebouncedValue } from "../../hooks/useDebounceValue";
import "./SearchPage.css";

export default function SearchPage() {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(getApiUrl("/activities"), getApiOptions());
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error cargando actividades:", error);
    }
  };

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <Layout>
      <div className="search-page">
        <h2>Buscar actividades</h2>
        <input
          type="text"
          placeholder="Busca por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <ul className="results">
          {filteredActivities.length === 0 ? (
            <li>No se encontraron actividades.</li>
          ) : (
            filteredActivities.map((activity) => (
              <li key={activity.activity_id} className="result-card">
                <img src={activity.images?.[0]} alt={activity.name} />
                <div className="info">
                  <Link to={`/activities/${activity.activity_id}`}>
                    <h3>{activity.name}</h3>
                  </Link>
                  <p>{activity.short_description}</p>
                  <span className="price">{activity.price} €</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </Layout>
  );
}
