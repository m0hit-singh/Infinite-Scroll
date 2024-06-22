import ReactDOM from "react-dom/client";

import Header from "./components/header";
import NewsComponent from "./components/hacker-news/news-stories";
import './globals.css';

const NewsContainer = document.getElementById("news_id")!;
const root = ReactDOM.createRoot(NewsContainer);

root.render(
  <>
    <Header />
    <NewsComponent />
  </>
);
