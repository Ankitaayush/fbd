import React, { useState } from 'react';
import Select from 'react-select';
import '../public/vecti.css'; // Import the CSS file

const VendorInteraction = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    email: '',
    contactPerson: '',
    phone: '',
    selectedItems: [],
    selectedItemsIds: [],
  });

  const [vendorId, setVendorId] = useState(null);

  const allItems = [
    { id: 1, label: 'Item 1', value: 'Item 1' },
    { id: 2, label: 'Item 2', value: 'Item 2' },
    { id: 3, label: 'Item 3', value: 'Item 3' },
    { id: 4, label: 'Item 4', value: 'Item 4' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedItems = selectedOptions.map((option) => option.value);
    const selectedItemsIds = selectedOptions.map((option) => option.id);

    setFormData((prevData) => ({
      ...prevData,
      selectedItems,
      selectedItemsIds,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a unique vendor ID (you can use a library like uuid for this)
    const newVendorId = generateUniqueId();
    setVendorId(newVendorId);

    // Now you can include the vendorId in your form data or perform any other actions
    const formDataWithId = { ...formData, vendorId: newVendorId };
    console.log('Form data submitted:', formDataWithId);

    // Perform any other actions with the formDataWithId, such as sending it to the server
    // or updating the state in the parent component.
  };

  const handleDelete = () => {
    // Implement delete functionality here
    console.log('Delete request initiated.');
  };

  const options = allItems.map((item) => ({ value: item.value, label: item.label, id: item.id }));

  const generateUniqueId = () => {
    // Logic to generate a unique ID, you can use a library like uuid or a custom logic
    // For simplicity, using a timestamp as an example
    return new Date().getTime().toString();
  };

  return (
    <form className="vendor-form" onSubmit={handleSubmit}>
      <label>
        Vendor Name:
        <input type="text" name="vendorName" value={formData.vendorName} onChange={handleChange} required />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>

      <label>
        Contact Person:
        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
      </label>

      <label>
        Phone No:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>

      <label>
        Items:
        <Select
          isMulti
          name="selectedItems"
          options={options}
          value={options.filter((option) => formData.selectedItems.includes(option.value))}
          onChange={handleSelectChange}
          required
        />
      </label>

      <button type="submit">Update</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </form>
  );
};

export default VendorInteraction;