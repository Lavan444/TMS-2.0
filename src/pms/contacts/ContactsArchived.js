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
import { Chips } from "primereact/chips";
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from 'primereact/selectbutton';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { MultiSelect } from 'primereact/multiselect';
import 'jspdf-autotable';
import { Plus, Mail, MessageSquare, Filter, Download, Search } from 'lucide-react';
import { Dialog } from 'primereact/dialog';
import Modal from "react-bootstrap/Modal";
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { FileUpload } from 'primereact/fileupload';
import { IconName } from 'lucide-react';
import autoTable from 'jspdf-autotable';
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import axios from "axios"
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { TreeSelect } from 'primereact/treeselect';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Badge } from 'primereact/badge';
import { TreeTable } from 'primereact/treetable';
import { Card } from 'primereact/card';
import { Editor } from "primereact/editor";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';

import NotesContact from '../common-for-all/NotesContact'
import NotesContact1 from '../common-for-all/NotesContactNames'
import EmailContacts from "./EmailContacts";
import MoreACcontacts from "./MoreACcontacts";
import SubmitContacttoCandidate from "./SubmitContacttoCandidate";
import AddJob from "./AddJob";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ContextMenu } from "primereact/contextmenu";
import Export from '../..//features/projects/components/Export';;;;
const ContactsArchived = () => {

    // action items

    // email
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

    const smsOptions = [
        { label: "Selected", icon: "pi pi-check-circle" },
        { label: "Searched", icon: "pi pi-search" },
        { label: "All", icon: "pi pi-inbox" },
    ];


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

    const options = [
        { label: "Link Jobs", icon: "pi pi-link" },
        { label: "Delete", icon: "pi pi-trash" },
    ];


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
        // {
        //   label: "Upload",
        //   icon: "pi pi-upload",
        //   command: () => {
        //     navigate("/fileupload") // Use navigate for internal routing
        //   },
        // },
        // {
        //   label: "React Website",
        //   icon: "pi pi-external-link",
        //   command: () => {
        //     window.location.href = "https://react.dev/" // External link remains unchanged
        //   },
        // },
    ]
    const [activeTab, setActiveTab] = useState("1")
    const [activeTab1, setActiveTab1] = useState("5")
    const [activeTab2, setActiveTab2] = useState("9")
    const [activeTab3, setActiveTab3] = useState("13")
    const [verticalActiveTab, setVerticalActiveTab] = useState("1")
    const [customActiveTab, setCustomActiveTab] = useState("1")
    const [activeTabJustify, setActiveTabJustify] = useState("1")
    const [collapseStates, setCollapseStates] = useState({
        col1: true,
        col2: false,
        col3: false,
        col5: true,
        col6: true,
        col7: true,
        col8: true,
        col9: true,
        col10: false,
        col11: false,
    })

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
    const [activeIndex, setActiveIndex] = useState(0)
    const [dropdown1Open, setDropdown1Open] = useState(false)
    const [emailOption, setEmailOption] = useState("Email")
    const [dropdown2Open, setDropdown2Open] = useState(false)
    const [smsOption, setSmsOption] = useState("SMS")
    const [dropdown3Open, setDropdown3Open] = useState(false)
    const [moreOption, setmoreOption] = useState("More...")
    const [dropdown4Open, setDropdown4Open] = useState(false)
    const handlemoreSelect = option => setmoreOption(option)

    const toggle = (tabSetter, tab, currentTab) => {
        if (currentTab !== tab) {
            tabSetter(tab)
        }
    }

    const toggleCollapse = col => {
        setCollapseStates(prev => ({
            ...prev,
            [col]: !prev[col],
        }))
    }

    const handleGroupCollapse = col => {
        setCollapseStates(prev => ({
            ...prev,
            col1: col === "col1" ? !prev.col1 : false,
            col2: col === "col2" ? !prev.col2 : false,
            col3: col === "col3" ? !prev.col3 : false,
        }))
    }

    const onTabClose = index => {
        const updatedTabs = tabs.filter((_, i) => i !== index)
        setTabs(updatedTabs)

        if (activeIndex === index) {
            setActiveIndex(prev => Math.max(0, prev - 1))
        } else if (activeIndex > index) {
            setActiveIndex(prev => prev - 1)
        }
    }

    document.title = "PMS - Dashboard"


    const [customers, setCustomers] = useState([]);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [balanceFrozen, setBalanceFrozen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [size, setSize] = useState('normal');
    const sampleData = [
        {
            "FirstName": "Rahul",
            "LastName": "Sharma",
            "Company": "Tech Solutions India Pvt. Ltd.",
            "JobTitle": "Software Engineer",
            "email": "rahul.sharma@example.com",
            "phone": "+91-98765-43210",
            "AssociatedContacts": "priya.patel@example.com, vikram.singh@example.com",
            "Department": "Engineering",
            "Address": "123 MG Road, Bangalore, Karnataka, India",
            "Notes": "Met at the annual tech conference. Interested in cloud computing solutions.",
            "Categories": ["Client", "High Priority"],
            "Group": "Software Clients",
            "UserId": "user123",
            "CreatedBy": "admin",
            "LastActivityType": "Email",
            "LastActivityDate": "01-12-2024 10:15 AM",
            "CreateDate": "15-01-2024 02:30 PM",
            "EditDate": "25-11-2024 09:45 AM"
        },
        {
            "FirstName": "Priya",
            "LastName": "Patel",
            "Company": "Marketing Gurus India",
            "JobTitle": "Marketing Manager",
            "email": "priya.patel@example.com",
            "phone": "+91-98765-12345",
            "AssociatedContacts": "rahul.sharma@example.com",
            "Department": "Marketing",
            "Address": "456 Nehru Road, Mumbai, Maharashtra, India",
            "Notes": "Requested additional resources for campaign planning.",
            "Categories": ["Prospect", "Follow-Up"],
            "Group": "Marketing Leads",
            "UserId": "user456",
            "CreatedBy": "user123",
            "LastActivityType": "Call",
            "LastActivityDate": "03-12-2024 02:20 PM",
            "CreateDate": "10-02-2024 11:00 AM",
            "EditDate": "01-12-2024 04:30 PM"
        },
        {
            "FirstName": "Vikram",
            "LastName": "Singh",
            "Company": "Financial Wizards India Ltd.",
            "JobTitle": "Accountant",
            "email": "vikram.singh@example.com",
            "phone": "+91-98765-54321",
            "AssociatedContacts": "rahul.sharma@example.com, priya.patel@example.com",
            "Department": "Finance",
            "Address": "789 Gandhi Nagar, Delhi, India",
            "Notes": "Discussed tax optimization strategies.",
            "Categories": ["Consultant"],
            "Group": "Finance Partners",
            "UserId": "user789",
            "CreatedBy": "admin",
            "LastActivityType": "Meeting",
            "LastActivityDate": "20-11-2024 03:00 PM",
            "CreateDate": "22-03-2024 10:00 AM",
            "EditDate": "25-11-2024 09:00 AM"
        },
        {
            "FirstName": "Anjali",
            "LastName": "Gupta",
            "Company": "Creative Studios India",
            "JobTitle": "Graphic Designer",
            "email": "anjali.gupta@example.com",
            "phone": "+91-98765-67890",
            "AssociatedContacts": "vikram.singh@example.com",
            "Department": "Design",
            "Address": "101 Indira Road, Pune, Maharashtra, India",
            "Notes": "Requested feedback on new design prototypes.",
            "Categories": ["Freelancer"],
            "Group": "Design Network",
            "UserId": "user321",
            "CreatedBy": "user789",
            "LastActivityType": "Feedback",
            "LastActivityDate": "30-11-2024 01:00 PM",
            "CreateDate": "12-04-2024 09:15 AM",
            "EditDate": "01-12-2024 02:30 PM"
        },
        {
            "FirstName": "Rohan",
            "LastName": "Kapoor",
            "Company": "Green Planet India",
            "JobTitle": "Sustainability Advisor",
            "email": "rohan.kapoor@example.com",
            "phone": "+91-98765-09876",
            "AssociatedContacts": "anjali.gupta@example.com, vikram.singh@example.com",
            "Department": "Environment",
            "Address": "202 Eco Road, Hyderabad, Telangana, India",
            "Notes": "Interested in eco-friendly business practices.",
            "Categories": ["Partner", "Eco-Friendly"],
            "Group": "Sustainability Advisors",
            "UserId": "user567",
            "CreatedBy": "admin",
            "LastActivityType": "Workshop",
            "LastActivityDate": "02-12-2024 04:30 PM",
            "CreateDate": "01-05-2024 12:00 PM",
            "EditDate": "04-12-2024 10:45 AM"
        },
        {
            "FirstName": "Neha",
            "LastName": "Verma",
            "Company": "Logistics Experts India",
            "JobTitle": "Operations Manager",
            "email": "neha.verma@example.com",
            "phone": "+91-98765-11223",
            "AssociatedContacts": "rohan.kapoor@example.com, anjali.gupta@example.com",
            "Department": "Operations",
            "Address": "303 Transport Nagar, Chennai, Tamil Nadu, India",
            "Notes": "Planning for supply chain optimization.",
            "Categories": ["Client"],
            "Group": "Operations Clients",
            "UserId": "user890",
            "CreatedBy": "user567",
            "LastActivityType": "Call",
            "LastActivityDate": "05-12-2024 11:00 AM",
            "CreateDate": "15-06-2024 08:45 AM",
            "EditDate": "05-12-2024 05:20 PM"
        },
        {
            "FirstName": "Sneha",
            "LastName": "Reddy",
            "Company": "HealthCare Plus India",
            "JobTitle": "Medical Consultant",
            "email": "sneha.reddy@example.com",
            "phone": "+91-98765-22334",
            "AssociatedContacts": "neha.verma@example.com, rohan.kapoor@example.com",
            "Department": "Consulting",
            "Address": "404 Wellness Street, Kolkata, West Bengal, India",
            "Notes": "Discussed potential partnership for employee wellness programs.",
            "Categories": ["Partner"],
            "Group": "Healthcare Associates",
            "UserId": "user101",
            "CreatedBy": "user890",
            "LastActivityType": "Email",
            "LastActivityDate": "05-12-2024 03:30 PM",
            "CreateDate": "10-07-2024 11:20 AM",
            "EditDate": "05-12-2024 07:00 PM"
        },
        {
            "FirstName": "Arjun",
            "LastName": "Mehta",
            "Company": "EduTech Innovations India",
            "JobTitle": "Product Manager",
            "email": "arjun.mehta@example.com",
            "phone": "+91-98765-33445",
            "AssociatedContacts": "sneha.reddy@example.com",
            "Department": "Product Development",
            "Address": "505 Education Lane, Ahmedabad, Gujarat, India",
            "Notes": "Inquired about integration with learning management systems.",
            "Categories": ["Prospect"],
            "Group": "Education Leads",
            "UserId": "user234",
            "CreatedBy": "admin",
            "LastActivityType": "Demo",
            "LastActivityDate": "04-12-2024 02:00 PM",
            "CreateDate": "20-08-2024 10:00 AM",
            "EditDate": "05-12-2024 10:15 AM"
        },
        {
            "FirstName": "Kavita",
            "LastName": "Joshi",
            "Company": "Urban Developers India Ltd.",
            "JobTitle": "Architect",
            "email": "kavita.joshi@example.com",
            "phone": "+91-98765-44556",
            "AssociatedContacts": "arjun.mehta@example.com, sneha.reddy@example.com",
            "Department": "Design",
            "Address": "606 Architect Road, Jaipur, Rajasthan, India",
            "Notes": "Shared design blueprints for the upcoming project.",
            "Categories": ["Client", "High Priority"],
            "Group": "Architectural Clients",
            "UserId": "user345",
            "CreatedBy": "user101",
            "LastActivityType": "Meeting",
            "LastActivityDate": "02-12-2024 04:45 PM",
            "CreateDate": "15-09-2024 01:30 PM",
            "EditDate": "03-12-2024 02:15 PM"
        },
        {
            "FirstName": "Rajesh",
            "LastName": "Khanna",
            "Company": "Legal Alliance India LLP",
            "JobTitle": "Attorney",
            "email": "rajesh.khanna@example.com",
            "phone": "+91-98765-55667",
            "AssociatedContacts": "kavita.joshi@example.com",
            "Department": "Legal",
            "Address": "707 Justice Street, Lucknow, Uttar Pradesh, India",
            "Notes": "Provided legal advice on contract drafting.",
            "Categories": ["Consultant"],
            "Group": "Legal Partners",
            "UserId": "user456",
            "CreatedBy": "admin",
            "LastActivityType": "Call",
            "LastActivityDate": "29-11-2024 12:00 PM",
            "CreateDate": "05-10-2024 09:45 AM",
            "EditDate": "01-12-2024 05:30 PM"
        },
        {
            "FirstName": "Ananya",
            "LastName": "Desai",
            "Company": "Global Solutions India Ltd.",
            "JobTitle": "HR Specialist",
            "email": "ananya.desai@example.com",
            "phone": "+91-98765-66778",
            "AssociatedContacts": "rajesh.khanna@example.com, kavita.joshi@example.com",
            "Department": "Human Resources",
            "Address": "808 HR Avenue, Kochi, Kerala, India",
            "Notes": "Exploring training solutions for staff.",
            "Categories": ["Client", "HR"],
            "Group": "Corporate Clients",
            "UserId": "user567",
            "CreatedBy": "user345",
            "LastActivityType": "Email",
            "LastActivityDate": "03-12-2024 10:45 AM",
            "CreateDate": "01-11-2024 10:15 AM",
            "EditDate": "04-12-2024 09:00 AM"
        },
        {
            "FirstName": "Aarav",
            "LastName": "Thomas",
            "Company": "Retail Masters India",
            "JobTitle": "Sales Manager",
            "email": "aarav.thomas@example.com",
            "phone": "+91-98765-77889",
            "AssociatedContacts": "ananya.desai@example.com, rajesh.khanna@example.com",
            "Department": "Sales",
            "Address": "909 Market Road, Surat, Gujarat, India",
            "Notes": "Discussed bulk product pricing options.",
            "Categories": ["Prospect", "Retail"],
            "Group": "Retail Leads",
            "UserId": "user678",
            "CreatedBy": "user567",
            "LastActivityType": "Meeting",
            "LastActivityDate": "06-12-2024 11:00 AM",
            "CreateDate": "15-11-2024 08:30 AM",
            "EditDate": "06-12-2024 09:15 AM"
        }
    ];
    // useEffect(() => {
    //     setCustomers(sampleData);
    // }, []);
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
    const onPage = (e) => {
        setPageState({
            first: e.first,
            rows: e.rows
        });
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
            head: [['ID', 'FirstName', 'LastName', 'Company', 'Job Title', 'email', 'Phone', 'AssociatedContacts', 'Address', 'Notes', 'Categories', 'Groups', 'UserId', 'CreatedBy', 'LastActivityType', 'LastActivityDate', 'EditDate', 'CreateDate']],
            body: customers.map(customer => [
                customer.id,
                customer.FirstName,
                customer.LastName,
                customer.Company,
                customer.JobTitle,
                customer.email,
                customer.phone,
                customer.AssociatedContacts,
                customer.Department,
                customer.Address,
                customer.Notes,
                customer.Categories,
                customer.Groups,
                customer.CreatedBy,
                customer.UserId,
                customer.LastActivityType,
                customer.LastActivityDate,
                customer.CreateDate,
                customer.EditDate,

            ])
        });
        doc.save("customers_data.pdf");
    };
    const sizeOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ];
    const uniqueCategories = [...new Set(sampleData.map(item => item.Categories))].map(category => ({
        name: category,
        value: category
    }));
    const uniqueCategories1 = [...new Set(sampleData.map(item => item.Status))].map(Status => ({
        name: Status,
        value: Status
    }));
    const filteredGroups = useMemo(() => {
        if (selectedCategory) {
            return [...new Set(sampleData.filter(item => item.Categories === selectedCategory).map(item => item.Groups))]
                .map(group => ({ name: group, value: group }));
        }
        return [...new Set(sampleData.map(item => item.Groups))].map(group => ({ name: group, value: group }));
    }, [selectedCategory]);
    const statusofdrop = (options) => (
        <Dropdown
            value={options.value}
            options={uniqueCategories1}
            onChange={(e) => {
                setSelectedCategory(e.value);
                options.filterApplyCallback(e.value);
            }}
            optionLabel="name"
            placeholder="Any"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );
    const representativeRowFilterTemplate = (options) => (
        <Dropdown
            value={options.value}
            options={uniqueCategories}
            onChange={(e) => {
                setSelectedCategory(e.value);
                options.filterApplyCallback(e.value);
            }}
            optionLabel="name"
            placeholder="Any"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );
    const representativeRowFilterTemplate1 = (options) => (
        <Dropdown
            value={options.value}
            options={filteredGroups}
            onChange={(e) => options.filterApplyCallback(e.value)}
            optionLabel="name"
            placeholder="Any"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );
    const [visibleColumns, setVisibleColumns] = useState([ // State for visible columns
        // 'Yearsofexperience',
        // 'City',
        // 'Status',
        // 'Relocation',
        // 'Categories',
        // 'Groups',
    ]);
    const firstnameEditor = (props) => {
        return <InputText value={props.value} onChange={(e) => props.editorCallback(e.target.value)} />;
    };
    const firstnameEditor1 = (props) => {
        return <InputText value={props.value} onChange={(e) => props.editorCallback(e.target.value)} />;
    };
    const firstnameEditor2 = (props) => {
        return <InputText value={props.value} onChange={(e) => props.editorCallback(e.target.value)} />;
    };
    const firstnameEditor4 = (props) => {
        return <InputText value={props.value} onChange={(e) => props.editorCallback(e.target.value)} />;
    };
    const onCellEditComplete = (e) => {
        const { rowData, newValue, field } = e;
        if (rowData[field] !== newValue) {
            const updatedCustomers = customers.map((customer) =>
                customer.id === rowData.id ? { ...customer, [field]: newValue } : customer
            );
            setCustomers(updatedCustomers);
            localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        }
    };
    useEffect(() => {
        // const savedCustomers = JSON.parse(localStorage.getItem('customers'));
        // if (savedCustomers && savedCustomers.length > 0) {
        //     setCustomers(savedCustomers);
        // } else {
        //     setCustomers(sampleData);  
        //     localStorage.setItem('customers', JSON.stringify(sampleData));
        // }
        setCustomers(sampleData);
    }, []);
    // const header = renderHeader();
    const [visible, setVisible] = useState(false); // State to control the visibility of the modal
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const showDialog = () => {
        setSuccessAlert(true); // Show the modal
    };
    const hideDialog = () => {
        setVisible(false); // Hide the modal
    };
    const [successAlert, setSuccessAlert] = useState(false);
    const [addedit, setaddedit] = useState(false);
    const [date, setDate] = useState(null);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [date3, setDate3] = useState(null);
    const [date4, setDate4] = useState(null);
    const [date5, setDate5] = useState(null);
    const [date6, setDate6] = useState(null);

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const handleReset = () => {
        setFormData({
            jobTitle: '',
            status: '',
            hiringManager: '',
            lastName: '',
            company: '',
            email: '',
            employeeType: '',
            source: '',
            WorkplaceType: '',
            availabilityDate: null,
            referredBy: '',
            categories: '',
            JobType: '',
            groups: '',
            Department: '',
            JobFunction: '',
            Seniority: '',
            address: '',
            workPhone: '',
            mobilePhone: '',
            projectDescription: '',
        });
        setSelectedCountry(null);
        setSelectedCities(null);
    };

    //   data table ends

    {/* Side bar start */ }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState(null);

    const companies = [
        { name: 'Tech Corp', code: 'TC' },
        { name: 'BizCorp', code: 'BC' },
        { name: 'Creative Solutions', code: 'CS' },
        { name: 'Innovative Tech', code: 'IT' },
    ];

    const [relatedPerson, setRelatedPerson] = useState(null);

    const relatedPersons = [
        { name: "Manager" },
        { name: "Project Manager (PM)" },
        { name: "Department Manager (DM)" },
        { name: "Chief Executive Officer (CEO)" },
    ];

    const [department, setDepartment] = useState(null);

    const departments = [
        { name: "Software Development" },
        { name: "Quality Assurance (QA)" },
        { name: "DevOps" },
        { name: "UI/UX Design" },
        { name: "Product Management" },
        { name: "Support" },
    ];

    const [visibleRight, setVisibleRight] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState('');




    const addCities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];



    const addStates = [
        { name: 'California', code: 'CA' },
        { name: 'Texas', code: 'TX' },
        { name: 'Florida', code: 'FL' },
        { name: 'New York', code: 'NY' },
        { name: 'Illinois', code: 'IL' }
    ];

    const addCountries = [
        { name: 'United States', code: 'US' },
        { name: 'Canada', code: 'CA' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Australia', code: 'AU' }
    ];


    const labels = [
        { name: 'Work from Office', code: 'WORK' },
        { name: 'Work from Home', code: 'HOME' },
        { name: 'Work from Remote', code: 'REMOTE' },
        { name: 'Work from Hybrid', code: 'HYBRID' }
    ];


    {/* Side bar end */ }


    const handleJobStatusChange = (e) => {
        setSelectedJobs(e.value);
    };

    /////////////////////////////////////////////

    const { register, handleSubmit, reset, trigger, clearErrors, formState: { errors }, setValue, getValues } = useForm();
    const [compamyitem, setcompamyitem] = useState([])
    const [departitems, setdepartitems] = useState([])
    const [relateditems, setrelateditems] = useState([])
    const [address, setAddress] = useState('');
    const [selectedState, setSelectedState] = useState("Telangana");
    const [selectedCity, setSelectedCity] = useState("Hyderabad");
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [postalCode, setPostalCode] = useState('500016');
    const [street1, setStreet1] = useState('White house, Block - III');
    const [street2, setStreet2] = useState('Begumpet');

    const updateAddress = () => {
        // setAddress(`${street1}  ${street2} ${postalCode}`.trim());
    };
    useEffect(() => {
        const updatedAddress = [street1, street2, selectedCity, selectedState, postalCode, selectedCountry, selectedLabel?.name].filter(Boolean);
        setAddress(updatedAddress);
    }, [street1, street2, postalCode, selectedState, selectedCity, selectedCountry, selectedLabel, postalCode]);

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU3VwZXJ1c2VyIFJvbGUiXSwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3JvbGVzIiwibWFuYWdlX3Blcm1pc3Npb25zIiwibWFuYWdlX3JvbGVfdG9fZW1wbG95ZWUiXSwiZXhwIjoxNzM2NjYzNDMyLCJpYXQiOjE3MzQwNzE0MzJ9.VficxfYeaB2WwPhxcRAzmMjSclWyY54Js5eAQ4mqfM8`


    const getallactivecontacts = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/contacts/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                let results = response.data.results;
                setCustomers(results);
                setrelateditems(results);
            }
        } catch (error) {

        }
    };
    const onsubmitEdit = async (data) => {


        let address = {
            street: street1,
            city: street2,
            state: selectedState,
            zip: postalCode,

        }
        const req = {
            job_title: data.jobtitle,
            company: Number(data.comapany),
            related_person: Number(data.Related),
            department: Number(data.department),
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.personal_email,
            phone_number: data.Phone,
            address: address
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_Company_Contact}/api/v1/contacts/`, req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            getallactivecontacts()
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
    const getDepartments = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/departments/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                let results = response.data.results;
                setdepartitems(results);
            }
        } catch (error) {

        }
    };
    // const getcontact = async () => {

    //   try {
    //     const response = await axios.get(`http://38.77.155.161:9003/api/v1/contacts/`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (response.data) {
    //       let results = response.data.results;
    //       setrelateditems(results);
    //     }
    //   } catch (error) {

    //   }
    // };


    useEffect(() => {
        getCompanydata()
        getDepartments()
        // getcontact()
        getallactivecontacts()
    }, []);

    // contacts table
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        mobile: { value: null, matchMode: FilterMatchMode.CONTAINS },
        department: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [contactData, setContactData] = useState([
        {
            id: 1,
            firstName: 'Rahul',
            lastName: 'Sharma',
            company: 'Tech Mahindra',
            jobTitle: 'Software Engineer',
            email: 'rahul.sharma@techmahindra.com',
            mobile: '1234567890',
            associatedContacts: 5,
            department: 'Engineering',
            address: '123 IT Park, Mumbai, Maharashtra',
            notes: 'Potential client for project X.',
            category: 'Client',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'RS001',
            lastActivityDate: '05-01-2025',
            createDate: '15-12-2024',
            editDate: '08-01-2025',
        },
        {
            id: 2,
            firstName: 'Priya',
            lastName: 'Singh',
            company: 'Infosys',
            jobTitle: 'Marketing Manager',
            email: 'priya.singh@infosys.com',
            mobile: '9876543210',
            associatedContacts: 3,
            department: 'Marketing',
            address: '456 Tech Lane, Bengaluru, Karnataka',
            notes: 'Interested in joint marketing campaigns.',
            category: 'Partner',
            group: 'Medium Priority',
            createdBy: 'Admin',
            userId: 'PS002',
            lastActivityDate: '03-01-2025',
            createDate: '20-11-2024',
            editDate: '09-01-2025',
        },
        {
            id: 3,
            firstName: 'Vikram',
            lastName: 'Patel',
            company: 'Wipro',
            jobTitle: 'Accountant',
            email: 'vikram.patel@wipro.com',
            mobile: '5557891234',
            associatedContacts: 2,
            department: 'Finance',
            address: '789 IT Street, Pune, Maharashtra',
            notes: 'Handling tax consultations.',
            category: 'Vendor',
            group: 'Low Priority',
            createdBy: 'Admin',
            userId: 'VP003',
            lastActivityDate: '07-01-2025',
            createDate: '10-10-2024',
            editDate: '08-01-2025',
        },
        {
            id: 4,
            firstName: 'Neha',
            lastName: 'Reddy',
            company: 'HCL Technologies',
            jobTitle: 'HR Manager',
            email: 'neha.reddy@hcl.com',
            mobile: '4445556666',
            associatedContacts: 4,
            department: 'Human Resources',
            address: '101 IT Avenue, Chennai, Tamil Nadu',
            notes: 'Looking for recruitment solutions.',
            category: 'Client',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'NR004',
            lastActivityDate: '08-01-2025',
            createDate: '01-12-2024',
            editDate: '09-01-2025',
        },
        {
            id: 5,
            firstName: 'Arjun',
            lastName: 'Kapoor',
            company: 'Tata Consultancy Services',
            jobTitle: 'CTO',
            email: 'arjun.kapoor@tcs.com',
            mobile: '3332221111',
            associatedContacts: 6,
            department: 'Technology',
            address: '202 IT Road, Hyderabad, Telangana',
            notes: 'Exploring partnership for AI projects.',
            category: 'Partner',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'AK005',
            lastActivityDate: '04-01-2025',
            createDate: '15-09-2024',
            editDate: '08-01-2025',
        },
        {
            id: 6,
            firstName: 'Sneha',
            lastName: 'Desai',
            company: 'Tech Mahindra',
            jobTitle: 'Project Manager',
            email: 'sneha.desai@techmahindra.com',
            mobile: '1239876543',
            associatedContacts: 4,
            department: 'Sustainability',
            address: '303 IT Lane, Ahmedabad, Gujarat',
            notes: 'Discussing renewable energy initiatives.',
            category: 'Client',
            group: 'Medium Priority',
            createdBy: 'Admin',
            userId: 'SD006',
            lastActivityDate: '06-01-2025',
            createDate: '10-12-2024',
            editDate: '08-01-2025',
        },
        {
            id: 7,
            firstName: 'Rajesh',
            lastName: 'Kumar',
            company: 'Wipro',
            jobTitle: 'Software Developer',
            email: 'rajesh.kumar@wipro.com',
            mobile: '3216549870',
            associatedContacts: 2,
            department: 'Development',
            address: '404 IT Street, Noida, Uttar Pradesh',
            notes: 'Involved in API development.',
            category: 'Client',
            group: 'Low Priority',
            createdBy: 'Admin',
            userId: 'RK007',
            lastActivityDate: '09-01-2025',
            createDate: '25-11-2024',
            editDate: '08-01-2025',
        },
        {
            id: 8,
            firstName: 'Kavita',
            lastName: 'Joshi',
            company: 'Infosys',
            jobTitle: 'Operations Manager',
            email: 'kavita.joshi@infosys.com',
            mobile: '8887779999',
            associatedContacts: 3,
            department: 'Operations',
            address: '505 IT Avenue, Kolkata, West Bengal',
            notes: 'Needs assistance with logistics.',
            category: 'Vendor',
            group: 'Medium Priority',
            createdBy: 'Admin',
            userId: 'KJ008',
            lastActivityDate: '02-01-2025',
            createDate: '05-12-2024',
            editDate: '08-01-2025',
        },
        {
            id: 9,
            firstName: 'Sanjay',
            lastName: 'Mehta',
            company: 'Tech Mahindra',
            jobTitle: 'Architect',
            email: 'sanjay.mehta@techmahindra.com',
            mobile: '6665554444',
            associatedContacts: 1,
            department: 'Architecture',
            address: '606 IT Road, Pune, Maharashtra',
            notes: 'Discussing design collaboration.',
            category: 'Partner',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'SM009',
            lastActivityDate: '05-01-2025',
            createDate: '20-10-2024',
            editDate: '09-01-2025',
        },
        {
            id: 10,
            firstName: 'Anjali',
            lastName: 'Gupta',
            company: 'HCL Technologies',
            jobTitle: 'Chef',
            email: 'anjali.gupta@hcl.com',
            mobile: '7778889999',
            associatedContacts: 2,
            department: 'Culinary',
            address: '707 IT Lane, Chennai, Tamil Nadu',
            notes: 'Planning catering for the event.',
            category: 'Vendor',
            group: 'Low Priority',
            createdBy: 'Admin',
            userId: 'AG010',
            lastActivityDate: '07-01-2025',
            createDate: '10-11-2024',
            editDate: '08-01-2025',
        },
        {
            id: 11,
            firstName: 'Ravi',
            lastName: 'Verma',
            company: 'Tech Mahindra',
            jobTitle: 'IT Consultant',
            email: 'ravi.verma@techmahindra.com',
            mobile: '6665554444',
            associatedContacts: 4,
            department: 'IT Solutions',
            address: '901 IT Road, Hyderabad, Telangana',
            notes: 'Assisting with cloud migration strategy.',
            category: 'Vendor',
            group: 'High Priority',
            createdBy: 'Manager',
            userId: 'RV021',
            lastActivityDate: '15-01-2025',
            createDate: '05-10-2024',
            editDate: '10-01-2025',
        },
    ]);

    const [selectedContacts, setSelectedContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState({ rows: 10, first: 0 });

    const dt = useRef(null);
    const [documents, setDocuments] = useState([]);

    const navigate = useNavigate();
    const [selectedContact, setSelectedContact] = useState(null); // State to track the right-clicked contact

    const toast = useRef(null); // Reference for Toast notifications
    const cm = useRef(null); // Reference for ContextMenu

    // Context menu options
    const menuModel = [
        { label: 'View', icon: 'pi pi-fw pi-eye', command: () => setVisibleViewRight(true) },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => navigate('/contacts-editform') },
        { label: 'Archived', icon: 'pi pi-check-circle' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteContact(selectedContact) },
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
                        { label: 'Selected', icon: 'pi pi-phone', },
                        { label: 'Searched', icon: 'pi pi-users', },
                    ],
                },
            ],
        },
        {
            label: 'Schedule', icon: 'pi pi-calendar-clock',
            items: [ // Subitems for "Schedule"
                {
                    label: 'Interview', icon: 'pi pi-calendar-plus',
                },
                { label: 'Call', icon: 'pi pi-phone', },
                { label: 'Meeting', icon: 'pi pi-users', },
                { label: 'Task', icon: 'pi pi-list', },
                { label: 'Event', icon: 'pi pi-calendar-clock', },
                { label: 'Other', icon: 'pi pi-ellipsis-h', },
            ],
        },
        { label: 'SMS', icon: 'pi pi-inbox' },
        { label: 'Contacts Notes', icon: 'pi pi-clipboard' },
        { label: 'Clear Search', icon: 'pi pi-filter-slash', command: () => handleClearSearchContacts() },
        {
            label: 'More',
            icon: 'pi pi-ellipsis-h',
            items: [ // Subitems for "Schedule"
                { label: 'Attachments', icon: 'pi pi-link', },
                { label: 'Change Status', icon: 'pi pi-sync', },
            ],
        },

    ];

    // Function to handle viewing a contact
    const viewContact = (contact) => {
        toast.current.show({ severity: 'info', summary: 'Contact Selected', detail: `${contact.firstName} ${contact.lastName}` });
    };

    // Function to handle editing a contact
    const editContact = (contact) => {
        toast.current.show({ severity: 'success', summary: 'Edit Contact', detail: `Editing ${contact.firstName} ${contact.lastName}` });
        // Add your edit logic here
    };

    // Function to handle deleting a contact
    const deleteContact = (contact) => {
        let _contacts = [...contactData];
        _contacts = _contacts.filter((c) => c.id !== contact.id);
        setContactData(_contacts); // Update the contact data state
        toast.current.show({ severity: 'error', summary: 'Contact Deleted', detail: `${contact.firstName} ${contact.lastName}` });
    };
    // view starts

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
    const [visibleViewRight, setVisibleViewRight] = useState(false);

    // view ends

    const [showesitSelecticon, setshowesitSelecticon] = useState(false);
    const [showesitSelect, setshowesitSelect] = useState(true);
    const [showIconsSelect, setShowIconsSelect] = useState(false);


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
            icon: 'pi pi-phone'
        },
        {
            name: 'Meeting',
            code: 'SCH-ME',
            icon: 'pi pi-calendar'
        },
        {
            name: 'Task',
            code: 'SCH-TA',
            icon: 'pi pi-check-square'
        },
        {
            name: 'Event',
            code: 'SCH-EV',
            icon: 'pi pi-bell'
        },
        {
            name: 'Other',
            code: 'SCH-OT',
            icon: 'pi pi-ellipsis-h'
        }
    ];

    const handleScheduleChange = (e) => {
        setSelectedSchedule(e.value);

        // Trigger the action if defined for the selected option
        if (e.value && e.value.action) {
            e.value.action(); // Execute the custom action
        }
    };


    // clear search start

    const handleClearSearchContacts = () => {


        setFilters({
            first_name: { value: "" },
            last_name: { value: "" },
            company: { value: "" },
            job_title: { value: "" },
            email: { value: "" },
            phone_number: { value: "" },
            AssociatedContacts: { value: "" },
            department: { value: "" },
            full_address: { value: "" },
            notes: { value: "" },
            category: { value: "" },
            group: { value: "" },
            created_by_name: { value: "" },
            UserId: { value: "" },
            last_activity_type: { value: "" },
            last_activity_date: { value: "" },
            created_at: { value: "" },
            updated_at: { value: "" },
        });

        // Reset the pagination
        // setPageState((prevState) => ({
        //     ...prevState,
        //     first: 0, 
        // }));
    };

    // clear search start

    // new email starts

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

    // short form starts
    const [email1, setEmail1] = useState("mahesh9@varundigitalmedia.com");
    const [phno1, setPhno1] = useState("9876543210");
    const [jobtitle1, setJobtitle1] = useState("UI/UX Manager");
    const [userid1, setUserid1] = useState("Harish");
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

    const onUpload = (event) => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: `${event.files.length} file(s) uploaded` });
    };
    const [selectedCategory1, setSelectedCategory1] = useState(null);

    const categoryOptions = [
        { label: "Micro Enterprise", value: "micro" },
        { label: "Small Enterprise", value: "small" },
        { label: "Medium Enterprise", value: "medium" },
        { label: "Large Enterprise", value: "large" },
    ];
    const [selectedGroup1, setSelectedGroup1] = useState(null);

    const groupOptions = [
        { label: "Up to 5 Crore", value: "5cr" },
        { label: "Up to 50 Crore", value: "50cr" },
        { label: "Up to 250 Crore", value: "250cr" },
        { label: "Above 250 Crore", value: "above250cr" },
    ];

    // short form ends

    return (
        <React.Fragment>
            <div className="page-content allact-tabs">
                <Container fluid={true}>
                    <div className="page-title-box actjobbread">
                        <Row className="justify-content-between ac-items">
                            <Col xxl={9} xl={12} lg={12} md={12} sm={12}>

                                <span className="icons-ac">
                                    {selectedContacts.length > 0 ?

                                        <span className="action-icons me-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary import-res-btn me-1 md:w-8rem"


                                            >
                                                <i className="pi pi-user-plus"></i> {selectedContacts.length} Selected
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
                                                    <i className="pi pi-pencil"></i>
                                                </button>

                                                <Tooltip target=".delete" content="Delete" position="bottom" style={{ marginTop: "5px" }} />

                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1 delete"
                                                // onClick={handleDeleteSelected}
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
                                            <i className="pi pi-user-plus me-1"></i> Add a Contact
                                        </button>
                                    }
                                </span>
                                <span className="drop-ac">
                                    <SubmitContacttoCandidate />
                                    <AddJob />

                                    <EmailContacts />
                                    <CascadeSelect
                                        // value={selectedSchedule}
                                        onChange={handleScheduleChange}
                                        options={actScheduleOptions}
                                        optionLabel="name"
                                        optionGroupLabel="name"
                                        className="md:w-10rem me-1"
                                        optionGroupChildren={['subItems', 'subItems']}
                                        breakpoint="767px"
                                        placeholder="Schedule"
                                    />

                                    <CascadeSelect
                                        value={selectedActSms}
                                        // onChange={(e) => setSelectedActSms(e.value)}
                                        options={actSmsOptions}
                                        optionLabel="name"
                                        optionGroupLabel="name"
                                        optionGroupChildren={['subItems', 'subItems']}
                                        className="md:w-8rem me-1"
                                        breakpoint="767px"
                                        placeholder="SMS"
                                    />
                                    <MoreACcontacts />
                                </span>
                            </Col>

                            <Col xxl={3} xl={12} lg={12} sm={12}>
                                <div className="clr-icons">
                                    {selectedContacts.length > 0 ? <NotesContact1 /> : <NotesContact />}

                                    <Export />

                                    <button
                                        type="button"
                                        className="btn btn-secondary icons-btn me-1" Tooltip="Clear Search" onClick={handleClearSearchContacts}
                                    >
                                        <i className="pi pi-sync"></i>
                                    </button>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12}>
                                <section className="allactjobs-table">
                                    {/* Toast for notifications */}
                                    <Toast ref={toast} />

                                    {/* ContextMenu for right-click actions */}
                                    <ContextMenu model={menuModel} ref={cm} onHide={() => setSelectedContact(null)} />
                                    <div className="card1 mt-4 mb-4 actjobsumtable">
                                        <DataTable
                                            value={contactData}
                                            ref={dt}
                                            rows={pageState.rows}
                                            first={pageState.first}
                                            onPage={onPage}
                                            dataKey="userId"
                                            loading={loading}
                                            scrollable
                                            emptyMessage="No records found."
                                            selection={selectedContacts}
                                            onSelectionChange={(e) => setSelectedContacts(e.value)}
                                            selectionMode="multiple"
                                            filters={filters}
                                            filterDisplay="row"
                                            reorderableRows
                                            resizableColumns
                                            reorderableColumns
                                            columnResizeMode="expand"
                                            onContextMenu={(e) => {
                                                cm.current.show(e.originalEvent); // Show the context menu
                                                setSelectedContact(e.data); // Set the selected contact
                                            }}
                                            contextMenuSelection={selectedContact}
                                            onContextMenuSelectionChange={(e) => setSelectedContact(e.value)}
                                        >
                                            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                                            <Column field="firstName" header="First Name" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="lastName" header="Last Name" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="company" header="Company" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="jobTitle" header="Job Title" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="email" header="Email" sortable filter style={{ minWidth: '14rem' }} />
                                            <Column field="mobile" header="Mobile Phone" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="associatedContacts" header="Associated Contacts" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="department" header="Department" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="lastActivityDate" header="Last Activity Date" sortable filter style={{ minWidth: '12rem' }} />
                                            <Column field="createDate" header="Create Date" sortable filter style={{ minWidth: '10rem' }} />
                                            <Column field="editDate" header="Edit Date" sortable filter style={{ minWidth: '10rem' }} />
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

                                        <h3>Create a Contact</h3>
                                        <div className="d-flex align-items-center">
                                            {/* <Link to="/candidate-editform">
                                                                                              <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
                                                                                            </Link> */}
                                            <Tooltip target=".closeside" content="Close" position="bottom" style={{ marginBottom: "5px" }} />

                                            <Button
                                                icon="pi pi-times"
                                                className="p-button-text close-btn closeside"
                                                onClick={() => setVisibleRight(false)}
                                            />
                                        </div>

                                    </div>
                                    <div className="card sidebardetails">
                                        <form>

                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="firstName">First Name</label>
                                                        <InputText
                                                            id="firstName"
                                                            placeholder="Mahesh Kumar"
                                                        // value={}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="lastName">Last Name</label>
                                                        <InputText
                                                            id="lastName"
                                                            placeholder="Bhoga"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className="mb-4">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="email">Email</label>
                                                        <InputText
                                                            type="email"
                                                            placeholder=""
                                                            value={email1}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="phoneNumber">Phone Number</label>
                                                        <InputText
                                                            placeholder="9876543210"
                                                            value={phno1}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="jobTitle" className="p-d-block">Designation</label>
                                                        <InputText
                                                            placeholder=""
                                                            className="p-d-block"
                                                            value={jobtitle1}
                                                        />
                                                    </div>
                                                </Col>
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
                                            </Row>

                                            <Row className="mb-3">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="company">Department</label>
                                                        <Dropdown
                                                            value={selectedDepartment}
                                                            onChange={(e) => setSelectedDepartment(e.value)}
                                                            options={departmentOptions}
                                                            optionLabel="name"
                                                            placeholder="UI/UX"
                                                            filter
                                                            className="w-full bgclr"
                                                        />
                                                    </div>

                                                </Col>

                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="company">Reporting Person</label>
                                                        <Dropdown
                                                            value={selectedPerson}
                                                            options={personOptions}
                                                            onChange={(e) => setSelectedPerson(e.value)}
                                                            optionLabel={(option) => `${option.name}, ${option.role}`}
                                                            placeholder="Salmanuddin Syed"
                                                            className="bgclr"
                                                        />
                                                    </div>

                                                </Col>
                                            </Row>

                                            <Row className="mb-2">
                                                <Col lg={12}>
                                                    <div className="p-field companie-add" style={{ position: "relative" }}>
                                                        <label htmlFor="address">Address</label>
                                                        <InputTextarea
                                                            id="address"
                                                            value={address}
                                                            // onChange={(e) => setAddress(e.target.value)}
                                                            readOnly
                                                            placeholder="Enter your address"
                                                            style={{ paddingRight: "2rem" }} // Optional styling
                                                            rows={3} // Specify number of rows
                                                            cols={30} // Specify width
                                                        />

                                                        {/* Edit Icon */}
                                                        <i
                                                            className="pi pi-pencil"
                                                            style={{
                                                                position: "absolute",
                                                                right: "10px",
                                                                top: "70%",
                                                                transform: "translateY(-50%)",
                                                                color: "#6c757d",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => setVisible(true)}
                                                        ></i>
                                                        <Dialog header="Edit Address" className="address-popup" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                                                            style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                                                            <div className="card sidebardetails">
                                                                <form>

                                                                    <Row className="mb-3">
                                                                        <Col lg={6}>
                                                                            <div className="p-field">
                                                                                <label htmlFor="street1">Street 1</label>
                                                                                <InputText
                                                                                    id="street1"
                                                                                    value={street1}
                                                                                    onChange={(e) => { setStreet1(e.target.value); updateAddress(); }}
                                                                                    placeholder="Enter Street 1"
                                                                                    className="w-full activejobdrop"
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                        <Col lg={6}>
                                                                            <label htmlFor="street2">Street 2</label>
                                                                            <InputText
                                                                                id="street2"
                                                                                value={street2}
                                                                                onChange={(e) => { setStreet2(e.target.value); updateAddress(); }}
                                                                                placeholder="Enter Street 2 (Optional)"
                                                                                className="w-full activejobdrop"
                                                                            />
                                                                        </Col>
                                                                    </Row>



                                                                    <Row className="mb-3">


                                                                        <Col lg={6}>
                                                                            <label htmlFor="city">City</label>
                                                                            <Dropdown
                                                                                id="city"
                                                                                value={selectedCity}
                                                                                onChange={(e) => { updateAddress(); setSelectedCity(e.value) }}
                                                                                options={addCities}
                                                                                optionLabel="name"
                                                                                filter
                                                                                filterPlaceholder="Search City"
                                                                                className="w-full activejobdrop"
                                                                                placeholder="Hyderabad"
                                                                            />
                                                                        </Col>
                                                                        <Col lg={6}>
                                                                            <label htmlFor="state">State</label>
                                                                            <Dropdown
                                                                                id="state"
                                                                                value={selectedState}
                                                                                onChange={(e) => { updateAddress(); setSelectedState(e.value) }}
                                                                                options={addStates}
                                                                                optionLabel="name"
                                                                                filter
                                                                                filterPlaceholder="Search State"
                                                                                className="w-full activejobdrop"
                                                                                placeholder="Telangana"
                                                                            />
                                                                        </Col>
                                                                    </Row>

                                                                    <Row className="mb-3">
                                                                        <Col lg={6}>
                                                                            <label htmlFor="country">Country</label>
                                                                            <Dropdown
                                                                                id="country"
                                                                                value={selectedCountry}
                                                                                onChange={(e) => { updateAddress(); setSelectedCountry(e.value) }}
                                                                                options={addCountries}
                                                                                optionLabel="name"
                                                                                filter
                                                                                filterPlaceholder="Search Country"
                                                                                className="w-full activejobdrop"
                                                                                placeholder="India"
                                                                            />
                                                                        </Col>
                                                                        <Col lg={6}>
                                                                            <label htmlFor="postalCode">Postal Code</label>
                                                                            <InputText
                                                                                id="postalCode"
                                                                                value={postalCode}
                                                                                onChange={(e) => { updateAddress(); setPostalCode(e.target.value) }}
                                                                                placeholder=""
                                                                                className="w-full activejobdrop"
                                                                            />
                                                                        </Col>
                                                                    </Row>

                                                                    <Row className="mb-3">
                                                                        <Col lg={12}>
                                                                            <label htmlFor="postalCode">Label</label>
                                                                            <Dropdown
                                                                                value={selectedLabel}
                                                                                onChange={(e) => { updateAddress(); setSelectedLabel(e.value) }}
                                                                                options={labels}
                                                                                optionLabel="name"
                                                                                placeholder="Work From Office"
                                                                                className="w-full activejobdrop"
                                                                            />
                                                                        </Col>
                                                                    </Row>


                                                                    {/* <Row>
                                                                                                        <Col>
                                                                                                          <Button color="primary" className="btn btn-primary waves-effect waves-light me-2 sidebarbtn">
                                                                                                            <i className="pi pi-check me-1"></i>  Ok
                                                                                                          </Button>
                                                                                                          <Button color="primary" className="btn btn-primary waves-effect waves-light cancelbtn me-2">
                                                                                                            <i className="pi pi-times me-1"></i>
                                                                                                            Cancel
                                                                                                          </Button>
                                                                                                        </Col>
                                                                                                      </Row> */}
                                                                </form>
                                                            </div>
                                                        </Dialog>
                                                    </div>
                                                </Col>

                                            </Row>


                                            <Row className="mb-2">
                                                <Col lg={12}>
                                                    <div className="p-field">
                                                        <label htmlFor="jobType">Attach Document</label>
                                                        <FileUpload
                                                            name="demo[]"
                                                            url="/api/upload"
                                                            multiple
                                                            accept="image/*"
                                                            maxFileSize={1000000}
                                                            onUpload={onUpload}
                                                            mode="basic"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className="mb-2">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="company">Categories</label>
                                                        <Dropdown
                                                            id="category"
                                                            value={selectedCategory1}
                                                            onChange={(e) => setSelectedCategory1(e.value)}
                                                            options={categoryOptions}
                                                            placeholder="Large Enterprise"
                                                            className="w-full bgclr"
                                                        />
                                                    </div>
                                                </Col >

                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="company">Groups</label>
                                                        <Dropdown
                                                            id="group"
                                                            value={selectedGroup1}
                                                            onChange={(e) => setSelectedGroup1(e.value)}
                                                            options={groupOptions}
                                                            placeholder="Above 250 Crore"
                                                            className="w-full bgclr"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row >

                                            <Row className="d-flex align-items-end mb-2">
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <label htmlFor="jobType">UserIDs</label>
                                                        <InputText
                                                            placeholder="Enter User ID" value={userid1} />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="p-field">
                                                        <input
                                                            type='checkbox'
                                                            className="me-2"
                                                            checked
                                                        />
                                                        <label htmlFor="jobType">Private</label>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col lg={12}>

                                                    <Button type="submit" color="primary" className="btn btn-primary waves-effect waves-light me-2 sidebarbtn float-end" onClick={() => setVisibleRight(false)}  >
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
            {/* contact view page starts */}
            <Row>
                <Col lg={12}>
                    <Sidebar visible={visibleViewRight} position="right" onHide={() => setVisibleViewRight(false)} className="view-form-sidebar">
                        <div className="sidebar-header">
                            <h3 className="head"><i className="pi pi-users"></i> Contact - Anup Gogoi</h3>
                            <div className="d-flex align-items-center">
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
                                                            <label htmlFor="firstname">Full Name</label>
                                                            <InputText
                                                                id="firstname"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="email">Email</label>
                                                            <InputText
                                                                id="email"
                                                                type="email"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="phone">Phone Number</label>
                                                            <InputText
                                                                id="phone"
                                                                type="tel"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>


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
                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="department">Department</label>
                                                            <InputText
                                                                id="department"
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                </Row>

                                                <Row>


                                                    <Col lg={4}>
                                                        <div className="field">
                                                            <label htmlFor="relatedPerson">Related Person</label>
                                                            <InputText
                                                                id="relatedPerson"
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
                                                            <label htmlFor="groups" className="block">Groups</label>
                                                            <InputText
                                                                id="groups"
                                                                placeholder=""
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    </Col>

                                                </Row>

                                                <Row className="mb-2 d-flex align-items-end">

                                                    <Col lg={4}>
                                                        <div className="p-field">
                                                            <label htmlFor="userIds" className="block">User IDs</label>
                                                            <InputText
                                                                id="userIds"
                                                                placeholder=""
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="p-field">
                                                            <input
                                                                type='checkbox'
                                                                className="me-2"
                                                            />
                                                            <label htmlFor="jobType">Private</label>
                                                        </div>
                                                    </Col>
                                                </Row>


                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="field">
                                                            <label htmlFor="address">Address</label>
                                                            <InputTextarea
                                                                id="address"
                                                                value={address}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                placeholder=""
                                                                rows={5}
                                                                cols={30}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
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
                                                                // header={header}
                                                                tableStyle={{ minWidth: '50rem' }}
                                                            >
                                                                <Column field="certificate_name" header="Document Type" ></Column>
                                                                <Column field="docSubject" header="Document Subject"></Column>
                                                                <Column field="created_at" header="Applied Date & Time"></Column>
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
            {/* contact view page ends */}


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
                                                    options={typeInterview}
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
                                    <button type="submit" class="btn btn-success me-2">
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
        </React.Fragment>
    );
};



export default ContactsArchived;



