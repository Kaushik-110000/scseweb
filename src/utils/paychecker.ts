export const checkIsFromCse = (email: string) => {
  const isFromCse =
    /^[0-9]{4}(?:ugcs|pgcsca|pgcscs|pgcsds|pgcsis)[0-9]{3}@nitjsr\.ac\.in$/i.test(
      email
    ); //lets see
  console.log("hi");
  return isFromCse;
};
export const checkIsFromNit = (email: string) => {
  return (
    typeof email === "string" && email.toLowerCase().endsWith("@nitjsr.ac.in")
  );
};
