import React, { useState, useEffect } from 'react';

import styles from '../css/table.css';

import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";

export default function RequestTable() {
    const [sortedData, setSortedData] = useState([]);
    const [sortOrder, setSortOrder] = useState({ key: '', asc: true });
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Set your desired items per page
    const [searchInput, setSearchInput] = useState('');
    
    useEffect(() => {
        // Fetch data from the "/request/all" endpoint when the component mounts
        fetchData();
    
        // Set up an interval to fetch data every, for example, 5 minutes (300,000 milliseconds)
        const intervalId = setInterval(() => {
          fetchData();
        }, 5000); // Adjust the interval as needed
    
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, [currentPage, searchInput]);
    
      const fetchData = async () => {
        try {
          // Make API call to fetch data
          // const response = await fetch(`/request/all`);
          // if (response.ok) {
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
                item: [
                  // Similar structure as above
                ],
              },
              // Add more requests if needed
            ];
            
            if(searchInput.length>0)
            data = data.filter(request => request.name.toLowerCase().includes(searchInput.toLowerCase()));

            // export default dummyData;
            
            // const data = await response.json();
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
    
            // Slice the data array to get only the items for the current page
            const pageData = data.slice(startIndex, endIndex);
            setSortedData(pageData);
        //   } else {
        //     console.error('Error fetching data:', response.statusText);
        //   }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
    const handleSelectChange = (e, rqid) => {
      const newSelectedOptions = { ...selectedOptions, [rqid]: e.target.value };
      setSelectedOptions(newSelectedOptions);
      console.log('Status changed for rqid:', rqid);
    };
  
    const handleFileUpload = (event, rqid) => {
      const file = event.target.files[0];
      console.log('File uploaded for rqid:', rqid, file);
    };
  
    const getSelectColor = (rqid) => {
      const selectedOption = selectedOptions[rqid] || '';
      switch (selectedOption) {
        case '-1':
          return 'red';
        case '0':
          return 'yellow';
        case '1':
          return 'green';
        default:
          return 'black';
      }
    };
  
    const handleApproval1 = (rqid) => {
      console.log('Approval 1 clicked for rqid:', rqid);
    };
  
    const handleApproval2 = (rqid) => {
      console.log('Approval 2 clicked for rqid:', rqid);
    };
  
    const handlePODownload = (rqid) => {
      console.log('PO Order Download clicked for rqid:', rqid);
    };
  
    const handleInvoiceUpload = (event, rqid) => {
      const file = event.target.files[0];
      console.log('Invoice uploaded for rqid:', rqid, file);
    };
  
    const handleFormSubmit = async (event, rqid) => {
      try {
        // Your form submission logic here
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
    const handleDeleteRequest = async (rqid) => {
      try {
        const response = await fetch(`/request/delete/${rqid}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Request deleted successfully:', rqid);
          // Add any additional logic after successful deletion
          fetchData(); // Refresh data after deletion
        } else {
          console.error('Error deleting request:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    };
    const handleSort = (key) => {
        const isAsc = sortOrder.key === key ? !sortOrder.asc : true;
      
        const sorted = [...sortedData].map((request) => ({
          ...request,
          item: request.item.map((item) => ({
            ...item,
            vendor: [...item.vendor].sort((a, b) => {
              const valueA = a[key];
              const valueB = b[key];
      
              if (typeof valueA === 'string' && typeof valueB === 'string') {
                return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
              }
      
              return isAsc ? valueA - valueB : valueB - valueA;
            }),
          })),
        }));
      
        setSortedData(sorted);
        setSortOrder({ key, asc: isAsc });
      };
      const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
      };
    
  
    return (
      <div class='cover' >
         <div className="search-bar">
        <input type="text" placeholder="Search by request name" value={searchInput} onChange={handleSearchInputChange} />
      </div>
          <Accordion>
       {sortedData.map((request)=>(
            <AccordionItem id={request.id}>
              {({open})=>(
                <>
            
                <AccordionHeader >
                <div className="accordion-title request-header  acc-req">
                <h3 style={{paddingTop:15+'px'}}>{request.date}-{request.name}</h3>
                <button className="delete-button" onClick={() => handleDeleteRequest(request.id)}>Delete</button>
              </div>
                </AccordionHeader>
                <AccordionBody styles={{backgroundColor:'grey'}}>
                
                    {
                                                        request.item.map((item) => (
                                                            <AccordionItem>
                                                               {({open}) => (
                                                                <>
                                                              
                                                             
                                                                <AccordionHeader>
                                                                <h3 className={`accordion-title ${open ? 'accordion-active' : ''}`}>{item.name}</h3>
                                                                <p>{item.spec} - {item.quantity}</p>
                                                                </AccordionHeader>
                                                                <AccordionBody>
                                                                  <div className='ApprovalDiv'>

                                                                
                                                          

                                                                    <table className='customtable'>
                                                                        <thead>
                                                                                <tr>
                                                                                        <th onClick={() => handleSort('status')}>Status</th>
                                                                                <th onClick={() => handleSort('vendor_name')}>Vendor Name</th>
                                                                                <th onClick={() => handleSort('vendor_email')}>Vendor Email</th>
                                                                                <th onClick={() => handleSort('contact_person')}>Contact Person</th>
                                                                                <th onClick={() => handleSort('quote_amount')}>Quote Amount</th>
                                                                                <th>Quote Upload</th>
                                                                                <th>Approval 1</th>
                                                                                <th>Approval 1 Comments</th>
                                                                                <th>Approval 2</th>
                                                                                <th>Approval 2 Comments</th>
                                                                                <th>PO Order Download</th>
                                                                                <th>Upload Invoice</th>
                                                                                <th>submit</th>
                                                                                </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                    {
                                                                        item.vendor.map((vendor)=>(
                                                            
                                                                <tr key={vendor.rqid}>
                                                                
                                                                    <td>
                                                                    <select id={'status_' + vendor.rqid} defaultValue={vendor.status || ''}
                                                                        onChange={(e) => handleSelectChange(e, vendor.rqid)}
                                                                        // style={{ backgroundColor: getSelectColor(item.rqid) }}
                                                                    >
                                                                        <option value={-1} >Rejected</option>
                                                                        <option value={0}>Following Up</option>
                                                                        <option value={1}>Accepted</option>
                                                                    </select>
                                                                    </td>
                                                                    <td>{vendor.vendor_name}</td>
                                                                    <td>{vendor.vendor_email}</td>
                                                                    <td>{vendor.contact_person}</td>
                                                                    <td><input id={'quote_' + vendor.rqid} type="number" value={vendor.quote_amount}></input></td>
                                                                    <td>
                                                                    {
                                                                        (vendor.quote) ? <a href={vendor.quote}>Download quote</a> :
                                                                        <input id={'quoteU_' + vendor.rqid} type="file" onChange={(e) => handleFileUpload(e, vendor.rqid)} />
                                                                    }
                                                                    </td>
                                                                    <td>
                                                                    { (vendor.approval1 === undefined) ? "pending" : ((vendor.approval1 === 0) ? <span>&#10008; </span> : <span>&#10004;</span>)
                                                                    }
                                                                    </td>
                                                                    <td>
                                                                    {(vendor.content1) ? vendor.content1 : ''}
                                                                    </td>
                                                                    <td>
                                                                    { (vendor.approval2 === undefined) ? "pending" : ((vendor.approval2 === 0) ? <span>&#10008; </span> : <span>&#10004;</span>)
                                                                    }
                                                                    </td>
                                                                    <td>
                                                                    {(vendor.content2) ? vendor.content2 : ''}
                                                                    </td>
                                                                    <td>
                                                                    <a href={vendor.po}>Download</a>
                                                                    </td>
                                                                    <td>
                                                                    {
                                                                        (vendor.invoice) ? <a href={vendor.invoice}>Download invoice</a> :
                                                                        <input id={'invoice_' + vendor.rqid} type="file" onChange={(e) => handleInvoiceUpload(e, vendor.rqid)} />
                                                                    }
                                                                    </td>
                                                                    <td><button className='button' onClick={(e) => handleFormSubmit(e, vendor.rqid)}>submit</button></td>
                                                                </tr>
                                                                ))
                                                            }
                                                            </tbody>
                                                            </table>
                                                            </div >
                                                            </AccordionBody>
                                                            </>
                                                            )}
                                                            </AccordionItem>
                                                            ))
                    }
                
                    </AccordionBody> 
                    </>
              )}
            </AccordionItem>          
                        ))
                    }
        </Accordion>
        
        
        
        {/* Pagination controls */}
        <div style={{ textAlign: 'center' }}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <span> Page {currentPage} </span>
          <button disabled={sortedData.length < itemsPerPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </div>
      );
  }
  