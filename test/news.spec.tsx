import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import NewsComponent from "../src/components/hacker-news/news-stories";
import NewsDataComponent from "../src/components/hacker-news/news-data"; // Adjust the path as necessary
import { HACKER_NEWS_API_NEW_STORIES } from "../src/utils/api";

jest.mock("axios");
jest.mock("../src/components/hacker-news/news-data", () => jest.fn(() => <div data-testid="news-data-component">Mock News Data</div>));

describe("NewsComponent", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockClear();
  });

  it("should render NewsComponent and fetch data on mount", async () => {
    const mockData = [1, 2, 3, 4, 5]; // Mock response data

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<NewsComponent />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(HACKER_NEWS_API_NEW_STORIES);
    });

    expect(NewsDataComponent).toHaveBeenCalledWith({ newsList: mockData }, {});
  });

  it("should handle API errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockError = new Error("API Error");

    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

    render(<NewsComponent />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(HACKER_NEWS_API_NEW_STORIES);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });
    consoleSpy.mockRestore();
  });
});

