import React from "react";
import { shallow } from "enzyme";
import EvensCreate from "./evensCreate";

describe("EvensCreate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EvensCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
