import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

import "./Publishers.css";

const publishers = [
  {
    name: "Team IndiBlogHub",
    articles: 1098,
    image: "https://placehold.co/300x300/06364a/ffffff?text=iB.",
  },
  {
    name: "Rahul Gupta",
    articles: 668,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "The Castle Bunnies",
    articles: 180,
    image: "https://placehold.co/300x300/f7f7f7/333333?text=CB",
  },
  {
    name: "BookUr Taxi",
    articles: 140,
    image: "https://placehold.co/300x300/2864dc/ffffff?text=BookUrTaxi",
  },
  {
    name: "darshit",
    articles: 138,
    image: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    name: "Olivia",
    articles: 113,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Sagar Mishra",
    articles: 108,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Pintu Kumar",
    articles: 98,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Tech Explorer",
    articles: 94,
    image: "https://placehold.co/300x300/173f67/ffffff?text=TE",
  },
  {
    name: "Digital Growth",
    articles: 86,
    image: "https://placehold.co/300x300/1769aa/ffffff?text=DG",
  },
  {
    name: "Travel Stories",
    articles: 79,
    image: "https://placehold.co/300x300/e5a72b/ffffff?text=TS",
  },
  {
    name: "Finance Daily",
    articles: 72,
    image: "https://placehold.co/300x300/16794b/ffffff?text=FD",
  },
];

const Publishers = () => {
  return (
    <main className="publishers-page">

      {/* HERO */}
      <section className="directory-hero">
        <div className="hero-content">

          <h1>Browse Publishers</h1>

          <p>
            Discover 314 verified publishers on IndiBlogHub across
            technology, health, travel, finance, business and more.
          </p>

          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <FaChevronRight />
            <span>Publishers</span>
          </div>

        </div>
      </section>

      {/* PUBLISHERS */}
      <section className="publishers-section">

        <div className="publishers-container">

          <div className="publishers-grid">

            {publishers.map((publisher, index) => (
              <Link
                to={`/publisher/${publisher.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
                className="publisher-card"
                key={index}
              >

                <div className="publisher-image">
                  <img
                    src={publisher.image}
                    alt={publisher.name}
                  />
                </div>

                <div className="publisher-info">

                  <h3>{publisher.name}</h3>

                  <p>
                    <strong>{publisher.articles}</strong>
                    <span> Articles Published</span>
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

export default Publishers;