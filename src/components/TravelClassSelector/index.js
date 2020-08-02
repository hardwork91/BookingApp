import React, { Component } from "react";
import { Icon, Menu, Dropdown, Tooltip } from "antd";
import { TRAVEL_CLASES } from "./constants";

export default class TravelClassSelector extends Component {
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
      {TRAVEL_CLASES.map(travelClass => (
        <Menu.Item key={travelClass}>{travelClass}</Menu.Item>
      ))}
    </Menu>
  );

  render() {
    return (
      <Tooltip title="Travel class" mouseEnterDelay={1}>
        <Dropdown overlay={this.renderMenu()} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {this.state.selectedType} <Icon type="down" />
          </a>
        </Dropdown>
      </Tooltip>
    );
  }
}
