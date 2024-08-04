export const formatInputRupiah = (value: string) => {
  const number = parseInt(value.replace(/[^,\d]/g, ""));
  if (isNaN(number)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(number);
};
