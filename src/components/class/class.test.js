import React from "react";
import { shallow } from "enzyme";
import Class from "./class";

describe("Class", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Class />);
    expect(wrapper).toMatchSnapshot();
  });
});
