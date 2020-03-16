import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Simulate from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("input works", () => {
  const wrapper = mount(<App />);
  wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} });
  wrapper.find("button").simulate("submit");
  (expect(wrapper.find("ShoppingList").at(0).contains("oranges"))).toBeTruthy();
});

test("search works", () => {
  const wrapper = mount(<App />);
  wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} } );
  wrapper.find("button").simulate("submit");
  wrapper.find("input").at(0).simulate("change", { target: {value: "apples"} } );
  wrapper.find("button").simulate("submit");
  expect(wrapper.find("ShoppingList").contains("oranges")).toBeTruthy();
  wrapper.find("input").at(1).simulate("change", { target: {value: "or"} } );
  expect(wrapper.find("ShoppingList").contains("oranges")).toBeTruthy();
});