import React, { Suspense } from 'react';
import ShoppingList from "./ShoppingList.js"
import Tour from 'reactour';

const steps = [
  {
    selector: '.first-step',
    content: 'Welcome to Shopping List Manager!',
  },
  {
    selector: '[data-tut="reactour_item"]',
    content: 'Type the name of the item here',
    position: 'right',
  },
  {
    selector: '[data-tut="reactour_submit"]',
    content: 'Press this button to add to the list',
    position: 'right',
  },
  {
    selector: '[data-tut="reactour_search"]',
    content: 'Use this form to search to filter list items',
    position: 'right',
  },
]

class App extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = { items: [], filteredItems: [], text: '', search: '', isTourOpen: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  setOpen = (b) => 
  {
    this.setState({isTourOpen: b});
  }

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.handleClick} style={{margin: 20, fontSize: 15}}>
            Start tutorial
          </button>
        </div>
        <h3 style={{textAlign: "center"}}>Shopping List</h3>
        <form style={{textAlign: "center"}} onSubmit={this.handleSubmit}>
          <label htmlFor="new_item">
            What do you need to buy?
          </label>
          <input data-tut="reactour_item" style={{marginLeft: 10}}
            id="new_item"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button data-tut="reactour_submit">
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <form 
          style={{textAlign: "center", marginTop: 20}} 
          className="search-form"
        >
          <label htmlFor="search_item">
            Search for
          </label>
          <input
          id="search_item"
          value={this.state.search}
          onChange={this.updateSearch}
          style={{marginLeft: 10}}
          data-tut="reactour_search" 
          />
        </form>
        <ShoppingList items={this.state.filteredItems} />
      <Suspense fallback={<React.Fragment />}>
        <Tour
          steps={steps}
          isOpen={this.state.isTourOpen}
          onRequestClose={() => this.setOpen(false)}
          />
      </Suspense>
      </div>
    );
  }

  handleChange(e) 
  {
    this.setState({ text: e.target.value });
  }

  handleClick = () => 
  {
    this.setOpen(true);
  }

  updateSearch(e) 
  {
    let tempFilteredItems = e.target.value.length === 0 ? this.state.items : this.state.items.filter(
      (item) => {
        return item.text.indexOf(e.target.value) !== -1;
      }  
    );
    this.setState({ search: e.target.value });
    this.setState({ filteredItems: tempFilteredItems});
  }

  handleSubmit(e) 
  {
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

export default App;