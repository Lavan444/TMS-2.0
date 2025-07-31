import React, { useState, useRef } from 'react';
import { Col, Container, Row } from "reactstrap";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const CreateCandidate = ({ setShowCreateCandidate }) => {

    const dt = useRef(null);

    // Define the page state
    const [pageState, setPageState] = useState({
        first: 0, // Index of the first row
        rows: 2,  // Number of rows per page
    });

    const handlePageChange = (event) => {
        setPageState(event);
    };
    const [loading, setLoading] = useState(false); // Default to false

    // contacts table
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        mobile: { value: null, matchMode: FilterMatchMode.CONTAINS },
        department: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [contactData, setContactData] = useState([
        {
            firstName: 'John',
            lastName: 'Doe',
            company: 'TechCorp',
            jobTitle: 'Software Engineer',
            email: 'john.doe@techcorp.com',
            mobile: '123-456-7890',
            associatedContacts: 5,
            department: 'Engineering',
            address: '123 Main St, New York, USA',
            notes: 'Potential client for project X.',
            category: 'Client',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'JD001',
            lastActivityDate: '2025-01-05',
            createDate: '2024-12-15',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            company: 'BizWorld',
            jobTitle: 'Marketing Manager',
            email: 'jane.smith@bizworld.com',
            mobile: '987-654-3210',
            associatedContacts: 3,
            department: 'Marketing',
            address: '456 Oak St, Chicago, USA',
            notes: 'Interested in joint marketing campaigns.',
            category: 'Partner',
            group: 'Medium Priority',
            createdBy: 'Admin',
            userId: 'JS002',
            lastActivityDate: '2025-01-03',
            createDate: '2024-11-20',
            editDate: '2025-01-09',
        },
        {
            firstName: 'Michael',
            lastName: 'Brown',
            company: 'FinancePro',
            jobTitle: 'Accountant',
            email: 'michael.brown@financepro.com',
            mobile: '555-789-1234',
            associatedContacts: 2,
            department: 'Finance',
            address: '789 Pine St, San Francisco, USA',
            notes: 'Handling tax consultations.',
            category: 'Vendor',
            group: 'Low Priority',
            createdBy: 'Admin',
            userId: 'MB003',
            lastActivityDate: '2025-01-07',
            createDate: '2024-10-10',
            editDate: '2025-01-08',
        }
    ]);

    const [selectedContacts, setSelectedContacts] = useState([]);
    return (
        <React.Fragment>
            <Container fluid={true}>
                <Row className='mt-5 pt-5'>
                    <Col sm={12}>
                        <section className="allactjobs-table">
                            <div className="card1 mt-4 mb-4 actjobsumtable">
                                <DataTable
                                    value={contactData}
                                    ref={dt}
                                    rows={pageState.rows}
                                    first={pageState.first}
                                    onPageChange={(e) => handlePageChange(e)} // Corrected event name
                                    dataKey="userId"
                                    loading={loading}
                                    scrollable
                                    emptyMessage="No records found."
                                    selection={selectedContacts}
                                    onSelectionChange={(e) => setSelectedContacts(e.value)}
                                    selectionMode="multiple"
                                    filters={filters}
                                    filterDisplay="row"
                                    reorderableRows
                                    resizableColumns
                                    columnResizeMode="expand"
                                >
                                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                                    <Column field="firstName" header="First Name" sortable filter style={{ minWidth: '10rem' }} />
                                    <Column field="lastName" header="Last Name" sortable filter style={{ minWidth: '10rem' }} />
                                    <Column field="company" header="Company" sortable filter style={{ minWidth: '12rem' }} />
                                    <Column field="jobTitle" header="Job Title" sortable filter style={{ minWidth: '12rem' }} />
                                    <Column field="email" header="Email" sortable filter style={{ minWidth: '14rem' }} />
                                    <Column field="mobile" header="Mobile Phone" sortable filter style={{ minWidth: '12rem' }} />
                                    <Column field="associatedContacts" header="Associated Contacts" sortable filter style={{ minWidth: '10rem' }} />
                                    <Column field="department" header="Department" sortable filter style={{ minWidth: '12rem' }} />
                                    <Column field="lastActivityDate" header="Last Activity Date" sortable filter style={{ minWidth: '12rem' }} />
                                    <Column field="createDate" header="Create Date" sortable filter style={{ minWidth: '10rem' }} />
                                    <Column field="editDate" header="Edit Date" sortable filter style={{ minWidth: '10rem' }} />
                                </DataTable>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default CreateCandidate;
