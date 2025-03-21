import CreateMissionForm, { FormFields } from "../components/CreateMissionForm";

const CreateMissionPage = ({
  submitMissionData,
}: {
  submitMissionData: (data: FormFields) => void;
}) => {
  return (
    <div className="h-screen">
      <CreateMissionForm submitMissionData={submitMissionData} />
    </div>
  );
};
export default CreateMissionPage;
