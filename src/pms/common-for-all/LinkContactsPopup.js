import React, {useState} from "react";
import { Dialog } from 'primereact/dialog';

import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {  Col,  Row, } from "reactstrap";


const LinkContactsPopup = () =>{


     const [jobDetailsVisible, setJobDetailsVisible] = useState(false);
     const [searchText, setSearchText] = useState('');
     const [selectedJobs, setSelectedJobs] = useState([]);
        const [jobs] = useState([
            { id: "Job-101", title: 'Web Developer', contact: 'Mahesh Kumar Bhoga' },
            { id: "Job-102", title: 'Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
            { id: "Job-103", title: 'Project Manager', contact: 'Mahesh Kumar Bhoga' },
            { id: "Job-104", title: 'Jr. Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
            { id: "Job-105", title: 'HR Specialist', contact: 'Giri Jalagam' },
        ]);

     const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    );

    const handleSave = () => {
        const selectedJobTitles = selectedJobs.map((job) => `${job.title}, ${job.id}`).join(', ');
        setSelectedJobTitles(selectedJobTitles);
        setJobDetailsVisible(false);
    };

    const handleRefresh = () => {
        setSelectedJobs([]);
        setSearchText('');
    };

    const [selectedJobTitles, setSelectedJobTitles] = useState('');

    const handleIconClick = () => {
            setJobDetailsVisible(true);
        };

    return<>

                       
                        <Col lg={6}>
                            <div className="field">
                                <label htmlFor="job" className="block mb-0">Project</label>
                                <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                    <InputText
                                        id="job"
                                        value={selectedJobTitles}
                                        onChange={(e) => setSelectedJobTitles(e.target.value)}
                                        placeholder="Select Project"
                                        className="w-full"
                                        style={{ paddingRight: '2rem' }} 
                                    />
                                    <i
                                        className="pi pi-chevron-down"
                                        onClick={handleIconClick}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }}
                                    ></i>
                                </div>
                                <Dialog
                                    header="Link Jobs"
                                    visible={jobDetailsVisible}
                                    onHide={() => setJobDetailsVisible(false)}
                                    style={{ width: '40vw' }}
                                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                    className="cand-details"
                                >
                                    {/* Search Bar */}
                                    <Row>
                                        <Col lg={12}>
                                            <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                                                <InputText
                                                    placeholder="Search Project"
                                                    value={searchText}
                                                    onInput={(e) => setSearchText(e.target.value)}
                                                    style={{ paddingRight: '2rem' }} // Space for the icon
                                                />
                                                <i
                                                    className="pi pi-search"
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '49%',
                                                        transform: 'translateY(-50%)',
                                                    }}
                                                ></i>
                                            </div>
                                        </Col>
                                    </Row>
    
                                    {/* DataTable */}
                                    <DataTable
                                        value={filteredJobs}
                                        paginator
                                        rows={5}
                                        selection={selectedJobs}
                                        onSelectionChange={(e) => setSelectedJobs(e.value)}
                                        dataKey="id"
                                        rowsPerPageOptions={[5, 10, 25]}
                                        size="small" // Set size to small
                                    >
                                        <Column selectionMode="multiple" style={{ width: '3em' }} />
                                        <Column field="id" header="Job ID" />
                                        <Column field="title" header="Job Title" />
                                        <Column field="contact" header="Contact" />
                                    </DataTable>
    
                                    {/* Actions */}
                                    <div className="d-flex  mt-3">
                                        {/* <Button label="Save" icon="pi pi-save" onClick={handleSave} />
                                                        <Button label="Refresh" icon="pi pi-refresh" onClick={handleRefresh} className="p-button-secondary" /> */}
                                        <button type="button" class="btn btn-primary me-2 btn-main" onClick={handleSave}>Save</button>
                                        <button type="button" class="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
                                    </div>
                                </Dialog>
                            </div>
                        </Col>


         {/*  */}
    </>
}
export default LinkContactsPopup;