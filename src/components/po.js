








import React, { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion';
import DragDropFile from './DragDropFile';
import '../css/po.css'; // Import your CSS file

export default function Po({ initialOpenId }) {
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ key: '', asc: true });
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set your desired items per page
  const accordionRefs = useRef({});

  const handleInvoiceUpload = async (event, rqid) => {
    // ... your existing code for handling invoice upload
  };

  const handlePOUpload = async (event, rqid) => {
    // ... your existing code for handling PO upload
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentPage]);

  useEffect(() => {
    if (initialOpenId && accordionRefs.current[initialOpenId]) {
      accordionRefs.current[initialOpenId].isActive = true;
      accordionRefs.current[initialOpenId].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [initialOpenId]);

  const fetchData = async () => {
    try {
    
           const data = [
            {
              id: 1,
              date: '2024-01-19',
              name: 'Request 1',
              item: [
                {
                  id: 101,
                  name: 'Item 1',
                  spec: 'Spec 1',
                  quantity: 5,
                  vendor: [
                    {
                      rqid: 1001,
                      status: 1,
                      vendor_name: 'Vendor A',
                      vendor_email: 'vendor.a@example.com',
                      contact_person: 'Person A',
                      quote_amount: 500,
                      quote: '/path/to/quote1.pdf',
                      approval1: 1,
                      content1: 'Approved by manager',
                      approval2: 1,
                      content2: 'Approved by supervisor',
                      po: '/path/to/po1.pdf',
                      invoice: '/path/to/invoice1.pdf',
                    },
                    {
                      rqid: 1002,
                      status: 0,
                      vendor_name: 'Vendor B',
                      vendor_email: 'vendor.b@example.com',
                      contact_person: 'Person B',
                      quote_amount: 700,
                      approval1: 0,
                      content1: 'Rejected by manager',
                      approval2: undefined,
                      content2: '',
                      po: '/path/to/po2.pdf',
                      invoice: undefined,
                    },
                  ],
                },
                // Add more items if needed
              ],
            },
            {
              id: 2,
              date: '2024-01-20',
              name: 'Request 2',
              item:  [
                {
                  id: 121,
                  name: 'Item 1',
                  spec: 'Spec 1',
                  quantity: 5,
                  
                      rqid: 10201,
                      status: 1,
                      vendor_name: 'Vendor A',
                      vendor_email: 'vendor.a@example.com',
                      contact_person: 'Person A',
                      quote_amount: 500,
                      quote: '/path/to/quote1.pdf',
                      approval1: 1,
                      content1: 'Approved by manager',
                      approval2: 1,
                      content2: 'Approved by supervisor',
                      po: '/path/to/po1.pdf',
                      invoice: '/path/to/invoice1.pdf',
                    
                 
                },
                // Add more items if needed
              ],
            },
            // Add more requests if needed
          ];

      setSortedData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApproval1 = (rqid) => {
    console.log('Approval 1 clicked for rqid:', rqid);
  };

  const handleFormSubmit = async (event, rqid) => {
    try {
      // Your form submission logic here
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSort = (key) => {
    // ... your existing code for handling sorting
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='po-cover' style={{ overflow: 'auto', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
      <div className='po-left-column'>
        {/* Left column - Requests */}
        {sortedData.map((request) => (
          <Accordion
            key={request.id}
            isActive={selectedRequest && selectedRequest.id === request.id}
            ref={(ref) => (accordionRefs.current[request.id] = ref)}
            id={request.id}
          >
            <AccordionHeader onClick={() => handleRequestClick(request)}>
              <h3 className={`po-accordion-title po-acc-req`}>{request.date}-{request.name}</h3>
            </AccordionHeader>
            <AccordionBody>
              {/* Items of the selected request */}
              {request.item.map((item) => (
                <div
                  key={item.id}
                  className={`po-accordion-title po-acc-item ${selectedItem && selectedItem.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                </div>
              ))}
            </AccordionBody>
          </Accordion>
        ))}
      </div>
      <div className='po-right-column'>
        {/* Right column - Item details */}
        {selectedItem && (
          <div>
            <div className="po-vendor-info">
              <div>Vendor Name: {selectedItem.vendor_name}</div>
              <div>Email: {selectedItem.vendor_email}</div>
              <div>Contact Person: {selectedItem.contact_person}</div>
            </div>
            <div className="po-quote-info">
              <div className="po-quote-amount">Quote Amount: <b>{selectedItem.quote_amount}</b></div>
              <a href={selectedItem.quote} className="po-download-button">Download Quote</a>
            </div>
            <div className="po-upload-buttons">
              {selectedItem.po ? (
                <a href={selectedItem.po} className="po-download-button" target="_blank" rel="noopener noreferrer">
                  Download PO
                </a>
              ) : (
                <>
                  <DragDropFile name={`invoice_${selectedItem.rqid}`} id={`invoice_${selectedItem.rqid}`} selectedFile={selectedOptions[selectedItem.rqid]?.invoice} setSelectedFile={(file) => handleInvoiceUpload(file, selectedItem.rqid)} />
                </>
              )}
              <br></br>
              {selectedItem.invoice ? (
                <a href={selectedItem.invoice} className="po-download-button" target="_blank" rel="noopener noreferrer">
                  Download Invoice
                </a>
              ) : (
                <>
                  <DragDropFile name={`invoice_${selectedItem.rqid}`} id={`invoice_${selectedItem.rqid}`} selectedFile={selectedOptions[selectedItem.rqid]?.invoice} setSelectedFile={(file) => handleInvoiceUpload(file, selectedItem.rqid)} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Pagination controls */}
      
    </div>
  );
}





// import React, { useState, useEffect, useRef } from 'react';

// import styles from '../css/acc.css';

// import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
// import DragDropFile from './DragDropFile';
// export default function Po({ initialOpenId }) {
//     const [sortedData, setSortedData] = useState([]);
//     const [sortOrder, setSortOrder] = useState({ key: '', asc: true });
//     const [selectedOptions, setSelectedOptions] = useState({});
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(5); // Set your desired items per page
//     const accordionRefs = useRef({});
    
//   const handleInvoiceUpload = async (event, rqid) => {
//     try {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append('rqid', rqid);
//       formData.append('invoice', file);

//       const response = await fetch('/request/invoice', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('Invoice uploaded successfully for rqid:', rqid);
//         // Add any additional logic after successful upload
//       } else {
//         console.error('Error uploading invoice:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error uploading invoice:', error);
//     }
//   };

//   const handlePOUpload = async (event, rqid) => {
//     try {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append('rqid', rqid);
//       formData.append('po', file);

//       const response = await fetch('/request/po', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('PO uploaded successfully for rqid:', rqid);
//         // Add any additional logic after successful upload
//       } else {
//         console.error('Error uploading PO:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error uploading PO:', error);
//     }
//   };
//     useEffect(() => {
//       fetchData();
  
//       const intervalId = setInterval(() => {
//         fetchData();
//       }, 5000);
  
//       return () => clearInterval(intervalId);
//     }, [currentPage]);
  
//     useEffect(() => {
//       if (initialOpenId && accordionRefs.current[initialOpenId]) {
//         accordionRefs.current[initialOpenId].isActive=true;
//         accordionRefs.current[initialOpenId].scrollIntoView({
//           behavior: 'smooth',
//           block: 'start',
//         });
//       }
//     }, [initialOpenId]);
  
//     const fetchData = async () => {

//       try {

//         // const response = await fetch(`/request/all`);
//         // if (response.ok) {
//           // const data = await response.json();
//            const data = [
//             {
//               id: 1,
//               date: '2024-01-19',
//               name: 'Request 1',
//               item: [
//                 {
//                   id: 101,
//                   name: 'Item 1',
//                   spec: 'Spec 1',
//                   quantity: 5,
//                   vendor: [
//                     {
//                       rqid: 1001,
//                       status: 1,
//                       vendor_name: 'Vendor A',
//                       vendor_email: 'vendor.a@example.com',
//                       contact_person: 'Person A',
//                       quote_amount: 500,
//                       quote: '/path/to/quote1.pdf',
//                       approval1: 1,
//                       content1: 'Approved by manager',
//                       approval2: 1,
//                       content2: 'Approved by supervisor',
//                       po: '/path/to/po1.pdf',
//                       invoice: '/path/to/invoice1.pdf',
//                     },
//                     {
//                       rqid: 1002,
//                       status: 0,
//                       vendor_name: 'Vendor B',
//                       vendor_email: 'vendor.b@example.com',
//                       contact_person: 'Person B',
//                       quote_amount: 700,
//                       approval1: 0,
//                       content1: 'Rejected by manager',
//                       approval2: undefined,
//                       content2: '',
//                       po: '/path/to/po2.pdf',
//                       invoice: undefined,
//                     },
//                   ],
//                 },
//                 // Add more items if needed
//               ],
//             },
//             {
//               id: 2,
//               date: '2024-01-20',
//               name: 'Request 2',
//               item:  [
//                 {
//                   id: 121,
//                   name: 'Item 1',
//                   spec: 'Spec 1',
//                   quantity: 5,
                  
//                       rqid: 10201,
//                       status: 1,
//                       vendor_name: 'Vendor A',
//                       vendor_email: 'vendor.a@example.com',
//                       contact_person: 'Person A',
//                       quote_amount: 500,
//                       quote: '/path/to/quote1.pdf',
//                       approval1: 1,
//                       content1: 'Approved by manager',
//                       approval2: 1,
//                       content2: 'Approved by supervisor',
//                       po: '/path/to/po1.pdf',
//                       invoice: '/path/to/invoice1.pdf',
                    
                 
//                 },
//                 // Add more items if needed
//               ],
//             },
//             // Add more requests if needed
//           ];
//           const startIndex = (currentPage - 1) * itemsPerPage;
//           const endIndex = startIndex + itemsPerPage;
//           const pageData = data.slice(startIndex, endIndex);
//           setSortedData(pageData);
//         // } else {
//         //   console.error('Error fetching data:', response.statusText);
//         // }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  


  
//     const handleApproval1 = (rqid) => {
//       console.log('Approval 1 clicked for rqid:', rqid);
//     };
  
   

//     const handleFormSubmit = async (event, rqid) => {
//       try {
//         // Your form submission logic here
//       } catch (error) {
//         console.error('Error submitting form:', error);
//       }
//     };
//     const handleSort = (key) => {
//         const isAsc = sortOrder.key === key ? !sortOrder.asc : true;
      
//         const sorted = [...sortedData].map((request) => ({
//           ...request,
//           item: request.item.map((item) => ({
//             ...item,
//             vendor: [...item.vendor].sort((a, b) => {
//               const valueA = a[key];
//               const valueB = b[key];
      
//               if (typeof valueA === 'string' && typeof valueB === 'string') {
//                 return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
//               }
      
//               return isAsc ? valueA - valueB : valueB - valueA;
//             }),
//           })),
//         }));
      
//         setSortedData(sorted);
//         setSortOrder({ key, asc: isAsc });
//       };
  
//     return (
//       <div class='cover' style={{ overflow: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
//           <Accordion className='acc-item'>
//        {sortedData.map((request)=>(
//             <AccordionItem  isActive={request.id==initialOpenId}  ref={(ref) => (accordionRefs.current[request.id] = ref)} id={request.id} key={request.id} >
//                            <AccordionHeader >
//               <h3 className={`accordion-title  acc-req`}>{request.date}-{request.name}</h3>
//             </AccordionHeader>

//                 <AccordionBody>
             
//                     {
//                                                         request.item.map((item) => (
//                                                             <AccordionItem isActive={true}>
//                                                                 <AccordionHeader>
//                                                                 <h4 className={`accordion-title acc-item`}>{item.name}</h4>
//                                                                 <p>{item.spec} - {item.quantity}</p>
//                                                                 </AccordionHeader>
//                                                                 <AccordionBody>
//                                                                 <div className='ApprovalDiv'>
//   <div className="vendor-info">
//     <div>Vendor Name: {item.vendor_name}</div>
//     <div>Email: {item.vendor_email}</div>
//     <div>Contact Person: {item.contact_person}</div>
//   </div>
//   <div className="quote-info">
//     <div className="quote-amount">Quote Amount: <b>{item.quote_amount}</b></div>
//     <a href={item.quote} className="download-button">Download Quote</a>
//   </div>
//             <div className="upload-buttons">
//                                     {item.po ? (
//                                     <a href={item.po} className="download-button" target="_blank" rel="noopener noreferrer">
//                                         Download PO
//                                     </a>
//                                     ) : (
//                                     <>
//                                         {/* <label className="upload-label">
//                                         Upload PO
//                                         <input type="file" accept=".pdf" onChange={(e) => handlePOUpload(e, item.rqid)} />
//                                         </label> */}
//                                          <DragDropFile name={`invoice_${item.rqid}`} id={`invoice_${item.rqid}`} selectedFile={selectedOptions[item.rqid]?.invoice} setSelectedFile={(file) => handleInvoiceUpload(file, item.rqid)} />
                        
//                                     </>
//                                     )}
//                                     <br></br>
//                                     {item.invoice ? (
//                                     <a href={item.invoice} className="download-button" target="_blank" rel="noopener noreferrer">
//                                         Download Invoice
//                                     </a>
//                                     ) : (
//                                     <>
//                                         {/* <label className="upload-label">
//                                         Upload Invoice
//                                         <input type="file" accept=".pdf" onChange={(e) => handlePOUpload(e, item.rqid)} />
//                                         </label> */}
//                                          <DragDropFile name={`invoice_${item.rqid}`} id={`invoice_${item.rqid}`} selectedFile={selectedOptions[item.rqid]?.invoice} setSelectedFile={(file) => handleInvoiceUpload(file, item.rqid)} />
                    
//                                     </>
//                                     )}
//             </div>
//             </div>

                                                                   
//                                                             </AccordionBody>
//                                                             </AccordionItem>
//                                                             ))
//                     }
           
//                     </AccordionBody> 
//             </AccordionItem>          
//                         ))
//                     }
//         </Accordion>
        
        
        
//         {/* Pagination controls */}
//         <div style={{ textAlign: 'center' }}>
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
//           <span> Page {currentPage} </span>
//           <button disabled={sortedData.length < itemsPerPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//         </div>
//       </div>
//       );
//   }
  