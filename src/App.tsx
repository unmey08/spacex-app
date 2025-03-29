import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  attachImages,
  createMissionObject,
  getFilteredData,
} from "./utils/objectUtils";
import MetaTagComponent from "./components/MetaTagComponent";
import { MissionState } from "./common/types";

function App() {
  const [launchData, setLaunchData] = useState<MissionState[]>([]);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const [filteredList, setFilteredList] = useState<MissionState[]>([]);
  const missionListRef = useRef<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(darkMode ? "dark" : "light");
  const element = document.documentElement;

  const [sortDirection, setSortDirection] = useState("default");
  const [filter, setFilter] = useState<boolean>(false);

  const [menu, setMenu] = useState<boolean>(false);

  const location = useLocation();

  const sortMissions = useCallback(
    (direction: string, launchData: MissionState[]) => {
      const sortedList = launchData.sort(
        (mission1: MissionState, mission2: MissionState) => {
          const dateA = new Date(mission1.launch_date_utc).getTime();
          const dateB = new Date(mission2.launch_date_utc).getTime();

          return direction === "asc" || direction === "default"
            ? dateA - dateB
            : dateB - dateA;
        }
      );
      return sortedList;
    },
    [sortDirection]
  );

  const loadMoreData = (list: MissionState[]) => {
    const additionalData: MissionState[] = list.slice(
      launchData.length,
      launchData.length + 5
    );
    additionalData.forEach((mission) => launchData.push(mission));
    setLaunchData([...launchData]);
  };

  useEffect(() => {
    if (isLocalStorageDataNull()) {
      //get data from local storage
      const missionData = getLocalStorageData();
      const data = missionData.slice(0, 5);
      setLaunchData(data);
    } else {
      // get data from memory
      const rawData = attachImages(spaceXData.data.launches);
      setLocalStorageData(rawData);
      const data = launchData.slice(0, 5);
      setLaunchData(data);
    }
  }, []);

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setTheme("light");
        break;
      default:
        localStorage.removeItem("theme");
        break;
    }
  }, [theme]);

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
              loadMoreData(filteredList);
            }
          } else {
            setLaunchData(filteredList);
          }
        } else if (sortDirection === "asc" || sortDirection === "desc") {
          const missionList = sortMissions(
            sortDirection,
            getLocalStorageData()
          );
          loadMoreData(missionList);
        } else {
          const missionList = getLocalStorageData();
          loadMoreData(missionList);
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
  }, [lastElementRef, location, sortDirection, searchText]);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setMenu((value) => !value);
  };

  const onSearch = (value: string) => {
    if (value === "") {
      const missionList = getLocalStorageData();
      const sortedList = sortMissions(sortDirection, missionList);
      setLaunchData(sortedList.slice(0, 5));
      setFilter(false);
      setFilteredList([]);
    } else {
      const filteredList = getFilteredData(value);
      setLaunchData(filteredList);
      setFilteredList(filteredList);
      setFilter(true);
    }
    setSearchText(value);
  };

  const handleYearSort = () => {
    let sortedList = [];
    const direction =
      sortDirection === "default"
        ? "asc"
        : sortDirection === "asc"
        ? "desc"
        : "asc";
    setSortDirection(direction);
    if (filter) {
      sortedList = sortMissions(direction, launchData);
      setLaunchData(sortedList);
    } else {
      sortedList = sortMissions(direction, getLocalStorageData());
      const list = sortedList.slice(0, launchData.length);
      setLaunchData(list);
    }
  };

  const submitMissionData = useCallback((data: FormFields) => {
    const newMission = createMissionObject(data);
    const missionData = getLocalStorageData();
    missionData.push(newMission);
    setLocalStorageData(missionData);
    setLaunchData([...missionData]);
  }, []);

  return (
    <>
      <MetaTagComponent />
      <div
        className="text-gray-700 absolute bottom-0 left-0 right-0 top-0 background-fade h-fit w-full bg-gray-50 dark:bg-gradient-to-t dark:from-slate-900 dark:via-slate-950 dark:to-slate-950"
        id="start"
      >
        <div className="relative max-w-full w-9/10 md:w-4/5 lg:w-3/5 mx-auto sm:px-2 md:px-4 min-h-[calc(100vh-80px)] ">
          <Navbar
            pathname={pathname}
            theme={theme}
            handleThemeChange={handleThemeChange}
            menu={menu}
            toggleMenu={toggleMenu}
          />
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
                  toggleMenu={toggleMenu}
                />
              }
            />
            <Route
              path="createMission"
              element={
                <CreateMissionPage submitMissionData={submitMissionData} />
              }
            />
            <Route
              path="missionDetails/:id"
              element={<MissionDetailsPage toggleMenu={toggleMenu} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
