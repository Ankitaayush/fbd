
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import React, { useState, useEffect } from 'react';
import NavBar from './components/navbar';
import HomeAround from './components/HomeAround';
import History from './components/History';
import Request from './components/Request';
import RequestTable from './components/requestView';
import RequestInput from './components/request_input';
import Manager from './components/manager';
import Po from './components/po';
import VendorInteraction from './components/UpadteVendor';
import ItemCategoryForm from './components/ItemCategoryForm.js';
import ItemCategoryList from './components/ItemCategoryList.js';
import VendorForm from './components/VendorInteraction.js';
import Login from './components/login.js';
import Vp from './components/vp.js';
function App() {

  const handleSubmit = (formData) => {
    // Handle the submitted form data, for now, just log it
    console.log(formData);
  };
  
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
     <BrowserRouter>
    
      <Routes>
        <Route path="/user" element={<HomeAround></HomeAround>}>
        
        <Route
          path="item"
          element={
            <div>
              {" "}
              <h1>Item Management</h1>
              <ItemCategoryList items={items} onDeleteItem={handleDeleteItem} />
              <ItemCategoryForm onAddItem={handleAddItem} />{" "}
            </div>
          }
        />
          <Route path="vendor/update" element={<VendorInteraction></VendorInteraction>}/>
          <Route path="vendor" element={<VendorForm />} />
          <Route path="request/create" element={<RequestInput ></RequestInput>}/>
          <Route path="request/track" element={<RequestTable  ></RequestTable>}/>
          <Route path="request/history" element={<History  ></History>}/>

      
        </Route>
        <Route path="/manager" element={<HomeAround />}>
          <Route index element={<Manager onFormSubmit={handleSubmit} />} />
          <Route path="Vp" element={<Vp onFormSubmit={handleSubmit} />} />
          <Route path="po"  element={<Po onFormSubmit={handleSubmit} />} />

        </Route>
       
        <Route path="/login" element={<Login />} />
        <Route path="/requestview" element={<RequestTable />} />
     
        
      
      </Routes>
      </BrowserRouter>
    
     
      
       
    </div>
  );

}
export default App;
