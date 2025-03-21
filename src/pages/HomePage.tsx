import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import { MissionState } from "../App";
import Filters from "../components/Filters";
import SortButton from "../components/SortButton";
import MissionList from "../components/MissionList";

type HomePageProps = {
  launchData: MissionState[];
  lastElementRef: HTMLDivElement | null;
};

export type YearsListState = {
  id: string;
  year: string;
  checked: boolean;
};

export type RocketListState = {
  id: string;
  rocket: string;
  checked: boolean;
};

const HomePage = ({ launchData, lastElementRef }: HomePageProps) => {
  const missionListRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (event?: MouseEvent) => {
    event?.preventDefault();
    missionListRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Hero scrollIntoView={scrollIntoView} />
      <section ref={missionListRef}>
        <MissionList launchData={launchData} lastElementRef={lastElementRef} />
      </section>
    </div>
  );
};
export default HomePage;
