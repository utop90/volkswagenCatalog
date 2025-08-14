import { Button, Stack, Checkbox, FormControlLabel, Popover, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FilterPopoverProps, YEARS_RANGE, YearsRange } from "types/types";
import { applyFiltersLogic } from "components/utils";

export default function FilterPopover({
  open,
  anchorEl,
  onClose,
  yearRange,
  setYearRange,
  isDiesel,
  setIsDiesel,
  dispatch
}: FilterPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ sx: { p: 2, minWidth: 220 } }}
    >
      <Stack spacing={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="yearRange-label">Year Range</InputLabel>
          <Select
            labelId="yearRange-label"
            value={yearRange ?? ""}
            onChange={(e) => setYearRange(e.target.value as YearsRange)}
            label="Year Range"
          >
            <MenuItem value={YEARS_RANGE.RECENT}>2020 - 2024</MenuItem>
            <MenuItem value={YEARS_RANGE.MID}>2010 - 2019</MenuItem>
            <MenuItem value={YEARS_RANGE.OLD}>Up to 2009</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={isDiesel}
              onChange={(e) => setIsDiesel(e.target.checked)}
            />
          }
          label="Only diesel cars"
        />
        <Button
          variant="contained"
          onClick={() => {
            applyFiltersLogic(dispatch, yearRange, isDiesel);
            onClose();
          }}
          disabled={!yearRange && !isDiesel}
          size="small"
        >
          Apply Filter
        </Button>
      </Stack>
    </Popover>
  );
}
