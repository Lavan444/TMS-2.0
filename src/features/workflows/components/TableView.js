import React, { useState, useEffect, useRef } from "react"
import { Col, Container, Row } from "reactstrap"
import { Menu } from "primereact/menu"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Sidebar } from "primereact/sidebar"
import { Link } from "react-router-dom"
import { TabView, TabPanel } from "primereact/tabview"
import { Badge } from "primereact/badge"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FilterMatchMode } from "primereact/api"
import { Dropdown } from "primereact/dropdown"
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { ChevronRightIcon } from "primereact/icons/chevronright"
import { useNavigate } from "react-router-dom"
import { Accordion, AccordionTab } from "primereact/accordion"
import { InputText } from "primereact/inputtext"
import { Calendar } from 'primereact/calendar';
import { TreeSelect } from 'primereact/treeselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { TreeTable } from 'primereact/treetable';


const TableView = () => {
  // view form pipeline starts

  const [receivedJobsFilters, setReceivedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const [selectedNewJobs, setSelectedNewJobs] = useState([])

  const newJobs = [
    {
      type: "Interview",
      contact: "Srinivas",
      job_title: "Frontend Developer",
      company: "TCS",
      phone: "9898989898",
      city: "Hyderabad",
      job_id: "Job-101",
      user_id: "srinivas123",
      create_date: "21/01/2025",
      closed_date: "23/06/2025",
    },
    {
      type: "Offer Accepted",
      contact: "Rajesh",
      job_title: "Backend Developer",
      company: "Infosys",
      phone: "9876543210",
      city: "Bangalore",
      job_id: "Job-102",
      user_id: "rajesh456",
      create_date: "01/02/2025",
      closed_date: "01/07/2025",
    },
    {
      type: "Interview",
      contact: "Priya",
      job_title: "Data Analyst",
      company: "Wipro",
      phone: "9123456780",
      city: "Chennai",
      job_id: "Job-103",
      user_id: "priya789",
      create_date: "05/01/2025",
      closed_date: "10/05/2025",
    },
    {
      type: "Offer Accepted",
      contact: "Anil",
      job_title: "Mechanical Engineer",
      company: "L&T",
      phone: "9876512345",
      city: "Pune",
      job_id: "Job-104",
      user_id: "anil321",
      create_date: "12/03/2025",
      closed_date: "15/08/2025",
    },
    {
      type: "Interview",
      contact: "Swetha",
      job_title: "HR Manager",
      company: "Capgemini",
      phone: "9823456701",
      city: "Kolkata",
      job_id: "Job-105",
      user_id: "swetha555",
      create_date: "20/04/2025",
      closed_date: "20/09/2025",
    },
    {
      type: "Offer Accepted",
      contact: "Kiran",
      job_title: "Software Tester",
      company: "Accenture",
      phone: "9845678902",
      city: "Delhi",
      job_id: "Job-106",
      user_id: "kiran333",
      create_date: "10/05/2025",
      closed_date: "25/10/2025",
    },
    {
      type: "Interview",
      contact: "Meera",
      job_title: "Project Manager",
      company: "HCL",
      phone: "9865432109",
      city: "Mumbai",
      job_id: "Job-107",
      user_id: "meera101",
      create_date: "15/06/2025",
      closed_date: "30/11/2025",
    },
    {
      type: "Offer Accepted",
      contact: "Arjun",
      job_title: "UI/UX Designer",
      company: "Adobe",
      phone: "9832104567",
      city: "Noida",
      job_id: "Job-108",
      user_id: "arjun007",
      create_date: "25/06/2025",
      closed_date: "15/12/2025",
    },
    {
      type: "Interview",
      contact: "Nisha",
      job_title: "Cloud Engineer",
      company: "Microsoft",
      phone: "9871234560",
      city: "Gurgaon",
      job_id: "Job-109",
      user_id: "nisha999",
      create_date: "30/06/2025",
      closed_date: "10/01/2026",
    },
    {
      type: "Offer Accepted",
      contact: "Vikram",
      job_title: "AI Engineer",
      company: "Google",
      phone: "9891234567",
      city: "Hyderabad",
      job_id: "Job-110",
      user_id: "vikram001",
      create_date: "05/07/2025",
      closed_date: "20/01/2026",
    },
  ]

  const navigate = useNavigate()

  const [selectedReceivedJobs, setSelectedReceivedJobs] = useState([])

  // potential

  const [potentialJobsFilters, setPotentialJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const potentialJobs = [
    {
      status: "Open",
      jobid: "DEV101",
      job_title: "Software Engineer",
      contact: "Anna Taylor",
      company: "SoftTech Ltd.",
      date_time: "2025-01-15 01:00 PM",
      user_id: "11111",
    },
    {
      status: "In Progress",
      jobid: "DEV102",
      job_title: "System Architect",
      contact: "Chris Walker",
      company: "NextGen Solutions",
      date_time: "2025-01-18 11:00 AM",
      user_id: "22222",
    },
    {
      status: "Open",
      jobid: "DEV102",
      job_title: "Mobile App Developer",
      contact: "James Smith",
      company: "AppSolutions Inc.",
      date_time: "2025-01-17 09:30 AM",
      user_id: "22222",
    },
  ]

  const [selectedPotentialJobs, setSelectedPotentialJobs] = useState([])

  // submitted
  const [submittedJobsFilters, setSubmittedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const submittedJobs = [
    {
      status: "Closed",
      jobid: "DEV201",
      job_title: "QA Tester",
      contact: "Sarah Connor",
      company: "PrimeTech Inc.",
      date_time: "2025-01-10 09:00 AM",
      user_id: "33333",
    },
    {
      status: "Pending",
      jobid: "DEV202",
      job_title: "DevOps Engineer",
      contact: "Jake Paul",
      company: "CloudWorks",
      date_time: "2025-01-20 04:30 PM",
      user_id: "44444",
    },
    {
      status: "Pending",
      jobid: "DEV202",
      job_title: "DevOps Engineer",
      contact: "Jake Paul",
      company: "CloudWorks",
      date_time: "2025-01-20 04:30 PM",
      user_id: "44444",
    },
    {
      status: "Pending",
      jobid: "DEV203",
      job_title: "Frontend Developer",
      contact: "Sara Lee",
      company: "Web Innovators",
      date_time: "2025-02-01 09:00 AM",
      user_id: "55555",
    },
    {
      status: "Pending",
      jobid: "DEV204",
      job_title: "Backend Developer",
      contact: "Mark Turner",
      company: "Tech Solutions",
      date_time: "2025-02-05 11:00 AM",
      user_id: "66666",
    },
    {
      status: "Pending",
      jobid: "DEV205",
      job_title: "Full Stack Developer",
      contact: "Laura Green",
      company: "Digital World",
      date_time: "2025-02-10 02:30 PM",
      user_id: "77777",
    },
    {
      status: "Pending",
      jobid: "DEV206",
      job_title: "Product Manager",
      contact: "James Brown",
      company: "FutureTech",
      date_time: "2025-01-30 10:00 AM",
      user_id: "88888",
    },
    {
      status: "Pending",
      jobid: "DEV207",
      job_title: "UI/UX Designer",
      contact: "Sophia Clark",
      company: "Design Studio",
      date_time: "2025-02-15 01:00 PM",
      user_id: "99999",
    },
    {
      status: "Pending",
      jobid: "DEV208",
      job_title: "QA Engineer",
      contact: "Henry Scott",
      company: "Testify Labs",
      date_time: "2025-01-25 03:30 PM",
      user_id: "10101",
    },
    {
      status: "Pending",
      jobid: "DEV209",
      job_title: "Data Scientist",
      contact: "Emily White",
      company: "DataMind",
      date_time: "2025-02-20 12:00 PM",
      user_id: "20202",
    },
    {
      status: "Pending",
      jobid: "DEV210",
      job_title: "Machine Learning Engineer",
      contact: "Oliver Gray",
      company: "AI Innovations",
      date_time: "2025-01-28 10:30 AM",
      user_id: "30303",
    },
    {
      status: "Pending",
      jobid: "DEV211",
      job_title: "Software Engineer",
      contact: "Lily Black",
      company: "TechX",
      date_time: "2025-02-12 04:00 PM",
      user_id: "40404",
    },
    {
      status: "Pending",
      jobid: "DEV212",
      job_title: "Network Administrator",
      contact: "Carlos Lopez",
      company: "NetSecure",
      date_time: "2025-01-26 09:30 AM",
      user_id: "50505",
    },
    {
      status: "Pending",
      jobid: "DEV213",
      job_title: "Security Engineer",
      contact: "Amelia Harris",
      company: "SafeGuard",
      date_time: "2025-02-08 02:00 PM",
      user_id: "60606",
    },
    {
      status: "Pending",
      jobid: "DEV214",
      job_title: "Cloud Architect",
      contact: "John Wilson",
      company: "CloudMasters",
      date_time: "2025-01-22 11:30 AM",
      user_id: "70707",
    },
    {
      status: "Pending",
      jobid: "DEV215",
      job_title: "Blockchain Developer",
      contact: "Olivia Moore",
      company: "BlockChainX",
      date_time: "2025-02-18 09:00 AM",
      user_id: "80808",
    },
  ]

  const [selectedSubmittedJobs, setSelectedSubmittedJobs] = useState([])

  // offer

  const [offerJobsFilters, setOfferJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const offerJobs = [
    {
      status: "Open",
      jobid: "OFFER001",
      job_title: "Project Manager",
      contact: "Alice Green",
      company: "Management Pro",
      date_time: "2025-01-10 11:00 AM",
      user_id: "23456",
    },
    {
      status: "Closed",
      jobid: "OFFER002",
      job_title: "UI/UX Designer",
      contact: "Steve White",
      company: "Design Studio",
      date_time: "2024-11-20 01:15 PM",
      user_id: "65432",
    },
    {
      status: "In Progress",
      jobid: "OFFER003",
      job_title: "Full-Stack Developer",
      contact: "Mia Johnson",
      company: "Web Solutions",
      date_time: "2025-02-05 03:45 PM",
      user_id: "78901",
    },
    {
      status: "In Progress",
      jobid: "OFFER004",
      job_title: "Data Scientist",
      contact: "Liam Brown",
      company: "DataCorp",
      date_time: "2025-02-15 10:00 AM",
      user_id: "45678",
    },
  ]

  const [selectedOfferJobs, setSelectedOfferJobs] = useState([])

  // rejected

  const [rejectedJobsFilters, setRejectedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const rejectedJobs = [
    {
      status: "Rejected",
      jobid: "REJ001",
      job_title: "Marketing Manager",
      contact: "Evan Davis",
      company: "MarketHub",
      date_time: "2025-01-15 04:00 PM",
      user_id: "34567",
    },
    {
      status: "Rejected",
      jobid: "REJ002",
      job_title: "Software Tester",
      contact: "Laura Bright",
      company: "QA Experts",
      date_time: "2024-12-01 10:00 AM",
      user_id: "76543",
    },
  ]

  const [selectedRejectedJobs, setSelectedRejectedJobs] = useState([])

  // interview

  const [interviewJobsFilters, setInterviewJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const interviewJobs = [
    {
      status: "Scheduled",
      jobid: "INT001",
      job_title: "Java Developer",
      contact: "Chris White",
      company: "CodeCraft",
      date_time: "2025-01-25 03:00 PM",
      user_id: "11111",
    },
    {
      status: "Completed",
      jobid: "INT002",
      job_title: "Product Manager",
      contact: "Sarah Blue",
      company: "Innovate Tech",
      date_time: "2025-01-20 11:00 AM",
      user_id: "22222",
    },
    {
      status: "Scheduled",
      jobid: "INT003",
      job_title: "DevOps Engineer",
      contact: "Mike Green",
      company: "Cloud Solutions",
      date_time: "2025-02-05 02:00 PM",
      user_id: "33333",
    },
    {
      status: "Completed",
      jobid: "INT002",
      job_title: "Product Manager",
      contact: "Sarah Blue",
      company: "Innovate Tech",
      date_time: "2025-01-20 11:00 AM",
      user_id: "22222",
    },
    {
      status: "Scheduled",
      jobid: "INT003",
      job_title: "DevOps Engineer",
      contact: "Mike Green",
      company: "Cloud Solutions",
      date_time: "2025-02-05 02:00 PM",
      user_id: "33333",
    },
  ]

  const [selectedInterviewJobs, setSelectedInterviewJobs] = useState([])

  // placed

  const [newJobsFilters, setNewJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    contact: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    city: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    user_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    closed_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
  })

  const [placedJobsFilters, setPlacedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const placedJobs = [
    {
      status: "Placed",
      jobid: "PLC001",
      job_title: "Web Developer",
      contact: "John Smith",
      company: "Tech Solutions",
      date_time: "2025-01-20 11:00 AM",
      user_id: "12345",
    },
    {
      status: "Placed",
      jobid: "PLC002",
      job_title: "UI/UX Designer",
      contact: "Jane Doe",
      company: "Creative Minds",
      date_time: "2025-01-10 03:30 PM",
      user_id: "67890",
    },
    {
      status: "Placed",
      jobid: "PLC003",
      job_title: "Data Analyst",
      contact: "Alice Johnson",
      company: "Analytics Pro",
      date_time: "2024-12-20 09:00 AM",
      user_id: "24680",
    },
    {
      status: "Placed",
      jobid: "PLC004",
      job_title: "Software Engineer",
      contact: "Michael Harris",
      company: "Tech Innovators",
      date_time: "2025-01-18 11:00 AM",
      user_id: "11223",
    },
    {
      status: "Placed",
      jobid: "PLC005",
      job_title: "Project Manager",
      contact: "Emily Clark",
      company: "Global Solutions",
      date_time: "2025-02-01 02:30 PM",
      user_id: "55677",
    },
  ]

  const [selectedPlacedJobs, setSelectedPlacedJobs] = useState([])

  // view form pipeline ends

  //   Received start

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
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subtype: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    companyname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    userId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    startDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    endDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
  })

  const [potentialData, setPotentialData] = useState([
    {
      id: 1,
      type: "Meeting",
      subtype: "Project Kickoff",
      subject: "Discuss Project Scope",
      companyname: "Google",
      phone: "9123674890",
      city: "San Francisco",
      jobid: "Proj-201",
      userId: "Alice Johnson",
      startDate: "2025-02-08",
      endDate: "2025-02-08",
    },
    {
      id: 2,
      type: "Workshop",
      subtype: "UI/UX Design",
      subject: "Figma Workshop",
      companyname: "Adobe",
      phone: "9876545678",
      city: "Los Angeles",
      jobid: "Work-301",
      userId: "Chris Evans",
      startDate: "2025-02-10",
      endDate: "2025-02-12",
    },
    {
      id: 3,
      type: "Seminar",
      subtype: "Cybersecurity",
      subject: "Understanding Modern Threats",
      companyname: "Cisco",
      phone: "9988774466",
      city: "Austin",
      jobid: "Sem-401",
      userId: "Sophia Patel",
      startDate: "2025-02-15",
      endDate: "2025-02-15",
    },
    {
      id: 4,
      type: "Conference",
      subtype: "Tech Innovators",
      subject: "AI and the Future",
      companyname: "Microsoft",
      phone: "9123456780",
      city: "Seattle",
      jobid: "Conf-501",
      userId: "Mark Zuckerberg",
      startDate: "2025-02-20",
      endDate: "2025-02-22",
    },
    {
      id: 5,
      type: "Webinar",
      subtype: "Marketing Strategies",
      subject: "Building Customer Engagement",
      companyname: "HubSpot",
      phone: "9988001122",
      city: "Virtual",
      jobid: "Web-601",
      userId: "Sarah Connor",
      startDate: "2025-02-25",
      endDate: "2025-02-25",
    },
    {
      id: 6,
      type: "Training",
      subtype: "Cloud Computing",
      subject: "AWS Bootcamp",
      companyname: "Amazon",
      phone: "9988772233",
      city: "New York",
      jobid: "Train-701",
      userId: "Daniel Watson",
      startDate: "2025-02-28",
      endDate: "2025-03-03",
    },
    {
      id: 7,
      type: "Networking Event",
      subtype: "Entrepreneur Meetup",
      subject: "Startup Pitching",
      companyname: "WeWork",
      phone: "9876512345",
      city: "Boston",
      jobid: "Net-801",
      userId: "Emma Brown",
      startDate: "2025-03-05",
      endDate: "2025-03-05",
    },
    {
      id: 8,
      type: "Hackathon",
      subtype: "AI Development",
      subject: "Build with GPT",
      companyname: "OpenAI",
      phone: "9876123456",
      city: "San Jose",
      jobid: "Hack-901",
      userId: "Oliver King",
      startDate: "2025-03-10",
      endDate: "2025-03-11",
    },
  ])

  const [tableData, setTableData] = useState([
    {
      id: 1,
      type: "Interview",
      subtype: "Arjun Sharma",
      subject: "Complete Report",
      companyname: "TCS",
      phone: "9876543210",
      city: "Hyderabad",
      jobid: "Job-101",
      userId: "Arjun Sharma",
      startDate: "16-01-2025",
      endDate: "18-01-2025",
    },
    {
      id: 2,
      type: "Offer Accepted",
      subtype: "Priya Patel",
      subject: "Planning Session",
      companyname: "Infosys",
      phone: "9123456789",
      city: "Bangalore",
      jobid: "Job-102",
      userId: "Priya Patel",
      startDate: "19-01-2025",
      endDate: "21-01-2025",
    },
    {
      id: 3,
      type: "Interview",
      subtype: "Rahul Iyer",
      subject: "React Training",
      companyname: "Wipro",
      phone: "9988776655",
      city: "Chennai",
      jobid: "Job-103",
      userId: "Rahul Iyer",
      startDate: "22-01-2025",
      endDate: "23-01-2025",
    },
    {
      id: 4,
      type: "Offer Accepted",
      subtype: "Ananya Reddy",
      subject: "Data Analysis",
      companyname: "Capgemini",
      phone: "9876541230",
      city: "Pune",
      jobid: "Job-104",
      userId: "Ananya Reddy",
      startDate: "24-01-2025",
      endDate: "25-01-2025",
    },
    {
      id: 5,
      type: "Interview",
      subtype: "Vikram Singh",
      subject: "Project Discussion",
      companyname: "HCL",
      phone: "9123450987",
      city: "Mumbai",
      jobid: "Job-105",
      userId: "Vikram Singh",
      startDate: "26-01-2025",
      endDate: "27-01-2025",
    },
    {
      id: 6,
      type: "Offer Accepted",
      subtype: "Divya Nair",
      subject: "Code Review",
      companyname: "Accenture",
      phone: "9988112233",
      city: "Delhi",
      jobid: "Job-106",
      userId: "Divya Nair",
      startDate: "27-01-2025",
      endDate: "29-01-2025",
    },
    {
      id: 7,
      type: "Interview",
      subtype: "Rajiv Menon",
      subject: "Tech Meetup",
      companyname: "Deloitte",
      phone: "9876549876",
      city: "Kolkata",
      jobid: "Job-107",
      userId: "Rajiv Menon",
      startDate: "29-01-2025",
      endDate: "31-01-2025",
    },
    {
      id: 8,
      type: "Offer Accepted",
      subtype: "Neha Kapoor",
      subject: "Weekly Sync",
      companyname: "IBM",
      phone: "9123098765",
      city: "Ahmedabad",
      jobid: "Job-108",
      userId: "Neha Kapoor",
      startDate: "31-01-2025",
      endDate: "02-02-2025",
    },
    {
      id: 9,
      type: "Interview",
      subtype: "Sanjay Joshi",
      subject: "Testing Process",
      companyname: "Oracle",
      phone: "9988771122",
      city: "Noida",
      jobid: "Job-109",
      userId: "Sanjay Joshi",
      startDate: "02-02-2025",
      endDate: "04-02-2025",
    },
    {
      id: 10,
      type: "Offer Accepted",
      subtype: "Pooja Desai",
      subject: "Industry Trends",
      companyname: "Cognizant",
      phone: "9876054321",
      city: "Gurgaon",
      jobid: "Job-110",
      userId: "Pooja Desai",
      startDate: "04-02-2025",
      endDate: "06-02-2025",
    },
  ])


  const [selectSubmittedData, setSelectSubmittedData] = useState([])

  const [submittedData, setSubmittedData] = useState([
    {
      id: 1,
      type: "Client Meeting",
      subtype: "Contract Discussion",
      subject: "Finalize Agreement",
      companyname: "Accenture",
      phone: "9123456789",
      city: "Bangalore",
      jobid: "Client-1201",
      userId: "Nina Sharma",
      startDate: "18-03-2025",
      endDate: "28-03-2025",
    },
    {
      id: 2,
      type: "Onboarding",
      subtype: "New Employee",
      subject: "HR Orientation",
      companyname: "Infosys",
      phone: "9876543211",
      city: "Pune",
      jobid: "HR-1301",
      userId: "Raj Malhotra",
      startDate: "20-03-2025",
      endDate: "25-03-2025",
    },
    {
      id: 3,
      type: "Performance Review",
      subtype: "Annual Review",
      subject: "Employee Feedback",
      companyname: "IBM",
      phone: "9988776655",
      city: "Chennai",
      jobid: "Review-1401",
      userId: "Arjun Reddy",
      startDate: "22-03-2025",
      endDate: "14-05-2025",
    },
    {
      id: 4,
      type: "Team Building",
      subtype: "Outdoor Activity",
      subject: "Adventure Camp",
      companyname: "HCL",
      phone: "9876123456",
      city: "Shimla",
      jobid: "Team-1501",
      userId: "Priya Singh",
      startDate: "25-03-2025",
      endDate: "27-05-2025",
    },
    {
      id: 5,
      type: "Trade Show",
      subtype: "Product Launch",
      subject: "Showcase New Features",
      companyname: "Apple",
      phone: "9123412345",
      city: "Cupertino",
      jobid: "Trade-1601",
      userId: "Steve Jobs",
      startDate: "28-03-2025",
      endDate: "29-08-2025",
    },
    {
      id: 6,
      type: "Panel Discussion",
      subtype: "Industry Trends",
      subject: "Future of Blockchain",
      companyname: "Ethereum Foundation",
      phone: "9988776654",
      city: "Zurich",
      jobid: "Panel-1701",
      userId: "Vitalik Buterin",
      startDate: "30-01-2025",
      endDate: "30-03-2025",
    },
    {
      id: 7,
      type: "Product Demo",
      subtype: "SaaS Platform",
      subject: "Demo for Clients",
      companyname: "Zoho",
      phone: "9998887776",
      city: "Chennai",
      jobid: "Demo-1801",
      userId: "Ramesh Krishnan",
      startDate: "11-01-2025",
      endDate: "17-03-2025",
    },
    {
      id: 8,
      type: "Recruitment Drive",
      subtype: "Campus Hiring",
      subject: "Interview Freshers",
      companyname: "Wipro",
      phone: "9876001122",
      city: "Delhi",
      jobid: "Recruit-1901",
      userId: "Amit Patel",
      startDate: "03-04-2025",
      endDate: "04-04-2025",
    },
    {
      id: 9,
      type: "Town Hall",
      subtype: "All-Hands Meeting",
      subject: "Company Updates",
      companyname: "Meta",
      phone: "9876003322",
      city: "Menlo Park",
      jobid: "Town-2001",
      userId: "Mark Zuckerberg",
      startDate: "07-06-2025",
      endDate: "09-10-2025",
    },

  ]
  )


  const [selectedInterviewData, setSelectedInterviewData] = useState([])
  const [interviewData, setInterviewData] = useState([
    {
      id: 1,
      type: "Client Meeting",
      subtype: "Contract Discussion",
      subject: "Finalize Agreement",
      companyname: "Accenture",
      phone: "9123456789",
      city: "Bangalore",
      jobid: "Client-1201",
      userId: "Nina Sharma",
      startDate: "18-03-2025",
      endDate: "22-05-2025",
    },
    {
      id: 2,
      type: "Onboarding",
      subtype: "New Employee",
      subject: "HR Orientation",
      companyname: "Infosys",
      phone: "9876543211",
      city: "Pune",
      jobid: "HR-1301",
      userId: "Raj Malhotra",
      startDate: "20-04-2025",
      endDate: "28-04-2025",
    },
    {
      id: 3,
      type: "Performance Review",
      subtype: "Annual Review",
      subject: "Employee Feedback",
      companyname: "IBM",
      phone: "9988776655",
      city: "Chennai",
      jobid: "Review-1401",
      userId: "Arjun Reddy",
      startDate: "22-03-2025",
      endDate: "26-03-2025",
    },
    {
      id: 4,
      type: "Team Building",
      subtype: "Outdoor Activity",
      subject: "Adventure Camp",
      companyname: "HCL",
      phone: "9876123456",
      city: "Shimla",
      jobid: "Team-1501",
      userId: "Priya Singh",
      startDate: "25-04-2025",
      endDate: "27-08-2025",
    },
    {
      id: 5,
      type: "Trade Show",
      subtype: "Product Launch",
      subject: "Showcase New Features",
      companyname: "Apple",
      phone: "9123412345",
      city: "Cupertino",
      jobid: "Trade-1601",
      userId: "Steve Jobs",
      startDate: "28-03-2025",
      endDate: "05-04-2025",
    },

  ]
  )


  const [selectedOfferAcceptedData, setSelectedOfferAcceptedData] = useState([])

  const [offerAcceptedData, setOfferAcceptedData] = useState([{
    id: 1,
    type: "Client Meeting",
    subtype: "Contract Discussion",
    subject: "Finalize Agreement",
    companyname: "Accenture",
    phone: "9123456789",
    city: "Bangalore",
    jobid: "Client-1201",
    userId: "Nina Sharma",
    startDate: "2025-03-18",
    endDate: "2025-03-18",
  },
  {
    id: 2,
    type: "Onboarding",
    subtype: "New Employee",
    subject: "HR Orientation",
    companyname: "Infosys",
    phone: "9876543211",
    city: "Pune",
    jobid: "HR-1301",
    userId: "Raj Malhotra",
    startDate: "2025-03-20",
    endDate: "2025-03-20",
  },
  {
    id: 3,
    type: "Performance Review",
    subtype: "Annual Review",
    subject: "Employee Feedback",
    companyname: "IBM",
    phone: "9988776655",
    city: "Chennai",
    jobid: "Review-1401",
    userId: "Arjun Reddy",
    startDate: "2025-03-22",
    endDate: "2025-03-22",
  },
  {
    id: 4,
    type: "Team Building",
    subtype: "Outdoor Activity",
    subject: "Adventure Camp",
    companyname: "HCL",
    phone: "9876123456",
    city: "Shimla",
    jobid: "Team-1501",
    userId: "Priya Singh",
    startDate: "2025-03-25",
    endDate: "2025-03-27",
  },
  {
    id: 5,
    type: "Trade Show",
    subtype: "Product Launch",
    subject: "Showcase New Features",
    companyname: "Apple",
    phone: "9123412345",
    city: "Cupertino",
    jobid: "Trade-1601",
    userId: "Steve Jobs",
    startDate: "2025-03-28",
    endDate: "2025-03-29",
  },])


  const [selectedOfferRejectededData, setSelectedOfferRejectededData] = useState([])

  const [offerRejectededData, setOfferRejectededData] = useState([{
    id: 1,
    type: "Client Meeting",
    subtype: "Contract Discussion",
    subject: "Finalize Agreement",
    companyname: "Accenture",
    phone: "9123456789",
    city: "Bangalore",
    jobid: "Client-1201",
    userId: "Nina Sharma",
    startDate: "2025-03-18",
    endDate: "2025-03-18",
  },
  {
    id: 2,
    type: "Onboarding",
    subtype: "New Employee",
    subject: "HR Orientation",
    companyname: "Infosys",
    phone: "9876543211",
    city: "Pune",
    jobid: "HR-1301",
    userId: "Raj Malhotra",
    startDate: "2025-03-20",
    endDate: "2025-03-20",
  },
  {
    id: 3,
    type: "Performance Review",
    subtype: "Annual Review",
    subject: "Employee Feedback",
    companyname: "IBM",
    phone: "9988776655",
    city: "Chennai",
    jobid: "Review-1401",
    userId: "Arjun Reddy",
    startDate: "2025-03-22",
    endDate: "2025-03-22",
  },
  {
    id: 4,
    type: "Team Building",
    subtype: "Outdoor Activity",
    subject: "Adventure Camp",
    companyname: "HCL",
    phone: "9876123456",
    city: "Shimla",
    jobid: "Team-1501",
    userId: "Priya Singh",
    startDate: "2025-03-25",
    endDate: "2025-03-27",
  },
  {
    id: 5,
    type: "Trade Show",
    subtype: "Product Launch",
    subject: "Showcase New Features",
    companyname: "Apple",
    phone: "9123412345",
    city: "Cupertino",
    jobid: "Trade-1601",
    userId: "Steve Jobs",
    startDate: "2025-03-28",
    endDate: "2025-03-29",
  },])



  const [selectedPlacementClosed, setSelectedPlacementClosed] = useState([])

  const [placementClosedData, setPlacementClosedData] = useState([{
    id: 1,
    type: "Client Meeting",
    subtype: "Contract Discussion",
    subject: "Finalize Agreement",
    companyname: "Accenture",
    phone: "9123456789",
    city: "Bangalore",
    jobid: "Client-1201",
    userId: "Nina Sharma",
    startDate: "2025-03-18",
    endDate: "2025-03-18",
  },
  {
    id: 2,
    type: "Onboarding",
    subtype: "New Employee",
    subject: "HR Orientation",
    companyname: "Infosys",
    phone: "9876543211",
    city: "Pune",
    jobid: "HR-1301",
    userId: "Raj Malhotra",
    startDate: "2025-03-20",
    endDate: "2025-03-20",
  },
  {
    id: 3,
    type: "Performance Review",
    subtype: "Annual Review",
    subject: "Employee Feedback",
    companyname: "IBM",
    phone: "9988776655",
    city: "Chennai",
    jobid: "Review-1401",
    userId: "Arjun Reddy",
    startDate: "2025-03-22",
    endDate: "2025-03-22",
  },
  {
    id: 4,
    type: "Team Building",
    subtype: "Outdoor Activity",
    subject: "Adventure Camp",
    companyname: "HCL",
    phone: "9876123456",
    city: "Shimla",
    jobid: "Team-1501",
    userId: "Priya Singh",
    startDate: "2025-03-25",
    endDate: "2025-03-27",
  },
  {
    id: 5,
    type: "Trade Show",
    subtype: "Product Launch",
    subject: "Showcase New Features",
    companyname: "Apple",
    phone: "9123412345",
    city: "Cupertino",
    jobid: "Trade-1601",
    userId: "Steve Jobs",
    startDate: "2025-03-28",
    endDate: "2025-03-29",
  },])




  const [selectedTableData, setSelectedTableData] = useState([])
  const [selectedPotentialData, setSelectedPotentialData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageState, setPageState] = useState({ rows: 10, first: 0 })

  const onPage = event => {
    setPageState({ rows: event.rows, first: event.first })
  }

  const dt = useRef(null)

  const exportCSV = selectionOnly => {
    dt.current.exportCSV({ selectionOnly })
  }

  // delete section for potential data




  //   Delete the selected data start

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleDeleteSelected = () => {
    setShowConfirmDialog(true)
  }

  const confirmDelete = () => {

    setTableData(prevData =>
      prevData.filter(
        row => !selectedTableData.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectedTableData([])
    setShowConfirmDialog(false)
  }

  const cancelDelete = () => {
    setShowConfirmDialog(false) // Close the dialog without deleting
  }

  //   Delete the selected data start

  // potential delete start


  const confirmDelete1 = () => {
    setPotentialData(prevData =>
      prevData.filter(
        row => !selectedPotentialData.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectedPotentialData([])
    setShowConfirmDialog(false)
  }

  const cancelDelete1 = () => {
    setShowConfirmDialog(false)
  }


  // potential delete end

  // Submitted delete start

  const confirmDeleteSubmit = () => {
    setSubmittedData(prevData =>
      prevData.filter(
        row => !selectSubmittedData.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectSubmittedData([])
    setShowConfirmDialog(false)
  }

  const cancelDeleteSubmit = () => {
    setShowConfirmDialog(false)
  }


  // Submitted delete end

  // Interview delete start

  const confirmDeleteInterview = () => {
    setInterviewData(prevData =>
      prevData.filter(
        row => !selectedInterviewData.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectedInterviewData([])
    setShowConfirmDialog(false)
  }

  const cancelDeleteInterview = () => {
    setShowConfirmDialog(false)
  }


  // Interview delete end

  // Offer Accepted delete start

  const confirmDeleteOfferAccepted = () => {
    setOfferAcceptedData(prevData =>
      prevData.filter(
        row => !selectedOfferAcceptedData.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectedOfferAcceptedData([])
    setShowConfirmDialog(false)
  }

  const cancelDeleteOfferAccepted = () => {
    setShowConfirmDialog(false)
  }


  // Offer Accepted delete end



  // Offer Rejected Data delete start

  const confirmDeleteOfferRejected = () => {
    setOfferRejectededData(prevData =>
      prevData.filter(
        row => !selectedOfferRejectededData.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectedOfferRejectededData([])
    setShowConfirmDialog(false)
  }

  const cancelDeleteOfferRejected = () => {
    setShowConfirmDialog(false)
  }


  // Offer Rejected Data delete end



  // Offer Rejected Data delete start

  const confirmDeletePlacementClosed = () => {
    setPlacementClosedData(prevData =>
      prevData.filter(
        row => !selectedPlacementClosed.some(selectedRow => selectedRow.id === row.id)
      )
    )
    setSelectedPlacementClosed([])
    setShowConfirmDialog(false)
  }

  const cancelDeletePlacementClosed = () => {
    setShowConfirmDialog(false)
  }


  // Offer Rejected Data delete end


  //   Received end

  //   acton items start

  // email
  const [selectedEmailOption, setSelectedEmailOption] = useState(null)
  const emailOptionsdrop = [
    { label: "New Email", icon: "pi pi-envelope" },
    { label: "Selected", icon: "pi pi-check-circle" },
    { label: "Searched", icon: "pi pi-search" },
    { label: "All", icon: "pi pi-inbox" },
    { label: "Jobs", icon: "pi pi-briefcase" },
  ]

  const handleEmailChange = value => {
    setSelectedEmailOption(value)
  }

  //   sms

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

  //   change status

  const [selectedSmsOption1, setSelectedSmsOption1] = useState(null)
  const smsOptions1 = [
    { label: "Received", icon: "pi pi-inbox" },
    { label: "Screening", icon: "pi pi-search" },
    { label: "Shortlist", icon: "pi pi-list" },
    { label: "Potential", icon: "pi pi-star" },
    { label: "Interview", icon: "pi pi-users" },
    { label: "System Test", icon: "pi pi-desktop" },
    { label: "Selected", icon: "pi pi-check" },
    { label: "Rejected", icon: "pi pi-times" },
    { label: "HR Discussion", icon: "pi pi-comments" },
    { label: "Offer Accepted", icon: "pi pi-thumbs-up" },
    { label: "Offer Rejected", icon: "pi pi-thumbs-down" },
    { label: "Onboarding", icon: "pi pi-user-plus" },
  ]

  const selectedSmsTemplate1 = (option, props) => {
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

  const smsOptionTemplate1 = option => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`}></i>
        <div>{option.label}</div>
      </div>
    )
  }

  //   sidebar start

  const [visibleViewRight, setVisibleViewRight] = useState(false)
  const [fullName, setFullName] = useState("")
  const [city, setCity] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [userIds, setUserIds] = useState("")
  const [availabilityDate1, setavailabilityDate1] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [workEmail, setWorkEmail] = useState("")
  const [documents, setDocuments] = useState([])
  const [description, setDescription] = useState("")
  const [primarySkills, setPrimarySkills] = useState(null)
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [candidateNotes, setCandidateNotes] = useState([]);


  //   clear search fields start

  const handleClearSearch = () => {
    // Reset the filters to an object with initialized values for each column
    setFilters({
      type: { value: "", matchMode: "contains" },
      subtype: { value: "", matchMode: "contains" },
      subject: { value: "", matchMode: "contains" },
      companyname: { value: "", matchMode: "contains" },
      phone: { value: "", matchMode: "contains" },
      city: { value: "", matchMode: "contains" },
      jobid: { value: "", matchMode: "contains" },
      userId: { value: "", matchMode: "contains" },
      startDate: { value: "", matchMode: "contains" },
      endDate: { value: "", matchMode: "contains" },
    });

    // Reset the pagination
    // setPageState((prevState) => ({
    //     ...prevState,
    //     first: 0, 
    // }));
  };

  const handleFilterChange = (e) => {
    setFilters(e.filters); // Update filters with the new input values
  };

  //   clear search fields start


  return (
    <React.Fragment>
      <div className="page-content allact-tabs pipe-table">
        <Container fluid={true}>
          <div className="page-title-box mb-0 recruiter-dashboard actjobsum">
            <Row>
              <Col lg={12}>
                {/* <TabView className="mt-4"> */}
                {/* <TabPanel> */}
                <Row className="view-form-sidebar table-sec">
                  <Col lg={12}>
                    <div className="pipelinetabs">
                      <TabView>
                        <TabPanel
                          header="Received"
                          rightIcon={
                            <Badge
                              value={tableData.length}
                              severity="success"
                              className="ml-2 mt-0 pt-0"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <div className="">
                            <Row className="align-items-center pt-1 pb-1 breadcrumb-card action-items">
                              <Col
                                md={12}
                                lg={12}
                                className="d-flex align-items-center"
                              >
                                {selectedTableData.length > 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                                    >
                                      <i className="fa-regular fa-user me-1"></i>{" "}
                                      {selectedTableData.length} selected
                                    </button>
                                    <div className="action-icons me-2">
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          setVisibleViewRight(true)
                                        }

                                      >
                                        <i className="pi pi-eye"></i>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      >
                                        <i className="pi pi-pencil"></i>
                                      </button>

                                      {/* <button
                                        type="button"
                                        className="btn btn-secondary import-res-btn waves-effect ms-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      > */}

                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={handleDeleteSelected}
                                      >
                                        <i className="pi pi-trash"></i>
                                      </button>
                                    </div>
                                  </>
                                )}

                                <div>
                                  <Dropdown
                                    value={selectedEmailOption}
                                    onChange={e => {
                                      handleEmailChange(e.target.value)
                                    }}
                                    options={emailOptionsdrop}
                                    optionLabel="label"
                                    placeholder="Email"
                                    valueTemplate={selectedEmailTemplate}
                                    itemTemplate={emailOptionTemplate}
                                    className="action-items me-1 ms-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e =>
                                      setSelectedSmsOption(e.value)
                                    }
                                    options={smsOptions}
                                    optionLabel="label"
                                    placeholder="SMS"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e =>
                                      setSelectedSmsOption1(e.value)
                                    }
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />

                                  {/* <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e => setSelectedSmsOption1(e.value)}
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={<i className="pi pi-exchange" />}
                                    /> */}

                                </div>

                                <div className="clear-btn">
                                  <button
                                    type="button"
                                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                                    data-bs-container="body"
                                    data-bs-toggle="popover"
                                    data-bs-placement="top"
                                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                    onClick={handleClearSearch}
                                  >
                                    <i className="fa-solid fa-xmark"></i> Clear
                                    Search
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} className="p-0">
                                <section className="job-datatable-section">
                                  <div className="card1 mt-3 mb-5 actjobsumtable datatable-check">
                                    <DataTable
                                      value={tableData}
                                      tableStyle={{
                                        minWidth: "50rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      // rows={pageState.rows}
                                      // first={pageState.first}
                                      // paginator
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      onPage={onPage}
                                      dataKey="id"
                                      loading={loading}
                                      scrollable
                                      emptyMessage="No records found."
                                      selection={selectedTableData}
                                      onSelectionChange={e =>
                                        setSelectedTableData(e.value)
                                      }
                                      // selectionMode="multiple"
                                      filters={filters}
                                      onFilter={handleFilterChange}
                                      filterDisplay="row"
                                      reorderableRows
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
                                        field="subtype"
                                        header="Full Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subject"
                                        header="Job Title"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="companyname"
                                        header="Company Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="phone"
                                        header="Phone"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="city"
                                        header="City"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="jobid"
                                        header="Job ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="userId"
                                        header="User ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />

                                      <Column
                                        field="startDate"
                                        header="Start Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="endDate"
                                        header="End Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
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
                                        <strong>
                                          {selectedTableData[0]?.type}
                                        </strong>
                                        ?
                                      </p>
                                    </Dialog>

                                    {/* Interview schedule end */}
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          </div>
                        </TabPanel>
                        <TabPanel
                          header="Potential"
                          rightIcon={
                            <Badge
                              value={potentialData.length}
                              severity="success"
                              className="ml-2 mt-0"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <div className="">
                            <Row className="align-items-center pt-3 pb-3 breadcrumb-card action-items">
                              <Col
                                md={12}
                                lg={12}
                                className="d-flex align-items-center"
                              >
                                {selectedPotentialData.length > 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                                    >
                                      <i className="fa-regular fa-user me-1"></i>{" "}
                                      {selectedPotentialData.length} selected
                                    </button>
                                    <div className="action-icons me-2">
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                      //  onClick={() => SetInterviewpop1(true)}
                                      >
                                        <i className="pi pi-eye"></i>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      >
                                        <i className="pi pi-pencil"></i>
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={handleDeleteSelected}
                                      >
                                        <i className="pi pi-trash"></i>
                                      </button>
                                    </div>
                                  </>
                                )}

                                <div>
                                  <Dropdown
                                    value={selectedEmailOption}
                                    onChange={e => {
                                      handleEmailChange(e.target.value)
                                    }}
                                    options={emailOptionsdrop}
                                    optionLabel="label"
                                    placeholder="Email"
                                    valueTemplate={selectedEmailTemplate}
                                    itemTemplate={emailOptionTemplate}
                                    className="action-items me-1 ms-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e =>
                                      setSelectedSmsOption(e.value)
                                    }
                                    options={smsOptions}
                                    optionLabel="label"
                                    placeholder="SMS"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e =>
                                      setSelectedSmsOption1(e.value)
                                    }
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                                    data-bs-container="body"
                                    data-bs-toggle="popover"
                                    data-bs-placement="top"
                                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                    onClick={handleClearSearch}
                                  >
                                    <i className="fa-solid fa-xmark"></i> Clear
                                    Search
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} className="p-0">
                                <section className="job-datatable-section">
                                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                                    <DataTable
                                      value={potentialData}
                                      tableStyle={{
                                        minWidth: "50rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      // rows={pageState.rows}
                                      // first={pageState.first}
                                      // paginator
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      onPage={onPage}
                                      dataKey="id"
                                      loading={loading}
                                      scrollable
                                      emptyMessage="No records found."
                                      selection={selectedPotentialData}
                                      onSelectionChange={e =>
                                        setSelectedPotentialData(e.value)
                                      }
                                      // selectionMode="multiple"
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
                                      <Column
                                        field="type"
                                        header="Type"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subtype"
                                        header="Full Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subject"
                                        header="Job Title"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="companyname"
                                        header="Company Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="phone"
                                        header="Phone"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="city"
                                        header="City"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="jobid"
                                        header="Job ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="userId"
                                        header="User ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />

                                      <Column
                                        field="startDate"
                                        header="Start Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="endDate"
                                        header="End Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
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
                                            onClick={cancelDelete1}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={confirmDelete1}
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
                                        <strong>
                                          {selectedPotentialData[0]?.type}
                                        </strong>
                                        ?
                                      </p>
                                    </Dialog>

                                    {/* Interview schedule end */}
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          </div>
                        </TabPanel>

                        <TabPanel
                          header="Submitted"
                          rightIcon={
                            <Badge
                              value={submittedData.length}
                              severity="success"
                              className="ml-2 mt-0"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <div className="">
                            <Row className="align-items-center pt-3 pb-3 breadcrumb-card action-items">
                              <Col
                                md={12}
                                lg={12}
                                className="d-flex align-items-center"
                              >
                                {selectSubmittedData.length > 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                                    >
                                      <i className="fa-regular fa-user me-1"></i>{" "}
                                      {selectSubmittedData.length} selected
                                    </button>
                                    <div className="action-icons me-2">
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                      //  onClick={() => SetInterviewpop1(true)}
                                      >
                                        <i className="pi pi-eye"></i>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      >
                                        <i className="pi pi-pencil"></i>
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={handleDeleteSelected}
                                      >
                                        <i className="pi pi-trash"></i>
                                      </button>
                                    </div>
                                  </>
                                )}

                                <div>
                                  <Dropdown
                                    value={selectedEmailOption}
                                    onChange={e => {
                                      handleEmailChange(e.target.value)
                                    }}
                                    options={emailOptionsdrop}
                                    optionLabel="label"
                                    placeholder="Email"
                                    valueTemplate={selectedEmailTemplate}
                                    itemTemplate={emailOptionTemplate}
                                    className="action-items me-1 ms-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e =>
                                      setSelectedSmsOption(e.value)
                                    }
                                    options={smsOptions}
                                    optionLabel="label"
                                    placeholder="SMS"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e =>
                                      setSelectedSmsOption1(e.value)
                                    }
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                                    data-bs-container="body"
                                    data-bs-toggle="popover"
                                    data-bs-placement="top"
                                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                    onClick={handleClearSearch}
                                  >
                                    <i className="fa-solid fa-xmark"></i> Clear
                                    Search
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} className="p-0">
                                <section className="job-datatable-section">
                                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                                    <DataTable
                                      value={submittedData}
                                      tableStyle={{
                                        minWidth: "50rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      // rows={pageState.rows}
                                      // first={pageState.first}
                                      // paginator
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      onPage={onPage}
                                      dataKey="id"
                                      loading={loading}
                                      scrollable
                                      emptyMessage="No records found."
                                      selection={selectSubmittedData}
                                      onSelectionChange={e =>
                                        setSelectSubmittedData(e.value)
                                      }
                                      // selectionMode="multiple"
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
                                      <Column
                                        field="type"
                                        header="Type"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subtype"
                                        header="Full Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subject"
                                        header="Job Title"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="companyname"
                                        header="Company Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="phone"
                                        header="Phone"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="city"
                                        header="City"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="jobid"
                                        header="Job ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="userId"
                                        header="User ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />

                                      <Column
                                        field="startDate"
                                        header="Start Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="endDate"
                                        header="End Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
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
                                            onClick={cancelDeleteSubmit}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={confirmDeleteSubmit}
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
                                        <strong>
                                          {selectSubmittedData[0]?.type}
                                        </strong>
                                        ?
                                      </p>
                                    </Dialog>

                                    {/* Interview schedule end */}
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          </div>
                        </TabPanel>
                        <TabPanel
                          header="Interviews"
                          rightIcon={
                            <Badge
                              value={interviewData.length}
                              severity="success"
                              className="ml-2 mt-0"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <div className="">
                            <Row className="align-items-center pt-3 pb-3 breadcrumb-card action-items">
                              <Col
                                md={12}
                                lg={12}
                                className="d-flex align-items-center"
                              >
                                {selectedInterviewData.length > 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                                    >
                                      <i className="fa-regular fa-user me-1"></i>{" "}
                                      {selectedInterviewData.length} selected
                                    </button>
                                    <div className="action-icons me-2">
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                      //  onClick={() => SetInterviewpop1(true)}
                                      >
                                        <i className="pi pi-eye"></i>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      >
                                        <i className="pi pi-pencil"></i>
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={handleDeleteSelected}
                                      >
                                        <i className="pi pi-trash"></i>
                                      </button>
                                    </div>
                                  </>
                                )}

                                <div>
                                  <Dropdown
                                    value={selectedEmailOption}
                                    onChange={e => {
                                      handleEmailChange(e.target.value)
                                    }}
                                    options={emailOptionsdrop}
                                    optionLabel="label"
                                    placeholder="Email"
                                    valueTemplate={selectedEmailTemplate}
                                    itemTemplate={emailOptionTemplate}
                                    className="action-items me-1 ms-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e =>
                                      setSelectedSmsOption(e.value)
                                    }
                                    options={smsOptions}
                                    optionLabel="label"
                                    placeholder="SMS"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e =>
                                      setSelectedSmsOption1(e.value)
                                    }
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                                    data-bs-container="body"
                                    data-bs-toggle="popover"
                                    data-bs-placement="top"
                                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                    onClick={handleClearSearch}
                                  >
                                    <i className="fa-solid fa-xmark"></i> Clear
                                    Search
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} className="p-0">
                                <section className="job-datatable-section">
                                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                                    <DataTable
                                      value={interviewData}
                                      tableStyle={{
                                        minWidth: "50rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      // rows={pageState.rows}
                                      // first={pageState.first}
                                      // paginator
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      onPage={onPage}
                                      dataKey="id"
                                      loading={loading}
                                      scrollable
                                      emptyMessage="No records found."
                                      selection={selectedInterviewData}
                                      onSelectionChange={e =>
                                        setSelectedInterviewData(e.value)
                                      }
                                      // selectionMode="multiple"
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
                                      <Column
                                        field="type"
                                        header="Type"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subtype"
                                        header="Full Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subject"
                                        header="Job Title"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="companyname"
                                        header="Company Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="phone"
                                        header="Phone"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="city"
                                        header="City"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="jobid"
                                        header="Job ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="userId"
                                        header="User ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />

                                      <Column
                                        field="startDate"
                                        header="Start Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="endDate"
                                        header="End Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
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
                                            onClick={cancelDeleteInterview}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={confirmDeleteInterview}
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
                                        <strong>
                                          {selectedInterviewData[0]?.type}
                                        </strong>
                                        ?
                                      </p>
                                    </Dialog>

                                    {/* Interview schedule end */}
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          </div>
                        </TabPanel>
                        <TabPanel
                          header="Offered Accepted"
                          rightIcon={
                            <Badge
                              value={offerAcceptedData.length}
                              severity="success"
                              className="ml-2 mt-0"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <div className="">
                            <Row className="align-items-center pt-3 pb-3 breadcrumb-card action-items">
                              <Col
                                md={12}
                                lg={12}
                                className="d-flex align-items-center"
                              >
                                {selectedOfferAcceptedData.length > 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                                    >
                                      <i className="fa-regular fa-user me-1"></i>{" "}
                                      {selectedOfferAcceptedData.length} selected
                                    </button>
                                    <div className="action-icons me-2">
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                      //  onClick={() => SetInterviewpop1(true)}
                                      >
                                        <i className="pi pi-eye"></i>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      >
                                        <i className="pi pi-pencil"></i>
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={handleDeleteSelected}
                                      >
                                        <i className="pi pi-trash"></i>
                                      </button>
                                    </div>
                                  </>
                                )}

                                <div>
                                  <Dropdown
                                    value={selectedEmailOption}
                                    onChange={e => {
                                      handleEmailChange(e.target.value)
                                    }}
                                    options={emailOptionsdrop}
                                    optionLabel="label"
                                    placeholder="Email"
                                    valueTemplate={selectedEmailTemplate}
                                    itemTemplate={emailOptionTemplate}
                                    className="action-items me-1 ms-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e =>
                                      setSelectedSmsOption(e.value)
                                    }
                                    options={smsOptions}
                                    optionLabel="label"
                                    placeholder="SMS"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e =>
                                      setSelectedSmsOption1(e.value)
                                    }
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                                    data-bs-container="body"
                                    data-bs-toggle="popover"
                                    data-bs-placement="top"
                                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                    onClick={handleClearSearch}
                                  >
                                    <i className="fa-solid fa-xmark"></i> Clear
                                    Search
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} className="p-0">
                                <section className="job-datatable-section">
                                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                                    <DataTable
                                      value={offerAcceptedData}
                                      tableStyle={{
                                        minWidth: "50rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      rows={pageState.rows}
                                      first={pageState.first}
                                      // paginator
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      // onPage={onPage}
                                      dataKey="id"
                                      loading={loading}
                                      scrollable
                                      emptyMessage="No records found."
                                      selection={selectedOfferAcceptedData}
                                      onSelectionChange={e =>
                                        setSelectedOfferAcceptedData(e.value)
                                      }
                                      // selectionMode="multiple"
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
                                      <Column
                                        field="type"
                                        header="Type"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subtype"
                                        header="Full Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subject"
                                        header="Job Title"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="companyname"
                                        header="Company Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="phone"
                                        header="Phone"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="city"
                                        header="City"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="jobid"
                                        header="Job ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="userId"
                                        header="User ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />

                                      <Column
                                        field="startDate"
                                        header="Start Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="endDate"
                                        header="End Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
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
                                            onClick={cancelDeleteOfferAccepted}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={confirmDeleteOfferAccepted}
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
                                        <strong>
                                          {selectedOfferAcceptedData[0]?.type}
                                        </strong>
                                        ?
                                      </p>
                                    </Dialog>

                                    {/* Interview schedule end */}
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          </div>
                        </TabPanel>
                        <TabPanel
                          header="Offer Rejected"
                          rightIcon={
                            <Badge
                              value={offerRejectededData.length}
                              severity="success"
                              className="ml-2 mt-0"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <div className="">
                            <Row className="align-items-center pt-3 pb-3 breadcrumb-card action-items">
                              <Col
                                md={12}
                                lg={12}
                                className="d-flex align-items-center"
                              >
                                {selectedOfferRejectededData.length > 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                                    >
                                      <i className="fa-regular fa-user me-1"></i>{" "}
                                      {selectedOfferRejectededData.length} selected
                                    </button>
                                    <div className="action-icons me-2">
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                      //  onClick={() => SetInterviewpop1(true)}
                                      >
                                        <i className="pi pi-eye"></i>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      >
                                        <i className="pi pi-pencil"></i>
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={handleDeleteSelected}
                                      >
                                        <i className="pi pi-trash"></i>
                                      </button>
                                    </div>
                                  </>
                                )}

                                <div>
                                  <Dropdown
                                    value={selectedEmailOption}
                                    onChange={e => {
                                      handleEmailChange(e.target.value)
                                    }}
                                    options={emailOptionsdrop}
                                    optionLabel="label"
                                    placeholder="Email"
                                    valueTemplate={selectedEmailTemplate}
                                    itemTemplate={emailOptionTemplate}
                                    className="action-items me-1 ms-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e =>
                                      setSelectedSmsOption(e.value)
                                    }
                                    options={smsOptions}
                                    optionLabel="label"
                                    placeholder="SMS"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e =>
                                      setSelectedSmsOption1(e.value)
                                    }
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                                    data-bs-container="body"
                                    data-bs-toggle="popover"
                                    data-bs-placement="top"
                                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                    onClick={handleClearSearch}
                                  >
                                    <i className="fa-solid fa-xmark"></i> Clear
                                    Search
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} className="p-0">
                                <section className="job-datatable-section">
                                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                                    <DataTable
                                      value={offerRejectededData}
                                      tableStyle={{
                                        minWidth: "50rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      // rows={pageState.rows}
                                      // first={pageState.first}
                                      // paginator
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      onPage={onPage}
                                      dataKey="id"
                                      loading={loading}
                                      scrollable
                                      emptyMessage="No records found."
                                      selection={selectedOfferRejectededData}
                                      onSelectionChange={e =>
                                        setSelectedOfferRejectededData(e.value)
                                      }
                                      // selectionMode="multiple"
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
                                      <Column
                                        field="type"
                                        header="Type"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subtype"
                                        header="Full Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subject"
                                        header="Job Title"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="companyname"
                                        header="Company Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="phone"
                                        header="Phone"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="city"
                                        header="City"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="jobid"
                                        header="Job ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="userId"
                                        header="User ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />

                                      <Column
                                        field="startDate"
                                        header="Start Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="endDate"
                                        header="End Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
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
                                            onClick={cancelDeleteOfferRejected}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={confirmDeleteOfferRejected}
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
                                        <strong>
                                          {selectedOfferRejectededData[0]?.type}
                                        </strong>
                                        ?
                                      </p>
                                    </Dialog>

                                    {/* Interview schedule end */}
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          </div>
                        </TabPanel>
                        <TabPanel
                          header="Placement Closed"
                          rightIcon={
                            <Badge
                              value={placementClosedData.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <div className="">
                            <Row className="align-items-center pt-3 pb-3 breadcrumb-card action-items">
                              <Col
                                md={12}
                                lg={12}
                                className="d-flex align-items-center"
                              >
                                {selectedPlacementClosed.length > 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                                    >
                                      <i className="fa-regular fa-user me-1"></i>{" "}
                                      {selectedPlacementClosed.length} selected
                                    </button>
                                    <div className="action-icons me-2">
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                      //  onClick={() => SetInterviewpop1(true)}
                                      >
                                        <i className="pi pi-eye"></i>
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={() =>
                                          navigate("/candidate-editform/1")
                                        }
                                      >
                                        <i className="pi pi-pencil"></i>
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-secondary import-res-btn waves-effect ms-1"
                                        className="mainbtn mb-1"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                        onClick={handleDeleteSelected}
                                      >
                                        <i className="pi pi-trash"></i>
                                      </button>
                                    </div>
                                  </>
                                )}

                                <div>
                                  <Dropdown
                                    value={selectedEmailOption}
                                    onChange={e => {
                                      handleEmailChange(e.target.value)
                                    }}
                                    options={emailOptionsdrop}
                                    optionLabel="label"
                                    placeholder="Email"
                                    valueTemplate={selectedEmailTemplate}
                                    itemTemplate={emailOptionTemplate}
                                    className="action-items me-1 ms-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption}
                                    onChange={e =>
                                      setSelectedSmsOption(e.value)
                                    }
                                    options={smsOptions}
                                    optionLabel="label"
                                    placeholder="SMS"
                                    valueTemplate={selectedSmsTemplate}
                                    itemTemplate={smsOptionTemplate}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <Dropdown
                                    value={selectedSmsOption1}
                                    onChange={e =>
                                      setSelectedSmsOption1(e.value)
                                    }
                                    options={smsOptions1}
                                    optionLabel="label"
                                    placeholder="Change Status"
                                    valueTemplate={selectedSmsTemplate1}
                                    itemTemplate={smsOptionTemplate1}
                                    className="action-items me-1"
                                    dropdownIcon={opts => {
                                      return opts.iconProps[
                                        "data-pr-overlay-visible"
                                      ] ? (
                                        <ChevronRightIcon {...opts.iconProps} />
                                      ) : (
                                        <ChevronDownIcon {...opts.iconProps} />
                                      )
                                    }}
                                  />
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                                    data-bs-container="body"
                                    data-bs-toggle="popover"
                                    data-bs-placement="top"
                                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                    onClick={handleClearSearch}
                                  >
                                    <i className="fa-solid fa-xmark"></i> Clear
                                    Search
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} className="p-0">
                                <section className="job-datatable-section">
                                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                                    <DataTable
                                      value={placementClosedData}
                                      tableStyle={{
                                        minWidth: "50rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      // rows={pageState.rows}
                                      // first={pageState.first}
                                      // paginator
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      onPage={onPage}
                                      dataKey="id"
                                      loading={loading}
                                      scrollable
                                      emptyMessage="No records found."
                                      selection={selectedPlacementClosed}
                                      onSelectionChange={e =>
                                        setSelectedPlacementClosed(e.value)
                                      }
                                      // selectionMode="multiple"
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
                                      <Column
                                        field="type"
                                        header="Type"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subtype"
                                        header="Full Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />
                                      <Column
                                        field="subject"
                                        header="Job Title"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="companyname"
                                        header="Company Name"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="phone"
                                        header="Phone"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="city"
                                        header="City"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="jobid"
                                        header="Job ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />

                                      <Column
                                        field="userId"
                                        header="User ID"
                                        sortable
                                        filter
                                        style={{ minWidth: "10rem" }}
                                      />

                                      <Column
                                        field="startDate"
                                        header="Start Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
                                      />
                                      <Column
                                        field="endDate"
                                        header="End Date"
                                        sortable
                                        filter
                                        style={{ minWidth: "12rem" }}
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
                                            onClick={cancelDeletePlacementClosed}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={confirmDeletePlacementClosed}
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
                                        <strong>
                                          {selectedPlacementClosed[0]?.type}
                                        </strong>
                                        ?
                                      </p>
                                    </Dialog>

                                    {/* Interview schedule end */}
                                  </div>
                                </section>
                              </Col>
                            </Row>
                          </div>
                        </TabPanel>
                      </TabView>
                    </div>
                  </Col>
                </Row>
                {/* </TabPanel> */}
                {/* </TabView> */}
              </Col>
            </Row>

            {/* //////////////////////////////////////////??    view employee start */}
            <Row>
              <Col lg={12}>
                <Sidebar
                  visible={visibleViewRight}
                  position="right"
                  onHide={() => setVisibleViewRight(false)}
                  className="view-form-sidebar"
                >
                  {/* <div className="sidebar-header">
                                                <h3 className="head"><i className="pi pi-users"></i> Candidate - Anup</h3>
                                                <div className="d-flex align-items-center">
                                                    <Button
                                                        icon="pi pi-times"
                                                        className="p-button-text close-btn"
                                                        onClick={() => setVisibleRight(false)}
                                                    />
                                                </div>
                                            </div> */}
                  <div className="sidebar-header">
                    <h3 className="head">
                      <i className="pi pi-users"></i> Candidate - Anup Gagoi
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
                          {/* <h5 className="sub-head">Anup Gagoi</h5> */}
                        </Col>
                        <Col lg={12}>
                          <Accordion activeIndex={0}>
                            <AccordionTab
                              header={
                                <span className="flex align-items-center gap-2 w-full">
                                  {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
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
                                      onChange={e =>
                                        setFullName(e.target.value)
                                      }
                                      placeholder=""
                                      className="block w-full"
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="work-email"
                                      className="block"
                                    >
                                      Email
                                    </label>
                                    <InputText
                                      id="work-email"
                                      value={workEmail}
                                      readOnly
                                      onChange={e =>
                                        setWorkEmail(e.target.value)
                                      }
                                      type="email"
                                      placeholder=""
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="phoneNumber"
                                      className="block"
                                    >
                                      Phone Number
                                    </label>
                                    <InputText
                                      id="phoneNumber"
                                      value={phoneNumber}
                                      readOnly
                                      onChange={e =>
                                        setPhoneNumber(e.target.value)
                                      }
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
                                      Job Title
                                    </label>
                                    <InputText
                                      id="jobTitle"
                                      value={jobTitle}
                                      readOnly
                                      onChange={e =>
                                        setJobTitle(e.target.value)
                                      }
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
                                    <label className="block">
                                      Primary Skills
                                    </label>
                                    <select
                                      className="form-select mb-1"
                                      value={primarySkills}
                                      readOnly
                                      onChange={e =>
                                        setPrimarySkills(e.target.value)
                                      }
                                    >
                                      <option value="">
                                        Select Primary Skills
                                      </option>

                                    </select>
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                {/* <Col lg={4}>
                                                                        <label htmlFor="postalCode">Postal Code</label>
                                                                        <InputText
                                                                            id="postalCode"
                                                                            value={postalCode}
                                                                            onChange={(e) => setPostalCode(e.target.value)}
                                                                            placeholder=""
                                                                            className="w-full activejobdrop"
                                                                        />
                                                                    </Col> */}

                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="city">City</label>
                                    <InputText
                                      id="city"
                                      value={city}
                                      disabled
                                      onChange={e => setCity(e.target.value)}
                                      placeholder=""
                                      className="block w-full"
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
                                    <label
                                      htmlFor="relocation"
                                      className="block"
                                    >
                                      Relocation
                                    </label>

                                    <input
                                      type="checkbox"
                                      disabled

                                      className="me-2"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2">
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="jobType">Categories</label>
                                    <TreeSelect
                                      disabled

                                      filter
                                      className=" w-full"
                                      placeholder="Select Item"
                                    ></TreeSelect>
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="jobType">Groups</label>
                                    <TreeSelect
                                      disabled

                                      filter
                                      className=" w-full"
                                      placeholder="Select Item"
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
                                      placeholder=""
                                      className="block w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-2"></Row>

                              <Row>
                                <Col lg={12}>
                                  <div className="p-field">
                                    <label htmlFor="jobType" className="block">
                                      Notes
                                    </label>
                                    <InputTextarea
                                      autoResize
                                      value={description}
                                      readOnly
                                      onChange={e =>
                                        setDescription(e.target.value)
                                      }
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
                                        field="certificate_name"
                                        header="Document Type"
                                      ></Column>
                                      <Column
                                        field="docSubject"
                                        header="Document Subject"
                                      ></Column>
                                      <Column
                                        field="created_at"
                                        header="Applied Date & Time"
                                      ></Column>
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
                    <TabPanel header="Resume" leftIcon="pi pi-file mr-2">
                      <Row>
                        <Col lg={12}>
                          <div>
                            <Accordion activeIndex={[0, 1]} multiple>
                              <AccordionTab header="Resume">
                                <Row className="resumehead">
                                  <Col lg={12}>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex justify-content-between">
                                        <h6 className="me-2">
                                          Date:{" "}
                                          <span className="date">
                                            16/01/2025
                                          </span>
                                        </h6>
                                        <h6>
                                          UserIDs:{" "}
                                          <span className="date">
                                            SrinivasRao
                                          </span>
                                        </h6>
                                      </div>

                                      <Button
                                        type="submit"
                                        color="primary"
                                        className="btn btn-primary me-2 sidebarbtn"
                                      // onClick={downloadResume}
                                      >
                                        <i class="pi pi-download me-2"></i>
                                        Download Resume
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>

                                <Row
                                  className="resumedetails mt-3"
                                  id="resume-content"
                                >
                                  <Col lg={12}>
                                    <div class="contact">
                                      <h1 className="name">Kiran Chandran</h1>
                                      <p className="role mb-1">
                                        Front end developer
                                      </p>
                                      <div className="d-flex">
                                        <p className="me-3 contact">
                                          <i className="pi pi-phone"></i>{" "}
                                          +91-8309860962
                                        </p>
                                        <p className="me-3 contact">
                                          <i className="pi pi-envelope"></i>{" "}
                                          kiranroyal2000@gmail.com
                                        </p>
                                        <p className="me-3">
                                          <a href="#">
                                            <i className="pi pi-linkedin"></i>{" "}
                                            LinkedIn Profile
                                          </a>
                                        </p>
                                        <p className="me-3">
                                          {" "}
                                          <a href="#">GitHub Profile</a>
                                        </p>
                                      </div>
                                    </div>

                                    <div class="section">
                                      <h2>
                                        <strong>Career Objective</strong>
                                      </h2>
                                      <p>
                                        Dynamic and detail-oriented Front-End
                                        Developer with over 3.1+ years of
                                        experience in building and optimizing
                                        user-focused web applications using
                                        React.js. I am proficient in JavaScript
                                        and skilled in leveraging modern web
                                        development tools and frameworks
                                        including Redux and React Router.
                                        Hands-on experience with RESTful APIs,
                                        microservices architecture, and cloud
                                        services like AWS.
                                      </p>
                                    </div>

                                    <div class="section">
                                      <h2>Skills</h2>
                                      <ul class="skills-list">
                                        <li>
                                          <strong>
                                            Programming Languages:
                                          </strong>{" "}
                                          JavaScript, Java
                                        </li>
                                        <li>
                                          <strong>Web Technologies:</strong>{" "}
                                          HTML, CSS, React.js, Redux, React
                                          Router
                                        </li>
                                        <li>
                                          <strong>Database:</strong> MongoDB
                                        </li>
                                        <li>
                                          <strong>Testing Tools:</strong> Jest,
                                          React Testing Library
                                        </li>
                                        <li>
                                          <strong>API Integration:</strong>{" "}
                                          RESTful Services, Postman
                                        </li>
                                        <li>
                                          <strong>
                                            Project Management & Collaboration:
                                          </strong>{" "}
                                          Jira, Rally
                                        </li>
                                        <li>
                                          <strong>Version Control:</strong> Git
                                        </li>
                                        <li>
                                          <strong>CI/CD Tools:</strong> Jenkins
                                        </li>
                                        <li>
                                          <strong>Cloud Services:</strong>{" "}
                                          Amazon Web Services (AWS)
                                        </li>
                                        <li>
                                          <strong>Architecture:</strong>{" "}
                                          Micro-Services
                                        </li>
                                        <li>
                                          <strong>Content Management:</strong>{" "}
                                          Adobe Experience Manager (AEM)
                                        </li>
                                        <li>
                                          <strong>
                                            Computer Science Fundamentals:
                                          </strong>{" "}
                                          Data Structures
                                        </li>
                                      </ul>
                                    </div>

                                    <div class="section mt-3">
                                      <h2>Work Experience</h2>
                                      <h3>LTIMindtree - Front-End Developer</h3>
                                      <p>(Dec 2021 – Present)</p>
                                      <p>
                                        <strong>Project:</strong> Adidas -
                                        Retail Service Platform (RSP)
                                      </p>
                                      <p>
                                        <strong>Description:</strong> Developed
                                        and optimized user interfaces for an
                                        online retail web application, enhancing
                                        overall user experience and operational
                                        efficiency.
                                      </p>
                                      <h4>Responsibilities:</h4>
                                      <ul class="responsibilities">
                                        <li>
                                          Developed dynamic and responsive
                                          front-end components using React.js
                                          and JavaScript, significantly
                                          improving user engagement.
                                        </li>
                                        <li>
                                          Collaborated with back-end developers
                                          to integrate RESTful APIs, ensuring
                                          seamless data flow between the
                                          front-end and the microservices
                                          architecture.
                                        </li>
                                        <li>
                                          Utilized Redux for state management
                                          and React Router for efficient
                                          client-side routing.
                                        </li>
                                        <li>
                                          Contributed to sprint planning and
                                          retrospectives within an Agile
                                          framework using JIRA, leading to
                                          improved code quality and product
                                          scalability.
                                        </li>
                                        <li>
                                          Worked with MongoDB for efficient data
                                          storage and retrieval.
                                        </li>
                                        <li>
                                          Managed version control and code
                                          collaboration using Git and
                                          streamlined CI/CD processes with
                                          Jenkins.
                                        </li>
                                        <li>
                                          Engaged in troubleshooting and
                                          resolving front-end issues in
                                          collaboration with the QA and
                                          development teams.
                                        </li>
                                      </ul>
                                      <p className="mt-2">
                                        <strong>Technologies Used:</strong>{" "}
                                        JavaScript, React.js, Redux, React
                                        Router, MongoDB, RESTful APIs, Jest,
                                        Git, Jenkins, AWS
                                      </p>
                                    </div>

                                    <div class="section">
                                      <h2>Education</h2>
                                      <p>
                                        Sri Venkateswara College of Engineering
                                        & Technology (Chittoor)
                                        <br />
                                        B. Tech in Electrical & Electronics
                                        Engineering (EEE) - CGPA: 7.65 - (2018 –
                                        2021)
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </AccordionTab>
                              <AccordionTab header="Skill Matrix">
                                <p></p>
                              </AccordionTab>
                            </Accordion>
                          </div>
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
                                header="Received"
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
                                      //   value={receivedJobs}
                                      tableStyle={{
                                        minWidth: "60rem",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 2px 5px rgba(0, 0, 0, 0.1)",
                                      }}
                                      // paginator
                                      // rows={10}
                                      // rowsPerPageOptions={[5, 10, 25]}
                                      // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                      // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                      filters={receivedJobsFilters}
                                      filterDisplay="row"
                                      globalFilterFields={[
                                        "status",
                                        "jobid",
                                        "job_title",
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
                              </TabPanel>
                              <TabPanel
                                header="Potential"
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
                                          value={potentialJobs}
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
                                            "contact",
                                            "company",
                                            "date_time",
                                            "user_id",
                                          ]}
                                          emptyMessage="No jobs found."
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
                                          value={submittedJobs}
                                          tableStyle={{
                                            minWidth: "60rem",
                                            borderRadius: "8px",
                                            boxShadow:
                                              "0 2px 5px rgba(0, 0, 0, 0.1)",
                                          }}
                                          // paginator
                                          // rows={10}
                                          // rowsPerPageOptions={[5, 10, 25]}
                                          // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                          // currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                          filters={submittedJobsFilters}
                                          filterDisplay="row"
                                          globalFilterFields={[
                                            "status",
                                            "jobid",
                                            "job_title",
                                            "contact",
                                            "company",
                                            "date_time",
                                            "user_id",
                                          ]}
                                          emptyMessage="No jobs found."
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
                                header="Offer"
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
                                          value={offerJobs}
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
                                            "contact",
                                            "company",
                                            "date_time",
                                            "user_id",
                                          ]}
                                          emptyMessage="No offers found."
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
                                          value={rejectedJobs}
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
                                header="Interview"
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
                                          value={interviewJobs}
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
                                header="Placed"
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
                                          value={placedJobs}
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
                    </TabPanel>
                    <TabPanel
                      header="Activities"
                      leftIcon="pi pi-calendar mr-2"
                    >
                      <Row>
                        <Col lg={12}>
                          <section className="job-datatable-section">
                            <div className="card1 mt-3 mb-4 actjobsumtable">
                              <DataTable
                                responsive
                                showGridlines
                                // value={activities}
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
                                // filters={activitiesFilters}
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
                                // selection={selectedActivities}
                                // onSelectionChange={e =>
                                //   setSelectedActivities(e.value)
                                // }
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
                                // filters={historyFilters}
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
                                // selection={selectedHistory}
                                // onSelectionChange={e =>
                                //   setSelectedHistory(e.value)
                                // }
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
                            //   onClick={handleAddNotes}
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

            {/* //////////////////////////////////////////??    view employee end */}
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default TableView
