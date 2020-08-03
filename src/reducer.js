import { combineReducers } from "redux";
import airfields from "./components/AirfieldSearcher/reducer";
import bookings from "./Containers/BookingForm/reducer";

export default combineReducers({
  airfields,
  bookings,
});
