import CreateMissionForm, { FormFields } from "../components/CreateMissionForm";

const CreateMissionPage = ({
  submitMissionData,
}: {
  submitMissionData: (data: FormFields) => void;
}) => {
  return (
    <div className="h-[100vh] pt-32">
      <CreateMissionForm submitMissionData={submitMissionData} />
    </div>
  );
};
export default CreateMissionPage;
