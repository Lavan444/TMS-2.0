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
import { MultiSelect } from "primereact/multiselect"
import { Checkbox } from "primereact/checkbox"
import { Chips } from "primereact/chips"
import { TreeSelect } from "primereact/treeselect"
import { Tooltip } from "primereact/tooltip"
import { ContextMenu } from "primereact/contextmenu"
import { Toast } from "primereact/toast"
import NotesCompanies from "../common-for-all/NotesCompanies"
import NotesCompanies1 from "../common-for-all/NotesCompaniesNames"
import LinkContact2Popup from "pms/common-for-all/LinkContact2Popup"
import LinkContactsPopup from "pms/common-for-all/LinkContactsPopup"
import LinkCandidatesPopup from "pms/common-for-all/LinkCandidatesPopup"
import LinkContactJob from "pms/common-for-all/LinkContactJob"
import MoreACcompanies from "./MoreActionitems"
import { FileUpload } from "primereact/fileupload"
import AddContact from "./AddContact"
import { useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"

const CompaniesAllActive = () => {
  const { first, rows } = useSelector(state => state.calendar.pagination)

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
    { name: "Hyderabad", code: "HYD" },
    { name: "Chennai", code: "CHN" },
    { name: "Mumbai", code: "MUM" },
    { name: "Bangalore", code: "BLR" },
    { name: "Delhi", code: "DEL" },
  ]

  const addStates = [
    { name: "Andhra Pradesh", code: "AP" },
    { name: "Telangana", code: "TG" },
    { name: "Tamil Nadu", code: "TN" },
    { name: "Karnataka", code: "KA" },
    { name: "Kerala", code: "KL" },
  ]

  const addCountries = [
    { name: "India", code: "IN" },
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "Australia", code: "AU" },
  ]

  const labels = [
    { name: "Work from Office (WFO)", code: "WORK" },
    { name: "Work from Home (WFH)", code: "HOME" },
    { name: "Work from Remote (WFR)", code: "REMOTE" },
  ]

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

  // Private state variables
  const [privateDrop, setPrivateDrop] = useState(false)
  const [PrivetDropdown, setPrivetDropdown] = useState([])
  const PrivetDropdownValues = [
    { name: "mahesh", code: "mahesh" },
    { name: "lavan", code: "lavan" },
    { name: "vinay", code: "vinay" },
    { name: "vasanth", code: "vasanth" },
  ]

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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    company: { value: null, matchMode: FilterMatchMode.CONTAINS },
    website: { value: null, matchMode: FilterMatchMode.CONTAINS },
    industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
    companySize: { value: null, matchMode: FilterMatchMode.CONTAINS },
    yearFounded: { value: null, matchMode: FilterMatchMode.CONTAINS },
    overview: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    mobilePhone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    group: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userIds: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastActivityDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    editDate: { value: null, matchMode: FilterMatchMode.CONTAINS },

    if(dtImport) {
      dtImport.reset()
    },
  })

  const [companyData, setCompanyData] = useState([
    {
      id: 1,
      company: "Varun Digital Media",
      website: "www.varundigitalmedia.com",
      industry: "Technology",
      companySize: "100",
      yearFounded: "2010",
      overview: "Leading Digital marketing Provider",
      email: "info@varundigitalmedia.com",
      mobilePhone: "9876543210",
      address: "Begumpet, Hyderabad",
      notes:
        "Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence and drive growth across various industries.",
      category: "Mid-Level",
      group: "above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "08-10-2025",
      createDate: "10-05-2023",
      editDate: "01-1-2025",
    },
    {
      id: 2,
      company: "Pranathi Software Services",
      website: "www.pranathiss.com",
      industry: "Software Development",
      companySize: "250",
      yearFounded: "2015",
      overview: "Providing innovative software solutions worldwide.",
      email: "info@pranathiss.com",
      mobilePhone: "9876543210",
      address: "456 Innovate Lane",
      notes: "Potential partnership opportunity.",
      category: "Mid-Sized",
      group: "above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "05-01-2025",
      createDate: "15-02-2020",
      editDate: "18-02-2025",
    },
    {
      id: 3,
      company: "Green Ventures",
      website: "www.greenventures.com",
      industry: "Renewable Energy",
      companySize: "120",
      yearFounded: "2008",
      overview: "Specializing in sustainable energy solutions.",
      email: "contact@greenventures.com",
      mobilePhone: "1122334455",
      address: "789 Eco Park Avenue",
      notes: "Awarded for sustainability initiatives.",
      category: "Small Business",
      group: "upto 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "02-01-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 4,
      company: "Future Tech",
      website: "www.futuretech.com",
      industry: "Artificial Intelligence",
      companySize: "1000",
      yearFounded: "2005",
      overview: "Leader in AI and machine learning technologies.",
      email: "info@futuretech.com",
      mobilePhone: "2233445566",
      address: "321 AI Boulevard",
      notes: "Hosted AI conference in 2024.",
      category: "Enterprise",
      group: "up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "01-07-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 5,
      company: "Healthify Solutions",
      website: "www.healthifysolutions.com",
      industry: "Healthcare",
      companySize: "750",
      yearFounded: "2012",
      overview: "Delivering advanced healthcare solutions.",
      email: "support@healthifysolutions.com",
      mobilePhone: "3344556677",
      address: "654 Wellness Street",
      notes: "Major client in the healthcare sector.",
      category: "Enterprise",
      group: "up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "40-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 6,
      company: "Bright Minds Inc.",
      website: "www.brightminds.com",
      industry: "Education",
      companySize: "300",
      yearFounded: "2010",
      overview: "Innovating in educational technology.",
      email: "info@brightminds.com",
      mobilePhone: "4455667788",
      address: "567 Knowledge Lane",
      notes: "Developed e-learning platforms.",
      category: "Mid-Sized",
      group: "Above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "05-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 7,
      company: "Urban Designs",
      website: "www.urbandesigns.com",
      industry: "Architecture",
      companySize: "150",
      yearFounded: "2018",
      overview: "Specializing in modern architectural designs.",
      email: "contact@urbandesigns.com",
      mobilePhone: "5566778899",
      address: "789 Modernist Drive",
      notes: "Recently expanded to Europe.",
      category: "Small Business",
      group: "up to 50 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "08-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 8,
      company: "Tech Pioneers",
      website: "www.techpioneers.com",
      industry: "IT Services",
      companySize: "600",
      yearFounded: "2000",
      overview: "Providing comprehensive IT solutions.",
      email: "info@techpioneers.com",
      mobilePhone: "6677889900",
      address: "123 Pioneer Street",
      notes: "Strong presence in Asia.",
      category: "Enterprise",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "09-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 9,
      company: "Eco Builders",
      website: "www.ecobuilders.com",
      industry: "Construction",
      companySize: "200",
      yearFounded: "2016",
      overview: "Experts in sustainable building practices.",
      email: "support@ecobuilders.com",
      mobilePhone: "7788990011",
      address: "432 Eco Road",
      notes: "Won sustainability award in 2023.",
      category: "Enterprise",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "09-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 10,
      company: "Creative Pixels",
      website: "www.creativepixels.com",
      industry: "Design",
      companySize: "50",
      yearFounded: "2020",
      overview: "Offering cutting-edge design solutions.",
      email: "info@creativepixels.com",
      mobilePhone: "8899001122",
      address: "987 Art Avenue",
      notes: "Collaborated with Fortune 500 companies.",
      category: "Enterprise",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "09-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 11,
      company: "Global Traders",
      website: "www.globaltraders.com",
      industry: "E-Commerce",
      companySize: "800",
      yearFounded: "2011",
      overview: "A leading platform for global trade.",
      email: "contact@globaltraders.com",
      mobilePhone: "9900112233",
      address: "101 Trade Center",
      notes: "Expanded to 20 countries in 2024.",
      category: "Enterprise",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "09-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 12,
      company: "NextGen Robotics",
      website: "www.nextgenrobotics.com",
      industry: "Robotics",
      companySize: "400",
      yearFounded: "2017",
      overview: "Innovating automation with AI-powered robotics.",
      email: "info@nextgenrobotics.com",
      mobilePhone: "9988776655",
      address: "789 AI Park",
      notes: "Recently secured Series B funding.",
      category: "Mid-Sized",
      group: "Above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "10-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 13,
      company: "Quantum Innovations",
      website: "www.quantuminnovations.com",
      industry: "Quantum Computing",
      companySize: "150",
      yearFounded: "2019",
      overview: "Advancing the future of quantum technology.",
      email: "support@quantuminnovations.com",
      mobilePhone: "9090909090",
      address: "456 Quantum Street",
      notes: "Developing quantum encryption solutions.",
      category: "Small Business",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "11-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 14,
      company: "Cyber Shield",
      website: "www.cybershield.com",
      industry: "Cybersecurity",
      companySize: "500",
      yearFounded: "2014",
      overview: "Providing next-gen cybersecurity solutions.",
      email: "contact@cybershield.com",
      mobilePhone: "7777777777",
      address: "321 Security Lane",
      notes: "Partnered with government organizations.",
      category: "Enterprise",
      group: "Above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "12-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 15,
      company: "AgriTech Solutions",
      website: "www.agritechsolutions.com",
      industry: "Agriculture",
      companySize: "220",
      yearFounded: "2016",
      overview: "Innovating smart farming technologies.",
      email: "info@agritechsolutions.com",
      mobilePhone: "6666666666",
      address: "654 Greenway Boulevard",
      notes: "Developed AI-based crop monitoring tools.",
      category: "Mid-Sized",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "13-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 16,
      company: "BlueWave Networks",
      website: "www.bluewavenetworks.com",
      industry: "Telecommunications",
      companySize: "700",
      yearFounded: "2003",
      overview: "Pioneering high-speed communication networks.",
      email: "support@bluewavenetworks.com",
      mobilePhone: "5555555555",
      address: "987 Signal Lane",
      notes: "Launched 5G services in multiple cities.",
      category: "Enterprise",
      group: "Above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "14-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 17,
      company: "Neon BioTech",
      website: "www.neonbiotech.com",
      industry: "Biotechnology",
      companySize: "180",
      yearFounded: "2011",
      overview: "Developing breakthrough biotech solutions.",
      email: "info@neonbiotech.com",
      mobilePhone: "4444444444",
      address: "567 BioPark",
      notes: "Researching cancer treatment advancements.",
      category: "Small Business",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "15-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 18,
      company: "SmartGrid Energy",
      website: "www.smartgridenergy.com",
      industry: "Energy",
      companySize: "350",
      yearFounded: "2006",
      overview: "Providing smart energy solutions worldwide.",
      email: "support@smartgridenergy.com",
      mobilePhone: "3333333333",
      address: "432 Power Street",
      notes: "Implemented smart grids in multiple states.",
      category: "Mid-Sized",
      group: "Above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "16-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 19,
      company: "CloudSync Solutions",
      website: "www.cloudsyncsolutions.com",
      industry: "Cloud Computing",
      companySize: "600",
      yearFounded: "2013",
      overview: "Leading provider of cloud-based applications.",
      email: "contact@cloudsyncsolutions.com",
      mobilePhone: "2222222222",
      address: "678 Cloud Park",
      notes: "Expanded cloud storage offerings.",
      category: "Enterprise",
      group: "Above 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "17-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
    {
      id: 20,
      company: "Urban Mobility",
      website: "www.urbanmobility.com",
      industry: "Transportation",
      companySize: "450",
      yearFounded: "2009",
      overview: "Enhancing urban transport solutions.",
      email: "info@urbanmobility.com",
      mobilePhone: "1111111111",
      address: "876 Transit Avenue",
      notes: "Developed an AI-driven traffic system.",
      category: "Mid-Sized",
      group: "Up to 250 crore",
      userIds: "Harish",
      createdBy: "Harish Jaram",
      lastActivityDate: "18-02-2025",
      createDate: "18-02-2025",
      editDate: "21-02-2025",
    },
  ])

  const [selectedCompanyData, setSelectedCompanyData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageState, setPageState] = useState({ rows: 10, first: 0 })

  const onPage = event => {
    setPageState({ rows: event.rows, first: event.first })
  }

  const dt = useRef(null)
  const subjectTemplate = rowData => {
    const words = rowData.notes.split(" ").slice(0, 2).join(" ") + "..." // Show only first 2 words
    return (
      <span data-pr-tooltip={rowData.notes} data-pr-position="top">
        {words}
      </span>
    )
  }
  // context menu starts
  const toast = useRef(null) // Reference for Toast notifications
  const navigate = useNavigate()
  const cm = useRef(null) // Reference for ContextMenu
  const [selectedCompany, setSelectedCompany] = useState(null) // State to track the right-clicked company
  // Context menu options
  const menuModel = [
    {
      label: "View",
      icon: "pi pi-fw pi-eye",
      command: () => {
        setVisibleViewRight(true)
      },
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => navigate("/companies-editform"),
    },
    { label: "Archived", icon: "pi pi-check-circle" },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      command: () => deleteCompany(selectedCompany),
    },
    {
      label: "Schedule",
      icon: "pi pi-calendar-clock",
      items: [
        {
          label: "Interview",
          icon: "pi pi-calendar-plus",
        },
        { label: "Call", icon: "pi pi-phone" },
        { label: "Meeting", icon: "pi pi-users" },
        { label: "Task", icon: "pi pi-list" },
        { label: "Event", icon: "pi pi-calendar-clock" },
        { label: "Other", icon: "pi pi-ellipsis-h" },
      ],
    },
    {
      label: "More",
      icon: "pi pi-ellipsis-h",
      items: [
        // Subitems for "Schedule"
        { label: "Attachments", icon: "pi pi-link" },
        { label: "Change Status", icon: "pi pi-sync" },
      ],
    },
    { label: "Company Notes", icon: "pi pi-clipboard" },
    { label: "Export", icon: "pi pi-file-export" },
    {
      label: "Clear Search",
      icon: "pi pi-sync",
      command: () => handleClearSearchCompanies(),
    },
  ]

  // Function to handle viewing a company
  const viewCompany = company => {
    toast.current.show({
      severity: "info",
      summary: "Company Selected",
      detail: company.company,
    })
  }

  // Function to handle editing a company
  const editCompany = company => {
    toast.current.show({
      severity: "success",
      summary: "Edit Company",
      detail: `Editing ${company.firstName} ${company.lastName}`,
    })
  }

  // Function to handle deleting a company
  const deleteCompany = company => {
    let _companies = [...companyData]
    _companies = _companies.filter(c => c.id !== company.id)
    setCompanyData(_companies) // Update the contact data state
    toast.current.show({
      severity: "error",
      summary: "Company Deleted",
      detail: `${company.company}`,
    })
  }

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
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Lavankumar Kalvala",
      status: "Active",
      create_date: "18-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Applied",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Venkata Laxmi Valle",
      status: "Active",
      create_date: "18-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Applied",
      jobid: "Job-102",
      job_title: "SEO",
      contact: "Bhargavi Sunanda",
      status: "Active",
      create_date: "10-01-2025",
      user_id: "Bhavani",
    },
    {
      stage: "Applied",
      jobid: "Job-103",
      job_title: "Content Writer",
      contact: "Nagendra Meriga",
      status: "Active",
      create_date: "01-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Applied",
      jobid: "Job-104",
      job_title: "Backend Developer",
      contact: "Saikumar Kunda",
      status: "Active",
      create_date: "01-02-2025",
      user_id: "Bhavani",
    },
    {
      stage: "Applied",
      jobid: "Job-106",
      job_title: "Data Scientist",
      contact: "Vasanth Gudula",
      status: "Active",
      create_date: "01-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Applied",
      jobid: "Job-101",
      job_title: "UI/UX Designer",
      contact: "Ajay Edavena",
      status: "Active",
      create_date: "10-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Applied",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Ruchitha Emmadi",
      status: "Active",
      create_date: "16-02-2025",
      user_id: "Bhavani",
    },
    {
      stage: "Applied",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Chandana Modugula",
      status: "Active",
      create_date: "16-02-2025",
      user_id: "Giri",
    },
    {
      stage: "Applied",
      jobid: "Job-107",
      job_title: "Frontend Developer",
      contact: "RajaShekar Konda",
      status: "Active",
      create_date: "05-02-2025",
      user_id: "Sai krishna",
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
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Lavankumar Kalvala",
      status: "Active",
      create_date: "18-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Open",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Venkata Laxmi Valle",
      status: "Active",
      create_date: "18-02-2025",
      user_id: "Harish",
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
      stage: "Open",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Lavankumar Kalvala",
      status: "Active",
      create_date: "18-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Open",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Venkata Laxmi Valle",
      status: "Active",
      create_date: "18-02-2025",
      user_id: "Harish",
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
      candidate: "Lavankumar Kalvala",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Mahesh Kumar Bhoga",
      location: "Hyderabad",
      create_date: "18-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Submitted",
      candidate: "Venkata Laxmi Valle",
      jobid: "Job-101",
      job_title: "Frontend Developer",
      contact: "Mahesh Kumar Bhoga",
      location: "Hyderabad",
      create_date: "18-02-2025",
      user_id: "Harish",
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
      jobid: "Job-101",
      candidate: "Lavankumar Kalvala",
      job_title: "Frontend Developer",
      contact: "Mahesh Kumar Bhoga",
      location: "Hyderabad",
      create_date: "18-02-2025",
      user_id: "Harish",
    },
    {
      stage: "Interview",
      jobid: "Job-101",
      candidate: "Venkata Laxmi Valle",
      job_title: "Frontend Developer",
      contact: "Mahesh Kumar Bhoga",
      location: "Hyderabad",
      create_date: "18-02-2025",
      user_id: "Harish",
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
      jobid: "Job-101",
      candidate: "Lavankumar Kalvala",
      job_title: "Frontend Developer",
      contact: "Mahesh Kumar Bhoga",
      location: "Hyderabad",
      create_date: "18-02-2025",
      user_id: "Harish",
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
  ]

  const [selectedActivities, setSelectedActivities] = useState([])

  // view form activities ends


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
    {
      task_code: "Task-103",
      task_type: "Task",
      project_name: "AI Generator (Proj-101)",
      project_manager: "Nitin Sharma",
      module_name: "Project Dashboard",
      task_name: "Create Gantt Chart View",
      task_description: "Add a Gantt chart to visualize project timelines.",
      created_by: "Rajashree Banerjee",
      assigned_by: "Nitin Sharma",
      assigned_to: "Amit Choudhary",
      watchers: "Rajashree Banerjee, Nitin Sharma",
      start_date: "06-05-2025",
      work_hours: 14,
      end_date: "09-05-2025",
      actual_end_date: "07-05-2025",
      task_status: "In Progress",
      priority: "High",
      approval_status: "Pending",
    },
    {
      task_code: "STask-103.1",
      task_type: "Sub Task",
      project_name: "AI Generator (Proj-101)",
      project_manager: "Arun Pillai",
      module_name: "Notification Center",
      task_name: "Add SMS Alert Integration",
      task_description: "Integrate Twilio API to send SMS alerts to users.",
      created_by: "Pooja Srinivasan",
      assigned_by: "Arun Pillai",
      assigned_to: "Rohit Varma",
      watchers: "Pooja Srinivasan",
      start_date: "04-05-2025",
      work_hours: 7,
      end_date: "05-05-2025",
      actual_end_date: "05-05-2025",
      task_status: "In Review",
      priority: "Medium",
      approval_status: "Approved",
    },
    {
      task_code: "Bug-103.1",
      task_type: "Bug",
      project_name: "AI Generator (Proj-101)",
      project_manager: "Devansh Goyal",
      module_name: "File Management",
      task_name: "Optimize File Uploads",
      task_description: "Improve file upload speed and add progress indicator.",
      created_by: "Sneha Rathi",
      assigned_by: "Devansh Goyal",
      assigned_to: "Ravi Sekhar",
      watchers: "Sneha Rathi, Devansh Goyal",
      start_date: "03-05-2025",
      work_hours: 6,
      end_date: "04-05-2025",
      actual_end_date: "04-05-2025",
      task_status: "Completed",
      priority: "Low",
      approval_status: "Approved",
    },
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
      full_name: "Mahesh Kumar Bhoga",
      job_title: "UI/UX Manager",
      work_phone: "040 456 7890",
      work_email: "mahesh9@varundigitalmedia.com",
      city: "Hyderabad",
      user_id: "Harish",
    },

    {
      full_name: "Salmanuddin Syed",
      job_title: "Operation Head",
      work_phone: "040 654 3210",
      work_email: "salman@varundigitalmedia.com",
      city: "Hyderabad",
      user_id: "Haish",
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
  const [editingRow, setEditingRow] = useState(null)
  const [editedValue, setEditedValue] = useState({})
  const [documents, setDocuments] = useState([
    {
      key: "1",
      data: {
        id: "1",
        docType: "Invoice",
        docSubject: "Invoice #78965 - Pranathi Software Services",
        appliedDateTime: "2023-10-01 10:30 AM",
      },
    },
    {
      key: "2",
      data: {
        id: "2",
        docType: "Payment Receipt",
        docSubject: "Payment Receipt - Green Ventures",
        appliedDateTime: "2023-10-02 02:15 PM",
      },
    },
  ])

  // Start editing a row
  const handleEdit = rowKey => {
    setEditingRow(rowKey)
    setEditedValue(documents.find(doc => doc.key === rowKey)?.data || {})
  }

  // Save changes
  const handleSave = () => {
    setDocuments(prevDocuments =>
      prevDocuments.map(doc =>
        doc.key === editingRow ? { ...doc, data: editedValue } : doc
      )
    )
    setEditingRow(null)
  }

  // Delete a row
  const handleDelete = rowKey => {
    setDocuments(prevDocuments =>
      prevDocuments.filter(doc => doc.key !== rowKey)
    )
  }

  // Editable input field
  const editableTemplate = (rowData, field) => {
    return editingRow === rowData.key ? (
      <InputText
        value={editedValue[field] || ""}
        onChange={e =>
          setEditedValue({ ...editedValue, [field]: e.target.value })
        }
        autoFocus
      />
    ) : (
      <span onClick={() => handleEdit(rowData.key)}>{rowData.data[field]}</span>
    )
  }

  // Action buttons
  const actionTemplate = rowData => {
    return (
      <div className="flex gap-2">
        {editingRow === rowData.key ? (
          <Button
            icon="pi pi-check"
            rounded
            outlined
            className="document-btn"
            onClick={handleSave}
          />
        ) : (
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="document-btn"
            onClick={() => handleEdit(rowData.key)}
          />
        )}
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="document-btn"
          onClick={() => handleDelete(rowData.key)}
        />
      </div>
    )
  }

  // view page ends

  const [showesitSelecticon, setshowesitSelecticon] = useState(false)
  const [showesitSelect, setshowesitSelect] = useState(true)
  const [showIconsSelect, setShowIconsSelect] = useState(false)

  const [selectedSchedule, setSelectedSchedule] = useState(null)

  const actScheduleOptions = [
    // {
    //   name: 'Interview',
    //   code: 'SCH-IN',
    //   icon: 'pi pi-user',
    //   action: () => SetInterviewpop(true),
    // },
    {
      name: "Call",
      code: "SCH-CA",
      icon: "pi pi-phone",
      // action: () => SetInterviewpopCall(true),
      action: () => SetInterviewpop(true),
    },
    {
      name: "Meeting",
      code: "SCH-ME",
      icon: "pi pi-calendar",
      // action: () => SetInterviewpopMeeting(true),
      action: () => SetInterviewpop(true),
    },
    {
      name: "Task",
      code: "SCH-TA",
      icon: "pi pi-check-square",
      // action: () => SetInterviewpopTask(true),
      action: () => SetInterviewpop(true),
    },
    // {
    //   name: 'Event',
    //   code: 'SCH-EV',
    //   icon: 'pi pi-bell',
    //   // action: () => SetInterviewpopEvent(true),
    //   action: () => SetInterviewpop(true),

    // },
    {
      name: "Other",
      code: "SCH-OT",
      icon: "pi pi-ellipsis-h",
      // action: () => SetInterviewpopOther(true),
      action: () => SetInterviewpop(true),
    },
  ]

  const handleScheduleChange = e => {
    setSelectedSchedule(e.value)
    setIntertype(e.value.name) // Update input field with selected name

    // Trigger the action if it exists
    if (e.value && e.value.action) {
      e.value.action()
    }
  }

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

  const [selectedLinkJob, setSelectedLinkJob] = useState(null)
  const moreoptions = [
    {
      name: "Attachments",
    },
    {
      name: "Change Status",
    },
    {
      name: "Delete",
    },
  ]

  // clear search start

  const handleClearSearchCompanies = () => {
    console.log("clicked")

    setFilters({
      company: { value: null, matchMode: FilterMatchMode.CONTAINS },
      website: { value: null, matchMode: FilterMatchMode.CONTAINS },
      industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
      companySize: { value: null, matchMode: FilterMatchMode.CONTAINS },
      yearFounded: { value: null, matchMode: FilterMatchMode.CONTAINS },
      overview: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      mobilePhone: { value: null, matchMode: FilterMatchMode.CONTAINS },
      address: { value: null, matchMode: FilterMatchMode.CONTAINS },
      notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      group: { value: null, matchMode: FilterMatchMode.CONTAINS },
      userIds: { value: null, matchMode: FilterMatchMode.CONTAINS },
      createdBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
      lastActivityDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
      createDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
      editDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
    console.log("clickeddddddd")
  }

  console.log("Selected data to delete:", selectedCompanyData)
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
    console.log("Before deletion, companyData:", companyData)
    console.log("Deleting these items:", selectedCompanyData)

    setCompanyData(prevData => {
      const updatedData = prevData.filter(
        row =>
          !selectedCompanyData.some(selectedRow => selectedRow.id === row.id)
      )
      console.log("After deletion, companyData:", updatedData)
      return updatedData
    })

    setSelectedCompanyData([]) // Clear selection after deletion
    setShowConfirmDialog(false) // Hide the dialog after deletion
  }

  //   delete end

  // interview popup starts

  // Popup dialog const values start

  const [interviewpop, SetInterviewpop] = useState(false)
  const [interviewpopCall, SetInterviewpopCall] = useState(false)
  const [interviewpopMeeting, SetInterviewpopMeeting] = useState(false)
  const [interviewpopTask, SetInterviewpopTask] = useState(false)
  const [interviewpopEvent, SetInterviewpopEvent] = useState(false)
  const [interviewpopOther, SetInterviewpopOther] = useState(false)

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

  // const typeInterview = [
  //   { name: 'Inperson', value: 'Inperson' },
  //   { name: 'Audio', value: 'Audio' },
  //   { name: 'Video', value: 'Video' },
  // ];
  const [reminder, setReminder] = useState(null)
  const reminderOptions = [
    { name: "0 mins", value: "0 mins" },
    { name: "5 mins", value: "5 mins" },
    { name: "10 mins", value: "10 mins" },
    { name: "15 mins", value: "15 mins" },
    { name: "30 mins", value: "30 mins" },
  ]
  const [repeat, setRepeat] = useState(null)
  const repeatOptions = [
    { name: "Do not repeat", value: "none" },
    { name: "Daily", value: "daily" },
    { name: "Weekly", value: "weekly" },
    { name: "Mon-Fri", value: "mon-fri" },
  ]

  const [followup, setFollowup] = useState(null)

  // Dropdown options
  const followupOptions = [
    { name: "None", value: "none" },
    { name: "1 Day", value: "1 Day" },
    { name: "2 Days", value: "2 Day" },
    { name: "3 Days", value: "3 Day" },
  ]

  // const [typeInterviewval, settypeInterviewval] = useState([])
  // const [typeInterviewcontact, settypeInterviewcontact] = useState([])
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

  const [popchecked, setPopchecked] = useState(false)

  const handlePopupCheckbox = e => {
    setPopchecked(e.checked)
  }

  // interview popup ends

  // short form starts
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

  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null)

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
  ])

  const [selectedGroupKey, setSelectedGroupKey] = useState(null)

  // short form ends

  // Export code start

  const [importCsvIcons, setImportCsvIcons] = useState(false)
  const dtImport = useRef(null)

  const exportCSVBtn = selectionOnly => {
    if (dtImport.current) {
      dtImport.current.exportCSV({ selectionOnly })
    } else {
      alert("DataTable reference not found.")
    }
  }

  const exportPdfBtn = () => {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("landscape")

        // Extract headers from DataTable columns
        const exportColumns = [
          "Company",
          "Website",
          "Industry",
          "Company Size",
          "Year Founded",
          "Email",
          "Mobile Phone",
          "Address",
          "Notes",
          "Category",
          "Group",
          "User IDs",
          "Created By",
          "Last Activity Date",
          "Create Date",
          "Edit Date",
        ]

        // Map data fields to match DataTable
        const exportData = companyData.map(row => [
          row.company || "-",
          row.website || "-",
          row.industry || "-",
          row.companySize || "-",
          row.yearFounded || "-",
          row.email || "-",
          row.mobilePhone || "-",
          row.address || "-",
          row.notes || "-",
          row.category || "-",
          row.group || "-",
          row.userIds || "-",
          row.createdBy || "-",
          row.lastActivityDate || "-",
          row.createDate || "-",
          row.editDate || "-",
        ])

        console.log("Export Columns:", exportColumns)
        console.log("Export Data:", exportData)

        if (exportColumns.length === 0 || exportData.length === 0) {
          alert("No data available for export.")
          return
        }

        doc.autoTable({
          head: [exportColumns],
          body: exportData,
          startY: 20,
          styles: { fontSize: 8, cellPadding: 2 },
          theme: "grid",
          margin: { top: 10, left: 5, right: 5 },
          columnStyles: { 0: { cellWidth: 30 } },
        })

        doc.save("company_data.pdf")
      })
    })
  }

  const exportExcelBtn = () => {
    import("xlsx").then(xlsx => {
      const exportData = companyData.map(row => ({
        Company: row.company || "-",
        Website: row.website || "-",
        Industry: row.industry || "-",
        "Company Size": row.companySize || "-",
        "Year Founded": row.yearFounded || "-",
        Email: row.email || "-",
        "Mobile Phone": row.mobilePhone || "-",
        Address: row.address || "-",
        Notes: row.notes || "-",
        Category: row.category || "-",
        Group: row.group || "-",
        "User IDs": row.userIds || "-",
        "Created By": row.createdBy || "-",
        "Last Activity Date": row.lastActivityDate || "-",
        "Create Date": row.createDate || "-",
        "Edit Date": row.editDate || "-",
      }))

      const worksheet = xlsx.utils.json_to_sheet(exportData)
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] }
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      })

      saveAsExcelFile(excelBuffer, "company_data")
    })
  }

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then(module => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        const EXCEL_EXTENSION = ".xlsx"
        const data = new Blob([buffer], { type: EXCEL_TYPE })

        module.default.saveAs(
          data,
          `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
        )
      }
    })
  }

  const headerBtn = (
    <div className="flex align-items-center justify-content-end gap-1 actionitem-import">
      <Button
        className="csvbtn p-button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSVBtn(false)}
        tooltip="Export to CSV"
      />
      <Button
        className="xlsbtn p-button"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={exportExcelBtn}
        tooltip="Export to Excel"
      />
      <Button
        className="pdfbtn p-button me-2"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={exportPdfBtn}
        disabled={companyData.length === 0}
        tooltip="Export to PDF"
      />
    </div>
  )

  // Export code end

  const typeInterviewcontact = [
    { name: "Harish", value: "Harish" },
    { name: "Giri", value: "Giri" },
    { name: "Pavan", value: "Pavan" },
  ]

  const typeInterviewval = [
    { name: "Open", value: "Open" },
    { name: "Closed", value: "1 Day" },
    { name: "On Hold", value: "2 Day" },
    // { name: '3 Days', value: '3 Day' },
  ]

  const priorityValue = [
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },
  ]

  // view pages input values

  const [company1, setCompany1] = useState("Varun Digital Media")
  const [website1, setWebsite1] = useState("www.varundigitalmedia.com")
  const [email1, setEmail1] = useState("info@varundigitalmedia.com")
  const [phno1, setPhno1] = useState("9876543210")
  const [yearfounded1, setYearfounded1] = useState("2010")
  const [specialties1, setSpecialties1] = useState("Digital Marketing Services")
  const [industry1, setIndustry1] = useState("Technology")
  const [companysize1, setCompanysize1] = useState("100")
  const [categories1, setCategories1] = useState("Mid-Level")
  const [groups1, setGroups1] = useState("100")
  const [userid1, setUserid1] = useState("Harish")
  const [address1, setAddress1] = useState("100")
  const [notes1, setNotes1] = useState(
    "Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence and drive growth across various industries."
  )
  const [overview1, setOverview1] = useState(
    "Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence and drive growth across various industries."
  )
  const [categoryValue, setCategoryValue] = useState("Large Enterprise")
  const [groupValue, setGroupValue] = useState("Above 250 crore")
  const [selectedCategory1, setSelectedCategory1] = useState(null)

  const categoryOptions = [
    { label: "Micro Enterprise", value: "micro" },
    { label: "Small Enterprise", value: "small" },
    { label: "Medium Enterprise", value: "medium" },
    { label: "Large Enterprise", value: "large" },
  ]

  const [selectedGroup1, setSelectedGroup1] = useState(null)

  const groupOptions = [
    { label: "Up to 5 Crore", value: "5cr" },
    { label: "Up to 50 Crore", value: "50cr" },
    { label: "Up to 250 Crore", value: "250cr" },
    { label: "Above 250 Crore", value: "above250cr" },
  ]

  const typeInterview = [
    { name: "Screening Interviews", value: "SI" },
    { name: "One-on-One Interviews", value: "OOI" },
    { name: "Technical Interviews", value: "TI" },
    { name: "Final Round Interviews ", value: "FRI" },
    { name: "Video/Virtual Interviews", value: "VVI" },
  ]

  const typeCall = [
    { name: "Initial Screening Calls", value: "ISC" },
    { name: "Technical Assessment Calls", value: "TAC" },
    { name: "Behavioral Interview Calls ", value: "BIC" },
    { name: "Hiring Manager Calls", value: "HMC" },
    { name: "HR/Benefits Discussion Calls", value: "HRBDC" },
    { name: "Reference Check Calls", value: "RCC" },
    { name: "Panel Interview Calls", value: "PIC" },
    { name: "Follow-up Calls ", value: "FC" },
    { name: "Offer Discussion Calls ", value: "ODC" },
    { name: "Onboarding Coordination Calls", value: "OCC" },
    { name: "Status Update Calls", value: "SUC" },
    { name: "Candidate Feedback Calls", value: "CFC" },
  ]

  const typeMeeting = [
    { name: "Planning Meetings", value: "PM" },
    { name: "Job Requirements Meetings", value: "JRM" },
    { name: "Recruitment Team Sync-ups", value: "RTS" },
    { name: "Hiring Committee Meetings", value: "HCM" },
    { name: "Interview Panel Briefings", value: "IPB" },
    { name: "Candidate Feedback Meetings", value: "CFM" },
    { name: "Selection Meetings", value: "SM" },
    { name: "Budget Meetings", value: "BM" },
    { name: "Stakeholder Updates", value: "SU" },
    { name: "Recruitment Vendor Meetings", value: "RVM" },
    { name: "Onboarding Planning Meetings", value: "OPM" },
    { name: "Process Improvement Meetings", value: "PIM" },
    { name: "Training Meetings", value: "TM" },
    { name: "Compliance Meetings", value: "CM" },
  ]

  // contacts short form starts
  const [jobtitle1, setJobtitle1] = useState("UI/UX Manager")

  const companyOptions = [
    { name: "Varun Digital Media", code: "VDM" },
    { name: "Pranathi Software Services", code: "PSS" },
    { name: "Green Ventures pvt Ltd", code: "GV" },
    { name: "Future Tech Solutions", code: "FTS" },
    { name: "Healthify Solutions pvt Ltd", code: "MS" },
  ]

  const [selectedDepartment, setSelectedDepartment] = useState(null)

  const departmentOptions = [
    { name: "Account Finance Team", code: "HR" },
    { name: "SPG US Staffing", code: "FIN" },
    { name: "Vitel Development Team", code: "MKT" },
    { name: "Support Team", code: "ENG" },
    { name: "NOC Team", code: "SAL" },
    { name: "Digital Marketing Team", code: "DIG" },
    { name: "Executive Team", code: "EXE" },
    { name: "Operations Team", code: "OPE" },
  ]

  const [selectedPerson, setSelectedPerson] = useState(null)

  const personOptions = [
    { name: "Salmanuddin Syed", role: "Operation Head", code: "OH" },
    { name: "Girish Bodepu", role: "Manager", code: "MGR" },
    { name: "Suresh Reddy", role: "Team Lead", code: "TL" },
    { name: "Ravi Kumar", role: "Team Lead", code: "TL" },
    { name: "Neha Patel", role: "Team Lead", code: "TL" },
  ]

  // contacts short form ends

  // more attachment
  const onUpload = event => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: `${event.files.length} file(s) uploaded`,
    })
  }
  // more attachment

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
                            <Tooltip
                              target=".view"
                              content="View"
                              position="bottom"
                              style={{ marginTop: "5px" }}
                            />
                            <button
                              type="button"
                              className="btn btn-secondary icons-btn ms-1 view"
                              onClick={() => setVisibleViewRight(true)}
                            >
                              <i className="pi pi-eye"></i>
                            </button>

                            <Tooltip
                              target=".edit"
                              content="Edit"
                              position="top"
                              style={{ marginBottom: "5px" }}
                            />
                            <Link to="/companies-editform">
                              <button
                                type="button"
                                className="btn btn-secondary icons-btn ms-1 edit"
                              >
                                <i className="pi pi-pencil"></i>
                              </button>
                            </Link>

                            <Tooltip
                              target=".delete"
                              content="Delete"
                              position="bottom"
                              style={{ marginTop: "5px" }}
                            />

                            <button
                              type="button"
                              className="btn btn-secondary icons-btn ms-1 delete"
                              onClick={handleDeleteSelected}
                            >
                              <i className="pi pi-trash"></i>
                            </button>

                            <Tooltip
                              target=".archived"
                              content="Archived"
                              position="top"
                              style={{ marginBottom: "5px" }}
                            />
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

                  {/* <CascadeSelect
                    onChange={handleScheduleChange}
                    options={actScheduleOptions}
                    optionLabel="name"
                    optionGroupLabel="name"
                    className="md:w-10rem me-1"
                    optionGroupChildren={['subItems', 'subItems']}
                    breakpoint="767px"
                    placeholder="Schedule"
                  /> */}
                  <MoreACcompanies />
                </span>
              </Col>

              <Col xxl={3} xl={12} lg={12} sm={12}>
                <div className="clr-icons">
                  {selectedCompanyData.length > 0 ? (
                    <NotesCompanies1 />
                  ) : (
                    <NotesCompanies />
                  )}

                  <Tooltip
                    target=".export"
                    content="Export"
                    position="bottom"
                    style={{ marginTop: "5px" }}
                  />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1 export"
                    onClick={() => setImportCsvIcons(!importCsvIcons)}
                  >
                    <i className="pi pi-file-export"></i>
                  </button>

                  {importCsvIcons && <span>{headerBtn}</span>}

                  <Tooltip
                    target=".clear"
                    content="Clear Search"
                    position="bottom"
                    style={{ marginTop: "5px" }}
                  />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1 clear"
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
                <Tooltip target="span[data-pr-tooltip]" />

                <section className="allactjobs-table">
                  {/* Toast for notifications */}
                  <Toast ref={toast} />

                  {/* ContextMenu for right-click actions */}
                  <ContextMenu
                    model={menuModel}
                    ref={cm}
                    onHide={() => setSelectedCompany(null)}
                  />

                  <div className="card1 mt-4 mb-4 actjobsumtable">
                    <DataTable
                      ref={dtImport}
                      value={companyData.slice(first, first + rows)}
                      rows={pageState.rows}
                      first={pageState.first}
                      onPage={onPage}
                      loading={loading}
                      // selection={selectedCompanyData}
                      onSelectionChange={e => setSelectedCompanyData(e.value)}
                      selectionMode="multiple"
                      filters={filters}
                      filterDisplay="row"
                      scrollable
                      selection={selectedCompanyData}
                      resizableColumns
                      reorderableColumns
                      onContextMenu={e => {
                        cm.current.show(e.originalEvent) // Show the context menu
                        setSelectedCompany(e.data) // Set the selected company
                      }}
                      contextMenuSelection={selectedCompany}
                      onContextMenuSelectionChange={e =>
                        setSelectedCompany(e.value)
                      }
                    >
                      <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                      />
                      <Column
                        field="company"
                        header="Company"
                        sortable
                        filter
                      />
                      <Column
                        field="website"
                        header="Website"
                        sortable
                        filter
                      />
                      <Column
                        field="industry"
                        header="Industry"
                        sortable
                        filter
                      />
                      <Column
                        field="companySize"
                        header="Company Size"
                        sortable
                        filter
                      />
                      <Column
                        field="yearFounded"
                        header="Year Founded"
                        sortable
                        filter
                      />
                      {/* <Column field="overview" header="Overview" sortable filter /> */}
                      <Column field="email" header="Email" sortable filter />
                      <Column
                        field="mobilePhone"
                        header="Mobile Phone"
                        sortable
                        filter
                      />
                      <Column
                        field="address"
                        header="Address"
                        sortable
                        filter
                      />
                      <Column
                        field="notes"
                        header="Notes"
                        sortable
                        filter
                        body={subjectTemplate}
                      />
                      <Column
                        field="category"
                        header="Category"
                        sortable
                        filter
                      />
                      <Column field="group" header="Group" sortable filter />
                      <Column
                        field="userIds"
                        header="User IDs"
                        sortable
                        filter
                      />
                      <Column
                        field="createdBy"
                        header="Created By"
                        sortable
                        filter
                      />
                      <Column
                        field="lastActivityDate"
                        header="Last Activity Date"
                        sortable
                        filter
                      />
                      <Column
                        field="createDate"
                        header="Create Date"
                        sortable
                        filter
                      />
                      <Column
                        field="editDate"
                        header="Edit Date"
                        sortable
                        filter
                      />
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
                      <Tooltip
                        target=".closeside"
                        content="Close"
                        position="bottom"
                        style={{ marginBottom: "5px" }}
                      />
                      <Link to="/companies-editform">
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
                    <Row className="mb-2">
                      <Col lg={6}>
                        <div className="p-field">
                          <label htmlFor="company">Company</label>
                          <InputText
                            aria-label="Default select example"
                            value={company1}
                          />
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
                          <InputText
                            placeholder="Enter phone number"
                            value={phno1}
                          />
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
                                      <label htmlFor="street1">Street 1</label>
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
                            onChange={e => setSelectedCategory1(e.value)}
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
                            onChange={e => setSelectedGroup1(e.value)}
                            options={groupOptions}
                            placeholder="Above 250 Crore"
                            className="w-full bgclr"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
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

                    <Row className="align-items-end justify-content-start mb-2 mt-2">
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
                      <Col lg={6}>
                        {privateDrop && (
                          <div className="p-field">
                            <label htmlFor="jobType">User Id's</label>
                            <MultiSelect
                              value={PrivetDropdown}
                              onChange={(e) => setPrivetDropdown(e.value)}
                              options={PrivetDropdownValues}
                              optionLabel="name"
                              display="comma"
                              placeholder="Select User Id's"
                              className="w-full"
                              maxSelectedLabels={8}
                            />
                          </div>
                        )}
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
                <i className="pi pi-building"></i> Company - Varun Digital Media
              </h3>
              <div className="d-flex align-items-center">
                {/* <Link to="/candidate-editform">
                  <p className="mb-0 text-white">
                    <i class="fa-regular fa-pen-to-square me-3"></i>
                  </p>
                </Link> */}
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
                                value={company1}
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
                                value={website1}
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
                                value={email1}
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
                                value={phno1}
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
                                value={yearfounded1}
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
                                value={specialties1}
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
                                value={industry1}
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
                                value={companysize1}
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
                                value={categoryValue}
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
                                placeholder={groupValue}
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
                                value={userid1}
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
                                placeholder="White house, Block - III, 4th Floor, Begumpet, Hyderabad, Telangana, 500016, India"
                                className="block w-full"
                                // value={}
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
                                placeholder="Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence."
                                className="block w-full"
                              />
                            </div>
                          </Col>
                        </Row>

                        {/* <Row>
                          <Col lg={12}>
                            <div className="p-field">
                              <label htmlFor="jobType" className="block">
                                Notes
                              </label>
                              <InputTextarea
                                autoResize
                                value={notes1}
                                // onChange={e => setDescription(e.target.value)}
                                rows={2}
                                cols={40}
                                placeholder=""
                                className="w-full "
                              />
                            </div>
                          </Col>
                        </Row> */}
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
                                tableStyle={{ minWidth: "50rem" }}
                                dataKey="key"
                              >
                                <Column
                                  field="docType"
                                  header="Document Type"
                                  expander
                                  body={rowData =>
                                    editableTemplate(rowData, "docType")
                                  }
                                />
                                <Column
                                  field="docSubject"
                                  header="Document Subject"
                                  body={rowData =>
                                    editableTemplate(rowData, "docSubject")
                                  }
                                />
                                <Column
                                  field="appliedDateTime"
                                  header="Applied Date & Time"
                                  body={rowData =>
                                    editableTemplate(rowData, "appliedDateTime")
                                  }
                                />
                                <Column
                                  body={actionTemplate}
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

                <TabPanel header="Projects" leftIcon="pi pi-calendar mr-2">
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

              <TabPanel header="Work Type" leftIcon="pi pi-calendar mr-2">
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

            

              {/* <TabPanel header="Contacts" leftIcon="pi pi-cog mr-2">
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
                            header="Designation"
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
              <TabPanel header="Employees" leftIcon="pi pi-calendar mr-2">
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
              </TabPanel> */}

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
                          {/* <Column
                            field="priority"
                            header="Priority"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          /> */}
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
                          {/* <Column
                            field="priority"
                            header="Priority"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          /> */}
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
        header="Appointment - Web Developer, (Job-101)"
        visible={interviewpop}
        className="interview-popup"
        style={{ width: "50vw" }}
        // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
        onHide={() => {
          SetInterviewpop(false)
        }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText disabled value={intertype} />
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
                    <label htmlFor="integer" className=" block">
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={e => setSubtype(e.value)}
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
                          onChange={e => setStartdate(e.value)}
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
                          onChange={e => setStarttime(e.value)}
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
                          onChange={e => setenddate(e.value)}
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
                          onChange={e => setendtime(e.value)}
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
                    <label htmlFor="username" className="mb-0">
                      Subject
                    </label>
                    <InputText
                      placeholder="Subject"
                      value={subjectval}
                      onChange={e => setsubjectval(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={e => setPopTextares(e.target.value)}
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
                {!(
                  selectedSchedule?.name === "Interview" ||
                  selectedSchedule?.name === "Call" ||
                  selectedSchedule?.name === "Other"
                ) && (
                  <>
                    <Col xl={6}>
                      <div className="p-field">
                        <label htmlFor="username">Auto Followup</label>
                        <Dropdown
                          value={followup}
                          onChange={e => setFollowup(e.value)}
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
                              onChange={e => setRepeat(e.value)}
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
                              onChange={e => setReminder(e.value)}
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
                        <label For="Priority" className=" block">
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={e => setPriority(e.value)}
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
                            <label htmlFor="username" className="ms-1 mt-2">
                              Completed
                            </label>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Private
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips
                    value={userid}
                    onChange={e => setUserid(e.value)}
                    itemTemplate={customChip}
                    className="w-full"
                  />
                </Col>
              </Row>
            </div>

            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-success me-2"
                    onClick={() => SetInterviewpop(false)}
                  >
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
  )
}
export default CompaniesAllActive
