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
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const EmailContacts = () => {
    const [selectedActEmail, setSelectedActEmail] = useState(null);
    const actEmailOptions = [
        {
            name: 'New Email',
            code: 'EM-NE',
            action: () => SetEmailviewpop(true),
        },
        {
            name: 'Selected',
            code: 'EM-SE',
            action: () => SetselectedEmailpop(true),
        },
        {
            name: 'Searched',
            code: 'EM-SE',
            action: () => SetsearchedEmailpop(true),
        },
        {
            name: 'All',
            code: 'EM-AL',
            action: () => SetallEmailpop(true),
        },
        {
            name: 'Jobs',
            code: 'EM-JO',
            subItems: [
                { name: 'All', code: 'EM-JO-AL' },
                { name: 'Searched', code: 'EM-JO-SE' },
                { name: 'Selected', code: 'EM-JO-SM' },
            ],
        }
    ];

    const handleEmailChange = (e) => {
        setSelectedActEmail(e.value);

        // Check for specific subItems like "All"
        if (e.value?.code === "EM-JO-AL") {
            console.log("All clicked!") // Debug log
            handleOpenDialogs(true) // Open dialog
        } else if (e.value?.code === "EM-JO-SE") {
            console.log("Specific job clicked!"); // Debug log
            handleSearOpenDialogs(false); // Open dialog with a different state
        } else if (e.value?.code === "EM-JO-SM") {
            handleSelectOpenDialogs(false);
        }
        else if (e.value?.action) {
            e.value.action() // Handle top-level actions if defined
        }
    };

    const [emailviewpop, SetEmailviewpop] = useState(false);
    // dialog with footer
    const [popchecked, setPopchecked] = useState(false);
    const handlePopupCheckbox = e => {
        setPopchecked(e.checked)
    }
    const footerContent = (
        <div>
            <div className="d-flex align-items-center">
                <Checkbox
                    inputId="checkbox"
                    checked={popchecked}
                    onChange={handlePopupCheckbox}
                />
                <label htmlFor="username" className="ms-2 mt-1">
                    Private
                </label>
            </div>
        </div>
    )

    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const templateOptions = [
        { label: "Template 1" },
        { label: "Template 2" },
        { label: "Template 3" }
    ];

    const [selectedSignature, setSelectedSignature] = useState(null);

    const signatureOptions = [
        { label: "Signature 1" },
        { label: "Signature 2" },
        { label: "Signature 3" }
    ];

    const [uploadedFiles, setUploadedFiles] = useState([]);


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


    const [frominputemail, setFrominputemail] = useState(null);
    const fromEmail = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [fromemail, setFromemail] = useState(["harish@varundigitalmedia.com"])

    const [frominputemail1, setFrominputemail1] = useState(null);


    const [frominputemail2, setFrominputemail2] = useState(null);



    const [frominputemail3, setFrominputemail3] = useState(null);


    const [frominputemail4, setFrominputemail4] = useState(null);
    const fromEmail4 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [frominputemail5, setFrominputemail5] = useState(null);


    const [frominputemail6, setFrominputemail6] = useState(null);
    const fromEmail6 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [frominputemail7, setFrominputemail7] = useState(null);
    const fromEmail7 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [frominputemail8, setFrominputemail8] = useState(null);
    const fromEmail8 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [frominputemail9, setFrominputemail9] = useState(null);
    const fromEmail9 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [frominputemail10, setFrominputemail10] = useState(null);
    const fromEmail10 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [frominputemail11, setFrominputemail11] = useState(null);
    const fromEmail11 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    // from to input values end

    const Fromemailcont = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [toemail, setToemail] = useState([])
    const Toemailcont = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [ccemail, setCcemail] = useState([])
    const [ccemail1, setCcemail1] = useState([])
    const [toemailSear, setToemailSear] = useState([])
    const [toemailSear1, setToemailSear1] = useState(["salman@varundigitalmedia.com"])
    const [toemailAll, settoemailAll] = useState(["All Contacts"])
    const [ccemailAll, setCcemailAll] = useState([])


    const [ccemailSear, setCcemailSear] = useState([]);
    const [ccemailSear1, setCcemailSear1] = useState([])



    const Ccemailcont = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [attachmentfile, setAttachmentfile] = useState(false);
    const fileListRef = useRef(null);
    const fileUploadRef = useRef(null);


    const [emailtextEditor, setEmailtextEditor] = useState(`
             <p>Dear [Candidate Name],</p>
             <br />
             <p>I hope this email finds you well. Thank you for your interest in joining our team at Varun Digital Media.</p>
             <br />
             <p>[Email Body]</p>
             <br />
             <p>We look forward to your response.</p>
             <br />
             <p>Best regards,<br />
             Shatru Naik<br />
             HR Manager<br />
             Varun Digital Media<br />
             Ph: +91-917 711 1156</p>
           `);

    // jobs all strats

    const [jobDetailsVisible, setJobDetailsVisible] = useState(false)
    const [selectedJobTitles, setSelectedJobTitles] = useState("")
    const [searchText, setSearchText] = useState("")
    const [selectedJobs, setSelectedJobs] = useState([])
    const [jobDescriptions, setJobDescriptions] = useState("")

    const jobs = [
        {
            id: "Job-101",
            title: "Web developer",
            location: "Telangana, Hyderabad",
            jobtype: "Work From Home",
            pskills: "Python, Django, PostgreSql, REST APIs",
            exp: "5",
            description:
                "Backend Development: Design, develop, and maintain scalable web applications using Python and Django. Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.",
            contact: "Mahesh Kumar Bhoga",
        },
        {
            id: "Job-102",
            title: "Graphic Designer",
            location: "Nijamabad, Hyderabad",
            jobtype: "Work From Office",
            pskills: "Html, CSS, Javascript, React js",
            exp: "5",
            description:
                "Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning. Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.",
            contact: "Mahesh Kumar Bhoga",
        },
        {
            id: "Job-103",
            title: "Project Manager",
            location: "Hitec City, Hyderabad",
            jobtype: "Work From Remote",
            pskills: "Html, CSS, Javascript, React js",
            exp: "5",
            description:
                "API Development: Build and integrate RESTful APIs for seamless communication between services. Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.",
            contact: "Mahesh Kumar Bhoga",
        },
        {
            id: "Job-104",
            title: "Jr. Graphic Designer",
            location: "Vizag, Andhrapradresh",
            jobtype: "Work From Hybrid",
            pskills: "Python, R, SQL, Machine learning, Tableau",
            exp: "5",
            description:
                "Code Quality & Security: Write clean, efficient, and secure code following best practices and industry standards. Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.",
            contact: "Mahesh Kumar Bhoga",
        },
        {
            id: "Job-105",
            title: "HR Specialist",
            location: "Amaravathi, Andhrapradesh",
            jobtype: "Work From Office",
            pskills: "Jira, Trello, MS project, Agile & Scrum",
            exp: "5",
            description:
                "Collaboration & Deployment: Work with cross-functional teams, handle deployments, and troubleshoot production. Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.Database Management: Work with PostgreSQL, including schema design, optimization, and query performance tuning.",
            contact: "Giri Jalagam",
        },
    ]

    const filteredJobs = jobs.filter(
        job =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    )

    const handleSave = () => {
        // Add default text and format job descriptions
        const defaultText = `Dear [Candidate First name], <br><br>
         We have job openings matching your skills. Please find the jobs listed below:`

        // Create a vertical table structure for each job's details
        const formattedJobDetails = selectedJobs
            .map(
                job => `
            <table border="1" cellpadding="5" cellspacing="0">
              <tr>
                <th> </th>
                <td><b> Job Title </b></td>
                <td>${job.title} (${job.id})</td>
              </tr>
              <tr>
                <th style="text-align: left;"></th>
                <td><b> Location </b></td>
                <td>${job.location}</td>
              </tr>
              <tr>
                <th style="text-align: left;"> </th>
                <td><b> Job Type </b></td>
                <td>${job.jobtype}</td>
              </tr>
              <tr>
                <th style="text-align: left;"></th>
                <td><b> Primary Skills </b></td>
                <td>${job.pskills}</td>
              </tr>
              <tr>
                <th style="text-align: left;"> </th>
                <td><b> Work Experience </b></td>
                <td>${job.exp} Years</td>
              </tr>
              <tr>
                <th style="text-align: left;"></th>
                <td><b> Job Description </b> </td>
                <td>${job.description}</td>
              </tr>
                <tr>
                   <th style="text-align: left;"></th>
                   <td><b> Apply Job </b> </td>
                   <td><a href="/apply-job/job-101">Click here to submit resume! </a></td>
                 </tr>
            </table><br>
          `
            )
            .join("")

        const defaultSig = `Best Regards, <br>
          Varun Digital Media <br>
          Ph: +91-917 711 1156 <br>`

        const finalText = `${defaultText}<br/><br/>${formattedJobDetails}${defaultSig}`
        setJobDescriptions(finalText) // Set the combined text in the editor
        setSelectedJobTitles(selectedJobs.map(job => job.title).join(", "))
        setJobDetailsVisible(false) // Close the Job Details dialog
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
        }, 3000) // Adjust delay as needed (300ms in this example)
    }

    const handleSearOpenDialogs = () => {
        // Open the first dialog
        SetJobssearchedPopup(true)

        // Automatically open the second dialog after a short delay
        setTimeout(() => {
            setJobDetailsVisible(true)
        }, 3000) // Adjust delay as needed (300ms in this example)
    }

    const handleSelectOpenDialogs = () => {
        // Open the first dialog
        SetJobsselectedPopup(true)

        // Automatically open the second dialog after a short delay
        setTimeout(() => {
            setJobDetailsVisible(true)
        }, 3000) // Adjust delay as needed (300ms in this example)
    }

    // jobs all ends

    // jobs all chip starts
    const [toemailjobs, setToemailjobs] = useState([
        "All Contacts"
    ])
    const [ccemailjobsall, setCcemailjobsall] = useState([])
    const [toemailjobsSel, setToemailjobsSel] = useState([])
    const [ccemailjobsSel, setCcemailjobsSel] = useState([])
    const [toemail1jobs, setToemail1jobs] = useState([
        "mahesh9@varundigitalmedia.com"
    ])
    const [toemail2jobs, setToemail2jobs] = useState([
        "salman@varundigitalmedia.com"
    ])
    const Toemailcon = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [fromemailjobs, setFromemailjobs] = useState(["harish@varundigitalmedia.com"])
    const Fromemailcontjobs = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [ccemailjobs, setCcemailjobs] = useState()
    const [ccemailseajobs, setCcemailseajobs] = useState()
    const Ccemailcontjobs = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }
    // jobs all chip ends

    // selected contacts email starts
    const [selectedemailpop, SetselectedEmailpop] = useState(false);
    // searched contacts email ends
    const [searchedemailpop, SetsearchedEmailpop] = useState(false);
    // all contacts email 
    const [allemailpop, SetallEmailpop] = useState(false);


    // New email const values start

    const [fromemailjobsSelectedTo, setFromemailjobsSelectedTo] = useState(["harish@varundigitalmedia.com"])
    const [fromemailjobsSelected, setFromemailjobsSelected] = useState(["mahesh9@varundigitalmedia.com"])
    const [fromemailjobsSearchedTo, setFromemailjobsSearchedTo] = useState(["john.doe@example.com"])
    const [fromemailjobsSearchedAll, setFromemailjobsSearchedAll] = useState(["salman@varundigitalmedia.com"])

    const [fromemailjobsAll, setFromemailjobsAll] = useState(["All Contacts (allcontacts@gmail.com)"])

    // New email const values start


    // select contacts to starts

    const [linkContactsVisible, setLinkContactsVisible] = useState(false);
    const [selectedContactscc, setSelectedContactscc] = useState([]);

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
        const contactDetails = selectedContactscc.map((contact) => ({
            name: contact.contact,
            email: contact.contactemail,
        }));
        const formattedContacts = contactDetails.map(
            (contact) => `${contact.name} - (${contact.email})`
        );
        setToemail(prev => [...prev, ...formattedContacts]);
        setFromemailjobsSelected(prev => [...prev, ...formattedContacts]);
        setToemailSear1(prev => [...prev, ...formattedContacts]);
        setToemailSear(prev => [...prev, ...formattedContacts]);
        settoemailAll(prev => [...prev, ...formattedContacts]);
        setToemailjobs(prev => [...prev, ...formattedContacts]);
        setToemailjobsSel(prev => [...prev, ...formattedContacts]);
        setLinkContactsVisible(false);
    };

    const handleRefresh1 = () => {
        setSelectedContactscc([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };

    // select contact to ends

    // select contacts cc starts

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
        setCcemail(prev => [...prev, ...formattedContacts]);
        setCcemail1(prev => [...prev, ...formattedContacts]);
        setCcemailSear(prev => [...prev, ...formattedContacts]);
        setCcemailSear1(prev => [...prev, ...formattedContacts]);
        setCcemailAll(prev => [...prev, ...formattedContacts]);
        setCcemailjobsall(prev => [...prev, ...formattedContacts]);
        setCcemailjobsSel(prev => [...prev, ...formattedContacts]);
        setLinkContactstoVisible(false);
    };

    const handleRefresh1to = () => {
        setSelectedContactsto([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };

    // select contact cc ends

    return (
        <React.Fragment>
            <CascadeSelect
                // value={selectedActEmail}
                onChange={handleEmailChange}
                options={actEmailOptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={['subItems', 'subItems']}
                className="md:w-8rem me-1 ms-1"
                placeholder="Email"
            />

            {/* New email start */}

            <Dialog
                header="New Email To Contact"
                visible={emailviewpop}
                className="interview-popup"
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                onHide={() => {
                    SetEmailviewpop(false)
                }}
                footer={footerContent}
            >

                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto">
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>


                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />

                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={fromemail}
                                        onChange={e => setFromemail(e.value)}
                                        itemTemplate={Fromemailcont}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>


                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail1}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="To"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={toemail}
                                        onChange={e => setToemail(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail2}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="Cc"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={ccemail}
                                        onChange={e => setCcemail(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>


                            <Row className="size-mail">
                                <Col xl={1}>
                                    <label htmlFor="interview">Subject:</label>
                                </Col>
                                <Col xl={11}>
                                    <InputText
                                        id="interview"
                                        aria-describedby="username-help"
                                        placeholder="Interview"
                                        className="w-full"
                                    />
                                </Col>
                            </Row>

                            {attachmentfile && (
                                <Row className="size-mail mt-1 align-items-baseline">
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
                                                            <i
                                                                className="pi pi-times ms-2 mt-1 text-dark"
                                                                onClick={() => removeFile(file.name)}
                                                                style={{ cursor: "pointer" }}

                                                            ></i>
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
                                onTextChange={(e) => setEmailtextEditor(e.htmlValue)}
                                className="editorpage"
                            />
                        </Col>
                    </Row>
                </div>
            </Dialog>

            {/* New email end */}


            {/* jobs all start */}
            <Dialog
                header="Send an Email to Contact with All Jobs"
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
                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto">
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
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
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="To"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={toemailjobs}
                                        onChange={e => setToemailjobs(e.value)}
                                        className="size-mail w-full"
                                    // placeholder="test@domain.com , user@gmail.com, contact@website.org"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="Cc"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={ccemailjobsall}
                                        onChange={e => setCcemailjobsall(e.value)}
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

                            {attachmentfile && (
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
                                value={jobDescriptions} // Display job descriptions with default text
                                onTextChange={e => setJobDescriptions(e.htmlValue)}
                                className="jobsall-editor"
                            />
                        </Col>
                    </Row>
                </div>
            </Dialog>

            <Dialog
                header="Job Details"
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
                    {/* <Column field="jobtype" header="Job Type" />
                  <Column field="pskills" header="Primary Skills" />
                  <Column field="exp" header="Work Experience" />
                  <Column field="description" header="Job Description" /> */}
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
            {/* jobs all end */}

            {/* jobs searched start */}
            <Dialog
                header="Send a Email to Contact with Searched Jobs"
                visible={jobssearchedpopup}
                className="interview-popup"
                onHide={() => {
                    SetJobssearchedPopup(false)
                }}
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                footer={footerContent}
            >
                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto">
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
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
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="To"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={toemailSear}
                                        onChange={e => setToemailSear(e.value)}
                                        itemTemplate={Toemailcont}
                                        className="size-mail w-full"
                                    // placeholder="test@domain.com , user@gmail.com, contact@website.org"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="Cc"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={ccemailSear1}
                                        onChange={e => setCcemailSear1(e.value)}
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

                            {attachmentfile && (
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
                                value={jobDescriptions} // Display job descriptions with default text
                                onTextChange={e => setJobDescriptions(e.htmlValue)}
                                className="jobsall-editor"
                            />
                        </Col>
                    </Row>
                </div>
            </Dialog>
            {/* jobs searched end */}


            {/* jobs selected start */}
            <Dialog
                header="Send a Email to Contact with Selected Jobs"
                visible={jobsselectedpopup}
                className="interview-popup"
                onHide={() => {
                    SetJobsselectedPopup(false)
                }}
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                footer={footerContent}
            >
                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto">
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={fromemailjobsSelectedTo}
                                        onChange={e => setFromemailjobsSelectedTo(e.value)}
                                        itemTemplate={Fromemailcontjobs}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="To"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={toemailjobsSel}
                                        onChange={e => setToemailjobsSel(e.value)}
                                        itemTemplate={Toemailcont}
                                        className="size-mail w-full"
                                    // placeholder="test@domain.com , user@gmail.com, contact@website.org"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="Cc"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={ccemailjobsSel}
                                        onChange={e => setCcemailjobsSel(e.value)}
                                        itemTemplate={Ccemailcontjobs}
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

                            {attachmentfile && (
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
                                value={jobDescriptions} // Display job descriptions with default text
                                onTextChange={e => setJobDescriptions(e.htmlValue)}
                                className="jobsall-editor"
                            />
                        </Col>
                    </Row>
                </div>
            </Dialog>
            {/* jobs selected end */}


            {/* selected contacts email start */}
            <Dialog
                header="Email to Selected Contacts"
                visible={selectedemailpop}
                className="interview-popup"
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                onHide={() => {
                    SetselectedEmailpop(false)
                }}
                footer={footerContent}
            >

                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto">
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail3}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={fromemailjobsSelectedTo}
                                        onChange={e => setFromemailjobsSelectedTo(e.value)}
                                        itemTemplate={Fromemailcont}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>


                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail4}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="To"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={fromemailjobsSelected}
                                        onChange={e => setFromemailjobsSelected(e.value)}
                                        className="size-mail w-full mb-2"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail5}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="Cc"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={ccemail1}
                                        onChange={e => setCcemail1(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>


                            <Row className="size-mail">
                                <Col xl={1}>
                                    <label htmlFor="interview">Subject:</label>
                                </Col>
                                <Col xl={11}>
                                    <InputText
                                        id="interview"
                                        aria-describedby="username-help"
                                        placeholder="Interview"
                                        className="w-full"
                                    />
                                </Col>
                            </Row>

                            {
                                attachmentfile && (<Row className="size-mail mt-2 align-items-baseline">
                                    <Col xl={1}>
                                        <label>Attached:</label>
                                    </Col>

                                    <Col xl={11}>
                                        {/* Scrollable File List */}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                            {/* Uploaded Files List */}
                                            <div
                                                ref={fileListRef}
                                                style={{
                                                    display: 'flex',
                                                    overflowX: 'auto',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '100%',
                                                    padding: '10px 0px',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {uploadedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            marginRight: '15px',
                                                            padding: '5px 10px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            background: '#f9f9f9',
                                                            boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                                                        }}
                                                    >
                                                        <div>
                                                            <i className="pi pi-file" style={{ marginRight: '5px' }}></i>
                                                            <span>{file.name}</span>
                                                        </div>


                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                    </Col>
                                </Row>)
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Editor
                                value={emailtextEditor}
                                onTextChange={(e) => setEmailtextEditor(e.htmlValue)}
                                className="editorpage"
                            />
                        </Col>
                    </Row>
                </div>
            </Dialog>
            {/* selected contacts email end */}


            {/* searched contacts email start */}
            <Dialog
                header="Email to Searched Contacts"
                visible={searchedemailpop}
                className="interview-popup"
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                onHide={() => {
                    SetsearchedEmailpop(false)
                }}
                footer={footerContent}
            >

                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto">
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail6}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={fromemailjobsSelectedTo}
                                        onChange={e => setFromemailjobsSelectedTo(e.value)}
                                        itemTemplate={Toemailcont}
                                        className="size-mail w-full mb-2"
                                    />
                                </Col>
                            </Row>


                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail7}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="To"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">

                                    <Chips
                                        value={toemailSear1}
                                        onChange={e => setToemailSear1(e.value)}
                                        className="size-mail w-full mb-2"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail8}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="Cc"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={ccemailSear}
                                        onChange={e => setCcemailSear(e.value)}
                                        itemTemplate={Ccemailcont}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>


                            <Row className="size-mail">
                                <Col xl={1}>
                                    <label htmlFor="interview">Subject:</label>
                                </Col>
                                <Col xl={11}>
                                    <InputText
                                        id="interview"
                                        aria-describedby="username-help"
                                        placeholder="Interview"
                                        className="w-full"
                                    />
                                </Col>
                            </Row>

                            {
                                attachmentfile && (<Row className="size-mail mt-2 align-items-baseline">
                                    <Col xl={1}>
                                        <label>Attached:</label>
                                    </Col>

                                    <Col xl={11}>
                                        {/* Scrollable File List */}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                            {/* Uploaded Files List */}
                                            <div
                                                ref={fileListRef}
                                                style={{
                                                    display: 'flex',
                                                    overflowX: 'auto',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '100%',
                                                    padding: '10px 0px',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {uploadedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            marginRight: '15px',
                                                            padding: '5px 10px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            background: '#f9f9f9',
                                                            boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                                                        }}
                                                    >
                                                        <div>
                                                            <i className="pi pi-file" style={{ marginRight: '5px' }}></i>
                                                            <span>{file.name}</span>
                                                        </div>


                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                    </Col>
                                </Row>)
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Editor
                                value={emailtextEditor}
                                onTextChange={(e) => setEmailtextEditor(e.htmlValue)}
                                className="editorpage"
                            />
                        </Col>
                    </Row>
                </div>
            </Dialog>
            {/* searched contacts email end */}


            {/* all contacts email start */}
            <Dialog
                header="Email to All Contacts"
                visible={allemailpop}
                className="interview-popup"
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                onHide={() => {
                    SetallEmailpop(false)
                }}
                footer={footerContent}
            >

                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto">
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail9}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={fromemailjobsSelectedTo}
                                        onChange={e => setFromemailjobsSelectedTo(e.value)}
                                        itemTemplate={Fromemailcont}
                                        className="size-mail w-full mb-2"
                                    />
                                </Col>
                            </Row>


                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail10}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="To"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={toemailAll}
                                        onChange={e => settoemailAll(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={1} className="pe-0 mb-1">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail11}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactstoVisible(true);
                                            }}
                                            optionLabel="name"
                                            placeholder="Cc"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11} className="mb-1">
                                    <Chips
                                        value={ccemailAll}
                                        onChange={e => setCcemailAll(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>


                            <Row className="size-mail">
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

                            {
                                attachmentfile && (<Row className="size-mail mt-2 align-items-baseline">
                                    <Col xl={1}>
                                        <label>Attached:</label>
                                    </Col>

                                    <Col xl={11}>
                                        {/* Scrollable File List */}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                            {/* Uploaded Files List */}
                                            <div
                                                ref={fileListRef}
                                                style={{
                                                    display: 'flex',
                                                    overflowX: 'auto',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '100%',
                                                    padding: '10px 0px',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {uploadedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            marginRight: '15px',
                                                            padding: '5px 10px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            background: '#f9f9f9',
                                                            boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                                                        }}
                                                    >
                                                        <div>
                                                            <i className="pi pi-file" style={{ marginRight: '5px' }}></i>
                                                            <span>{file.name}</span>
                                                        </div>


                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                    </Col>
                                </Row>)
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Editor
                                value={emailtextEditor}
                                onTextChange={(e) => setEmailtextEditor(e.htmlValue)}
                                className="editorpage"
                            />
                        </Col>
                    </Row>
                </div>
            </Dialog>
            {/* all contacts email end */}

            {/* select contactsform popup for TO */}
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
                    key={selectedContactscc.length} // Force re-render when selectedContacts changes
                    value={filteredContacts}
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
                        onClick={handleRefresh1to}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

        </React.Fragment>
    )
}
export default EmailContacts;