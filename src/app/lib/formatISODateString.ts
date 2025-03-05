export function formatISODateString(isoDateString: string) {
  const date: Date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    //month: "long",
    month: "short",
    day: "numeric",
  };

  const formattedDate: string = date.toLocaleDateString("en-US", options);

  return formattedDate;
}


export function customUTCFormat(dateInput: Date | string): string {
  // Parse the input into a Date object
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  // Extract the UTC year, month, and day
  const year = date.getUTCFullYear() % 100; // Last two digits of the year
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  // Format as "UTC.XX-XX-XX"
  return `UTC.${String(year).padStart(2, "0")}-${month}-${day}`;
}

export function customUTCTime(dateInput: Date | string): string {
  // Parse the input into a Date object
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  // Extract UTC time components
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Convert to 12-hour format and determine AM/PM
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0");

  // Return time in the format HH:MM AM/PM
  return `${formattedHours}:${minutes} ${period}`;
}
