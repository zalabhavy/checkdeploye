import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

  const navigate = useNavigate();
  const [input,setInput] = useState({
    title:"",
  })

  const handleCategory = async (e) =>
  {
    e.preventDefault();
    try {
       const res = await axios.post("https://checkdeploye.onrender.com/api/v1/add/catagory",input,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
       );
       alert(res.data.message);
       navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="container py-4">
    <h2 className="text-center mb-4 fw-bold">Add a New Category</h2>
    <div className="row justify-content-center">
      <div className="col-12 col-sm-8 col-md-6 col-lg-5">
        <form onSubmit={handleCategory}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label fw-semibold">
              Category Name
            </label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              className="form-control"
              id="categoryName"
              placeholder="Enter category name"
              required
              style={{ height: '45px' }}
            />
            <small className="form-text text-muted mt-1">
              Please enter a unique category name.
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ height: '42px' }}
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default AddCategory;
