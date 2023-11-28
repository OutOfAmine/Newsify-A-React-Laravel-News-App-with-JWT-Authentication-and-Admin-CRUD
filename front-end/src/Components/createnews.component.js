import React, { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Createnews(props) {
  const navigate = useNavigate();

  let data = '';

  if (!props.data) {
    navigate('/login')
  }else{
    data = props.data; // Get all of categories
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date_debut, setdate_debut] = useState("");
  const [date_expiration, setdate_expiration] = useState("");

  const createNews = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("date_debut", date_debut);
    formData.append("date_expiration", date_expiration);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/news", formData);
      console.log(response.data.message);
      toast.success('News created successfully');
      navigate("/news");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors);
        toast.error('Validation error. Please check your input.');
      } else {
        console.log(error.response.data.message);
        toast.error('Error creating news');
      }
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12">
          <div className="card-body">
            <h3 className="card-title">Create New</h3>
            <hr />
            <div className="form-wrapper">
              <form onSubmit={createNews}>
                <div class="mb-3">
                  <label for="inputTitle" class="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    for="inputTitle"
                    class="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="Textarea" class="form-label">
                    Content
                  </label>
                  <textarea
                    class="form-control"
                    id="Textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="Select" class="form-label">
                    Select The category:
                  </label>
                  <select
                    class="form-select"
                    id="Select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {
                  data && data.length > 0?
                    data.map((category) => {
                      return (
                        <optgroup label={category.name} key={category.id}>
                          {category.children.map((child) => (
                            <option value={child.id} key={child.id}>
                              {
                              child.name
                              }
                            </option>
                          ))}
                        </optgroup>
                      );
                    }): navigate('/login') }
                  </select>
                </div>
                <div class="mb-3">
                  <label for="dateDebut" class="form-label">
                    Date début
                  </label>
                  <input
                    type="date"
                    for="dateDebut"
                    class="form-control"
                    value={date_debut}
                    onChange={(e) => setdate_debut(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="dateExpiration" class="form-label">
                    Date d'expiration
                  </label>
                  <input
                    type="date"
                    for="dateExpiration"
                    class="form-control"
                    value={date_expiration}
                    onChange={(e) => setdate_expiration(e.target.value)}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
