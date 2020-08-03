import React, { Component } from "react";
import { Icon, Menu, Dropdown, Tooltip } from "antd";
import { TRAVEL_CLASES } from "./constants";
import { TOOLTIP_DELAY } from "../../Containers/BookingForm/constants";

export default class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleSelect = ({ key }) => {
    this.setState({ value: key }, this.props.onChange(key));
  };

  renderMenu = () => (
    <Menu selectedKeys={this.state.value} onClick={this.handleSelect}>
      {this.props.options.map(option => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  render() {
    return (
      <Tooltip title={this.props.title} mouseEnterDelay={TOOLTIP_DELAY}>
        <Dropdown overlay={this.renderMenu()} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {this.state.value} <Icon type="down" />
          </a>
        </Dropdown>
      </Tooltip>
    );
  }
}
