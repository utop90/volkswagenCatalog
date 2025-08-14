import { Card, Typography, CardMedia } from "@mui/material";
import { cardStyle, cardMediaStyle } from "./styles";
import { ImageCardProps } from "types/types";

const ImageCard = ({
  loading = true,
  imageUrl = process.env.REACT_APP_DEFAULT_CAR_IMG,
  height = "",
  altText = "Image",
  loadingText = "Loading image...",
}: ImageCardProps) => {
  return (
    <Card sx={cardStyle}>
      {!loading ? (
        <CardMedia
          component="img"
          src={imageUrl}
          height={height}
          alt={altText}
          sx={cardMediaStyle}
        />
      ) : (
        <Typography>{loadingText}</Typography>
      )}
    </Card>
  );
};

export default ImageCard;
