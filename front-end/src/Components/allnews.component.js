import axios from "../Api/axios.js";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Allnews(props) {
  const data = props.data;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, [loading]);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/news");
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      // Handle the error (unauthorized)
      setLoading(false);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const DeleteNew = async (id) => {
    await axios
      .delete("http://127.0.0.1:8000/api/news/" + id)
      .then(({ data }) => {
        console.log(data.message);
        fetchNews();
        toast.error("News deleted successfully");
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };

  return (
    <div className="container">
      <nav id="navbar" class="navbar">
        <ul>
          <li>
            <Link class="nav-link scrollto active" to={"/"}>
              Home
            </Link>
          </li>
          {data && data.length > 0
            ? data.map((category) => (
                <li className="dropdown" key={category.id}>
                  <a href="#">
                    <span><Link to={`/category/${category.name}`}>{category.name}</Link></span>{" "}
                    <i class="bi bi-chevron-down"></i>
                  </a>
                  <ul>
                    {category.children.map((child) => (
                      <li key={child.id}>
                        <Link to={`/category/${child.name}`}>{child.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            : navigate("/login")}
          <li>
            <Link class="nav-link scrollto getstarted" to={"/news/create"}>
              Create
            </Link>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {news && news.length > 0
            ? news.map((card) => (
                <div key={card.id} className="col-12 col-md-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        {card.title.length > 30
                          ? card.title.slice(0, 30) + "..."
                          : card.title}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        {card.categorie.name}
                      </h6>
                      <p className="card-text">
                        {card.content.length > 100
                          ? card.content.slice(0, 100) + "..."
                          : card.content}
                      </p>
                      <button
                        onClick={() => DeleteNew(card.id)}
                        className="btn btn-danger"
                        style={{ marginRight: "10px" }}
                      >
                        Delete
                      </button>
                      <Link
                        className="btn btn-warning"
                        to={"/news/edit/" + card.id}
                      >
                        edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : navigate("/login")}
        </div>
      )}
    </div>
  );
}
