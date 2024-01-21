import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../public/vecti.css'; // Import the CSS file

const VendorInteraction = ({ initialData, key }) => {
  const [formData, setFormData] = useState(
   initialData
  );

  const [vendorId, setVendorId] = useState(key);

  // Extract selectedItems from initialData and set it initially
  useEffect(() => {
    if (initialData && initialData.selectedItems) {
      setFormData((prevData) => ({
        ...prevData,
        selectedItems: initialData.selectedItems,
      }));
    }
  }, [initialData]);

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
    setFormData((prevData) => ({
      ...prevData,
      selectedItems,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithId = { vid: vendorId, ...formData };
    console.log('Form data submitted:', formDataWithId);
  };

  const handleDelete = () => {
    console.log('Delete request initiated.');
    // Implement delete functionality here
  };

  const options = allItems.map((item) => ({ value: item.value, label: item.label, id: item.id }));

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
