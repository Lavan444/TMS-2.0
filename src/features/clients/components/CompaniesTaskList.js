import React, { useState, useRef, useEffect, useMemo } from "react"
import { Col, Container, Row } from "reactstrap"
import { InputMask } from "primereact/inputmask"
import { Dropdown } from "primereact/dropdown"
import { TabView, TabPanel } from "primereact/tabview"
import { Link, useLocation } from "react-router-dom"
import { FilterMatchMode } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { InputTextarea } from "primereact/inputtextarea"
import "jspdf-autotable"
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { ChevronRightIcon } from "primereact/icons/chevronright"
import { Dialog } from "primereact/dialog"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Calendar } from "primereact/calendar"
import moment from "moment"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Badge } from "primereact/badge"
import { TreeTable } from "primereact/treetable"
import { Card } from "primereact/card"
import { Editor } from "primereact/editor"
import { CascadeSelect } from "primereact/cascadeselect"
import { Tooltip } from 'primereact/tooltip';

import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import { Chips } from 'primereact/chips';
import { useNavigate } from "react-router-dom"
import { Toast } from "primereact/toast"
import { ContextMenu } from "primereact/contextmenu"

import NotesCompanies from '../common-for-all/NotesCompanies'
import NotesCompanies1 from '../common-for-all/NotesCompaniesNames'
import MoreACcompanies from "./MoreActionitems"
import AddContact from "./AddContact"
import { FileUpload } from "primereact/fileupload"
import Export from '@/features/projects/components/Export';;;

const CompaniesTaskList = () => {
  const [selectedEmailOption, setSelectedEmailOption] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
  } = useForm()
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU3VwZXJ1c2VyIFJvbGUiXSwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3JvbGVzIiwibWFuYWdlX3Blcm1pc3Npb25zIiwibWFuYWdlX3JvbGVfdG9fZW1wbG95ZWUiXSwiZXhwIjoxNzM2NjYzNDMyLCJpYXQiOjE3MzQwNzE0MzJ9.VficxfYeaB2WwPhxcRAzmMjSclWyY54Js5eAQ4mqfM8`

  const emailOptions = [
    { label: "New Email", icon: "pi pi-envelope" },
    { label: "Selected", icon: "pi pi-check-circle" },
    { label: "Searched", icon: "pi pi-search" },
    { label: "All", icon: "pi pi-inbox" },
    { label: "Jobs", icon: "pi pi-briefcase" },
  ]

  const selectedEmailTemplate = (option, props) => {
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

  const emailOptionTemplate = option => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`}></i>
        <div>{option.label}</div>
      </div>
    )
  }

  const [selectedSmsOption, setSelectedSmsOption] = useState(null)
  const smsOptions = [
    { label: "Selected", icon: "pi pi-check-circle" },
    { label: "Searched", icon: "pi pi-search" },
    { label: "All", icon: "pi pi-inbox" },
  ]

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

  //schedule

  const [selectedScheduleOption, setSelectedScheduleOption] = useState(null)

  const scheduleOptions = [
    { label: "Interview", icon: "pi pi-calendar-plus" },
    { label: "Call", icon: "pi pi-phone" },
    { label: "Meeting", icon: "pi pi-users" },
    { label: "Task", icon: "pi pi-check-square" },
    { label: "Event", icon: "pi pi-calendar" },
    { label: "Other", icon: "pi pi-cog" },
  ]

  const selectedScheduleTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <i className={`${option.icon} mr-2`} />
          <div>{option.label}</div>
        </div>
      )
    }
    return (
      <div className="flex align-items-center">
        <i className="pi pi-calendar mr-2" />{" "}
        {/* Default icon for placeholder */}
        <span>{props.placeholder}</span>
      </div>
    )
  }

  const scheduleOptionTemplate = option => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`} />
        <div>{option.label}</div>
      </div>
    )
  }

  // more

  const [selectedOption, setSelectedOption] = useState(null)
  const options = [
    { label: "Link Jobs", icon: "pi pi-link" },
    { label: "Delete", icon: "pi pi-trash" },
  ]

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

  document.title = "PMS - Dashboard"

  const [customers, setCustomers] = useState([])

  const onSelectionChange = e => {
    setSelectedCustomers(e.value)
  }
  const onRowReorder = e => {
    setCustomers(e.value)
  }

  const onCellEditComplete = e => {
    const { rowData, newValue, field } = e
    if (rowData[field] !== newValue) {
      const updatedCustomers = customers.map(customer =>
        customer.id === rowData.id
          ? { ...customer, [field]: newValue }
          : customer
      )
      setCustomers(updatedCustomers)
      localStorage.setItem("customers", JSON.stringify(updatedCustomers))
    }
  }

  // const header = renderHeader();
  const [visible, setVisible] = useState(false) // State to control the visibility of the modal

  const [company, setCompany] = useState(null)

  const companies = [
    { name: "Tech Corp", code: "TC" },
    { name: "BizCorp", code: "BC" },
    { name: "Creative Solutions", code: "CS" },
    { name: "Innovative Tech", code: "IT" },
  ]

  const [website, setWebsite] = useState("")

  const [visibleRight, setVisibleRight] = useState(false)

  const [industry, setIndustry] = useState(null)

  const industries = [
    { name: "Information Technology", code: "IT" },
    { name: "Healthcare", code: "HC" },
    { name: "Finance", code: "FN" },
    { name: "Manufacturing", code: "MN" },
    { name: "Retail", code: "RT" },
    // Add more industries here
  ]

  const [companySize, setCompanySize] = useState(null)

  const companySizes = [
    { name: "1-10 employees", code: "1-10" },
    { name: "11-50 employees", code: "11-50" },
    { name: "51-200 employees", code: "51-200" },
    { name: "201-500 employees", code: "201-500" },
    { name: "501-1000 employees", code: "501-1000" },
    { name: "1001-5000 employees", code: "1001-5000" },
    { name: "5001+ employees", code: "5001+" },
  ]

  const [yearFounded, setYearFounded] = useState(null)

  // Generate a list of years from 1900 to the current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, index) => ({
    name: (1900 + index).toString(),
    code: (1900 + index).toString(),
  }))

  const [specialties, setSpecialties] = useState([])

  const [phoneNumber, setPhoneNumber] = useState("")
  const [workEmail, setWorkEmail] = useState("")

  // State to manage which form is being shown
  const [currentForm, setCurrentForm] = useState(1)

  // Handler for "Next" button click to go to next form
  const handleNext = () => {
    setCurrentForm(currentForm + 1)
  }

  // Handler for "Previous" button click to go to previous form
  const handlePrevious = () => {
    setCurrentForm(currentForm - 1)
  }

  const [description, setDescription] = useState("")

  const addCities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]

  const addStates = [
    { name: "California", code: "CA" },
    { name: "Texas", code: "TX" },
    { name: "Florida", code: "FL" },
    { name: "New York", code: "NY" },
    { name: "Illinois", code: "IL" },
  ]

  const addCountries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Australia", code: "AU" },
  ]

  const labels = [
    { name: "Work from Office", code: "WORK" },
    { name: "Work from Home", code: "HOME" },
    { name: "Work from Remote", code: "REMOTE" },
    { name: "Work from Hybrid", code: "HYBRID" },
  ]

  const [categories, updateCategories] = useState([
    {
      key: "0",
      label: "Electronics",
      children: [
        { key: "0-0", label: "Laptops" },
        { key: "0-1", label: "Cameras" },
        { key: "0-2", label: "Smartphones" },
      ],
    },
    {
      key: "1",
      label: "Furniture",
      children: [
        { key: "1-0", label: "Tables" },
        { key: "1-1", label: "Chairs" },
        { key: "1-2", label: "Cabinets" },
      ],
    },
    {
      key: "2",
      label: "Clothing",
      children: [
        { key: "2-0", label: "Men" },
        { key: "2-1", label: "Women" },
        { key: "2-2", label: "Kids" },
      ],
    },
  ])
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null)

  const [groups, updateGroups] = useState([
    {
      key: "0",
      label: "Development",
      children: [
        { key: "0-0", label: "Frontend" },
        { key: "0-1", label: "Backend" },
        { key: "0-2", label: "Full Stack" },
      ],
    },
    {
      key: "1",
      label: "Marketing",
      children: [
        { key: "1-0", label: "SEO" },
        { key: "1-1", label: "Content Creation" },
        { key: "1-2", label: "Social Media" },
      ],
    },
    {
      key: "2",
      label: "Sales",
      children: [
        { key: "2-0", label: "Domestic" },
        { key: "2-1", label: "International" },
        { key: "2-2", label: "Enterprise" },
      ],
    },
  ])
  const [selectedGroupKey, setSelectedGroupKey] = useState(null)

  const [selectedUserId, setSelectedUserId] = useState(null)
  const userIds = [
    { name: "User 1", code: "U1" },
    { name: "User 2", code: "U2" },
    { name: "User 3", code: "U3" },
    { name: "User 4", code: "U4" },
    { name: "User 5", code: "U5" },
  ]

  {
    /* Side bar end */
  }
  const [categoriesitem, setcategoriesitem] = useState([])
  const [groupitem, setgroupitem] = useState([])
  const [compamyitem, setcompamyitem] = useState([])
  const [year, setYear] = useState(null)

  const [address, setAddress] = useState("")
  const [selectedState, setSelectedState] = useState("Telangana")
  const [selectedCity, setSelectedCity] = useState("Hyderabad")
  const [selectedCountry, setSelectedCountry] = useState("India")
  const [selectedLabel, setSelectedLabel] = useState(null)
  const [postalCode, setPostalCode] = useState("500016")
  const [street1, setStreet1] = useState("White house, Block - III")
  const [street2, setStreet2] = useState("Begumpet")

  const updateAddress = () => {
    // setAddress(`${street1}  ${street2} ${postalCode}`.trim());
  }
  useEffect(() => {
    const updatedAddress = [
      street1,
      street2,
      selectedCity,
      selectedState,
      selectedCountry,
      postalCode,
      selectedLabel?.name,
    ].filter(Boolean)
    setAddress(updatedAddress)
  }, [
    street1,
    street2,
    postalCode,
    selectedState,
    selectedCity,
    selectedCountry,
    selectedLabel,
    postalCode,
  ])

  const getcategoriesitem = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Company_Contact}/api/v1/categories/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        let results = response.data.results
        setcategoriesitem(results)
      }
    } catch (error) { }
  }
  const getgroupsitem = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Company_Contact}/api/v1/groups/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        let results = response.data.results
        setgroupitem(results)
      }
    } catch (error) { }
  }
  const getCompanydata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Company_Contact}/api/v1/company/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        let results = response.data.results
        setcompamyitem(results)
        setCustomers(results)
      }
    } catch (error) { }
  }
  const onSubmit = async data => {
    let address = {
      street: street1,
      city: street2,
      state: selectedState,
      zip: postalCode,
    }
    const formattedtoDate = moment(year).format("YYYY")
    const req = {
      job_title: data.jobtitle,
      company_name: data.comapany,
      email: data.personal_email,
      phone_number: data.Phone,
      specialties: data.Specialties,
      description: data.Overview,
      category: Number(data.Categories),
      group: Number(data.Group),
      founded_year: formattedtoDate,
      address: address,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_Company_Contact}/api/v1/company/`,
        req,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      getCompanydata()
      setVisibleRight(false)
    } catch (error) {
      console.error("Error sending data to API:", error)
    }
  }

  useEffect(() => {
    getcategoriesitem()
    getgroupsitem()
    getCompanydata()
  }, [])

  // companies datatable
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    subType: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startDateTime: { value: null, matchMode: FilterMatchMode.EQUALS },
    priority: { value: null, matchMode: FilterMatchMode.CONTAINS },
    subject: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    companyName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    jobTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    categories: { value: null, matchMode: FilterMatchMode.CONTAINS },
    groups: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createDate: { value: null, matchMode: FilterMatchMode.EQUALS },
    editDate: { value: null, matchMode: FilterMatchMode.EQUALS },
    createdBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [companyData, setCompanyData] = useState([
    {
      type: "Meeting",
      subType: "Internal",
      startDateTime: "10-02-2025 10:00 AM",
      priority: "High",
      subject: "Project Kickoff",
      status: "Scheduled",
      fullName: "Rahul Sharma",
      companyName: "Tech Mahindra",
      jobTitle: "Software Engineer",
      phone: "+91 98765 43210",
      categories: "Development",
      groups: "Team A",
      createDate: "01-01-2025",
      editDate: "01-02-2025",
      createdBy: "Admin",
    },
    {
      type: "Call",
      subType: "Client",
      startDateTime: "12-02-2025 03:00 PM",
      priority: "Medium",
      subject: "Product Demo",
      status: "Completed",
      fullName: "Priya Patel",
      companyName: "Infosys",
      jobTitle: "Product Manager",
      phone: "+91 87654 32109",
      categories: "Sales",
      groups: "Team B",
      createDate: "05-01-2025",
      editDate: "05-02-2025",
      createdBy: "Manager",
    },
    {
      type: "Meeting",
      subType: "Client",
      startDateTime: "15-02-2025 02:00 PM",
      priority: "High",
      subject: "Business Strategy",
      status: "Pending",
      fullName: "Arjun Singh",
      companyName: "Tata Consultancy Services (TCS)",
      jobTitle: "CEO",
      phone: "+91 76543 21098",
      categories: "Management",
      groups: "Leadership",
      createDate: "10-01-2025",
      editDate: "10-02-2025",
      createdBy: "Admin",
    },
    {
      type: "Call",
      subType: "Support",
      startDateTime: "20-02-2025 09:00 AM",
      priority: "Low",
      subject: "Technical Issue",
      status: "Ongoing",
      fullName: "Ananya Gupta",
      companyName: "Wipro",
      jobTitle: "Support Engineer",
      phone: "+91 65432 10987",
      categories: "Support",
      groups: "Tech Team",
      createDate: "15-01-2025",
      editDate: "15-02-2025",
      createdBy: "Support Lead",
    },
    {
      type: "Meeting",
      subType: "Board",
      startDateTime: "25-02-2025 01:00 PM",
      priority: "Critical",
      subject: "Annual Report Review",
      status: "Scheduled",
      fullName: "Aditi Reddy",
      companyName: "HCL Technologies",
      jobTitle: "CFO",
      phone: "+91 54321 09876",
      categories: "Finance",
      groups: "Board Members",
      createDate: "20-01-2025",
      editDate: "20-02-2025",
      createdBy: "CEO",
    },
    {
      type: "Call",
      subType: "Partner",
      startDateTime: "18-02-2025 11:00 AM",
      priority: "Medium",
      subject: "Partnership Discussion",
      status: "Completed",
      fullName: "Vihaan Joshi",
      companyName: "Zoho Corporation",
      jobTitle: "Business Consultant",
      phone: "+91 43210 98765",
      categories: "Partnership",
      groups: "Advisors",
      createDate: "25-01-2025",
      editDate: "22-02-2025",
      createdBy: "VP Business",
    },
    {
      type: "Meeting",
      subType: "Training",
      startDateTime: "28-02-2025 10:30 AM",
      priority: "High",
      subject: "Employee Onboarding",
      status: "Scheduled",
      fullName: "Ishita Malhotra",
      companyName: "Byju's",
      jobTitle: "HR Manager",
      phone: "+91 32109 87654",
      categories: "HR",
      groups: "Training Team",
      createDate: "28-01-2025",
      editDate: "25-02-2025",
      createdBy: "HR Lead",
    },
    {
      type: "Call",
      subType: "Vendor",
      startDateTime: "02-03-2025 04:00 PM",
      priority: "Low",
      subject: "Supply Chain Update",
      status: "Pending",
      fullName: "Kabir Kumar",
      companyName: "Flipkart",
      jobTitle: "Operations Manager",
      phone: "+91 21098 76543",
      categories: "Operations",
      groups: "Supply Chain",
      createDate: "01-02-2025",
      editDate: "28-02-2025",
      createdBy: "Supply Head",
    },
    {
      type: "Meeting",
      subType: "Review",
      startDateTime: "05-03-2025 02:00 PM",
      priority: "Medium",
      subject: "Quarterly Performance Review",
      status: "Scheduled",
      fullName: "Rohan Mehta",
      companyName: "Ola Cabs",
      jobTitle: "CTO",
      phone: "+91 10987 65432",
      categories: "Management",
      groups: "Executives",
      createDate: "05-02-2025",
      editDate: "01-03-2025",
      createdBy: "CEO",
    },
    {
      type: "Call",
      subType: "Sales",
      startDateTime: "08-03-2025 09:30 AM",
      priority: "High",
      subject: "Client Follow-up",
      status: "Ongoing",
      fullName: "Sanya Verma",
      companyName: "Paytm",
      jobTitle: "Sales Executive",
      phone: "+91 98765 43210",
      categories: "Sales",
      groups: "Sales Team",
      createDate: "10-02-2025",
      editDate: "05-03-2025",
      createdBy: "Sales Manager",
    },
    {
      type: "Meeting",
      subType: "Project",
      startDateTime: "12-03-2025 01:00 PM",
      priority: "Critical",
      subject: "Project Milestone Discussion",
      status: "Scheduled",
      fullName: "Aarav Shah",
      companyName: "Swiggy",
      jobTitle: "Project Manager",
      phone: "+91 87654 32109",
      categories: "Development",
      groups: "Project Team",
      createDate: "15-02-2025",
      editDate: "10-03-2025",
      createdBy: "Tech Lead",
    },
  ]);


  const [selectedCompanyData, setSelectedCompanyData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageState, setPageState] = useState({ rows: 10, first: 0 })

  const onPage = event => {
    setPageState({ rows: event.rows, first: event.first })
  }

  const dt = useRef(null)

  // context menu starts
  const toast = useRef(null); // Reference for Toast notifications
  const navigate = useNavigate();
  const cm = useRef(null); // Reference for ContextMenu
  const [selectedCompany, setSelectedCompany] = useState(null); // State to track the right-clicked company
  // Context menu options
  const menuModel = [
    { label: 'View', icon: 'pi pi-fw pi-eye', command: () => { setVisibleViewRight(true) } },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => navigate('/companies-editform') },
    { label: 'Archived', icon: 'pi pi-check-circle' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteCompany(selectedCompany) },
    {
      label: 'Schedule',
      icon: 'pi pi-calendar-clock',
      items: [
        {
          label: 'Interview', icon: 'pi pi-calendar-plus'
        },
        { label: 'Call', icon: 'pi pi-phone' },
        { label: 'Meeting', icon: 'pi pi-users' },
        { label: 'Task', icon: 'pi pi-list' },
        { label: 'Event', icon: 'pi pi-calendar-clock' },
        { label: 'Other', icon: 'pi pi-ellipsis-h' },
      ],
    },
    {
      label: 'More',
      icon: 'pi pi-ellipsis-h',
      items: [ // Subitems for "Schedule"
        { label: 'Attachments', icon: 'pi pi-link', },
        { label: 'Change Status', icon: 'pi pi-sync', },
      ],
    },
    { label: 'Company Notes', icon: 'pi pi-clipboard' },
    { label: 'Export', icon: 'pi pi-file-export' },
    { label: 'Clear Search', icon: 'pi pi-sync', command: () => handleClearSearchCompanies() },
  ];

  // Function to handle viewing a company
  const viewCompany = (company) => {
    toast.current.show({ severity: 'info', summary: 'Company Selected', detail: company.company });
  };

  // Function to handle editing a company
  const editCompany = (company) => {
    toast.current.show({ severity: 'success', summary: 'Edit Company', detail: `Editing ${company.firstName} ${company.lastName}` });
  };

  // Function to handle deleting a company
  const deleteCompany = (company) => {
    let _companies = [...companyData];
    _companies = _companies.filter((c) => c.id !== company.id);
    setCompanyData(_companies); // Update the contact data state
    toast.current.show({ severity: 'error', summary: 'Company Deleted', detail: `${company.company}` });
  };

  // context menu ends

  // view page starts

  // view form pipeline starts

  const [allJobsFilters, setAllJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stage: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const allJobs = [
    {
      stage: "Applied",
      jobid: "DEV001",
      job_title: "Frontend Developer",
      contact: "John Doe",
      status: "Open",
      create_date: "2025-01-01",
      user_id: "12345",
    },
    {
      stage: "Screening",
      jobid: "DEV002",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      status: "In Progress",
      create_date: "2024-12-15",
      user_id: "54321",
    },
    {
      stage: "Interview",
      jobid: "MGR001",
      job_title: "Project Manager",
      contact: "Alice Johnson",
      status: "In Progress",
      create_date: "2025-01-10",
      user_id: "98765",
    },
    {
      stage: "Offer Sent",
      jobid: "ANA001",
      job_title: "Data Analyst",
      contact: "Bob Brown",
      status: "Closed",
      create_date: "2025-02-01",
      user_id: "67890",
    },
    {
      stage: "Offer Extended",
      jobid: "DEV003",
      job_title: "Full Stack Engineer",
      contact: "Emily Davis",
      status: "Pending",
      create_date: "2025-01-15",
      user_id: "98765",
    },
    {
      stage: "Interview Scheduled",
      jobid: "DEV002",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      status: "In Progress",
      create_date: "2025-01-10",
      user_id: "54321",
    },
    {
      stage: "Hired",
      jobid: "DEV004",
      job_title: "UI/UX Designer",
      contact: "Michael Brown",
      status: "Closed",
      create_date: "2025-01-20",
      user_id: "67890",
    },
  ]

  const [selectedAllJobs, setSelectedAllJobs] = useState([])

  // open jobs

  const [openJobsFilters, setOpenJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stage: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const openJobs = [
    {
      stage: "Open",
      jobid: "DEV001",
      job_title: "Frontend Developer",
      contact: "John Doe",
      status: "Active",
      create_date: "2025-01-05",
      user_id: "12345",
    },
    {
      stage: "Open",
      jobid: "DEV002",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      status: "Active",
      create_date: "2025-01-10",
      user_id: "54321",
    },
    {
      stage: "Open",
      jobid: "ANA001",
      job_title: "Data Analyst",
      contact: "Bob Brown",
      status: "Active",
      create_date: "2025-01-15",
      user_id: "67890",
    },
  ]

  const [selectedOpenJobs, setSelectedOpenJobs] = useState([])

  // closed jobs

  const [closedJobsFilters, setClosedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stage: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const closedJobs = [
    {
      stage: "Closed",
      jobid: "DEV005",
      job_title: "Frontend Developer",
      contact: "John Doe",
      status: "Filled",
      create_date: "2025-01-05",
      user_id: "12345",
    },
    {
      stage: "Closed",
      jobid: "DEV006",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      status: "Filled",
      create_date: "2025-01-10",
      user_id: "54321",
    },
    {
      stage: "Closed",
      jobid: "ANA003",
      job_title: "Data Analyst",
      contact: "Bob Brown",
      status: "Filled",
      create_date: "2025-01-15",
      user_id: "67890",
    },
    {
      stage: "Closed",
      jobid: "DEV007",
      job_title: "Data Scientist",
      contact: "Emily Davis",
      status: "Filled",
      create_date: "2025-01-15",
      user_id: "12346",
    },
    {
      stage: "Closed",
      jobid: "DEV008",
      job_title: "Product Manager",
      contact: "Michael Brown",
      status: "Filled",
      create_date: "2025-01-18",
      user_id: "54322",
    },
    {
      stage: "Closed",
      jobid: "DEV009",
      job_title: "DevOps Engineer",
      contact: "Sarah Wilson",
      status: "Filled",
      create_date: "2025-01-20",
      user_id: "67891",
    },
    {
      stage: "Closed",
      jobid: "DEV010",
      job_title: "Cloud Architect",
      contact: "David Clark",
      status: "Filled",
      create_date: "2025-01-22",
      user_id: "11224",
    },
    {
      stage: "Closed",
      jobid: "DEV011",
      job_title: "Mobile App Developer",
      contact: "Anna Taylor",
      status: "Filled",
      create_date: "2025-01-25",
      user_id: "78912",
    },
    {
      stage: "Closed",
      jobid: "DEV012",
      job_title: "Cybersecurity Analyst",
      contact: "Robert Johnson",
      status: "Filled",
      create_date: "2025-01-28",
      user_id: "45678",
    },
    {
      stage: "Closed",
      jobid: "DEV013",
      job_title: "Technical Writer",
      contact: "Laura Martinez",
      status: "Filled",
      create_date: "2025-01-30",
      user_id: "34567",
    },
  ]

  const [selectedClosedJobs, setSelectedClosedJobs] = useState([])

  // submitted
  const [submittedJobsFilters, setSubmittedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stage: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const submittedJobs = [
    {
      stage: "Submitted",
      candidate: "Alice Johnson",
      jobid: "DEV007",
      job_title: "Frontend Developer",
      contact: "John Doe",
      location: "San Francisco",
      create_date: "2025-01-20",
      user_id: "12345",
    },
    {
      stage: "Submitted",
      candidate: "Bob Brown",
      jobid: "DEV008",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      location: "New York",
      create_date: "2025-01-18",
      user_id: "54321",
    },
    {
      stage: "Submitted",
      candidate: "Charlie Lee",
      jobid: "ANA004",
      job_title: "Data Analyst",
      contact: "Alice Johnson",
      location: "Chicago",
      create_date: "2025-01-17",
      user_id: "98765",
    },
    {
      stage: "Submitted",
      candidate: "Charlie Lee",
      jobid: "ANA004",
      job_title: "Data Analyst",
      contact: "Alice Johnson",
      location: "Chicago",
      create_date: "2025-01-17",
      user_id: "98765",
    },
  ]

  const [selectedSubmittedJobs, setSelectedSubmittedJobs] = useState([])

  // interviews

  const [interviewsFilters, setInterviewsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stage: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const interviews = [
    {
      stage: "Interview",
      jobid: "DEV009",
      candidate: "Charlie Lee",
      job_title: "Frontend Developer",
      contact: "John Doe",
      location: "San Francisco",
      create_date: "2025-02-01",
      user_id: "12345",
    },
    {
      stage: "Interview",
      jobid: "DEV010",
      candidate: "Charlie Lee",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      location: "New York",
      create_date: "2025-02-05",
      user_id: "54321",
    },
  ]

  const [selectedInterviews, setSelectedInterviews] = useState([])

  // placements

  const [placementsFilters, setPlacementsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stage: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const placements = [
    {
      stage: "Placement",
      jobid: "DEV011",
      candidate: "Charlie Lee",
      job_title: "Frontend Developer",
      contact: "John Doe",
      location: "San Francisco",
      create_date: "2025-02-15",
      user_id: "12345",
    },
    {
      stage: "Placement",
      jobid: "DEV012",
      candidate: "Charlie Lee",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      location: "New York",
      create_date: "2025-02-18",
      user_id: "54321",
    },
    {
      stage: "Placement",
      jobid: "ANA006",
      candidate: "Charlie Lee",
      job_title: "Data Analyst",
      contact: "Alice Johnson",
      location: "Chicago",
      create_date: "2025-02-20",
      user_id: "98765",
    },
    {
      stage: "Placement",
      jobid: "DEV012",
      candidate: "Charlie Lee",
      job_title: "Backend Developer",
      contact: "Jane Smith",
      location: "New York",
      create_date: "2025-02-18",
      user_id: "54321",
    },
    {
      stage: "Placement",
      jobid: "ANA006",
      candidate: "Charlie Lee",
      job_title: "Data Analyst",
      contact: "Alice Johnson",
      location: "Chicago",
      create_date: "2025-02-20",
      user_id: "98765",
    },
  ]

  const [selectedPlacements, setSelectedPlacements] = useState([])

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
  })

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
  ]

  const [selectedActivities, setSelectedActivities] = useState([])

  // view form activities ends

  // view form notes starts
  const [isEditorVisible, setEditorVisible] = useState(false) // Manage editor visibility
  const [editorContent, setEditorContent] = useState("") // Manage editor content
  const [editIndex, setEditIndex] = useState(null)
  const [candidateNotes, setCandidateNotes] = useState([]) // Store notes in an array

  const handleAddNotes = () => {
    setEditorVisible(true) // Show the editor
    setEditorContent("") // Clear any previous content
    setEditIndex(null) // Reset editIndex when adding a new note
  }

  const handleSaveNotes = () => {
    if (editorContent.trim()) {
      const currentDateTime = new Date().toLocaleString() // Get current date and time
      const newNote = {
        content: editorContent,
        timestamp: `Saved on: ${currentDateTime}`,
        candidateName: "Note: Anup Gogoi - Senior Python developer - ATS", // Example candidate name, can be dynamic
      }

      if (editIndex !== null) {
        // Edit the existing note
        const updatedNotes = [...candidateNotes]
        updatedNotes[editIndex] = newNote // Update the specific note
        setCandidateNotes(updatedNotes)
        setEditIndex(null) // Reset editIndex after saving
      } else {
        // Add a new note in the array
        setCandidateNotes(prevNotes => [...prevNotes, newNote])
      }

      setEditorContent("") // Clear editor content after saving
    }
  }

  const handleCancelNotes = () => {
    setEditorContent("") // Clear editor content
    setEditIndex(null) // Reset editIndex on cancel
  }

  const handleEditNote = index => {
    setEditorVisible(true)
    setEditorContent(candidateNotes[index].content) // Load the note content into the editor
    setEditIndex(index) // Set editIndex to edit the current note
  }

  const handleDeleteNote = index => {
    const updatedNotes = candidateNotes.filter((_, i) => i !== index) // Remove the note by index
    setCandidateNotes(updatedNotes)
  }

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
  })

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
  ]

  const [selectedHistory, setSelectedHistory] = useState([])

  // view form history ends

  // view form contacts starts

  const [contactsFilters, setContactsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    work_phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    work_email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const contacts = [
    {
      full_name: "John Doe",
      job_title: "Software Engineer",
      work_phone: "(123) 456-7890",
      work_email: "john.doe@example.com",
      city: "New York",
      user_id: "1001",
    },
    {
      full_name: "Jane Smith",
      job_title: "Project Manager",
      work_phone: "(987) 654-3210",
      work_email: "jane.smith@example.com",
      city: "San Francisco",
      user_id: "1002",
    },
    {
      full_name: "Emily Davis",
      job_title: "Data Analyst",
      work_phone: "(456) 789-1234",
      work_email: "emily.davis@example.com",
      city: "Chicago",
      user_id: "1003",
    },
    {
      full_name: "Michael Brown",
      job_title: "Marketing Specialist",
      work_phone: "(789) 123-4567",
      work_email: "michael.brown@example.com",
      city: "Los Angeles",
      user_id: "1004",
    },
    {
      full_name: "Sarah Wilson",
      job_title: "HR Manager",
      work_phone: "(321) 654-9870",
      work_email: "sarah.wilson@example.com",
      city: "Seattle",
      user_id: "1005",
    },
  ]

  const [selectedContacts, setSelectedContacts] = useState([])

  // view form contacts ends

  // view form candidates starts

  const [candidatesFilters, setCandidatesFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mob_phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const candidates = [
    {
      full_name: "John Doe",
      job_title: "Frontend Developer",
      mob_phone: "(123) 456-7890",
      email: "john.doe@example.com",
      city: "New York",
      user_id: "2001",
    },
    {
      full_name: "Jane Smith",
      job_title: "Backend Developer",
      mob_phone: "(987) 654-3210",
      email: "jane.smith@example.com",
      city: "San Francisco",
      user_id: "2002",
    },
    {
      full_name: "Emily Davis",
      job_title: "Full Stack Engineer",
      mob_phone: "(456) 789-1234",
      email: "emily.davis@example.com",
      city: "Chicago",
      user_id: "2003",
    },
    {
      full_name: "Michael Brown",
      job_title: "UI/UX Designer",
      mob_phone: "(789) 123-4567",
      email: "michael.brown@example.com",
      city: "Los Angeles",
      user_id: "2004",
    },
    {
      full_name: "Sarah Wilson",
      job_title: "Product Manager",
      mob_phone: "(321) 654-9870",
      email: "sarah.wilson@example.com",
      city: "Seattle",
      user_id: "2005",
    },
  ]

  const [selectedCandidates, setSelectedCandidates] = useState([])

  // view form candidates ends

  const [visibleViewRight, setVisibleViewRight] = useState(false)
  const [documents, setDocuments] = useState([])

  // view page ends

  const [showesitSelecticon, setshowesitSelecticon] = useState(false)
  const [showesitSelect, setshowesitSelect] = useState(true)
  const [showIconsSelect, setShowIconsSelect] = useState(false)


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
      action: () => SetInterviewpop(true),
    },
    {
      name: 'Event',
      code: 'SCH-EV',
      icon: 'pi pi-bell',
      action: () => SetInterviewpop(true),
    },
    {
      name: 'Other',
      code: 'SCH-OT',
      icon: 'pi pi-ellipsis-h',
      action: () => SetInterviewpop(true),
    }
  ];

  const handleScheduleChange = (e) => {
    setSelectedSchedule(e.value);

    // Set the selected type in the input field
    setIntertype(e.value.name);

    // Trigger the action if defined for the selected option
    if (e.value && e.value.action) {
      e.value.action();
    }
  };



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


  // clear search start

  const handleClearSearchCompanies = () => {
    console.log("clicked")

    setFilters({
      company_name: { value: "" },
      website: { value: "" },
      industry: { value: "" },
      size: { value: "" },
      founded_year: { value: "" },
      description: { value: "" },
      company_email: { value: "" },
      mobile_phone: { value: "" },
      street_address: { value: "" },
      notes: { value: "" },
      category: { value: "" },
      group: { value: "" },
      UserId: { value: "" },
      created_by: { value: "" },
      last_activity_type: { value: "" },
      last_activity_date: { value: "" },
    })

    // Reset the pagination
    // setPageState((prevState) => ({
    //     ...prevState,
    //     first: 0,
    // }));
  }

  // clear search ends

  //   delete start

  //   Delete the selected data

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleDeleteSelected = () => {

    setShowConfirmDialog(true)
    console.log("clickeddddddd");

  }

  console.log("Selected data to delete:", selectedCompanyData);
  //   const confirmDelete = () => {

  //     setCompanyData(prevData =>


  //       prevData.filter(
  //         row => !selectedCompanyData.some(selectedRow => selectedRow.id === row.id)
  //       )

  //     )


  //     setSelectedCompanyData([]) 
  //     setShowConfirmDialog(false) 
  //   }

  const cancelDelete = () => {
    setShowConfirmDialog(false)
  }


  const confirmDelete = () => {
    console.log("Before deletion, companyData:", companyData);
    console.log("Deleting these items:", selectedCompanyData);

    setCompanyData(prevData => {
      const updatedData = prevData.filter(
        row => !selectedCompanyData.some(selectedRow => selectedRow.id === row.id)
      );
      console.log("After deletion, companyData:", updatedData);
      return updatedData;
    });

    setSelectedCompanyData([]); // Clear selection after deletion
    setShowConfirmDialog(false); // Hide the dialog after deletion
  };



  //   delete end


  // interview popup starts

  const [intertype, setIntertype] = useState()


  const [interviewpop, SetInterviewpop] = useState(false)
  // const [intertype, setintertype] = useState("Interview")
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
    { name: 'Inperson', value: 'inperson' },
    { name: 'Audio', value: 'Audio' },
    { name: 'Video', value: 'Video' },
  ];

  const typeInterviewval = [
    { name: 'Open', value: 'Open' },
    { name: 'Closed', value: '1 Day' },
    { name: 'On Hold', value: '2 Day' },
    // { name: '3 Days', value: '3 Day' },

  ]


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

  const [userid, setUserid] = useState([])
  const customChip = item => {
    return (
      <div>
        <span>{item} - (active)</span>
        <i className="pi pi-user-plus"></i>
      </div>
    )
  }

  const [popchecked, setPopchecked] = useState(false)

  const handlePopupCheckbox = e => {
    setPopchecked(e.checked)
  }


  const typeInterviewcontact = [
    { name: 'Harish', value: 'Harish' },
    { name: 'Giri', value: 'Giri' },
    { name: 'Pavan', value: 'Pavan' },
  ]



  // interview popup ends

  // short form strats
  const [company1, setCompany1] = useState("Varun Digital Media");
  const [website1, setWebsite1] = useState("www.varundigitalmedia.com");
  const [email1, setEmail1] = useState("info@varundigitalmedia.com");
  const [phno1, setPhno1] = useState("9876543210");
  const [specialties1, setSpecialties1] = useState("Digital Marketing Services");
  const [overview1, setOverview1] = useState("Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence and drive growth across various industries.");
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

  const onUpload = (event) => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: `${event.files.length} file(s) uploaded` });
  };
  const [userid1, setUserid1] = useState("Harish");


  // short form ends

  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <div className="page-title-box actjobbread">
            <Row className="justify-content-between ac-items">
              <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
                <span className="addcan-ac">
                  {selectedCompanyData.length > 0 ? (
                    <span className="action-icons me-2">
                      <button
                        type="button"
                        className="btn btn-secondary import-res-btn me-1 md:w-8rem"
                      >
                        <i className="pi pi-building"></i>{" "}
                        {selectedCompanyData.length} Selected
                      </button>

                      <span className="icons-ac">
                        {selectedCompanyData.length === 1 ? (
                          <>
                            <Tooltip target=".view" content="View" position="bottom" style={{ marginTop: "5px" }} />
                            <button
                              type="button"
                              className="btn btn-secondary icons-btn ms-1 view"
                              onClick={() => setVisibleViewRight(true)}
                            >
                              <i className="pi pi-eye"></i>
                            </button>

                            <Tooltip target=".edit" content="Edit" position="top" style={{ marginBottom: "5px" }} />
                            <button
                              type="button"
                              className="btn btn-secondary icons-btn ms-1 edit"
                            >
                              <i className="pi pi-pencil"></i>
                            </button>

                            <Tooltip target=".delete" content="Delete" position="bottom" style={{ marginTop: "5px" }} />

                            <button
                              type="button"
                              className="btn btn-secondary icons-btn ms-1 delete"
                              onClick={handleDeleteSelected}
                            >
                              <i className="pi pi-trash"></i>
                            </button>

                            <Tooltip target=".archived" content="Archived" position="top" style={{ marginBottom: "5px" }} />
                            <button
                              type="button"
                              className="btn btn-secondary icons-btn ms-1 archived"
                            >
                              <i className="pi pi-check-circle"></i>
                            </button>
                          </>
                        ) : null}

                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary import-res-btn md:w-10rem me-1"
                      onClick={() => setVisibleRight(true)}
                    >
                      <i className="pi pi-building me-1"></i> Add a Company
                    </button>
                  )}
                </span>

                <span className="drop-ac">
                  {/* <button
                    type="button"
                    className="btn btn-secondary import-res-btn  ms-1  me-1"
                  >
                    Submit Candidate
                  </button> */}

                  <AddContact />

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
                  <MoreACcompanies />
                </span>
              </Col>

              <Col xxl={3} xl={12} lg={12} sm={12}>
                <div className="clr-icons">
                  {selectedCompanyData.length > 0 ? <NotesCompanies1 /> : <NotesCompanies />}

                  <Export />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1"
                    Tooltip="Clear Search"
                    onClick={handleClearSearchCompanies}
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
                  <ContextMenu model={menuModel} ref={cm} onHide={() => setSelectedCompany(null)} />
                  <div className="card1 mt-4 mb-4 actjobsumtable">

                    <DataTable
                      value={companyData}
                      rows={pageState.rows}
                      first={pageState.first}
                      onPage={onPage}
                      loading={loading}
                      onSelectionChange={e => setSelectedCompanyData(e.value)}
                      selectionMode="multiple"
                      filters={filters}
                      filterDisplay="row"
                      scrollable
                      selection={selectedCompanyData}
                      resizableColumns
                      reorderableColumns
                      onContextMenu={(e) => {
                        cm.current.show(e.originalEvent); // Show the context menu
                        setSelectedCompany(e.data); // Set the selected company
                      }}
                      contextMenuSelection={selectedCompany}
                      onContextMenuSelectionChange={(e) => setSelectedCompany(e.value)}
                    >
                      <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                      <Column field="type" header="Type" sortable filter />
                      <Column field="subType" header="Sub-Type" sortable filter />
                      <Column field="startDateTime" header="Start Date Time" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="priority" header="Priority" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="subject" header="Subject" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="fullName" header="Full Name" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="companyName" header="Company Name" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="jobTitle" header="Job Title" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="phone" header="Phone" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="categories" header="Categories" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="groups" header="Groups" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="createDate" header="Create Date" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="editDate" header="Edit Date" sortable filter style={{ minWidth: "10rem" }} />
                      <Column field="createdBy" header="Created By" sortable filter style={{ minWidth: "10rem" }} />


                    </DataTable>



                    {/* Confirmation Dialog */}
                    <Dialog
                      visible={showConfirmDialog}
                      style={{ width: "450px" }}
                      header="Confirm Deletion"
                      modal
                      footer={
                        <div>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={cancelDelete}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={confirmDelete}
                          >
                            Delete
                          </button>
                        </div>
                      }
                      onHide={() => setShowConfirmDialog(false)}
                    >
                      <p>
                        Are you sure you want to delete{" "}
                        {/* {selectedTableData.length > 1 ? "items" : "item"} of type{" "} */}
                        <strong>{selectedCompanyData[0]?.type}</strong>?
                      </p>
                    </Dialog>
                  </div>
                </section>
              </Col>
            </Row>

            {/* Side bar start */}
            <Row>
              <Col lg={12}>
                <Sidebar
                  visible={visibleRight}
                  position="right"
                  className="sidebar"
                  onHide={() => setVisibleRight(false)}
                >
                  <div className="sidebar-header">
                    <h3>Create a Company</h3>
                    <div className="d-flex align-items-center">
                      {/* <Link to="/candidate-editform">
                                   <p className="mb-0 text-white">
                                     {" "}
                                     <i class="fa-regular fa-pen-to-square me-3"></i>{" "}
                                   </p>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Row className="mb-2">
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="company">Company</label>
                            <InputText aria-label="Default select example" value={company1} />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="website">Website</label>
                            <InputText
                              id="website"
                              value={website1}
                              onChange={e => setWebsite(e.target.value)}
                              placeholder="Enter website URL"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="work-email">Email</label>
                            <InputText placeholder="Enter email" value={email1} />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <InputText placeholder="Enter phone number" value={phno1} />
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col lg={12}>
                          <div
                            className="p-field companie-add"
                            style={{ position: "relative" }}
                          >
                            <label htmlFor="address">Address</label>
                            <InputTextarea
                              id="address"
                              value={address}
                              onChange={e => setAddress(e.target.value)}
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
                                cursor: "pointer",
                              }}
                              onClick={() => setVisible(true)}
                            ></i>
                            <Dialog
                              header="Edit Address"
                              className="address-popup"
                              visible={visible}
                              onHide={() => {
                                if (!visible) return
                                setVisible(false)
                              }}
                              style={{ width: "30vw" }}
                              breakpoints={{
                                "960px": "75vw",
                                "641px": "100vw",
                              }}
                            >
                              <div className="card sidebardetails">
                                <form>
                                  <Row className="mb-3">
                                    <Col lg={6}>
                                      <div className="p-field">
                                        <label htmlFor="street1">
                                          Street 1
                                        </label>
                                        <InputText
                                          id="street1"
                                          value={street1}
                                          onChange={e => {
                                            setStreet1(e.target.value)
                                            updateAddress()
                                          }}
                                          placeholder=""
                                          className="w-full activejobdrop"
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={6}>
                                      <label htmlFor="street2">Street 2</label>
                                      <InputText
                                        id="street2"
                                        value={street2}
                                        onChange={e => {
                                          setStreet2(e.target.value)
                                          updateAddress()
                                        }}
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
                                        onChange={e => {
                                          updateAddress()
                                          setSelectedCity(e.value)
                                        }}
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
                                        onChange={e => {
                                          updateAddress()
                                          setSelectedState(e.value)
                                        }}
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
                                        onChange={e => {
                                          updateAddress()
                                          setSelectedCountry(e.value)
                                        }}
                                        options={addCountries}
                                        optionLabel="name"
                                        filter
                                        filterPlaceholder="Search Country"
                                        className="w-full activejobdrop"
                                        placeholder="India"
                                      />
                                    </Col>
                                    <Col lg={6}>
                                      <label htmlFor="postalCode">
                                        Postal Code
                                      </label>
                                      <InputText
                                        id="postalCode"
                                        value={postalCode}
                                        onChange={e => {
                                          updateAddress()
                                          setPostalCode(e.target.value)
                                        }}
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
                                        onChange={e => {
                                          updateAddress()
                                          setSelectedLabel(e.value)
                                        }}
                                        options={labels}
                                        optionLabel="name"
                                        placeholder="Work From Office"
                                        className="w-full activejobdrop"
                                      />
                                    </Col>
                                  </Row>
                                </form>
                              </div>
                            </Dialog>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="yearFounded">Year Founded</label>
                            <Calendar
                              id="year"
                              value={year}
                              onChange={e => setYear(e.value)}
                              view="year"
                              dateFormat="yy"
                              yearRange="2000:2030"
                              placeholder="2010"
                              className="w-full"
                              showIcon
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="p-field">
                            <label>Specialties</label>
                            <InputText
                              placeholder="Enter specialties"
                              className="w-full activejobdrop"
                              value={specialties1}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="industry">Industry</label>
                            <Dropdown
                              id="industry"
                              value={industry}
                              onChange={e => setIndustry(e.value)}
                              options={industries}
                              optionLabel="name"
                              filter
                              filterPlaceholder="Search Industry"
                              className="w-full activejobdrop"
                              placeholder="Technology"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="companySize">Company Size</label>
                            <Dropdown
                              id="companySize"
                              value={companySize}
                              onChange={e => setCompanySize(e.value)}
                              options={companySizes}
                              optionLabel="name"
                              filter
                              filterPlaceholder="Search Company Size"
                              className="w-full activejobdrop"
                              placeholder="100 employees"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col lg={12}>
                          <div className="">
                            <label htmlFor="jobType">Overview</label>
                            <InputTextarea
                              autoResize
                              rows={4}
                              cols={40}
                              placeholder="Enter a description..."
                              value={overview1}
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
                        </Col>
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="company">Group</label>
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

                      <Row className="align-items-end mb-2">
                        <Col lg={6}>
                          <div className="p-field">
                            <label htmlFor="jobType">UserIDs</label>
                            <InputText placeholder="Enter User IDs" value={userid1} />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="p-field">
                            <input type="checkbox" className="me-2" checked />
                            <label htmlFor="jobType">Private</label>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={12}>
                          <Button
                            color="primary"
                            className="btn btn-primary waves-effect waves-light me-2 sidebarbtn float-end"
                            onClick={() => setVisibleRight(false)}
                          >
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
          <Sidebar
            visible={visibleViewRight}
            position="right"
            onHide={() => setVisibleViewRight(false)}
            className="view-form-sidebar"
          >
            <div className="sidebar-header">
              <h3 className="head">
                <i className="pi pi-users"></i> Company - Anup Gagoi
              </h3>
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
                  onClick={() => setVisibleViewRight(false)}
                />
              </div>
            </div>
            <TabView className="mt-4">
              <TabPanel header="Profile" leftIcon="pi pi-user mr-2">
                <Row>
                  <Col lg={12}>
                    <h5 className="sub-head">Anup Gagoi</h5>
                  </Col>
                  <Col lg={12}>
                    <Accordion activeIndex={0}>
                      <AccordionTab
                        header={
                          <span className="flex align-items-center gap-2 w-full">
                            <span className="white-space-nowrap">
                              PROFILE INFORMATION
                            </span>
                            <Badge value="-" className="ml-auto" />
                          </span>
                        }
                      >
                        <Row className="mb-2">
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="company" className="block">
                                Company
                              </label>
                              <InputText
                                id="company"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="website" className="block">
                                Website
                              </label>
                              <InputText
                                id="website"
                                type="url"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="email" className="block">
                                Email
                              </label>
                              <InputText
                                id="email"
                                type="email"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="phone" className="block">
                                Phone Number
                              </label>
                              <InputText
                                id="phone"
                                type="tel"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="yearFounded" className="block">
                                Year Founded
                              </label>
                              <InputText
                                id="yearFounded"
                                type="number"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="specialties" className="block">
                                Specialties
                              </label>
                              <InputText
                                id="specialties"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="industry" className="block">
                                Industry
                              </label>
                              <InputText
                                id="industry"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="companySize" className="block">
                                Company Size
                              </label>
                              <InputText
                                id="companySize"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="categories" className="block">
                                Categories
                              </label>
                              <InputText
                                id="categories"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-2 align-items-end">
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="groups" className="block">
                                Groups
                              </label>
                              <InputText
                                id="groups"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="userIds" className="block">
                                User IDs
                              </label>
                              <InputText
                                id="userIds"
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <input type="checkbox" className="me-2" />
                              <label htmlFor="jobType">Private</label>
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col lg={6}>
                            <div className="p-field">
                              <label htmlFor="address" className="block">
                                Address
                              </label>
                              <InputTextarea
                                id="address"
                                rows={3}
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="p-field">
                              <label htmlFor="overview" className="block">
                                Overview
                              </label>
                              <InputTextarea
                                id="overview"
                                rows={3}
                                placeholder=""
                                className="block w-full"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={12}>
                            <div className="p-field">
                              <label htmlFor="jobType" className="block">
                                Notes
                              </label>
                              <InputTextarea
                                autoResize
                                value={description}
                                onChange={e => setDescription(e.target.value)}
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
                            {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" shape="circle" /> */}
                            <span className="white-space-nowrap">
                              DOCUMENTS
                            </span>
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
                                tableStyle={{ minWidth: "50rem" }}
                              >
                                <Column
                                  field="docType"
                                  header="Document Type"
                                  expander
                                ></Column>
                                <Column
                                  field="docSubject"
                                  header="Document Subject"
                                ></Column>
                                <Column
                                  field="appliedDateTime"
                                  header="Applied Date & Time"
                                ></Column>
                                <Column
                                  headerClassName="w-10rem"
                                  header="Actions"
                                />
                              </TreeTable>
                            </div>
                          </Col>
                        </Row>
                      </AccordionTab>
                    </Accordion>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel header="Activities" leftIcon="pi pi-calendar mr-2">
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
                          onSelectionChange={e =>
                            setSelectedActivities(e.value)
                          }
                          selectionMode="multiple"
                          resizableColumns
                          columnResizeMode="expand"
                        >
                          <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                          />
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
              <TabPanel header="Pipeline" leftIcon="pi pi-cog mr-2">
                <Row>
                  <Col lg={12}>
                    <div className="pipelinetabs">
                      <TabView
                        scrollable
                        style={{ maxWidth: "1200px", overflow: "hidden" }}
                      >
                        <TabPanel
                          header="All Jobs"
                          rightIcon={
                            <Badge
                              value="7"
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <section className="job-datatable-section">
                            <div className="card1 mt-3 mb-4 actjobsumtable">
                              <DataTable
                                responsive
                                showGridlines
                                value={allJobs}
                                tableStyle={{
                                  minWidth: "50rem",
                                  borderRadius: "8px",
                                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                }}
                                paginator
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                filters={allJobsFilters}
                                filterDisplay="row"
                                globalFilterFields={[
                                  "stage",
                                  "jobid",
                                  "job_title",
                                  "contact",
                                  "status",
                                  "create_date",
                                  "user_id",
                                ]}
                                emptyMessage="No jobs found."
                                selection={selectedAllJobs}
                                onSelectionChange={e =>
                                  setSelectedAllJobs(e.value)
                                }
                                selectionMode="multiple"
                                resizableColumns
                                columnResizeMode="expand"
                              >
                                <Column
                                  selectionMode="multiple"
                                  headerStyle={{ width: "3em" }}
                                />
                                <Column
                                  field="stage"
                                  header="Stage"
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
                                  field="contact"
                                  header="Contact"
                                  sortable
                                  filter
                                  style={{ minWidth: "10rem" }}
                                />
                                <Column
                                  field="status"
                                  header="Status"
                                  sortable
                                  filter
                                  style={{ minWidth: "10rem" }}
                                />
                                <Column
                                  field="create_date"
                                  header="Create Date"
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
                        </TabPanel>
                        <TabPanel
                          header="Open Jobs"
                          rightIcon={
                            <Badge
                              value="3"
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                  <DataTable
                                    responsive
                                    showGridlines
                                    value={openJobs}
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
                                    filters={openJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "stage",
                                      "jobid",
                                      "job_title",
                                      "contact",
                                      "status",
                                      "create_date",
                                      "user_id",
                                    ]}
                                    emptyMessage="No open jobs found."
                                    selection={selectedOpenJobs}
                                    onSelectionChange={e =>
                                      setSelectedOpenJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="stage"
                                      header="Stage"
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
                                      field="contact"
                                      header="Contact"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="status"
                                      header="Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="create_date"
                                      header="Create Date"
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
                        <TabPanel
                          header="Closed Jobs"
                          rightIcon={
                            <Badge
                              value="10"
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                  <DataTable
                                    responsive
                                    showGridlines
                                    value={closedJobs}
                                    tableStyle={{
                                      minWidth: "50rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={closedJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "stage",
                                      "jobid",
                                      "job_title",
                                      "contact",
                                      "status",
                                      "create_date",
                                      "user_id",
                                    ]}
                                    emptyMessage="No closed jobs found."
                                    selection={selectedClosedJobs}
                                    onSelectionChange={e =>
                                      setSelectedClosedJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="stage"
                                      header="Stage"
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
                                      field="contact"
                                      header="Contact"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="status"
                                      header="Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="create_date"
                                      header="Create Date"
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
                        <TabPanel
                          header="Submitted"
                          rightIcon={
                            <Badge
                              value="4"
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                  <DataTable
                                    responsive
                                    showGridlines
                                    value={submittedJobs}
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
                                    filters={submittedJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "stage",
                                      "candidate",
                                      "jobid",
                                      "job_title",
                                      "contact",
                                      "location",
                                      "create_date",
                                      "user_id",
                                    ]}
                                    emptyMessage="No submitted jobs found."
                                    selection={selectedSubmittedJobs}
                                    onSelectionChange={e =>
                                      setSelectedSubmittedJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="stage"
                                      header="Stage"
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
                                      field="contact"
                                      header="Contact"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="location"
                                      header="Location"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="create_date"
                                      header="Create Date"
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
                        <TabPanel
                          header="Interviews"
                          rightIcon={
                            <Badge
                              value="2"
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                  <DataTable
                                    responsive
                                    showGridlines
                                    value={interviews}
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
                                    filters={interviewsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "stage",
                                      "jobid",
                                      "candidate",
                                      "job_title",
                                      "contact",
                                      "location",
                                      "create_date",
                                      "user_id",
                                    ]}
                                    emptyMessage="No interview records found."
                                    selection={selectedInterviews}
                                    onSelectionChange={e =>
                                      setSelectedInterviews(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="stage"
                                      header="Stage"
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
                                      field="contact"
                                      header="Contact"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="location"
                                      header="Location"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="create_date"
                                      header="Create Date"
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
                        <TabPanel
                          header="Placements"
                          rightIcon={
                            <Badge
                              value="5"
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                  <DataTable
                                    responsive
                                    showGridlines
                                    value={placements}
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
                                    filters={placementsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "stage",
                                      "jobid",
                                      "candidate",
                                      "job_title",
                                      "contact",
                                      "location",
                                      "create_date",
                                      "user_id",
                                    ]}
                                    emptyMessage="No placement records found."
                                    selection={selectedPlacements}
                                    onSelectionChange={e =>
                                      setSelectedPlacements(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="stage"
                                      header="Stage"
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
                                      field="contact"
                                      header="Contact"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="location"
                                      header="Location"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="create_date"
                                      header="Create Date"
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
                      </TabView>
                    </div>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel header="Contacts" leftIcon="pi pi-cog mr-2">
                <Row>
                  <Col lg={12}>
                    <section className="contacts-datatable-section">
                      <div className="card1 mt-3 mb-4 actjobsumtable">
                        <DataTable
                          responsive
                          showGridlines
                          value={contacts}
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
                          filters={contactsFilters}
                          filterDisplay="row"
                          globalFilterFields={[
                            "full_name",
                            "job_title",
                            "work_phone",
                            "work_email",
                            "city",
                            "user_id",
                          ]}
                          emptyMessage="No contacts found."
                          selection={selectedContacts}
                          onSelectionChange={e => setSelectedContacts(e.value)}
                          selectionMode="multiple"
                          resizableColumns
                          columnResizeMode="expand"
                        >
                          <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                          />
                          <Column
                            field="full_name"
                            header="Full Name"
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
                            field="work_phone"
                            header="Work Phone"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="work_email"
                            header="Work Email"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="city"
                            header="City"
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
              <TabPanel header="Candidates" leftIcon="pi pi-calendar mr-2">
                <Row>
                  <Col lg={12}>
                    <section className="candidates-datatable-section">
                      <div className="card1 mt-3 mb-4 actjobsumtable">
                        <DataTable
                          responsive
                          showGridlines
                          value={candidates}
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
                          filters={candidatesFilters}
                          filterDisplay="row"
                          globalFilterFields={[
                            "full_name",
                            "job_title",
                            "mob_phone",
                            "email",
                            "city",
                            "user_id",
                          ]}
                          emptyMessage="No candidates found."
                          selection={selectedCandidates}
                          onSelectionChange={e =>
                            setSelectedCandidates(e.value)
                          }
                          selectionMode="multiple"
                          resizableColumns
                          columnResizeMode="expand"
                        >
                          <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                          />
                          <Column
                            field="full_name"
                            header="Full Name"
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
                            field="mob_phone"
                            header="Mobile Phone"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="email"
                            header="Email"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="city"
                            header="City"
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
              <TabPanel header="History" leftIcon="pi pi-clock mr-2">
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
                          onSelectionChange={e => setSelectedHistory(e.value)}
                          selectionMode="multiple"
                          resizableColumns
                          columnResizeMode="expand"
                        >
                          <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                          />
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
              <TabPanel header="Notes" leftIcon="pi pi-pencil mr-2">
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
                        onTextChange={e => setEditorContent(e.htmlValue)}
                        style={{ height: "200px" }}
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
                              <strong className="text-muted me-4">
                                {note.candidateName}
                              </strong>
                              <strong className="text-muted">
                                {note.timestamp}
                              </strong>
                            </div>
                            <div className="d-flex justify-content-between mt-2 mb-0">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: note.content,
                                }}
                              />
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

      {/* view page ends */}
    </React.Fragment>
  )
}
export default CompaniesTaskList


