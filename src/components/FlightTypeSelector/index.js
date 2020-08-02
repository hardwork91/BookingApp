import React, { Component } from "react";
import { Icon, Menu, Dropdown, Tooltip } from "antd";
import { FLIGHT_TYPES } from "./constants";

export default class FlightTypeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.value,
    };
  }

  handleSelect = ({ key }) => {
    this.setState({ selectedType: key }, this.props.onChange(key));
  };

  renderMenu = () => (
    <Menu selectedKeys={this.state.selectedType} onClick={this.handleSelect}>
      {FLIGHT_TYPES.map(type => (
        <Menu.Item key={type}>{type}</Menu.Item>
      ))}
    </Menu>
  );

  render() {
    return (
      <Tooltip title="Flight type" mouseEnterDelay={1}>
        <Dropdown overlay={this.renderMenu()} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {this.state.selectedType} <Icon type="down" />
          </a>
        </Dropdown>
      </Tooltip>
    );
  }
}
