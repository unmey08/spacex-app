import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Alert from "../../components/Alert";
import "@testing-library/jest-dom";

// Took help of AI and documentation
describe("Alert Component", () => {
  it("renders the Alert component with success message and button", () => {
    render(
      <Router>
        <Alert closeAlert={vi.fn()} />
      </Router>
    );

    // Check for the success message
    const successMessage = screen.getByText("Success!");
    expect(successMessage).toBeInTheDocument();

    const description = screen.getByText("New mission created!");
    expect(description).toBeInTheDocument();

    // Check for the button
    const button = screen.getByRole("button", { name: "Go to Home Page" });
    expect(button).toBeInTheDocument();
  });

  it("close the Alert component when the button is clicked", () => {
    const mockCloseAlert = vi.fn();
    render(
      <Router>
        <Alert closeAlert={mockCloseAlert} />
      </Router>
    );

    const button = screen.getByLabelText("Close Alert");
    fireEvent.click(button);

    expect(mockCloseAlert).toHaveBeenCalledTimes(1);
  });
});
