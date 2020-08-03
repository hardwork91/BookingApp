const bookings = {
  search() {
    // This should make an axios call to the booking search service. Instead we will return a mocked value.
    // Will also use setTimeout to simulate network delay
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
