import { MissionState } from "../App";

export const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem("data") || "{}");
};

export const setLocalStorageData = (data: MissionState[]) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const isLocalStorageDataNull = () => {
  return localStorage.getItem("data") !== null;
};
