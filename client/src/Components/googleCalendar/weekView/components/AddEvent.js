import React from "react";
import { Input, DatePicker } from "antd";
import moment from "moment";
import { inputStyles } from "../styles";
import "moment/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

const { RangePicker } = DatePicker;

function AddEvent(props) {
  return (
    <React.Fragment>
      <Input //TODO: Necesitamos cambiar este input por un selector de la cantidad de cupos a asignar a esa hora
        type="number"
        placeholder=" Número de cupos para esta hora "
        value={props.title}
        style={inputStyles}
        size="large"
        autoFocus={true}
        onChange={props.onTitleChange}
      />
      <RangePicker
        locale={locale}
        style={{ width: "100%" }}
        value={[moment(props.start), moment(props.end)]}
        onChange={props.onTimeChange}
        showTime={{
          format: "HH:mm",
          hourStep: 1,
          minuteStep: 30,
          defaultValue: [moment(props.start), moment(props.end)]
        }}
        format="MMM Do, YYYY hh:mm a"
      />
    </React.Fragment>
  );
}

export default AddEvent;
