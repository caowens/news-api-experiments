import logo from "./logo.svg";
import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [joke, setjoke] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsImg, setNewsImg] = useState("");
  const [newsLink, setNewsLink] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  // require('dotenv').config();

  const getJoke = () => {
    Axios.get("https://official-joke-api.appspot.com/random_joke").then(
      (response) => {
        setjoke(response.data.setup + " ... " + response.data.punchline);
      }
    );
  };

  var options = {
    method: "GET",
    url: "https://api.newscatcherapi.com/v2/search",
    params: { q: "Bitcoin", lang: "en", sort_by: "relevancy", page: "1" },
    headers: {
      "x-api-key": `${process.env.REACT_APP_NEWS_KEY}`,
    },
  };

  // const newsList = document.querySelector(".news-list");

  const getNews = () => {
    Axios.request(options)
      .then(function (response) {
        setNewsTitle(response.data.articles[0].title);
        setNewsImg(response.data.articles[0].media);
        setNewsLink(response.data.articles[0].link);
        setNewsSummary(response.data.articles[0].summary);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // CySiabd8i3yy7JxxF3r_MVp1CZMJ-uWdbm4F2uyvfDE
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getJoke}>Get Joke Right Now</button>
        {joke}
        <button onClick={getNews}>Get News</button>
        {news.title} */}
        <button onClick={getNews}>Get News</button>
        <h1><a href={newsLink}>{newsTitle}</a></h1>
        <img src={newsImg}></img>
        <p>{newsSummary}</p>

        {/* <ul className="news-list"></ul> */}
      </header>
    </div>
  );
}

export default App;
