import React from "react";
import { shallow } from "enzyme";
import News from "./news";

describe("News", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<News />);
    expect(wrapper).toMatchSnapshot();
  });
});
