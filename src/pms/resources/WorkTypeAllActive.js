import React, { useState, useRef, useEffect, useMemo } from "react"
import {
  Col,
  Container,
  Row,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { ContextMenu } from "primereact/contextmenu"
import { TabView, TabPanel } from "primereact/tabview"
import { Dropdown } from "primereact/dropdown"
import { useNavigate, Link } from "react-router-dom"
import { FilterMatchMode } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { Dialog } from "primereact/dialog"
import Modal from "react-bootstrap/Modal"
import { Calendar } from "primereact/calendar"
import { Checkbox } from "primereact/checkbox"
import { InputTextarea } from "primereact/inputtextarea"
import { Chips } from "primereact/chips"
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { ChevronRightIcon } from "primereact/icons/chevronright"
import { TreeSelect } from "primereact/treeselect"
import axios from "axios"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Badge } from "primereact/badge"
import { TreeTable } from "primereact/treetable"
import { Sidebar } from "primereact/sidebar"
import moment from "moment"
import { MultiSelect } from "primereact/multiselect"
import { Tooltip } from "primereact/tooltip"
import { FileUpload } from "primereact/fileupload"
import { Editor } from "primereact/editor"
import LinkJobs from "./LinkJobs"
import { Card } from "primereact/card"
import { CascadeSelect } from "primereact/cascadeselect"
// import { Tooltip } from 'primereact/tooltip';
import { Toast } from "primereact/toast"

import Notes from "../common-for-all/Notes"
import NotesCandidate from "../common-for-all/NotesWorkType"
import Select from "react-select"

import EmailAC from "./EmailAC"
import LinkContactsPopup from "pms/common-for-all/LinkContactsPopup"
import LinkContact2Popup from "pms/common-for-all/LinkContact2Popup"
import { useSelector } from "react-redux"
import TalentScan from "./TalentScan"
import WorkType1 from "pms/common-for-all/WorkTypeOne"
import WorkType from "../common-for-all/WorkType"
// import ProjectOverview from '../../features/projects/components/ProjectOverview';
import AddProjectDetails from "pms/common-for-all/AddProjectDetails"

import LinkJobsPopup from "pms/common-for-all/LinkWorkTypePopup"

const WorkTypeAllActive = ({ workTypes }) => {
  const Type = workTypes
  console.log(Type, "kdsfhbdhb");

  const [parentComponent, setParentComponent] = useState(false)

  const { first, rows } = useSelector(state => state.calendar.pagination)

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU3VwZXJ1c2VyIFJvbGUiXSwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3JvbGVzIiwibWFuYWdlX3Blcm1pc3Npb25zIiwibWFuYWdlX3JvbGVfdG9fZW1wbG95ZWUiXSwiZXhwIjoxNzM3MDIwOTEwLCJpYXQiOjE3MzQ0Mjg5MTB9.E8kanEh13Hf17sceMHgLvcl2SCpn7Bj5XvU5BdnSFV8`

  // Available columns for the WorkType DataTable (Footer integration)
  const availableColumns = [
    { field: 'task_code', header: 'Work Type Code', minWidth: '10rem', },
    { field: 'task_type', header: 'Work Type', minWidth: '12rem' },
    { field: 'project_name', header: 'Project Name', minWidth: '12rem' },
    { field: 'module_name', header: 'Module Name', minWidth: '12rem' },
    { field: 'task_name', header: 'Summary', minWidth: '12rem' },
    { field: 'created_by', header: 'Created By', minWidth: '10rem' },
    { field: 'assigned_by', header: 'Assigned By', minWidth: '10rem' },
    { field: 'assigned_to', header: 'Assigned To', minWidth: '10rem' },
    { field: 'project_manager', header: 'Project Manager', minWidth: '12rem' },
    { field: 'watchers', header: 'Watchers', minWidth: '10rem' },
    { field: 'start_date', header: 'Start Date', minWidth: '10rem' },
    { field: 'work_hours', header: 'Work Hours (in hours)', minWidth: '14rem' },
    { field: 'end_date', header: 'End Date', minWidth: '10rem' },
    { field: 'actual_end_date', header: 'Actual End Date', minWidth: '12rem' },
    { field: 'task_status', header: 'Status', minWidth: '10rem' },
    { field: 'priority', header: 'Priority', minWidth: '10rem' },
    { field: 'approval_status', header: 'Approval Status', minWidth: '12rem' }
  ]

  // State for visible columns - check localStorage first, then use defaults
  const [footerVisibleColumns, setFooterVisibleColumns] = useState(() => {
    const savedColumns = localStorage.getItem('workTypeSelectedColumns')
    if (savedColumns) {
      try {
        return JSON.parse(savedColumns)
      } catch (error) {
        console.error('Error parsing saved columns:', error)
      }
    }
    // Default columns if no saved data
    return [
      'task_code',
      'task_type', 
      'project_name',
      'task_name',
      'assigned_to',
      'task_status',
      'priority'
    ]
  })

  // Listen for column updates from Footer component
  useEffect(() => {
    const handleColumnUpdate = (event) => {
      if (event.detail && event.detail.type === 'COLUMN_SELECTION') {
        setFooterVisibleColumns(event.detail.selectedColumns)
        console.log('WorkTypeAllActive received column update:', event.detail.selectedColumns)
      } else if (event.detail && event.detail.type === 'COLUMN_RESET') {
        setFooterVisibleColumns(event.detail.selectedColumns)
        console.log('WorkTypeAllActive received column reset:', event.detail.selectedColumns)
      } else if (event.detail && event.detail.type === 'COLUMN_LOAD') {
        setFooterVisibleColumns(event.detail.selectedColumns)
        console.log('WorkTypeAllActive received column load:', event.detail.selectedColumns)
      }
    }

    window.addEventListener('footerColumnUpdate', handleColumnUpdate)
    
    return () => {
      window.removeEventListener('footerColumnUpdate', handleColumnUpdate)
    }
  }, [])

  // Also listen for localStorage changes (in case of multiple tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'workTypeSelectedColumns' && e.newValue) {
        try {
          const newColumns = JSON.parse(e.newValue)
          setFooterVisibleColumns(newColumns)
          console.log('WorkTypeAllActive received storage change:', newColumns)
        } catch (error) {
          console.error('Error parsing storage change:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // sms
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

  // more

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
  // action items

  document.title = "PMS | React Admin & Dashboard Template"

  const dt = useRef(null)

  const [smShow, setSmShow] = useState(false)

  const condidatelist = e => {
    // Set the value based on checkbox
    setcondidatevalu(e.value)
  }

  const [successAlertinter, setsuccessAlertinter] = useState(false)
  const [relocation, setRelocation] = useState(null)
  const [visibleRight, setVisibleRight] = useState(false)

  // helper to open create form and clear fields
  const showCreateForm = () => {
    setTaskcode("")
    setTaskname("")
    setTaskdesc("")
    setTaskassigned("")
    setVisibleRight(true)
  }
  const [visibleViewRight, setVisibleViewRight] = useState(false)

  const [activeTabIndex, setActiveTabIndex] = useState(0);


  // dynamic task or bug information start

  //   const handleViewClick = (rowData) => {
  //   let type = "";
  //   if (rowData.task_code && rowData.task_code.startsWith("TASK")) {
  //     type = "task";
  //   } else if (rowData.task_code && rowData.task_code.startsWith("BUG")) {
  //     type = "bug";
  //   }
  //   setViewType(type);
  //   setViewRowData(rowData);
  //   setViewSidebarVisible(true);
  // };



  // dynamic task or bug information start



  {
    /* Side bar end */
  }

  const getAllActive = async (page, size) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token
          },
          params: {
            page: page + 1, // Adjust for API (assuming 1-based index)
            size,
          },
        }
      )
      // alert(response.data)
      //
      if (response.data) {
        setFilteredAdminstation(response.data.results || [])
        setTotalRecords(response.data.count || 0)
      } else {
        setFilteredAdminstation([])
        setTotalRecords(0)
      }
      const transformedData = response.data.results.map(cond => ({
        name: cond.first_name,
        id: cond.candidate_id,
      }))
      settypeInterviewcondi(transformedData)
    } catch (error) { }
  }

  useEffect(() => {
    getAllActive(pageState.page, pageState.rows)
    getcategoriesitem()
    getgroupsitem()
  }, [])
  const [deleteRowId, setDeleteRowID] = useState(null) // end date value

  const textEditor = options => {
    return (
      <InputText
        value={options.value}
        onChange={e => options.editorCallback(e.target.value)}
      />
    )
  }

  const [categoriesitem, setcategoriesitem] = useState([])
  const [groupitem, setgroupitem] = useState([])

  const [HaveImagePan, setHaveImagePan] = useState(false)
  const [PoliciesfilesErrorMessagepan, setPoliciesfilesErrorMessagepan] =
    useState()

  const [selectedNodeKey, setSelectedNodeKey] = useState(null)
  const [selectedgroupKey, setselectedgroupKey] = useState(null)
  // Function to convert flat data to hierarchical structure
  const buildTree = data => {
    const map = {}
    const tree = []

    data.forEach(item => {
      map[item.category_id] = {
        ...item,
        key: item.category_id,
        label: item.name,
        children: [],
      }
    })

    data.forEach(item => {
      if (item.parent_category) {
        if (map[item.parent_category]) {
          map[item.parent_category].children.push(map[item.category_id])
        }
      } else {
        tree.push(map[item.category_id])
      }
    })

    return tree
  }

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

      if (response.data && response.data.results) {
        const treeData = buildTree(response.data.results)
        setcategoriesitem(treeData)
      }
    } catch (error) { }
  }

  const onSubmit = async data => {
    const formData = new FormData()

    formData.append("first_name", data.firstname)
    formData.append("last_name", data.lastname)
    formData.append("job_title", data.jobtitle)
    formData.append("email", data.personal_email)
    formData.append("mobile_phone", data.phone)
    formData.append("categories", selectedNodeKey)

    formData.append("groups", selectedgroupKey)
    formData.append("current_company", data.Company)
    formData.append("availability_date", data.Availability)

    formData.append("primary_skills", primarySkills)
    formData.append("relocation", data.relocation ? "true" : "false")
    if (HaveImagePan) {
      formData.append("resume", data.panphoto[0])
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      getAllActive(pageState.page, pageState.rows)
      setVisibleRight(false)
    } catch (error) { }
  }
  const onSubmitinterview = async data => {
    let req = {}

    if (!subtype) {
      alert("select type")
      return false
    }
    if (!subjectval) {
      alert("select type subjectval")
      return false
    }
    if (subtype) {
      req.event_sub_type = subtype
    }

    if (intertype) {
      req.event_type = intertype
    }

    if (enddate) {
      req.end_date = moment(enddate).format("YYYY-MM-DD")
    }
    if (startdate) {
      req.start_date = moment(startdate).format("YYYY-MM-DD")
    }
    if (starttime) {
      req.start_time = moment(starttime).format("HH:mm:ss")
    }
    if (endtime) {
      req.end_time = moment(endtime).format("HH:mm:ss")
    }
    // if (condidatevalu) {
    //   req.candidate_id = condidatevalu.id;
    // }
    if (condidatevalu && condidatevalu.length > 0) {
      req.candidate_ids = condidatevalu.map(candidate => candidate.email)
    } else {
      alert("Please select at least one candidate")
      return false
    }
    if (subjectval) {
      req.subject = subjectval
    }
    if (prioritycontact) {
      req.contact_id = prioritycontact.id
    }
    if (subtypeget) {
      req.job_id = subtypeget.id
    }
    if (repeat) {
      req.repeat = repeat
    }
    if (followup) {
      req.auto_followup = followup
    }
    if (reminder) {
      req.reminder = reminder
    }

    req.event_time = "2024-12-03T00:30:00Z"

    req.created_by = 1
    req.event_priority = "High"

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_Calendar}/api/v1/events/`,
        req,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      SetInterviewpop(false)

      setsuccessAlertinter(true)
      setSelectedCustomers([])
      setselectedEmployees(0)
    } catch (error) { }
  }

  const deleteHandler = async () => {
    let id = deleteRowId
    await axios
      .delete(`${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/${id}/`)
      .then(resp => {
        setSmShow(false)
        getAllActive(pageState.page, pageState.rows)
        setSuccessAlert(true)
      })
      .catch(error => { })
  }

  const getCandidateIds = () => {
    const selectedIds = selectedCustomers.map(
      candidate => candidate.candidate_id
    )
    setDeleteRowID(selectedIds)
    setSmShow(true)
  }

  const buildTreegroup = data => {
    const map = {}
    const tree = []

    data.forEach(item => {
      map[item.group_id] = {
        ...item,
        key: item.group_id,
        label: item.name,
        children: [],
      }
    })

    data.forEach(item => {
      if (item.parent_groups) {
        if (map[item.parent_groups]) {
          map[item.parent_groups].children.push(map[item.group_id])
        }
      } else {
        tree.push(map[item.group_id])
      }
    })

    return tree
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
      if (response.data && response.data.results) {
        const treeData = buildTreegroup(response.data.results)
        setgroupitem(treeData)
      }
    } catch (error) { }
  }
  const [selectedRow, setSelectedRow] = useState(null)
  const contextMenu = useRef(null)
  const editRow = rowData => {
    alert(`Edit: ${rowData.name}`)
  }

  const deleteRow = rowData => {
    setData(data.filter(row => row.id !== rowData.id))
    alert(`Deleted: ${rowData.name}`)
  }

  const viewRowDetails = rowData => {
    alert(`Details of: ${rowData.name}`)
  }
  const menuItems = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => editRow(selectedRow),
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => deleteRow(selectedRow),
    },
    {
      label: "View Details",
      icon: "pi pi-search",
      command: () => viewRowDetails(selectedRow),
    },
  ]

  // const [selectedCity, setSelectedCity] = useState(null)

  const [primarySkills, setPrimarySkills] = useState(null)

  // interview

  const [primarySkillsvalu, setprimarySkillsvalu] = useState([])
  
  // Private functionality
  const [privateDrop, setPrivateDrop] = useState([])
  
  const PrivetDropdownValues = [
    { name: "Harish", value: "Harish" },
    { name: "Mahesh", value: "Mahesh" },
    { name: "Lavan", value: "Lavan" },
    { name: "Vinay", value: "Vinay" },
    { name: "Vasanth", value: "Vasanth" }
  ]
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
  const [fullName, setFullName] = useState("Lavankumar Kalvala")
  const [jobTitle, setJobTitle] = useState("Frontend Developer")
  const [company, setCompany] = useState("Infosys Limited")
  const [userIds, setUserIds] = useState("Harish")
  const [availabilityDate1, setavailabilityDate1] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("9876543211")
  const [workEmail, setWorkEmail] = useState("lavan9@infosys.com")
  const [editingRow, setEditingRow] = useState(null)
  const [editedValue, setEditedValue] = useState({})
  const [documents, setDocuments] = useState([
    {
      key: "1",
      data: {
        id: "1",
        certificate_name: "Creative Strategy Blueprint",
        docSubject: "Proposal Document",
        created_at: "2023-10-01 10:30 AM",
      },
    },
    {
      key: "2",
      data: {
        id: "2",
        certificate_name: "Neural Systems Brief",
        docSubject: "Technical Overview",
        created_at: "2023-10-02 02:15 PM",
      },
    },
  ])

  // Start editing a row
  const handleEdit = rowKey => {
    setEditingRow(rowKey)
    setEditedValue(documents.find(doc => doc.key === rowKey)?.data || {})
  }

  // Save the edited data
  const handleSave = () => {
    setDocuments(prevDocuments =>
      prevDocuments.map(doc =>
        doc.key === editingRow ? { ...doc, data: editedValue } : doc
      )
    )
    setEditingRow(null)
  }

  // Cancel editing
  const handleCancel = () => {
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
          <>
            <Button
              icon="pi pi-check"
              rounded
              outlined
              className="document-btn"
              onClick={handleSave}
            />
            <Button
              icon="pi pi-times"
              rounded
              outlined
              className="document-btn"
              onClick={handleCancel}
            />
          </>
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

  // datatable

  // const [filters, setFilters] = useState({
  //   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //   id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Firstname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Lastname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   JobTitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   MobilePhone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Yearsofexperience: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   City: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   AvailabilityDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Relocation: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Categories: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   Groups: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   ResumeAttachment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   PrimarySkills: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   CreatedBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   EditDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   CreateDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // })

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    project_manager: { value: null, matchMode: FilterMatchMode.CONTAINS },
    module_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
    assigned_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
    assigned_to: { value: null, matchMode: FilterMatchMode.CONTAINS },
    watchers: { value: null, matchMode: FilterMatchMode.CONTAINS },
    start_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    work_hours: { value: null, matchMode: FilterMatchMode.EQUALS },
    end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    actual_end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_status: { value: null, matchMode: FilterMatchMode.EQUALS },
    priority: { value: null, matchMode: FilterMatchMode.EQUALS },
    approval_status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [loading, setLoading] = useState(false)
  const [globalFilterValue, setGlobalFilterValue] = useState("")

  const [pageState, setPageState] = useState({ first: 0, rows: 10 })
  const [balanceFrozen, setBalanceFrozen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [size, setSize] = useState("normal")

  const [candidateData, setCandidateData] = useState([
    {
      id: 1,
      Firstname: "Lavankumar",
      Lastname: "Kalvala",
      Company: "Infosys Limited",
      JobTitle: "Frontend Developer",
      PrimarySkills: "JavaScript, React",
      Email: "lavan9@infosys.com",
      MobilePhone: "9876543211",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "20-02-2025",
      ResumeAttachment: "Lavankumar-1.pdf",
      Categories: "Frontend",
      Groups: "React",
      CreateDate: "18-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "2",
    },
    {
      id: 2,
      Firstname: "Venkata Laxmi",
      Lastname: "Valle",
      Company: "Cognizant PVT LTD",
      JobTitle: "Frontend Developer",
      PrimarySkills: "JavaScript, React",
      Email: "venkatalaxmi9@cognizant.com",
      MobilePhone: "9876543210",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "20-02-2025",
      ResumeAttachment: "Venkata-1.pdf",
      Categories: "Frontend",
      Groups: "React",
      CreateDate: "18-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "2",
    },
    {
      id: 3,
      Firstname: "Bhargavi",
      Lastname: "Sunanda",
      Company: "Capgemini Limited",
      JobTitle: "SEO",
      PrimarySkills: "On Page SEO, Off Page SEO",
      Email: "bhargavi9@capgemini.com",
      MobilePhone: "9873216550",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "01-12-2024",
      ResumeAttachment: "Bhargavi-1.pdf",
      Categories: "SEO",
      Groups: "On Page SEO",
      CreateDate: "01-10-2025",
      EditDate: "18-11-2025",
      CreatedBy: "Bhavani",
      Yearsofexperience: "3",
    },
    {
      id: 4,
      Firstname: "Nagendra",
      Lastname: "Meriga",
      Company: "CA Technologies",
      JobTitle: "Content Writer",
      PrimarySkills: "Blog Writing, Article Writing",
      Email: "nagendra9@catechnologies.com",
      MobilePhone: "9876543219",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "04-02-2025",
      ResumeAttachment: "Nagendra-1.pdf",
      Categories: "Content Writing",
      Groups: "Blog Writing",
      CreateDate: "01-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "10",
    },
    {
      id: 5,
      Firstname: "Saikumar",
      Lastname: "Kunda",
      Company: "L&T Mindtree",
      JobTitle: "Backend",
      PrimarySkills: "Python, Flask",
      Email: "Saikumar9@l&tmindtre.com",
      MobilePhone: "9876543217",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "04-02-2025",
      ResumeAttachment: "Saikumar-1.pdf",
      Categories: "Backend Developer",
      Groups: "Python",
      CreateDate: "01-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Bhavani",
      Yearsofexperience: "5",
    },
    {
      id: 6,
      Firstname: "Vasanth",
      Lastname: "Gudula",
      Company: "Ram Software Services",
      JobTitle: "Data Scientist",
      PrimarySkills: "Deep Learning, Machine Learning",
      Email: "Vasanth9@Ramss.com",
      MobilePhone: "9876543218",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "04-02-2025",
      ResumeAttachment: "Vasanth-1.pdf",
      Categories: "AI ML",
      Groups: "Machine Learning",
      CreateDate: "01-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "2",
    },
    {
      id: 7,
      Firstname: "Ajay",
      Lastname: "Edavena",
      Company: "Citel Global Communication",
      JobTitle: "Web Developer",
      PrimarySkills: "HTML, JavaScript",
      Email: "Ajay9@citelglobal.com",
      MobilePhone: "9876543214",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "18-02-2025",
      ResumeAttachment: "Ajay-1.pdf",
      Categories: "UI/UX",
      Groups: "Web Development",
      CreateDate: "10-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "6",
    },
    {
      id: 8,
      Firstname: "Ruchitha",
      Lastname: "Emmadi",
      Company: "Tarun Digital Media",
      JobTitle: "Frontend Developer",
      PrimarySkills: "JavaScript, React",
      Email: "ruchitha9@tarundigitalmedia.com",
      MobilePhone: "9876543212",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "18-02-2025",
      ResumeAttachment: "Ruchitha-1.pdf",
      Categories: "Frontend",
      Groups: "React",
      CreateDate: "16-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Bhavani",
      Yearsofexperience: "1.5",
    },
    {
      id: 9,
      Firstname: "Chandana",
      Lastname: "Modugula",
      Company: "Sai Digital Media",
      JobTitle: "Frontend Developer",
      PrimarySkills: "HTML, React",
      Email: "chandana9@Saidigitalmedia.com",
      MobilePhone: "9876543213",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "18-02-2025",
      ResumeAttachment: "chandana-1.pdf",
      Categories: "Frontend",
      Groups: "React",
      CreateDate: "16-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Giri",
      Yearsofexperience: "1.4",
    },
    {
      id: 10,
      Firstname: "RajaShekar",
      Lastname: "Konda",
      Company: "Mahesh Digital Media",
      JobTitle: "Graphic Designer",
      PrimarySkills: "Photoshop, Canva",
      Email: "RajaShekar9@maheshdigitalmedia.com",
      MobilePhone: "9876543215",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "10-02-2025",
      ResumeAttachment: "RajaShekar-1.pdf",
      Categories: "UI/UX",
      Groups: "Designing",
      CreateDate: "05-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Sai Krishna",
      Yearsofexperience: "3",
    },

    {
      id: 11,
      Firstname: "Sandeep",
      Lastname: "Reddy",
      Company: "Tech Mahindra",
      JobTitle: "Software Engineer",
      PrimarySkills: "Java, Spring Boot",
      Email: "sandeep9@techmahindra.com",
      MobilePhone: "9876543216",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "15-03-2025",
      ResumeAttachment: "Sandeep-1.pdf",
      Categories: "Backend Developer",
      Groups: "Java",
      CreateDate: "20-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "4",
    },
    {
      id: 12,
      Firstname: "Nikhil",
      Lastname: "Varma",
      Company: "TCS",
      JobTitle: "Data Analyst",
      PrimarySkills: "SQL, Power BI",
      Email: "nikhil9@tcs.com",
      MobilePhone: "9876543220",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "10-03-2025",
      ResumeAttachment: "Nikhil-1.pdf",
      Categories: "Data Analysis",
      Groups: "SQL",
      CreateDate: "18-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Bhavani",
      Yearsofexperience: "2",
    },
    {
      id: 13,
      Firstname: "Meghana",
      Lastname: "Rao",
      Company: "IBM",
      JobTitle: "Cloud Engineer",
      PrimarySkills: "AWS, Kubernetes",
      Email: "meghana9@ibm.com",
      MobilePhone: "9876543221",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "01-04-2025",
      ResumeAttachment: "Meghana-1.pdf",
      Categories: "Cloud Computing",
      Groups: "AWS",
      CreateDate: "22-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Giri",
      Yearsofexperience: "3",
    },
    {
      id: 14,
      Firstname: "Praveen",
      Lastname: "Kumar",
      Company: "Accenture",
      JobTitle: "Business Analyst",
      PrimarySkills: "JIRA, Confluence",
      Email: "praveen9@accenture.com",
      MobilePhone: "9876543222",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "05-03-2025",
      ResumeAttachment: "Praveen-1.pdf",
      Categories: "Business Analysis",
      Groups: "JIRA",
      CreateDate: "25-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Sai Krishna",
      Yearsofexperience: "5",
    },
    {
      id: 15,
      Firstname: "Anjali",
      Lastname: "Sharma",
      Company: "HCL Technologies",
      JobTitle: "QA Engineer",
      PrimarySkills: "Selenium, JUnit",
      Email: "anjali9@hcl.com",
      MobilePhone: "9876543223",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "20-03-2025",
      ResumeAttachment: "Anjali-1.pdf",
      Categories: "Testing",
      Groups: "Automation",
      CreateDate: "27-02-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "4",
    },
    {
      id: 16,
      Firstname: "Rajesh",
      Lastname: "Naidu",
      Company: "Wipro",
      JobTitle: "DevOps Engineer",
      PrimarySkills: "Docker, Jenkins",
      Email: "rajesh9@wipro.com",
      MobilePhone: "9876543224",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "10-04-2025",
      ResumeAttachment: "Rajesh-1.pdf",
      Categories: "DevOps",
      Groups: "CI/CD",
      CreateDate: "01-03-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Bhavani",
      Yearsofexperience: "6",
    },
    {
      id: 17,
      Firstname: "Swathi",
      Lastname: "Joshi",
      Company: "Amazon",
      JobTitle: "AI Engineer",
      PrimarySkills: "Python, TensorFlow",
      Email: "swathi9@amazon.com",
      MobilePhone: "9876543225",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "05-04-2025",
      ResumeAttachment: "Swathi-1.pdf",
      Categories: "AI ML",
      Groups: "Deep Learning",
      CreateDate: "03-03-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "3",
    },
    {
      id: 18,
      Firstname: "Varun",
      Lastname: "Chakravarthy",
      Company: "Flipkart",
      JobTitle: "Cybersecurity Analyst",
      PrimarySkills: "Ethical Hacking, Penetration Testing",
      Email: "varun9@flipkart.com",
      MobilePhone: "9876543226",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "15-04-2025",
      ResumeAttachment: "Varun-1.pdf",
      Categories: "Cybersecurity",
      Groups: "Security",
      CreateDate: "05-03-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Sai Krishna",
      Yearsofexperience: "4",
    },
    {
      id: 19,
      Firstname: "Priya",
      Lastname: "Deshmukh",
      Company: "Google",
      JobTitle: "Full Stack Developer",
      PrimarySkills: "React, Node.js",
      Email: "priya9@google.com",
      MobilePhone: "9876543227",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "01-05-2025",
      ResumeAttachment: "Priya-1.pdf",
      Categories: "Full Stack Development",
      Groups: "React",
      CreateDate: "07-03-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Harish",
      Yearsofexperience: "5",
    },
    {
      id: 20,
      Firstname: "Srinivas",
      Lastname: "Palle",
      Company: "Microsoft",
      JobTitle: "System Administrator",
      PrimarySkills: "Windows Server, Linux Administration",
      Email: "srinivas9@microsoft.com",
      MobilePhone: "9876543228",
      City: "Hyderabad",
      Status: "Active",
      EmployeeType: "Full-Time",
      Relocation: "Yes",
      AvailabilityDate: "10-05-2025",
      ResumeAttachment: "Srinivas-1.pdf",
      Categories: "IT Support",
      Groups: "SysAdmin",
      CreateDate: "09-03-2025",
      EditDate: "28-02-2025",
      CreatedBy: "Giri",
      Yearsofexperience: "7",
    },
  ])
  const [selectedCustomers, setSelectedCustomers] = useState([])

  const [customers, setCustomers] = useState([])

  // useEffect(() => {
  //     setCustomers(sampleData);
  // }, []);
  const onGlobalFilterChange = e => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters["global"].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }
  const onSelectionChange = e => {
    setSelectedCustomers(e.value)
  }
  const onPage = e => {
    setPageState({
      first: e.first,
      rows: e.rows,
    })
  }
  const onRowReorder = e => {
    setCustomers(e.value)
  }

  // context menu starts
  const [selectedCandidate, setSelectedCandidate] = useState(null) // State to track the right-clicked candidate

  const cm = useRef(null) // Reference for ContextMenu

  // Context menu options
  const menuModel = [
    {
      label: "View",
      icon: "pi pi-fw pi-eye",
      command: () => setVisibleViewRight(true),
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => navigate("/candidate-editform"),
    },
    { label: "Archived", icon: "pi pi-check-circle" },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      command: () => deleteCandidate(selectedCandidate),
    },
    // {
    //   label: "Email",
    //   icon: "pi pi-envelope",
    //   items: [
    //     // Subitems for "Schedule"
    //     {
    //       label: "New Email",
    //       icon: "pi pi-calendar-plus",
    //     },
    //     { label: "Selected", icon: "pi pi-phone" },
    //     { label: "Searched", icon: "pi pi-users" },
    //     { label: "All", icon: "pi pi-list" },
    //     {
    //       label: "Jobs",
    //       icon: "pi pi-calendar-clock",
    //       items: [
    //         // Subitems for "Schedule"
    //         {
    //           label: "All",
    //           icon: "pi pi-calendar-plus",
    //         },
    //         { label: "Selected", icon: "pi pi-phone" },
    //         { label: "Searched", icon: "pi pi-users" },
    //       ],
    //     },
    //   ],
    // },
    {
      label: "Schedule",
      icon: "pi pi-calendar-clock",
      items: [
        // Subitems for "Schedule"
        // { label: "Interview", icon: "pi pi-calendar-plus" },
        { label: "Call", icon: "pi pi-phone" },
        { label: "Meeting", icon: "pi pi-users" },
        // { label: "Task", icon: "pi pi-list" },
        { label: "Event", icon: "pi pi-calendar-clock" },
        { label: "Other", icon: "pi pi-ellipsis-h" },
      ],
    },
    { label: "Notes", icon: "pi pi-clipboard" },
    {
      label: "Clear Search",
      icon: "pi pi-filter-slash",
      command: () => handleClearSearchCandidates(),
    },
    // {
    //   label: "Submit",
    //   icon: "pi pi-send",
    //   items: [
    //     // Subitems for "More"
    //     { label: "Submit Candidate to Job", icon: "pi pi-user-plus" },
    //     { label: "Submit Candidate to Contact", icon: "pi pi-user-plus" },
    //   ],
    // },
    {
      label: "More",
      icon: "pi pi-ellipsis-h",
      items: [
        // Subitems for "More"
        // {
        //   label: "Link Jobs",
        //   icon: "pi pi-link",
        //   items: [
        //     // Subitems for "Link Jobs"
        //     { label: "Received", icon: "pi pi-link" },
        //     { label: "Potential", icon: "pi pi-sync" },
        //     { label: "Submitted", icon: "pi pi-link" },
        //   ],
        // },
        { label: "Change Status", icon: "pi pi-link" },
        // { label: "Merge", icon: "pi pi-sync" },
      ],
    },
  ]

  // Function to handle viewing a candidate
  const viewCandidate = candidate => {
    toast.current.show({
      severity: "info",
      summary: "Candidate Selected",
      detail: `${candidate.Firstname} ${candidate.Lastname}`,
    })
  }

  // Function to handle editing a candidate
  const editCandidate = candidate => {
    toast.current.show({
      severity: "success",
      summary: "Edit Candidate",
      detail: `Editing ${candidate.Firstname} ${candidate.Lastname}`,
    })
    // Add your edit logic here
  }

  // Function to handle deleting a candidate
  const deleteCandidate = candidate => {
    let _candidates = [...candidateData]
    _candidates = _candidates.filter(c => c.id !== candidate.id)
    setCandidateData(_candidates) // Update the candidate data state
    toast.current.show({
      severity: "error",
      summary: "Candidate Deleted",
      detail: `Deleted ${candidate.Firstname} ${candidate.Lastname}`,
    })
  }

  // context menu ends

  const exportCSV = () => {
    if (dt.current) {
      dt.current.exportCSV()
    }
  }
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers")
    XLSX.writeFile(workbook, "customers_data.xlsx")
  }
  const exportPdf = () => {
    const doc = new jsPDF()
    doc.text("Customer Data", 14, 10)
    doc.autoTable({
      head: [
        [
          "ID",
          "First Name",
          "Last Name",
          "Job Title",
          "Email",
          "Phone",
          "Company",
          "Experience",
          "City",
          "Status",
          "Relocation",
          "Categories",
          "Groups",
          "ResumeAttachment",
          "PrimarySkills",
          "CreatedBy",
          "EditDate",
          "CreateDate",
        ],
      ],
      body: customers.map(customer => [
        customer.id,
        customer.Firstname,
        customer.Lastname,
        customer.JobTitle,
        customer.Email,
        customer.MobPhone,
        customer.Company,
        customer.Yearsofexperience,
        customer.City,
        customer.Status,
        customer.Relocation,
        customer.Categories,
        customer.Groups,
      ]),
    })
    doc.save("customers_data.pdf")
  }
  const sizeOptions = [
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
  ]

  const uniqueStatus = [
    { name: "Active", value: "Active" },
    { name: "Inactive", value: "Inactive" },
    { name: "Pending", value: "Pending" },
    { name: "Completed", value: "Completed" },
  ]
  const uniqueCategories = [
    { name: "Frontend", value: "Frontend" },
    { name: "SEO", value: "SEO" },
    { name: "Content Writing", value: "Content Writing" },
    { name: "AI ML", value: "AI ML" },
  ]
  const filteredGroups = [
    { name: "React", value: "React" },
    { name: "Blog Writing", value: "Blog Writing" },
    { name: "Machine Learning", value: "Machine Learning" },
    { name: "On Page SEO", value: "On Page SEO" },
  ]

  const statusofdrop = options => (
    <Dropdown
      value={options.value}
      options={uniqueStatus}
      onChange={e => {
        setSelectedCategory(e.value)
        options.filterApplyCallback(e.value)
      }}
      optionLabel="name"
      placeholder="Select"
      className="p-column-filter bgclr"
      maxSelectedLabels={1}
      style={{ minWidth: "14rem" }}
    />
  )
  const representativeRowFilterTemplate = options => (
    <Dropdown
      value={options.value}
      options={uniqueCategories}
      onChange={e => {
        setSelectedCategory(e.value)
        options.filterApplyCallback(e.value)
      }}
      optionLabel="name"
      placeholder="Select"
      className="p-column-filter bgclr"
      maxSelectedLabels={1}
      style={{ minWidth: "14rem" }}
    />
  )
  const representativeRowFilterTemplate1 = options => (
    <Dropdown
      value={options.value}
      options={filteredGroups}
      onChange={e => options.filterApplyCallback(e.value)}
      optionLabel="name"
      placeholder="Select"
      className="p-column-filter bgclr"
      maxSelectedLabels={1}
      style={{ minWidth: "14rem" }}
    />
  )
  const [visibleColumns, setVisibleColumns] = useState([
    // State for visible columns
    // 'Yearsofexperience',
    // 'City',
    // 'Status',
    // 'Relocation',
    // 'Categories',
    // 'Groups',
  ])
  const firstnameEditor = props => {
    return (
      <InputText
        value={props.value}
        onChange={e => props.editorCallback(e.target.value)}
      />
    )
  }
  const firstnameEditor1 = props => {
    return (
      <InputText
        value={props.value}
        onChange={e => props.editorCallback(e.target.value)}
      />
    )
  }
  const firstnameEditor2 = props => {
    return (
      <InputText
        value={props.value}
        onChange={e => props.editorCallback(e.target.value)}
      />
    )
  }
  const firstnameEditor4 = props => {
    return (
      <InputText
        value={props.value}
        onChange={e => props.editorCallback(e.target.value)}
      />
    )
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
  // useEffect(() => {

  //   setCustomers(sampleData)
  // }, [])
  // const header = renderHeader();
  const [visible, setVisible] = useState(false) // State to control the visibility of the modal
  const [inputValue, setInputValue] = useState("") // State to hold the input value
  const showDialog = () => {
    setSuccessAlert(true) // Show the modal
  }
  const hideDialog = () => {
    setVisible(false) // Hide the modal
  }
  const [successAlert, setSuccessAlert] = useState(false)
  const [addedit, setaddedit] = useState(false)
  const [date, setDate] = useState(null)
  const [date1, setDate1] = useState(null)
  const [date2, setDate2] = useState(null)
  const [date3, setDate3] = useState(null)
  const [date4, setDate4] = useState(null)
  const [date5, setDate5] = useState(null)
  const [date6, setDate6] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    jobTitle: "",
    status: "",
    employeeType: "",
    source: "",
    relocation: "",
    availabilityDate: null,
    referredBy: "",
    categories: "",
    groups: "",
    address: "",
    workPhone: "",
    mobilePhone: "",
    projectDescription: "",
  })
  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ]
  const [selectedCities, setSelectedCities] = useState(null)
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      jobTitle: "",
      status: "",
      employeeType: "",
      source: "",
      relocation: "",
      availabilityDate: null,
      referredBy: "",
      categories: "",
      groups: "",
      address: "",
      workPhone: "",
      mobilePhone: "",
      projectDescription: "",
    })
    setSelectedCountry(null)
    setSelectedCities(null)
  }

  // view page starts

  // Define the downloadResume function
  const downloadResume = () => {
    const doc = new jsPDF()

    // Get the Resume content
    const resumeContent = document.getElementById("resume-content")

    // Use the `html` method of jsPDF to capture the content and render it into the PDF
    doc.html(resumeContent, {
      callback: function (doc) {
        doc.save("Resume.pdf") // Save the generated PDF
      },
      margin: [10, 10, 10, 10], // Margin for the PDF
      x: 10, // X position for the start of the content
      y: 10, // Y position for the start of the content
      autoPaging: true, // Allow content to automatically flow to the next page if needed
      width: 180, // Set the content width
    })
  }







  // view form history starts


  const [subtaskFilters, setSubtaskFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

    project_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sub_task: { value: null, matchMode: FilterMatchMode.CONTAINS },

    project_manager: { value: null, matchMode: FilterMatchMode.CONTAINS },
    module_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_description: { value: null, matchMode: FilterMatchMode.CONTAINS },

    created_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
    assigned_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
    assigned_to: { value: null, matchMode: FilterMatchMode.CONTAINS },
    watchers: { value: null, matchMode: FilterMatchMode.CONTAINS },

    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    actual_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },

    task_status: { value: null, matchMode: FilterMatchMode.EQUALS },
    priority: { value: null, matchMode: FilterMatchMode.EQUALS },
    approval_status: { value: null, matchMode: FilterMatchMode.EQUALS },

    work_hours: { value: null, matchMode: FilterMatchMode.EQUALS },
  });


  const BugData = [

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

  ];


  const subTask = [

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

  ];


  const [selectedSubtask, setSelectedSubtask] = useState([])

  // view form history ends




  // view form activities starts

  const [activitiesFilters, setActivitiesFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sub_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const activities = [
    {
      type: "Technical",
      sub_type: "Software",
      priority: "High",
      subject: "Job Interview",
      date_time: "01-01-2025 10:00",
      user_id: "12345",
    },
    {
      type: "Technical",
      sub_type: "Project Management",
      priority: "Medium",
      subject: "Project Kickoff",
      date_time: "12-05-2024 09:00",
      user_id: "54321",
    },
    {
      type: "Technical",
      sub_type: "Data Analysis",
      priority: "Low",
      subject: "Data Review",
      date_time: "15-01-2025 14:00",
      user_id: "98765",
    },
    {
      type: "Non-Technical",
      sub_type: "Marketing",
      priority: "High",
      subject: "Strategy Discussion",
      date_time: "02-01-2025 11:00",
      user_id: "67890",
    },
    {
      type: "Non-Technical",
      sub_type: "Human Resources",
      priority: "Critical",
      subject: "Employee Review",
      date_time: "03-01-2025 13:00",
      user_id: "11223",
    },
  ]

  const [selectedActivities, setSelectedActivities] = useState([])

  // view form activities ends

  // view form history starts

  const [historyFilters, setHistoryFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sub_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const history = [
    {
      type: "Technical",
      sub_type: "Software",
      priority: "High",
      subject: "Job Interview",
      date_time: "01-01-2025 10:00",
      user_id: "12345",
    },
    {
      type: "Technical",
      sub_type: "Project Management",
      priority: "Medium",
      subject: "Project Kickoff",
      date_time: "12-05-2024 09:00",
      user_id: "54321",
    },
    {
      type: "Technical",
      sub_type: "Data Analysis",
      priority: "Low",
      subject: "Data Review",
      date_time: "15-01-2025 14:00",
      user_id: "98765",
    },
    {
      type: "Non-Technical",
      sub_type: "Marketing",
      priority: "High",
      subject: "Strategy Discussion",
      date_time: "02-01-2025 11:00",
      user_id: "67890",
    },
    {
      type: "Non-Technical",
      sub_type: "Human Resources",
      priority: "Critical",
      subject: "Employee Review",
      date_time: "03-01-2025 13:00",
      user_id: "11223",
    },
  ]

  const [selectedHistory, setSelectedHistory] = useState([])

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
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const receivedJobs = [
    {
      status: "Open",
      jobid: "Job-101",
      job_title: "Web Developer",
      candidate: "LavanKumar Kalvala",
      contact: "Mahesh Kumar Bhoga",
      company: "Varun Digital Media",
      date_time: "26-02-2025 10:00 AM",
      user_id: "Harish",
    },
    // {
    //   status: "In Progress",
    //   jobid: "DEV002",
    //   job_title: "Backend Developer",
    //   candidate: "Jane Smith",
    //   contact: "jane.smith@example.com",
    //   company: "Innovate Ltd.",
    //   date_time: "2024-12-15 02:30 PM",
    //   user_id: "54321",
    // },
    // {
    //   status: "Closed",
    //   jobid: "ANA001",
    //   job_title: "Data Analyst",
    //   candidate: "Bob Brown",
    //   contact: "bob.brown@example.com",
    //   company: "Analytics Inc.",
    //   date_time: "2025-02-01 09:00 AM",
    //   user_id: "67890",
    // },
    // {
    //   status: "Closed",
    //   jobid: "ENG001",
    //   job_title: "Mechanical Engineer",
    //   candidate: "Alice Carter",
    //   contact: "alice.carter@example.com",
    //   company: "Engineered Solutions",
    //   date_time: "2025-02-05 03:00 PM",
    //   user_id: "11223",
    // },
    // {
    //   status: "Closed",
    //   jobid: "HRM001",
    //   job_title: "HR Manager",
    //   candidate: "Daniel Smith",
    //   contact: "daniel.smith@example.com",
    //   company: "PeopleFirst HR",
    //   date_time: "2025-01-25 11:30 AM",
    //   user_id: "33445",
    // },
    // {
    //   status: "Closed",
    //   jobid: "DEV001",
    //   job_title: "Full Stack Developer",
    //   candidate: "Sophia Taylor",
    //   contact: "sophia.taylor@example.com",
    //   company: "Code Creators",
    //   date_time: "2025-01-15 02:15 PM",
    //   user_id: "55667",
    // },
    // {
    //   status: "Closed",
    //   jobid: "PM001",
    //   job_title: "Project Manager",
    //   candidate: "James Wilson",
    //   contact: "james.wilson@example.com",
    //   company: "AgilePro Management",
    //   date_time: "2025-01-30 04:45 PM",
    //   user_id: "77889",
    // },
  ]

  const [selectedReceivedJobs, setSelectedReceivedJobs] = useState([])

  // potential

  const [potentialJobsFilters, setPotentialJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const potentialJobs = [
    {
      status: "Open",
      jobid: "Job-101",
      job_title: "Web Developer",
      candidate: "LavanKumar Kalvala",
      contact: "Mahesh Kumar Bhoga",
      company: "Varun Digital Media",
      date_time: "26-02-2025 10:00 AM",
      user_id: "Harish",
    },
    // {
    //   status: "In Progress",
    //   jobid: "POT002",
    //   job_title: "Cloud Engineer",
    //   candidate: "Laura Green",
    //   contact: "laura.green@example.com",
    //   company: "Cloud Solutions",
    //   date_time: "2025-02-10 03:45 PM",
    //   user_id: "77654",
    // },
    // {
    //   status: "Closed",
    //   jobid: "POT003",
    //   job_title: "DevOps Specialist",
    //   candidate: "Kevin Hill",
    //   contact: "kevin.hill@example.com",
    //   company: "TechOps Co.",
    //   date_time: "2025-01-25 09:30 AM",
    //   user_id: "65432",
    // },
  ]

  const [selectedPotentialJobs, setSelectedPotentialJobs] = useState([])

  // rejected

  const [rejectedJobsFilters, setRejectedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const rejectedJobs = [
    // {
    //   status: "Rejected",
    //   jobid: "Job-101",
    //   job_title: "Web Developer",
    //   candidate: "Lavan Kumar",
    //   contact: "Mahesh Kumar Bhoga",
    //   company: "Varun Digital Media",
    //   date_time: "2025-02-01 04:30 PM",
    //   user_id: "Harish",
    // },
    // {
    //   status: "Rejected",
    //   jobid: "REJECT002",
    //   job_title: "HR Specialist",
    //   candidate: "Rachel Green",
    //   contact: "rachel.green@example.com",
    //   company: "HumanCorp",
    //   date_time: "2025-02-02 10:00 AM",
    //   user_id: "23456",
    // },
  ]

  const [selectedRejectedJobs, setSelectedRejectedJobs] = useState([])

  // interview
  const [interviewJobsFilters, setInterviewJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const interviewJobs = [
    {
      status: "Interview Scheduled",
      jobid: "Job-101",
      job_title: "Web Developer",
      candidate: "LavanKumar Kalvala",
      contact: "Mahesh Kumar Bhoga",
      company: "Varun Digital Media",
      date_time: "26-02-2025 10:00 AM",
      user_id: "Harish",
    },
    // {
    //   status: "Interview Scheduled",
    //   jobid: "INTERVIEW002",
    //   job_title: "UI/UX Designer",
    //   candidate: "Chloe Brown",
    //   contact: "chloe.brown@example.com",
    //   company: "Creative Studios",
    //   date_time: "2025-03-06 11:00 AM",
    //   user_id: "67890",
    // },
    // {
    //   status: "Interview Completed",
    //   jobid: "INTERVIEW003",
    //   job_title: "Data Scientist",
    //   candidate: "Oliver Harris",
    //   contact: "oliver.harris@example.com",
    //   company: "DataWorks",
    //   date_time: "2025-03-07 02:00 PM",
    //   user_id: "78901",
    // },
    // {
    //   status: "Interview Scheduled",
    //   jobid: "INTERVIEW004",
    //   job_title: "Product Manager",
    //   candidate: "Emily Davis",
    //   contact: "emily.davis@example.com",
    //   company: "Productive Inc.",
    //   date_time: "2025-03-08 04:00 PM",
    //   user_id: "89012",
    // },
    // {
    //   status: "Interview Scheduled",
    //   jobid: "INTERVIEW004",
    //   job_title: "Product Manager",
    //   candidate: "Emily Davis",
    //   contact: "emily.davis@example.com",
    //   company: "Productive Inc.",
    //   date_time: "2025-03-08 04:00 PM",
    //   user_id: "89012",
    // },
  ]

  const [selectedInterviewJobs, setSelectedInterviewJobs] = useState([])

  // submitted

  const [submittedJobsFilters, setSubmittedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const submittedJobs = [
    {
      status: "Submitted",
      jobid: "Job-101",
      job_title: "Web Developer",
      candidate: "LavanKumar Kalvala",
      contact: "Mahesh Kumar Bhoga",
      company: "Varun Digital Media",
      date_time: "26-02-2025 10:00 AM",
      user_id: "Harish",
    },

    // {
    //   status: "Submitted",
    //   jobid: "SUB002",
    //   job_title: "Software Engineer",
    //   candidate: "Jane Smith",
    //   contact: "jane.smith@example.com",
    //   company: "TechWorld",
    //   date_time: "2025-03-02 11:30 AM",
    //   user_id: "23456",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB003",
    //   job_title: "Product Manager",
    //   candidate: "Alex Lee",
    //   contact: "alex.lee@example.com",
    //   company: "InnovateX",
    //   date_time: "2025-03-03 02:00 PM",
    //   user_id: "34567",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB004",
    //   job_title: "Marketing Specialist",
    //   candidate: "Emily Davis",
    //   contact: "emily.davis@example.com",
    //   company: "MarketMinds",
    //   date_time: "2025-03-04 09:15 AM",
    //   user_id: "45678",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB003",
    //   job_title: "Product Manager",
    //   candidate: "Alex Lee",
    //   contact: "alex.lee@example.com",
    //   company: "InnovateX",
    //   date_time: "2025-03-03 02:00 PM",
    //   user_id: "34567",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB004",
    //   job_title: "Marketing Specialist",
    //   candidate: "Emily Davis",
    //   contact: "emily.davis@example.com",
    //   company: "MarketMinds",
    //   date_time: "2025-03-04 09:15 AM",
    //   user_id: "45678",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB003",
    //   job_title: "Product Manager",
    //   candidate: "Alex Lee",
    //   contact: "alex.lee@example.com",
    //   company: "InnovateX",
    //   date_time: "2025-03-03 02:00 PM",
    //   user_id: "34567",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB004",
    //   job_title: "Marketing Specialist",
    //   candidate: "Emily Davis",
    //   contact: "emily.davis@example.com",
    //   company: "MarketMinds",
    //   date_time: "2025-03-04 09:15 AM",
    //   user_id: "45678",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB003",
    //   job_title: "Product Manager",
    //   candidate: "Alex Lee",
    //   contact: "alex.lee@example.com",
    //   company: "InnovateX",
    //   date_time: "2025-03-03 02:00 PM",
    //   user_id: "34567",
    // },
    // {
    //   status: "Submitted",
    //   jobid: "SUB004",
    //   job_title: "Marketing Specialist",
    //   candidate: "Emily Davis",
    //   contact: "emily.davis@example.com",
    //   company: "MarketMinds",
    //   date_time: "2025-03-04 09:15 AM",
    //   user_id: "45678",
    // },
  ]

  const [selectedSubmittedJobs, setSelectedSubmittedJobs] = useState([])

  // offer
  const [offerJobsFilters, setOfferJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const offerJobs = [
    {
      status: "Offer Extended",
      jobid: "Job-101",
      job_title: "Web Developer",
      candidate: "LavanKumar Kalvala",
      contact: "Mahesh Kumar Bhoga",
      company: "Varun Digital Media",
      date_time: "26-02-2025 10:00 AM",
      user_id: "Harish",
    },
    // {
    //   status: "Offer Extended",
    //   jobid: "OFFER002",
    //   job_title: "Backend Developer",
    //   candidate: "Sophie Turner",
    //   contact: "sophie.turner@example.com",
    //   company: "Tech Universe",
    //   date_time: "2025-03-06 02:15 PM",
    //   user_id: "67890",
    // },
    // {
    //   status: "Offer Accepted",
    //   jobid: "OFFER003",
    //   job_title: "Frontend Developer",
    //   candidate: "Michael Johnson",
    //   contact: "michael.johnson@example.com",
    //   company: "DevWorks",
    //   date_time: "2025-03-07 11:45 AM",
    //   user_id: "78901",
    // },
    // {
    //   status: "Offer Declined",
    //   jobid: "OFFER004",
    //   job_title: "Project Manager",
    //   candidate: "Olivia Adams",
    //   contact: "olivia.adams@example.com",
    //   company: "PM Solutions",
    //   date_time: "2025-03-08 09:00 AM",
    //   user_id: "89012",
    // },
  ]

  const [selectedOfferJobs, setSelectedOfferJobs] = useState([])

  // placed

  const [placedJobsFilters, setPlacedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const placedJobs = [
    {
      status: "Placed",
      jobid: "Job-101",
      job_title: "Web Developer",
      candidate: "LavanKumar Kalvala",
      contact: "Mahesh Kumar Bhoga",
      company: "Varun Digital Media",
      date_time: "26-02-2025 10:00 AM",
      user_id: "Harish",
    },
    // {
    //   status: "Placed",
    //   jobid: "PLACED002",
    //   job_title: "Cloud Architect",
    //   candidate: "Daniela Brooks",
    //   contact: "daniela.brooks@example.com",
    //   company: "Cloud Masters",
    //   date_time: "2025-02-16 11:00 AM",
    //   user_id: "67890",
    // },
    // {
    //   status: "Placed",
    //   jobid: "PLACED003",
    //   job_title: "Product Designer",
    //   candidate: "Ethan White",
    //   contact: "ethan.white@example.com",
    //   company: "DesignWorks",
    //   date_time: "2025-02-17 02:30 PM",
    //   user_id: "78901",
    // },
    // {
    //   status: "Placed",
    //   jobid: "PLACED004",
    //   job_title: "Marketing Director",
    //   candidate: "Olivia King",
    //   contact: "olivia.king@example.com",
    //   company: "Growth Strategies",
    //   date_time: "2025-02-18 04:00 PM",
    //   user_id: "89012",
    // },
    // {
    //   status: "Placed",
    //   jobid: "PLACED004",
    //   job_title: "Marketing Director",
    //   candidate: "Olivia King",
    //   contact: "olivia.king@example.com",
    //   company: "Growth Strategies",
    //   date_time: "2025-02-18 04:00 PM",
    //   user_id: "89012",
    // },
  ]

  const [selectedPlacedJobs, setSelectedPlacedJobs] = useState([])

  // view form pipeline ends

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

  // view page ends

  const [showesitSelecticon, setshowesitSelecticon] = useState(false)
  const [showesitSelect, setshowesitSelect] = useState(true)
  const [showIconsSelect, setShowIconsSelect] = useState(false)

  // sms

  const [selectedActSms, setSelectedActSms] = useState(null)

  const actSmsOptions = [
    {
      name: "Selected",
      code: "SMS-SE",
      icon: "pi pi-check",
    },
    {
      name: "Searched",
      code: "SMS-SR",
      icon: "pi pi-search",
    },
    {
      name: "All",
      code: "SMS-AL",
      icon: "pi pi-list",
    },
  ]

  const [selectedSchedule, setSelectedSchedule] = useState(null)

 const actScheduleOptions = [
  {
    name: "Call",
    code: "SCH-CA",
    icon: "pi pi-phone",
    action: () => setScheduleDialog({ visible: true, type: 'call', title: 'Schedule Call' }),
  },
  {
    name: "Meeting",
    code: "SCH-ME",
    icon: "pi pi-calendar",
    action: () => setScheduleDialog({ visible: true, type: 'meeting', title: 'Schedule Meeting' }),
  },
  // {
  //   name: "Task",
  //   code: "SCH-TA",
  //   icon: "pi pi-check-square",
  //   action: () => setScheduleDialog({ visible: true, type: 'task', title: 'Schedule Task' }),
  // },
  {
    name: "Event",
    code: "SCH-EV",
    icon: "pi pi-bell",
    action: () => setScheduleDialog({ visible: true, type: 'event', title: 'Schedule Event' }),
  },
  {
    name: "Other",
    code: "SCH-OT",
    icon: "pi pi-ellipsis-h",
    action: () => setScheduleDialog({ visible: true, type: 'other', title: 'Schedule Other' }),
  },
];


const getSubTypeOptions = (type) => {
  switch (type) {
    case 'call':
      return typeCall;
    case 'meeting':
      return typeMeeting;
    case 'task':
    case 'event':
    case 'other':
    default:
      return typeInterview;
  }
};

const getTypeValue = (type) => {
  switch (type) {
    case 'call':
      return intertype3;
    case 'meeting':
      return intertype2;
    case 'task':
      return intertype1;
    case 'event':
      return intertype4;
    case 'other':
      return intertype5;
    default:
      return '';
  }
};


const [scheduleDialog, setScheduleDialog] = useState({
  visible: false,
  type: '', // 'call', 'meeting', 'task', 'event', 'other'
  title: ''
});

  const handleScheduleChange = e => {
    setSelectedSchedule(e.value)

    // Trigger the action if defined for the selected option
    if (e.value && e.value.action) {
      e.value.action() // Execute the custom action
    }
  }

  // clear search starts

  const handleClearSearchCandidates = () => {
    setFilters({
      Firstname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Lastname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      JobTitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      MobilePhone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Yearsofexperience: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      City: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      AvailabilityDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Relocation: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Categories: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Groups: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      ResumeAttachment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      PrimarySkills: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      CreatedBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      EditDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      CreateDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    })
  }

  // clear search ends

  // short form strats
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
  // Change initial values to empty
  const [taskCode, setTaskcode] = useState("")
  const [taskName, setTaskname] = useState("")
  const [taskDesc, setTaskdesc] = useState("")
  const [taskAssigned, setTaskassigned] = useState("")

  const [selectedMod, setSelectedMod] = useState(null)

  const modOptions = [
    { name: "User Management", code: "HYD" },
    { name: "Reporting", code: "CHN" },
    { name: "Authentication", code: "MUM" },
    { name: "Payroll Management", code: "BLR" },
  ]

  const [selectedAss, setSelectedAss] = useState(null)

  const assOptions = [
    { name: "Dashboard Revamp", code: "HYD" },
    { name: "User Roles Update", code: "CHN" },
    { name: " Monthly Reports Project", code: "MUM" },
    { name: "Login System Fixes", code: "BLR" },
  ]
  const [selectedAssto, setSelectedAssto] = useState(null)

  const asstoOptions = [
    { name: "Ruchitha Patel", code: "HYD" },
    { name: "Chandana", code: "CHN" },
    { name: "Lavan Kumar", code: "MUM" },
    { name: "Venkata laxmi", code: "BLR" },
    { name: "Mahesh N", code: "BLR" },
  ]
  const [jobStartDate, setJobStartDate] = useState(null)
  const [jobEndDate, setJobEndDate] = useState(null)

  const [selectedTask, setSelectedTask] = useState(null)

  const taskOptions = [
    { name: "WIP", code: "HYD" },
    { name: "Hold", code: "CHN" },
    { name: "Completed", code: "MUM" },
  ]
  const [selectedPriority, setSelectedPriority] = useState(null)

  const priorityOptions = [
    { name: "High", code: "HYD" },
    { name: "Medium", code: "CHN" },
    { name: "Low", code: "MUM" },
  ]

  const [selectedStatus, setSelectedStatus] = useState(null)

  const statusOptions = [
    { name: "Approved", code: "HYD" },
    { name: "Pending", code: "CHN" },
  ]
  // short form ends

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

  // Export start

  const [importCsvIcons, setImportCsvIcons] = useState(false)

  const exportCSVBtn = selectionOnly => {
    dt.current.exportCSV({ selectionOnly })
  }

  const exportPdfBtn = () => {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("landscape")

        // Ensure columns and data are properly mapped
        const exportColumns = columns?.map(col => col.header) || []
        const exportData = customers.map(
          row => columns?.map(col => row[col.field] ?? "-") || []
        )

        // Debugging - Check if data is being prepared correctly
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

        doc.save("customers_data.pdf")
      })
    })
  }

  const exportExcelBtn = () => {
    import("xlsx").then(xlsx => {
      const exportData = customers.map(row =>
        columns?.reduce((acc, col) => {
          acc[col.header] = row[col.field] ?? "-" // Map field values with column headers
          return acc
        }, {})
      )

      const worksheet = xlsx.utils.json_to_sheet(exportData)
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] }
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      })
      saveAsExcelFile(excelBuffer, "customers_data")
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

  const columns = [
    { field: "id", header: "ID" },
    { field: "Firstname", header: "First Name" },
    { field: "Lastname", header: "Last Name" },
    { field: "JobTitle", header: "Job Title" },
    { field: "Email", header: "Email" },
    { field: "MobilePhone", header: "Mobile Phone" },
    { field: "Company", header: "Company" },
    { field: "Yearsofexperience", header: "Years of Experience" },
    { field: "City", header: "City" },
    { field: "Status", header: "Status" },
    { field: "Relocation", header: "Relocation" },
    { field: "Categories", header: "Categories" },
    { field: "Groups", header: "Groups" },
    { field: "PrimarySkills", header: "Primary Skills" },
    { field: "CreateDate", header: "Create Date" },
    { field: "EditDate", header: "Edit Date" },
    { field: "CreatedBy", header: "Created By" },
    // Add a column definition for work_hours if needed for dynamic rendering
    // { field: "work_hours", header: "Work Hours (in hours)" },
  ]

  const headerBtn = (
    <div className="flex align-items-center justify-content-end gap-1 actionitem-import">
      <Button
        className="csvbtn p-button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSVBtn(false)}
        data-pr-tooltip="CSV"
        tooltip="Export to CSV"
      />
      <Button
        className="xlsbtn p-button"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={exportExcelBtn}
        data-pr-tooltip="XLS"
        tooltip="Export to Excel"
      />
      <Button
        className="pdfbtn p-button me-2"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={exportPdfBtn}
        disabled={customers.length === 0}
        data-pr-tooltip="PDF"
        tooltip="Export to Pdf"
      />
    </div>
  )

  // Export end

  // interview popup starts
  const [interviewpop, SetInterviewpop] = useState(false)
  const [interviewpopCall, SetInterviewpopCall] = useState(false)
  const [addSubTaskPopup, SetAddSubTaskPopup] = useState(false)
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

  const jobStatusDrop = [
    { name: "Open", value: "Open" },
    { name: "Closed", value: "Closed" },
    { name: "On Hold", value: "On Hold" },
  ]

  const priorityValue = [
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },
  ]
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
    if (!e.checked) {
      setPrivateDrop([])
    }
  }

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

  const [userid, setUserid] = useState(["Harish"])
  const customChip = item => {
    return (
      <div>
        <span>{item}</span>
        {/* <i className="pi pi-user-plus"></i> */}
      </div>
    )
  }
  const [popchecked, setPopchecked] = useState(false)
  const handlePopupCheckbox = e => {
    setPopchecked(e.checked)
  }
  // interview popup ends

  // Create a Candidate start

  const navigate = useNavigate()
  const [createFirst, setCreateFirst] = useState("Lavankumar")
  const [createLast, setCreateLast] = useState("Kalvala")
  const [createEmail, setCreateEmail] = useState("lava9@infosys.com")
  const [createPhone, setCreatePhone] = useState("9876543211")
  const [createJobTitle, setCreateJobTitle] = useState("Web Developer")
  const [createCompany, setCreateCompany] = useState("Infosys Limited")
  const [createDate, setCreateDate] = useState("28-02-2025")
  const [notes1, setNotes1] = useState(
    "Lavankumar Kalvala is a Frontend Developer at Infosys Limited, skilled in JavaScript and React. He is currently active and available for work from 20-02-2025. With 2 years of experience, he is open to relocation and belongs to the Frontend category (React group)."
  )

  // import resume
  const toast = useRef(null)

  // const onUpload = () => {
  //   toast.current.show({
  //     severity: 'info',
  //     summary: 'Success',
  //     detail: 'File Uploaded',
  //     Action: '/myactive-candidates'
  //   });
  // };

  //   const customBase64Uploader = async (event ) => {
  //     console.log("Uploading file...");

  //     const file = event.files[0]; // Get the file
  //     const reader = new FileReader();

  //     reader.readAsDataURL(file);

  //     reader.onloadend = function () {
  //         const base64data = reader.result;
  //         console.log("Base64 Data:", base64data);

  //         // Perform any API upload if needed

  //         // Navigate to another page after upload
  //         navigate("/myactive-candidates");
  //     };
  // };

  const customBase64Uploader = async event => {
    try {
      // Access the uploaded file
      const file = event.files[0]
      console.log("File selected:", file)

      // Redirect the user immediately after file submission
      navigate("/candidate-editform")

      // Optional: Process the file in the background
      const blob = await fetch(file.objectURL).then(r => r.blob())
      const reader = new FileReader()
      reader.readAsDataURL(blob)

      reader.onloadend = function () {
        const base64data = reader.result // Base64 encoded data
        console.log("Base64 Encoded Data:", base64data)
      }
    } catch (error) {
      console.error("Error during file upload:", error)
    }
  }

  const customBase64Uploader1 = async event => {
    try {
      // Access the uploaded file
      const file = event.files[0]
      console.log("File selected:", file)

      // Redirect the user immediately after file submission
      navigate("/uploadresumeform")

      // Optional: Process the file in the background
      const blob = await fetch(file.objectURL).then(r => r.blob())
      const reader = new FileReader()
      reader.readAsDataURL(blob)

      reader.onloadend = function () {
        const base64data = reader.result // Base64 encoded data
        console.log("Base64 Encoded Data:", base64data)
      }
    } catch (error) {
      console.error("Error during file upload:", error)
    }
  }

  // tasks datatable starts

  const [tasksData, setTasksData] = useState([
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
  ])

  const [selectedTasksData, setSelectedTasksData] = useState([])

  // Select a task and show details
  const viewTaskDetails = task => {
    setSelectedTasksData([task])
    setTaskDetailsVisible(true)
  }

  // return first selected or contextâ€menuâ€selected task
  const getSelectedTaskData = () => {
    return selectedTasksData.length ? selectedTasksData[0] : selectedTask
  }

  // const [selectedTask, setSelectedTask] = useState(null);

  // task datatable ends

  // module worktype start

  const [selectedModule, setSelectedModule] = useState(null)

  const [moduleWorkTypes, setModuleWorkTypes] = useState([
    {
      name: "User Management",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const moduleDropdownWorkTypes = [
    ...moduleWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Module", id: "create-new-work-type" },
    { name: "Edit Module", id: "edit-selected-work-type" },
  ]

  const handleModuleWorkTypesChange = updatedWorkTypes => {
    setModuleWorkTypes(updatedWorkTypes)
  }

  const handleModuleSelectionChange = selectedWorkType => {
    setSelectedModule(selectedWorkType)
  }

  // module worktype end

  // status work type start

  const [moduleWorkTypes1, setModuleWorkTypes1] = useState([
    {
      name: 'To Do',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'In Progress',
      color: '#000000',
      id: 'in-active',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'In Review',
      color: '#000000',
      id: 'dnd',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Testing / QA',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Blocked',
      color: '#000000',
      id: 'in-active',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Done',
      color: '#000000',
      id: 'dnd',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Cancelled',
      color: '#000000',
      id: 'dnd',
      statuses: ['Pending', 'Processing', 'Completed']
    },
  ])

  const moduleDropdownWorkTypes1 = [
    ...moduleWorkTypes1,
    { id: "divider", disabled: true },
    { name: "Add Work Type Status", id: "create-new-work-type" },
    { name: "Edit Work Type Status", id: "edit-selected-work-type" },
  ]

  // status work type end


  // Assigned task start

  const [moduleWorkTypes2, setModuleWorkTypes2] = useState([
    {
      name: 'Mahesh Kumar Bhoga',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Aman Kumar',
      color: '#000000',
      id: 'in-active',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Lavan kumar',
      color: '#000000',
      id: 'in-active',
      statuses: ['Pending', 'Processing', 'Completed']
    },


  ])

  const moduleDropdownWorkTypes2 = [
    ...moduleWorkTypes2,
    { id: "divider", disabled: true },
    { name: "Add Assigned", id: "create-new-work-type" },
    { name: "Edit Assigned", id: "edit-selected-work-type" },
  ]

  // Assigned task end

  // wtachers start

  const [moduleWorkTypes22, setModuleWorkTypes22] = useState([
    {
      name: "Mahesh Kumar Bhoga",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Aman Kumar",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },

  ])

  const moduleDropdownWorkTypes22 = [
    ...moduleWorkTypes2,
    { id: "divider", disabled: true },
    { name: "Add Watchers", id: "create-new-work-type" },
    { name: "Edit Watchers", id: "edit-selected-work-type" },
  ]

  // Linked task start

  const [moduleWorkTypes3, setModuleWorkTypes3] = useState([
    {
      name: "Blocks",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Is blocked by",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Clones",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Is cloned by",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "duplicates",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const moduleDropdownWorkTypes3 = [
    ...moduleWorkTypes3,
    { id: "divider", disabled: true },
    { name: "Add Linked", id: "create-new-work-type" },
    { name: "Edit Linked", id: "edit-selected-work-type" },
  ]

  // Linked task end


  // Linked select items start

  const [moduleWorkTypes4, setModuleWorkTypes4] = useState([
    {
      name: "Select work Item",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },

  ])

  const moduleDropdownWorkTypes4 = [
    ...moduleWorkTypes4,
    { id: "divider", disabled: true },
    { name: "Add Item", id: "create-new-work-type" },
    { name: "Edit Item", id: "edit-selected-work-type" },
  ]


  // Linked select items end



  // Company start

  const [moduleWorkTypes5, setModuleWorkTypes5] = useState([
    {
      name: "	AI Generator",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Resume Parser",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Chatbot Assistant",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Image Enhancer AI",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },

  ])

  const moduleDropdownWorkTypes5 = [
    ...moduleWorkTypes5,
    { id: "divider", disabled: true },
    { name: "Add Project", id: "create-new-work-type" },
    { name: "Edit Project", id: "edit-selected-work-type" },
  ]

  // Company end

  // subtype worktype  start
  
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("Active")
    const [statusWorkTypes1, setStatusWorkTypes1] = useState([
      {
        name: 'Introductory Call',
        color: '#000000',
        id: 'custom-task',
        statuses: ['Pending', 'Processing', 'Completed']
      },
      {
        name: 'Requirement Discussion',
        color: '#000000',
        id: 'in-active',
        statuses: ['Pending', 'Processing', 'Completed']
      },
      {
        name: 'Daily Stand-up',
        color: '#000000',
        id: 'dnd',
        statuses: ['Pending', 'Processing', 'Completed']
      },
      {
        name: 'Client Meeting',
        color: '#000000',
        id: 'custom-task',
        statuses: ['Pending', 'Processing', 'Completed']
      },
      {
        name: 'Feedback Session',
        color: '#000000',
        id: 'in-active',
        statuses: ['Pending', 'Processing', 'Completed']
      },
      {
        name: 'Follow-up Call',
        color: '#000000',
        id: 'dnd',
        statuses: ['Pending', 'Processing', 'Completed']
      },
      {
        name: 'Training Session',
        color: '#000000',
        id: 'dnd',
        statuses: ['Pending', 'Processing', 'Completed']
      },
    ]);
  
  
    const statusDropdownWorkTypes1 = [
      ...statusWorkTypes1,
      { id: 'divider', disabled: true },
      { name: 'Add Subtype', id: 'create-new-work-type' },
      { name: 'Edit Subtype', id: 'edit-selected-work-type' }
    ];
  
    const handleStatusWorkTypesChange1 = (updatedWorkTypes) => {
      setStatusWorkTypes1(updatedWorkTypes);
    };
  
    const handleStatusSelectionChange1 = (selectedWorkType) => {
      setSelectedProjectStatus(selectedWorkType);
    };
  
    // subtype worktype  end

     // schedule text editor start

      const [scheduleText, setScheduleText] = useState("The Minutes of Meeting (MoM) document captures the key points discussed, decisions made, and action items agreed upon during the meeting. It serves as a record for reference and accountability, ensuring all participants are aligned on the outcomes and next steps.")

     // schedule text editor end


  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <div className="page-title-box actjobbread">
            {/* Action items start */}
            <Row className="justify-content-between ac-items">
              <Col xxl={10} xl={12} lg={12} md={12} sm={12}>
                <span className="addcan-ac">
                  {selectedTasksData.length > 0 ? (
                    <span className="action-icons me-2">
                      <button
                        type="button"
                        className="btn btn-secondary import-res-btn me-1 md:w-8rem"
                      >
                        <i className="pi pi-user"></i>{" "}
                        {selectedTasksData.length} Selected
                      </button>

                      <span className="icons-ac">
                        <Tooltip
                          target=".view"
                          content="View"
                          position="bottom"
                          style={{ marginTop: "5px" }}
                        />

                        {/* <button
                          type="button"
                          class="btn btn-secondary icons-btn ms-1 view"
                          onClick={() => setVisibleViewRight(true)}
                        >
                          <i className="pi pi-eye"></i>
                        </button> */}
                        <button
                          type="button"
                          className="btn btn-secondary icons-btn ms-1 view"
                          onClick={() => {
                            setVisibleViewRight(true)
                            setActiveTabIndex(0);
                            // handleViewClick(rowData); 

                          }}
                        >
                          <i className="pi pi-eye"></i>
                        </button>

                        <Tooltip
                          target=".edit"
                          content="Edit"
                          position="top"
                          style={{ marginBottom: "5px" }}
                        />

                        <Link to="/candidate-editform" className="p-link">
                          <button
                            type="button"
                            class="btn btn-secondary icons-btn ms-1 edit"
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
                          class="btn btn-secondary icons-btn ms-1 delete"
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
                          class="btn btn-secondary icons-btn ms-1 archived"
                        >
                          <i className="pi pi-check-circle"></i>
                        </button>

                        {/* <button
                          type="button"
                          class="btn btn-secondary icons-btn ms-3 archived"
                           onClick={() => {setVisibleViewRight(true)
                                setActiveTabIndex(1)}} 
                        >
                          Sub Task
                        </button>

                        <button
                          type="button"
                          class="btn btn-secondary icons-btn ms-1 archived"
                            onClick={() => {SetAddSubTaskPopup(true)} } 
                        >
                          Add Sub Task
                        </button> */}


                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary import-res-btn md:w-10rem me-1"
                      onClick={() => {
                        setVisibleRight(true)
                      }}
                    >
                      <i className="pi pi-user me-1"></i> Add a Work Type
                    </button>
                  )}

                  <span className="drop-ac">
                    {/* <EmailAC /> */}

                    {/* <CascadeSelect
                      value={selectedActSms}
                      options={actSmsOptions}
                      optionLabel="name"
                      optionGroupLabel="name"
                      optionGroupChildren={["subItems", "subItems"]}
                      className="md:w-8rem me-1"
                      breakpoint="767px"
                      placeholder="SMS"
                    /> */}

                    <CascadeSelect
                      // value={selectedSchedule}
                      onChange={handleScheduleChange}
                      options={actScheduleOptions}
                      optionLabel="name"
                      optionGroupLabel="name"
                      className="md:w-10rem me-1"
                      optionGroupChildren={["subItems", "subItems"]}
                      breakpoint="767px"
                      placeholder="Schedule"
                    />

                    {/* <SubmitCandidatetoJob /> */}

                    {/* {selectedCustomers.length > 1 && <TalentScan />} */}

                    <LinkJobs />
                  </span>
                </span>
              </Col>
              <Col xxl={2} xl={12} lg={12} sm={12}>
                <div className="clr-icons">
                  {selectedTasksData.length > 0 ? (
                    <NotesCandidate />
                  ) : (
                    <Notes />
                  )}

                  {/* <div className="clr-icons">
                    <Toast ref={toast} />
                    <FileUpload
                      mode="basic"
                      name="demo[]"
                      url="/api/upload"
                      accept="image/*"
                      maxFileSize={1000000}
                      onUpload={onUpload}
                      chooseLabel="" // Remove text
                      chooseOptions={{  
                        className: "p-button p-button-icon-only mr-1 icons-btn",
                        icon: "pi pi-file-import",
                        iconOnly: true,
                      }}
                    />
                  </div> */}

                  {/* <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*"  uploadHandler={customBase64Uploader} /> */}

                  {/* <Tooltip
                    target=".import"
                    content="Export"
                    position="top"
                    style={{ marginBottom: "5px" }}
                  />
                  <FileUpload
                    mode="basic"
                    accept="/"
                    name="demo[]"
                    customUpload
                    data-pr-tooltip="Import Resume"
                    tooltip="Import Resume"
                    auto
                    uploadHandler={customBase64Uploader}
                    chooseLabel=""
                    chooseOptions={{
                      className:
                        "p-button p-button-icon-only mr-1 icons-btn import",
                      icon: "pi pi-file-import",
                      iconOnly: true,
                    }}
                  /> */}

                  <Tooltip
                    target=".export"
                    content="Export"
                    position="top"
                    style={{ marginBottom: "5px" }}
                  />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1 export"
                    onClick={() => setImportCsvIcons(!importCsvIcons)}
                    data-pr-tooltip="Export"
                    tooltip="Export"
                  >
                    <i className="pi pi-file-export"></i>
                  </button>

                  {importCsvIcons && <span>{headerBtn}</span>}

                  <Tooltip
                    target=".clear"
                    content="Clear Search"
                    position="top"
                    style={{ marginTop: "5px" }}
                  />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn clear"
                    onClick={handleClearSearchCandidates}
                    Tooltip="Clear Search"
                  >
                    <i className="pi pi-sync"></i>
                  </button>

                  <button
                    type="button"
                    className="mainbtn btn btn-secondary import-res-btn d-none"
                    tooltip="Merge"
                    tooltipOptions={{ position: "top" }}
                  >
                    <i className="pi pi-print"></i>
                  </button>
                </div>
              </Col>
            </Row>
            {/* Action items end */}

            {/* candidate table starts */}
            <Row>
              <Col sm={12}>
                <React.Fragment>
                  <section className="">
                    {/* Toast for notifications */}
                    <Toast ref={toast} />

                    {/* ContextMenu for right-click actions */}
                    <ContextMenu
                      model={menuModel}
                      ref={cm}
                      onHide={() => setSelectedCandidate(null)}
                    />

                    <div className="card1 mt-4 mb-4 actjobsumtable">
                      <DataTable
                        ref={dt}
                        value={tasksData}
                        rows={pageState.rows}
                        first={pageState.first}
                        onPage={onPage}
                        dataKey="task_code"
                        loading={loading}
                        scrollable
                        emptyMessage="No records found."
                        selection={selectedTasksData}
                        onSelectionChange={e => setSelectedTasksData(e.value)}
                        selectionMode="multiple"
                        filters={filters}
                        filterDisplay="row"
                        reorderableRows
                        resizableColumns
                        reorderableColumns
                        columnResizeMode="expand"
                        onContextMenu={e => {
                          cm.current.show(e.originalEvent)
                          setSelectedTask(e.data)
                        }}
                        contextMenuSelection={selectedTask}
                        onContextMenuSelectionChange={e =>
                          setSelectedTask(e.value)
                        }
                      >
                        <Column
                          selectionMode="multiple"
                          headerStyle={{ width: "3em" }}
                        />
                        {availableColumns
                          .filter(col => footerVisibleColumns.includes(col.field))
                          .map(col => (
                            <Column
                              key={col.field}
                              field={col.field}
                              header={col.header}
                              sortable
                              filter
                              style={col.style}
                              body={col.field === 'task_code' ? (rowData => (
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="project-code-hover"
                                  onClick={() => {
                                    setVisibleViewRight(true) // Show the sidebar
                                    setSelectedTask(rowData) // Set the selected job data
                                  }}
                                >
                                  {rowData.task_code}
                                </span>
                              )) : undefined}
                            />
                          ))}
                      </DataTable>
                    </div>
                  </section>
                </React.Fragment>
              </Col>
            </Row>
            {/* candidate table ends */}

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
                    <h3>Create a Work Type</h3>
                    <div className="d-flex align-items-center">
                      <Link to="/worktype-editform">
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
                    <Row className="mb-2">
                      <Col lg={6}>
                        <div className="p-field">
                          <label htmlFor="selectProject" className="block">
                            Project
                          </label>
                          <WorkType1
                            initialWorkTypes={moduleWorkTypes5}
                            dropdownWorkTypes={moduleDropdownWorkTypes5}
                            onWorkTypesChange={handleModuleWorkTypesChange}
                            onSelectionChange={handleModuleSelectionChange}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="city" className="mb-1">
                          Select Module
                        </label>
                        <WorkType1
                          initialWorkTypes={moduleWorkTypes}
                          dropdownWorkTypes={moduleDropdownWorkTypes}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2 mt-3">
                      <Col lg={6} className="mt-2">
                        <div className="p-field">
                          <label htmlFor="jobType" className="block">
                            Work Type
                          </label>

                          <WorkType />


                        </div>
                      </Col>

                      <Col lg={6}>
                        {
                          console.log(workTypes, "side bar")

                        }

                        {
                          workTypes === "sub-task" ? (<AddProjectDetails />) : ("")

                        }

                        <label htmlFor="job" className="block mb-1 mt-2">
                          Parent Work Type
                        </label>

                        <AddProjectDetails />

                        {/* {
                          
                          workTypes?.toLowerCase() === "sub-task" ? <AddProjectDetails /> : "sdfsd"
                        } */}
                      </Col>

                      {/* <Col lg={6}>

                        <label htmlFor="job" className="block mb-1 mt-2">
                            Parent Work Type
                        </label>

                        {
                           console.log(workTypes)
                        }

                        {
                         
                          
                          workTypes == "sub-task" ? <AddProjectDetails />: "sdfsd"

                        }
                        
                      </Col> */}


                      {/* <Col lg={6} className="mb-2">
                        <label htmlFor="city" className="mb-0 mt-2">
                          Parent Work Type
                        </label>
                        <Dropdown
                          value={selectedPriority}
                          onChange={e => setSelectedPriority(e.value)}
                          options={priorityOptions}
                          optionLabel="name"
                          placeholder="--select--"
                          className="bgclr mt-1"
                        />
                      </Col> */}



                      <Col lg={12} className="mb-1 mt-2">
                        <label htmlFor="city" className="mb-1">
                          Summary
                        </label>
                        <InputText
                          placeholder="Generate Monthly Report"
                          value={taskAssigned}
                        />
                      </Col>
                      <Col lg={6} className="mb-2">
                        <label htmlFor="city" className="mb-0 mt-2">
                          Priority
                        </label>
                        <Dropdown
                          value={selectedPriority}
                          onChange={e => setSelectedPriority(e.value)}
                          options={priorityOptions}
                          optionLabel="name"
                          placeholder="--select--"
                          className="bgclr mt-1"
                        />
                      </Col>

                      {/* <Col lg={6} className="mb-2 mt-2">
                        <label htmlFor="city" className="mb-1">
                          Status
                        </label>
                        <WorkType1
                          initialWorkTypes={moduleWorkTypes1}
                          dropdownWorkTypes={moduleDropdownWorkTypes1}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                        />
                      </Col> */}



                      <Col lg={6} className="mb-2 mt-2">
                        <label htmlFor="city" className="mb-1">
                          Assigned to
                        </label>
                        <WorkType1
                          initialWorkTypes={moduleWorkTypes2}
                          dropdownWorkTypes={moduleDropdownWorkTypes2}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                        />
                      </Col>

                      <Col lg={6} className="mb-3 mt-2">
                        <label htmlFor="city" className="mb-1">
                          Add Watcher
                        </label>
                        <WorkType1
                          initialWorkTypes={moduleWorkTypes22}
                          dropdownWorkTypes={moduleDropdownWorkTypes22}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                        />
                      </Col>
                    </Row>
                    {/* <Row className="mb-3">
                      
                    </Row> */}

                    {/* <Row className="mb-3">
                      <Col lg={6}>
                        <label htmlFor="city" className="mb-0">
                          Project
                        </label>
                        <Dropdown
                          value={selectedAss}
                          onChange={e => setSelectedAss(e.value)}
                          options={assOptions}
                          optionLabel="name"
                          placeholder="--select--"

                          className="bgclr"
                        />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="city" className="mb-0">
                          Project Manager
                        </label>
                        <InputText
                          placeholder=""
                          value={taskAssigned}
                        />
                      </Col>
                    </Row> */}

                    <Row className="mb-2 mt-1">
                      <Col lg={6}>
                        <label htmlFor="city" className="mb-1">
                          Work Hours (in hours)
                        </label>
                        <InputText
                          placeholder="4 hours"
                        // value={createFirst}
                        />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="jobStartDate" className="p-mb-2">
                          Start Date
                        </label>
                        <Calendar
                          id="jobStartDate"
                          value={jobStartDate}
                          onChange={e => setJobStartDate(e.value)}
                          dateFormat="dd/mm/yy"
                          placeholder="20/05/2025"
                          className="w-full activejobdrop"
                          showIcon
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={6}>
                        <label htmlFor="jobEndDate" className="mr-2">
                          End Date
                        </label>
                        <Calendar
                          id="jobEndDate"
                          value={jobEndDate}
                          onChange={e => setJobEndDate(e.value)}
                          dateFormat="dd/mm/yy"
                          placeholder="26/05/2025"
                          className="w-full activejobdrop"
                          showIcon
                        />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="jobStartDate" className="p-mb-2">
                          Actual End Date
                        </label>
                        <Calendar
                          id="jobStartDate"
                          value={jobStartDate}
                          onChange={e => setJobStartDate(e.value)}
                          dateFormat="dd/mm/yy"
                          placeholder="26/05/2025"
                          className="w-full activejobdrop"
                          showIcon
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3 mt-2">

                      <Col lg={6} >
                        <label htmlFor="city" className="mb-0">
                          Work Type Status
                        </label>
                        <WorkType1
                          initialWorkTypes={moduleWorkTypes1}
                          dropdownWorkTypes={moduleDropdownWorkTypes1}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                        />
                      </Col>
                      {/* <Col lg={6}>
                        <label htmlFor="city" className="mb-0">
                          Work Type Status
                        </label>
                       <WorkType1
                          initialWorkTypes={moduleWorkTypes2}
                          dropdownWorkTypes={moduleDropdownWorkTypes2}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                        />
                      </Col> */}
                      <Col lg={6}>
                        <label htmlFor="city" className="mb-0">
                          Approval Status
                        </label>
                        <Dropdown
                          value={selectedStatus}
                          onChange={e => setSelectedStatus(e.value)}
                          options={statusOptions}
                          optionLabel="name"
                          placeholder="--select--"
                          className="bgclr"
                        />
                      </Col>
                      {/* <Col lg={6}>
                        <label htmlFor="city" className="mb-0">
                          Priority
                        </label>
                        <Dropdown
                          value={selectedPriority}
                          onChange={e => setSelectedPriority(e.value)}
                          options={priorityOptions}
                          optionLabel="name"
                          placeholder="--select--"

                          className="bgclr"
                        />
                      </Col> */}
                    </Row>

                    <Row className="mb-3 mt-2">
                      <Col lg={12}>
                        <label
                          htmlFor="availabilityDate"
                          className="mb-0 avbdate"
                        >
                          Choose/ Drag Attachment
                        </label>

                        <input
                          type="file"
                          accept="image/jpg,image/jpeg,image/png,image/pdf"
                          className="form-control addEmp_ProfilePhoto"
                          id="MyPro_UploadedProfilePhoto_Modal_FilesInput"
                          multiple
                        />

                        <small className="text-danger">
                          {" "}
                          {PoliciesfilesErrorMessagepan}
                        </small>
                        <small className="text-muted">
                          Eg: (jpeg,png,pdf,jpg)
                        </small>
                      </Col>
                    </Row>

                    <Row className="mb-3 mt-1">
                      <Col lg={6}>
                        <label
                          htmlFor="availabilityDate"
                          className="mb-1 avbdate"
                        >
                          Linked WorkType
                        </label>
                        <WorkType1
                          initialWorkTypes={moduleWorkTypes3}
                          dropdownWorkTypes={moduleDropdownWorkTypes3}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                        />


                      </Col>
                    </Row>
                    <Row className="mb-3 mt-0">
                      <Col lg={6}>

                        <WorkType1
                          initialWorkTypes={moduleWorkTypes4}
                          dropdownWorkTypes={moduleDropdownWorkTypes4}
                          onWorkTypesChange={handleModuleWorkTypesChange}
                          onSelectionChange={handleModuleSelectionChange}
                          placeholder="Select Work Item"
                        />


                      </Col>
                    </Row>
                    
                    {/* Private Section */}
                    <Row className="mb-3 mt-3 justify-content-start align-items-center">
                      <Col lg={2}>
                        <div className="d-flex align-items-center">
                          <Checkbox
                            inputId="checkbox"
                            checked={popchecked2}
                            onChange={handlePopupCheckbox2}
                          />
                          <label htmlFor="checkbox" className="ms-2">
                            Private
                          </label>
                        </div>
                      </Col>

                         {popchecked2 && (
                        <Col lg={6}>
                          <label htmlFor="privateUsers" className="mb-2">User Id's</label>
                          <MultiSelect
                            value={privateDrop}
                            onChange={e => setPrivateDrop(e.value)}
                            options={PrivetDropdownValues}
                            optionLabel="name"
                            optionValue="value"
                            placeholder="Select Users"
                            className="w-full"
                            style={{border: '1px solid #ced4da'}}
                            display="comma"
                            maxSelectedLabels={3}
                          />
                        </Col>
                    )}
                    </Row>
                    
                 

                    <div className="buttons d-flex justify-content-end  mt-0">
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
                        // onClick={() => { reset(); setVisibleRight(false) }}
                        onClick={() => setVisibleRight(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Sidebar>
              </Col>
            </Row>
            {/* Side bar end */}


          </div>
        </Container>

        <Modal
          size="md"
          show={smShow}
          onHide={() => setSmShow(false)}
          className="text-center"
        >
          <Modal.Header closeButton>
            <h1 className="modal-title fs-5 "> Delete.?</h1>
          </Modal.Header>
          <div className="text-center m-3 text-danger"> </div>
          <h4 className="text-center">
            {" "}
            Are you sure you want to delete this..!{" "}
          </h4>
          <div className="text-center m-3">
            <Button
              className="btn btn-primary m-1"
              onClick={() => setSmShow(false)}
            >
              Cancel
            </Button>
            <button className="btn btn-primary m-1" onClick={deleteHandler}>
              {" "}
              Delete{" "}
            </button>
          </div>
        </Modal>
        <Modal
          size="md"
          show={successAlert}
          onHide={() => setSuccessAlert(false)}
          className="text-center"
        >
          <Modal.Header closeButton>
            <h1 className="modal-title fs-5 "> Success</h1>
          </Modal.Header>
          <div className="text-center m-3"> </div>
          <h4 className="text-center">Delete Successfully</h4>
          <div className="text-center m-3">
            <button
              className="btn btn-primary"
              onClick={() => setSuccessAlert(false)}
            >
              {" "}
              OK{" "}
            </button>
          </div>
        </Modal>
        <Modal
          size="md"
          show={successAlertinter}
          onHide={() => setsuccessAlertinter(false)}
          className="text-center"
        >
          <Modal.Header closeButton>
            <h1 className="modal-title fs-5 "> Success</h1>
          </Modal.Header>
          <div className="text-center m-3"> </div>
          <h4 className="text-center">Successfully</h4>
          <div className="text-center m-3">
            <button
              className="btn btn-primary"
              onClick={() => setsuccessAlertinter(false)}
            >
              {" "}
              OK{" "}
            </button>
          </div>
        </Modal>

        {/* view employee start */}
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
                  <i className="pi pi-users"></i>{" "}
                  {getSelectedTaskData()?.task_code || ""} -{" "}
                  {getSelectedTaskData()?.task_name || ""}
                </h3>
                <div className="d-flex align-items-center">
                  <Link to="/candidate-editform">
                    <p className="mb-0 text-white">
                      {" "}
                      <i className="fa-regular fa-pen-to-square me-3"></i>{" "}
                    </p>
                  </Link>
                  <Button
                    icon="pi pi-times"
                    className="p-button-text close-btn"
                    onClick={() => setVisibleViewRight(false)}
                  />
                </div>
              </div>
              <TabView className="mt-4" activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)}>
                <TabPanel header={getSelectedTaskData()?.task_code?.split('-')[0] || ""} leftIcon="pi pi-user mr-2">
                  <Row>
                    <Col lg={12}>
                      <Accordion activeIndex={0}>
                        <AccordionTab
                          header={
                            <span className="flex align-items-center gap-2 w-full">
                              <span className="white-space-nowrap">
                                {getSelectedTaskData()?.task_code?.split('-')[0]?.toUpperCase() || ""}  INFORMATION
                              </span>
                              <Badge value="-" className="ml-auto" />
                            </span>
                          }
                        >
                          <Row className="mb-4">
                            {/* 1. Project & Assignment */}
                            <Col lg={4} className="label-headsz">
                              <div className="section-header mb-3">
                                <h4 className="head-h4sz">
                                  Project & Assignment
                                </h4>
                              </div>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="selectProject"
                                      className="block"
                                    >
                                      Project
                                    </label>
                                    <Dropdown
                                      id="selectProject"
                                      value={
                                        getSelectedTaskData()?.project_name ||
                                        "VitelGlobal SupportStaff Portal - India"
                                      }
                                      options={[
                                        {
                                          label:
                                            "VitelGlobal SupportStaff Portal - India",
                                          value:
                                            "VitelGlobal SupportStaff Portal - India",
                                        },
                                        { label: "PAYG", value: "PAYG" },
                                        {
                                          label: "Omani Channel",
                                          value: "Omani Channel",
                                        },
                                        {
                                          label: "Vitel Meet",
                                          value: "Vitel Meet",
                                        },
                                        {
                                          label: "Project Dashboard",
                                          value: "Project Dashboard",
                                        },
                                        {
                                          label: "AI Generator (Proj-101)",
                                          value: "AI Generator (Proj-101)",
                                        },
                                        {
                                          label: "Sales Automation (Proj-102)",
                                          value: "Sales Automation (Proj-102)",
                                        },
                                        {
                                          label:
                                            "Security Enhancement (Proj-103)",
                                          value:
                                            "Security Enhancement (Proj-103)",
                                        },
                                        {
                                          label: "Payroll System (Proj-104)",
                                          value: "Payroll System (Proj-104)",
                                        },
                                        {
                                          label: "Tax Compliance (Proj-105)",
                                          value: "Tax Compliance (Proj-105)",
                                        },
                                        {
                                          label: "HR Automation (Proj-106)",
                                          value: "HR Automation (Proj-106)",
                                        },
                                        {
                                          label: "HR Automation (Proj-107)",
                                          value: "HR Automation (Proj-107)",
                                        },
                                        {
                                          label:
                                            "Performance System (Proj-108)",
                                          value:
                                            "Performance System (Proj-108)",
                                        },
                                        {
                                          label:
                                            "Project Management (Proj-109)",
                                          value:
                                            "Project Management (Proj-109)",
                                        },
                                        {
                                          label:
                                            "Communication System (Proj-110)",
                                          value:
                                            "Communication System (Proj-110)",
                                        },
                                        {
                                          label:
                                            "Document Management (Proj-111)",
                                          value:
                                            "Document Management (Proj-111)",
                                        },
                                      ]}
                                      onChange={e => {
                                        console.log(
                                          "Project selected:",
                                          e.value
                                        )
                                      }}
                                      placeholder="Select a Project"
                                      className="w-full"
                                      style={{ minHeight: "40px" }}
                                      panelStyle={{
                                        zIndex: 1000,
                                        minWidth: "100%",
                                      }}
                                      itemTemplate={option => (
                                        <div
                                          style={{
                                            padding: "8px 12px",
                                            minHeight: "35px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {option.label}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="selectModule"
                                      className="block"
                                    >
                                      Module
                                    </label>
                                    <Dropdown
                                      id="selectModule"
                                      value={
                                        getSelectedTaskData()?.module_name ||
                                        "Project Dashboard"
                                      }
                                      options={[
                                        {
                                          label: "User Management",
                                          value: "User Management",
                                        },
                                        {
                                          label: "Reporting",
                                          value: "Reporting",
                                        },
                                        {
                                          label: "Authentication",
                                          value: "Authentication",
                                        },
                                        {
                                          label: "Payroll Management",
                                          value: "Payroll Management",
                                        },
                                        {
                                          label: "E-Invoice Integration",
                                          value: "E-Invoice Integration",
                                        },
                                        {
                                          label: "Attendance Tracking",
                                          value: "Attendance Tracking",
                                        },
                                        {
                                          label: "Leave Management",
                                          value: "Leave Management",
                                        },
                                        {
                                          label: "Performance Evaluation",
                                          value: "Performance Evaluation",
                                        },
                                        {
                                          label: "Project Dashboard",
                                          value: "Project Dashboard",
                                        },
                                        {
                                          label: "Notification Center",
                                          value: "Notification Center",
                                        },
                                        {
                                          label: "File Management",
                                          value: "File Management",
                                        },
                                      ]}
                                      onChange={e => {
                                        console.log("Module selected:", e.value)
                                      }}
                                      placeholder="Select Module"
                                      className="w-full"
                                      style={{ minHeight: "40px" }}
                                      panelStyle={{
                                        zIndex: 1000,
                                        minWidth: "100%",
                                      }}
                                      itemTemplate={option => (
                                        <div
                                          style={{
                                            padding: "8px 12px",
                                            minHeight: "35px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {option.label}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="selectProjectManager"
                                      className="block"
                                    >
                                      Project Manager
                                    </label>
                                    <Dropdown
                                      id="selectProjectManager"
                                      value={
                                        getSelectedTaskData()
                                          ?.project_manager || "Nitin Sharma"
                                      }
                                      options={[
                                        {
                                          label: "Sneha Mehta - Team Lead",
                                          value: "Sneha Mehta",
                                        },
                                        {
                                          label: "Ankit Sinha - Manager",
                                          value: "Ankit Sinha",
                                        },
                                        {
                                          label:
                                            "Rahul Nair - Senior Developer",
                                          value: "Rahul Nair",
                                        },
                                        {
                                          label:
                                            "Rakesh Kumar - Project Coordinator",
                                          value: "Rakesh Kumar",
                                        },
                                        {
                                          label: "Neha Jain - Scrum Master",
                                          value: "Neha Jain",
                                        },
                                        {
                                          label: "Vikas Patil - Tech Lead",
                                          value: "Vikas Patil",
                                        },
                                        {
                                          label: "Manoj Bhatt - Manager",
                                          value: "Manoj Bhatt",
                                        },
                                        {
                                          label: "Karthik Rao - Team Lead",
                                          value: "Karthik Rao",
                                        },
                                        {
                                          label:
                                            "Nitin Sharma - Project Manager",
                                          value: "Nitin Sharma",
                                        },
                                        {
                                          label:
                                            "Arun Pillai - Project Manager",
                                          value: "Arun Pillai",
                                        },
                                        {
                                          label: "Devansh Goyal - Tech Lead",
                                          value: "Devansh Goyal",
                                        },
                                      ]}
                                      onChange={e => {
                                        console.log(
                                          "Project Manager selected:",
                                          e.value
                                        )
                                      }}
                                      placeholder="Select a Project Manager"
                                      className="w-full"
                                      style={{ minHeight: "40px" }}
                                      panelStyle={{
                                        zIndex: 1000,
                                        minWidth: "100%",
                                      }}
                                      itemTemplate={option => (
                                        <div
                                          style={{
                                            padding: "8px 12px",
                                            minHeight: "35px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {option.label}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="selectWatcher"
                                      className="block"
                                    >
                                      Watchers
                                    </label>
                                    <Dropdown
                                      id="selectWatcher"
                                      value={
                                        getSelectedTaskData()
                                          ?.watchers?.split(",")[0]
                                          ?.trim() || "Rajashree Banerjee"
                                      }
                                      options={[
                                        {
                                          label: "Rajashree Banerjee - QA Lead",
                                          value: "Rajashree Banerjee",
                                        },
                                        {
                                          label:
                                            "Nitin Sharma - Project Manager",
                                          value: "Nitin Sharma",
                                        },
                                        {
                                          label:
                                            "Amit Choudhary - Senior Developer",
                                          value: "Amit Choudhary",
                                        },
                                        {
                                          label:
                                            "Priya Singh - Business Analyst",
                                          value: "Priya Singh",
                                        },
                                        {
                                          label: "Rohit Kumar - Tech Architect",
                                          value: "Rohit Kumar",
                                        },
                                        {
                                          label: "Neha Gupta - Product Owner",
                                          value: "Neha Gupta",
                                        },
                                        {
                                          label:
                                            "Suresh Patel - DevOps Engineer",
                                          value: "Suresh Patel",
                                        },
                                        {
                                          label: "Kavita Sharma - UX Designer",
                                          value: "Kavita Sharma",
                                        },
                                        {
                                          label: "Ravi Sharma - Developer",
                                          value: "Ravi Sharma",
                                        },
                                        {
                                          label: "Sneha Mehta - Team Lead",
                                          value: "Sneha Mehta",
                                        },
                                        {
                                          label: "Ankit Sinha - Manager",
                                          value: "Ankit Sinha",
                                        },
                                        {
                                          label: "Meena Iyer - Developer",
                                          value: "Meena Iyer",
                                        },
                                        {
                                          label:
                                            "Rahul Nair - Senior Developer",
                                          value: "Rahul Nair",
                                        },
                                        {
                                          label: "Anita Reddy - Analyst",
                                          value: "Anita Reddy",
                                        },
                                        {
                                          label:
                                            "Rakesh Kumar - Project Coordinator",
                                          value: "Rakesh Kumar",
                                        },
                                        {
                                          label: "Suresh Babu - Developer",
                                          value: "Suresh Babu",
                                        },
                                        {
                                          label: "Neha Jain - Scrum Master",
                                          value: "Neha Jain",
                                        },
                                        {
                                          label:
                                            "Harsha Shetty - HR Specialist",
                                          value: "Harsha Shetty",
                                        },
                                        {
                                          label: "Vikas Patil - Tech Lead",
                                          value: "Vikas Patil",
                                        },
                                        {
                                          label: "Deepika Saini - Developer",
                                          value: "Deepika Saini",
                                        },
                                        {
                                          label: "Manoj Bhatt - Manager",
                                          value: "Manoj Bhatt",
                                        },
                                        {
                                          label: "Anjali Menon - HR Manager",
                                          value: "Anjali Menon",
                                        },
                                        {
                                          label: "Karthik Rao - Team Lead",
                                          value: "Karthik Rao",
                                        },
                                        {
                                          label: "Pooja Srinivasan - Developer",
                                          value: "Pooja Srinivasan",
                                        },
                                        {
                                          label:
                                            "Arun Pillai - Project Manager",
                                          value: "Arun Pillai",
                                        },
                                        {
                                          label: "Sneha Rathi - Developer",
                                          value: "Sneha Rathi",
                                        },
                                        {
                                          label: "Devansh Goyal - Tech Lead",
                                          value: "Devansh Goyal",
                                        },
                                      ]}
                                      onChange={e => {
                                        console.log(
                                          "Watcher selected:",
                                          e.value
                                        )
                                      }}
                                      placeholder="Select Watchers"
                                      className="w-full"
                                      style={{ minHeight: "40px" }}
                                      panelStyle={{
                                        zIndex: 1000,
                                        minWidth: "100%",
                                      }}
                                      itemTemplate={option => (
                                        <div
                                          style={{
                                            padding: "8px 12px",
                                            minHeight: "35px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {option.label}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label htmlFor="taskCode" className="block">
                                      Summary
                                    </label>
                                    <InputText
                                      id="taskCode"
                                      value={
                                        getSelectedTaskData()?.task_name || ""
                                      }
                                      readOnly
                                      placeholder=""
                                      className="block w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Col>

                            {/* 2. Basic Information */}
                            <Col lg={4} className="label-headsz">
                              <div className="section-header mb-3">
                                <h4 className="head-h4sz">Basic Information</h4>
                              </div>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label htmlFor="taskCode" className="block">
                                      Code
                                    </label>
                                    <InputText
                                      id="taskCode"
                                      value={
                                        getSelectedTaskData()?.task_code || ""
                                      }
                                      readOnly
                                      placeholder=""
                                      className="block w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="city"
                                      className="mb-1 w-100"
                                    >
                                      Select Module
                                    </label>
                                    <Dropdown
                                      value={getSelectedTaskData()?.module_name || ""}
                                      onChange={e => setSelectedMod(e.value)}
                                      options={modOptions}
                                      optionLabel="name"
                                      placeholder="User Management"
                                      // filter
                                      className="bgclr w-100"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="selectPriority"
                                      className="block"
                                    >
                                      Priority
                                    </label>
                                    <Dropdown
                                      id="selectPriority"
                                      value={
                                        getSelectedTaskData()?.priority ||
                                        "High"
                                      }
                                      options={[
                                        {
                                          label: "ðŸŸ¢ Low Priority",
                                          value: "Low",
                                        },
                                        {
                                          label: "ðŸŸ¡ Medium Priority",
                                          value: "Medium",
                                        },
                                        {
                                          label: "ðŸŸ  High Priority",
                                          value: "High",
                                        },
                                        {
                                          label: "ðŸ”´ Critical Priority",
                                          value: "Critical",
                                        },
                                      ]}
                                      placeholder="Select Priority Level"
                                      className="w-full"
                                      style={{ minHeight: "40px" }}
                                      panelStyle={{
                                        zIndex: 1000,
                                        minWidth: "100%",
                                      }}
                                      itemTemplate={option => (
                                        <div
                                          style={{
                                            padding: "8px 12px",
                                            minHeight: "35px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {option.label}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="selectTaskStatus"
                                      className="block"
                                    >
                                      Status
                                    </label>
                                    <Dropdown
                                      id="selectTaskStatus"
                                      value={
                                        getSelectedTaskData()?.task_status ||
                                        "In Progress"
                                      }
                                      options={[
                                        {
                                          label: "âšª Not Started",
                                          value: "Not Started",
                                        },
                                        {
                                          label: "ðŸ”µ In Progress",
                                          value: "In Progress",
                                        },
                                        {
                                          label: "â¸ï¸ On Hold",
                                          value: "On Hold",
                                        },
                                        {
                                          label: "ðŸŸ¡ Under Review",
                                          value: "Under Review",
                                        },
                                        {
                                          label: "ðŸ”„ Testing Phase",
                                          value: "Testing Phase",
                                        },
                                        {
                                          label: "âœ… Completed",
                                          value: "Completed",
                                        },
                                      ]}
                                      placeholder="Select Current Status"
                                      className="w-full"
                                      style={{ minHeight: "40px" }}
                                      panelStyle={{
                                        zIndex: 1000,
                                        minWidth: "100%",
                                      }}
                                      itemTemplate={option => (
                                        <div
                                          style={{
                                            padding: "8px 12px",
                                            minHeight: "35px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {option.label}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Col>

                            {/* 3. Timeline & Status */}
                            <Col lg={4} className="label-headsz">
                              <div className="section-header mb-3">
                                <h4 className="head-h4sz">Timeline & Status</h4>
                              </div>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="estimatedWorkHours"
                                      className="block"
                                    >
                                      Estimated Work Hours
                                    </label>
                                    <InputText
                                      id="estimatedWorkHours"
                                      value={
                                        getSelectedTaskData()?.work_hours ||
                                        "14"
                                      }
                                      readOnly
                                      placeholder="Hours"
                                      className="block w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="startDate"
                                      className="block"
                                    >
                                      Start Date
                                    </label>
                                    <InputText
                                      id="startDate"
                                      value={
                                        getSelectedTaskData()?.start_date || ""
                                      }
                                      readOnly
                                      placeholder=""
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label htmlFor="endDate" className="block">
                                      End Date
                                    </label>
                                    <InputText
                                      id="endDate"
                                      value={
                                        getSelectedTaskData()?.end_date || ""
                                      }
                                      readOnly
                                      placeholder=""
                                      className="block w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="actualEndDate"
                                      className="block"
                                    >
                                      Actual End Date
                                    </label>
                                    <InputText
                                      id="actualEndDate"
                                      value={
                                        getSelectedTaskData()
                                          ?.actual_end_date || ""
                                      }
                                      readOnly
                                      placeholder=""
                                      className="block w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>

                          {/* Task Description Section */}
                          <div className="mb-4">
                            <Row className="label-headsz">
                              <Col lg={12}>
                                <div className="p-field">
                                  <label
                                    htmlFor="taskDescription"
                                    className="block"
                                  >
                                    Description
                                  </label>
                                  <InputTextarea
                                    id="taskDescription"
                                    value={
                                      getSelectedTaskData()?.task_description ||
                                      ""
                                    }
                                    readOnly
                                    rows={4}
                                    cols={40}
                                    placeholder=""
                                    className="w-full"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </AccordionTab>

                        <AccordionTab
                          header={
                            <span className="flex align-items-center gap-2 w-full">
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
                                    field="certificate_name"
                                    header="Document Type"
                                    body={rowData =>
                                      editableTemplate(
                                        rowData,
                                        "certificate_name"
                                      )
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
                                    field="created_at"
                                    header="Applied Date & Time"
                                    body={rowData =>
                                      editableTemplate(rowData, "created_at")
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
                <TabPanel header="Sub Task" leftIcon="pi pi-file mr-2">
                  <Row>
                    <Col lg={12}>
                      <section className="job-datatable-section">
                        <div className="card1 mt-3 mb-4 actjobsumtable">
                          {/* <DataTable
                            responsive
                            showGridlines
                            value={subTask}
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
                            filters={subtaskFilters}
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
                            selection={selectedSubtask}
                            onSelectionChange={e => setSelectedSubtask(e.value)}
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
                          </DataTable> */}



                          <DataTable
                            value={subTask}
                            responsiveLayout="scroll"
                            showGridlines
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                            filters={subtaskFilters}
                            filterDisplay="row"
                            globalFilterFields={[
                              'task_code',
                              'task_type',
                              'project_name',
                              'project_manager',
                              'module_name',
                              'task_name',
                              'task_description',
                              'created_by',
                              'assigned_by',
                              'assigned_to',
                              'watchers',
                              'task_status',
                              'priority',
                              'approval_status',
                            ]}
                            emptyMessage="No records found."
                            selection={selectedSubtask}
                            onSelectionChange={(e) => setSelectedSubtask(e.value)}
                            selectionMode="multiple"
                            resizableColumns
                            columnResizeMode="expand"
                            tableStyle={{
                              minWidth: '100rem',
                              borderRadius: '8px',
                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                            <Column field="task_code" header="Work Type Code" sortable filter style={{ minWidth: '10rem', }} />
                            <Column field="task_type" header="Work Type" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="project_name" header="Project Name" sortable filter style={{ minWidth: '12rem' }} />
                            {/* <Column field="sub_task" header="Sub Task" sortable filter style={{ minWidth: '12rem' }} /> */}
                            <Column field="project_manager" header="Project Manager" sortable filter style={{ minWidth: '12rem' }} />
                            <Column field="module_name" header="Module" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="task_name" header="Task Name" sortable filter style={{ minWidth: '12rem' }} />

                            <Column
                              field="task_description"
                              header="Description"
                              sortable
                              filter
                              body={(rowData) => (
                                <span
                                  className="p-tooltip-target"
                                  data-pr-tooltip={rowData.task_description}
                                  style={{
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    // maxWidth: '200px',
                                    cursor: 'help',
                                  }}
                                >
                                  {rowData.task_description}
                                </span>
                              )}
                              style={{ minWidth: '14rem' }}
                            />

                            <Column field="created_by" header="Created By" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="assigned_by" header="Assigned By" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="assigned_to" header="Assigned To" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="watchers" header="Watchers" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="start_date" header="Start Date" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="work_hours" header="Work Hours" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="end_date" header="End Date" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="actual_end_date" header="Actual End Date" sortable filter style={{ minWidth: '12rem' }} />
                            <Column field="task_status" header="Status" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="priority" header="Priority" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="approval_status" header="Approval" sortable filter style={{ minWidth: '10rem' }} />
                          </DataTable>


                        </div>
                      </section>
                    </Col>
                  </Row>
                </TabPanel>

                {/* Bug code start */}



                <TabPanel header="Bug" leftIcon="pi pi-exclamation-circle mr-2">
                  <Row>
                    <Col lg={12}>
                      <section className="job-datatable-section">
                        <div className="card1 mt-3 mb-4 actjobsumtable">

                          <DataTable
                            value={BugData}
                            responsiveLayout="scroll"
                            showGridlines
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                            filters={subtaskFilters}
                            filterDisplay="row"
                            globalFilterFields={[
                              'task_code',
                              'task_type',
                              'project_name',
                              'project_manager',
                              'module_name',
                              'task_name',
                              'task_description',
                              'created_by',
                              'assigned_by',
                              'assigned_to',
                              'watchers',
                              'task_status',
                              'priority',
                              'approval_status',
                            ]}
                            emptyMessage="No records found."
                            selection={selectedSubtask}
                            onSelectionChange={(e) => setSelectedSubtask(e.value)}
                            selectionMode="multiple"
                            resizableColumns
                            columnResizeMode="expand"
                            tableStyle={{
                              minWidth: '100rem',
                              borderRadius: '8px',
                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                            <Column field="task_code" header="Work Type Code" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="task_type" header="Work Type" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="project_name" header="Project Name" sortable filter style={{ minWidth: '12rem' }} />
                            {/* <Column field="sub_task" header="Sub Task" sortable filter style={{ minWidth: '12rem' }} /> */}
                            <Column field="project_manager" header="Project Manager" sortable filter style={{ minWidth: '12rem' }} />
                            <Column field="module_name" header="Module" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="task_name" header="Task Name" sortable filter style={{ minWidth: '12rem' }} />

                            <Column
                              field="task_description"
                              header="Description"
                              sortable
                              filter
                              body={(rowData) => (
                                <span
                                  className="p-tooltip-target"
                                  data-pr-tooltip={rowData.task_description}
                                  style={{
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    // maxWidth: '200px',
                                    cursor: 'help',
                                  }}
                                >
                                  {rowData.task_description}
                                </span>
                              )}
                              style={{ minWidth: '14rem' }}
                            />

                            <Column field="created_by" header="Created By" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="assigned_by" header="Assigned By" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="assigned_to" header="Assigned To" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="watchers" header="Watchers" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="start_date" header="Start Date" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="work_hours" header="Work Hours" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="end_date" header="End Date" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="actual_end_date" header="Actual End Date" sortable filter style={{ minWidth: '12rem' }} />
                            <Column field="task_status" header="Status" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="priority" header="Priority" sortable filter style={{ minWidth: '10rem' }} />
                            <Column field="approval_status" header="Approval" sortable filter style={{ minWidth: '10rem' }} />
                          </DataTable>


                        </div>
                      </section>
                    </Col>
                  </Row>
                </TabPanel>

                {/* Bug code end */}

                {/* <TabPanel header="Sub Task - 2" leftIcon="pi pi-file mr-2">
                  <Row className="projectover-view">
                    <Col lg={12}>
                      <ProjectOverview />
                    </Col>
                  </Row>
                </TabPanel> */}
                {/* <TabPanel header="Pipeline" leftIcon="pi pi-cog mr-2">
                  <Row>
                    <Col lg={12}>
                      <div className="pipelinetabs">
                        <TabView
                          scrollable
                          style={{ maxWidth: "1200px", overflow: "hidden" }}
                        >
                          <TabPanel
                            header="Received"
                            rightIcon={
                              <Badge
                                value={receivedJobs.length}
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
                                      value={receivedJobs}
                                      responsiveLayout="scroll"
                                      showGridlines
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                                      onSelectionChange={e =>
                                        setSelectedReceivedJobs(e.value)
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
                                        field="contact"
                                        header="Hiring Manager"
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
                          <TabPanel
                            header="Potential"
                            rightIcon={
                              <Badge
                                value={potentialJobs.length}
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
                                      value={potentialJobs}
                                      responsiveLayout="scroll"
                                      showGridlines
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                                      onSelectionChange={e =>
                                        setSelectedPotentialJobs(e.value)
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
                          <TabPanel
                            header="Submitted"
                            rightIcon={
                              <Badge
                                value={submittedJobs.length}
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
                                      value={submittedJobs}
                                      responsiveLayout="scroll"
                                      showGridlines
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                          <TabPanel
                            header="Interview"
                            rightIcon={
                              <Badge
                                value={interviewJobs.length}
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
                                      value={interviewJobs}
                                      responsiveLayout="scroll"
                                      showGridlines
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                                      onSelectionChange={e =>
                                        setSelectedInterviewJobs(e.value)
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
                          <TabPanel
                            header="Offer"
                            rightIcon={
                              <Badge
                                value={offerJobs.length}
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
                                      value={offerJobs}
                                      responsiveLayout="scroll"
                                      showGridlines
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                                      onSelectionChange={e =>
                                        setSelectedOfferJobs(e.value)
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
                          <TabPanel
                            header="Rejected"
                            rightIcon={
                              <Badge
                                value={rejectedJobs.length}
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
                                      value={rejectedJobs}
                                      responsiveLayout="scroll"
                                      showGridlines
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                                      onSelectionChange={e =>
                                        setSelectedRejectedJobs(e.value)
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
                          <TabPanel
                            header="Placed"
                            rightIcon={
                              <Badge
                                value={placedJobs.length}
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
                                      value={placedJobs}
                                      responsiveLayout="scroll"
                                      showGridlines
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                                      onSelectionChange={e =>
                                        setSelectedPlacedJobs(e.value)
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
                        </TabView>
                      </div>
                    </Col>
                  </Row>
                </TabPanel> */}


                <TabPanel header="Activities" leftIcon="pi pi-calendar mr-2" disabled>
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
                <TabPanel header="History" leftIcon="pi pi-clock mr-2" disabled>
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

        {/* view employee end */}

       

      

      

        

       

       

{/* Replace all individual Dialog components with this single one: */} 

<Dialog
  header={scheduleDialog.title}
  visible={scheduleDialog.visible}
  className="interview-popup"
  style={{ width: "50vw" }}
  onHide={() => setScheduleDialog({ visible: false, type: '', title: '' })}
>
  <form>
    <p className="bg-form">
      <div className="mb-0">
        <Row className="mb-2">
          <Col xl={6}>
            <div className="p-field flex flex-column">
              <label htmlFor="interview">Type</label>
              <InputText
                disabled
                value={getTypeValue(scheduleDialog.type)}
                readOnly
              />
            </div>
          </Col>

          <Col xl={6}>
            <div className="p-field flex flex-column">
              <label htmlFor="integer" className="block">
                Sub-Type
              </label>
              {/* <Dropdown
                value={subtype}
                onChange={e => setSubtype(e.value)}
                options={getSubTypeOptions(scheduleDialog.type)}
                optionLabel="name"
                placeholder="Subtype"
                className="w-full search-option"
              /> */}

              <WorkType1
                                  initialWorkTypes={statusWorkTypes1}
                                  dropdownWorkTypes={statusDropdownWorkTypes1}
                                  onWorkTypesChange={handleStatusWorkTypesChange1}
                                  onSelectionChange={handleStatusSelectionChange1}
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

      <div className="mb-0">
        <Row className="mb-0">
          
            <Col xl={6}>
              <div className="p-field flex flex-column">
                                <label For="Candidate">Project</label>
                                <MultiSelect
                                  value={condidatevalu}
                                  disabled
                                  onChange={e => {
                                    condidatelist(e)
                                  }}
                                  options={typeInterviewcondi}
                                  optionLabel="name"
                                  placeholder={`AI Generator (Proj-101)`}
                                  maxSelectedLabels={0}
                                  className="w-full"
                                />
                              </div>
            </Col>
         
            <LinkJobsPopup />


        </Row>

        <Row className="mb-2">
         
          <Col xl={12}>
            <div className="p-field flex flex-column">
              <label htmlFor="username">Subject</label>
              <InputText
                placeholder="Call Request to Discuss Project Updates"
                value={subjectval}
                onChange={e => setsubjectval(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-2 mt-3">
          <Col xl={12}>
            <div className="">
              <label htmlFor="description" className="block">
                    Description
                  </label>
              <InputTextarea
                className="w-full"
                value={popTextares}
                onChange={e => setPopTextares(e.target.value)}
                placeholder="This is to schedule a quick sync-up regarding our ongoing tasks and any blockers. We’ll keep it short and focused on progress tracking and planning ahead."
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
                  <label htmlFor="Priority" className="block">
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
          {popchecked2 && (

            <Col xl={6}>
              <label htmlFor="username">User Id's</label>
              <MultiSelect
                value={privateDrop}
                onChange={e => setPrivateDrop(e.value)}
                options={PrivetDropdownValues}
                optionLabel="name"
                optionValue="value"
                placeholder="Select Users"
                className="w-full"
                style={{border: '1px solid #ced4da'}}
                display="comma"
                maxSelectedLabels={3}
              />
            </Col>
            // <Col xl={6}>
            //   <label htmlFor="username">User Id's</label>
            //   <Chips
            //     value={userid}
            //     onChange={e => setUserid(e.value)}
            //     itemTemplate={customChip}
            //     className="w-full"
            //   />
            // </Col>
          )}
        </Row>

         {popchecked && (
                        <Row>
                          <Col xl={12} className="mt-2">
                            <label className="mb-1">Minutes of Meeting</label>
                            <div className="schedule-editor">
                              <Editor
                                value={scheduleText}
                                onTextChange={e => setScheduleText(e.htmlValue)}
                                style={{ height: "auto" }}
                              />
                            </div>
                          </Col>
                        </Row>
                      )}
      </div>

      <Row className="mt-3">
        <Col xl={12}>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
            >
              <i className="pi pi-save me-1"></i>
              Save
            </button>
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
              onClick={() => setScheduleDialog({ visible: false, type: '', title: '' })}
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



      </div>
    </React.Fragment>
  )
}

export default WorkTypeAllActive



