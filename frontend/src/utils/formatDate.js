export const formatDate = (date) => {
  if (!date) return "Sin fecha";

  return new Date(date).toLocaleString("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};