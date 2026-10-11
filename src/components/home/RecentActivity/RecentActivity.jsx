import "./RecentActivity.css";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";

const RecentActivity = ({ activities }) => {
  return (
    <section className="recent-activity">
      <div className="container">

        {/* New Header (Matching Featured Articles) */}
        <div className="section-header">
          <div className="header-left">
            <span className="section-badge">🔥 Live Feed</span>
            <h2>Recent Publishing Activity</h2>
            <p>Discover recently published articles from verified creators across the platform.</p>
          </div>
          <button className="view-all-btn">
            View All <FaArrowRight />
          </button>
        </div>

        <div className="recent-grid">
          {activities.map((item) => (
            <div className="recent-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="recent-content">
                <span className="recent-category">
                  🏷 {item.category}
                </span>
                <h3>{item.title}</h3>
                <div className="recent-meta">
                  <span>
                    <FaClock />
                    {item.time}
                  </span>
                  <span>
                    <FaUser />
                    {item.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecentActivity;