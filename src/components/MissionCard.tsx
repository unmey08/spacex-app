import { Link } from "react-router-dom";
import { MissionState } from "../common/types";

type MissionCardProps = {
  mission: MissionState;
};
const MissionCard = ({ mission }: MissionCardProps) => {
  const isMobile = window.innerWidth < 640;
  const charLimit = isMobile ? 75 : 200;
  const { details } = mission;

  return (
    <div className="rounded-lg my-10 relative w-full bg-clip-border shadow-xl shadow-gray-300 border overflow-hidden border-gray-400 md:flex md:h-72 lg:h-96">
      <div className="relative m-0 md:w-2/5 shrink-0 rounded-lg rounded-r-none bg-clip-border h-80 md:h-full">
        <img
          src={mission?.image?.src}
          alt={mission?.image?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-left md:ml-2 p-4">
        <Link
          to={`missionDetails/${mission.id}`}
          type="button"
          className="my-2 block font-sans text-xl md:text-2xl font-semibold leading-relaxed tracking-normal text-gray-900 antialiase hover:underline hover:cursor-pointer hover:text-indigo-700"
          aria-label={`Go to mission details ${mission.mission_name}`}
        >
          {mission.mission_name} ({mission.launch_year})
        </Link>
        <p className="my-4 block font-sans md:text-md md:font-medium leading-snug tracking-normal text-gray-700 antialiased text-lg">
          <span className="font-bold">Rocket Name:</span>{" "}
          {mission.rocket.rocket_name}
        </p>
        <p className="my-4 block font-sans md:text-md md:font-medium leading-snug tracking-normal text-gray-700 antialiased">
          {details
            ? details.length < charLimit
              ? details
              : details.slice(0, charLimit) + "..."
            : "No details available"}
        </p>
        <Link
          type="button"
          to={`missionDetails/${mission.id}`}
          aria-label="View mission details"
          role="button"
        >
          <button
            className="py-2 px-4 font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none cursor-pointer text-white align-middle md:absolute md:top-[80%]"
            aria-label="Go to mission details"
            role="button"
          >
            View mission details
          </button>
        </Link>
      </div>
    </div>
  );
};
export default MissionCard;
