import React, { useState, useRef, useEffect, useMemo } from "react"
import { CascadeSelect } from "primereact/cascadeselect";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import {
    Col,
    Container,
    Row
} from "reactstrap";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { ChevronRightIcon } from "primereact/icons/chevronright"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SubmitCandidatetoJob = () => {


    // submit candidate to job
    const [selectedSubmitOption, setSelectedSubmitOption] = useState(null)

    const submitOptions = [
        {
            name: "Submit Candidate to Job",
            code: "SUB-JOB",
            icon: "pi pi-briefcase",
        },
        {
            name: "Submit Candidate to Contact",
            code: "SUB-CONTACT",
            icon: "pi pi-user",
        },
    ]
    const handleSubmitCandidate = e => {
        setSelectedSubmitOption(e.value)
        if (e.value?.code === "SUB-JOB") {
            handleOpenDialogs(true)
        } else if (e.value?.code === "SUB-CONTACT") {
            handleSubmitContact(true)
        }
    }

    const handleSubmitContact = () => {
        SetSubmitcantocon(true)

        setTimeout(() => {
            setccDetailsVisible(true)
        }, 3000)
    }
    // const [submitcantocon, SetSubmitcantocon] = useState(false)

    const [fromemailjobs, setFromemailjobs] = useState(["harish@varundigitalmedia.com"])
    const Fromemailcontjobs = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    // jobs all chip ends

    const footerContent = (
        <div>
            <div className="d-flex align-items-center">
                <Checkbox
                    inputId="checkbox"
                />
                <label htmlFor="username" className="ms-2 mt-1">
                    Private
                </label>
            </div>
        </div>
    )
    const [selectedEmailOption1, setSelectedEmailOption1] = useState(null)
    const emailOptions1 = [
        { label: "Template 1", icon: "pi pi-file" },
        { label: "Template 2", icon: "pi pi-file" },
        { label: "Template 3", icon: "pi pi-file" },
    ]
    const selectedEmailTemplate1 = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`}></i>
                    <div>{option.label}</div>
                </div>
            )
        }
        return (
            <div className="flex align-items-center">
                <i className="pi pi-envelope mr-2"></i>
                <span>{props.placeholder}</span>
            </div>
        )
    }
    const emailOptionTemplate1 = option => {
        return (
            <div className="flex align-items-center">
                <i className={`${option.icon} mr-2`}></i>
                <div>{option.label}</div>
            </div>
        )
    }
    const smsOptions1 = [
        { label: "Signature 1", icon: "pi pi-pencil" },
        { label: "Signature 2", icon: "pi pi-pencil" },
        { label: "Signature 3", icon: "pi pi-pencil" },
    ]
    const [uploadedFiles, setUploadedFiles] = useState([{ name: "Lavankumar_Resume.pdf" }]);


    const onUploadHandler1 = (e) => {
        setUploadedFiles((prevFiles) => {
            const newFiles = e.files.filter(
                (newFile) => !prevFiles.some((file) => file.name === newFile.name)
            );
            return [...prevFiles, ...newFiles]; // Append only new files
        });

        // Clear the FileUpload component's internal state
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }

        setAttachmentfile(true);
    };


    const [attachmentfile, setAttachmentfile] = useState(false)
    const fileListRef = useRef(null)
    const fileUploadRef = useRef(null)

    const [emailtextEditor, setEmailtextEditor] = useState(`
        Dear [Contact First name], <br><br>
        Please find below candidates with resumes attached for Web Developer (Job-101):
        <table border="1" cellpadding="5" cellspacing="0">
                 <tr>
                   <th> </th>
                   <td> <b>Lavankumar Web Developer</b> </td>
                   <td></td>
                 </tr>
                 <tr>
                   <th style="text-align: left;"></th>
                   <td><b> Primary Skills : </b></td>
                   <td> HTML, CSS, JavaScript, React.js, Node.js</td>
                 </tr>
                 <tr>
                   <th style="text-align: left;"> </th>
                   <td><b> Contact Details </b></td>
                   <td> <strong>Phonenumber : </strong> 9876543210, 9123456789; <strong>Email :</strong> lavan.kumar@example.com </td>
                 </tr>
               
                 <tr>
                   <th style="text-align: left;"> </th>
                   <td><b> Work Experience </b></td>
                   <td>5 Years</td>
                 </tr>
                 <tr>
                   <th style="text-align: left;"></th>
                   <td><b> Details </b> </td>
                   <td> <b>Salary Expectation:</b> RS. 9 lakhs, <b>Availability:</b> 23-03-2025, <b>Employment Type:</b> WFH</td>
                 </tr>
        </table><br>

        Best Regards, <br>
        Harish Jaram <br>
        Senoir HR Recruiter <br>
        Varun Digital Media <br>
        Ph: +91-98765343210
       `)
    const [selectedSmsOption, setSelectedSmsOption] = useState(null)

    const selectedSmsTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`}></i>
                    <div>{option.label}</div>
                </div>
            )
        }
        return (
            <div className="flex align-items-center">
                <i className="pi pi-comment mr-2"></i>
                <span>{props.placeholder}</span>
            </div>
        )
    }

    const smsOptionTemplate = option => {
        return (
            <div className="flex align-items-center">
                <i className={`${option.icon} mr-2`}></i>
                <div>{option.label}</div>
            </div>
        )
    }

    const [selectedOption, setSelectedOption] = useState(null)

    const selectedOptionTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`}></i>
                    <div>{option.label}</div>
                </div>
            )
        }
        return (
            <div className="flex align-items-center">
                <i className="pi pi-cog mr-2"></i>
                <span>{props.placeholder}</span>
            </div>
        )
    }

    const optionTemplate = option => {
        return (
            <div className="flex align-items-center">
                <i className={`${option.icon} mr-2`}></i>
                <div>{option.label}</div>
            </div>
        )
    }

    const [frominputemail, setFrominputemail] = useState(null)
    const fromEmail = [
        { name: "harish@varundigitalmedia.com", code: "NY" },
        { name: "bhavani@varundigitalmedia.com", code: "RM" },
        { name: "pavan@varundigitalmedia.com", code: "LDN" },
        { name: "deepika@varundigitalmedia.com", code: "IST" }
    ]

    // jobs all strats

    const [jobDetailsVisible, setJobDetailsVisible] = useState(false)
    const [selectedJobTitles, setSelectedJobTitles] = useState("")
    const [searchText, setSearchText] = useState("")
    const [selectedJobs, setSelectedJobs] = useState([])
    const [jobDescriptions, setJobDescriptions] = useState([])

    const jobs = [
        {
            id: "Job-101",
            title: "Web Developer",
            candidatename: "Lavan Kumar Kalvala",
            contactdetails: "9876543210, 9123456789;",
            email: "lavan.kumar@example.com",
            exp: "5",
            details: "Salary Expectation: RS. 9 lakhs, Availability: 23/03/2025, Employment Type: WFH",
            contact: "Mahesh Kumar Bhoga",
            primarySkills: ["HTML", "CSS", "JavaScript", "React.js", "Node.js"],
            contactemail: "mahesh@varundigitalmedia.com"
        },
        {
            id: "Job-102",
            title: "Graphic Designer",
            candidatename: "RajaShekar",
            contactdetails: "9876543221, 9123456790;",
            email: "rajashekar.design@example.com",
            exp: "5",
            details: "Salary Expectation: RS. 8 lakhs, Availability: 20/03/2025, Employment Type: Hybrid",
            contact: "Mahesh Kumar Bhoga",
            primarySkills: ["Adobe Photoshop", "Illustrator", "Figma", "CorelDRAW"],
            contactemail: "mahesh@varundigitalmedia.com"
        },
        {
            id: "Job-103",
            title: "Project Manager",
            candidatename: "Mohan Reddy",
            contactdetails: "9876543232, 9123456701;",
            email: "mohan.reddy@example.com",
            exp: "5",
            details: "Salary Expectation: RS. 15 lakhs, Availability: 15/04/2025, Employment Type: On-site",
            contact: "Mahesh Kumar Bhoga",
            primarySkills: ["Agile Methodology", "Scrum", "Team Management", "Risk Assessment"],
            contactemail: "mahesh@varundigitalmedia.com"
        },
        {
            id: "Job-104",
            title: "Jr. Graphic Designer",
            candidatename: "Neelima",
            contactdetails: "9876543243, 9123456712;",
            email: "neelima.design@example.com",
            exp: "3",
            details: "Salary Expectation: RS. 6 lakhs, Availability: 10/04/2025, Employment Type: WFH",
            contact: "Mahesh Kumar Bhoga",
            primarySkills: ["Adobe Photoshop", "Canva", "Typography", "Layout Design"],
            contactemail: "mahesh@varundigitalmedia.com"
        },
        {
            id: "Job-105",
            title: "HR Specialist",
            candidatename: "Adithya",
            designation: "HR Specialist",
            contactdetails: "9876543254, 9123456723;",
            email: "adithya.hr@example.com",
            exp: "5",
            details: "Salary Expectation: RS. 10 lakhs, Availability: 05/04/2025, Employment Type: Hybrid",
            contact: "Giri Jalagam",
            primarySkills: ["Recruitment", "Employee Engagement", "Payroll Management", "HR Policies"],
            contactemail: "giri@varundigitalmedia.com"
        }
    ];


    const filteredJobs = jobs.filter(
        job =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    )

    const handleSave = () => {
        // Extract contact details from selected jobs
        const contactDetails = selectedJobs.map(job => ({
            name: job.contact,
            email: job.contactemail,
        }));

        // Format the contact details for display in Chips
        const formattedContacts = contactDetails.map(
            contact => `${contact.name} - (${contact.email})`
        );

        // Update the jobDescriptions state with the formatted contacts
        setJobDescriptions(prev => [...prev, ...formattedContacts]);

        // Close the Job Details dialog
        setJobDetailsVisible(false);
    }

    const handleRefresh = () => {
        setSelectedJobs([])
        setSearchText("")
    }

    // popup
    const [jobsallpopup, SetJobsallPopup] = useState(false)
    const [jobssearchedpopup, SetJobssearchedPopup] = useState(false)
    const [jobsselectedpopup, SetJobsselectedPopup] = useState(false)


    const handleOpenDialogs = () => {
        // Open the first dialog
        SetJobsallPopup(true)

        // Automatically open the second dialog after a short delay
        setTimeout(() => {
            setJobDetailsVisible(true)
        }, 3000)
    }

    // jobs all ends


    // select contacts starts

    const [linkContactsVisible, setLinkContactsVisible] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const contacts = [
        {
            id: "1",
            designation: "UI/UX Manager",
            contact: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
        },
        {
            id: "2",
            designation: "HR Recruiter",
            contact: "Giri Jalagam",
            contactemail: "giri@varundigitalmedia.com",
        },
        {
            id: "3",
            designation: "Sales Manager",
            contact: "Salmanuddin",
            contactemail: "salman@varundigitalmedia.com",
        },
        {
            id: "4",
            designation: "SEO Manager",
            contact: "Suresh Reddy",
            contactemail: "suresh@varundigitalmedia.com",
        },
        {
            id: "5",
            designation: "AIML Lead",
            contact: "Aman Kumar",
            contactemail: "aman@varundigitalmedia.com",
        },
    ];

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contactemail.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.id.toString().includes(searchText)
    );

    const handleSaveContact = () => {
        const contactDetails = selectedContacts.map((contact) => ({
            name: contact.contact,
            email: contact.contactemail,
        }));
        const formattedContacts = contactDetails.map(
            (contact) => `${contact.name} - (${contact.email})`
        );
        setJobDescriptions((prev) => [...prev, ...formattedContacts]);
        setLinkContactsVisible(false);
    };

    const handleRefresh1 = () => {
        setSelectedContacts([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };


    // select contact ends

    // select cc contacts starts
    const [contactDescriptions, setContactDescriptions] = useState([]);
    const [linkContactsVisible1, setLinkContactsVisible1] = useState(false);
    const [selectedContacts1, setSelectedContacts1] = useState([]);

    const contacts1 = [
        {
            id: "1",
            designation: "UI/UX Manager",
            contact: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
        },
        {
            id: "2",
            designation: "HR Recruiter",
            contact: "Giri Jalagam",
            contactemail: "giri@varundigitalmedia.com",
        },
        {
            id: "3",
            designation: "Sales Manager",
            contact: "Salmanuddin",
            contactemail: "salman@varundigitalmedia.com",
        },
        {
            id: "4",
            designation: "SEO Manager",
            contact: "Suresh Reddy",
            contactemail: "suresh@varundigitalmedia.com",
        },
        {
            id: "5",
            designation: "AIML Lead",
            contact: "Aman Kumar",
            contactemail: "aman@varundigitalmedia.com",
        },
    ];

    const filteredContacts1 = contacts1.filter(
        (contact) =>
            contact.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contactemail.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.id.toString().includes(searchText)
    );

    const handleSaveContact1 = () => {
        const contactDetails = selectedContacts1.map((contact) => ({
            name: contact.contact,
            email: contact.contactemail,
        }));
        const formattedContacts = contactDetails.map(
            (contact) => `${contact.name} - (${contact.email})`
        );
        setContactDescriptions((prev) => [...prev, ...formattedContacts]);
        setLinkContactsVisible1(false);
    };

    const handleRefresh2 = () => {
        setSelectedContacts1([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };

    // select cc contact ends


    // submit candidate to contact starts

    const [submitcantocon, SetSubmitcantocon] = useState(false)

    // auto popup
    const [ccDetailsVisible, setccDetailsVisible] = useState(false)
    const [selectedAutocc, setSelectedAutocc] = useState([])
    const [autoToemail, setAutoToemail] = useState([])

    const autocc = [
        {
            id: "1",
            designation: "UI/UX Manager",
            contact: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
        },
        {
            id: "2",
            designation: "HR Recruiter",
            contact: "Giri Jalagam",
            contactemail: "giri@varundigitalmedia.com",
        },
        {
            id: "3",
            designation: "Sales Manager",
            contact: "Salmanuddin",
            contactemail: "salman@varundigitalmedia.com",
        },
        {
            id: "4",
            designation: "SEO Manager",
            contact: "Suresh Reddy",
            contactemail: "suresh@varundigitalmedia.com",
        },
        {
            id: "5",
            designation: "AIML Lead",
            contact: "Aman Kumar",
            contactemail: "aman@varundigitalmedia.com",
        },
    ];


    const filteredAutocc = autocc.filter(
        cc =>
            cc.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            cc.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            cc.contactemail.toLowerCase().includes(searchText.toLowerCase()) ||
            cc.id.toString().includes(searchText)
    )

    const handleSaveautocc = () => {
        // Extract cc details from selected jobs
        const contactDetails = selectedAutocc.map(cc => ({
            name: cc.contact,
            email: cc.contactemail,
        }));

        // Format the contact details for display in Chips
        const formattedContacts = contactDetails.map(
            contact => `${contact.name} - (${contact.email})`
        );

        // Update the jobDescriptions state with the formatted contacts
        setAutoToemail(prev => [...prev, ...formattedContacts]);

        // Close the Job Details dialog
        setccDetailsVisible(false);
    }

    const handleRefreshautocc = () => {
        setSelectedAutocc([])
        setSearchText("")
    }

    // select contacts to starts

    const [linkContactstoVisible, setLinkContactstoVisible] = useState(false);
    const [selectedContactsto, setSelectedContactsto] = useState([]);

    const contactsto = [
        {
            id: "1",
            designation: "UI/UX Manager",
            contact: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
        },
        {
            id: "2",
            designation: "HR Recruiter",
            contact: "Giri Jalagam",
            contactemail: "giri@varundigitalmedia.com",
        },
        {
            id: "3",
            designation: "Sales Manager",
            contact: "Salmanuddin",
            contactemail: "salman@varundigitalmedia.com",
        },
        {
            id: "4",
            designation: "SEO Manager",
            contact: "Suresh Reddy",
            contactemail: "suresh@varundigitalmedia.com",
        },
        {
            id: "5",
            designation: "AIML Lead",
            contact: "Aman Kumar",
            contactemail: "aman@varundigitalmedia.com",
        },
    ];

    const filteredContactsto = contactsto.filter(
        (contact) =>
            contact.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contactemail.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.id.toString().includes(searchText)
    );

    const handleSaveContactto = () => {
        const contactDetails = selectedContactsto.map((contact) => ({
            name: contact.contact,
            email: contact.contactemail,
        }));
        const formattedContacts = contactDetails.map(
            (contact) => `${contact.name} - (${contact.email})`
        );
        setAutoToemail((prev) => [...prev, ...formattedContacts]);
        setLinkContactstoVisible(false);
    };

    const handleRefreshto = () => {
        setSelectedContactsto([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };


    // select contact to ends

    // select cc contacts starts
    const [contactDescriptionscc, setContactDescriptionscc] = useState([]);
    const [linkContactsVisiblecc, setLinkContactsVisiblecc] = useState(false);
    const [selectedContactscc, setSelectedContactscc] = useState([]);

    const contactscc = [
        {
            id: "1",
            designation: "UI/UX Manager",
            contact: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
        },
        {
            id: "2",
            designation: "HR Recruiter",
            contact: "Giri Jalagam",
            contactemail: "giri@varundigitalmedia.com",
        },
        {
            id: "3",
            designation: "Sales Manager",
            contact: "Salmanuddin",
            contactemail: "salman@varundigitalmedia.com",
        },
        {
            id: "4",
            designation: "SEO Manager",
            contact: "Suresh Reddy",
            contactemail: "suresh@varundigitalmedia.com",
        },
        {
            id: "5",
            designation: "AIML Lead",
            contact: "Aman Kumar",
            contactemail: "aman@varundigitalmedia.com",
        },
    ];

    const filteredContactscc = contactscc.filter(
        (contact) =>
            contact.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contactemail.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.id.toString().includes(searchText)
    );

    const handleSaveContactcc = () => {
        const contactDetails = selectedContactscc.map((contact) => ({
            name: contact.contact,
            email: contact.contactemail,
        }));
        const formattedContacts = contactDetails.map(
            (contact) => `${contact.name} - (${contact.email})`
        );
        setContactDescriptionscc((prev) => [...prev, ...formattedContacts]);
        setLinkContactsVisiblecc(false);
    };

    const handleRefreshcc = () => {
        setSelectedContactscc([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };

    // select cc contact ends

    // submit candidate to contact ends

    return (
        <React.Fragment>

            <CascadeSelect
                // value={selectedSubmitOption}
                onChange={handleSubmitCandidate}
                options={submitOptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={["subItems", "subItems"]}
                className="md:w-10rem me-1"
                breakpoint="767px"
                placeholder="Submit"
            />


            {/* submit candidate to job */}
            <Dialog
                header="Submit Candidate to Job"
                visible={jobsallpopup}
                className="interview-popup"
                onHide={() => {
                    SetJobsallPopup(false)
                }}
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                footer={footerContent}
            >
                <div className="popup-header-bg">
                    <Row className="">
                        <Col xl={6} className="p-0 d-flex align-items-center">
                            <div className="popup-header d-flex">
                                <Dropdown
                                    value={selectedEmailOption1}
                                    onChange={e => setSelectedEmailOption1(e.value)}
                                    options={emailOptions1}
                                    optionLabel="label"
                                    placeholder="Template"
                                    valueTemplate={selectedEmailTemplate1}
                                    itemTemplate={emailOptionTemplate1}
                                    className="w-full md:w-10rem action-items me-1"
                                    dropdownIcon={opts => {
                                        return opts.iconProps["data-pr-overlay-visible"] ? (
                                            <ChevronRightIcon {...opts.iconProps} />
                                        ) : (
                                            <ChevronDownIcon {...opts.iconProps} />
                                        )
                                    }}
                                />

                                <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e => setSelectedSmsOption(e.value)}
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Signature"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="w-full md:w-10rem action-items me-1"
                                    dropdownIcon={opts => {
                                        return opts.iconProps["data-pr-overlay-visible"] ? (
                                            <ChevronRightIcon {...opts.iconProps} />
                                        ) : (
                                            <ChevronDownIcon {...opts.iconProps} />
                                        )
                                    }}
                                />

                                <div
                                    className="me-2"
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    {/* File Upload Button with Attachment Icon */}
                                    <Tooltip
                                        target=".attachment-button"
                                        content="Upload Files"
                                    />
                                    <FileUpload
                                        name="emailAttachments[]"
                                        url={"/api/upload"}
                                        mode="basic"
                                        multiple
                                        accept="image/*,application/pdf"
                                        maxFileSize={5000000}
                                        auto
                                        chooseLabel={<span>Attach Files</span>}
                                        customUpload
                                        uploadHandler={onUploadHandler1}
                                    />
                                </div>

                                <Dropdown
                                    value={selectedOption}
                                    onChange={e => setSelectedOption(e.value)}
                                    // options={options1}
                                    optionLabel="label"
                                    placeholder="Preview"
                                    valueTemplate={selectedOptionTemplate}
                                    itemTemplate={optionTemplate}
                                    className="preview-icon w-full md:w-7rem action-items"
                                    dropdownIcon={opts => {
                                        return opts.iconProps["data-pr-overlay-visible"] ? (
                                            <EyeIcon {...opts.iconProps} /> // Replace with the EyeIcon
                                        ) : (
                                            <ChevronDownIcon {...opts.iconProps} />
                                        )
                                    }}
                                />
                            </div>
                        </Col>

                        <Col xl={6}>
                            <div class="d-flex justify-content-end align-items-center mt-1">
                                <button
                                    type="button"
                                    class="waves-effect waves-light outlinebtn btn btn-primary me-2"
                                    onClick={() => {
                                        SetJobsallPopup(false)
                                    }}
                                >
                                    {" "}
                                    <i class="fa-regular fa-paper-plane me-2"></i>Send
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onChange={e => setFrominputemail(e.value)}
                                            options={fromEmail}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={fromemailjobs}
                                        onChange={e => setFromemailjobs(e.value)}
                                        itemTemplate={Fromemailcontjobs}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            placeholder="To"
                                            className="from-width w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            showClear={false}
                                            showOnFocus={false}
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>

                                    <Chips
                                        value={jobDescriptions}
                                        onChange={(e) => setJobDescriptions(e.value)}
                                        className="size-mail w-full"
                                    />

                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            placeholder="Cc"
                                            className="from-width w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible1(true);
                                            }}
                                            showClear={false}
                                            showOnFocus={false}
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>

                                    <Chips
                                        value={contactDescriptions}
                                        onChange={(e) => setContactDescriptions(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row className="size-mail mb-1">
                                <Col xl={1}>
                                    <label htmlFor="interview">Subject:</label>
                                </Col>
                                <Col xl={11}>
                                    <InputText
                                        id="interview"
                                        aria-describedby="username-help"
                                        placeholder=""
                                        className="w-full"
                                    />
                                </Col>
                            </Row>

                            {/* Attached Files Section */}
                            {uploadedFiles.length > 0 && ( // Always show if there are files
                                <Row className="size-mail mt-2 align-items-baseline">
                                    <Col xl={1}>
                                        <label>Attached:</label>
                                    </Col>

                                    <Col xl={11}>
                                        {/* Scrollable File List */}
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {/* Uploaded Files List */}
                                            <div
                                                ref={fileListRef}
                                                style={{
                                                    display: "flex",
                                                    overflowX: "auto",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "100%",
                                                    padding: "10px 0px",
                                                    borderRadius: "4px",
                                                }}
                                            >
                                                {uploadedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            marginRight: "15px",
                                                            padding: "5px 10px",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            background: "#f9f9f9",
                                                            boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                                                        }}
                                                    >
                                                        <div>
                                                            <i
                                                                className="pi pi-file"
                                                                style={{ marginRight: "5px" }}
                                                            ></i>
                                                            <span>{file.name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Editor
                                value={emailtextEditor} 
                                onTextChange={e => setEmailtextEditor(e.htmlValue)}
                                className="jobsall-editor"
                            />

                        </Col>
                    </Row>
                </div>
            </Dialog>

            {/* select job popup */}
            <Dialog
                header="Select Job"
                visible={jobDetailsVisible}
                onHide={() => setJobDetailsVisible(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div
                            className="p-inputgroup mb-3"
                            style={{ position: "relative" }}
                        >
                            <InputText
                                placeholder="Search Jobs"
                                value={searchText}
                                onInput={e => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }} // Space for the icon
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
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
                    onSelectionChange={e => setSelectedJobs(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small" // Set size to small
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="id" header="Job ID" />
                    <Column field="title" header="Job Title" />
                    <Column field="contact" header="Contact" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSave}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

            {/* select contactsform popup for To */}
            <Dialog
                header="Select Contact"
                visible={linkContactsVisible}
                onHide={() => setLinkContactsVisible(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: "relative" }}>
                            <InputText
                                placeholder="Search Contact"
                                value={searchText}
                                onInput={(e) => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }}
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    key={selectedContacts.length} // Force re-render when selectedContacts changes
                    value={filteredContacts}
                    paginator
                    rows={5}
                    selection={selectedContacts}
                    onSelectionChange={(e) => setSelectedContacts(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small"
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="contact" header="Contact Name" />
                    <Column field="designation" header="Designation" />
                    <Column field="contactemail" header="Email" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSaveContact}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefresh1}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

            {/* select contactsform popup for cc */}
            <Dialog
                header="Select Contact"
                visible={linkContactsVisible1}
                onHide={() => setLinkContactsVisible1(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: "relative" }}>
                            <InputText
                                placeholder="Search Contact"
                                value={searchText}
                                onInput={(e) => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }}
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    key={selectedContacts1.length} // Force re-render when selectedContacts1 changes
                    value={filteredContacts1}
                    paginator
                    rows={5}
                    selection={selectedContacts1}
                    onSelectionChange={(e) => setSelectedContacts1(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small"
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="contact" header="Contact Name" />
                    <Column field="designation" header="Designation" />
                    <Column field="contactemail" header="Email" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSaveContact1}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefresh2}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>


            {/* submit candidate to contact */}
            <Dialog
                header="Submit Candidate to Contact"
                visible={submitcantocon}
                className="interview-popup"
                onHide={() => {
                    SetSubmitcantocon(false)
                }}
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                footer={footerContent}
            >
                <div className="popup-header-bg">
                    <Row className="">
                        <Col xl={6} className="p-0 d-flex align-items-center">
                            <div className="popup-header d-flex">
                                <Dropdown
                                    value={selectedEmailOption1}
                                    onChange={e => setSelectedEmailOption1(e.value)}
                                    options={emailOptions1}
                                    optionLabel="label"
                                    placeholder="Template"
                                    valueTemplate={selectedEmailTemplate1}
                                    itemTemplate={emailOptionTemplate1}
                                    className="w-full md:w-10rem action-items me-1"
                                    dropdownIcon={opts => {
                                        return opts.iconProps["data-pr-overlay-visible"] ? (
                                            <ChevronRightIcon {...opts.iconProps} />
                                        ) : (
                                            <ChevronDownIcon {...opts.iconProps} />
                                        )
                                    }}
                                />

                                <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e => setSelectedSmsOption(e.value)}
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Signature"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="w-full md:w-10rem action-items me-1"
                                    dropdownIcon={opts => {
                                        return opts.iconProps["data-pr-overlay-visible"] ? (
                                            <ChevronRightIcon {...opts.iconProps} />
                                        ) : (
                                            <ChevronDownIcon {...opts.iconProps} />
                                        )
                                    }}
                                />

                                <div
                                    className="me-2"
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    {/* File Upload Button with Attachment Icon */}
                                    <Tooltip
                                        target=".attachment-button"
                                        content="Upload Files"
                                    />
                                    <FileUpload
                                        name="emailAttachments[]"
                                        url={"/api/upload"}
                                        mode="basic"
                                        multiple
                                        accept="image/*,application/pdf"
                                        maxFileSize={5000000}
                                        auto
                                        chooseLabel={<span>Attach Files</span>}
                                        customUpload
                                        uploadHandler={onUploadHandler1}
                                    />
                                </div>

                                <Dropdown
                                    value={selectedOption}
                                    onChange={e => setSelectedOption(e.value)}
                                    // options={options1}
                                    optionLabel="label"
                                    placeholder="Preview"
                                    valueTemplate={selectedOptionTemplate}
                                    itemTemplate={optionTemplate}
                                    className="preview-icon w-full md:w-7rem action-items"
                                    dropdownIcon={opts => {
                                        return opts.iconProps["data-pr-overlay-visible"] ? (
                                            <EyeIcon {...opts.iconProps} /> // Replace with the EyeIcon
                                        ) : (
                                            <ChevronDownIcon {...opts.iconProps} />
                                        )
                                    }}
                                />
                            </div>
                        </Col>

                        <Col xl={6}>
                            <div class="d-flex justify-content-end align-items-center mt-1">
                                <button
                                    type="button"
                                    class="waves-effect waves-light outlinebtn btn btn-primary me-2"
                                    onClick={() => {
                                        SetSubmitcantocon(false)
                                    }}
                                >
                                    {" "}
                                    <i class="fa-regular fa-paper-plane me-2"></i>Send
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onChange={e => setFrominputemail(e.value)}
                                            options={fromEmail}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={fromemailjobs}
                                        onChange={e => setFromemailjobs(e.value)}
                                        itemTemplate={Fromemailcontjobs}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            placeholder="To"
                                            className="from-width w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            showClear={false}
                                            showOnFocus={false}
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>

                                    <Chips
                                        value={autoToemail}
                                        onChange={(e) => setAutoToemail(e.value)}
                                        className="size-mail w-full"
                                    />

                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            placeholder="Cc"
                                            className="from-width w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisiblecc(true);
                                            }}
                                            showClear={false}
                                            showOnFocus={false}
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={contactDescriptionscc}
                                        onChange={(e) => setContactDescriptionscc(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row className="size-mail mb-1">
                                <Col xl={1}>
                                    <label htmlFor="interview">Subject:</label>
                                </Col>
                                <Col xl={11}>
                                    <InputText
                                        id="interview"
                                        aria-describedby="username-help"
                                        placeholder=""
                                        className="w-full"
                                    />
                                </Col>
                            </Row>

                            {/* Attached Files Section */}
                            {uploadedFiles.length > 0 && ( // Always show if there are files
                                <Row className="size-mail mt-2 align-items-baseline">
                                    <Col xl={1}>
                                        <label>Attached:</label>
                                    </Col>

                                    <Col xl={11}>
                                        {/* Scrollable File List */}
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {/* Uploaded Files List */}
                                            <div
                                                ref={fileListRef}
                                                style={{
                                                    display: "flex",
                                                    overflowX: "auto",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "100%",
                                                    padding: "10px 0px",
                                                    borderRadius: "4px",
                                                }}
                                            >
                                                {uploadedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            marginRight: "15px",
                                                            padding: "5px 10px",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            background: "#f9f9f9",
                                                            boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                                                        }}
                                                    >
                                                        <div>
                                                            <i
                                                                className="pi pi-file"
                                                                style={{ marginRight: "5px" }}
                                                            ></i>
                                                            <span>{file.name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Editor
                                value={emailtextEditor} // Display job descriptions with default text
                                onTextChange={e => setEmailtextEditor(e.htmlValue)}
                                className="jobsall-editor"
                            />

                        </Col>
                    </Row>
                </div>
            </Dialog>


            {/* auto popup of can to con */}
            <Dialog
                header="Select Contact"
                visible={ccDetailsVisible}
                onHide={() => setccDetailsVisible(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div
                            className="p-inputgroup mb-3"
                            style={{ position: "relative" }}
                        >
                            <InputText
                                placeholder="Search Contacts"
                                value={searchText}
                                onInput={e => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }} // Space for the icon
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>


                {/* DataTable */}
                <DataTable
                    value={filteredAutocc}
                    paginator
                    rows={5}
                    selection={selectedAutocc}
                    onSelectionChange={e => setSelectedAutocc(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small" // Set size to small
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="contact" header="Contact Name" />
                    <Column field="designation" header="Designation" />
                    <Column field="contactemail" header="Email" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSaveautocc}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefreshautocc}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

            {/* submit can to contact for To */}
            <Dialog
                header="Select Contact"
                visible={linkContactstoVisible}
                onHide={() => setLinkContactstoVisible(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: "relative" }}>
                            <InputText
                                placeholder="Search Contacts"
                                value={searchText}
                                onInput={(e) => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }}
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    key={selectedContactsto.length} // Force re-render when selectedContacts changes
                    value={filteredContactsto}
                    paginator
                    rows={5}
                    selection={selectedContactsto}
                    onSelectionChange={(e) => setSelectedContactsto(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small"
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="contact" header="Contact Name" />
                    <Column field="designation" header="Designation" />
                    <Column field="contactemail" header="Email" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSaveContactto}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefreshto}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

            {/* select candidates to contacts popup for cc */}
            <Dialog
                header="Select Contact"
                visible={linkContactsVisiblecc}
                onHide={() => setLinkContactsVisiblecc(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: "relative" }}>
                            <InputText
                                placeholder="Search Contacts"
                                value={searchText}
                                onInput={(e) => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }}
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    key={selectedContactscc.length} // Force re-render when selectedContacts1 changes
                    value={filteredContacts1}
                    paginator
                    rows={5}
                    selection={selectedContactscc}
                    onSelectionChange={(e) => setSelectedContactscc(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small"
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="contact" header="Contact Name" />
                    <Column field="designation" header="Designation" />
                    <Column field="contactemail" header="Email" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSaveContactcc}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefreshcc}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

        </React.Fragment>
    )
}
export default SubmitCandidatetoJob