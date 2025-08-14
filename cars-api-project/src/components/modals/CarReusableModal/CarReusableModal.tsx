/* mui */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
/* types */
import { CarModalProps } from "types/types";

export default function CarReusableModal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  fullScreen = false,
}: CarModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
    >
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent dividers>{children}</DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
