import React from "react";
import {render, fireEvent} from "@testing-library/react";
import { AdminPage } from "../AdminPage";

it("renders correctly", () => {
  const {queryByTestId, queryByPlaceholderName} = render(<AdminPage/>)

  expect(queryByTestId("add-btn")).toBeTruthy;
})