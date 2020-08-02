import React, { Component } from "react";
import { Icon, Menu, Dropdown, Tooltip } from "antd";
import AmountSelector from "./AmountSelector";
import { generatePassengerSelectorLabel } from "./utils";
import { PASSENGERS_CATEGORIES } from "./constants";

export default class PassengersSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      passengers: props.value,
    };
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  handleAmountChange = (category, amount) => {
    const passengers = { ...this.state.passengers, [category]: amount };
    this.setState(
      {
        passengers,
      },
      this.props.onChange(passengers)
    );
  };

  renderMenu = () => (
    <Menu>
      {PASSENGERS_CATEGORIES.map(category => {
        return (
          <Menu.Item key={category}>
            <AmountSelector
              category={category}
              amount={this.state.passengers[category]}
              onChange={this.handleAmountChange}
            />
          </Menu.Item>
        );
      })}
    </Menu>
  );

  render() {
    const { label } = generatePassengerSelectorLabel(this.state.passengers);

    return (
      <Tooltip title="Passengers" mouseEnterDelay={1}>
        <Dropdown
          overlay={this.renderMenu()}
          trigger={["click"]}
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {label}
            <Icon type="down" />
          </a>
        </Dropdown>
      </Tooltip>
    );
  }
}