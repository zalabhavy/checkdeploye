import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get(
          "https://checkdeploye.onrender.com/api/v1/get/allblogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <>
      <main className="my-5">
        <div className="container">
          <section className="text-center">
            <h2 className="mb-5">
              <strong>Latest Posts</strong>
            </h2>
            <div className="d-flex flex-wrap justify-content-center">
              {blogs && blogs.length >0
                ? blogs.map((item) => (
                    <div key={item.id} className="card m-3 blog-card">
                      <img
                        src={`https://checkdeploye.onrender.com/upload/${item.thumbnail}`}
                        className="card-img-top"
                        alt={item.title}
                      />
                      <div className="card-body d-flex flex-column">
                        <div className="badge-container mb-2">
                          <span
                            className={`category-badge ${item.category.title.toLowerCase()}`}
                          >
                            {item.category.title}
                          </span>
                          <span className="author-badge ms-2">
                            Author: {item.user.username}
                          </span>
                        </div>

                        <h5 className="card-title">{item.title}</h5>
                        
                        <p className="card-text">
                          {item.description
                            ? item.description.slice(0, 70) + "..."
                            : "No description available."}
                        </p>
                        <Link
                          to={`/blog/${item._id}`}
                          className="btn btn-primary mt-auto"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  ))
                : // Bootstrap shimmer UI (placeholder cards)
                  Array.from({ length: 8 }).map((_, i) => (
                    <div
                      className="card m-3"
                      style={{ width: "18rem" }}
                      key={i}
                    >
                      <div className="placeholder-glow">
                        <div
                          className="card-img-top placeholder"
                          style={{ height: "190px" }}
                        ></div>
                        <div className="card-body">
                          <span className="placeholder col-6 mb-2"></span>
                          <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-8"></span>
                          </h5>
                          <p className="placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-5"></span>
                          </p>
                          <a className="btn btn-primary mt-auto disabled placeholder col-6"></a>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
