import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/Home";

jest.mock("axios");

describe("Home component", () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    useSelector.mockImplementation((callback) => {
      return callback({
        // mocked state
        alerts: {
          loading: false,
        },
      });
    });
    useDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and render a list of doctors", async () => {
    // mock API response
    axios.get.mockResolvedValue({
      data: {
        success: true,
        data: [
          {
            id: "643e9713c106f6f97d58f3fa",
            name: "Swathi Velicheti",
            specialty: "Primary Care Provider",
            location: "672 Pine st.",
          },
        ],
      },
    });

    render(<Home />);

    // wait for API call to complete
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    // verify that doctors are displayed on the page
    expect(screen.getByText("Swathi Velicheti")).toBeInTheDocument();
    expect(screen.getByText("Primary Care Provider")).toBeInTheDocument();
    expect(screen.getByText("672 Pine st.")).toBeInTheDocument();

  });

  it("should handle error when API call fails", async () => {
    // mock API response with error
    axios.get.mockRejectedValue(new Error("API call failed"));

    render(<Home />);

    // wait for API call to complete
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    // verify that loading state is hidden
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // verify that error message is displayed on the page
    expect(screen.getByText("Error fetching doctors")).toBeInTheDocument();
  });
});
