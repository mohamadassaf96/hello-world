import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], filteredItems: [], text: '', search: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Shopping List</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new_item">
            What do you need to buy?
          </label>
          <input
            id="new_item"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <form>
          <label htmlFor="search_item">
            Search for
          </label>
          <input 
          id="search_item"
          value={this.state.search}
          onChange={this.updateSearch}
          />
        </form>
        <ShoppingList items={this.state.filteredItems} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  updateSearch(e) {
    let dummy = [];
    dummy = e.target.value.length === 0 ? this.state.items : this.state.items.filter(
      (item) => {
        return item.text.indexOf(e.target.value) !== -1;
      }  
    );
    this.setState({ search: e.target.value });
    this.setState({ filteredItems: dummy});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      filteredItems: state.items.concat(newItem),
      text: ''
    }));
  }

}

class ShoppingList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default App;