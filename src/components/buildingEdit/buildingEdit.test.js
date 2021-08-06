import React from "react";
import { shallow } from "enzyme";
import BuildingEdit from "./buildingEdit";

describe("BuildingEdit", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BuildingEdit />);
    expect(wrapper).toMatchSnapshot();
  });
});
