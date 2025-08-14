import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  controlPanelContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 8,
    minHeight: "50px",
  },
  panelRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginRight: theme.spacing(6),
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      marginRight: 0,
      padding: 2,
    },
  },
  addButtonWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  actionsWrapper: {
    display: "flex",
    gap: theme.spacing(1),
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      width: "100%",
      flexDirection: "column",
    },
  },
  fullWidthOnMobile: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginLeft: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  logo: {
    height: 40,
    width: "auto",
  },
  logoText: {
    fontWeight: 800,
    color: theme.palette.grey[900],
  },
}));
