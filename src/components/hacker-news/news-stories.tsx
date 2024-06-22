import { SetStateAction, useEffect, useId, useState } from "react";
import axios from "axios";

import NewsDataComponent from "./news-data";
import { HACKER_NEWS_API_NEW_STORIES } from "../../utils/api";

const NewsComponent = () => {
  const [newsList, setNewList] = useState<SetStateAction<any | []>>([]); //list of all the IDs of news
  const ID = useId();

  useEffect(() => {
    const getList = async () => {
      try {
        const { data }: { data: number[] } = await axios.get<any>(
          HACKER_NEWS_API_NEW_STORIES
        );
        setNewList((prev: any[]) => [...prev, ...data]);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, []);

  return <NewsDataComponent key={ID} newsList={newsList} />;
};

export default NewsComponent;
