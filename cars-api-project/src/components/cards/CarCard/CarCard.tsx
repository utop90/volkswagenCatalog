import { useState, useEffect, lazy, Suspense } from "react";
/* mui */
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
/* types */
import { CarModel } from "types/types";
/* local components */
import CarDetailsModal from "components/modals/CarDetailsModal/CarDetailsModal";
import CarFormModal from "components/modals/CarFormModal/CarFormModal";
/* redux */
import { useDispatch } from "react-redux";
/* styles */
import useStyles from "./styles";
import {
  handleEditCar,
  handleEditOpenModal,
  handleRemoveCar,
} from "components/utils";

/* deno */
import process from "process";

/* icons */
const EditIcon = lazy(() => import("@mui/icons-material/Edit"));
const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));

const imageCache = new Set<string>();

function CarCard(props: CarModel) {
  const { model, id, description, year, photo } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const imageUrl = photo ?? process.env.REACT_APP_DEFAULT_CAR_IMG;

  useEffect(() => {
    if (imageCache.has(imageUrl)) {
      setLoading(false);
      return;
    }
    const img = new Image();
    img.src = imageUrl;
    img.loading = "eager";
    img.onload = () => {
      imageCache.add(imageUrl);
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
    };
  }, [imageUrl]);

  return (
    <>
      <Card
        data-testid="car-card"
        className={classes.card}
        onClick={() => setOpen(true)}
      >
        <Box className={classes.iconContainer}>
          <Suspense fallback={<Box width={24} height={24} />}>
            <IconButton
              aria-label="edit"
              data-testid="edit-car-btn"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleEditOpenModal(e);
                setEditModalOpen(true);
              }}
              className={classes.iconButton}
            >
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
          </Suspense>
          <Suspense fallback={<Box width={24} height={24} />}>
            <IconButton
              aria-label="delete"
              data-testid="delete-car-btn"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveCar(e, dispatch, id);
              }}
              className={classes.iconButton}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Suspense>
        </Box>

        <Box height={180}>
          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="rgba(255,255,255,0.7)"
              height="100%"
            >
              <CircularProgress />
            </Box>
          )}
          <img
            src={imageUrl}
            alt={model}
            height={180}
            loading="lazy"
            className={classes.carCardImage}
            style={{ display: loading ? "none" : "block" }}
            onLoad={() => {
              imageCache.add(imageUrl);
              setLoading(false);
            }}
            onError={() => setLoading(false)}
          />
        </Box>

        <CardContent>
          <Typography className={classes.modelText} variant="h6">
            {model}
          </Typography>
        </CardContent>
      </Card>

      <CarDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        model={model}
        imageUrl={imageUrl}
        year={year}
        description={description}
      />
      <CarFormModal
        carToEdit={props}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={(e) => {
          handleEditCar(e, dispatch);
          setEditModalOpen(false);
        }}
        title={"Edit Car"}
        description={"Please fill in the details for updating the car:"}
      />
    </>
  );
}

export default CarCard;
