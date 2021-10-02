import React from "react";
import { shallow } from "enzyme";
import Menusystem from "./menusystem";

describe("Menusystem", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Menusystem />);
    expect(wrapper).toMatchSnapshot();
  });
});
