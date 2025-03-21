const Hero = ({ scrollIntoView }: { scrollIntoView: () => void }) => {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <div className="bg-cover bg-center flex justify-center items-center"></div>
      <div className="space-y-5 max-w-4xl m-auto text-center">
        <h1 className="text-sm md:text-md text-indigo-600 font-medium">
          Check out the different missions launched by SpaceX
        </h1>
        <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
            SpaceX Launch Missions
          </span>
        </h2>
        <p className="max-w-2xl mx-auto">
          SpaceX is an American space technology company headquartered at the
          Starbase development site near Brownsville, Texas. Since its founding
          in 2002, the company has made numerous advancements in rocket
          propulsion, reusable launch vehicles, human spaceflight and satellite
          constellation technology. Find out details about these missions.
        </p>
        <div>
          <button
            type="button"
            className=" py-2 px-4 mx-auto text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none w-sm hover:cursor-pointer"
            onClick={scrollIntoView}
            aria-label="See missions"
          >
            Check out missions
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
