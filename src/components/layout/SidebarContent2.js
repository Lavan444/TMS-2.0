import PropTypes from "prop-types"
import React, { useEffect, useCallback, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/common/withRouter"
import { Link, useLocation } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"



const SidebarContent = props => {
  const location = useLocation()
  const ref = useRef()
  const path = location.pathname

  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const activeMenu = useCallback(() => {
    const pathName = location.pathname
    const fullPath = pathName
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="pi pi-chart-bar"></i>

                <span>{props.t("Dashboards")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li >
                  <Link to="/manager-dashboard">{props.t("Manager Dashboard")}</Link>
                </li>
                <li>
                  <Link className="disabled" to="/recruiter-dashboard">{props.t("Employee Dashboard")} </Link>
                </li>
              </ul>
            </li>



            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="pi pi-chart-line"></i>

                <span>{props.t("Reports")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/recruiter-performance-report">{props.t("Recruiter Performance Report")}</Link>
                </li>
                <li>
                  <Link to="/activejob-summary">{props.t("Active Job Summary Report")}</Link>
                </li>
                <li>
                  <Link to="/time-to-hire">{props.t("Time to Hire Report")}</Link>
                </li>
                <li>
                  <Link to="/placement-report">{props.t("Placement Report")}</Link>
                </li>
                <li>
                  <Link to="/call-report">{props.t("Call Report")}</Link>
                </li>
                <li>
                  <Link to="/source-performance-report">{props.t("Source Performance Report")}</Link>
                </li>
                <li>
                  <Link to="/pipeline-report">{props.t("My Pipeline Report")}</Link>
                </li>
                <li>
                  <Link to="/my-placement-report">{props.t("My Placement Report")}</Link>
                </li>
                {/* <li>
                  <Link to="/ui-modals">{props.t("Weekly Status Report")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li> */}
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="pi pi-folder"></i>
                <span>{props.t("Projects")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/allactive-jobs">{props.t("All Active")}</Link>
                </li>
                <li>
                  <Link to="/myactive-jobs">{props.t("My Active")}</Link>
                </li>
                <li>
                  <Link to="/addedbyme-jobs">{props.t("Added by Me")}</Link>
                </li>
                <li>
                  <Link to="/assignedtome-jobs">{props.t("Assigned to Me")}</Link>
                </li>
                <li>
                  <Link to="/joballclosed-jobs">{props.t("All Closed")}</Link>
                </li>
                <li>
                  <Link to="/jobactivitylog-jobs">{props.t("Activity Log")}</Link>
                </li>
                <li>
                  <Link to="/jobarchived-jobs">{props.t("Archived")}</Link>
                </li>
              </ul>
            </li>




            <li>
              <Link to="/#" className="has-arrow waves-effect">
              <i className="pi pi-check-square"></i>
                <span>{props.t("Work Type")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">

                <li>
                  <Link to="/allactive-candidates">{props.t("All Active")}</Link>
                </li>
                <li>
                  <Link to="/myactive-candidates">{props.t("My Active")}</Link>
                </li>
                <li>
                  <Link to="/candidates-tasklist">{props.t("To Do List")}</Link>
                </li>
                <li>
                  <Link to="/candidates-added">
                    {props.t("Added by Me")}
                  </Link>
                </li><li>
                  <Link to="/candidates-opened">
                    {props.t("Opened by Me")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/candidates-activity">
                    {props.t("Activity Log")}
                  </Link>
                </li> */}
                <li>
                  <Link to="/candidates-archived">
                    {props.t("Archived")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/candidates-pool">
                    {props.t("Candidate Pool")}
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/candidates-duplicate">
                    {props.t("Check Duplicate")}
                  </Link>
                </li> */}
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="pi pi-sitemap"></i>
                <span>{props.t("Work Type Pipeline")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/Kanbanview">{props.t("Kanban View")}</Link>
                </li>
                <li>
                  <Link to="/tableview">{props.t("Table View")}</Link>
                </li>
              </ul>
            </li>

            
            <li>
              <Link to="/#" className="has-arrow waves-effect">
              <i className="pi pi-users"></i>
                <span>{props.t("Employees")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">

                <li>
                  <Link to="/allactive-employees">{props.t("All Active")}</Link>
                </li>
                <li>
                  <Link to="/myactive-employees">{props.t("My Active")}</Link>
                </li>
                <li>
                  <Link to="/todolist-employees">{props.t("To Do List")}</Link>
                </li>
                <li>
                  <Link to="/added-employees">
                    {props.t("Added by Me")}
                  </Link>
                </li><li>
                  <Link to="/opened-employees">
                    {props.t("Opened by Me")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/candidates-activity">
                    {props.t("Activity Log")}
                  </Link>
                </li> */}
                <li>
                  <Link to="/archived-employees">
                    {props.t("Archived")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/candidates-pool">
                    {props.t("Candidate Pool")}
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/candidates-duplicate">
                    {props.t("Check Duplicate")}
                  </Link>
                </li> */}
              </ul>
            </li>

             <li>
              <Link to="/timesheet" className="">
              <i className="pi pi-clock"></i>
                <span>{props.t("Time Sheet")}</span>
              </Link>
             
            </li>


            <li>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="pi pi-building"></i>
                <span>{props.t("Companies")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">

                <li>
                  <Link to="/companies-allactive">{props.t("All Active")}</Link>
                </li>

                <li>
                  <Link to="/companies-myactive">{props.t("My Active")}</Link>
                </li>

                <li>
                  <Link to="/companies-tasklist">{props.t("To Do List")}</Link>
                </li>

                <li>
                  <Link to="/companies-activity">{props.t("Activity Log")}</Link>
                </li>

                <li>
                  <Link to="/companies-archived">{props.t("Archived")}</Link>
                </li>

                <li>
                  <Link to="/companies-duplicatelist">
                    {props.t("Duplicate List")}
                  </Link>
                </li>

              </ul>
            </li>



            <li>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="pi pi-address-book"></i>
                <span>{props.t("Contacts")}</span>

              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/contacts-allactive">{props.t("All Active")}</Link>
                </li>
                <li>
                  <Link to="/contacts-myactive">{props.t("My Active")} </Link>
                </li>
                <li>
                  <Link to="/contacts-tasklist">{props.t("Task List")}</Link>
                </li>
                <li>
                  <Link to="/contacts-activity">{props.t("Activity Log")} </Link>
                </li>

                <li>
                  <Link to="/contacts-archived">{props.t("Archived")}</Link>
                </li>
                <li>
                  <Link to="/contacts-duplicate">
                    {props.t("Duplicate List")}
                  </Link>
                </li>
              </ul>
            </li>


            <li>
              <Link to="/activeemployees" className="has-arrow waves-effect">
                <i className="pi pi-calendar"></i>
                <span>{props.t("Calendar")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/calendar-active">{props.t("Active")}</Link>
                </li>
                <li>
                  <Link to="/calendar-all">{props.t("All")} </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="pi pi-envelope"></i>
                <span>{props.t("Emails")}</span>

              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/sentemails">{props.t("Sent Emails")}</Link>
                </li>
                <li>
                  <Link to="/outbox">{props.t("OutBox")} </Link>
                </li>

              </ul>
            </li>

            {/* <li>
              <Link to="/#" className="waves-effect">
                <i className="pi pi-user-plus"></i>
                <span>{props.t("OnBoarding")}</span>

              </Link>
            </li> */}



            <li>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="pi pi-cog"></i>
                <span> {props.t("Admin Module")} </span>
              </Link>
              <ul className="sub-menu">
                
                <li>
                  <Link to="/admin-dashboard?selectedTab=0">{props.t("User Permissions")}</Link>
                </li>
                <li>
                  <Link to="/admin-dashboard?selectedTab=1">{props.t("Settings")}</Link>
                </li>
                <li>
                  <Link to="/admin-dashboard?selectedTab=2">{props.t("Lookup Customization")}</Link>
                </li>
              </ul>
            </li>


          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
