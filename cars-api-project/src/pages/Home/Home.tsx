import CarFormModal from "components/modals/CarFormModal/CarFormModal";
import DashboardControlPanel from "components/dashboards/DashboardControlPanel/DashboardControlPanel";
import { Grid2 as Grid } from "@mui/material";
import Dashboard from "components/dashboards/Dashboard/Dashboard";

/* api */
import { useVolkswagenModels } from "hooks/useVolkswagenModels";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAddNewCar } from "components/utils";

function Home() {
  const { models, loading, error } = useVolkswagenModels();
  const [addCarModalOpen, setAddCarModalOpen] = useState(false);
  const dispatch = useDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Grid size={12} padding={{lg: 4, md: 2 }}>
      <DashboardControlPanel onAddCar={() => setAddCarModalOpen(true)} />
      <Dashboard models={models} />
      <CarFormModal
        open={addCarModalOpen}
        onClose={() => setAddCarModalOpen(false)}
        onSubmit={(data) => {
          handleAddNewCar(data, dispatch);
          setAddCarModalOpen(false);
        }}
      />
    </Grid>
  );
}
export default Home;
