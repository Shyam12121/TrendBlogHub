import BlogCard from "../blog/BlogCard";

const blogs = [
  {
    id: 1,
    title: "Learn React in 2026",
    image: "https://picsum.photos/400/250?1",
    category: "Technology",
    author: "Admin",
    date: "06 Aug 2026",
  },
  {
    id: 2,
    title: "Top Travel Destinations",
    image: "https://picsum.photos/400/250?2",
    category: "Travel",
    author: "John",
    date: "05 Aug 2026",
  },
  {
    id: 3,
    title: "Healthy Lifestyle Tips",
    image: "https://picsum.photos/400/250?3",
    category: "Health",
    author: "David",
    date: "04 Aug 2026",
  },
];

const FeaturedBlogs = () => {
  return (
    <section className="container py-5">

      <h2 className="mb-4 fw-bold">
        Featured Blogs
      </h2>

      <div className="row">

        {blogs.map((blog) => (
          <div className="col-lg-4 mb-4" key={blog.id}>
            <BlogCard {...blog} />
          </div>
        ))}

      </div>

    </section>
  );
};

export default FeaturedBlogs;