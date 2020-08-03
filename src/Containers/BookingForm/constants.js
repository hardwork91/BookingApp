// tooltip delay in seconds because default value (	0.1s) is to short
export const TOOLTIP_DELAY = 1;

// componet state property name
export const ORIGIN_SELECTED_DATA = "originSelectedData";
export const DESTINATION_SELECTED_DATA = "destinationSelectedData";

// possible values of flight type selector
export const ROUND_TRIP = "Round-trip";
const ONE_WAY = "One-way";
const MULTI_CITY = "Multi-city";
const TRIP_BUILDER = "Trip Builder";
export const FLIGHT_TYPES = [ROUND_TRIP, ONE_WAY, MULTI_CITY, TRIP_BUILDER];

// possible values of travel class selector
export const ECONOMY = "Economy";
const BUSINESS = "Business";
const FIRST = "First";
export const TRAVEL_CLASES = [ECONOMY, BUSINESS, FIRST];

// constants used by actions, sagas and reducers
export const SEARCH_BOOKING_REQUEST = "SEARCH_BOOKING_REQUEST";
export const SEARCH_BOOKING_SUCCESS = "SEARCH_BOOKING_SUCCESS";
export const SEARCH_BOOKING_FAILURE = "SEARCH_BOOKING_FAILURE";

export const CLEAR_BOOKING_REQUEST = "CLEAR_BOOKING_REQUEST";
