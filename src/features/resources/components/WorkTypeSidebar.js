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
import { Dropdown } from "primereact/dropdown"
import { Sidebar } from "primereact/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Button } from "primereact/button"
import WorkType1 from "pms/common-for-all/WorkTypeOne"
import WorkType from "../common-for-all/WorkType"
import AddProjectDetails from "pms/common-for-all/AddProjectDetails"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"


const WorkTypeSidebar = () => {

  const [taskAssigned, setTaskassigned] = useState("")
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


  const [PoliciesfilesErrorMessagepan, setPoliciesfilesErrorMessagepan] =
    useState()

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


  {
    /* Side bar start */
  }

  const [visibleRight, setVisibleRight] = useState(false)
  const [jobTitle, setJobTitle] = useState("")

  // Toggle dropdown open/close
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const [hiringManager, setHiringManager] = useState(null)
  const [company, setCompany] = useState("Varun Digital Media")
  const [jobLocation, setJobLocation] = useState(null)
  const [experience, setExperience] = useState()

  // Example data for each field
  const hiringManagers = [
    { name: "John", code: "J1" },
    { name: "Michael", code: "M1" },
    { name: "Sarah", code: "S1" },
    { name: "James", code: "J2" },
  ]

  const companies = [
    { name: "Tech Corp", code: "TC" },
    { name: "BizCorp", code: "BC" },
    { name: "Creative Solutions", code: "CS" },
    { name: "Innovative Tech", code: "IT" },
  ]

  const jobLocations = [
    { name: "Hyderabad", code: "HYD" },
    { name: "Chennai", code: "CHN" },
    { name: "Mumbai", code: "MUM" },
    { name: "Bangalore", code: "BLR" },
    { name: "Delhi", code: "DEL" },
  ]

  const [jobStartDate, setJobStartDate] = useState(null)
  const [jobEndDate, setJobEndDate] = useState(null)

  //des

  const [text, setText] = useState(
    `AI Generator that creates content from user input using AI models.`
  )

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    )
  }

  const header = renderHeader()

  const [skills, setSkills] = useState([])
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [primartkey, setprimartkey] = useState([])
  const [successAlert, setSuccessAlert] = useState(false)

  const handleAddSkill = () => {
    setIsAddingSkill(true)
  }

  const handleSkillChange = e => {
    const newSkills = e.value.filter(skill => !skills.includes(skill))
    if (newSkills.length > 0) {
      setSkills(prevSkills => [...prevSkills, ...newSkills]) // Add new skills
      setIsAddingSkill(false) // Hide the input field after a skill is added
    }
  }

  const removeSkill = skillToRemove => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  {
    /* Side bar end */
  }


  return (
    <div>

      <button
        type="button"
        className="btn btn-secondary import-res-btn md:w-10rem me-1"
        onClick={() => {
          setVisibleRight(true)
        }}
      >
        Add Work Type
      </button>

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
                <Link to="/candidate-editform">
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
                  {/* {
                          console.log(workTypes, "side bar")
                          
                        } */}
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

              <div className="buttons float-end mt-0">
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
  )
}

export default WorkTypeSidebar
