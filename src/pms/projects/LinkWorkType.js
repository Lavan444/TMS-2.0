import React, { useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const LinkCandidates = () => {
    const [selectedLinkCandidate, setSelectedLinkCandidate] = useState(null);
    const [visibleLinkCandidate, setVisibleLinkCandidate] = useState(false);
    const [candidateDetailsVisible, setCandidateDetailsVisible] = useState(false);

    // potential 
    const [visiblePotentialCandidate, setVisiblePotentialCandidate] = useState(false);

    // submitted
    const [visibleSubmittedCandidate, setVisibleSubmittedCandidate] = useState(false);

    const moreoptions = [
        // {
        //     name: 'Link WorkType',
        //     candidates: [
        //         {
        //             name: 'Received',
        //             onClick: () => setVisibleLinkCandidate(true)
        //         },
        //         {
        //             name: 'Potential',
        //             onClick: () => setVisiblePotentialCandidate(true)
        //         },
        //         {
        //             name: 'Submitted',
        //             onClick: () => setVisibleSubmittedCandidate(true)
        //         }
        //     ]
        // },
        // {
        //     name: 'Match WorkType'
        // },
        //  {
        //     name: 'Add WorkType'
        // },
        {
            name: 'Project Status',
            onClick: () => setChangeStatusAction(true)
        },
        {
            name: 'Attachments',
            onClick: () => setIsAttachDocumentVisible(true)
        },
        {
            name: 'Delete'
        }
    ];

    const [jobName, setJobName] = useState("Web Developer");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [userId, setUserId] = useState("Harish");
    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState("");

    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [candidates] = useState([
        { id: 1, name: 'LavanKumar Kalvala', designation: 'Frontend Developer', company: 'Varun Digital Media' },
        { id: 2, name: 'Venkata Laxmi Valle', designation: 'Frontend Developer', company: 'Varun Digital Media' },
        { id: 3, name: 'Bhargavi Sunanda', designation: 'SEO', company: 'Varun Digital Media' },
        { id: 4, name: 'Nagendra Meriga', designation: 'Content Writer', company: 'Varun Digital Media' },
        { id: 5, name: 'Saikumar Kunda', designation: 'Backend', company: 'Pranathi Software Services' },
    ]);

    const [searchText, setSearchText] = useState('');
    const [selectedCandidateNames, setSelectedCandidateNames] = useState('');

    const handleIconClick = () => {
        setCandidateDetailsVisible(true);
    };

    const handleSave = () => {
        const selectedNames = selectedCandidates.map((candidate) => candidate.name).join(', ');
        setSelectedCandidateNames(selectedNames);
        setCandidateDetailsVisible(false);
    };

    const handleRefresh = () => {
        setSelectedCandidates([]);
        setSearchText('');
    };

    const filteredCandidates = candidates.filter(
        (candidate) =>
            candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.company.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.id.toString().includes(searchText)
    );

    // change status

    const [changeStatusAction, setChangeStatusAction] = useState(false)


    // more attachment starts
    const [isAttachDocumentVisible, setIsAttachDocumentVisible] = useState(false);

    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const documentTypes = [
        { name: "Scope Document", code: "SD" },
        { name: "Work Breakdown Structure (WBS)", code: "WBS" },
        { name: "Resource Allocation Document", code: "RAD" },
        { name: "Stakeholder List", code: "SL" },
        { name: "Approval and Sign-Off Forms", code: "ASF" },
    ];

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onUpload = (event) => {
        // Store the uploaded files in state
        setUploadedFiles((prevFiles) => [...prevFiles, ...event.files]);
    };

    const [docSubject, setDocSubject] = useState("");

    return (
        <React.Fragment>
            <CascadeSelect
                // value={selectedLinkCandidate}
                onChange={(e) => {
                    setSelectedLinkCandidate(e.value);
                    if (e.value && e.value.onClick) {
                        e.value.onClick();
                    }
                }}
                options={moreoptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={['candidates']}
                className="md:w-8rem"
                breakpoint="767px"
                placeholder="More"
            />
            <Dialog header="Link Web Developer as Received" visible={visibleLinkCandidate} onHide={() => setVisibleLinkCandidate(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} className="link-candidates">
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="job" className="block mb-0">
                                Jobs
                            </label>
                            <InputText
                                id="job"
                                value={jobName}
                                readOnly
                                className="w-full"
                                disabled
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="candidateDetail" className="block mb-0">Link Candidates</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="candidateDetail"
                                    value={selectedCandidateNames}
                                    onChange={(e) => setSelectedCandidateNames(e.target.value)}
                                    placeholder="Select Candidates"
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
                                header="Link Candidates"
                                visible={candidateDetailsVisible}
                                onHide={() => setCandidateDetailsVisible(false)}
                                style={{ width: '40vw' }}
                                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                className="cand-details"
                            >
                                {/* Search Bar */}
                                <Row>
                                    <Col lg={12}>
                                        <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                                            <InputText
                                                placeholder="Search Candidates"
                                                value={searchText}
                                                onInput={(e) => setSearchText(e.target.value)}
                                                style={{ paddingRight: '2rem' }}
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
                                    value={filteredCandidates}
                                    paginator
                                    rows={5}
                                    selection={selectedCandidates}
                                    onSelectionChange={(e) => setSelectedCandidates(e.value)}
                                    dataKey="id"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    size="small"
                                >
                                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                                    <Column field="name" header="Candidate Name" />
                                    <Column field="designation" header="Designation" />
                                    <Column field="company" header="Company" />
                                </DataTable>

                                {/* Actions */}
                                <div className="d-flex  mt-3">
                                    <button type="button" className="btn btn-primary me-2 btn-main" onClick={handleSave}>Ok</button>
                                    <button type="button" className="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
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
                                onChange={(e) => setCurrentDateTime(e.value)}
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy"
                                hourFormat="12"
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="userId" className="block mb-0">
                                User ID
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
                                onChange={(e) => setSubject(e.target.value)}
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
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                cols={20}
                                className="w-full"
                                placeholder="Enter your notes here..."
                                autoResize
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary me-2 btn-main" onClick={() => setVisibleLinkCandidate(false)}>Ok</button>
                            <button
                                color="primary"
                                className="btn btn-primary me-2 cancel-outlinebtn"
                                onClick={() => setVisibleLinkCandidate(false)}
                            >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                            </button>
                        </div>
                    </Col>
                </Row>
            </Dialog>

            {/* potential starts */}

            <Dialog
                header="Link Web Developer as Potential"
                visible={visiblePotentialCandidate}
                onHide={() => setVisiblePotentialCandidate(false)}
                style={{ width: '50vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                className="link-candidates"
            >
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="job" className="block mb-0">
                                Job
                            </label>
                            <InputText
                                id="job"
                                value={jobName}
                                readOnly
                                className="w-full"
                                disabled
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="candidateDetail" className="block mb-0">Link Candidates</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="candidateDetail"
                                    value={selectedCandidateNames}
                                    onChange={(e) => setSelectedCandidateNames(e.target.value)}
                                    placeholder="Enter Candidate"
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
                                header="Link Candidates"
                                visible={candidateDetailsVisible}
                                onHide={() => setCandidateDetailsVisible(false)}
                                style={{ width: '40vw' }}
                                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                className="cand-details"
                            >
                                {/* Search Bar */}
                                <Row>
                                    <Col lg={12}>
                                        <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                                            <InputText
                                                placeholder="Search Candidates"
                                                value={searchText}
                                                onInput={(e) => setSearchText(e.target.value)}
                                                style={{ paddingRight: '2rem' }}
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
                                    value={filteredCandidates}
                                    paginator
                                    rows={5}
                                    selection={selectedCandidates}
                                    onSelectionChange={(e) => setSelectedCandidates(e.value)}
                                    dataKey="id"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    size="small"
                                >
                                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                                    <Column field="name" header="Candidate Name" />
                                    <Column field="designation" header="Designation" />
                                    <Column field="company" header="Company" />
                                </DataTable>

                                {/* Actions */}
                                <div className="d-flex  mt-3">
                                    <button type="button" className="btn btn-primary me-2 btn-main" onClick={handleSave}>Ok</button>
                                    <button type="button" className="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
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
                                onChange={(e) => setCurrentDateTime(e.value)}
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy"
                                hourFormat="12"
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="userId" className="block mb-0">
                                User ID
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
                                onChange={(e) => setSubject(e.target.value)}
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
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                cols={20}
                                className="w-full"
                                placeholder="Enter your notes here..."
                                autoResize
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary me-2 btn-main" onClick={() => setVisiblePotentialCandidate(false)}>Ok</button>
                            <button
                                color="primary"
                                className="btn btn-primary me-2 cancel-outlinebtn"
                                onClick={() => setVisiblePotentialCandidate(false)}

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

            <Dialog
                header="Link Web Developer as Submitted"
                visible={visibleSubmittedCandidate}
                onHide={() => setVisibleSubmittedCandidate(false)}
                style={{ width: '50vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                className="link-candidates"
            >
                <Row>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="job" className="block mb-0">
                                Job
                            </label>
                            <InputText
                                id="job"
                                value={jobName}
                                readOnly
                                className="w-full"
                                disabled
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="candidateDetail" className="block mb-0">Link Candidates</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="candidateDetail"
                                    value={selectedCandidateNames}
                                    onChange={(e) => setSelectedCandidateNames(e.target.value)}
                                    placeholder="Enter Candidate"
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
                                header="Link Candidates"
                                visible={candidateDetailsVisible}
                                onHide={() => setCandidateDetailsVisible(false)}
                                style={{ width: '40vw' }}
                                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                className="cand-details"
                            >
                                {/* Search Bar */}
                                <Row>
                                    <Col lg={12}>
                                        <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                                            <InputText
                                                placeholder="Search Candidates"
                                                value={searchText}
                                                onInput={(e) => setSearchText(e.target.value)}
                                                style={{ paddingRight: '2rem' }}
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
                                    value={filteredCandidates}
                                    paginator
                                    rows={5}
                                    selection={selectedCandidates}
                                    onSelectionChange={(e) => setSelectedCandidates(e.value)}
                                    dataKey="id"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    size="small"
                                >
                                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                                    <Column field="name" header="Candidate Name" />
                                    <Column field="designation" header="Designation" />
                                    <Column field="company" header="Company" />
                                </DataTable>

                                {/* Actions */}
                                <div className="d-flex  mt-3">
                                    <button type="button" className="btn btn-primary me-2 btn-main" onClick={handleSave}>Ok</button>
                                    <button type="button" className="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
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
                                onChange={(e) => setCurrentDateTime(e.value)}
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy"
                                hourFormat="12"
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="userId" className="block mb-0">
                                User ID
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
                                onChange={(e) => setSubject(e.target.value)}
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
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                cols={20}
                                className="w-full"
                                placeholder="Enter your notes here..."
                                autoResize
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary me-2 btn-main" onClick={() => setVisibleSubmittedCandidate(false)}>Ok</button>
                            <button
                                color="primary"
                                className="btn btn-primary me-2 cancel-outlinebtn"
                                onClick={() => setVisibleSubmittedCandidate(false)}

                            >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                            </button>
                        </div>
                    </Col>
                </Row>
            </Dialog>

            {/* submitted ends */}

            {/* change status starts */}

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
                                <option value='InActive'>Hold</option>
                                {/* <option value='InActive'>Blacklisted</option> */}

                            </select>
                        </div>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end  mt-4">
                    <button type="button" class="btn btn-primary btn-main" onClick={() => setChangeStatusAction(false)}>Submit</button>
                </div>
            </Dialog>

            {/* chnage status ends */}

            {/* attachements starts */}

            <Dialog
                header="Attachments"
                visible={isAttachDocumentVisible}
                onHide={() => setIsAttachDocumentVisible(false)}
                style={{ width: '45vw' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            >
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="card flex justify-content-center mb-0 border-0">
                            <label className="block mb-2">
                                Document Type
                            </label>
                            <Dropdown
                                value={selectedDocumentType}
                                onChange={(e) => setSelectedDocumentType(e.value)}
                                options={documentTypes}
                                optionLabel="name" // Display the "name" property in the dropdown
                                placeholder="Select a Document Type"
                                className="w-full bgclr"
                            />
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="p-field mt-2">
                            <label htmlFor="docSubject" className="block">Document Subject</label>
                            <InputText
                                id="docSubject"
                                value={docSubject}
                                onChange={(e) => setDocSubject(e.target.value)}
                                placeholder="Enter Document Subject"
                                className="p-inputtext-sm w-full"
                            />
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className="card flex justify-content-center mb-0 border-0 mt-2">
                            <label className="block mb-2"                                  >
                                Drag and Attach Documents
                            </label>
                            <FileUpload name="demo[]" url="/api/upload" accept="*/*" maxFileSize={1000000} onUpload={onUpload} multiple />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <button className="btn btn-primary btn-main mt-2" onClick={() => setIsAttachDocumentVisible(false)}> Submit </button>
                    </Col>
                </Row>
            </Dialog>

            {/* attachements ends */}


        </React.Fragment>
    );
};

export default LinkCandidates;
