import { useEffect, useRef, useState } from "react";
import spaceXData from "./db/payload.json";

import { Route, Routes, useLocation } from "react-router-dom";
import CreateMissionPage from "./pages/CreateMissionPage";
import HomePage from "./pages/HomePage";
import MissionDetailsPage from "./pages/MissionDetailsPage";
import Navbar from "./components/Navbar";
import {
  spacexRocket4,
  spacexRocket1,
  spacexRocket2,
  spacexRocket3,
} from "./assets/images/index";

export interface MissionState {
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  image?: {
    name: string;
    src: string;
  };
  id: string;
  launch_date_utc: string;
  launch_year: string;
  details: string | null;
  links: {
    article_link: string | null;
  };
}

function App() {
  const [launchData, setLaunchData] = useState<MissionState[]>([]);
  const lastElementRef = useRef<HTMLDivElement | undefined>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      const missionData = JSON.parse(localStorage.getItem("data") || "''");
      const data = missionData.slice(0, 5);
      setLaunchData(data);
    } else {
      const images = [
        { name: "SpaceX Rocket 1", src: spacexRocket1 },
        { name: "SpaceX Rocket 2", src: spacexRocket2 },
        { name: "SpaceX Rocket 3", src: spacexRocket3 },
        { name: "SpaceX Rocket 4", src: spacexRocket4 },
      ];
      const launchData = spaceXData.data.launches;
      launchData.forEach((launch: MissionState) => {
        launch["image"] = images[Math.floor(Math.random() * images.length)];
      });
      localStorage.setItem("data", JSON.stringify(launchData));
      const data = launchData.slice(0, 5);
      setLaunchData(data);
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const missionList = JSON.parse(localStorage.getItem("data") || "''");
        const additionalData: MissionState[] = missionList.slice(
          launchData.length,
          launchData.length + 5
        );
        additionalData.forEach((mission) => launchData.push(mission));

        setLaunchData([...launchData]);
      }
    }, options);

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [lastElementRef]);

  return (
    <>
      <div className="text-gray-700 absolute bottom-0 left-0 right-0 top-0 background-fade h-fit dark:h-fit w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(250,255,255,0.1),rgba(0,134,255,0.05))]">
        <div className="relative max-w-full w-9/10 md:w-4/5 lg:w-3/5 mx-auto sm:px-2 md:px-4 min-h-[calc(100vh-80px)] max-h-full">
          <Navbar pathname={pathname} />
          <Routes>
            <Route
              index
              element={
                <HomePage
                  launchData={launchData}
                  lastElementRef={lastElementRef}
                />
              }
            />
            <Route path="createMission" element={<CreateMissionPage />} />
            <Route path="missionDetails/:id" element={<MissionDetailsPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
