import { TNewsInfo } from "./news.type"

const NewsCard = ({news, index}: {news: TNewsInfo, index: number}) => {
    return(
        <div key={news.id} className="main_newsList">
            <div className="main_news_count">{index + 1}</div>
            <div className="main_news_info">
              <div className="main_news_title">{news.title}</div>
              <div className="main_news_subtitle">
                {news.recent} ago by {news.by}
              </div>
            </div>
          </div>
    )
}

export default NewsCard;
