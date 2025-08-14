import { Button, Stack, Popover } from "@mui/material";
import { SORT_OPTIONS, SortPopoverProps } from "types/types";
import { applySortLogic } from "components/utils";

export default function SortPopover({
  open,
  anchorEl,
  onClose,
  dispatch
}: SortPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ sx: { p: 2, minWidth: 220 } }}
    >
      <Stack spacing={1}>
        <Button
          variant="outlined"
          onClick={() => {
            applySortLogic(dispatch, SORT_OPTIONS.AZ);
            onClose();
          }}
          size="small"
        >
          Alphabetical by Model (A-Z)
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            applySortLogic(dispatch, SORT_OPTIONS.OLD);
            onClose();
          }}
          size="small"
        >
          Old → New (Year)
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            applySortLogic(dispatch, SORT_OPTIONS.NEW);
            onClose();
          }}
          size="small"
        >
          New → Old (Year)
        </Button>
      </Stack>
    </Popover>
  );
}
