import React, { useEffect, useState } from "react";

/* mui */
import {
  Typography,
  TextField,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import theme from "theme/theme";
/* redux */
import { useSelector } from "react-redux";
import { RootState } from "reduxStore/store";

/* local components */
import CarModal from "components/modals/CarReusableModal/CarReusableModal";
import { CarFormModalProps, CarModel } from "types/types";

export default function CarFormModal({
  open,
  onClose,
  onSubmit,
  title = "Add New Car",
  description = "Please fill in the details for the new car:",
  carToEdit,
}: CarFormModalProps & { carToEdit?: CarModel }) {
  const cars = useSelector((state: RootState) => state.cars.cars);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [car, setCar] = useState<CarModel>({
    id: "",
    model: "",
    year: new Date().getFullYear(),
    photo: "",
    description: "",
    isDieselCar: false,
  });
  // Store the car if it is edited mode
  useEffect(() => {
    if (carToEdit) {
      setCar(carToEdit);
    } else {
      setCar({
        id: "",
        model: "",
        year: new Date().getFullYear(),
        photo: "",
        description: "",
        isDieselCar: false,
      });
    }
  }, [carToEdit, open]);

  const handleChange = (field: keyof CarModel, value: string | number) => {
    setCar((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let carToSend: CarModel;

    if (carToEdit) {
      carToSend = {
        ...carToEdit,
        ...car,
      };
    } else {
      // Add car mode --> We generate a new id
      const lastId =
        cars.length > 0 ? Math.max(...cars.map((c) => Number(c.id))) : 0;
      carToSend = { ...car, id: (lastId + 1).toString() };
    }

    onSubmit(carToSend);

    if (!carToEdit) {
      setCar({
        id: "",
        model: "",
        year: new Date().getFullYear(),
        photo: "",
        description: "",
        isDieselCar: false,
      });
    }

    onClose();
  };

  return (
    <CarModal open={open} onClose={onClose} title={title} fullWidth={isMobile}>
      <form onSubmit={handleSubmit}>
        <Typography variant="subtitle1" gutterBottom>
          {description}
        </Typography>
        <TextField
          label="Model"
          fullWidth
          required
          value={car.model}
          onChange={(e) => handleChange("model", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Year"
          fullWidth
          required
          type="text"
          value={car.year}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,4}$/.test(value)) {
              handleChange("year", value === "" ? "" : Number(value));
            }
          }}
          margin="normal"
          slotProps={{
            htmlInput: {
              inputMode: "numeric",
              maxLength: 4,
              pattern: "\\d{4}",
            },
          }}
        />
        <TextField
          label="Photo URL"
          fullWidth
          value={car.photo}
          onChange={(e) => handleChange("photo", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={car.description}
          onChange={(e) => handleChange("description", e.target.value)}
          margin="normal"
        />
        <Box mt={2} textAlign="right">
          <Button onClick={onClose} color="secondary" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {carToEdit ? "Save Changes" : "Add Car"}
          </Button>
        </Box>
      </form>
    </CarModal>
  );
}
