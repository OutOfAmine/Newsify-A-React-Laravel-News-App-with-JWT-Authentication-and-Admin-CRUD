// CategoryNews.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Api/axios.js";

export default function CategoryNews() {
  const { categoryName } = useParams();
  const [categoryNews, setCategoryNews] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    fetchCategoryNews();
  }, [categoryName]);

  const fetchCategoryNews = async () => {
    try {
      const response = await axios.get(`/api/news`);
      const filteredItems = response.data.filter((item) =>
        item.categorie.name.toLowerCase().includes(categoryName.toLowerCase())
      );
      setCategoryNews(filteredItems);
    } catch (error) {
      // Handle errors, e.g., category not found
    }
  };

  return (
    <div className="container">
      <h1>News in Category: {categoryName}</h1>
      <div className="row">
          {categoryNews && categoryNews.length > 0
            ? categoryNews.map((card) => (
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
                    </div>
                  </div>
                </div>
              ))
            : console.log('Haaaaaaahiya news '+categoryNews)
            }
        </div>
      </div>
  );
}
