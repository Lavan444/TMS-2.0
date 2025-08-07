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

import EmailAC from "./EmailAction"
import SubmitCandidatetoJob from "./SubmitCandidatetoJob"
import LinkContactsPopup from "pms/common-for-all/LinkContactsPopup"
import LinkContact2Popup from "pms/common-for-all/LinkContact2Popup"
import { useSelector } from "react-redux"
import TalentScan from "./TalentScan"
import ImportResume from "./ImportResumeCan"
import WorkType1 from "../common-for-all/WorkTypeOne"


const EmployeeAllActive = () => {

  // const { first, rows, } = useSelector(
  //   state => state.calendar.paginations
  // )


  const [selectedWorktypes, setSelectedWorktypes] = useState([]);


  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU3VwZXJ1c2VyIFJvbGUiXSwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3JvbGVzIiwibWFuYWdlX3Blcm1pc3Npb25zIiwibWFuYWdlX3JvbGVfdG9fZW1wbG95ZWUiXSwiZXhwIjoxNzM3MDIwOTEwLCJpYXQiOjE3MzQ0Mjg5MTB9.E8kanEh13Hf17sceMHgLvcl2SCpn7Bj5XvU5BdnSFV8`

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
  const [visibleViewRight, setVisibleViewRight] = useState(false)

  // Private functionality state
  const [privateDrop, setPrivateDrop] = useState(false);
  const [PrivetDropdown, setPrivetDropdown] = useState([]);
  const PrivetDropdownValues = [
    { name: 'Mahesh', value: 'mahesh' },
    { name: 'Lavan', value: 'lavan' },
    { name: 'Vinay', value: 'vinay' },
    { name: 'Vasantha', value: 'vasantha' }
  ];

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
  const [company, setCompany] = useState("Varun Digital Media")
  const [userIds, setUserIds] = useState("Harish")
  const [availabilityDate1, setavailabilityDate1] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("9876543211")
  const [workEmail, setWorkEmail] = useState("lavan9@infosys.com")
  const [editingRow, setEditingRow] = useState(null);
  const [editedValue, setEditedValue] = useState({});
  const [documents, setDocuments] = useState([
    {
      key: "1",
      data: {
        id: "1",
        certificate_name: "Resume",
        docSubject: "Resume - Lavankumar Kalvala",
        created_at: "2023-10-01 10:30 AM",
      },
    },
    {
      key: "2",
      data: {
        id: "2",
        certificate_name: "Offer Letter",
        docSubject: "Job offer for Lavankumar Kalvala",
        created_at: "2023-10-02 02:15 PM",
      },
    },
  ]);

  // Start editing a row
  const handleEdit = (rowKey) => {
    setEditingRow(rowKey);
    setEditedValue(documents.find((doc) => doc.key === rowKey)?.data || {});
  };

  // Save the edited data
  const handleSave = () => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.key === editingRow ? { ...doc, data: editedValue } : doc
      )
    );
    setEditingRow(null);
  };

  // Cancel editing
  const handleCancel = () => {
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
          <>
            <Button icon="pi pi-check" rounded outlined className="document-btn" onClick={handleSave} />
            <Button icon="pi pi-times" rounded outlined className="document-btn" onClick={handleCancel} />
          </>
        ) : (
          <Button icon="pi pi-pencil" rounded outlined className="document-btn" onClick={() => handleEdit(rowData.key)} />
        )}
        <Button icon="pi pi-trash" rounded outlined className="document-btn" onClick={() => handleDelete(rowData.key)} />
      </div>
    );
  };


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

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Firstname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Lastname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    JobTitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    MobilePhone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Yearsofexperience: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
      Company: "Pranathis Software Services",
      JobTitle: "Frontend Developer",
      PrimarySkills: "JavaScript, React",
      Email: "lavan9@pranthissoftwareservices.com",
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
      Firstname: "Ruchitha",
      Lastname: "Kalvala",
      Company: "Vitel Global Communications",
      JobTitle: "Frontend Developer",
      PrimarySkills: "JavaScript, React",
      Email: "ruchitha9@vitelglobalcommunication.com",
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
      id: 3,
      Firstname: "Venkata Laxmi",
      Lastname: "Valle",
      Company: "Pranathis Software Services",
      JobTitle: "Frontend Developer",
      PrimarySkills: "JavaScript, React",
      Email: "venkatalaxmi9@pranthissoftwareservices.com",
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
      id: 4,
      Firstname: "Nagendra",
      Lastname: "Meriga",
      Company: "Vitel Global Communications",
      JobTitle: "Content Writer",
      PrimarySkills: "Blog Writing, Article Writing",
      Email: "nagendra9@vitelglobalcommunication.com",
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
      Company: "Vitel Global Communications",
      JobTitle: "Backend",
      PrimarySkills: "Python, Flask",
      Email: "Saikumar9@vitelglobalcommunication.com",
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
      Company: "Pranathis Software Services",
      JobTitle: "Data Scientist",
      PrimarySkills: "Deep Learning, Machine Learning",
      Email: "Vasanth9@pranthissoftwareservices.com",
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
      Company: "Pranathis Software Services",
      JobTitle: "Web Developer",
      PrimarySkills: "HTML, JavaScript",
      Email: "Ajay9@pranthissoftwareservices.com",
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
      Firstname: "Bhargavi",
      Lastname: "Sunanda",
      Company: "Vitel Global Communications",
      JobTitle: "SEO",
      PrimarySkills: "On Page SEO, Off Page SEO",
      Email: "bhargavi9@vitelglobalcommunication.com",
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
      id: 9,
      Firstname: "Chandana",
      Lastname: "Modugula",
      Company: "Pranathis Software Services",
      JobTitle: "Frontend Developer",
      PrimarySkills: "HTML, React",
      Email: "chandana9@pranthissoftwareservices.com",
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
      Company: "Vitel Global Communications",
      JobTitle: "Graphic Designer",
      PrimarySkills: "Photoshop, Canva",
      Email: "RajaShekar9@vitelglobalcommunication.com",
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
      "id": 11,
      "Firstname": "Sandeep",
      "Lastname": "Reddy",
      "Company": "Tech Mahindra",
      "JobTitle": "Software Engineer",
      "PrimarySkills": "Java, Spring Boot",
      "Email": "sandeep9@techmahindra.com",
      "MobilePhone": "9876543216",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "15-03-2025",
      "ResumeAttachment": "Sandeep-1.pdf",
      "Categories": "Backend Developer",
      "Groups": "Java",
      "CreateDate": "20-02-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Harish",
      "Yearsofexperience": "4"
    },
    {
      "id": 12,
      "Firstname": "Nikhil",
      "Lastname": "Varma",
      "Company": "TCS",
      "JobTitle": "Data Analyst",
      "PrimarySkills": "SQL, Power BI",
      "Email": "nikhil9@tcs.com",
      "MobilePhone": "9876543220",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "10-03-2025",
      "ResumeAttachment": "Nikhil-1.pdf",
      "Categories": "Data Analysis",
      "Groups": "SQL",
      "CreateDate": "18-02-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Bhavani",
      "Yearsofexperience": "2"
    },
    {
      "id": 13,
      "Firstname": "Meghana",
      "Lastname": "Rao",
      "Company": "IBM",
      "JobTitle": "Cloud Engineer",
      "PrimarySkills": "AWS, Kubernetes",
      "Email": "meghana9@ibm.com",
      "MobilePhone": "9876543221",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "01-04-2025",
      "ResumeAttachment": "Meghana-1.pdf",
      "Categories": "Cloud Computing",
      "Groups": "AWS",
      "CreateDate": "22-02-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Giri",
      "Yearsofexperience": "3"
    },
    {
      "id": 14,
      "Firstname": "Praveen",
      "Lastname": "Kumar",
      "Company": "Accenture",
      "JobTitle": "Business Analyst",
      "PrimarySkills": "JIRA, Confluence",
      "Email": "praveen9@accenture.com",
      "MobilePhone": "9876543222",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "05-03-2025",
      "ResumeAttachment": "Praveen-1.pdf",
      "Categories": "Business Analysis",
      "Groups": "JIRA",
      "CreateDate": "25-02-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Sai Krishna",
      "Yearsofexperience": "5"
    },
    {
      "id": 15,
      "Firstname": "Anjali",
      "Lastname": "Sharma",
      "Company": "HCL Technologies",
      "JobTitle": "QA Engineer",
      "PrimarySkills": "Selenium, JUnit",
      "Email": "anjali9@hcl.com",
      "MobilePhone": "9876543223",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "20-03-2025",
      "ResumeAttachment": "Anjali-1.pdf",
      "Categories": "Testing",
      "Groups": "Automation",
      "CreateDate": "27-02-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Harish",
      "Yearsofexperience": "4"
    },
    {
      "id": 16,
      "Firstname": "Rajesh",
      "Lastname": "Naidu",
      "Company": "Wipro",
      "JobTitle": "DevOps Engineer",
      "PrimarySkills": "Docker, Jenkins",
      "Email": "rajesh9@wipro.com",
      "MobilePhone": "9876543224",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "10-04-2025",
      "ResumeAttachment": "Rajesh-1.pdf",
      "Categories": "DevOps",
      "Groups": "CI/CD",
      "CreateDate": "01-03-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Bhavani",
      "Yearsofexperience": "6"
    },
    {
      "id": 17,
      "Firstname": "Swathi",
      "Lastname": "Joshi",
      "Company": "Amazon",
      "JobTitle": "AI Engineer",
      "PrimarySkills": "Python, TensorFlow",
      "Email": "swathi9@amazon.com",
      "MobilePhone": "9876543225",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "05-04-2025",
      "ResumeAttachment": "Swathi-1.pdf",
      "Categories": "AI ML",
      "Groups": "Deep Learning",
      "CreateDate": "03-03-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Harish",
      "Yearsofexperience": "3"
    },
    {
      "id": 18,
      "Firstname": "Varun",
      "Lastname": "Chakravarthy",
      "Company": "Flipkart",
      "JobTitle": "Cybersecurity Analyst",
      "PrimarySkills": "Ethical Hacking, Penetration Testing",
      "Email": "varun9@flipkart.com",
      "MobilePhone": "9876543226",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "15-04-2025",
      "ResumeAttachment": "Varun-1.pdf",
      "Categories": "Cybersecurity",
      "Groups": "Security",
      "CreateDate": "05-03-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Sai Krishna",
      "Yearsofexperience": "4"
    },
    {
      "id": 19,
      "Firstname": "Priya",
      "Lastname": "Deshmukh",
      "Company": "Google",
      "JobTitle": "Full Stack Developer",
      "PrimarySkills": "React, Node.js",
      "Email": "priya9@google.com",
      "MobilePhone": "9876543227",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "01-05-2025",
      "ResumeAttachment": "Priya-1.pdf",
      "Categories": "Full Stack Development",
      "Groups": "React",
      "CreateDate": "07-03-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Harish",
      "Yearsofexperience": "5"
    },
    {
      "id": 20,
      "Firstname": "Srinivas",
      "Lastname": "Palle",
      "Company": "Microsoft",
      "JobTitle": "System Administrator",
      "PrimarySkills": "Windows Server, Linux Administration",
      "Email": "srinivas9@microsoft.com",
      "MobilePhone": "9876543228",
      "City": "Hyderabad",
      "Status": "Active",
      "EmployeeType": "Full-Time",
      "Relocation": "Yes",
      "AvailabilityDate": "10-05-2025",
      "ResumeAttachment": "Srinivas-1.pdf",
      "Categories": "IT Support",
      "Groups": "SysAdmin",
      "CreateDate": "09-03-2025",
      "EditDate": "28-02-2025",
      "CreatedBy": "Giri",
      "Yearsofexperience": "7"
    }
  ]);
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
  const [selectedCandidate, setSelectedCandidate] = useState(null); // State to track the right-clicked candidate

  const cm = useRef(null); // Reference for ContextMenu

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
    let _candidates = [...candidateData];
    _candidates = _candidates.filter((c) => c.id !== candidate.id);
    setCandidateData(_candidates); // Update the candidate data state
    toast.current.show({ severity: 'error', summary: 'Candidate Deleted', detail: `Deleted ${candidate.Firstname} ${candidate.Lastname}` });
  };

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
    { name: "Completed", value: "Completed" }
  ]
  const uniqueCategories = [
    { name: "Frontend", value: "Frontend" },
    { name: "SEO", value: "SEO" },
    { name: "Content Writing", value: "Content Writing" },
    { name: "AI ML", value: "AI ML" }
  ]
  const filteredGroups = [
    { name: "React", value: "React" },
    { name: "Blog Writing", value: "Blog Writing" },
    { name: "Machine Learning", value: "Machine Learning" },
    { name: "On Page SEO", value: "On Page SEO" }
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

  // Project start




  const [worktypeFilters, setWorktypeFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    worktype_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    module: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    summary: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_manager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });



  const worktypeData = [
    {
      worktype_code: "Proj-101",
      project_name: "AI Generator",
      module: "Login",
      summary: "Implement user login",
      project_manager: "Mahesh Kumar Bhoga",
      status: "In Progress",
      assigned_to: "Lavankumar",
      start_date: "01-01-2025",
      end_date: "31-12-2025",
    },
    
  ];





  // Project end


    // View worktype start
      
        const CompanyProjects = [
         
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
            assigned_to: "Lavankumar",
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
            assigned_to: "Lavankumar",
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
            assigned_to: "Lavankumar",
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
      type: "Call",
      sub_type: "Introductory Call",
      priority: "High",
      subject: "Call Request to Discuss Project Updates",
      date_time: "01-01-2025 10:00",
      user_id: "lavankumar",
    },
    {
      type: "Meeting",
      sub_type: "Daily Stand-up",
      priority: "Medium",
      subject: "Project Progress and Next Steps",
      date_time: "05-12-2024 09:00",
      user_id: "lavankumar",
    },
    {
      type: "Event",
      sub_type: "Follow-up Call",
      priority: "Low",
      subject: "Meeting Request",
      date_time: "15-01-2025 14:00",
      user_id: "lavankumar",
    },
    {
      type: "Others",
      sub_type: "Requirement Discussion",
      priority: "High",
      subject: "Discussion on Future Milestones",
      date_time: "01-02-2025 11:00",
      user_id: "lavankumar",
    },
    {
      type: "Call",
      sub_type: "Follow-up Call",
      priority: "Critical",
      subject: "Need to Discuss Project Status",
      date_time: "01-03-2025 13:00",
      user_id: "lavankumar",
    },
  ];

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
      type: "Meeting",
      sub_type: "Daily Stand-up",
      priority: "Medium",
      subject: "Project Progress and Next Steps",
      date_time: "05-12-2024 09:00",
      user_id: "lavankumar",
    },
    {
      type: "Call",
      sub_type: "Introductory Call",
      priority: "High",
      subject: "Call Request to Discuss Project Updates",
      date_time: "01-01-2025 10:00",
      user_id: "lavankumar",
    },
    {
      type: "Event",
      sub_type: "Follow-up Call",
      priority: "Low",
      subject: "Meeting Request",
      date_time: "15-01-2025 14:00",
      user_id: "lavankumar",
    },
   
    {
      type: "Call",
      sub_type: "Follow-up Call",
      priority: "Critical",
      subject: "Need to Discuss Project Status",
      date_time: "01-03-2025 13:00",
      user_id: "lavankumar",
    },
     {
      type: "Others",
      sub_type: "Requirement Discussion",
      priority: "High",
      subject: "Discussion on Future Milestones",
      date_time: "01-02-2025 11:00",
      user_id: "lavankumar",
    },
  ];



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
      name: "Interview",
      code: "SCH-IN",
      icon: "pi pi-user",
      action: () => SetInterviewpop(true),
    },
    {
      name: "Call",
      code: "SCH-CA",
      icon: "pi pi-phone",
      action: () => SetInterviewpopCall(true),
    },
    {
      name: "Meeting",
      code: "SCH-ME",
      icon: "pi pi-calendar",
      action: () => SetInterviewpopMeeting(true),
    },
    {
      name: "Task",
      code: "SCH-TA",
      icon: "pi pi-check-square",
      action: () => SetInterviewpopTask(true),
    },
    {
      name: "Event",
      code: "SCH-EV",
      icon: "pi pi-bell",
      action: () => SetInterviewpopEvent(true),
    },
    {
      name: "Other",
      code: "SCH-OT",
      icon: "pi pi-ellipsis-h",
      action: () => SetInterviewpopOther(true),
    },
  ]

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
      Yearsofexperience: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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

  const [selectedCompany, setSelectedCompany] = useState(null)
  const CompanyOptions = [
    { name: "Pranathi Software Services", code: "Pranathi" },
    { name: "Varun Digital Media", code: "Varun" },
    { name: "Vitel Global Communications", code: "Vitel" },
    { name: "SPG America", code: "SPG" },

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
  const [createCompany, setCreateCompany] = useState("Varun Digital Media")
  const [createDate, setCreateDate] = useState("28-02-2025")
  const [notes1, setNotes1] = useState("Lavankumar Kalvala is a Frontend Developer at Varun Digital Media, skilled in JavaScript and React. He is currently active and available for work from 20-02-2025. With 2 years of experience, he is open to relocation and belongs to the Frontend category (React group).")

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

   // Company work type start
  
  
    const [selectedModule, setSelectedModule] = useState(null)
  
    const [moduleWorkTypes, setModuleWorkTypes] = useState([
      {
        name: "Pranathi Software Services",
        color: "#000000",
        id: "custom-task",
        statuses: ["Pending", "Processing", "Completed"],
      },
      {
        name: "Varun Digital Media",
        color: "#000000",
        id: "custom-task1",
        statuses: ["Pending", "Processing", "Completed"],
      },
      {
        name: "Vitel Global Communication",
        color: "#000000",
        id: "custom-task2",
        statuses: ["Pending", "Processing", "Completed"],
      },
      {
        name: "SPG",
        color: "#000000",
        id: "custom-task3",
        statuses: ["Pending", "Processing", "Completed"],
      },
    ])
  
    const moduleDropdownWorkTypes = [
      ...moduleWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add Company", id: "create-new-work-type" },
      { name: "Edit Company", id: "edit-selected-work-type" },
    ]
  
    const handleModuleWorkTypesChange = updatedWorkTypes => {
      setModuleWorkTypes(updatedWorkTypes)
    }
  
    const handleModuleSelectionChange = selectedWorkType => {
      setSelectedModule(selectedWorkType)
    }
  
    // Company work type end

    // Designation work type start
    const [selectedDesignation, setSelectedDesignation] = useState(null)
    
    const [designationWorkTypes, setDesignationWorkTypes] = useState([
      {
        name: "Software Engineer",
        color: "#000000",
        id: "designation-1",
        statuses: ["Junior", "Mid", "Senior"],
      },
      {
        name: "Senior Software Engineer",
        color: "#000000",
        id: "designation-2",
        statuses: ["Team Lead", "Technical Lead", "Architect"],
      },
      {
        name: "Team Lead",
        color: "#000000",
        id: "designation-3",
        statuses: ["Active", "Training", "Available"],
      },
      {
        name: "Project Manager",
        color: "#000000",
        id: "designation-4",
        statuses: ["Active", "Planning", "Delivery"],
      },
      {
        name: "Tech Lead",
        color: "#000000",
        id: "designation-5",
        statuses: ["Active", "Mentoring", "Development"],
      },
      {
        name: "Full Stack Developer",
        color: "#000000",
        id: "designation-6",
        statuses: ["Frontend", "Backend", "Full Stack"],
      },
    ])
    
    const designationDropdownWorkTypes = [
      ...designationWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add Designation", id: "create-new-designation-type" },
      { name: "Edit Designation", id: "edit-selected-designation-type" },
    ]
    
    const handleDesignationWorkTypesChange = updatedWorkTypes => {
      setDesignationWorkTypes(updatedWorkTypes)
    }
    
    const handleDesignationSelectionChange = selectedWorkType => {
      setSelectedDesignation(selectedWorkType)
    }
    // Designation work type end

    // Employee Type work type start
    const [selectedEmployeeType, setSelectedEmployeeType] = useState(null)
    
    const [employeeTypeWorkTypes, setEmployeeTypeWorkTypes] = useState([
      {
        name: "Full-time",
        color: "#000000",
        id: "emp-type-1",
        statuses: ["Permanent", "Probation", "Confirmed"],
      },
      {
        name: "Part-time",
        color: "#000000",
        id: "emp-type-2",
        statuses: ["Active", "Flexible", "Fixed Hours"],
      },
      {
        name: "Contract",
        color: "#000000",
        id: "emp-type-3",
        statuses: ["Active", "Renewal", "Completed"],
      },
      {
        name: "Intern",
        color: "#000000",
        id: "emp-type-4",
        statuses: ["Training", "Active", "Graduated"],
      },
      {
        name: "Consultant",
        color: "#000000",
        id: "emp-type-5",
        statuses: ["Available", "Engaged", "Project Based"],
      },
      {
        name: "Freelancer",
        color: "#000000",
        id: "emp-type-6",
        statuses: ["Available", "Busy", "Project Based"],
      },
      {
        name: "Temporary",
        color: "#000000",
        id: "emp-type-7",
        statuses: ["Active", "Short Term", "Seasonal"],
      },
    ])
    
    const employeeTypeDropdownWorkTypes = [
      ...employeeTypeWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add Employee Type", id: "create-new-emp-type" },
      { name: "Edit Employee Type", id: "edit-selected-emp-type" },
    ]
    
    const handleEmployeeTypeWorkTypesChange = updatedWorkTypes => {
      setEmployeeTypeWorkTypes(updatedWorkTypes)
    }
    
    const handleEmployeeTypeSelectionChange = selectedWorkType => {
      setSelectedEmployeeType(selectedWorkType)
    }
    // Employee Type work type end

    // Department work type start
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    
    const [departmentWorkTypes, setDepartmentWorkTypes] = useState([
      {
        name: "Engineering",
        color: "#000000",
        id: "dept-1",
        statuses: ["Development", "Testing", "DevOps"],
      },
      {
        name: "Human Resources",
        color: "#000000",
        id: "dept-2",
        statuses: ["Recruitment", "Training", "Operations"],
      },
      {
        name: "Finance",
        color: "#000000",
        id: "dept-3",
        statuses: ["Accounting", "Payroll", "Budgeting"],
      },
      {
        name: "Marketing",
        color: "#000000",
        id: "dept-4",
        statuses: ["Digital", "Content", "Campaign"],
      },
      {
        name: "Sales",
        color: "#000000",
        id: "dept-5",
        statuses: ["Lead Generation", "Client Relations", "Business Development"],
      },
      {
        name: "Operations",
        color: "#000000",
        id: "dept-6",
        statuses: ["Admin", "Support", "Maintenance"],
      },
    ])
    
    const departmentDropdownWorkTypes = [
      ...departmentWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add Department", id: "create-new-dept-type" },
      { name: "Edit Department", id: "edit-selected-dept-type" },
    ]
    
    const handleDepartmentWorkTypesChange = updatedWorkTypes => {
      setDepartmentWorkTypes(updatedWorkTypes)
    }
    
    const handleDepartmentSelectionChange = selectedWorkType => {
      setSelectedDepartment(selectedWorkType)
    }
    // Department work type end

    // Work Location work type start
    const [selectedWorkLocation, setSelectedWorkLocation] = useState(null)
    
    const [workLocationWorkTypes, setWorkLocationWorkTypes] = useState([
      {
        name: "Remote",
        color: "#000000",
        id: "location-1",
        statuses: ["Full Remote", "Occasional Office", "International"],
      },
      {
        name: "Office",
        color: "#000000",
        id: "location-2",
        statuses: ["Main Office", "Branch Office", "Co-working"],
      },
      {
        name: "Hybrid",
        color: "#000000",
        id: "location-3",
        statuses: ["3 Days Office", "2 Days Office", "Flexible"],
      },
      {
        name: "Client Site",
        color: "#000000",
        id: "location-4",
        statuses: ["On-site", "Temporary", "Project Based"],
      },
    ])
    
    const workLocationDropdownWorkTypes = [
      ...workLocationWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add Work Location", id: "create-new-location-type" },
      { name: "Edit Work Location", id: "edit-selected-location-type" },
    ]
    
    const handleWorkLocationWorkTypesChange = updatedWorkTypes => {
      setWorkLocationWorkTypes(updatedWorkTypes)
    }
    
    const handleWorkLocationSelectionChange = selectedWorkType => {
      setSelectedWorkLocation(selectedWorkType)
    }
    // Work Location work type end

    // Shift Timings work type start
    const [selectedShiftTiming, setSelectedShiftTiming] = useState(null)
    
    const [shiftTimingWorkTypes, setShiftTimingWorkTypes] = useState([
      {
        name: "Day Shift (9:00 AM - 6:00 PM)",
        color: "#000000",
        id: "shift-1",
        statuses: ["Regular", "Extended", "Flexible Start"],
      },
      {
        name: "Evening Shift (2:00 PM - 11:00 PM)",
        color: "#000000",
        id: "shift-2",
        statuses: ["Regular", "Extended", "Weekend"],
      },
      {
        name: "Night Shift (11:00 PM - 8:00 AM)",
        color: "#000000",
        id: "shift-3",
        statuses: ["Regular", "Weekend", "Rotational"],
      },
      {
        name: "Flexible Hours",
        color: "#000000",
        id: "shift-4",
        statuses: ["Core Hours", "Full Flex", "Meeting Based"],
      },
      {
        name: "US Shift (6:30 PM - 3:30 AM)",
        color: "#000000",
        id: "shift-5",
        statuses: ["EST", "PST", "CST"],
      },
      {
        name: "UK Shift (1:30 PM - 10:30 PM)",
        color: "#000000",
        id: "shift-6",
        statuses: ["GMT", "BST", "Extended"],
      },
    ])
    
    const shiftTimingDropdownWorkTypes = [
      ...shiftTimingWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add Shift Timing", id: "create-new-shift-type" },
      { name: "Edit Shift Timing", id: "edit-selected-shift-type" },
    ]
    
    const handleShiftTimingWorkTypesChange = updatedWorkTypes => {
      setShiftTimingWorkTypes(updatedWorkTypes)
    }
    
    const handleShiftTimingSelectionChange = selectedWorkType => {
      setSelectedShiftTiming(selectedWorkType)
    }
    // Shift Timings work type end

    // City work type start
    const [selectedCity, setSelectedCity] = useState(null)
    
    const [cityWorkTypes, setCityWorkTypes] = useState([
      {
        name: "Hyderabad",
        color: "#000000",
        id: "city-1",
        statuses: ["Tech Hub", "IT Corridor", "HITEC City"],
      },
      {
        name: "Chennai",
        color: "#000000",
        id: "city-2",
        statuses: ["IT Hub", "OMR", "Sholinganallur"],
      },
      {
        name: "Mumbai",
        color: "#000000",
        id: "city-3",
        statuses: ["Financial Capital", "BKC", "Lower Parel"],
      },
      {
        name: "Bangalore",
        color: "#000000",
        id: "city-4",
        statuses: ["Silicon Valley", "Electronic City", "Whitefield"],
      },
      {
        name: "Delhi",
        color: "#000000",
        id: "city-5",
        statuses: ["NCR", "Gurgaon", "Noida"],
      },
    ])
    
    const cityDropdownWorkTypes = [
      ...cityWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add City", id: "create-new-city-type" },
      { name: "Edit City", id: "edit-selected-city-type" },
    ]
    
    const handleCityWorkTypesChange = updatedWorkTypes => {
      setCityWorkTypes(updatedWorkTypes)
    }
    
    const handleCitySelectionChange = selectedWorkType => {
      setSelectedCity(selectedWorkType)
    }
    // City work type end

    // Employee Status work type start
    const [selectedEmployeeStatus, setSelectedEmployeeStatus] = useState(null)
    
    const [employeeStatusWorkTypes, setEmployeeStatusWorkTypes] = useState([
      {
        name: "Active",
        color: "#28a745",
        id: "emp-status-1",
        statuses: ["Working", "Available", "On Project"],
      },
      {
        name: "Inactive",
        color: "#dc3545",
        id: "emp-status-2",
        statuses: ["Resigned", "Terminated", "Suspended"],
      },
      {
        name: "On Leave",
        color: "#ffc107",
        id: "emp-status-3",
        statuses: ["Sick Leave", "Annual Leave", "Maternity/Paternity"],
      },
      {
        name: "Probation",
        color: "#17a2b8",
        id: "emp-status-4",
        statuses: ["New Hire", "Under Review", "Extended"],
      },
      {
        name: "Notice Period",
        color: "#fd7e14",
        id: "emp-status-5",
        statuses: ["Serving Notice", "Last Week", "Knowledge Transfer"],
      },
      {
        name: "Bench",
        color: "#6f42c1",
        id: "emp-status-6",
        statuses: ["Awaiting Project", "Training", "Skill Development"],
      },
    ])
    
    const employeeStatusDropdownWorkTypes = [
      ...employeeStatusWorkTypes,
      { id: "divider", disabled: true },
      { name: "Add Employee Status", id: "create-new-emp-status-type" },
      { name: "Edit Employee Status", id: "edit-selected-emp-status-type" },
    ]
    
    const handleEmployeeStatusWorkTypesChange = updatedWorkTypes => {
      setEmployeeStatusWorkTypes(updatedWorkTypes)
    }
    
    const handleEmployeeStatusSelectionChange = selectedWorkType => {
      setSelectedEmployeeStatus(selectedWorkType)
    }
    // Employee Status work type end

  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <div className="page-title-box actjobbread">
            {/* Action items start */}
            <Row className="justify-content-between ac-items">
              <Col xxl={10} xl={12} lg={12} md={12} sm={12}>
                <span className="addcan-ac">
                  {selectedCustomers.length > 0 ? (
                    <span className="action-icons me-2">
                      <button
                        type="button"
                        className="btn btn-secondary import-res-btn me-1 md:w-8rem"
                      >
                        <i className="pi pi-user"></i>{" "}
                        {selectedCustomers.length} Selected
                      </button>

                      <span className="icons-ac">
                        <Tooltip
                          target=".view"
                          content="View"
                          position="bottom"
                          style={{ marginTop: "5px" }}
                        />

                        <button
                          type="button"
                          class="btn btn-secondary icons-btn ms-1 view"
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

                        <Link to="/employee-edit" className="p-link">
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
                      <i className="pi pi-user me-1"></i> Add a Employee
                    </button>
                  )}
                </span>

                <span className="drop-ac">
                  {/* <EmailAC /> */}

                  {/* <CascadeSelect
                    // value={selectedActSms}
                    options={actSmsOptions}
                    optionLabel="name"
                    optionGroupLabel="name"
                    optionGroupChildren={["subItems", "subItems"]}
                    className="md:w-8rem me-1"
                    breakpoint="767px"
                    placeholder="SMS"
                  /> */}
{/* 
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
                  /> */}

                  {/* <SubmitCandidatetoJob />

                  {selectedCustomers.length > 1 && (
                    <TalentScan />
                  )}

                  <LinkJobs /> */}

                </span>
              </Col>

              <Col xxl={2} xl={12} lg={12} sm={12}>
                <div className="clr-icons">
                  {selectedCustomers.length > 0 ? (
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
                    position="bottom"
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
                    tooltipOptions={{ position: "bottom" }}
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
                    <ContextMenu model={menuModel} ref={cm} onHide={() => setSelectedCandidate(null)} />

                    <div className="card1 mt-4 mb-4 actjobsumtable">
                      <DataTable
                        ref={dt}
                        value={candidateData.slice(pageState.first, pageState.first + pageState.rows)}
                        rows={pageState.rows}
                        first={pageState.first}
                        // value={candidateData.slice(first, first + rows)}
                        // rows={rows}
                        // first={first}
                        rowsPerPageOptions={[5, 10, 25, 50]} // Rows per page options
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        onPage={onPage}
                        dataKey="id"
                        filters={filters}
                        filterDisplay="row"
                        loading={loading}
                        globalFilterFields={[
                          "id",
                          "Firstname",
                          "Lastname",
                          "MobilePhone",
                          "JobTitle",
                          "Email",
                          "Company",
                          "EditDate",
                          "Yearsofexperience",
                          "City",
                          "CreateDate",
                          "Status",
                          "Relocation",
                          "Categories",
                          "Groups",
                          "AvailabilityDate",
                          "PrimarySkills",
                          "CreatedBy",
                          "ResumeAttachment",
                        ]}
                        scrollable
                        emptyMessage="No customers found."
                        selection={selectedCustomers}
                        onSelectionChange={onSelectionChange}
                        selectionMode="multiple"
                        size={size}
                        reorderableRows
                        reorderableColumns
                        onRowReorder={onRowReorder}
                        // columnResizeMode = "expand"
                        rowGroupMode="rowspan"
                        rowClassName="row-bottom-color" // Apply custom row style
                        totalRecords={customers.length} // Ensure totalRecords is correctly set
                        // scrollHeight="400px"
                        editMode="cell"
                        resizableColumns // Enable resizable columns
                        columnResizeMode="expand" // Choose between "fit" or "expand"
                        onContextMenu={(e) => {
                          cm.current.show(e.originalEvent); // Show the context menu
                          setSelectedCandidate(e.data); // Set the selected candidate
                        }}
                        contextMenuSelection={selectedCandidate}
                        onContextMenuSelectionChange={(e) => setSelectedCandidate(e.value)}
                      >
                        <Column
                          selectionMode="multiple"
                          headerStyle={{ width: "3em" }}
                        />
                        <Column
                          field="Firstname"
                          sortable
                          header="First Name"
                          frozen
                          filter
                          filterPlaceholder=""
                          filterMatchMode="startsWith"
                          editor={options => firstnameEditor(options)}
                          onCellEditComplete={onCellEditComplete}
                        />
                        <Column
                          field="Lastname"
                          sortable
                          header="Last Name"
                          filter
                          filterPlaceholder=""
                          editor={options => firstnameEditor1(options)}
                          onCellEditComplete={onCellEditComplete}
                        />
                        <Column
                          field="JobTitle"
                          sortable
                          header="Designation"
                          filter
                          filterPlaceholder=""
                        />
                        <Column
                          field="Email"
                          sortable
                          header="Email"
                          filter
                          filterPlaceholder=""
                          editor={options => firstnameEditor4(options)}
                          onCellEditComplete={onCellEditComplete}
                        />
                        <Column
                          field="MobilePhone"
                          sortable
                          header="Mobile Phone"
                          filter
                          filterPlaceholder=""
                        // editor={options => firstnameEditor2(options)}
                        // onCellEditComplete={onCellEditComplete}
                        />
                        <Column
                          field="Company"
                          sortable
                          header="Company"
                          filter
                          filterPlaceholder=""
                        />
                        <Column
                          field="Yearsofexperience"
                          sortable
                          header="Yrs. of Exp."
                          filter
                          filterPlaceholder=""
                        />
                        <Column
                          field="City"
                          header="City"
                          sortable
                          filter
                          filterPlaceholder=""
                        />
                        <Column
                          field="Status"
                          header="Status"
                          sortable
                          filter
                          filterPlaceholder=""
                          filterElement={statusofdrop}
                          className="emp-status"
                          body={rowData => {
                            const status = rowData.Status // Assuming 'Status' is the field name in your data
                            let badgeClass = ""
                            // Define the badge style based on the status value
                            switch (status) {
                              case "Active":
                                badgeClass = "p-badge-success"
                                break
                              case "Inactive":
                                badgeClass = "p-badge-secondary"
                                break
                              case "Pending":
                                badgeClass = "p-badge-warning"
                                break
                              case "Completed":
                                badgeClass = "p-badge-info"
                                break
                              default:
                                badgeClass = "p-badge-outline"
                                break
                            }
                            return (
                              <span className={`p-badge ${badgeClass}`}>
                                {status}
                              </span>
                            )
                          }}
                        />
                        {/* <Column
                          field="Relocation"
                          sortable
                          header="Relocation"
                          filter
                          filterPlaceholder=""
                        /> */}
                        <Column
                          field="Categories"
                          sortable
                          header="Categories"
                          filter
                          filterElement={representativeRowFilterTemplate}
                          className="emp-status"
                        />
                        <Column
                          field="Groups"
                          header="Groups"
                          sortable
                          filter
                          filterElement={representativeRowFilterTemplate1}
                          className="emp-status"
                        />
                        <Column
                          field="PrimarySkills"
                          header="Primary Skills"
                          sortable
                          filter
                          filterPlaceholder=""
                        />
                        <Column
                          field="CreateDate"
                          header="Create Date"
                          sortable
                          filter
                          filterPlaceholder=""
                        />
                        <Column
                          field="EditDate"
                          header="Edit Date"
                          sortable
                          filter
                          filterPlaceholder=""
                        />
                        <Column
                          field="CreatedBy"
                          header="Created By"
                          sortable
                          filter
                          filterPlaceholder=""
                        />
                        {/* <Column
                          field="AvailabilityDate"
                          header="Availability Date"
                          sortable
                          filter
                          filterPlaceholder=""
                        /> */}
                        {/* <Column
                            field="ResumeAttachment"
                            header="Resume Attachment"
                            sortable
                            filter
                            filterPlaceholder=""
                          /> */}
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
                    <h3>Create a Employee</h3>
                    <div className="d-flex align-items-center">
                      <Link to="/employee-edit">
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
                          Designation
                        </label>
                        <WorkType1
                             initialWorkTypes={designationWorkTypes}
                             dropdownWorkTypes={designationDropdownWorkTypes}
                             onWorkTypesChange={handleDesignationWorkTypesChange}
                             onSelectionChange={handleDesignationSelectionChange}
                        />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="company" className="mb-0">
                          Company
                        </label>

                         {/* <Dropdown
                          value={selectedCompany}
                          onChange={e => setSelectedCompany(e.value)}
                          options={CompanyOptions}
                          optionLabel="name"
                          placeholder="Company"
                          filter
                          className="bgclr"
                        /> */}

                         <WorkType1
                             initialWorkTypes={moduleWorkTypes}
                             dropdownWorkTypes={moduleDropdownWorkTypes}
                             onWorkTypesChange={handleModuleWorkTypesChange}
                             onSelectionChange={handleModuleSelectionChange}
                                                />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={6}>
                        <label htmlFor="employeeType" className="mb-0">
                          Employee Type
                        </label>

                         <WorkType1
                             initialWorkTypes={employeeTypeWorkTypes}
                             dropdownWorkTypes={employeeTypeDropdownWorkTypes}
                             onWorkTypesChange={handleEmployeeTypeWorkTypesChange}
                             onSelectionChange={handleEmployeeTypeSelectionChange}
                         />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="department" className="mb-0">
                          Department
                        </label>

                         <WorkType1
                             initialWorkTypes={departmentWorkTypes}
                             dropdownWorkTypes={departmentDropdownWorkTypes}
                             onWorkTypesChange={handleDepartmentWorkTypesChange}
                             onSelectionChange={handleDepartmentSelectionChange}
                         />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={6}>
                        <label htmlFor="workLocation" className="mb-0">
                          Work Location
                        </label>

                         <WorkType1
                             initialWorkTypes={workLocationWorkTypes}
                             dropdownWorkTypes={workLocationDropdownWorkTypes}
                             onWorkTypesChange={handleWorkLocationWorkTypesChange}
                             onSelectionChange={handleWorkLocationSelectionChange}
                         />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="shiftTiming" className="mb-0">
                          Shift Timings
                        </label>

                         <WorkType1
                             initialWorkTypes={shiftTimingWorkTypes}
                             dropdownWorkTypes={shiftTimingDropdownWorkTypes}
                             onWorkTypesChange={handleShiftTimingWorkTypesChange}
                             onSelectionChange={handleShiftTimingSelectionChange}
                         />
                      </Col>
                    </Row>
                  
                    {/* <Row className="mb-3">
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
                    </Row> */}
                    

                    {/* <Row className="mb-3">
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

                        <small className="text-danger">
                          {" "}
                          {PoliciesfilesErrorMessagepan}
                        </small>
                        <small className="text-muted">
                          Eg: (jpeg,png,pdf,jpg)
                        </small>
                      </Col>
                    </Row> */}

                    <Row className="mb-3">
                      <Col lg={6}>
                        <label htmlFor="city" className="mb-0">
                          City
                        </label>
                        <WorkType1
                             initialWorkTypes={cityWorkTypes}
                             dropdownWorkTypes={cityDropdownWorkTypes}
                             onWorkTypesChange={handleCityWorkTypesChange}
                             onSelectionChange={handleCitySelectionChange}
                        />
                      </Col>
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
                        <div className="p-field mt-2">
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

                       <Col lg={6}>
                        <div className="p-field mt-2">
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

                    </Row>

                    <Row className="mb-3">
                      <Col lg={6}>
                        <label htmlFor="employeeStatus" className="mb-0">
                          Employee Status
                        </label>
                        <WorkType1
                             initialWorkTypes={employeeStatusWorkTypes}
                             dropdownWorkTypes={employeeStatusDropdownWorkTypes}
                             onWorkTypesChange={handleEmployeeStatusWorkTypesChange}
                             onSelectionChange={handleEmployeeStatusSelectionChange}
                        />
                      </Col>
                      <Col lg={6}>
                        {/* Placeholder for future field */}
                      </Col>
                    </Row>

                    <Row className="mb-2 align-items-end">
                     
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
                  <i className="pi pi-users"></i> Employee - LavanKumar
                </h3>
                <div className="d-flex align-items-center">
                  <Link to="/employee-edit">
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
                                <label htmlFor="fullName" className="block">
                                  Full Name
                                </label>
                                <InputText
                                  id="fullName"
                                  value={fullName}
                                  readOnly
                                  onChange={e => setFullName(e.target.value)}
                                  placeholder=""
                                  className="block w-full"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="p-field">
                                <label htmlFor="work-email" className="block">
                                  Email
                                </label>
                                <InputText
                                  id="work-email"
                                  value={workEmail}
                                  readOnly
                                  onChange={e => setWorkEmail(e.target.value)}
                                  type="email"
                                  placeholder=""
                                  className="w-full"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="p-field">
                                <label htmlFor="phoneNumber" className="block">
                                  Phone Number
                                </label>
                                <InputText
                                  id="phoneNumber"
                                  value={phoneNumber}
                                  readOnly
                                  onChange={e => setPhoneNumber(e.target.value)}
                                  placeholder=""
                                  className="block w-full"
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row className="mb-2">
                            <Col lg={4}>
                              <div className="p-field">
                                <label htmlFor="jobTitle" className="block">
                                  Designation
                                </label>
                                <InputText
                                  id="jobTitle"
                                  value={jobTitle}
                                  readOnly
                                  onChange={e => setJobTitle(e.target.value)}
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
                                  value={company}
                                  readOnly
                                  onChange={e => setCompany(e.target.value)}
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
                                  value={primarySkills}
                                  readOnly
                                  onChange={e =>
                                    setPrimarySkills(e.target.value)
                                  }
                                >
                                  <option value="Javascript, React">
                                    Javascript, React
                                  </option>

                                  <option value="Javascript, React">
                                    Python, Django
                                  </option>
                                  <option value="Javascript, React">
                                    Java, Selenium
                                  </option>
                                  {primarySkillsvalu.map((item, j) => {
                                    return (
                                      <option value={item.skill_id} key={j}>
                                        {item.skill_name}
                                      </option>
                                    )
                                  })}
                                </select>
                              </div>
                            </Col>
                          </Row>

                          <Row className="mb-2 align-items-end">
                            <Col lg={4}>
                              <div className="p-field d-flex flex-column">
                                <label htmlFor="city">City</label>
                                <Dropdown
                                  value={selectedCity}
                                  onChange={e => setSelectedCity(e.value)}
                                  options={cityWorkTypes}
                                  optionLabel="name"
                                  placeholder="Hyderabad"
                                  filter
                                  className="bgclr"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="p-field">
                                <label
                                  htmlFor="availabilityDate"
                                  className="block"
                                >
                                  Availability Date
                                </label>
                                <Calendar
                                  className="w-100"
                                  id="buttondisplay"
                                  value={availabilityDate1}
                                  placeholder="28-02-2025"
                                  disabled
                                  onChange={e =>
                                    setAvailabilityDate1(e.target.value)
                                  }
                                  showIcon
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="p-field">
                                <label htmlFor="relocation" className="block">
                                  Relocation
                                </label>

                                <input
                                  type="checkbox"
                                  value={relocation}
                                  disabled
                                  onChange={e => setRelocation(e.target.value)}
                                  className="me-2"
                                  checked
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row className="mb-2">
                            <Col lg={4}>
                              <div className="p-field">
                                <label htmlFor="jobType">Categories</label>
                                <TreeSelect
                                  value={selectedNodeKey}
                                  disabled
                                  onChange={e => setSelectedNodeKey(e.value)}
                                  options={categoriesitem}
                                  filter
                                  className=" w-full"
                                  placeholder="Frontend"
                                ></TreeSelect>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="p-field">
                                <label htmlFor="jobType">Groups</label>
                                <TreeSelect
                                  value={selectedgroupKey}
                                  disabled
                                  onChange={e => setselectedgroupKey(e.value)}
                                  options={groupitem}
                                  filter
                                  className="w-full"
                                  placeholder="React"
                                ></TreeSelect>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="p-field">
                                <label htmlFor="jobType">UserIDs</label>
                                <InputText
                                  id="userIds"
                                  value={userIds}
                                  disabled
                                  onChange={e => setUserIds(e.target.value)}
                                  placeholder=""
                                  className="block w-full"
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row className="mb-2"></Row>

                         
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
                                <TreeTable value={documents} tableStyle={{ minWidth: "50rem" }} dataKey="key">
                                  <Column field="certificate_name" header="Document Type" body={(rowData) => editableTemplate(rowData, "certificate_name")} />
                                  <Column field="docSubject" header="Document Subject" body={(rowData) => editableTemplate(rowData, "docSubject")} />
                                  <Column field="created_at" header="Applied Date & Time" body={(rowData) => editableTemplate(rowData, "created_at")} />
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
               
                <TabPanel header="Projects" leftIcon="pi pi-check-square mr-2">
                  <Row>
                    <Col lg={12}>
                      <section className="job-datatable-section">
                        <div className="card1 mt-3 mb-4 actjobsumtable">
                          <DataTable
                            responsive
                            showGridlines
                            value={worktypeData}
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
                            filters={worktypeFilters}
                            filterDisplay="row"
                            globalFilterFields={[
                              "worktype_code",
                              "project_name",
                              "module",
                              "summary",
                              "project_manager",
                              "status",
                              "workhours",
                              "start_date",
                              "end_date",
                            ]}
                            emptyMessage="No records found."
                            selection={selectedWorktypes}
                            onSelectionChange={e => setSelectedWorktypes(e.value)}
                            selectionMode="multiple"
                            resizableColumns
                            columnResizeMode="expand"
                          >
                            <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                            <Column field="worktype_code" header="Project Code" sortable filter style={{ minWidth: "10rem" }} />
                            <Column field="project_name" header="Project Name" sortable filter style={{ minWidth: "10rem" }} />
                          
                            <Column field="summary" header="Summary" sortable filter style={{ minWidth: "10rem" }} />
                            <Column field="project_manager" header="Project Manager" sortable filter style={{ minWidth: "10rem" }} />
                            <Column field="assigned_to" header="Assigned To" sortable filter style={{ minWidth: "10rem" }} />
                            <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                           
                            <Column field="start_date" header="Start Date" sortable filter style={{ minWidth: "10rem" }} />
                            <Column field="end_date" header="End Date" sortable filter style={{ minWidth: "10rem" }} />
                          </DataTable>
                        </div>
                      </section>
                    </Col>
                  </Row>
                </TabPanel>

                 <TabPanel header="Worktype" leftIcon="pi pi-check-square mr-2">
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
                          // onTextChange={handleTextChange}
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

        {/* Interview schedule start */}
        <Dialog
          header="Appointment - Lavankumar Kalvala"
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
                      <InputText
                        disabled
                        value={intertype}
                        onChange={e => setintertype(e.target.value)}
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
                <Row className="mb-2">
                  {/* <Col xl={6}>
                    <div className="flex flex-column">
                      <label For="Priority">Jobs List</label>
                      <Dropdown
                        value={subtypeget}
                        onChange={e => setsubtypeget(e.value)}
                        options={jobStatusDrop}
                        optionLabel="name"
                        placeholder="Select a Status"
                        className="w-full search-option"
                      />
                    </div>
                  </Col> */}
                  <LinkContactsPopup />

                  <Col xl={6}>
                    {/* <div className="p-field flex flex-column">
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
                    </div> */}
                    {/* <LinkContactsPopup/> */}
                    <LinkContact2Popup />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label For="Candidate">Candidate</label>
                      <MultiSelect
                        value={condidatevalu}
                        disabled
                        onChange={e => {
                          condidatelist(e)
                        }}
                        options={typeInterviewcondi}
                        optionLabel="name"
                        placeholder={`Lavankumar Kalvala`}
                        maxSelectedLabels={0}
                        className="w-full"
                      />
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

              <Row className="mt-2">
                <Col xl={12}>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                    >
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
          header="Appointment - Lavankumar Kalvala"
          visible={interviewpopCall}
          className="interview-popup"
          style={{ width: "50vw" }}
          // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
          onHide={() => {
            SetInterviewpopCall(false)
          }}
        >
          <form>
            <p className="bg-form">
              <div className="mb-4">
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label htmlFor="interview">Type</label>
                      <InputText
                        disabled
                        value={intertype3}
                        onChange={e => setintertype1(e.target.value)}
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
                      <label htmlFor="integer" className=" block">
                        Sub-Type
                      </label>
                      <Dropdown
                        value={subtype}
                        onChange={e => setSubtype(e.value)}
                        options={typeCall}
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
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="flex flex-column">
                      <label For="Priority">Job Status</label>
                      <Dropdown
                        value={subtypeget}
                        onChange={e => setsubtypeget(e.value)}
                        options={jobStatusDrop}
                        optionLabel="name"
                        placeholder="Select a Status"
                        className="w-full search-option"
                      />
                    </div>
                  </Col>

                  <LinkContactsPopup />

                </Row>

                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label For="Candidate">Candidate</label>
                      <MultiSelect
                        value={condidatevalu}
                        disabled
                        onChange={e => {
                          condidatelist(e)
                        }}
                        options={typeInterviewcondi}
                        optionLabel="name"
                        placeholder={`Lavankumar Kalvala`}
                        maxSelectedLabels={0}
                        className="w-full"
                      />
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
                      type="submit"
                      class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                    >
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
          header="Appointment - Lavankumar Kalvala"
          visible={interviewpopMeeting}
          className="interview-popup"
          style={{ width: "50vw" }}
          // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
          onHide={() => {
            SetInterviewpopMeeting(false)
          }}
        >
          <form>
            <p className="bg-form">
              <div className="mb-4">
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label htmlFor="interview">Type</label>
                      <InputText
                        disabled
                        value={intertype2}
                        onChange={e => setintertype(e.target.value)}
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
                      <label htmlFor="integer" className=" block">
                        Sub-Type
                      </label>
                      <Dropdown
                        value={subtype}
                        onChange={e => setSubtype(e.value)}
                        options={typeMeeting}
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
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="flex flex-column">
                      <label For="Priority">Job</label>
                      <Dropdown
                        value={subtypeget}
                        onChange={e => setsubtypeget(e.value)}
                        options={jobStatusDrop}
                        optionLabel="name"
                        placeholder="Select a Status"
                        className="w-full search-option"
                      />
                    </div>
                  </Col>


                  <LinkContactsPopup />
                </Row>

                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label For="Candidate">Candidate</label>
                      <MultiSelect
                        value={condidatevalu}
                        disabled
                        onChange={e => {
                          condidatelist(e)
                        }}
                        options={typeInterviewcondi}
                        optionLabel="name"
                        placeholder={`Lavankumar Kalvala`}
                        maxSelectedLabels={0}
                        className="w-full"
                      />
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
                      type="submit"
                      class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                    >
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
          header="Appointment - Lavankumar Kalvala"
          visible={interviewpopTask}
          className="interview-popup"
          style={{ width: "50vw" }}
          // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
          onHide={() => {
            SetInterviewpopTask(false)
          }}
        >
          <form>
            <p className="bg-form">
              <div className="mb-4">
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label htmlFor="interview">Type</label>
                      <InputText
                        disabled
                        value={intertype1}
                        onChange={e => setintertype1(e.target.value)}
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
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="flex flex-column">
                      <label For="Priority">Job</label>
                      <Dropdown
                        value={subtypeget}
                        onChange={e => setsubtypeget(e.value)}
                        options={jobStatusDrop}
                        optionLabel="name"
                        placeholder="Select a Status"
                        className="w-full search-option"
                      />
                    </div>
                  </Col>

                  <LinkContactsPopup />

                </Row>

                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label For="Candidate">Candidate</label>
                      <MultiSelect
                        value={condidatevalu}
                        disabled
                        onChange={e => {
                          condidatelist(e)
                        }}
                        options={typeInterviewcondi}
                        optionLabel="name"
                        placeholder={`Lavankumar Kalvala`}
                        maxSelectedLabels={0}
                        className="w-full"
                      />
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
                      type="submit"
                      class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                    >
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
          header="Appointment - Lavankumar Kalvala"
          visible={interviewpopEvent}
          className="interview-popup"
          style={{ width: "50vw" }}
          // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
          onHide={() => {
            SetInterviewpopEvent(false)
          }}
        >
          <form>
            <p className="bg-form">
              <div className="mb-4">
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label htmlFor="interview">Type</label>
                      <InputText
                        disabled
                        value={intertype4}
                        onChange={e => setintertype1(e.target.value)}
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
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="flex flex-column">
                      <label For="Priority">Job</label>
                      <Dropdown
                        value={subtypeget}
                        onChange={e => setsubtypeget(e.value)}
                        options={jobStatusDrop}
                        optionLabel="name"
                        placeholder="Select a Status"
                        className="w-full search-option"
                      />
                    </div>
                  </Col>

                  <LinkContactsPopup />

                </Row>

                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label For="Candidate">Candidate</label>
                      <MultiSelect
                        value={condidatevalu}
                        disabled
                        onChange={e => {
                          condidatelist(e)
                        }}
                        options={typeInterviewcondi}
                        optionLabel="name"
                        placeholder={`Lavankumar Kalvala`}
                        maxSelectedLabels={0}
                        className="w-full"
                      />
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
                      type="submit"
                      class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                    >
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
          header="Appointment - Lavankumar Kalvala"
          visible={interviewpopOther}
          className="interview-popup"
          style={{ width: "50vw" }}
          // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
          onHide={() => {
            SetInterviewpopOther(false)
          }}
        >
          <form>
            <p className="bg-form">
              <div className="mb-4">
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label htmlFor="interview">Type</label>
                      <InputText
                        disabled
                        value={intertype5}
                        onChange={e => setintertype1(e.target.value)}
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
                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="flex flex-column">
                      <label For="Priority">Job</label>
                      <Dropdown
                        value={subtypeget}
                        onChange={e => setsubtypeget(e.value)}
                        options={jobStatusDrop}
                        optionLabel="name"
                        placeholder="Select a Status"
                        className="w-full search-option"
                      />
                    </div>
                  </Col>

                  <LinkContactsPopup />
                </Row>

                <Row className="mb-2">
                  <Col xl={6}>
                    <div className="p-field flex flex-column">
                      <label For="Candidate">Candidate</label>
                      <MultiSelect
                        value={condidatevalu}
                        disabled
                        onChange={e => {
                          condidatelist(e)
                        }}
                        options={typeInterviewcondi}
                        optionLabel="name"
                        placeholder={`Lavankumar Kalvala`}
                        maxSelectedLabels={0}
                        className="w-full"
                      />
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
                      type="submit"
                      class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                    >
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
      </div>
    </React.Fragment>
  )
}

export default EmployeeAllActive
