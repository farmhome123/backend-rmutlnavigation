import React from "react";
import { shallow } from "enzyme";
import BuildingCreate from "./buildingCreate";

describe("BuildingCreate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BuildingCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
