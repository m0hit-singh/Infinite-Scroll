import React from "react";
import { render, screen } from "@testing-library/react";
import NewsCard from "../src/components/hacker-news/news-card";
import { TNewsInfo } from "../src/components/hacker-news/news.type";

describe("NewsCard", () => {
  const mockNews: TNewsInfo = {
    by: "option",
    descendants: 0,
    id: 40708336,
    score: 3,
    time: 1718645144,
    title: "Interact with Nvidia's 340B Model",
    type: "story",
    url: "https://build.nvidia.com/nvidia/nemotron-4-340b-instruct",
    recent: "1min ago",
  };

  test("renders NewsCard", () => {
    const { container } = render(<NewsCard news={mockNews} index={0} />);
    expect(container).toBeDefined();
  });
});
