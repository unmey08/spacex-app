import { render, screen, fireEvent } from "@testing-library/react";
import SortButton from "../../components/SortButton";
import { vi } from "vitest";

describe("SortButton", () => {
  it("calls handleYearSort when the button is clicked", () => {
    const mockHandleYearSort = vi.fn();

    render(
      <SortButton sortDirection="default" handleYearSort={mockHandleYearSort} />
    );

    fireEvent.click(screen.getByLabelText("Sort by year"));

    expect(mockHandleYearSort).toHaveBeenCalledTimes(1);
  });
});
