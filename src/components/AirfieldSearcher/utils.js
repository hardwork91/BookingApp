export const mergeData = ({ ...selectedData }, [...data]) => {
  data.map(({ apicode }) => {
    // if data element exists on selectedData, it must be deleted form selectedData in order to avoid being duplicated
    if (selectedData[apicode]) {
      delete selectedData[apicode];
    }
  });
  Object.entries(selectedData).map(element => {
    const [apicode, rest] = element;
    data.splice(0, 0, { ...rest, apicode });
  });
  return data;
};
