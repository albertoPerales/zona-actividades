import { Link } from "react-router-dom";
import "./ActivityCard.css";

export default function ActivityCard({ activity }) {
  return (
    <div className="activity-card">
        <img src={activity.images?.[0]} alt={activity.name} />
        <div className="activity-card-content">
        <Link to={`/activities/${activity.activity_id}`} className="activity-card-link">
          <h3>{activity.name}</h3>
        </Link>
          <p>{activity.short_description}</p>
          <span>{activity.price} €</span>
        </div>
      </div>
  );
}
