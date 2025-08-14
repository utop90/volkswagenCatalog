import { Typography } from "@mui/material";
import CarModal from "components/modals/CarReusableModal/CarReusableModal";
import { useStyles } from "./styles";
import { CarDetailsModalProps } from "types/types";

export default function CarDetailsModal({
  open,
  onClose,
  model,
  year,
  description,
  imageUrl,
}: CarDetailsModalProps) {
 const classes = useStyles();
  return (
    <CarModal
      open={open}
      onClose={onClose}
      title={`Details for ${model}`}
    >
      <Typography variant="subtitle1" gutterBottom>
        <strong>Model:</strong> {model}
      </Typography>

      {year && (
        <Typography variant="subtitle1" gutterBottom>
          <strong>Year:</strong> {year}
        </Typography>
      )}
      
      {description && (
        <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
          {description}
        </Typography>
      )}

      <img
        src={imageUrl}
        alt={model}
        className={classes.carDetailsImg}
      />
    </CarModal>
  );
}
