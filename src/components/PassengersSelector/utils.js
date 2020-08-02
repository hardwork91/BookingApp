import React from "react";
import { Typography, Popover } from "antd";

const { Text } = Typography;

export const generatePassengerSelectorLabel = passengers => {
  let categoriesWithAmount = 0;
  let totalAmount = 0;
  let singleCategory;
  for (const category in passengers) {
    const amount = passengers[category];
    if (amount > 0) {
      categoriesWithAmount++;
      singleCategory = category;
    }
    totalAmount += amount;
  }

  // For correct gramatical sintaxis shuld be propertly to use formatMessage form React-intl. Usig formatters like "plural".
  // In this exaple we are not using it in order to keep the aplication simple due to internacionalization is not mandatory.
  let label =
    categoriesWithAmount > 1
      ? `${totalAmount} Travelers`
      : `${totalAmount} ${singleCategory}`;

  if (categoriesWithAmount === 0) {
    label = (
      <Popover
        content="You must select at least one passenger"
        trigger="click"
        defaultVisible
      >
        <Text type="danger">{`${totalAmount} Travelers`}</Text>{" "}
      </Popover>
    );
  }

  return {
    label,
    amount: totalAmount,
  };
};
