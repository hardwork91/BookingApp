import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Tooltip } from "antd";
import AmountSelector from "./AmountSelector";
import { generatePassengerSelectorLabel } from "./utils";
import { PASSENGERS_CATEGORIES } from "./constants";
import { TOOLTIP_DELAY } from "../../Containers/BookingForm/constants";

export default class PassengersSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      passengers: props.value,
    };
  }

  // the visibility must be controlled manually to avoid getting the menu closed when the input number is clicked
  handleVisibleChange = flag => {
    // the visibility is stored in the component state
    this.setState({ visible: flag });
  };

  // when the amout of any category changes, it must be updated in the state and also update form item value.
  handleAmountChange = (category, amount) => {
    const { onChange, handleClearResults } = this.props;
    const passengers = { ...this.state.passengers, [category]: amount };
    this.setState(
      {
        passengers,
      },
      () => {
        // update the form field value
        onChange(passengers);
        // on value change, the booking results must be cleared
        handleClearResults();
      }
    );
  };

  // prevent default <a/> tag behavior
  handleOnClick = e => e.preventDefault();

  // render the menu using the PASSENGERS_CATEGORIES preset list of categories
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
    // The control label is generated depending on how many passengers and categories the user selects
    const { label } = generatePassengerSelectorLabel(this.state.passengers);

    return (
      // use a tooltip for helping users to understand what means this control
      <Tooltip title="Passengers" mouseEnterDelay={TOOLTIP_DELAY}>
        <Dropdown
          disabled={this.props.disabled}
          overlay={this.renderMenu()}
          trigger={["click"]}
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <a className="ant-dropdown-link" onClick={this.handleOnClick}>
            {label}
            <Icon type="down" />
          </a>
        </Dropdown>
      </Tooltip>
    );
  }
}

// prop types validation
PassengersSelector.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  handleClearResults: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
