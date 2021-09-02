import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AdminPage } from "../AdminPage";
import { useState } from "react";
import axios from "axios";
import { async } from "q";
jest.mock("axios");


it("renders a booking list", () => {
  axios.post.mockImplementation(() => {
    let dateNow = new Date().toDateString();
    return Promise.resolve({
      data: [{
        id: adfkjadgkhakdfjal,
        BookingTime: dateNow,
        NoOfPeople: 10,
        Email: "testing@gmail.com",
        Preferences: "",
        Name: "testing",
        Phone: "00000000",
        BookedTableCount: 2,
      }]
    });
  });
  const { queryByTestId, getByText } = render(<AdminPage/>);
  expect(getByText("testing")).toBeInTheDocument();
});

it("renders correctly", () => {
  const { queryByTestId, getByText } = render(<AdminPage/>);
  let dateNow = new Date().toDateString();
  expect(getByText("Admin")).toBeInTheDocument;
  expect(getByText(dateNow)).toBeInTheDocument;
  expect(queryByTestId("add-btn")).toBeTruthy;
});

it("can change date", () => {
  const { getByText, asFragment } = render(<TestDateChangeComponent />);
  const firstRender = asFragment();

  fireEvent.click(getByText(/Click for the next date/));

  expect(firstRender).toMatchSnapshot(asFragment());
});

it("can show modal when a button is clicked", () => {
  const { getByText } = render(<AdminComponent />);
  fireEvent.click(getByText(/Show Modal/));
  expect(getByText("Modal component")).toBeInTheDocument;
});

const TestDateChangeComponent = () => {
  let dateNow = new Date().toDateString();
  const [date, setDate] = useState(dateNow);
  let currentDate = new Date(date);
  let numberOfMlSeconds = currentDate.getTime();
  let dayToMlSeconds = 24 * 60 * 60 * 1000;
  let nextDate = new Date(numberOfMlSeconds + dayToMlSeconds).toDateString();

  return (
    <button onClick={() => setDate(nextDate)}>
      Click for the next date: {date}
    </button>
  );
};

const AdminComponent = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Show Modal
      </button>
      <ModalComponent show={showModal} />
    </div>
  );
};

const ModalComponent = () => {
  return (
    <div>
      <p> Modal component</p>
    </div>
  );
};
