import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Editnews(props) {
  const data = props.data; //get all categories
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date_debut, setdate_debut] = useState("");
  const [date_expiration, setdate_expiration] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/news/" + id);
      const { title, content, category, date_debut, date_expiration } = response.data.new;
      setTitle(title);
      setContent(content);
      setCategory(category);
      setdate_debut(date_debut);
      setdate_expiration(date_expiration);
    } catch (error) {
      console.error("Error fetching news:", error);
      return navigate('/news')
    }
  };

  const updatenew = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("date_debut", date_debut);
    formData.append("date_expiration", date_expiration);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/news/" + id, formData);
      console.log(response.data.message);
      toast.warning('News updated successfully');
      navigate("/news");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.error("Error updating news:", error);
        toast.error('Error updating news');
        navigate('/news');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12">
          <div className="card-body">
            <h3 className="card-title">Edit New</h3>
            <hr />
            <div className="form-wrapper">
              <form onSubmit={updatenew}>
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
                    data.length > 0 ?
                    data.map((categorie)=>{
                      return(
                     category == categorie.parent_id ?  <option value={categorie.parent_id} selected>{categorie.name}</option> : <option value={categorie.parent_id}>{categorie.name}</option>
                      )
                    }) : navigate('/login') }
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
                    Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
