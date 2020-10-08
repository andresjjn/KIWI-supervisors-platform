import { Row, Col, Button, Tooltip } from "antd";
import {
  CalendarOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import React from "react";
import {
  toolbar,
  toolbarDate,
  appTitle,
  alignRight,
  spacify,
  weekButtons
} from "../styles";
import moment from "moment";

function WeekToolbar(props) {
  const formattedDate = moment(props.startDate).format("MMM YYYY");
  return (
    <Row type="flex" gutter={4} style={toolbar}>
      <Col span={6} offset={3} style={appTitle}>
        <CalendarOutlined />
        Kiwi Booking
      </Col>
      <Col span={3} offset={8} style={alignRight}>
        <Tooltip placement="topLeft" title={moment().format("dddd, MMM D")}>
          <Button onClick={props.goToToday}>Hoy</Button>
        </Tooltip>
      </Col>

      <Col span={2} style={weekButtons}>
        <LeftOutlined style={spacify} onClick={props.goToPreviousWeek} />
        <RightOutlined style={spacify} onClick={props.goToNextWeek} />
      </Col>

      <Col span={2} style={toolbarDate}>
        {formattedDate}
      </Col>
    </Row>
  );
}

export default WeekToolbar;
