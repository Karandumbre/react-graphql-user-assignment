import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MockedProvider } from "@apollo/client/testing";
import UserList from "../components/user-list";
import { mocks } from "./mocks";

const mockStore = configureMockStore([thunk]);

const initialState = {
  user: {
    search: "",
    users: [],
    loading: false,
    error: null,
    sortBy: "name",
    sortOrder: "asc",
  },
};

const renderComponent = (state = initialState) => {
  const store = mockStore(state);
  return render(
    <Provider store={store}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserList />
      </MockedProvider>
    </Provider>
  );
};

describe("UserList Component", () => {
  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  });

  it("fetches and displays user data", async () => {
    renderComponent();

    expect(await screen.findByText("Chelsey Dietrich")).toBeInTheDocument();
    expect(await screen.findByText("Clementina DuBuque")).toBeInTheDocument();
  });

  it("filters user data based on search input", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: "Clementina" },
    });

    expect(await screen.findByText("Clementina DuBuque")).toBeInTheDocument();
    expect(screen.queryByText("Chelsey Dietrich")).not.toBeInTheDocument();
  });

  it("sorts user data by name", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Name"));

    const rows = await screen.findAllByRole("row");
    expect(rows[1]).toHaveTextContent("Clementina DuBuque");
    expect(rows[2]).toHaveTextContent("Chelsey Dietrich");
  });

  it("sorts user data by username", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Username"));

    const rows = await screen.findAllByRole("row");
    expect(rows[1]).toHaveTextContent("Chelsey Dietrich");
    expect(rows[2]).toHaveTextContent("Clementina DuBuque");
  });
});
