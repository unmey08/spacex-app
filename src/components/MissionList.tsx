import MissionCard from "../components/MissionCard";
import { MissionState } from "../common/types";
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
        <h3 className="text-md mt-10 font-semibold text-gray-800 text-center">
          Showing {launchData.length} results
        </h3>
      )}
      <div>
        {launchData.length > 0 &&
          launchData.map((mission: MissionState) => (
            <MissionCard mission={mission} key={mission.id} />
          ))}
      </div>
      {!filter && (
        <div
          ref={lastElementRef}
          className="text-gray-800 font-semibold text-center"
        >
          {""}
        </div>
      )}
      {launchData.length === 0 && (
        <p className="mt-20 text-gray-800 font-semibold text-center">
          No data available
        </p>
      )}
    </div>
  );
};
export default MissionList;
