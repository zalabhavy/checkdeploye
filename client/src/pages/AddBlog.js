import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [file,setFile] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("https://checkdeploye.onrender.com/api/v1/get/catagories", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories");
      } 
    };
    fetchAllCategories();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  //creating a form data

  const formdata = new FormData();
  formdata.append("title",input.title);
  formdata.append("category",input.category);
  formdata.append("description",input.description);
  formdata.append("thumbnail",file);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://checkdeploye.onrender.com/api/v1/add/blog",
        formdata,
        {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container py-4">
  <h2 className="text-center mb-4 fw-bold">Add a New Blog</h2>
  <div className="row justify-content-center">
    <div className="col-12 col-sm-8 col-md-6 col-lg-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
            className="form-control"
            id="title"
            placeholder="Blog Title"
            required
            style={{ height: '45px' }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label fw-semibold">
            Category
          </label>
          <select
            className="form-select"
            name="category"
            onChange={handleChange}
            id="category"
            required
            defaultValue=""
            style={{ height: '45px' }}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
            placeholder="Blog Description"
            className="form-control"
            id="description"
            rows={4}
            required
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label fw-semibold">
            Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
            id="thumbnail"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ height: '42px' }}
        >
          Add Blog
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default AddBlog;
