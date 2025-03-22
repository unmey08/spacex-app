import { Helmet } from "react-helmet-async";

const MetaTagComponent = () => {
  return (
    <Helmet>
      <title>SpaceX Launch Missions</title>
      <meta
        name="description"
        content="Check out the different missions launched by SpaceX"
      />
    </Helmet>
  );
};
export default MetaTagComponent;
