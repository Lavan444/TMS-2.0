import React, { useState, useEffect, useRef } from "react"
import { Container, Row, Col } from "reactstrap"
import { CardBody } from "reactstrap"
import { TabView, TabPanel } from "primereact/tabview"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { PickList } from "primereact/picklist"
import { Tooltip } from "primereact/tooltip"
import { useLocation, useNavigate } from "react-router-dom"
import { PrimeIcons } from "primereact/api"
import { Menu } from "primereact/menu"
import { useDispatch } from "react-redux"
import { setPageData } from "store/actions"

//  Mapping of route paths to user-friendly names
const ROUTE_NAME_MAP = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/user-management": "User Management",
  "/reports": "Reports",
  // Add more routes as needed
}

const Footer = ({ callBack }) => {
  console.log(callBack)

  const dispath = useDispatch()

  // const [activeIndex, setActiveIndex] = useState(0)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)
  const totalRecords = 20

  const onPageChange = event => {
    setFirst(event.first)
    setRows(event.rows)
    dispath(
      setPageData({
        first: event.first,
        rows: event.rows,
        totalRecords,
      })
    )
  }

  // pick list start - WorkType columns configuration
  const [pick, setPick] = useState(false)

  // Available columns for the WorkType DataTable (matching AllActiveemp structure)
  const availableWorkTypeColumns = [
    { id: 'task_code', name: 'Work Type Code', field: 'task_code' },
    { id: 'task_type', name: 'Work Type', field: 'task_type' },
    { id: 'project_name', name: 'Project Name', field: 'project_name' },
    { id: 'module_name', name: 'Module Name', field: 'module_name' },
    { id: 'task_name', name: 'Summary', field: 'task_name' },
    { id: 'created_by', name: 'Created By', field: 'created_by' },
    { id: 'assigned_by', name: 'Assigned By', field: 'assigned_by' },
    { id: 'assigned_to', name: 'Assigned To', field: 'assigned_to' },
    { id: 'project_manager', name: 'Project Manager', field: 'project_manager' },
    { id: 'watchers', name: 'Watchers', field: 'watchers' },
    { id: 'start_date', name: 'Start Date', field: 'start_date' },
    { id: 'work_hours', name: 'Work Hours (in hours)', field: 'work_hours' },
    { id: 'end_date', name: 'End Date', field: 'end_date' },
    { id: 'actual_end_date', name: 'Actual End Date', field: 'actual_end_date' },
    { id: 'task_status', name: 'Status', field: 'task_status' },
    { id: 'priority', name: 'Priority', field: 'priority' },
    { id: 'approval_status', name: 'Approval Status', field: 'approval_status' }
  ]

  // Default selected columns (matching AllActiveemp defaults)
  const defaultSelectedColumns = [
    { id: 'task_code', name: 'Work Type Code', field: 'task_code' },
    { id: 'task_type', name: 'Work Type', field: 'task_type' },
    { id: 'project_name', name: 'Project Name', field: 'project_name' },
    { id: 'task_name', name: 'Summary', field: 'task_name' },
    { id: 'assigned_to', name: 'Assigned To', field: 'assigned_to' },
    { id: 'task_status', name: 'Status', field: 'task_status' },
    { id: 'priority', name: 'Priority', field: 'priority' }
  ]

  // Initialize source (available) and target (selected) columns
  const [source, setSource] = useState(
    availableWorkTypeColumns.filter(col => 
      !defaultSelectedColumns.some(defaultCol => defaultCol.id === col.id)
    )
  )
  const [target, setTarget] = useState(defaultSelectedColumns)

  // Handle column changes in PickList
  const onChange = event => {
    setSource(event.source)
    setTarget(event.target)
  }

  // Handle Save button - this will apply the column selection
  const handleSaveColumns = () => {
    // Get the field names of selected columns
    const selectedFields = target.map(col => col.field)
    
    // Store in localStorage for persistence
    localStorage.setItem('workTypeSelectedColumns', JSON.stringify(selectedFields))
    localStorage.setItem('workTypeSelectedColumnsData', JSON.stringify(target))
    
    // Dispatch custom event to notify AllActiveemp component
    const event = new CustomEvent('footerColumnUpdate', {
      detail: {
        type: 'COLUMN_SELECTION',
        selectedColumns: selectedFields,
        selectedColumnsData: target
      }
    })
    window.dispatchEvent(event)
    
    // If callBack function is provided, send the selected columns back to parent
    if (callBack && typeof callBack === 'function') {
      callBack({
        type: 'COLUMN_SELECTION',
        selectedColumns: selectedFields,
        selectedColumnsData: target
      })
    }
    
    setPick(false)
    
    // Show success message or notification here if needed
    console.log('Selected columns saved:', selectedFields)
  }

  // Reset to default columns
  const handleResetColumns = () => {
    const defaultFields = defaultSelectedColumns.map(col => col.field)
    setTarget(defaultSelectedColumns)
    setSource(
      availableWorkTypeColumns.filter(col => 
        !defaultSelectedColumns.some(defaultCol => defaultCol.id === col.id)
      )
    )
    
    // Store reset in localStorage
    localStorage.setItem('workTypeSelectedColumns', JSON.stringify(defaultFields))
    localStorage.setItem('workTypeSelectedColumnsData', JSON.stringify(defaultSelectedColumns))
    
    // Dispatch custom event to notify AllActiveemp component
    const event = new CustomEvent('footerColumnUpdate', {
      detail: {
        type: 'COLUMN_RESET',
        selectedColumns: defaultFields,
        selectedColumnsData: defaultSelectedColumns
      }
    })
    window.dispatchEvent(event)
    
    // Update parent component if callback exists
    if (callBack && typeof callBack === 'function') {
      callBack({
        type: 'COLUMN_RESET',
        selectedColumns: defaultFields,
        selectedColumnsData: defaultSelectedColumns
      })
    }
  }

  // Load saved column configuration on component mount
  useEffect(() => {
    const savedColumns = localStorage.getItem('workTypeSelectedColumns')
    const savedColumnsData = localStorage.getItem('workTypeSelectedColumnsData')
    
    if (savedColumns && savedColumnsData) {
      try {
        const parsedFields = JSON.parse(savedColumns)
        const parsedData = JSON.parse(savedColumnsData)
        
        setTarget(parsedData)
        setSource(
          availableWorkTypeColumns.filter(col => 
            !parsedFields.includes(col.field)
          )
        )
        
        // Notify parent component of saved selection
        if (callBack && typeof callBack === 'function') {
          callBack({
            type: 'COLUMN_LOAD',
            selectedColumns: parsedFields,
            selectedColumnsData: parsedData
          })
        }
      } catch (error) {
        console.error('Error loading saved columns:', error)
      }
    }
  }, [])

  const itemTemplate = item => (
    <div className="flex flex-wrap p-2 align-items-center gap-3">
      <div className="flex-1 flex flex-column gap-2">
        <span className="font-bold">{item.name}</span>
        <small className="text-muted">Field: {item.field}</small>
      </div>
    </div>
  )

  // pick list end

  // Tab section start


  const ICON_MAP = {
    Home: PrimeIcons.HOME,
    Dashboard: PrimeIcons.CHART_BAR,
    Settings: PrimeIcons.COG,
    Profile: PrimeIcons.USER,
    Reports: PrimeIcons.FILE,
    Help: PrimeIcons.QUESTION_CIRCLE,
    Default: PrimeIcons.FILE, // Fallback icon

    // Contacts - all use same icon
    Contacts: PrimeIcons.ADDRESS_BOOK,
    "Contacts All": PrimeIcons.ADDRESS_BOOK,
    "Contacts All Active": PrimeIcons.ADDRESS_BOOK,
    "Contacts My Active": PrimeIcons.ADDRESS_BOOK,

    // Worktype - all use same icon (different from Contacts)
    Worktype: PrimeIcons.USER_EDIT,
    "Worktype All": PrimeIcons.USER_EDIT,
    "Worktype All Active": PrimeIcons.USER_EDIT,
    "Worktype My Active": PrimeIcons.USER_EDIT,
  }

  // Assuming this exists in your app
  const ROUTE_NAME_MAP = {
    "/dashboard": "Dashboard",
    "/settings": "Settings",
    "/profile": "Profile",
    "/reports": "Reports",
    "/help": "Help",
    // Add other path mappings as needed
  }

  const MAX_VISIBLE_TABS = 6 // Maximum number of visible tabs
  const location = useLocation()
  const navigate = useNavigate()

  // Use useRef instead of useState for the menu reference
  const menuRef = useRef(null)

  // State to manage open pages/tabs
  // const [openPages, setOpenPages] = useState([{ name: "Home", path: "/" }])
  const [openPages, setOpenPages] = useState([{ name: "Home", fullName: "Home", path: "/" }])

  // State to manage active tab index
  const [activeIndex, setActiveIndex] = useState(0)

  // Effect to handle URL-based tab addition
  useEffect(() => {
    const currentPath = location.pathname

    if (
      currentPath === "/" &&
      openPages.length === 1 &&
      openPages[0].path === "/"
    ) {
      return
    }

    const existingTabIndex = openPages.findIndex(
      page => page.path === currentPath
    )

    if (existingTabIndex === -1) {
      let fullTabName =
        ROUTE_NAME_MAP[currentPath] ||
        currentPath.split("/").pop()?.replace(/-/g, " ") ||
        "New Page"

      if (!fullTabName) fullTabName = "Unknown" // Fallback if empty

      const displayName = fullTabName
        .replace(
          /\b(Worktype|Contacts|Projects|Recruiter|Companies|Calendar|Emails|Dashboard)\b/gi,
          ""
        )
        .trim()

      const newTab = {
        name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        fullName: fullTabName, // Keep full name for icons
        path: currentPath,
      }

      setOpenPages(prevPages => [...prevPages, newTab])
    } else if (existingTabIndex !== activeIndex) {
      setActiveIndex(existingTabIndex)
    }
  }, [location.pathname])

  // Separate effect to update active index after openPages changes
  useEffect(() => {
    const currentPath = location.pathname
    const tabIndex = openPages.findIndex(page => page.path === currentPath)

    if (tabIndex !== -1 && tabIndex !== activeIndex) {
      setActiveIndex(tabIndex)
    }
  }, [openPages, location.pathname])

  // Function to remove a tab
  const removeTab = index => {
    // Prevent removing the first (Home) tab
    if (index === 0) return

    const updatedTabs = openPages.filter((_, i) => i !== index)
    setOpenPages(updatedTabs)

    // Adjust active index and navigate
    if (index <= activeIndex) {
      const newActiveIndex = Math.max(0, activeIndex - 1)
      setActiveIndex(newActiveIndex)

      // Navigate to the new active tab's path
      navigate(updatedTabs[newActiveIndex].path)
    }
  }

  // Handle tab change
  const onTabChange = e => {
    // Check if this is the dropdown tab (More Tabs)
    if (e.index === MAX_VISIBLE_TABS && openPages.length > MAX_VISIBLE_TABS) {
      // Don't change the active tab, just show the dropdown
      if (menuRef.current) {
        menuRef.current.toggle(e.originalEvent)
      }
      return
    }

    const selectedTab = openPages[e.index]
    setActiveIndex(e.index)

    // Navigate to the selected tab's path
    navigate(selectedTab.path)
  }

  // Select a tab from dropdown and bring it to visible tabs
  const selectDropdownTab = index => {
    const actualIndex = index + MAX_VISIBLE_TABS

    if (actualIndex >= openPages.length) return

    const selectedTab = openPages[actualIndex]

    const rearrangedTabs = [...openPages]

    rearrangedTabs.splice(actualIndex, 1)

    rearrangedTabs.splice(MAX_VISIBLE_TABS - 1, 0, selectedTab)

    setOpenPages(rearrangedTabs)

    setActiveIndex(MAX_VISIBLE_TABS - 1)

    navigate(selectedTab.path)
  }

  const getDropdownItems = () => {

    return openPages.slice(MAX_VISIBLE_TABS).map((tab, index) => {
      const icon = getTabIcon(tab.fullName)

      console.log("Dropdown Tab:", tab.name, " | Icon:", icon)

      return {
        label: tab.name,
        icon: `pi ${icon}`,
        command: () => selectDropdownTab(index),
      }
      
    })
  }

  const hasDropdownTabs = openPages.length > MAX_VISIBLE_TABS

  const visibleTabCount = hasDropdownTabs ? MAX_VISIBLE_TABS : openPages.length
  const visibleTabs = openPages.slice(0, visibleTabCount)

  const excludedTabs = [
    "Worktype",
    "Projects",
    "Recruiter",
    "Companies",
    "Contacts",
    "Calendar",
    "Emails",
    
  ]

  const filteredTabs = visibleTabs.filter(
    tab => !excludedTabs.includes(tab.name)
  )

  const getTabIcon = fullTabName => {

    console.log("Checking icon for:", fullTabName)

    if (!fullTabName) return PrimeIcons.FILE

    const tab = fullTabName.trim().toLowerCase()
    console.log("Processed tab name:", tab)

    if (tab === "home") return PrimeIcons.HOME 
    if (tab.includes("Worktype")) return PrimeIcons.USERS
    if (tab.includes("contacts")) return PrimeIcons.ADDRESS_BOOK
    if (tab.includes("Projects")) return PrimeIcons.BRIEFCASE
    // if (tab.includes("recruiter")) return PrimeIcons.CHART_LINE
    if (tab.includes("companies")) return PrimeIcons.BUILDING
    if (tab.includes("calendar")) return PrimeIcons.CALENDAR
    if (
      tab.includes("emails") ||
      tab.includes("sentemails") ||
      tab.includes("outbox")
    )
      return PrimeIcons.ENVELOPE
    if (tab.includes("manager dashboard")) return PrimeIcons.CHART_BAR
    if (tab.includes("admin dashboard")) return PrimeIcons.COG
    if (tab.includes("recruiter") ||
      tab.includes("report") ||
      tab.includes("time") ||
      tab.includes("activejob")
    )
      return PrimeIcons.CHART_LINE
    if (tab.includes("kanbanview") || tab.includes("tableview"))
      return PrimeIcons.SITEMAP

    return PrimeIcons.FILE 
  }

  return (
    <React.Fragment>
      <footer className="footer footer-back">
        <Container fluid={true} className="ps-0">
          <Row className="align-items-center g-0">
            {/* Footer Icons */}
            <Col xl={1} md={2} sm={2}>
              <div className="footericons footer-property">
                <Tooltip
                  target=".view"
                  content="Logout"
                  position="bottom"
                  style={{ marginTop: "5px" }}
                />
                <span
                  className="view"
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  <i class="fa-solid fa-right-to-bracket me-4"></i>
                </span>
                <Tooltip
                  target=".refresh"
                  content="Refresh"
                  position="bottom"
                  style={{ marginTop: "5px" }}
                />

                <span
                  className="refresh"
                  onClick={() => window.location.reload()}
                >
                  <i className="fa-solid fa-arrows-rotate me-4"></i>
                </span>

                <Tooltip
                  target=".gear"
                  content="WorkType Field List"
                  position="bottom"
                  style={{ marginTop: "5px" }}
                />
                <span
                  className="gear-picklist gear"
                  onClick={() => setPick(true)}
                  title="WorkType Field List"
                >
                  <i class="fa-solid fa-user-gear me-2"></i>
                </span>
              </div>
            </Col>

            <Col xl={4} md={10} sm={10} className="dispaly-mob">
              <div className="pagination-borleft">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  className="paginator-custom pagination-border"
                />
              </div>
            </Col>

            {/* Tab View Section */}
            {/* <Col lg={7} md={12} sm={12} className="footer-tabsec pe-0">
              <CardBody className="cardbody pe-0">
                <div className="accordian-menu footer-align close-tabssection">
                  <TabView
                    activeIndex={activeIndex}
                    onTabChange={e => setActiveIndex(e.index)}
                  >
                    {tabs.map((tab, index) => (
                      <TabPanel
                        key={tab.key}
                        header={
                          <div className="footer-tabsec">
                            <i className={tab.iconClass}></i> {tab.header}
                          </div>
                        }
                        closable={index > 0}
                      >
                        <p className="m-0">{tab.content}</p>
                      </TabPanel>
                    ))}
                  </TabView>
                </div>
              </CardBody>
            </Col> */}

            <Col
              lg={8}
              md={12}
              sm={12}
              className="footer-tabsec pe-0 dynamic-tab"
            >
              <div className="dynamic-tab overflow-hidden">
                <div className="accordian-menu footer-align close-tabssection">
                  <TabView
                    activeIndex={activeIndex}
                    onTabChange={onTabChange}
                    className="d-flex justify-content-between"
                  >
                    {visibleTabs.map((tab, index) => {
                      const icon = getTabIcon(tab.fullName) // Use fullName for icons
                      return (
                        <TabPanel
                          key={`tab-${index}-${tab.path}`}
                          header={
                            <div className="footer-tabsec">
                              <i className={`pi ${icon} me-1`}></i>
                              <span>{tab.name}</span>{" "}
                              {/* Display name without unwanted words */}
                              {index !== 0 && (
                                <Button
                                  icon="pi pi-times"
                                  className="p-button-text p-button-sm"
                                  onClick={e => {
                                    e.stopPropagation()
                                    removeTab(index)
                                  }}
                                />
                              )}
                            </div>
                          }
                        >
                          <p className="m-0">Content for {tab.name}</p>
                        </TabPanel>
                      )
                    })}

                    {/* Dropdown tab - only show if we have more tabs than MAX_VISIBLE_TABS */}
                    {hasDropdownTabs && (
                      <TabPanel
                        key="more-tabs-dropdown"
                        header={
                          <div className="footer-tabsec dropdown-tab drop-in d-flex align-items-center justify-content-center">
                            <i
                              className="pi pi-ellipsis-h me-1"
                              onClick={e => {
                                e.stopPropagation()
                                if (menuRef.current) {
                                  menuRef.current.toggle(e)
                                }
                              }}
                            ></i>
                            {/* <span>More Tabs</span> */}
                            {/* <Button
                              icon="pi pi-bars"
                              className="p-button-text p-button-sm"
                              onClick={e => {
                                e.stopPropagation()
                                if (menuRef.current) {
                                  menuRef.current.toggle(e)
                                }
                              }}
                            /> */}
                          </div>
                        }
                      >
                        <p className="m-0">
                          Select a tab from the dropdown menu
                        </p>
                      </TabPanel>
                    )}
                  </TabView>

                  {/* Dropdown menu for additional tabs */}

                  <Menu
                    model={getDropdownItems()}
                    popup
                    ref={menuRef}
                    className="tabs-dropdown-menu"
                    template={(item, options) => (
                      <div
                        className={options.className}
                        style={options.style}
                        onClick={options.onClick}
                      >
                        <i
                          className={`${item.icon} ms-2`} 
                          style={{ color: "black" }} 
                        ></i>
                        <span className="p-menuitem-text">{item.label}</span>
                      </div>
                    )}
                  />

                </div>
              </div>
            </Col>

            {/* PickList Section */}

            {/* <Col xl={4} className="d-flex justify-content-end">
  <Paginator
    first={first}
    rows={rows}
    totalRecords={totalRecords}
    rowsPerPageOptions={[5, 10, 25, 50]}
    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
    className="paginator-custom pagination-border"
  />
</Col> */}

            <Col xl={3} className="disply-desk">
              <div className="pagination-borleft">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  className="paginator-custom pagination-border"
                  onPageChange={onPageChange}
                />
              </div>
            </Col>
          </Row>

          {/* <Button
            label="Show"
            icon="pi pi-external-link"
            
          /> */}
        </Container>

        <Dialog
          header="WorkType Field List"
          visible={pick}
          onHide={() => setPick(false)}
          style={{ width: "70vw" }}
          breakpoints={{ "960px": "85vw", "641px": "100vw" }}
          className="footer-popup"
        >
          <div className="card">
            

            <PickList
              dataKey="id"
              source={source}
              target={target}
              onChange={onChange}
              itemTemplate={itemTemplate}
              filter
              filterBy="name"
              breakpoint="1280px"
              sourceHeader={`Available Fields (${source.length})`}
              targetHeader={`Selected Fields (${target.length})`}
              sourceStyle={{ height: "28rem" }}
              targetStyle={{ height: "28rem" }}
              sourceFilterPlaceholder="Search available fields..."
              targetFilterPlaceholder="Search selected fields..."
              showSourceControls={true}
              showTargetControls={true}
              metaKeySelection={false}
            />
            
            {target.length === 0 && (
              <div className="mt-2 p-2 bg-warning-subtle text-warning rounded">
                <i className="pi pi-exclamation-triangle me-2"></i>
                <strong>Warning:</strong> No columns selected. Please select at least one column to display data.
              </div>
            )}
          </div>

          <div className="row mt-3">

<div className="col-xl-6">
            <div className="mb-0">
              <div className="row">
               </div>
                <div className="col-md-6 d-flex justify-content-between align-items-center">
                  <div className="p-3 ">
                    
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={handleResetColumns}
                      >
                        <i className="pi pi-refresh me-1"></i>
                        Reset to Default
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={() => {
                          setTarget(availableWorkTypeColumns)
                          setSource([])
                        }}
                      >
                        <i className="pi pi-check-square me-1"></i>
                        Select All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="d-flex justify-content-end align-items-center">
                {/* <div className="text-muted small">
                  <i className="pi pi-list me-1"></i>
                  Selected columns will be applied to the WorkType table
                </div> */}
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary waves-effect waves-light"
                    onClick={() => setPick(false)}
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light btn-main"
                    onClick={handleSaveColumns}
                    disabled={target.length === 0}
                  >
                    <i className="pi pi-save me-1"></i>
                    Save & Apply ({target.length} columns)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </footer>
    </React.Fragment>
  )
}

export default Footer
