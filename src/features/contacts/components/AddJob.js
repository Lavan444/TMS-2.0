import React, { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardBody, Col, Container, Row, DropdownToggle, DropdownItem, DropdownMenu, } from "reactstrap";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { Editor } from "primereact/editor";
import { Sidebar } from "primereact/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import Select from 'react-select';
import { TreeSelect } from "primereact/treeselect";

const AddJob = () => {

    const [visibleRightJob, setVisibleRightJob] = useState(false);

    // jobs short form starts
    const [jobid, setJobid] = useState("Job-101");
    const [jobtitle, setJobtitle] = useState("Web Developer");
    const [expyears, setExpyears] = useState("3 Years");
    const [jobLocation, setJobLocation] = useState(null);
    const jobLocations = [
        { name: 'Hyderabad', code: 'HYD' },
        { name: 'Chennai', code: 'CHN' },
        { name: 'Mumbai', code: 'MUM' },
        { name: 'Bangalore', code: 'BLR' },
        { name: 'Delhi', code: 'DEL' },
    ];
    const [jobStartDate, setJobStartDate] = useState(null);
    const [jobEndDate, setJobEndDate] = useState(null);

    const [skillsOptions, setSkillsOptions] = useState([
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "Java Script", label: "Java Script" },
        { value: "java", label: "Java" },
        { value: "react", label: "React" },
        { value: "nodejs", label: "Node.js" },
        // Add more skill options as needed
    ]);

    const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([]);
    // Handle Primary Skills Selection
    const handlePrimarySkillsChange = (selectedOptions) => {
        setSelectedPrimarySkills(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const [userids, setUserids] = useState("Harish");

    const [text, setText] = useState(`<strong>Job Description: </strong><br/>
      We are looking for a talented and experienced Web Developer with at least 3 years of experience to join our team. The ideal candidate should have strong expertise in HTML, CSS, and JavaScript and a passion for creating responsive, user-friendly web applications. <br/>
      <br/>
      Key Responsibilities:<br/>
      Develop and maintain web applications using HTML, CSS, and JavaScript.
      Ensure cross-browser compatibility and responsive design.
      Optimize web applications for performance and scalability.
      Collaborate with designers and back-end developers to implement UI/UX improvements.
      Debug and troubleshoot website issues and implement solutions.
      Stay updated with the latest web development trends and best practices.
      <br/>
      <br/>
      Required Skills:<br/>
      Strong proficiency in HTML, CSS, and JavaScript.
      Experience with CSS frameworks (e.g., Bootstrap, Tailwind CSS).
      Knowledge of JavaScript frameworks (e.g., React, Vue, or Angular) is a plus.
      Understanding of responsive web design and cross-browser compatibility.
      Familiarity with version control systems (e.g., Git).
      Strong problem-solving and debugging skills.
      <br/>
      <br/>
      Preferred Qualifications:
      <br/>
      Experience with RESTful APIs and AJAX.
      Basic understanding of SEO best practices.
      Familiarity with CMS platforms like WordPress or Shopify.
      Experience with task runners/build tools like Webpack, Gulp, or npm.`);

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

    const [selectedCompany, setSelectedCompany] = useState(null);

    const companyOptions = [
        { name: 'Varun Digital Media', code: 'VDM' },
        { name: 'Pranathi Software Services', code: 'PSS' },
        { name: 'Green Ventures pvt Ltd', code: 'GV' },
        { name: 'Future Tech Solutions', code: 'FTS' },
        { name: 'Healthify Solutions pvt Ltd', code: 'MS' },

    ];

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departmentOptions = [
        { name: 'Account Finance Team', code: 'HR' },
        { name: 'SPG US Staffing', code: 'FIN' },
        { name: 'Vitel Development Team', code: 'MKT' },
        { name: 'Support Team', code: 'ENG' },
        { name: 'NOC Team', code: 'SAL' },
        { name: 'Digital Marketing Team', code: 'DIG' },
        { name: 'Executive Team', code: 'EXE' },
        { name: 'Operations Team', code: 'OPE' }
    ];

    const [selectedPerson, setSelectedPerson] = useState(null);

    const personOptions = [
        { name: 'Salmanuddin Syed', role: 'Operation Head', code: 'OH' },
        { name: 'Girish Bodepu', role: 'Manager', code: 'MGR' },
        { name: 'Suresh Reddy', role: 'Team Lead', code: 'TL' },
        { name: 'Ravi Kumar', role: 'Team Lead', code: 'TL' },
        { name: 'Neha Patel', role: 'Team Lead', code: 'TL' }
    ];

    const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
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


    // jobs short form ends

    return (

        <React.Fragment>

            <button
                type="button"
                className="btn btn-secondary import-res-btn  ms-1  me-1"
                onClick={() => setVisibleRightJob(true)}
            >
                Add Job
            </button>

            {/* short form for jobs starts */}

            < Sidebar visible={visibleRightJob} position="right" className="sidebar" onHide={() => setVisibleRightJob(false)}>
                <div className="sidebar-header">

                    <h3>Create a Job</h3>
                    <div className="d-flex align-items-center">
                        <Link to="/jobs-editform">
                            <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
                        </Link>
                        <Button
                            icon="pi pi-times"
                            className="p-button-text close-btn"
                            onClick={() => setVisibleRightJob(false)}
                        />
                    </div>

                </div>
                <div className="card sidebardetails">

                    <form>
                        <Row className="mb-0">
                            <Col lg={6}>
                                <div className="field">
                                    <label htmlFor="jobId">Job ID</label>
                                    <InputText
                                        id="jobId"

                                        placeholder="Job-101"
                                        className="w-full"
                                        value={jobid}
                                    />
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobTitle" className="p-d-block">Job Title</label>
                                    <InputText
                                        id="jobTitle"
                                        placeholder="Web Developer"
                                        className="p-d-block"
                                        value={jobtitle}
                                    />

                                </div>
                            </Col>

                        </Row>

                        <Row className="mb-2">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Company</label>
                                    <Dropdown
                                        value={selectedCompany}
                                        onChange={(e) => setSelectedCompany(e.value)}
                                        options={companyOptions}
                                        optionLabel="name"
                                        placeholder="Varun Digital Media"
                                        filter
                                        className="w-full bgclr"
                                    />

                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="hiringManager">Hiring Manager</label>
                                    <Dropdown
                                        value={selectedPerson}
                                        options={personOptions}
                                        onChange={(e) => setSelectedPerson(e.value)}
                                        optionLabel={(option) => `${option.name}, ${option.role}`}
                                        placeholder="Mahesh Kumar Bhoga"
                                        className="bgclr"
                                    />
                                </div>
                            </Col>

                        </Row>


                        <Row className="mb-2">
                            <Col lg={6}>
                                <label htmlFor="experience">Experience in Years</label>
                                <InputText inputId="experience" value={expyears}
                                    // minFractionDigits={1} maxFractionDigits={100} step={0.1}
                                    className="w-full activejobdrop"
                                    placeholder="3 Years" />
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobLocation">Job Location</label>
                                    <Dropdown
                                        id="jobLocation"
                                        value={jobLocation}
                                        onChange={(e) => setJobLocation(e.value)}
                                        options={jobLocations}
                                        optionLabel="name"
                                        filter
                                        filterPlaceholder="Search Location"
                                        className="w-full activejobdrop"
                                        placeholder="Hyderabad"
                                    />
                                </div>
                            </Col>

                        </Row>


                        <Row className="mb-2">
                            <Col lg={6}>
                                <label htmlFor="jobStartDate" className="p-mb-2">Job Start Date</label>
                                <Calendar
                                    id="jobStartDate"
                                    value={jobStartDate}
                                    onChange={(e) => setJobStartDate(e.value)}
                                    dateFormat="dd/mm/yy"
                                    placeholder="20/02/2025"
                                    className="w-full activejobdrop"
                                    showIcon
                                />
                            </Col>
                            <Col lg={6}>
                                <label htmlFor="jobEndDate" className="mr-2">Job End Date</label>
                                <Calendar
                                    id="jobEndDate"
                                    value={jobEndDate}
                                    onChange={(e) => setJobEndDate(e.value)}
                                    dateFormat="dd/mm/yy"
                                    placeholder="26/02/2025"
                                    className="w-full activejobdrop"
                                    showIcon
                                />
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <label htmlFor="jobEndDate" className="mr-2">Primary Skills</label>
                            <Select
                                id="primarySkills"
                                name="primarySkills"
                                isMulti
                                options={skillsOptions}
                                value={skillsOptions.filter(option => selectedPrimarySkills.includes(option.value))}
                                onChange={handlePrimarySkillsChange}
                                placeholder="HTML, CSS, JavaScript"
                            />

                        </Row>

                        <Row className="mb-2">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="hiringManager">Workplace Type</label>
                                    <select
                                        className='form-select profileDetailsInput w-full' id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                                        aria-label='Default select example'

                                    >
                                        <option value='Office'>Work From Office (WFO)</option>
                                        <option value='Remote'>Work From Home (WFH)</option>
                                        <option value='Hybrid'>Work From Remote (WFR)</option>

                                    </select>
                                </div>
                            </Col>

                            <Col lg={6}>

                                <div className="p-field">
                                    <label htmlFor="jobType">UserIDs</label>
                                    <InputText
                                        id="userIds"
                                        placeholder="Harish"
                                        className="block w-full"
                                        value={userids}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobType">Categories</label>
                                    <TreeSelect
                                        value={selectedCategoryKey}
                                        onChange={(e) => setSelectedCategoryKey(e.value)}
                                        options={categories}
                                        filter
                                        className="w-full"
                                        placeholder="Frontend"
                                    ></TreeSelect>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobType">Groups</label>
                                    <TreeSelect
                                        value={selectedGroupKey}
                                        onChange={(e) => setSelectedGroupKey(e.value)}
                                        options={groups}
                                        filter
                                        className="w-full"
                                        placeholder="HTML, CSS"
                                    ></TreeSelect>
                                </div>
                            </Col>
                        </Row>


                        <Row className="mb-2 d-flex justify-content-between align-items-end">
                            <Col lg={6}>
                                <div className="">
                                    <label htmlFor="descriptionEditor">Description</label>
                                </div>
                            </Col>
                            <Col lg={6} className="d-flex justify-content-end mt-2">
                                <Button color="primary" className="btn btn-primary aibtn">
                                    <i class="pi pi-star me-1"></i>
                                    Write with AI
                                </Button>
                            </Col>

                        </Row>

                        <Row className="mb-3">
                            <Col lg={12}>
                                <div className="">
                                    <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} headerTemplate={header} style={{ height: '140px' }} />
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-between align-items-end">
                            <Col lg={6}>
                                <div className="p-field">
                                    <input type="checkbox" className="me-2" checked/>
                                    <label htmlFor="jobType">Private</label>
                                </div>
                            </Col>
                            <Col lg={6} className="d-flex justify-content-end">
                                <Button color="primary" className="btn btn-primary sidebarbtn">
                                    Create
                                </Button>
                            </Col>
                        </Row>
                    </form>

                </div>

            </Sidebar>

        </React.Fragment>
    )

}
export default AddJob;