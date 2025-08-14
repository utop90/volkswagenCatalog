import { IconButton } from "@mui/material";
import { paginationButtonStyles } from "./styles";
import { PaginationButtonProps } from "types/types";

export default function PaginationButton({
  onClick,
  disabled = false,
  icon,
  ariaLabel,
}: PaginationButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      size="large"
      color="primary"
      sx={{
        ...paginationButtonStyles,
      }}
      aria-label={ariaLabel}
    >
      {icon}
    </IconButton>
  );
}
