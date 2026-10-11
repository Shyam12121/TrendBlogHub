const BlogCard = ({ title, image, category, author, date }) => {
  return (
    <div className="card h-100 shadow-sm">

      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body">

        <span className="badge bg-primary mb-2">
          {category}
        </span>

        <h5>{title}</h5>

        <small className="text-muted">
          {author} | {date}
        </small>

      </div>
    </div>
  );
};

export default BlogCard;