import { lazy, Suspense, useState } from "react";
/* mui */
import Grid from "@mui/material/Grid2";
import { useMediaQuery } from "@mui/material";
import { useStyles } from "./styles";
/* types */
import { DashboardProps } from "types/types";
/* local components */
import theme from "theme/theme";
import PaginationWithTitle from "components/pagination/PaginationWithTitle/PaginationWithTitle";

const CarCard = lazy(() => import("components/cards/CarCard/CarCard"));

function Dashboard({ models }: DashboardProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentModels = isMobile ? models : models.slice(startIndex, endIndex);
  const totalPages = Math.ceil(models.length / itemsPerPage);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const classes = useStyles();

  return (
    <>
      <Suspense fallback={<p>Loading car cards...</p>}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          padding={isMobile ? 2 : undefined}
        >
          {currentModels.map((car) => (
            <Grid
              key={car.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <CarCard {...car} />
            </Grid>
          ))}
        </Grid>
        <Grid container size={12}>
          <PaginationWithTitle
            page={page}
            totalPages={totalPages}
            handlePrev={handlePrev}
            handleNext={handleNext}
            classes={classes}
          />
        </Grid>
      </Suspense>
    </>
  );
}

export default Dashboard;
