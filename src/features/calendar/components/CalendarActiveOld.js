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

const CalendarActive = () => {
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
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subtype: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subject: { value: null, matchMode: FilterMatchMode.CONTAINS },
    reminder: { value: null, matchMode: FilterMatchMode.EQUALS },
    reminderDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    startDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    endDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    completed: { value: null, matchMode: FilterMatchMode.EQUALS },
    private: { value: null, matchMode: FilterMatchMode.EQUALS },
    userId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const [tableData, setTableData] = useState([
    {
      id: 1,
      type: "Interview",
      subtype: "Screening Interviews",
      subject: "Complete Report",
      reminder: true,
      reminderDate: "17/01/2025",
      startDate: "16/01/2025",
      endDate: "28/01/2025",
      completed: false,
      private: true,
      userId: "Harish1",
    },
    {
      id: 2,
      type: "Interview",
      subtype: "One-on-One Interviews",
      subject: "Planning Session",
      reminder: true,
      reminderDate: "20/01/2025",
      startDate: "19/01/2025",
      endDate: "28/01/2025",
      completed: false,
      private: false,
      userId: "Harish",
    },
    {
      id: 3,
      type: "Event",
      subtype: "Workshop",
      subject: "React Training",
      reminder: false,
      reminderDate: "22/01/2025",
      startDate: "21/01/2025",
      endDate: "23/01/2025",
      completed: true,
      private: false,
      userId: "Robert Brown",
    },
    {
      id: 4,
      type: "Task",
      subtype: "Analysis",
      subject: "Data Review",
      reminder: true,
      reminderDate: "24/01/2025",
      startDate: "23/01/2025",
      endDate: "25/01/2025",
      completed: false,
      private: true,
      userId: "Emily White",
    },
    {
      id: 5,
      type: "Meeting",
      subtype: "Client",
      subject: "Project Discussion",
      reminder: false,
      reminderDate: "26/01/2025",
      startDate: "25/01/2025",
      endDate: "27/01/2025",
      completed: true,
      private: false,
      userId: "Michael Johnson",
    },
    {
      id: 6,
      type: "Task",
      subtype: "Development",
      subject: "Code Implementation",
      reminder: true,
      reminderDate: "28/01/2025",
      startDate: "27/01/2025",
      endDate: "29/01/2025",
      completed: false,
      private: true,
      userId: "Sophia Davis",
    },
    {
      id: 7,
      type: "Event",
      subtype: "Conference",
      subject: "Tech Meetup",
      reminder: true,
      reminderDate: "30/01/2025",
      startDate: "29/01/2025",
      endDate: "31/01/2025",
      completed: false,
      private: false,
      userId: "Daniel Lee",
    },
    {
      id: 8,
      type: "Meeting",
      subtype: "Internal",
      subject: "Weekly Sync",
      reminder: false,
      reminderDate: "01/02/2025",
      startDate: "31/01/2025",
      endDate: "02/02/2025",
      completed: true,
      private: false,
      userId: "Olivia Harris",
    },
    {
      id: 9,
      type: "Task",
      subtype: "QA",
      subject: "Testing Process",
      reminder: true,
      reminderDate: "03/02/2025",
      startDate: "02/02/2025",
      endDate: "04/02/2025",
      completed: false,
      private: true,
      userId: "Lucas Garcia",
    },
    {
      id: 10,
      type: "Event",
      subtype: "Seminar",
      subject: "Industry Trends",
      reminder: true,
      reminderDate: "05/02/2025",
      startDate: "04/02/2025",
      endDate: "06/02/2025",
      completed: false,
      private: false,
      userId: "Amelia Martinez",
    },
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

  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <div className="page-title-box actjobbread mb-0">
            <Row className="align-items-center pt-3 pb-3 breadcrumb-card action-items">
              <Col md={6} lg={6} className="d-flex align-items-center">
                {selectedTableData.length > 0 && (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn me-1"
                    >
                      <i className="fa-regular fa-user me-1"></i>{" "}
                      {selectedTableData.length} selected
                    </button>
                    <div className="icons-ac me-2">
                      <button
                        type="button"
                        class="btn btn-secondary icons-btn ms-1"
                        onClick={() => SetInterviewpop1(true)}
                      >
                        <i className="pi pi-eye"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary icons-btn ms-1"
                        onClick={() => SetInterviewpop(true)}
                      >
                        <i className="pi pi-pencil"></i>
                      </button>
                     
                      <button
                        type="button"
                        class="btn btn-secondary icons-btn ms-1"
                        onClick={handleDeleteSelected}
                      >
                        <i className="pi pi-trash"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary icons-btn ms-1"
                      >
                        <i className="pi pi-cart-arrow-down"></i>
                      </button>
                    </div>
                  </>
                )}

                <div>
                  <button
                    type="button"
                    className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn mb-1"
                    data-bs-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    <i className="fa-solid fa-xmark"></i> Clear Search
                  </button>
                </div>
              </Col>

              <Col md={12} lg={4}></Col>
            </Row>
            <Row>
              <Col lg={12}>
                <section className="job-datatable-section">
                  <div className="card1 mt-3 mb-4 actjobsumtable datatable-check">
                    <DataTable
                      value={tableData}
                      tableStyle={{
                        minWidth: "50rem",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                      rows={pageState.rows}
                      first={pageState.first}
                      paginator
                      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                      currentPageReportTemplate="{first} to {last} of {totalRecords}"
                      onPage={onPage}
                      dataKey="id"
                      loading={loading}
                      scrollable
                      emptyMessage="No records found."
                      selection={selectedTableData}
                      onSelectionChange={e => setSelectedTableData(e.value)}
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
                        header="SubType"
                        sortable
                        filter
                        style={{ minWidth: "10rem" }}
                      />
                      <Column
                        field="subject"
                        header="Subject"
                        sortable
                        filter
                        style={{ minWidth: "12rem" }}
                      />
                      <Column
                        field="reminder"
                        header="Reminder"
                        body={reminderCheckboxTemplate}
                        style={{ minWidth: "8rem" }}
                      />
                      <Column
                        field="reminderDate"
                        header="Reminder Date"
                        sortable
                        filter
                        style={{ minWidth: "12rem" }}
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
                      <Column
                        field="completed"
                        header="Completed"
                        body={completedCheckboxTemplate}
                        style={{ minWidth: "8rem" }}
                      />
                      <Column
                        field="private"
                        header="Private"
                        body={privateCheckboxTemplate}
                        style={{ minWidth: "8rem" }}
                      />
                      <Column
                        field="userId"
                        header="User ID"
                        sortable
                        filter
                        style={{ minWidth: "10rem" }}
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

export default CalendarActive
