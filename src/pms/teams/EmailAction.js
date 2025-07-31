import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CascadeSelect } from 'primereact/cascadeselect';
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { ChevronRightIcon } from "primereact/icons/chevronright"
import { Button } from "primereact/button";

const EmailAC = () => {

    // interview

    const [primarySkillsvalu, setprimarySkillsvalu] = useState([])
    const getprimary = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_CONDIDATES}/api/v1/skills/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.data && response.data.results) {
                const treeData = response.data.results

                setprimarySkillsvalu(treeData)
            }
        } catch (error) { }
    }

    const [city, setCity] = useState("")
    const [fullName, setFullName] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [company, setCompany] = useState("")
    const [userIds, setUserIds] = useState("")
    const [availabilityDate1, setavailabilityDate1] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [workEmail, setWorkEmail] = useState("")
    const [documents, setDocuments] = useState([])
    const [description, setDescription] = useState("")

    const geteditvaluescondidates = async candidate_id => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/${candidate_id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.data) {
                let results = response.data

                setTimeout(() => {
                    setFullName(
                        results.first_name,
                        results.middle_name,
                        results.last_name
                    )
                    setJobTitle(results.job_title)
                    setCompany(results.current_company)
                    setPhoneNumber(results.mobile_phone)
                    setWorkEmail(results.email)
                    setavailabilityDate1(results.availability_date)
                    setCity(results.city)
                    setSelectedNodeKey(results.categories)
                    setselectedgroupKey(results.groups)
                    setPrimarySkills(results.primary_skills)
                    setDescription(results.description)
                }, 1000)
            }
        } catch (error) { }
    }

    const getdocumentsitems = async candidate_id => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_CONDIDATES}/api/v1/candidate-certificates/?candidate=${candidate_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.data) {
                const results = response.data.results.map(item => ({
                    key: item.certificate_id.toString(), // Unique key for TreeTable
                    data: {
                        certificate_name: item.certificate_name,
                        docSubject: item.issuing_authority,
                        created_at: new Date(item.created_at).toLocaleString(), // Format date if needed
                    },
                }))

                setDocuments(results)
            } // Set documents in the state
        } catch (error) { }
    }

    const [addCities, setaddCities] = useState([])

    const getcity = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_Jobs}/api/v1/cities/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // Transform data if needed to match the Dropdown format
            const transformedData = response.data.results.map(city => ({
                name: city.name,
                code: city.city_id,
            }))
            setaddCities(transformedData)
        } catch (error) { }
    }

    useEffect(() => {
        getcity()
    }, [])

    useEffect(() => {
        // geteditvaluescondidates()
        getprimary()
        // getdocumentsitems()
    }, [])

    // const [typeInterviewval, settypeInterviewval] = useState([])
    // const [typeInterviewcontact, settypeInterviewcontact] = useState([])
    const [appJobStatus, setAppJobStatus] = useState([])

    const getjobs = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_Jobs}/api/v1/jobs/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // Transform data if needed to match the Dropdown format
            const transformedData = response.data.results.map(city => ({
                name: city.job_title,
                id: city.job_id,
            }))
            settypeInterviewval(transformedData)
        } catch (error) { }
    }

    const getallactivecontacts = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_Company_Contact}/api/v1/contacts/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const transformedData = response.data.results.map(city => ({
                name: city.first_name,
                id: city.contact_id,
            }))
            settypeInterviewcontact(transformedData)
        } catch (error) { }
    }
    const [interviewdroptype, setinterviewdroptype] = useState([])

    const getallinterviewdrop = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_Calendar}/api/v1/event-lookup/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const data = response.data
            const types = data.Types.map(type => ({
                label: type,
            }))
            if (response.data === 500) {
                console.log(response)
            }

            setinterviewdroptype(types)
        } catch (error) { }
    }

    useEffect(() => {
        getjobs()
        getallactivecontacts()
        getallinterviewdrop()
    }, [])

    const getSelectedCount = () => {
        alert(`Selected Candidates: ${selectedCustomers.length}`)
    }
    // new email
    // dialog with footer

    const footerContent = (
        <div>
            <div className="d-flex align-items-center">
                <Checkbox
                    inputId="checkbox"
                // checked={popchecked}
                // onChange={handlePopupCheckbox}
                />
                <label htmlFor="username" className="ms-2 mt-1">
                    Private
                </label>
            </div>
        </div>
    )

    const [emailviewpop, SetEmailviewpop] = useState(false)

    const [emailviewpopSelected, SetEmailviewpopSelected] = useState(false)

    const [emailviewpopSearched, SetEmailviewpopSearched] = useState(false)

    const [emailviewpopAll, SetEmailviewpopAll] = useState(false)

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


    const removeFile = (fileName) => {
        setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
    };

    const [frominputemail, setFrominputemail] = useState(null)
    const fromEmail = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ]


    const [frominputemail1, setFrominputemail1] = useState(null)

    const fromEmail1 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ]

    const [frominputemail2, setFrominputemail2] = useState(null)

    const fromEmail2 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ]

    // new email form

    const [fromemail, setFromemail] = useState([])
    const Fromemailcont = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [toemail, setToemail] = useState([])
    const [tonewemail, setTonewemail] = useState([])
    const [toemailSelected, setToemailSelected] = useState([])
    const [ccemailSelected, setCcemailSelected] = useState([])
    const [toemailSearched, setToemailSearched] = useState([])
    const [ccemailSearched, setCcemailSearched] = useState([])

    const Toemailcont = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [ccemail, setCcemail] = useState([])
    const Ccemailcont = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [attachmentfile, setAttachmentfile] = useState(false)
    const fileListRef = useRef(null)
    const fileUploadRef = useRef(null)

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
         Harish Jaram<br />
         Senoir HR Recruiter<br />
         Varun Digital Media<br />
         Ph: +91-98765343210</p>
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
           </table><br><br>
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

    const handleSearchedDialogs = () => {
        // Open the first dialog
        SetJobssearchedPopup(true)

        // Automatically open the second dialog after a short delay
        setTimeout(() => {
            setJobDetailsVisible(true)
        }, 3000) // Adjust delay as needed (300ms in this example)
    }

    const handleSelectedDialogs = () => {
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
        "All Candidates"
        // "Michael Chris (test2@gmail.com)",
    ])
    const [ccemailjobsall, setCcemailjobsall] = useState([])
    const [toemailseljobs, setToemailseljobs] = useState([
        "lavan9@infosys.com"
        // "Michael Chris (test2@gmail.com)",
    ])
    const [toemailsearchjobs, setToemailsearchjobs] = useState([
        "lavan9@infosys.com"
        // "Michael Chris (test2@gmail.com)",
    ])
    const [ccemailjobssear, setCcemailjobssear] = useState([])
    const [ccemailjobsSearched, setCcemailjobsSearched] = useState([])
    const Toemailcon = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [fromemailjobsSelectedTo, setFromemailjobsSelectedTo] = useState(["Harish@varundigitalmedia.com"])
    const [fromemailjobsSelected, setFromemailjobsSelected] = useState(["lavan9@infosys.com", "venkatalaxmi9@cognizant.com"])
    const [fromemailjobsSearchedTo, setFromemailjobsSearchedTo] = useState(["venkatalaxmi9@cognizant.com"])
    const [fromemailjobsSearchedAll, setFromemailjobsSearchedAll] = useState(["allcandidates@gmail.com"])

    const [fromemailjobsAll, setFromemailjobsAll] = useState(["All Candidates (allcandidates@gmail.com)"])
    const [fromemailAll, setFromemailAll] = useState(["All Candidates (allcandidates@gmail.com)"])
    const [ccemailall, setCcemailall] = useState([])

    const [fromemailjobs, setFromemailjobs] = useState(["harish@varundigitalmedia.com"])
    const Fromemailcontjobs = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    const [ccemailjobs, setCcemailjobs] = useState(["test@gmail.com"])
    const Ccemailcontjobs = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }
    // jobs all chip ends

    // email dropdown

    const [selectedActEmail, setSelectedActEmail] = useState(null)
    const actEmailOptions = [
        {
            name: "New Email",
            code: "EM-NE",
            action: () => SetEmailviewpop(true),
        },
        {
            name: "Selected",
            code: "EM-SE",
            action: () => SetEmailviewpopSelected(true),
        },
        {
            name: "Searched",
            code: "EM-SE",
            action: () => SetEmailviewpopSearched(true),

        },
        {
            name: "All",
            code: "EM-AL",
            action: () => SetEmailviewpopAll(true),
        },
        {
            name: "Jobs",
            code: "EM-JO",
            subItems: [
                { name: "All", code: "EM-JO-AL" }, // "All" under Jobs
                { name: "Searched", code: "EM-JO-SE" },
                { name: "Selected", code: "EM-JO-SM" },
            ],
        },
    ]

    const handleEmailChange = e => {
        setSelectedActEmail(e.value)

        // Check for specific subItems like "All"
        if (e.value?.code === "EM-JO-AL") {
            console.log("All clicked!") // Debug log
            handleOpenDialogs(true) // Open dialog
        } else if (e.value?.code === "EM-JO-SE") {
            handleSearchedDialogs(true) // Handle top-level actions if defined
        }
        else if (e.value?.code === "EM-JO-SM") {
            handleSelectedDialogs(true) // Handle top-level actions if defined
        }
        else if (e.value?.action) {
            e.value.action() // Handle top-level actions if defined
        }
    }

    // email banner starts
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
    // email banner ends


    // candidates to popup starts

    const [linkCantoVisible, setLinkCantoVisible] = useState(false);
    const [selectedCanto, setSelectedCanto] = useState([]);

    const canto = [
        {
            id: "1",
            designation: "Frontend Developer",
            name: "Lavan Kumar Kalvala",
            email: "lavan9@infosys.com",
        },
        {
            id: "2",
            designation: "Frontend Developer",
            name: "Venkata laxmi Valle",
            email: "venkatalaxmi9@cognizant.com",
        },
        {
            id: "3",
            designation: "SEO",
            name: "Bhargavi Sunanda",
            email: "bhargavi9@capgemini.com",
        },
        {
            id: "4",
            designation: "Content Writer",
            name: "Nagendra Meriga",
            email: "nagendra9@catechnologies.com",
        },
        {
            id: "5",
            designation: "Backend",
            name: "Saikumar Kunda",
            email: "saikumar9@l&tmindtre.com",
        },
    ];

    const filteredCanto = canto.filter(
        (candidate) =>
            candidate.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.id.toString().includes(searchText)
    );

    const handleSaveCanto = () => {
        const canDetails = selectedCanto.map((candidate) => ({
            name: candidate.name,
            email: candidate.email,
        }));
        const formattedCandidates = canDetails.map(
            (candidate) => `${candidate.name} - (${candidate.email})`
        );
        setTonewemail(prev => [...prev, ...formattedCandidates]);
        setToemailSelected(prev => [...prev, ...formattedCandidates]);
        setToemailSearched(prev => [...prev, ...formattedCandidates]);
        setFromemailAll(prev => [...prev, ...formattedCandidates]);
        setToemailjobs(prev => [...prev, ...formattedCandidates]);
        setToemailseljobs(prev => [...prev, ...formattedCandidates]);
        setToemailsearchjobs(prev => [...prev, ...formattedCandidates]);
        setLinkCantoVisible(false);
    };

    const handleRefresh1to = () => {
        setSelectedCanto([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };

    // candidates to popup ends


    // candidates cc popup starts

    const [linkCanccVisible, setLinkCanccVisible] = useState(false);
    const [selectedCancc, setSelectedCancc] = useState([]);

    const cancc = [
        {
            id: "1",
            designation: "Frontend Developer",
            name: "Lavan Kumar Kalvala",
            email: "lavan9@infosys.com",
        },
        {
            id: "2",
            designation: "Frontend Developer",
            name: "Venkata laxmi Valle",
            email: "venkatalaxmi9@cognizant.com",
        },
        {
            id: "3",
            designation: "SEO",
            name: "Bhargavi Sunanda",
            email: "bhargavi9@capgemini.com",
        },
        {
            id: "4",
            designation: "Content Writer",
            name: "Nagendra Meriga",
            email: "nagendra9@catechnologies.com",
        },
        {
            id: "5",
            designation: "Backend",
            name: "Saikumar Kunda",
            email: "saikumar9@l&tmindtre.com",
        },
    ];

    const filteredCancc = cancc.filter(
        (candidate) =>
            candidate.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.id.toString().includes(searchText)
    );

    const handleSaveCancc = () => {
        const canDetails = selectedCancc.map((candidate) => ({
            name: candidate.name,
            email: candidate.email,
        }));
        const formattedCandidates = canDetails.map(
            (candidate) => `${candidate.name} - (${candidate.email})`
        );
        setCcemail(prev => [...prev, ...formattedCandidates]);
        setCcemailSelected(prev => [...prev, ...formattedCandidates]);
        setCcemailSearched(prev => [...prev, ...formattedCandidates]);
        setCcemailall(prev => [...prev, ...formattedCandidates]);
        setCcemailjobsall(prev => [...prev, ...formattedCandidates]);
        setCcemailjobsSearched(prev => [...prev, ...formattedCandidates]);
        setCcemailjobssear(prev => [...prev, ...formattedCandidates]);
        setLinkCanccVisible(false);
    };

    const handleRefresh1cc = () => {
        setSelectedCancc([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };


    return (
        <React.Fragment>

            <CascadeSelect
                // value={selectedActEmail}
                onChange={handleEmailChange}
                options={actEmailOptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={["subItems"]}
                className="md:w-8rem me-1 ms-1"
                placeholder="Email"
            />

            <div className="d-none">
                {/* New email start */}
                <div>
                    <Dialog
                        header="Compose New Email To Candidate"
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
                                <Col lg={12}>
                                    <div className="d-flex">
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
                                        <Button className="preview-btn ms-auto" onClick={() => {
                                            SetEmailviewpop(false)
                                        }}>
                                            <i className="pi pi-send me-1"></i> Send
                                        </Button>
                                    </div>
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
                                                    showClear={false}
                                                    showOnFocus={false}
                                                    options={fromEmail}
                                                    optionLabel="name"
                                                    placeholder="From"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={fromemailjobs}
                                                onChange={e => setFromemailjobs(e.value)}
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
                                                        setLinkCantoVisible(true);
                                                    }}
                                                    optionLabel="name"
                                                    placeholder="To"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={tonewemail}
                                                onChange={e => setTonewemail(e.value)}
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
                                                        setLinkCanccVisible(true);
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
                                        onTextChange={e => setEmailtextEditor(e.htmlValue)}
                                        className="editorpage"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Dialog>
                </div>
                {/* New email end */}

                {/* New email start selected */}
                <div>
                    <Dialog
                        header="Send Job Emails to Selected Candidates"
                        visible={emailviewpopSelected}
                        className="interview-popup"
                        style={{ width: "75vw", height: "82%" }}
                        maximizable
                        modal
                        onHide={() => {
                            SetEmailviewpopSelected(false)
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
                                    <Button className="preview-btn ms-auto" onClick={() => {
                                        SetEmailviewpopSelected(false)
                                    }}>
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
                                                    options={fromEmail}
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
                                                    value={frominputemail1}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setLinkCantoVisible(true);
                                                    }}
                                                    optionLabel="name"
                                                    placeholder="To"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={toemailSelected}
                                                onChange={e => setToemailSelected(e.value)}
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
                                                        setLinkCanccVisible(true);
                                                    }}
                                                    optionLabel="name"
                                                    placeholder="Cc"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={ccemailSelected}
                                                onChange={e => setCcemailSelected(e.value)}
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
                                        value={emailtextEditor}
                                        onTextChange={e => setEmailtextEditor(e.htmlValue)}
                                        className="editorpage"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Dialog>
                </div>
                {/* New email selected end */}

                {/* New email start searched */}
                <div>
                    <Dialog
                        header="Send Job Emails to Searched Candidates"
                        visible={emailviewpopSearched}
                        className="interview-popup"
                        style={{ width: "75vw", height: "82%" }}
                        maximizable
                        modal
                        onHide={() => {
                            SetEmailviewpopSearched(false)
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
                                    <Button className="preview-btn ms-auto" onClick={() => {
                                        SetEmailviewpopSearched(false)
                                    }}>
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
                                                    options={fromEmail}
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
                                                    value={frominputemail1}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setLinkCantoVisible(true);
                                                    }}
                                                    optionLabel="name"
                                                    placeholder="To"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={toemailSearched}
                                                onChange={e => setToemailSearched(e.value)}
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
                                                        setLinkCanccVisible(true);
                                                    }}
                                                    optionLabel="name"
                                                    placeholder="Cc"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={ccemailSearched}
                                                onChange={e => setCcemailSearched(e.value)}
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
                                        value={emailtextEditor}
                                        onTextChange={e => setEmailtextEditor(e.htmlValue)}
                                        className="editorpage"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Dialog>
                </div>
                {/* New email searched end */}

                {/* New email All start */}
                <div>
                    <Dialog
                        header="Send Job Emails to All Candidates"
                        visible={emailviewpopAll}
                        className="interview-popup"
                        style={{ width: "75vw", height: "82%" }}
                        maximizable
                        modal
                        onHide={() => {
                            SetEmailviewpopAll(false)
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
                                    <Button className="preview-btn ms-auto" onClick={() => {
                                        SetEmailviewpopAll(false)
                                    }}>
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
                                                    options={fromEmail}
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
                                                    value={frominputemail1}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setLinkCantoVisible(true);
                                                    }}
                                                    optionLabel="name"
                                                    placeholder="To"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={fromemailAll}
                                                onChange={e => setFromemailAll(e.value)}
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
                                                        setLinkCanccVisible(true);
                                                    }}
                                                    optionLabel="name"
                                                    placeholder="Cc"
                                                    className="from-width w-full"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={11} className="mb-1">
                                            <Chips
                                                value={ccemailall}
                                                onChange={e => setCcemailall(e.value)}
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
                                        value={emailtextEditor}
                                        onTextChange={e => setEmailtextEditor(e.htmlValue)}
                                        className="editorpage"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Dialog>
                </div>
                {/* New email All end */}



                {/* jobs all start */}
                <Dialog
                    header="Send an Email to the Candidate with All Jobs"
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
                                <Button className="preview-btn ms-auto" onClick={() => {
                                    SetJobsallPopup(false)
                                }}>
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
                                                value={frominputemail}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setLinkCantoVisible(true);
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
                                                    setLinkCanccVisible(true)
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
                                            placeholder="Re: Job Opportunity Notification"
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
                    header="Send an Email to the Candidate with Searched Jobs"
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
                                <Button className="preview-btn ms-auto" onClick={() => {
                                    SetJobssearchedPopup(false)
                                }}>
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
                                                value={frominputemail}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setLinkCantoVisible(true);
                                                }}
                                                optionLabel="name"
                                                placeholder="To"
                                                className="from-width w-full"
                                            />
                                        </div>
                                    </Col>
                                    <Col xl={11}>
                                        <Chips
                                            value={toemailsearchjobs}
                                            onChange={e => setToemailsearchjobs(e.value)}
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
                                                    setLinkCanccVisible(true);
                                                }}
                                                optionLabel="name"
                                                placeholder="Cc"
                                                className="from-width w-full"
                                            />
                                        </div>
                                    </Col>
                                    <Col xl={11}>
                                        <Chips
                                            value={ccemailjobsSearched}
                                            onChange={e => setCcemailjobsSearched(e.value)}
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
                                            placeholder="Re: Job Opportunity Notification"
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
                    header="Send an Email to the Candidate with Selected Jobs"
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
                                <Button className="preview-btn ms-auto" onClick={() => {
                                    SetJobsselectedPopup(false)
                                }}>
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
                                                    setLinkCantoVisible(true);
                                                }}
                                                optionLabel="name"
                                                placeholder="To"
                                                className="from-width w-full"
                                            />
                                        </div>
                                    </Col>
                                    <Col xl={11}>
                                        <Chips
                                            value={toemailseljobs}
                                            onChange={e => setToemailseljobs(e.value)}
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
                                                    setLinkCanccVisible(true);
                                                }}
                                                optionLabel="name"
                                                placeholder="Cc"
                                                className="from-width w-full"
                                            />
                                        </div>
                                    </Col>
                                    <Col xl={11}>
                                        <Chips
                                            value={ccemailjobssear}
                                            onChange={e => setCcemailjobssear(e.value)}
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
                                            placeholder="Re: Job Opportunity Notification"
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

                {/* candidates popup to */}
                <Dialog
                    header="Select Candidate"
                    visible={linkCantoVisible}
                    onHide={() => setLinkCantoVisible(false)}
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
                        key={selectedCanto.length} // Force re-render when selectedContacts changes
                        value={filteredCanto}
                        paginator
                        rows={5}
                        selection={selectedCanto}
                        onSelectionChange={(e) => setSelectedCanto(e.value)}
                        dataKey="id"
                        rowsPerPageOptions={[5, 10, 25]}
                        size="small"
                    >
                        <Column selectionMode="multiple" style={{ width: "3em" }} />
                        <Column field="name" header="Candidate Name" />
                        <Column field="designation" header="Designation" />
                        <Column field="email" header="Email" />
                    </DataTable>

                    {/* Actions */}
                    <div className="d-flex mt-3">
                        <button
                            type="button"
                            className="btn btn-primary me-2 btn-main"
                            onClick={handleSaveCanto}
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


                {/* candidates popup cc */}
                <Dialog
                    header="Select Candidate"
                    visible={linkCanccVisible}
                    onHide={() => setLinkCanccVisible(false)}
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
                        key={selectedCancc.length} // Force re-render when selectedContacts changes
                        value={filteredCancc}
                        paginator
                        rows={5}
                        selection={selectedCancc}
                        onSelectionChange={(e) => setSelectedCancc(e.value)}
                        dataKey="id"
                        rowsPerPageOptions={[5, 10, 25]}
                        size="small"
                    >
                        <Column selectionMode="multiple" style={{ width: "3em" }} />
                        <Column field="name" header="Candidate Name" />
                        <Column field="designation" header="Designation" />
                        <Column field="email" header="Email" />
                    </DataTable>

                    {/* Actions */}
                    <div className="d-flex mt-3">
                        <button
                            type="button"
                            className="btn btn-primary me-2 btn-main"
                            onClick={handleSaveCancc}
                        >
                            Ok
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-main"
                            onClick={handleRefresh1cc}
                        >
                            Refresh
                        </button>
                    </div>
                </Dialog>

            </div>


        </React.Fragment>

    )
}

export default EmailAC;