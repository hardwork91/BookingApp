import React, { Component, Fragment } from "react";
import { InputNumber, Typography } from "antd";
import * as constants from "./constants";

const { Text } = Typography;

export default class AmountSelector extends Component {
  handleChange = value => {
    const { category, onChange } = this.props;
    onChange(category, value);
  };

  render() {
    const { category, amount, onChange } = this.props;
    return (
      <Fragment style={{ float: "right" }}>
        <Text style={{ marginRight: ".5em" }}>{category}</Text>
        <Text type="secondary">
          {constants[`${category.toUpperCase()}_DESCRIPTION`]}
        </Text>
        <InputNumber
          style={{ float: "right", marginLeft: "1em" }}
          size="small"
          min={0}
          defaultValue={this.props.amount}
          onChange={this.handleChange}
          precision={0}
        />
      </Fragment>
    );
  }
}
