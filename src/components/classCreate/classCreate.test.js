import React from "react";
import { shallow } from "enzyme";
import ClassCreate from "./classCreate";

describe("ClassCreate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ClassCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
