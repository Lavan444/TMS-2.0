import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

import AtsImg from "../../assets/images/ats-logo2.png";
import {

    Button,
    Card,
    CardBody,
    Input,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next";
import { FileUpload } from 'primereact/fileupload';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { InputText, InputTextarea } from 'primereact';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputNumber } from "primereact/inputnumber";
import { TreeSelect } from "primereact/treeselect";
import { Checkbox } from "primereact/checkbox";
import { Editor } from "primereact/editor";
import Select from 'react-select';


const JobsPreviewForm = () => {

    //handle tabs
    const [activeIndex, setActiveIndex] = useState(0); // Track the active tab

    // Function to go to the next tab
    const nextTab = () => {
        if (activeIndex < 6) {  // Adjust '2' if you have more tabs
            setActiveIndex(activeIndex + 1);
        }
    };

    // Function to go to the previous tab
    const previousTab = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    // document.title = "CandidateEditForm | Pms - React Admin & CandidateEditForm Template";
    const [selectedCompany, setSelectedCompany] = useState(null);

    const companies = [
        { label: 'Varun Digital Media', value: 'VDM' },
        { label: 'Pranathi Software Services', value: 'PSS' },
        { label: 'Green Ventures pvt Ltd', value: 'GV' },
        { label: 'Future Tech Solutions', value: 'FTS' },
        { label: 'Healthify Solutions pvt Ltd', value: 'MS' }
    ];

    const [jobtitle, setJobtitle] = useState(null);
    const [workplaceType, setWorkplaceType] = useState(null);

    const workplaceOptions = [
        { name: 'Work from Office', code: 'WFO' },
        { name: 'Work from Home', code: 'WFH' },
        { name: 'Work from Remote', code: 'WFR' }
    ];

    const [jobType, setJobType] = useState(null);

    const jobTypeOptions = [
        { name: 'Full Time', code: 'FT' },
        { name: 'Part Time', code: 'PT' },
        { name: 'Contract', code: 'CON' }
    ];

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departments = [
        { label: 'Account Finance Team', value: 'HR' },
        { label: 'SPG US Staffing', value: 'FIN' },
        { label: 'Vitel Development Team', value: 'MKT' },
        { label: 'Support', value: 'SAL' },
        { label: 'Digital Marketing Team', value: 'DIG' },
        { label: 'Executive Team', value: 'EXE' },
        { label: 'Operations Team', value: 'OPE' }
    ];

    const [selectedLocation, setSelectedLocation] = useState(null);

    const locations = [
        { label: 'Hyderabad', value: 'HYD' },
        { label: 'Chennai', value: 'CHN' },
        { label: 'Mumbai', value: 'MUM' },
        { label: 'Bangalore', value: 'BLR' },
        { label: 'Delhi', value: 'DEL' }
    ];
    const [selectedManager, setSelectedManager] = useState(null);
    const managers = [
    { name: 'Salmanuddin Syed', role: 'Operation Head',  },
    { name: 'Girish Bodepu', role: 'Manager',  },
    { name: 'Suresh Reddy', role: 'Team Lead',  },
    { name: 'Ravi Kumar', role: 'Team Lead', },
    { name: 'Neha Patel', role: 'Team Lead', }

    ];
    const [openings, setOpenings] = useState(null);
    const [totalExperience, setTotalExperience] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState();
    const [minSalary, setMinSalary] = useState(null);
    const [maxSalary, setMaxSalary] = useState(null);
    const [jobStatus, setJobStatus] = useState(null);

    const jobStatusOptions = [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Hold', value: 'hold' }
    ];
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);

    // categories

    const [categories] = useState([
        {
            key: "0",
            label: "Skills",
            children: [
                {
                    key: "0-0",
                    label: "Frontend",
                    children: [
                        { key: "0-0-0", label: "React" },
                        { key: "0-0-1", label: "Angular" },
                        { key: "0-0-2", label: "Bootstrap" },
                    ],
                },
                {
                    key: "0-1",
                    label: "Backend",
                    children: [
                        { key: "0-1-0", label: "Python" },
                        { key: "0-1-1", label: "Java" },
                        { key: "0-1-2", label: "C#" },
                    ],
                },
                {
                    key: "0-2",
                    label: "QA",
                    children: [
                        { key: "0-2-0", label: "Manual" },
                        { key: "0-2-1", label: "Automation" },
                    ],
                },
            ],
        },
    ]);

    const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);

    //groups

    const [groups] = useState([
        {
            key: "0",
            label: "Skills",
            children: [
                {
                    key: "0-0",
                    label: "Frontend",
                    children: [
                        { key: "0-0-0", label: "React" },
                        { key: "0-0-1", label: "Angular" },
                        { key: "0-0-2", label: "Bootstrap" },
                    ],
                },
                {
                    key: "0-1",
                    label: "Backend",
                    children: [
                        { key: "0-1-0", label: "Python" },
                        { key: "0-1-1", label: "Java" },
                        { key: "0-1-2", label: "C#" },
                    ],
                },
                {
                    key: "0-2",
                    label: "QA",
                    children: [
                        { key: "0-2-0", label: "Manual" },
                        { key: "0-2-1", label: "Automation" },
                    ],
                },
            ],
        },
    ]);

    const [selectedGroupKey, setSelectedGroupKey] = useState(null);


    //editor

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

    const [content, setContent] = useState("");
    const maxWords = 500;

    // Function to calculate word count
    const calculateWordCount = (text) => {
        const words = text
            .trim()
            .replace(/<[^>]*>/g, "") // Remove HTML tags
            .split(/\s+/); // Split by whitespace
        return words.filter((word) => word).length; // Filter out empty words
    };

    // Current word count
    const currentWordCount = calculateWordCount(content);

    // Handle editor input
    const handleEditorChange = (e) => {
        const text = e.htmlValue || ""; // Get the HTML content
        if (calculateWordCount(text) <= maxWords) {
            setContent(text); // Only update content if within word limit
        }
    };

    //skills

    const [skillsOptions, setSkillsOptions] = useState([
        { value: "java", label: "Java" },
        { value: "react", label: "React" },
        { value: "nodejs", label: "Node.js" },
        // Add more skill options as needed
    ]);

    const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([]);
    const [selectedSecondarySkills, setSelectedSecondarySkills] = useState([]);

    // Handle Primary Skills Selection
    const handlePrimarySkillsChange = (selectedOptions) => {
        setSelectedPrimarySkills(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    // Handle Secondary Skills Selection
    const handleSecondarySkillsChange = (selectedOptions) => {
        setSelectedSecondarySkills(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const [selectedJobFunction, setSelectedJobFunction] = useState(null);

    const jobFunctions = [
        { name: 'Software Engineer', code: 'SE' },
        { name: 'Product Manager', code: 'PM' },
        { name: 'Data Scientist', code: 'DS' },
        { name: 'UX/UI Designer', code: 'UI' },
        { name: 'Marketing Manager', code: 'MM' }
    ];

    const [selectedSeniority, setSelectedSeniority] = useState(null);

    const seniorityLevels = [
        { name: 'Junior', code: 'JR' },
        { name: 'Mid-Level', code: 'ML' },
        { name: 'Senior', code: 'SR' },
        { name: 'Lead', code: 'LD' },
        { name: 'Manager', code: 'MG' },
        { name: 'Director', code: 'DIR' },
        { name: 'VP', code: 'VP' },
        { name: 'C-Level', code: 'C' }
    ];

    // screening questions
    const [queVisible, setQueVisible] = useState(false);
    const [isQualificationRequired, setIsQualificationRequired] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // Handle form submission
    const handleCreate = () => {
        // Add the new question data to the DataTable
        const newQuestion = {
            question: question,
            answer: answer,
            qualificationRequired: isQualificationRequired ? "Yes" : "No"
        };
        setQuestionsData([...questionsData, newQuestion]);

        // Reset the form fields
        setQuestion("");
        setAnswer("");
        setIsQualificationRequired(false);

        // Close the dialog
        setQueVisible(false);
    };


    // screening questions
    const [questions, setQuestions] = useState([]);

    // Function to add a new question card
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { skill: "", experience: "", qualification: false },
        ]);
    };

    // Function to update a question
    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    // Function to remove a question card
    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // Handle form submissionfrelocationOptions
    const handleSubmit = () => {
        const formData = {

        };

        setSubmittedData(formData);
        setShowDialog(true); // Show the dialog
    };

    const handleCloseDialog = () => {
        setShowDialog(false); // Close the dialog
    };
    const [showDialog, setShowDialog] = useState(false);
    // State to hold the submitted data
    const [submittedData, setSubmittedData] = useState({});

    return (
        <React.Fragment>
            <header id="page-topbar">
                <div className="navbar-header candidate-form">
                    <Container fluid={true}>
                        <Row className="align-items-center justify-content-between">
                            <Col lg={8}>
                                <div className="d-flex">
                                    <div className="navbar-brand-box">
                                        <Link to="/" className="logo logo-dark">
                                            <span className="logo-sm">
                                                <img src={AtsImg} height="50" />
                                            </span>
                                            <span className="logo-lg">
                                                <img src={AtsImg} height="50" />
                                            </span>
                                        </Link>

                                        <Link to="/" className="logo logo-light">
                                            <span className="logo-sm favicon-logo">
                                                <img src={AtsImg} alt="" height="50" />
                                            </span>
                                            <span className="logo-lg barath-logo">
                                                <img src={AtsImg} alt="" height="50" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="d-flex justify-content-end">
                                    <p className="me-3">Home</p>
                                    <p>Help</p>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </header>
            <div className="page-content candidate-form job-details">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <h3 className="candet-head">Job Details Form</h3>
                        </Col>
                        <Col lg={4}>
                            <h5>Upload Job Description</h5>
                            <div className="">
                                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} className="file-upload-input" />
                            </div>
                        </Col>
                    </Row>
                    <Row className="tabs">
                        <Col>
                            <TabView className="tabview-sett" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                                <TabPanel header="Basic Information" leftIcon="pi pi-info-circle mr-2">
                                    <Row className="mb-3">
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="jobId" className="block">Job ID</label>
                                                <InputText id="jobId" value="Job - 101" readOnly className="w-full" />

                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="jobTitle" className="block">Job Title</label>
                                                <InputText
                                                    id="integer"

                                                    className="w-full"
                                                    value={jobtitle}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="jobStatus" className="block">Job Status</label>
                                                <Dropdown
                                                    id="jobStatus"
                                                    value={jobStatus}
                                                    options={jobStatusOptions}
                                                    onChange={(e) => setJobStatus(e.value)}
                                                    placeholder="Select Job Status"
                                                    className="w-full bgclr"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="noOfOpenings" className="block">Number of Openings</label>
                                                <InputNumber
                                                    id="openings"
                                                    value={openings}
                                                    onValueChange={(e) => setOpenings(e.value)}
                                                    placeholder=""
                                                    className="w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="experienceRequired" className="block">Experience Required</label>
                                                <InputNumber
                                                    inputId="totalExperience"
                                                    value={totalExperience}
                                                    onValueChange={(e) => setTotalExperience(e.value)}
                                                    placeholder=""
                                                    className="w-full drop-clr"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="d-flex justify-content-between mt-4">
                                                <button type="submit" class="btn btn-primary btn-main">Previous</button>
                                                <button type="submit" class="btn btn-primary btn-main" onClick={nextTab}>Next</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="Hiring Details" leftIcon="pi pi-briefcase mr-2">
                                    <Row className="mb-3">
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="hiringManager" className="block">Hiring Manager</label>
                                                <Dropdown
                                                    value={selectedManager}
                                                    onChange={(e) => setSelectedManager(e.value)}
                                                    options={managers}
                                                    optionLabel="name"
                                                    placeholder="Select a Hiring Manager"
                                                    className="w-full bgclr"
                                                    filter
                                                    showClear
                                                    filterBy="label"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="company" className="block">Company</label>
                                                <Dropdown
                                                    id="company"
                                                    value={selectedCompany}
                                                    options={companies}
                                                    onChange={(e) => setSelectedCompany(e.value)}
                                                    placeholder="Select Company"
                                                    filter
                                                    filterBy="label" // Enables search by company name
                                                    className="w-full bgclr"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="jobLocation" className="block">Job Location</label>
                                                <Dropdown
                                                    id="jobLocation"
                                                    value={selectedLocation}
                                                    options={locations}
                                                    onChange={(e) => setSelectedLocation(e.value)}
                                                    placeholder="Select Job Location"
                                                    filter
                                                    filterBy="label"
                                                    className="w-full bgclr"
                                                />
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className="mb-3">
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="workplaceType" className="block">Workplace Type</label>
                                                <Dropdown
                                                    value={workplaceType}
                                                    onChange={(e) => setWorkplaceType(e.value)}
                                                    options={workplaceOptions}
                                                    optionLabel="name"
                                                    placeholder="Select Workplace Type"
                                                    className="w-full bgclr"
                                                    filter
                                                    filterBy="label"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="jobType" className="block">Job Type</label>
                                                <Dropdown
                                                    value={jobType}
                                                    onChange={(e) => setJobType(e.value)}
                                                    options={jobTypeOptions}
                                                    optionLabel="name"
                                                    placeholder="Select Job Type"
                                                    className="w-full bgclr"
                                                    filter
                                                    filterBy="label"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="minSalary" className="block">Minimum Salary</label>
                                                <InputNumber
                                                    inputId="minSalary"
                                                    value={minSalary}
                                                    onValueChange={(e) => setMinSalary(e.value)}
                                                    mode="currency"
                                                    currency="INR"
                                                    locale="en-IN"
                                                    placeholder=""
                                                    className="w-full"
                                                />
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className="mb-3">
                                        <Col lg={3}>
                                            <div className="p-field">
                                                <label htmlFor="maxSalary" className="block">Maximum Salary</label>
                                                <InputNumber
                                                    inputId="maxSalary"
                                                    value={maxSalary}
                                                    onValueChange={(e) => setMaxSalary(e.value)}
                                                    mode="currency"
                                                    currency="INR"
                                                    locale="en-IN"
                                                    placeholder=""
                                                    className="w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="p-field">
                                                <label htmlFor="department" className="block">Department</label>
                                                <Dropdown
                                                    id="department"
                                                    value={selectedDepartment}
                                                    options={departments}
                                                    onChange={(e) => setSelectedDepartment(e.value)}
                                                    placeholder="Select Department"
                                                    className="w-full bgclr"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="d-flex justify-content-between mt-4">
                                                <button type="submit" class="btn btn-primary btn-main" onClick={previousTab}>Previous</button>
                                                <button type="submit" class="btn btn-primary btn-main" onClick={nextTab}>Next</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPanel>


                                <TabPanel header="Job description" leftIcon="pi pi-file mr-2">

                                    <Row className="mb-3">
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="primarySkills" className="block">Primary Skills</label>
                                                <Select
                                                    id="primarySkills"
                                                    name="primarySkills"
                                                    isMulti
                                                    options={skillsOptions}
                                                    value={skillsOptions.filter(option => selectedPrimarySkills.includes(option.value))}
                                                    onChange={handlePrimarySkillsChange}
                                                    placeholder="Select Primary Skills"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="secondarySkills" className="block">Secondary Skills</label>
                                                <Select
                                                    id="secondarySkills"
                                                    name="secondarySkills"
                                                    isMulti
                                                    options={skillsOptions}
                                                    value={skillsOptions.filter(option => selectedSecondarySkills.includes(option.value))}
                                                    onChange={handleSecondarySkillsChange}
                                                    placeholder="Select Secondary Skills"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="jobFunction" className="block">Job Function</label>
                                                <Dropdown
                                                    value={selectedJobFunction}
                                                    onChange={(e) => setSelectedJobFunction(e.value)}
                                                    options={jobFunctions}
                                                    optionLabel="name"
                                                    placeholder="Select a Job Function"
                                                    className="w-full bgclr"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col lg={4}>
                                            <div className="p-field">
                                                <label htmlFor="seniority" className="block">Seniority</label>
                                                <Dropdown
                                                    value={selectedSeniority}
                                                    onChange={(e) => setSelectedSeniority(e.value)}
                                                    options={seniorityLevels}
                                                    optionLabel="name"
                                                    placeholder="Select Seniority Level"
                                                    className="w-full bgclr"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="sidebar d-flex align-items-center justify-content-between mb-2">
                                                <label htmlFor="description" className="block">Description</label>
                                                {/* <InputTextarea
                                                    id="description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    placeholder="Enter job description"
                                                    rows={5} // Number of visible rows
                                                    cols={30} // Width of the textarea
                                                    className="block w-full"
                                                /> */}
                                                <div className="d-flex justify-content-end mt-2">
                                                    <Button color="primary" className="btn btn-primary aibtn">
                                                        <i class="pi pi-star me-1"></i>
                                                        Write with AI
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="p-field mb-0">
                                                <Editor value={content} onTextChange={handleEditorChange} headerTemplate={header} style={{ height: '240px' }}
                                                    className="w-full" />

                                            </div>
                                            <div style={{ marginTop: "10px", textAlign: "right" }}>
                                                <span>
                                                    {currentWordCount}/{maxWords} words
                                                </span>
                                            </div>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="d-flex justify-content-between mt-4">
                                                <button type="submit" class="btn btn-primary btn-main" onClick={previousTab}>Previous</button>
                                                <button type="submit" class="btn btn-primary btn-main" onClick={nextTab}>Next</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPanel>

                                <TabPanel header="Screening Questions" leftIcon="pi pi-question-circle mr-2">
                                    <Row className="mb-2">
                                        <Col>
                                            <p>We suggest including at least three questions. Applicants are required to answer all questions.</p>
                                            <div>
                                                <div className="block d-flex align-items-center justify-content-end">
                                                    <a
                                                        color="primary"
                                                        className="anchr-title mb-2"
                                                        onClick={handleAddQuestion}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <i className="pi pi-plus me-1"></i> Add Questions
                                                    </a>
                                                </div>

                                                {/* Render dynamic question cards */}
                                                {questions.map((q, index) => (
                                                    <div className="add-que-card p-3 mb-3 border rounded position-relative" key={index}>
                                                        {/* Close Icon */}
                                                        <i
                                                            className="pi pi-times position-absolute"
                                                            style={{
                                                                top: "10px",
                                                                right: "10px",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => handleRemoveQuestion(index)}
                                                            title="Remove Question"
                                                        ></i>

                                                        <p className="mb-2">How many years of experience do you have with [skill]?</p>
                                                        <Row className="mb-2 align-items-center">
                                                            <Col xl={4}>
                                                                <label htmlFor={`skill-${index}`} className="block">
                                                                    Skill *
                                                                </label>
                                                                <InputText
                                                                    id={`skill-${index}`}
                                                                    value={q.skill}
                                                                    onChange={(e) =>
                                                                        handleQuestionChange(index, "skill", e.target.value)
                                                                    }
                                                                    className="w-full"
                                                                    placeholder="Enter skill"
                                                                />
                                                            </Col>
                                                            <Col xl={4}>
                                                                <label htmlFor={`experience-${index}`} className="block">
                                                                    Ideal answer (minimum)
                                                                </label>
                                                                <InputText
                                                                    id={`experience-${index}`}
                                                                    value={q.experience}
                                                                    onChange={(e) =>
                                                                        handleQuestionChange(index, "experience", e.target.value)
                                                                    }
                                                                    className="w-full"
                                                                    placeholder="Enter years of experience"
                                                                />
                                                            </Col>
                                                            <Col xl={4}>
                                                                <div className="d-flex align-items-center mt-4">
                                                                    <Checkbox
                                                                        inputId={`qualification-${index}`}
                                                                        checked={q.qualification}
                                                                        onChange={(e) =>
                                                                            handleQuestionChange(index, "qualification", e.checked)
                                                                        }
                                                                    />
                                                                    <label htmlFor={`qualification-${index}`} className="ms-2 mt-1">
                                                                        Must Have Qualification
                                                                    </label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}
                                            </div>

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={12}>
                                            <div className="d-flex justify-content-between mt-4">
                                                <button type="submit" class="btn btn-primary btn-main" onClick={previousTab}>Previous</button>
                                                <button type="submit" class="btn btn-primary btn-main" onClick={handleSubmit}>Preview</button>
                                            </div>
                                        </Col>
                                    </Row>

                                </TabPanel>

                            </TabView>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <Dialog className="details-dialog" header="Review Job Description" visible={showDialog} onHide={handleCloseDialog}
                                    breakpoints={{ '960px': '75vw' }} style={{ width: '60vw' }}>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="card p-4">
                                                <Row className="d-flex justify-content-between">
                                                    <Col lg={6}>

                                                        <p className="mb-1">
                                                            ID: 3048
                                                        </p>
                                                        <h4 className="pre-txthead me-2">Software Developer</h4>
                                                        <div>
                                                            <p>Tech Solutions Inc.</p>
                                                        </div>
                                                        <div>
                                                            <Button className="idbtn me-2">
                                                                open
                                                            </Button>
                                                            <Button className="openbtn me-2">
                                                                5 Openings
                                                            </Button>
                                                            <Button className="idbtn">
                                                                Work From Remote
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6} className="d-flex justify-content-end">
                                                        <div>
                                                            <p className="mb-1">Salary Range</p>
                                                            <strong> 30,000-70,000</strong>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="card p-4">
                                                <Row className="d-flex justify-content-between">
                                                    <Col lg={12}>
                                                        <div className="d-flex">
                                                            <div>
                                                                <i class="pi pi-info-circle me-2 diaicon"></i>
                                                            </div>
                                                            <h4 className="pre-txthead">Basic Information</h4>
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <div className="me-2">
                                                                <i class="pi pi-briefcase"></i>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">Experience Required</p>
                                                                <strong>2.5 years of experience</strong>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <div className="me-2">
                                                                <i class="pi pi-user"></i>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">Job Type</p>
                                                                <strong>Full Time</strong>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="me-2">
                                                                <i class="pi pi-sitemap"></i>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">Department</p>
                                                                <strong>Human Resources</strong>
                                                            </div>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="card p-4">
                                                <Row className="d-flex justify-content-between">
                                                    <Col lg={12}>
                                                        <div className="d-flex">
                                                            <div>
                                                                <i className="pi pi-map-marker me-2 diaicon"></i>

                                                            </div>
                                                            <h4 className="pre-txthead">Location & Contact</h4>
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <div className="me-2">
                                                                <i class="pi pi-map-marker"></i>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">Location</p>
                                                                <strong>Hyderabad</strong>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <div className="me-2">
                                                                <i class="pi pi-users"></i>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">Hiring Manager</p>
                                                                <strong>Full Time</strong>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="me-2">
                                                                <i class="pi pi-building"></i>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">Company</p>
                                                                <strong>Pranathi Software Services</strong>
                                                            </div>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="card p-4">
                                                <Row className="d-flex justify-content-between">
                                                    <Col lg={12}>
                                                        <div className="d-flex">
                                                            <div>
                                                                <i className="pi pi-check-circle me-2 diaicon"></i>
                                                            </div>
                                                            <h4 className="pre-txthead">Skills</h4>
                                                        </div>
                                                        <div className="mb-2">
                                                            <div className="mb-1">
                                                                <strong>Primary Skills</strong>
                                                            </div>
                                                            <div>
                                                                <Button className="skillbtn me-2">
                                                                    Html
                                                                </Button>
                                                                <Button className="skillbtn me-2">
                                                                    CSS
                                                                </Button>
                                                                <Button className="skillbtn me-2">
                                                                    Bootstrap
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className="mb-2">
                                                            <div className="mb-1">
                                                                <strong>Secondary Skills</strong>
                                                            </div>
                                                            <div>
                                                                <Button className="skillbtn me-2">
                                                                    React Js
                                                                </Button>
                                                                <Button className="skillbtn me-2">
                                                                    Jquery
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="card p-4">
                                                <Row className="d-flex justify-content-between">
                                                    <Col lg={12}>
                                                        <div className="d-flex">
                                                            <div>
                                                                <i className="pi pi-book me-2 diaicon"></i>
                                                            </div>
                                                            <h4 className="pre-txthead">Job Description</h4>
                                                        </div>
                                                        <p>
                                                            Job description Who You Are: Youre a skilled Flutter Developer with a passion for building sleek, high-performance cross-platform apps.
                                                            You thrive in a fast-paced environment the latest in Flutter.
                                                            Job description Who You Are: Youre a skilled Flutter Developer with a passion for building sleek, high-performance cross-platform apps.
                                                            You thrive in a fast-paced environment the latest in Flutter.
                                                        </p>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="card p-4">
                                                <Row className="d-flex justify-content-between">
                                                    <Col lg={12}>
                                                        <div className="d-flex">
                                                            <div>
                                                                <i className="pi pi-question-circle me-2 diaicon"></i>
                                                            </div>
                                                            <h4 className="pre-txthead">Screening Questions</h4>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0"><strong>How many years of experience do you have with React.js development?</strong> {submittedData.fullname}</p>
                                                            <p>5 years of experience working on React.js, including building scalable web applications.</p>
                                                            <p className="mb-0"><strong>What is the minimum experience you believe is ideal for working effectively with React.js?</strong> {submittedData.fullname}</p>
                                                            <p>At least 3 years of hands-on experience with React.js, including state management libraries like Redux.</p>
                                                            <p className="mb-0"><strong>How many years of experience do you have with Python for data analysis?</strong> {submittedData.company}</p>
                                                            <p>4 years of experience using Python for data wrangling, analysis, and visualization.</p>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-between mt-4">
                                        <button type="submit" class="btn btn-primary btn-main" onClick={handleCloseDialog}>Submit</button>
                                    </div>
                                </Dialog>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <footer className="footer footer-back detailsformfooter">
                <Container fluid={true}>
                    <Row className="d-flex">
                        <Col lg={6} md={6} xs={12}>
                            <p className="d-flex justify-content-start mb-0"> &copy; 2025 ATS System. All rights reserved.</p>
                        </Col>
                        <Col lg={6} md={6} xs={12}>
                            <div className="d-flex justify-content-start justify-content-md-end">
                                <p className="me-3 mb-0">Privacy Policy</p>
                                <p className="me-3 mb-0">Terms of Service</p>
                                <p className="mb-0">Contact</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>

        </React.Fragment>
    );
};



export default JobsPreviewForm;
