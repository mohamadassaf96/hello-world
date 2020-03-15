import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Simulate from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("input works", () => {
  const wrapper = shallow(<App />);
  wrapper.find("input").at(0).simulate("onChange", { target: { id: 'new item', value: "oranges" } } );
  wrapper.find("button").at(0).simulate("click");
  wrapper.find("ShoppingList").at(0).contains("oranges");
});

test("search works", () => {
  const wrapper = shallow(<App />);
  wrapper.find("input").at(0).simulate("onChange", { target: { id: 'new item', value: "oranges" } } );
  wrapper.find("button").at(0).simulate("click");
  wrapper.find("ShoppingList").at(0).contains("oranges");
  wrapper.find("input").at(1).simulate("onChange", { target: { id: 'search item', value: "or" } } );
  wrapper.find("ShoppingList").at(1).contains("oranges");
});