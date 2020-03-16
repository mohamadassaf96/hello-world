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

test("Input works", () => {
  const wrapper = mount(<App />);
  wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} });
  wrapper.find("button").simulate("submit");
  (expect(wrapper.find("ShoppingList").at(0).contains("oranges"))).toBeTruthy();
});

test("Empty input works", () => {
  const wrapper = mount(<App />);
  wrapper.find("input").at(0).simulate("change", { target: {value: ""} });
  wrapper.find("button").simulate("submit");
  expect(wrapper.state().items.length).toEqual(0);
});

test("search works", () => {
  const wrapper = mount(<App />);
  wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} } );
  wrapper.find("button").simulate("submit");
  wrapper.find("input").at(0).simulate("change", { target: {value: "apples"} } );
  wrapper.find("button").simulate("submit");
  wrapper.find("input").at(0).simulate("change", { target: {value: "watermelon"} } );
  wrapper.find("button").simulate("submit");
  expect(wrapper.find("ShoppingList").contains("oranges")).toBeTruthy();
  expect(wrapper.find("ShoppingList").contains("apples")).toBeTruthy();
  expect(wrapper.state().items.length).toEqual(3);
  wrapper.find("input").at(1).simulate("change", { target: {value: "or"} } );
  expect(wrapper.find("ShoppingList").contains("oranges")).toBeTruthy();
  expect(wrapper.state().filteredItems.length).toEqual(1);
});

test("Empty search works", () => {
  const wrapper = mount(<App />);
  wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} } );
  wrapper.find("button").simulate("submit");
  wrapper.find("input").at(0).simulate("change", { target: {value: "apples"} } );
  wrapper.find("button").simulate("submit");
  wrapper.find("input").at(0).simulate("change", { target: {value: "watermelon"} } );
  wrapper.find("button").simulate("submit");
  wrapper.find("input").at(1).simulate("change", { target: {value: ""} } );
  expect(wrapper.state().filteredItems.length).toEqual(3);
});

