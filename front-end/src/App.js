import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


import Allnews from "./Components/allnews.component";
import Createnews from "./Components/createnews.component";
import Editnews from "./Components/editnews.component";
import Home from "./Components/Home.component";
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import CategoryNews from "./Components/Categorynews.component";
import { ToastContainer } from "react-toastify";

function App() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categories")
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch();
  };

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/news/create" element={<Createnews data={data} />}></Route>
        <Route path="/news/edit/:id" element={<Editnews data={data} />}></Route>
        <Route path="/category/:categoryName" element={<CategoryNews />} />
        <Route path="/news" element={<Allnews data={data} />}></Route>
        <Route path="/login" element={<Login data={data}/>}></Route>
        <Route path="/register" element={<Register data={data}/>}></Route>
        <Route path="/" element={<Home data={data} />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
