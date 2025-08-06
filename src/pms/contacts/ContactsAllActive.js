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
import { Dropdown as ReactstrapDropdown } from 'reactstrap';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from "primereact/tabview"
import { Link, useLocation } from "react-router-dom"
import { Chips } from "primereact/chips";
import { InputMask } from 'primereact/inputmask';
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
import { ContextMenu } from 'primereact/contextmenu';
import Select from 'react-select';

import NotesContact from '../common-for-all/NotesContact'
import NotesContact1 from '../common-for-all/NotesContactNames'
import LinkContactsPopup from "pms/common-for-all/LinkContactsPopup";
import LinkContact2Popup from "pms/common-for-all/LinkContact2Popup";
import LinkCandidatesPopup from "pms/common-for-all/LinkCandidatesPopup";
import LinkContactJob from "pms/common-for-all/LinkContactJob";
import SubmitContacttoCandidate from "./SubmitContacttoCandidate";
import MoreACcontacts from "./MoreACcontacts";
import EmailContacts from "./EmailContacts";
import AddJob from "./AddJob";

import { useSelector } from "react-redux"


const ContactsAllActive = () => {

  const { first, rows, } = useSelector(
    state => state.calendar.pagination
  )


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
    { name: 'Hyderabad', code: 'HYD' },
    { name: 'Chennai', code: 'CHN' },
    { name: 'Mumbai', code: 'MUM' },
    { name: 'Bangalore', code: 'BLR' },
    { name: 'Delhi', code: 'DEL' },
  ]

  const addStates = [
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Telangana', code: 'TG' },
    { name: 'Tamil Nadu', code: 'TN' },
    { name: 'Karnataka', code: 'KA' },
    { name: 'Kerala', code: 'KL' },
  ]

  const addCountries = [
    { name: "India", code: "IN" },
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "Australia", code: "AU" },
  ]

  const labels = [
    { name: "Work from Office", code: "WORK" },
    { name: "Work from Home", code: "HOME" },
    { name: "Work from Remote", code: "REMOTE" }
  ]

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
    jobTitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    mobile: { value: null, matchMode: FilterMatchMode.CONTAINS },
    department: { value: null, matchMode: FilterMatchMode.CONTAINS },
    associatedContacts: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    group: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastActivityDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    editDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedContacts, setSelectedContacts] = useState([]);

  const [contactData, setContactData] = useState([
    {
      id: 1,
      firstName: 'Mahesh Kumar',
      lastName: 'Bhoga',
      company: 'Varun Digital Media',
      jobTitle: 'UI/UX Manager',
      email: 'mahesh9@varundigitalmedia.com',
      mobile: '987-654-3210',
      associatedContacts: "Salmanuddin Syed",
      department: 'UI/UX',
      address: '123 Main St, Hyderabad',
      notes: 'Potential client for project X.',
      category: 'UI/UX',
      group: 'Web Development',
      createdBy: 'Harish',
      userId: 'Harish',
      lastActivityDate: '05-01-2025',
      createDate: '15-12-2024',
      editDate: '08-01-2025',
    },
    {
      id: 2,
      firstName: 'Salmanuddin ',
      lastName: 'Syed',
      company: 'Varun Digital Media',
      jobTitle: 'Operation Head',
      email: 'salman@varundigitalmedia.com',
      mobile: '987-654-3211',
      associatedContacts: "Girish Bodepu",
      department: 'Marketing',
      address: 'Begumpet, Hyderabad',
      notes: 'Interested in joint marketing campaigns.',
      category: 'Digital Marketing',
      group: 'Sales',
      createdBy: 'Harish',
      userId: 'Harish',
      lastActivityDate: '03-01-2025',
      createDate: '20-12-2024',
      editDate: '09-01-2025',
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Brown',
      company: 'FinancePro',
      jobTitle: 'Accountant',
      email: 'michael.brown@financepro.com',
      mobile: '555-789-1234',
      associatedContacts: "Suresh Reddy",
      department: 'Finance',
      address: '789 Pine St, San Francisco, USA',
      notes: 'Handling tax consultations.',
      category: 'Vendor',
      group: 'Low Priority',
      createdBy: 'Admin',
      userId: 'MB003',
      lastActivityDate: '207-01-2025',
      createDate: '10-12-2024',
      editDate: '08-01-2025',
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'White',
      company: 'HealthCo',
      jobTitle: 'HR Manager',
      email: 'emily.white@healthco.com',
      mobile: '444-555-6666',
      associatedContacts: "Ravi Kumar",
      department: 'Human Resources',
      address: '101 Maple Ave, Boston, USA',
      notes: 'Looking for recruitment solutions.',
      category: 'Client',
      group: 'High Priority',
      createdBy: 'Admin',
      userId: 'EW004',
      lastActivityDate: '08-01-2025',
      createDate: '01-12-2024',
      editDate: '09-01-2025',
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Taylor',
      company: 'Innovatech',
      jobTitle: 'CTO',
      email: 'david.taylor@innovatech.com',
      mobile: '333-222-1111',
      associatedContacts: "Neha Patel",
      department: 'Technology',
      address: '202 Birch St, Seattle, USA',
      notes: 'Exploring partnership for AI projects.',
      category: 'Partner',
      group: 'High Priority',
      createdBy: 'Admin',
      userId: 'DT005',
      lastActivityDate: '04-01-2025',
      createDate: '15-12-2024',
      editDate: '08-01-2025',
    },
    {
      id: 6,
      firstName: 'Sophia',
      lastName: 'Green',
      company: 'EcoWorks',
      jobTitle: 'Project Manager',
      email: 'sophia.green@ecoworks.com',
      mobile: '123-987-6543',
      associatedContacts: "Girish Bodepu",
      department: 'Sustainability',
      address: '303 Cedar Rd, Denver, USA',
      notes: 'Discussing renewable energy initiatives.',
      category: 'Client',
      group: 'Medium Priority',
      createdBy: 'Admin',
      userId: 'SG006',
      lastActivityDate: '06-01-2025',
      createDate: '10-12-2024',
      editDate: '08-01-2025',
    },
    {
      id: 7,
      firstName: 'Chris',
      lastName: 'Wilson',
      company: 'DevNet',
      jobTitle: 'Software Developer',
      email: 'chris.wilson@devnet.com',
      mobile: '321-654-9870',
      associatedContacts: "Salmanuddin Syed",
      department: 'Development',
      address: '404 Spruce Dr, Austin, USA',
      notes: 'Involved in API development.',
      category: 'Client',
      group: 'Low Priority',
      createdBy: 'Admin',
      userId: 'CW007',
      lastActivityDate: '09-01-2025',
      createDate: '25-12-2024',
      editDate: '08-01-2025',
    },
    {
      id: 8,
      firstName: 'Olivia',
      lastName: 'Johnson',
      company: 'MediCare',
      jobTitle: 'Operations Manager',
      email: 'olivia.johnson@medicare.com',
      mobile: '888-777-9999',
      associatedContacts: "Ravi Kumar",
      department: 'Operations',
      address: '505 Elm St, Houston, USA',
      notes: 'Needs assistance with logistics.',
      category: 'Vendor',
      group: 'Medium Priority',
      createdBy: 'Admin',
      userId: 'OJ008',
      lastActivityDate: '02-01-2025',
      createDate: '05-12-2024',
      editDate: '08-01-2025',
    },
    {
      id: 9,
      firstName: 'Liam',
      lastName: 'Martinez',
      company: 'BuildTech',
      jobTitle: 'Architect',
      email: 'liam.martinez@buildtech.com',
      mobile: '666-555-4444',
      associatedContacts: "Neha Patel",
      department: 'Architecture',
      address: '606 Walnut St, San Diego, USA',
      notes: 'Discussing design collaboration.',
      category: 'Partner',
      group: 'High Priority',
      createdBy: 'Admin',
      userId: 'LM009',
      lastActivityDate: '05-01-2025',
      createDate: '20-01-2025',
      editDate: '09-01-2025',
    },
    {
      id: 10,
      firstName: 'Ava',
      lastName: 'Lopez',
      company: 'FoodWorld',
      jobTitle: 'Chef',
      email: 'ava.lopez@foodworld.com',
      mobile: '777-888-9999',
      associatedContacts: "Girish Bodepu",
      department: 'Culinary',
      address: '707 Cherry Ln, Miami, USA',
      notes: 'Planning catering for the event.',
      category: 'Vendor',
      group: 'Low Priority',
      createdBy: 'Admin',
      userId: 'AL010',
      lastActivityDate: '07-01-2025',
      createDate: '10-01-2025',
      editDate: '08-01-2025',
    },
    {
      id: 11,
      firstName: 'Ethan',
      lastName: 'Martinez',
      company: 'TechSphere',
      jobTitle: 'IT Consultant',
      email: 'ethan.martinez@techsphere.com',
      mobile: '666-555-4444',
      associatedContacts: "Neha Patel",
      department: 'IT Solutions',
      address: '901 Oak St, Austin, USA',
      notes: 'Assisting with cloud migration strategy.',
      category: 'Vendor',
      group: 'High Priority',
      createdBy: 'Manager',
      userId: 'EM021',
      lastActivityDate: '15-01-2025',
      createDate: '10-01-2025',
      editDate: '10-01-2025',
    },
    {
      "id": 12,
      "firstName": "Rajesh",
      "lastName": "Verma",
      "company": "TechSolutions",
      "jobTitle": "Software Engineer",
      "email": "rajesh.verma@techsolutions.com",
      "mobile": "999-888-7777",
      "associatedContacts": "Anita Sharma",
      "department": "Development",
      "address": "12 MG Road, Mumbai, India",
      "notes": "Interested in full-stack development projects.",
      "category": "Client",
      "group": "Medium Priority",
      "createdBy": "Admin",
      "userId": "RV012",
      "lastActivityDate": "10-01-2025",
      "createDate": "05-12-2024",
      "editDate": "08-01-2025"
    },
    {
      "id": 13,
      "firstName": "Anita",
      "lastName": "Sharma",
      "company": "WebSoft",
      "jobTitle": "UI/UX Designer",
      "email": "anita.sharma@websoft.com",
      "mobile": "888-777-6666",
      "associatedContacts": "Rajesh Verma",
      "department": "UI/UX",
      "address": "45 Residency Road, Bangalore, India",
      "notes": "Looking for collaboration in design projects.",
      "category": "UI/UX",
      "group": "High Priority",
      "createdBy": "Admin",
      "userId": "AS013",
      "lastActivityDate": "09-01-2025",
      "createDate": "12-12-2024",
      "editDate": "08-01-2025"
    },
    {
      "id": 14,
      "firstName": "Suresh",
      "lastName": "Reddy",
      "company": "FinCorp",
      "jobTitle": "Finance Manager",
      "email": "suresh.reddy@fincorp.com",
      "mobile": "777-666-5555",
      "associatedContacts": "Ravi Patel",
      "department": "Finance",
      "address": "22 Park Street, Hyderabad, India",
      "notes": "Managing financial planning and analysis.",
      "category": "Vendor",
      "group": "Medium Priority",
      "createdBy": "Admin",
      "userId": "SR014",
      "lastActivityDate": "11-01-2025",
      "createDate": "15-12-2024",
      "editDate": "08-01-2025"
    },
    {
      "id": 15,
      "firstName": "Neha",
      "lastName": "Patel",
      "company": "GreenEnergy",
      "jobTitle": "Project Coordinator",
      "email": "neha.patel@greenenergy.com",
      "mobile": "666-555-4444",
      "associatedContacts": "Suresh Reddy",
      "department": "Sustainability",
      "address": "101 Nehru Road, Ahmedabad, India",
      "notes": "Interested in renewable energy initiatives.",
      "category": "Client",
      "group": "High Priority",
      "createdBy": "Admin",
      "userId": "NP015",
      "lastActivityDate": "08-01-2025",
      "createDate": "20-12-2024",
      "editDate": "09-01-2025"
    },
    {
      "id": 16,
      "firstName": "Vikram",
      "lastName": "Chopra",
      "company": "LogiTech",
      "jobTitle": "Operations Head",
      "email": "vikram.chopra@logitech.com",
      "mobile": "555-444-3333",
      "associatedContacts": "Amit Dubey",
      "department": "Operations",
      "address": "67 Ashok Nagar, Pune, India",
      "notes": "Handling supply chain logistics.",
      "category": "Vendor",
      "group": "Low Priority",
      "createdBy": "Admin",
      "userId": "VC016",
      "lastActivityDate": "06-01-2025",
      "createDate": "18-12-2024",
      "editDate": "08-01-2025"
    },
    {
      "id": 17,
      "firstName": "Amit",
      "lastName": "Dubey",
      "company": "SoftCom",
      "jobTitle": "IT Manager",
      "email": "amit.dubey@softcom.com",
      "mobile": "444-333-2222",
      "associatedContacts": "Vikram Chopra",
      "department": "IT Solutions",
      "address": "34 Banjara Hills, Hyderabad, India",
      "notes": "Assisting with software development strategy.",
      "category": "Vendor",
      "group": "Medium Priority",
      "createdBy": "Admin",
      "userId": "AD017",
      "lastActivityDate": "07-01-2025",
      "createDate": "22-12-2024",
      "editDate": "08-01-2025"
    },
    {
      "id": 18,
      "firstName": "Ravi",
      "lastName": "Kumar",
      "company": "InfraTech",
      "jobTitle": "Civil Engineer",
      "email": "ravi.kumar@infratech.com",
      "mobile": "333-222-1111",
      "associatedContacts": "Neha Patel",
      "department": "Construction",
      "address": "99 JP Nagar, Bangalore, India",
      "notes": "Exploring collaboration for new projects.",
      "category": "Partner",
      "group": "High Priority",
      "createdBy": "Admin",
      "userId": "RK018",
      "lastActivityDate": "05-01-2025",
      "createDate": "10-12-2024",
      "editDate": "08-01-2025"
    },
    {
      "id": 19,
      "firstName": "Priya",
      "lastName": "Mehta",
      "company": "EduTech",
      "jobTitle": "Training Coordinator",
      "email": "priya.mehta@edutech.com",
      "mobile": "222-111-0000",
      "associatedContacts": "Ravi Kumar",
      "department": "Education",
      "address": "12 Gandhi Street, Chennai, India",
      "notes": "Organizing workshops for corporate training.",
      "category": "Client",
      "group": "Medium Priority",
      "createdBy": "Admin",
      "userId": "PM019",
      "lastActivityDate": "04-01-2025",
      "createDate": "15-12-2024",
      "editDate": "08-01-2025"
    },
    {
      "id": 20,
      "firstName": "Sunil",
      "lastName": "Kapoor",
      "company": "MediCare",
      "jobTitle": "Medical Advisor",
      "email": "sunil.kapoor@medicare.com",
      "mobile": "111-222-3333",
      "associatedContacts": "Priya Mehta",
      "department": "Healthcare",
      "address": "56 Victoria Road, Kolkata, India",
      "notes": "Advising on healthcare infrastructure.",
      "category": "Client",
      "group": "High Priority",
      "createdBy": "Admin",
      "userId": "SK020",
      "lastActivityDate": "03-01-2025",
      "createDate": "10-12-2024",
      "editDate": "08-01-2025"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState({ rows: 10, first: 0 });

  const dt = useRef(null);

  // document table starts
  const [editingRow, setEditingRow] = useState(null);
  const [editedValue, setEditedValue] = useState({});
  const [documents, setDocuments] = useState([
    {
      key: "1",
      data: {
        id: "1",
        docType: "Hiring Manager Profile",
        docSubject: "Recruitment Contact - Mahesh Kumar Boga",
        appliedDateTime: "2023-10-01 10:30 AM",
      },
    },
    {
      key: "2",
      data: {
        id: "2",
        docType: "Hiring Manager Meeting Notes",
        docSubject: "Meeting Notes - Mahesh Kumar Boga - Varun Digital Media",
        appliedDateTime: "2023-10-02 02:15 PM",
      },
    },
  ]);

  // Start editing a row
  const handleEdit = (rowKey) => {
    setEditingRow(rowKey);
    setEditedValue(documents.find((doc) => doc.key === rowKey)?.data || {});
  };

  // Save changes
  const handleSave = () => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.key === editingRow ? { ...doc, data: editedValue } : doc
      )
    );
    setEditingRow(null);
  };

  // Delete a row
  const handleDelete = (rowKey) => {
    setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.key !== rowKey));
  };

  // Editable input field
  const editableTemplate = (rowData, field) => {
    return editingRow === rowData.key ? (
      <InputText
        value={editedValue[field] || ""}
        onChange={(e) => setEditedValue({ ...editedValue, [field]: e.target.value })}
        autoFocus
      />
    ) : (
      <span onClick={() => handleEdit(rowData.key)}>{rowData.data[field]}</span>
    );
  };

  // Action buttons
  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        {editingRow === rowData.key ? (
          <Button icon="pi pi-check" rounded outlined className="document-btn" onClick={handleSave} />
        ) : (
          <Button icon="pi pi-pencil" rounded outlined className="document-btn" onClick={() => handleEdit(rowData.key)} />
        )}
        <Button icon="pi pi-trash" rounded outlined className="document-btn" onClick={() => handleDelete(rowData.key)} />
      </div>
    );
  };

  // documents treetable ends
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
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Lavankumar Kalvala",
      contact: "lavan9@infosys.com",
      company: "Infosys",
      date_time: "01-01-2025 10:00 AM",
      user_id: "Harish",
    },
    {
      status: "In Progress",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Jane Smith",
      contact: "jane.smith@example.com",
      company: "Innovate Ltd.",
      date_time: "15-12-2024 02:30 PM",
      user_id: "Harish",
    },
    {
      status: "Closed",
      jobid: "Job-102",
      job_title: "Graphic Designer",
      candidate: "Bob Brown",
      contact: "bob9@example.com",
      company: "Analytics Inc.",
      date_time: "01-02-2025 09:00 AM",
      user_id: "Harish",
    },
    {
      status: "Closed",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Alice Carter",
      contact: "alice9@example.com",
      company: "Engineered Solutions",
      date_time: "05-02-2025 03:00 PM",
      user_id: "Harish",
    },
    {
      status: "Closed",
      jobid: "Job-102",
      job_title: "Graphic Designer",
      candidate: "Daniel Smith",
      contact: "daniel.smith@example.com",
      company: "PeopleFirst HR",
      date_time: "25-01-2025 11:30 AM",
      user_id: "Harish",
    },
    {
      status: "Closed",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Sophia Taylor",
      contact: "sophia.taylor@example.com",
      company: "Code Creators",
      date_time: "15-01-2025 02:15 PM",
      user_id: "Harish",
    },
    {
      status: "Closed",
      jobid: "Job-102",
      job_title: "Graphic Designer",
      candidate: "James Wilson",
      contact: "james.wilson@example.com",
      company: "AgilePro Management",
      date_time: "30-01-2025 04:45 PM",
      user_id: "Harish",
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
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Michael Clark",
      contact: "michael.clark@example.com",
      company: "AI Innovators",
      date_time: "15-02-2025 11:00 AM",
      user_id: "Harish",
    },

    {
      status: "In Progress",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Laura Green",
      contact: "laura.green@example.com",
      company: "Cloud Solutions",
      date_time: "10-02-2025 03:45 PM",
      user_id: "Harish",
    },
    {
      status: "Closed",
      jobid: "Job-102",
      job_title: "Graphic Designer",
      candidate: "Kevin Hill",
      contact: "kevin.hill@example.com",
      company: "TechOps Co.",
      date_time: "25-01-2025 09:30 AM",
      user_id: "Harish",
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
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Michael Clark",
      contact: "michael.clark@example.com",
      company: "AI Innovators",
      date_time: "15-02-2025 11:00 AM",
      user_id: "Harish",
    },

    {
      status: "Rejected",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Laura Green",
      contact: "laura.green@example.com",
      company: "Cloud Solutions",
      date_time: "10-02-2025 03:45 PM",
      user_id: "Harish",
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
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Lucas Williams",
      contact: "lucas.williams@example.com",
      company: "DevSolutions",
      date_time: "2025-03-05 09:30 AM",
      user_id: "56789",
    },
    {
      status: "Interview Scheduled",
      jobid: "Job-103",
      job_title: "UI/UX Designer",
      candidate: "Chloe Brown",
      contact: "chloe.brown@example.com",
      company: "Creative Studios",
      date_time: "2025-03-06 11:00 AM",
      user_id: "67890",
    },
    {
      status: "Interview Completed",
      jobid: "Job-102",
      job_title: "Data Scientist",
      candidate: "Oliver Harris",
      contact: "oliver.harris@example.com",
      company: "DataWorks",
      date_time: "2025-03-07 02:00 PM",
      user_id: "78901",
    },
    {
      status: "Interview Scheduled",
      jobid: "Job-101",
      job_title: "Product Manager",
      candidate: "Emily Davis",
      contact: "emily.davis@example.com",
      company: "Productive Inc.",
      date_time: "2025-03-08 04:00 PM",
      user_id: "89012",
    },
    {
      status: "Interview Scheduled",
      jobid: "Job-103",
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
      jobid: "Job-101",
      job_title: "Data Scientist",
      candidate: "John Doe",
      contact: "john.doe@example.com",
      company: "DataCorp",
      date_time: "2025-03-01 10:00 AM",
      user_id: "12345",
    },
    {
      status: "Submitted",
      jobid: "Job-102",
      job_title: "Software Engineer",
      candidate: "Jane Smith",
      contact: "jane.smith@example.com",
      company: "TechWorld",
      date_time: "2025-03-02 11:30 AM",
      user_id: "23456",
    },
    {
      status: "Submitted",
      jobid: "Job-103",
      job_title: "Product Manager",
      candidate: "Alex Lee",
      contact: "alex.lee@example.com",
      company: "InnovateX",
      date_time: "2025-03-03 02:00 PM",
      user_id: "34567",
    },
    {
      status: "Submitted",
      jobid: "Job-104",
      job_title: "Marketing Specialist",
      candidate: "Emily Davis",
      contact: "emily.davis@example.com",
      company: "MarketMinds",
      date_time: "2025-03-04 09:15 AM",
      user_id: "45678",
    },
    {
      status: "Submitted",
      jobid: "Job-101",
      job_title: "Product Manager",
      candidate: "Alex Lee",
      contact: "alex.lee@example.com",
      company: "InnovateX",
      date_time: "2025-03-03 02:00 PM",
      user_id: "34567",
    },
    {
      status: "Submitted",
      jobid: "Job-103",
      job_title: "Marketing Specialist",
      candidate: "Emily Davis",
      contact: "emily.davis@example.com",
      company: "MarketMinds",
      date_time: "2025-03-04 09:15 AM",
      user_id: "45678",
    },
    {
      status: "Submitted",
      jobid: "Job-102",
      job_title: "Product Manager",
      candidate: "Alex Lee",
      contact: "alex.lee@example.com",
      company: "InnovateX",
      date_time: "2025-03-03 02:00 PM",
      user_id: "34567",
    },
    {
      status: "Submitted",
      jobid: "Job-102",
      job_title: "Marketing Specialist",
      candidate: "Emily Davis",
      contact: "emily.davis@example.com",
      company: "MarketMinds",
      date_time: "2025-03-04 09:15 AM",
      user_id: "45678",
    },
    {
      status: "Submitted",
      jobid: "Job-101",
      job_title: "Product Manager",
      candidate: "Alex Lee",
      contact: "alex.lee@example.com",
      company: "InnovateX",
      date_time: "2025-03-03 02:00 PM",
      user_id: "34567",
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
      jobid: "Job-101",
      job_title: "Senior Data Scientist",
      candidate: "Johnathan Miles",
      contact: "johnathan.miles@example.com",
      company: "DataMinds",
      date_time: "2025-03-05 10:30 AM",
      user_id: "56789",
    },
    {
      status: "Offer Extended",
      jobid: "Job-102",
      job_title: "Backend Developer",
      candidate: "Sophie Turner",
      contact: "sophie.turner@example.com",
      company: "Tech Universe",
      date_time: "2025-03-06 02:15 PM",
      user_id: "67890",
    },
    {
      status: "Offer Accepted",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      candidate: "Michael Johnson",
      contact: "michael.johnson@example.com",
      company: "DevWorks",
      date_time: "2025-03-07 11:45 AM",
      user_id: "78901",
    },
    {
      status: "Offer Declined",
      jobid: "Job-101",
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
      jobid: "Job-101",
      job_title: "Full Stack Developer",
      candidate: "Natalie Perez",
      contact: "natalie.perez@example.com",
      company: "Tech Innovators",
      date_time: "2025-02-15 09:00 AM",
      user_id: "56789",
    },
    {
      status: "Placed",
      jobid: "Job-102",
      job_title: "Cloud Architect",
      candidate: "Daniela Brooks",
      contact: "daniela.brooks@example.com",
      company: "Cloud Masters",
      date_time: "2025-02-16 11:00 AM",
      user_id: "67890",
    },
    {
      status: "Placed",
      jobid: "Job-103",
      job_title: "Product Designer",
      candidate: "Ethan White",
      contact: "ethan.white@example.com",
      company: "DesignWorks",
      date_time: "2025-02-17 02:30 PM",
      user_id: "78901",
    },
    {
      status: "Placed",
      jobid: "Job-101",
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


  // view form Projects start
  
    const [projectData, setProjectData] = useState([
      {
        project_code: "Proj-101",
        project_name: "AI Generator",
        project_manager: "Mahesh Kumar Bhoga",
        task_count: "13",
        completed_tasks: "9",
        delay_reason: "Due to some issues",
        status: "Open",
        extended_end_date: "24-05-2025",
        experience_required: "3 Years",
        project_start_date: "01-01-2025",
        project_end_date: "31-12-2025",
      },
    ]);
  
    const [selectedProjects, setSelectedProjects] = useState([]);
  
    const [projectDataFilters, setProjectDataFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      project_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      project_manager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      task_count: { value: null, matchMode: FilterMatchMode.EQUALS },
      completed_tasks: { value: null, matchMode: FilterMatchMode.EQUALS },
      delay_reason: { value: null, matchMode: FilterMatchMode.CONTAINS },
      status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      extended_end_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
      experience_required: { value: null, matchMode: FilterMatchMode.CONTAINS },
      project_start_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
      project_end_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  
    const dateFilterTemplate = (options) => {
      return (
        <Calendar
          value={options.value}
          onChange={(e) => options.filterCallback(e.value, options.index)}
          dateFormat="dd-mm-yy"
          placeholder="dd-mm-yyyy"
          mask="99-99-9999"
        />
      );
    };
  
    // view form Projects end

     // View worktype start
    
      const CompanyProjects = [
        {
          task_code: "Task-101",
          task_type: "Task",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Sneha Mehta",
          module_name: "User Management",
          task_name: "Add User Role Feature",
          task_description: "Implement feature to add roles to a user account.",
          created_by: "Ravi Sharma",
          assigned_by: "Sneha Mehta",
          assigned_to: "Amit Verma",
          watchers: "Ravi Sharma, Sneha Mehta",
          start_date: "01-05-2025",
          work_hours: 12,
          end_date: "03-05-2025",
          actual_end_date: "02-05-2025",
          task_status: "To Do",
          priority: "High",
          approval_status: "Approved",
        },
        {
          task_code: "STask-101.1",
          task_type: "Sub Task",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Ankit Sinha",
          module_name: "Reporting",
          task_name: "Generate Monthly Report",
          task_description: "Automate monthly report generation for sales team.",
          created_by: "Priya Desai",
          assigned_by: "Ankit Sinha",
          assigned_to: "Kiran Rao",
          watchers: "Ankit Sinha",
          start_date: "04-05-2025",
          work_hours: 8,
          end_date: "05-05-2025",
          actual_end_date: "08-05-2025",
          task_status: "In Progress",
          priority: "Medium",
          approval_status: "Pending",
        },
        {
          task_code: "STask-101.2",
          task_type: "Sub Task",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Rahul Nair",
          module_name: "Authentication",
          task_name: "Fix Login Timeout Bug",
          task_description: "Resolve issue where session times out too early.",
          created_by: "Meena Iyer",
          assigned_by: "Rahul Nair",
          assigned_to: "Vikram Joshi",
          watchers: "Meena Iyer, Rahul Nair",
          start_date: "02-05-2025",
          work_hours: 5,
          end_date: "03-05-2025",
          actual_end_date: "03-05-2025",
          task_status: "In Review",
          priority: "High",
          approval_status: "Approved",
        },
        {
          task_code: "Bug-101.1",
          task_type: "Bug",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Rakesh Kumar",
          module_name: "Payroll Management",
          task_name: "Integrate PF Calculation",
          task_description:
            "Add logic to calculate Provident Fund based on salary slabs.",
          created_by: "Anita Reddy",
          assigned_by: "Rakesh Kumar",
          assigned_to: "Sanjay Mishra",
          watchers: "Anita Reddy, Rakesh Kumar",
          start_date: "04-05-2025",
          work_hours: 10,
          end_date: "06-05-2025",
          actual_end_date: "06-05-2025",
          task_status: "Testing / QA",
          priority: "Medium",
          approval_status: "Approved",
        },
        {
          task_code: "Task-102",
          task_type: "Task",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Neha Jain",
          module_name: "E-Invoice Integration",
          task_name: "Connect with GSTN APIs",
          task_description:
            "Establish API connectivity with the GST Network for invoice validation.",
          created_by: "Suresh Babu",
          assigned_by: "Neha Jain",
          assigned_to: "Rajeev Menon",
          watchers: "Suresh Babu, Neha Jain",
          start_date: "03-05-2025",
          work_hours: 16,
          end_date: "07-05-2025",
          actual_end_date: "07-05-2025",
          task_status: "Blocked",
          priority: "High",
          approval_status: "Pending",
        },
        {
          task_code: "STask-102.1",
          task_type: "Sub Task",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Vikas Patil",
          module_name: "Attendance Tracking",
          task_name: "Add Biometric Sync",
          task_description:
            "Implement sync between biometric device and central attendance module.",
          created_by: "Harsha Shetty",
          assigned_by: "Vikas Patil",
          assigned_to: "Nikhil Kapoor",
          watchers: "Harsha Shetty",
          start_date: "01-05-2025",
          work_hours: 6,
          end_date: "02-05-2025",
          actual_end_date: "02-05-2025",
          task_status: "Done",
          priority: "Low",
          approval_status: "Approved",
        },
        {
          task_code: "Bug-102.1",
          task_type: "Bug",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Manoj Bhatt",
          module_name: "Leave Management",
          task_name: "Bug Fix - Overlapping Leaves",
          task_description:
            "Fix the bug where multiple overlapping leaves are allowed.",
          created_by: "Deepika Saini",
          assigned_by: "Manoj Bhatt",
          assigned_to: "Alok Yadav",
          watchers: "Deepika Saini, Manoj Bhatt",
          start_date: "05-05-2025",
          work_hours: 4,
          end_date: "06-05-2025",
          actual_end_date: "07-05-2025",
          task_status: "Cancelled",
          priority: "Medium",
          approval_status: "Pending",
        },
        {
          task_code: "Bug-102.2",
          task_type: "Bug",
          project_name: "AI Generator (Proj-101)",
          project_manager: "Karthik Rao",
          module_name: "Performance Evaluation",
          task_name: "Add Employee Self-Review",
          task_description:
            "Develop form for employees to submit self-evaluation before appraisals.",
          created_by: "Anjali Menon",
          assigned_by: "Karthik Rao",
          assigned_to: "Tarun Singh",
          watchers: "Anjali Menon",
          start_date: "02-05-2025",
          work_hours: 9,
          end_date: "04-05-2025",
          actual_end_date: "03-05-2025",
          task_status: "To Do",
          priority: "High",
          approval_status: "Approved",
        },
        // {
        //   task_code: "Task-103",
        //   task_type: "Task",
        //   project_name: "AI Generator (Proj-101)",
        //   project_manager: "Nitin Sharma",
        //   module_name: "Project Dashboard",
        //   task_name: "Create Gantt Chart View",
        //   task_description: "Add a Gantt chart to visualize project timelines.",
        //   created_by: "Rajashree Banerjee",
        //   assigned_by: "Nitin Sharma",
        //   assigned_to: "Amit Choudhary",
        //   watchers: "Rajashree Banerjee, Nitin Sharma",
        //   start_date: "06-05-2025",
        //   work_hours: 14,
        //   end_date: "09-05-2025",
        //   actual_end_date: "07-05-2025",
        //   task_status: "In Progress",
        //   priority: "High",
        //   approval_status: "Pending",
        // },
        // {
        //   task_code: "STask-103.1",
        //   task_type: "Sub Task",
        //   project_name: "AI Generator (Proj-101)",
        //   project_manager: "Arun Pillai",
        //   module_name: "Notification Center",
        //   task_name: "Add SMS Alert Integration",
        //   task_description: "Integrate Twilio API to send SMS alerts to users.",
        //   created_by: "Pooja Srinivasan",
        //   assigned_by: "Arun Pillai",
        //   assigned_to: "Rohit Varma",
        //   watchers: "Pooja Srinivasan",
        //   start_date: "04-05-2025",
        //   work_hours: 7,
        //   end_date: "05-05-2025",
        //   actual_end_date: "05-05-2025",
        //   task_status: "In Review",
        //   priority: "Medium",
        //   approval_status: "Approved",
        // },
        // {
        //   task_code: "Bug-103.1",
        //   task_type: "Bug",
        //   project_name: "AI Generator (Proj-101)",
        //   project_manager: "Devansh Goyal",
        //   module_name: "File Management",
        //   task_name: "Optimize File Uploads",
        //   task_description: "Improve file upload speed and add progress indicator.",
        //   created_by: "Sneha Rathi",
        //   assigned_by: "Devansh Goyal",
        //   assigned_to: "Ravi Sekhar",
        //   watchers: "Sneha Rathi, Devansh Goyal",
        //   start_date: "03-05-2025",
        //   work_hours: 6,
        //   end_date: "04-05-2025",
        //   actual_end_date: "04-05-2025",
        //   task_status: "Completed",
        //   priority: "Low",
        //   approval_status: "Approved",
        // },
      ]
    
      const [companyProjects, setCompanyProjects] = useState(CompanyProjects)
      const [selectedCompanyProjects, setSelectedCompanyProjects] = useState([])
    
      const [companyProjectFilters, setCompanyProjectFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        task_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        project_manager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        module_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        task_description: { value: null, matchMode: FilterMatchMode.CONTAINS },
        created_by: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        assigned_by: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        watchers: { value: null, matchMode: FilterMatchMode.CONTAINS },
        start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        actual_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        work_hours: { value: null, matchMode: FilterMatchMode.EQUALS },
        task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        approval_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      })
    
      
    
      // View worktype end



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
      type: "Call",
      sub_type: "Introductory Call",
      priority: "High",
      subject: "Call Request to Discuss Project Updates",
      date_time: "01-01-2025 10:00",
      user_id: "mahesh",
    },
    {
      type: "Meeting",
      sub_type: "Daily Stand-up",
      priority: "Medium",
      subject: "Project Progress and Next Steps",
      date_time: "05-12-2024 09:00",
      user_id: "lavan",
    },
    {
      type: "Event",
      sub_type: "Follow-up Call",
      priority: "Low",
      subject: "Meeting Request",
      date_time: "15-01-2025 14:00",
      user_id: "ruchitha",
    },
    {
      type: "Others",
      sub_type: "Requirement Discussion",
      priority: "High",
      subject: "Discussion on Future Milestones",
      date_time: "01-02-2025 11:00",
      user_id: "laxmi",
    },
    {
      type: "Call",
      sub_type: "Follow-up Call",
      priority: "Critical",
      subject: "Need to Discuss Project Status",
      date_time: "01-03-2025 13:00",
      user_id: "rajashekar",
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
      type: "Meeting",
      sub_type: "Daily Stand-up",
      priority: "Medium",
      subject: "Project Progress and Next Steps",
      date_time: "05-12-2024 09:00",
      user_id: "lavan",
    },
    {
      type: "Call",
      sub_type: "Introductory Call",
      priority: "High",
      subject: "Call Request to Discuss Project Updates",
      date_time: "01-01-2025 10:00",
      user_id: "mahesh",
    },
    {
      type: "Event",
      sub_type: "Follow-up Call",
      priority: "Low",
      subject: "Meeting Request",
      date_time: "15-01-2025 14:00",
      user_id: "ruchitha",
    },
   
    {
      type: "Call",
      sub_type: "Follow-up Call",
      priority: "Critical",
      subject: "Need to Discuss Project Status",
      date_time: "01-03-2025 13:00",
      user_id: "rajashekar",
    },
     {
      type: "Others",
      sub_type: "Requirement Discussion",
      priority: "High",
      subject: "Discussion on Future Milestones",
      date_time: "01-02-2025 11:00",
      user_id: "laxmi",
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
    // {
    //   name: 'Interview',
    //   code: 'SCH-IN',
    //   icon: 'pi pi-user',
    //   action: () => SetInterviewpop(true),
    // },
    {
      name: 'Call',
      code: 'SCH-CA',
      icon: 'pi pi-phone',
      action: () => SetInterviewpop(true),
    },
    {
      name: 'Meeting',
      code: 'SCH-ME',
      icon: 'pi pi-calendar',
      action: () => SetInterviewpop(true),
    },
    {
      name: 'Task',
      code: 'SCH-TA',
      icon: 'pi pi-check-square',
      action: () => SetInterviewpop(true)
    },
    // {
    //   name: 'Event',
    //   code: 'SCH-EV',
    //   icon: 'pi pi-bell',
    //   action: () => SetInterviewpop(true)
    // },
    {
      name: 'Other',
      code: 'SCH-OT',
      icon: 'pi pi-ellipsis-h',
      action: () => SetInterviewpop(true)
    }
  ];

  const handleScheduleChange = (e) => {
    setSelectedSchedule(e.value);
    setIntertype(e.value.name); // Update input field with selected name

    // Trigger the action if defined for the selected option
    if (e.value && e.value.action) {
      e.value.action(); // Execute the custom action
    }
  };



  const [selectedLinkJob, setSelectedLinkJob] = useState(null);


  // clear search start

  const handleClearSearchContacts = () => {
    setFilters({
      firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      jobTitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      company: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      mobile: { value: null, matchMode: FilterMatchMode.CONTAINS },
      department: { value: null, matchMode: FilterMatchMode.CONTAINS },
      associatedContacts: { value: null, matchMode: FilterMatchMode.CONTAINS },
      address: { value: null, matchMode: FilterMatchMode.CONTAINS },
      notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      group: { value: null, matchMode: FilterMatchMode.CONTAINS },
      createdBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
      userId: { value: null, matchMode: FilterMatchMode.CONTAINS },
      lastActivityDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
      createDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
      editDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  // clear search ends
  const [popchecked, setPopchecked] = useState(false);
  const handlePopupCheckbox = e => {
    setPopchecked(e.checked)
  }
  // interview popup starts
  const [interviewpop, SetInterviewpop] = useState(false)

  // Popup dialog const values end
  const [intertype, setIntertype] = useState()

  // const [intertype, setintertype] = useState()
  const [intertypeCall, setintertypeCall] = useState("Call")
  const [intertypeMeeting, setintertypeMeeting] = useState("Meeting")
  const [intertypeTask, setintertypeTask] = useState("Task")
  const [intertypeEvent, setintertypeEvent] = useState("Event")
  const [intertypeOther, setintertypeOther] = useState("Other")
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

  const [userid, setUserid] = useState(["Harish"])
  const customChip = item => {
    return (
      <div>
        <span>{item}</span>
      </div>
    )
  }
  // interview popup ends

  // short form strats
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

  const onUpload = (event) => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: `${event.files.length} file(s) uploaded` });
  };

  // short form ends

  // Export Csv start

  const [importCsvIcons, setImportCsvIcons] = useState(false)
  const dtContact = useRef(null);

  const exportCSVBtn = (selectionOnly) => {
    if (dtContact.current) {
      dtContact.current.exportCSV({ selectionOnly });
    } else if (dt.current) {
      // Manually pass data to exportCSV if needed
      const data = contactData;  // or companyData
      const exportData = data.map(item => ({
        firstName: item.firstName || "-",
        lastName: item.lastName || "-",
        company: item.company || "-",
        jobTitle: item.jobTitle || "-",
        email: item.email || "-",
        mobile: item.mobile || "-",
        associatedContacts: item.associatedContacts || "-",
        department: item.department || "-",
        lastActivityDate: item.lastActivityDate || "-",
        createDate: item.createDate || "-",
        editDate: item.editDate || "-",
      }));

      if (exportData.length > 0) {
        dt.current.exportCSV({ selectionOnly, data: exportData });
      } else {
        alert("No data available for export.");
      }
    } else {
      alert("DataTable reference not found.");
    }
  };


  const exportPdfBtn = (data, fileName) => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("landscape");

        const exportColumns = Object.keys(data[0] || {}).map((key) => key);

        const exportData = data.map((row) =>
          exportColumns.map((col) => row[col] || "-")
        );

        if (exportColumns.length === 0 || exportData.length === 0) {
          alert("No data available for export.");
          return;
        }

        doc.autoTable({
          head: [exportColumns],
          body: exportData,
          startY: 20,
          styles: { fontSize: 8, cellPadding: 2 },
          theme: "grid",
          margin: { top: 10, left: 5, right: 5 },
          columnStyles: { 0: { cellWidth: 30 } },
        });

        doc.save(`${fileName}.pdf`);
      });
    });
  };

  const exportExcelBtn = (data, fileName) => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "array" });

      saveAsExcelFile(excelBuffer, fileName);
    });
  };


  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], { type: EXCEL_TYPE });

        module.default.saveAs(
          data,
          `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
        );
      }
    });
  };


  const headerBtn = (
    <div className="flex align-items-center justify-content-end gap-1 actionitem-import">
      <Button
        className="csvbtn p-button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSVBtn(dtContact, false)}
        tooltip="Export to CSV"
      />
      <Button
        className="xlsbtn p-button"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={() => exportExcelBtn(contactData, "contact_data")}
        tooltip="Export to Excel"
      />
      <Button
        className="pdfbtn p-button me-2"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={() => exportPdfBtn(contactData, "contact_data")}
        disabled={contactData.length === 0}
        tooltip="Export to PDF"
      />
    </div>

  )

  // Export Csv end

  //  view page input values

  const [fullname1, setFullname1] = useState("Mahesh Kumar Bhoga");
  const [email1, setEmail1] = useState("mahesh9@varundigitalmedia.com");
  const [phno1, setPhno1] = useState("9876543210");
  const [jobtitle1, setJobtitle1] = useState("UI/UX Manager");
  const [company1, setCompany1] = useState("Varun Digital Media");
  const [department1, setDepartment1] = useState("UI/UX");
  const [relatedperson1, setrelatedperson1] = useState("Salmanuddin Syed");
  const [categories1, setCategories1] = useState("Large Enterprise");
  const [group1, setGroup1] = useState("Above 250 crore");
  const [userid1, setUserid1] = useState("Harish");

  // Private state variables
  const [privateDrop, setPrivateDrop] = useState(false)
  const [PrivetDropdown, setPrivetDropdown] = useState([])
  const PrivetDropdownValues = [
    { name: "Mahesh", code: "M1" },
    { name: "Lavan", code: "L1" },
    { name: "Vinay", code: "V1" },
    { name: "Vasantha", code: "V2" },
  ]

  const [address1, setAddress1] = useState("White house, Block-III, Begumpet, Hyderabad, Telangana, 500016, India");
  const [notes1, setNotes1] = useState("Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence and drive growth across various industries.");

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

  const typeInterview1 = [
    { name: "Screening Interviews", value: "SI" },
    { name: "One-on-One Interviews", value: "OOI" },
    { name: "Technical Interviews", value: "TI" },
    { name: "Final Round Interviews ", value: "FRI" },
    { name: "Video/Virtual Interviews", value: "VVI" },
  ]

  const priorityValue = [
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' },
  ];

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

                        <Link to="/contacts-editform">
                          <button
                            type="button"
                            class="btn btn-secondary icons-btn ms-1 edit"
                          >
                            <i className="pi pi-pencil"></i>
                          </button>
                        </Link>


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

                  {/* <SubmitContacttoCandidate /> */}

                  {/* <AddJob /> */}

                  {/* <EmailContacts /> */}

                  {/* <CascadeSelect
                    // value={selectedSchedule}
                    onChange={handleScheduleChange}
                    options={actScheduleOptions}
                    optionLabel="name"
                    optionGroupLabel="name"
                    className="md:w-10rem me-1"
                    optionGroupChildren={['subItems', 'subItems']}
                    breakpoint="767px"
                    placeholder="Schedule"
                  /> */}

                  {/* <CascadeSelect
                    value={selectedActSms}
                    // onChange={(e) => setSelectedActSms(e.value)}
                    options={actSmsOptions}
                    optionLabel="name"
                    optionGroupLabel="name"
                    optionGroupChildren={['subItems', 'subItems']}
                    className="md:w-8rem me-1"
                    breakpoint="767px"
                    placeholder="SMS"
                  /> */}

                  <MoreACcontacts />

                </span>
              </Col>

              <Col xxl={3} xl={12} lg={12} sm={12}>
                <div className="clr-icons">
                  {selectedContacts.length > 0 ? <NotesContact1 /> : <NotesContact />}

                  <Tooltip target=".expbtn" content="Export" position="bottom" style={{ marginTop: "5px" }} />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1 expbtn"
                    onClick={() => setImportCsvIcons(!importCsvIcons)}
                  >
                    <i className="pi pi-file-export"></i>
                  </button>

                  {importCsvIcons && <span>{headerBtn}</span>}

                  <Tooltip target=".clear" content="Clear Search" position="bottom" style={{ marginTop: "5px" }} />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1 clear" onClick={handleClearSearchContacts}
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
                      value={contactData.slice(first, first + rows)}
                      ref={dt}
                      rows={rows}
                      first={first}
                      onPage={onPage}
                      dataKey="id"
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
                      <Column field="firstName" header="First Name" frozen sortable filter />
                      <Column field="lastName" header="Last Name" sortable filter />
                      <Column field="company" header="Company" sortable filter />
                      <Column field="jobTitle" header="Designation" sortable filter />
                      <Column field="email" header="Email" sortable filter />
                      <Column field="mobile" header="Mobile Phone" sortable filter />
                      <Column field="associatedContacts" header="Reporting Person" sortable filter />
                      <Column field="department" header="Department" sortable filter />
                      <Column field="lastActivityDate" header="Last Activity Date" sortable filter />
                      <Column field="createDate" header="Create Date" sortable filter />
                      <Column field="editDate" header="Edit Date" sortable filter />
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
                        <Link to="/contacts-editform">
                                                <p className="mb-0 text-white">
                                                  {" "}
                                                  <i class="fa-regular fa-pen-to-square me-3"></i>{" "}
                                                </p>
                                              </Link>
                      <Button
                        icon="pi pi-times"
                        className="p-button-text close-btn closeside"
                        onClick={() => setVisibleRight(false)}
                      />
                    </div>

                  </div>
                  <div className="card sidebardetails">

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


                    {/* <Row className="mb-2">
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
                      </Row> */}

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

                    <Row className="d-flex align-items-end mb-2 mt-4">
                      <Col lg={2}>
                        <div className="p-field d-flex align-items-center">
                          <Checkbox
                            inputId="privateCheckbox"
                            checked={privateDrop}
                            onChange={(e) => setPrivateDrop(e.checked)}
                          />
                          <label htmlFor="privateCheckbox" className="ms-2">Private</label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        {privateDrop && (
                          <div className="p-field">
                            <label htmlFor="userIds">User Id's</label>
                            <MultiSelect
                              value={PrivetDropdown}
                              onChange={(e) => setPrivetDropdown(e.value)}
                              options={PrivetDropdownValues}
                              optionLabel="name"
                              display="comma"
                              placeholder="Select User Id's"
                              maxSelectedLabels={10}
                              className="w-full"
                            />
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <div className="p-field d-flex align-items-center">
                          <Checkbox
                            inputId="isEmployeeCheckbox"
                            checked={false}
                            onChange={() => {}}
                          />
                          <label htmlFor="isEmployeeCheckbox" className="ms-2">Is Employee</label>
                        </div>
                      </Col>
                    </Row>

                    <Row className="d-flex align-items-end mb-2">
                      
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <Button type="submit" color="primary" className="btn btn-primary waves-effect waves-light me-2 sidebarbtn float-end" onClick={() => setVisibleRight(false)}  >
                          Create
                        </Button>
                      </Col>
                    </Row>
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
              <h3 className="head"><i className="pi pi-address-book"></i> Contact - Mahesh Kumar Bhoga</h3>
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
                                value={fullname1}
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
                                value={email1}
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
                                value={phno1}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>


                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="jobTitle">Designation</label>
                              <InputText
                                id="jobTitle"
                                placeholder=""
                                className="w-full"
                                value={jobtitle1}
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
                                value={company1}
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
                                value={department1}
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
                                value={relatedperson1}
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
                                value={categories1}
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
                                value={group1}
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
                                value={userid1}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
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
                            <div className="field">
                              <label htmlFor="address">Address</label>
                              <InputTextarea
                                id="address"
                                value={address1}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder=""
                                rows={2}
                                cols={30}
                                className="w-full"
                              />
                            </div>
                          </Col>
                          {/* <Col lg={12}>
                            <div className="p-field" >
                              <label htmlFor="jobType" className="block">Notes</label>
                              <InputTextarea
                                autoResize
                                rows={3}
                                cols={40}
                                placeholder=""
                                className="w-full "
                                value={notes1}
                              />
                            </div>
                          </Col> */}
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

                              <TreeTable value={documents} tableStyle={{ minWidth: "50rem" }} dataKey="key">
                                <Column field="docType" header="Document Type" body={(rowData) => editableTemplate(rowData, "docType")} />
                                <Column field="docSubject" header="Document Subject" body={(rowData) => editableTemplate(rowData, "docSubject")} />
                                <Column field="appliedDateTime" header="Applied Date & Time" body={(rowData) => editableTemplate(rowData, "appliedDateTime")} />
                                <Column body={actionTemplate} header="Actions" />
                              </TreeTable>
                            </div>
                          </Col>
                        </Row>
                      </AccordionTab>

                    </Accordion>
                  </Col>
                </Row>
              </TabPanel>

               <TabPanel header="Projects" leftIcon="pi pi-calendar mr-2" >
                <Row>
                  <Col lg={12}>
                    <section className="job-datatable-section">
                      <div className="card1 mt-3 mb-4 actjobsumtable">
                       
                       <DataTable
                                                 value={projectData}
                                                 selection={selectedProjects}
                                                 onSelectionChange={(e) => setSelectedProjects(e.value)}
                                                 selectionMode="multiple"
                                                 filters={projectDataFilters}
                                                 onFilter={(e) => setProjectDataFilters(e.filters)}
                                                 filterDisplay="row"
                                                 paginator
                                                 rows={5}
                                                 rowsPerPageOptions={[5, 10, 25, 50]}
                                                 responsiveLayout="scroll"
                                                 showGridlines
                                                 resizableColumns
                                                 columnResizeMode="expand"
                                                 emptyMessage="No projects found."
                                                 tableStyle={{
                                                   minWidth: "120rem",
                                                   borderRadius: "8px",
                                                   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                 }}
                                               >
                                                 <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                                                 <Column field="project_code" header="Project Code" filter style={{ minWidth: "10rem" }} />
                                                 <Column field="project_name" header="Project Name" filter style={{ minWidth: "10rem" }} />
                                                 {/* <Column field="project_manager" header="Project Manager" filter style={{ minWidth: "14rem" }} /> */}
                                                 {/* <Column field="task_count" header="# Tasks" filter style={{ minWidth: "10rem" }} /> */}
                                                 {/* <Column field="completed_tasks" header="# Completed Tasks" filter style={{ minWidth: "14rem" }} /> */}
                                                 
                                                 
                                                 {/* <Column
                                                   field="extended_end_date"
                                                   header="Extended End Date"
                                                   filter
                                                   filterElement={dateFilterTemplate}
                                                   style={{ minWidth: "14rem" }}
                                                 /> */}
                                                
                                                 <Column
                                                   field="project_start_date"
                                                   header="Project Start Date"
                                                   filter
                                                   // filterElement={dateFilterTemplate}
                                                   style={{ minWidth: "10rem" }}
                                                 />
                                                 <Column
                                                   field="project_end_date"
                                                   header="Project End Date"
                                                   filter
                                                   // filterElement={dateFilterTemplate}
                                                   style={{ minWidth: "10rem" }}
                                                 />
                                                 <Column field="status" header="Status" filter style={{ minWidth: "10rem" }} />
                                                 <Column field="delay_reason" header="Reason for Delay" filter style={{ minWidth: "10rem" }} />
                                               </DataTable>


                      </div>
                    </section>
                  </Col>
                </Row>
              </TabPanel>


               <TabPanel header="Work Type" leftIcon="pi pi-calendar mr-2" >
                <Row>
                  <Col lg={12}>
                    <section className="job-datatable-section">
                      <div className="card1 mt-3 mb-4 actjobsumtable">
                         <DataTable
                                                 value={companyProjects}
                                                 filters={companyProjectFilters}
                                                 globalFilterFields={[
                                                   "task_code",
                                                   "task_type",
                                                   "project_name",
                                                   "project_manager",
                                                   "module_name",
                                                   "task_name",
                                                   "task_description",
                                                   "created_by",
                                                   "assigned_by",
                                                   "assigned_to",
                                                   "watchers",
                                                   "start_date",
                                                   "end_date",
                                                   "actual_end_date",
                                                   "work_hours",
                                                   "task_status",
                                                   "priority",
                                                   "approval_status",
                                                 ]}
                                                 filterDisplay="row"
                                                 selection={selectedCompanyProjects}
                                                 onSelectionChange={e =>
                                                   setSelectedCompanyProjects(e.value)
                                                 }
                                                 selectionMode="multiple"
                                                 paginator
                                                 rows={5}
                                                 rowsPerPageOptions={[5, 10, 25, 50]}
                                                 responsiveLayout="scroll"
                                                 showGridlines
                                                 resizableColumns
                                                 columnResizeMode="expand"
                                                 emptyMessage="No tasks found."
                                                 tableStyle={{
                                                   minWidth: "120rem",
                                                   borderRadius: "8px",
                                                   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                 }}
                                               >
                                                 <Column
                                                   selectionMode="multiple"
                                                   headerStyle={{ width: "3em" }}
                                                 />
                                                 <Column
                                                   field="task_code"
                                                   header="Work Type Code"
                                                   style={{ minWidth: "10rem" }}
                                                   sortable
                                                   filter
                                                 />
                                                 <Column
                                                   field="task_type"
                                                   header="Work Type"
                                                   style={{ minWidth: "10rem" }}
                                                   sortable
                                                   filter
                                                 />
                                                 {/* <Column
                                                   field="project_name"
                                                   header="Project Name"
                                                   sortable
                                                   filter
                                                 />
                                                 <Column
                                                   field="project_manager"
                                                   header="Project Manager"
                                                   sortable
                                                   filter
                                                 />
                                                 <Column
                                                   field="module_name"
                                                   header="Module Name"
                                                   sortable
                                                   filter
                                                 /> */}
                                                 <Column
                                                   field="task_name"
                                                   header="Summary"
                                                   style={{ minWidth: "10rem" }}
                                                   sortable
                                                   filter
                                                 />
                                                 {/* <Column
                                                   field="task_description"
                                                   header="Task Description"
                                                   sortable
                                                   filter
                                                   style={{ minWidth: "15rem" }}
                                                 />
                                                 <Column
                                                   field="created_by"
                                                   header="Created By"
                                                   sortable
                                                   filter
                                                 /> */}
                                                 {/* <Column
                                                   field="assigned_by"
                                                   header="Assigned By"
                                                   sortable
                                                   filter
                                                 /> */}
                                                 <Column
                                                   field="assigned_to"
                                                   header="Assigned To"
                                                   style={{ minWidth: "10rem" }}
                                                   sortable
                                                   filter
                                                 />
                                                 {/* <Column
                                                   field="watchers"
                                                   header="Watchers"
                                                   sortable
                                                   filter
                                                   style={{ minWidth: "12rem" }}
                                                 />
                                                 <Column
                                                   field="start_date"
                                                   header="Start Date"
                                                   sortable
                                                   filter
                                                 />
                                                 <Column
                                                   field="end_date"
                                                   header="End Date"
                                                   sortable
                                                   filter
                                                 />
                                                 <Column
                                                   field="actual_end_date"
                                                   header="Actual End Date"
                                                   sortable
                                                   filter
                                                 />
                                                 <Column
                                                   field="work_hours"
                                                   header="Work Hours"
                                                   sortable
                                                   filter
                                                 /> */}
                                                 <Column
                                                   field="task_status"
                                                   header="Work Type Status"
                                                   style={{ minWidth: "10rem" }}
                                                   sortable
                                                   filter
                                                 />
                       
                                                 <Column
                                                   field="project_name"
                                                   header="Project Name"
                                                   style={{ minWidth: "10rem" }}
                                                   sortable
                                                   filter
                                                 />
                                                 {/* <Column
                                                   field="priority"
                                                   header="Priority"
                                                   sortable
                                                   filter
                                                 />
                                                 <Column
                                                   field="approval_status"
                                                   header="Approval Status"
                                                   sortable
                                                   filter
                                                 /> */}
                                               </DataTable>
                      </div>
                    </section>
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
        header="Appointment - Web Developer, (Job-101)"
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
                    />
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
              <LinkContactJob />


              <Row className="mb-2">
                {/* <Col xl={6}>
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
                   
                  </div>
                </Col> */}
                <LinkCandidatesPopup />

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username" className="mb-0">Subject</label>
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


                {!(selectedSchedule?.name === 'Interview' || selectedSchedule?.name === 'Call' || selectedSchedule?.name === 'Other') && (
                  <>
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
                  </>
                )}



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
                  <button type="button" class="btn btn-success me-2" onClick={() => SetInterviewpop(false)}>
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                    onClick={() => SetInterviewpop(false)}
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
export default ContactsAllActive;
