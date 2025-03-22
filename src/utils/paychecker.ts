export const checkIsFromCse = (email: string) => {
  const isFromCse = /^[0-9]{4}ugcs[0-9]{3}@nitjsr\.ac\.in$/i.test(email);
  return isFromCse;
};
export const checkIsFromNit = (email: string) => {
  return (
    typeof email === "string" && email.toLowerCase().endsWith("@nitjsr.ac.in")
  );
};
