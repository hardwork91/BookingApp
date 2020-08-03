import React, { Component } from "react";
import PropTypes from "prop-types";
import { InputNumber, Typography } from "antd";
import * as constants from "./constants";

const { Text } = Typography;

export default class AmountSelector extends Component {
  handleChange = value => {
    const { category, onChange } = this.props;
    onChange(category, value);
  };

  render() {
    const { category, amount } = this.props;
    return (
      <div>
        <Text style={{ marginRight: ".5em" }}>{category}</Text>
        <Text type="secondary">
          {constants[`${category.toUpperCase()}_DESCRIPTION`]}
        </Text>
        <InputNumber
          style={{ float: "right", marginLeft: "1em" }}
          size="small"
          min={0}
          defaultValue={amount}
          onChange={this.handleChange}
          precision={0}
        />
      </div>
    );
  }
}

AmountSelector.propTypes = {
  category: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};
