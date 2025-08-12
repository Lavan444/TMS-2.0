import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate, Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Editor } from 'primereact/editor';
import { TreeSelect } from 'primereact/treeselect';
import Select from 'react-select';
import { TabView, TabPanel } from 'primereact/tabview'; // Add this import
import { Accordion, AccordionTab } from 'primereact/accordion'; // Add this import
import { Badge } from "primereact/badge"
import { InputTextarea } from "primereact/inputtextarea"
import { TreeTable } from "primereact/treetable"
// import EstimateTable from '../../projects/components/EstimateTable';;;;



const ManagerDashboard = () => {
  const navigate = useNavigate();

  // Sidebar state variables
  const [visibleRight, setVisibleRight] = useState(false);
  const [jobid, setJobid] = useState('Proj-101');
  const [jobtitle, setJobtitle] = useState('');
  const [jobStartDate, setJobStartDate] = useState(null);
  const [jobEndDate, setJobEndDate] = useState(null);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('');
  const [text, setText] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
  const [selectedGroupKey, setSelectedGroupKey] = useState(null);
  const [PoliciesfilesErrorMessagepan, setPoliciesfilesErrorMessagepan] = useState('');


  // sidebar start

  const [hiringManager, setHiringManager] = useState(null)
  const [company, setCompany] = useState("Varun Digital Media")
  const [jobLocation, setJobLocation] = useState(null)
  const [experience, setExperience] = useState()
  const [categ, setCateg] = useState("Frontend")
  const [hiringmanager1, setHiringManager1] = useState("Mahesh Kumar Bhoga")
  const [group, setGroup] = useState("HTML, CSS, Javascript")
  const [workplace, setWorkplace] = useState("Work From Office")

  const [jobstart, setJobstart] = useState("01-01-2025")
  const [projectDateRange, setProjectDateRange] = useState(null);
  const [jobend, setJobend] = useState("31-12-2025")
  const [primskills, setPrimskills] = useState("HTML, CSS, Javascript")
  const [description1, setDescription1] = useState(
    `AI Generator that creates content from user input using AI models.`
  )
  const [userids, setUserids] = useState("Harish")
  const [selectedActivities, setSelectedActivities] = useState([])

  // Example data for each field
  const hiringManagers = [
    { name: "John", code: "J1" },
    { name: "Michael", code: "M1" },
    { name: "Sarah", code: "S1" },
    { name: "James", code: "J2" },
  ]
  const [documents, setDocuments] = useState([
    {
      key: "1",
      data: {
        id: "1",
        certificate_name: "Discovery / Initiation",
        docSubject: [
          "Project charter",
          "Goals & scope",
          "Stakeholder identification"
        ],
        created_at: "Jun 20 - July 15 2025",
        responsible: "BA Team",
      },
    },
    {
      key: "2",
      data: {
        id: "2",
        certificate_name: "Planning / Requirements",
        docSubject: [
          "Job Feedback Report for Lavankumar Kalvala - Web Developer"
        ],
        created_at: "May 20 - Jun 15 2025",
        responsible: "Development Team",
      },
    },
  ]);

  const [notes1, setNotes1] = useState(
    "An AI-powered content generator that transforms user input into high-quality, context-aware content using advanced artificial intelligence models. Whether you need engaging blog posts, marketing copy, social media content, product descriptions, or creative storytelling, this tool uses state-of-the-art language models to instantly craft tailored results based on your instructions."
  )


  const actionTemplate = rowData => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          aria-label="Edit"
          className="document-btn"
          onClick={() => handleEdit(rowData.key)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          aria-label="Delete"
          className="document-btn"
          onClick={() => handleDelete(rowData.key)}
        />
      </div>
    )
  }

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


  const [activitiesFilters, setActivitiesFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sub_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })


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
  })

  const receivedJobs = [
    {
      task_status: "Task",
      task_code: "Task-101",
      task_name: "Add User Role Feature",
      "Estimated Work Hours": "12",
      start_date: "01-05-2025",
      end_date: "03-05-2025",
      project_name: "AI Generator (Proj-101)",
      assigned_to: "Amit Verma",
    },
    {
      task_status: "Bug",
      task_code: "Bug-101.1",
      task_name: "Generate Monthly Report",
      "Estimated Work Hours": "8",
      start_date: "04-05-2025",
      end_date: "05-05-2025",
      project_name: "Sales Automation (Proj-102)",
      assigned_to: "Kiran Rao",
    },


  ]

  const [selectedReceivedJobs, setSelectedReceivedJobs] = useState([])
  const [potentialJobsFilters, setPotentialJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    EstimatedWorkHours: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const potentialJobs = [
    {
      task_status: "Task",
      task_code: "Task-103",
      task_name: "Fix Login Timeout Bug",
      "Estimated Work Hours": "5",
      start_date: "02-05-2025",
      end_date: "03-05-2025",
      project_name: "Security Enhancement",
      assigned_to: "Vikram Joshi",
    },
    {
      task_status: "Bug",
      task_code: "Bug-104",
      task_name: "Integrate PF Calculation",
      "Estimated Work Hours": "10",
      start_date: "04-05-2025",
      end_date: "06-05-2025",
      project_name: "Payroll System",
      assigned_to: "Sanjay Mishra",
    },
  ]

  const [selectedPotentialJobs, setSelectedPotentialJobs] = useState([])
  const [rejectedJobsFilters, setRejectedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    EstimatedWorkHours: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const rejectedJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedRejectedJobs, setSelectedRejectedJobs] = useState([])


  // submitted start

  const [submittedJobsFilters, setSubmittedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const submittedJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedSubmittedJobs, setSelectedSubmittedJobs] = useState([])

  const [offerJobsFilters, setOfferJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const offerJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedOfferJobs, setSelectedOfferJobs] = useState([])

  // placed start

  const [placedJobsFilters, setPlacedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });


  const placedJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedPlacedJobs, setSelectedPlacedJobs] = useState([])

  // view form pipeline ends
  // view form activities starts




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

  const [visibleViewRight, setVisibleViewRight] = useState(false)
  const [editingRow, setEditingRow] = useState(null)



  const keyDeliverablesTemplate = (rowData) => {
    if (Array.isArray(rowData.docSubject)) {
      return (
        <div className="key-deliverables">
          {rowData.docSubject.map((item, index) => (
            <div key={index} className="deliverable-item">
              - {item}
            </div>
          ))}
        </div>
      );
    }
    return rowData.docSubject;
  };

  const handleEdit = rowKey => {
    setEditingRow(rowKey)
  }

  const handleSave = (rowKey, field, value) => {
    setDocuments(prevDocuments =>
      prevDocuments.map(doc =>
        doc.key === rowKey
          ? { ...doc, data: { ...doc.data, [field]: value } }
          : doc
      )
    )
  }

  const handleDelete = rowKey => {
    setDocuments(prevDocuments =>
      prevDocuments.filter(doc => doc.key !== rowKey)
    )
  }

  const editableTemplate = (rowData, field) => {
    return editingRow === rowData.key ? (
      <input
        type="text"
        value={rowData.data[field]}
        onChange={e => handleSave(rowData.key, field, e.target.value)}
        onBlur={() => setEditingRow(null)}
        className="p-2 border border-gray-300 rounded w-full"
      />
    ) : (
      <span>{rowData.data[field]}</span>
    )
  }

  // interview

  const [interviewJobsFilters, setInterviewJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const interviewJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedInterviewJobs, setSelectedInterviewJobs] = useState([])



  // sidebar end



  // Categories and groups data
  const categories = [
    {
      key: '0',
      label: 'Frontend',
      data: 'Frontend Folder',
      icon: 'pi pi-fw pi-folder',
      children: [
        { key: '0-0', label: 'React', data: 'React Document', icon: 'pi pi-fw pi-file' },
        { key: '0-1', label: 'Angular', data: 'Angular Document', icon: 'pi pi-fw pi-file' }
      ]
    },
    {
      key: '1',
      label: 'Backend',
      data: 'Backend Folder',
      icon: 'pi pi-fw pi-folder',
      children: [
        { key: '1-0', label: 'Node.js', data: 'Node.js Document', icon: 'pi pi-fw pi-file' },
        { key: '1-1', label: 'Python', data: 'Python Document', icon: 'pi pi-fw pi-file' }
      ]
    }
  ];

  const groups = [
    {
      key: '0',
      label: 'HTML, CSS',
      data: 'HTML, CSS Group',
      icon: 'pi pi-fw pi-folder'
    },
    {
      key: '1',
      label: 'JavaScript',
      data: 'JavaScript Group',
      icon: 'pi pi-fw pi-folder'
    }
  ];

  // Editor header template
  const header = (
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
    </span>
  );

  const [selectedValues, setSelectedValues] = useState(null);
  // const values = [
  //     { name: 'All Projects' },
  //     { name: 'Engineering' },
  //     { name: 'Sales' },
  //     { name: 'Marketing' }
  // ];

  const values = [
    { name: 'Customer Portal Development (PROJ-2025-001)' },
    { name: 'Mobile Banking Application (PROJ-2025-002)' },
    { name: 'Business Intelligence Dashboard (PROJ-2025-003)' },
    { name: 'Cloud Infrastructure Migration (PROJ-2025-004)' },
    { name: 'Employee Management System (PROJ-2025-005)' },
    { name: 'Digital Marketing Platform (PROJ-2025-006)' },
    { name: 'Enterprise Content Management (PROJ-2025-007)' },
    { name: 'AI-Powered Analytics Engine (PROJ-2025-008)' },
    { name: 'Project Collaboration Suite (PROJ-2025-009)' },
    { name: 'Omnichannel Marketing Solution (PROJ-2025-010)' }
  ];

  const [selectedRange, setSelectedRange] = useState(null);
  const ranges = [
    { name: 'Custom Range' },
    { name: 'This Week' },
    { name: 'Last 30 Days' },
    { name: 'One Year' }
  ];

  const [worktype, setworktype] = useState(null);
  const worktypes = [
    { name: 'All' },
    { name: 'Task' },
    { name: 'Bug' },
    { name: 'Others' }
  ];

  // all departments dropdown ends


  // candidate source distribution starts

  const [chartData1, setChartData1] = useState({});
  const [chartOptions1, setChartOptions1] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ['All WorkType', 'Completed WorkType', 'Incompleted WorkType',],
      datasets: [
        {
          data: [50, 30, 20],
          backgroundColor: [
            '#a8d8ea',  // All Tasks
            '#88c999', // Completed Tasks
            ' #f1948a', // Incompleted Tasks
          ],
          hoverBackgroundColor: [
            '#a8d8ea',  // All Tasks
            '#88c999', // Completed Tasks
            '#f1948a', // Incompleted Tasks
          ]
        }
      ]
    };
    const options = {
      cutout: '60%'
    };

    setChartData1(data);
    setChartOptions1(options);
  }, []);

  // candidate source distribution ends

  // recruiter team activities starts

  const [taskData, setTaskData] = useState({});
  const [taskOptions, setTaskOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: [
        'Project A',
        'Project B',
        'Project C',
        'Project D',
        'Project E',
        'Project F',
        'Project G',
        'Project H',
      ],

      //  labels: [
      //     'AI Generator',
      //     'Resume Parser',
      //     'Chatbot Assistant',
      //     'Image Enhancer AI',
      //     'Voice to Text Converter',
      //     'Bug Tracker Tool',
      //     'Content Summarizer',
      //     'Smart Form Autofill',
      // ],


      datasets: [
        {
          label: 'Created Tasks',
          backgroundColor: '#88c999', // Updated color for Created Tasks
          borderColor: documentStyle.getPropertyValue('#88c999'),
          data: [150, 200, 120, 180, 220, 170, 190, 210]
        },
        {
          label: 'Completed Tasks',
          backgroundColor: '#a8d8ea', // Updated color for Completed Tasks
          borderColor: documentStyle.getPropertyValue('#a8d8ea'),
          data: [100, 150, 80, 130, 200, 120, 140, 160]
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            stepSize: 50, // Adjust step size based on data
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          suggestedMin: 0, // Minimum value for y-axis
          suggestedMax: 250 // Maximum value for y-axis
        }
      }
    };

    setTaskData(data);
    setTaskOptions(options);
  }, []);

  // recruiter team activities ends


  // recruitment trends starts

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: [
        'Amit Kumar',
        'Priya Sharma',
        'Rajesh Singh',
        'Anjali Gupta',
        'Ravi Patel',
        'Neha Reddy',
        'Vikram Yadav',
        'Pooja Verma',
        'Sandeep Mehta',
        'Sneha Joshi'
      ],  // Top 10 Indian Assignees names
      datasets: [
        {
          label: 'Completed Tasks',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: [45, 78, 56, 88, 60, 40, 95, 70, 80, 90]  // Example data for completed tasks
        }
      ]
    };

    const options = {
      indexAxis: 'x',  // Change to 'x' to make it a vertical bar chart
      maintainAspectRatio: false,
      aspectRatio: 1,  // Adjust the aspect ratio to fit the vertical bar chart
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            },
            stepSize: 10,  // Set the interval of 10 for the tasks count
          },
          grid: {
            display: true,
            color: surfaceBorder,
            drawBorder: false
          },
          min: 0,  // Minimum value for x-axis (tasks count starts from 0)
          max: 100,  // Maximum value for x-axis (tasks count ends at 100)
        },
        y: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  // recruitment trends ends


  // open jobs table starts
  const [openjobfilters, setopenjobfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    project_code: { value: null, matchMode: FilterMatchMode.CONTAINS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    extended_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    reason_for_late: { value: null, matchMode: FilterMatchMode.CONTAINS },
    project_manager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const [selectedJobs, setSelectedJobs] = useState([]);

  // Handle view project function
  const handleViewProject = () => {
    if (selectedJobs.length > 0) {
      // Load first selected project data into form
      const firstProject = selectedJobs[0];
      setJobid(firstProject.project_code);
      setJobtitle(firstProject.project_name);
      setSelectedProjectStatus(firstProject.status);
      // Convert date strings to Date objects if needed
      if (firstProject.start_date) {
        setJobStartDate(new Date(firstProject.start_date.split('-').reverse().join('-')));
      }
      if (firstProject.end_date) {
        setJobEndDate(new Date(firstProject.end_date.split('-').reverse().join('-')));
      }
      setText(`<p>Project: ${firstProject.project_name}</p><p>Manager: ${firstProject.project_manager}</p><p>Company: ${firstProject.company}</p>`);
    }
    setVisibleViewRight(true); // Correctly set visibleViewRight to true
  };

  // Extended End Date body template
  const extendedEndDateBodyTemplate = (rowData) => {
    return rowData.extended_end_date ? (
      <span>{rowData.extended_end_date}</span>
    ) : (
      <span style={{ color: '#888', fontStyle: 'italic' }}>Not Extended</span>
    );
  };

  // Reason for Late body template
  const reasonForLateBodyTemplate = (rowData) => {
    return rowData.reason_for_late ? (
      <span>{rowData.reason_for_late}</span>
    ) : (
      <span style={{ color: '#888', fontStyle: 'italic' }}>No reason specified</span>
    );
  };

  const openJobs = [
    {
      project_code: "Proj-101",
      project_name: "AI Generator",
      status: "In Progress",
      start_date: "01-01-2025",
      end_date: "30-04-2025",
      extended_end_date: "15-05-2025",
      reason_for_late: "Due to some issues",
      project_manager: "Mahesh Kumar Bhoga",
      company: "Varun Digital Media",
      pending_tasks: 320,
      total_tasks: 600
    },
    {
      project_code: "Proj-102",
      project_name: "Mobile Banking Application",
      status: "Completed",
      start_date: "15-01-2025",
      end_date: "28-03-2025",
      extended_end_date: null,
      reason_for_late: null,
      project_manager: "Priya Patel",
      company: "Infosys",
      pending_tasks: 0,
      total_tasks: 600
    },
    {
      project_code: "Proj-103",
      project_name: "Business Intelligence Dashboard",
      status: "In Progress",
      start_date: "01-02-2025",
      end_date: "31-05-2025",
      extended_end_date: "15-06-2025",
      reason_for_late: "Data integration complexities",
      project_manager: "Vikram Singh",
      company: "TCS",
      pending_tasks: 350,
      total_tasks: 600
    },
    {
      project_code: "Proj-104",
      project_name: "Cloud Infrastructure Migration",
      status: "On Hold",
      start_date: "10-01-2025",
      end_date: "30-08-2025",
      extended_end_date: "30-09-2025",
      reason_for_late: "Budget approval pending",
      project_manager: "Ananya Reddy",
      company: "Wipro",
      pending_tasks: 300,
      total_tasks: 600
    },
    {
      project_code: "Proj-105",
      project_name: "Employee Management System",
      status: "In Progress",
      start_date: "01-03-2025",
      end_date: "30-07-2025",
      extended_end_date: null,
      reason_for_late: null,
      project_manager: "Arjun Kumar",
      company: "HCL Technologies",
      pending_tasks: 370,
      total_tasks: 600
    },
    {
      project_code: "Proj-106",
      project_name: "Digital Marketing Platform",
      status: "Completed",
      start_date: "15-12-2024",
      end_date: "28-02-2025",
      extended_end_date: null,
      reason_for_late: null,
      project_manager: "Divya Nair",
      company: "TechWave Solutions",
      pending_tasks: 0,
      total_tasks: 600
    },
    {
      project_code: "Proj-107",
      project_name: "Enterprise Content Management",
      status: "In Progress",
      start_date: "01-04-2025",
      end_date: "31-08-2025",
      extended_end_date: "15-09-2025",
      reason_for_late: "Security compliance requirements",
      project_manager: "Rahul Iyer",
      company: "Accenture",
      pending_tasks: 340,
      total_tasks: 600
    },
    {
      project_code: "Proj-108",
      project_name: "AI-Powered Analytics Engine",
      status: "In Progress",
      start_date: "01-02-2025",
      end_date: "31-07-2025",
      extended_end_date: "31-08-2025",
      reason_for_late: "Model training optimization required",
      project_manager: "Neha Kapoor",
      company: "Cognizant",
      pending_tasks: 360,
      total_tasks: 600
    },
    {
      project_code: "Proj-109",
      project_name: "Project Collaboration Suite",
      status: "Completed",
      start_date: "15-11-2024",
      end_date: "15-02-2025",
      extended_end_date: null,
      reason_for_late: null,
      project_manager: "Sanjay Joshi",
      company: "Capgemini",
      pending_tasks: 0,
      total_tasks: 600
    },
    {
      project_code: "Proj-110",
      project_name: "Omnichannel Marketing Solution",
      status: "In Progress",
      start_date: "01-03-2025",
      end_date: "31-07-2025",
      extended_end_date: "15-08-2025",
      reason_for_late: "Third-party API integration delays",
      project_manager: "Pooja Desai",
      company: "Zoho Corporation",
      pending_tasks: 330,
      total_tasks: 600
    }
  ];
  //  open jobs table ends

  // user activity starts

  const [userActivityData, setUserActivityData] = useState({});
  const [userActivityOptions, setUserActivityOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: ['01-01-2025', '02-01-2025', '03-01-2025', '04-01-2025', '05-01-2025', '06-01-2025', '07-01-2025', '08-01-2025', '09-01-2025', '10-01-2025', '11-01-2025', '12-01-2025', '13-01-2025', '14-01-2025', '15-01-2025'],
      datasets: [
        {
          label: 'Average Activity',
          data: [5, 8, 6, 9, 7, 10, 12, 11, 10, 13, 12, 15, 14, 16, 17], // Smaller values for average activity
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Total Activity',
          data: [20, 25, 22, 28, 26, 30, 35, 33, 32, 38, 36, 40, 39, 45, 50], // Smaller values for total activity
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        },
        {
          label: 'User Activity',
          data: [3, 5, 4, 6, 5, 7, 8, 7, 6, 9, 8, 10, 9, 11, 12], // Smaller values for user activity
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          tension: 0.4
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const datasetLabel = context.dataset.label || '';
              const value = context.raw || 0;
              return `${datasetLabel}: ${value}`;
            },
            footer: function (tooltipItems) {
              const index = tooltipItems[0].dataIndex;
              const avg = data.datasets[0].data[index];
              const total = data.datasets[1].data[index];
              const user = data.datasets[2].data[index];
              return `Average: ${avg} | Total: ${total} | User: ${user}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            stepSize: 5 // Adjusted step size for smaller values
          },
          grid: {
            color: surfaceBorder
          },
          suggestedMin: 0, // Minimum value for y-axis
          suggestedMax: 20 // Adjusted maximum value for y-axis
        }
      }
    };

    setUserActivityData(data);
    setUserActivityOptions(options);
  }, []);

  // user activity ends

  // table dropdown starts
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const periods = [
    { name: "Yearly", code: "YR" },
    { name: "Monthly", code: "MT" },
    { name: "Weekly", code: "WK" },
    { name: "Today", code: "TD" }
  ];
  // table dropdown ends

  return (
    <React.Fragment>
      <div className="page-content allact-tabs manager-dash">
        <Container fluid={true}>
          <div className="page-title-box mb-0 recruiter-dashboard actjobsum">
            <Row>
              <Col lg={12}>
                <h1 class="page-title mb-4">Manager Dashboard
                </h1>
              </Col>
            </Row>

            <Row>
              <Col lg={3} md={6} className="mb-4">
                <Dropdown value={selectedValues} onChange={(e) => setSelectedValues(e.value)} options={values} optionLabel="name"
                  placeholder="All Projects" className="w-full bgclr me-2" checkmark={true} highlightOnSelect={false} />
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <Dropdown value={selectedRange} onChange={(e) => setSelectedRange(e.value)} options={ranges} optionLabel="name"
                  placeholder="Custom Range" className="w-full bgclr" checkmark={true} highlightOnSelect={false} />
              </Col>

              <Col lg={3} md={6} className="mb-4">
                <Dropdown value={worktype} onChange={(e) => setworktype(e.value)} options={worktypes} optionLabel="name"
                  placeholder="WorkTypes" className="w-full bgclr" checkmark={true} highlightOnSelect={false} />
              </Col>


            </Row>

            <Row>
              <Col lg={3} md={6} className="mb-4">
                <Card className="h-100">
                  <p className="smalltitle"> Total Projects </p>
                  <div className="d-flex justify-content-between">
                    <h3 className="smallhead">30</h3>

                    {/* <span><i className="pi pi-arrow-up me-2 success-txt"></i>+12%</span> */}
                    <span className="manager-textstyle-grn">
                      <span><i className="pi pi-arrow-up me-2 success-txt"></i></span> <span className="success-txt">+12%</span></span>


                  </div>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <Card className="h-100">
                  <p className="smalltitle"> Total WorkType </p>
                  <div className="d-flex justify-content-between">
                    <h3 className="smallhead">200</h3>
                    {/* <span><i className="pi pi-arrow-down me-2 danger-txt"></i>-40%</span> */}
                    <span className="manager-textstyle-red">
                      <span><i className="pi pi-arrow-down me-2 danger-txt"></i></span> <span className="danger-txt">-40%</span></span>
                  </div>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <Card className="h-100">
                  <p className="smalltitle"> WorkType Completed </p>
                  <div className="d-flex justify-content-between">
                    <h3 className="smallhead">120</h3>
                    {/* <span><i className="pi pi-arrow-up me-2 success-txt"></i> +70%</span> */}
                    <span className="manager-textstyle-grn">
                      <span><i className="pi pi-arrow-up me-2 success-txt"></i></span> <span className="success-txt">+70%</span></span>
                  </div>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <Card className="h-100">
                  <p className="smalltitle"> WorkType Extended </p>
                  <div className="d-flex justify-content-between">
                    <h3 className="smallhead">80</h3>
                    {/* <span><i className="pi pi-arrow-down me-2 danger-txt"></i> -52%</span> */}
                    <span className="manager-textstyle-red">
                      <span><i className="pi pi-arrow-down me-2 danger-txt"></i></span> <span className="danger-txt">-52%</span></span>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row >
              <Col lg={4} className="mb-4">
                <Card className="h-100">
                  <div className="d-flex">
                    <h1 className="title">WorkType by Priority</h1>
                  </div>
                  <Chart type="doughnut" data={chartData1} options={chartOptions1} className="w-full md:w-30rem d-flex justifu-content-center" />
                </Card>
              </Col>

              <Col lg={8} className="mb-4">
                <Card className="h-70">
                  <h1 className="title">Created vs. Completed WorkType in Projects</h1>
                  <Chart type="bar" data={taskData} options={taskOptions} />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col lg={12} className="mb-4">
                <div className="mandashtable">
                  <Card className="h-100">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <h1 className="title mb-0">Recent Projects</h1>
                        {selectedJobs.length > 0 && (
                          <Button
                            icon="pi pi-eye"
                            className="p-button-rounded rounded-1 p-button-text p-button-sm text-dark custom-hover-button"
                            onClick={handleViewProject}
                            tooltip={`View ${selectedJobs.length} selected project${selectedJobs.length > 1 ? 's' : ''}`}
                            tooltipOptions={{ position: 'top' }}
                            style={{
                              width: '32px',
                              height: '32px',
                              color: '#4f46e5'
                            }}
                          />
                        )}
                      </div>


                      <div className="d-flex align-items-center gap-3">

                        <Dropdown
                          value={selectedPeriod}
                          onChange={(e) => setSelectedPeriod(e.value)}
                          options={periods}
                          optionLabel="name"
                          placeholder="Select a Period"
                          className="md:w-12.1rem bgclr"
                        />
                      </div>
                    </div>

                    <div className="card1 actjobsumtable">
                      <DataTable
                        value={openJobs}
                        dataKey="project_code"
                        filters={openjobfilters}
                        filterDisplay="row"
                        globalFilterFields={[
                          "project_code",
                          "project_name",
                          "status",
                          "start_date",
                          "end_date",
                          "extended_end_date",
                          "reason_for_late",
                          "project_manager",
                          "company",
                          "work_type" // Add work_type to globalFilterFields for search functionality
                        ]}
                        scrollable
                        scrollHeight="400px"
                        emptyMessage="No projects found."
                        selection={selectedJobs}
                        onSelectionChange={(e) => setSelectedJobs(e.value)}
                        selectionMode="multiple"
                        resizableColumns
                        columnResizeMode="expand"
                      >
                        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                        <Column field="project_code" header="Project Code" sortable filter style={{ minWidth: "10rem" }} />
                        <Column field="project_name" header="Project Name" sortable frozen filter style={{ minWidth: "15rem" }} />
                        <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                        <Column
                          field="work_type"
                          header="Work Type Count"
                          body={(rowData) => `${rowData.pending_tasks || 0}/${rowData.total_tasks || 0}`} // Display pending/total tasks
                          filter
                          sortable
                          style={{ minWidth: "12rem" }}
                        />
                        <Column field="start_date" header="Start Date" sortable filter style={{ minWidth: "10rem" }} />
                        <Column field="end_date" header="End Date" sortable filter style={{ minWidth: "10rem" }} />
                        <Column
                          field="extended_end_date"
                          header="Extended End Date"
                          sortable
                          filter
                          style={{ minWidth: "12rem" }}
                          body={extendedEndDateBodyTemplate}
                        />
                        <Column
                          field="reason_for_late"
                          header="Reason for Late"
                          sortable
                          filter
                          style={{ minWidth: "15rem" }}
                          body={reasonForLateBodyTemplate}
                        />
                        <Column field="project_manager" header="Project Manager" sortable filter style={{ minWidth: "12rem" }} />
                        <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                      </DataTable>
                    </div>
                  </Card>

                </div>
              </Col>
            </Row>

            {/* Sidebar start */}
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
                      <i className="pi pi-folder me-1"></i> Project - Project Name
                    </h3>
                    <div className="d-flex align-items-center">
                      <Link to="/project-editform">
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
                    <TabPanel header="Project" leftIcon="pi pi-folder mr-2">
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
                              <Row>
                                <Col lg={4}>
                                  <div className="field">
                                    <label htmlFor="jobId">Project Code</label>
                                    <InputText
                                      id="jobId"
                                      placeholder="Job-101"
                                      className="w-full"
                                      value={jobid}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4}>
                                  <div className="field">
                                    <label htmlFor="jobTitle">Project Name</label>
                                    <InputText
                                      id="jobTitle"
                                      placeholder="Web Developer"
                                      className="w-full"
                                      value={jobtitle}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4}>
                                  <div className="field">
                                    <label htmlFor="company">Company</label>
                                    <InputText
                                      id="company"
                                      placeholder="Varun Digital Media"
                                      className="w-full"
                                      value={company}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col lg={4}>
                                  <div className="field">
                                    <label htmlFor="hiringManager">
                                      Project Manager
                                    </label>
                                    <InputText
                                      id="hiringManager"
                                      placeholder="Mahesh Kumar Bhoga"
                                      className="w-full"
                                      value={hiringmanager1}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="jobType">Categories</label>
                                    <InputText
                                      id="categories"
                                      placeholder="Frontend"
                                      className="block w-full"
                                      value={categ}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="jobType">Groups</label>
                                    <InputText
                                      id="groups"
                                      placeholder="HTML, CSS"
                                      className="block w-full"
                                      value={group}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col lg={4}>
                                  <div className="field">
                                    <label htmlFor="workplaceType">
                                      Workplace Type
                                    </label>
                                    <InputText
                                      id="workplaceType"
                                      placeholder="Work From Office"
                                      className="w-full"
                                      value={workplace}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="field">
                                    <label htmlFor="jobStartDate" className="block">
                                      Project Start Date
                                    </label>
                                    <InputText
                                      id="ProjectStartDate"
                                      placeholder="01-01-2025"
                                      className="block w-full"
                                      value={jobstart}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4}>
                                  <div className="field">
                                    <label htmlFor="jobEndDate" className="block">
                                      Project End Date
                                    </label>
                                    <InputText
                                      id="jobEndDate"
                                      placeholder="31-12-2025"
                                      className="block w-full"
                                      value={jobend}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="jobType">UserID</label>
                                    <InputText
                                      id="userIds"
                                      placeholder="Harish"
                                      className="block w-full"
                                      value={userids}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mt-3">
                                <Col lg={12}>
                                  <div className="field">
                                    <label htmlFor="description">Description</label>
                                    <InputTextarea
                                      id="description"
                                      // value={text}
                                      placeholder=""
                                      rows={4}
                                      cols={30}
                                      className="w-full"
                                      value={description1}
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
                                      // autoResize
                                      // rows={2}
                                      // cols={20}
                                      placeholder=""
                                      className="w-full"
                                      value={notes1}
                                    />
                                  </div>
                                </Col>
                              </Row>
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

                    <TabPanel header="Estimates" leftIcon="pi pi-sitemap mr-2">
                      <Row>
                        <Col lg={12}>
                          {/* <EstimateTable /> */}

                          <Row className="mt-5">
                            <Col lg={12}>
                              <div className="doc-table">
                                <TreeTable
                                  value={documents}
                                  tableStyle={{ minWidth: "50rem" }}
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
                                  />
                                  <Column
                                    body={actionTemplate}
                                    header="Actions"
                                  />
                                </TreeTable>
                              </div>
                            </Col>
                          </Row>
                          <Accordion activeIndex={0}>
                          </Accordion>
                        </Col>
                      </Row>
                    </TabPanel>


                   
                    <TabPanel header="Work Type" leftIcon="pi pi-check-square mr-2">
                      <Row>
                        <Col lg={12}>
                          <div className="pipelinetabs">
                            <TabView
                              scrollable
                              style={{ maxWidth: "1200px", overflow: "hidden" }}
                            >
                              <TabPanel
                                header="To Do"
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
                                            "task_status",
                                            "task_code",
                                            "task_name",
                                            "Estimated Work Hours",
                                            "start_date",
                                            "end_date",
                                            "project_name",
                                            "assigned_to",
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
                                            field="task_status"
                                            header="Work Type Status"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_code"
                                            header="Work Type Code"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_name"
                                            header="Summary"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="Estimated Work Hours"
                                            header="Estimated Work Hours"
                                            sortable
                                            filter
                                            style={{ minWidth: "4rem" }}
                                            className="dis-tablecenter"
                                          />
                                          <Column
                                            field="start_date"
                                            header="Start Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="end_date"
                                            header="End Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="project_name"
                                            header="Project"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                          <Column
                                            field="assigned_to"
                                            header="Assigned To"
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
                                header="In Progress"
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
                                          value={potentialJobs.map(job => ({
                                            ...job,
                                            EstimatedWorkHours:
                                              job["Estimated Work Hours"], // remap to remove space
                                          }))}
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
                                            "task_status",
                                            "task_code",
                                            "task_name",
                                            "EstimatedWorkHours",
                                            "start_date",
                                            "end_date",
                                            "project_name",
                                            "assigned_to",
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
                                            field="task_status"
                                            header="Work Type Status"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_code"
                                            header="Work Type Code"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_name"
                                            header="Summary"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="EstimatedWorkHours"
                                            header="Estimated Work Hours"
                                            sortable
                                            filter
                                            style={{ minWidth: "4rem" }}
                                            className="dis-tablecenter"
                                          />
                                          <Column
                                            field="start_date"
                                            header="Start Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="end_date"
                                            header="End Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="project_name"
                                            header="Project Name"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                          <Column
                                            field="assigned_to"
                                            header="Assigned To"
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
                                header="In Review"
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
                                            "task_status",
                                            "task_code",
                                            "task_name",
                                            "Estimated Work Hours",
                                            "start_date",
                                            "end_date",
                                            "project_name",
                                            "assigned_to",
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
                                            field="task_status"
                                            header="Work Type Status"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_code"
                                            header="Work Type Code"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_name"
                                            header="Summary"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                          <Column
                                            field="Estimated Work Hours"
                                            header="Est. Hours"
                                            sortable
                                            filter
                                            style={{ minWidth: "4rem" }}
                                            className="dis-tablecenter"
                                          />
                                          <Column
                                            field="start_date"
                                            header="Start Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="end_date"
                                            header="End Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="project_name"
                                            header="Project Name"
                                            sortable
                                            filter
                                            style={{ minWidth: "14rem" }}
                                          />
                                          <Column
                                            field="assigned_to"
                                            header="Assigned To"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                        </DataTable>
                                      </div>
                                    </section>
                                  </Col>
                                </Row>
                              </TabPanel>
                              <TabPanel
                                header="Ready for QA"
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
                                            "task_status",
                                            "task_code",
                                            "task_name",
                                            "Estimated Work Hours",
                                            "start_date",
                                            "end_date",
                                            "project_name",
                                            "assigned_to",
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
                                            field="task_status"
                                            header="Work Type Status"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_code"
                                            header="Work Type Code"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_name"
                                            header="Summary"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                          <Column
                                            field="Estimated Work Hours"
                                            header="Est. Hours"
                                            sortable
                                            filter
                                            style={{ minWidth: "4rem" }}
                                            className="dis-tablecenter"
                                          />
                                          <Column
                                            field="start_date"
                                            header="Start Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="end_date"
                                            header="End Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="project_name"
                                            header="Project Name"
                                            sortable
                                            filter
                                            style={{ minWidth: "14rem" }}
                                          />
                                          <Column
                                            field="assigned_to"
                                            header="Assigned To"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                        </DataTable>
                                      </div>
                                    </section>
                                  </Col>
                                </Row>
                              </TabPanel>
                              <TabPanel
                                header="QA in Progress"
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
                                            "task_status",
                                            "task_code",
                                            "task_name",
                                            "Estimated Work Hours",
                                            "start_date",
                                            "end_date",
                                            "project_name",
                                            "assigned_to",
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
                                            field="task_status"
                                            header="Work Type Status"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_code"
                                            header="Work Type Code"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_name"
                                            header="Summary"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                          <Column
                                            field="Estimated Work Hours"
                                            header="Est. Hours"
                                            sortable
                                            filter
                                            style={{ minWidth: "4rem" }}
                                            className="dis-tablecenter"
                                          />
                                          <Column
                                            field="start_date"
                                            header="Start Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="end_date"
                                            header="End Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="project_name"
                                            header="Project"
                                            sortable
                                            filter
                                            style={{ minWidth: "14rem" }}
                                          />
                                          <Column
                                            field="assigned_to"
                                            header="Assigned To"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                        </DataTable>
                                      </div>
                                    </section>
                                  </Col>
                                </Row>
                              </TabPanel>
                              <TabPanel
                                header="Blocked"
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
                                          value={rejectedJobs.map(job => ({
                                            ...job,
                                            EstimatedWorkHours:
                                              job["Estimated Work Hours"], // remap key with spaces
                                          }))}
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
                                            "task_status",
                                            "task_code",
                                            "task_name",
                                            "EstimatedWorkHours",
                                            "start_date",
                                            "end_date",
                                            "project_name",
                                            "assigned_to",
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
                                            field="task_status"
                                            header="Work Type Status"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_code"
                                            header="Work Type Code"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_name"
                                            header="Summary"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="EstimatedWorkHours"
                                            header="Estimated Work Hours"
                                            sortable
                                            filter
                                            style={{ minWidth: "4rem" }}
                                            className="dis-tablecenter"
                                          />
                                          <Column
                                            field="start_date"
                                            header="Start Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="end_date"
                                            header="End Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="project_name"
                                            header="Project Name"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                          <Column
                                            field="assigned_to"
                                            header="Assigned To"
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
                                header="Done or Closed"
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
                                            "task_status",
                                            "task_code",
                                            "task_name",
                                            "Estimated Work Hours",
                                            "start_date",
                                            "end_date",
                                            "project_name",
                                            "assigned_to",
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
                                            field="task_status"
                                            header="Work Type Status"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_code"
                                            header="Work Type Code"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="task_name"
                                            header="Summary"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
                                          />
                                          <Column
                                            field="Estimated Work Hours"
                                            header="Est. Hours"
                                            sortable
                                            filter
                                            style={{ minWidth: "4rem" }}
                                            className="dis-tablecenter"
                                          />
                                          <Column
                                            field="start_date"
                                            header="Start Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="end_date"
                                            header="End Date"
                                            sortable
                                            filter
                                            style={{ minWidth: "10rem" }}
                                          />
                                          <Column
                                            field="project_name"
                                            header="Project"
                                            sortable
                                            filter
                                            style={{ minWidth: "14rem" }}
                                          />
                                          <Column
                                            field="assigned_to"
                                            header="Assigned To"
                                            sortable
                                            filter
                                            style={{ minWidth: "12rem" }}
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
                                onSelectionChange={e => setSelectedActivities(e.value)}
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
            {/* Sidebar end */}

          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManagerDashboard;



