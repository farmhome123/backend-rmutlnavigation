import React from "react";
import { shallow } from "enzyme";
import NewsCreate from "./newsCreate";

describe("NewsCreate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NewsCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
