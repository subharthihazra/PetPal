import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const typeToBreed =  {
  "cats" :  ["ragdoll","maine-coon","persian-cat","siamese-cat","others"],
  "dogs"  : ["german-shepherd","labrador","bulldog","husky","others"]
}