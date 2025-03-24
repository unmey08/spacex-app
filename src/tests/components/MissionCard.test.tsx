import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MissionCard from "../../components/MissionCard";
import { MissionState } from "../../common/types";
import "@testing-library/jest-dom";

// Took help of AI and documentation
describe("MissionCard Component", () => {
  const mission: MissionState = {
    id: "5eb87cd9ffd86e000604b32a",
    mission_name: "FalconSat",
    rocket: {
      rocket_name: "Falcon 1",
    },
    image: {
      src: "",
      name: "",
    },
    launch_date_utc: "2006-03-24T22:30:00.000Z",
    launch_year: "2006",
    details: "Engine failure at 33 seconds and loss of vehicle",
    links: {
      article_link:
        "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
    },
  };

  it("renders the mission name and year", () => {
    render(
      <Router>
        <MissionCard mission={mission} />
      </Router>
    );
    expect(screen.getByText("FalconSat (2006)")).toBeInTheDocument();
  });

  it("renders rocket name", () => {
    render(
      <Router>
        <MissionCard mission={mission} />
      </Router>
    );
    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
  });

  it("renders mission details", () => {
    render(
      <Router>
        <MissionCard mission={mission} />
      </Router>
    );
    expect(
      screen.getByText("Engine failure at 33 seconds and loss of vehicle")
    ).toBeInTheDocument();
  });

  it("renders the View mission details button", () => {
    render(
      <Router>
        <MissionCard mission={mission} />
      </Router>
    );
    expect(
      screen.getByRole("button", { name: /View mission details/i })
    ).toBeInTheDocument();
  });
});
