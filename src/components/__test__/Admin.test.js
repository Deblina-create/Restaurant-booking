import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { AdminPage } from "../AdminPage";
import { useState } from "react";
import axiosMock from "axios";
afterEach(cleanup);
jest.mock('axios');

it("fetches and displays data", async () => {
 
  let dateNow = new Date().toDateString();
  axiosMock.post.mockResolvedValueOnce({
    data: [
      {
        id: "adfkjadgkhakdfjal",
        BookingTime: dateNow,
        NoOfPeople: 10,
        Email: "testing@gmail.com",
        Preferences: "",
        Name: "testing",
        Phone: "00000000",
        BookedTableCount: 2,
      },
    ]
  });
  const url = "/bookinglist";
  const {getByTestId} = render(<AdminPage url={url}/>);
  const resolvedDiv = await waitForElement(() => 
  getByTestId("resolved"));

  expect(resolvedDiv).toHaveTextContent("testing");
  expect(axiosMock.post).toHaveBeenCalledTimes(1);
  expoect(axiosMock.post).toHaveBeenCalledWith(url);

  // const { queryByTestId, getByText } = render(<AdminPage />);
  // expect(getByText("Admin")).toBeInTheDocument;
  // expect(getByText(dateNow)).toBeInTheDocument;
  // expect(queryByTestId("add-btn")).toBeTruthy;
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

// const bookings = [{
//         id: "adfkjadgkhakdfjal",
//         BookingTime: dateNow,
//         NoOfPeople: 10,
//         Email: "testing@gmail.com",
//         Preferences: "",
//         Name: "testing",
//         Phone: "00000000",
//         BookedTableCount: 2,
//         },{
//         id: "adfkjkflsvlkjdflk",
//         BookingTime: dateNow,
//         NoOfPeople: 4,
//         Email: "testing2@gmail.com",
//         Preferences: "",
//         Name: "testing2",
//         Phone: "00000000",
//         BookedTableCount: 1
//         }
//       ];
