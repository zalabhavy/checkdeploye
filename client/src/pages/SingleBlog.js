import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
   

    const fetchSingleBlog = async () => {
     
      try {
        const res = await axios.get(`https://checkdeploye.onrender.com/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      
        setBlog(res.data);
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    };

    fetchSingleBlog();
    // console.log("this",blog);
  }, []);

  return (
    <>
  <div className="container my-4 p-4 bg-white shadow rounded" style={{ maxWidth: "800px" }}>
  <div className="text-center mb-4">
    <h1 className="display-4 fw-bold text-dark">
      {blog.title}
    </h1>
  </div>

  <div className="text-center mb-4">
    <img
      src={`https://checkdeploye.onrender.com/upload/${blog.thumbnail}`}
      className="img-fluid rounded shadow-sm"
      alt={blog?.title}
      style={{
        maxHeight: "350px",
        objectFit: "contain",
        width: "100%",
      }}
    />
  </div>

  <div className="mb-4 px-3">
    <p
      className="lead text-dark fs-5"
      style={{
        lineHeight: 1.8,
        wordBreak: "break-word",     // ensures long words wrap
        whiteSpace: "normal",        // prevents no-wrap issues
        textAlign: "justify",
      }}
    >
      {blog.description}
    </p>
  </div>

  <div className="text-center">
  <button
  onClick={() => navigate("/")}
  className="btn btn-outline-primary px-3 py-1 fs-6 fw-semibold"
>
  ← Back To Posts
</button>

  </div>
</div>

    </>
  );
};

export default SingleBlog;
