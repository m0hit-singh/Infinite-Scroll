export const PAGE_TITLE = "Hacker News";

export const getTimeInfo = (date: number) => {
  var seconds = Math.floor((new Date().getTime() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const getChunksNewsList = (newsList: number[], index: number) => {
  return newsList.slice(index, index + 20);
};

export const createNewArray = (size: number) => {
    return new Array(size);
}
