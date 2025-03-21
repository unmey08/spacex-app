import MissionCard from "../components/MissionCard";
import { MissionState } from "../App";
import { Ref } from "react";

type MissionListProps = {
  launchData: MissionState[];
  lastElementRef: Ref<HTMLDivElement> | undefined;
  filter: boolean;
};

const MissionList = ({
  launchData,
  lastElementRef,
  filter,
}: MissionListProps) => {
  return (
    <div>
      {filter && (
        <h3 className="text-md font-semibold text-gray-800 text-center">
          Showing {launchData.length} results
        </h3>
      )}
      <div>
        {launchData.length > 0 &&
          launchData.map((mission: MissionState) => (
            <MissionCard mission={mission} key={mission.id} />
          ))}
      </div>
      <div
        ref={lastElementRef}
        className="text-gray-800 font-semibold text-center"
      >
        <span>
          Showing {launchData.length} missions out of{" "}
          {JSON.parse(localStorage.getItem("data") || "''").length}
        </span>
      </div>
      {launchData.length === 0 && (
        <p className="text-gray-800 font-semibold text-center">
          No data available
        </p>
      )}
    </div>
  );
};
export default MissionList;
