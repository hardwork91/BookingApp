import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Tooltip } from "antd";
import { TOOLTIP_DELAY } from "../../Containers/BookingForm/constants";

export default class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  // set the selected key (which match with label) on the state to display it as label of the dropdown
  handleSelect = ({ key }) => {
    const { onChange, handleClearResults } = this.props;
    this.setState({ value: key }, () => {
      // also update the form field value
      onChange(key);
      // on option value change, the booking results must be cleared
      handleClearResults();
    });
  };

  // prevent default <a/> tag behavior
  handleOnClick = e => e.preventDefault();

  // render the menu with the suplied prop options. In this case options are an array of key-labels
  renderMenu = () => (
    <Menu selectedKeys={this.state.value} onClick={this.handleSelect}>
      {this.props.options.map(option => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  render() {
    const { disabled, title } = this.props;
    return (
      // use a tooltip for helping users to understand what means this control
      <Tooltip title={title} mouseEnterDelay={TOOLTIP_DELAY}>
        <Dropdown
          overlay={this.renderMenu()}
          trigger={["click"]}
          disabled={disabled}
        >
          <a className="ant-dropdown-link" onClick={this.handleOnClick}>
            {this.state.value} <Icon type="down" />
          </a>
        </Dropdown>
      </Tooltip>
    );
  }
}

// prop types validation
DropdownSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  handleClearResults: PropTypes.func.isRequired,
};
