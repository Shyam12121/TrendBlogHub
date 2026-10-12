import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaHeartbeat,
  FaLaptopCode,
  FaChartLine,
  FaRobot,
  FaPlane,
  FaGraduationCap,
  FaDollarSign,
  FaIndustry,
  FaSearch,
  FaBriefcase,
  FaCoins,
  FaBullhorn,
  FaCode,
  FaBookOpen,
  FaHome,
} from "react-icons/fa";

import "./PopularTopics.css";

const topics = [
  {
    title: "Personal Wellbeing",
    articles: 113,
    icon: <FaHeartbeat />,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
  },
  {
    title: "Growth Hacking",
    articles: 27,
    icon: <FaChartLine />,
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600",
  },
  {
    title: "Science & Emerging Technology",
    articles: 105,
    icon: <FaRobot />,
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600",
  },
  {
    title: "Online Monetization",
    articles: 53,
    icon: <FaCoins />,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
  },
  {
    title: "Industry Trends",
    articles: 92,
    icon: <FaIndustry />,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600",
  },
  {
    title: "Off-Page SEO",
    articles: 26,
    icon: <FaSearch />,
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600",
  },
  {
    title: "Business Strategy",
    articles: 68,
    icon: <FaBriefcase />,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600",
  },
  {
    title: "Stock Market",
    articles: 26,
    icon: <FaChartLine />,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
  },
  {
    title: "Digital Marketing",
    articles: 84,
    icon: <FaBullhorn />,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
  },
  {
    title: "Programming & Development",
    articles: 74,
    icon: <FaCode />,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
  },
  {
    title: "Education & Career",
    articles: 61,
    icon: <FaGraduationCap />,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
  },
  {
    title: "Travel & Lifestyle",
    articles: 48,
    icon: <FaPlane />,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600",
  },
];

const PopularTopics = () => {
  return (
    <main className="topics-page">

      {/* HERO */}
      <section className="directory-hero">
        <div className="hero-content">

          <h1>Popular Topics</h1>

          <p>
            Explore trending topics across the TrendBlogHub publishing
            network, organized by verified hubs and recent publications.
          </p>

          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <FaChevronRight />
            <span>Popular Topics</span>
          </div>

        </div>
      </section>

      {/* TOPICS */}
      <section className="topics-section">
        <div className="topics-container">

          <div className="topics-grid">

            {topics.map((topic, index) => (
              <Link
                to={`/category/${topic.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
                className="topic-card"
                key={index}
              >

                <div className="topic-image">
                  <img src={topic.image} alt={topic.title} />

                  <div className="topic-icon">
                    {topic.icon}
                  </div>
                </div>

                <div className="topic-content">

                  <h3>{topic.title}</h3>

                  <p>
                    Articles:
                    <strong>{topic.articles}</strong>
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
};

export default PopularTopics;