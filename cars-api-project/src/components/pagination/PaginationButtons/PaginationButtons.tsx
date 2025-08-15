import { lazy, Suspense } from "react";
/* mui */
import { Box, Grid2 as Grid, useMediaQuery } from "@mui/material";
/* local components */
import PaginationButton from "components/pagination/PaginationButton/PaginationButton";
import theme from "theme/theme";
/* types */
import { PaginationWithTitleProps } from "types/types";

/* icons */
const KeyboardArrowLeftIcon = lazy(
  () => import("@mui/icons-material/KeyboardArrowLeft")
);
const KeyboardArrowRightIcon = lazy(
  () => import("@mui/icons-material/KeyboardArrowRight")
);

export default function PaginationButtons({
  page,
  totalPages,
  handlePrev,
  handleNext,
  classes,
}: PaginationWithTitleProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === totalPages;

  return (
    <Grid
      container
      size={12}
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid size="auto">
        {!isMobile && (
          <PaginationButton
            data-testid="prev-button"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            ariaLabel="Go to the previous page"
            enableKeyPress
            keyDirection="left"
            icon={
              <Box
                className={
                  isPrevDisabled
                    ? classes.disabledPaginationButton
                    : classes.paginationButton
                }
              >
                <Suspense fallback={<Box width={24} height={24} />}>
                  <KeyboardArrowLeftIcon fontSize="medium" />
                </Suspense>
              </Box>
            }
          />
        )}
      </Grid>
      <Grid size="auto">
        {!isMobile && (
          <PaginationButton
            data-testid="forward-btn"
            onClick={handleNext}
            disabled={isNextDisabled}
            ariaLabel="Go to the next page"
            enableKeyPress
            keyDirection="right"
            icon={
              <Box
                className={
                  isNextDisabled
                    ? classes.disabledPaginationButton
                    : classes.paginationButton
                }
              >
                <Suspense fallback={<Box width={24} height={24} />}>
                  <KeyboardArrowRightIcon fontSize="medium" />
                </Suspense>
              </Box>
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
