import React, { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardBody, Col, Container, Row, DropdownToggle, DropdownItem, DropdownMenu, } from "reactstrap";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Calendar } from 'primereact/calendar';

import { InputTextarea } from 'primereact/inputtextarea';

const LinkJobs = () => {


    // link jobs 

    const [selectedLinkJob, setSelectedLinkJob] = useState(null);
    const [visibleLinkJob, setVisibleLinkJob] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [visiblePotentialJob, setVisiblePotentialJob] = useState(false);
    const [visibleSubmittedJob, setVisibleSubmittedJob] = useState(false);

    const moreoptions = [
        {
            name: 'Link Jobs',
            jobs: [
                {
                    name: 'Received',
                    onClick: () => setVisibleLinkJob(true)
                },
                {
                    name: 'Potential',
                    onClick: () => setVisiblePotentialJob(true)
                },
                {
                    name: 'Submitted',
                    onClick: () => setVisibleSubmittedJob(true)
                }
            ]
        },
        {
            name: 'Change Status',
            onClick: () => setChangeStatusAction(true)
        },
        {
            name: 'Merge'
        },
        {
            name: 'Delete'
        }
    ];

    const [candidateName, setCandidateName] = useState("Lavankumar Kalvala, Venkata Laxmi Valle");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [userId, setUserId] = useState("Harish");
    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState("");

    const [selectedJobs, setSelectedJobs] = useState([]);
    const [jobs] = useState([
        { id: "Job-101", title: 'Web Developer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-102", title: 'Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-103", title: 'Project Manager', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-104", title: 'Jr. Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-105", title: 'HR Specialist', contact: 'Giri Jalagam' },
    ]);

    const [searchText, setSearchText] = useState('');
    const [jobDetailsVisible, setJobDetailsVisible] = useState(false);
    const [selectedJobTitles, setSelectedJobTitles] = useState('');

    const handleIconClick = () => {
        setJobDetailsVisible(true);
    };

    const handleSave = () => {
        const selectedJobTitles = selectedJobs.map((job) => job.title).join(', ');
        setSelectedJobTitles(selectedJobTitles);
        setJobDetailsVisible(false);
    };

    const handleRefresh = () => {
        setSelectedJobs([]);
        setSearchText('');
    };

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    );

    // link jobs

    const [changeStatusAction, setChangeStatusAction] = useState(false)

    return (
        <React.Fragment>

            <CascadeSelect
                // value={selectedLinkJob}
                onChange={(e) => {
                    setSelectedLinkJob(e.value);
                    if (e.value && e.value.onClick) {
                        e.value.onClick(); // Trigger the onClick of selected job (e.g. 'Received')
                    }
                }}
                options={moreoptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={['jobs']}
                className="md:w-8rem"
                breakpoint="767px"
                placeholder="More"
            />
            <Dialog header="Link Lavankumar, Venkata Laxmi as Received" visible={visibleLinkJob} onHide={() => setVisibleLinkJob(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} className="link-candidates">
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="candidate" className="block mb-0">
                                Candidates
                            </label>
                            <InputText
                                id="candidate"
                                value={candidateName}
                                readOnly
                                className="w-full"
                                disabled
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="job" className="block mb-0">Jobs</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="job"
                                    value={selectedJobTitles}
                                    onChange={(e) => setSelectedJobTitles(e.target.value)}
                                    placeholder="Enter Job"
                                    className="w-full"
                                    style={{ paddingRight: '2rem' }} // Ensure space for the icon
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
                                                placeholder="Search Jobs"
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
                                    <button type="button" class="btn btn-primary me-2 btn-main" onClick={handleSave}>Ok</button>
                                    <button type="button" class="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
                                </div>
                            </Dialog>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="currentDateTime" className="block mb-0">
                                Date
                            </label>
                            <Calendar
                                id="currentDateTime"
                                value={currentDateTime}
                                onChange={(e) => setCurrentDateTime(e.value)} // Update state on change
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy" // Customize the date format
                                hourFormat="12" // Use 12-hour time format (or "12" for AM/PM)
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="userId" className="block mb-0">
                                User IDs
                            </label>
                            <InputText
                                id="userId"
                                value={userId}
                                readOnly
                                className="w-full"
                                placeholder="User ID"
                                disabled
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="subject" className="block mb-0">
                                Subject
                            </label>
                            <InputText
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} // Update the state on input change
                                className="w-full"
                                placeholder="Enter subject"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="notes" className="block mb-0">
                                Notes
                            </label>
                            <InputTextarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)} // Update the state on input change
                                rows={3} // Number of visible rows
                                cols={20} // Number of visible columns
                                className="w-full"
                                placeholder="Enter your notes here..."
                                autoResize // Automatically adjusts height as content grows
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary me-2 btn-main">Ok</button>
                            <button
                                color="primary"
                                className="btn btn-primary me-2 cancel-outlinebtn"
                                onClick={() => setVisibleLinkJob(false)}
                            >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                            </button>
                        </div>
                    </Col>
                </Row>
            </Dialog>


            {/* potential starts */}

            <Dialog header="Link Lavankumar, Venkata Laxmi as Potential" visible={visiblePotentialJob} onHide={() => setVisiblePotentialJob(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} className="link-candidates">
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="candidate" className="block mb-0">
                                Candidates
                            </label>
                            <InputText
                                id="candidate"
                                value={candidateName}
                                readOnly
                                className="w-full"
                                disabled
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="job" className="block mb-0">Job</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="job"
                                    value={selectedJobTitles}
                                    onChange={(e) => setSelectedJobTitles(e.target.value)}
                                    placeholder="Enter Job"
                                    className="w-full"
                                    style={{ paddingRight: '2rem' }} // Ensure space for the icon
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
                                header="Job Details"
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
                                                placeholder="Search Jobs"
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
                                    <button type="button" class="btn btn-primary me-2 btn-main" onClick={handleSave}>Ok</button>
                                    <button type="button" class="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
                                </div>
                            </Dialog>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="currentDateTime" className="block mb-0">
                                Date
                            </label>
                            <Calendar
                                id="currentDateTime"
                                value={currentDateTime}
                                onChange={(e) => setCurrentDateTime(e.value)} // Update state on change
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy" // Customize the date format
                                hourFormat="12" // Use 12-hour time format (or "12" for AM/PM)
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="userId" className="block mb-0">
                                User IDs
                            </label>
                            <InputText
                                id="userId"
                                value={userId}
                                readOnly
                                className="w-full"
                                placeholder="User ID"
                                disabled
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="subject" className="block mb-0">
                                Subject
                            </label>
                            <InputText
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} // Update the state on input change
                                className="w-full"
                                placeholder="Enter subject"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="notes" className="block mb-0">
                                Notes
                            </label>
                            <InputTextarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)} // Update the state on input change
                                rows={3} // Number of visible rows
                                cols={20} // Number of visible columns
                                className="w-full"
                                placeholder="Enter your notes here..."
                                autoResize // Automatically adjusts height as content grows
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary me-2 btn-main">Ok</button>
                            <button
                                color="primary"
                                className="btn btn-primary me-2 cancel-outlinebtn"
                                onClick={() => setVisiblePotentialJob(false)}
                            >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                            </button>
                        </div>
                    </Col>
                </Row>
            </Dialog>

            {/* potential ends */}

            {/* submitted starts */}

            <Dialog header="Link Lavankumar, Venkata Laxmi as Submitted" visible={visibleSubmittedJob} onHide={() => setVisibleSubmittedJob(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} className="link-candidates">
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="candidate" className="block mb-0">
                                Candidates
                            </label>
                            <InputText
                                id="candidate"
                                value={candidateName}
                                readOnly
                                className="w-full"
                                disabled
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="job" className="block mb-0">Job</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="job"
                                    value={selectedJobTitles}
                                    onChange={(e) => setSelectedJobTitles(e.target.value)}
                                    placeholder="Enter Job"
                                    className="w-full"
                                    style={{ paddingRight: '2rem' }} // Ensure space for the icon
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
                                header="Job Details"
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
                                                placeholder="Search Jobs"
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
                                    <button type="button" class="btn btn-primary me-2 btn-main" onClick={handleSave}>Ok</button>
                                    <button type="button" class="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
                                </div>
                            </Dialog>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="currentDateTime" className="block mb-0">
                                Date
                            </label>
                            <Calendar
                                id="currentDateTime"
                                value={currentDateTime}
                                onChange={(e) => setCurrentDateTime(e.value)} // Update state on change
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy" // Customize the date format
                                hourFormat="12" // Use 12-hour time format (or "12" for AM/PM)
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="userId" className="block mb-0">
                                User IDs
                            </label>
                            <InputText
                                id="userId"
                                value={userId}
                                readOnly
                                className="w-full"
                                placeholder="User ID"
                                disabled
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="subject" className="block mb-0">
                                Subject
                            </label>
                            <InputText
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} // Update the state on input change
                                className="w-full"
                                placeholder="Enter subject"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="notes" className="block mb-0">
                                Notes
                            </label>
                            <InputTextarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)} // Update the state on input change
                                rows={3} // Number of visible rows
                                cols={20} // Number of visible columns
                                className="w-full"
                                placeholder="Enter your notes here..."
                                autoResize // Automatically adjusts height as content grows
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary me-2 btn-main">Ok</button>
                            <button
                                color="primary"
                                className="btn btn-primary me-2 cancel-outlinebtn"
                                onClick={() => setVisibleSubmittedJob(false)}
                            >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                            </button>
                        </div>
                    </Col>
                </Row>
            </Dialog>

            {/* submitted ends */}


            <Dialog
                header="Change Status"
                visible={changeStatusAction}
                onHide={() => setChangeStatusAction(false)}
                style={{ width: '30vw' }}
                className="changestatus-popup"
            >
                {/* Search Bar */}
                <Row className="mt-2 align-items-center">
                    <Col xl={2}>
                        <label className="block mb-2"                                  >
                            Status
                        </label>
                    </Col>
                    <Col xl={10}>
                        <div className="card flex justify-content-center mb-0 border-0">
                            <select
                                className='form-select profileDetailsInput' id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                            >
                                <option value=' '>Active</option>
                                <option value='InActive'>InActive</option>
                                <option value='InActive'>DND (Do Not Disturb)</option>
                                <option value='InActive'>Blacklisted</option>

                            </select>
                        </div>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end  mt-4">
                    <button type="button" class="btn btn-primary btn-main" onClick={() => setChangeStatusAction(false)}>Submit</button>
                </div>
            </Dialog>

        </React.Fragment>
    );
};



export default LinkJobs;