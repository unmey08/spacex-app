import { MouseEvent, RefObject } from "react";
import { MissionState } from "../App";
import Filters from "../components/Filters";
import SortButton from "../components/SortButton";
import MissionList from "../components/MissionList";
import Hero from "../components/Hero";

type HomePageProps = {
  launchData: MissionState[];
  lastElementRef: RefObject<HTMLDivElement | null>;
  missionListRef: RefObject<HTMLElement | null>;
  handleYearSort: () => void;
  sortDirection: string;
  onSearch: (value: string) => void;
  searchText: string;
  filter: boolean;
};

const HomePage = ({
  launchData,
  lastElementRef,
  missionListRef,
  handleYearSort,
  sortDirection,
  onSearch,
  searchText,
  filter,
}: HomePageProps) => {
  const scrollIntoView = (event?: MouseEvent) => {
    event?.preventDefault();
    missionListRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Hero scrollIntoView={scrollIntoView} />
      <section ref={missionListRef}>
        <div className="md:flex justify-between">
          <Filters onSearch={onSearch} searchText={searchText} />
          <SortButton
            handleYearSort={handleYearSort}
            sortDirection={sortDirection}
          />
        </div>
        <MissionList
          launchData={launchData}
          lastElementRef={lastElementRef}
          filter={filter}
        />
      </section>
    </div>
  );
};
export default HomePage;
