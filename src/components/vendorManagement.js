import React, { useState } from 'react';
import VendorForm from './VendorInteraction';
import VendorInteraction from './UpadteVendor';
import '../css/vendorManagement.css';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    { vid: 1, vendorName: 'Vendor 1', email: 'vendor1@example.com', contactPerson: 'Person 1', phone: '123', selectedItems: ['Item 1', 'Item 2'] },
    { vid: 2, vendorName: 'Vendor 2', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 3, vendorName: 'Vendor 3', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 4, vendorName: 'Vendor 4', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 5, vendorName: 'Vendor 5', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 6, vendorName: 'Vendor 6', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 7, vendorName: 'Vendor 7', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 71, vendorName: 'Vendor 8', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 72, vendorName: 'Vendor 9', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
    { vid: 17, vendorName: 'Vendor 10', email: 'vendor2@example.com', contactPerson: 'Person 2', phone: '456', selectedItems: ['Item 3', 'Item 4'] },
  ]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleAddNewVendor = () => {
    setSelectedVendor(null);
  };

  const handleFormSubmit = (formData) => {
    if (selectedVendor) {
      const updatedVendors = vendors.map((vendor) =>
        vendor.vid === selectedVendor.vid ? { ...vendor, ...formData } : vendor
      );
      setVendors(updatedVendors);
    } else {
      const newVendor = { vid: vendors.length + 1, ...formData };
      setVendors([...vendors, newVendor]);
    }

    setSelectedVendor(null);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vendor-management">
      <div className="vendor-list">
        <h2>Vendors</h2>
        <input
          type="text"
          placeholder="Search by vendor name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`vendorButton ${selectedVendor === null ? 'selected' : ''}`}
          onClick={handleAddNewVendor}
        >
          Add New Vendor
        </button>
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.vid}
            className={`vendor-card ${selectedVendor === vendor ? 'selected' : ''}`}
            onClick={() => handleVendorClick(vendor)}
          >
            {vendor.vendorName}
          </div>
        ))}
      </div>

      <div className="vendor-form">
        {selectedVendor ? (
          <VendorInteraction initialData={selectedVendor} key={selectedVendor.vid} />
        ) : (
          <VendorForm onSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default VendorManagement;
