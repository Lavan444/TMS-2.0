import React, { useState, useRef } from "react"
import { Col, Container, Row } from "reactstrap"
import { DataTable } from "primereact/datatable"
import { FilterMatchMode } from "primereact/api"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { ChevronRightIcon } from "primereact/icons/chevronright"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { InputTextarea } from "primereact/inputtextarea"
import { Checkbox } from "primereact/checkbox"
import { Chips } from "primereact/chips"
// import EmailSentToContact from "./EmailSentToContact"

import { useSelector } from "react-redux"




const KpiTracking = () => {
  const { first, rows,  } = useSelector(
                  state => state.calendar.pagination
                )

  const [selectedEmailOption, setSelectedEmailOption] = useState(null)
  const emailOptions = [
    { label: "1 Selected" },
    { label: "2 Selected" },
    { label: "3 Selected" },
    { label: "4 Selected" },
    { label: "5 Selected" },
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

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
       employee_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
       employee_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
       month: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
       productivity_score: { value: null, matchMode: FilterMatchMode.EQUALS },
       quality_of_work: { value: null, matchMode: FilterMatchMode.EQUALS },
       goal_attainment: { value: null, matchMode: FilterMatchMode.EQUALS },
       time_management: { value: null, matchMode: FilterMatchMode.EQUALS },
       team_collaboration: { value: null, matchMode: FilterMatchMode.EQUALS },
       adaptability_innovation: { value: null, matchMode: FilterMatchMode.EQUALS },
       customer_satisfaction: { value: null, matchMode: FilterMatchMode.EQUALS },
       absenteeism_rate: { value: null, matchMode: FilterMatchMode.EQUALS },
       engagement_score: { value: null, matchMode: FilterMatchMode.EQUALS },

  })

  const [tableData, setTableData] = useState([
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Jan",
        productivity_score: 76,
        quality_of_work: 4.7,
        goal_attainment: 94,
        time_management: 4.6,
        team_collaboration: 4.4,
        adaptability_innovation: 3.7,
        customer_satisfaction: 93,
        absenteeism_rate: 1.3,
        engagement_score: 4.2
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Feb",
        productivity_score: 90,
        quality_of_work: 4.4,
        goal_attainment: 82,
        time_management: 3.5,
        team_collaboration: 5,
        adaptability_innovation: 4.7,
        customer_satisfaction: 80,
        absenteeism_rate: 1,
        engagement_score: 5
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Mar",
        productivity_score: 70,
        quality_of_work: 4,
        goal_attainment: 91,
        time_management: 3.5,
        team_collaboration: 4.3,
        adaptability_innovation: 4.1,
        customer_satisfaction: 90,
        absenteeism_rate: 1.8,
        engagement_score: 3.6
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Apr",
        productivity_score: 88,
        quality_of_work: 4.1,
        goal_attainment: 99,
        time_management: 4.4,
        team_collaboration: 3.6,
        adaptability_innovation: 4.4,
        customer_satisfaction: 83,
        absenteeism_rate: 1.2,
        engagement_score: 4.9
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "May",
        productivity_score: 83,
        quality_of_work: 4.7,
        goal_attainment: 88,
        time_management: 3.5,
        team_collaboration: 3.8,
        adaptability_innovation: 3.9,
        customer_satisfaction: 81,
        absenteeism_rate: 3.1,
        engagement_score: 4.7
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Jun",
        productivity_score: 72,
        quality_of_work: 4.9,
        goal_attainment: 83,
        time_management: 3.8,
        team_collaboration: 4.6,
        adaptability_innovation: 4.1,
        customer_satisfaction: 84,
        absenteeism_rate: 3,
        engagement_score: 3.5
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Jul",
        productivity_score: 87,
        quality_of_work: 4.7,
        goal_attainment: 81,
        time_management: 4.1,
        team_collaboration: 4.9,
        adaptability_innovation: 4.6,
        customer_satisfaction: 89,
        absenteeism_rate: 1.3,
        engagement_score: 3.8
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Aug",
        productivity_score: 94,
        quality_of_work: 4.9,
        goal_attainment: 95,
        time_management: 4.6,
        team_collaboration: 4.3,
        adaptability_innovation: 4.4,
        customer_satisfaction: 87,
        absenteeism_rate: 1.5,
        engagement_score: 4.7
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Sep",
        productivity_score: 70,
        quality_of_work: 3.5,
        goal_attainment: 88,
        time_management: 4.7,
        team_collaboration: 3.8,
        adaptability_innovation: 3.5,
        customer_satisfaction: 85,
        absenteeism_rate: 1.7,
        engagement_score: 4.6
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Oct",
        productivity_score: 72,
        quality_of_work: 4.7,
        goal_attainment: 84,
        time_management: 4.9,
        team_collaboration: 4.5,
        adaptability_innovation: 4.9,
        customer_satisfaction: 83,
        absenteeism_rate: 3.2,
        engagement_score: 4
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Nov",
        productivity_score: 85,
        quality_of_work: 4.1,
        goal_attainment: 84,
        time_management: 4.6,
        team_collaboration: 4.5,
        adaptability_innovation: 4.8,
        customer_satisfaction: 75,
        absenteeism_rate: 2.3,
        engagement_score: 5
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Dec",
        productivity_score: 72,
        quality_of_work: 4.6,
        goal_attainment: 93,
        time_management: 4.2,
        team_collaboration: 4.3,
        adaptability_innovation: 4.1,
        customer_satisfaction: 84,
        absenteeism_rate: 2.5,
        engagement_score: 3.8
    },

     {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Jan",
    "productivity_score": 76,
    "quality_of_work": 4.2,
    "goal_attainment": 83,
    "time_management": 4.9,
    "team_collaboration": 3.9,
    "adaptability_innovation": 4.1,
    "customer_satisfaction": 85,
    "absenteeism_rate": 1.7,
    "engagement_score": 4.9
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Feb",
    "productivity_score": 76,
    "quality_of_work": 3.9,
    "goal_attainment": 81,
    "time_management": 4.4,
    "team_collaboration": 3.9,
    "adaptability_innovation": 3.7,
    "customer_satisfaction": 86,
    "absenteeism_rate": 1.7,
    "engagement_score": 4.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Mar",
    "productivity_score": 80,
    "quality_of_work": 4,
    "goal_attainment": 86,
    "time_management": 4.9,
    "team_collaboration": 3.9,
    "adaptability_innovation": 4.5,
    "customer_satisfaction": 94,
    "absenteeism_rate": 2.2,
    "engagement_score": 4
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Apr",
    "productivity_score": 75,
    "quality_of_work": 4.3,
    "goal_attainment": 88,
    "time_management": 4.2,
    "team_collaboration": 4.5,
    "adaptability_innovation": 3.9,
    "customer_satisfaction": 89,
    "absenteeism_rate": 1.6,
    "engagement_score": 3.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "May",
    "productivity_score": 93,
    "quality_of_work": 4.6,
    "goal_attainment": 96,
    "time_management": 3.6,
    "team_collaboration": 3.9,
    "adaptability_innovation": 3.9,
    "customer_satisfaction": 81,
    "absenteeism_rate": 2.7,
    "engagement_score": 4
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Jun",
    "productivity_score": 86,
    "quality_of_work": 5,
    "goal_attainment": 96,
    "time_management": 5,
    "team_collaboration": 4.1,
    "adaptability_innovation": 3.5,
    "customer_satisfaction": 75,
    "absenteeism_rate": 3.2,
    "engagement_score": 4.5
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Jul",
    "productivity_score": 90,
    "quality_of_work": 4.2,
    "goal_attainment": 85,
    "time_management": 3.9,
    "team_collaboration": 4.5,
    "adaptability_innovation": 4.6,
    "customer_satisfaction": 91,
    "absenteeism_rate": 3.5,
    "engagement_score": 4.1
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Aug",
    "productivity_score": 89,
    "quality_of_work": 5,
    "goal_attainment": 90,
    "time_management": 4.7,
    "team_collaboration": 4.7,
    "adaptability_innovation": 3.7,
    "customer_satisfaction": 80,
    "absenteeism_rate": 3.4,
    "engagement_score": 4.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Sep",
    "productivity_score": 73,
    "quality_of_work": 3.5,
    "goal_attainment": 82,
    "time_management": 4.7,
    "team_collaboration": 4,
    "adaptability_innovation": 3.6,
    "customer_satisfaction": 83,
    "absenteeism_rate": 3.4,
    "engagement_score": 4.1
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Oct",
    "productivity_score": 87,
    "quality_of_work": 4.8,
    "goal_attainment": 90,
    "time_management": 4,
    "team_collaboration": 3.7,
    "adaptability_innovation": 4.9,
    "customer_satisfaction": 84,
    "absenteeism_rate": 1.9,
    "engagement_score": 4.5
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Nov",
    "productivity_score": 85,
    "quality_of_work": 4.3,
    "goal_attainment": 96,
    "time_management": 3.9,
    "team_collaboration": 3.6,
    "adaptability_innovation": 4.8,
    "customer_satisfaction": 79,
    "absenteeism_rate": 4.1,
    "engagement_score": 3.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Dec",
    "productivity_score": 78,
    "quality_of_work": 4,
    "goal_attainment": 95,
    "time_management": 4.8,
    "team_collaboration": 4.8,
    "adaptability_innovation": 4.1,
    "customer_satisfaction": 75,
    "absenteeism_rate": 3.2,
    "engagement_score": 3.6
  }

  ])

  const [selectedTableData, setSelectedTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageState, setPageState] = useState({ rows: 10, first: 0 })

  const onPage = event => {
    setPageState({ rows: event.rows, first: event.first })
  }

  const dt = useRef(null)

  const exportCSV = selectionOnly => {
    dt.current.exportCSV({ selectionOnly })
  }

  const reminderCheckboxTemplate = rowData => {
    const handleCheckboxChange = e => {
      const updatedTableData = tableData.map(item =>
        item.id === rowData.id ? { ...item, reminder: e.target.checked } : item
      )
      setTableData(updatedTableData)
    }

    return (
      <input
        type="checkbox"
        checked={rowData.reminder}
        onChange={handleCheckboxChange}
      />
    )
  }

  const completedCheckboxTemplate = rowData => {
    const handleCheckboxChange = e => {
      const updatedTableData = tableData.map(item =>
        item.id === rowData.id ? { ...item, completed: e.target.checked } : item
      )
      setTableData(updatedTableData)
    }

    return (
      <input
        type="checkbox"
        checked={rowData.completed}
        onChange={handleCheckboxChange}
      />
    )
  }

  const privateCheckboxTemplate = rowData => {
    const handleCheckboxChange = e => {
      const updatedTableData = tableData.map(item =>
        item.id === rowData.id ? { ...item, private: e.target.checked } : item
      )
      setTableData(updatedTableData)
    }

    return (
      <input
        type="checkbox"
        checked={rowData.private}
        onChange={handleCheckboxChange}
      />
    )
  }

  //   Delete the selected data

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // const handleDeleteSelected = () => {
  //     setTableData((prevData) =>
  //       prevData.filter(
  //         (row) => !selectedTableData.some((selectedRow) => selectedRow.id === row.id)
  //       )
  //     );
  //     setSelectedTableData([]);
  //   };

  const handleDeleteSelected = () => {
    setShowConfirmDialog(true) // Show the confirmation dialog when delete is clicked
  }

  const confirmDelete = () => {
    // Proceed with deletion if confirmed
    setTableData(prevData =>
      prevData.filter(
        row => !selectedTableData.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectedTableData([]) // Clear selection after deletion
    setShowConfirmDialog(false) // Hide the dialog after deletion
  }

  const cancelDelete = () => {
    setShowConfirmDialog(false) // Close the dialog without deleting
  }

  //   Interview popup

  // interview start

  const [interviewpop, SetInterviewpop] = useState(false)
  const [interview, setInterview] = useState("Interview")
  const [subtype, setSubtype] = useState(null)
  const [startdate, setStartdate] = useState(null)
  const [starttime, setStarttime] = useState(null)
  const [popTextares, setPopTextares] = useState("")
  const [priority, setPriority] = useState(null)

  const typeInterview = [
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },
  ]
  const [reminder, setReminder] = useState(null)
  const reminderOptions = [
    { name: "0 mins", value: "0" },
    { name: "5 mins", value: "5" },
    { name: "10 mins", value: "10" },
    { name: "15 mins", value: "15" },
    { name: "30 mins", value: "30" },
  ]
  const [repeat, setRepeat] = useState(null)
  const repeatOptions = [
    { name: "Do not repeat", value: "none" },
    { name: "Daily", value: "daily" },
    { name: "Weekly", value: "weekly" },
    { name: "Mon-Fri", value: "mon-fri" },
  ]

  const [followup, setFollowup] = useState(null)

  const followupOptions = [
    { name: "None", value: "none" },
    { name: "1 Day", value: "1day" },
    { name: "2 Days", value: "2days" },
    { name: "3 Days", value: "3days" },
    { name: "1 Week", value: "1week" },
  ]

  const [popchecked, setPopchecked] = useState(false)
  const [popchecked2, setPopchecked2] = useState(false)

  const handlePopupCheckbox = e => {
    setPopchecked(e.checked)
  }
  const handlePopupCheckbox2 = e => {
    setPopchecked2(e.checked)
  }

  const [userid, setUserid] = useState([])
  const customChip = item => {
    return (
      <div>
        <span>{item}</span>
      </div>
    )
  }

  // interview end

  // interview read only start



  const typeInterview1 = [
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },
  ]
  const [reminder1, setReminder1] = useState(null)
  const reminderOptions1 = [
    { name: "0 mins", value: "0" },
    { name: "5 mins", value: "5" },
    { name: "10 mins", value: "10" },
    { name: "15 mins", value: "15" },
    { name: "30 mins", value: "30" },
  ]
  const [repeat1, setRepeat1] = useState(null)
  const repeatOptions1 = [
    { name: "Do not repeat", value: "none" },
    { name: "Daily", value: "daily" },
    { name: "Weekly", value: "weekly" },
    { name: "Mon-Fri", value: "mon-fri" },
  ]

  const [followup1, setFollowup1] = useState(null)

  const followupOptions1 = [
    { name: "None", value: "none" },
    { name: "1 Day", value: "1day" },
    { name: "2 Days", value: "2days" },
    { name: "3 Days", value: "3days" },
    { name: "1 Week", value: "1week" },
  ]

  const [popcheckedread, setPopcheckedread] = useState(false)
  const [popcheckedread2, setPopcheckedread2] = useState(false)

  const handlePopupCheckboxread = e => {
    setPopchecked(e.checked)
  }
  const handlePopupCheckboxread2 = e => {
    setPopchecked2(e.checked)
  }

  const [userid1, setUserid1] = useState(["User1"]);

  const customChip1 = (item) => {
    return (
      <div>
        <span>{item}</span>
      </div>
    );
  };


  const [defaultDate] = useState(new Date())

  const [interviewpop1, SetInterviewpop1] = useState(false)
  const [interview1, setInterview1] = useState("Interview")
  const [subtype1, setSubtype1] = useState(typeInterview1[1].value)
  const [startdate1, setStartdate1] = useState(defaultDate)
  const [starttime1, setStarttime1] = useState(null)
  const [popTextares1, setPopTextares1] = useState("")
  const [priority1, setPriority1] = useState(null)

  // interview read only end

  const onInputChange = (e, field) => {
    let _filters = { ...filters };
    _filters[field].value = e.target.value;
    setFilters(_filters);
  };


  // clear search start

  const handleClearSearchSentEmails = () => {

    setFilters({
      fromName: { value: "" },
      toDisplayName: { value: "" },
      email: { value: "" },
      subject: { value: "" },
      mailType: { value: "" },
      userId: { value: "" },
      date: { value: "" },

    });

    // Reset the pagination
    // setPageState((prevState) => ({
    //     ...prevState,
    //     first: 0, 
    // }));

  };

  // clear search start


//   download documents



// Example ref
// const dt = useRef(null);

// Your performance data
const employeePerformanceData = [
  {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Jan",
        productivity_score: 76,
        quality_of_work: 4.7,
        goal_attainment: 94,
        time_management: 4.6,
        team_collaboration: 4.4,
        adaptability_innovation: 3.7,
        customer_satisfaction: 93,
        absenteeism_rate: 1.3,
        engagement_score: 4.2
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Feb",
        productivity_score: 90,
        quality_of_work: 4.4,
        goal_attainment: 82,
        time_management: 3.5,
        team_collaboration: 5,
        adaptability_innovation: 4.7,
        customer_satisfaction: 80,
        absenteeism_rate: 1,
        engagement_score: 5
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Mar",
        productivity_score: 70,
        quality_of_work: 4,
        goal_attainment: 91,
        time_management: 3.5,
        team_collaboration: 4.3,
        adaptability_innovation: 4.1,
        customer_satisfaction: 90,
        absenteeism_rate: 1.8,
        engagement_score: 3.6
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Apr",
        productivity_score: 88,
        quality_of_work: 4.1,
        goal_attainment: 99,
        time_management: 4.4,
        team_collaboration: 3.6,
        adaptability_innovation: 4.4,
        customer_satisfaction: 83,
        absenteeism_rate: 1.2,
        engagement_score: 4.9
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "May",
        productivity_score: 83,
        quality_of_work: 4.7,
        goal_attainment: 88,
        time_management: 3.5,
        team_collaboration: 3.8,
        adaptability_innovation: 3.9,
        customer_satisfaction: 81,
        absenteeism_rate: 3.1,
        engagement_score: 4.7
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Jun",
        productivity_score: 72,
        quality_of_work: 4.9,
        goal_attainment: 83,
        time_management: 3.8,
        team_collaboration: 4.6,
        adaptability_innovation: 4.1,
        customer_satisfaction: 84,
        absenteeism_rate: 3,
        engagement_score: 3.5
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Jul",
        productivity_score: 87,
        quality_of_work: 4.7,
        goal_attainment: 81,
        time_management: 4.1,
        team_collaboration: 4.9,
        adaptability_innovation: 4.6,
        customer_satisfaction: 89,
        absenteeism_rate: 1.3,
        engagement_score: 3.8
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Aug",
        productivity_score: 94,
        quality_of_work: 4.9,
        goal_attainment: 95,
        time_management: 4.6,
        team_collaboration: 4.3,
        adaptability_innovation: 4.4,
        customer_satisfaction: 87,
        absenteeism_rate: 1.5,
        engagement_score: 4.7
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Sep",
        productivity_score: 70,
        quality_of_work: 3.5,
        goal_attainment: 88,
        time_management: 4.7,
        team_collaboration: 3.8,
        adaptability_innovation: 3.5,
        customer_satisfaction: 85,
        absenteeism_rate: 1.7,
        engagement_score: 4.6
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Oct",
        productivity_score: 72,
        quality_of_work: 4.7,
        goal_attainment: 84,
        time_management: 4.9,
        team_collaboration: 4.5,
        adaptability_innovation: 4.9,
        customer_satisfaction: 83,
        absenteeism_rate: 3.2,
        engagement_score: 4
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Nov",
        productivity_score: 85,
        quality_of_work: 4.1,
        goal_attainment: 84,
        time_management: 4.6,
        team_collaboration: 4.5,
        adaptability_innovation: 4.8,
        customer_satisfaction: 75,
        absenteeism_rate: 2.3,
        engagement_score: 5
    },
    {
        employee_id: "E001",
        employee_name: "Lavankumar",
        month: "Dec",
        productivity_score: 72,
        quality_of_work: 4.6,
        goal_attainment: 93,
        time_management: 4.2,
        team_collaboration: 4.3,
        adaptability_innovation: 4.1,
        customer_satisfaction: 84,
        absenteeism_rate: 2.5,
        engagement_score: 3.8
    },

     {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Jan",
    "productivity_score": 76,
    "quality_of_work": 4.2,
    "goal_attainment": 83,
    "time_management": 4.9,
    "team_collaboration": 3.9,
    "adaptability_innovation": 4.1,
    "customer_satisfaction": 85,
    "absenteeism_rate": 1.7,
    "engagement_score": 4.9
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Feb",
    "productivity_score": 76,
    "quality_of_work": 3.9,
    "goal_attainment": 81,
    "time_management": 4.4,
    "team_collaboration": 3.9,
    "adaptability_innovation": 3.7,
    "customer_satisfaction": 86,
    "absenteeism_rate": 1.7,
    "engagement_score": 4.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Mar",
    "productivity_score": 80,
    "quality_of_work": 4,
    "goal_attainment": 86,
    "time_management": 4.9,
    "team_collaboration": 3.9,
    "adaptability_innovation": 4.5,
    "customer_satisfaction": 94,
    "absenteeism_rate": 2.2,
    "engagement_score": 4
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Apr",
    "productivity_score": 75,
    "quality_of_work": 4.3,
    "goal_attainment": 88,
    "time_management": 4.2,
    "team_collaboration": 4.5,
    "adaptability_innovation": 3.9,
    "customer_satisfaction": 89,
    "absenteeism_rate": 1.6,
    "engagement_score": 3.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "May",
    "productivity_score": 93,
    "quality_of_work": 4.6,
    "goal_attainment": 96,
    "time_management": 3.6,
    "team_collaboration": 3.9,
    "adaptability_innovation": 3.9,
    "customer_satisfaction": 81,
    "absenteeism_rate": 2.7,
    "engagement_score": 4
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Jun",
    "productivity_score": 86,
    "quality_of_work": 5,
    "goal_attainment": 96,
    "time_management": 5,
    "team_collaboration": 4.1,
    "adaptability_innovation": 3.5,
    "customer_satisfaction": 75,
    "absenteeism_rate": 3.2,
    "engagement_score": 4.5
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Jul",
    "productivity_score": 90,
    "quality_of_work": 4.2,
    "goal_attainment": 85,
    "time_management": 3.9,
    "team_collaboration": 4.5,
    "adaptability_innovation": 4.6,
    "customer_satisfaction": 91,
    "absenteeism_rate": 3.5,
    "engagement_score": 4.1
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Aug",
    "productivity_score": 89,
    "quality_of_work": 5,
    "goal_attainment": 90,
    "time_management": 4.7,
    "team_collaboration": 4.7,
    "adaptability_innovation": 3.7,
    "customer_satisfaction": 80,
    "absenteeism_rate": 3.4,
    "engagement_score": 4.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Sep",
    "productivity_score": 73,
    "quality_of_work": 3.5,
    "goal_attainment": 82,
    "time_management": 4.7,
    "team_collaboration": 4,
    "adaptability_innovation": 3.6,
    "customer_satisfaction": 83,
    "absenteeism_rate": 3.4,
    "engagement_score": 4.1
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Oct",
    "productivity_score": 87,
    "quality_of_work": 4.8,
    "goal_attainment": 90,
    "time_management": 4,
    "team_collaboration": 3.7,
    "adaptability_innovation": 4.9,
    "customer_satisfaction": 84,
    "absenteeism_rate": 1.9,
    "engagement_score": 4.5
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Nov",
    "productivity_score": 85,
    "quality_of_work": 4.3,
    "goal_attainment": 96,
    "time_management": 3.9,
    "team_collaboration": 3.6,
    "adaptability_innovation": 4.8,
    "customer_satisfaction": 79,
    "absenteeism_rate": 4.1,
    "engagement_score": 3.8
  },
  {
    "employee_id": "E002",
    "employee_name": "Venkata Laxmi	",
    "month": "Dec",
    "productivity_score": 78,
    "quality_of_work": 4,
    "goal_attainment": 95,
    "time_management": 4.8,
    "team_collaboration": 4.8,
    "adaptability_innovation": 4.1,
    "customer_satisfaction": 75,
    "absenteeism_rate": 3.2,
    "engagement_score": 3.6
  }
];

// const exportCSV = (selectionOnly) => {
//   dt.current.exportCSV({ selectionOnly });
// };

const exportPdf = () => {
  import("jspdf").then((jsPDF) => {
    import("jspdf-autotable").then(() => {
      const doc = new jsPDF.default();

      const exportColumns = [
        { title: "Month", dataKey: "month" },
        { title: "Productivity Score", dataKey: "productivity_score" },
        { title: "Quality of Work", dataKey: "quality_of_work" },
        { title: "Goal Attainment", dataKey: "goal_attainment" },
        { title: "Time Management", dataKey: "time_management" },
        { title: "Team Collaboration", dataKey: "team_collaboration" },
        { title: "Adaptability & Innovation", dataKey: "adaptability_innovation" },
        { title: "Customer Satisfaction", dataKey: "customer_satisfaction" },
        { title: "Absenteeism Rate", dataKey: "absenteeism_rate" },
        { title: "Engagement Score", dataKey: "engagement_score" }
      ];

      doc.autoTable({
        columns: exportColumns,
        body: employeePerformanceData
      });

      doc.save("employee_performance.pdf");
    });
  });
};

const exportExcel = () => {
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(employeePerformanceData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    saveAsExcelFile(excelBuffer, 'employee_performance');
  });
};

const saveAsExcelFile = (buffer, fileName) => {
  import('file-saver').then((module) => {
    if (module && module.default) {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data = new Blob([buffer], { type: EXCEL_TYPE });

      module.default.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
    }
  });
};



  return (
    <React.Fragment>
      <div className="page-content allact-tabs sentemail">
        <Container fluid={true}>
          <div className="page-title-box actjobbread mb-0">

            

                                     <Row className="align-items-center actjobsum">
                                                                <Col sm={6} md={6} lg={8}>
                                                                    <h1 className="page-title">KPI Tracking</h1>
                                                                </Col>
                                    
                                                                <Col sm={6} md={6} lg={4}>
                                                                    <div className="allbtns d-flex gap-2 justify-content-end">
                                                                        <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} tooltip="Export to CSV" tooltipOptions={{ position: 'left' }} className="csvbtn" />
                                                                        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} tooltip="Export to XLS" tooltipOptions={{ position: 'top' }} className="xlsbtn" />
                                                                        <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} tooltip="Export to PDF" tooltipOptions={{ position: 'bottom' }} className="pdfbtn" />
                                                                        <Button type="button" icon="pi pi-print" severity="warning" rounded tooltip="Print" className="printbtn" tooltipOptions={{ position: 'bottom' }} />
                                                                    </div>
                                                                </Col>
                                                            </Row>


           
            <Row>
              <Col lg={12}>
                <section className="job-datatable-section">
                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                    <DataTable
                      value={tableData.slice(first, first + rows)}
                      tableStyle={{
                        minWidth: "50rem",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                      ref={dt}
                      rows={pageState.rows}
                      first={pageState.first}
                      // paginator
                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                      currentPageReportTemplate="{first} to {last} of {totalRecords}"
                      onPage={onPage}
                      dataKey="id"
                      loading={loading}
                      scrollable
                      emptyMessage="No records found."
                      selection={selectedTableData}
                      onSelectionChange={e => setSelectedTableData(e.value)}
                      filters={filters}
                      filterDisplay="row"
                      reorderableRows
                      resizableColumns
                      columnResizeMode="expand"
                    >
                      <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                      />
                      <Column field="employee_id" header="Employee ID" sortable filter style={{ minWidth: "10rem", fontWeight: "bold" }} />
<Column field="employee_name" header="Employee Name" sortable filter style={{ minWidth: "12rem"}} />
<Column field="month" header="Month" sortable filter style={{ minWidth: "10rem" }} />
<Column field="productivity_score" header="Productivity Score" sortable filter style={{ minWidth: "12rem" }} />
<Column field="quality_of_work" header="Quality of Work" sortable filter style={{ minWidth: "12rem" }} />
<Column field="goal_attainment" header="Goal Attainment (%)" sortable filter style={{ minWidth: "14rem" }} />
<Column field="time_management" header="Time Management" sortable filter style={{ minWidth: "12rem" }} />
<Column field="team_collaboration" header="Team Collaboration" sortable filter style={{ minWidth: "14rem" }} />
<Column field="adaptability_innovation" header="Adaptability & Innovation" sortable filter style={{ minWidth: "16rem" }} />
<Column field="customer_satisfaction" header="Customer Satisfaction" sortable filter style={{ minWidth: "14rem" }} />
<Column field="absenteeism_rate" header="Absenteeism Rate (%)" sortable filter style={{ minWidth: "14rem" }} />
<Column field="engagement_score" header="Engagement Score" sortable filter style={{ minWidth: "12rem" }} />

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
                        <strong>{selectedTableData[0]?.type}</strong>?
                      </p>
                    </Dialog>


                    <div className="card flex justify-content-center">

                      {/* Interview schedule start */}

                      {/* <Button label="Show" onClick={SetInterviewpop(true)} /> */}

                      <Dialog
                        header="APPOINTMENT - ANUP GOGOI"
                        visible={interviewpop}
                        className="interview-popup"
                        style={{ width: "50vw" }}
                        onHide={() => {
                          if (!interviewpop) return
                          SetInterviewpop(false)
                        }}
                      >
                        <p className="bg-form">
                          <div className="mb-4">
                            <Row className="mb-2">
                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label htmlFor="interview">Type</label>
                                  <InputText
                                    id="interview"
                                    aria-describedby="username-help"
                                    value={interview}
                                    placeholder="Interview"
                                    readOnly
                                  />
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
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"
                                      >
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
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"
                                      >
                                        Time
                                      </label>
                                      <Calendar
                                        value={starttime}
                                        onChange={e => setStarttime(e.value)}
                                        showIcon
                                        timeOnly
                                        icon={() => (
                                          <i className="pi pi-clock" />
                                        )}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col xl={6}>
                                <Row className="mb-2">
                                  <Col xl={6}>
                                    <div className="flex-auto">
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"
                                      >
                                        End date
                                      </label>
                                      <Calendar
                                        value={startdate}
                                        onChange={e => setStartdate(e.value)}
                                        showIcon
                                      />
                                    </div>
                                  </Col>

                                  <Col xl={6}>
                                    <div className="flex-auto">
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"
                                      >
                                        Time
                                      </label>

                                      <Calendar
                                        value={starttime}
                                        onChange={e => setStarttime(e.value)}
                                        showIcon
                                        timeOnly
                                        icon={() => (
                                          <i className="pi pi-clock" />
                                        )}
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
                                    value={subtype}
                                    onChange={e => setSubtype(e.value)}
                                    options={typeInterview}
                                    optionLabel="job"
                                    placeholder="Select a Status"
                                    className="w-full search-option"
                                  />
                                </div>
                              </Col>

                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label For="Priority" className=" block">
                                    Contact
                                  </label>

                                  <Dropdown
                                    value={priority}
                                    onChange={e => setPriority(e.value)}
                                    options={typeInterview}
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
                                  <Dropdown
                                    value={subtype}
                                    onChange={e => setSubtype(e.value)}
                                    options={typeInterview}
                                    optionLabel="Candidate"
                                    placeholder="Select a Status"
                                    className="w-full search-option"
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label htmlFor="username">Subject</label>
                                  <Dropdown
                                    value={subtype}
                                    onChange={e => setSubtype(e.value)}
                                    options={typeInterview}
                                    optionLabel="name"
                                    placeholder="Select a Status"
                                    className="w-full search-option"
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
                                    onChange={e =>
                                      setPopTextares(e.target.value)
                                    }
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
                                  <label htmlFor="username">
                                    Auto Followup
                                  </label>
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
                                          <label
                                            htmlFor="username"
                                            className="ms-1 mt-2"
                                          >
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
                                          <label
                                            htmlFor="username"
                                            className="ms-1 mt-2"
                                          >
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
                      </Dialog>

                      {/* Interview schedule end */}


                      {/* Interview Dialog read only start */}


                      <Dialog
                        header="APPOINTMENT - ANUP GOGOI"
                        visible={interviewpop1}
                        className="interview-popup"
                        style={{ width: "50vw" }}
                        onHide={() => {
                          if (!interviewpop1) return
                          SetInterviewpop1(false)
                        }}
                      >
                        <p className="bg-form">
                          <div className="mb-4">
                            <Row className="mb-2">
                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label htmlFor="interview">Type</label>
                                  <InputText
                                    id="interview"
                                    aria-describedby="username-help"
                                    value={interview1}
                                    placeholder="Interview"
                                    disabled
                                  />
                                </div>
                              </Col>

                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label htmlFor="integer" className=" block">
                                    Sub-Type
                                  </label>
                                  <Dropdown
                                    value={subtype1}
                                    onChange={e => setSubtype1(e.value)}
                                    options={typeInterview1}
                                    optionLabel="name"
                                    placeholder="Subtype"
                                    className="w-full search-option"
                                    disabled
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl={6}>
                                <Row className="mb-2">
                                  <Col xl={6}>
                                    <div className="p-field flex-auto">
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"
                                        disabled
                                      >
                                        Start date
                                      </label>
                                      <Calendar
                                        value={defaultDate}
                                        // onChange={e => setStartdate1(e.value)}
                                        showIcon
                                        disabled
                                      />
                                    </div>
                                  </Col>

                                  <Col xl={6}>
                                    <div className="p-field flex-auto">
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"
                                      >
                                        Time
                                      </label>
                                      <Calendar
                                        value={defaultDate}
                                        onChange={e => setStarttime1(e.value)}
                                        showIcon
                                        timeOnly
                                        disabled
                                        showTime
                                        icon={() => (
                                          <i className="pi pi-clock" />
                                        )}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col xl={6}>
                                <Row className="mb-2">
                                  <Col xl={6}>
                                    <div className="flex-auto">
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"

                                      >
                                        End date
                                      </label>
                                      <Calendar
                                        value={defaultDate}
                                        // onChange={e => setStartdate1(e.value)}
                                        showIcon
                                        disabled
                                      />
                                    </div>
                                  </Col>

                                  <Col xl={6}>
                                    <div className="flex-auto">
                                      <label
                                        htmlFor="buttondisplay"
                                        className="block"
                                        disabled
                                      >
                                        Time
                                      </label>

                                      <Calendar
                                        value={defaultDate}
                                        onChange={e => setStarttime1(e.value)}
                                        showIcon
                                        timeOnly
                                        disabled
                                        icon={() => (
                                          <i className="pi pi-clock" />
                                        )}
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
                                    value={subtype1}
                                    // onChange={e => setSubtype1(e.value)}
                                    // options={typeInterview1}
                                    optionLabel="job"
                                    placeholder="Developer"
                                    className="w-full search-option"
                                    disabled
                                  />
                                </div>
                              </Col>

                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label For="Priority" className=" block">
                                    Contact
                                  </label>

                                  <Dropdown
                                    value={priority1}
                                    // onChange={e => setPriority1(e.value)}
                                    // options={typeInterview1}
                                    optionLabel="name"
                                    placeholder="Contact"
                                    className="w-full search-option"
                                    disabled
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mb-2">
                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label For="Candidate">Candidate</label>
                                  <Dropdown
                                    value={subtype1}
                                    // onChange={e => setSubtype1(e.value)}
                                    // options={typeInterview1}
                                    optionLabel="Candidate"
                                    placeholder="Ram"
                                    className="w-full search-option"
                                    disabled
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="p-field flex flex-column">
                                  <label htmlFor="username">Subject</label>
                                  <Dropdown
                                    value={subtype1}
                                    onChange={e => setSubtype1(e.value)}
                                    options={typeInterview1}
                                    optionLabel="name"
                                    placeholder="Select a Status"
                                    className="w-full search-option"
                                    disabled
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                              <Col xl={12}>
                                <div className="">
                                  <InputTextarea
                                    className="w-full"
                                    value={popTextares1}
                                    onChange={e =>
                                      setPopTextares1(e.target.value)
                                    }
                                    placeholder="Interview will be on today"
                                    rows={3}
                                    cols={20}
                                    disabled
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <div>
                            <Row className="mb-2">
                              <Col xl={6}>
                                <div className="p-field">
                                  <label htmlFor="username">
                                    Auto Followup
                                  </label>
                                  <Dropdown
                                    value={followup1}
                                    onChange={e => setFollowup1(e.value)}
                                    options={followupOptions1}
                                    optionLabel="name"
                                    placeholder="1 day"
                                    className="w-full search-option"
                                    disabled
                                  />
                                </div>
                              </Col>

                              <Col xl={6}>
                                <Row>
                                  <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                      <label htmlFor="username">Repeat</label>
                                      <Dropdown
                                        value={repeat1}
                                        onChange={e => setRepeat1(e.value)}
                                        options={repeatOptions1}
                                        optionLabel="name"
                                        placeholder="One day"
                                        className="w-full search-option"
                                        disabled
                                      />
                                    </div>
                                  </Col>

                                  <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                      <label htmlFor="username">Reminder</label>
                                      <Dropdown
                                        value={reminder1}
                                        onChange={e => setReminder1(e.value)}
                                        options={reminderOptions1}
                                        optionLabel="name"
                                        placeholder="5 minutes"
                                        className="w-full search-option"
                                        disabled
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
                                        value={priority1}
                                        onChange={e => setPriority1(e.value)}
                                        options={typeInterview1}
                                        optionLabel="name"
                                        placeholder="Low"
                                        className="w-full search-option"
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                  <Col xl={6}>
                                    <Row className="mt-2">
                                      <Col xl={6}>
                                        <div className="d-flex align-items-center mt-4">
                                          <Checkbox
                                            inputId="checkbox"
                                            checked={true}
                                            onChange={handlePopupCheckbox}
                                            disabled
                                          />
                                          <label
                                            htmlFor="username"
                                            className="ms-1 mt-2"
                                          >
                                            Completed
                                          </label>
                                        </div>
                                      </Col>

                                      <Col xl={6}>
                                        <div className="d-flex align-items-center mt-4">
                                          <Checkbox
                                            inputId="checkbox"
                                            checked={false}
                                            onChange={handlePopupCheckbox2}
                                            disabled
                                          />
                                          <label
                                            htmlFor="username"
                                            className="ms-1 mt-2"
                                          >
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
                                  value={userid1}
                                  onChange={(e) => setUserid1(e.value)}
                                  itemTemplate={customChip1}
                                  className="w-full"
                                  disabled // Disable the Chips component to prevent user modification
                                />
                              </Col>
                            </Row>
                          </div>

                          <Row className="">
                            <Col xl={12}>
                              <div className="d-flex justify-content-end">
                                <button
                                  type="button"
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
                      </Dialog>


                      {/* Interview Dialog read only start */}
                    </div>



                    {/* Interview schedule end */}
                  </div>
                </section>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default KpiTracking
