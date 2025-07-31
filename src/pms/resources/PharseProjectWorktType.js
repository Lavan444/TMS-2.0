import React, { useRef } from "react"
import { Col, Container, Row } from "reactstrap"
import { useState, useEffect } from "react"
import { Stepper } from "primereact/stepper"
import { StepperPanel } from "primereact/stepperpanel"
import { Button } from "primereact/button"
import { FileUpload } from "primereact/fileupload"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { FilterMatchMode } from "primereact/api"
import CreatePharseform from "../common-for-all/CreatePharseform"

const PharseProjectWorktType = () => {
  const stepperRef = useRef(null)

//   Parse short form start

 const [showParseShortform, setShowParseShortform] = useState(false);

  // import csv table starts

  const [mappingFields, setMappingFields] = useState([
    { atsField: "Work Type Code", defaultValue: "" },
    { atsField: "Work Type", defaultValue: "" },
    { atsField: "Project Name", defaultValue: "" },
    { atsField: "Module Name", defaultValue: "" },
    { atsField: "Summary", defaultValue: "" },
  ])

  const csvColumnOptions = [
    { label: "Work Type Code", value: "Work Type Code" },
    { label: "Work Type", value: "Work Type" },
    { label: "Project Name", value: "Project Name" },
    { label: "Module Name", value: "Module Name" },
    { label: "Summary", value: "Summary" },
  ]

  const onATSFieldChange = (e, index) => {
    let updatedMappingFields = [...mappingFields]
    updatedMappingFields[index].atsField = e.target.value
    setMappingFields(updatedMappingFields)
  }

  const onCSVColumnChange = (e, index) => {
    let updatedMappingFields = [...mappingFields]
    updatedMappingFields[index].csvColumn = e.value
    setMappingFields(updatedMappingFields)
  }

  const onDefaultValueChange = (e, index) => {
    let updatedMappingFields = [...mappingFields]
    updatedMappingFields[index].defaultValue = e.target.value
    setMappingFields(updatedMappingFields)
  }

  // import csv table ends

  // table data start

  const [selectedSubtask, setSelectedSubtask] = useState([])

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
  })

  const subTask = [
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
  ]

  // table data end

  // Projects datatable start

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    openings: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_location: { value: null, matchMode: FilterMatchMode.CONTAINS },
    workplace_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }, // dropdown recommended
    job_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    primary_skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
    experience_required: { value: null, matchMode: FilterMatchMode.CONTAINS },
    department: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_function: { value: null, matchMode: FilterMatchMode.CONTAINS },
    seniority: { value: null, matchMode: FilterMatchMode.EQUALS }, // dropdown recommended
    category: { value: null, matchMode: FilterMatchMode.EQUALS },
    group: { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const [jobsData, setJobsData] = useState([
    {
      job_id: "Proj-101",
      job_title: "AI Generator", // Project name
      job_status:
        "AI Generator that creates content from user input using AI models.", // Description of project
      openings: "Mahesh Kumar Bhoga", // Assigned recruiter or hiring member
      hiring_manager: "13", // ID of hiring manager
      company: "9", // Company ID
      job_location: "Hyderabad", // Location of job
      workplace_type: "Due some issues", // Reason for delay
      status: "Open",
      job_type: "24-05-2025", // Target deployment or review date
      primary_skills: "HTML, CSS, JavaScript", // Required skills
      experience_required: "3 Years", // Experience
      min_salary: 600000, // Min salary
      max_salary: 800000, // Max salary
      department: "UI/UX", // Department
      job_start_date: "01-01-2025", // Start date
      job_end_date: "31-12-2025", // End date
      job_hiring_goal: 10, // Number of hires needed
      job_function: "Web Development", // Functional area
      seniority: "Mid-Level", // Seniority level
      category: "Frontend", // Job category
      group: "HTML, CSS", // Skill group
      create_date: "15-12-2024", // Created on
      edit_date: "05-01-2025", // Last edited on
      created_by: "Harish", // Created by
    },
    {
      job_id: "Proj-102",
      job_title: "Resume Parser",
      job_status:
        "Parses resumes and extracts structured data using NLP models.",
      openings: "Anjali Mehta",
      hiring_manager: "17",
      company: "12",
      job_location: "Bangalore",
      workplace_type: "Awaiting data source integration",
      status: "In Progress",
      job_type: "15-06-2025",
      primary_skills: "Python, NLP, Regex",
      experience_required: "2 Years",
      min_salary: 500000,
      max_salary: 750000,
      department: "Data Science",
      job_start_date: "01-03-2025",
      job_end_date: "30-11-2025",
      job_hiring_goal: 5,
      job_function: "Data Extraction",
      seniority: "Junior",
      category: "Backend",
      group: "Python, NLP",
      create_date: "20-12-2024",
      edit_date: "08-01-2025",
      created_by: "Kiran",
    },
    // {
    //   job_id: "Proj-103",
    //   job_title: "Chatbot Assistant",
    //   job_status: "Develops intelligent chatbot for customer interaction.",
    //   openings: "Rahul Dev",
    //   hiring_manager: "21",
    //   company: "14",
    //   job_location: "Chennai",
    //   workplace_type: "Dependency on third-party API",
    //   status: "Under Review",
    //   job_type: "10-07-2025",
    //   primary_skills: "React, Node.js, Dialogflow",
    //   experience_required: "4 Years",
    //   min_salary: 650000,
    //   max_salary: 900000,
    //   department: "Product Development",
    //   job_start_date: "05-02-2025",
    //   job_end_date: "15-12-2025",
    //   job_hiring_goal: 8,
    //   job_function: "Customer Support Automation",
    //   seniority: "Mid-Level",
    //   category: "Full Stack",
    //   group: "React, Node.js",
    //   create_date: "18-12-2024",
    //   edit_date: "10-01-2025",
    //   created_by: "Neha",
    // },
    // {
    //   job_id: "Proj-104",
    //   job_title: "Image Enhancer AI",
    //   job_status: "AI tool that enhances low-resolution images using GANs.",
    //   openings: "Sneha Rao",
    //   hiring_manager: "19",
    //   company: "10",
    //   job_location: "Mumbai",
    //   workplace_type: "Awaiting design mockups",
    //   status: "Approved",
    //   job_type: "05-08-2025",
    //   primary_skills: "TensorFlow, OpenCV, Python",
    //   experience_required: "3 Years",
    //   min_salary: 700000,
    //   max_salary: 1000000,
    //   department: "AI/ML",
    //   job_start_date: "10-01-2025",
    //   job_end_date: "20-12-2025",
    //   job_hiring_goal: 6,
    //   job_function: "Image Processing",
    //   seniority: "Mid-Level",
    //   category: "Backend",
    //   group: "AI, ML",
    //   create_date: "22-12-2024",
    //   edit_date: "12-01-2025",
    //   created_by: "Ravi",
    // },
    // {
    //   job_id: "Proj-105",
    //   job_title: "Voice to Text Converter",
    //   job_status: "Transcribes speech to text using AI-based models.",
    //   openings: "Nikhil Sharma",
    //   hiring_manager: "23",
    //   company: "11",
    //   job_location: "Noida",
    //   workplace_type: "Pending hardware testing",
    //   status: "On Hold",
    //   job_type: "12-06-2025",
    //   primary_skills: "Python, SpeechRecognition, DeepSpeech",
    //   experience_required: "4 Years",
    //   min_salary: 750000,
    //   max_salary: 950000,
    //   department: "AI Research",
    //   job_start_date: "12-02-2025",
    //   job_end_date: "29-11-2025",
    //   job_hiring_goal: 4,
    //   job_function: "Speech Recognition",
    //   seniority: "Senior",
    //   category: "AI",
    //   group: "Speech, NLP",
    //   create_date: "25-12-2024",
    //   edit_date: "15-01-2025",
    //   created_by: "Priya",
    // },
    // {
    //   job_id: "Proj-106",
    //   job_title: "E-commerce Recommender",
    //   job_status:
    //     "Builds a recommendation system for e-commerce personalization.",
    //   openings: "Arjun Varma",
    //   hiring_manager: "15",
    //   company: "8",
    //   job_location: "Pune",
    //   workplace_type: "Blocked on analytics integration",
    //   status: "Done",
    //   job_type: "28-06-2025",
    //   primary_skills: "Python, Pandas, Scikit-learn",
    //   experience_required: "2 Years",
    //   min_salary: 500000,
    //   max_salary: 850000,
    //   department: "Analytics",
    //   job_start_date: "01-03-2025",
    //   job_end_date: "30-10-2025",
    //   job_hiring_goal: 7,
    //   job_function: "Data Science",
    //   seniority: "Junior",
    //   category: "AI",
    //   group: "ML, Python",
    //   create_date: "28-12-2024",
    //   edit_date: "18-01-2025",
    //   created_by: "Suman",
    // },
    // {
    //   job_id: "Proj-107",
    //   job_title: "Social Media Scheduler",
    //   job_status: "Tool for scheduling and auto-posting on social platforms.",
    //   openings: "Vikas Jain",
    //   hiring_manager: "11",
    //   company: "15",
    //   job_location: "Delhi",
    //   workplace_type: "Delay in UI feedback",
    //   status: "Cancelled",
    //   job_type: "14-07-2025",
    //   primary_skills: "JavaScript, Node.js, MongoDB",
    //   experience_required: "3 Years",
    //   min_salary: 620000,
    //   max_salary: 820000,
    //   department: "Marketing Tech",
    //   job_start_date: "20-01-2025",
    //   job_end_date: "01-12-2025",
    //   job_hiring_goal: 5,
    //   job_function: "Marketing Automation",
    //   seniority: "Mid-Level",
    //   category: "Full Stack",
    //   group: "Node.js, JS",
    //   create_date: "02-01-2025",
    //   edit_date: "20-01-2025",
    //   created_by: "Aditya",
    // },
    // {
    //   job_id: "Proj-108",
    //   job_title: "Bug Tracker Tool",
    //   job_status: "Develops a tool to log, track, and resolve software bugs.",
    //   openings: "Deepika Singh",
    //   hiring_manager: "18",
    //   company: "13",
    //   job_location: "Ahmedabad",
    //   workplace_type: "Stalled on test case setup",
    //   status: "Open",
    //   job_type: "25-06-2025",
    //   primary_skills: "React, Redux, Firebase",
    //   experience_required: "2 Years",
    //   min_salary: 550000,
    //   max_salary: 770000,
    //   department: "To Do",
    //   job_start_date: "10-02-2025",
    //   job_end_date: "30-09-2025",
    //   job_hiring_goal: 6,
    //   job_function: "Quality Assurance",
    //   seniority: "Junior",
    //   category: "Frontend",
    //   group: "React, Firebase",
    //   create_date: "05-01-2025",
    //   edit_date: "25-01-2025",
    //   created_by: "Swati",
    // },
    // {
    //   job_id: "Proj-109",
    //   job_title: "Content Summarizer",
    //   job_status: "Generates concise summaries from long documents using NLP.",
    //   openings: "Tanvi Verma",
    //   hiring_manager: "20",
    //   company: "10",
    //   job_location: "Kolkata",
    //   workplace_type: "Model training delay",
    //   status: "In Progress",
    //   job_type: "10-09-2025",
    //   primary_skills: "Python, Transformers, HuggingFace",
    //   experience_required: "3 Years",
    //   min_salary: 600000,
    //   max_salary: 900000,
    //   department: "AI/ML",
    //   job_start_date: "15-02-2025",
    //   job_end_date: "30-11-2025",
    //   job_hiring_goal: 5,
    //   job_function: "Text Summarization",
    //   seniority: "Mid-Level",
    //   category: "AI",
    //   group: "NLP, Python",
    //   create_date: "10-01-2025",
    //   edit_date: "30-01-2025",
    //   created_by: "Ankit",
    // },
    // {
    //   job_id: "Proj-110",
    //   job_title: "Smart Form Autofill",
    //   job_status: "AI-powered autofill for dynamic web forms.",
    //   openings: "Harika Nair",
    //   hiring_manager: "22",
    //   company: "16",
    //   job_location: "Gurgaon",
    //   workplace_type: "Blocked on browser plugin API",
    //   status: "Under Review",
    //   job_type: "20-07-2025",
    //   primary_skills: "JavaScript, Chrome API, ML",
    //   experience_required: "3 Years",
    //   min_salary: 620000,
    //   max_salary: 850000,
    //   department: "Automation",
    //   job_start_date: "22-01-2025",
    //   job_end_date: "31-10-2025",
    //   job_hiring_goal: 4,
    //   job_function: "Form Automation",
    //   seniority: "Mid-Level",
    //   category: "Frontend",
    //   group: "JS, ML",
    //   create_date: "12-01-2025",
    //   edit_date: "02-02-2025",
    //   created_by: "Yash",
    // },
  ])

  // Projects datatable end

  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <div className="page-title-box actjobbread">
            <Row>
              <Col sm={12} md={12} lg={12}>
                <h1 className="page-title">
                  {" "}
                  Parse Document as Project / Work Type
                </h1>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <div>
                  <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
                    <StepperPanel header="Choose">
                      <div className="flex flex-column">
                        {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div> */}
                        <h6 className="page-title mb-3">Upload file</h6>

                        <FileUpload
                          name="demo[]"
                          url={"/api/upload"}
                          multiple
                          accept="image/*"
                          maxFileSize={1000000}
                          emptyTemplate={
                            <p className="m-0">
                              Drag and drop files to here to upload.
                            </p>
                          }
                        />
                      </div>
                      <div className="flex pt-4 justify-content-end">

                        {
                            showParseShortform ? (
                              <Button
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                onClick={() => {stepperRef.current.nextCallback()
                                    console.log("Next clicked");
                                    
                                }}
                              />
                            ): <Button
                                label="Submit"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                onClick={() => {stepperRef.current.nextCallback()
                                    console.log("submit clicked");
                                    setShowParseShortform(true);
                                    
                                }}
                              /> }
                      </div>
                    </StepperPanel>

                    <StepperPanel header="Project Details">
                      <div className="flex flex-column">
                        <Row>
                          <Col md={12}>
                            <h6 className="page-title mb-3">Project Details</h6>
                            <div className=" p-3 dup-check">
                              <DataTable
                                value={jobsData}
                                responsiveLayout="scroll"
                                showGridlines
                                //   paginator
                                rows={5}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                filters={subtaskFilters}
                                filterDisplay="row"
                                globalFilterFields={[
                                  "job_id",
                                  "job_title",
                                  "job_status",
                                  "openings",
                                  "hiring_manager",
                                  "company",
                                  "job_location",
                                  "workplace_type",
                                  "status",
                                  "job_type",
                                  "primary_skills",
                                  "experience_required",
                                  "department",
                                  "job_function",
                                  "seniority",
                                  "category",
                                  "group",
                                  "created_by",
                                ]}
                                emptyMessage="No records found."
                                selection={selectedSubtask}
                                onSelectionChange={e =>
                                  setSelectedSubtask(e.value)
                                }
                                selectionMode="multiple"
                                resizableColumns
                                columnResizeMode="expand"
                                tableStyle={{
                                  minWidth: "100rem",
                                  borderRadius: "8px",
                                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                <Column
                                  selectionMode="multiple"
                                  headerStyle={{ width: "3em" }}
                                />
                                <Column
                                  field="job_id"
                                  header="Project Code"
                                  sortable
                                  filter
                                  style={{ minWidth: "10rem" }}
                                />
                                <Column
                                  field="job_title"
                                  header="Project Name"
                                  sortable
                                  filter
                                  style={{ minWidth: "12rem" }}
                                />
                                {/* <Column field="job_status" header="Summary" sortable filter style={{ minWidth: '18rem' }} /> */}
                                <Column
                                  field="openings"
                                  header="Project Manager"
                                  sortable
                                  filter
                                  style={{ minWidth: "12rem" }}
                                />
                                {/* <Column field="job_location" header="Location" sortable filter style={{ minWidth: '10rem' }} />
  <Column field="status" header="Status" sortable filter style={{ minWidth: '10rem' }} />
  <Column field="workplace_type" header="Delay Reason" sortable filter style={{ minWidth: '14rem' }} />
  <Column field="job_type" header="Target Date" sortable filter style={{ minWidth: '12rem' }} />
  <Column field="primary_skills" header="Skills" sortable filter style={{ minWidth: '14rem' }} />
  <Column field="experience_required" header="Experience" sortable filter style={{ minWidth: '10rem' }} />
  <Column field="department" header="Department" sortable filter style={{ minWidth: '10rem' }} />
  <Column field="job_function" header="Function" sortable filter style={{ minWidth: '14rem' }} />
  <Column field="seniority" header="Seniority" sortable filter style={{ minWidth: '10rem' }} />
  <Column field="category" header="Category" sortable filter style={{ minWidth: '10rem' }} />
  <Column field="group" header="Group" sortable filter style={{ minWidth: '10rem' }} />
  <Column field="created_by" header="Created By" sortable filter style={{ minWidth: '10rem' }} /> */}
                              </DataTable>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="flex pt-4 justify-content-between">
                        <Button
                          label="Back"
                          severity="secondary"
                          icon="pi pi-arrow-left"
                          onClick={() => stepperRef.current.prevCallback()}
                        />
                        <Button
                          label="Next"
                          icon="pi pi-arrow-right"
                          iconPos="right"
                          onClick={() => stepperRef.current.nextCallback()}
                        />
                      </div>
                    </StepperPanel>

                    <StepperPanel header="Task Details">
                      <h6 className="page-title mb-3">Task Details</h6>
                      <div className="flex flex-column">
                        <Row>
                          <Col lg={12}>
                            <DataTable
                              value={subTask}
                              responsiveLayout="scroll"
                              showGridlines
                              //    paginator
                              rows={5}
                              rowsPerPageOptions={[5, 10, 25, 50]}
                              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                              currentPageReportTemplate="{first} to {last} of {totalRecords}"
                              filters={subtaskFilters}
                              filterDisplay="row"
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
                                "task_status",
                                "priority",
                                "approval_status",
                              ]}
                              emptyMessage="No records found."
                              selection={selectedSubtask}
                              onSelectionChange={e =>
                                setSelectedSubtask(e.value)
                              }
                              selectionMode="multiple"
                              resizableColumns
                              columnResizeMode="expand"
                              tableStyle={{
                                minWidth: "100rem",
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
                                sortable
                                filter
                                style={{ minWidth: "10rem" }}
                              />
                              <Column
                                field="task_type"
                                header="Work Type"
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
                              {/* <Column field="sub_task" header="Sub Task" sortable filter style={{ minWidth: '12rem' }} /> */}
                              <Column
                                field="project_manager"
                                header="Project Manager"
                                sortable
                                filter
                                style={{ minWidth: "12rem" }}
                              />
                              {/* <Column field="module_name" header="Module" sortable filter style={{ minWidth: '10rem' }} /> */}
                              {/* <Column field="task_name" header="Task Name" sortable filter style={{ minWidth: '12rem' }} /> */}

                              <Column
                                field="task_description"
                                header="Summary"
                                sortable
                                filter
                                body={rowData => (
                                  <span
                                    className="p-tooltip-target"
                                    data-pr-tooltip={rowData.task_description}
                                    style={{
                                      display: "block",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      // maxWidth: '200px',
                                      cursor: "help",
                                    }}
                                  >
                                    {rowData.task_description}
                                  </span>
                                )}
                                style={{ minWidth: "14rem" }}
                              />

                              <Column
                                field="created_by"
                                header="Created By"
                                sortable
                                filter
                                style={{ minWidth: "10rem" }}
                              />
                              {/* <Column field="assigned_by" header="Assigned By" sortable filter style={{ minWidth: '10rem' }} /> */}
                              <Column
                                field="assigned_to"
                                header="Assigned To"
                                sortable
                                filter
                                style={{ minWidth: "10rem" }}
                              />
                              {/* <Column field="watchers" header="Watchers" sortable filter style={{ minWidth: '10rem' }} />
                                                                                       <Column field="start_date" header="Start Date" sortable filter style={{ minWidth: '10rem' }} />
                                                                                       <Column field="work_hours" header="Work Hours" sortable filter style={{ minWidth: '10rem' }} />
                                                                                       <Column field="end_date" header="End Date" sortable filter style={{ minWidth: '10rem' }} />
                                                                                       <Column field="actual_end_date" header="Actual End Date" sortable filter style={{ minWidth: '12rem' }} />
                                                                                       <Column field="task_status" header="Status" sortable filter style={{ minWidth: '10rem' }} />
                                                                                       <Column field="priority" header="Priority" sortable filter style={{ minWidth: '10rem' }} />
                                                                                       <Column field="approval_status" header="Approval" sortable filter style={{ minWidth: '10rem' }} /> */}
                            </DataTable>
                          </Col>
                        </Row>
                      </div>
                      <div className="flex pt-4 justify-content-between">
                        <Button
                          label="Back"
                          severity="secondary"
                          icon="pi pi-arrow-left"
                          onClick={() => stepperRef.current.prevCallback()}
                        />
                        <Button
                          label="Next"
                          icon="pi pi-arrow-right"
                          iconPos="right"
                          onClick={() => stepperRef.current.nextCallback()}
                        />
                      </div>
                    </StepperPanel>

                    <StepperPanel header="Finish">
                      <div className="flex flex-column">
                        <Row>
                          <Col md={12}>
                            <h6 className="page-title mb-3">Finish</h6>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Total Records</th>
                                  <th>Count</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td> Total New Projects Added </td>
                                  <td> 1 </td>
                                </tr>
                                <tr>
                                  <td> Total New Tasks Added </td>
                                  <td> 3 </td>
                                </tr>
                                {/* <tr>
                                  <td> Total Corrupt Records Found </td>
                                  <td> 10 </td>
                                </tr> */}
                                <tr>
                                  <td> Total Processed Records </td>
                                  <td> 4 </td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                        </Row>
                      </div>
                      <div className="flex pt-4 justify-content-start">
                        <Button
                          label="Back"
                          severity="secondary"
                          icon="pi pi-arrow-left"
                          onClick={() => stepperRef.current.prevCallback()}
                        />
                      </div>
                    </StepperPanel>
                  </Stepper>
                </div>
              </Col>
            </Row>
          </div>
        </Container>

         <CreatePharseform
                        visible={showParseShortform}
                        onHide={() => setShowParseShortform(false)}
                    />
      </div>
    </React.Fragment>
  )
}

export default PharseProjectWorktType
