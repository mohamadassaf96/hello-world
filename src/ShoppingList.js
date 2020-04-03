import React from 'react';

export class ShoppingList extends React.Component 
{
  render() {
    return (
      <ul style={{textAlign: "center", listStyleType: "none"}} className="container">
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default ShoppingList;