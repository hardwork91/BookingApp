import airfieldSaga from "./components/AirfieldSearcher/saga";
import bookingSaga from "./Containers/BookingForm/saga";

export default function* appSaga() {
  yield [airfieldSaga(), bookingSaga()];
}
