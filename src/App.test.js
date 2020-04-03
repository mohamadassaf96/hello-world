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
let wrapper = null;

describe('App Component', function () {

  beforeEach(() => {
    wrapper = mount(
            <App />
        );
  });

  test('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Input works", () => {
    wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} });
    wrapper.find("button").at(1).simulate("submit");
    (expect(wrapper.find("ShoppingList").at(0).contains("oranges"))).toBeTruthy();
  });

  test("Empty input works", () => {
    wrapper.find("input").at(0).simulate("change", { target: {value: ""} });
    wrapper.find("button").at(1).simulate("submit");
    expect(wrapper.state().items.length).toEqual(0);
  });

  test("search works", () => {
    wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} } );
    wrapper.find("button").at(1).simulate("submit");
    wrapper.find("input").at(0).simulate("change", { target: {value: "apples"} } );
    wrapper.find("button").at(1).simulate("submit");
    wrapper.find("input").at(0).simulate("change", { target: {value: "watermelon"} } );
    wrapper.find("button").at(1).simulate("submit");
    expect(wrapper.find("ShoppingList").contains("oranges")).toBeTruthy();
    expect(wrapper.find("ShoppingList").contains("apples")).toBeTruthy();
    expect(wrapper.state().items.length).toEqual(3);
    wrapper.find("input").at(1).simulate("change", { target: {value: "or"} } );
    expect(wrapper.find("ShoppingList").contains("oranges")).toBeTruthy();
    expect(wrapper.state().filteredItems.length).toEqual(1);
  });

  test("Empty search works", () => {
    wrapper.find("input").at(0).simulate("change", { target: {value: "oranges"} } );
    wrapper.find("button").at(1).simulate("submit");
    wrapper.find("input").at(0).simulate("change", { target: {value: "apples"} } );
    wrapper.find("button").at(1).simulate("submit");
    wrapper.find("input").at(0).simulate("change", { target: {value: "watermelon"} } );
    wrapper.find("button").at(1).simulate("submit");
    wrapper.find("input").at(1).simulate("change", { target: {value: ""} } );
    expect(wrapper.state().filteredItems.length).toEqual(3);
  });
});

