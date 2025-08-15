import { useEffect } from "react";
import { IconButton } from "@mui/material";
import { paginationButtonStyles } from "./styles";
import { PaginationButtonProps } from "types/types";


export default function PaginationButton({
  onClick,
  disabled = false,
  icon,
  ariaLabel,
  enableKeyPress = false,
  keyDirection,
}: PaginationButtonProps) {
  useEffect(() => {
    if (!enableKeyPress || disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (keyDirection === "left" && event.key === "ArrowLeft") ||
        (keyDirection === "right" && event.key === "ArrowRight")
      ) {
        event.preventDefault();
        onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enableKeyPress, keyDirection, onClick, disabled]);

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
