import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function get_initals(name) {
  if (!name) {
    return;
  }
  const namelist = name?.split(" ");
  let initials = "";
  if (namelist?.length > 1) {
    initials += namelist[0]?.charAt(0);
    initials += namelist.at(-1)?.charAt(0);
  } else {
    initials += namelist[0]?.charAt(0);
  }
  return initials;
}
