import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CascadeSelect } from 'primereact/cascadeselect';
import LinkJobs from "./LinkJobs";
import { Sidebar } from 'primereact/sidebar';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TreeSelect } from 'primereact/treeselect';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Chips } from 'primereact/chips';
import { Editor } from 'primereact/editor';
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabView, TabPanel } from 'primereact/tabview';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Badge } from 'primereact/badge';
import { TreeTable } from 'primereact/treetable';
import { Card } from 'primereact/card';
import { ContextMenu } from "primereact/contextmenu";

import Notes from '../common-for-all/Notes'
import NotesCandidate from '../common-for-all/NotesWorkType'
import EmailAC from "./EmailAC";
import ScheduleInterview from "pms/common-for-all/ScheduleInterview";
import SubmitCandidatetoJob from "./SubmitCandidatetoJob";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import ImportResumeCan from "./ImportResumeCan";
import Export from '@/features/projects/components/Export';;;;

const CandidatesMyActive = () => {

    // Datatable fields

    const [activeCandidatesFilters, setActiveCandidatesFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        first_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        last_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        primary_skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        mobile_phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        employee_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        relocation: { value: null, matchMode: FilterMatchMode.EQUALS },
        availability_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        categories: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        groups: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        edit_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        created_by: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [activeCandidates, setActiveCandidates] = useState([
        {
            id: 1,
            first_name: "Rahul",
            last_name: "Sharma",
            company: "Infosys",
            job_title: "Full Stack Developer",
            primary_skills: "React, Node.js, MongoDB",
            email: "rahul.sharma@example.com",
            mobile_phone: "9876543210",
            city: "Bangalore",
            status: "Active",
            employee_type: "Full-Time",
            relocation: "Yes",
            availability_date: "20-02-2025", // dd-mm-yyyy format
            categories: "Development",
            groups: "MERN Stack",
            create_date: "10-01-2025", // dd-mm-yyyy format
            edit_date: "01-02-2025", // dd-mm-yyyy format
            created_by: "Admin",
        },
        {
            id: 2,
            first_name: "Priya",
            last_name: "Patel",
            company: "Wipro",
            job_title: "UI/UX Designer",
            primary_skills: "Figma, Adobe XD, Sketch",
            email: "priya.patel@example.com",
            mobile_phone: "8765432109",
            city: "Mumbai",
            status: "Active",
            employee_type: "Part-Time",
            relocation: "No",
            availability_date: "25-02-2025", // dd-mm-yyyy format
            categories: "Design",
            groups: "UX Team",
            create_date: "15-01-2025", // dd-mm-yyyy format
            edit_date: "05-02-2025", // dd-mm-yyyy format
            created_by: "Admin",
        },
        {
            id: 3,
            first_name: "Ananya",
            last_name: "Gupta",
            company: "TCS",
            job_title: "Frontend Developer",
            primary_skills: "React, Next.js, TypeScript, Tailwind CSS",
            email: "ananya.gupta@example.com",
            mobile_phone: "7654321098",
            city: "Pune",
            status: "Active",
            employee_type: "Full-Time",
            relocation: "Yes",
            availability_date: "01-03-2025", // dd-mm-yyyy format
            categories: "Development",
            groups: "Frontend Team",
            create_date: "20-01-2025", // dd-mm-yyyy format
            edit_date: "04-02-2025", // dd-mm-yyyy format
            created_by: "Manager",
        },
        {
            id: 4,
            first_name: "Arjun",
            last_name: "Mehta",
            company: "HCL Technologies",
            job_title: "UI Developer",
            primary_skills: "HTML5, CSS3, JavaScript, Bootstrap",
            email: "arjun.mehta@example.com",
            mobile_phone: "9876123450",
            city: "Delhi",
            status: "Active",
            employee_type: "Freelancer",
            relocation: "No",
            availability_date: "28-02-2025", // dd-mm-yyyy format
            categories: "Development",
            groups: "UI Team",
            create_date: "18-01-2025", // dd-mm-yyyy format
            edit_date: "03-02-2025", // dd-mm-yyyy format
            created_by: "HR",
        },
        {
            id: 5,
            first_name: "Kavya",
            last_name: "Reddy",
            company: "Amazon India",
            job_title: "DevOps Engineer",
            primary_skills: "AWS, Docker, Kubernetes, Jenkins",
            email: "kavya.reddy@example.com",
            mobile_phone: "8765123490",
            city: "Hyderabad",
            status: "Active",
            employee_type: "Full-Time",
            relocation: "Yes",
            availability_date: "20-02-2025", // dd-mm-yyyy format
            categories: "Engineering",
            groups: "Cloud Ops",
            create_date: "10-01-2025", // dd-mm-yyyy format
            edit_date: "06-02-2025", // dd-mm-yyyy format
            created_by: "Admin",
        },
        {
            id: 6,
            first_name: "Vikram",
            last_name: "Joshi",
            company: "Microsoft IDC",
            job_title: "Data Scientist",
            primary_skills: "Python, TensorFlow, PyTorch, SQL",
            email: "vikram.joshi@example.com",
            mobile_phone: "9812345670",
            city: "Chennai",
            status: "Active",
            employee_type: "Contract",
            relocation: "No",
            availability_date: "05-03-2025", // dd-mm-yyyy format
            categories: "Data Science",
            groups: "AI Team",
            create_date: "25-01-2025", // dd-mm-yyyy format
            edit_date: "01-02-2025", // dd-mm-yyyy format
            created_by: "Admin",
        },
        {
            id: 7,
            first_name: "Meera",
            last_name: "Singh",
            company: "Flipkart",
            job_title: "Technical Product Manager",
            primary_skills: "Agile, JIRA, Confluence, Product Strategy",
            email: "meera.singh@example.com",
            mobile_phone: "7890123456",
            city: "Bangalore",
            status: "Active",
            employee_type: "Full-Time",
            relocation: "Yes",
            availability_date: "18-02-2025", // dd-mm-yyyy format
            categories: "Management",
            groups: "Product Team",
            create_date: "12-01-2025", // dd-mm-yyyy format
            edit_date: "05-02-2025", // dd-mm-yyyy format
            created_by: "HR",
        },
        {
            id: 8,
            first_name: "Aditya",
            last_name: "Verma",
            company: "Tech Mahindra",
            job_title: "System Architect",
            primary_skills: "Microservices, Java Spring Boot, System Design",
            email: "aditya.verma@example.com",
            mobile_phone: "8901234567",
            city: "Noida",
            status: "Active",
            employee_type: "Full-Time",
            relocation: "No",
            availability_date: "22-02-2025", // dd-mm-yyyy format
            categories: "Architecture",
            groups: "Enterprise Solutions",
            create_date: "05-01-2025", // dd-mm-yyyy format
            edit_date: "02-02-2025", // dd-mm-yyyy format
            created_by: "Manager",
        },
        {
            id: 9,
            first_name: "Neha",
            last_name: "Kapoor",
            company: "Deloitte India",
            job_title: "Business Intelligence Analyst",
            primary_skills: "Power BI, Tableau, SQL, Python",
            email: "neha.kapoor@example.com",
            mobile_phone: "9087654321",
            city: "Gurgaon",
            status: "Active",
            employee_type: "Freelancer",
            relocation: "Yes",
            availability_date: "10-03-2025", // dd-mm-yyyy format
            categories: "Analytics",
            groups: "BI Team",
            create_date: "15-01-2025", // dd-mm-yyyy format
            edit_date: "06-02-2025", // dd-mm-yyyy format
            created_by: "Admin",
        },
        {
            id: 10,
            first_name: "Rohan",
            last_name: "Malhotra",
            company: "Cognizant",
            job_title: "DevOps Specialist",
            primary_skills: "Docker, Jenkins, GitLab CI/CD, Terraform",
            email: "rohan.malhotra@example.com",
            mobile_phone: "7654890123",
            city: "Pune",
            status: "Active",
            employee_type: "Contract",
            relocation: "No",
            availability_date: "27-02-2025", // dd-mm-yyyy format
            categories: "Engineering",
            groups: "DevOps",
            create_date: "17-01-2025", // dd-mm-yyyy format
            edit_date: "04-02-2025", // dd-mm-yyyy format
            created_by: "HR",
        },
        {
            id: 11,
            first_name: "Sneha",
            last_name: "Agarwal",
            company: "Google India",
            job_title: "Machine Learning Engineer",
            primary_skills: "TensorFlow, PyTorch, NLP, Computer Vision",
            email: "sneha.agarwal@example.com",
            mobile_phone: "9876543211",
            city: "Bangalore",
            status: "Active",
            employee_type: "Full-Time",
            relocation: "Yes",
            availability_date: "15-03-2025", // dd-mm-yyyy format
            categories: "AI/ML",
            groups: "Machine Learning",
            create_date: "22-01-2025", // dd-mm-yyyy format
            edit_date: "05-02-2025", // dd-mm-yyyy format
            created_by: "Admin",
        }
    ]);


    const [selectedActiveCandidates, setSelectedActiveCandidates] = useState([])

    // context menu starts
    const [selectedCandidate, setSelectedCandidate] = useState(null); // State to track the right-clicked candidate

    const cm = useRef(null); // Reference for ContextMenu

    const toast = useRef(null)

    // Context menu options
    const menuModel = [
        { label: 'View', icon: 'pi pi-fw pi-eye', command: () => setVisibleViewRight(true) },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => navigate('/candidate-editform') },
        { label: 'Archived', icon: 'pi pi-check-circle' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteCandidate(selectedCandidate) },
        {
            label: 'Email',
            icon: 'pi pi-envelope',
            items: [ // Subitems for "Schedule"
                {
                    label: 'New Email', icon: 'pi pi-calendar-plus',
                },
                { label: 'Selected', icon: 'pi pi-phone', },
                { label: 'Searched', icon: 'pi pi-users', },
                { label: 'All', icon: 'pi pi-list', },
                {
                    label: 'Jobs', icon: 'pi pi-calendar-clock',
                    items: [ // Subitems for "Schedule"
                        {
                            label: 'All', icon: 'pi pi-calendar-plus',
                        },
                        { label: 'Selected', icon: 'pi pi-phone' },
                        { label: 'Searched', icon: 'pi pi-users' },
                    ],
                },
            ],
        },
        {
            label: 'Schedule', icon: 'pi pi-calendar-clock',
            items: [ // Subitems for "Schedule"
                { label: 'Interview', icon: 'pi pi-calendar-plus' },
                { label: 'Call', icon: 'pi pi-phone' },
                { label: 'Meeting', icon: 'pi pi-users' },
                { label: 'Task', icon: 'pi pi-list' },
                { label: 'Event', icon: 'pi pi-calendar-clock' },
                { label: 'Other', icon: 'pi pi-ellipsis-h' },
            ],
        },
        { label: 'Candidate Notes', icon: 'pi pi-clipboard' },
        { label: 'Clear Search', icon: 'pi pi-filter-slash', command: () => handleClearSearchCandidates() },
        {
            label: 'Submit',
            icon: 'pi pi-send',
            items: [ // Subitems for "More"
                { label: 'Submit Candidate to Job', icon: 'pi pi-user-plus' },
                { label: 'Submit Candidate to Contact', icon: 'pi pi-user-plus' },
            ],
        },
        {
            label: 'More',
            icon: 'pi pi-ellipsis-h',
            items: [ // Subitems for "More"
                {
                    label: 'Link Jobs', icon: 'pi pi-link',
                    items: [ // Subitems for "Link Jobs"
                        { label: 'Received', icon: 'pi pi-link' },
                        { label: 'Potential', icon: 'pi pi-sync' },
                        { label: 'Submitted', icon: 'pi pi-link' },
                    ],
                },
                { label: 'Change Status', icon: 'pi pi-link' },
                { label: 'Merge', icon: 'pi pi-sync' },
            ],
        },

    ];

    // Function to handle viewing a candidate
    const viewCandidate = (candidate) => {
        toast.current.show({ severity: 'info', summary: 'Candidate Selected', detail: `${candidate.Firstname} ${candidate.Lastname}` });
    };

    // Function to handle editing a candidate
    const editCandidate = (candidate) => {
        toast.current.show({ severity: 'success', summary: 'Edit Candidate', detail: `Editing ${candidate.Firstname} ${candidate.Lastname}` });
        // Add your edit logic here
    };

    // Function to handle deleting a candidate
    const deleteCandidate = (candidate) => {
        let _candidates = [...activeCandidates];
        _candidates = _candidates.filter((c) => c.id !== candidate.id);
        setActiveCandidates(_candidates); // Update the candidate data state
        toast.current.show({ severity: 'error', summary: 'Candidate Deleted', detail: `Deleted ${candidate.first_name}` });
    };

    // context menu ends


    // clear search starts

    const handleClearSearchCandidates = () => {
        setActiveCandidatesFilters({
            first_name: { value: " " },
            last_name: { value: " " },
            company: { value: " " },
            job_title: { value: " " },
            primary_skills: { value: " " },
            email: { value: " " },
            mobile_phone: { value: " " },
            city: { value: " " },
            status: { value: " " },
            employee_type: { value: " " },
            relocation: { value: "" },
            availability_date: { value: " " },
            categories: { value: " " },
            groups: { value: " " },
            create_date: { value: " " },
            edit_date: { value: " " },
            created_by: { value: " " },
        });
    };

    // clear search ends

    // Action items starts

    const [selectedActSms, setSelectedActSms] = useState(null);

    const actSmsOptions = [
        {
            name: 'Selected',
            code: 'SMS-SE',
            icon: 'pi pi-check'
        },
        {
            name: 'Searched',
            code: 'SMS-SR',
            icon: 'pi pi-search'
        },
        {
            name: 'All',
            code: 'SMS-AL',
            icon: 'pi pi-list'
        }
    ];



    //   sidebar
    const [visibleRight, setVisibleRight] = useState(false);

    const [visibleViewRight, setVisibleViewRight] = useState(false);

    //   Action items ends


    // new email starts
    const [emailviewpop, SetEmailviewpop] = useState(false);


    const [emailviewpopSelected, SetEmailviewpopSelected] = useState(false)

    const [emailviewpopSearched, SetEmailviewpopSearched] = useState(false)

    const [emailviewpopAll, SetEmailviewpopAll] = useState(false)

    const [selectedOption, setSelectedOption] = useState(null);
    const selectedOptionTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`}></i>
                    <div>{option.label}</div>
                </div>
            );
        }
        return (
            <div className="flex align-items-center">
                <i className="pi pi-cog mr-2"></i>
                <span>{props.placeholder}</span>
            </div>
        );
    };
    const optionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <i className={`${option.icon} mr-2`}></i>
                <div>{option.label}</div>
            </div>
        );
    };
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
    const [selectedSmsOption, setSelectedSmsOption] = useState(null);
    const smsOptions1 = [
        { label: "Signature 1", icon: "pi pi-pencil" },
        { label: "Signature 2", icon: "pi pi-pencil" },
        { label: "Signature 3", icon: "pi pi-pencil" },
    ]

    const selectedSmsTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`}></i>
                    <div>{option.label}</div>
                </div>
            );
        }
        return (
            <div className="flex align-items-center">
                <i className="pi pi-comment mr-2"></i>
                <span>{props.placeholder}</span>
            </div>
        );
    };
    const smsOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <i className={`${option.icon} mr-2`}></i>
                <div>{option.label}</div>
            </div>
        );
    };
    const onUploadHandler1 = (e) => {
        setUploadedFiles((prevFiles) => [...prevFiles, ...e.files]);

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

    const [frominputemail1, setFrominputemail1] = useState(null);
    const fromEmail1 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];


    const [frominputemail2, setFrominputemail2] = useState(null);
    const fromEmail2 = [
        { name: "ram@gmail.com", code: "NY" },
        { name: "ravi@gmail.com", code: "RM" },
        { name: "sai@gmail.com", code: "LDN" },
        { name: "krishna@gmail.com", code: "IST" },
        { name: "teja@gmail.com", code: "PRS" },
    ];

    const [fromemail, setFromemail] = useState([])
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
         <p>I hope this email finds you well. Thank you for your interest in joining our team at Pranathi Software Services.</p>
         <br />
         <p>[Email Body]</p>
         <br />
         <p>We look forward to your response.</p>
         <br />
         <p>Best regards,<br />
         Shatru Naik<br />
         HR Manager<br />
         Pranathi Software Services<br />
         Ph: +91-917 711 1156</p>
       `);

    // new email ends


    // interview popup starts
    const [interviewpop, SetInterviewpop] = useState(false)
    const [intertype, setintertype] = useState("Interview")
    const [subtype, setSubtype] = useState(null)
    const [subtypeget, setsubtypeget] = useState(null)
    const [startdate, setStartdate] = useState(null)
    const [starttime, setStarttime] = useState(null)
    const [endtime, setendtime] = useState(null)
    const [enddate, setenddate] = useState(null)
    const [popTextares, setPopTextares] = useState("")
    const [priority, setPriority] = useState(null)
    const [prioritycontact, setprioritycontact] = useState(null)
    const [condidatevalu, setcondidatevalu] = useState([])

    const typeInterview = [
        { name: 'Low', value: 'low' },
        { name: 'Medium', value: 'medium' },
        { name: 'High', value: 'high' },
    ];
    const [reminder, setReminder] = useState(null);
    const reminderOptions = [
        { name: '0 mins', value: '0 mins' },
        { name: '5 mins', value: '5 mins' },
        { name: '10 mins', value: '10 mins' },
        { name: '15 mins', value: '15 mins' },
        { name: '30 mins', value: '30 mins' },
    ];
    const [repeat, setRepeat] = useState(null);
    const repeatOptions = [
        { name: 'Do not repeat', value: 'none' },
        { name: 'Daily', value: 'daily' },
        { name: 'Weekly', value: 'weekly' },
        { name: 'Mon-Fri', value: 'mon-fri' },
    ];

    const [followup, setFollowup] = useState(null);

    // Dropdown options
    const followupOptions = [
        { name: 'None', value: 'none' },
        { name: '1 Day', value: '1 Day' },
        { name: '2 Days', value: '2 Day' },
        { name: '3 Days', value: '3 Day' },
    ];


    const [typeInterviewval, settypeInterviewval] = useState([])
    const [typeInterviewcontact, settypeInterviewcontact] = useState([])
    const [typeInterviewcondi, settypeInterviewcondi] = useState([])
    const [subjectval, setsubjectval] = useState(null)
    const [popchecked2, setPopchecked2] = useState(false)
    const handlePopupCheckbox2 = e => {
        setPopchecked2(e.checked)
    }

    const [userid, setUserid] = useState([])
    const customChip = item => {
        return (
            <div>
                <span>{item} - (active)</span>
                <i className="pi pi-user-plus"></i>
            </div>
        )
    }
    // interview popup ends

    // view page starts
    const [documents, setDocuments] = useState([]);

    // Define the downloadResume function
    const downloadResume = () => {
        const doc = new jsPDF();

        // Get the Resume content
        const resumeContent = document.getElementById("resume-content");

        // Use the `html` method of jsPDF to capture the content and render it into the PDF
        doc.html(resumeContent, {
            callback: function (doc) {
                doc.save("Resume.pdf"); // Save the generated PDF
            },
            margin: [10, 10, 10, 10], // Margin for the PDF
            x: 10, // X position for the start of the content
            y: 10, // Y position for the start of the content
            autoPaging: true, // Allow content to automatically flow to the next page if needed
            width: 180, // Set the content width
        });
    };

    // view form activities starts

    const [activitiesFilters, setActivitiesFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        sub_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const activities = [
        {
            type: "Technical",
            sub_type: "Software",
            priority: "High",
            subject: "Job Interview",
            date_time: "2025-01-01 10:00",
            user_id: "12345",
        },
        {
            type: "Technical",
            sub_type: "Project Management",
            priority: "Medium",
            subject: "Project Kickoff",
            date_time: "2024-12-05 09:00",
            user_id: "54321",
        },
        {
            type: "Technical",
            sub_type: "Data Analysis",
            priority: "Low",
            subject: "Data Review",
            date_time: "2025-01-15 14:00",
            user_id: "98765",
        },
        {
            type: "Non-Technical",
            sub_type: "Marketing",
            priority: "High",
            subject: "Strategy Discussion",
            date_time: "2025-02-01 11:00",
            user_id: "67890",
        },
        {
            type: "Non-Technical",
            sub_type: "Human Resources",
            priority: "Critical",
            subject: "Employee Review",
            date_time: "2025-03-01 13:00",
            user_id: "11223",
        },
    ];

    const [selectedActivities, setSelectedActivities] = useState([]);

    // view form activities ends


    // view form history starts

    const [historyFilters, setHistoryFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        sub_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const history = [
        {
            type: "Technical",
            sub_type: "Software",
            priority: "High",
            subject: "Job Interview",
            date_time: "2025-01-01 10:00",
            user_id: "12345",
        },
        {
            type: "Technical",
            sub_type: "Project Management",
            priority: "Medium",
            subject: "Project Kickoff",
            date_time: "2024-12-05 09:00",
            user_id: "54321",
        },
        {
            type: "Technical",
            sub_type: "Data Analysis",
            priority: "Low",
            subject: "Data Review",
            date_time: "2025-01-15 14:00",
            user_id: "98765",
        },
        {
            type: "Non-Technical",
            sub_type: "Marketing",
            priority: "High",
            subject: "Strategy Discussion",
            date_time: "2025-02-01 11:00",
            user_id: "67890",
        },
        {
            type: "Non-Technical",
            sub_type: "Human Resources",
            priority: "Critical",
            subject: "Employee Review",
            date_time: "2025-03-01 13:00",
            user_id: "11223",
        },
    ];

    const [selectedHistory, setSelectedHistory] = useState([]);

    // view form history ends

    // view form pipeline starts

    const [receivedJobsFilters, setReceivedJobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const receivedJobs = [
        {
            status: "Open",
            jobid: "DEV001",
            job_title: "Frontend Developer",
            candidate: "John Doe",
            contact: "john.doe@example.com",
            company: "Tech Corp",
            date_time: "2025-01-01 10:00 AM",
            user_id: "12345",
        },
        {
            status: "In Progress",
            jobid: "DEV002",
            job_title: "Backend Developer",
            candidate: "Jane Smith",
            contact: "jane.smith@example.com",
            company: "Innovate Ltd.",
            date_time: "2024-12-15 02:30 PM",
            user_id: "54321",
        },
        {
            status: "Closed",
            jobid: "ANA001",
            job_title: "Data Analyst",
            candidate: "Bob Brown",
            contact: "bob.brown@example.com",
            company: "Analytics Inc.",
            date_time: "2025-02-01 09:00 AM",
            user_id: "67890",
        },
        {
            status: "Closed",
            jobid: "ENG001",
            job_title: "Mechanical Engineer",
            candidate: "Alice Carter",
            contact: "alice.carter@example.com",
            company: "Engineered Solutions",
            date_time: "2025-02-05 03:00 PM",
            user_id: "11223",
        },
        {
            status: "Closed",
            jobid: "HRM001",
            job_title: "HR Manager",
            candidate: "Daniel Smith",
            contact: "daniel.smith@example.com",
            company: "PeopleFirst HR",
            date_time: "2025-01-25 11:30 AM",
            user_id: "33445",
        },
        {
            status: "Closed",
            jobid: "DEV001",
            job_title: "Full Stack Developer",
            candidate: "Sophia Taylor",
            contact: "sophia.taylor@example.com",
            company: "Code Creators",
            date_time: "2025-01-15 02:15 PM",
            user_id: "55667",
        },
        {
            status: "Closed",
            jobid: "PM001",
            job_title: "Project Manager",
            candidate: "James Wilson",
            contact: "james.wilson@example.com",
            company: "AgilePro Management",
            date_time: "2025-01-30 04:45 PM",
            user_id: "77889",
        },
    ];

    const [selectedReceivedJobs, setSelectedReceivedJobs] = useState([]);

    // potential

    const [potentialJobsFilters, setPotentialJobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const potentialJobs = [
        {
            status: "Open",
            jobid: "POT001",
            job_title: "Machine Learning Engineer",
            candidate: "Michael Clark",
            contact: "michael.clark@example.com",
            company: "AI Innovators",
            date_time: "2025-02-15 11:00 AM",
            user_id: "99876",
        },
        {
            status: "In Progress",
            jobid: "POT002",
            job_title: "Cloud Engineer",
            candidate: "Laura Green",
            contact: "laura.green@example.com",
            company: "Cloud Solutions",
            date_time: "2025-02-10 03:45 PM",
            user_id: "77654",
        },
        {
            status: "Closed",
            jobid: "POT003",
            job_title: "DevOps Specialist",
            candidate: "Kevin Hill",
            contact: "kevin.hill@example.com",
            company: "TechOps Co.",
            date_time: "2025-01-25 09:30 AM",
            user_id: "65432",
        },
    ];

    const [selectedPotentialJobs, setSelectedPotentialJobs] = useState([]);

    // rejected

    const [rejectedJobsFilters, setRejectedJobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const rejectedJobs = [
        {
            status: "Rejected",
            jobid: "REJECT001",
            job_title: "Software Engineer",
            candidate: "Chris Evans",
            contact: "chris.evans@example.com",
            company: "DevCo",
            date_time: "2025-02-01 04:30 PM",
            user_id: "12345",
        },
        {
            status: "Rejected",
            jobid: "REJECT002",
            job_title: "HR Specialist",
            candidate: "Rachel Green",
            contact: "rachel.green@example.com",
            company: "HumanCorp",
            date_time: "2025-02-02 10:00 AM",
            user_id: "23456",
        },
    ];

    const [selectedRejectedJobs, setSelectedRejectedJobs] = useState([]);

    // interview
    const [interviewJobsFilters, setInterviewJobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const interviewJobs = [
        {
            status: "Interview Scheduled",
            jobid: "INTERVIEW001",
            job_title: "Backend Developer",
            candidate: "Lucas Williams",
            contact: "lucas.williams@example.com",
            company: "DevSolutions",
            date_time: "2025-03-05 09:30 AM",
            user_id: "56789",
        },
        {
            status: "Interview Scheduled",
            jobid: "INTERVIEW002",
            job_title: "UI/UX Designer",
            candidate: "Chloe Brown",
            contact: "chloe.brown@example.com",
            company: "Creative Studios",
            date_time: "2025-03-06 11:00 AM",
            user_id: "67890",
        },
        {
            status: "Interview Completed",
            jobid: "INTERVIEW003",
            job_title: "Data Scientist",
            candidate: "Oliver Harris",
            contact: "oliver.harris@example.com",
            company: "DataWorks",
            date_time: "2025-03-07 02:00 PM",
            user_id: "78901",
        },
        {
            status: "Interview Scheduled",
            jobid: "INTERVIEW004",
            job_title: "Product Manager",
            candidate: "Emily Davis",
            contact: "emily.davis@example.com",
            company: "Productive Inc.",
            date_time: "2025-03-08 04:00 PM",
            user_id: "89012",
        },
        {
            status: "Interview Scheduled",
            jobid: "INTERVIEW004",
            job_title: "Product Manager",
            candidate: "Emily Davis",
            contact: "emily.davis@example.com",
            company: "Productive Inc.",
            date_time: "2025-03-08 04:00 PM",
            user_id: "89012",
        },
    ];

    const [selectedInterviewJobs, setSelectedInterviewJobs] = useState([]);

    // submitted

    const [submittedJobsFilters, setSubmittedJobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const submittedJobs = [
        {
            status: "Submitted",
            jobid: "SUB001",
            job_title: "Data Scientist",
            candidate: "John Doe",
            contact: "john.doe@example.com",
            company: "DataCorp",
            date_time: "2025-03-01 10:00 AM",
            user_id: "12345",
        },
        {
            status: "Submitted",
            jobid: "SUB002",
            job_title: "Software Engineer",
            candidate: "Jane Smith",
            contact: "jane.smith@example.com",
            company: "TechWorld",
            date_time: "2025-03-02 11:30 AM",
            user_id: "23456",
        },
        {
            status: "Submitted",
            jobid: "SUB003",
            job_title: "Product Manager",
            candidate: "Alex Lee",
            contact: "alex.lee@example.com",
            company: "InnovateX",
            date_time: "2025-03-03 02:00 PM",
            user_id: "34567",
        },
        {
            status: "Submitted",
            jobid: "SUB004",
            job_title: "Marketing Specialist",
            candidate: "Emily Davis",
            contact: "emily.davis@example.com",
            company: "MarketMinds",
            date_time: "2025-03-04 09:15 AM",
            user_id: "45678",
        },
        {
            status: "Submitted",
            jobid: "SUB003",
            job_title: "Product Manager",
            candidate: "Alex Lee",
            contact: "alex.lee@example.com",
            company: "InnovateX",
            date_time: "2025-03-03 02:00 PM",
            user_id: "34567",
        },
        {
            status: "Submitted",
            jobid: "SUB004",
            job_title: "Marketing Specialist",
            candidate: "Emily Davis",
            contact: "emily.davis@example.com",
            company: "MarketMinds",
            date_time: "2025-03-04 09:15 AM",
            user_id: "45678",
        },
        {
            status: "Submitted",
            jobid: "SUB003",
            job_title: "Product Manager",
            candidate: "Alex Lee",
            contact: "alex.lee@example.com",
            company: "InnovateX",
            date_time: "2025-03-03 02:00 PM",
            user_id: "34567",
        },
        {
            status: "Submitted",
            jobid: "SUB004",
            job_title: "Marketing Specialist",
            candidate: "Emily Davis",
            contact: "emily.davis@example.com",
            company: "MarketMinds",
            date_time: "2025-03-04 09:15 AM",
            user_id: "45678",
        },
        {
            status: "Submitted",
            jobid: "SUB003",
            job_title: "Product Manager",
            candidate: "Alex Lee",
            contact: "alex.lee@example.com",
            company: "InnovateX",
            date_time: "2025-03-03 02:00 PM",
            user_id: "34567",
        },
        {
            status: "Submitted",
            jobid: "SUB004",
            job_title: "Marketing Specialist",
            candidate: "Emily Davis",
            contact: "emily.davis@example.com",
            company: "MarketMinds",
            date_time: "2025-03-04 09:15 AM",
            user_id: "45678",
        },
    ];

    const [selectedSubmittedJobs, setSelectedSubmittedJobs] = useState([]);

    // offer
    const [offerJobsFilters, setOfferJobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const offerJobs = [
        {
            status: "Offer Extended",
            jobid: "OFFER001",
            job_title: "Senior Data Scientist",
            candidate: "Johnathan Miles",
            contact: "johnathan.miles@example.com",
            company: "DataMinds",
            date_time: "2025-03-05 10:30 AM",
            user_id: "56789",
        },
        {
            status: "Offer Extended",
            jobid: "OFFER002",
            job_title: "Backend Developer",
            candidate: "Sophie Turner",
            contact: "sophie.turner@example.com",
            company: "Tech Universe",
            date_time: "2025-03-06 02:15 PM",
            user_id: "67890",
        },
        {
            status: "Offer Accepted",
            jobid: "OFFER003",
            job_title: "Frontend Developer",
            candidate: "Michael Johnson",
            contact: "michael.johnson@example.com",
            company: "DevWorks",
            date_time: "2025-03-07 11:45 AM",
            user_id: "78901",
        },
        {
            status: "Offer Declined",
            jobid: "OFFER004",
            job_title: "Project Manager",
            candidate: "Olivia Adams",
            contact: "olivia.adams@example.com",
            company: "PM Solutions",
            date_time: "2025-03-08 09:00 AM",
            user_id: "89012",
        },
    ];

    const [selectedOfferJobs, setSelectedOfferJobs] = useState([]);

    // placed

    const [placedJobsFilters, setPlacedJobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const placedJobs = [
        {
            status: "Placed",
            jobid: "PLACED001",
            job_title: "Full Stack Developer",
            candidate: "Natalie Perez",
            contact: "natalie.perez@example.com",
            company: "Tech Innovators",
            date_time: "2025-02-15 09:00 AM",
            user_id: "56789",
        },
        {
            status: "Placed",
            jobid: "PLACED002",
            job_title: "Cloud Architect",
            candidate: "Daniela Brooks",
            contact: "daniela.brooks@example.com",
            company: "Cloud Masters",
            date_time: "2025-02-16 11:00 AM",
            user_id: "67890",
        },
        {
            status: "Placed",
            jobid: "PLACED003",
            job_title: "Product Designer",
            candidate: "Ethan White",
            contact: "ethan.white@example.com",
            company: "DesignWorks",
            date_time: "2025-02-17 02:30 PM",
            user_id: "78901",
        },
        {
            status: "Placed",
            jobid: "PLACED004",
            job_title: "Marketing Director",
            candidate: "Olivia King",
            contact: "olivia.king@example.com",
            company: "Growth Strategies",
            date_time: "2025-02-18 04:00 PM",
            user_id: "89012",
        },
        {
            status: "Placed",
            jobid: "PLACED004",
            job_title: "Marketing Director",
            candidate: "Olivia King",
            contact: "olivia.king@example.com",
            company: "Growth Strategies",
            date_time: "2025-02-18 04:00 PM",
            user_id: "89012",
        },
    ];

    const [selectedPlacedJobs, setSelectedPlacedJobs] = useState([]);

    // view form pipeline ends

    // view form notes starts
    const [isEditorVisible, setEditorVisible] = useState(false); // Manage editor visibility
    const [editorContent, setEditorContent] = useState(''); // Manage editor content
    const [editIndex, setEditIndex] = useState(null);
    const [candidateNotes, setCandidateNotes] = useState([]); // Store notes in an array

    const handleAddNotes = () => {
        setEditorVisible(true); // Show the editor
        setEditorContent(''); // Clear any previous content
        setEditIndex(null); // Reset editIndex when adding a new note
    };

    const handleSaveNotes = () => {
        if (editorContent.trim()) {
            const currentDateTime = new Date().toLocaleString(); // Get current date and time
            const newNote = {
                content: editorContent,
                timestamp: `Saved on: ${currentDateTime}`,
                candidateName: "Note: Anup Gogoi - Senior Python developer - ATS", // Example candidate name, can be dynamic
            };

            if (editIndex !== null) {
                // Edit the existing note
                const updatedNotes = [...candidateNotes];
                updatedNotes[editIndex] = newNote; // Update the specific note
                setCandidateNotes(updatedNotes);
                setEditIndex(null); // Reset editIndex after saving
            } else {
                // Add a new note in the array
                setCandidateNotes((prevNotes) => [...prevNotes, newNote]);
            }

            setEditorContent(''); // Clear editor content after saving
        }
    };

    const handleCancelNotes = () => {
        setEditorContent(''); // Clear editor content
        setEditIndex(null); // Reset editIndex on cancel
    };

    const handleEditNote = (index) => {
        setEditorVisible(true);
        setEditorContent(candidateNotes[index].content); // Load the note content into the editor
        setEditIndex(index); // Set editIndex to edit the current note
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = candidateNotes.filter((_, i) => i !== index); // Remove the note by index
        setCandidateNotes(updatedNotes);
    };

    // view form notes ends
    // view page ends

    // create candidate starts
    const navigate = useNavigate()
    const [createFirst, setCreateFirst] = useState("Lavankumar")
    const [createLast, setCreateLast] = useState("Kalvala")
    const [createEmail, setCreateEmail] = useState("lava9@infosys.com")
    const [createPhone, setCreatePhone] = useState("9876543211")
    const [createJobTitle, setCreateJobTitle] = useState("Web Developer")
    const [createCompany, setCreateCompany] = useState("Infosys Limited")
    const [createDate, setCreateDate] = useState("28-02-2025")
    const [skillsOptions, setSkillsOptions] = useState([
        { value: "java", label: "Java" },
        { value: "react", label: "React" },
        { value: "nodejs", label: "Node.js" },
        // Add more skill options as needed
    ])

    const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([])
    // Handle Primary Skills Selection
    const handlePrimarySkillsChange = selectedOptions => {
        setSelectedPrimarySkills(
            selectedOptions ? selectedOptions.map(option => option.value) : []
        )
    }

    const [selectedCity, setSelectedCity] = useState(null)

    const cityOptions = [
        { name: "Hyderabad", code: "HYD" },
        { name: "Chennai", code: "CHN" },
        { name: "Mumbai", code: "MUM" },
        { name: "Bangalore", code: "BLR" },
        { name: "Delhi", code: "DEL" },
    ]

    const [selectedCategoryKey, setSelectedCategoryKey] = useState(null)

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
    ])

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
    ])

    const [selectedGroupKey, setSelectedGroupKey] = useState(null)
    const [userIds, setUserIds] = useState("Harish")

    // create candidate ends

    return (
        <React.Fragment>
            <div className="page-content allact-tabs">
                <Container fluid={true}>
                    <div className="page-title-box actjobbread">

                        {/* Action items start */}
                        <Row className="justify-content-between ac-items">
                            <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
                                <span className="addcan-ac">

                                    {selectedActiveCandidates.length > 0 ?

                                        <span className="action-icons me-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary import-res-btn me-1 md:w-8rem"


                                            >
                                                <i className="pi pi-user"></i> {selectedActiveCandidates.length} Selected
                                            </button>

                                            <span className="icons-ac">

                                                <Tooltip target=".view" content="View" position="bottom" style={{ marginTop: "5px" }} />

                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1 view"
                                                    onClick={() => setVisibleViewRight(true)}
                                                >
                                                    <i className="pi pi-eye"></i>
                                                </button>

                                                <Tooltip target=".edit" content="Edit" position="top" style={{ marginBottom: "5px" }} />

                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1 edit"
                                                >
                                                    <Link to="/candidate-editform" className="p-link">
                                                        <i className="pi pi-pencil"></i>
                                                    </Link>
                                                </button>

                                                <Tooltip target=".delete" content="Delete" position="bottom" style={{ marginTop: "5px" }} />
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1 delete"
                                                >
                                                    <i className="pi pi-trash"></i>
                                                </button>

                                                <Tooltip target=".archived" content="Archived" position="top" style={{ marginBottom: "5px" }} />

                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1 archived"
                                                >
                                                    <i className="pi pi-check-circle"></i>
                                                </button>
                                            </span>

                                        </span>

                                        :
                                        <button
                                            type="button"
                                            className="btn btn-secondary import-res-btn md:w-10rem me-1"
                                            onClick={() => { setVisibleRight(true) }}
                                        >
                                            <i className="pi pi-user me-1"></i> Add a Candidate
                                        </button>
                                    }

                                </span>

                                <span className="drop-ac">

                                    <EmailAC />

                                    <CascadeSelect
                                        // value={selectedActSms}
                                        options={actSmsOptions}
                                        optionLabel="name"
                                        optionGroupLabel="name"
                                        optionGroupChildren={['subItems', 'subItems']}
                                        className="md:w-8rem me-1"
                                        breakpoint="767px"
                                        placeholder="SMS"
                                    />

                                    <ScheduleInterview />

                                    <SubmitCandidatetoJob />

                                    <LinkJobs />
                                </span>
                            </Col>

                            <Col xxl={3} xl={12} lg={12} sm={12}>
                                <div className="clr-icons">
                                    {selectedActiveCandidates.length > 0 ? <NotesCandidate /> : <Notes />}

                                    <ImportResumeCan />

                                    <Export />

                                    <button
                                        type="button"
                                        className="btn btn-secondary icons-btn" onClick={handleClearSearchCandidates} Tooltip="Clear Search"
                                    >
                                        <i className="pi pi-sync"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="mainbtn btn btn-secondary import-res-btn d-none"
                                        tooltip="Merge"
                                        tooltipOptions={{ position: 'bottom' }}
                                    >
                                        <i className="pi pi-print"></i>
                                    </button>

                                </div>
                            </Col>
                        </Row>
                        {/* Action items end */}

                        <Row>
                            <Col lg={12}>

                                {/* Toast for notifications */}
                                <Toast ref={toast} />

                                {/* ContextMenu for right-click actions */}
                                <ContextMenu model={menuModel} ref={cm} onHide={() => setSelectedCandidate(null)} />

                                <div className="card1 mt-4 mb-4 actjobsumtable">
                                    <DataTable
                                        value={activeCandidates}
                                        responsiveLayout="scroll"
                                        showGridlines
                                        tableStyle={{
                                            minWidth: "60rem",
                                            borderRadius: "8px",
                                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                        }}
                                        // paginator
                                        // rows={10}
                                        // rowsPerPageOptions={[5, 10, 25]}
                                        // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                        filters={activeCandidatesFilters}
                                        filterDisplay="row"
                                        globalFilterFields={[
                                            "first_name",
                                            "last_name",
                                            "company",
                                            "job_title",
                                            "primary_skills",
                                            "email",
                                            "mobile_phone",
                                            "city",
                                            "status",
                                            "employee_type",
                                            "relocation",
                                            "availability_date",
                                            "categories",
                                            "groups",
                                            "create_date",
                                            "edit_date",
                                            "created_by",
                                        ]}
                                        emptyMessage="No active candidates found."
                                        selection={selectedActiveCandidates}
                                        onSelectionChange={(e) => setSelectedActiveCandidates(e.value)}
                                        selectionMode="multiple"
                                        resizableColumns
                                        reorderableColumns
                                        columnResizeMode="expand"
                                        onContextMenu={(e) => {
                                            cm.current.show(e.originalEvent); // Show the context menu
                                            setSelectedCandidate(e.data); // Set the selected candidate
                                        }}
                                        contextMenuSelection={selectedCandidate}
                                        onContextMenuSelectionChange={(e) => setSelectedCandidate(e.value)}
                                    >
                                        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                        <Column field="first_name" header="First Name" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="last_name" header="Last Name" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="primary_skills" header="Primary Skills" sortable filter style={{ minWidth: "12rem" }} />
                                        <Column field="email" header="Email" sortable filter style={{ minWidth: "12rem" }} />
                                        <Column field="mobile_phone" header="Mobile Phone" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="city" header="City" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="employee_type" header="Employee Type" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="relocation" header="Relocation" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="availability_date" header="Availability Date" sortable filter style={{ minWidth: "12rem" }} />
                                        <Column field="categories" header="Categories" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="groups" header="Groups" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="create_date" header="Create Date" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="edit_date" header="Edit Date" sortable filter style={{ minWidth: "10rem" }} />
                                        <Column field="created_by" header="Created By" sortable filter style={{ minWidth: "10rem" }} />
                                    </DataTable>
                                </div>
                            </Col>
                        </Row>

                        {/* Side bar start */}
                        <Row>
                            <Col lg={12}>
                                <Sidebar
                                    visible={visibleRight}
                                    position="right"
                                    onHide={() => setVisibleRight(false)}
                                    className="sidebar"
                                >
                                    <div className="sidebar-header">
                                        <h3>Create a Candidate</h3>
                                        <div className="d-flex align-items-center">
                                            <Link to="/candidate-editform">
                                                <p className="mb-0 text-white">
                                                    {" "}
                                                    <i class="fa-regular fa-pen-to-square me-3"></i>{" "}
                                                </p>
                                            </Link>
                                            <Button
                                                icon="pi pi-times"
                                                className="p-button-text close-btn"
                                                onClick={() => setVisibleRight(false)}
                                            />
                                        </div>
                                    </div>
                                    <div className="card sidebardetails">
                                        <form>
                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <label className="mb-0">First Name</label>
                                                    <InputText
                                                        placeholder="Enter first name"
                                                        value={createFirst}
                                                    />
                                                </Col>
                                                <Col lg={6}>
                                                    <label htmlFor="lastName" className="mb-0">
                                                        Last Name
                                                    </label>
                                                    <InputText
                                                        id="lastName"
                                                        name="lastName"
                                                        placeholder="Enter last name"
                                                        value={createLast}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <label htmlFor="email" className="mb-0">
                                                        Email
                                                    </label>
                                                    <InputText
                                                        id="email"
                                                        name="email"
                                                        placeholder="Enter email"
                                                        value={createEmail}
                                                    />
                                                </Col>

                                                <Col lg={6}>
                                                    <label htmlFor="phoneNumber" className="mb-0">
                                                        Phone Number
                                                    </label>
                                                    <InputText
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        placeholder="Enter phone number"
                                                        value={createPhone}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <label htmlFor="jobTitle" className="mb-0">
                                                        Job Title
                                                    </label>
                                                    <InputText
                                                        id="jobTitle"
                                                        name="jobTitle"
                                                        placeholder="Enter job title"
                                                        value={createJobTitle}
                                                    />
                                                </Col>
                                                <Col lg={6}>
                                                    <label htmlFor="company" className="mb-0">
                                                        Company
                                                    </label>
                                                    <InputText
                                                        id="company"
                                                        name="company"
                                                        placeholder="Enter company"
                                                        value={createCompany}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={12}>
                                                    <label htmlFor="primarySkills" className="mb-0">
                                                        Primary Skills
                                                    </label>
                                                    <Select
                                                        id="primarySkills"
                                                        name="primarySkills"
                                                        isMulti
                                                        options={skillsOptions}
                                                        value={skillsOptions.filter(option =>
                                                            selectedPrimarySkills.includes(option.value)
                                                        )}
                                                        onChange={handlePrimarySkillsChange}
                                                        placeholder="JavaScript, React"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <label htmlFor="city" className="mb-0">
                                                        City
                                                    </label>
                                                    <Dropdown
                                                        value={selectedCity}
                                                        onChange={e => setSelectedCity(e.value)}
                                                        options={cityOptions}
                                                        optionLabel="name"
                                                        placeholder="Hyderabad"
                                                        filter
                                                        className="bgclr"
                                                    />
                                                </Col>

                                                <Col lg={6}>
                                                    <label
                                                        htmlFor="availabilityDate"
                                                        className="mb-0 avbdate"
                                                    >
                                                        Availability Date
                                                    </label>
                                                    <Calendar value={createDate}
                                                        placeholder="02-04-2025"
                                                        onChange={e => setCreateDate(e.target.value)}
                                                        showIcon />
                                                    {/* <input
                            type="date"
                            id="availabilityDate"
                            name="availabilityDate"
                            className="form-control"
                         
                          /> */}
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col lg={12}>
                                                    <label
                                                        htmlFor="availabilityDate"
                                                        className="mb-0 avbdate"
                                                    >
                                                        Resume Attachment
                                                    </label>

                                                    <input
                                                        type="file"
                                                        accept="image/jpg,image/jpeg,image/png,image/pdf"
                                                        className="form-control addEmp_ProfilePhoto"
                                                        id="MyPro_UploadedProfilePhoto_Modal_FilesInput"
                                                    />


                                                    <small className="text-muted">
                                                        Eg: (jpeg,png,pdf,jpg)
                                                    </small>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="company">Categories</label>
                                                        <TreeSelect
                                                            value={selectedCategoryKey}
                                                            onChange={e => setSelectedCategoryKey(e.value)}
                                                            options={categories}
                                                            filter
                                                            className="w-full"
                                                            placeholder="Frontend"
                                                        ></TreeSelect>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="company">Group</label>
                                                        <TreeSelect
                                                            value={selectedGroupKey}
                                                            onChange={e => setSelectedGroupKey(e.value)}
                                                            options={groups}
                                                            filter
                                                            className="w-full"
                                                            placeholder="React"
                                                        ></TreeSelect>
                                                    </div>
                                                </Col>

                                            </Row>

                                            <Row className="mb-2 align-items-end">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="jobType">UserIDs</label>
                                                        <InputText
                                                            id="userIds"
                                                            value={userIds}
                                                            onChange={e => setUserIds(e.target.value)}
                                                            placeholder="Enter UserID"
                                                            className="block w-full"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="relocation">
                                                                <input
                                                                    type="checkbox"
                                                                    className="me-2"
                                                                    checked
                                                                />
                                                                <label htmlFor="relocation" className="mb-2">
                                                                    Relocation
                                                                </label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="p-field">
                                                                <input type="checkbox" className="me-2" />
                                                                <label htmlFor="jobType">Private</label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>

                                            <div className="buttons float-end">
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    className="btn btn-primary me-2 sidebarbtn"
                                                    onClick={() => setVisibleRight(false)}
                                                >
                                                    Create
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    className="btn btn-primary  outlinebtn"
                                                    onClick={() => setVisibleRight(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </Sidebar>
                            </Col>
                        </Row>
                        {/* Side bar end */}
                    </div>
                </Container>

                {/* view employee start */}
                <Row>
                    <Col lg={12}>
                        <Sidebar visible={visibleViewRight} position="right" onHide={() => setVisibleViewRight(false)} className="view-form-sidebar">
                            <div className="sidebar-header">
                                <h3 className="head"><i className="pi pi-users"></i> Candidate - Anup Gagoi</h3>
                                <div className="d-flex align-items-center">
                                    <Link to="/candidate-editform">
                                        <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
                                    </Link>
                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-text close-btn"
                                        onClick={() => setVisibleViewRight(false)}
                                    />
                                </div>
                            </div>
                            <TabView className="mt-4">
                                <TabPanel header="Profile" leftIcon="pi pi-user mr-2">
                                    <Row>
                                        <Col lg={12}>
                                            <Accordion activeIndex={0}>
                                                <AccordionTab
                                                    header={
                                                        <span className="flex align-items-center gap-2 w-full">
                                                            <span className="white-space-nowrap">PROFILE INFORMATION</span>
                                                            <Badge value="-" className="ml-auto" />
                                                        </span>
                                                    }
                                                >
                                                    <Row className="mb-2">
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="fullName" className="block">Full Name</label>
                                                                <InputText
                                                                    id="fullName"
                                                                    // value={fullName}
                                                                    readOnly
                                                                    // onChange={(e) => setFullName(e.target.value)}
                                                                    placeholder=""
                                                                    className="block w-full"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="work-email" className="block">Email</label>
                                                                <InputText
                                                                    id="work-email"
                                                                    // value={workEmail}
                                                                    readOnly
                                                                    // onChange={(e) => setWorkEmail(e.target.value)}
                                                                    type="email"
                                                                    placeholder=""
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="phoneNumber" className="block">Phone Number</label>
                                                                <InputText
                                                                    // id="phoneNumber"
                                                                    // value={phoneNumber} 
                                                                    readOnly
                                                                    // onChange={(e) => setPhoneNumber(e.target.value)}
                                                                    placeholder=""
                                                                    className="block w-full"
                                                                />
                                                            </div>
                                                        </Col>

                                                    </Row>

                                                    <Row className="mb-2">

                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="jobTitle" className="block">Job Title</label>
                                                                <InputText
                                                                    id="jobTitle"
                                                                    // value={jobTitle} 
                                                                    readOnly
                                                                    // onChange={(e) => setJobTitle(e.target.value)}
                                                                    placeholder=""
                                                                    className="block w-full"
                                                                />
                                                            </div>
                                                        </Col>

                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="company">Company</label>
                                                                <InputText
                                                                    id="company"
                                                                    // value={company} 
                                                                    readOnly
                                                                    // onChange={(e) => setCompany(e.target.value)}
                                                                    placeholder=""
                                                                    className="block w-full"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label className="block">Primary Skills</label>
                                                                <select
                                                                    className="form-select mb-1"
                                                                    // value={primarySkills} 
                                                                    readOnly
                                                                // onChange={(e) => setPrimarySkills(e.target.value)}
                                                                >
                                                                    <option value="">Select Primary Skills</option>
                                                                    {/* {primarySkillsvalu.map((item, j) => {
                                                                        return (
                                                                            <option value={item.skill_id} key={j}>
                                                                                {item.skill_name}
                                                                            </option>
                                                                        );
                                                                    })} */}

                                                                </select>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row className="mb-2 align-items-end">
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="city">City</label>
                                                                <InputText
                                                                    id="city"
                                                                    // value={city} 
                                                                    disabled
                                                                    // onChange={(e) => setCity(e.target.value)}
                                                                    placeholder=""
                                                                    className="block w-full"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="availabilityDate" className="block">Availability Date</label>
                                                                <Calendar className="w-100"
                                                                    id="buttondisplay"
                                                                    // value={availabilityDate1} 
                                                                    disabled
                                                                    onChange={(e) => setAvailabilityDate1(e.target.value)}
                                                                    showIcon
                                                                />

                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="relocation" className="block">Relocation</label>

                                                                <input
                                                                    type='checkbox'
                                                                    // value={relocation} 
                                                                    disabled
                                                                    onChange={(e) => setRelocation(e.target.value)}
                                                                    className="me-2"
                                                                />
                                                            </div>
                                                        </Col>


                                                    </Row>

                                                    <Row className="mb-2">
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="jobType">Categories</label>
                                                                <TreeSelect
                                                                    // value={selectedNodeKey} 
                                                                    disabled
                                                                    onChange={(e) => setSelectedNodeKey(e.value)}
                                                                    // options={categoriesitem}
                                                                    filter
                                                                    className=" w-full"
                                                                    placeholder="Select Item"
                                                                ></TreeSelect>

                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="jobType">Groups</label>
                                                                <TreeSelect
                                                                    // value={selectedgroupKey} 
                                                                    disabled
                                                                    onChange={(e) => setselectedgroupKey(e.value)}
                                                                    // options={groupitem}
                                                                    filter
                                                                    className=" w-full"
                                                                    placeholder="Select Item"
                                                                ></TreeSelect>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="p-field">
                                                                <label htmlFor="jobType">UserIDs</label>
                                                                <InputText
                                                                    id="userIds"
                                                                    // value={userIds} 
                                                                    disabled
                                                                    onChange={(e) => setUserIds(e.target.value)}
                                                                    placeholder=""
                                                                    className="block w-full"
                                                                />
                                                            </div>
                                                        </Col>

                                                    </Row>

                                                    <Row className="mb-2">

                                                    </Row>


                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="p-field" >
                                                                <label htmlFor="jobType" className="block">Notes</label>
                                                                <InputTextarea
                                                                    autoResize
                                                                    // value={description} 
                                                                    readOnly
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    rows={5}
                                                                    cols={40}
                                                                    placeholder=""
                                                                    className="w-full "
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>


                                                </AccordionTab>
                                                <AccordionTab
                                                    header={
                                                        <span className="flex align-items-center gap-2 w-full">
                                                            <span className="white-space-nowrap">DOCUMENTS</span>
                                                            <Badge value="-" className="ml-auto" />
                                                        </span>
                                                    }
                                                >
                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="doc-table">

                                                                <TreeTable
                                                                    value={documents}
                                                                    // header={header}
                                                                    tableStyle={{ minWidth: '50rem' }}
                                                                >
                                                                    <Column header="Document Type" ></Column>
                                                                    <Column field="" header="Document Subject"></Column>
                                                                    <Column field="" header="Applied Date & Time"></Column>
                                                                    {/* <Column body={actionTemplate} headerClassName="w-10rem" header="Actions" /> */}
                                                                </TreeTable>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </AccordionTab>

                                            </Accordion>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="Resume" leftIcon="pi pi-file mr-2">
                                    <Row>
                                        <Col lg={12}>
                                            <div>
                                                <Accordion activeIndex={[0, 1]} multiple>
                                                    <AccordionTab header="Resume">

                                                        <Row className="resumehead">
                                                            <Col lg={12}>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div className="d-flex justify-content-between">
                                                                        <h6 className="me-2">Date: <span className="date">16/01/2025</span></h6>
                                                                        <h6>UserIDs: <span className="date">SrinivasRao</span></h6>
                                                                    </div>

                                                                    <Button type="submit" color="primary" className="btn btn-primary me-2 sidebarbtn" onClick={downloadResume}>
                                                                        <i class="pi pi-download me-2"></i>
                                                                        Download Resume
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row className="resumedetails mt-3" id="resume-content">
                                                            <Col lg={12}>
                                                                <div class="contact">
                                                                    <h1 className="name">Kiran Chandran</h1>
                                                                    <p className="role mb-1">Front end developer</p>
                                                                    <div className="d-flex">
                                                                        <p className="me-3 contact"><i className="pi pi-phone"></i> +91-8309860962</p>
                                                                        <p className="me-3 contact"><i className="pi pi-envelope"></i> kiranroyal2000@gmail.com</p>
                                                                        <p className="me-3"><a href="#"><i className="pi pi-linkedin"></i> LinkedIn Profile</a></p>
                                                                        <p className="me-3"> <a href="#">GitHub Profile</a></p>
                                                                    </div>
                                                                </div>

                                                                <div class="section">
                                                                    <h2><strong>Career Objective</strong></h2>
                                                                    <p>
                                                                        Dynamic and detail-oriented Front-End Developer with over 3.1+ years of experience in building and optimizing user-focused web applications using React.js.
                                                                        I am proficient in JavaScript and skilled in leveraging modern web development tools and frameworks including Redux and React Router.
                                                                        Hands-on experience with RESTful APIs, microservices architecture, and cloud services like AWS.
                                                                    </p>
                                                                </div>

                                                                <div class="section">
                                                                    <h2>Skills</h2>
                                                                    <ul class="skills-list">
                                                                        <li><strong>Programming Languages:</strong> JavaScript, Java</li>
                                                                        <li><strong>Web Technologies:</strong> HTML, CSS, React.js, Redux, React Router</li>
                                                                        <li><strong>Database:</strong> MongoDB</li>
                                                                        <li><strong>Testing Tools:</strong> Jest, React Testing Library</li>
                                                                        <li><strong>API Integration:</strong> RESTful Services, Postman</li>
                                                                        <li><strong>Project Management & Collaboration:</strong> Jira, Rally</li>
                                                                        <li><strong>Version Control:</strong> Git</li>
                                                                        <li><strong>CI/CD Tools:</strong> Jenkins</li>
                                                                        <li><strong>Cloud Services:</strong> Amazon Web Services (AWS)</li>
                                                                        <li><strong>Architecture:</strong> Micro-Services</li>
                                                                        <li><strong>Content Management:</strong> Adobe Experience Manager (AEM)</li>
                                                                        <li><strong>Computer Science Fundamentals:</strong> Data Structures</li>
                                                                    </ul>
                                                                </div>

                                                                <div class="section mt-3">
                                                                    <h2>Work Experience</h2>
                                                                    <h3>LTIMindtree - Front-End Developer</h3>
                                                                    <p>(Dec 2021 â€“ Present)</p>
                                                                    <p><strong>Project:</strong> Adidas - Retail Service Platform (RSP)</p>
                                                                    <p><strong>Description:</strong> Developed and optimized user interfaces for an online retail web application, enhancing overall user experience and operational efficiency.</p>
                                                                    <h4>Responsibilities:</h4>
                                                                    <ul class="responsibilities">
                                                                        <li>Developed dynamic and responsive front-end components using React.js and JavaScript, significantly improving user engagement.</li>
                                                                        <li>Collaborated with back-end developers to integrate RESTful APIs, ensuring seamless data flow between the front-end and the microservices architecture.</li>
                                                                        <li>Utilized Redux for state management and React Router for efficient client-side routing.</li>
                                                                        <li>Contributed to sprint planning and retrospectives within an Agile framework using JIRA, leading to improved code quality and product scalability.</li>
                                                                        <li>Worked with MongoDB for efficient data storage and retrieval.</li>
                                                                        <li>Managed version control and code collaboration using Git and streamlined CI/CD processes with Jenkins.</li>
                                                                        <li>Engaged in troubleshooting and resolving front-end issues in collaboration with the QA and development teams.</li>
                                                                    </ul>
                                                                    <p className="mt-2"><strong>Technologies Used:</strong> JavaScript, React.js, Redux, React Router, MongoDB, RESTful APIs, Jest, Git, Jenkins, AWS</p>
                                                                </div>

                                                                <div class="section">
                                                                    <h2>Education</h2>
                                                                    <p>Sri Venkateswara College of Engineering & Technology (Chittoor)<br />
                                                                        B. Tech in Electrical & Electronics Engineering (EEE) - CGPA: 7.65 - (2018 â€“ 2021)</p>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </AccordionTab>
                                                    <AccordionTab header="Skill Matrix">
                                                        <p></p>
                                                    </AccordionTab>
                                                </Accordion>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="Pipeline" leftIcon="pi pi-cog mr-2" >
                                    <Row>
                                        <Col lg={12}>
                                            <div className="pipelinetabs">
                                                <TabView scrollable style={{ maxWidth: '1200px', overflow: 'hidden' }}>
                                                    <TabPanel header="Received" rightIcon={
                                                        <Badge value="7" severity="success" className="ml-2" />
                                                    } leftIcon="pi pi-cog mr-1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <section className="job-datatable-section">
                                                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                                                        <DataTable
                                                                            value={receivedJobs}
                                                                            responsiveLayout="scroll"
                                                                            showGridlines
                                                                            tableStyle={{
                                                                                minWidth: "60rem",
                                                                                borderRadius: "8px",
                                                                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                                            }}
                                                                            paginator
                                                                            rows={10}
                                                                            rowsPerPageOptions={[5, 10, 25]}
                                                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                                            filters={receivedJobsFilters}
                                                                            filterDisplay="row"
                                                                            globalFilterFields={[
                                                                                "status",
                                                                                "jobid",
                                                                                "job_title",
                                                                                "candidate",
                                                                                "contact",
                                                                                "company",
                                                                                "date_time",
                                                                                "user_id",
                                                                            ]}
                                                                            emptyMessage="No jobs found."
                                                                            selection={selectedReceivedJobs}
                                                                            onSelectionChange={(e) => setSelectedReceivedJobs(e.value)}
                                                                            selectionMode="multiple"
                                                                            resizableColumns
                                                                            columnResizeMode="expand"
                                                                        >
                                                                            <Column
                                                                                selectionMode="multiple"
                                                                                headerStyle={{ width: "3em" }}
                                                                            />
                                                                            <Column
                                                                                field="status"
                                                                                header="Status"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="jobid"
                                                                                header="Job ID"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="job_title"
                                                                                header="Job Title"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            {/* <Column
                                                        field="candidate"
                                                        header="Candidate"
                                                        sortable
                                                        filter
                                                        style={{ minWidth: "10rem" }}
                                                      /> */}
                                                                            <Column
                                                                                field="contact"
                                                                                header="Contact"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="company"
                                                                                header="Company"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="date_time"
                                                                                header="Date & Time"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "12rem" }}
                                                                            />
                                                                            <Column
                                                                                field="user_id"
                                                                                header="User ID"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                        </DataTable>
                                                                    </div>
                                                                </section>
                                                            </Col>
                                                        </Row>
                                                    </TabPanel>
                                                    <TabPanel header="Potential" rightIcon={
                                                        <Badge value="3" severity="success" className="ml-2" />
                                                    } leftIcon="pi pi-cog mr-1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <section className="job-datatable-section">
                                                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                                                        <DataTable
                                                                            value={potentialJobs}
                                                                            responsiveLayout="scroll"
                                                                            showGridlines
                                                                            tableStyle={{
                                                                                minWidth: "60rem",
                                                                                borderRadius: "8px",
                                                                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                                            }}
                                                                            paginator
                                                                            rows={10}
                                                                            rowsPerPageOptions={[5, 10, 25]}
                                                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                                            filters={potentialJobsFilters}
                                                                            filterDisplay="row"
                                                                            globalFilterFields={[
                                                                                "status",
                                                                                "jobid",
                                                                                "job_title",
                                                                                "candidate",
                                                                                "contact",
                                                                                "company",
                                                                                "date_time",
                                                                                "user_id",
                                                                            ]}
                                                                            emptyMessage="No potential jobs found."
                                                                            selection={selectedPotentialJobs}
                                                                            onSelectionChange={(e) => setSelectedPotentialJobs(e.value)}
                                                                            selectionMode="multiple"
                                                                            resizableColumns
                                                                            columnResizeMode="expand"
                                                                        >
                                                                            <Column
                                                                                selectionMode="multiple"
                                                                                headerStyle={{ width: "3em" }}
                                                                            />
                                                                            <Column
                                                                                field="status"
                                                                                header="Status"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="jobid"
                                                                                header="Job ID"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="job_title"
                                                                                header="Job Title"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            {/* <Column
                                                        field="candidate"
                                                        header="Candidate"
                                                        sortable
                                                        filter
                                                        style={{ minWidth: "10rem" }}
                                                      /> */}
                                                                            <Column
                                                                                field="contact"
                                                                                header="Contact"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="company"
                                                                                header="Company"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                            <Column
                                                                                field="date_time"
                                                                                header="Date & Time"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "12rem" }}
                                                                            />
                                                                            <Column
                                                                                field="user_id"
                                                                                header="User ID"
                                                                                sortable
                                                                                filter
                                                                                style={{ minWidth: "10rem" }}
                                                                            />
                                                                        </DataTable>
                                                                    </div>
                                                                </section>
                                                            </Col>
                                                        </Row>
                                                    </TabPanel>
                                                    <TabPanel header="Submitted" rightIcon={
                                                        <Badge value="10" severity="success" className="ml-2" />
                                                    } leftIcon="pi pi-cog mr-1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <section className="job-datatable-section">
                                                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                                                        <DataTable
                                                                            value={submittedJobs}
                                                                            responsiveLayout="scroll"
                                                                            showGridlines
                                                                            tableStyle={{
                                                                                minWidth: "60rem",
                                                                                borderRadius: "8px",
                                                                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                                            }}
                                                                            paginator
                                                                            rows={10}
                                                                            rowsPerPageOptions={[5, 10, 25]}
                                                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                                            filters={submittedJobsFilters}
                                                                            filterDisplay="row"
                                                                            globalFilterFields={[
                                                                                "status",
                                                                                "jobid",
                                                                                "job_title",
                                                                                "candidate",
                                                                                "contact",
                                                                                "company",
                                                                                "date_time",
                                                                                "user_id",
                                                                            ]}
                                                                            emptyMessage="No submitted jobs found."
                                                                            selection={selectedSubmittedJobs}
                                                                            onSelectionChange={(e) => setSelectedSubmittedJobs(e.value)}
                                                                            selectionMode="multiple"
                                                                            resizableColumns
                                                                            columnResizeMode="expand"
                                                                        >
                                                                            <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                                            <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="jobid" header="Job ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: "10rem" }} />
                                                                            {/* <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} /> */}
                                                                            <Column field="contact" header="Contact" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="date_time" header="Date & Time" sortable filter style={{ minWidth: "12rem" }} />
                                                                            <Column field="user_id" header="User ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                        </DataTable>
                                                                    </div>
                                                                </section>
                                                            </Col>
                                                        </Row>
                                                    </TabPanel>
                                                    <TabPanel header="Offer" rightIcon={
                                                        <Badge value="4" severity="success" className="ml-2" />
                                                    } leftIcon="pi pi-cog mr-1">

                                                        <Row>
                                                            <Col lg={12}>
                                                                <section className="job-datatable-section">
                                                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                                                        <DataTable
                                                                            value={offerJobs}
                                                                            responsiveLayout="scroll"
                                                                            showGridlines
                                                                            tableStyle={{
                                                                                minWidth: "60rem",
                                                                                borderRadius: "8px",
                                                                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                                            }}
                                                                            paginator
                                                                            rows={10}
                                                                            rowsPerPageOptions={[5, 10, 25]}
                                                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                                            filters={offerJobsFilters}
                                                                            filterDisplay="row"
                                                                            globalFilterFields={[
                                                                                "status",
                                                                                "jobid",
                                                                                "job_title",
                                                                                "candidate",
                                                                                "contact",
                                                                                "company",
                                                                                "date_time",
                                                                                "user_id",
                                                                            ]}
                                                                            emptyMessage="No offer jobs found."
                                                                            selection={selectedOfferJobs}
                                                                            onSelectionChange={(e) => setSelectedOfferJobs(e.value)}
                                                                            selectionMode="multiple"
                                                                            resizableColumns
                                                                            columnResizeMode="expand"
                                                                        >
                                                                            <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                                            <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="jobid" header="Job ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: "10rem" }} />
                                                                            {/* <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} /> */}
                                                                            <Column field="contact" header="Contact" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="date_time" header="Date & Time" sortable filter style={{ minWidth: "12rem" }} />
                                                                            <Column field="user_id" header="User ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                        </DataTable>
                                                                    </div>
                                                                </section>
                                                            </Col>
                                                        </Row>
                                                    </TabPanel>
                                                    <TabPanel header="Rejected" rightIcon={
                                                        <Badge value="2" severity="success" className="ml-2" />
                                                    } leftIcon="pi pi-cog mr-1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <section className="job-datatable-section">
                                                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                                                        <DataTable
                                                                            value={rejectedJobs}
                                                                            responsiveLayout="scroll"
                                                                            showGridlines
                                                                            tableStyle={{
                                                                                minWidth: "60rem",
                                                                                borderRadius: "8px",
                                                                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                                            }}
                                                                            paginator
                                                                            rows={10}
                                                                            rowsPerPageOptions={[5, 10, 25]}
                                                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                                            filters={rejectedJobsFilters}
                                                                            filterDisplay="row"
                                                                            globalFilterFields={[
                                                                                "status",
                                                                                "jobid",
                                                                                "job_title",
                                                                                "candidate",
                                                                                "contact",
                                                                                "company",
                                                                                "date_time",
                                                                                "user_id",
                                                                            ]}
                                                                            emptyMessage="No rejected jobs found."
                                                                            selection={selectedRejectedJobs}
                                                                            onSelectionChange={(e) => setSelectedRejectedJobs(e.value)}
                                                                            selectionMode="multiple"
                                                                            resizableColumns
                                                                            columnResizeMode="expand"
                                                                        >
                                                                            <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                                            <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="jobid" header="Job ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: "10rem" }} />
                                                                            {/* <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} /> */}
                                                                            <Column field="contact" header="Contact" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="date_time" header="Date & Time" sortable filter style={{ minWidth: "12rem" }} />
                                                                            <Column field="user_id" header="User ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                        </DataTable>
                                                                    </div>
                                                                </section>
                                                            </Col>
                                                        </Row>
                                                    </TabPanel>
                                                    <TabPanel header="Interview" rightIcon={
                                                        <Badge value="5" severity="success" className="ml-2" />
                                                    } leftIcon="pi pi-cog mr-1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <section className="job-datatable-section">
                                                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                                                        <DataTable
                                                                            value={interviewJobs}
                                                                            responsiveLayout="scroll"
                                                                            showGridlines
                                                                            tableStyle={{
                                                                                minWidth: "60rem",
                                                                                borderRadius: "8px",
                                                                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                                            }}
                                                                            paginator
                                                                            rows={10}
                                                                            rowsPerPageOptions={[5, 10, 25]}
                                                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                                            filters={interviewJobsFilters}
                                                                            filterDisplay="row"
                                                                            globalFilterFields={[
                                                                                "status",
                                                                                "jobid",
                                                                                "job_title",
                                                                                "candidate",
                                                                                "contact",
                                                                                "company",
                                                                                "date_time",
                                                                                "user_id",
                                                                            ]}
                                                                            emptyMessage="No interview jobs found."
                                                                            selection={selectedInterviewJobs}
                                                                            onSelectionChange={(e) => setSelectedInterviewJobs(e.value)}
                                                                            selectionMode="multiple"
                                                                            resizableColumns
                                                                            columnResizeMode="expand"
                                                                        >
                                                                            <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                                            <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="jobid" header="Job ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: "10rem" }} />
                                                                            {/* <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} /> */}
                                                                            <Column field="contact" header="Contact" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="date_time" header="Date & Time" sortable filter style={{ minWidth: "12rem" }} />
                                                                            <Column field="user_id" header="User ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                        </DataTable>
                                                                    </div>
                                                                </section>
                                                            </Col>
                                                        </Row>
                                                    </TabPanel>
                                                    <TabPanel header="Placed" rightIcon={
                                                        <Badge value="5" severity="success" className="ml-2" />
                                                    } leftIcon="pi pi-cog mr-1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <section className="job-datatable-section">
                                                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                                                        <DataTable
                                                                            value={placedJobs}
                                                                            responsiveLayout="scroll"
                                                                            showGridlines
                                                                            tableStyle={{
                                                                                minWidth: "60rem",
                                                                                borderRadius: "8px",
                                                                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                                            }}
                                                                            paginator
                                                                            rows={10}
                                                                            rowsPerPageOptions={[5, 10, 25]}
                                                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                                            filters={placedJobsFilters}
                                                                            filterDisplay="row"
                                                                            globalFilterFields={[
                                                                                "status",
                                                                                "jobid",
                                                                                "job_title",
                                                                                "candidate",
                                                                                "contact",
                                                                                "company",
                                                                                "date_time",
                                                                                "user_id",
                                                                            ]}
                                                                            emptyMessage="No placed jobs found."
                                                                            selection={selectedPlacedJobs}
                                                                            onSelectionChange={(e) => setSelectedPlacedJobs(e.value)}
                                                                            selectionMode="multiple"
                                                                            resizableColumns
                                                                            columnResizeMode="expand"
                                                                        >
                                                                            <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                                            <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="jobid" header="Job ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: "10rem" }} />
                                                                            {/* <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} /> */}
                                                                            <Column field="contact" header="Contact" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                                                            <Column field="date_time" header="Date & Time" sortable filter style={{ minWidth: "12rem" }} />
                                                                            <Column field="user_id" header="User ID" sortable filter style={{ minWidth: "10rem" }} />
                                                                        </DataTable>
                                                                    </div>
                                                                </section>
                                                            </Col>
                                                        </Row>
                                                    </TabPanel>
                                                </TabView>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="Activities" leftIcon="pi pi-calendar mr-2" >
                                    <Row>
                                        <Col lg={12}>
                                            <section className="job-datatable-section">
                                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                                    <DataTable
                                                        responsive
                                                        showGridlines
                                                        value={activities}
                                                        tableStyle={{
                                                            minWidth: "50rem",
                                                            borderRadius: "8px",
                                                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                        }}
                                                        paginator
                                                        rows={5}
                                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                        filters={activitiesFilters}
                                                        filterDisplay="row"
                                                        globalFilterFields={[
                                                            "type",
                                                            "sub_type",
                                                            "priority",
                                                            "subject",
                                                            "date_time",
                                                            "user_id",
                                                        ]}
                                                        emptyMessage="No activities found."
                                                        selection={selectedActivities}
                                                        onSelectionChange={(e) => setSelectedActivities(e.value)}
                                                        selectionMode="multiple"
                                                        resizableColumns
                                                        columnResizeMode="expand"
                                                    >
                                                        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                        <Column
                                                            field="type"
                                                            header="Type"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="sub_type"
                                                            header="Sub Type"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="priority"
                                                            header="Priority"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="subject"
                                                            header="Subject"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="date_time"
                                                            header="Date and Time"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="user_id"
                                                            header="User ID"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                    </DataTable>
                                                </div>
                                            </section>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="History" leftIcon="pi pi-clock mr-2" >
                                    <Row>
                                        <Col lg={12} sm={12}>
                                            <section className="job-datatable-section">
                                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                                    <DataTable
                                                        responsive
                                                        showGridlines
                                                        value={history}
                                                        tableStyle={{
                                                            minWidth: "50rem",
                                                            borderRadius: "8px",
                                                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                        }}
                                                        paginator
                                                        rows={5}
                                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                                        filters={historyFilters}
                                                        filterDisplay="row"
                                                        globalFilterFields={[
                                                            "type",
                                                            "sub_type",
                                                            "priority",
                                                            "subject",
                                                            "date_time",
                                                            "user_id",
                                                        ]}
                                                        emptyMessage="No history found."
                                                        selection={selectedHistory}
                                                        onSelectionChange={(e) => setSelectedHistory(e.value)}
                                                        selectionMode="multiple"
                                                        resizableColumns
                                                        columnResizeMode="expand"
                                                    >
                                                        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                        <Column
                                                            field="type"
                                                            header="Type"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="sub_type"
                                                            header="Sub Type"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="priority"
                                                            header="Priority"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="subject"
                                                            header="Subject"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="date_time"
                                                            header="Date and Time"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="user_id"
                                                            header="User ID"
                                                            sortable
                                                            filter
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                    </DataTable>
                                                </div>
                                            </section>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="Notes" leftIcon="pi pi-pencil mr-2" >
                                    <Row>
                                        <Col lg={12}>
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    type="button"
                                                    label="Add Notes"
                                                    icon="pi pi-plus"
                                                    className="btn btn-primary waves-effect waves-light me-2 sidebarbtn"
                                                    onClick={handleAddNotes}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    {isEditorVisible && (
                                        <Row className="mt-4">
                                            <Col lg={12}>
                                                <Editor
                                                    value={editorContent}
                                                    onTextChange={(e) => setEditorContent(e.htmlValue)}
                                                    style={{ height: '200px' }}
                                                    placeholder="Enter your notes here..."
                                                />
                                                <div className="d-flex justify-content-end mt-2">
                                                    <Button
                                                        type="button"
                                                        label="Save"
                                                        icon="pi pi-save"
                                                        className="btn btn-success me-2"
                                                        onClick={handleSaveNotes}
                                                    />
                                                    <Button
                                                        color="primary"
                                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                                        onClick={handleCancelNotes}
                                                    >
                                                        <i className="pi pi-times me-1"></i>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    )}

                                    <Row className="mt-4 notes">
                                        <Col lg={12}>
                                            {candidateNotes.length > 0 && (
                                                <Card className="pt-0 pb-0">
                                                    {candidateNotes.map((note, index) => (
                                                        <div key={index}>
                                                            <div className="d-flex mt-0">
                                                                <strong className="text-muted me-4">{note.candidateName}</strong>
                                                                <strong className="text-muted">{note.timestamp}</strong>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-2 mb-0">
                                                                <div dangerouslySetInnerHTML={{ __html: note.content }} />
                                                                <div>
                                                                    <Button
                                                                        icon="pi pi-pencil"
                                                                        className="btn btn-warning editbtn p-0"
                                                                        onClick={() => handleEditNote(index)}
                                                                    />
                                                                    <Button
                                                                        icon="pi pi-trash"
                                                                        className="btn btn-danger deletebtn"
                                                                        onClick={() => handleDeleteNote(index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    ))}
                                                </Card>
                                            )}
                                        </Col>
                                    </Row>
                                </TabPanel>
                            </TabView>
                        </Sidebar>
                    </Col>
                </Row>
                {/* view employee end */}
            </div>
        </React.Fragment>
    );
};



export default CandidatesMyActive;


