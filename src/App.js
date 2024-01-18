// App.js
import React, { useState } from 'react';
import ItemCategoryList from './components/ItemCategoryList';
import ItemCategoryForm from './components/ItemCategoryForm';

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems([...items, { id: Date.now(), ...newItem }]);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>Item Management</h1>
      <ItemCategoryList items={items} onDeleteItem={handleDeleteItem} />
      <ItemCategoryForm onAddItem={handleAddItem} />
    </div>
  );
}

export default App;

// src/App.js
// import React from 'react';
// import VendorInteraction from './components/VendorInteraction';

// function App() {
//   const handleRequestInitiate = (request) => {
//     console.log('Procurement request initiated:', request);
//   };

//   return (
//     <div>
//       <h1>Automated Asset Procurement System</h1>
//       <VendorInteraction onRequestInitiate={handleRequestInitiate} />
//       {/* Add other components as needed */}
//     </div>
//   );
// }

// export default App;

