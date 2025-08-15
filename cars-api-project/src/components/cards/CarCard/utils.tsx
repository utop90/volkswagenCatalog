/* Ensure that the browser fetches LCP content with high priority, improving Web Perfomance. 
More info: https://web.dev/articles/optimize-lcp?utm_source=lighthouse&utm_medium=devtools&hl=es-419#optimize_when_the_resource_is_discovered
*/
export function preloadImageLCP(url: string) {
  if (!url) return;
  if (typeof window === "undefined") return;
  if (document.querySelector(`link[rel="preload"][href="${url}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = url;
  document.head.appendChild(link);
}
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

