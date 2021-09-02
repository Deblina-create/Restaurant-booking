import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AdminPage } from "../AdminPage";
import { useState } from "react";

const server = setupServer(
  rest.post("/admin_search", (req, res, ctx) => {
    return res(
      ctx.json({
        data:
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
      })
    )
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Loads and displays data", async () => {});

test("handlers server error", async () => {
  server.use(
    rest.post("/admin_search", (req, res, cts) => {
      return res(ctx.status(500));
    })
  );

  const {getByTestId} = render(<AdminPage
  />)
  const resolvedDiv = await waitFor(() =>
    getByTestId("resolved"));
    expect(resolvedDiv).toHaveTextContent("Deblina");
});

// it("fetches and displays data", async () => {

//   let dateNow = new Date().toDateString();
//   axiosMock.post.mockResolvedValueOnce({
//     data: [
//       {
//         id: "adfkjadgkhakdfjal",
//         BookingTime: dateNow,
//         NoOfPeople: 10,
//         Email: "testing@gmail.com",
//         Preferences: "",
//         Name: "testing",
//         Phone: "00000000",
//         BookedTableCount: 2,
//       },
//     ]
//   });
//   const url = "/bookinglist";
//   const {getByTestId} = render(<AdminPage url={url}/>);
//   const resolvedDiv = await waitForElement(() =>
//   getByTestId("resolved"));

//   expect(resolvedDiv).toHaveTextContent("testing");
//   expect(axiosMock.post).toHaveBeenCalledTimes(1);
//   expoect(axiosMock.post).toHaveBeenCalledWith(url);

// const { queryByTestId, getByText } = render(<AdminPage />);
// expect(getByText("Admin")).toBeInTheDocument;
// expect(getByText(dateNow)).toBeInTheDocument;
// expect(queryByTestId("add-btn")).toBeTruthy;
// });

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
