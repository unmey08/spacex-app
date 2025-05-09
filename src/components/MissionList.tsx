import MissionCard from "../components/MissionCard";
import { MissionState } from "../common/types";
import { Ref } from "react";
import { getLocalStorageData } from "../utils/localStorageUtils";

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
  const totalDataLength: number = getLocalStorageData().length;
  return (
    <div>
      {filter && (
        <h3 className="text-md mt-10 font-semibold text-gray-800 text-center dark:text-gray-300">
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
      {totalDataLength > launchData.length ? (
        <p className="mt-5 mb-5 text-gray-800 font-semibold text-center text-lg dark:text-gray-300">
          {`${
            launchData.length !== 0
              ? `Showing ${launchData.length} ${
                  filter ? "results" : "missions"
                } out of
          ${totalDataLength}`
              : ""
          }`}
        </p>
      ) : (
        launchData.length > 0 && (
          <p className="mt-5 mb-5 text-gray-800 font-semibold text-center text-lg dark:text-gray-300">
            That's all the missions!
          </p>
        )
      )}
      {launchData.length === 0 && (
        <p className="mt-5 mb-5 text-gray-800 font-semibold text-center text-lg dark:text-gray-300">
          No data available
        </p>
      )}
    </div>
  );
};
export default MissionList;
