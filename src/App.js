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
        <ShoppingList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new item">
            What do you need to buy?
          </label>
          <input
            id="new item"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <form>
          <label htmlFor="search item">
            Search for
          </label>
          <input 
          id="search item"
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
    this.setState({ search: e.target.value });

    if (this.state.search.length === 0) {
      this.state.filteredItems = [];
      return;
    }
    this.state.filteredItems = this.state.items.filter(
      (item) => {
        return item.text.indexOf(this.state.search) !== -1;
      }  
    );
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