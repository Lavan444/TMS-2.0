import React, { useState, useRef, useEffect, useMemo } from "react"
import {
    CardBody,
    Col,
    Container,
    Row,
    // Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from "reactstrap"
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from "primereact/tabview"
import { Link, useLocation } from "react-router-dom"
import moment from "moment";
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import { Editor } from "primereact/editor";
import { Chips } from "primereact/chips";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { MultiSelect } from 'primereact/multiselect'; // Make sure to import MultiSelect correctly
import 'jspdf-autotable';
import { Calendar } from 'primereact/calendar';

import { useForm } from "react-hook-form";
import axios from "axios"
import LinkCandidates from "./LinkCandidates";
// import { Toast } from 'primereact/toast';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Badge } from 'primereact/badge';
import { TreeTable } from 'primereact/treetable';
import { Card } from 'primereact/card';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Tooltip } from 'primereact/tooltip';

import NotesJobs from '../common-for-all/NotesProjects'
import NotesJobs1 from '../common-for-all/NotesJobsNames'

import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import SubmitJobtoCandidate from "./SubmitJobtoCandidate";
import { Toast } from "primereact/toast";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { TreeSelect } from 'primereact/treeselect';
import ExportJobs from "./Export";

const JobAllActive = () => {
    const { register, handleSubmit, reset, trigger, clearErrors, formState: { errors }, setValue, getValues } = useForm();
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU3VwZXJ1c2VyIFJvbGUiXSwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3JvbGVzIiwibWFuYWdlX3Blcm1pc3Npb25zIiwibWFuYWdlX3JvbGVfdG9fZW1wbG95ZWUiXSwiZXhwIjoxNzM2NjYzNDMyLCJpYXQiOjE3MzQwNzE0MzJ9.VficxfYeaB2WwPhxcRAzmMjSclWyY54Js5eAQ4mqfM8`
    // action items

    const [selectedEmailOption, setSelectedEmailOption] = useState(null);
    const emailOptions = [
        { label: "New Email", icon: "pi pi-envelope" },
        { label: "Selected", icon: "pi pi-check-circle" },
        { label: "Searched", icon: "pi pi-search" },
        { label: "All", icon: "pi pi-inbox" },
        { label: "Jobs", icon: "pi pi-briefcase" },
    ];

    const selectedEmailTemplate = (option, props) => {
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
                <i className="pi pi-envelope mr-2"></i>
                <span>{props.placeholder}</span>
            </div>
        );
    };

    const emailOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <i className={`${option.icon} mr-2`}></i>
                <div>{option.label}</div>
            </div>
        );
    };
    // sms
    const [selectedSmsOption, setSelectedSmsOption] = useState(null);
    const smsOptions = [
        { label: "Selected", icon: "pi pi-check-circle" },
        { label: "Searched", icon: "pi pi-search" },
        { label: "All", icon: "pi pi-inbox" },
    ];

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


    //schedule

    const [selectedScheduleOption, setSelectedScheduleOption] = useState(null);

    const scheduleOptions = [
        { label: "Interview", icon: "pi pi-calendar-plus" },
        { label: "Call", icon: "pi pi-phone" },
        { label: "Meeting", icon: "pi pi-users" },
        { label: "Task", icon: "pi pi-check-square" },
        { label: "Event", icon: "pi pi-calendar" },
        { label: "Other", icon: "pi pi-cog" },
    ];

    const selectedScheduleTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`} />
                    <div>{option.label}</div>
                </div>
            );
        }
        return (
            <div className="flex align-items-center">
                <i className="pi pi-calendar mr-2" /> {/* Default icon for placeholder */}
                <span>{props.placeholder}</span>
            </div>
        );
    };

    const scheduleOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <i className={`${option.icon} mr-2`} />
                <div>{option.label}</div>
            </div>
        );
    };

    // more 

    // const [selectedOption, setSelectedOption] = useState(null);
    // const options = [
    //     { label: "Link Jobs", icon: "pi pi-link" },
    //     { label: "Delete", icon: "pi pi-trash" },
    // ];

    // const selectedOptionTemplate = (option, props) => {
    //     if (option) {
    //         return (
    //             <div className="flex align-items-center">
    //                 <i className={`${option.icon} mr-2`}></i>
    //                 <div>{option.label}</div>
    //             </div>
    //         );
    //     }
    //     return (
    //         <div className="flex align-items-center">
    //             <i className="pi pi-cog mr-2"></i>
    //             <span>{props.placeholder}</span>
    //         </div>
    //     );
    // };

    // const optionTemplate = (option) => {
    //     return (
    //         <div className="flex align-items-center">
    //             <i className={`${option.icon} mr-2`}></i>
    //             <div>{option.label}</div>
    //         </div>
    //     );
    // };


    // action items

    const items = [
        {
            label: "Add",
            icon: "pi pi-pencil",
            command: () => {
                toast.current.show({
                    severity: "info",
                    summary: "Add",
                    detail: "Data Added",
                })
            },
        },
        {
            label: "Update",
            icon: "pi pi-refresh",
            command: () => {
                toast.current.show({
                    severity: "success",
                    summary: "Update",
                    detail: "Data Updated",
                })
            },
        },
        {
            label: "Delete",
            icon: "pi pi-trash",
            command: () => {
                toast.current.show({
                    severity: "error",
                    summary: "Delete",
                    detail: "Data Deleted",
                })
            },
        },

    ]


    const [tabs, setTabs] = useState([
        {
            key: "tab1",
            header: "Home",
            content: "Content for Home tab",
            iconClass: "pi pi-home",
        },
        {
            key: "tab2",
            header: "All Active",
            content: "Content for All Active tab",
            iconClass: "pi pi-list",
        },
        {
            key: "tab3",
            header: "Achieved",
            content: "Content for Achieved tab",
            iconClass: "pi pi-check-circle",
        },
    ])
    const [activeIndex, setActiveIndex] = useState(0);

    document.title = "PMS - Dashboard"


    const [customers, setCustomers] = useState([]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const onSelectionChange = (e) => {
        setSelectedCustomers(e.value);
    };
    const onRowReorder = (e) => {
        setCustomers(e.value);
    };
    const exportCSV = () => {
        if (dt.current) {
            dt.current.exportCSV();
        }
    };
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(customers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
        XLSX.writeFile(workbook, "customers_data.xlsx");
    };
    const exportPdf = () => {
        const doc = new jsPDF();
        doc.text("Customer Data", 14, 10);
        doc.autoTable({
            head: [['ID', 'JobId', 'First Name', 'Status', 'Last Name', 'Job Title', 'Email', 'Phone', 'Company', 'Experience', 'JobStartDate', 'JobEndDate', 'JobLocation', 'WorkplaceType', 'JobType', 'Categories', 'Groups', 'ResumeAttachment', 'PrimarySkills', 'CreatedBy', 'EditDate', 'CreateDate']],
            body: customers.map(customer => [
                customer.id,
                customer.JobTitle,
                customer.Status,
                customer.HiringManager,
                customer.Lastname,
                customer.Email,
                customer.MobPhone,
                customer.Company,
                customer.Openings,
                customer.JobLocation,
                customer.WorkplaceType,
                customer.Categories,
                customer.JobType,
                customer.JobId,

                customer.Groups,
                customer.Department,
                customer.JobStartDate,
                customer.JobEndDate,
                customer.Seniority,
                customer.JobFunction,
                customer.ExperienceRequired,
                customer.MinSalary,
                customer.MaxSalary,

            ])
        });
        doc.save("customers_data.pdf");
    };

    {/* Side bar start */ }

    const [visibleRight, setVisibleRight] = useState(false);
    const [jobTitle, setJobTitle] = useState('');


    // Toggle dropdown open/close
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    const [hiringManager, setHiringManager] = useState(null);
    const [company, setCompany] = useState(null);
    const [jobLocation, setJobLocation] = useState(null);
    const [experience, setExperience] = useState("");



    // Example data for each field
    const hiringManagers = [
        { name: 'John', code: 'J1' },
        { name: 'Michael', code: 'M1' },
        { name: 'Sarah', code: 'S1' },
        { name: 'James', code: 'J2' },
    ];

    const companies = [
        { name: 'Tech Corp', code: 'TC' },
        { name: 'BizCorp', code: 'BC' },
        { name: 'Creative Solutions', code: 'CS' },
        { name: 'Innovative Tech', code: 'IT' },
    ];

    const jobLocations = [
        { name: 'New York', code: 'NY' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'San Francisco', code: 'SF' },
    ];


    const [jobStartDate, setJobStartDate] = useState(null);
    const [jobEndDate, setJobEndDate] = useState(null);


    //des

    const [skills, setSkills] = useState([]);
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [primartkey, setprimartkey] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);


    const handleAddSkill = () => {
        setIsAddingSkill(true);
    };

    const handleSkillChange = (e) => {
        const newSkills = e.value.filter((skill) => !skills.includes(skill));
        if (newSkills.length > 0) {
            setSkills((prevSkills) => [...prevSkills, ...newSkills]); // Add new skills
            setIsAddingSkill(false); // Hide the input field after a skill is added
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };


    {/* Side bar end */ }


    const handleJobStatusChange = (e) => {
        setSelectedJobs(e.value);
    };

    ////////////////////////
    const [deleteRowId, setDeleteRowID] = useState(null) // end date value

    const getallactivejobs = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Jobs}/api/v1/jobs/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                let results = response.data.results;
                setCustomers(results);
            }
        } catch (error) {

        }
    };


    const onSubmit = async (data) => {
        const formData = new FormData();
        const formattedFromDate = moment(jobStartDate).format("YYYY-MM-DD");
        const formattedtoDate = moment(jobEndDate).format("YYYY-MM-DD");
        const req = {
            job_title: data.jobtitle,
            company_id: Number(data.comapany),
            hiring_manager: Number(data.hirringmanager),
            required_experience: experience,
            job_posting_date: formattedFromDate,
            job_closing_date: formattedtoDate,
            location: getValues("Workplace"),
            required_skills: primartkey,
            job_description: text,

        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_Jobs}/api/v1/jobs/`, req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            getallactivejobs()
            setVisibleRight(false)
        } catch (error) {
            console.error("Error sending data to API:", error);
        }
    };

    const getCompanydata = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/company/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                let results = response.data.results;
                setcompamyitem(results);
            }
        } catch (error) {

        }
    };
    const getHirringmanager = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/contacts/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                let results = response.data.results;
                sethirringdata(results);
            }
        } catch (error) {

        }
    };

    const deleteHandler = async () => {
        let id = deleteRowId
        await axios
            .delete(`${process.env.REACT_APP_Jobs}/api/v1/jobs/${id}/`)
            .then((resp) => {
                setSmShow(false);
                getallactivejobs()
                setSuccessAlert(true)
            })
            .catch((error) => {

                console.log("on submit delete error ", error);
            });
    }

    useEffect(() => {
        getCompanydata()
        getHirringmanager()
        getallactivejobs()
    }, []);


    // jobs datatable

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_status: { value: null, matchMode: FilterMatchMode.EQUALS },
        openings: { value: null, matchMode: FilterMatchMode.EQUALS },
        hiring_manager: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_location: { value: null, matchMode: FilterMatchMode.CONTAINS },
        workplace_type: { value: null, matchMode: FilterMatchMode.EQUALS },
        job_type: { value: null, matchMode: FilterMatchMode.EQUALS },
        primary_skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
        experience_required: { value: null, matchMode: FilterMatchMode.EQUALS },
        min_salary: { value: null, matchMode: FilterMatchMode.EQUALS },
        max_salary: { value: null, matchMode: FilterMatchMode.EQUALS },
        department: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        job_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        job_hiring_goal: { value: null, matchMode: FilterMatchMode.EQUALS },
        job_function: { value: null, matchMode: FilterMatchMode.CONTAINS },
        seniority: { value: null, matchMode: FilterMatchMode.EQUALS },
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        group: { value: null, matchMode: FilterMatchMode.CONTAINS },
        create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        edit_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        created_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [jobsData, setJobsData] = useState([
        {
            job_id: 'Job-101',
            job_title: 'Software Developer',
            job_status: 'Open',
            openings: 5,
            hiring_manager: 'Rahul Sharma',
            company: 'TechMantra',
            job_location: 'Bangalore, India',
            workplace_type: 'Remote',
            job_type: 'Full-time',
            primary_skills: 'React, Node.js',
            experience_required: '3-5 years',
            min_salary: 60000,
            max_salary: 80000,
            department: 'Engineering',
            job_start_date: '01-01-2025',
            job_end_date: '31-12-2025',
            job_hiring_goal: 10,
            job_function: 'Development',
            seniority: 'Mid-level',
            category: 'IT',
            group: 'Tech Team',
            create_date: '15-12-2024',
            edit_date: '05-01-2025',
            created_by: 'Admin'
        },
        {
            job_id: 'Job-102',
            job_title: 'Data Analyst',
            job_status: 'Closed',
            openings: 2,
            hiring_manager: 'Priya Patel',
            company: 'DataWise',
            job_location: 'Hyderabad, India',
            workplace_type: 'On-site',
            job_type: 'Part-time',
            primary_skills: 'Python, SQL',
            experience_required: '2-4 years',
            min_salary: 50000,
            max_salary: 70000,
            department: 'Analytics',
            job_start_date: '01-02-2025',
            job_end_date: '31-08-2025',
            job_hiring_goal: 5,
            job_function: 'Analysis',
            seniority: 'Junior-level',
            category: 'Analytics',
            group: 'Business Insights',
            create_date: '20-11-2024',
            edit_date: '08-01-2025',
            created_by: 'Manager'
        },
        {
            job_id: 'Job-103',
            job_title: 'Project Manager',
            job_status: 'Open',
            openings: 3,
            hiring_manager: 'Arjun Singh',
            company: 'BuildTech',
            job_location: 'Pune, India',
            workplace_type: 'Hybrid',
            job_type: 'Contract',
            primary_skills: 'Agile, Scrum',
            experience_required: '5-7 years',
            min_salary: 75000,
            max_salary: 95000,
            department: 'Management',
            job_start_date: '01-03-2025',
            job_end_date: '28-02-2026',
            job_hiring_goal: 6,
            job_function: 'Management',
            seniority: 'Senior-level',
            category: 'Management',
            group: 'Operations',
            create_date: '10-10-2024',
            edit_date: '07-01-2025',
            created_by: 'Director'
        },
        {
            job_id: 'Job-104',
            job_title: 'Graphic Designer',
            job_status: 'Open',
            openings: 1,
            hiring_manager: 'Ananya Gupta',
            company: 'Creative Minds',
            job_location: 'Mumbai, India',
            workplace_type: 'Remote',
            job_type: 'Freelance',
            primary_skills: 'Photoshop, Illustrator',
            experience_required: '2-3 years',
            min_salary: 40000,
            max_salary: 60000,
            department: 'Design',
            job_start_date: '15-04-2025',
            job_end_date: '31-12-2025',
            job_hiring_goal: 2,
            job_function: 'Design',
            seniority: 'Junior-level',
            category: 'Creative',
            group: 'Design Team',
            create_date: '01-12-2024',
            edit_date: '02-01-2025',
            created_by: 'Creative Lead'
        },
        {
            job_id: 'Job-105',
            job_title: 'HR Specialist',
            job_status: 'On Hold',
            openings: 2,
            hiring_manager: 'Aditi Reddy',
            company: 'PeopleFirst India',
            job_location: 'Chennai, India',
            workplace_type: 'On-site',
            job_type: 'Full-time',
            primary_skills: 'Recruitment, Communication',
            experience_required: '3-6 years',
            min_salary: 55000,
            max_salary: 75000,
            department: 'Human Resources',
            job_start_date: '01-05-2025',
            job_end_date: '31-12-2025',
            job_hiring_goal: 4,
            job_function: 'HR',
            seniority: 'Mid-level',
            category: 'HR',
            group: 'Recruitment',
            create_date: '30-11-2024',
            edit_date: '09-01-2025',
            created_by: 'HR Manager'
        },
        {
            job_id: 'Job-106',
            job_title: 'Marketing Manager',
            job_status: 'Open',
            openings: 2,
            hiring_manager: 'Sanya Verma',
            company: 'MarketEdge',
            job_location: 'Delhi, India',
            workplace_type: 'Hybrid',
            job_type: 'Full-time',
            primary_skills: 'SEO, Digital Marketing',
            experience_required: '4-6 years',
            min_salary: 70000,
            max_salary: 90000,
            department: 'Marketing',
            job_start_date: '01-06-2025',
            job_end_date: '31-12-2025',
            job_hiring_goal: 3,
            job_function: 'Marketing',
            seniority: 'Mid-level',
            category: 'Marketing',
            group: 'Brand Strategy',
            create_date: '10-12-2024',
            edit_date: '08-01-2025',
            created_by: 'Marketing Head'
        },
        {
            job_id: 'Job-107',
            job_title: 'Cybersecurity Analyst',
            job_status: 'Open',
            openings: 3,
            hiring_manager: 'Vihaan Joshi',
            company: 'SecureTech India',
            job_location: 'Gurgaon, India',
            workplace_type: 'On-site',
            job_type: 'Contract',
            primary_skills: 'Network Security, Penetration Testing',
            experience_required: '3-5 years',
            min_salary: 80000,
            max_salary: 100000,
            department: 'IT Security',
            job_start_date: '15-03-2025',
            job_end_date: '30-09-2025',
            job_hiring_goal: 5,
            job_function: 'Security',
            seniority: 'Mid-level',
            category: 'IT Security',
            group: 'Cyber Defense',
            create_date: '20-12-2024',
            edit_date: '09-01-2025',
            created_by: 'Security Lead'
        },
        {
            job_id: 'Job-108',
            job_title: 'Content Writer',
            job_status: 'Closed',
            openings: 1,
            hiring_manager: 'Ishita Malhotra',
            company: 'ContentCraft',
            job_location: 'Remote',
            workplace_type: 'Remote',
            job_type: 'Part-time',
            primary_skills: 'Copywriting, Blogging',
            experience_required: '2-4 years',
            min_salary: 40000,
            max_salary: 55000,
            department: 'Content',
            job_start_date: '15-01-2025',
            job_end_date: '30-06-2025',
            job_hiring_goal: 2,
            job_function: 'Writing',
            seniority: 'Junior-level',
            category: 'Content',
            group: 'Editorial',
            create_date: '25-11-2024',
            edit_date: '07-01-2025',
            created_by: 'Editor-in-Chief'
        },
        {
            job_id: 'Job-109',
            job_title: 'UI/UX Designer',
            job_status: 'Open',
            openings: 2,
            hiring_manager: 'Kabir Kumar',
            company: 'DesignCraft',
            job_location: 'Noida, India',
            workplace_type: 'Hybrid',
            job_type: 'Full-time',
            primary_skills: 'Figma, Sketch, Prototyping',
            experience_required: '3-5 years',
            min_salary: 65000,
            max_salary: 85000,
            department: 'Design',
            job_start_date: '01-04-2025',
            job_end_date: '31-12-2025',
            job_hiring_goal: 3,
            job_function: 'Design',
            seniority: 'Mid-level',
            category: 'Creative',
            group: 'UI/UX Team',
            create_date: '05-12-2024',
            edit_date: '04-01-2025',
            created_by: 'Design Lead'
        },
        {
            job_id: 'Job-110',
            job_title: 'Operations Coordinator',
            job_status: 'On Hold',
            openings: 1,
            hiring_manager: 'Rohan Mehta',
            company: 'OpsManage India',
            job_location: 'Ahmedabad, India',
            workplace_type: 'On-site',
            job_type: 'Full-time',
            primary_skills: 'Organization, Communication',
            experience_required: '3-6 years',
            min_salary: 50000,
            max_salary: 70000,
            department: 'Operations',
            job_start_date: '01-05-2025',
            job_end_date: '30-11-2025',
            job_hiring_goal: 4,
            job_function: 'Coordination',
            seniority: 'Mid-level',
            category: 'Operations',
            group: 'Logistics',
            create_date: '01-12-2024',
            edit_date: '05-01-2025',
            created_by: 'Operations Head'
        },
        {
            job_id: 'Job-109',
            job_title: 'UI/UX Designer',
            job_status: 'Open',
            openings: 2,
            hiring_manager: 'Kabir Kumar',
            company: 'DesignCraft',
            job_location: 'Noida, India',
            workplace_type: 'Hybrid',
            job_type: 'Full-time',
            primary_skills: 'Figma, Sketch, Prototyping',
            experience_required: '3-5 years',
            min_salary: 65000,
            max_salary: 85000,
            department: 'Design',
            job_start_date: '01-04-2025',
            job_end_date: '31-12-2025',
            job_hiring_goal: 3,
            job_function: 'Design',
            seniority: 'Mid-level',
            category: 'Creative',
            group: 'UI/UX Team',
            create_date: '05-12-2024',
            edit_date: '04-01-2025',
            created_by: 'Design Lead'
        }
    ]);

    const [selectedJobsData, setSelectedJobsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState({ rows: 10, first: 0 });

    const onPage = (event) => {
        setPageState({ rows: event.rows, first: event.first });
    };

    const dt = useRef(null);
    const navigate = useNavigate();

    // clear search start

    const handleClearSearchJobs = () => {
        console.log("clicked");


        setFilters({
            job_number: { value: "" },
            job_title: { value: "" },
            status: { value: "" },
            openings: { value: "" },
            hiring_manager: { value: "" },
            company_id: { value: "" },
            location: { value: "" },
            workplace_types: { value: "" },
            job_type: { value: "" },
            required_skills: { value: "" },
            JobType: { value: "" },
            PrimarySkills: { value: "" },
            required_experience: { value: "" },
            salary_min: { value: "" },
            salary_max: { value: "" },
            department: { value: "" },
            job_start_date: { value: "" },
            job_end_date: { value: "" },
            hiring_goals: { value: "" },
            job_function: { value: "" },
            seniority: { value: "" },
            category: { value: "" },
            groups: { value: "" },
            created_at: { value: "" },
            updated_at: { value: "" },
            created_by: { value: "" },

        });

        // Reset the pagination
        // setPageState((prevState) => ({
        //     ...prevState,
        //     first: 0, 
        // }));
    };

    // clear search ends

    // context menu starts

    const [selectedJob, setSelectedJob] = useState(null); // State to track the right-clicked job

    const toast = useRef(null); // Reference for Toast notifications
    const cm = useRef(null); // Reference for ContextMenu

    // Context menu options
    const menuModel = [
        { label: 'View', icon: 'pi pi-fw pi-eye', command: () => setVisibleViewRight(true) },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => { navigate('/jobs-editform') } },
        { label: 'Archived', icon: 'pi pi-check-circle' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteJob(selectedJob) },
        {
            label: 'Schedule', icon: 'pi pi-calendar-clock',
            items: [ // Subitems for "Schedule"
                { label: 'Interview', icon: 'pi pi-calendar-plus', command: () => SetInterviewpop(true) },
                { label: 'Call', icon: 'pi pi-phone', command: () => SetInterviewpopCall(true) },
                { label: 'Meeting', icon: 'pi pi-users', command: () => SetInterviewpopMeeting(true) },
                { label: 'Task', icon: 'pi pi-list', command: () => SetInterviewpopTask(true) },
                { label: 'Event', icon: 'pi pi-calendar-clock', command: () => SetInterviewpopEvent(true) },
                { label: 'Other', icon: 'pi pi-ellipsis-h', command: () => SetInterviewpopOther(true) },
            ],
        },
        {
            label: 'More',
            icon: 'pi pi-ellipsis-h',
            items: [ // Subitems for "More"
                {
                    label: 'Link Candidates', icon: 'pi pi-link',
                    items: [ // Subitems for "More"
                        { label: 'Received', icon: 'pi pi-link' },
                        { label: 'Potential', icon: 'pi pi-sync' },
                        { label: 'Submitted', icon: 'pi pi-link' },
                    ],
                },
                { label: 'Match Candidates', icon: 'pi pi-sync' },
                { label: 'Change Status', icon: 'pi pi-link' },
                { label: 'Attachments', icon: 'pi pi-sync' },
            ],
        },
        { label: 'Job Notes', icon: 'pi pi-clipboard' },
        { label: 'Clear Search', icon: 'pi pi-filter-slash', command: handleClearSearchJobs },
    ];

    // Function to handle viewing a job
    const viewJob = (job) => {
        toast.current.show({ severity: 'info', summary: 'Job Selected', detail: job.job_title });
    };

    // Function to handle editing a job
    const editJob = (job) => {
        toast.current.show({ severity: 'success', summary: 'Edit Job', detail: `Editing ${job.job_title}` });
        // Add your edit logic here
    };

    // Function to handle deleting a job
    const deleteJob = (job) => {
        let _jobs = [...jobsData];
        _jobs = _jobs.filter((j) => j.job_id !== job.job_id);
        setJobsData(_jobs); // Update the jobs data state
        toast.current.show({ severity: 'error', summary: 'Job Deleted', detail: `Deleted ${job.job_title}` });
    };

    // view page starts

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

    const [visibleViewRight, setVisibleViewRight] = useState(false);
    const [documents, setDocuments] = useState([]);
    // view page ends

    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const actScheduleOptions = [
        {
            name: 'Interview',
            code: 'SCH-IN',
            icon: 'pi pi-user',
            action: () => SetInterviewpop(true),

        },
        {
            name: 'Call',
            code: 'SCH-CA',
            icon: 'pi pi-phone',
            action: () => SetInterviewpopCall(true),

        },
        {
            name: 'Meeting',
            code: 'SCH-ME',
            icon: 'pi pi-calendar',
            action: () => SetInterviewpopMeeting(true),
        },
        {
            name: 'Task',
            code: 'SCH-TA',
            icon: 'pi pi-check-square',
            action: () => SetInterviewpopTask(true),
        },
        {
            name: 'Event',
            code: 'SCH-EV',
            icon: 'pi pi-bell',
            action: () => SetInterviewpopEvent(true),
        },
        {
            name: 'Other',
            code: 'SCH-OT',
            icon: 'pi pi-ellipsis-h',
            action: () => SetInterviewpopOther(true),
        }
    ];
    const handleScheduleChange = (e) => {
        setSelectedSchedule(e.value);

        // Trigger the action if defined for the selected option
        if (e.value && e.value.action) {
            e.value.action(); // Execute the custom action
        }
    };
    const [selectedLinkJob, setSelectedLinkJob] = useState(null);
    const moreoptions = [
        {
            name: 'Link Candidates',
            jobs: [
                {
                    name: 'Received',
                    // onClick: () => { handleresend() }
                },
                {
                    name: 'Potential',
                    // onClick: () => { handleresend() }
                },
                { name: 'Submitted', onClick: () => { handleresend() } }
            ]
        },
        {
            name: 'Change Status'
        },
        {
            name: 'Attachments'
        },
        {
            name: 'Delete'
        }
    ];



    // interview popup starts
    const [interviewpop, SetInterviewpop] = useState(false)
    const [interviewpopCall, SetInterviewpopCall] = useState(false)
    const [interviewpopMeeting, SetInterviewpopMeeting] = useState(false)
    const [interviewpopTask, SetInterviewpopTask] = useState(false)
    const [interviewpopEvent, SetInterviewpopEvent] = useState(false)
    const [interviewpopOther, SetInterviewpopOther] = useState(false)



    const [intertype, setintertype] = useState("Interview")
    const [intertype1, setintertype1] = useState("Task")
    const [intertype2, setintertype2] = useState("Meeting")
    const [intertype3, setintertype3] = useState("Call")
    const [intertype4, setintertype4] = useState("Event")
    const [intertype5, setintertype5] = useState("Other")

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
        { name: 'Open', value: 'low' },
        { name: 'Closed', value: 'medium' },
        { name: 'On Hold', value: 'high' },
    ];

    const priorityValue = [
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


    // const [typeInterviewval, settypeInterviewval] = useState([])
    // const [typeInterviewcontact, settypeInterviewcontact] = useState([])
    const [typeInterviewcondi, settypeInterviewcondi] = useState([])
    const [subjectval, setsubjectval] = useState(null)
    const [popchecked2, setPopchecked2] = useState(false)
    const handlePopupCheckbox2 = e => {
        setPopchecked2(e.checked)
    }

    const typeInterviewcontact = [
        { name: 'Harish', value: 'Harish' },
        { name: 'Giri', value: 'Giri' },
        { name: 'Pavan', value: 'Pavan' },
    ]

    const typeInterviewval = [
        { name: 'Open', value: 'Open' },
        { name: 'Closed', value: '1 Day' },
        { name: 'On Hold', value: '2 Day' },
        // { name: '3 Days', value: '3 Day' },

    ]

    const [userid, setUserid] = useState([])
    const customChip = item => {
        return (
            <div>
                <span>{item} - (active)</span>
                <i className="pi pi-user-plus"></i>
            </div>
        )
    }
    const [popchecked, setPopchecked] = useState(false);
    const handlePopupCheckbox = e => {
        setPopchecked(e.checked)
    }
    // interview popup ends

    const [jobid, setJobid] = useState("Job-101");
    const [jobtitle, setJobtitle] = useState("Web Developer");
    const [expyears, setExpyears] = useState("3 Years");
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

    const [selectedPerson, setSelectedPerson] = useState(null);

    const personOptions = [
        { name: 'Mahesh Kumar Bhoga', role: 'UI/UX Manager', code: 'HR' },
        { name: 'Giri Jalagam', role: 'Hr Recruiter', code: 'MGR' },
        { name: 'Salmanuddin', role: 'Sales Manager', code: 'TL' },
        { name: 'Suresh Reddy', role: 'SEO Manager', code: 'CEO' },
        { name: 'Aman Kumar', role: 'AIML Lead', code: 'INT' }
    ];


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

    // input values ends

    return (
        <React.Fragment>
            <div className="page-content allact-tabs">
                <Container fluid={true}>
                    <div className="page-title-box actjobbread">

                        <Row className="align-items-center breadcrumb-card ac-items">
                            <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
                                <span className="addcan-ac">

                                    {selectedJobsData.length > 0 ?

                                        <span className="action-icons me-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary import-res-btn me-1 md:w-8rem"

                                            >
                                                <i className="pi pi-briefcase"></i> {selectedJobsData.length} Selected
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
                                                    <Link to="/jobs-editform" className="p-link">
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
                                                    <i class="pi pi-check-circle"></i>
                                                </button>
                                            </span>

                                        </span>


                                        :
                                        <button
                                            type="button"
                                            className="btn btn-secondary import-res-btn md:w-8rem me-1"
                                            onClick={() => { setVisibleRight(true); reset(); setprimartkey(""); setJobStartDate(""); setJobEndDate(""); setText("") }}

                                        >
                                            <i className="pi pi-briefcase me-1"></i> Add a Job
                                        </button>
                                    }

                                </span>



                                <span className="drop-ac">
                                    <SubmitJobtoCandidate />
                                    <CascadeSelect
                                        // value={selectedSchedule}
                                        // onChange={(e) => setSelectedSchedule(e.value)}
                                        // options={actScheduleOptions}
                                        onChange={handleScheduleChange}
                                        options={actScheduleOptions}
                                        optionLabel="name"
                                        optionGroupLabel="name"
                                        className="md:w-10rem me-1"
                                        optionGroupChildren={['subItems', 'subItems']}
                                        breakpoint="767px"
                                        placeholder="Schedule"
                                    />
                                    <LinkCandidates />
                                </span>
                            </Col>

                            <Col xxl={3} xl={12} lg={12} sm={12}>
                                <div className="clr-icons">
                                    {selectedJobsData.length > 0 ? <NotesJobs /> : <NotesJobs1 />}

                                    <ExportJobs />

                                    <button
                                        type="button"
                                        className="btn btn-secondary icons-btn" Tooltip="Clear Search" onClick={handleClearSearchJobs}
                                    >
                                        <i className="pi pi-sync"></i>
                                    </button>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12}>
                                {/* Toast for notifications */}
                                <Toast ref={toast} />

                                {/* ContextMenu for right-click actions */}
                                <ContextMenu model={menuModel} ref={cm} onHide={() => setSelectedJob(null)} />
                                <section className="allactjobs-table">
                                    <div className="card1 mt-4 mb-4 actjobsumtable">
                                        <DataTable
                                            ref={dt}
                                            value={jobsData}
                                            rows={pageState.rows}
                                            first={pageState.first}
                                            onPage={onPage}
                                            dataKey="job_id"
                                            loading={loading}
                                            scrollable
                                            emptyMessage="No records found."
                                            selection={selectedJobsData}
                                            onSelectionChange={(e) => setSelectedJobsData(e.value)}
                                            selectionMode="multiple"
                                            filters={filters}
                                            filterDisplay="row"
                                            reorderableRows
                                            resizableColumns
                                            reorderableColumns
                                            columnResizeMode="expand"
                                            onContextMenu={(e) => {
                                                cm.current.show(e.originalEvent); // Show the context menu
                                                setSelectedJob(e.data); // Set the selected job
                                            }}
                                            contextMenuSelection={selectedJob}
                                            onContextMenuSelectionChange={(e) => setSelectedJob(e.value)}
                                        >
                                            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                                            <Column field="job_id" header="Job ID" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="job_status" header="Job Status" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="openings" header="Openings" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="hiring_manager" header="Hiring Manager" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="company" header="Company" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="job_location" header="Location" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="workplace_type" header="Workplace Type" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="job_type" header="Job Type" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="primary_skills" header="Primary Skills" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="experience_required" header="Experience Required" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="min_salary" header="Min Salary" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="max_salary" header="Max Salary" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="department" header="Department" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="job_start_date" header="Start Date" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="job_end_date" header="End Date" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="job_hiring_goal" header="Hiring Goal" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="job_function" header="Function" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="seniority" header="Seniority" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="category" header="Category" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="group" header="Group" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="create_date" header="Create Date" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="edit_date" header="Edit Date" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="created_by" header="Created By" sortable filter style={{ minWidth: '10rem' }} />
                                        </DataTable>
                                    </div>
                                </section>
                            </Col>
                        </Row>

                        {/* Side bar start */}
                        <Row>
                            <Col lg={12}>

                                <Sidebar visible={visibleRight} position="right" className="sidebar" onHide={() => setVisibleRight(false)}>
                                    <div className="sidebar-header">

                                        <h3>Create a Job</h3>
                                        <div className="d-flex align-items-center">
                                            <Link to="/jobs-editform">
                                                <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
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
                                                        <input type="checkbox" className="me-2" checked />
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
                            </Col>
                        </Row>
                        {/* Side bar end */}
                    </div>
                </Container>
            </div>

            {/* view page starts */}
            <Row>
                <Col lg={12}>
                    <Sidebar visible={visibleViewRight} position="right" onHide={() => setVisibleViewRight(false)} className="view-form-sidebar">
                        <div className="sidebar-header">
                            <h3 className="head"><i className="pi pi-users"></i> Jobs Profile</h3>
                            <div className="d-flex align-items-center">
                                <Link to="/jobs-editform">
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
                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="jobId">Job ID</label>
                                                            <InputText
                                                                id="jobId"

                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="jobTitle">Job Title</label>
                                                            <InputText
                                                                id="jobTitle"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="company">Company</label>
                                                            <InputText
                                                                id="company"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>


                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="hiringManager">Hiring Manager</label>
                                                            <InputText
                                                                id="hiringManager"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="experience">Experience (Years)</label>
                                                            <InputNumber
                                                                id="experience"
                                                                placeholder=""
                                                                min={0}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>


                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="jobLocation">Job Location</label>
                                                            <InputText
                                                                id="jobLocation"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="workplaceType">Workplace Type</label>
                                                            <InputText
                                                                id="workplaceType"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="jobStartDate" className="block">Job Start Date</label>
                                                            <InputText
                                                                id="jobStartDate"
                                                                placeholder=""
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="jobEndDate" className="block">Job End Date</label>
                                                            <InputText
                                                                id="jobEndDate"
                                                                placeholder=""
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="primarySkills">Primary Skills</label>
                                                            <InputText
                                                                id="primarySkills"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="p-field">
                                                            <label htmlFor="jobType">Categories</label>
                                                            <InputText
                                                                id="categories"
                                                                placeholder=""
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="p-field">
                                                            <label htmlFor="jobType">Groups</label>
                                                            <InputText
                                                                id="groups"
                                                                placeholder=""
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="p-field">
                                                            <label htmlFor="jobType">UserIDs</label>
                                                            <InputText
                                                                id="userIds"
                                                                placeholder=""
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg={12}>

                                                        <div className="field">
                                                            <label htmlFor="description">Description</label>
                                                            <InputTextarea
                                                                id="description"
                                                                placeholder=""
                                                                rows={3}
                                                                cols={30}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="p-field" >
                                                            <label htmlFor="jobType" className="block">Notes</label>
                                                            <InputTextarea
                                                                autoResize
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
                                                                tableStyle={{ minWidth: '50rem' }}
                                                            >
                                                                <Column field="certificate_name" header="Document Type" ></Column>
                                                                <Column field="docSubject" header="Document Subject"></Column>
                                                                <Column field="created_at" header="Applied Date & Time"></Column>
                                                            </TreeTable>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </AccordionTab>

                                        </Accordion>
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
                                                                        <Column
                                                                            field="candidate"
                                                                            header="Candidate"
                                                                            sortable
                                                                            filter
                                                                            style={{ minWidth: "10rem" }}
                                                                        />
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
                                                                        <Column
                                                                            field="candidate"
                                                                            header="Candidate"
                                                                            sortable
                                                                            filter
                                                                            style={{ minWidth: "10rem" }}
                                                                        />
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
                                                                        <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} />
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
                                                                        <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} />
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
                                                                        <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} />
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
                                                                        <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} />
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
                                                                        <Column field="candidate" header="Candidate" sortable filter style={{ minWidth: "10rem" }} />
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

            {/* view page ends */}

            {/* Interview schedule start */}
            <Dialog
                header="APPOINTMENT - ANUP GOGOI"
                visible={interviewpop}
                className="interview-popup"
                style={{ width: '50vw' }}
                // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
                onHide={() => { SetInterviewpop(false); }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText disabled value={intertype}
                                            onChange={(e) => setintertype(e.target.value)} />
                                        {/* <Dropdown 
                                                                // disabled
                                                                value={intertype}
                                                                onChange={(e) => setintertype(e.target.value)}
                                                                options={interviewdroptype}
                                                                className="w-full search-option" /> */}
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            htmlFor="integer"
                                            className=" block"
                                        >
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={(e) => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"

                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={(e) => setStartdate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={(e) => setStarttime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={(e) => setenddate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>

                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={(e) => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="flex flex-column">
                                        <label For="Priority">Job Status</label>
                                        <Dropdown
                                            value={subtypeget}
                                            onChange={e => setsubtypeget(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"
                                            placeholder="Select a Status"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            For="Priority"
                                            className=" block"
                                        >
                                            Contact
                                        </label>

                                        <Dropdown
                                            value={prioritycontact}
                                            onChange={(e) => setprioritycontact(e.value)}
                                            options={typeInterviewcontact}
                                            optionLabel="name"
                                            placeholder="Contact"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => { condidatelist(e) }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Select Candidates`}
                                            maxSelectedLabels={0}
                                            className="w-full" />
                                        {/* <Dropdown
                                                                value={condidatevalu}
                                                                onChange={e => setcondidatevalu(e.value)}
                                                                options={typeInterviewcondi}
                                                                optionLabel="name"
                                                                placeholder="Select a Status"
                                                                className="w-full search-option"
                                        
                                                              /> */}
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText placeholder="Subject" value={subjectval} onChange={e => setsubjectval(e.target.value)} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={(e) => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        <div>

                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label
                                                    For="Priority"
                                                    className=" block"
                                                >
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>

                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Completed</label>

                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Private</label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips value={userid} onChange={(e) => setUserid(e.value)} itemTemplate={customChip} className="w-full" />
                                </Col>
                            </Row>
                        </div>


                        <Row className="mt-2">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main">
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>

                    </p>
                </form>
            </Dialog>
            {/* Interview schedule end */}


            {/* Interview schedule call start */}
            <Dialog
                header="APPOINTMENT - ANUP GOGOI"
                visible={interviewpopCall}
                className="interview-popup"
                style={{ width: '50vw' }}
                // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
                onHide={() => { SetInterviewpopCall(false); }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText disabled value={intertype3}
                                            onChange={(e) => setintertype1(e.target.value)} />
                                        {/* <Dropdown 
                                                                // disabled
                                                                value={intertype}
                                                                onChange={(e) => setintertype(e.target.value)}
                                                                options={interviewdroptype}
                                                                className="w-full search-option" /> */}
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            htmlFor="integer"
                                            className=" block"
                                        >
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={(e) => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"

                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={(e) => setStartdate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={(e) => setStarttime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={(e) => setenddate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>

                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={(e) => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="flex flex-column">
                                        <label For="Priority">Job Status</label>
                                        <Dropdown
                                            value={subtypeget}
                                            onChange={e => setsubtypeget(e.value)}
                                            options={typeInterviewval}
                                            optionLabel="name"
                                            placeholder="Select a Status"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            For="Priority"
                                            className=" block"
                                        >
                                            Contact
                                        </label>

                                        <Dropdown
                                            value={prioritycontact}
                                            onChange={(e) => setprioritycontact(e.value)}
                                            options={typeInterviewcontact}
                                            optionLabel="name"
                                            placeholder="Contact"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => { condidatelist(e) }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Select Candidates`}
                                            maxSelectedLabels={0}
                                            className="w-full" />
                                        {/* <Dropdown
                                                                value={condidatevalu}
                                                                onChange={e => setcondidatevalu(e.value)}
                                                                options={typeInterviewcondi}
                                                                optionLabel="name"
                                                                placeholder="Select a Status"
                                                                className="w-full search-option"
                                        
                                                              /> */}
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText placeholder="Subject" value={subjectval} onChange={e => setsubjectval(e.target.value)} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={(e) => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        <div>
                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label
                                                    For="Priority"
                                                    className=" block"
                                                >
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>

                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Completed</label>

                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Private</label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips value={userid} onChange={(e) => setUserid(e.value)} itemTemplate={customChip} className="w-full" />
                                </Col>
                            </Row>
                        </div>


                        <Row className="">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main">
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>

                    </p>
                </form>
            </Dialog>
            {/* Interview schedule call end */}

            {/* Interview schedule meeting start */}
            <Dialog
                header="APPOINTMENT - ANUP GOGOI"
                visible={interviewpopMeeting}
                className="interview-popup"
                style={{ width: '50vw' }}
                // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
                onHide={() => { SetInterviewpopMeeting(false); }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText disabled value={intertype2}
                                            onChange={(e) => setintertype(e.target.value)} />
                                        {/* <Dropdown 
                                                                // disabled
                                                                value={intertype}
                                                                onChange={(e) => setintertype(e.target.value)}
                                                                options={interviewdroptype}
                                                                className="w-full search-option" /> */}
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            htmlFor="integer"
                                            className=" block"
                                        >
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={(e) => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"

                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={(e) => setStartdate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={(e) => setStarttime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={(e) => setenddate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>

                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={(e) => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="flex flex-column">
                                        <label For="Priority">Job</label>
                                        <Dropdown
                                            value={subtypeget}
                                            onChange={e => setsubtypeget(e.value)}
                                            options={typeInterviewval}
                                            optionLabel="name"
                                            placeholder="Select a Status"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            For="Priority"
                                            className=" block"
                                        >
                                            Contact
                                        </label>

                                        <Dropdown
                                            value={prioritycontact}
                                            onChange={(e) => setprioritycontact(e.value)}
                                            options={typeInterviewcontact}
                                            optionLabel="name"
                                            placeholder="Contact"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => { condidatelist(e) }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Select Candidates`}
                                            maxSelectedLabels={0}
                                            className="w-full" />
                                        {/* <Dropdown
                                                                value={condidatevalu}
                                                                onChange={e => setcondidatevalu(e.value)}
                                                                options={typeInterviewcondi}
                                                                optionLabel="name"
                                                                placeholder="Select a Status"
                                                                className="w-full search-option"
                                        
                                                              /> */}
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText placeholder="Subject" value={subjectval} onChange={e => setsubjectval(e.target.value)} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={(e) => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        <div>
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field">
                                        <label htmlFor="username">Auto Followup</label>
                                        <Dropdown
                                            value={followup}
                                            onChange={(e) => setFollowup(e.value)}
                                            options={followupOptions}
                                            optionLabel="name"
                                            placeholder="Select a Followup Interval"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label htmlFor="username">Repeat</label>
                                                <Dropdown
                                                    value={repeat}
                                                    onChange={(e) => setRepeat(e.value)}
                                                    options={repeatOptions}
                                                    optionLabel="name"
                                                    placeholder="Select a Repeat Option"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label htmlFor="username">Reminder</label>
                                                <Dropdown
                                                    value={reminder}
                                                    onChange={(e) => setReminder(e.value)}
                                                    options={reminderOptions}
                                                    optionLabel="name"
                                                    placeholder="Select a Reminder"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label
                                                    For="Priority"
                                                    className=" block"
                                                >
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>

                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Completed</label>

                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Private</label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips value={userid} onChange={(e) => setUserid(e.value)} itemTemplate={customChip} className="w-full" />
                                </Col>
                            </Row>
                        </div>


                        <Row className="">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main">
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>

                    </p>
                </form>
            </Dialog>
            {/* Interview schedule meeting end */}


            {/* Interview schedule Task start */}
            <Dialog
                header="APPOINTMENT - ANUP GOGOI"
                visible={interviewpopTask}
                className="interview-popup"
                style={{ width: '50vw' }}
                // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
                onHide={() => { SetInterviewpopTask(false); }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText disabled value={intertype1}
                                            onChange={(e) => setintertype1(e.target.value)} />
                                        {/* <Dropdown 
                                                                // disabled
                                                                value={intertype}
                                                                onChange={(e) => setintertype(e.target.value)}
                                                                options={interviewdroptype}
                                                                className="w-full search-option" /> */}
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            htmlFor="integer"
                                            className=" block"
                                        >
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={(e) => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"

                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={(e) => setStartdate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={(e) => setStarttime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={(e) => setenddate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>

                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={(e) => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="flex flex-column">
                                        <label For="Priority">Job</label>
                                        <Dropdown
                                            value={subtypeget}
                                            onChange={e => setsubtypeget(e.value)}
                                            options={typeInterviewval}
                                            optionLabel="name"
                                            placeholder="Select a Status"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            For="Priority"
                                            className=" block"
                                        >
                                            Contact
                                        </label>

                                        <Dropdown
                                            value={prioritycontact}
                                            onChange={(e) => setprioritycontact(e.value)}
                                            options={typeInterviewcontact}
                                            optionLabel="name"
                                            placeholder="Contact"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => { condidatelist(e) }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Select Candidates`}
                                            maxSelectedLabels={0}
                                            className="w-full" />
                                        {/* <Dropdown
                                                                value={condidatevalu}
                                                                onChange={e => setcondidatevalu(e.value)}
                                                                options={typeInterviewcondi}
                                                                optionLabel="name"
                                                                placeholder="Select a Status"
                                                                className="w-full search-option"
                                        
                                                              /> */}
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText placeholder="Subject" value={subjectval} onChange={e => setsubjectval(e.target.value)} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={(e) => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        <div>
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field">
                                        <label htmlFor="username">Auto Followup</label>
                                        <Dropdown
                                            value={followup}
                                            onChange={(e) => setFollowup(e.value)}
                                            options={followupOptions}
                                            optionLabel="name"
                                            placeholder="Select a Followup Interval"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label htmlFor="username">Repeat</label>
                                                <Dropdown
                                                    value={repeat}
                                                    onChange={(e) => setRepeat(e.value)}
                                                    options={repeatOptions}
                                                    optionLabel="name"
                                                    placeholder="Select a Repeat Option"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label htmlFor="username">Reminder</label>
                                                <Dropdown
                                                    value={reminder}
                                                    onChange={(e) => setReminder(e.value)}
                                                    options={reminderOptions}
                                                    optionLabel="name"
                                                    placeholder="Select a Reminder"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label
                                                    For="Priority"
                                                    className=" block"
                                                >
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>

                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Completed</label>

                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Private</label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips value={userid} onChange={(e) => setUserid(e.value)} itemTemplate={customChip} className="w-full" />
                                </Col>
                            </Row>
                        </div>


                        <Row className="">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main">
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>

                    </p>
                </form>
            </Dialog>
            {/* Interview schedule Task end */}


            {/* Interview schedule Event start */}
            <Dialog
                header="APPOINTMENT - ANUP GOGOI"
                visible={interviewpopEvent}
                className="interview-popup"
                style={{ width: '50vw' }}
                // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
                onHide={() => { SetInterviewpopEvent(false); }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText disabled value={intertype4}
                                            onChange={(e) => setintertype1(e.target.value)} />
                                        {/* <Dropdown 
                                                                // disabled
                                                                value={intertype}
                                                                onChange={(e) => setintertype(e.target.value)}
                                                                options={interviewdroptype}
                                                                className="w-full search-option" /> */}
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            htmlFor="integer"
                                            className=" block"
                                        >
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={(e) => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"

                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={(e) => setStartdate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={(e) => setStarttime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={(e) => setenddate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>

                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={(e) => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="flex flex-column">
                                        <label For="Priority">Job</label>
                                        <Dropdown
                                            value={subtypeget}
                                            onChange={e => setsubtypeget(e.value)}
                                            options={typeInterviewval}
                                            optionLabel="name"
                                            placeholder="Select a Status"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            For="Priority"
                                            className=" block"
                                        >
                                            Contact
                                        </label>

                                        <Dropdown
                                            value={prioritycontact}
                                            onChange={(e) => setprioritycontact(e.value)}
                                            options={typeInterviewcontact}
                                            optionLabel="name"
                                            placeholder="Contact"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => { condidatelist(e) }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Select Candidates`}
                                            maxSelectedLabels={0}
                                            className="w-full" />
                                        {/* <Dropdown
                                                                value={condidatevalu}
                                                                onChange={e => setcondidatevalu(e.value)}
                                                                options={typeInterviewcondi}
                                                                optionLabel="name"
                                                                placeholder="Select a Status"
                                                                className="w-full search-option"
                                        
                                                              /> */}
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText placeholder="Subject" value={subjectval} onChange={e => setsubjectval(e.target.value)} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={(e) => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        <div>
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field">
                                        <label htmlFor="username">Auto Followup</label>
                                        <Dropdown
                                            value={followup}
                                            onChange={(e) => setFollowup(e.value)}
                                            options={followupOptions}
                                            optionLabel="name"
                                            placeholder="Select a Followup Interval"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label htmlFor="username">Repeat</label>
                                                <Dropdown
                                                    value={repeat}
                                                    onChange={(e) => setRepeat(e.value)}
                                                    options={repeatOptions}
                                                    optionLabel="name"
                                                    placeholder="Select a Repeat Option"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label htmlFor="username">Reminder</label>
                                                <Dropdown
                                                    value={reminder}
                                                    onChange={(e) => setReminder(e.value)}
                                                    options={reminderOptions}
                                                    optionLabel="name"
                                                    placeholder="Select a Reminder"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label
                                                    For="Priority"
                                                    className=" block"
                                                >
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>

                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Completed</label>

                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Private</label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips value={userid} onChange={(e) => setUserid(e.value)} itemTemplate={customChip} className="w-full" />
                                </Col>
                            </Row>
                        </div>


                        <Row className="">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main">
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>

                    </p>
                </form>
            </Dialog>
            {/* Interview schedule Event end */}


            {/* Interview schedule other start */}
            <Dialog
                header="APPOINTMENT - ANUP GOGOI"
                visible={interviewpopOther}
                className="interview-popup"
                style={{ width: '50vw' }}
                // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
                onHide={() => { SetInterviewpopOther(false); }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText disabled value={intertype5}
                                            onChange={(e) => setintertype1(e.target.value)} />
                                        {/* <Dropdown 
                                                                // disabled
                                                                value={intertype}
                                                                onChange={(e) => setintertype(e.target.value)}
                                                                options={interviewdroptype}
                                                                className="w-full search-option" /> */}
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            htmlFor="integer"
                                            className=" block"
                                        >
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={(e) => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"

                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={(e) => setStartdate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={(e) => setStarttime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={(e) => setenddate(e.value)}
                                                    showIcon
                                                />
                                            </div>
                                        </Col>


                                        <Col xl={6}>

                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={(e) => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="flex flex-column">
                                        <label For="Priority">Job</label>
                                        <Dropdown
                                            value={subtypeget}
                                            onChange={e => setsubtypeget(e.value)}
                                            options={typeInterviewval}
                                            optionLabel="name"
                                            placeholder="Select a Status"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label
                                            For="Priority"
                                            className=" block"
                                        >
                                            Contact
                                        </label>

                                        <Dropdown
                                            value={prioritycontact}
                                            onChange={(e) => setprioritycontact(e.value)}
                                            options={typeInterviewcontact}
                                            optionLabel="name"
                                            placeholder="Contact"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => { condidatelist(e) }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Select Candidates`}
                                            maxSelectedLabels={0}
                                            className="w-full" />
                                        {/* <Dropdown
                                                                value={condidatevalu}
                                                                onChange={e => setcondidatevalu(e.value)}
                                                                options={typeInterviewcondi}
                                                                optionLabel="name"
                                                                placeholder="Select a Status"
                                                                className="w-full search-option"
                                        
                                                              /> */}
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText placeholder="Subject" value={subjectval} onChange={e => setsubjectval(e.target.value)} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={(e) => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        <div>
                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label
                                                    For="Priority"
                                                    className=" block"
                                                >
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>

                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Completed</label>

                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">Private</label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips value={userid} onChange={(e) => setUserid(e.value)} itemTemplate={customChip} className="w-full" />
                                </Col>
                            </Row>
                        </div>


                        <Row className="">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main">
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>

                    </p>
                </form>
            </Dialog>
            {/* Interview schedule other end */}

        </React.Fragment>

    );
};
export default JobAllActive;
