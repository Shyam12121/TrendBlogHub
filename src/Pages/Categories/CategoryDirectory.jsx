import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";

import categories from "../../data/categories";

import "./category.css";

const CategoryDirectory = () => {
  const categoryList = Object.values(categories);

  return (
    <main className="category-directory-page">

      {/* ==========================================
          SEO
      ========================================== */}

      <Helmet>
        <title>All Categories – Explore Topics | TrendBlogHub</title>
        <meta
          name="description"
          content="Browse all TrendBlogHub categories: Technology, Health, Business, Finance, Education, Travel, Lifestyle, Entertainment and more."
        />
        <link
          rel="canonical"
          href="https://trendbloghub.com/categories/"
        />
      </Helmet>

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="category-directory-hero">
        <div className="category-container">

          <h1>Explore All Categories</h1>

          <p>
            Browse articles and publications across all our categories.
            From technology and health to business, finance, education,
            travel, lifestyle, and more — find what you're looking for.
          </p>

          <div className="category-breadcrumb">
            <Link to="/">Home</Link>
            <FaChevronRight />
            <span>Categories</span>
          </div>

        </div>
      </section>

      {/* ==========================================
          CATEGORY GRID
      ========================================== */}

      <section className="category-directory-content">
        <div className="category-container">

          <div className="category-directory-grid">

            {categoryList.map((cat) => {

              const Icon = cat.icon;

              return (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="category-directory-card"
                >
                  <div className="category-directory-icon">
                    <Icon />
                  </div>

                  <h3>{cat.name}</h3>

                  <p>{cat.description}</p>

                  <span className="category-directory-link">
                    Explore
                    <FaArrowRight />
                  </span>
                </Link>
              );
            })}

          </div>

        </div>
      </section>

    </main>
  );
};

export default CategoryDirectory;