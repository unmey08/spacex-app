import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Alert from "./Alert";

export type FormFields = {
  missionName: string;
  details: string;
  rocketName: string;
  launchYear: string;
};

export interface CreateMissionFormProps {
  submitMissionData: (data: FormFields) => void;
}

const CreateMissionForm = ({ submitMissionData }: CreateMissionFormProps) => {
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isValid },
  } = useForm<FormFields>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    setFocus("missionName");
  }, [setFocus]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (isValid) {
      submitMissionData(data);
      setShowAlert(true);
      reset();
    }
  };

  // const dotLottieRefCallback = (dotLottie: any) => {
  //   setDotLottie(dotLottie);
  // };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // const playVideo = () => {
  //   if (isValid) {
  //     if (dotLottie) {
  //       dotLottie.play();
  //     }
  //     setShowAlert(true);
  //   }

  // };

  const currentYear = new Date().getFullYear();
  const yearsDropdown: string[] = Array.from(
    { length: currentYear - 2002 + 1 },
    (_, i) => (2002 + i).toString()
  );

  return (
    <div className="w-full h-full">
      {showAlert && <Alert closeAlert={closeAlert} />}
      <h2 className="text-2xl text-gray-800 font-extrabold mx-auto md:text-4xl mb-10 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
          Create a New Mission
        </span>
      </h2>
      <div>
        <form
          className="flex flex-col sm:w-full md:w-1/2 text-left"
          autoComplete="false"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="my-2">
            <label
              htmlFor="missionName"
              className="block text-sm after:content-['*'] font-bold"
            >
              Mission Name
            </label>
            <div>
              <input
                type="text"
                placeholder="Enter Mission Name"
                {...register("missionName", {
                  required: "Mission Name cannot be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9-_() ]*$/g,
                    message:
                      "Enter alphanumeric and following special characters only -()_",
                  },
                  validate: (value) => {
                    if (value === "") {
                      return "Mission Name cannot be empty";
                    }
                    return true;
                  },
                })}
                className={`border border-gray-400 placeholder-gray-500 md:my-2 p-2 rounded-lg w-full md:w-3/4 shadow-gray-200 shadow-sm text-gray-800 font-medium ${
                  errors.missionName ? "border-red-400" : ""
                }`}
              />
              {errors.missionName && (
                <p className="text-red-500 text-sm" aria-live="polite">
                  {errors.missionName.message}
                </p>
              )}
            </div>
          </div>
          <div className="my-2">
            <label htmlFor="details" className="block text-sm font-bold">
              Mission Details
            </label>
            <div>
              <textarea
                placeholder="Enter Mission Details"
                {...register("details", {
                  maxLength: {
                    value: 500,
                    message: "Maximum 500 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9-_().,&%$=!+'"/:; ]*$/g,
                    message:
                      "Enter alphanumeric and following special characters only -_().,&%$=!+'\"/:;",
                  },
                  validate: (value) => {
                    const regex = /^[a-zA-Z0-9,.-_()&%$=!+'"/:;{} ]*$/g;
                    if (!regex.test(value)) {
                      return "Enter alphanumeric and following special characters only -_().,&%$=!+'\"/:;";
                    }
                    return true;
                  },
                })}
                className={`border border-gray-400 placeholder-gray-500 p-2 md:my-2 rounded-lg  w-full md:w-3/4 shadow-gray-200 shadow-sm text-gray-800 font-medium h-24 md:h-48 ${
                  errors.details ? "border-red-400" : ""
                }`}
              />
              {errors.details && (
                <p className="text-red-500 text-sm" aria-live="polite">
                  {errors.details.message}
                </p>
              )}
            </div>
          </div>
          <div className="my-2">
            <label
              htmlFor="rocketName"
              className="block text-sm after:content-['*'] font-bold"
            >
              Rocket Name
            </label>
            <div>
              <input
                type="text"
                placeholder="Enter Rocket Name"
                {...register("rocketName", {
                  required: "Rocket Name cannot be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9-_() ]*$/g,
                    message:
                      "Enter alphanumeric and following special characters only -()_",
                  },
                  validate: (value) => {
                    if (value === "") {
                      return "Rocket Name cannot be empty";
                    }
                    return true;
                  },
                })}
                className={`border border-gray-400 placeholder-gray-500 p-2 md:my-2 rounded-lg w-full md:w-3/4 shadow-gray-200 shadow-sm text-gray-800 font-medium ${
                  errors.rocketName ? "border-red-400" : ""
                }`}
              />
              {errors.rocketName && (
                <p className="text-red-500 text-sm" aria-live="polite">
                  {errors.rocketName.message}
                </p>
              )}
            </div>
          </div>
          <div className="my-2">
            <label
              htmlFor="launchYear"
              className="block text-sm after:content-['*'] font-bold"
            >
              Launch Year
            </label>
            <div>
              <select
                {...register("launchYear", {
                  required: `Launch Year must be between year 2000 and ${currentYear}`,
                  min: {
                    value: 2000,
                    message: "Launch year must be above year 2000",
                  },
                  max: {
                    value: currentYear,
                    message: `Launch year must be below year ${currentYear}`,
                  },
                  minLength: {
                    value: 4,
                    message: `Launch Year must be between year 2000 and ${currentYear}`,
                  },
                  maxLength: {
                    value: 4,
                    message: `Launch Year must be between year 2000 and ${currentYear}`,
                  },
                  validate: (value) => {
                    if (value === "") {
                      return "Launch Year cannot be empty";
                    } else if (
                      Number(value) < 2000 &&
                      Number(value) > currentYear
                    ) {
                      return `Launch Year must be between year 2000 and ${currentYear}`;
                    }
                    return true;
                  },
                })}
                className={`border border-gray-400 placeholder-gray-500 p-2 md:my-2 rounded-lg w-full md:w-3/4 shadow-gray-200 shadow-sm text-gray-800 ${
                  errors.launchYear ? "border-red-400" : ""
                }`}
                size={1}
              >
                <option defaultValue="Choose a year">Choose a year</option>
                {yearsDropdown.map((year: string) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {errors.launchYear && (
                <p className="text-red-500 text-sm" aria-live="polite">
                  {errors.launchYear.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="rounded-lg py-2 px-2 my-2 text-md hover:cursor-pointer w-40 self-center md:self-auto text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            // disabled={!isValid}
            aria-label="Create mission"
          >
            Create mission
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateMissionForm;
