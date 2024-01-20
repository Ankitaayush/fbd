// ItemCategoryList.js
import React from 'react';
import '../public/ItemCategoryForm.css'; // Import the CSS file
const ItemCategoryList = ({ items, onDeleteItem }) => {
  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => onDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCategoryList;
