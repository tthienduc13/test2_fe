export function isValidInput(input: string): boolean {
  const regex = /^[A-Za-z0-9 ]+$/;
  if (!regex.test(input)) {
    return false;
  }
  if (/^[0-9]/.test(input)) {
    return false;
  }
  return true;
}

export const isValidNumberOfRounds = (value: number): boolean => {
  // Check if the value is a number and is greater than 0
  return typeof value === "number" && value > 0 && value <= 10;
};
