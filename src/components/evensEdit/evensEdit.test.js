import React from "react";
import { shallow } from "enzyme";
import EvensEdit from "./evensEdit";

describe("EvensEdit", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EvensEdit />);
    expect(wrapper).toMatchSnapshot();
  });
});
