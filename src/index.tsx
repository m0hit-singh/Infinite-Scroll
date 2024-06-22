import ReactDOM from "react-dom/client";

import Header from "./components/header";
import NewsComponent from "./components/hacker-news/news-stories";
import "./globals.css";

const NewsContainer = document.getElementById("news_id")!;
const root = ReactDOM.createRoot(NewsContainer);

import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // Ensure the service worker file is correctly imported

root.render(
  <>
    <Header />
    <NewsComponent />
  </>
);

serviceWorkerRegistration.register();
