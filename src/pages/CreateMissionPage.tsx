import CreateMissionForm, { FormFields } from "../components/CreateMissionForm";

const CreateMissionPage = ({
  submitMissionData,
}: {
  submitMissionData: (data: FormFields) => void;
}) => {
  return (
    <div className="h-screen pt-32">
      <CreateMissionForm submitMissionData={submitMissionData} />
    </div>
  );
};
export default CreateMissionPage;
