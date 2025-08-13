import React, { useState, useRef, useEffect } from "react"
import { TabView, TabPanel } from "primereact/tabview"
import {
  CardBody,
  Col,
  Container,
  Row,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
// import { Col, Row } from "reactstrap"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { BreadCrumb } from "primereact/breadcrumb"
import { RadioButton } from "primereact/radiobutton"
import { InputSwitch } from "primereact/inputswitch"
import { Checkbox } from "primereact/checkbox"
import { Tooltip } from "primereact/tooltip"
import { Calendar } from "primereact/calendar"
import { MultiSelect } from "primereact/multiselect"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Badge } from "primereact/badge"
import { TreeSelect } from "primereact/treeselect"
import { Editor } from "primereact/editor"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { Menu } from "primereact/menu"

import gdrive from "../../assets/images/google-drive.png"
import dropbox from "../../assets/images/dropbox.png"
import onedrive from "../../assets/images/one-drive.png"
import { Radius } from "lucide-react"
import profileImage from "../../assets/images/mahesh.png"
import LinkEmployessPopup from "pms/common-for-all/LinkEmployessPopup"



const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedOption1, setSelectedOption1] = useState(null)
  const [selectedOption2, setSelectedOption2] = useState(null)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialTabIndex = Number(queryParams.get("selectedTab")) || 0
  const [currentTab, setCurrentTab] = useState(initialTabIndex)

  useEffect(() => {
    setCurrentTab(initialTabIndex)
  }, [initialTabIndex])

  // const [selectedOptionReports, setSelectedOptionReports] = useState(null)

  // Tracks the selected option
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      password: "password123",
      status: "Active",
      archive: false,
      userRole: "Admin",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      password: "securepass456",
      status: "Active",
      archive: false,
      userRole: "Editor",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Mike Johnson",
      username: "mikejohnson",
      password: "mypassword789",
      status: "Inactive",
      archive: true,
      userRole: "Viewer",
      email: "mike@example.com",
    },
  ])

  

   const [IntegrationsData, setIntegrationsData] = useState([
  {
    id: 1,
    groupname: "Development",
    username: "User1",
    role: "Frontend Developer",
    meeting: "Zoom",
    calender: "Google Calendar",
    hrms: "Bharat HRMS",
  },
  {
    id: 2,
    groupname: "HR",
    username: "User2",
    role: "HR Manager",
    meeting: "Vitel Meet",
    calender: "Outlook",
    hrms: "BambooHR",
  },
  {
    id: 3,  
    groupname: "Sales",
    username: "User3",
    role: "Sales Executive",
    meeting: "Google Meet",
    calender: " calendit",
    hrms: "ADP",
  },
  
]);


// Reference for the action menu
const actionMenu = useRef(null);

// State for the edit dialog
// Fix the variable name conflict by renaming setEditDialogVisible to setIntegrationsEditDialogVisible
const [editDialogVisible, setIntegrationsEditDialogVisible] = useState(false);
const [currentIntegration, setCurrentIntegration] = useState(null);

// State for the delete confirmation dialog
const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
const [integrationToDelete, setIntegrationToDelete] = useState(null);

// Function to handle edit action
const handleEditIntegration = (integration) => {
  setCurrentIntegration({...integration});
  setIntegrationsEditDialogVisible(true);
};

// Function to handle delete action
const handleDeleteIntegration = (integration) => {
  setIntegrationToDelete(integration);
  setDeleteDialogVisible(true);
};

// Function to confirm deletion
const confirmDelete = () => {
  if (integrationToDelete) {
    const updatedData = IntegrationsData.filter(item => item.id !== integrationToDelete.id);
    setIntegrationsData(updatedData);
    setDeleteDialogVisible(false);
    setIntegrationToDelete(null);
  }
};

const saveIntegration = () => {
  if (currentIntegration) {
    if (currentIntegration.id) {
      // Edit existing integration
      setIntegrationsData(prevData => 
        prevData.map(item => 
          item.id === currentIntegration.id ? currentIntegration : item
        )
      );
    } else {
      // Add new integration
      const newIntegration = {
        ...currentIntegration,
        id: Date.now() // Generate a unique ID
      };
      setIntegrationsData(prevData => [...prevData, newIntegration]);
    }
    setIntegrationsEditDialogVisible(false);
  }
};

// Action menu template for the 3-dot menu
const actionTemplate = (rowData) => {
  return (
    <div className="flex justify-content-end">
      <Button
        icon="pi pi-ellipsis-v"
        className="p-button-text p-button-rounded"
        onClick={(e) => {
          e.stopPropagation();
          actionMenu.current.toggle(e);
          actionMenu.current.props = { rowData };
        }}
      />
      <Menu
        model={[
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => handleEditIntegration(rowData)
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            className: 'p-button-danger',
            command: () => handleDeleteIntegration(rowData)
          }
        ]}
        popup
        ref={actionMenu}
        id="popup_menu"
      />
    </div>
  );
};


  const [userRole] = useState([
    {
      id: 1,
      username: "johndoe",
      password: "Developer",
    },

    {
      id: 2,
      username: "Rock",
      password: "Tester",
    },

    {
      id: 1,
      username: "Saikrishna",
      password: "Manager",
    },
  ])

  const [jobTitles] = useState([
    {
      id: 1,
      username: "Developer",
      password: "Fontendend developer works in React",
      system: "System",
    },

    {
      id: 2,
      username: "Rock",
      password: "Tester",
      system: "System",
    },

    {
      id: 1,
      username: "Saikrishna",
      password: "Manager",
      system: "User",
    },
  ])

  const [isDialogVisible, setDialogVisible] = useState(false) // Controls Dialog visibility
  const [selectedUser, setSelectedUser] = useState(null) // Holds selected user for editing

  const handleEdit = user => {
    setSelectedUser(user) // Set selected user for editing
    setDialogVisible(true) // Show dialog
  }

  const handleSave = () => {
    // Logic to save the edited data
    setDialogVisible(false) // Close dialog
  }

  const handleCancel = () => {
    setDialogVisible(false) // Close dialog without saving
  }

  const editIcon = rowData => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-warning"
        onClick={() => handleEdit(rowData)}
      />
    )
  }

  const viewIcon = rowData => {
    return (
      <Button icon="pi pi-eye" className="p-button-rounded p-button-info" />
    )
  }

  const deleteIcon = rowData => {
    return (
      <Button icon="pi pi-trash" className="p-button-rounded p-button-info" />
    )
  }

  // categories

  const [selectedCountry, setSelectedCountry] = useState(null)
  const countries = [
    { name: "Frontend", code: "AU" },
    { name: "Backend", code: "BR" },
    { name: "Cloud", code: "CN" },
    { name: "Tester", code: "test" },
  ]

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 flag flag-${option.code.toLowerCase()}`}
            style={{ width: "18px" }}
          />
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const countryOptionTemplate = option => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          style={{ width: "18px" }}
        />
        <div>{option.name}</div>
      </div>
    )
  }

  // BreadCrumb

  const breadItems = [{ label: "User Permission" }, { label: "User List" }]
  const emailsignature = [{ label: "Settings" }, { label: "Email Signature" }]
  const emailtemplate = [{ label: "Settings" }, { label: "Email Template" }]
  const emailsetting = [{ label: "Settings" }, { label: "Email Setting" }]
  const smssetting = [{ label: "Settings" }, { label: "Sms Settings" }]
  const Crons = [{ label: "Settings" }, { label: "Crons" }]
  const breadWorkflow = [{ label: "Settings" }, { label: "Workflow" }]
  const breadIntegrations = [{ label: "Settings" }, { label: "Integrations" }]
  const breadResume = [{ label: "Settings" }, { label: "Resume Branding" }]
  const breadStorage = [{ label: "Settings" }, { label: "Storage" }]
  const breadSchedule = [{ label: "Settings" }, { label: "Schedule" }]

  // const home = { icon: 'pi pi-home', url: 'https://primereact.org' }

  const breadRoles = [{ label: "User Permission" }, { label: "User Roles" }]
  const breadTeamgroup = [{ label: "User Permission" }, { label: "Team Group" }]

  const breadGeneral = [{ label: "Settings" }, { label: "General" }]
  const breadUserActivity = [
    { label: "Settings" },
    { label: "User Activity Alerts" },
  ]
  const breadDatabase = [{ label: "Settings" }, { label: "Alerts" }]
  const breadReportAlerts = [{ label: "Settings" }, { label: "Reports Alerts" }]
  const breadReport = [{ label: "Settings" }, { label: "Database Alerts" }]

  const breadUsermanagement = [
    { label: "Settings" },
    { label: "User Management" },
  ]

  // general tab

  const menuLeft = useRef(null)
  const [visible, setVisible] = useState(false)

  const items = [
    {
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          command: () => {
            setVisible(true)
          },
        },
        {
          label: "Admin Module",
          icon: "pi pi-user",
        },
      ],
    },
  ]

  const [fontSize, setFontSize] = useState("normal")
  const fontSizeOptions = [
    { label: "Extra Small", value: "10px" },
    { label: "Small", value: "12px" },
    { label: "Normal", value: "16px" },
    { label: "Large", value: "20px" },
  ]

  const [selectedFolder, setSelectedFolder] = useState(null)

  const folderOptions = [
    { label: "Dashboards", value: "dashboards", icon: "pi pi-th-large" },
    { label: "Reports", value: "reports", icon: "pi pi-chart-line" },
    { label: "Projects", value: "projects", icon: "pi pi-briefcase" },
    { label: "Work Type", value: "worktype", icon: "pi pi-users" },
    { label: "Employee", value: "employee", icon: "pi pi-user " },
    { label: "Companies", value: "companies", icon: "pi pi-building" },
    { label: "Contacts", value: "contacts", icon: "pi pi-address-book" },
    { label: "Calendar", value: "calendar", icon: "pi pi-calendar" },
    { label: "Emails", value: "emails", icon: "pi pi-envelope" },
    { label: "Admin Module", value: "admin", icon: "pi pi-user" },
  ]
  const customTemplate = option => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`}></i>
        <span>{option.label}</span>
      </div>
    )
  }
  const [selectedView, setSelectedView] = useState(null)

  const viewOptions = [
    { label: "Home", value: "home" },
    { label: "Projects", value: "projects" },
    { label: "Work Type", value: "worktype" },
  ]
  const [ingredient, setIngredient] = useState("")
  const [addsmtp, setAddsmtp] = useState("")
  const [outgoingServer, setOutgoingServer] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fromEmail, setFromEmail] = useState("")
  const [email, setEmail] = useState("")
  const [port, setPort] = useState("")
  const [address, setAddress] = useState("")
  
  // State for private dropdown users selection
  const [privateDrop, setPrivateDrop] = useState([])
  
  // Dropdown values for private users selection
  const PrivetDropdownValues = [
    { name: "mahesh", value: "mahesh" },
    { name: "lavan", value: "lavan" },
    { name: "vinay", value: "vinay" },
    { name: "vasanth", value: "vasanth" },
  ]
  const [useSSL, setUseSSL] = useState(false)
  const [areaCode, setAreaCode] = useState("")
  const [accountKey, setAccountKey] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // State for storing SMTP details
  const [smtpAccounts, setSmtpAccounts] = useState([])

  // Handle Create button click
  const handleCreate = () => {
    // Add current form data to smtpAccounts array
    const newAccount = {
      outgoingServer,
      port,
      username,
      password,
      email,
      address,
      useSSL,
    }

    setSmtpAccounts([...smtpAccounts, newAccount])

    // Clear form fields after creating
    setOutgoingServer("")
    setPort("")
    setUsername("")
    setPassword("")
    setFromEmail("")
    setEmail("")
    setAddress("")
    setUseSSL(false)
  }

  // user management start

  const [showPassword, setShowPassword] = useState(false)

  const [userList, setUserList] = useState([
    {
      username: "mahesh",
      email: "mahesh@varundigitalmedia.com",
      role: "User",
      status: "Active",
      createDate: "2025-01-02",
      password: "password123",
    },
    {
      username: "lavan",
      email: "lavankumar@varundigitalmedia.com",
      role: "User",
      status: "Active",
      createDate: "2025-01-01",
      password: "password456",
    },
    {
      username: "vinay",
      email: "vinay@varundigitalmedia.com",
      role: "User",
      status: "Active",
      createDate: "2025-01-01",
      password: "password456",
    },
     {
      username: "vasanth",
      email: "vasanth@varundigitalmedia.com",
      role: "User",
      status: "Archived",
      createDate: "2025-01-01",
      password: "password456",
    },
  ])

  const [formVisible, setFormVisible] = useState(false) // Controls the form visibility
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    status: "Active", // Default status
    createDate: new Date().toISOString().split("T")[0], // Default to today's date
    password: "", // Password field
  })
  const [isEditMode, setIsEditMode] = useState(false) // True when editing, false when adding
  const [currentIndex, setCurrentIndex] = useState(null) // To track the index of the user being edited

  // Handle form submit (Add or Edit user)
  const handleFormSubmit = () => {
    if (isEditMode) {
      // Update existing user
      setUserList(prevList =>
        prevList.map((user, index) =>
          index === currentIndex ? formData : user
        )
      )
    } else {
      // Add new user
      setUserList(prevList => [...prevList, formData])
    }
    resetForm()
  }

  // Reset form after submit or cancel
  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      role: "",
      status: "Active", // Reset to default status
      createDate: new Date().toISOString().split("T")[0], // Reset to today's date
      password: "", // Reset password
    })
    setFormVisible(false) // Hide the form
    setIsEditMode(false)
    setCurrentIndex(null)
  }

  // Handle edit
  const handleEditUser = (rowData, rowIndex) => {
    setFormData(rowData)
    setCurrentIndex(rowIndex)
    setIsEditMode(true)
    setFormVisible(true)
  }

  // Handle delete
  const handleDeleteUser = rowIndex => {
    setUserList(prevList => prevList.filter((_, index) => index !== rowIndex))
  }

  // Options for role and status dropdowns
  const roleOptions = [
    { label: "Admin", value: "Admin" },
    { label: "User", value: "User" },
    { label: "Manager", value: "Manager" },
  ]

  const statusOptions = [
    { label: "Ram, Frontend developer", value: "Active" },
    { label: "Sai, Python developer", value: "Inactive" },
    { label: "Karthik, Data Scientist", value: "Suspended" },
  ]

  // Roles start

  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isEditModeActive, setIsEditModeActive] = useState(false)
  const [userData, setUserData] = useState({
    roleNameField: "",
    creationDateField: "",
    actionField: "",
  })

  // Add this near your other useRef declarations
const roleActionMenu = useRef(null);

  const [roleDataList, setRoleDataList] = useState([{ 
    roleNameField: "Super Admin", 
    creationDateField: "01-07-2025", 
    copyRoleField: "Manager"
  },
  { 
    roleNameField: "Editor", 
    creationDateField: "05-07-2025", 
    copyRoleField: "User" 
  },
  { 
    roleNameField: "Manager", 
    creationDateField: "10-07-2025", 
    copyRoleField: "Admin"
  },])

  const [roleOptionsList] = useState([
    { label: "Super Admin", value: "super_admin" },
    { label: "Editor", value: "editor" },
  ])

  const [statusOptionsList] = useState([
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ])

  // Handle form submission for save or update
  const handleFormSubmission = () => {
    if (isEditModeActive) {
      // Update logic
      const updatedList = [...roleDataList]
      const roleIndex = updatedList.findIndex(
        role => role.roleNameField === userData.roleNameField
      )
      updatedList[roleIndex] = userData
      setRoleDataList(updatedList)
    } else {
      // Add new role logic
      setRoleDataList([...roleDataList, userData])
    }

    resetFormFields()
  }

  // Reset form data and hide form
  const resetFormFields = () => {
    setUserData({
      roleNameField: "",
      creationDateField: "",
      actionField: "",
    })
    setIsFormVisible(false)
    setIsEditModeActive(false)
  }

  // Edit role
  // const handleEditRole = (role, index) => {
  //   setUserData(role)
  //   setIsEditModeActive(true)
  //   setIsFormVisible(true)
  // }

  const handleEditRole = (role, index) => {
    // Optionally, you can log the role and index to check the data
    console.log(role, index)

    // Assuming `role` is the selected role object that needs to be edited
    setUserData(role) // Set the user data to the selected role

    // Activate edit mode and show the form
    setIsEditModeActive(true)
    setIsFormVisible(true)
  }

  // Delete role
  const handleDeleteRole = index => {
    const updatedList = [...roleDataList]
    updatedList.splice(index, 1)
    setRoleDataList(updatedList)
  }

  const [permissions, setPermissions] = useState({
    addCandidate: false,
    deleteCandidate: false,
    editCandidate: false,
    viewAllCandidates: false,
    addJob: false,
    deleteJob: false,
    editJob: false,
    viewAllJobs: false,
    scheduleInterview: false,
    cancelInterview: false,
    editInterview: false,
    viewAllInterviews: false,
  })

  // Roles end

  //  Group users start

  const [isGroupFormVisible, setIsGroupFormVisible] = useState(false)
  const [groupData, setGroupData] = useState({
    groupName: "",
    description: "",
    selectedOptions: [],
  })
  // const [groupList, setGroupList] = useState([])

  const [groupList, setGroupList] = useState([
 {
    id: 1,
    groupName: "Project Management",
    description: "Project coordinators and managers overseeing development lifecycle",
    selectedOptions: ["mahesh", "lavan", "vasanth"],
    dateCreated: "2025-01-01",
    createdBy: "Admin",
    status: "Active",
    memberCount: 3
  },
    {
    id: 2,
    groupName: "Data Analytics",
    description: "Data scientists and analysts working on business intelligence",
    selectedOptions: ["lavan"],
    dateCreated: "2024-12-25",
    createdBy: "Data Lead",
    status: "Active",
    memberCount: 1
  },
  {
    id: 3,
    groupName: "DevOps Team",
    description: "Infrastructure and deployment management team",
    selectedOptions: ["vasanth"],
    dateCreated: "2025-01-05",
    createdBy: "Tech Lead",
    status: "Active",
    memberCount: 1
  },
])


  const [editingIndex, setEditingIndex] = useState(null) // Tracks the index of the group being edited

  const availableOptions = [
    { label: "mahesh", value: "mahesh" },
    { label: "lavan", value: "lavan" },
    { label: "vinay", value: "vinay" },
    { label: "vasanth", value: "vasanth" },
  ]

  const handleSaveGroup = () => {
    const currentDate = new Date().toLocaleDateString()

    if (editingIndex !== null) {
      // If editing an existing group, update the group data
      const updatedGroupList = [...groupList]
      updatedGroupList[editingIndex] = {
        ...groupData,
        dateCreated: currentDate,
      }
      setGroupList(updatedGroupList)
    } else {
      // If adding a new group, create a new entry
      setGroupList([...groupList, { ...groupData, dateCreated: currentDate }])
    }

    setGroupData({
      groupName: "",
      description: "",
      selectedOptions: [],
    })
    setEditingIndex(null) // Reset editing state
    setIsGroupFormVisible(false) // Hide the form after saving
  }

  const handleCancelGroup = () => {
    setGroupData({
      groupName: "",
      description: "",
      selectedOptions: [],
    })
    setEditingIndex(null) // Reset editing state
    setIsGroupFormVisible(false) // Hide the form
  }

  const handleEditGroup = (rowData, index) => {
    setGroupData(rowData) // Populate the form with selected row data
    setEditingIndex(index) // Set the index of the group being edited
    setIsGroupFormVisible(true) // Show the form for editing
  }

  const handleDeleteGroup = index => {
    const updatedList = groupList.filter((_, idx) => idx !== index)
    setGroupList(updatedList) // Remove the selected group from the list
  }

  //  Group users end

  // dropdown of the option input start

  const [selectedValue, setSelectedValue] = useState(null)
  const [dropdownOptions, setDropdownOptions] = useState([
    "Apple",
    "Banana",
    "Orange",
  ])
  const [inputValue, setInputValue] = useState("") // Tracks the input value

  const handleValueChange = e => {
    setSelectedValue(e.value)
  }

  const handleKeyDown = e => {
    if (
      e.key === "Enter" &&
      inputValue &&
      !dropdownOptions.includes(inputValue)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions(prevOptions => [...prevOptions, inputValue])
      setSelectedValue(inputValue) // Optionally, select the newly added value
      setInputValue("") // Clear the input field after adding the new value
    }
  }

  // dropdown of the option input end

  // dropdown1 of the option input start

  const [selectedValue1, setSelectedValue1] = useState(null)
  const [dropdownOptions1, setDropdownOptions1] = useState([
    "Frontend",
    "Backend",
    "Testing",
  ])
  const [inputValue1, setInputValue1] = useState("") // Tracks the input value

  const handleValueChange1 = e => {
    setSelectedValue1(e.value)
  }

  const handleKeyDown1 = e => {
    if (
      e.key === "Enter" &&
      inputValue1 &&
      !dropdownOptions.includes(inputValue1)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions1(prevOptions => [...prevOptions, inputValue1])
      setSelectedValue1(inputValue1) // Optionally, select the newly added value
      setInputValue1("") // Clear the input field after adding the new value
    }
  }

  // dropdown1 of the option input end

  // dropdown2 of the option input start

  const [selectedValue2, setSelectedValue2] = useState(null)
  const [dropdownOptions2, setDropdownOptions2] = useState([
    "Active",
    "Inactive",
  ])
  const [inputValue2, setInputValue2] = useState("") // Tracks the input value

  const handleValueChange2 = e => {
    setSelectedValue2(e.value)
  }

  const handleKeyDown2 = e => {
    if (
      e.key === "Enter" &&
      inputValue2 &&
      !dropdownOptions.includes(inputValue2)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions2(prevOptions => [...prevOptions, inputValue2])
      setSelectedValue2(inputValue2) // Optionally, select the newly added value
      setInputValue2("") // Clear the input field after adding the new value
    }
  }

  // dropdown2 of the option input end

  // dropdown3 of the option input start

  const [selectedValue3, setSelectedValue3] = useState(null)
  const [dropdownOptions3, setDropdownOptions3] = useState([
    "Aadhar card",
    "Pancard",
    "Voter ID",
  ])
  const [inputValue3, setInputValue3] = useState("") // Tracks the input value

  const handleValueChange3 = e => {
    setSelectedValue3(e.value)
  }

  const handleKeyDown3 = e => {
    if (
      e.key === "Enter" &&
      inputValue3 &&
      !dropdownOptions.includes(inputValue3)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions3(prevOptions => [...prevOptions, inputValue3])
      setSelectedValue3(inputValue3) // Optionally, select the newly added value
      setInputValue3("") // Clear the input field after adding the new value
    }
  }

  // dropdown3 of the option input end

  // dropdown4 of the option input start

  const [selectedValue4, setSelectedValue4] = useState(null)
  const [dropdownOptions4, setDropdownOptions4] = useState([
    "Interview",
    "Audio",
  ])
  const [inputValue4, setInputValue4] = useState("") // Tracks the input value

  const handleValueChange4 = e => {
    setSelectedValue4(e.value)
  }

  const handleKeyDown4 = e => {
    if (
      e.key === "Enter" &&
      inputValue4 &&
      !dropdownOptions.includes(inputValue4)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions4(prevOptions => [...prevOptions, inputValue4])
      setSelectedValue4(inputValue4) // Optionally, select the newly added value
      setInputValue4("") // Clear the input field after adding the new value
    }
  }

  // dropdown4 of the option input end

  // dropdown5 of the option input start

  const [selectedValue5, setSelectedValue5] = useState(null)
  const [dropdownOptions5, setDropdownOptions5] = useState([
    "Video Call",
    "Audio Call",
    "Talent Scan",
  ])
  const [inputValue5, setInputValue5] = useState("") // Tracks the input value

  const handleValueChange5 = e => {
    setSelectedValue5(e.value)
  }

  const handleKeyDown5 = e => {
    if (
      e.key === "Enter" &&
      inputValue5 &&
      !dropdownOptions.includes(inputValue5)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions5(prevOptions => [...prevOptions, inputValue5])
      setSelectedValue5(inputValue5) // Optionally, select the newly added value
      setInputValue5("") // Clear the input field after adding the new value
    }
  }

  // dropdown5 of the option input end

  // dropdown6 of the option input start

  const [selectedValue6, setSelectedValue6] = useState(null)
  const [dropdownOptions6, setDropdownOptions6] = useState([
    "Work from Home",
    "Work from Office",
    "Work from Remote",
    "Freelancer",
  ])
  const [inputValue6, setInputValue6] = useState("") // Tracks the input value

  const handleValueChange6 = e => {
    setSelectedValue6(e.value)
  }

  const handleKeyDown6 = e => {
    if (
      e.key === "Enter" &&
      inputValue6 &&
      !dropdownOptions.includes(inputValue6)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions6(prevOptions => [...prevOptions, inputValue6])
      setSelectedValue6(inputValue6) // Optionally, select the newly added value
      setInputValue6("") // Clear the input field after adding the new value
    }
  }

  // dropdown6 of the option input end

  // dropdown7 of the option input start

  const [selectedValue7, setSelectedValue7] = useState(null)
  const [dropdownOptions7, setDropdownOptions7] = useState([
    "HTML",
    "CSS",
    "Javascript",
  ])
  const [inputValue7, setInputValue7] = useState([])

  const handleValueChange7 = e => {
    setSelectedValue7(e.value)
  }

  const handleKeyDown7 = e => {
    if (
      e.key === "Enter" &&
      inputValue7 &&
      !dropdownOptions.includes(inputValue7)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions7(prevOptions => [...prevOptions, inputValue7])
      setSelectedValue7(inputValue7) // Optionally, select the newly added value
      setInputValue7("") // Clear the input field after adding the new value
    }
  }

  const [selectedValue8, setSelectedValue8] = useState(null)
  const [dropdownOptions8, setDropdownOptions8] = useState(["", ""])
  const [inputValue8, setInputValue8] = useState([])

  const handleValueChange8 = e => {
    setSelectedValue8(e.value)
  }

  const handleKeyDown8 = e => {
    if (
      e.key === "Enter" &&
      inputValue8 &&
      !dropdownOptions.includes(inputValue8)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions8(prevOptions => [...prevOptions, inputValue8])
      setSelectedValue8(inputValue8) // Optionally, select the newly added value
      setInputValue8("") // Clear the input field after adding the new value
    }
  }

  const [selectedValue9, setSelectedValue9] = useState(null)
  const [dropdownOptions9, setDropdownOptions9] = useState(["", ""])
  const [inputValue9, setInputValue9] = useState([])

  const handleValueChange9 = e => {
    setSelectedValue9(e.value)
  }

  const handleKeyDown9 = e => {
    if (
      e.key === "Enter" &&
      inputValue9 &&
      !dropdownOptions.includes(inputValue9)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions9(prevOptions => [...prevOptions, inputValue9])
      setSelectedValue9(inputValue9) // Optionally, select the newly added value
      setInputValue9("") // Clear the input field after adding the new value
    }
  }

  // dropdown7 of the option input end

  // dropdown10 of the option input start

  const [selectedValue10, setSelectedValue10] = useState(null)
  const [dropdownOptions10, setDropdownOptions10] = useState([
    "Selected",
    "Not Selected",
    "Pending",
  ])
  const [inputValue10, setInputValue10] = useState([])

  const handleValueChange10 = e => {
    setSelectedValue10(e.value)
  }

  const handleKeyDown10 = e => {
    if (
      e.key === "Enter" &&
      inputValue10 &&
      !dropdownOptions.includes(inputValue10)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions10(prevOptions => [...prevOptions, inputValue10])
      setSelectedValue10(inputValue10)
      setInputValue10("")
    }
  }

  // dropdown10 of the option input start

  // dropdown11 of the option input start

  const [selectedValue11, setSelectedValue11] = useState(null)
  const [dropdownOptions11, setDropdownOptions11] = useState([
    "Low",
    "Medium",
    "High",
  ])
  const [inputValue11, setInputValue11] = useState([])

  const handleValueChange11 = e => {
    setSelectedValue11(e.value)
  }

  const handleKeyDown11 = e => {
    if (
      e.key === "Enter" &&
      inputValue11 &&
      !dropdownOptions.includes(inputValue11)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions11(prevOptions => [...prevOptions, inputValue11])
      setSelectedValue11(inputValue11)
      setInputValue11("")
    }
  }

  // dropdown11 of the option input start

  // dropdown12 of the option input start

  const [selectedValue12, setSelectedValue12] = useState(null)
  const [dropdownOptions12, setDropdownOptions12] = useState([
    "Harish",
    "Ram",
    "Sai",
  ])
  const [inputValue12, setInputValue12] = useState([])

  const handleValueChange12 = e => {
    setSelectedValue12(e.value)
  }

  const handleKeyDown12 = e => {
    if (
      e.key === "Enter" &&
      inputValue12 &&
      !dropdownOptions.includes(inputValue12)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions12(prevOptions => [...prevOptions, inputValue12])
      setSelectedValue12(inputValue12)
      setInputValue12("")
    }
  }

  // dropdown12 of the option input end

  // dropdown13 of the option input start

  const [selectedValue13, setSelectedValue13] = useState(null)
  const [dropdownOptions13, setDropdownOptions13] = useState([
    "Hyderabad",
    "Bangalore",
    "Pune",
  ])
  const [inputValue13, setInputValue13] = useState([])

  const handleValueChange13 = e => {
    setSelectedValue13(e.value)
  }

  const handleKeyDown13 = e => {
    if (
      e.key === "Enter" &&
      inputValue13 &&
      !dropdownOptions.includes(inputValue13)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions13(prevOptions => [...prevOptions, inputValue13])
      setSelectedValue13(inputValue13)
      setInputValue13("")
    }
  }

  // dropdown13 of the option input end

  // dropdown14 of the option input start

  const [selectedValue14, setSelectedValue14] = useState(null)
  const [dropdownOptions14, setDropdownOptions14] = useState([
    "Hybrid",
    "Office",
    "Home",
  ])
  const [inputValue14, setInputValue14] = useState([])

  const handleValueChange14 = e => {
    setSelectedValue14(e.value)
  }

  const handleKeyDown14 = e => {
    if (
      e.key === "Enter" &&
      inputValue14 &&
      !dropdownOptions.includes(inputValue14)
    ) {
      // If Enter is pressed and the value is not already in the options, add it
      setDropdownOptions14(prevOptions => [...prevOptions, inputValue14])
      setSelectedValue14(inputValue14)
      setInputValue14("")
    }
  }

  // dropdown14 of the option input end

  // Module start

  const [jobTitlesData1, setJobTitlesData1] = useState([{
    id: '1',
    value: 'User Management',
    description: 'This is User Management value',
    type: 'System', 
  },

  // {
  //   id: '2',
  //   value: 'Potential',
  //   description: 'This is Potential value',
  //   type: 'System', 
  // },
  // {
  //   id: '3',
  //   value: 'Submitted',
  //   description: 'This is Submitted value',
  //   type: 'System', 
  // },
  // {
  //   id: '4',
  //   value: 'Interview',
  //   description: 'This is Interview value',
  //   type: 'System', 
  // },
  // {
  //   id: '5',
  //   value: 'Offer',
  //   description: 'This is Offer value',
  //   type: 'User', 
  // },
  // {
  //   id: '6',
  //   value: 'Rejected',
  //   description: 'This is Rejected value',
  //   type: 'User', 
  // },
  // {
  //   id: '7',
  //   value: 'Placed',
  //   description: 'This is Placed value',
  //   type: 'User', 
  // },
  ])
  const [isEditDialogVisible1, setEditDialogVisible1] = useState(false)
  const [currentJobTitle1, setCurrentJobTitle1] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditing1, setIsEditing1] = useState(false)

  // Define type options
  const typeOptions1 = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Determine if the current type is "System"
  const isSystemType = currentJobTitle1.type === "System"

  // Handle saving a job title (either add or edit)
  const handleSaveJobTitle1 = () => {
    if (
      currentJobTitle1.value &&
      currentJobTitle1.description &&
      currentJobTitle1.type
    ) {
      if (isEditing1) {
        // Update existing job title
        setJobTitlesData1(prevData =>
          prevData.map(item =>
            item.id === currentJobTitle1.id ? { ...currentJobTitle1 } : item
          )
        )
      } else {
        // Add new job title with unique id
        const newJobTitle1 = {
          ...currentJobTitle1,
          id: Date.now().toString(),
        }
        setJobTitlesData1(prevData => [...prevData, newJobTitle1])
      }
      handleCancelJobTitle1()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelJobTitle1 = () => {
    setEditDialogVisible1(false)
    setCurrentJobTitle1({ id: "", value: "", description: "", type: "" })
    setIsEditing1(false)
  }

  // Edit button
  const editJobTitleIcon1 = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentJobTitle1({ ...rowData })
        setEditDialogVisible1(true)
        setIsEditing1(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteJobTitleIcon1 = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setJobTitlesData1(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new job title button
  const addNewJobTitle1 = () => {
    setCurrentJobTitle1({ id: "", value: "", description: "", type: "" })
    setEditDialogVisible1(true)
    setIsEditing1(false)
  }

  // Resume source start

  const [jobTitlesData, setJobTitlesData] = useState([])
  const [isEditDialogVisible, setEditDialogVisible] = useState(false)
  const [currentJobTitle, setCurrentJobTitle] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  // Define type options
  const typeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving a job title (either add or edit)
  const handleSaveJobTitle = () => {
    if (
      currentJobTitle.value &&
      currentJobTitle.description &&
      currentJobTitle.type
    ) {
      if (isEditing) {
        // Update existing job title
        setJobTitlesData(prevData =>
          prevData.map(item =>
            item.id === currentJobTitle.id ? { ...currentJobTitle } : item
          )
        )
      } else {
        // Add new job title with unique id
        const newJobTitle = {
          ...currentJobTitle,
          id: Date.now().toString(),
        }
        setJobTitlesData(prevData => [...prevData, newJobTitle])
      }
      handleCancelJobTitle()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelJobTitle = () => {
    setEditDialogVisible(false)
    setCurrentJobTitle({ id: "", value: "", description: "", type: "" })
    setIsEditing(false)
  }

  // Edit button
  const editJobTitleIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentJobTitle({ ...rowData })
        setEditDialogVisible(true)
        setIsEditing(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteJobTitleIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setJobTitlesData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new job title button
  const addNewJobTitle = () => {
    setCurrentJobTitle({ id: "", value: "", description: "", type: "" })
    setEditDialogVisible(true)
    setIsEditing(false)
  }

  // Addresses City

  const [citiesData, setCitiesData] = useState([{
    name: "Open",
    description: "This is Open",
    type: "User",
    id: "1",
  },
  {
    name: "In Progress",
    description: "This is In Progress",
    type: "User",
    id: "2",
  },
  {
    name: "Under Review",
    description: "This is Under Review",
    type: "User",
    id: "3",
  }, 
  {
    name: "Approved",
    description: "This is Approved",
    type: "User",
    id: "4",
  }
  ,
  {
    name: "On Hold",
    description: "This is On Hold",
    type: "User",
    id: "5",
  },
   {
    name: "Done",
    description: "This is Done",
    type: "User",
    id: "6",
  }

])
  const [isCityEditDialogVisible, setCityEditDialogVisible] = useState(false)
  const [currentCity, setCurrentCity] = useState({
    id: "",
    name: "",
    description: "",
    type: "",
  })
  const [isCityEditing, setCityEditing] = useState(false)

  // Define city type options
  const cityTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving a city (either add or edit)
  const handleSaveCity = () => {
    if (currentCity.name && currentCity.description && currentCity.type) {
      if (isCityEditing) {
        // Update existing city
        setCitiesData(prevData =>
          prevData.map(item =>
            item.id === currentCity.id ? { ...currentCity } : item
          )
        )
      } else {
        // Add new city with unique id
        const newCity = {
          ...currentCity,
          id: Date.now().toString(),
        }
        setCitiesData(prevData => [...prevData, newCity])
      }
      handleCancelCity()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelCity = () => {
    setCityEditDialogVisible(false)
    setCurrentCity({ id: "", name: "", description: "", type: "" })
    setCityEditing(false)
  }

  // Edit button
  const editCityIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentCity({ ...rowData })
        setCityEditDialogVisible(true)
        setCityEditing(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteCityIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setCitiesData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new city button
  const addNewCity = () => {
    setCurrentCity({ id: "", name: "", description: "", type: "" })
    setCityEditDialogVisible(true)
    setCityEditing(false)
  }

  // Work Type

  const [statesData, setStatesData] = useState([{
    name: "Task",
    description: "This is Task",
    type: "User",
    id: "1",
  },
  {
    name: "Bug",
    description: "This is Bug",
    type: "System",
    id: "2",
  },
  {
    name: "Epic",
    description: "This is Epic",
    type: "User",
    id: "3",
  },
  {
    name: "Story",
    description: "This is Story",
    type: "System",
    id: "4",
  },
  {
    name: "Sub Task",
    description: "This is Sub Task",
    type: "User",
    id: "5",
  },
  
  ])
  const [isStateEditDialogVisible, setStateEditDialogVisible] = useState(false)
  const [currentEditingState, setCurrentEditingState] = useState({
    id: "",
    name: "",
    description: "",
    type: "",
  })
  const [isStateEditing, setIsStateEditing] = useState(false)

  // Define type options
  const stateTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving a state (either add or edit)
  const handleSaveState = () => {
    if (
      currentEditingState.name &&
      currentEditingState.description &&
      currentEditingState.type
    ) {
      if (isStateEditing) {
        // Update existing state
        setStatesData(prevData =>
          prevData.map(item =>
            item.id === currentEditingState.id
              ? { ...currentEditingState }
              : item
          )
        )
      } else {
        // Add new state with unique id
        const newState = {
          ...currentEditingState,
          id: Date.now().toString(),
        }
        setStatesData(prevData => [...prevData, newState])
      }
      handleCancelState()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelState = () => {
    setStateEditDialogVisible(false)
    setCurrentEditingState({ id: "", name: "", description: "", type: "" })
    setIsStateEditing(false)
  }

  // Edit button
  const editStateIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentEditingState({ ...rowData })
        setStateEditDialogVisible(true)
        setIsStateEditing(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteStateIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setStatesData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new state button
  const addNewState = () => {
    setCurrentEditingState({ id: "", name: "", description: "", type: "" })
    setStateEditDialogVisible(true)
    setIsStateEditing(false)
  }

  // Address country start

  const [countriesData, setCountriesData] = useState([
  {
    name: "To Do",
    description: "This is To Do",
    type: "User",
    id: "1",
  },
  {
    name: "In Progress",
    description: "This is In Progress",
    type: "System",
    id: "2",
  },
  {
    name: "In Review",
    description: "This is In Review",
    type: "User",
    id: "3",
  },
  {
    name: "Testing/QA",
    description: "This is Testing/QA",
    type: "System",
    id: "4",
  },
  {
    name: "Blocked",
    description: "This is Blocked",
    type: "User",
    id: "5",
  }, 

   {
    name: "Done",
    description: "This is Done",
    type: "User",
    id: "6",
  }, 

   {
    name: "Cancelled",
    description: "This is Cancelled",
    type: "User",
    id: "7",
  }, 
  ])
  const [isCountryDialogVisible, setCountryDialogVisible] = useState(false)
  const [currentCountry, setCurrentCountry] = useState({
    id: "",
    name: "",
    description: "",
    type: "",
  })
  const [isCountryBeingEdited, setCountryBeingEdited] = useState(false)

  const countryTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveCountry = () => {
    if (
      currentCountry.name &&
      currentCountry.description &&
      currentCountry.type
    ) {
      if (isCountryBeingEdited) {
        setCountriesData(prevData =>
          prevData.map(item =>
            item.id === currentCountry.id ? { ...currentCountry } : item
          )
        )
      } else {
        const newCountry = {
          ...currentCountry,
          id: Date.now().toString(),
        }
        setCountriesData(prevData => [...prevData, newCountry])
      }
      handleCancelCountry()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelCountry = () => {
    setCountryDialogVisible(false)
    setCurrentCountry({ id: "", name: "", description: "", type: "" })
    setCountryBeingEdited(false)
  }

  const editCountryIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentCountry({ ...rowData })
        setCountryDialogVisible(true)
        setCountryBeingEdited(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteCountryIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setCountriesData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewCountry = () => {
    setCurrentCountry({ id: "", name: "", description: "", type: "" })
    setCountryDialogVisible(true)
    setCountryBeingEdited(false)
  }

  // Address country end

  // Address label start

  const [addressLabelsData, setAddressLabelsData] = useState([
    {
    name: "Approved",
    description: "This is Approved",
    type: "User",
    id: "1",
  },
  {
    name: "Rejected",
    description: "This is Rejected",
    type: "System",
    id: "2",
  },
  {
    name: "Pending",
    description: "This is Pending",
    type: "User",
    id: "3",
  },


  ])
  const [isAddressLabelEditDialogVisible, setAddressLabelEditDialogVisible] =
    useState(false)
  const [currentAddressLabel, setCurrentAddressLabel] = useState({
    id: "",
    label: "",
    output: "",
    type: "",
  })
  const [isEditingAddressLabel, setIsEditingAddressLabel] = useState(false)

  // Define address label type options
  const addressLabelTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving an address label (either add or edit)
  const handleSaveAddressLabel = () => {
    if (
      currentAddressLabel.label &&
      currentAddressLabel.output &&
      currentAddressLabel.type
    ) {
      if (isEditingAddressLabel) {
        // Update existing address label
        setAddressLabelsData(prevData =>
          prevData.map(item =>
            item.id === currentAddressLabel.id
              ? { ...currentAddressLabel }
              : item
          )
        )
      } else {
        // Add new address label with a unique id
        const newAddressLabel = {
          ...currentAddressLabel,
          id: Date.now().toString(),
        }
        setAddressLabelsData(prevData => [...prevData, newAddressLabel])
      }
      handleCancelAddressLabel()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelAddressLabel = () => {
    setAddressLabelEditDialogVisible(false)
    setCurrentAddressLabel({ id: "", label: "", output: "", type: "" })
    setIsEditingAddressLabel(false)
  }

  // Edit button
  const editAddressLabelIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentAddressLabel({ ...rowData })
        setAddressLabelEditDialogVisible(true)
        setIsEditingAddressLabel(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteAddressLabelIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setAddressLabelsData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new address label button
  const addNewAddressLabel = () => {
    setCurrentAddressLabel({ id: "", label: "", output: "", type: "" })
    setAddressLabelEditDialogVisible(true)
    setIsEditingAddressLabel(false)
  }

  // Address Label end

  // Skill start

  const [skillsData, setSkillsData] = useState([
    {
    name: "High",
    description: "This is High",
    type: "User",
    id: "1",
  },
  {
    name: "Medium",
    description: "This is Medium",
    type: "System",
    id: "2",
  },
  {
    name: "Low",
    description: "This is Low",
    type: "User",
    id: "3",
  },
  ])
  const [isSkillEditDialogVisible, setSkillEditDialogVisible] = useState(false)
  const [currentSkill, setCurrentSkill] = useState({
    id: "",
    name: "",
    description: "",
    type: "", // Added type field
  })
  const [isEditingSkill, setIsEditingSkill] = useState(false)

  // Define skill type options
  const skillTypeOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a skill (either add or edit)
  const handleSaveSkill = () => {
    if (currentSkill.name && currentSkill.description && currentSkill.type) {
      if (isEditingSkill) {
        // Update existing skill
        setSkillsData(prevData =>
          prevData.map(item =>
            item.id === currentSkill.id ? { ...currentSkill } : item
          )
        )
      } else {
        // Add new skill with a unique id
        const newSkill = {
          ...currentSkill,
          id: Date.now().toString(),
        }
        setSkillsData(prevData => [...prevData, newSkill])
      }
      handleCancelSkill()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelSkill = () => {
    setSkillEditDialogVisible(false)
    setCurrentSkill({ id: "", name: "", description: "", type: "" })
    setIsEditingSkill(false)
  }

  // Edit button
  const editSkillIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentSkill({ ...rowData })
        setSkillEditDialogVisible(true)
        setIsEditingSkill(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteSkillIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setSkillsData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new skill button
  const addNewSkill = () => {
    setCurrentSkill({ id: "", name: "", description: "", type: "" })
    setSkillEditDialogVisible(true)
    setIsEditingSkill(false)
  }

  // Skill end

  // Employee type start

  const [LinkedWorkType, setLinkedWorkType] = useState([
     {
    name: "Blocks",
    description: "This is Blocks",
    type: "User",
    id: "1",
  },
  {
    name: "Is Blocked by",
    description: "This is Is Blocked by",
    type: "System",
    id: "2",
  },
  {
    name: "Clones",
    description: "This is Clones",
    type: "User",
    id: "3",
  },

   {
    name: "Is Cloned by",
    description: "This is Is Cloned by",
    type: "User",
    id: "3",
  },

   {
    name: "Duplicates",
    description: "This is Duplicates",
    type: "User",
    id: "3",
  },
  ])
  const [isEmployeeEditDialogVisible, setEmployeeEditDialogVisible] =
    useState(false)
  const [currentEmployee, setCurrentEmployee] = useState({
    id: "",
    name: "",
    description: "",
    type: "", // Added type field
  })
  const [isEditingEmployee, setIsEditingEmployee] = useState(false)

  // Define employee type options
  const employeeTypeOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving an employee (either add or edit)
  const handleSaveEmployee = () => {
    if (
      currentEmployee.name &&
      currentEmployee.description &&
      currentEmployee.type
    ) {
      if (isEditingEmployee) {
        // Update existing employee
        setLinkedWorkType(prevData =>
          prevData.map(item =>
            item.id === currentEmployee.id ? { ...currentEmployee } : item
          )
        )
      } else {
        // Add new employee with a unique id
        const newEmployee = {
          ...currentEmployee,
          id: Date.now().toString(),
        }
        setLinkedWorkType(prevData => [...prevData, newEmployee])
      }
      handleCancelEmployee()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelEmployee = () => {
    setEmployeeEditDialogVisible(false)
    setCurrentEmployee({ id: "", name: "", description: "", type: "" })
    setIsEditingEmployee(false)
  }

  // Edit button
  const editEmployeeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentEmployee({ ...rowData })
        setEmployeeEditDialogVisible(true)
        setIsEditingEmployee(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteEmployeeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setLinkedWorkType(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new employee button
  const addNewEmployee = () => {
    setCurrentEmployee({ id: "", name: "", description: "", type: "" })
    setEmployeeEditDialogVisible(true)
    setIsEditingEmployee(false)
  }

  // Employee type end

  // Employee type accordion section start
  const [employeeTypeData, setEmployeeTypeData] = useState([
    {
      id: "1",
      value: "Full Time",
      description: "Full-time permanent employee",
      type: "user",
    },
    {
      id: "2", 
      value: "Part Time",
      description: "Part-time employee with flexible hours",
      type: "user",
    },
    {
      id: "3",
      value: "Contract", 
      description: "Contract-based employee for specific projects",
      type: "user",
    },
    {
      id: "4",
      value: "Intern",
      description: "Internship position for learning and development",
      type: "user",
    },
  ])
  const [isEmployeeTypeEditDialogVisible, setEmployeeTypeEditDialogVisible] = useState(false)
  const [currentEmployeeType, setCurrentEmployeeType] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingEmployeeType, setIsEditingEmployeeType] = useState(false)

  // Define employee type options for accordion
  const employeeTypeAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving an employee type (either add or edit)
  const handleSaveEmployeeType = () => {
    if (
      currentEmployeeType.value &&
      currentEmployeeType.description &&
      currentEmployeeType.type
    ) {
      if (isEditingEmployeeType) {
        // Update existing employee type
        setEmployeeTypeData(prevData =>
          prevData.map(item =>
            item.id === currentEmployeeType.id ? { ...currentEmployeeType } : item
          )
        )
      } else {
        // Add new employee type with a unique id
        const newEmployeeType = {
          ...currentEmployeeType,
          id: Date.now().toString(),
        }
        setEmployeeTypeData(prevData => [...prevData, newEmployeeType])
      }
      handleCancelEmployeeType()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelEmployeeType = () => {
    setEmployeeTypeEditDialogVisible(false)
    setCurrentEmployeeType({ id: "", value: "", description: "", type: "" })
    setIsEditingEmployeeType(false)
  }

  // Edit button for employee type
  const editEmployeeTypeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentEmployeeType({ ...rowData })
        setEmployeeTypeEditDialogVisible(true)
        setIsEditingEmployeeType(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for employee type
  const deleteEmployeeTypeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setEmployeeTypeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new employee type button
  const addNewEmployeeType = () => {
    setCurrentEmployeeType({ id: "", value: "", description: "", type: "" })
    setEmployeeTypeEditDialogVisible(true)
    setIsEditingEmployeeType(false)
  }

  // Employee type accordion section end

  // Work location accordion section start
  const [workLocationData, setWorkLocationData] = useState([
    {
      id: "1",
      value: "Remote",
      description: "Work from home or any remote location",
      type: "user",
    },
    {
      id: "2", 
      value: "Office",
      description: "Work from company office premises",
      type: "user",
    },
    {
      id: "3",
      value: "Hybrid", 
      description: "Combination of remote and office work",
      type: "user",
    },
    {
      id: "4",
      value: "Client Side",
      description: "Work at client's location or premises",
      type: "user",
    },
  ])
  const [isWorkLocationEditDialogVisible, setWorkLocationEditDialogVisible] = useState(false)
  const [currentWorkLocation, setCurrentWorkLocation] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingWorkLocation, setIsEditingWorkLocation] = useState(false)

  // Define work location options for accordion
  const workLocationAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a work location (either add or edit)
  const handleSaveWorkLocation = () => {
    if (
      currentWorkLocation.value &&
      currentWorkLocation.description &&
      currentWorkLocation.type
    ) {
      if (isEditingWorkLocation) {
        // Update existing work location
        setWorkLocationData(prevData =>
          prevData.map(item =>
            item.id === currentWorkLocation.id ? { ...currentWorkLocation } : item
          )
        )
      } else {
        // Add new work location with a unique id
        const newWorkLocation = {
          ...currentWorkLocation,
          id: Date.now().toString(),
        }
        setWorkLocationData(prevData => [...prevData, newWorkLocation])
      }
      handleCancelWorkLocation()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelWorkLocation = () => {
    setWorkLocationEditDialogVisible(false)
    setCurrentWorkLocation({ id: "", value: "", description: "", type: "" })
    setIsEditingWorkLocation(false)
  }

  // Edit button for work location
  const editWorkLocationIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentWorkLocation({ ...rowData })
        setWorkLocationEditDialogVisible(true)
        setIsEditingWorkLocation(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for work location
  const deleteWorkLocationIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setWorkLocationData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new work location button
  const addNewWorkLocation = () => {
    setCurrentWorkLocation({ id: "", value: "", description: "", type: "" })
    setWorkLocationEditDialogVisible(true)
    setIsEditingWorkLocation(false)
  }

  // Work location accordion section end

  // Shift timing accordion section start
  const [shiftTimingData, setShiftTimingData] = useState([
    {
      id: "1",
      value: "Night Shift (11:00 PM - 8:00 AM)",
      description: "Night shift working hours from 11:00 PM to 8:00 AM",
      type: "user",
    },
    {
      id: "2", 
      value: "Evening Shift (2:00 PM - 11:00 PM)",
      description: "Evening shift working hours from 2:00 PM to 11:00 PM",
      type: "user",
    },
    {
      id: "3",
      value: "Day Shift (9:00 AM - 6:00 PM)", 
      description: "Day shift working hours from 9:00 AM to 6:00 PM",
      type: "user",
    },
  ])
  const [isShiftTimingEditDialogVisible, setShiftTimingEditDialogVisible] = useState(false)
  const [currentShiftTiming, setCurrentShiftTiming] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingShiftTiming, setIsEditingShiftTiming] = useState(false)

  // Define shift timing options for accordion
  const shiftTimingAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a shift timing (either add or edit)
  const handleSaveShiftTiming = () => {
    if (
      currentShiftTiming.value &&
      currentShiftTiming.description &&
      currentShiftTiming.type
    ) {
      if (isEditingShiftTiming) {
        // Update existing shift timing
        setShiftTimingData(prevData =>
          prevData.map(item =>
            item.id === currentShiftTiming.id ? { ...currentShiftTiming } : item
          )
        )
      } else {
        // Add new shift timing with a unique id
        const newShiftTiming = {
          ...currentShiftTiming,
          id: Date.now().toString(),
        }
        setShiftTimingData(prevData => [...prevData, newShiftTiming])
      }
      handleCancelShiftTiming()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelShiftTiming = () => {
    setShiftTimingEditDialogVisible(false)
    setCurrentShiftTiming({ id: "", value: "", description: "", type: "" })
    setIsEditingShiftTiming(false)
  }

  // Edit button for shift timing
  const editShiftTimingIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentShiftTiming({ ...rowData })
        setShiftTimingEditDialogVisible(true)
        setIsEditingShiftTiming(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for shift timing
  const deleteShiftTimingIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setShiftTimingData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new shift timing button
  const addNewShiftTiming = () => {
    setCurrentShiftTiming({ id: "", value: "", description: "", type: "" })
    setShiftTimingEditDialogVisible(true)
    setIsEditingShiftTiming(false)
  }

  // Shift timing accordion section end

  // City accordion section start
  const [cityAccordionData, setCityAccordionData] = useState([
    {
      id: "1",
      value: "Hyderabad",
      description: "Capital city of Telangana state, major IT hub",
      type: "user",
    },
    {
      id: "2", 
      value: "Chennai",
      description: "Capital city of Tamil Nadu state, automotive and IT center",
      type: "user",
    },
    {
      id: "3",
      value: "Bangalore", 
      description: "Capital city of Karnataka state, Silicon Valley of India",
      type: "user",
    },
    {
      id: "4",
      value: "Mumbai",
      description: "Capital city of Maharashtra state, financial capital of India",
      type: "user",
    },
    {
      id: "5",
      value: "Pune",
      description: "Major city in Maharashtra state, IT and automotive hub",
      type: "user",
    },
  ])
  const [isCityAccordionEditDialogVisible, setCityAccordionEditDialogVisible] = useState(false)
  const [currentCityAccordion, setCurrentCityAccordion] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingCityAccordion, setIsEditingCityAccordion] = useState(false)

  // Define city options for accordion
  const cityAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a city (either add or edit)
  const handleSaveCityAccordion = () => {
    if (
      currentCityAccordion.value &&
      currentCityAccordion.description &&
      currentCityAccordion.type
    ) {
      if (isEditingCityAccordion) {
        // Update existing city
        setCityAccordionData(prevData =>
          prevData.map(item =>
            item.id === currentCityAccordion.id ? { ...currentCityAccordion } : item
          )
        )
      } else {
        // Add new city with a unique id
        const newCity = {
          ...currentCityAccordion,
          id: Date.now().toString(),
        }
        setCityAccordionData(prevData => [...prevData, newCity])
      }
      handleCancelCityAccordion()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelCityAccordion = () => {
    setCityAccordionEditDialogVisible(false)
    setCurrentCityAccordion({ id: "", value: "", description: "", type: "" })
    setIsEditingCityAccordion(false)
  }

  // Edit button for city
  const editCityAccordionIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentCityAccordion({ ...rowData })
        setCityAccordionEditDialogVisible(true)
        setIsEditingCityAccordion(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for city
  const deleteCityAccordionIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setCityAccordionData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new city button
  const addNewCityAccordion = () => {
    setCurrentCityAccordion({ id: "", value: "", description: "", type: "" })
    setCityAccordionEditDialogVisible(true)
    setIsEditingCityAccordion(false)
  }

  // City accordion section end

  // Designation accordion section start
  const [designationData, setDesignationData] = useState([
    {
      id: "1",
      value: "Software Developer",
      description: "Develops and maintains software applications across full stack",
      type: "user",
    },
    {
      id: "2", 
      value: "Frontend Developer",
      description: "Specializes in user interface and user experience development",
      type: "user",
    },
    {
      id: "3",
      value: "Backend Developer", 
      description: "Focuses on server-side logic, databases, and API development",
      type: "user",
    },
  ])
  const [isDesignationEditDialogVisible, setDesignationEditDialogVisible] = useState(false)
  const [currentDesignation, setCurrentDesignation] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingDesignation, setIsEditingDesignation] = useState(false)

  // Define designation options for accordion
  const designationAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a designation (either add or edit)
  const handleSaveDesignation = () => {
    if (
      currentDesignation.value &&
      currentDesignation.description &&
      currentDesignation.type
    ) {
      if (isEditingDesignation) {
        // Update existing designation
        setDesignationData(prevData =>
          prevData.map(item =>
            item.id === currentDesignation.id ? { ...currentDesignation } : item
          )
        )
      } else {
        // Add new designation with a unique id
        const newDesignation = {
          ...currentDesignation,
          id: Date.now().toString(),
        }
        setDesignationData(prevData => [...prevData, newDesignation])
      }
      handleCancelDesignation()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelDesignation = () => {
    setDesignationEditDialogVisible(false)
    setCurrentDesignation({ id: "", value: "", description: "", type: "" })
    setIsEditingDesignation(false)
  }

  // Edit button for designation
  const editDesignationIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentDesignation({ ...rowData })
        setDesignationEditDialogVisible(true)
        setIsEditingDesignation(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for designation
  const deleteDesignationIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setDesignationData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new designation button
  const addNewDesignation = () => {
    setCurrentDesignation({ id: "", value: "", description: "", type: "" })
    setDesignationEditDialogVisible(true)
    setIsEditingDesignation(false)
  }

  // Designation accordion section end

  // Primary Skills accordion section start
  const [primarySkillsData, setPrimarySkillsData] = useState([
    {
      id: "1",
      value: "React",
      description: "JavaScript library for building user interfaces",
      type: "user",
    },
    {
      id: "2", 
      value: "Django",
      description: "Python web framework for rapid development",
      type: "user",
    },
    {
      id: "3",
      value: "SQL", 
      description: "Structured Query Language for database management",
      type: "user",
    },
  ])
  const [isPrimarySkillsEditDialogVisible, setPrimarySkillsEditDialogVisible] = useState(false)
  const [currentPrimarySkill, setCurrentPrimarySkill] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingPrimarySkill, setIsEditingPrimarySkill] = useState(false)

  // Define primary skills options for accordion
  const primarySkillsAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a primary skill (either add or edit)
  const handleSavePrimarySkill = () => {
    if (
      currentPrimarySkill.value &&
      currentPrimarySkill.description &&
      currentPrimarySkill.type
    ) {
      if (isEditingPrimarySkill) {
        // Update existing primary skill
        setPrimarySkillsData(prevData =>
          prevData.map(item =>
            item.id === currentPrimarySkill.id ? { ...currentPrimarySkill } : item
          )
        )
      } else {
        // Add new primary skill with a unique id
        const newPrimarySkill = {
          ...currentPrimarySkill,
          id: Date.now().toString(),
        }
        setPrimarySkillsData(prevData => [...prevData, newPrimarySkill])
      }
      handleCancelPrimarySkill()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelPrimarySkill = () => {
    setPrimarySkillsEditDialogVisible(false)
    setCurrentPrimarySkill({ id: "", value: "", description: "", type: "" })
    setIsEditingPrimarySkill(false)
  }

  // Edit button for primary skills
  const editPrimarySkillIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentPrimarySkill({ ...rowData })
        setPrimarySkillsEditDialogVisible(true)
        setIsEditingPrimarySkill(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for primary skills
  const deletePrimarySkillIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setPrimarySkillsData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new primary skill button
  const addNewPrimarySkill = () => {
    setCurrentPrimarySkill({ id: "", value: "", description: "", type: "" })
    setPrimarySkillsEditDialogVisible(true)
    setIsEditingPrimarySkill(false)
  }

  // Primary Skills accordion section end

  // Secondary Skills accordion section start
  const [secondarySkillsData, setSecondarySkillsData] = useState([
    {
      id: "1",
      value: "PHP",
      description: "Server-side scripting language for web development",
      type: "user",
    },
    {
      id: "2", 
      value: "TypeScript",
      description: "Typed superset of JavaScript for large-scale applications",
      type: "user",
    },
    {
      id: "3",
      value: "Java", 
      description: "Object-oriented programming language for enterprise applications",
      type: "user",
    },
  ])
  const [isSecondarySkillsEditDialogVisible, setSecondarySkillsEditDialogVisible] = useState(false)
  const [currentSecondarySkill, setCurrentSecondarySkill] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingSecondarySkill, setIsEditingSecondarySkill] = useState(false)

  // Define secondary skills options for accordion
  const secondarySkillsAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a secondary skill (either add or edit)
  const handleSaveSecondarySkill = () => {
    if (
      currentSecondarySkill.value &&
      currentSecondarySkill.description &&
      currentSecondarySkill.type
    ) {
      if (isEditingSecondarySkill) {
        // Update existing secondary skill
        setSecondarySkillsData(prevData =>
          prevData.map(item =>
            item.id === currentSecondarySkill.id ? { ...currentSecondarySkill } : item
          )
        )
      } else {
        // Add new secondary skill with a unique id
        const newSecondarySkill = {
          ...currentSecondarySkill,
          id: Date.now().toString(),
        }
        setSecondarySkillsData(prevData => [...prevData, newSecondarySkill])
      }
      handleCancelSecondarySkill()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelSecondarySkill = () => {
    setSecondarySkillsEditDialogVisible(false)
    setCurrentSecondarySkill({ id: "", value: "", description: "", type: "" })
    setIsEditingSecondarySkill(false)
  }

  // Edit button for secondary skills
  const editSecondarySkillIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentSecondarySkill({ ...rowData })
        setSecondarySkillsEditDialogVisible(true)
        setIsEditingSecondarySkill(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for secondary skills
  const deleteSecondarySkillIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setSecondarySkillsData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new secondary skill button
  const addNewSecondarySkill = () => {
    setCurrentSecondarySkill({ id: "", value: "", description: "", type: "" })
    setSecondarySkillsEditDialogVisible(true)
    setIsEditingSecondarySkill(false)
  }

  // Secondary Skills accordion section end

  // Reporting Manager accordion section start
  const [reportingManagerData, setReportingManagerData] = useState([
    {
      id: "1",
      value: "Mahesh kumar Bhoga",
      description: "Senior Project Manager with extensive experience in team leadership",
      type: "user",
    },
    {
      id: "2", 
      value: "Aman kumar",
      description: "Technical Lead specializing in software architecture and team coordination",
      type: "user",
    },
    {
      id: "3",
      value: "Shwetha", 
      description: "Operations Manager responsible for process optimization and team management",
      type: "user",
    },
    {
      id: "4",
      value: "Sayyad Salmanuddin", 
      description: "Engineering Manager with focus on product development and team growth",
      type: "user",
    },
  ])
  const [isReportingManagerEditDialogVisible, setReportingManagerEditDialogVisible] = useState(false)
  const [currentReportingManager, setCurrentReportingManager] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingReportingManager, setIsEditingReportingManager] = useState(false)

  // Define reporting manager options for accordion
  const reportingManagerAccordionOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a reporting manager (either add or edit)
  const handleSaveReportingManager = () => {
    if (
      currentReportingManager.value &&
      currentReportingManager.description &&
      currentReportingManager.type
    ) {
      if (isEditingReportingManager) {
        // Update existing reporting manager
        setReportingManagerData(prevData =>
          prevData.map(item =>
            item.id === currentReportingManager.id ? { ...currentReportingManager } : item
          )
        )
      } else {
        // Add new reporting manager with a unique id
        const newReportingManager = {
          ...currentReportingManager,
          id: Date.now().toString(),
        }
        setReportingManagerData(prevData => [...prevData, newReportingManager])
      }
      handleCancelReportingManager()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelReportingManager = () => {
    setReportingManagerEditDialogVisible(false)
    setCurrentReportingManager({ id: "", value: "", description: "", type: "" })
    setIsEditingReportingManager(false)
  }

  // Edit button for reporting manager
  const editReportingManagerIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentReportingManager({ ...rowData })
        setReportingManagerEditDialogVisible(true)
        setIsEditingReportingManager(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button for reporting manager
  const deleteReportingManagerIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setReportingManagerData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new reporting manager button
  const addNewReportingManager = () => {
    setCurrentReportingManager({ id: "", value: "", description: "", type: "" })
    setReportingManagerEditDialogVisible(true)
    setIsEditingReportingManager(false)
  }

  // Reporting Manager accordion section end

  // Source type start

  const [sourcesData, setSourcesData] = useState([
     {
    name: "Select Work Item",
    description: "This is Select Work Item",
    type: "User",
    id: "1",
  },
  ,
  ])
  const [isSourceEditDialogVisible, setSourceEditDialogVisible] =
    useState(false)
  const [currentSource, setCurrentSource] = useState({
    id: "",
    name: "",
    description: "",
    type: "", // Added type field
  })
  const [isEditingSource, setIsEditingSource] = useState(false)

  // Define source type options
  const sourceTypeOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a source (either add or edit)
  const handleSaveSource = () => {
    if (currentSource.name && currentSource.description && currentSource.type) {
      if (isEditingSource) {
        // Update existing source
        setSourcesData(prevData =>
          prevData.map(item =>
            item.id === currentSource.id ? { ...currentSource } : item
          )
        )
      } else {
        // Add new source with a unique id
        const newSource = {
          ...currentSource,
          id: Date.now().toString(),
        }
        setSourcesData(prevData => [...prevData, newSource])
      }
      handleCancelSource()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelSource = () => {
    setSourceEditDialogVisible(false)
    setCurrentSource({ id: "", name: "", description: "", type: "" })
    setIsEditingSource(false)
  }

  // Edit button
  const editSourceIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentSource({ ...rowData })
        setSourceEditDialogVisible(true)
        setIsEditingSource(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteSourceIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setSourcesData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new source button
  const addNewSource = () => {
    setCurrentSource({ id: "", name: "", description: "", type: "" })
    setSourceEditDialogVisible(true)
    setIsEditingSource(false)
  }

  // Source type end

  // Reffered by start

  const [referredData, setReferredData] = useState([
    {
      id: "1",
      value: "Project Manager",
      description: "Manages project timelines and team coordination",
      type: "user",
    },
    {
      id: "2", 
      value: "UI/UX Developer",
      description: "Designs user interfaces and user experience",
      type: "user",
    },
    {
      id: "3",
      value: "Software Developer", 
      description: "Develops and maintains software applications",
      type: "user",
    },
    {
      id: "4",
      value: "QA",
      description: "Quality assurance and testing specialist",
      type: "user",
    },
  ])
  const [isReferredEditDialogVisible, setReferredEditDialogVisible] =
    useState(false)
  const [currentReferred, setCurrentReferred] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingReferred, setIsEditingReferred] = useState(false)

  // Define referred type options
  const referredTypeOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  // Handle saving a referred (either add or edit)
  const handleSaveReferred = () => {
    if (
      currentReferred.value &&
      currentReferred.description &&
      currentReferred.type
    ) {
      if (isEditingReferred) {
        // Update existing referred
        setReferredData(prevData =>
          prevData.map(item =>
            item.id === currentReferred.id ? { ...currentReferred } : item
          )
        )
      } else {
        // Add new referred with a unique id
        const newReferred = {
          ...currentReferred,
          id: Date.now().toString(),
        }
        setReferredData(prevData => [...prevData, newReferred])
      }
      handleCancelReferred()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelReferred = () => {
    setReferredEditDialogVisible(false)
    setCurrentReferred({ id: "", value: "", description: "", type: "" })
    setIsEditingReferred(false)
  }

  // Edit button
  const editReferredIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentReferred({ ...rowData })
        setReferredEditDialogVisible(true)
        setIsEditingReferred(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteReferredIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setReferredData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new referred button
  const addNewReferred = () => {
    setCurrentReferred({ id: "", value: "", description: "", type: "" })
    setReferredEditDialogVisible(true)
    setIsEditingReferred(false)
  }

  // Reffered by end

  // Doc type start

  const [docTypeData, setDocTypeData] = useState([])
  const [isDocTypeEditDialogVisible, setDocTypeEditDialogVisible] =
    useState(false)
  const [currentDocType, setCurrentDocType] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingDocType, setIsEditingDocType] = useState(false)

  // Define Doc. Type options
  const docTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving a Doc. Type (either add or edit)
  const handleSaveDocType = () => {
    if (
      currentDocType.value &&
      currentDocType.description &&
      currentDocType.type
    ) {
      if (isEditingDocType) {
        // Update existing Doc. Type
        setDocTypeData(prevData =>
          prevData.map(item =>
            item.id === currentDocType.id ? { ...currentDocType } : item
          )
        )
      } else {
        // Add new Doc. Type with a unique id
        const newDocType = {
          ...currentDocType,
          id: Date.now().toString(),
        }
        setDocTypeData(prevData => [...prevData, newDocType])
      }
      handleCancelDocType()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelDocType = () => {
    setDocTypeEditDialogVisible(false)
    setCurrentDocType({ id: "", value: "", description: "", type: "" })
    setIsEditingDocType(false)
  }

  // Edit button
  const editDocTypeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentDocType({ ...rowData })
        setDocTypeEditDialogVisible(true)
        setIsEditingDocType(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteDocTypeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setDocTypeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new Doc. Type button
  const addNewDocType = () => {
    setCurrentDocType({ id: "", value: "", description: "", type: "" })
    setDocTypeEditDialogVisible(true)
    setIsEditingDocType(false)
  }

  // Job type end

  // Degree start

  const [degreeData, setDegreeData] = useState([])
  const [isDegreeEditDialogVisible, setDegreeEditDialogVisible] =
    useState(false)
  const [currentDegree, setCurrentDegree] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingDegree, setIsEditingDegree] = useState(false)

  // Define Degree type options
  const degreeTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving a Degree (either add or edit)
  const handleSaveDegree = () => {
    if (
      currentDegree.value &&
      currentDegree.description &&
      currentDegree.type
    ) {
      if (isEditingDegree) {
        // Update existing Degree
        setDegreeData(prevData =>
          prevData.map(item =>
            item.id === currentDegree.id ? { ...currentDegree } : item
          )
        )
      } else {
        // Add new Degree with a unique id
        const newDegree = {
          ...currentDegree,
          id: Date.now().toString(),
        }
        setDegreeData(prevData => [...prevData, newDegree])
      }
      handleCancelDegree()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelDegree = () => {
    setDegreeEditDialogVisible(false)
    setCurrentDegree({ id: "", value: "", description: "", type: "" })
    setIsEditingDegree(false)
  }

  // Edit button
  const editDegreeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentDegree({ ...rowData })
        setDegreeEditDialogVisible(true)
        setIsEditingDegree(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteDegreeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setDegreeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new Degree button
  const addNewDegree = () => {
    setCurrentDegree({ id: "", value: "", description: "", type: "" })
    setDegreeEditDialogVisible(true)
    setIsEditingDegree(false)
  }

  // degree end

  // Institute start

  const [institutionData, setInstitutionData] = useState([])
  const [isInstitutionEditDialogVisible, setInstitutionEditDialogVisible] =
    useState(false)
  const [currentInstitution, setCurrentInstitution] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingInstitution, setIsEditingInstitution] = useState(false)

  // Define Institution type options
  const institutionTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving an Institution (either add or edit)
  const handleSaveInstitution = () => {
    if (
      currentInstitution.value &&
      currentInstitution.description &&
      currentInstitution.type
    ) {
      if (isEditingInstitution) {
        // Update existing Institution
        setInstitutionData(prevData =>
          prevData.map(item =>
            item.id === currentInstitution.id ? { ...currentInstitution } : item
          )
        )
      } else {
        // Add new Institution with a unique id
        const newInstitution = {
          ...currentInstitution,
          id: Date.now().toString(),
        }
        setInstitutionData(prevData => [...prevData, newInstitution])
      }
      handleCancelInstitution()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelInstitution = () => {
    setInstitutionEditDialogVisible(false)
    setCurrentInstitution({ id: "", value: "", description: "", type: "" })
    setIsEditingInstitution(false)
  }

  // Edit button
  const editInstitutionIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentInstitution({ ...rowData })
        setInstitutionEditDialogVisible(true)
        setIsEditingInstitution(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteInstitutionIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setInstitutionData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new Institution button
  const addNewInstitution = () => {
    setCurrentInstitution({ id: "", value: "", description: "", type: "" })
    setInstitutionEditDialogVisible(true)
    setIsEditingInstitution(false)
  }

  // institute end

  // Job status start

  const [jobStatusData, setJobStatusData] = useState([])
  const [isJobStatusDialogVisible, setJobStatusDialogVisible] = useState(false)
  const [currentJobStatus, setCurrentJobStatus] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingJobStatus, setIsEditingJobStatus] = useState(false)

  // Define Job Status type options
  const jobStatusTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  // Handle saving a Job Status (either add or edit)
  const handleSaveJobStatus = () => {
    if (
      currentJobStatus.value &&
      currentJobStatus.description &&
      currentJobStatus.type
    ) {
      if (isEditingJobStatus) {
        // Update existing Job Status
        setJobStatusData(prevData =>
          prevData.map(item =>
            item.id === currentJobStatus.id ? { ...currentJobStatus } : item
          )
        )
      } else {
        // Add new Job Status with a unique id
        const newJobStatus = {
          ...currentJobStatus,
          id: Date.now().toString(),
        }
        setJobStatusData(prevData => [...prevData, newJobStatus])
      }
      handleCancelJobStatus()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  // Handle canceling the operation
  const handleCancelJobStatus = () => {
    setJobStatusDialogVisible(false)
    setCurrentJobStatus({ id: "", value: "", description: "", type: "" })
    setIsEditingJobStatus(false)
  }

  // Edit button
  const editJobStatusIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentJobStatus({ ...rowData })
        setJobStatusDialogVisible(true)
        setIsEditingJobStatus(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  // Delete button
  const deleteJobStatusIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setJobStatusData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  // Add new Job Status button
  const addNewJobStatus = () => {
    setCurrentJobStatus({ id: "", value: "", description: "", type: "" })
    setJobStatusDialogVisible(true)
    setIsEditingJobStatus(false)
  }

  // Job status start

  // worktype start

  const [workTypeData, setWorkTypeData] = useState([])
  const [isWorkTypeDialogVisible, setWorkTypeDialogVisible] = useState(false)
  const [currentWorkType, setCurrentWorkType] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingWorkType, setIsEditingWorkType] = useState(false)

  const workTypeOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  const handleSaveWorkType = () => {
    if (
      currentWorkType.value &&
      currentWorkType.description &&
      currentWorkType.type
    ) {
      if (isEditingWorkType) {
        setWorkTypeData(prevData =>
          prevData.map(item =>
            item.id === currentWorkType.id ? { ...currentWorkType } : item
          )
        )
      } else {
        const newWorkType = {
          ...currentWorkType,
          id: Date.now().toString(),
        }
        setWorkTypeData(prevData => [...prevData, newWorkType])
      }
      handleCancelWorkType()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelWorkType = () => {
    setWorkTypeDialogVisible(false)
    setCurrentWorkType({ id: "", value: "", description: "", type: "" })
    setIsEditingWorkType(false)
  }

  const editWorkTypeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentWorkType({ ...rowData })
        setWorkTypeDialogVisible(true)
        setIsEditingWorkType(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteWorkTypeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setWorkTypeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewWorkType = () => {
    setCurrentWorkType({ id: "", value: "", description: "", type: "" })
    setWorkTypeDialogVisible(true)
    setIsEditingWorkType(false)
  }

  // work type end

  // Job type start

  const [jobTypeData, setJobTypeData] = useState([])
  const [isJobTypeDialogVisible, setJobTypeDialogVisible] = useState(false)
  const [currentJobType, setCurrentJobType] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingJobType, setIsEditingJobType] = useState(false)

  const jobTypeOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "system" },
  ]

  const handleSaveJobType = () => {
    if (
      currentJobType.value &&
      currentJobType.description &&
      currentJobType.type
    ) {
      if (isEditingJobType) {
        setJobTypeData(prevData =>
          prevData.map(item =>
            item.id === currentJobType.id ? { ...currentJobType } : item
          )
        )
      } else {
        const newJobType = {
          ...currentJobType,
          id: Date.now().toString(),
        }
        setJobTypeData(prevData => [...prevData, newJobType])
      }
      handleCancelJobType()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelJobType = () => {
    setJobTypeDialogVisible(false)
    setCurrentJobType({ id: "", value: "", description: "", type: "" })
    setIsEditingJobType(false)
  }

  const editJobTypeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentJobType({ ...rowData })
        setJobTypeDialogVisible(true)
        setIsEditingJobType(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteJobTypeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setJobTypeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewJobType = () => {
    setCurrentJobType({ id: "", value: "", description: "", type: "" })
    setJobTypeDialogVisible(true)
    setIsEditingJobType(false)
  }

  // job type end

  // Department start

  const [departmentData, setDepartmentData] = useState([])
  const [isDepartmentDialogVisible, setDepartmentDialogVisible] =
    useState(false)
  const [currentDepartment, setCurrentDepartment] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingDepartment, setIsEditingDepartment] = useState(false)

  const departmentTypeOptions = [
    { label: "User", value: "user" },
    { label: "System", value: "System" },
  ]

  const handleSaveDepartment = () => {
    if (
      currentDepartment.value &&
      currentDepartment.description &&
      currentDepartment.type
    ) {
      if (isEditingDepartment) {
        setDepartmentData(prevData =>
          prevData.map(item =>
            item.id === currentDepartment.id ? { ...currentDepartment } : item
          )
        )
      } else {
        const newDepartment = {
          ...currentDepartment,
          id: Date.now().toString(),
        }
        setDepartmentData(prevData => [...prevData, newDepartment])
      }
      handleCancelDepartment()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelDepartment = () => {
    setDepartmentDialogVisible(false)
    setCurrentDepartment({ id: "", value: "", description: "", type: "" })
    setIsEditingDepartment(false)
  }

  const editDepartmentIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentDepartment({ ...rowData })
        setDepartmentDialogVisible(true)
        setIsEditingDepartment(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteDepartmentIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setDepartmentData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewDepartment = () => {
    setCurrentDepartment({ id: "", value: "", description: "", type: "" })
    setDepartmentDialogVisible(true)
    setIsEditingDepartment(false)
  }

  // Department end

  // Seniority start

  const [seniorityData, setSeniorityData] = useState([])
  const [isSeniorityDialogVisible, setSeniorityDialogVisible] = useState(false)
  const [currentSeniority, setCurrentSeniority] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingSeniority, setIsEditingSeniority] = useState(false)

  const seniorityTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveSeniority = () => {
    if (
      currentSeniority.value &&
      currentSeniority.description &&
      currentSeniority.type
    ) {
      if (isEditingSeniority) {
        setSeniorityData(prevData =>
          prevData.map(item =>
            item.id === currentSeniority.id ? { ...currentSeniority } : item
          )
        )
      } else {
        const newSeniority = {
          ...currentSeniority,
          id: Date.now().toString(),
        }
        setSeniorityData(prevData => [...prevData, newSeniority])
      }
      handleCancelSeniority()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelSeniority = () => {
    setSeniorityDialogVisible(false)
    setCurrentSeniority({ id: "", value: "", description: "", type: "" })
    setIsEditingSeniority(false)
  }

  const editSeniorityIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentSeniority({ ...rowData })
        setSeniorityDialogVisible(true)
        setIsEditingSeniority(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteSeniorityIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setSeniorityData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewSeniority = () => {
    setCurrentSeniority({ id: "", value: "", description: "", type: "" })
    setSeniorityDialogVisible(true)
    setIsEditingSeniority(false)
  }

  // Seniority end

  const [specialtiesData, setSpecialtiesData] = useState([])
  const [isSpecialtiesDialogVisible, setSpecialtiesDialogVisible] =
    useState(false)
  const [currentSpecialty, setCurrentSpecialty] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingSpecialty, setIsEditingSpecialty] = useState(false)

  const specialtiesTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveSpecialty = () => {
    if (
      currentSpecialty.value &&
      currentSpecialty.description &&
      currentSpecialty.type
    ) {
      if (isEditingSpecialty) {
        setSpecialtiesData(prevData =>
          prevData.map(item =>
            item.id === currentSpecialty.id ? { ...currentSpecialty } : item
          )
        )
      } else {
        const newSpecialty = {
          ...currentSpecialty,
          id: Date.now().toString(),
        }
        setSpecialtiesData(prevData => [...prevData, newSpecialty])
      }
      handleCancelSpecialty()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelSpecialty = () => {
    setSpecialtiesDialogVisible(false)
    setCurrentSpecialty({ id: "", value: "", description: "", type: "" })
    setIsEditingSpecialty(false)
  }

  const editSpecialtyIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentSpecialty({ ...rowData })
        setSpecialtiesDialogVisible(true)
        setIsEditingSpecialty(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteSpecialtyIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setSpecialtiesData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewSpecialty = () => {
    setCurrentSpecialty({ id: "", value: "", description: "", type: "" })
    setSpecialtiesDialogVisible(true)
    setIsEditingSpecialty(false)
  }

  // industry start

  const [industryData, setIndustryData] = useState([])
  const [isIndustryDialogVisible, setIndustryDialogVisible] = useState(false)
  const [currentIndustry, setCurrentIndustry] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingIndustry, setIsEditingIndustry] = useState(false)

  const industryTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveIndustry = () => {
    if (
      currentIndustry.value &&
      currentIndustry.description &&
      currentIndustry.type
    ) {
      if (isEditingIndustry) {
        setIndustryData(prevData =>
          prevData.map(item =>
            item.id === currentIndustry.id ? { ...currentIndustry } : item
          )
        )
      } else {
        const newIndustry = {
          ...currentIndustry,
          id: Date.now().toString(),
        }
        setIndustryData(prevData => [...prevData, newIndustry])
      }
      handleCancelIndustry()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelIndustry = () => {
    setIndustryDialogVisible(false)
    setCurrentIndustry({ id: "", value: "", description: "", type: "" })
    setIsEditingIndustry(false)
  }

  const editIndustryIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentIndustry({ ...rowData })
        setIndustryDialogVisible(true)
        setIsEditingIndustry(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteIndustryIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setIndustryData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewIndustry = () => {
    setCurrentIndustry({ id: "", value: "", description: "", type: "" })
    setIndustryDialogVisible(true)
    setIsEditingIndustry(false)
  }

  // industry end

  // company size start

  const [companySizeData, setCompanySizeData] = useState([])
  const [isCompanySizeDialogVisible, setCompanySizeDialogVisible] =
    useState(false)
  const [currentCompanySize, setCurrentCompanySize] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingCompanySize, setIsEditingCompanySize] = useState(false)

  const companySizeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveCompanySize = () => {
    if (
      currentCompanySize.value &&
      currentCompanySize.description &&
      currentCompanySize.type
    ) {
      if (isEditingCompanySize) {
        setCompanySizeData(prevData =>
          prevData.map(item =>
            item.id === currentCompanySize.id ? { ...currentCompanySize } : item
          )
        )
      } else {
        const newCompanySize = {
          ...currentCompanySize,
          id: Date.now().toString(),
        }
        setCompanySizeData(prevData => [...prevData, newCompanySize])
      }
      handleCancelCompanySize()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelCompanySize = () => {
    setCompanySizeDialogVisible(false)
    setCurrentCompanySize({ id: "", value: "", description: "", type: "" })
    setIsEditingCompanySize(false)
  }

  const editCompanySizeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentCompanySize({ ...rowData })
        setCompanySizeDialogVisible(true)
        setIsEditingCompanySize(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteCompanySizeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setCompanySizeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewCompanySize = () => {
    setCurrentCompanySize({ id: "", value: "", description: "", type: "" })
    setCompanySizeDialogVisible(true)
    setIsEditingCompanySize(false)
  }

  // company size end

  // Schedule type start

  const [scheduleTypeData, setScheduleTypeData] = useState([])
  const [isScheduleTypeDialogVisible, setScheduleTypeDialogVisible] =
    useState(false)
  const [currentScheduleType, setCurrentScheduleType] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingScheduleType, setIsEditingScheduleType] = useState(false)

  const scheduleTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveScheduleType = () => {
    if (
      currentScheduleType.value &&
      currentScheduleType.description &&
      currentScheduleType.type
    ) {
      if (isEditingScheduleType) {
        setScheduleTypeData(prevData =>
          prevData.map(item =>
            item.id === currentScheduleType.id
              ? { ...currentScheduleType }
              : item
          )
        )
      } else {
        const newScheduleType = {
          ...currentScheduleType,
          id: Date.now().toString(),
        }
        setScheduleTypeData(prevData => [...prevData, newScheduleType])
      }
      handleCancelScheduleType()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelScheduleType = () => {
    setScheduleTypeDialogVisible(false)
    setCurrentScheduleType({ id: "", value: "", description: "", type: "" })
    setIsEditingScheduleType(false)
  }

  const editScheduleTypeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentScheduleType({ ...rowData })
        setScheduleTypeDialogVisible(true)
        setIsEditingScheduleType(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteScheduleTypeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setScheduleTypeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewScheduleType = () => {
    setCurrentScheduleType({ id: "", value: "", description: "", type: "" })
    setScheduleTypeDialogVisible(true)
    setIsEditingScheduleType(false)
  }

  // schedle typ end

  // Schedule sub-type

  const [scheduleSubTypeData, setScheduleSubTypeData] = useState([])
  const [isScheduleSubTypeDialogVisible, setScheduleSubTypeDialogVisible] =
    useState(false)
  const [currentScheduleSubType, setCurrentScheduleSubType] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingScheduleSubType, setIsEditingScheduleSubType] =
    useState(false)

  const scheduleSubTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveScheduleSubType = () => {
    if (
      currentScheduleSubType.value &&
      currentScheduleSubType.description &&
      currentScheduleSubType.type
    ) {
      if (isEditingScheduleSubType) {
        setScheduleSubTypeData(prevData =>
          prevData.map(item =>
            item.id === currentScheduleSubType.id
              ? { ...currentScheduleSubType }
              : item
          )
        )
      } else {
        const newScheduleSubType = {
          ...currentScheduleSubType,
          id: Date.now().toString(),
        }
        setScheduleSubTypeData(prevData => [...prevData, newScheduleSubType])
      }
      handleCancelScheduleSubType()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelScheduleSubType = () => {
    setScheduleSubTypeDialogVisible(false)
    setCurrentScheduleSubType({ id: "", value: "", description: "", type: "" })
    setIsEditingScheduleSubType(false)
  }

  const editScheduleSubTypeIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentScheduleSubType({ ...rowData })
        setScheduleSubTypeDialogVisible(true)
        setIsEditingScheduleSubType(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteScheduleSubTypeIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setScheduleSubTypeData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewScheduleSubType = () => {
    setCurrentScheduleSubType({ id: "", value: "", description: "", type: "" })
    setScheduleSubTypeDialogVisible(true)
    setIsEditingScheduleSubType(false)
  }

  // schedule sub-type

  // Received System start

  const [receivedSystemData, setReceivedSystemData] = useState([])
  const [isReceivedSystemDialogVisible, setReceivedSystemDialogVisible] =
    useState(false)
  const [currentReceivedSystem, setCurrentReceivedSystem] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingReceivedSystem, setIsEditingReceivedSystem] = useState(false)

  const receivedSystemOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveReceivedSystem = () => {
    if (
      currentReceivedSystem.value &&
      currentReceivedSystem.description &&
      currentReceivedSystem.type
    ) {
      if (isEditingReceivedSystem) {
        setReceivedSystemData(prevData =>
          prevData.map(item =>
            item.id === currentReceivedSystem.id
              ? { ...currentReceivedSystem }
              : item
          )
        )
      } else {
        const newReceivedSystem = {
          ...currentReceivedSystem,
          id: Date.now().toString(),
        }
        setReceivedSystemData(prevData => [...prevData, newReceivedSystem])
      }
      handleCancelReceivedSystem()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelReceivedSystem = () => {
    setReceivedSystemDialogVisible(false)
    setCurrentReceivedSystem({ id: "", value: "", description: "", type: "" })
    setIsEditingReceivedSystem(false)
  }

  const editReceivedSystemIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentReceivedSystem({ ...rowData })
        setReceivedSystemDialogVisible(true)
        setIsEditingReceivedSystem(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteReceivedSystemIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setReceivedSystemData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewReceivedSystem = () => {
    setCurrentReceivedSystem({ id: "", value: "", description: "", type: "" })
    setReceivedSystemDialogVisible(true)
    setIsEditingReceivedSystem(false)
  }

  // Received type end

  // Potential system start

  const [potentialSystemData, setPotentialSystemData] = useState([])
  const [isPotentialSystemDialogVisible, setPotentialSystemDialogVisible] =
    useState(false)
  const [currentPotentialSystem, setCurrentPotentialSystem] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingPotentialSystem, setIsEditingPotentialSystem] =
    useState(false)

  const potentialSystemOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSavePotentialSystem = () => {
    if (
      currentPotentialSystem.value &&
      currentPotentialSystem.description &&
      currentPotentialSystem.type
    ) {
      if (isEditingPotentialSystem) {
        setPotentialSystemData(prevData =>
          prevData.map(item =>
            item.id === currentPotentialSystem.id
              ? { ...currentPotentialSystem }
              : item
          )
        )
      } else {
        const newPotentialSystem = {
          ...currentPotentialSystem,
          id: Date.now().toString(),
        }
        setPotentialSystemData(prevData => [...prevData, newPotentialSystem])
      }
      handleCancelPotentialSystem()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelPotentialSystem = () => {
    setPotentialSystemDialogVisible(false)
    setCurrentPotentialSystem({ id: "", value: "", description: "", type: "" })
    setIsEditingPotentialSystem(false)
  }

  const editPotentialSystemIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentPotentialSystem({ ...rowData })
        setPotentialSystemDialogVisible(true)
        setIsEditingPotentialSystem(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deletePotentialSystemIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setPotentialSystemData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewPotentialSystem = () => {
    setCurrentPotentialSystem({ id: "", value: "", description: "", type: "" })
    setPotentialSystemDialogVisible(true)
    setIsEditingPotentialSystem(false)
  }

  // potential system end

  // Submitted system start

  const [submittedSystemData, setSubmittedSystemData] = useState([])
  const [isSubmittedSystemDialogVisible, setSubmittedSystemDialogVisible] =
    useState(false)
  const [currentSubmittedSystem, setCurrentSubmittedSystem] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingSubmittedSystem, setIsEditingSubmittedSystem] =
    useState(false)

  const submittedSystemOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveSubmittedSystem = () => {
    if (
      currentSubmittedSystem.value &&
      currentSubmittedSystem.description &&
      currentSubmittedSystem.type
    ) {
      if (isEditingSubmittedSystem) {
        setSubmittedSystemData(prevData =>
          prevData.map(item =>
            item.id === currentSubmittedSystem.id
              ? { ...currentSubmittedSystem }
              : item
          )
        )
      } else {
        const newSubmittedSystem = {
          ...currentSubmittedSystem,
          id: Date.now().toString(),
        }
        setSubmittedSystemData(prevData => [...prevData, newSubmittedSystem])
      }
      handleCancelSubmittedSystem()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelSubmittedSystem = () => {
    setSubmittedSystemDialogVisible(false)
    setCurrentSubmittedSystem({ id: "", value: "", description: "", type: "" })
    setIsEditingSubmittedSystem(false)
  }

  const editSubmittedSystemIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentSubmittedSystem({ ...rowData })
        setSubmittedSystemDialogVisible(true)
        setIsEditingSubmittedSystem(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteSubmittedSystemIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setSubmittedSystemData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewSubmittedSystem = () => {
    setCurrentSubmittedSystem({ id: "", value: "", description: "", type: "" })
    setSubmittedSystemDialogVisible(true)
    setIsEditingSubmittedSystem(false)
  }

  // submitted system end

  // all user start

  const [userTableData, setUserTableData] = useState([])
  const [isUserDialogVisible, setUserDialogVisible] = useState(false)
  const [selectedUserRecord, setSelectedUserRecord] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditUserMode, setEditUserMode] = useState(false)

  const userRoleOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveUserRecord = () => {
    if (
      selectedUserRecord.value &&
      selectedUserRecord.description &&
      selectedUserRecord.type
    ) {
      if (isEditUserMode) {
        setUserTableData(prevData =>
          prevData.map(user =>
            user.id === selectedUserRecord.id ? { ...selectedUserRecord } : user
          )
        )
      } else {
        const newUserRecord = {
          ...selectedUserRecord,
          id: Date.now().toString(),
        }
        setUserTableData(prevData => [...prevData, newUserRecord])
      }
      handleCancelUserDialog()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelUserDialog = () => {
    setUserDialogVisible(false)
    setSelectedUserRecord({ id: "", value: "", description: "", type: "" })
    setEditUserMode(false)
  }

  const renderEditButton = user => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setSelectedUserRecord({ ...user })
        setUserDialogVisible(true)
        setEditUserMode(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const renderDeleteButton = user => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setUserTableData(prevData =>
          prevData.filter(item => item.id !== user.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewUserRecord = () => {
    setSelectedUserRecord({ id: "", value: "", description: "", type: "" })
    setUserDialogVisible(true)
    setEditUserMode(false)
  }

  // All user end

  // shortlisted start

  const [shortlistedData, setShortlistedData] = useState([])
  const [isShortlistedDialogVisible, setShortlistedDialogVisible] =
    useState(false)
  const [currentShortlisted, setCurrentShortlisted] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditShortlistedMode, setEditShortlistedMode] = useState(false)

  const shortlistedTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveShortlisted = () => {
    if (
      currentShortlisted.value &&
      currentShortlisted.description &&
      currentShortlisted.type
    ) {
      if (isEditShortlistedMode) {
        setShortlistedData(prevData =>
          prevData.map(item =>
            item.id === currentShortlisted.id ? { ...currentShortlisted } : item
          )
        )
      } else {
        const newShortlisted = {
          ...currentShortlisted,
          id: Date.now().toString(),
        }
        setShortlistedData(prevData => [...prevData, newShortlisted])
      }
      handleCancelShortlisted()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelShortlisted = () => {
    setShortlistedDialogVisible(false)
    setCurrentShortlisted({ id: "", value: "", description: "", type: "" })
    setEditShortlistedMode(false)
  }

  const renderShortlistedEditButton = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentShortlisted({ ...rowData })
        setShortlistedDialogVisible(true)
        setEditShortlistedMode(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const renderShortlistedDeleteButton = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setShortlistedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewShortlisted = () => {
    setCurrentShortlisted({ id: "", value: "", description: "", type: "" })
    setShortlistedDialogVisible(true)
    setEditShortlistedMode(false)
  }

  // Shortlisted end

  // Interview start

  const [interviewData, setInterviewData] = useState([])
  const [isInterviewDialogVisible, setInterviewDialogVisible] = useState(false)
  const [currentInterview, setCurrentInterview] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditInterviewMode, setEditInterviewMode] = useState(false)

  const interviewTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveInterview = () => {
    if (
      currentInterview.value &&
      currentInterview.description &&
      currentInterview.type
    ) {
      if (isEditInterviewMode) {
        setInterviewData(prevData =>
          prevData.map(item =>
            item.id === currentInterview.id ? { ...currentInterview } : item
          )
        )
      } else {
        const newInterview = {
          ...currentInterview,
          id: Date.now().toString(),
        }
        setInterviewData(prevData => [...prevData, newInterview])
      }
      handleCancelInterview()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelInterview = () => {
    setInterviewDialogVisible(false)
    setCurrentInterview({ id: "", value: "", description: "", type: "" })
    setEditInterviewMode(false)
  }

  const renderInterviewEditButton = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentInterview({ ...rowData })
        setInterviewDialogVisible(true)
        setEditInterviewMode(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const renderInterviewDeleteButton = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setInterviewData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewInterview = () => {
    setCurrentInterview({ id: "", value: "", description: "", type: "" })
    setInterviewDialogVisible(true)
    setEditInterviewMode(false)
  }

  // interview end

  // verification start
  const [verificationData, setVerificationData] = useState([])
  const [isVerificationDialogVisible, setVerificationDialogVisible] =
    useState(false)
  const [currentVerification, setCurrentVerification] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditVerificationMode, setEditVerificationMode] = useState(false)

  const verificationTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveVerification = () => {
    if (
      currentVerification.value &&
      currentVerification.description &&
      currentVerification.type
    ) {
      if (isEditVerificationMode) {
        setVerificationData(prevData =>
          prevData.map(item =>
            item.id === currentVerification.id
              ? { ...currentVerification }
              : item
          )
        )
      } else {
        const newVerification = {
          ...currentVerification,
          id: Date.now().toString(),
        }
        setVerificationData(prevData => [...prevData, newVerification])
      }
      handleCancelVerification()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelVerification = () => {
    setVerificationDialogVisible(false)
    setCurrentVerification({ id: "", value: "", description: "", type: "" })
    setEditVerificationMode(false)
  }

  const renderVerificationEditButton = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentVerification({ ...rowData })
        setVerificationDialogVisible(true)
        setEditVerificationMode(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const renderVerificationDeleteButton = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setVerificationData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewVerification = () => {
    setCurrentVerification({ id: "", value: "", description: "", type: "" })
    setVerificationDialogVisible(true)
    setEditVerificationMode(false)
  }

  // verification end

  // selected start

  const [selectedData, setSelectedData] = useState([])
  const [isSelectedDialogVisible, setSelectedDialogVisible] = useState(false)
  const [currentSelected, setCurrentSelected] = useState({
    id: "",
    value: "",
    description: "",
    category: "",
  })
  const [isEditSelectedMode, setEditSelectedMode] = useState(false)

  const selectedCategoryOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveSelected = () => {
    if (
      currentSelected.value &&
      currentSelected.description &&
      currentSelected.category
    ) {
      if (isEditSelectedMode) {
        setSelectedData(prevData =>
          prevData.map(item =>
            item.id === currentSelected.id ? { ...currentSelected } : item
          )
        )
      } else {
        const newSelected = {
          ...currentSelected,
          id: Date.now().toString(),
        }
        setSelectedData(prevData => [...prevData, newSelected])
      }
      handleCancelSelected()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelSelected = () => {
    setSelectedDialogVisible(false)
    setCurrentSelected({ id: "", value: "", description: "", category: "" })
    setEditSelectedMode(false)
  }

  const renderSelectedEditButton = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentSelected({ ...rowData })
        setSelectedDialogVisible(true)
        setEditSelectedMode(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const renderSelectedDeleteButton = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setSelectedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewSelected = () => {
    setCurrentSelected({ id: "", value: "", description: "", category: "" })
    setSelectedDialogVisible(true)
    setEditSelectedMode(false)
  }

  // selected end

  // Rejected start

  const [rejectedData, setRejectedData] = useState([])
  const [isRejectedDialogVisible, setRejectedDialogVisible] = useState(false)
  const [currentRejected, setCurrentRejected] = useState({
    id: "",
    value: "",
    description: "",
    reason: "",
  })
  const [isEditRejectedMode, setEditRejectedMode] = useState(false)

  const rejectedReasonOptions = [{ label: "User", value: "User" }]

  const handleSaveRejected = () => {
    if (
      currentRejected.value &&
      currentRejected.description &&
      currentRejected.reason
    ) {
      if (isEditRejectedMode) {
        setRejectedData(prevData =>
          prevData.map(item =>
            item.id === currentRejected.id ? { ...currentRejected } : item
          )
        )
      } else {
        const newRejected = {
          ...currentRejected,
          id: Date.now().toString(),
        }
        setRejectedData(prevData => [...prevData, newRejected])
      }
      handleCancelRejected()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelRejected = () => {
    setRejectedDialogVisible(false)
    setCurrentRejected({ id: "", value: "", description: "", reason: "" })
    setEditRejectedMode(false)
  }

  const renderRejectedEditButton = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentRejected({ ...rowData })
        setRejectedDialogVisible(true)
        setEditRejectedMode(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const renderRejectedDeleteButton = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setRejectedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewRejected = () => {
    setCurrentRejected({ id: "", value: "", description: "", reason: "" })
    setRejectedDialogVisible(true)
    setEditRejectedMode(false)
  }

  // Rejected end

  // offered start

  const [offeredData, setOfferedData] = useState([])
  const [isOfferedDialogVisible, setOfferedDialogVisible] = useState(false)
  const [currentOffered, setCurrentOffered] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingOffered, setIsEditingOffered] = useState(false)

  const offeredTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveOffered = () => {
    if (
      currentOffered.value &&
      currentOffered.description &&
      currentOffered.type
    ) {
      if (isEditingOffered) {
        setOfferedData(prevData =>
          prevData.map(item =>
            item.id === currentOffered.id ? { ...currentOffered } : item
          )
        )
      } else {
        const newOffered = {
          ...currentOffered,
          id: Date.now().toString(),
        }
        setOfferedData(prevData => [...prevData, newOffered])
      }
      handleCancelOffered()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelOffered = () => {
    setOfferedDialogVisible(false)
    setCurrentOffered({ id: "", value: "", description: "", type: "" })
    setIsEditingOffered(false)
  }

  const editOfferedIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentOffered({ ...rowData })
        setOfferedDialogVisible(true)
        setIsEditingOffered(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteOfferedIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setOfferedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewOffered = () => {
    setCurrentOffered({ id: "", value: "", description: "", type: "" })
    setOfferedDialogVisible(true)
    setIsEditingOffered(false)
  }

  // offered end

  // Offer Accepted start

  const [offerAcceptedData, setOfferAcceptedData] = useState([])
  const [isOfferAcceptedDialogVisible, setOfferAcceptedDialogVisible] =
    useState(false)
  const [currentOfferAccepted, setCurrentOfferAccepted] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingOfferAccepted, setIsEditingOfferAccepted] = useState(false)

  const offerAcceptedTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveOfferAccepted = () => {
    if (
      currentOfferAccepted.value &&
      currentOfferAccepted.description &&
      currentOfferAccepted.type
    ) {
      if (isEditingOfferAccepted) {
        setOfferAcceptedData(prevData =>
          prevData.map(item =>
            item.id === currentOfferAccepted.id
              ? { ...currentOfferAccepted }
              : item
          )
        )
      } else {
        const newOfferAccepted = {
          ...currentOfferAccepted,
          id: Date.now().toString(),
        }
        setOfferAcceptedData(prevData => [...prevData, newOfferAccepted])
      }
      handleCancelOfferAccepted()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelOfferAccepted = () => {
    setOfferAcceptedDialogVisible(false)
    setCurrentOfferAccepted({ id: "", value: "", description: "", type: "" })
    setIsEditingOfferAccepted(false)
  }

  const editOfferAcceptedIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentOfferAccepted({ ...rowData })
        setOfferAcceptedDialogVisible(true)
        setIsEditingOfferAccepted(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteOfferAcceptedIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setOfferAcceptedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewOfferAccepted = () => {
    setCurrentOfferAccepted({ id: "", value: "", description: "", type: "" })
    setOfferAcceptedDialogVisible(true)
    setIsEditingOfferAccepted(false)
  }

  // Offer Accepted end

  // Offer Rejected start

  const [offerRejectedData, setOfferRejectedData] = useState([])
  const [isOfferRejectedDialogVisible, setOfferRejectedDialogVisible] =
    useState(false)
  const [currentOfferRejected, setCurrentOfferRejected] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingOfferRejected, setIsEditingOfferRejected] = useState(false)

  const offerRejectedTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveOfferRejected = () => {
    if (
      currentOfferRejected.value &&
      currentOfferRejected.description &&
      currentOfferRejected.type
    ) {
      if (isEditingOfferRejected) {
        setOfferRejectedData(prevData =>
          prevData.map(item =>
            item.id === currentOfferRejected.id
              ? { ...currentOfferRejected }
              : item
          )
        )
      } else {
        const newOfferRejected = {
          ...currentOfferRejected,
          id: Date.now().toString(),
        }
        setOfferRejectedData(prevData => [...prevData, newOfferRejected])
      }
      handleCancelOfferRejected()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelOfferRejected = () => {
    setOfferRejectedDialogVisible(false)
    setCurrentOfferRejected({ id: "", value: "", description: "", type: "" })
    setIsEditingOfferRejected(false)
  }

  const editOfferRejectedIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentOfferRejected({ ...rowData })
        setOfferRejectedDialogVisible(true)
        setIsEditingOfferRejected(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteOfferRejectedIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setOfferRejectedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewOfferRejected = () => {
    setCurrentOfferRejected({ id: "", value: "", description: "", type: "" })
    setOfferRejectedDialogVisible(true)
    setIsEditingOfferRejected(false)
  }

  // Offer Rejected end

  // Offer released start

  const [offerReleasedData, setOfferReleasedData] = useState([])
  const [isOfferReleasedDialogVisible, setOfferReleasedDialogVisible] =
    useState(false)
  const [currentOfferReleased, setCurrentOfferReleased] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingOfferReleased, setIsEditingOfferReleased] = useState(false)

  const offerReleasedTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveOfferReleased = () => {
    if (
      currentOfferReleased.value &&
      currentOfferReleased.description &&
      currentOfferReleased.type
    ) {
      if (isEditingOfferReleased) {
        setOfferReleasedData(prevData =>
          prevData.map(item =>
            item.id === currentOfferReleased.id
              ? { ...currentOfferReleased }
              : item
          )
        )
      } else {
        const newOfferReleased = {
          ...currentOfferReleased,
          id: Date.now().toString(),
        }
        setOfferReleasedData(prevData => [...prevData, newOfferReleased])
      }
      handleCancelOfferReleased()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelOfferReleased = () => {
    setOfferReleasedDialogVisible(false)
    setCurrentOfferReleased({ id: "", value: "", description: "", type: "" })
    setIsEditingOfferReleased(false)
  }

  const editOfferReleasedIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentOfferReleased({ ...rowData })
        setOfferReleasedDialogVisible(true)
        setIsEditingOfferReleased(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteOfferReleasedIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setOfferReleasedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewOfferReleased = () => {
    setCurrentOfferReleased({ id: "", value: "", description: "", type: "" })
    setOfferReleasedDialogVisible(true)
    setIsEditingOfferReleased(false)
  }

  // Offer released end

  // Onboarding start

  const [onboardingData, setOnboardingData] = useState([])
  const [isOnboardingDialogVisible, setOnboardingDialogVisible] =
    useState(false)
  const [currentOnboarding, setCurrentOnboarding] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingOnboarding, setIsEditingOnboarding] = useState(false)

  const onboardingTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveOnboarding = () => {
    if (
      currentOnboarding.value &&
      currentOnboarding.description &&
      currentOnboarding.type
    ) {
      if (isEditingOnboarding) {
        setOnboardingData(prevData =>
          prevData.map(item =>
            item.id === currentOnboarding.id ? { ...currentOnboarding } : item
          )
        )
      } else {
        const newOnboarding = {
          ...currentOnboarding,
          id: Date.now().toString(),
        }
        setOnboardingData(prevData => [...prevData, newOnboarding])
      }
      handleCancelOnboarding()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelOnboarding = () => {
    setOnboardingDialogVisible(false)
    setCurrentOnboarding({ id: "", value: "", description: "", type: "" })
    setIsEditingOnboarding(false)
  }

  const editOnboardingIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentOnboarding({ ...rowData })
        setOnboardingDialogVisible(true)
        setIsEditingOnboarding(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteOnboardingIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setOnboardingData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewOnboarding = () => {
    setCurrentOnboarding({ id: "", value: "", description: "", type: "" })
    setOnboardingDialogVisible(true)
    setIsEditingOnboarding(false)
  }

  // Onboarding end

  // Joined start

  const [joinedData, setJoinedData] = useState([])
  const [isJoinedDialogVisible, setJoinedDialogVisible] = useState(false)
  const [currentJoined, setCurrentJoined] = useState({
    id: "",
    value: "",
    description: "",
    type: "",
  })
  const [isEditingJoined, setIsEditingJoined] = useState(false)

  const joinedTypeOptions = [
    { label: "User", value: "User" },
    { label: "System", value: "System" },
  ]

  const handleSaveJoined = () => {
    if (
      currentJoined.value &&
      currentJoined.description &&
      currentJoined.type
    ) {
      if (isEditingJoined) {
        setJoinedData(prevData =>
          prevData.map(item =>
            item.id === currentJoined.id ? { ...currentJoined } : item
          )
        )
      } else {
        const newJoined = {
          ...currentJoined,
          id: Date.now().toString(),
        }
        setJoinedData(prevData => [...prevData, newJoined])
      }
      handleCancelJoined()
    } else {
      alert("Please fill all fields before saving.")
    }
  }

  const handleCancelJoined = () => {
    setJoinedDialogVisible(false)
    setCurrentJoined({ id: "", value: "", description: "", type: "" })
    setIsEditingJoined(false)
  }

  const editJoinedIcon = rowData => (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        setCurrentJoined({ ...rowData })
        setJoinedDialogVisible(true)
        setIsEditingJoined(true)
      }}
      className="p-button-rounded p-button-info"
    />
  )

  const deleteJoinedIcon = rowData => (
    <Button
      icon="pi pi-trash"
      onClick={() => {
        setJoinedData(prevData =>
          prevData.filter(item => item.id !== rowData.id)
        )
      }}
      className="p-button-rounded p-button-danger"
    />
  )

  const addNewJoined = () => {
    setCurrentJoined({ id: "", value: "", description: "", type: "" })
    setJoinedDialogVisible(true)
    setIsEditingJoined(false)
  }

  // Joined end

  // categories start

  const [nodes, setNodes] = useState([])
  const [selectedNodeKey, setSelectedNodeKey] = useState(null)

  // Function to create a new node
  const createNode = (parentId = null) => {
    const newNode = {
      key: Date.now().toString(),
      label: "",
      parentId,
      children: [],
    }

    if (!parentId) {
      setNodes([...nodes, newNode])
    } else {
      const updateNodes = nodesList => {
        return nodesList.map(node => {
          if (node.key === parentId) {
            return {
              ...node,
              children: [...(node.children || []), newNode],
            }
          }
          if (node.children && node.children.length > 0) {
            return {
              ...node,
              children: updateNodes(node.children),
            }
          }
          return node
        })
      }
      setNodes(updateNodes(nodes))
    }
  }

  // Function to update node label
  const updateNodeLabel = (id, newLabel) => {
    const updateNodes = nodesList => {
      return nodesList.map(node => {
        if (node.key === id) {
          return { ...node, label: newLabel }
        }
        if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: updateNodes(node.children),
          }
        }
        return node
      })
    }
    setNodes(updateNodes(nodes))
  }

  // Function to delete a node
  const deleteNode = id => {
    const removeNode = nodesList => {
      return nodesList.filter(node => {
        if (node.key === id) {
          return false
        }
        if (node.children && node.children.length > 0) {
          node.children = removeNode(node.children)
        }
        return true
      })
    }
    setNodes(removeNode(nodes))
  }

  // Recursive component to render the tree structure
  const RenderNode = ({ node }) => {
    const [localLabel, setLocalLabel] = useState(node.label)

    const handleInputChange = e => {
      setLocalLabel(e.target.value) // Update local state
    }

    const handleInputBlur = () => {
      if (localLabel !== node.label) {
        updateNodeLabel(node.key, localLabel) // Update global state on blur
      }
    }

    return (
      <div className="ml-4">
        <div className="flex items-center gap-2 my-2">
          <InputText
            value={localLabel}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Enter node label"
            className="p-inputtext"
          />
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-success p-button-text"
            onClick={() => createNode(node.key)}
            tooltip="Add child node"
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-button-text"
            onClick={() => deleteNode(node.key)}
            tooltip="Delete node"
          />
        </div>
        {node.children && node.children.length > 0 && (
          <div className="ml-4">
            {node.children.map(childNode => (
              <RenderNode key={childNode.key} node={childNode} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Categories end

  // Groups start

  const [categoryNodes, setCategoryNodes] = useState([])
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null)

  // Function to create a new category
  const createCategory = (parentCategoryId = null) => {
    const newCategory = {
      key: Date.now().toString(),
      label: "",
      parentCategoryId,
      children: [],
    }

    if (!parentCategoryId) {
      setCategoryNodes([...categoryNodes, newCategory])
    } else {
      const updateCategories = categoriesList => {
        return categoriesList.map(category => {
          if (category.key === parentCategoryId) {
            return {
              ...category,
              children: [...(category.children || []), newCategory],
            }
          }
          if (category.children && category.children.length > 0) {
            return {
              ...category,
              children: updateCategories(category.children),
            }
          }
          return category
        })
      }
      setCategoryNodes(updateCategories(categoryNodes))
    }
  }

  // Function to update category label
  const updateCategoryLabel = (id, newLabel) => {
    const updateCategories = categoriesList => {
      return categoriesList.map(category => {
        if (category.key === id) {
          return { ...category, label: newLabel }
        }
        if (category.children && category.children.length > 0) {
          return {
            ...category,
            children: updateCategories(category.children),
          }
        }
        return category
      })
    }
    setCategoryNodes(updateCategories(categoryNodes))
  }

  // Function to delete a category
  const deleteCategory = id => {
    const removeCategory = categoriesList => {
      return categoriesList.filter(category => {
        if (category.key === id) {
          return false
        }
        if (category.children && category.children.length > 0) {
          category.children = removeCategory(category.children)
        }
        return true
      })
    }
    setCategoryNodes(removeCategory(categoryNodes))
  }

  // Recursive component to render the category structure
  const RenderCategory = ({ category }) => {
    const [localCategoryLabel, setLocalCategoryLabel] = useState(category.label)

    const handleInputChange = e => {
      setLocalCategoryLabel(e.target.value) // Update local state
    }

    const handleInputBlur = () => {
      if (localCategoryLabel !== category.label) {
        updateCategoryLabel(category.key, localCategoryLabel) // Update global state on blur
      }
    }

    return (
      <div className="ml-4">
        <div className="flex items-center gap-2 my-2">
          <InputText
            value={localCategoryLabel}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Enter category label"
            className="p-inputtext"
          />
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-success p-button-text"
            onClick={() => createCategory(category.key)}
            tooltip="Add child category"
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-button-text"
            onClick={() => deleteCategory(category.key)}
            tooltip="Delete category"
          />
        </div>
        {category.children && category.children.length > 0 && (
          <div className="ml-4">
            {category.children.map(childCategory => (
              <RenderCategory
                key={childCategory.key}
                category={childCategory}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Group end

  // email signature start
  const [signatures, setSignatures] = useState([
    {
      name: "Default Signature", // Default signature name
      content: `Regards,<br>

<strong>Shatru Naik</strong><br>
Ph: +91-917 711 1156 <br>
Pranathi Software Services
`,
    },
  ])

  const [dialogAction, setDialogAction] = useState("") // "new" or "rename"
  const [signatureName, setSignatureName] = useState("")
  const [selectSign, setSelectSign] = useState("")
  const [signatureOptions, setsignatureOptions] = useState([])
  const [text, setText] = useState("")
  const [isEditedsig, setisEditedsig] = useState(false)

  const handleDeleteSignature = async id => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_Calendar}/api/v1/email-signatures/${id}/`,
        {}
      )
      if (response.status === 200 || response.status === 204) {
        getsignature()
      }
    } catch (error) { }
  }

  // Dropdown options
  // const [signatureOptions, setsignatureOptions] = useState([])
  const getsignature = async (page, size) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Calendar}/api/v1/email-signatures/`,
        {}
      )

      const transformedData = response.data.map(cond => ({
        name: cond.name,
        id: cond.signature_id,
      }))
      setsignatureOptions(transformedData)
    } catch (error) { }
  }

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        {/* Basic Text Formatting */}
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>

        {/* Font Style and Size */}
        <select className="ql-font" aria-label="Font"></select>
        <select className="ql-size" aria-label="Font Size"></select>

        {/* Text and Background Color */}
        <select className="ql-color" aria-label="Text Color"></select>
        <select
          className="ql-background"
          aria-label="Background Color"
        ></select>

        {/* Insert Image and Link */}
        <button className="ql-image" aria-label="Insert Image"></button>
        <button className="ql-link" aria-label="Insert Link"></button>

        {/* Alignment Controls */}
        <select className="ql-align" aria-label="Text Alignment">
          <option value="" label="Left Align"></option>
          <option value="center" label="Center Align"></option>
          <option value="right" label="Right Align"></option>
          <option value="justify" label="Justify Align"></option>
        </select>
      </span>
    )
  }

  const header = renderHeader()

  // Button enable/disable logic
  const isFirstSignatureAdded = signatures.length > 0
  const isSaveEnabled = isEditing

  const handleSelectSignature = async value => {
    setSelectSign(value)

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Calendar}/api/v1/email-templates/${value.id}`
      )
      const templateContent = response.data?.content || ""
      setText(templateContent)
    } catch (error) {
      console.error("Error fetching template details:", error)
      setText("")
    }
  }

  const handleEditorChange = e => {
    setText(e.htmlValue)
    setIsEditing(true)
  }

  // email signature end

  // email Template start

  const renderTemplateHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <select className="ql-font" aria-label="Font"></select>
        <select className="ql-size" aria-label="Font Size"></select>
        <select className="ql-color" aria-label="Text Color"></select>
        <select
          className="ql-background"
          aria-label="Background Color"
        ></select>
        <button className="ql-image" aria-label="Insert Image"></button>
        <button className="ql-link" aria-label="Insert Link"></button>
        {/* Alignment Controls */}
        <select className="ql-align" aria-label="Text Alignment">
          <option value="" label="Left Align"></option>
          <option value="center" label="Center Align"></option>
          <option value="right" label="Right Align"></option>
          <option value="justify" label="Justify Align"></option>
        </select>
      </span>
    )
  }

  const templateHeader = renderTemplateHeader()

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    getValues: getValues1,
    setValue: setValue1,
    trigger: trigger1,
    reset: reset1,
  } = useForm({ mode: "onBlur" })
  const [editIdsig, seteditIdsig] = useState(null)
  const [deleteRowIdsig, setDeleteRowIDsig] = useState(null)

  const [templateOptions, settemplateOptions] = useState([])
  const gettemplate = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Calendar}/api/v1/email-templates/`,
        {}
      )

      const transformedData = response.data.map(cond => ({
        name: cond.name,
        id: cond.template_id,
      }))
      settemplateOptions(transformedData)
    } catch (error) { }
  }
  useEffect(() => {
    getsignature()
    gettemplate()
  }, [])

  const onSubmitsignature = async data => {
    const req = {
      name: signatureName,
    }

    if (!isEditedsig) {
      try {
        var department = await axios.post(
          `${process.env.REACT_APP_Calendar}/api/v1/email-signatures/`,
          req,
          {}
        )
        getsignature()
        setDialogVisible(false)
      } catch (error) { }
    } else {
      try {
        var response = await axios.patch(
          `${process.env.REACT_APP_Calendar}/api/v1/email-signatures/${editIdsig}/`,
          req,
          {}
        )
        setDialogVisible(false)
        getsignature()
      } catch (error) { }
    }
  }

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    getValues: getValues2,
    setValue: setValue2,
    trigger: trigger2,
    reset: reset2,
  } = useForm({ mode: "onBlur" })
  const [newTemplateName, setnewTemplateName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [editIdtem, seteditIdtem] = useState(null)
  const [isEditedtem, setisEditedtem] = useState(false)
  const [isEdited, setisEdited] = useState(false)
  const [texttemplate, settexttemplate] = useState("") // Editor content

  // const handleSelectTemplate = (value) => {
  //   console.log(value)
  //   setSelectedTemplate(value); // Update the selected template in state
  //   settexttemplate(value?.content || "");
  // }

  const handleSelectTemplate = async value => {
    setSelectedTemplate(value)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Calendar}/api/v1/email-templates/${value.id}/`
      )
      const templateContent = response.data?.content || "" // Assume the content is in response.data.content
      settexttemplate(templateContent) // Update the template content in state
      setTemplateContent(response.data.body)
    } catch (error) {
      settexttemplate("") // Clear the content if API call fails
    }
  }

  const onSubmittemplate = async data => {
    const req = {
      name: newTemplateName,
    }

    if (!isEditedtem) {
      try {
        var department = await axios.post(
          `${process.env.REACT_APP_Calendar}/api/v1/email-templates/`,
          req,
          {}
        )
        gettemplate()
        setNewTemplateVisible(false)
      } catch (error) { }
    } else {
      try {
        var response = await axios.patch(
          `${process.env.REACT_APP_Calendar}/api/v1/email-templates/${editIdtem}/`,
          req,
          {}
        )
        setNewTemplateVisible(false)
        gettemplate()
      } catch (error) { }
    }
  }
  const handleSaveTemplate = async id => {
    const req = {
      name: selectedTemplate.name,
      body: templateContent,
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_Calendar}/api/v1/email-templates/${id}/`,
        req
      )
      if (response.status === 200 || response.status === 204) {
        getAllActive()
        setDisplayDialog(false)
        setTemplateContent("")
        setSelectedTemplate("")
      }
    } catch (error) { }
  }
  const handleDeleteTemplate = async id => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_Calendar}/api/v1/email-templates/${id}/`,
        {}
      )
      if (response.status === 200 || response.status === 204) {
        getsignature()
      }
    } catch (error) { }
  }

  // email Template end

  // email template starts

  const [isNewTemplateVisible, setNewTemplateVisible] = useState(false) // For new template dialog
  const [isRenameTemplateVisible, setRenameTemplateVisible] = useState(false) // For rename template dialog
  const [renameTemplateValue, setRenameTemplateValue] = useState("") // Rename value
  // Track selected template name
  const [templates, setTemplates] = useState([
    {
      name: "John", // Default template name
      content: `<strong>Dear [Full name], </strong><br><br>

I hope this email finds you well. My name is [Your Name], and I am [Your Position] at [Company Name]. We recently reviewed your profile and believe your skills 
and experiences align well with the requirements of an exciting position we currently have open: [Job Title].<br>
The Senior Front-End Developer role at Granicus is for developers who lead by example. They regularly take on challenging and complex technical tasks 
and consistently make significant contributions to all areas of the Granicus product suite. In addition to those contributions, 
the Senior Software Engineer is a key contributor when new features are being groomed and planned by their team. Their product and technical 
knowledge are indispensable in this area. <br>
Senior Software Engineers have deep expertise in multiple different technologies and applications and proactively apply their knowledge 
improving the design, interface, and architecture of our products. They fully understand the deployment process and support our applications in all environments. 
They are an excellent mentor to groups and individuals within and outside of the engineering team. 
`, // Default content
    },
  ]) // Template list with a default template
  const [templateContent, setTemplateContent] = useState("") // Editor content
  const [isTemplateEditing, setIsTemplateEditing] = useState(false) // Track editor changes

  // Set default template as selected template when it first loads
  // useEffect(() => {
  //   if (templates.length > 0) {
  //     setSelectedTemplate(templates[0].name);
  //     setTemplateContent(templates[0].content);
  //   }
  // }, []);

  // Dropdown options

  // Handle selecting a template from the dropdown

  // Handle the text editing event in the editor
  const handleTemplateEditorChange = e => {
    setTemplateContent(e.htmlValue)
    setIsTemplateEditing(true)
  }

  // Handle adding a new template

  // Handle deleting a template

  // Button enable/disable logic
  const isAnyTemplateAdded = templates.length > 0
  const isTemplateSaveEnabled = isTemplateEditing

  const [displayDialog, setDisplayDialog] = useState(false)
  const [editId, setEditId] = useState(null)
  const [deleteRowId, setDeleteRowID] = useState(null)

  const closeAddDocumentDialog = () => {
    setDisplayDialog(false)
    setSmShow(false)
    setSuccessAlert(false)
  }

  const onloadrecords = data => {
    setValue("outgoingServer", data.outgoing_server)
    setValue("username", data.username)
    setPassword(data.password)
    setPort(data.port)
    setValue("fromEmail", data.from_email)
    setValue("address", data.reply_to_email)
    setValue("use_ssl_tls", data.UseSSL ? "true" : "false")
  }

  const getAllActive = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Calendar}/api/v1/smtp-accounts/`,
        {}
      )

      if (response.data) {
        setSmtpAccounts(response.data || [])
      } else {
        setSmtpAccounts([])
      }
    } catch (error) { }
  }

  const onSubmit = async data => {
    const req = {
      outgoing_server: data.outgoingServer,
      port: port,
      username: data.username,
      password: password,
      from_email: data.fromEmail,
      reply_to_email: data.address,
      use_ssl_tls: data.UseSSL ? "true" : "false",
    }
    if (!isEdited) {
      try {
        var department = await axios.post(
          `${process.env.REACT_APP_Calendar}/api/v1/smtp-accounts/`,
          req,
          {}
        )
        setDisplayDialog(false)
        getAllActive()
      } catch (error) { }
    } else {
      try {
        var response = await axios.patch(
          `${process.env.REACT_APP_Calendar}/api/v1/smtp-accounts/${editId}/`,
          req,
          {}
        )

        getAllActive()
        setDisplayDialog(false)
      } catch (error) { }
    }
  }
  const [successAlert, setSuccessAlert] = useState(false)
  const [smShow, setSmShow] = useState(false)

  const deleteHandler = async () => {
    let id = deleteRowId
    await axios
      .delete(
        `${process.env.REACT_APP_Calendar}/api/v1/smtp-accounts/${id}/`,
        {}
      )
      .then(resp => {
        getAllActive()
        setSmShow(false)
        setSuccessAlert(true)
      })
      .catch(error => {
        console.log("on submit delete error ", error)
      })
  }

  useEffect(() => {
    getAllActive()
  }, [])

  useEffect(() => {
    getsignature()
    gettemplate()
  }, [])

  // My account start

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  })

  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newPasswordValue, setNewPasswordValue] = useState("123456") // Editable password value
  const [savedPasswordValue, setSavedPasswordValue] = useState("123456") // Stored password
  const [showPasswordInput, setShowPasswordInput] = useState(false) // Toggle visibility

  const [passwordUpdateAlert, setPasswordUpdateAlert] = useState({
    show: false,
    message: "",
    type: "",
  })

  const handlePasswordEditToggle = () => {
    if (isEditingPassword) {
      // Save the new password and mask it again
      setSavedPasswordValue(newPasswordValue)
      setPasswordUpdateAlert({
        show: true,
        message: "Password updated successfully",
        type: "success",
      })
      setShowPasswordInput(false) // Hide password after saving

      // Automatically hide alert after 5 seconds
      setTimeout(() => {
        setPasswordUpdateAlert({ show: false, message: "", type: "" })
      }, 5000)
    } else {
      // Show password when editing starts
      setShowPasswordInput(true)
    }

    setIsEditingPassword(!isEditingPassword)
  }

  const [profileData, setProfileData] = useState({
    name: "Mahesh Kumar Bhoga",
    email: "Mahesh@gmail.com",
    mobile: "9876453210",
    username: "Mahesh",
    role: "Manager",
    developer: "Manager",
    linkedContact: "Manager",
    profilePicture:
      profileImage,
  })

  const PasswordDialog = () => (
    <div className={`password-dialog ${showPasswordDialog ? "" : "hidden"}`}>
      <div className="dialog-content">
        <div className="dialog-header">
          <h3>Change Password</h3>
          <button
            onClick={() => setShowPasswordDialog(false)}
            className="close-btn change-pass"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="Change-password">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="Change-password">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="Change-password">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="update-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  )

  const PhotoDialog = () => (
    <div className={`photo-dialog ${showPhotoDialog ? "" : "hidden"}`}>
      <div className="dialog-content">
        <div className="dialog-header">
          <h3>Update Profile Photo</h3>
          <button
            onClick={() => setShowPhotoDialog(false)}
            className="close-btn"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {profileData.profilePicture && (
            <div className="preview-image-container">
              <img
                src={profileData.profilePicture}
                alt="Preview"
                className="preview-image"
              />
            </div>
          )}
          <div className="drop-zone">
            {/* <div>Drop your image here or</div> */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="choose-file-input"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const handlePasswordChange = e => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const [savedPassword, setSavedPassword] = useState("123456") // Simulating stored password

  const handlePasswordSubmit = e => {
    e.preventDefault()

    // Validate current password
    if (passwordData.currentPassword !== savedPassword) {
      setShowAlert({
        show: true,
        message: "Current password is incorrect",
        type: "error",
      })
      return
    }

    // Validate new password and confirm password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setShowAlert({
        show: true,
        message: "New password and confirm password do not match",
        type: "error",
      })
      return
    }

    // Update the saved password locally
    setSavedPassword(passwordData.newPassword)

    setShowAlert({
      show: true,
      message: "Password updated successfully",
      type: "success",
    })

    setShowPasswordDialog(false)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleImageUpload = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Placeholder functions for backend integration
  const verifyCurrentPassword = async currentPassword => {
    // Replace with actual backend password verification
    // This is a mock implementation
    if (currentPassword !== savedPassword) {
      throw new Error("Incorrect password")
    }
    return Promise.resolve()
  }

  const updatePassword = async newPassword => {
    // Replace with actual backend password update logic
    // This is a mock implementation
    setSavedPassword(newPassword)
    return Promise.resolve()
  }

  // for edit user drop down 

  const userActionMenu = useRef(null)
const getUserActions = (rowData, rowIndex) => [
  {
    label: "Edit",
    icon: "pi pi-pencil",
    command: () => handleEditUser(rowData, rowIndex),
  },
  rowData.status === "Active"
    ? {
        label: "Archive",
        icon: "pi pi-folder",
        command: () => {
          setUserList(prev =>
            prev.map(u =>
              u.username === rowData.username
                ? { ...u, status: "Archived" }
                : u
            )
          )
        },
      }
    : rowData.status === "Archived"
    ? {
        label: "Activate",
        icon: "pi pi-check",
        command: () => {
          setUserList(prev =>
            prev.map(u =>
              u.username === rowData.username
                ? { ...u, status: "Active" }
                : u
            )
          )
        },
      }
    : null,
  {
    label: "Change Permissions",
    icon: "pi pi-cog",
    command: () => setShowPermissionsDialog(true),
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
    command: () => handleDeleteUser(rowIndex),
    className: "p-menuitem-danger",
  },
].filter(Boolean) 


const [showPermissionsDialog, setShowPermissionsDialog] = useState(false)
const [selectedPermissionTab, setSelectedPermissionTab] = useState(0)

// Example permissions data
const permissionTabs = [
  { label: "General", permissions: [
    { 
      label: "Manager User Accounts (Admin)", 
      description: "If checked, this user can create, modify and delete users and can manager all user permissions/privileges."
    },
    {
      label: "Run Reports",
      description: "If checked, this user can run reports."
    },
    {
      label: "Run Dashboard",
      description: "If checked, this user can view Dashboard."
    },

    {
      label: "Allow Sending Emails",
      description: "If checked, this user can send emails from PMS."
    },

    {
      label: "Disallow Sending an EMail to more than 10 Recipients",
      description: "If checked, it will not allow this user to send email to more than 10 recipients."
    },
     {
      label: "Allow Alert Setup",
      description: "If checked, this user can setup Alerts (Notifications) for any activity that occurs."
    },
    {
      label: "Disallow Save Password",
      description: "If checked, it prevents the user from saving password on login screen."
    },
    {
      label: "Enable Session Timeout",
      description: "If checked, this user session will be timed out for 60 minutes of inactivity"
    },
    {
      label: "Cannot See Other Teams' Users",
      description: "If checked, this user will not be able to see other team users"
    },

    {
      label: "Export Reports",
      description: "If checked, this user will be able to export reports to PDF/Excel/CSV"
    },
    {
      label: "Export Data of All Tables(entities) ",
      description: "If checked, this user can export all the items."
    },
    
    

  ]},


 {
  label: "Projects",
  permissions: [
    { 
      label: "Modify Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can modify all Project Items for all users." },
        { label: "Self", description: "This user can modify Project items belonging to his userid." },
        { label: "None", description: "This user cannot modify any Project Items." },
        { label: "Users", description: "This user can modify Project items of only selected users." }
      ]
    },
    {
      label: "Delete Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can delete all Project Items for all users." },
        { label: "Self", description: "This user can delete Project items belonging to his userid." },
        { label: "None", description: "This user cannot delete any of the Project items." },
        { label: "Users", description: "This user can delete Project items of only selected users." }
      ]
    },
    {
      label: "Mark as Private When a New Item is Created",
      description: "If checked, it will create a private Project Item automatically for this user whenever a new Project Item is created."
    },
    {
      label: "These Users Can See My Private Items", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "Everybody can see this user’s private Project Items." },
        { label: "None", description: "Nobody can see this user’s private Project Items." },
        { label: "Users", description: "Only selected users can see this user’s private Project Items." }
      ]
    },
    {
      label: "Can See Other Users Private Items",
      description: "If checked, this user can see other users private Project Items."
    },
    {
      label: "Allow Changing UserID of Other Users Items",
      description: "If checked, this user can modify the userIds of Project Item, i.e. ability to change to a different userid or add additional userids."
    },
    {
      label: "View Dynamic Views of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can view Project items belonging to other users." },
        { label: "Self", description: "This user can view Project items belonging to his userid." },
        { label: "None", description: "This user cannot view any Project items." },
        { label: "Users", description: "Only selected user's items views by this user." }
      ]
    },
    {
      label: "Export PDF/ MS Excel (Item)",
      description: "If checked, this user can export Project list views to PDF/Excel spreadsheets."
    },
    {
      label: "Disallow Creating Multiple Items (Bulk Import)",
      description: "If checked, this user cannot import multiple items using 'import' feature."
    },
    {
      label: "Allow Merge Duplicates",
      description: "If checked, this user can merge duplicate Project records."
    },
  ]
},

{
  label: "Work Type",
  permissions: [
    { 
      label: "Modify Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can modify all Work Type Items for all users." },
        { label: "Self", description: "This user can modify Work Type items belonging to his userid." },
        { label: "None", description: "This user cannot modify any Work Type Items." },
        { label: "Users", description: "This user can modify Work Type items of only selected users." }
      ]
    },
    {
      label: "Delete Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can delete all Work Type Items for all users." },
        { label: "Self", description: "This user can delete Work Type items belonging to his userid." },
        { label: "None", description: "This user cannot delete any of the Work Type items." },
        { label: "Users", description: "This user can delete Work Type items of only selected users." }
      ]
    },
    {
      label: "Mark as Private When a New Item is Created",
      description: "If checked, it will create a private Work Type Item automatically for this user whenever a new Work Type Item is created."
    },
    {
      label: "These Users Can See My Private Items", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "Everybody can see this user’s private Work Type Items." },
        { label: "None", description: "Nobody can see this user’s private Work Type Items." },
        { label: "Users", description: "Only selected users can see this user’s private Work Type Items." }
      ]
    },
    {
      label: "Can See Other Users Private Items",
      description: "If checked, this user can see other users private Work Type Items."
    },
    {
      label: "Allow Changing UserID of Other Users Items",
      description: "If checked, this user can modify the userIds of Work Type Item, i.e. ability to change to a different userid or add additional userids."
    },
    {
      label: "View Dynamic Views of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can view Work Type items belonging to other users." },
        { label: "Self", description: "This user can view Work Type items belonging to his userid." },
        { label: "None", description: "This user cannot view any Work Type items." },
        { label: "Users", description: "Only selected user's items views by this user." }
      ]
    },
    {
      label: "Export PDF/ MS Excel (Item)",
      description: "If checked, this user can export Work Type list views to PDF/Excel spreadsheets."
    },
    {
      label: "Disallow Creating Multiple Items (Bulk Import)",
      description: "If checked, this user cannot import multiple items using 'import' feature."
    },
    {
      label: "Allow Merge Duplicates",
      description: "If checked, this user can merge duplicate Work Type records."
    },
  ]
}
,


  { label: "Companies", permissions: [
    { 
      label: "Modify Items of", 
      
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can modify all Company Items for all users." },
        { label: "Self", description: "This user can modify Company items belonging to his userid." },
        { label: "None", description: "This user cannot modify any Company Items." },
        { label: "Users", description: "This user can modify Company items of only selected users." }
      ]
    },
    {
      label: "Delete Items of", 
      
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can delete all companies Items for all users." },
        { label: "Self", description: "This user can delete companies items belonging to his userid." },
        { label: "None", description: "This user cannot delete any of the companies items." },
        { label: "Users", description: "This user can delete companies items of only selected users." }
      ]
    },
    {
      label: "Mark as Private When a New Item is Created",
      description: "If checked, it will create a private company Items automatically for this user whenever a new company Item is created."
    },
    
    {
      label: "These Users Can See My Private Items", 
      
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "Everybody can see this user’s private company Items." },
        // { label: "Self", description: "This user can delete companies items belonging to his userid." },
        { label: "None", description: "Nobody can see this user’s private company Items." },
        { label: "Users", description: "Only selected users can see this user’s private company Items." }
      ]
    },
    
    {
      label: "Can See Other Users Private Items",
      description: "If checked, this user can see other users private company Items."
    },
    {
      label: "Allow Changing UserID of Other Users Items",
      description: "If checked, this user can modify the userIds of company Item, i.e. ability to change to a different userid or add additional userids."
    },

     {
      label: "View Dynamic Views of", 
      
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can view company ietsms belonging to other users." },
        { label: "Self", description: "This user can view company ietsms belonging to his userid." },
        { label: "None", description: "This user cannot view any company items." },
        { label: "Users", description: "Only selected user's items views by this user." }
      ]
    },
    {
      label: "Export PDF/ MS Excel (Item)",
      description: "If checked, this user can export companies list views to PDF/Excel spreadsheets."
    },
    {
      label: "Disallow Creating Multiple Items (Bulk Import)",
      description: "If checked, this user cannot import multiple items using 'import' feature."
    },
    {
      label: "Allow Merge Duplicates",
      description: "If checked, this user can merge duplicate company records."
    },
  ]},

  {
  label: "Contacts",
  permissions: [
    { 
      label: "Modify Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can modify all Contact Items for all users." },
        { label: "Self", description: "This user can modify Contact items belonging to his userid." },
        { label: "None", description: "This user cannot modify any Contact Items." },
        { label: "Users", description: "This user can modify Contact items of only selected users." }
      ]
    },
    {
      label: "Delete Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can delete all Contact Items for all users." },
        { label: "Self", description: "This user can delete Contact items belonging to his userid." },
        { label: "None", description: "This user cannot delete any of the Contact items." },
        { label: "Users", description: "This user can delete Contact items of only selected users." }
      ]
    },
    {
      label: "Mark as Private When a New Item is Created",
      description: "If checked, it will create a private Contact Item automatically for this user whenever a new Contact Item is created."
    },
    {
      label: "These Users Can See My Private Items", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "Everybody can see this user’s private Contact Items." },
        { label: "None", description: "Nobody can see this user’s private Contact Items." },
        { label: "Users", description: "Only selected users can see this user’s private Contact Items." }
      ]
    },
    {
      label: "Can See Other Users Private Items",
      description: "If checked, this user can see other users private Contact Items."
    },
    {
      label: "Allow Changing UserID of Other Users Items",
      description: "If checked, this user can modify the userIds of Contact Item, i.e. ability to change to a different userid or add additional userids."
    },
    {
      label: "View Dynamic Views of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can view Contact items belonging to other users." },
        { label: "Self", description: "This user can view Contact items belonging to his userid." },
        { label: "None", description: "This user cannot view any Contact items." },
        { label: "Users", description: "Only selected user's items views by this user." }
      ]
    },
    {
      label: "Export PDF/ MS Excel (Item)",
      description: "If checked, this user can export Contact list views to PDF/Excel spreadsheets."
    },
    {
      label: "Disallow Creating Multiple Items (Bulk Import)",
      description: "If checked, this user cannot import multiple items using 'import' feature."
    },
    {
      label: "Allow Merge Duplicates",
      description: "If checked, this user can merge duplicate Contact records."
    },
  ]
},

  {
  label: "Employee",
  permissions: [
    { 
      label: "Modify Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can modify all Employee Items for all users." },
        { label: "Self", description: "This user can modify Employee items belonging to his userid." },
        { label: "None", description: "This user cannot modify any Employee Items." },
        { label: "Users", description: "This user can modify Employee items of only selected users." }
      ]
    },
    {
      label: "Delete Items of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can delete all Employee Items for all users." },
        { label: "Self", description: "This user can delete Employee items belonging to his userid." },
        { label: "None", description: "This user cannot delete any of the Employee items." },
        { label: "Users", description: "This user can delete Employee items of only selected users." }
      ]
    },
    {
      label: "Mark as Private When a New Item is Created",
      description: "If checked, it will create a private Employee Item automatically for this user whenever a new Employee Item is created."
    },
    {
      label: "These Users Can See My Private Items", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "Everybody can see this user’s private Employee Items." },
        { label: "None", description: "Nobody can see this user’s private Employee Items." },
        { label: "Users", description: "Only selected users can see this user’s private Employee Items." }
      ]
    },
    {
      label: "Can See Other Users Private Items",
      description: "If checked, this user can see other users private Employee Items."
    },
    {
      label: "Allow Changing UserID of Other Users Items",
      description: "If checked, this user can modify the userIds of Employee Item, i.e. ability to change to a different userid or add additional userids."
    },
    {
      label: "View Dynamic Views of", 
      isToggleGroup: true,
      toggleOptions: [
        { label: "All", description: "This user can view Employee items belonging to other users." },
        { label: "Self", description: "This user can view Employee items belonging to his userid." },
        { label: "None", description: "This user cannot view any Employee items." },
        { label: "Users", description: "Only selected user's items views by this user." }
      ]
    },
    {
      label: "Export PDF/ MS Excel (Item)",
      description: "If checked, this user can export Employee list views to PDF/Excel spreadsheets."
    },
    {
      label: "Disallow Creating Multiple Items (Bulk Import)",
      description: "If checked, this user cannot import multiple items using 'import' feature."
    },
    {
      label: "Allow Merge Duplicates",
      description: "If checked, this user can merge duplicate Employee records."
    },
  ]
},


  { label: "Projects",  permissions: [
    { 
      label: "Manager User Accounts (Admin)", 
      description: "If checked, this user can create, modify and delete users and can manager all user permissions/privileges."
    },
    {
      label: "Export Data of All",
      description: "If checked, this user can export all the items of the other users except his userid."
    },
    {
      label: "Sync. with Outlook",
      description: "If checked, this user can sync data (Emails, Calendar) between PMS and Outlook."
    },
    {
      label: "Run Reports",
      description: "If checked, this user can run reports.  "
    },
    {
      label: "Run Dashboard",
      description: "If checked, this user can run the dashboard."
    },
    {
      label: "Allow Sending Emails",
      description: "If checked, this user can send emails from PMS."
    },
    {
      label: "Disallow Sending e-Mail to more than 10 Recipients",
      description: "If checked, it will not allow this user to send email to more than 10 recipients."
    },
    {
      label: "Allow Alert Setup",
      description: "If checked, this user can set up alerts."
    },
    {
      label: "Disallow Save Password",
      description: "If checked, this user cannot save passwords."
    },
    {
      label: "Enable Session Timeout",
      description: "If checked, this user will have a session timeout."
    },
    {
      label: "Cannot See Other Teams' Users",
      description: "If checked, this user cannot see other teams' users."
    },
    {
      label: "Export Reports",
      description: "If checked, this user can export reports."
    },

  ]},

    { label: "General", permissions: [
    { 
      label: "Manager User Accounts (Admin)", 
      description: "If checked, this user can create, modify and delete users and can manager all user permissions/privileges."
    },
    {
      label: "Export Data of All",
      description: "If checked, this user can export all the items of the other users except his userid."
    },
    {
      label: "Sync. with Outlook",
      description: "If checked, this user can sync data (Emails, Calendar) between PMS and Outlook."
    },
    {
      label: "Run Reports",
      description: "If checked, this user can run reports.  "
    },
    {
      label: "Run Dashboard",
      description: "If checked, this user can run the dashboard."
    },
    {
      label: "Allow Sending Emails",
      description: "If checked, this user can send emails from PMS."
    },
    {
      label: "Disallow Sending e-Mail to more than 10 Recipients",
      description: "If checked, it will not allow this user to send email to more than 10 recipients."
    },
    {
      label: "Allow Alert Setup",
      description: "If checked, this user can set up alerts."
    },
    {
      label: "Disallow Save Password",
      description: "If checked, this user cannot save passwords."
    },
    {
      label: "Enable Session Timeout",
      description: "If checked, this user will have a session timeout."
    },
    {
      label: "Cannot See Other Teams' Users",
      description: "If checked, this user cannot see other teams' users."
    },
    {
      label: "Export Reports",
      description: "If checked, this user can export reports."
    },

  ]},
  
]

// Example checked state (you can make this dynamic per user)
const [checkedPermissions, setCheckedPermissions] = useState({})
const [toggleSelections, setToggleSelections] = useState({}) // For exclusive toggles

const handlePermissionChange = (tabIdx, permIdx) => {
  const key = `${tabIdx}-${permIdx}`
  setCheckedPermissions(prev => ({
    ...prev,
    [key]: !prev[key]
  }))
}

const handleToggleChange = (tabIdx, permIdx, toggleIdx) => {
  const key = `${tabIdx}-${permIdx}`
  setToggleSelections(prev => ({
    ...prev,
    [key]: toggleIdx
  }))
}

  return (
    <React.Fragment>
      <Container fluid={true}>
        <div className="admin-dash lookup">
          <TabView
            activeIndex={currentTab}
            onTabChange={e => setCurrentTab(e.index)}
          >
            <TabPanel header="User Management" leftIcon="pi pi-lock mr-2">
              <div className="container-fluid mt-3 ps-3">
                <div className="usermanagement-main">
                  {/* <div className="breadcrumb d-flex justify-content-between">
                  <BreadCrumb model={breadUsermanagement} />

                  <button
                    className="p-button p-component mb-3"
                    onClick={() => setSelectedOption(null)}
                  >
                    <i className="pi pi-arrow-left me-2"></i> Back
                  </button>
                </div> */}

                  <TabView className="usermanagement-tab">

                    {/* User tab start */}


                    <TabPanel header="Users">
                      {/* start user management */}

                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h3 className="heading-sz">User</h3>

                          {/* Add User Button */}
                          <div className="mb-3">
                            <Button
                              label="Add User"
                              icon="pi pi-user"
                              className="p-button-primary"
                              onClick={() => setFormVisible(true)}
                            />
                          </div>
                        </div>

                        {/* Form Section (Visible only when formVisible is true) */}
                        {formVisible && (
                          <div className="mb-3 p-3 border rounded">
                            {/* <h4>{isEditMode ? "Edit User" : "Add User"}</h4> */}
                            <div className="field mb-2">
                              <label htmlFor="username">Username</label>
                              <InputText
                                id="username"
                                className="w-full"
                                value={formData.username}
                                placeholder="Username"
                                onChange={e =>
                                  setFormData({
                                    ...formData,
                                    username: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="field mb-2">
                              <label htmlFor="password">Password</label>
                              <InputText
                                id="password"
                                className="w-full"
                                value={formData.password}
                                placeholder="Password"
                                onChange={e =>
                                  setFormData({
                                    ...formData,
                                    password: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="field mb-2">
                              <label htmlFor="email">Email</label>
                              <InputText
                                id="email"
                                className="w-full"
                                value={formData.email}
                                placeholder="Email"
                                onChange={e =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="field mb-2">
                              <label htmlFor="role">Role</label>
                              <Dropdown
                                id="role"
                                className="w-full bgclr"
                                value={formData.role}
                                options={roleOptions}
                                placeholder="Role"
                                onChange={e =>
                                  setFormData({ ...formData, role: e.value })
                                }
                                optionLabel="label"
                                optionValue="value"
                              />
                            </div>
                            {/* <div className="field mb-2">
                              <label htmlFor="status">Link a contact</label>
                              <Dropdown
                                id="status"
                                className="w-full"
                                value={formData.status}
                                options={statusOptions}
                                placeholder="Link a contact"
                                onChange={e =>
                                  setFormData({ ...formData, status: e.value })
                                }
                                optionLabel="label"
                                optionValue="value"
                                
                              />
                            </div> */}

                            <div className="field mb-2">
                              {/* <label htmlFor="status">Link a Employee</label> */}
                              {/* <Dropdown
                                id="status"
                                className="w-full bgclr"
                                value={formData.status}
                                options={statusOptions}
                                placeholder="Link a contact"
                                onChange={e =>
                                  setFormData({ ...formData, status: e.value })
                                }
                                optionLabel="label"
                                optionValue="value"
                                filter 
                                filterBy="label" 
                              /> */}

                              <LinkEmployessPopup />
                            </div>

                             {/* <div className="field mb-2">
                              <label htmlFor="status">Link a Employee</label>
                              <Dropdown
                                id="status"
                                className="w-full bgclr"
                                value={formData.status}
                                options={statusOptions}
                                placeholder="Link a Employee"
                                onChange={e =>
                                  setFormData({ ...formData, status: e.value })
                                }
                                optionLabel="label"
                                optionValue="value"
                                filter 
                                filterBy="label" 
                              />
                              
                            </div> */}

                            {/* <div className="field mb-2">
                            <label htmlFor="createDate">Create Date</label>
                            <InputText
                              id="createDate"
                              className="w-full"
                              value={formData.createDate}
                              disabled
                            />
                          </div> */}

                            <div className="d-flex justify-content-start mt-4">
                              <Button
                                label={isEditMode ? "Update" : "Save"}
                                icon="pi pi-save"
                                className="p-button-primary me-2"
                                onClick={handleFormSubmit}
                              />
                              <Button
                                label="Cancel"
                                icon="pi pi-times"
                                className="p-button-danger"
                                onClick={resetForm} // Cancel action will reset and hide the form
                              />
                            </div>
                          </div>
                        )}

                        {/* DataTable Section */}

                        <div className="datatable-size">
                          <DataTable value={userList} responsiveLayout="scroll">
                            <Column field="username" header="Username" />
                            <Column field="email" header="Email" />
                            <Column field="role" header="Role" />
                            <Column field="status" header="Status" />
                            <Column field="createDate" header="Create Date" />

                            {/* Actions Column for Edit and Delete */}
                            <Column
                              style={{ width: "5%" }}
                              body={(rowData, { rowIndex }) => (
                                  <div className="d-flex">
                                    <Button
                                      icon="pi pi-ellipsis-v"
                                      className="p-button-text p-button-sm me-2"
                                      onClick={e => actionMenu.current.toggle(e)}
                                      aria-haspopup
                                      aria-controls="actions_menu"
                                    />
                                    <Menu
                                      model={getUserActions(rowData, rowIndex)}
                                      popup
                                      ref={actionMenu}
                                      id="actions_menu"
                                    />
                                  </div>
                                )}
                              header="Actions"
                            />
                          </DataTable>
                        </div>
                      </div>


                   <Dialog
  header="Permissions - Admin"
  visible={showPermissionsDialog}
  style={{ width: '70vw', height: '75vh' }}
  onHide={() => setShowPermissionsDialog(false)}
  footer={
    <div>
      <Button label="Ok" icon="pi pi-check" onClick={() => setShowPermissionsDialog(false)} className="p-button-success me-2" />
      <Button label="Cancel" icon="pi pi-times" onClick={() => setShowPermissionsDialog(false)} className="p-button-success" />
    </div>
  }
>
  <div className="d-flex">
    {/* Left sidebar with tabs and headings */}
    <div style={{ minWidth: 200, borderRight: '1px solid #eee' }}>

        {/* Main Group */}
<div className="permission-group">
  <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>General Settings</h5>
  <div
    style={{
      padding: '10px 16px',
      cursor: 'pointer',
      background: 0 === selectedPermissionTab ? '#e9ecef' : 'transparent',
      fontWeight: 0 === selectedPermissionTab ? 'bold' : 'normal'
    }}
    onClick={() => setSelectedPermissionTab(0)}
  >
    General
  </div>
</div>




      {/* Project Management Group */}
      <div className="permission-group">
        <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Project Management</h5>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 1 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 1 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(1)}
        >
          Projects
        </div>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 2 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 2 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(2)}
        >
          WorkType
        </div>
      </div>
      
      {/* Customer Management Group */}
      <div className="permission-group">
        <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>Customer Management</h5>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 3 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 3 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(3)}
        >
          Companies
        </div>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 4 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 4 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(4)}
        >
          Contacts
        </div>
      </div>
      
      {/* Team Management Group */}
      <div className="permission-group">
        <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>Team Management</h5>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 5 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 5 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(5)}
        >
          Employee
        </div>
      </div>

     

      
      
    
    </div>

    {/* Right content area for permissions */}
   <div className="p-3" style={{ flex: 1 }}>
  <h4>{permissionTabs[selectedPermissionTab]?.label || "General"} Permissions</h4>
  <div className="permission-list">
  <div className="row">
    {permissionTabs[selectedPermissionTab]?.permissions?.map((permission, i) => (
      <div key={i} className="col-md-12 mb-2 pe-0">
        <div className="d-flex" style={{ 
          border: '1px solid #eee',
          backgroundColor: '#fff',
          borderRadius: '6px',
          fontSize: '15px',
          color: '#6C757D',
          padding: '10px',
          height: '100%',
          borderLeft: '1px solid #eee',
        }}>
          {permission.isToggleGroup ? (
            // Special handling for toggle groups
            <div style={{ width: "100%" }}>
              <div className="row align-items-center">
                <div className="col-3 pt-0 pb-0">
                  <label 
                    className={`d-block font-weight-bold permission-label-${selectedPermissionTab}-${i}`}
                    style={{
                      fontWeight: '500', 
                      color: '#212529',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'help'
                    }}
                  >
                    {permission.label}
                  </label>
                  <Tooltip 
                    target={`.permission-label-${selectedPermissionTab}-${i}`} 
                    content={permission.label}
                    position="top"
                  />
                </div>
                <div className="col-9 pt-0 pb-0">
                  <div className="toggle-options">
                    <div className="row">
                      {permission.toggleOptions?.map((toggle, toggleIdx) => (
                        <div key={toggleIdx} className="col-3 pt-0 pb-0">
                          <div className="" style={{ 
                            // border: '1px solid rgb(238, 238, 238)', 
                            // borderRadius: '6px', 
                            // padding: '6px 8px', 
                            // backgroundColor: 'rgb(255, 255, 255)',
                            // minHeight: '20px'
                          }}>
                            <div 
                              className={`d-flex justify-content-between align-items-center toggle-container-${selectedPermissionTab}-${i}-${toggleIdx}`}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex justify-content-center">
                                <Checkbox 
                                  id={`toggle-${selectedPermissionTab}-${i}-${toggleIdx}`}
                                  checked={toggleSelections[`${selectedPermissionTab}-${i}`] === toggleIdx} 
                                  onChange={(e) => handleToggleChange(selectedPermissionTab, i, toggleIdx)} 
                                />
                              </div>
                              <label htmlFor={`toggle-${selectedPermissionTab}-${i}-${toggleIdx}`} className="d-block mt-1 ml-1" style={{fontSize: '15px', fontWeight: '500'}}>
                                {toggle.label}
                              </label>
                              </div>
                            </div>
                            <Tooltip 
                              target={`.toggle-container-${selectedPermissionTab}-${i}-${toggleIdx}`}
                              content={toggle.description}
                              position="top"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Conditional MultiSelect dropdown for "Users" option */}
                    {toggleSelections[`${selectedPermissionTab}-${i}`] === 3 && (
                      <div className="d-flex justify-content-end align-items-center mt-3">
                        <label className="d-block mb-0 me-2" style={{fontSize: '15px', fontWeight: '500', color: '#212529'}}>
                          Select Users
                        </label>
                        <MultiSelect
                          value={privateDrop}
                          onChange={e => setPrivateDrop(e.value)}
                          options={PrivetDropdownValues}
                          optionLabel="name"
                          optionValue="value"
                          placeholder="Select Users"
                          className="w-25"
                          style={{border: '1px solid #ced4da'}}
                          display="comma"
                          maxSelectedLabels={10}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Regular checkbox handling
            <>
              <Checkbox
                id={`perm-${selectedPermissionTab}-${i}`}
                checked={checkedPermissions[`${selectedPermissionTab}-${i}`] || false}
                onChange={() => handlePermissionChange(selectedPermissionTab, i)}
              />
              <div className="d-flex justify-content-between ml-2" style={{ width: "100%", }}>
                <label htmlFor={`perm-${selectedPermissionTab}-${i}`} className="d-block font-weight-bold mb-1" style={{fontWeight: '500', color: '#212529'}}>
                  {typeof permission === 'object' ? permission.label : permission}
                </label>
                <span>
                  <Tooltip target={`.info-icon-${selectedPermissionTab}-${i}`} />
                  <i 
                    className={`pi pi-info-circle info-icon-${selectedPermissionTab}-${i}`} 
                    data-pr-tooltip={typeof permission === 'object' ? permission.description : ''}
                    data-pr-position="left"
                    style={{ cursor: 'pointer' }}
                  ></i>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    )) || <p>No permissions available for this section</p>}
  </div>
</div>
</div>
  </div>
</Dialog>



                      {/* end user management */}
                    </TabPanel>


                    {/* User tab start */}

                    <TabPanel header="Roles and Permissions">
                      {/* Roles start */}

                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h3 className="heading-sz">Roles</h3>

                          {/* Add Role Button */}
                          <div className="mb-3">
                            <Button
                              label="Add Role"
                              icon="pi pi-shield"
                              className="p-button-primary"
                              onClick={() => {
                                setIsFormVisible(true)
                                setUserData({
                                  roleNameField: "",
                                  copyRoleField: "",
                                  creationDateField:
                                    new Date().toLocaleDateString(), // Automatically set today's date
                                })
                              }}
                            />
                          </div>
                        </div>

                        {/* Form Section (Visible only when isFormVisible is true) */}
                        {isFormVisible && (
                          <div className="mb-3 p-3 border rounded">
                            {/* <h4 className="heading-sz">{isEditModeActive ? "Edit Role" : "Add Role"}</h4> */}

                            {/* Role Name Field */}
                            <div className="field mb-2">
                              <label htmlFor="roleNameField">Role Name</label>
                              <InputText
                                id="roleNameField"
                                className="w-full"
                                value={userData.roleNameField}
                                onChange={e =>
                                  setUserData({
                                    ...userData,
                                    roleNameField: e.target.value,
                                  })
                                }
                              />
                            </div>

                            {/* Create Date Field */}
                            <div className="field mb-2">
                              <label htmlFor="createDateField">
                                Create Date
                              </label>
                              <InputText
                                id="createDateField"
                                className="w-full"
                                value={userData.creationDateField}
                                disabled // Make the field read-only
                              />
                            </div>

                            {/* Copy Role Dropdown */}
                            <div className="field mb-2">
                              <label htmlFor="copyRoleField">Copy Role</label>
                            <Dropdown
                                  id="copyRoleField"
                                className="w-full bgclr"
                                value={userData.copyRoleField}
                                options={[
                                  { label: "Manager", value: "Manager" },
                                  { label: "User", value: "User" },
                                  { label: "Admin", value: "Admin" }
                                ]}
                                onChange={e =>
                                  setUserData({
                                    ...userData,
                                    copyRoleField: e.value,
                                  })
                                }
                                placeholder="Select a role to copy"
                              />
                            </div>

                            {/* Permissions Section */}
                            <div className="mb-3">
                              <h5 className="heading-sz mt-4">
                                Module Permissions
                              </h5>


                               <div className="d-flex mt-2" style={{border: '1px solid #eee', padding: '10px', borderRadius: '6px'}}>
    {/* Left sidebar with tabs and headings */}
    <div style={{ minWidth: 200, borderRight: '1px solid #eee' }}>

        {/* Main Group */}
<div className="permission-group">
  <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>General Settings</h5>
  <div
    style={{
      padding: '10px 16px',
      cursor: 'pointer',
      background: 0 === selectedPermissionTab ? '#e9ecef' : 'transparent',
      fontWeight: 0 === selectedPermissionTab ? 'bold' : 'normal'
    }}
    onClick={() => setSelectedPermissionTab(0)}
  >
    General
  </div>
</div>




      {/* Project Management Group */}
      <div className="permission-group">
        <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Project Management</h5>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 1 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 1 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(1)}
        >
          Projects
        </div>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 2 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 2 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(2)}
        >
          WorkType
        </div>
      </div>
      
      {/* Customer Management Group */}
      <div className="permission-group">
        <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>Customer Management</h5>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 3 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 3 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(3)}
        >
          Companies
        </div>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 4 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 4 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(4)}
        >
          Contacts
        </div>
      </div>
      
      {/* Team Management Group */}
      <div className="permission-group">
        <h5 style={{ padding: '8px 16px', margin: '0', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>Team Management</h5>
        <div
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: 5 === selectedPermissionTab ? '#e9ecef' : 'transparent',
            fontWeight: 5 === selectedPermissionTab ? 'bold' : 'normal'
          }}
          onClick={() => setSelectedPermissionTab(5)}
        >
          Employee
        </div>
      </div>

     

      
      
    
    </div>

    {/* Right content area for permissions */}
   <div className="p-3" style={{ flex: 1 }}>
  <h4>{permissionTabs[selectedPermissionTab]?.label || "General"} Permissions</h4>
  <div className="permission-list">
  <div className="row">
    {permissionTabs[selectedPermissionTab]?.permissions?.map((permission, i) => (
      <div key={i} className="col-md-12 mb-2 pe-0">
        <div className="d-flex" style={{ 
          border: '1px solid #eee',
          backgroundColor: '#fff',
          borderRadius: '6px',
          fontSize: '15px',
          color: '#6C757D',
          padding: '10px',
          height: '100%',
          borderLeft: '1px solid #eee',
        }}>
          {permission.isToggleGroup ? (
            // Special handling for toggle groups
            <div style={{ width: "100%" }}>
              <div className="row align-items-center">
                <div className="col-3 pt-0 pb-0">
                  <label 
                    className={`d-block font-weight-bold permission-label-${selectedPermissionTab}-${i}`}
                    style={{
                      fontWeight: '500', 
                      color: '#212529',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'help'
                    }}
                  >
                    {permission.label}
                  </label>
                  <Tooltip 
                    target={`.permission-label-${selectedPermissionTab}-${i}`} 
                    content={permission.label}
                    position="top"
                  />
                </div>
                <div className="col-9 pt-0 pb-0">
                  <div className="toggle-options">
                    <div className="row">
                      {permission.toggleOptions?.map((toggle, toggleIdx) => (
                        <div key={toggleIdx} className="col-3 pt-0 pb-0">
                          <div className="" style={{ 
                            // border: '1px solid rgb(238, 238, 238)', 
                            // borderRadius: '6px', 
                            // padding: '6px 8px', 
                            // backgroundColor: 'rgb(255, 255, 255)',
                            // minHeight: '20px'
                          }}>
                            <div 
                              className={`d-flex justify-content-between align-items-center toggle-container-${selectedPermissionTab}-${i}-${toggleIdx}`}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex justify-content-center">
                                <Checkbox 
                                  id={`toggle-${selectedPermissionTab}-${i}-${toggleIdx}`}
                                  checked={toggleSelections[`${selectedPermissionTab}-${i}`] === toggleIdx} 
                                  onChange={(e) => handleToggleChange(selectedPermissionTab, i, toggleIdx)} 
                                />
                              </div>
                              <label htmlFor={`toggle-${selectedPermissionTab}-${i}-${toggleIdx}`} className="d-block mt-1 ml-1" style={{fontSize: '15px', fontWeight: '500'}}>
                                {toggle.label}
                              </label>
                              </div>
                            </div>
                            <Tooltip 
                              target={`.toggle-container-${selectedPermissionTab}-${i}-${toggleIdx}`}
                              content={toggle.description}
                              position="top"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Conditional MultiSelect dropdown for "Users" option */}
                    {toggleSelections[`${selectedPermissionTab}-${i}`] === 3 && (
                      <div className="d-flex justify-content-end align-items-center mt-3">
                        <label className="d-block mb-0 me-2" style={{fontSize: '15px', fontWeight: '500', color: '#212529'}}>
                          Select Users
                        </label>
                        <MultiSelect
                          value={privateDrop}
                          onChange={e => setPrivateDrop(e.value)}
                          options={PrivetDropdownValues}
                          optionLabel="name"
                          optionValue="value"
                          placeholder="Select Users"
                          className="w-25"
                          style={{border: '1px solid #ced4da'}}
                          display="comma"
                          maxSelectedLabels={10}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Regular checkbox handling
            <>
              <Checkbox
                id={`perm-${selectedPermissionTab}-${i}`}
                checked={checkedPermissions[`${selectedPermissionTab}-${i}`] || false}
                onChange={() => handlePermissionChange(selectedPermissionTab, i)}
              />
              <div className="d-flex justify-content-between ml-2" style={{ width: "100%", }}>
                <label htmlFor={`perm-${selectedPermissionTab}-${i}`} className="d-block font-weight-bold mb-1" style={{fontWeight: '500', color: '#212529'}}>
                  {typeof permission === 'object' ? permission.label : permission}
                </label>
                <span>
                  <Tooltip target={`.info-icon-${selectedPermissionTab}-${i}`} />
                  <i 
                    className={`pi pi-info-circle info-icon-${selectedPermissionTab}-${i}`} 
                    data-pr-tooltip={typeof permission === 'object' ? permission.description : ''}
                    data-pr-position="left"
                    style={{ cursor: 'pointer' }}
                  ></i>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    )) || <p>No permissions available for this section</p>}
  </div>
</div>
</div>
  </div>

                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-start mt-3">
                              <Button
                                label={isEditModeActive ? "Update" : "Save"}
                                icon="pi pi-save"
                                className="p-button-primary me-2"
                                onClick={handleFormSubmission}
                              />
                              <Button
                                label="Cancel"
                                icon="pi pi-times"
                                className="p-button-danger"
                                onClick={resetFormFields} // Cancel action will reset and hide the form
                              />
                            </div>
                          </div>
                        )}

                        {/* DataTable Section */}

                        <div className="datatable-size actjobsumtable">
                          <DataTable
                            value={roleDataList}
                            responsiveLayout="scroll"
                          >
                            <Column field="roleNameField" header="Role Name" />
                            <Column 
                                field="copyRoleField" 
                                header="Copy Role" 
                                body={(rowData) => (
                                  <span>{rowData.copyRoleField || "None"}</span>
                                )}
                              />
                            <Column
                              field="creationDateField"
                              header="Create Date"
                            />

                            {/* Actions Column for Edit and Delete */}
                            <Column
  style={{ width: "5%" }}
  body={(rowData, { rowIndex }) => (
    <div className="d-flex">
      <Button
        icon="pi pi-ellipsis-v"
        className="p-button-text p-button-sm me-2"
        onClick={(e) => roleActionMenu.current.toggle(e)}
        aria-haspopup
        aria-controls="role_actions_menu"
      />
      <Menu
        model={[
          {
            label: "Edit",
            icon: "pi pi-pencil",
            command: () => handleEditRole(rowData, rowIndex)
          },
          {
            label: "Delete",
            icon: "pi pi-trash",
            className: "p-menuitem-danger",
            command: () => handleDeleteRole(rowIndex)
          }
        ]}
        popup
        ref={roleActionMenu}
        id="role_actions_menu"
      />
    </div>
  )}
  header="Actions"
/>
                          </DataTable>
                        </div>
                      </div>

                      {/* Roles start */}
                    </TabPanel>

                    <TabPanel header="User Groups">
                      {/* Group users start */}

                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h3 className="heading-sz">User Groups</h3>
                          <Button
                            label="Add Group"
                            icon="pi pi-users"
                            className="p-button-primary"
                            onClick={() => setIsGroupFormVisible(true)}
                          />
                        </div>

                        {isGroupFormVisible && (
                          <div className="p-3 border rounded mt-3">
                            {/* <h4>{groupData.groupName ? "Edit Group" : "Add Group"}</h4> */}

                            {/* Group Name */}
                            <div className="field mb-2">
                              <label htmlFor="groupName">Group Name</label>
                              <InputText
                                id="groupName"
                                className="w-full"
                                value={groupData.groupName}
                                onChange={e =>
                                  setGroupData({
                                    ...groupData,
                                    groupName: e.target.value,
                                  })
                                }
                              />
                            </div>

                            {/* Description */}
                            <div className="field mb-2">
                              <label htmlFor="description">Description</label>
                              <InputText
                                id="description"
                                className="w-full"
                                value={groupData.description}
                                onChange={e =>
                                  setGroupData({
                                    ...groupData,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>

                            {/* Multi-Select Dropdown */}
                            <div className="field mb-2">
                              <label htmlFor="multiSelect">
                                Select Options
                              </label>
                              <MultiSelect
                                style={{
                                  border: "1px solid #ced4da",
                                  borderRadius: "5px",
                                }}
                                id="multiSelect"
                                className="w-full"
                                value={groupData.selectedOptions}
                                options={availableOptions}
                                onChange={e =>
                                  setGroupData({
                                    ...groupData,
                                    selectedOptions: e.value,
                                  })
                                }
                                placeholder="Choose options"
                                display="comma" 
                              />
                            </div>

                            <div className="d-flex justify-content-end mt-3">
                              <Button
                                label="Save"
                                icon="pi pi-check"
                                className="p-button-primary me-2"
                                onClick={handleSaveGroup}
                              />
                              <Button
                                label="Cancel"
                                icon="pi pi-times"
                                className="p-button-danger"
                                onClick={handleCancelGroup}
                              />
                            </div>
                          </div>
                        )}

                        {/* DataTable Section */}

                        <div className="datatable-size">
                          <DataTable
                            value={groupList}
                            responsiveLayout="scroll"
                            className="mt-3"
                          >
                            <Column field="groupName" header="Group Name" />
                            <Column field="description" header="Description" />
                            <Column
                              field="selectedOptions"
                              header="Selected Options"
                              body={rowData =>
                                rowData.selectedOptions.join(", ")
                              }
                            />
                            <Column field="dateCreated" header="Date Created" />
                            <Column
                              style={{ width: "10rem" }}
                              body={(rowData, { rowIndex }) => (
                                <div>
                                  <Button
                                    icon="pi pi-pencil"
                                    className="p-button-text p-button-sm me-2"
                                    onClick={() =>
                                      handleEditGroup(rowData, rowIndex)
                                    }
                                  />
                                  <Button
                                    icon="pi pi-trash"
                                    className="p-button-text p-button-sm p-button-danger"
                                    onClick={() => handleDeleteGroup(rowIndex)}
                                  />
                                </div>
                              )}
                              header="Actions"
                            />
                          </DataTable>
                        </div>
                      </div>

                      {/* Group users end */}
                    </TabPanel>
                  </TabView>
                </div>
              </div>
            </TabPanel>

            {/* setting section start */}

            <TabPanel header="Settings" leftIcon="pi pi-cog mr-2">
              <div className="container-fluid mt-3">
                {/* Conditional Rendering */}
                {!selectedOption && (
                  <Row>
                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("general")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-info-circle mr-2"></i>General
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("email-settings")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-envelope mr-2"></i>Email Settings
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("sms-settings")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-comment mr-2"></i>SMS Settings
                      </div>
                    </Col>

                    {/* Email signature start */}

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("email-signature")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-envelope mr-2"></i>Email Signature
                      </div>
                    </Col>

                    {/* Email signature end */}

                    {/* Email Template start */}

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("email-template")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-file mr-2"></i>Email Template
                      </div>
                    </Col>

                    {/* Email Template end */}

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() =>
                          setSelectedOption("user-activity-alerts")
                        }
                      >
                        <i className="pi pi-bell mr-2"></i>User Activity Alerts
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("database-alerts")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-database mr-2"></i>Alerts
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("reports-alerts")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-chart-bar mr-2"></i>Reports Alerts
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("crons")}
                      >
                        <i className="pi pi-clock mr-2"></i>Crons / Triggers
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("workflow")}
                      >
                        <i className="pi pi-sitemap mr-2"></i>Workflow
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("integrations")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-share-alt mr-2"></i>Integrations
                      </div>
                    </Col>

                    {/* <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("resume")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-id-card mr-2"></i>Resume Branding
                      </div>
                    </Col> */}

                   

                    <Col xl={6}>
                      <div
                        className="user-box mt-2"
                        onClick={() => setSelectedOption("schedule")}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          border: "1px solid #ccc",
                          textAlign: "center",
                        }}
                      >
                        <i className="pi pi-calendar mr-2"></i>Schedule
                      </div>
                    </Col>
                  </Row>
                )}

                {/* PrimeReact user-activity-alerts */}
                {selectedOption === "user-activity-alerts" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadUserActivity} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>
                    <div className="datatable-size actjobsumtable">
                      <DataTable value={users} responsiveLayout="scroll">
                        <Column
                          field="username"
                          header="Name"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="password"
                          header="Email"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="userRole"
                          header="User Role"
                          style={{ width: "30%" }}
                        ></Column>
                        <Column
                          field="status"
                          header="Status"
                          style={{ width: "15%" }}
                        ></Column>
                        <Column body={editIcon} style={{ width: "10%" }} />
                        <Column body={deleteIcon} style={{ width: "10%" }} />
                      </DataTable>
                    </div>
                    {/* Dialog for editing user */}
                    <Dialog
                      header="Edit User"
                      visible={isDialogVisible}
                      style={{ width: "30vw" }}
                      onHide={() => setDialogVisible(false)}
                    >
                      <div>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Username
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="Password" className="block">
                              Password
                            </label>
                            <InputText
                              id="password"
                              className="w-full"
                              value={selectedUser ? selectedUser.password : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="status" className="block">
                              Status
                            </label>
                            <InputText
                              id="status"
                              value={selectedUser ? selectedUser.status : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  status: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="userRole" className="block">
                              User Role
                            </label>
                            <InputText
                              id="userRole"
                              value={selectedUser ? selectedUser.userRole : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  userRole: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="archive" className="block">
                              Archive
                            </label>
                            <InputText
                              id="archive"
                              value={
                                selectedUser
                                  ? selectedUser.archive
                                    ? "Yes"
                                    : "No"
                                  : ""
                              }
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  archive: e.target.value === "Yes",
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={12}>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                color="primary btn-main me-2"
                                onClick={handleSave}
                              >
                                <i className="pi pi-check me-1"></i>
                                Ok
                              </Button>
                              <Button
                                color="btn btn-primary cancel-outlinebtn"
                                onClick={handleCancel}
                              >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                    <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"  /> */}
                      </div>
                    </Dialog>
                  </div>
                )}

                {/* Placeholder for database-alerts */}
                {selectedOption === "database-alerts" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadDatabase} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <div className="datatable-size actjobsumtable">
                      <DataTable value={userRole} responsiveLayout="scroll">
                        <Column
                          field="password"
                          header="Role name"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="username"
                          header="Username"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column body={editIcon} style={{ width: "10%" }} />
                        {/* <Column body={viewIcon} style={{ width: "10%" }} /> */}
                      </DataTable>
                    </div>

                    {/* Dialog for editing user */}
                    <Dialog
                      header="Edit User"
                      visible={isDialogVisible}
                      style={{ width: "30vw" }}
                      onHide={() => setDialogVisible(false)}
                    >
                      <div>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="Password" className="block">
                              Role Name
                            </label>
                            <InputText
                              id="password"
                              className="w-full"
                              value={selectedUser ? selectedUser.password : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Username
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={12}>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                color="primary btn-main me-2"
                                onClick={handleSave}
                              >
                                <i className="pi pi-check me-1"></i>
                                Ok
                              </Button>
                              <Button
                                color="btn btn-primary cancel-outlinebtn"
                                onClick={handleCancel}
                              >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                    <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"  /> */}
                      </div>
                    </Dialog>
                  </div>
                )}

                {/* Placeholder for reports-alerts */}
                {selectedOption === "reports-alerts" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadReportAlerts} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <div className="datatable-size actjobsumtable">
                      <DataTable value={userRole} responsiveLayout="scroll">
                        <Column
                          field="password"
                          header="Group Name"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="username"
                          header="Users name"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column
                          field="username"
                          header="Role"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column body={editIcon} style={{ width: "10%" }} />
                        {/* <Column body={viewIcon} style={{ width: "10%" }} /> */}
                      </DataTable>
                    </div>

                    {/* Dialog for editing user */}
                    <Dialog
                      header="Edit User"
                      visible={isDialogVisible}
                      style={{ width: "30vw" }}
                      onHide={() => setDialogVisible(false)}
                    >
                      <div>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="Password" className="block">
                              Group Name
                            </label>
                            <InputText
                              id="password"
                              className="w-full"
                              value={selectedUser ? selectedUser.password : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Users name
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Role
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={12}>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                color="primary btn-main me-2"
                                onClick={handleSave}
                              >
                                <i className="pi pi-check me-1"></i>
                                Ok
                              </Button>
                              <Button
                                color="btn btn-primary cancel-outlinebtn"
                                onClick={handleCancel}
                              >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                   <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"  /> */}
                      </div>
                    </Dialog>
                  </div>
                )}

                {/* Placeholder for email-signature */}
                {selectedOption === "email-signature" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={emailsignature} />

                      <button
                        className="p-button p-component"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <Row>
                      <Col lg={8}>
                        <div className="p-field me-2 mb-2 select-sign">
                          <label className="mb-2 mt-3">
                            Select Signature to edit
                          </label>
                          <Dropdown
                            value={selectSign}
                            options={signatureOptions}
                            onChange={e => handleSelectSignature(e.value)}
                            placeholder="Select a signature"
                            optionLabel="name"
                            className="w-full"
                          />
                        </div>
                        <div className="d-flex crudbtn">
                          <Button
                            color="primary"
                            className="btn btn-primary emailbtn d-block me-2"
                            disabled={!isFirstSignatureAdded}
                            onClick={() => {
                              handleDeleteSignature(selectSign.id)
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            color="primary"
                            className="btn btn-primary emailbtn d-block me-2"
                            onClick={() => {
                              setDialogAction("new")
                              setSignatureName("")
                              setDialogVisible(true)
                              setisEditedsig(false)
                            }}
                          >
                            New
                          </Button>
                          <Button
                            color="primary"
                            className="btn btn-primary emailbtn d-block me-2"
                            disabled={!isSaveEnabled}
                            onClick={() => {
                              // Ensure `selectSign` contains the expected data
                              if (selectSign) {
                                setSignatureName(selectSign.name || "")
                                seteditIdsig(selectSign.id) // Save the ID for later usage
                                handleSaveSignature(selectSign.id) // Pass the ID to the save function
                              } else {
                                console.error("No signature selected!")
                              }
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            className="btn btn-primary emailbtn d-block me-2"
                            disabled={!selectSign}
                            onClick={() => {
                              setDialogAction("rename")
                              setSignatureName(selectSign?.name || "")
                              setDialogVisible(true)
                              setisEditedsig(true)
                              seteditIdsig(selectSign.id)
                            }}
                          >
                            Rename
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={8}>
                        <label className="mb-2 mt-4">Edit Signature</label>
                        <Editor
                          value={text}
                          onTextChange={handleEditorChange}
                          style={{ height: "300px" }}
                          headerTemplate={header}
                        />
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Placeholder for email-signature */}
                {selectedOption === "email-template" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={emailtemplate} />

                      <button
                        className="p-button p-component mb-2"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <Row>
                      <Col lg={12}>
                        <div className="p-field me-2 mb-2">
                          <label className="mb-2 mt-3">
                            Select Template to edit
                          </label>
                          <Dropdown
                            value={selectedTemplate}
                            options={templateOptions}
                            onChange={e => handleSelectTemplate(e.value)}
                            placeholder="Select a template"
                            className="w-full"
                            optionLabel="name"
                            disabled={!isAnyTemplateAdded}
                          />
                        </div>
                        <div className="d-flex">
                          <Button
                            color="primary"
                            className="btn btn-primary emailbtn d-block me-2"
                            disabled={!isAnyTemplateAdded}
                            onClick={() => {
                              handleDeleteTemplate(selectedTemplate.id)
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            color="primary"
                            className="btn btn-primary emailbtn d-block me-2"
                            onClick={() => {
                              setisEditedsig(false)
                              setNewTemplateVisible(true)
                              setnewTemplateName("")
                              setDialogAction("new") // Set dialog action to "new"
                            }}
                          >
                            New
                          </Button>
                          <Button
                            color="primary"
                            className="btn btn-primary emailbtn d-block me-2"
                            disabled={!isTemplateSaveEnabled}
                            onClick={() => {
                              // Ensure `selectSign` contains the expected data
                              if (selectedTemplate) {
                                setSignatureName(selectedTemplate.name || "")
                                seteditIdsig(selectedTemplate.id) // Save the ID for later usage
                                handleSaveTemplate(selectedTemplate.id) // Pass the ID to the save function
                              } else {
                                console.error("No signature selected!")
                              }
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            color="primary"
                            className="btn btn-primary emailbtn d-block"
                            onClick={() => {
                              setnewTemplateName(selectedTemplate?.name || "") // Set the name of the selected template
                              setDialogAction("rename") // Set dialog action to "rename"
                              setNewTemplateVisible(true)
                              setisEditedtem(true)
                              seteditIdtem(selectedTemplate?.id) // Set the ID of the selected template
                            }}
                            disabled={!selectedTemplate}
                          >
                            Rename
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <label className="mb-2 mt-4">Edit Template</label>
                        <Editor
                          value={templateContent}
                          onTextChange={handleTemplateEditorChange}
                          style={{ height: "360px" }}
                          headerTemplate={templateHeader}
                        />
                      </Col>
                    </Row>

                    {/* New Template Dialog */}
                    <Dialog
                      header={
                        dialogAction === "new"
                          ? "New Signature"
                          : "Rename Signature"
                      }
                      visible={isNewTemplateVisible}
                      onHide={() => setNewTemplateVisible(false)}
                      style={{ width: "30vw" }}
                      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                    >
                      <form onSubmit={handleSubmit2(onSubmittemplate)}>
                        <div className="p-field mb-2">
                          <label>Type a name for this template:</label>
                          <InputText
                            id="newTemplateName"
                            value={newTemplateName}
                            onChange={e => setnewTemplateName(e.target.value)}
                            placeholder="Template Name"
                            className="w-full"
                          />
                        </div>
                        <div className="d-flex justify-content-end">
                          <Button
                            label="Ok"
                            icon="pi pi-check"
                            className="btn btn-primary me-2 btn-main"
                            type="submit"
                          />
                        </div>
                      </form>
                    </Dialog>
                  </div>
                )}

                {/* Placeholder for crons */}
                {selectedOption === "crons" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={Crons} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <div className="actjobsumtable">
                      <DataTable value={userRole} responsiveLayout="scroll">
                        <Column
                          field="password"
                          header="Group Name"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="username"
                          header="Users name"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column
                          field="username"
                          header="Role"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column body={editIcon} style={{ width: "10%" }} />
                        {/* <Column body={viewIcon} style={{ width: "10%" }} /> */}
                      </DataTable>
                    </div>

                    {/* Dialog for editing user */}
                    <Dialog
                      header="Edit User"
                      visible={isDialogVisible}
                      style={{ width: "30vw" }}
                      onHide={() => setDialogVisible(false)}
                    >
                      <div>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="Password" className="block">
                              Group Name
                            </label>
                            <InputText
                              id="password"
                              className="w-full"
                              value={selectedUser ? selectedUser.password : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Users name
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Role
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={12}>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                color="primary btn-main me-2"
                                onClick={handleSave}
                              >
                                <i className="pi pi-check me-1"></i>
                                Ok
                              </Button>
                              <Button
                                color="btn btn-primary cancel-outlinebtn"
                                onClick={handleCancel}
                              >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                   <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"  /> */}
                      </div>
                    </Dialog>
                  </div>
                )}

                {/* Placeholder for workflow */}
                {selectedOption === "workflow" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadWorkflow} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <div className="actjobsumtable">
                      <DataTable value={userRole} responsiveLayout="scroll">
                        <Column
                          field="password"
                          header="Group Name"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="username"
                          header="Users name"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column
                          field="username"
                          header="Role"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column body={editIcon} style={{ width: "10%" }} />
                        {/* <Column body={viewIcon} style={{ width: "10%" }} /> */}
                      </DataTable>
                    </div>

                    {/* Dialog for editing user */}
                    <Dialog
                      header="Edit User"
                      visible={isDialogVisible}
                      style={{ width: "30vw" }}
                      onHide={() => setDialogVisible(false)}
                    >
                      <div>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="Password" className="block">
                              Group Name
                            </label>
                            <InputText
                              id="password"
                              className="w-full"
                              value={selectedUser ? selectedUser.password : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Users name
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Role
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={12}>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                color="primary btn-main me-2"
                                onClick={handleSave}
                              >
                                <i className="pi pi-check me-1"></i>
                                Ok
                              </Button>
                              <Button
                                color="btn btn-primary cancel-outlinebtn"
                                onClick={handleCancel}
                              >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                   <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"  /> */}
                      </div>
                    </Dialog>
                  </div>
                )}

                {/* Placeholder for integrations */}
                {selectedOption === "integrations" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadIntegrations} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <div className="actjobsumtable">
                      <DataTable value={IntegrationsData} responsiveLayout="scroll">
  <Column
    field="groupname"
    header="Group Name"
    style={{ width: "18%" }}
  ></Column>
  <Column
    field="username"
    header="Users name"
    style={{ width: "18%" }}
  ></Column>
  <Column
    field="role"
    header="Role"
    style={{ width: "18%" }}
  ></Column>
  <Column
    field="meeting"
    header="Meeting"
    style={{ width: "18%" }}
  ></Column>
  <Column
    field="calender"
    header="Calender"
    style={{ width: "18%" }}
  ></Column>
  <Column
    field="hrms"
    header="HRMS"
    style={{ width: "18%" }}
  ></Column>
  <Column 
    body={actionTemplate} 
    style={{ width: "10%" }} 
    headerStyle={{ width: '10%', minWidth: '6rem' }}
  />
</DataTable>
                    </div>

                   {/* dialog for Integratons */}

                   {/* Edit Dialog */}
<Dialog 
  header="Edit Integration" 
  visible={editDialogVisible} 
  style={{ width: '50vw' }} 
  onHide={() => setIntegrationsEditDialogVisible(false)}
  footer={
    <div>
      <Button label="Save" icon="pi pi-check" onClick={saveIntegration} className="p-button-text me-2" />
      <Button label="Cancel" icon="pi pi-times" onClick={() => setEditDialogVisible(false)} className="p-button-text" />
    </div>
  }
>
  {currentIntegration && (
    <div className="p-fluid">
      <div className="field">
        <label htmlFor="groupname">Group Name</label>
        <InputText 
          id="groupname" 
          value={currentIntegration.groupname} 
          onChange={(e) => setCurrentIntegration({...currentIntegration, groupname: e.target.value})} 
        />
      </div>
      <div className="field">
        <label htmlFor="username">Username</label>
        <InputText 
          id="username" 
          value={currentIntegration.username} 
          onChange={(e) => setCurrentIntegration({...currentIntegration, username: e.target.value})} 
        />
      </div>
      <div className="field">
        <label htmlFor="role">Role</label>
        <InputText 
          id="role" 
          value={currentIntegration.role} 
          onChange={(e) => setCurrentIntegration({...currentIntegration, role: e.target.value})} 
        />
      </div>
      <div className="field">
        <label htmlFor="meeting">Meeting</label>
        <InputText
    id="meeting"
    value={currentIntegration.meeting}
    onChange={(e) => setCurrentIntegration({...currentIntegration, meeting: e.target.value})}
    placeholder="Enter status (Enabled/Disabled)"
    className="w-full"
  />
      </div>
      <div className="field">
        <label htmlFor="calender">Calendar</label>
        <InputText
    id="calender"
    value={currentIntegration.calender}
    onChange={(e) => setCurrentIntegration({...currentIntegration, calender: e.target.value})}
    placeholder="Enter status (Enabled/Disabled)"
    className="w-full"
  />
      </div>
      <div className="field">
        <label htmlFor="hrms">HRMS</label>
         <InputText
    id="hrms"
    value={currentIntegration.hrms}
    onChange={(e) => setCurrentIntegration({...currentIntegration, hrms: e.target.value})}
    placeholder="Enter status (Enabled/Disabled)"
    className="w-full"
  />
      </div>
    </div>
  )}
</Dialog>

{/* Delete Confirmation Dialog */}
<Dialog
  header="Confirm Delete"
  visible={deleteDialogVisible}
  style={{ width: '450px' }}
  modal
  footer={
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text me-2" />
      <Button label="Yes" icon="pi pi-check" onClick={confirmDelete} className="p-button-text" />
    </div>
  }
  onHide={() => setDeleteDialogVisible(false)}
>
  <div className="flex align-items-center justify-content-center">
    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: '#FFA500' }} />
    <span>Are you sure you want to delete this integration?</span>
  </div>
</Dialog>
                   

                  </div>
                )}

                {/* Placeholder for resume */}
                {selectedOption === "resume" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadResume} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <div className="actjobsumtable">
                      <DataTable value={userRole} responsiveLayout="scroll">
                        <Column
                          field="password"
                          header="Group Name"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="username"
                          header="Users name"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column
                          field="username"
                          header="Role"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column body={editIcon} style={{ width: "10%" }} />
                        {/* <Column body={viewIcon} style={{ width: "10%" }} /> */}
                      </DataTable>
                    </div>

                    {/* Dialog for editing user */}
                    <Dialog
                      header="Edit User"
                      visible={isDialogVisible}
                      style={{ width: "30vw" }}
                      onHide={() => setDialogVisible(false)}
                    >
                      <div>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="Password" className="block">
                              Group Name
                            </label>
                            <InputText
                              id="password"
                              className="w-full"
                              value={selectedUser ? selectedUser.password : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Users name
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Role
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={12}>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                color="primary btn-main me-2"
                                onClick={handleSave}
                              >
                                <i className="pi pi-check me-1"></i>
                                Ok
                              </Button>
                              <Button
                                color="btn btn-primary cancel-outlinebtn"
                                onClick={handleCancel}
                              >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                   <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"  /> */}
                      </div>
                    </Dialog>
                  </div>
                )}

              

                {/* Placeholder for schedule */}
                {selectedOption === "schedule" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadSchedule} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <div className="actjobsumtable">
                      <DataTable value={userRole} responsiveLayout="scroll">
                        <Column
                          field="password"
                          header="Group Name"
                          style={{ width: "20%" }}
                        ></Column>
                        <Column
                          field="username"
                          header="Users name"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column
                          field="username"
                          header="Role"
                          style={{ width: "20%" }}
                        ></Column>

                        <Column body={editIcon} style={{ width: "10%" }} />
                        {/* <Column body={viewIcon} style={{ width: "10%" }} /> */}
                      </DataTable>
                    </div>

                    {/* Dialog for editing user */}
                    <Dialog
                      header="Edit User"
                      visible={isDialogVisible}
                      style={{ width: "30vw" }}
                      onHide={() => setDialogVisible(false)}
                    >
                      <div>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="Password" className="block">
                              Group Name
                            </label>
                            <InputText
                              id="password"
                              className="w-full"
                              value={selectedUser ? selectedUser.password : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Users name
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="title" className="block">
                              Role
                            </label>
                            <InputText
                              id="username"
                              value={selectedUser ? selectedUser.username : ""}
                              onChange={e =>
                                setSelectedUser({
                                  ...selectedUser,
                                  username: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={12}>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                color="primary btn-main me-2"
                                onClick={handleSave}
                              >
                                <i className="pi pi-check me-1"></i>
                                Ok
                              </Button>
                              <Button
                                color="btn btn-primary cancel-outlinebtn"
                                onClick={handleCancel}
                              >
                                <i className="pi pi-times me-1"></i>
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                   <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"  /> */}
                      </div>
                    </Dialog>
                  </div>
                )}

                {/* Placeholder for general */}
                {selectedOption === "general" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={breadGeneral} />

                      <button
                        className="p-button p-component mb-2"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <Row className="mt-3">
                      <Col lg={4} sm={12}>
                        <div className="p-field">
                          <label>Font Size</label>
                          <Dropdown
                            value={fontSize}
                            onChange={e => setFontSize(e.value)}
                            options={fontSizeOptions}
                            optionLabel="label"
                            placeholder="Select Font Size"
                            className="bgclr w-full"
                          />
                        </div>
                      </Col>
                      <Col lg={4} sm={12}>
                        <label>Default Folder</label>
                        <Dropdown
                          value={selectedFolder}
                          onChange={e => setSelectedFolder(e.value)}
                          options={folderOptions}
                          optionLabel="label"
                          placeholder="Select a Folder"
                          className="bgclr w-full"
                          itemTemplate={customTemplate}
                        />
                      </Col>
                      <Col lg={4} sm={12}>
                        <label>Default View</label>
                        <Dropdown
                          value={selectedView}
                          onChange={e => setSelectedView(e.value)}
                          options={viewOptions}
                          optionLabel="label"
                          placeholder="Select a Default View"
                          className="bgclr w-full"
                        />
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Placeholder for email-settings */}
                {selectedOption === "email-settings" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={emailsetting} />

                      <button
                        className="p-button p-component mb-3"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <Row>
                      <Col lg={12}>
                        <p className="mb-3 mt-2">
                          Default Email Field for Mass Mailing or Email
                          Campaigns
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex align-items-center">
                            <RadioButton
                              inputId="ingredient1"
                              name="pizza"
                              value="Cheese"
                              onChange={e => setIngredient(e.value)}
                              checked={ingredient === "Cheese"}
                            />
                            <label htmlFor="ingredient1" className="ml-2 mb-0">
                              Email1
                            </label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton
                              inputId="ingredient2"
                              name="pizza"
                              value="Mushroom"
                              onChange={e => setIngredient(e.value)}
                              checked={ingredient === "Mushroom"}
                            />
                            <label htmlFor="ingredient2" className="ml-2 mb-0">
                              Email2
                            </label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton
                              inputId="ingredient3"
                              name="pizza"
                              value="Pepper"
                              onChange={e => setIngredient(e.value)}
                              checked={ingredient === "Pepper"}
                            />
                            <label htmlFor="ingredient3" className="ml-2 mb-0">
                              Email1 or Email2
                            </label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <h6 className="mb-3 mt-4">SMTP Email Accounts</h6>
                        <Row className="mb-3">
                          <Col lg={2}>
                            <Button
                              color="primary"
                              className="btn btn-primary outlinebtn d-block"
                            >
                              <i className="pi pi-plus me-1"></i>
                              Add SMTP
                            </Button>
                          </Col>
                          <Col lg={10} className="m-0">
                            <InputText
                              value={addsmtp}
                              onChange={e => setAddsmtp(e.target.value)}
                              className="w-full"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <DataTable
                          value={smtpAccounts}
                          showGridlines
                          tableStyle={{ minWidth: "50rem" }}
                        >
                          <Column
                            field="outgoingServer"
                            header="Outgoing Server"
                          ></Column>
                          <Column field="port" header="Port"></Column>
                          <Column field="username" header="Username"></Column>
                          <Column field="password" header="Password"></Column>
                          <Column field="email" header="Email"></Column>
                          <Column field="address" header="Address"></Column>
                        </DataTable>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="card p-4 pt-0 pb-4 mt-2">
                          <h6 className="mb-2 mt-4">SMTP Account</h6>
                          <Row>
                            <Col lg={9}>
                              <div className="p-field mb-2">
                                <label>Outgoing Server</label>
                                <InputText
                                  id="outgoingServer"
                                  value={outgoingServer}
                                  onChange={e =>
                                    setOutgoingServer(e.target.value)
                                  }
                                  placeholder="e.g., smtp.example.com"
                                  required
                                  className="w-full"
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="p-field mb-2">
                                <label htmlFor="port">Port</label>
                                <InputText
                                  id="port"
                                  value={port}
                                  onChange={e => setPort(e.target.value)}
                                  placeholder="Enter port number"
                                  type="number"
                                  className="w-full"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6}>
                              <div className="p-field mb-2">
                                <label>Username</label>
                                <InputText
                                  id="username"
                                  value={username}
                                  onChange={e => setUsername(e.target.value)}
                                  placeholder="SMTP username"
                                  required
                                  className="w-full"
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="p-field mb-2">
                                <label>Password</label>
                                <InputText
                                  id="password"
                                  type="password"
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                  placeholder="SMTP password"
                                  required
                                  className="w-full"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6}>
                              <div className="p-field mb-2">
                                <label>From</label>
                                <InputText
                                  id="fromEmail"
                                  value={fromEmail}
                                  onChange={e => setFromEmail(e.target.value)}
                                  placeholder="e.g., no-reply@example.com"
                                  required
                                  className="w-full"
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="p-field mb-2">
                                <label>Email</label>
                                <InputText
                                  id="email"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}
                                  placeholder="Enter your email"
                                  className="w-full"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="d-flex align-items-end">
                            <Col lg={9}>
                              <div className="p-field">
                                <label htmlFor="address">Reply Address</label>
                                <InputText
                                  id="address"
                                  value={address}
                                  onChange={e => setAddress(e.target.value)}
                                  placeholder="Enter address"
                                  className="w-full"
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="field-checkbox">
                                <Checkbox
                                  onChange={e => setUseSSL(e.checked)}
                                  checked={useSSL}
                                />
                                <label htmlFor="useSSL" className="ml-2">
                                  Use SSL/TLS
                                </label>
                              </div>
                            </Col>
                          </Row>
                          <Row className="align-items-center mt-3">
                            <Col md={12}>
                              <div className="d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-main me-2"
                                  onClick={handleCreate}
                                >
                                  <i className="pi pi-check me-1"></i>Create
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Row className="align-items-center mt-3">
                          <Col md={12}>
                            <div className="d-flex justify-content-end">
                              <button
                                type="submit"
                                class="btn btn-primary  btn-main me-2"
                              >
                                {" "}
                                <i className="pi pi-save me-1"></i>Save
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary  cancel-outlinebtn"
                              >
                                {" "}
                                <i className="pi pi-times me-1"></i>Cancel
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Placeholder for sms-settings */}
                {selectedOption === "sms-settings" && (
                  <div>
                    <div className="breadcrumb d-flex justify-content-between">
                      <BreadCrumb model={smssetting} />

                      <button
                        className="p-button p-component mb-2"
                        onClick={() => setSelectedOption(null)}
                      >
                        <i className="pi pi-arrow-left me-2"></i> Back
                      </button>
                    </div>

                    <TabPanel
                      header="SMS Settings"
                      leftIcon="pi pi-comment mr-2"
                    >
                      <Row>
                        <Col lg={8}>
                          <h6 className="mb-2 mt-3">
                            BANDWIDTH SMS(FOR INDIVIDUAL TEXTING)
                          </h6>
                          <div className="d-flex align-items-end">
                            <div className="p-field me-2">
                              <label htmlFor="areaCode">Area Code</label>
                              <InputText
                                id="areaCode"
                                value={areaCode}
                                onChange={e => setAreaCode(e.target.value)}
                                placeholder="Enter area code"
                                maxLength={5}
                                className="w-full"
                              />
                            </div>
                            <div>
                              <Button
                                color="primary"
                                className="btn btn-primary outlinebtn d-block"
                              >
                                <i className="pi pi-search me-1"></i>
                                Search
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2">
                            Please, search for area code to view available
                            numbers.
                          </p>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={8}>
                          <h6 className="mb-2 mt-4">
                            SWIFT SMS(FOR MASS TEXTING)
                          </h6>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={6}>
                          <div className="field">
                            <label htmlFor="accountKey">Account Key</label>
                            <InputText
                              id="accountKey"
                              type="password"
                              value={accountKey}
                              onChange={e => setAccountKey(e.target.value)}
                              placeholder="Enter your account key"
                              className="w-full"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="field">
                            <label htmlFor="phoneNumber">
                              Senders Phone Number
                            </label>
                            <InputText
                              id="phoneNumber"
                              type="tel"
                              value={phoneNumber}
                              onChange={e => setPhoneNumber(e.target.value)}
                              placeholder="Enter your phone number"
                              className="w-full"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="align-items-center mt-3">
                        <Col md={12}>
                          <div className="d-flex justify-content-end">
                            <button
                              type="submit"
                              class="btn btn-primary  btn-main me-2"
                            >
                              {" "}
                              <i className="pi pi-save me-1"></i>Save
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary  cancel-outlinebtn"
                            >
                              {" "}
                              <i className="pi pi-times me-1"></i>Cancel
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </TabPanel>
                  </div>
                )}

                {/* Placeholder for sms-settings */}
                {selectedOption === "sms-settings" && (
                  <div>
                    <Row>
                      <Col lg={8}>
                        <h6 className="mb-2 mt-2">
                          BANDWIDTH SMS(FOR INDIVIDUAL TEXTING)
                        </h6>
                        <div className="d-flex align-items-end">
                          <div className="p-field me-2">
                            <label htmlFor="areaCode">Area Code</label>
                            <InputText
                              id="areaCode"
                              value={areaCode}
                              onChange={e => setAreaCode(e.target.value)}
                              placeholder="Enter area code"
                              maxLength={5}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <Button
                              color="primary"
                              className="btn btn-primary outlinebtn d-block"
                            >
                              <i className="pi pi-search me-1"></i>
                              Search
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2">
                          Please, search for area code to view available
                          numbers.
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={8}>
                        <h6 className="mb-2 mt-4">
                          SWIFT SMS(FOR MASS TEXTING)
                        </h6>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6}>
                        <div className="field">
                          <label htmlFor="accountKey">Account Key</label>
                          <InputText
                            id="accountKey"
                            type="password"
                            value={accountKey}
                            onChange={e => setAccountKey(e.target.value)}
                            placeholder="Enter your account key"
                            className="w-full"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="field">
                          <label htmlFor="phoneNumber">
                            Senders Phone Number
                          </label>
                          <InputText
                            id="phoneNumber"
                            type="tel"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="align-items-center mt-3">
                      <Col md={12}>
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit"
                            class="btn btn-primary  btn-main me-2"
                          >
                            {" "}
                            <i className="pi pi-save me-1"></i>Save
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary  cancel-outlinebtn"
                          >
                            {" "}
                            <i className="pi pi-times me-1"></i>Cancel
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </TabPanel>

            {/* setting section end */}

            {/* LOOKUP CUSTOMISATION  */}

            <TabPanel
              header="Lookup Customization"
              leftIcon="pi pi-search mr-2"
            >
              <div className="container-fluid">
                <div className="row lookup-cust pipeline-acc">
                  <div className="col-6">
                    <Accordion
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Module">
                        <div>
                          {/* Data Table with pagination */}
                          <DataTable
                            value={jobTitlesData1}
                            responsiveLayout="scroll"
                            paginator
                            rows={5} // Number of rows per page
                            // rowsPerPageOptions={[5, 10, 15]} // Options for the number of rows per page
                            style={{ marginTop: "1rem" }}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editJobTitleIcon1(rowData)}
                                  {deleteJobTitleIcon1(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new job title button */}
                            <Button
                              label="Add More"
                              icon="pi pi-briefcase"
                              onClick={addNewJobTitle1}
                              className="mt-3"
                              style={{ borderRadius: "4px" }}
                            />
                          </div>

                          {/* Dialog for adding/editing job title */}
                          <Dialog
                            header={
                              isEditing1
                                ? "Edit Module"
                                : "Add New Module"
                            }
                            visible={isEditDialogVisible1}
                            style={{ width: "30vw" }}
                            onHide={handleCancelJobTitle1}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="jobTitleValue1"
                                    className="block"
                                  >
                                    Value
                                  </label>
                                  <InputText
                                    id="jobTitleValue1"
                                    value={currentJobTitle1.value || ""}
                                    onChange={e =>
                                      setCurrentJobTitle1(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                    disabled={isSystemType && isEditing1} // Disable if editing and type is "System"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="jobTitleDescription1"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="jobTitleDescription1"
                                    value={currentJobTitle1.description}
                                    onChange={e =>
                                      setCurrentJobTitle1(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="jobTitleType1"
                                    className="block"
                                  >
                                    Type
                                  </label>
                                  <Dropdown
                                    id="jobTitleType1"
                                    value={currentJobTitle1.type}
                                    options={typeOptions1}
                                    onChange={e =>
                                      setCurrentJobTitle1(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                    disabled={isSystemType && isEditing1} // Disable if editing and type is "System"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveJobTitle1}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      multiple={false}
                      style={{ width: "100%" }}
                      className="mt-3"
                    >
                      <AccordionTab header="Company">
                        <div>
                          {/* Data Table with pagination */}
                          <DataTable
                            value={jobTitlesData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5} // Number of rows per page
                            // rowsPerPageOptions={[5, 10, 15]} // Options for the number of rows per page
                            style={{ marginTop: "1rem" }}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editJobTitleIcon(rowData)}
                                  {deleteJobTitleIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new job title button */}
                            <Button
                              label="Add More"
                              icon="pi pi-briefcase"
                              onClick={addNewJobTitle}
                              className="mt-3"
                              style={{ borderRadius: "4px" }}
                            />
                          </div>

                          {/* Dialog for adding/editing job title */}
                          <Dialog
                            header={
                              isEditing
                                ? "Edit Company"
                                : "Add New Company"
                            }
                            visible={isEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelJobTitle}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="jobTitleValue"
                                    className="block"
                                  >
                                    Value
                                  </label>
                                  <InputText
                                    id="jobTitleValue"
                                    value={currentJobTitle.value}
                                    onChange={e =>
                                      setCurrentJobTitle(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="jobTitleDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="jobTitleDescription"
                                    value={currentJobTitle.description}
                                    onChange={e =>
                                      setCurrentJobTitle(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="jobTitleType"
                                    className="block"
                                  >
                                    Type
                                  </label>
                                  <Dropdown
                                    id="jobTitleType"
                                    value={currentJobTitle.type}
                                    options={typeOptions}
                                    onChange={e =>
                                      setCurrentJobTitle(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveJobTitle}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Project Status">
                        <div>
                          {/* Add new city button */}

                          {/* Data Table with Pagination */}
                          <DataTable
                            value={citiesData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="name"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editCityIcon(rowData)}
                                  {deleteCityIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end mt-3">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewCity}
                            />
                          </div>

                          {/* Dialog for adding/editing city */}
                          <Dialog
                            header={isCityEditing ? "Edit Project Status" : "Add Project Status"}
                            visible={isCityEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelCity}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="cityName" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="cityName"
                                    value={currentCity.name}
                                    onChange={e =>
                                      setCurrentCity(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="cityDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="cityDescription"
                                    value={currentCity.description}
                                    onChange={e =>
                                      setCurrentCity(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="cityType" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="cityType"
                                    value={currentCity.type}
                                    options={cityTypeOptions}
                                    onChange={e =>
                                      setCurrentCity(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveCity}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Work Type">
                        <div>
                          {/* Data Table */}
                          <DataTable
                            value={statesData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5} // Set the number of rows per page
                          >
                            <Column
                              field="name"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editStateIcon(rowData)}
                                  {deleteStateIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "25%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new state button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewState}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing state */}
                          <Dialog
                            header={isStateEditing ? "Edit Work Type" : "Add Work Type"}
                            visible={isStateEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelState}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="stateName" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="stateName"
                                    value={currentEditingState.name}
                                    onChange={e =>
                                      setCurrentEditingState(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="stateDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="stateDescription"
                                    value={currentEditingState.description}
                                    onChange={e =>
                                      setCurrentEditingState(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="stateType" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="stateType"
                                    value={currentEditingState.type}
                                    options={stateTypeOptions}
                                    onChange={e =>
                                      setCurrentEditingState(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="w-full bgclr"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveState}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                    <Button
                                      color="btn btn-primary cancel-outlinebtn"
                                      onClick={handleCancelState}
                                    >
                                      <i className="pi pi-times me-1"></i>{" "}
                                      Cancel
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Work Type Status">
                        <div>
                          <DataTable
                            value={countriesData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="name"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editCountryIcon(rowData)}
                                  {deleteCountryIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewCountry}
                              className="mt-3"
                            />
                          </div>

                          <Dialog
                            header={
                              isCountryBeingEdited
                                ? "Edit Work Type Status"
                                : "Add Work Type Status"
                            }
                            visible={isCountryDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelCountry}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="countryName"
                                    className="block"
                                  >
                                    Value
                                  </label>
                                  <InputText
                                    id="countryName"
                                    value={currentCountry.name}
                                    onChange={e =>
                                      setCurrentCountry(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="countryDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="countryDescription"
                                    value={currentCountry.description}
                                    onChange={e =>
                                      setCurrentCountry(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="countryType"
                                    className="block"
                                  >
                                    Type
                                  </label>
                                  <Dropdown
                                    id="countryType"
                                    value={currentCountry.type}
                                    options={countryTypeOptions}
                                    onChange={e =>
                                      setCurrentCountry(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveCountry}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                    <Button
                                      color="btn btn-primary cancel-outlinebtn"
                                      onClick={handleCancelCountry}
                                    >
                                      <i className="pi pi-times me-1"></i>{" "}
                                      Cancel
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Approval Status">
                        <div>
                          {/* Add new address label button */}

                          {/* Data Table with Pagination */}
                          <DataTable
                            value={addressLabelsData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="name"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editAddressLabelIcon(rowData)}
                                  {deleteAddressLabelIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add more"
                              icon="pi pi-plus"
                              onClick={addNewAddressLabel}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing address label */}
                          <Dialog
                            header={
                              isEditingAddressLabel
                                ? "Edit Approval Status"
                                : "Add Approval Status"
                            }
                            visible={isAddressLabelEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelAddressLabel}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="addressLabel"
                                    className="block"
                                  >
                                    Value
                                  </label>
                                  <InputText
                                    id="addressLabel"
                                    value={currentAddressLabel.name}
                                    onChange={e =>
                                      setCurrentAddressLabel(prev => ({
                                        ...prev,
                                        label: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="addressOutput"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="addressOutput"
                                    value={currentAddressLabel.description}
                                    onChange={e =>
                                      setCurrentAddressLabel(prev => ({
                                        ...prev,
                                        output: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="addressType"
                                    className="block"
                                  >
                                    Type
                                  </label>
                                  <Dropdown
                                    id="addressType"
                                    value={currentAddressLabel.type}
                                    options={addressLabelTypeOptions}
                                    onChange={e =>
                                      setCurrentAddressLabel(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="w-full bgclr"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveAddressLabel}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Priority">
                        <div>
                          {/* Add new skill button */}

                          {/* Data Table with Pagination */}
                          <DataTable
                            value={skillsData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="name"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editSkillIcon(rowData)}
                                  {deleteSkillIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "20%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewSkill}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing skill */}
                          <Dialog
                            header={
                              isEditingSkill ? "Edit Priority" : "Add New Priority"
                            }
                            visible={isSkillEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelSkill}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="skillName" className="block">
                                    value
                                  </label>
                                  <InputText
                                    id="skillName"
                                    value={currentSkill.name}
                                    onChange={e =>
                                      setCurrentSkill(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="skillDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="skillDescription"
                                    value={currentSkill.description}
                                    onChange={e =>
                                      setCurrentSkill(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="skillType" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="skillType"
                                    value={currentSkill.type}
                                    options={skillTypeOptions}
                                    onChange={e =>
                                      setCurrentSkill(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveSkill}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Linked Work Type">
                        <div>
                          {/* Add new employee button */}

                          {/* Data Table with Pagination */}
                          <DataTable
                            value={LinkedWorkType}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="name"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editEmployeeIcon(rowData)}
                                  {deleteEmployeeIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "25%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewEmployee}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing employee */}
                          <Dialog
                            header={
                              isEditingEmployee
                                ? "Edit Linked Work Type"
                                : "Add Linked Work Type"
                            }
                            visible={isEmployeeEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelEmployee}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="employeeName"
                                    className="block"
                                  >
                                    Value
                                  </label>
                                  <InputText
                                    id="employeeName"
                                    value={currentEmployee.name}
                                    onChange={e =>
                                      setCurrentEmployee(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="employeeDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="employeeDescription"
                                    value={currentEmployee.description}
                                    onChange={e =>
                                      setCurrentEmployee(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="employeeType"
                                    className="block"
                                  >
                                    Type
                                  </label>
                                  <Dropdown
                                    id="employeeType"
                                    value={currentEmployee.type}
                                    options={employeeTypeOptions}
                                    onChange={e =>
                                      setCurrentEmployee(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveEmployee}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Select Work Item">
                        <div>
                          {/* Data Table with Pagination */}
                          <DataTable
                            value={sourcesData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="name"
                              header="Value"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "25%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "25%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editSourceIcon(rowData)}
                                  {deleteSourceIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new source button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewSource}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing source */}
                          <Dialog
                            header={
                              isEditingSource ? "Edit Work Item" : "Add New Work Item"
                            }
                            visible={isSourceEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelSource}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="sourceName" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="sourceName"
                                    value={currentSource.name}
                                    onChange={e =>
                                      setCurrentSource(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="sourceDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="sourceDescription"
                                    value={currentSource.description}
                                    onChange={e =>
                                      setCurrentSource(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="sourceType" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="sourceType"
                                    value={currentSource.type}
                                    options={sourceTypeOptions}
                                    onChange={e =>
                                      setCurrentSource(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveSource}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                     <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Employee Type">
                        <div>
                          {/* Data Table with Pagination */}
                          <DataTable
                            value={employeeTypeData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editEmployeeTypeIcon(rowData)}
                                  {deleteEmployeeTypeIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "20%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new employee type button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewEmployeeType}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing employee type */}
                          <Dialog
                            header={
                              isEditingEmployeeType
                                ? "Edit Employee Type"
                                : "Add New Employee Type"
                            }
                            visible={isEmployeeTypeEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelEmployeeType}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentEmployeeType.value}
                                    onChange={e =>
                                      setCurrentEmployeeType(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentEmployeeType.description}
                                    onChange={e =>
                                      setCurrentEmployeeType(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentEmployeeType.type}
                                    options={employeeTypeAccordionOptions}
                                    onChange={e =>
                                      setCurrentEmployeeType(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveEmployeeType}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Work Location">
                        <div>
                          {/* Data Table with Pagination */}
                          <DataTable
                            value={workLocationData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editWorkLocationIcon(rowData)}
                                  {deleteWorkLocationIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "20%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new work location button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewWorkLocation}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing work location */}
                          <Dialog
                            header={
                              isEditingWorkLocation
                                ? "Edit Work Location"
                                : "Add New Work Location"
                            }
                            visible={isWorkLocationEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelWorkLocation}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentWorkLocation.value}
                                    onChange={e =>
                                      setCurrentWorkLocation(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentWorkLocation.description}
                                    onChange={e =>
                                      setCurrentWorkLocation(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentWorkLocation.type}
                                    options={workLocationAccordionOptions}
                                    onChange={e =>
                                      setCurrentWorkLocation(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveWorkLocation}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Shift Timing">
                        <div>
                          {/* Data Table with Pagination */}
                          <DataTable
                            value={shiftTimingData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editShiftTimingIcon(rowData)}
                                  {deleteShiftTimingIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "20%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new shift timing button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewShiftTiming}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing shift timing */}
                          <Dialog
                            header={
                              isEditingShiftTiming
                                ? "Edit Shift Timing"
                                : "Add New Shift Timing"
                            }
                            visible={isShiftTimingEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelShiftTiming}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentShiftTiming.value}
                                    onChange={e =>
                                      setCurrentShiftTiming(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentShiftTiming.description}
                                    onChange={e =>
                                      setCurrentShiftTiming(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentShiftTiming.type}
                                    options={shiftTimingAccordionOptions}
                                    onChange={e =>
                                      setCurrentShiftTiming(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveShiftTiming}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="City">
                        <div>
                          {/* Data Table with Pagination */}
                          <DataTable
                            value={cityAccordionData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editCityAccordionIcon(rowData)}
                                  {deleteCityAccordionIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "20%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new city button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewCityAccordion}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing city */}
                          <Dialog
                            header={
                              isEditingCityAccordion
                                ? "Edit City"
                                : "Add New City"
                            }
                            visible={isCityAccordionEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelCityAccordion}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentCityAccordion.value}
                                    onChange={e =>
                                      setCurrentCityAccordion(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentCityAccordion.description}
                                    onChange={e =>
                                      setCurrentCityAccordion(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentCityAccordion.type}
                                    options={cityAccordionOptions}
                                    onChange={e =>
                                      setCurrentCityAccordion(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveCityAccordion}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                  
                  </div>

                  {/* Column 2 start  */}

                  <div className="col-6">
                   

                <Accordion
                      className=""
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Responsible">
                        <div>
                          {/* Data Table with Pagination */}
                          <DataTable
                            value={referredData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editReferredIcon(rowData)}
                                  {deleteReferredIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "20%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new referred button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewReferred}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing referred */}
                          <Dialog
                            header={
                              isEditingReferred
                                ? "Edit Responsible"
                                : "Add New Responsible"
                            }
                            visible={isReferredEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelReferred}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentReferred.value}
                                    onChange={e =>
                                      setCurrentReferred(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentReferred.description}
                                    onChange={e =>
                                      setCurrentReferred(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentReferred.type}
                                    options={referredTypeOptions}
                                    onChange={e =>
                                      setCurrentReferred(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveReferred}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                   

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Designation">
                        <div className="p-4">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Designation Management</h5>
                            <Button
                              label="Add New Designation"
                              icon="pi pi-plus"
                              onClick={addNewDesignation}
                              className="p-button-success"
                            />
                          </div>

                          <DataTable
                            value={designationData}
                            paginator
                            rows={10}
                            dataKey="id"
                            emptyMessage="No designation data found."
                          >
                            <Column 
                              field="value" 
                              header="Designation Name" 
                              sortable 
                            />
                            <Column 
                              field="description" 
                              header="Description" 
                              sortable 
                            />
                            <Column 
                              field="type" 
                              header="Type" 
                              sortable 
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div>
                                  {editDesignationIcon(rowData)}
                                  {deleteDesignationIcon(rowData)}
                                </div>
                              )}
                            />
                          </DataTable>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* Designation Edit Dialog */}
                    <Dialog
                      header={isEditingDesignation ? "Edit Designation" : "Add New Designation"}
                      visible={isDesignationEditDialogVisible}
                      onHide={handleCancelDesignation}
                      footer={
                        <div>
                          <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={handleCancelDesignation}
                            className="p-button-text"
                          />
                          <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={handleSaveDesignation}
                            autoFocus
                          />
                        </div>
                      }
                    >
                      <div className="p-fluid">
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="designation" className="block">Designation Name</label>
                            <InputText
                              id="designation"
                              value={currentDesignation.value}
                              onChange={e =>
                                setCurrentDesignation({
                                  ...currentDesignation,
                                  value: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="designationDescription" className="block">Description</label>
                            <InputText
                              id="designationDescription"
                              value={currentDesignation.description}
                              onChange={e =>
                                setCurrentDesignation({
                                  ...currentDesignation,
                                  description: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="designationType" className="block">Type</label>
                            <Dropdown
                              id="designationType"
                              value={currentDesignation.type}
                              onChange={e =>
                                setCurrentDesignation({
                                  ...currentDesignation,
                                  type: e.value,
                                })
                              }
                              options={designationAccordionOptions}
                              placeholder="Select Type"
                              className="bgclr w-full"
                            />
                          </Col>
                        </Row>
                      </div>
                    </Dialog>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Primary Skills">
                        <div className="p-4">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Primary Skills Management</h5>
                            <Button
                              label="Add New Skill"
                              icon="pi pi-plus"
                              onClick={addNewPrimarySkill}
                              className="p-button-success"
                            />
                          </div>

                          <DataTable
                            value={primarySkillsData}
                            paginator
                            rows={10}
                            dataKey="id"
                            emptyMessage="No primary skills data found."
                          >
                            <Column 
                              field="value" 
                              header="Skill Name" 
                              sortable 
                            />
                            <Column 
                              field="description" 
                              header="Description" 
                              sortable 
                              style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            />
                            <Column 
                              field="type" 
                              header="Type" 
                              sortable 
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div>
                                  {editPrimarySkillIcon(rowData)}
                                  {deletePrimarySkillIcon(rowData)}
                                </div>
                              )}
                            />
                          </DataTable>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* Primary Skills Edit Dialog */}
                    <Dialog
                      header={isEditingPrimarySkill ? "Edit Primary Skill" : "Add New Primary Skill"}
                      visible={isPrimarySkillsEditDialogVisible}
                      onHide={handleCancelPrimarySkill}
                      style={{ width: "30vw", minWidth: "300px" }}
                      modal={true}
                      footer={
                        <div>
                          <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={handleCancelPrimarySkill}
                            className="p-button-text"
                          />
                          <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={handleSavePrimarySkill}
                            autoFocus
                          />
                        </div>
                      }
                    >
                      <div className="p-fluid">
                        <Row className="mb-3">
                          <Col xl={12}>
                            <label htmlFor="primarySkill" className="block mb-2">Skill Name</label>
                            <InputText
                              id="primarySkill"
                              value={currentPrimarySkill.value}
                              onChange={e =>
                                setCurrentPrimarySkill({
                                  ...currentPrimarySkill,
                                  value: e.target.value,
                                })
                              }
                              className="w-full"
                              style={{ padding: "12px", fontSize: "14px" }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col xl={12}>
                            <label htmlFor="primarySkillDescription" className="block mb-2">Description</label>
                            <InputText
                              id="primarySkillDescription"
                              value={currentPrimarySkill.description}
                              onChange={e =>
                                setCurrentPrimarySkill({
                                  ...currentPrimarySkill,
                                  description: e.target.value,
                                })
                              }
                              className="w-full"
                              style={{ padding: "12px", fontSize: "14px" }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col xl={12}>
                            <label htmlFor="primarySkillType" className="block mb-2">Type</label>
                            <Dropdown
                              id="primarySkillType"
                              value={currentPrimarySkill.type}
                              onChange={e =>
                                setCurrentPrimarySkill({
                                  ...currentPrimarySkill,
                                  type: e.value,
                                })
                              }
                              options={primarySkillsAccordionOptions}
                              placeholder="Select Type"
                              className="bgclr w-full"
                              style={{ padding: "8px", fontSize: "14px" }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Dialog>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Secondary Skills">
                        <div className="p-4">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Secondary Skills Management</h5>
                            <Button
                              label="Add New Skill"
                              icon="pi pi-plus"
                              onClick={addNewSecondarySkill}
                              className="p-button-success"
                            />
                          </div>

                          <DataTable
                            value={secondarySkillsData}
                            paginator
                            rows={10}
                            dataKey="id"
                            emptyMessage="No secondary skills data found."
                          >
                            <Column 
                              field="value" 
                              header="Skill Name" 
                              sortable 
                            />
                            <Column 
                              field="description" 
                              header="Description" 
                              sortable 
                              style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            />
                            <Column 
                              field="type" 
                              header="Type" 
                              sortable 
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div>
                                  {editSecondarySkillIcon(rowData)}
                                  {deleteSecondarySkillIcon(rowData)}
                                </div>
                              )}
                            />
                          </DataTable>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* Secondary Skills Edit Dialog */}
                    <Dialog
                      header={isEditingSecondarySkill ? "Edit Secondary Skill" : "Add New Secondary Skill"}
                      visible={isSecondarySkillsEditDialogVisible}
                      onHide={handleCancelSecondarySkill}
                      style={{ width: "30vw", minWidth: "500px" }}
                      modal={true}
                      footer={
                        <div>
                          <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={handleCancelSecondarySkill}
                            className="p-button-text"
                          />
                          <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={handleSaveSecondarySkill}
                            autoFocus
                          />
                        </div>
                      }
                    >
                      <div className="p-fluid">
                        <Row className="mb-3">
                          <Col xl={12}>
                            <label htmlFor="secondarySkill" className="block mb-2">Skill Name</label>
                            <InputText
                              id="secondarySkill"
                              value={currentSecondarySkill.value}
                              onChange={e =>
                                setCurrentSecondarySkill({
                                  ...currentSecondarySkill,
                                  value: e.target.value,
                                })
                              }
                              className="w-full"
                              style={{ padding: "12px", fontSize: "14px" }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col xl={12}>
                            <label htmlFor="secondarySkillDescription" className="block mb-2">Description</label>
                            <InputText
                              id="secondarySkillDescription"
                              value={currentSecondarySkill.description}
                              onChange={e =>
                                setCurrentSecondarySkill({
                                  ...currentSecondarySkill,
                                  description: e.target.value,
                                })
                              }
                              className="w-full"
                              style={{ padding: "12px", fontSize: "14px" }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col xl={12}>
                            <label htmlFor="secondarySkillType" className="block mb-2">Type</label>
                            <Dropdown
                              id="secondarySkillType"
                              value={currentSecondarySkill.type}
                              onChange={e =>
                                setCurrentSecondarySkill({
                                  ...currentSecondarySkill,
                                  type: e.value,
                                })
                              }
                              options={secondarySkillsAccordionOptions}
                              placeholder="Select Type"
                              className="bgclr w-full"
                              style={{ padding: "8px", fontSize: "14px" }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Dialog>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Reporting Manager">
                        <div className="p-0">
                         

                          <DataTable
                            value={reportingManagerData}
                            paginator
                            rows={10}
                            dataKey="id"
                            emptyMessage="No reporting manager data found."
                          >
                            <Column 
                              field="value" 
                              header="Manager Name" 
                              sortable 
                            />
                            <Column 
                              field="description" 
                              header="Description" 
                              sortable 
                            />
                            <Column 
                              field="type" 
                              header="Type" 
                              sortable 
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div>
                                  {editReportingManagerIcon(rowData)}
                                  {deleteReportingManagerIcon(rowData)}
                                </div>
                              )}
                            />
                          </DataTable>
                           <div className="d-flex justify-content-end align-items-center mb-3 mt-1">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewReportingManager}
                              className="p-button-success"
                            />
                          </div>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* Reporting Manager Edit Dialog */}
                    <Dialog
                      header={isEditingReportingManager ? "Edit Reporting Manager" : "Add New Reporting Manager"}
                      visible={isReportingManagerEditDialogVisible}
                      onHide={handleCancelReportingManager}
                      footer={
                        <div>
                          <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={handleCancelReportingManager}
                            className="p-button-text"
                          />
                          <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={handleSaveReportingManager}
                            autoFocus
                          />
                        </div>
                      }
                    >
                      <div className="p-fluid">
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="reportingManager" className="block">Manager Name</label>
                            <InputText
                              id="reportingManager"
                              value={currentReportingManager.value}
                              onChange={e =>
                                setCurrentReportingManager({
                                  ...currentReportingManager,
                                  value: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="reportingManagerDescription" className="block">Description</label>
                            <InputText
                              id="reportingManagerDescription"
                              value={currentReportingManager.description}
                              onChange={e =>
                                setCurrentReportingManager({
                                  ...currentReportingManager,
                                  description: e.target.value,
                                })
                              }
                              className="w-full"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col xl={12}>
                            <label htmlFor="reportingManagerType" className="block">Type</label>
                            <Dropdown
                              id="reportingManagerType"
                              value={currentReportingManager.type}
                              onChange={e =>
                                setCurrentReportingManager({
                                  ...currentReportingManager,
                                  type: e.value,
                                })
                              }
                              options={reportingManagerAccordionOptions}
                              placeholder="Select Type"
                              className="bgclr w-full"
                            />
                          </Col>
                        </Row>
                      </div>
                    </Dialog>

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Document Type">
                        <div>
                          {/* Data Table with Pagination */}
                          <DataTable
                            value={docTypeData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />

                            {/* Actions column */}
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editDocTypeIcon(rowData)}
                                  {deleteDocTypeIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            {/* Add new Doc. Type button */}
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewDocType}
                              className="mt-3"
                            />
                          </div>

                          {/* Dialog for adding/editing Doc. Type */}
                          <Dialog
                            header={
                              isEditingDocType
                                ? "Edit Doc. Type"
                                : "Add New Doc. Type"
                            }
                            visible={isDocTypeEditDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelDocType}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentDocType.value}
                                    onChange={e =>
                                      setCurrentDocType(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentDocType.description}
                                    onChange={e =>
                                      setCurrentDocType(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentDocType.type}
                                    options={docTypeOptions}
                                    onChange={e =>
                                      setCurrentDocType(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveDocType}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                  

                    <Accordion
                      className=""
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                    
                    </Accordion>

                 

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Department">
                        <div>
                          <DataTable
                            value={departmentData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editDepartmentIcon(rowData)}
                                  {deleteDepartmentIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewDepartment}
                              className="mt-3"
                            />
                          </div>

                          <Dialog
                            header={
                              isEditingDepartment
                                ? "Edit Department"
                                : "Add Department"
                            }
                            visible={isDepartmentDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelDepartment}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentDepartment.value}
                                    onChange={e =>
                                      setCurrentDepartment(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentDepartment.description}
                                    onChange={e =>
                                      setCurrentDepartment(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentDepartment.type}
                                    options={departmentTypeOptions}
                                    onChange={e =>
                                      setCurrentDepartment(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveDepartment}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                   

                 

                    {/* Industry start */}

                    

                    {/* Company Size */}

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Company Size">
                        <div>
                          <DataTable
                            value={companySizeData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editCompanySizeIcon(rowData)}
                                  {deleteCompanySizeIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewCompanySize}
                              className="mt-3"
                            />
                          </div>

                          <Dialog
                            header={
                              isEditingCompanySize
                                ? "Edit Company Size"
                                : "Add Company Size"
                            }
                            visible={isCompanySizeDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelCompanySize}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentCompanySize.value}
                                    onChange={e =>
                                      setCurrentCompanySize(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentCompanySize.description}
                                    onChange={e =>
                                      setCurrentCompanySize(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentCompanySize.type}
                                    options={companySizeOptions}
                                    onChange={e =>
                                      setCurrentCompanySize(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveCompanySize}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* Schedule Type */}

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Schedule Type">
                        <div>
                          <DataTable
                            value={scheduleTypeData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editScheduleTypeIcon(rowData)}
                                  {deleteScheduleTypeIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewScheduleType}
                              className="mt-3"
                            />
                          </div>

                          <Dialog
                            header={
                              isEditingScheduleType
                                ? "Edit Schedule Type"
                                : "Add Schedule Type"
                            }
                            visible={isScheduleTypeDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelScheduleType}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentScheduleType.value}
                                    onChange={e =>
                                      setCurrentScheduleType(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentScheduleType.description}
                                    onChange={e =>
                                      setCurrentScheduleType(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentScheduleType.type}
                                    options={scheduleTypeOptions}
                                    onChange={e =>
                                      setCurrentScheduleType(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveScheduleType}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* Schudule sub-type */}

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Schedule Sub-type">
                        <div>
                          <DataTable
                            value={scheduleSubTypeData}
                            responsiveLayout="scroll"
                            paginator
                            rows={5}
                          >
                            <Column
                              field="value"
                              header="Value"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="description"
                              header="Description"
                              style={{ width: "30%" }}
                            />
                            <Column
                              field="type"
                              header="Type"
                              style={{ width: "20%" }}
                            />
                            <Column
                              header="Actions"
                              body={rowData => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {editScheduleSubTypeIcon(rowData)}
                                  {deleteScheduleSubTypeIcon(rowData)}
                                </div>
                              )}
                              style={{ width: "10%" }}
                            />
                          </DataTable>

                          <div className="d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              onClick={addNewScheduleSubType}
                              className="mt-3"
                            />
                          </div>

                          <Dialog
                            header={
                              isEditingScheduleSubType
                                ? "Edit Schedule Sub-Type"
                                : "Add Schedule Sub-Type"
                            }
                            visible={isScheduleSubTypeDialogVisible}
                            style={{ width: "30vw" }}
                            onHide={handleCancelScheduleSubType}
                          >
                            <div>
                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="value" className="block">
                                    Value
                                  </label>
                                  <InputText
                                    id="value"
                                    value={currentScheduleSubType.value}
                                    onChange={e =>
                                      setCurrentScheduleSubType(prev => ({
                                        ...prev,
                                        value: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label
                                    htmlFor="description"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputText
                                    id="description"
                                    value={currentScheduleSubType.description}
                                    onChange={e =>
                                      setCurrentScheduleSubType(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col xl={12}>
                                  <label htmlFor="type" className="block">
                                    Type
                                  </label>
                                  <Dropdown
                                    id="type"
                                    value={currentScheduleSubType.type}
                                    options={scheduleSubTypeOptions}
                                    onChange={e =>
                                      setCurrentScheduleSubType(prev => ({
                                        ...prev,
                                        type: e.value,
                                      }))
                                    }
                                    placeholder="Select Type"
                                    className="bgclr w-full"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main me-2"
                                      onClick={handleSaveScheduleSubType}
                                    >
                                      <i className="pi pi-check me-1"></i> Ok
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Dialog>
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* categories start */}
                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Categories">
                        <div className="max-w-2xl mx-auto">
                          <div className="mb-4 d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              className="p-button"
                              onClick={() => createNode()}
                            />
                          </div>
                          <div className="border rounded-lg p-4 bg-white">
                            {nodes.map(node => (
                              <RenderNode key={node.key} node={node} />
                            ))}
                          </div>
                          {nodes.length > 0 && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h3 className="font-semibold mb-2">
                                View the Category Component:
                              </h3>
                              <TreeSelect
                                value={selectedNodeKey}
                                options={nodes}
                                onChange={e => setSelectedNodeKey(e.value)}
                                placeholder="Select a node"
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>
                      </AccordionTab>
                    </Accordion>
                    {/* categories end */}

                    {/* Groups start */}

                    <Accordion
                      className="mt-3"
                      multiple={false}
                      style={{ width: "100%" }}
                    >
                      <AccordionTab header="Groups">
                        <div className="max-w-2xl mx-auto">
                          <div className="mb-4 d-flex justify-content-end">
                            <Button
                              label="Add More"
                              icon="pi pi-plus"
                              className="p-button"
                              onClick={() => createCategory()}
                            />
                          </div>
                          <div className="border rounded-lg p-4 bg-white">
                            {categoryNodes.map(category => (
                              <RenderCategory
                                key={category.key}
                                category={category}
                              />
                            ))}
                          </div>
                          {categoryNodes.length > 0 && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h3 className="font-semibold mb-2">
                                View the Group Component:
                              </h3>
                              <TreeSelect
                                value={selectedCategoryKey}
                                options={categoryNodes}
                                onChange={e => setSelectedCategoryKey(e.value)}
                                placeholder="Select a category"
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>
                      </AccordionTab>
                    </Accordion>

                    {/* Groups start */}
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* My account  */}

            <TabPanel header="My Account" leftIcon="pi pi-user mr-2">
              <div className="container-fluid">
                {showAlert.show && (
                  <div
                    className={`alert ${showAlert.type === "error"
                      ? "alert-error"
                      : "alert-success"
                      }`}
                  >
                    {showAlert.message}
                  </div>
                )}
                <div className="profile-preview-container">
                  <PasswordDialog />
                  <PhotoDialog />

                  {/* Profile Header */}
                  <div className="profile-header">
                    <div className="profile-header-content">
                      <div className="profile-image-container">
                        <img
                          src={profileData.profilePicture}
                          alt="Profile"
                          className="profile-image"
                        />
                        <button
                          onClick={() => setShowPhotoDialog(true)}
                          className="change-photo-btn"
                        >
                          <i className="pi pi-pencil"></i>
                        </button>
                      </div>
                      <div>
                        <h1 className="profile-name">{profileData.name}</h1>
                        <p className="profile-role">{profileData.developer}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="tabs">
                    <button
                      onClick={() => setActiveTab(0)}
                      className={`tab-btn ${activeTab === 0 ? "active-tab" : ""
                        }`}
                    >
                      Profile Information
                    </button>
                  </div>

                  {/* Profile Content */}
                  <div className="profile-content">
                    <div className="profile-grid">
                      {/* Left Column */}
                      <div className="left-column">
                        <div className="mb-3">
                          <label>Name</label>
                          <input
                            type="text"
                            value={profileData.name}
                            disabled
                            className="profile-input"
                          />
                        </div>
                        <div className="mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            value={profileData.email}
                            disabled
                            className="profile-input"
                          />
                        </div>
                        <div className="mb-3">
                          <label>Mobile Number</label>
                          <input
                            type="tel"
                            value={profileData.mobile}
                            disabled
                            className="profile-input"
                          />
                        </div>

                        <div className="mb-3">
                          <label>Change Password</label>
                          <div className="password-container">
                            <input
                              type={showPasswordInput ? "text" : "password"}
                              value={
                                isEditingPassword
                                  ? newPasswordValue
                                  : "********"
                              } // Show actual password only in edit mode
                              disabled={!isEditingPassword}
                              className="profile-input"
                              onChange={e =>
                                setNewPasswordValue(e.target.value)
                              }
                            />
                            <button
                              onClick={handlePasswordEditToggle}
                              className="change-btn"
                            >
                              <i
                                className={`pi ${isEditingPassword ? "pi-check" : "pi-pencil"
                                  }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="right-column">
                        <div className="mb-3">
                          <label>Username</label>
                          <input
                            type="text"
                            value={profileData.username}
                            disabled
                            className="profile-input"
                          />
                        </div>
                        <div className="mb-3">
                          <label>Roles and Permission</label>
                          <input
                            type="text"
                            value={profileData.role}
                            disabled
                            className="profile-input"
                          />
                        </div>
                        <div className="mb-3">
                          <label>Linked Contact</label>
                          <input
                            type="text"
                            value={profileData.linkedContact}
                            disabled
                            className="profile-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default AdminDashboard;
