import PropTypes from "prop-types"
import React, { useState, useEffect, useRef } from "react"
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Input,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from "reactstrap"
import WorkType1 from "../common-for-all/WorkTypeOne"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
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
import Select from 'react-select';
import { Toast } from 'primereact/toast';
import { Link } from "react-router-dom";
import { FileUpload } from 'primereact/fileupload';
import WorkType from "../common-for-all/WorkType";
import AddProjectDetails from "pms/common-for-all/AddProjectDetails"

const WorkTypeEditForm = props => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [createdBy, setcreatedBy] = useState("Harish")

    // Document states - consolidated and cleaned up
    const [displayDialog, setDisplayDialog] = useState(false);
    const [documents, setDocuments] = useState([{
        type: "Project Requirements",
        subject: "Initial project requirements document",
    }]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [selectedStatus1, setSelectedStatus1] = useState(null);

    // Private functionality
    const [privateDrop, setPrivateDrop] = useState([]);
    const [popchecked2, setPopchecked2] = useState(false);
    
    const PrivetDropdownValues = [
        { name: "Harish", value: "Harish" },
        { name: "Mahesh", value: "Mahesh" },
        { name: "Lavan", value: "Lavan" },
        { name: "Vinay", value: "Vinay" },
        { name: "Vasanth", value: "Vasanth" }
    ];
    
    const handlePopupCheckbox2 = e => {
        setPopchecked2(e.checked);
        if (!e.checked) {
            setPrivateDrop([]);
        }
    };

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
    const [projectNameWorkTypes, setProjectNameWorkTypes] = useState([
        {
            name: 'AI Generator (Proj-101)',
            color: '#4c9aff',
            id: 'ai-generator',
            statuses: ['Planning', 'In Progress', 'Testing', 'Completed']
        },
        {
            name: 'Mobile App Development',
            color: '#36b37e',
            id: 'mobile-app',
            statuses: ['Planning', 'In Progress', 'Testing', 'Completed']
        },
        {
            name: 'Website Redesign',
            color: '#ff5630',
            id: 'website-redesign',
            statuses: ['Planning', 'In Progress', 'Testing', 'Completed']
        }
    ]);

    const [moduleWorkTypes, setModuleWorkTypes] = useState([
        {
            name: 'User Management',
            color: '#4c9aff',
            id: 'user-management',
            statuses: ['To Do', 'In Progress', 'Done']
        },
        {
            name: 'Authentication Module',
            color: '#36b37e',
            id: 'auth-module',
            statuses: ['To Do', 'In Progress', 'Done'
            ]
        },
        {
            name: 'Payment Gateway',
            color: '#ff5630',
            id: 'payment-gateway',
            statuses: ['To Do', 'In Progress', 'Done']
        }
    ]);

    const [watcherWorkTypes, setWatcherWorkTypes] = useState([
        {
            name: 'Ravi Sharma',
            color: '#4c9aff',
            id: 'ravi-sharma',
            statuses: ['Available', 'Busy', 'Offline']
        },
        {
            name: 'Priya Sharma - Designer',
            color: '#36b37e',
            id: 'priya-sharma',
            statuses: ['Available', 'Busy', 'Offline']
        },
        {
            name: 'Amit Singh - Tester',
            color: '#ff5630',
            id: 'amit-singh',
            statuses: ['Available', 'Busy', 'Offline']
        }
    ]);

    const [taskWorkTypes, setTaskWorkTypes] = useState([
        {
            name: 'Task',
            color: '#4c9aff',
            id: 'task',
            statuses: ['To Do', 'In Progress', 'Done']
        },
        {
            name: 'Bug',
            color: '#ff5630',
            id: 'bug',
            statuses: ['Open', 'In Progress', 'Fixed', 'Closed']
        },
        {
            name: 'Story',
            color: '#36b37e',
            id: 'story',
            statuses: ['To Do', 'In Progress', 'Done']
        }
    ]);

    const [statusWorkTypes, setStatusWorkTypes] = useState([
        {
            name: 'To Do',
            color: '#6c757d',
            id: 'todo',
            statuses: ['Open', 'Assigned']
        },
        {
            name: 'In Progress',
            color: '#007bff',
            id: 'in-progress',
            statuses: ['Active', 'Working']
        },
        {
            name: 'In Review',
            color: '#28a745',
            id: 'in-review',
            statuses: ['Completed', 'Closed']
        },
        {
            name: 'Testing / QA',
            color: '#6c757d',
            id: 'testing-qa',
            statuses: ['Open', 'Assigned']
        },
        {
            name: 'Blocked',
            color: '#007bff',
            id: 'in-progress',
            statuses: ['Active', 'Working']
        },
        {
            name: 'Done',
            color: '#28a745',
            id: 'done',
            statuses: ['Completed', 'Closed']
        },
        {
            name: 'Cancelled',
            color: '#dc3545',
            id: 'cancelled',
            statuses: ['Cancelled']
        }
    ]);

    const [priorityWorkTypes, setPriorityWorkTypes] = useState([
        {
            name: 'High',
            color: '#dc3545',
            id: 'high',
            statuses: ['Critical', 'Urgent']
        },
        {
            name: 'Medium',
            color: '#ffc107',
            id: 'medium',
            statuses: ['Normal', 'Standard']
        },
        {
            name: 'Low',
            color: '#28a745',
            id: 'low',
            statuses: ['Minor', 'Optional']
        }
    ]);

    const [approvalStatusWorkTypes, setApprovalStatusWorkTypes] = useState([
        {
            name: 'Approved',
            color: '#28a745',
            id: 'active',
            statuses: ['Approved', 'Live']
        },
        {
            name: 'Rejected',
            color: '#6c757d',
            id: 'inactive',
            statuses: ['Disabled', 'Paused']
        },
        {
            name: 'Pending',
            color: '#ffc107',
            id: 'pending',
            statuses: ['Under Review', 'Waiting']
        }
    ]);

    // Callback handlers for work type changes
    const handleProjectNameWorkTypesChange = (updatedWorkTypes) => {
        setProjectNameWorkTypes(updatedWorkTypes);
    };

    const handleModuleWorkTypesChange = (updatedWorkTypes) => {
        setModuleWorkTypes(updatedWorkTypes);
    };

    const handleWatcherWorkTypesChange = (updatedWorkTypes) => {
        setWatcherWorkTypes(updatedWorkTypes);
    };

    const handleTaskWorkTypesChange = (updatedWorkTypes) => {
        setTaskWorkTypes(updatedWorkTypes);
    };

    const handleStatusWorkTypesChange = (updatedWorkTypes) => {
        setStatusWorkTypes(updatedWorkTypes);
    };

    const handlePriorityWorkTypesChange = (updatedWorkTypes) => {
        setPriorityWorkTypes(updatedWorkTypes);
    };

    const handleApprovalStatusWorkTypesChange = (updatedWorkTypes) => {
        setApprovalStatusWorkTypes(updatedWorkTypes);
    };

    // Selection change handlers
    const handleProjectNameSelectionChange = (selectedWorkType) => {
        console.log('Selected Project:', selectedWorkType);
    };

    const handleModuleSelectionChange = (selectedWorkType) => {
        console.log('Selected Module:', selectedWorkType);
    };

    const handleWatcherSelectionChange = (selectedWorkType) => {
        console.log('Selected Watcher:', selectedWorkType);
    };

    const handleTaskSelectionChange = (selectedWorkType) => {
        console.log('Selected Task Type:', selectedWorkType);
    };

    const handleStatusSelectionChange = (selectedWorkType) => {
        console.log('Selected Status:', selectedWorkType);
    };

    const handlePrioritySelectionChange = (selectedWorkType) => {
        console.log('Selected Priority:', selectedWorkType);
    };

    const handleApprovalStatusSelectionChange = (selectedWorkType) => {
        console.log('Selected Approval Status:', selectedWorkType);
    };

    const companies = [
        { label: 'Tech Solutions Inc.', value: 'Tech Solutions Inc.' },
        { label: 'Innovatech Ltd.', value: 'Innovatech Ltd.' },
        { label: 'Future Vision Corp.', value: 'Future Vision Corp.' },
        { label: 'Global Dynamics', value: 'Global Dynamics' }
    ];
    const [jobtitle, setJobtitle] = useState("Web Developer");
    const [workplaceType, setWorkplaceType] = useState(null);

    const workplaceOptions = [
        { name: 'Work from Office (WFO)', code: 'WFO' },
        { name: 'Work from Home (WFH)', code: 'WFH' },
        { name: 'Work from Remote (WFR)', code: 'WFR' }
    ];

    const [jobType, setJobType] = useState(null);

    const jobTypeOptions = [
        { name: 'Full Time', code: 'FT' },
        { name: 'Part Time', code: 'PT' },
        { name: 'Contract', code: 'CON' }
    ];

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departments = [
        { label: 'Account Finance Team', value: 'Account Finance Team' },
        { label: 'SPG US Staffing', value: 'SPG US Staffing' },
        { label: 'Vitel Development Team', value: 'Vitel Development Team' },
        { label: 'Support Team', value: 'Support Team' },
        { label: 'NOC Team', value: 'NOC Team' },
        { label: 'Digital Marketing Team', value: 'Digital Marketing Team' },
        { label: 'Executive Team', value: 'Executive Team' },
        { label: 'Operations Team', value: 'Operations Team' }
    ];


    const [selectedLocation, setSelectedLocation] = useState(null);

    const locations = [
        { label: 'Hyderabad', value: 'Hyderabad' },
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Delhi', value: 'Delhi' }
    ];

    const [selectedManager, setSelectedManager] = useState(null);
    const managers = [
        { name: 'Ram Mohan', role: 'HR', code: 'HR' },
        { name: 'Sita Verma', role: 'Manager', code: 'MGR' },
        { name: 'Amit Sharma', role: 'Team Lead', code: 'TL' },
        { name: 'Ravi Kapoor', role: 'CEO', code: 'CEO' },
        { name: 'Neha Patel', role: 'Intern', code: 'INT' }
    ];
    const [openings, setOpenings] = useState("5");
    const [totalExperience, setTotalExperience] = useState("3");
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState();
    const [minSalary, setMinSalary] = useState("600000");
    const [maxSalary, setMaxSalary] = useState("800000");
    const [jobStartDate, setJobStartDate] = useState(null);
    const [jobendDate, setJobendDate] = useState(null);
    const [jobActualDate, setJobActualDate] = useState(null);

    const [selectedMod, setSelectedMod] = useState(null)
    const [selectedWatchers, setSelectedWatchers] = useState(null)
    const [approvalStatus, setApprovalStatus] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
    const [selectedGroupKey, setSelectedGroupKey] = useState(null);
    const [skillsOptions, setSkillsOptions] = useState([
        { value: "java", label: "Java" },
        { value: "react", label: "React" },
        { value: "nodejs", label: "Node.js" },
    ]);
    const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([]);
    const [selectedSecondarySkills, setSelectedSecondarySkills] = useState([]);
    const [selectedJobFunction, setSelectedJobFunction] = useState(null);
    const [selectedSeniority, setSelectedSeniority] = useState(null);
    const [queVisible, setQueVisible] = useState(false);
    const [isQualificationRequired, setIsQualificationRequired] = useState(false);
    const [isQualificationRequired1, setIsQualificationRequired1] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [question, setQuestion] = useState("CSS");
    const [answer, setAnswer] = useState("3");
    const [question1, setQuestion1] = useState("Html");
    const [answer1, setAnswer1] = useState("3");
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState("Frontend");
    const [group, setGroup] = useState("Html, CSS");

    // Define dropdownWorkTypes for Project Name, Module, Status, Priority, Watcher, etc.
    const projectNameDropdownWorkTypes = [
        ...projectNameWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Project', id: 'create-new-work-type' },
        { name: 'Edit Project', id: 'edit-selected-work-type' }
    ];

    const moduleDropdownWorkTypes = [
        ...moduleWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Module', id: 'create-new-work-type' },
        { name: 'Edit Module', id: 'edit-selected-work-type' }
    ];

    const watcherDropdownWorkTypes = [
        ...watcherWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Watcher', id: 'create-new-work-type' },
        { name: 'Edit Watcher', id: 'edit-selected-work-type' }
    ];

    const taskDropdownWorkTypes = [
        ...taskWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Task Type', id: 'create-new-work-type' },
        { name: 'Edit Task Type', id: 'edit-selected-work-type' }
    ];

    const statusDropdownWorkTypes = [
        ...statusWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Status', id: 'create-new-work-type' },
        { name: 'Edit Status', id: 'edit-selected-work-type' }
    ];

    const priorityDropdownWorkTypes = [
        ...priorityWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Priority', id: 'create-new-work-type' },
        { name: 'Edit Priority', id: 'edit-selected-work-type' }
    ];

    const approvalStatusDropdownWorkTypes = [
        ...approvalStatusWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Status', id: 'create-new-work-type' },
        { name: 'Edit Status', id: 'edit-selected-work-type' }
    ];

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

    const toast = useRef(null);

    const showMessage = () => {
        toast.current.show({ severity: 'info', summary: 'Job ID 3048 Saved' });
    };

    const showCancel = () => {
        toast.current.show({ severity: 'error', summary: 'Cancelled', life: 3000 });
    }

    return (
        <React.Fragment>
            <div className="page-content create-ajob">
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={6}>
                                <h1 className="page-title">Create Work Type</h1>
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item active">
                                        Add a Work Type with key details for clear tracking and execution. Include a brief description, assign it to the right person, fill in system fields.
                                    </li>
                                </ol>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex justify-content-end">
                                    <Toast ref={toast} />
                                    <Link to="/allactive-worktype">
                                        <button type="submit" className="btn btn-success me-2" >  <i className="pi pi-save me-1"></i> Save </button>
                                    </Link>
                                    <Link to="/allactive-worktype">
                                        <Button
                                            color="primary"
                                            className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
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
                        {/* 1st Row */}
                        <Col xl={5}>
                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Task & Assignment</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">
                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="projectName">Project Name</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <WorkType1
                                                            initialWorkTypes={projectNameWorkTypes}
                                                            dropdownWorkTypes={projectNameDropdownWorkTypes}
                                                            onWorkTypesChange={handleProjectNameWorkTypesChange}
                                                            onSelectionChange={handleProjectNameSelectionChange}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="module">Select Module</label>
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
                                                        <label htmlFor="projectManager">Project Manager</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="projectManager"
                                                            value="Mahesh Kumar Bhoga"
                                                            readOnly
                                                            className="w-full"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="watcher">Add Watcher</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <WorkType1
                                                            initialWorkTypes={watcherWorkTypes}
                                                            dropdownWorkTypes={watcherDropdownWorkTypes}
                                                            onWorkTypesChange={handleWatcherWorkTypesChange}
                                                            onSelectionChange={handleWatcherSelectionChange}
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
                                    <h4 className="card-title mb-2">Timeline & Effort</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">
                                                <Row>
                                                    <Col xl={12} >

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label htmlFor="minSalary" className="block mb-2">
                                                                    Work Hours
                                                                </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <InputNumber
                                                                    inputId="minSalary"
                                                                    value="12"
                                                                    onValueChange={(e) => setMinSalary(e.value)}
                                                                    placeholder="In Hours"
                                                                    className="w-full"
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label htmlFor="jobStartDate" className="block mb-2">Start Date</label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <Calendar
                                                                    id="jobStartDate"
                                                                    value={jobStartDate}
                                                                    onChange={(e) => setJobStartDate(e.value)}
                                                                    dateFormat="dd/mm/yy"
                                                                    placeholder="20/05/2025"
                                                                    className="w-full activejobdrop"
                                                                    showIcon
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label htmlFor="jobendDate" className="block mb-2">Due Date</label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <Calendar
                                                                    id="jobendDate"
                                                                    value={jobendDate}
                                                                    onChange={(e) => setJobendDate(e.value)}
                                                                    dateFormat="dd/mm/yy"
                                                                    placeholder="20/05/2025"
                                                                    className="w-full activejobdrop"
                                                                    showIcon
                                                                />
                                                            </Col>
                                                        </Row>


                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label htmlFor="jobActualDate" className="block mb-2">Actual Date</label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <Calendar
                                                                    id="jobActualDate"
                                                                    value={jobActualDate}
                                                                    onChange={(e) => setJobActualDate(e.value)}
                                                                    dateFormat="dd/mm/yy"
                                                                    placeholder="20/05/2025"
                                                                    className="w-full activejobdrop"
                                                                    showIcon
                                                                />
                                                            </Col>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>


                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Work Type Information</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">



                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="workType">Work Type</label>
                                                    </Col>
                                                    <Col xl={9}>

                                                        <Row className="">

                                                            <Col xl={6}>
                                                                <WorkType />
                                                            </Col>
                                                            <Col xl={6}>
                                                                <InputText
                                                                    id="projectManager"
                                                                    value="STask-101.1"
                                                                    readOnly
                                                                    className="w-full"
                                                                    style={{ border: '1px solid #ced4da' }}
                                                                />
                                                            </Col>
                                                        </Row>


                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="workType">Parent Work Type</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        {/* <WorkType1
                                                            initialWorkTypes={taskWorkTypes}
                                                            dropdownWorkTypes={taskDropdownWorkTypes}
                                                            onWorkTypesChange={handleTaskWorkTypesChange}
                                                            onSelectionChange={handleTaskSelectionChange}
                                                        /> */}
                                                        <AddProjectDetails />
                                                    </Col>
                                                </Row>

                                                {/* <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="taskCode">Code</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="taskCode"
                                                            className="w-full"
                                                            placeholder="Task-101"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row> */}

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="taskSummary">Summary</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="taskSummary"
                                                            className="w-full"
                                                            placeholder="Generate Monthly Report"
                                                            style={{ border: '1px solid #ced4da' }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="taskStatus">Status</label>
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

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="taskPriority">Priority</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <WorkType1
                                                            initialWorkTypes={priorityWorkTypes}
                                                            dropdownWorkTypes={priorityDropdownWorkTypes}
                                                            onWorkTypesChange={handlePriorityWorkTypesChange}
                                                            onSelectionChange={handlePrioritySelectionChange}
                                                        />
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                        </Col>

                        <Col xl={7}>

                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Documents</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div>
                                                {/* Button to trigger the modal */}
                                                {/* <Button
                                                      label="Add Document"
                                                      icon="pi pi-plus"
                                                      className="p-button-success"
                                                      onClick={openAddDocumentDialog}
                                                    /> */}



                                                {/* DataTable to display added documents */}
                                                <Row className="mt-2">
                                                    <Col xl={12}>
                                                        {/* <h5>Added Documents:</h5> */}
                                                        <DataTable value={documents} rows={5} className="p-datatable-gridlines"
                                                            emptyMessage={<div className="empty-message-custom">No education details found.</div>}>
                                                            <Column field="type" header="Type" />
                                                            <Column field="subject" header="Subject" />
                                                            <Column field="file" header="Attachment" body={(rowData) => rowData.file ? rowData.file.name : 'No file'} />
                                                        </DataTable>
                                                    </Col>
                                                </Row>
                                                <div className="block d-flex justify-content-end align-items-center">
                                                    <a color="primary" className="anchr-title  mt-3" onClick={openAddDocumentDialog}>
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
                                                <i className="pi pi-plus me-1"></i>
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
                                            <label htmlFor="documentType" className="block mb-2">
                                                Document Type
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <Dropdown
                                                id="documentType"
                                                value={selectedDocument}
                                                onChange={(e) => setSelectedDocument(e.value)}
                                                options={groupedDocuments}
                                                optionLabel="label"
                                                optionGroupLabel="label"
                                                optionGroupChildren="items"
                                                optionGroupTemplate={groupedItemTemplate}
                                                className="w-full bgclr"
                                                style={{ border: '1px solid #ced4da' }}
                                                placeholder="Select Document Type"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="documentSubject" className="block mb-2">
                                                Document Subject
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <InputText
                                                id="documentSubject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full"
                                                style={{ border: '1px solid #ced4da' }}
                                                placeholder="Enter document subject or description"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 align-items-center">
                                        <Col xl={3}>
                                            <label htmlFor="documentAttachment" className="block mb-2">
                                                File Attachment
                                            </label>
                                        </Col>
                                        <Col xl={9}>
                                            <FileUpload
                                                id="documentAttachment"
                                                mode="basic"
                                                name="documentFile[]"
                                                url="/api/upload"
                                                accept="*/*" // Accept all file types
                                                maxFileSize={5000000} // 5MB limit
                                                onUpload={handleUpload}
                                                customUpload
                                                uploadHandler={customBase64Uploader2}
                                                className="custom-fileupload"
                                                chooseLabel="Choose File"
                                            />
                                        </Col>
                                    </Row>
                                </Dialog>
                            </Card>

                            <Card className="bg-form screening-que">
                                <CardBody>
                                    <h4 className="card-title mb-3">Description</h4>



                                    <div class="add-que-card mb-4">


                                        <Row>
                                            <Col xl={12}>
                                                <Row className="sidebar d-flex align-items-center">
                                                    <Col xl={6}>
                                                        <label
                                                            htmlFor="integer"
                                                            className=" block mb-2"
                                                        >
                                                            Description
                                                        </label>

                                                    </Col>
                                                    <Col lg={6} className="d-flex justify-content-end mt-2">
                                                        <Button color="primary" className="btn btn-primary aibtn">
                                                            <i class="pi pi-star me-1"></i>
                                                            Write with AI
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2 align-items-center">

                                                    <Col xl={12}>
                                                        <div className="p-field mb-0">
                                                            <Editor value={content} onTextChange={handleEditorChange} headerTemplate={header} style={{ height: '100px' }}
                                                                className="w-full" />

                                                        </div>
                                                        {/* <div style={{ marginTop: "10px", textAlign: "right" }}>
                                                                    <span>
                                                                        {currentWordCount}/{maxWords} words
                                                                    </span>
                                                                </div> */}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>





                                    <ConfirmDialog />
                                </CardBody>
                            </Card>



                            {/* <Card className="bg-form screening-que">
                                <CardBody>
                                    <h4 className="card-title mb-3">Phases of Project Development</h4>
                                </CardBody>
                            </Card> */}

                            <Row>
                                <Col xl={6}>


                                    <Card className="bg-form">
                                        <CardBody>
                                            <h4 className="card-title mb-2">Approval Status</h4>
                                            <Row>
                                                <Col xl={12}>
                                                    <div className="">
                                                        <Row>
                                                            <Col xl={12}>


                                                                <Row className="mt-2 align-items-center">
                                                                    <Col xl={3}>
                                                                        <label htmlFor="approvalStatus">Approval Status</label>
                                                                    </Col>
                                                                    <Col xl={9}>
                                                                        <WorkType1
                                                                            initialWorkTypes={approvalStatusWorkTypes}
                                                                            dropdownWorkTypes={approvalStatusDropdownWorkTypes}
                                                                            onWorkTypesChange={handleApprovalStatusWorkTypesChange}
                                                                            onSelectionChange={handleApprovalStatusSelectionChange}
                                                                        />
                                                                    </Col>
                                                                </Row>




                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>





                                </Col>
                                <Col xl={6}>
                                    <Card className="bg-form">
                                        <CardBody>
                                            <h4 className="card-title mb-2">System Fields</h4>
                                            <Row>
                                                <Col xl={12}>
                                                    <div className="">
                                                        <Row>
                                                            <Col xl={12}>
                                                                <Row className="mt-2 align-items-center">
                                                                    <Col xl={3}>
                                                                        <label

                                                                            className=" block"
                                                                        >
                                                                            Create Date
                                                                        </label>
                                                                    </Col>
                                                                    <Col xl={9}>
                                                                        <Calendar
                                                                            id="createDate"
                                                                            placeholder="27/02/2025"
                                                                            className="w-full"
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                <Row className="mt-2 align-items-center">
                                                                    <Col xl={3}>
                                                                        <label

                                                                            className=" block"
                                                                        >
                                                                            Edit Date
                                                                        </label>
                                                                    </Col>
                                                                    <Col xl={9}>
                                                                        <Calendar
                                                                            id="editDate"
                                                                            disabled
                                                                            className="w-full"
                                                                            placeholder="27/02/2025"
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                <Row className="mt-2 align-items-center">
                                                                    <Col xl={3}>
                                                                        <label

                                                                            className=" block"
                                                                        >
                                                                            Created By
                                                                        </label>
                                                                    </Col>
                                                                    <Col xl={9}>
                                                                        <InputText
                                                                            id="integer"
                                                                            className="w-full"
                                                                            disabled
                                                                            value={createdBy}
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                <Row className="mt-2 align-items-center">
                                                                    <Col xl={3}>
                                                                        <label

                                                                            className=" block"
                                                                        >
                                                                            Edited By
                                                                        </label>
                                                                    </Col>
                                                                    <Col xl={9}>
                                                                        <InputText
                                                                            id="integer"
                                                                            className="w-full"
                                                                            placeholder="Harish"
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                {/* Private Section */}
                                                                <Row className="mt-3 align-items-center">
                                                                    <Col xl={12}>
                                                                        <div className="d-flex align-items-center">
                                                                            <Checkbox
                                                                                inputId="checkbox"
                                                                                checked={popchecked2}
                                                                                onChange={handlePopupCheckbox2}
                                                                            />
                                                                            <label htmlFor="checkbox" className="ms-2">
                                                                                Private
                                                                            </label>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                
                                                                {popchecked2 && (
                                                                    <Row className="mt-2 align-items-center">
                                                                        <Col xl={3}>
                                                                            <label htmlFor="privateUsers" className="block">
                                                                                User Id's
                                                                            </label>
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
                                                                                maxSelectedLabels={3}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                )}

                                                                {/* <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                              <label
                            
                                                                className=" block"
                                                              >
                                                                Last Activity Date
                                                              </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                              <Calendar
                                                                id="lastActivityDate"
                                                                className="w-full"
                                                                placeholder="27/02/2025"
                                                                disabled
                                                              />
                                                            </Col>
                                                          </Row> */}


                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>



                                </Col>
                            </Row>



                        </Col>


                        {/* 2nd Row */}

                        {/* <Col xl={4}>
                            

                           

                               

                       
                            

                        </Col> */}








                        {/* 3rd Row */}

                        {/* <Col xl={4}>

                           


                        </Col> */}
                    </Row >

                    <Row className="align-items-center mb-3">

                        <Col md={12}>
                            <div className="d-flex justify-content-end">
                                <Link to="/allactive-worktype">
                                    <button type="submit" class="btn btn-success me-2">  <i className="pi pi-save me-1"></i>Save</button>
                                </Link>

                                <Link to="/allactive-worktype">
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
                </Container >
            </div >
        </React.Fragment >
    )
}

export default WorkTypeEditForm;
