import React, { useState } from 'react';
import styles from '../css/requestInput.css';
const RequestInput = () => {
 let onSubmit=()=>{console.log("hello")} ;
  let items=[{itid:1,item_name:'item 1'},{itid:2,item_name:'item 2'},{itid:3,item_name:'item 3'},{itid:4,item_name:'item 4'}];
  const [name, setName] = useState('');
  const [formFields, setFormFields] = useState([{ item: '', specification: '', quantity: '' }]);

  const handleInputChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
  };

  const handleAddRow = () => {
    setFormFields([...formFields, { item: '', specification: '', quantity: '' }]);
  };

  const handleDeleteRow = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    // Validate the form or perform any other necessary actions
    onSubmit({ name, items: formFields });
  };

  return (
    <div>
      <div className="request-input-container">
        <label className="request-input-label">Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {formFields.map((field, index) => (
        <div key={index} className="request-input-row">
          <label>Item:</label>
          <select
            value={field.item}
            onChange={(e) => handleInputChange(index, 'item', e.target.value)}
          >
            <option value="" disabled>Select an item</option>
            {items.map((item) => (
              <option key={item.itid} value={item.itid}>
                {item.item_name}
              </option>
            ))}
          </select>
          <label>Specification:</label>
          <input
            type="text"
            value={field.specification}
            placeholder="Specification"
            onChange={(e) => handleInputChange(index, 'specification', e.target.value)}
          />
          <label>Quantity:</label>
          <input
            type="text"
            value={field.quantity}
            placeholder="Quantity"
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
          />
          <button onClick={() => handleDeleteRow(index)}>Delete</button>
        </div>
      ))}
      <div style={{ textAlign: 'left' }}>
        <button onClick={handleAddRow} className="request-input-button">Add Row</button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleSubmit} className="request-input-button">Submit</button>
      </div>
    </div>
  );
};

export default RequestInput;
