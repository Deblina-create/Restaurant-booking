import React from "react";
import {render, fireEvent} from "@testing-library/react";
import { AdminPage } from "../AdminPage";
import MyBookingSearch from "../MyBookingSearch";

it("renders correctly", () => {
  const {queryByTestId} = render(<AdminPage/>)

  expect(queryByTestId("add-btn")).toBeTruthy;
})
