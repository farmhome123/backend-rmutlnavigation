import React from "react";
import { shallow } from "enzyme";
import Evens from "./evens";

describe("Evens", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Evens />);
    expect(wrapper).toMatchSnapshot();
  });
});
