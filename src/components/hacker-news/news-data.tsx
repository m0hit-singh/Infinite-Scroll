import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { getTimeInfo, getChunksNewsList } from "../../utils/utitlities";
import { HACKER_NEWS_INFO } from "../../utils/api";
import { TNewsInfo } from "./news.type";
import NewsCard from "./news-card";
import SkeletonComponent from "../skeleton";

const NewsDataComponent = ({ newsList }: { newsList: number[] }) => {
  const [showItem, setShowItem] = useState<number>(0); // keep tract of how many stories visible on UI
  const [newsInfo, setNewsInfo] = useState<TNewsInfo[] | []>([]); // info of each stories
  let renderedArray: TNewsInfo[] = [];

  /**
   * making parallel GET API calls to get 10 news info
   * @param data 10 news stories
   */
  async function getNewsInChunks(data: number[]) {
    let promises: any = [];
    data.map((key) => {
      const NEWS_URL: string = HACKER_NEWS_INFO.replace("KEY", `${key}`);
      promises.push(
        axios.get(NEWS_URL).then((result) => {
          result.data.recent = getTimeInfo(result.data.time * 1000);
          renderedArray.push(result.data);
        })
      );
    });
    await Promise.all(promises);
  }

  /**
   * making async call to fetch all information
   * @param newsList list of new stories
   */
  async function getAllNewsPromises(newsList: number[]) {
    const fetchedNewsList = getChunksNewsList(newsList, showItem);
    await getNewsInChunks(fetchedNewsList);
  }

  //fetch new scrolled Information to display 
  async function toUpdateNewsList() {
    getAllNewsPromises(newsList)
      .then(() => {
        setNewsInfo((prev) => {
          let sortedNews: TNewsInfo[] = [...prev, ...renderedArray].sort(
            function (a: TNewsInfo, b: TNewsInfo) {
              return b.time - a.time;
            }
          );
          return [...sortedNews];
        });
      })
      .catch((err) => console.log(err));
  }

  /**
   * execute whenever news stories list changed
   */
  useEffect(() => {
    toUpdateNewsList();
  }, [newsList]);

  /**
   * execute whenever user scroll to bottom of page and showItem state updated
   */
  useEffect(() => {
    toUpdateNewsList();
  }, [showItem]);

  //handle Infinite scroll on the page, update showItem and fetch respective news stories
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.body.offsetHeight - 300
      )
      setShowItem((prev) => prev + 20);
    };
    window.addEventListener("scroll", handleScroll);
    //when component unmounted it removes listner
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {newsInfo &&
        newsInfo.map((news: TNewsInfo, index: number) => (
          <NewsCard key={`${news.id}${index}`} news={news} index={index} />
        ))}
      <SkeletonComponent showItem={newsInfo.length} />
    </>
  );
};

export default NewsDataComponent;
