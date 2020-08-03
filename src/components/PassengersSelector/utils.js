import React from "react";
import { Typography, Popover, Icon } from "antd";

const { Text } = Typography;

/* displayed label of passengers selector control changes acording the selected categories.
 * this functions iterates over the current selected passengers and defines which is the propertly label to use.
 * gramatical sintaxis could be better, but we decide to keep it as simple as possible.
 */
export const generatePassengerSelectorLabel = passengers => {
  let categoriesWithAmount = 0;
  let totalAmount = 0;
  let singleCategory;
  for (const category in passengers) {
    const amount = passengers[category];
    if (amount > 0) {
      // check if there are more than one category selected
      categoriesWithAmount++;
      singleCategory = category;
    }
    totalAmount += amount;
  }

  // For correct gramatical sintaxis shuld be propertly to use formatMessage form React-intl.And usig formatters like "plural".
  // In this exaple we are not using it in order to keep the aplication simple due to internacionalization is not mandatory.
  let label =
    categoriesWithAmount > 1
      ? `${totalAmount} Travelers`
      : `${totalAmount} ${singleCategory}`;

  // if there is any category selected, the font color is marked in red. Alsoa a warning message is displayed over the componet to help color blind users.
  if (categoriesWithAmount === 0) {
    label = (
      <Popover
        content={
          <span>
            <Icon
              type="warning"
              style={{ color: "#f5222d", marginRight: "10px" }}
            />
            You must select at least one passenger
          </span>
        }
        trigger="click"
        defaultVisible
      >
        <Text type="danger">{`${totalAmount} Travelers`}</Text>
      </Popover>
    );
  }

  return {
    label,
    amount: totalAmount,
  };
};
