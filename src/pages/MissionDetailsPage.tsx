import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MissionState } from "../common/types";

const MissionDetailsPage = () => {
  const { id } = useParams();
  const [mission, setMission] = useState<Partial<MissionState>>({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") || "''");
    const mission = data.filter(
      (mission: MissionState) => mission.id === id
    )[0];
    setMission(mission);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="mb-24">
      {mission && (
        <section className="pt-32 antialiased text-left h-[100vh]">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 dark:text-white">
            <div className="py-5 md:py-16 text-center">
              <h1 className="font-semibold text-3xl text-fuchsia-400 md:py-5">
                {mission.mission_name} ({mission.launch_year})
              </h1>
              <p className="text-xl md:text-2xl font-bold">
                Rocket Name: {mission.rocket?.rocket_name}
              </p>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img
                  src={mission?.image?.src}
                  alt={mission?.image?.name}
                  className="h-full w-full object-cover rounded-md"
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <div className="mt-4 ">
                  <p className="md:text-2xl font-extrabold sm:text-md">
                    Launched on{" "}
                    {new Date(mission.launch_date_utc ?? "").toUTCString()}
                  </p>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <p className="mb-2 text-gray-700 font-bold dark:text-slate-300">
                  Details:
                </p>

                <p className="mb-6 text-gray-700 dark:text-slate-300">
                  {mission.details ? mission.details : "No details found"}
                </p>
                {mission.links?.article_link !== null && (
                  <a
                    href={mission.links?.article_link}
                    type="button"
                    className="text-fuchsia-500 font-bold text-md text-center inline-flex items-center hover:underline hover:cursor-pointer "
                    target="_blank"
                  >
                    Link to the article
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default MissionDetailsPage;
