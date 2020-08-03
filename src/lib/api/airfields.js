import axios from "axios";

const airfields = {
  /* The search call is using https://www.kayak.com/flights public airfield listing service,
   * passing the only "where" parameter.
   */
  search(text) {
    return axios.get(
      `https://www.kayak.com/mv/marvel?f=j&where=${text}&s=13&lc_cc=SP&lc=en&v=v1&cv=5`
    );
  },
};

export default airfields;
