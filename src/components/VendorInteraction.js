// // src/components/VendorInteraction.js
// import React, { useState } from 'react';

// const VendorInteraction = ({ onRequestInitiate }) => {
//   const [item, setItem] = useState('');
//   const [quantity, setQuantity] = useState('');

//   const handleInitiateRequest = async () => {
//     if (item && quantity) {
//       // Simulate frontend request initiation
//       onRequestInitiate({ item, quantity });

//       // Simulate backend API call to contact vendors
//       try {
//         const response = await fetch('/api/contactVendors', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ item, quantity }),
//         });

//         if (response.ok) {
//           console.log('Vendors contacted successfully.');
//         } else {
//           console.error('Failed to contact vendors.');
//         }
//       } catch (error) {
//         console.error('Error contacting vendors:', error);
//       }

//       setItem('');
//       setQuantity('');
//     }
//   };

//   return (
//     <div>
//       <h2>Vendor Interaction</h2>
//       <form>
//         <label>
//           Item:
//           <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
//         </label>
//         <label>
//           Quantity:
//           <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
//         </label>
//         <button type="button" onClick={handleInitiateRequest}>
//           Initiate Request and Contact Vendors
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VendorInteraction;

import React, { useState } from 'react';
import Select from 'react-select';
import '../public/vecti.css'; // Import the CSS file

const VendorForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    email: '',
    contactPerson: '',
    phone: '',
    selectedItems: [],
  });

  const allItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

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
    console.log('Form data submitted:', formData);
  };

  const options = allItems.map((item) => ({ value: item, label: item }));

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

      <button type="submit">Submit</button>
    </form>
  );
};

export default VendorForm;
