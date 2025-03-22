import { FormFields } from "../components/CreateMissionForm";
import {
  spacexRocket4,
  spacexRocket1,
  spacexRocket2,
  spacexRocket3,
  noImage,
} from "../assets/images/index";
import { generateRandomString } from "./randomStringUtil";
import { MissionState } from "../App";

export const createMissionObject = (data: FormFields) => {
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
    launch_date_utc: new Date().toISOString(),
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
