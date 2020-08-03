// All categories are exported individually in case of being needed
// Each gategory has Name(used as label and key) and Nescription
const CHILD = "Child";
export const CHILD_DESCRIPTION = "- 11";
const YOUTH = "Youth";
export const YOUTH_DESCRIPTION = "12 - 17";
const ADULTS = "Adults";
export const ADULTS_DESCRIPTION = "18 - 64";
const SENIORS = "Seniors";
export const SENIORS_DESCRIPTION = "65 +";

// Add a new category is easy, just need to add it on the PASSENGERS_CATEGORIES array
export const PASSENGERS_CATEGORIES = [CHILD, YOUTH, ADULTS, SENIORS];

// Itinal values also easy to modify
export const PASSENGERS_INITIAL_VALUE = {
  [CHILD]: 0,
  [YOUTH]: 0,
  [ADULTS]: 1,
  [SENIORS]: 0,
};
