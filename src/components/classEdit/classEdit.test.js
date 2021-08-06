import React from "react";
import { shallow } from "enzyme";
import ClassEdit from "./classEdit";

describe("ClassEdit", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ClassEdit />);
    expect(wrapper).toMatchSnapshot();
  });
});
