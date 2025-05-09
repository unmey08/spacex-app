import { MissionState } from "../common/types";

export const getLocalStorageData = () => {
  return isLocalStorageDataNull()
    ? JSON.parse(localStorage.getItem("data") || "{}")
    : [];
};

export const setLocalStorageData = (data: MissionState[]) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const isLocalStorageDataNull = () => {
  return localStorage.getItem("data") !== null;
};
