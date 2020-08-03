const bookings = {
  search() {
    /* This should make an axios call to the booking search service.
     * A mocked value is returned instead.
     * Will also use setTimeout to simulate a 2 seconds network delay.
     */
    return new Promise(function(resolve) {
      setTimeout(resolve, 2000, {
        data: [
          { id: 1, label: "Result 1" },
          { id: 2, label: "Result 2" },
          { id: 3, label: "Result 3" },
        ],
      });
    });
  },
};

export default bookings;
