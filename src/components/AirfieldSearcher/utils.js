/* this fuctions receives the current selected airfields and the data received from the search airfield API
 * and merges into a single array to be iterated by the functions that renders the select options.
 * Notice that spred operator is used with the two params, that is because a copy of them must be made,
 * so, the operatios "delete" and "splice", does not modify the original "selectedData" and "data" values.
 */
export const mergeData = ({ ...selectedData }, [...data]) => {
  data.map(({ apicode }) => {
    // if data element exists on selectedData, it must be deleted form selectedData in order to avoid being duplicated
    if (selectedData[apicode]) {
      delete selectedData[apicode];
    }
  });
  // then, the remains elements in selectedData are add at the top of the array
  Object.entries(selectedData).map(element => {
    const [apicode, rest] = element;
    data.splice(0, 0, { ...rest, apicode });
  });
  return data;
};
