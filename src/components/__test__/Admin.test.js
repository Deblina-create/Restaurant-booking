import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AdminPage } from "../AdminPage";
import { useState } from "react";
import axios from "axios";
jest.mock('axios');

import MockAdapter from 'axios-mock-adapter'
import restaurantApi from "../../api/restaurantApi";

const fakeBookings = [
  {
    id: "adfkjadgkhakdfjal",
    BookingTime: new Date().toDateString(),
    NoOfPeople: 10,
    Email: "testing@gmail.com",
    Preferences: "",
    Name: "testing",
    Phone: "00000000",
    BookedTableCount: 2,
  },
  {
    id: "adfkjkflsvlkjdflk",
    BookingTime: new Date().toDateString(),
    NoOfPeople: 4,
    Email: "testing2@gmail.com",
    Preferences: "",
    Name: "testing2",
    Phone: "00000000",
    BookedTableCount: 1,
  },
];

describe("Admin component", () => {
  const mock = new MockAdapter(restaurantApi);
  test("it displays a row for each booking", async () => {
    const resp = { data: fakeBookings };

    mock.onPost("/admin_search").reply(200, resp);
    // mock.post.mockResolvedValue(resp);
    render(<AdminPage />);
    
    expect(screen.getByText("Admin")).toBeInTheDocument();
    
    const bookingList = await waitFor(() => screen.findAllByTestId("booking"));
    expect(bookingList).toHaveLength(2);
  });
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
