import React, { useState } from "react"
import { Dialog } from "primereact/dialog"

import { InputText } from "primereact/inputtext"

import { Dropdown } from "primereact/dropdown"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Col, Row } from "reactstrap"
import LinkContactsPopup from "./LinkContactsPopup"

const AddProjectDetails = () => {
  const [jobDetailsVisible, setJobDetailsVisible] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [selectedJobs, setSelectedJobs] = useState([])

  const [selectedJob, setSelectedJob] = useState(null) // single object

  const [jobs] = useState([
    {
      id: "Task-101",
      title: "Add User Role Feature",
      contact: "Amit Verma",
      project: "AI Generator (Proj-101)",
    },
    {
      id: "Task-102",
      title: "Connect with GSTN APIs",
      contact: "Kiran Rao",
      project: "Resume Parser (Proj-102)",
    },
    {
      id: "Task-103",
      title: "Create Gantt Chart View",
      contact: "Vikram Joshi",
      project: "Chatbot Assistant (Proj-103)",
    },
    {
      id: "Task-104",
      title: "File Management",
      contact: "Sanjay Mishra",
      project: " Image Enhancer AI (Proj-104)",
    },
    {
      id: "Task-105",
      title: "Performance Evaluation",
      contact: "Rajeev Menon",
      project: "Voice to Text Converter (Proj-105)",
    },
  ])

  const filteredJobs = jobs.filter(
    job =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
      job.project.toLowerCase().includes(searchText) ||
      job.id.toString().includes(searchText)
  )

  // const handleSave = () => {
  //     const selectedJobTitles = selectedJobs.map((job) => `${job.title}, ${job.id}`).join(', ');
  //     setSelectedJobTitles(selectedJobTitles);
  //     setJobDetailsVisible(false);
  // };

  const handleSave = () => {
    if (selectedJob) {
      const selectedJobTitle = `${selectedJob.title} (${selectedJob.id})`
      setSelectedJobTitles(selectedJobTitle)
    }
    setJobDetailsVisible(false)
  }

  const handleRefresh = () => {
    setSelectedJobs([])
    setSearchText("")
  }

  const [selectedJobTitles, setSelectedJobTitles] = useState("")

  const handleIconClick = () => {
    setJobDetailsVisible(true)
  }

  const [selectedCity, setSelectedCity] = useState(null)
  const cities = [
    { name: "AI Generator", code: "NY" },
    { name: "Resume Parser", code: "RM" },
    { name: "Chatbot Assistant", code: "LDN" },
    { name: "Image Enhancer AI", code: "IST" },
    { name: "Voice to Text Converter", code: "PRS" },
  ]

  const [selectedModule, setSelectedModule] = useState(null)
  const ModulesSearch = [
    { name: "User Management", code: "NY" },
    { name: "E-Invoice Integration", code: "RM" },
    { name: "Project Dashboard", code: "LDN" },
    { name: "Payroll Management", code: "IST" },
    { name: "Authentication", code: "PRS" },
  ]

  return (
    <>
      {/* <Col lg={6}> */}
        <div className="field mb-0">
          {/* <label htmlFor="job" className="block mb-1 mt-2">
            Parent Work Type
          </label> */}
          <div
            className="d-flex align-items-center"
            style={{ position: "relative" }}
          >
            <InputText
              id="job"
              value={selectedJobTitles}
              onChange={e => setSelectedJobTitles(e.target.value)}
              placeholder="Add User Role Feature (Task-101)"
              className="w-full"
              style={{ paddingRight: "2rem" }}
            />
            <i
              className="pi pi-chevron-down"
              onClick={handleIconClick}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#9095a0",
                fontSize: "14px !important"
              }}
            ></i>
          </div>
          <Dialog
            header="Select Parent Work Type"
            visible={jobDetailsVisible}
            onHide={() => setJobDetailsVisible(false)}
            style={{ width: "40vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            className="cand-details"
          >
            {/* Search Bar */}
            <Row>
              <Col lg={4}>
                {/* <label htmlFor="job" className="block mb-1 mt-2">
                  Parent Work Type
                </label> */}

                <div className="card flex justify-content-center">
                  <Dropdown
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Select Project"
                    className="w-full  bgclr border-0"
                  />
                </div>
              </Col>

              <Col lg={4}>
                {/* <label htmlFor="job" className="block mb-1 mt-2">
                  Parent Work Type
                </label> */}

                <div className="card flex justify-content-center">
                  <Dropdown
                    value={selectedModule}
                    onChange={e => setSelectedModule(e.value)}
                    options={ModulesSearch}
                    optionLabel="name"
                    placeholder="Select Module"
                    className="w-full md:w-14rem bgclr border-0"
                  />
                </div>
              </Col>
              <Col lg={4}>
                <div
                  className="p-inputgroup mb-2"
                  style={{ position: "relative" }}
                >
                  <InputText
                    placeholder="Search Parent Work Type"
                    value={searchText}
                    onInput={e => setSearchText(e.target.value)}
                    style={{ paddingRight: "2rem", borderRadius: "6px" }} // Space for the icon
                  />
                  <i
                    className="pi pi-search"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "49%",
                      transform: "translateY(-50%)",
                    }}
                  ></i>
                </div>
              </Col>
            </Row>

            {/* DataTable */}
            <DataTable
              value={filteredJobs}
              paginator
              rows={5}
              selection={selectedJob}
              onSelectionChange={e => setSelectedJob(e.value)}
              selectionMode="single"
              dataKey="id"
              rowsPerPageOptions={[5, 10, 25]}
              size="small" // Set size to small
              // selectionMode="single"
            >
              <Column selectionMode="single" style={{ width: "3em" }} />
              <Column field="id" header="Task ID" />
              <Column field="title" header="Summary" />
              <Column field="contact" header="Assigned To" />
              <Column field="project" header="Project" />
            </DataTable>

            {/* Actions */}
            <div className="d-flex justify-content-end  mt-3">
              {/* <Button label="Save" icon="pi pi-save" onClick={handleSave} />
                                                        <Button label="Refresh" icon="pi pi-refresh" onClick={handleRefresh} className="p-button-secondary" /> */}
              <button
                type="button"
                class="btn btn-primary me-2 btn-main"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-primary btn-main"
                onClick={handleRefresh}
              >
                Refresh
              </button>
            </div>
          </Dialog>
        </div>
      {/* </Col> */}

      {/* <LinkContactsPopup /> */}

      {/*  */}
    </>
  )
}
export default AddProjectDetails
