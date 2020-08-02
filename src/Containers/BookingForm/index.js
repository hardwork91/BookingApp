import React, { Component } from "react";
import moment from "moment";
import { Form, Row, Icon, Button, Tooltip, DatePicker } from "antd";
import FlightTypeSelector from "../../components/FlightTypeSelector";
import { ROUND_TRIP } from "../../components/FlightTypeSelector/constants";
import PassengersSelector from "../../components/PassengersSelector";
import { PASSENGERS_INITIAL_VALUE } from "../../components/PassengersSelector/constants";
import TravelClassSelector from "../../components/TravelClassSelector";
import { ECONOMY } from "../../components/TravelClassSelector/constants";
import AirfieldSearcher from "../../components/AirfieldSearcher";
import { generatePassengerSelectorLabel } from "../../components/PassengersSelector/utils";

const { RangePicker } = DatePicker;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class BookingForm extends Component {
  getDisabledTime = current => {
    // Can not select days before today and today
    return (
      current &&
      (current < moment().subtract(1, "d") ||
        current >
          moment()
            .add(1, "y")
            .subtract(1, "d"))
    );
  };

  handleSubmit = e => {
    console.log("DOING SUBMIT");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleSwapAirfields = () => {
    const { form } = this.props;
    const originValue = form.getFieldValue("Origin");
    const destinationValue = form.getFieldValue("Destination");

    console.log("handleSwapAirfields", originValue, destinationValue);
    form.setFieldsValue({ Origin: destinationValue, Destination: originValue });
  };

  render() {
    const {
      form: {
        getFieldDecorator,
        getFieldValue,
        getFieldsValue,
        getFieldsError,
      },
    } = this.props;

    console.log("fields", getFieldsValue());
    const {
      origin: originErrors,
      destination: destinationErrors,
      date: dateErrors,
    } = getFieldsError(["origin", "destination", "date"]);

    const passengersValue = getFieldValue("passengers");
    const travelersAmount = generatePassengerSelectorLabel(passengersValue)
      .amount;

    const shouldDisableSearchButton =
      travelersAmount === 0 || originErrors || destinationErrors || dateErrors;

    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        style={{
          padding: "10px 7px 16px 25px",
          backgroundColor: "aliceblue",
        }}
      >
        <Row type="flex" justify="start">
          <Form.Item>
            {getFieldDecorator("flightType", {
              rules: [
                { required: true, message: "Please select a flight type!" },
              ],
              initialValue: ROUND_TRIP,
            })(<FlightTypeSelector />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("passengers", {
              rules: [
                {
                  required: true,
                  message: "Please select a number of passengers!",
                },
              ],
              initialValue: PASSENGERS_INITIAL_VALUE,
            })(<PassengersSelector />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("travelClass", {
              rules: [
                { required: true, message: "Please select a travel class!" },
              ],
              initialValue: ECONOMY,
            })(<TravelClassSelector />)}
          </Form.Item>
        </Row>
        <Row type="flex" justify="start" style={{}}>
          <Form.Item>
            {getFieldDecorator("origin", {
              rules: [{ required: true, message: "Please select an origin!" }],
            })(<AirfieldSearcher placeholder="From?" />)}
          </Form.Item>
          <Tooltip title="Swap origin and destination" mouseEnterDelay={1}>
            <Button
              type="link"
              disabled={false}
              icon="swap"
              onClick={this.handleSwapAirfields}
              style={{ marginRight: "16px" }}
            />
          </Tooltip>
          <Form.Item>
            {getFieldDecorator("destination", {
              rules: [
                { required: true, message: "Please select a destination!" },
              ],
            })(<AirfieldSearcher placeholder="Where?" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("date", {
              rules: [
                {
                  required: true,
                  message: "Please select departure and return date!",
                },
              ],
            })(
              <RangePicker
                disabledDate={this.getDisabledTime}
                format="ddd, MM/DD"
                placeholder={["Departure Date", "Return Date"]}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={shouldDisableSearchButton}
              icon="search"
            >
              Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }
}

export default Form.create({})(BookingForm);
