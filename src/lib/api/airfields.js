import axios from "axios";

const airfields = {
  search(text) {
    return axios.get(
      `https://www.kayak.com/mv/marvel?f=j&where=${text}&s=13&lc_cc=SP&lc=en&v=v1&cv=5`
    );
  },
};

export default airfields;
