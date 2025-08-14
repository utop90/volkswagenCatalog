import { useState } from "react";
/* types */
import { DashboardControlPanelProps, YearsRange } from "types/types";

/* redux */
import { useDispatch } from "react-redux";
import { resetCars } from "reduxStore/slices/carsSlice";
/* local components */
import SortPopover from "components/popovers/SortPopover/SortPopover";
import FilterPopover from "components/popovers/FilterPopover/FilterPopover";
/* mui */
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, Typography } from "@mui/material";
import { useStyles } from "./styles";
/* assets */
import logo from "assets/images/logo.png";

export default function DashboardControlPanel({
  onAddCar,
}: DashboardControlPanelProps) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [yearRange, setYearRange] = useState<YearsRange>(undefined);
  const [isDiesel, setIsDiesel] = useState(false);

  const openFilter = Boolean(filterAnchor);
  const openSort = Boolean(sortAnchor);

  const handleClosePopovers = () => {
    setFilterAnchor(null);
    setSortAnchor(null);
  };

  return (
    <Box className={classes.controlPanelContainer}>
      <Box className={classes.panelRow}>
        <Box className={classes.logoWrapper}>
          <img src={logo} alt="Volkswagen Logo" className={classes.logo} />
          <Typography variant="h5" className={classes.logoText}>
            Volkswagen Catalog
          </Typography>
        </Box>

        <Box className={classes.addButtonWrapper}>
          <Button
            className={classes.fullWidthOnMobile}
            sx={{ minWidth: "300px", borderRadius: 6, paddingInline: 3 }}
            variant="contained"
            startIcon={<DirectionsCarIcon />}
            onClick={onAddCar}
          >
            Add Car
          </Button>
        </Box>

        <Box className={classes.actionsWrapper}>
          <Button
            className={classes.fullWidthOnMobile}
            variant="text"
            startIcon={<FilterAltIcon />}
            onClick={(e) => setFilterAnchor(e.currentTarget)}
          >
            Filter Cars
          </Button>
          <Button
            className={classes.fullWidthOnMobile}
            variant="text"
            startIcon={<SortIcon />}
            onClick={(e) => setSortAnchor(e.currentTarget)}
          >
            Sort Cars
          </Button>
          <Button
            className={classes.fullWidthOnMobile}
            variant="text"
            color="error"
            startIcon={<RestartAltIcon />}
            onClick={() => {
              dispatch(resetCars());
              setYearRange(undefined);
              setIsDiesel(false);
            }}
          >
            Reset Cars
          </Button>
        </Box>
      </Box>

      <FilterPopover
        open={openFilter}
        anchorEl={filterAnchor}
        onClose={handleClosePopovers}
        yearRange={yearRange}
        setYearRange={setYearRange}
        isDiesel={isDiesel}
        setIsDiesel={setIsDiesel}
        dispatch={dispatch}
      />

      <SortPopover
        open={openSort}
        anchorEl={sortAnchor}
        onClose={handleClosePopovers}
        dispatch={dispatch}
      />
    </Box>
  );
}
