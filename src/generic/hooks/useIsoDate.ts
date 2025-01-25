export const useIsoDate= (isoDate: string): string => {
  const date = new Date(isoDate);

  const readableDate = date.toLocaleString("en-US", {
    //weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric", 
    //second: "numeric",
    hour12: false, 
  });

  return readableDate;

}
