import { useEffect, useRef, useState } from "react";
import spaceXData from "./db/payload.json";

import { Route, Routes, useLocation } from "react-router-dom";
import CreateMissionPage from "./pages/CreateMissionPage";
import HomePage from "./pages/HomePage";
import MissionDetailsPage from "./pages/MissionDetailsPage";
import Navbar from "./components/Navbar";

import {
  getLocalStorageData,
  isLocalStorageDataNull,
  setLocalStorageData,
} from "./utils/localStorageUtils";
import { FormFields } from "./components/CreateMissionForm";
import { attachImages, createMissionObject } from "./utils/objectUtils";

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
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const [filteredList, setFilteredList] = useState<MissionState[]>([]);
  const missionListRef = useRef<HTMLDivElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const [sortDirection, setSortDirection] = useState("default");
  const [filter, setFilter] = useState<boolean>(false);

  const sortMissions = (launchData: MissionState[]) => {
    const sortedList = launchData.sort(
      (mission1: MissionState, mission2: MissionState) => {
        const dateA = new Date(mission1.launch_date_utc).getTime();
        const dateB = new Date(mission2.launch_date_utc).getTime();

        return sortDirection === "asc" ? dateB - dateA : dateA - dateB;
      }
    );
    return sortedList;
  };

  useEffect(() => {
    if (isLocalStorageDataNull()) {
      const missionData = getLocalStorageData();
      const data = missionData.slice(0, 5);
      setLaunchData(data);
    } else {
      const rawData = attachImages(spaceXData.data.launches);
      setLocalStorageData(rawData);
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
        if (filter) {
          if (filteredList.length > 0) {
            if (filteredList.length > 5) {
              const additionalData: MissionState[] = filteredList.slice(
                launchData.length,
                launchData.length + 5
              );
              additionalData.forEach((mission) => launchData.push(mission));
              setLaunchData([...launchData]);
            }
          } else {
            setLaunchData(filteredList);
          }
        } else {
          const missionList = getLocalStorageData();
          const additionalData: MissionState[] = missionList.slice(
            launchData.length,
            launchData.length + 5
          );
          additionalData.forEach((mission) => launchData.push(mission));

          setLaunchData([...launchData]);
        }
      }
    }, options);

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef?.current);
      }
    };
  }, [lastElementRef]);

  const onSearch = (value: string) => {
    const excludedColumns = [
      "image",
      "id",
      "details",
      "links",
      "launch_date_utc",
    ];
    if (value === "") {
      setLaunchData(getLocalStorageData());
      setFilter(false);
    } else {
      const filteredList = getLocalStorageData().filter(
        (mission: MissionState) => {
          return Object.keys(mission).some((key: string) => {
            if (excludedColumns.includes(key)) {
              return false;
            } else {
              if (key === "rocket") {
                return mission[key].rocket_name !== null
                  ? mission[key].rocket_name
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  : false;
              } else if (key === "launch_year" || key === "mission_name") {
                return mission[key] !== null
                  ? mission[key].toLowerCase().includes(value.toLowerCase())
                  : false;
              }
            }
          });
        }
      );
      setLaunchData(filteredList);
      setFilteredList(filteredList);
      setFilter(true);
    }
    setSearchText(value);
  };

  const handleYearSort = () => {
    let sortedList = [];
    if (filter) {
      sortedList = sortMissions(launchData);
      setLaunchData(sortedList);
    } else {
      sortedList = sortMissions(getLocalStorageData());
      const list = sortedList.slice(0, launchData.length);
      setLaunchData(list);
    }
    const direction =
      sortDirection === "default"
        ? "asc"
        : sortDirection === "asc"
        ? "desc"
        : "asc";
    setSortDirection(direction);
  };

  const submitMissionData = (data: FormFields) => {
    const newMission = createMissionObject(data);
    const missionData = getLocalStorageData();
    missionData.push(newMission);
    setLocalStorageData(missionData);
    setLaunchData([...missionData]);
  };

  return (
    <>
      <div className="text-gray-700 absolute bottom-0 left-0 right-0 top-0 background-fade h-fit w-full bg-gray-50">
        <div className="relative max-w-full w-9/10 md:w-4/5 lg:w-3/5 mx-auto sm:px-2 md:px-4 min-h-[calc(100vh-80px)] ">
          <Navbar pathname={pathname} />
          <Routes>
            <Route
              index
              element={
                <HomePage
                  launchData={launchData}
                  sortDirection={sortDirection}
                  lastElementRef={lastElementRef}
                  missionListRef={missionListRef}
                  handleYearSort={handleYearSort}
                  onSearch={onSearch}
                  searchText={searchText}
                  filter={filter}
                />
              }
            />
            <Route
              path="createMission"
              element={
                <CreateMissionPage submitMissionData={submitMissionData} />
              }
            />
            <Route path="missionDetails/:id" element={<MissionDetailsPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
