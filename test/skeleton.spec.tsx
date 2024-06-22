import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkeletonComponent from "../src/components/skeleton";
import React from "react";

describe("SkeletonComponent component", () => {
  it("check SkeletonComponent component rendered", () => {
    const { container } = render(<SkeletonComponent showItem={10} />);
    expect(container.firstChild).toHaveClass('skeleton_newsList');
  });
});