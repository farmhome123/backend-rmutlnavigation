import React from "react";
import { shallow } from "enzyme";
import Building from "./building";

describe("Building", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Building />);
    expect(wrapper).toMatchSnapshot();
  });
});
