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

  // pick list start

  const [pick, setPick] = useState(false)

  const dummyData = [
    { id: 1, name: "First name" },
    { id: 2, name: "Last name" },
    { id: 3, name: "Company" },
    { id: 4, name: "Job Title" },
    { id: 5, name: "Status" },
    { id: 6, name: "Primary Skills" },
    { id: 7, name: "Secondary Skills" },
    { id: 8, name: "Other Skills" },
    { id: 9, name: "Email 1" },
    { id: 10, name: "Attachment" },
    { id: 11, name: "Email 2" },
    { id: 12, name: "Work Phone" },
    { id: 13, name: "Mobile Phone" },
    { id: 14, name: "Address" },
    { id: 15, name: "LinkedIn URL" },
    { id: 16, name: "Facebook URL" },
    { id: 17, name: "X URL" },
    { id: 18, name: "Indeed URL" },
    { id: 19, name: "Source" },
    { id: 20, name: "Relocation" },
    { id: 21, name: "Availability Date" },
    { id: 22, name: "DoB" },
    { id: 23, name: "Referred By" },
    { id: 24, name: "Categories" },
    { id: 25, name: "Groups" },
    { id: 26, name: "Candidate Submitted Resume" },
    { id: 27, name: "Type" },
    { id: 28, name: "Subject" },
  ]

  const [source, setSource] = useState(dummyData)
  const [target, setTarget] = useState([])

  const onChange = event => {
    setSource(event.source)
    setTarget(event.target)
  }

  const itemTemplate = item => (
    <div className="flex flex-wrap p-2 align-items-center gap-3">
      <div className="flex-1 flex flex-column gap-2">
        <span>{item.name}</span>
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

    // Candidates - all use same icon (different from Contacts)
    Candidates: PrimeIcons.USER_EDIT,
    "Candidates All": PrimeIcons.USER_EDIT,
    "Candidates All Active": PrimeIcons.USER_EDIT,
    "Candidates My Active": PrimeIcons.USER_EDIT,
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
          /\b(Candidates|Contacts|Jobs|Recruiter|Companies|Calendar|Emails|Dashboard)\b/gi,
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
    "Candidates",
    "Jobs",
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
    if (tab.includes("candidates")) return PrimeIcons.USERS
    if (tab.includes("contacts")) return PrimeIcons.ADDRESS_BOOK
    if (tab.includes("jobs")) return PrimeIcons.BRIEFCASE
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
                  content="Field List"
                  position="bottom"
                  style={{ marginTop: "5px" }}
                />
                <span
                  className="gear-picklist gear"
                  onClick={() => setPick(true)}
                  title="Candidate Field List"
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
          header="Candidate Field List"
          visible={pick}
          onHide={() => setPick(false)}
          style={{ width: "60vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
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
              sourceHeader="Available Fields"
              targetHeader="Selected Fields"
              sourceStyle={{ height: "24rem" }}
              targetStyle={{ height: "24rem" }}
              sourceFilterPlaceholder="Search..."
              targetFilterPlaceholder="Search..."
            />
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light me-2 btn-main"
                  onClick={() => setPick(false)}
                >
                  <i className="pi pi-save me-1"></i>Save
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </footer>
    </React.Fragment>
  )
}

export default Footer
