import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    minWidth: 300,
    width: "100%",
    cursor: "pointer",
    position: "relative",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    overflow: "hidden",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: theme.shadows[6],
      "&::before": {
        opacity: 1,
      },
      "& img": {
        transform: "scale(1.15)",
        transition: "transform 0.5s ease",
      },
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: theme.shape.borderRadius,
      pointerEvents: "none",
      opacity: 0,
      transition: "opacity 0.3s ease",
      boxShadow: `0 0 15px 5px ${theme.palette.primary.main}`,
      zIndex: 1,
    },
  },
  carCardImage: {
    width: "100%",
    objectFit: "cover",
    borderRadius: 4,
  },
  iconContainer: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: "flex",
    gap: theme.spacing(1),
    zIndex: 20,
  },
  iconButton: {
    boxShadow: theme.shadows[1],
    width: 32,
    height: 32,
    "&&": {
      backgroundColor: theme.palette.grey[100],
      "&:hover": {
        backgroundColor: theme.palette.grey[300],
      },
    },
  },
  modelText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default useStyles;
