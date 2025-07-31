import React, { useState, useRef, useEffect, useMemo } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  // Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Dropdown as ReactstrapDropdown } from 'reactstrap';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from "primereact/tabview"
// import CustomFilterDemo from "./CustomFilterDemo"
// import LinearDemo from "pages/Tables/LinearDemo"
import { SpeedDial } from "primereact/speeddial"
import { Toast } from "primereact/toast"
import { useNavigate } from "react-router-dom"
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { MultiSelect } from 'primereact/multiselect'; // Make sure to import MultiSelect correctly
import 'jspdf-autotable';
import { Plus, Mail, MessageSquare, Filter, Download, Search } from 'lucide-react';
import { Dialog } from 'primereact/dialog';
// import Header from '../../Dashboard/Header';
import Modal from "react-bootstrap/Modal";
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { FileUpload } from 'primereact/fileupload';
import { IconName } from 'lucide-react';
import autoTable from 'jspdf-autotable';
// import { Toast } from 'primereact/toast';

import { TriStateCheckbox } from 'primereact/tristatecheckbox';
// import { FileUpload } from 'primereact/fileupload';
import { TreeSelect } from 'primereact/treeselect';
// import { Toast } from 'primereact/toast';

const JobsAllactiveemp = () => {

  // action items

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const scheduleOptions = [
    { name: 'Interview', code: 'INTERVIEW' },
    { name: 'Call', code: 'CALL' },
    { name: 'Meeting', code: 'MEETING' },
    { name: 'Task', code: 'TASK' },
    { name: 'Event', code: 'EVENT' },
    { name: 'Other', code: 'OTHER' }
  ];

  const [selectedMore, setSelectedMore] = useState(null);
  const moreoptions = [
    { name: 'Delete', code: 'NY' },
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

  document.title = "PMS | React Admin & Dashboard Template"


  const [customers, setCustomers] = useState([]);
  const dt = useRef(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    JobId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    JobTitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Openings: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    HiringManager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    JobLocation: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    WorkplaceType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    JobType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    PrimarySkills: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ExperienceRequired: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    MinSalary: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    MaxSalary: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Department: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    JobFunction: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Seniority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Categories: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Groups: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    CreateDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    EditDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    CreatedBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [pageState, setPageState] = useState({ first: 0, rows: 10 });
  const [balanceFrozen, setBalanceFrozen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [size, setSize] = useState('normal');
  const sampleData = [
    {
      "JobId": "J1001",
      "JobTitle": "Data Scientist",
      "Status": "Open",
      "Openings": 7,
      "HiringManager": "Emily Davis",
      "Company": "GlobalCorp",
      "JobLocation": "Hyderabad",
      "WorkplaceType": "Onsite",
      "JobType": "Contract",
      "PrimarySkills": "SQL",
      "ExperienceRequired": 3,
      "MinSalary": 37736,
      "MaxSalary": 89593,
      "Department": "HR",
      "JobFunction": "Development",
      "Seniority": "Senior",
      "Categories": "Sales",
      "Group": "Group C",
      "CreateDate": "2024-09-24",
      "EditDate": "2024-07-17",
      "CreatedBy": "Manager"
    },
    {
      "JobId": "J1002",
      "JobTitle": "Software Engineer",
      "Status": "Hold",
      "Openings": 6,
      "HiringManager": "Michael Johnson",
      "Company": "GlobalCorp",
      "JobLocation": "Bangalore",
      "WorkplaceType": "Onsite",
      "JobType": "Full-Time",
      "PrimarySkills": "ReactJS, Marketing, Leadership",
      "ExperienceRequired": 4,
      "MinSalary": 41884,
      "MaxSalary": 118201,
      "Department": "Operations",
      "JobFunction": "Support",
      "Seniority": "Director",
      "Categories": "Marketing",
      "Group": "Group D",
      "CreateDate": "2024-10-16",
      "EditDate": "2023-10-14",
      "CreatedBy": "Hiring Team"
    },
    {
      "JobId": "J1003",
      "JobTitle": "HR Specialist",
      "Status": "Hold",
      "Openings": 8,
      "HiringManager": "Michael Johnson",
      "Company": "BizCorp",
      "JobLocation": "London",
      "WorkplaceType": "Remote",
      "JobType": "Part-Time",
      "PrimarySkills": "Leadership, AWS",
      "ExperienceRequired": 2,
      "MinSalary": 33255,
      "MaxSalary": 74974,
      "Department": "Marketing",
      "JobFunction": "Sales",
      "Seniority": "Mid-Level",
      "Categories": "Engineering",
      "Group": "Group A",
      "CreateDate": "2023-02-01",
      "EditDate": "2024-09-30",
      "CreatedBy": "Manager"
    },
    {
      "JobId": "J1004",
      "JobTitle": "Business Analyst",
      "Status": "Hold",
      "Openings": 9,
      "HiringManager": "Jane Smith",
      "Company": "Alpha Solutions",
      "JobLocation": "New York",
      "WorkplaceType": "Remote",
      "JobType": "Contract",
      "PrimarySkills": "SQL, Leadership",
      "ExperienceRequired": 1.3,
      "MinSalary": 42036,
      "MaxSalary": 87119,
      "Department": "IT",
      "JobFunction": "Sales",
      "Seniority": "Mid-Level",
      "Categories": "Sales",
      "Group": "Group B",
      "CreateDate": "2024-05-24",
      "EditDate": "2024-09-17",
      "CreatedBy": "Manager"
    },
    {
      "JobId": "J1005",
      "JobTitle": "Business Analyst",
      "Status": "Closed",
      "Openings": 8,
      "HiringManager": "John Doe",
      "Company": "BizCorp",
      "JobLocation": "Hyderabad",
      "WorkplaceType": "Hybrid",
      "JobType": "Contract",
      "PrimarySkills": "Marketing, SQL",
      "ExperienceRequired": 4,
      "MinSalary": 47841,
      "MaxSalary": 82212,
      "Department": "HR",
      "JobFunction": "Management",
      "Seniority": "Mid-Level",
      "Categories": "Operations",
      "Group": "Group D",
      "CreateDate": "2024-10-04",
      "EditDate": "2023-05-02",
      "CreatedBy": "Manager"
    },
    {
      "JobId": "J1006",
      "JobTitle": "Marketing Specialist",
      "Status": "Open",
      "Openings": 5,
      "HiringManager": "Sarah Lee",
      "Company": "MarketPro",
      "JobLocation": "San Francisco",
      "WorkplaceType": "Hybrid",
      "JobType": "Full-Time",
      "PrimarySkills": "SEO, Social Media",
      "ExperienceRequired": 3,
      "MinSalary": 35000,
      "MaxSalary": 70000,
      "Department": "Marketing",
      "JobFunction": "Promotion",
      "Seniority": "Mid-Level",
      "Categories": "Marketing",
      "Group": "Group B",
      "CreateDate": "2023-05-12",
      "EditDate": "2024-10-01",
      "CreatedBy": "Admin"
    },
    {
      "JobId": "J1007",
      "JobTitle": "Backend Developer",
      "Status": "Active",
      "Openings": 4,
      "HiringManager": "Emily Carter",
      "Company": "CodeBase",
      "JobLocation": "Austin",
      "WorkplaceType": "Onsite",
      "JobType": "Full-Time",
      "PrimarySkills": "Node.js, MongoDB",
      "ExperienceRequired": 5,
      "MinSalary": 45000,
      "MaxSalary": 85000,
      "Department": "Engineering",
      "JobFunction": "Development",
      "Seniority": "Senior",
      "Categories": "Technology",
      "Group": "Group D",
      "CreateDate": "2024-02-15",
      "EditDate": "2024-09-25",
      "CreatedBy": "Tech Lead"
    },
    {
      "JobId": "J1008",
      "JobTitle": "Product Manager",
      "Status": "Closed",
      "Openings": 1,
      "HiringManager": "David Brown",
      "Company": "InnovateX",
      "JobLocation": "Remote",
      "WorkplaceType": "Remote",
      "JobType": "Full-Time",
      "PrimarySkills": "Agile, Roadmap Planning",
      "ExperienceRequired": 7,
      "MinSalary": 60000,
      "MaxSalary": 120000,
      "Department": "Product",
      "JobFunction": "Management",
      "Seniority": "Senior",
      "Categories": "Product",
      "Group": "Group C",
      "CreateDate": "2024-03-18",
      "EditDate": "2024-09-15",
      "CreatedBy": "Admin"
    },
    {
      "JobId": "J1009",
      "JobTitle": "Graphic Designer",
      "Status": "Hold",
      "Openings": 3,
      "HiringManager": "Sophia Green",
      "Company": "Design Studio",
      "JobLocation": "New York",
      "WorkplaceType": "Hybrid",
      "JobType": "Part-Time",
      "PrimarySkills": "Adobe Photoshop, Illustrator",
      "ExperienceRequired": 4,
      "MinSalary": 30000,
      "MaxSalary": 60000,
      "Department": "Creative",
      "JobFunction": "Design",
      "Seniority": "Mid-Level",
      "Categories": "Design",
      "Group": "Group A",
      "CreateDate": "2024-04-05",
      "EditDate": "2024-10-20",
      "CreatedBy": "HR"
    },
    {
      "JobId": "J1010",
      "JobTitle": "Network Administrator",
      "Status": "Active",
      "Openings": 2,
      "HiringManager": "Robert Gray",
      "Company": "NetSecure",
      "JobLocation": "Chicago",
      "WorkplaceType": "Onsite",
      "JobType": "Contract",
      "PrimarySkills": "Cisco, Firewall Management",
      "ExperienceRequired": 5,
      "MinSalary": 40000,
      "MaxSalary": 75000,
      "Department": "IT",
      "JobFunction": "Infrastructure",
      "Seniority": "Mid-Level",
      "Categories": "Technology",
      "Group": "Group B",
      "CreateDate": "2023-12-20",
      "EditDate": "2024-08-10",
      "CreatedBy": "Admin"
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
      head: [['ID', 'JobId', 'First Name', 'Status', 'Last Name', 'Job Title', 'Email', 'Phone', 'Company', 'Experience', 'JobLocation', 'WorkplaceType', 'JobType', 'Categories', 'Groups', 'ResumeAttachment', 'PrimarySkills', 'CreatedBy', 'EditDate', 'CreateDate']],
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
        customer.Seniority,
        customer.JobFunction,
        customer.ExperienceRequired,
        customer.MinSalary,
        customer.MaxSalary,

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
  const [selectedCountry, setSelectedCountry] = useState(null);
  // const [formData, setFormData] = useState({
  //   jobTitle: '',
  //   status: '',
  //   hiringManager: '',
  //   lastName: '',
  //   company: '',
  //   email: '',
  //   employeeType: '',
  //   source: '',
  //   WorkplaceType: '',
  //   availabilityDate: null,
  //   referredBy: '',
  //   categories: '',
  //   JobType: '',
  //   groups: '',
  //   Department: '',
  //   Seniority: '',
  //   JobFunction: '',
  //   address: '',
  //   workPhone: '',
  //   mobilePhone: '',
  //   projectDescription: '',
  // });
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

  {/* Side bar start */ }

  const [visibleRight, setVisibleRight] = useState(false);
  const [jobTitle, setJobTitle] = useState('');

  // List of job status options
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Define the options for Job Status
  const jobStatuses = [
    { name: 'Active', code: 'active' },
    { name: 'Closed', code: 'closed' },
    { name: 'On Hold', code: 'onhold' },
    { name: 'Cancelled', code: 'cancelled' },
    { name: 'Archived', code: 'archived' }
  ];

  // Toggle dropdown open/close
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // const [openings, setOpenings] = useState(null);
  const [value3, setValue3] = useState(null);

  const [hiringManager, setHiringManager] = useState(null);
  const [company, setCompany] = useState(null);
  const [jobLocation, setJobLocation] = useState(null);
  const [workplaceType, setWorkplaceType] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedJobFunction, setSelectedJobFunction] = useState(null);
  const [selectedSeniority, setSelectedSeniority] = useState(null);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [minSalary, setMinSalary] = useState(null);
  const [maxSalary, setMaxSalary] = useState(null);

  // Options for skills (you can replace with your actual data)
  const skillsOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'python' },
    // Add more options here
  ];

  // Handler for when the skills are selected or changed
  const handleSkillsChange = (e) => {
    setSelectedSkills(e.value);
  };

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

  const workplaceTypes = [
    { name: 'Remote', code: 'remote' },
    { name: 'Hybrid', code: 'hybrid' },
    { name: 'On-site', code: 'onsite' },
  ];

  const jobTypes = [
    { name: 'Full-Time', code: 'FT' },
    { name: 'Part-Time', code: 'PT' },
    { name: 'Contract', code: 'CT' },
    { name: 'Internship', code: 'IN' },
  ];

  // State to manage which form is being shown
  const [currentForm, setCurrentForm] = useState(1);

  // Handler for "Next" button click to go to next form
  const handleNext = () => {
    setCurrentForm(currentForm + 1);
  };

  // Handler for "Previous" button click to go to previous form
  const handlePrevious = () => {
    setCurrentForm(currentForm - 1);
  };

  const [formSkill1, setFormSkill1] = useState('');
  const [formSkill2, setFormSkill2] = useState('');
  const [formSkill3, setFormSkill3] = useState('');

  const [formNumber1, setFormNumber1] = useState('');
  const [formNumber2, setFormNumber2] = useState('');
  const [formNumber3, setFormNumber3] = useState('');

  const handleNumberChange = (e, setFormNumber) => {
    // Ensures only numeric values are allowed
    const value = e.target.value;
    if (!isNaN(value)) {
      setFormNumber(value);
    }
  };

  const [formCheckbox1, setFormCheckbox1] = useState(null);
  const [formCheckbox2, setFormCheckbox2] = useState(null);
  const [formCheckbox3, setFormCheckbox3] = useState(null);

  const [description, setDescription] = useState('');


  {/* Side bar end */ }

  const [selectedJobs, setSelectedJobs] = useState([]);

  // Options for "Link Jobs" with sub-options for each status
  const moreJobsOptions = [
    {
      name: 'Link Jobs', code: 'linkJobs', items: [
        { name: 'As Received', code: 'received' },
        { name: 'As Potential', code: 'potential' },
        { name: 'As Submitted', code: 'submitted' }
      ]
    }
  ];

  const handleJobStatusChange = (e) => {
    setSelectedJobs(e.value);
  };

  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card className="card">
                <CardBody className="cardbody">
                  <div className="card accordian-menu">
                    <TabView
                      activeIndex={activeIndex}
                      onTabChange={e => setActiveIndex(e.index)}
                    >
                      {tabs.map((tab, index) => (
                        <TabPanel
                          key={tab.key}
                          header={
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                marginBottom: "3px",
                              }}
                            >
                              <i className={tab.iconClass}></i> {tab.header}
                            </div>
                          }
                          closable={index > 0}
                          onTabClose={() => onTabClose(index)}
                        >
                          <p className="m-0">{tab.content}</p>
                        </TabPanel>
                      ))}
                    </TabView>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="align-items-center pt-3 pb-3 breadcrumb-card">
            <Col md={12} lg={8}>

              <button
                type="button"
                className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1 mb-1"
                data-bs-container="body"
                data-bs-toggle="popover"
                data-bs-placement="top"
                data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                onClick={() => setVisibleRight(true)}

              >
                <i className="fa-regular fa-user me-1"></i> Add a Job
              </button>

              <Dropdown
                value={selectedSchedule}
                onChange={(e) => setSelectedSchedule(e.value)}
                options={scheduleOptions}
                optionLabel="name"
                editable
                placeholder="Select Schedule Type"
                className="jobac me-1 mb-1"
              />

              <MultiSelect
                value={selectedJobs}
                onChange={handleJobStatusChange}
                options={moreJobsOptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren="items"  
                placeholder="Select More Jobs"
                display="chip"  
                className="me-1"
              />

              <Dropdown value={selectedMore}
                onChange={(e) => setSelectedMore(e.value)}
                options={moreoptions}
                optionLabel="name"
                placeholder="More" className="jobac mb-1" />

            </Col>

            <Col md={12} lg={4}>
              <div className="d-flex float-end">
                <div className="right-btn">
                  <button
                    type="button"
                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                  >
                    <i class="ti-import me-1"></i> Import Resume
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                  >
                    <i className="fa-solid fa-xmark"></i> Clear Search
                  </button>
                </div>
                <div className="right-btn">
                  <button
                    type="button"
                    class="btn btn-secondary import-res-btn waves-effect ms-1"
                    className="mainbtn mb-1"
                    data-bs-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    <i class="fa-solid fa-print"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary import-res-btn waves-effect ms-1"
                    className="mainbtn  mb-1"
                    data-bs-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    <i class="ti-export"></i>
                  </button>
                </div>
              </div>

            </Col>


          </Row>
          <Row>
            <Col sm={12}>
              <section className=''>
                <div className='MyMarginCls'></div>
                <div className="card mt-4">
                  <DataTable
                    // tableStyle={{ minWidth: '50rem' }}
                    tableStyle={{ minWidth: '50rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                    ref={dt}
                    value={customers}
                    paginator
                    rows={pageState.rows}
                    first={pageState.first}
                    rowsPerPageOptions={[5, 10, 25, 50]} // Rows per page options
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    onPage={onPage}
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    loading={loading}
                    globalFilterFields={['id', 'JobTitle', 'Status', 'Openings', 'HiringManager', 'Company', 'JobLocation', 'WorkplaceType', 'JobType', 'PrimarySkills', 'ExperienceRequired', 'MinSalary', 'MaxSalary', 'Department', 'JobFunction', 'Seniority', 'Categories', 'Groups', 'CreateDate', 'EditDate', 'CreatedBy']}
                    // header={header}
                    scrollable
                    emptyMessage="No customers found."
                    selection={selectedCustomers}
                    onSelectionChange={onSelectionChange}
                    selectionMode="multiple"
                    size={size}
                    reorderableRows
                    onRowReorder={onRowReorder}
                    rowGroupMode="rowspan"
                    rowClassName="row-bottom-color"  // Apply custom row style
                    totalRecords={customers.length}  // Ensure totalRecords is correctly set
                    // scrollHeight="400px"
                    editMode="cell"
                    // editMode="row"

                    resizableColumns // Enable resizable columns
                    columnResizeMode="expand" // Choose between "fit" or "expand"
                  >
                    {/* <Column rowReorder style={{ width: '3em' }} /> */}
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                    <Column field="JobId" sortable header="Job ID" filter filterPlaceholder="Search by job title" style={{ minWidth: '12rem' }} />
                    <Column field="JobTitle" sortable header="Job Title" filter filterPlaceholder="Search by job title" style={{ minWidth: '12rem' }} />
                    <Column field="Status" header="Job Status" sortable filter filterPlaceholder="Search by status" style={{ minWidth: '12rem' }}
                      body={(rowData) => {
                        const status = rowData.Status; // Assuming 'Status' is the field name in your data
                        let badgeClass = '';
                        // Define the badge style based on the status value
                        switch (status) {
                          case 'Active':
                            badgeClass = 'p-badge-success';
                            break;
                          case 'Inactive':
                            badgeClass = 'p-badge-secondary';
                            break;
                          case 'Pending':
                            badgeClass = 'p-badge-warning';
                            break;
                          case 'Completed':
                            badgeClass = 'p-badge-info';
                            break;
                          default:
                            badgeClass = 'p-badge-outline';
                            break;
                        }
                        return (
                          <span className={`p-badge ${badgeClass}`}>
                            {status}
                          </span>
                        );
                      }}
                    />
                    <Column field="Openings" sortable header="Openings" filter filterPlaceholder="Search by experience" style={{ minWidth: '15rem' }} />
                    <Column field="HiringManager" sortable header="Hiring Manager" frozen filter filterPlaceholder="Search by first name" style={{ minWidth: '12rem' }} editor={(options) => firstnameEditor(options)} onCellEditComplete={onCellEditComplete} />
                    <Column field="Company" sortable header="Company" filter filterPlaceholder="Search by company" style={{ minWidth: '12rem' }} />
                    <Column field="JobLocation" header="Job Location" sortable filter filterPlaceholder="Search by Job location" style={{ minWidth: '12rem' }} />
                    <Column field="WorkplaceType" sortable header="Workplace Type" filter filterPlaceholder="Search by workplace type" style={{ minWidth: '12rem' }} />
                    <Column field="JobType" sortable header="Job Type" filter filterPlaceholder="Search by skills" style={{ minWidth: '12rem' }} />
                    <Column field="PrimarySkills" header="Primary Skills" sortable filter filterPlaceholder="Search by skills" style={{ minWidth: '12rem' }} />
                    <Column field="ExperienceRequired" sortable header="Experience Required" filter filterPlaceholder="Search by experience" style={{ minWidth: '15rem' }} />
                    <Column field="MinSalary" sortable header="Min Salary" filter filterPlaceholder="Search by min salary" style={{ minWidth: '15rem' }} />
                    <Column field="MaxSalary" sortable header="Max Salary" filter filterPlaceholder="Search by max salary" style={{ minWidth: '15rem' }} />
                    <Column field="Department" header="Department" sortable filter filterPlaceholder="Search by department" style={{ minWidth: '12rem' }} />
                    <Column field="JobFunction" header="Job Function" sortable filter filterPlaceholder="Search by job function" style={{ minWidth: '12rem' }} />
                    <Column field="Seniority" header="Seniority" sortable filter filterPlaceholder="Search by seniority" style={{ minWidth: '12rem' }} />
                    <Column field="Categories" sortable header="Category" filter filterPlaceholder="Search by category" style={{ minWidth: '12rem' }} editor={(options) => firstnameEditor1(options)} onCellEditComplete={onCellEditComplete} />
                    <Column field="Group" sortable header="Group" filter filterPlaceholder="Search by group" style={{ minWidth: '12rem' }} editor={(options) => firstnameEditor1(options)} onCellEditComplete={onCellEditComplete} />
                    <Column field="CreateDate" header="Create Date" sortable filter filterPlaceholder="Search by create date" style={{ minWidth: '12rem' }} />
                    <Column field="EditDate" header="Edit Date" sortable filter filterPlaceholder="Search by edit date" style={{ minWidth: '12rem' }} />
                    <Column field="CreatedBy" header="Created By" sortable filter filterPlaceholder="Search by creator" style={{ minWidth: '12rem' }} />
                    <Column style={{ minWidth: '12rem' }}
                      header="Action"
                      body={(rowData) => (
                        <div className="d-flex p-ai-center p-gap-2">
                          <Button
                            icon="pi pi-pencil"
                            onClick={() => { setaddedit(true) }}
                            title="Edit"
                            className="p-button-info p-button-rounded p-button-sm mr-2"
                          />
                          <Button
                            icon="pi pi-trash"
                            className="p-button-danger p-button-rounded p-button-sm"
                            onClick={() => setSuccessAlert(true)}
                            title="Delete"
                          />
                        </div>
                      )}
                    />
                    {/* <Column
                                body={(rowData) => (
                                   
                                )}
                            /> */}
                  </DataTable>
                </div>
              </section>
            </Col>
          </Row>

          {/* Side bar start */}
          <Row>
            <Col lg={12}>
              <div className="card">
                {/* <div className="flex gap-2 justify-content-center">

                  <Button icon="pi pi-arrow-left" onClick={() => setVisibleRight(true)} />
                </div> */}

                <Sidebar visible={visibleRight} position="right" className="sidebar" onHide={() => setVisibleRight(false)}>
                  <div className="sidebar-header">
                    <h3>Create a Job</h3>
                    <Button
                      icon="pi pi-times"
                      className="p-button-text close-btn"
                      onClick={() => setVisibleRight(false)}
                    />
                  </div>
                  <div className="card sidebardetails">
                    {currentForm === 1 && (
                      <form>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <a href="#" className="editicon">
                              <p className="mb-0">Edit this form <i class="fa-regular fa-pen-to-square"></i> </p>
                            </a>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <h2 className="heading">Job Details *</h2>
                          </Col>
                          <Col lg={6}>
                            <div className="p-field">
                              <label htmlFor="jobTitle" className="p-d-block">Job Title</label>
                              <InputText
                                id="jobTitle"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Job Title"
                                className="p-d-block"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="p-field">
                              <label htmlFor="company">Company</label>
                              <Dropdown
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.value)}
                                options={companies}
                                optionLabel="name"
                                filter
                                filterPlaceholder="Search Company"
                                className="w-full activejobdrop"
                                placeholder="Enter company details..."
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col lg={6}>
                            <div className="p-field">
                              <label htmlFor="workplaceType">Workplace Type</label>
                              <Dropdown
                                id="workplaceType"
                                value={workplaceType}
                                onChange={(e) => setWorkplaceType(e.value)}
                                options={workplaceTypes}
                                optionLabel="name"
                                filter
                                filterPlaceholder="Search Workplace Type"
                                className="w-full activejobdrop"
                                placeholder="Enter workplace type..."
                              />
                            </div>
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
                                placeholder="Enter job location..."
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col lg={6}>
                            <div className="">
                              <label htmlFor="jobType">Job Type</label>
                              <Dropdown
                                id="jobType"
                                value={jobType}
                                onChange={(e) => setJobType(e.value)}
                                options={jobTypes}
                                optionLabel="name"
                                filter
                                filterPlaceholder="Search Job Type"
                                className="w-full activejobdrop"
                                placeholder="Enter job type..."
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light aibtn"
                            >
                              <i class="fa-regular fa-star me-1"></i>
                              Write new with AI
                            </Button>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <div className="">
                              <label htmlFor="jobType">Description</label>
                              <InputTextarea
                                autoResize
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={12}
                                cols={30}
                                placeholder="Enter a description..."
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light me-2 sidebarbtn"
                            >
                              Create
                            </Button>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light outlinebtn me-2"
                              onClick={handleNext}
                            >
                              Save and Next
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    )}
                    {currentForm === 2 && (
                      <form id="">
                        <Row className="mb-3">
                          <Col lg={12}>
                            <a href="#" className="editicon">
                              <p className="mb-0">Edit this form <i class="fa-regular fa-pen-to-square"></i> </p>
                            </a>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={6}>
                            <div className="p-field">
                              <label htmlFor="hiringManager">Hiring Manager</label>
                              <Dropdown
                                id="hiringManager"
                                value={hiringManager}
                                onChange={(e) => setHiringManager(e.value)}
                                options={hiringManagers}
                                optionLabel="name"
                                filter
                                filterPlaceholder="Search Hiring Manager"
                                className="w-full activejobdrop"
                                placeholder="Enter hiring manager's name..."
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <label htmlFor="minmax-buttons">Openings</label><br></br>
                            <InputNumber inputId="minmax-buttons"
                              value={value3} onValueChange={(e) => setValue3(e.value)}
                              mode="decimal"
                              showButtons
                              min={0}
                              max={100}
                              placeholder="Enter number of openings..." />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col lg={6}>
                            <label>Job Status</label>
                            <Dropdown
                              value={selectedStatus}
                              onChange={(e) => setSelectedStatus(e.value)}
                              options={jobStatuses}
                              optionLabel="name"
                              placeholder="Select Job Status"
                              className="w-full activejobdrop"
                            />
                          </Col>
                          <Col lg={6}>
                            <label htmlFor="experience">Experience Required (in years) </label>
                            <InputText
                              id="experience"
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                              placeholder="Enter years of experience"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <label htmlFor="salary">Advertised Salary </label>
                            <InputText
                              id="salary"
                              value={salary}
                              onChange={(e) => setSalary(e.target.value)}
                              placeholder="Enter salary"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <label htmlFor="minSalary">Min Salary </label><br></br>
                            <InputNumber
                              id="minSalary"
                              value={minSalary}
                              onValueChange={(e) => setMinSalary(e.value)}
                              placeholder="Enter minimum salary"
                              mode="currency"
                              currency="USD"
                              locale="en-US"
                              className="minmaxsal"
                            />
                          </Col>
                          <Col>
                            <label htmlFor="maxSalary">Max Salary </label><br></br>
                            <InputNumber
                              id="maxSalary"
                              value={maxSalary}
                              onValueChange={(e) => setMaxSalary(e.value)}
                              placeholder="Enter maximum salary"
                              mode="currency"
                              currency="USD"
                              locale="en-US"
                              className="minmaxsal"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light me-2 sidebarbtn"
                              onClick={handlePrevious}
                            >
                              Previous
                            </Button>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light outlinebtn me-2"
                              onClick={handleNext}
                            >
                              Save and Next
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    )}
                    {currentForm === 3 && (
                      <form id="">
                        <Row className="">
                          <Col lg={12}>
                            <h2 className="heading mb-0">Screening Questions</h2>
                            <p>We recommend adding 3 or more questions. Applicants must answer each question.</p>
                          </Col>
                        </Row>

                        <Row className="mb-5">
                          <Col lg={12} className="howyearsbg">
                            <label>How many years of work experience do you have with [skill]?</label>
                            <Row>
                              <Col lg={4}>
                                <label>Skill</label>
                                <InputText
                                  value={formSkill1}
                                  onChange={(e) => setFormSkill1(e.target.value)}
                                  placeholder="Enter your first skill"
                                />
                              </Col>
                              <Col lg={4}>
                                <label>Ideal answer (min)</label>
                                <InputText
                                  value={formNumber1}
                                  onChange={(e) => handleNumberChange(e, setFormNumber1)}
                                  placeholder="Enter a number"
                                />
                              </Col>
                              <Col lg={4}>
                                <label></label><br></br>
                                <TriStateCheckbox
                                  value={formCheckbox1}
                                  onChange={(e) => setFormCheckbox1(e.value)}
                                  placeholder="Select an option"
                                />
                                <label>Must have qualification</label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row className="mb-5">
                          <Col lg={12} className="howyearsbg">
                            <label>How many years of work experience do you have with [skill]?</label>
                            <Row>
                              <Col lg={4}>
                                <label>Skill</label>
                                <InputText
                                  value={formSkill2}
                                  onChange={(e) => setFormSkill2(e.target.value)}
                                  placeholder="Enter your second skill"
                                />
                              </Col>
                              <Col lg={4}>
                                <label>Ideal answer (min)</label>
                                <InputText
                                  value={formNumber2}
                                  onChange={(e) => handleNumberChange(e, setFormNumber2)}
                                  placeholder="Enter a number"
                                />
                              </Col>
                              <Col lg={4}>
                                <label></label><br></br>
                                <TriStateCheckbox
                                  value={formCheckbox2}
                                  onChange={(e) => setFormCheckbox2(e.value)}
                                  placeholder="Select an option"
                                />
                                <label>Must have qualification</label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row className="mb-4">
                          <Col lg={12} className="howyearsbg">
                            <label>How many years of work experience do you have with [skill]?</label>
                            <Row>
                              <Col lg={4}>
                                <label>Skill</label>
                                <InputText
                                  value={formSkill3}
                                  onChange={(e) => setFormSkill3(e.target.value)}
                                  placeholder="Enter your third skill"
                                />
                              </Col>
                              <Col lg={4}>
                                <label>Ideal answer (min)</label>
                                <InputText
                                  value={formNumber3}
                                  onChange={(e) => handleNumberChange(e, setFormNumber3)}
                                  placeholder="Enter a number"
                                />
                              </Col>
                              <Col lg={4}>
                                <label></label><br></br>
                                <TriStateCheckbox
                                  value={formCheckbox3}
                                  onChange={(e) => setFormCheckbox3(e.value)}
                                  placeholder="Select an option"
                                />
                                <label>Must have qualification</label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light me-2 sidebarbtn"
                              onClick={handlePrevious}
                            >
                              Previous
                            </Button>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light outlinebtn me-2"

                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    )}
                  </div>

                </Sidebar>
              </div>
            </Col>
          </Row>
          {/* Side bar end */}


        </Container>
      </div>
    </React.Fragment>
  );
};
export default JobsAllactiveemp;
