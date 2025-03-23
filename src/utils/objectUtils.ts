import { FormFields } from "../components/CreateMissionForm";
import {
  spacexRocket4,
  spacexRocket1,
  spacexRocket2,
  spacexRocket3,
  noImage,
} from "../assets/images/index";
import { generateRandomString } from "./randomStringUtil";
import { MissionState } from "../common/types";
import { getLocalStorageData } from "./localStorageUtils";

export const createMissionObject = (data: FormFields) => {
  const launchDate = new Date(`${data.launchYear}-01-01`).toISOString();
  const newMission = {
    mission_name: data.missionName,
    rocket: {
      rocket_name: data.rocketName,
    },
    id: generateRandomString(24),
    image: {
      name: "No image",
      src: noImage,
    },
    launch_date_utc: launchDate,
    launch_year: data.launchYear,
    details: data.details ? data.details : null,
    links: {
      article_link: null,
    },
  };
  return newMission;
};

export const attachImages = (launchData: MissionState[]) => {
  const images = [
    { name: "SpaceX Rocket 1", src: spacexRocket1 },
    { name: "SpaceX Rocket 2", src: spacexRocket2 },
    { name: "SpaceX Rocket 3", src: spacexRocket3 },
    { name: "SpaceX Rocket 4", src: spacexRocket4 },
  ];
  launchData.forEach((launch: MissionState) => {
    launch["image"] = images[Math.floor(Math.random() * images.length)];
  });
  return launchData;
};

export const getFilteredData = (value: string) => {
  const excludedColumns = [
    "image",
    "id",
    "details",
    "links",
    "launch_date_utc",
  ];
  return getLocalStorageData().filter((mission: MissionState) => {
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
  });
};
