import React, { useState, useEffect, useRef } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Input,
} from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputNumber } from "primereact/inputnumber";
import { TreeSelect } from "primereact/treeselect";
import { Checkbox } from "primereact/checkbox";
import { MultiSelect } from "primereact/multiselect";
import { Editor } from "primereact/editor";
import { Toast } from 'primereact/toast';
import { Button as PrimeButton } from "primereact/button";
import { Link } from "react-router-dom";
import { FileUpload } from 'primereact/fileupload';
import WorkType1 from "../common-for-all/WorkTypeOne";
import WorkType3 from "../common-for-all/WorkTypeThree";
import EstimateTable from "./EstimateTable";
import EstimateDelay from "./EstimateDelay";

const ProjectEditForm = () => {
    // Project Information States
    const [projectCode, setProjectCode] = useState("Proj-101");
    const [projectName, setProjectName] = useState("AI Generator");
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [projectManager, setProjectManager] = useState("Mahesh Kumar Bhoga");
    const [selectedProjectStatus, setSelectedProjectStatus] = useState(null);

    // Project Timeline States
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [extendedEndDate, setExtendedEndDate] = useState(null);
    const [reasonForDelay, setReasonForDelay] = useState("");

    // System Fields States
    const [createdBy, setCreatedBy] = useState("Mahesh Kumar Bhoga");
    const [createdDate, setCreatedDate] = useState(new Date());
    const [lastModifiedBy, setLastModifiedBy] = useState("Mahesh Kumar Bhoga");
    const [lastModifiedDate, setLastModifiedDate] = useState(new Date());

    // Notes State
    const [notes, setNotes] = useState("");
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [editorContent, setEditorContent] = useState("");
    const [projectNotes, setProjectNotes] = useState([
        {
            candidateName: "Current User",
            timestamp: new Date().toLocaleString(),
            content: "<strong>Initial Project Note:</strong><br>Project has been created and is ready for development phase."
        }
    ]);
    const [editingNoteIndex, setEditingNoteIndex] = useState(null);

    // Document states
    const [displayDialog, setDisplayDialog] = useState(false);
    const [documents, setDocuments] = useState([{
        type: "Project Requirements",
        subject: "Initial project requirements document",
        file: null
    }]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [selectedStatus1, setSelectedStatus1] = useState(null);

    // Private checkbox and MultiSelect states
    const [popchecked2, setPopchecked2] = useState(false);
    const [privateDrop, setPrivateDrop] = useState([]);

    const handlePopupCheckbox2 = e => {
        setPopchecked2(e.checked);
    };

    const PrivetDropdownValues = [
        { name: 'mahesh', value: 'Mahesh' },
        { name: 'lavan', value: 'lavan' },
        { name: 'vinay', value: 'vinay' },
        { name: 'vasanth', value: 'vasanth' }
    ];

    const handleUpload = (e) => {
        setFile(e.files[0]);
    };

    const customBase64Uploader2 = (event) => {
        setFile(event.files[0]);
    };

    const handleAddDocument = () => {
        if (selectedDocument && subject) {
            const newDocument = { type: selectedDocument.label, subject, file };
            setDocuments([...documents, newDocument]);
            alert('Document added successfully!');
            setDisplayDialog(false);
            setSelectedDocument(null);
            setSubject('');
            setFile(null);
        } else {
            alert('Please fill all the fields.');
        }
    };

    const openAddDocumentDialog = () => {
        setDisplayDialog(true);
    };

    const closeAddDocumentDialog = () => {
        setDisplayDialog(false);
    };

    const groupedDocuments = [
        {
            label: 'Project Documentation',
            items: [
                { label: 'Project Requirements Document', value: 'Project Requirements Document' },
                { label: 'Technical Specifications', value: 'Technical Specifications' },
                { label: 'Design Documents', value: 'Design Documents' },
                { label: 'User Stories', value: 'User Stories' },
                { label: 'Test Plans', value: 'Test Plans' }
            ]
        },
        {
            label: 'Legal and Compliance',
            items: [
                { label: 'Project Charter', value: 'Project Charter' },
                { label: 'Stakeholder Agreement', value: 'Stakeholder Agreement' },
                { label: 'Risk Assessment', value: 'Risk Assessment' },
                { label: 'Compliance Documentation', value: 'Compliance Documentation' }
            ]
        },
        {
            label: 'Development Assets',
            items: [
                { label: 'Source Code Documentation', value: 'Source Code Documentation' },
                { label: 'API Documentation', value: 'API Documentation' },
                { label: 'Database Schema', value: 'Database Schema' },
                { label: 'Deployment Guide', value: 'Deployment Guide' }
            ]
        }
    ];

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <i className="pi pi-file mr-2"></i>
                <div>{option.label}</div>
            </div>
        );
    };

    // WorkType configurations with state management
    const [moduleWorkTypes, setModuleWorkTypes] = useState([
        {
            name: 'User Management',
            color: '#000000',
            id: 'custom-task',
            statuses: ['Pending', 'Processing', 'Completed']
        }
    ]);

    const [companyWorkTypes, setCompanyWorkTypes] = useState([
        {
            name: 'Vitel Global Solutions',
            color: '#000000',
            id: 'vitel',
            statuses: ['Pending', 'Processing', 'Completed']
        },
        {
            name: 'Tech Innovations Ltd.',
            color: '#000000',
            id: 'tech-innovations',
            statuses: ['Pending', 'Processing', 'Completed']
        },
        {
            name: 'Digital Solutions Corp.',
            color: '#000000',
            id: 'digital-solutions',
            statuses: ['Pending', 'Processing', 'Completed']
        },
        {
            name: 'Enterprise Systems Inc.',
            color: '#000000',
            id: 'enterprise-systems',
            statuses: ['Pending', 'Processing', 'Completed']
        }
    ]);

    const [statusWorkTypes, setStatusWorkTypes] = useState([
        {
            name: 'Open',
            color: '#000000',
            id: 'custom-task',
            statuses: ['Pending', 'Processing', 'Completed']
        },
        {
            name: 'In Progress',
            color: '#000000',
            id: 'in-active',
            statuses: ['Pending', 'Processing', 'Completed']
        },
        {
            name: 'Under Review',
            color: '#000000',
            id: 'dnd',
            statuses: ['Pending', 'Processing', 'Completed']
        },
         {
            name: 'Approved',
            color: '#000000',
            id: 'custom-task',
            statuses: ['Pending', 'Processing', 'Completed']
        },
        {
            name: 'On Hold',
            color: '#000000',
            id: 'in-active',
            statuses: ['Pending', 'Processing', 'Completed']
        },
        {
            name: 'Done',
            color: '#000000',
            id: 'dnd',
            statuses: ['Pending', 'Processing', 'Completed']
        },
         {
            name: 'Cancelled',
            color: '#000000',
            id: 'dnd',
            statuses: ['Pending', 'Processing', 'Completed']
        },
    ]);

    // Callback handlers for work type changes
    const handleModuleWorkTypesChange = (updatedWorkTypes) => {
        setModuleWorkTypes(updatedWorkTypes);
    };

    const handleCompanyWorkTypesChange = (updatedWorkTypes) => {
        setCompanyWorkTypes(updatedWorkTypes);
    };

    const handleStatusWorkTypesChange = (updatedWorkTypes) => {
        setStatusWorkTypes(updatedWorkTypes);
    };

    const handleModuleSelectionChange = (selectedWorkType) => {
        setSelectedModule(selectedWorkType);
    };

    const handleCompanySelectionChange = (selectedWorkType) => {
        setSelectedCompany(selectedWorkType);
    };

    const handleStatusSelectionChange = (selectedWorkType) => {
        setSelectedProjectStatus(selectedWorkType);
    };

    // Dynamic dropdown configurations
    const moduleDropdownWorkTypes = [
        ...moduleWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Module', id: 'create-new-work-type' },
        { name: 'Edit Module', id: 'edit-selected-work-type' }
    ];

    const companyDropdownWorkTypes = [
        ...companyWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Company', id: 'create-new-work-type' },
        { name: 'Edit Company', id: 'edit-selected-work-type' }
    ];

    const statusDropdownWorkTypes = [
        ...statusWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Status', id: 'create-new-work-type' },
        { name: 'Edit Status', id: 'edit-selected-work-type' }
    ];

    // Dropdown options
    const moduleOptions = [
        { label: 'User Management Module', value: 'user-mgmt' },
        { label: 'Authentication Module', value: 'auth-module' },
        { label: 'Payment Gateway', value: 'payment' },
        { label: 'Reporting Module', value: 'reporting' },
        { label: 'Admin Dashboard', value: 'admin-dash' }
    ];

    const projectStatusOptions = [
        { label: 'Planning', value: 'planning' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Testing', value: 'testing' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' }
    ];

    // Editor configuration
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = renderHeader();

    const [content, setContent] = useState(`<strong>Project Overview :</strong> <br>
This project is aimed at developing a user-friendly dashboard for internal reporting. It involves planning, coordinating, and executing a series of tasks that contribute to the successful delivery of the final outcome. The goal is to ensure timely completion with a strong focus on quality and efficiency.

As the assigned team member, you will be responsible for managing your specific tasks, collaborating with other departments when needed, and proactively addressing any challenges that arise. Regular updates and clear communication are expected to keep the project on track and aligned with its objectives.`);

    const maxWords = 500;

    const calculateWordCount = (text) => {
        const words = text
            .trim()
            .replace(/<[^>]*>/g, "")
            .split(/\s+/);
        return words.filter((word) => word).length;
    };

    const currentWordCount = calculateWordCount(content);

    const handleEditorChange = (e) => {
        const text = e.htmlValue || "";
        if (calculateWordCount(text) <= maxWords) {
            setContent(text);
        }
    };

    // Toast messages
    const toast = useRef(null);

    const showMessage = () => {
        toast.current.show({ severity: 'info', summary: 'Project Saved Successfully' });
    };

    const showCancel = () => {
        toast.current.show({ severity: 'error', summary: 'Cancelled', life: 3000 });
    };

    const handleAddNotes = () => {
        setIsEditorVisible(true);
        setEditorContent("");
        setEditingNoteIndex(null);
    };

    const handleSaveNotes = () => {
        if (editorContent.trim()) {
            const newNote = {
                candidateName: "Current User",
                timestamp: new Date().toLocaleString(),
                content: editorContent
            };

            if (editingNoteIndex !== null) {
                // Update existing note
                const updatedNotes = [...projectNotes];
                updatedNotes[editingNoteIndex] = newNote;
                setProjectNotes(updatedNotes);
                setEditingNoteIndex(null);
                toast.current.show({
                    severity: 'success',
                    summary: 'Note Updated',
                    detail: 'Note has been updated successfully!'
                });
            } else {
                // Add new note
                setProjectNotes([...projectNotes, newNote]);
                toast.current.show({
                    severity: 'success',
                    summary: 'Note Added',
                    detail: 'Note has been added successfully!'
                });
            }

            setIsEditorVisible(false);
            setEditorContent("");
        } else {
            toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Please enter some content for the note.'
            });
        }
    };

    const handleCancelNotes = () => {
        setIsEditorVisible(false);
        setEditorContent("");
        setEditingNoteIndex(null);
    };

    const handleEditNote = (index) => {
        setEditingNoteIndex(index);
        setEditorContent(projectNotes[index].content);
        setIsEditorVisible(true);
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = projectNotes.filter((_, i) => i !== index);
        setProjectNotes(updatedNotes);
        toast.current.show({
            severity: 'success',
            summary: 'Note Deleted',
            detail: 'Note has been deleted successfully!'
        });
    };

    return (
        <React.Fragment>
            <div className="page-content create-ajob">
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={6}>
                                <h1 className="page-title">Create Project</h1>
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item active">
                                        Create a new project with detailed information for effective project management and team coordination.
                                    </li>
                                </ol>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex justify-content-end">
                                    <Toast ref={toast} />
                                    <Link to="/allactive-project">
                                        <button type="submit" className="btn btn-success me-2" onClick={showMessage}>
                                            <i className="pi pi-save me-1"></i> Save
                                        </button>
                                    </Link>
                                    <Link to="/allactive-project">
                                        <Button
                                            color="primary"
                                            className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                            onClick={showCancel}
                                        >
                                            <i className="pi pi-times me-1"></i>
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        {/* Project Information */}
                        <Col xl={5}>
                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Project Information</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div>
                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="projectCode">Project Code</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="projectCode"
                                                            value={projectCode}
                                                            onChange={(e) => setProjectCode(e.target.value)}
                                                            className="w-full"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="projectName">Project Name</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="projectName"
                                                            value={projectName}
                                                            onChange={(e) => setProjectName(e.target.value)}
                                                            className="w-full"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="module">Module</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <WorkType1
                                                            initialWorkTypes={moduleWorkTypes}
                                                            dropdownWorkTypes={moduleDropdownWorkTypes}
                                                            onWorkTypesChange={handleModuleWorkTypesChange}
                                                            onSelectionChange={handleModuleSelectionChange}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="company">Company</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <WorkType1
                                                            initialWorkTypes={companyWorkTypes}
                                                            dropdownWorkTypes={companyDropdownWorkTypes}
                                                            onWorkTypesChange={handleCompanyWorkTypesChange}
                                                            onSelectionChange={handleCompanySelectionChange}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="projectManager">Project Manager</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="projectManager"
                                                            value={projectManager}
                                                            onChange={(e) => setProjectManager(e.target.value)}
                                                            className="w-full"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="projectStatus">Project Status</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <WorkType1
                                                            initialWorkTypes={statusWorkTypes}
                                                            dropdownWorkTypes={statusDropdownWorkTypes}
                                                            onWorkTypesChange={handleStatusWorkTypesChange}
                                                            onSelectionChange={handleStatusSelectionChange}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Project Timeline</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div>
                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="startDate">Start Date</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <Calendar
                                                            id="startDate"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.value)}
                                                            dateFormat="dd/mm/yy"
                                                            placeholder="Select start date"
                                                            className="w-full activejobdrop"
                                                            style={{ border: '1px solid #ced4da' }}
                                                            showIcon
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="endDate">End Date</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <Calendar
                                                            id="endDate"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.value)}
                                                            dateFormat="dd/mm/yy"
                                                            placeholder="Select end date"
                                                            className="w-full activejobdrop"
                                                            style={{ border: '1px solid #ced4da' }}
                                                            showIcon
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="extendedEndDate">Extended End Date</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <Calendar
                                                            id="extendedEndDate"
                                                            value={extendedEndDate}
                                                            onChange={(e) => setExtendedEndDate(e.value)}
                                                            dateFormat="dd/mm/yy"
                                                            placeholder="Select extended date"
                                                            className="w-full activejobdrop"
                                                            style={{ border: '1px solid #ced4da' }}
                                                            showIcon
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="reasonForDelay">Reason for Delay</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="reasonForDelay"
                                                            value={reasonForDelay}
                                                            onChange={(e) => setReasonForDelay(e.target.value)}
                                                            className="w-full"
                                                            style={{ border: '1px solid #ced4da' }}
                                                            placeholder="Optional explanation for delay"
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            {/* Documents start */}


                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Project Documents</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div>
                                                <DataTable value={documents} rows={5} className="p-datatable-gridlines"
                                                    emptyMessage={<div className="empty-message-custom">No documents found.</div>}>
                                                    <Column field="type" header="Type" />
                                                    <Column field="subject" header="Subject" />
                                                    <Column field="file" header="Attachment" body={(rowData) => rowData.file ? rowData.file.name : 'No file'} />
                                                </DataTable>
                                                <div className="block d-flex justify-content-end align-items-center">
                                                    <a color="primary" className="anchr-title mt-3" onClick={openAddDocumentDialog}>
                                                        <i className="pi pi-plus me-1"></i> Add More
                                                    </a>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>

                                {/* Dialog for adding document */}
                                <Dialog
                                    header="Add Document"
                                    visible={displayDialog}
                                    onHide={closeAddDocumentDialog}
                                    style={{ width: "30vw" }}
                                    footer={
                                        <div>
                                            <Button color="primary btn-main mr-2" onClick={handleAddDocument}>
                                                Add Document
                                            </Button>
                                            <Button color="btn btn-primary cancel-outlinebtn" onClick={closeAddDocumentDialog}>
                                                <i className="pi pi-times me-1"></i>
                                                Cancel
                                            </Button>
                                        </div>
                                    }
                                >
                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="type" className="block mb-2">
                                                Type
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <Dropdown
                                                value={selectedDocument}
                                                onChange={(e) => setSelectedDocument(e.value)}
                                                options={groupedDocuments}
                                                optionLabel="label"
                                                optionGroupLabel="label"
                                                optionGroupChildren="items"
                                                optionGroupTemplate={groupedItemTemplate}
                                                className="w-full bgclr"
                                                style={{ border: '1px solid #ced4da' }}
                                                placeholder="Select a Document"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="subject" className="block mb-2">
                                                Description
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <InputText
                                                id="subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="attachment" className="block mb-2">
                                                Attachment
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                url="/api/upload"
                                                accept="*/*"
                                                maxFileSize={1000000}
                                                onUpload={handleUpload}
                                                customUpload
                                                uploadHandler={customBase64Uploader2}
                                                className="custom-fileupload"
                                            />
                                        </Col>
                                    </Row>
                                </Dialog>
                            </Card>


                            {/* Documents end */}

                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">System Fields</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div>
                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="createdBy">Created By</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="createdBy"
                                                            value={createdBy}
                                                            readOnly
                                                            className="w-full"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="createdDate">Created Date</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <Calendar
                                                            id="createdDate"
                                                            value={createdDate}
                                                            readOnlyInput
                                                            dateFormat="dd/mm/yy"
                                                            className="w-full activejobdrop"
                                                            style={{ border: '1px solid #ced4da' }}
                                                            showIcon
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="lastModifiedBy">Last Modified By</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="lastModifiedBy"
                                                            value={lastModifiedBy}
                                                            readOnly
                                                            className="w-full"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="lastModifiedDate">Last Modified Date</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <Calendar
                                                            id="lastModifiedDate"
                                                            value={lastModifiedDate}
                                                            readOnlyInput
                                                            dateFormat="dd/mm/yy"
                                                            className="w-full activejobdrop"
                                                            style={{ border: '1px solid #ced4da' }}
                                                            showIcon
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="justify-content-start align-items-end mt-0">
                                                    <Col xl={12}>
                                                        <div className="d-flex align-items-center mt-1">
                                                            <Checkbox
                                                                inputId="checkbox"
                                                                checked={popchecked2}
                                                                onChange={handlePopupCheckbox2}
                                                            />
                                                            <label htmlFor="username" className="ms-1 mt-2">
                                                                Private
                                                            </label>
                                                        </div>
                                                    </Col>

                                                    {popchecked2 && (
                                                        <Col xl={12}>

                                                             <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="username">User Id's</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <MultiSelect
                                                                value={privateDrop}
                                                                onChange={e => setPrivateDrop(e.value)}
                                                                options={PrivetDropdownValues}
                                                                optionLabel="name"
                                                                optionValue="value"
                                                                placeholder="Select Users"
                                                                className="w-full"
                                                                style={{border: '1px solid #ced4da'}}
                                                                display="comma"
                                                            />
                                                    </Col>
                                                </Row>
                                                           
                                                            
                                                        </Col>
                                                    )}
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                             {/* Notes start */}


                            <Card className="bg-form">
                                <CardBody>



                                    <Row>
                                        <Col lg={12}>

                                            <h4 className="card-title mb-3">Notes</h4>
                                            
                                        </Col>
                                    </Row>

                                    {isEditorVisible && (
                                        <Row className="mt-4">
                                            <Col lg={12}>
                                                <Editor
                                                    value={editorContent}
                                                    onTextChange={e => setEditorContent(e.htmlValue)}
                                                    style={{ height: "200px" }}
                                                    placeholder="Enter your notes here..."
                                                    headerTemplate={header}
                                                />
                                                <div className="d-flex justify-content-end mt-2">
                                                    <PrimeButton
                                                        type="button"
                                                        label="Save"
                                                        icon="pi pi-save"
                                                        className="p-button p-button-success me-2"
                                                        onClick={handleSaveNotes}
                                                        style={{
                                                            backgroundColor: '#28a745',
                                                            border: '1px solid #28a745',
                                                            color: 'white',
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '0.25rem',
                                                            marginRight: '0.5rem'
                                                        }}
                                                    />
                                                    <PrimeButton
                                                        type="button"
                                                        label="Cancel"
                                                        icon="pi pi-times"
                                                        className="p-button p-button-secondary"
                                                        onClick={handleCancelNotes}
                                                        style={{
                                                            backgroundColor: '#6c757d',
                                                            border: '1px solid #6c757d',
                                                            color: 'white',
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '0.25rem'
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    )}

                                    <Row className="mt-4 notes">
                                        <Col lg={12}>
                                            {projectNotes.length > 0 && (
                                                <Card className="p-3">
                                                    {projectNotes.map((note, index) => (
                                                        <div key={index}>
                                                            <div className="d-flex mt-0">
                                                                <strong className="text-muted me-4">
                                                                    {note.candidateName}
                                                                </strong>
                                                                <strong className="text-muted">
                                                                    {note.timestamp}
                                                                </strong>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-2 mb-0">
                                                                <div
                                                                    style={{
                                                                        flex: 1,
                                                                        wordWrap: 'break-word',
                                                                        wordBreak: 'break-all',
                                                                        overflowWrap: 'break-word',
                                                                        maxWidth: 'calc(100% - 60px)',
                                                                        marginRight: '10px'
                                                                    }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: note.content,
                                                                    }}
                                                                />
                                                                <div className="d-flex align-items-center" style={{ flexShrink: 0 }}>
                                                                    <PrimeButton
                                                                        icon="pi pi-pencil"
                                                                        className="p-button p-button-warning p-button-sm"
                                                                        onClick={() => handleEditNote(index)}
                                                                        tooltip="Edit Note"
                                                                        tooltipOptions={{ position: 'top' }}
                                                                        style={{
                                                                            // backgroundColor: '#ffc107',
                                                                            // border: '1px solid #ffc107',
                                                                            color: '#212529',
                                                                            padding: '0.rem 0.3rem',
                                                                            borderRadius: '0.2rem',
                                                                            marginRight: '0.3rem',
                                                                            fontSize: '0.75rem',
                                                                            minWidth: 'auto',
                                                                            height: '24px',
                                                                            width: '24px'
                                                                        }}
                                                                    />
                                                                    <PrimeButton
                                                                        icon="pi pi-trash"
                                                                        className="p-button p-button-danger p-button-sm"
                                                                        onClick={() => handleDeleteNote(index)}
                                                                        tooltip="Delete Note"
                                                                        tooltipOptions={{ position: 'top' }}
                                                                        style={{
                                                                            // backgroundColor: '#dc3545',
                                                                            // border: '1px solid #dc3545',
                                                                            color: '#212529',
                                                                            padding: '0.15rem 0.3rem',
                                                                            borderRadius: '0.2rem',
                                                                            fontSize: '0.75rem',
                                                                            minWidth: 'auto',
                                                                            height: '24px',
                                                                            width: '24px'
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {index < projectNotes.length - 1 && <hr />}
                                                        </div>
                                                    ))}
                                                </Card>
                                            )}
                                        </Col>
                                    </Row>

                                      <Row>
                                        <Col lg={12}>

                                            <div className="d-flex justify-content-end">
                                                <PrimeButton
                                                    type="button"
                                                    label="Add Notes"
                                                    icon="pi pi-plus"
                                                    className="p-button p-button-primary add-notes-btn"
                                                    onClick={handleAddNotes}
                                                    style={{
                                                        backgroundColor: '#e0e0ea',
                                                        border: '1px solid #e0e0ea',
                                                        color: '#000000',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '0.25rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = '#ffffff';
                                                        e.target.style.color = '#000000';
                                                        e.target.style.border = '1px solid #ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#e0e0ea';
                                                        e.target.style.color = '#000000';
                                                        e.target.style.border = '1px solid #e0e0ea';
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>


                            {/* Notes end */}
                        </Col>

                        {/* Project Description */}
                        <Col xl={7}>
                            <Card className="bg-form screening-que">
                                <CardBody>
                                    <h4 className="card-title mb-3">Project Description</h4>
                                    <div className="add-que-card mb-4">
                                        <Row>
                                            <Col xl={12}>
                                                <Row className="sidebar d-flex align-items-center">
                                                    <Col xl={6}>
                                                        <label htmlFor="description" className="block mb-2">
                                                            Description
                                                        </label>
                                                    </Col>
                                                    <Col lg={6} className="d-flex justify-content-end mt-2">
                                                        <Button color="primary" className="btn btn-primary aibtn">
                                                            <i className="pi pi-star me-1"></i>
                                                            Write with AI
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={12}>
                                                        <div className="p-field mb-0">
                                                            <Editor
                                                                value={content}
                                                                onTextChange={handleEditorChange}
                                                                headerTemplate={header}
                                                                style={{ height: '200px' }}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <ConfirmDialog />
                                </CardBody>
                            </Card>



                            {/* phases start */}

                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2"> Project Execution Phases</h4>
                                    <EstimateTable />
                                </CardBody>

                                

                                <Dialog
                                    header="Add Document"
                                    visible={displayDialog}
                                    onHide={closeAddDocumentDialog}
                                    style={{ width: "30vw" }}
                                    footer={
                                        <div>
                                            <Button color="primary btn-main mr-2" onClick={handleAddDocument}>
                                                Add Document
                                            </Button>
                                            <Button color="btn btn-primary cancel-outlinebtn" onClick={closeAddDocumentDialog}>
                                                <i className="pi pi-times me-1"></i>
                                                Cancel
                                            </Button>
                                        </div>
                                    }
                                >
                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="type" className="block mb-2">
                                                Type
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <Dropdown
                                                value={selectedDocument}
                                                onChange={(e) => setSelectedDocument(e.value)}
                                                options={groupedDocuments}
                                                optionLabel="label"
                                                optionGroupLabel="label"
                                                optionGroupChildren="items"
                                                optionGroupTemplate={groupedItemTemplate}
                                                className="w-full bgclr"
                                                style={{ border: '1px solid #ced4da' }}
                                                placeholder="Select a Document"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="subject" className="block mb-2">
                                                Description
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <InputText
                                                id="subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="attachment" className="block mb-2">
                                                Attachment
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                url="/api/upload"
                                                accept="*/*"
                                                maxFileSize={1000000}
                                                onUpload={handleUpload}
                                                customUpload
                                                uploadHandler={customBase64Uploader2}
                                                className="custom-fileupload"
                                            />
                                        </Col>
                                    </Row>
                                </Dialog>
                            </Card>

                            {/* pharses end */}


                                {/* phases delay start */}

                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2"> Reason for Delay</h4>
                                    <EstimateDelay />
                                </CardBody>

                                

                                <Dialog
                                    header="Add Document"
                                    visible={displayDialog}
                                    onHide={closeAddDocumentDialog}
                                    style={{ width: "30vw" }}
                                    footer={
                                        <div>
                                            <Button color="primary btn-main mr-2" onClick={handleAddDocument}>
                                                Add Document
                                            </Button>
                                            <Button color="btn btn-primary cancel-outlinebtn" onClick={closeAddDocumentDialog}>
                                                <i className="pi pi-times me-1"></i>
                                                Cancel
                                            </Button>
                                        </div>
                                    }
                                >
                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="type" className="block mb-2">
                                                Type
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <Dropdown
                                                value={selectedDocument}
                                                onChange={(e) => setSelectedDocument(e.value)}
                                                options={groupedDocuments}
                                                optionLabel="label"
                                                optionGroupLabel="label"
                                                optionGroupChildren="items"
                                                optionGroupTemplate={groupedItemTemplate}
                                                className="w-full bgclr"
                                                style={{ border: '1px solid #ced4da' }}
                                                placeholder="Select a Document"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="subject" className="block mb-2">
                                                Description
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <InputText
                                                id="subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="attachment" className="block mb-2">
                                                Attachment
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                url="/api/upload"
                                                accept="*/*"
                                                maxFileSize={1000000}
                                                onUpload={handleUpload}
                                                customUpload
                                                uploadHandler={customBase64Uploader2}
                                                className="custom-fileupload"
                                            />
                                        </Col>
                                    </Row>
                                </Dialog>
                            </Card>

                            {/* pharses delay end */}


                           


                        </Col>


                    </Row>

                    <Row className="align-items-center mb-3">
                        <Col md={12}>
                            <div className="d-flex justify-content-end">
                                <Link to="/allactive-project">
                                    <button type="submit" className="btn btn-success me-2" onClick={showMessage}>
                                        <i className="pi pi-save me-1"></i>Save
                                    </button>
                                </Link>
                                <Link to="/allactive-project">
                                    <Button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                        onClick={showCancel}
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectEditForm;