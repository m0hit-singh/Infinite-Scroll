import { useEffect, useState } from "react";
import { createNewArray } from "../utils/utitlities";

const SkeletonComponent = ({ showItem }: { showItem: number }) => {
  const [skeletonRows, setSekeletonRows] = useState<number[]>([]);

  useEffect(() => {
    const updatedItems = createNewArray(showItem ? 2 : 20);
    setSekeletonRows(() => [...updatedItems]);
  }, [showItem]);

  return (
    <>
      {skeletonRows.map((_, row: number) => (
        <div key={`${row}${showItem}1`} className="skeleton_newsList">
          <div className="skeleton_news_count">{row + showItem + 1}</div>
          <div className="skeleton_news_info">
            <div className="skeleton_news_title"></div>
            <div className="skeleton_news_subtitle"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonComponent;
