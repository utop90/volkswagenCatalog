
//Optimizes image loading in a React app by preventing repeated downloads and managing the loading state.**
export function loadImage(imageUrl: string, imageCache: Set<string>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  if (imageCache.has(imageUrl)) {
    setLoading(false);
    return;
  }

  const img = new window.Image();
  img.src = imageUrl;
  img.loading = "eager";

  img.onload = () => {
    imageCache.add(imageUrl);
    setLoading(false);
  };

  img.onerror = () => {
    setLoading(false);
  };
}

