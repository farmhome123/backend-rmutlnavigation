import React from "react";
import { shallow } from "enzyme";
import NewsEdit from "./newsEdit";

describe("NewsEdit", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NewsEdit />);
    expect(wrapper).toMatchSnapshot();
  });
});
