import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

describe("<Cell /> rendering", function () {
  let container;

  beforeEach(function () {
    let tr = document.createElement("tr");
    container = document.body.appendChild(tr);
  });

  it("renders the cell", function () {
    render(<Cell />, { container });
  });

  it("shows correctly when lit", function () {
    const { asFragment } = render(<Cell isLit />, { container });
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows correctly when not lit", function () {
    const { asFragment } = render(<Cell />, { container });
    expect(asFragment()).toMatchSnapshot();
  });
});
