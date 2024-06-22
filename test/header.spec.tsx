import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/components/header";
import React from "react";

describe("Header component", () => {
  it("check Header component rendered", () => {
    const { container } = render(<Header />);
    expect(container.innerHTML).toBe("<header>Hacker News</header>");
  });
});