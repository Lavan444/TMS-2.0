import PropTypes from "prop-types"
import React, { useEffect, useCallback, useRef, useState } from "react"

// Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/common/withRouter"
import { Link, useLocation } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { Tooltip } from "primereact/tooltip"

const SidebarContent = props => {
  const location = useLocation()
  const ref = useRef()
  const path = location.pathname
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Initial menu structure
  const [menuItems, setMenuItems] = useState([
    {
      id: 'analytics',
      title: 'Analytics Management',
      icon: 'pi pi-chart-bar',
      order: 1,
      subItems: [
        { id: 'dashboards', title: 'Dashboards', route: '/manager-dashboard' },
        // {
        //   id: 'project-health',
        //   title: 'Project Health Monitoring',
        //   subItems: [
        //     { id: 'delivery-dates', title: 'Delivery Dates', route: '/delivery-dates' },
        //     { id: 'delays', title: 'Delay', route: '/delays' },
        //     { id: 'gaps', title: 'Gaps', route: '/gaps' }
        //   ]
        // },
        {
          id: 'reports',
          title: 'Reports',
          subItems: [
            // { id: 'recruiter-report', title: 'Recruiter Performance Report', route: '/recruiter-performance-report' },
            // { id: 'active-job-summary', title: 'Active Job Summary Report', route: '/activejob-summary' },
            // { id: 'time-to-hire', title: 'Time to Hire Report', route: '/time-to-hire' },
            // { id: 'placement-report', title: 'Placement Report', route: '/placement-report' },
            // { id: 'call-report', title: 'Call Report', route: '/call-report' },
            // { id: 'source-performance', title: 'Source Performance Report', route: '/source-performance-report' },
            // { id: 'pipeline-report', title: 'My Pipeline Report', route: '/pipeline-report' },
            // { id: 'my-placement-report', title: 'My Placement Report', route: '/my-placement-report' },
            { id: 'project-status', title: 'Project Status', route: '/project-status'},
            { id: 'project-status', title: 'Project Phases Report', route: '/project-phases-report' },
            { id: 'project-status', title: 'Resource Utilization', route: '/resource-utilization' },
            { id: 'work-type-report', title: 'Work Type Report', route: '/work-type-report' },
            { id: 'weekly-report', title: 'Weekly Report', route: '/weekly-report' },
            { id: 'daily-report', title: 'Daily Report', route: '/daily-report' },
          ]
        }
      ]
    },
    {
      id: 'project',
      title: 'Project Management',
      icon: 'pi pi-folder',
      order: 2,
      subItems: [
        {
          id: 'projects',
          title: 'Projects',
          subItems: [
            { id: 'all-active-jobs', title: 'All Active', route: '/allactive-jobs' },
            { id: 'my-active-jobs', title: 'My Active', disabled: true },
            { id: 'assigned-to-me', title: 'Assigned to Me', disabled: true },
            { id: 'all-closed', title: 'All Closed', disabled: true },
            { id: 'archived-jobs', title: 'Archived', disabled: true }
          ]
        },
        {
          id: 'work-type',
          title: 'Work Type',
          subItems: [
            { id: 'all-active-candidates', title: 'All Active', route: '/allactive-candidates' , },
            { id: 'my-active-candidates', title: 'My Active', route: '/myactive-candidates', disabled: true },
            { id: 'todo-list', title: 'To Do List', route: '/candidates-tasklist' , disabled: true},
            // { id: 'added-by-me', title: 'Added by Me', route: '/candidates-added' },
            // { id: 'opened-by-me', title: 'Opened by Me', route: '/candidates-opened' },
            { id: 'archived-candidates', title: 'Archived', route: '/candidates-archived', disabled: true }
          ]
        }
      ]
    },
    {
      id: 'customer',
      title: 'Customer Management',
      icon: 'pi pi-users',
      order: 3,
      subItems: [
        {
          id: 'companies',
          title: 'Companies',
          subItems: [
            { id: 'all-active-companies', title: 'All Active', route: '/companies-allactive' },
            { id: 'my-active-companies', title: 'My Active', route: '/companies-myactive', disabled: true },
            { id: 'companies-todo', title: 'To Do List', route: '/companies-tasklist' , disabled: true},
            { id: 'companies-activity', title: 'Activity Log', route: '/companies-activity', disabled: true },
            { id: 'companies-archived', title: 'Archived', route: '/companies-archived', disabled: true },
            { id: 'companies-duplicate', title: 'Duplicate List', route: '/companies-duplicatelist' , disabled: true}
          ]
        },
        {
          id: 'contacts',
          title: 'Contacts',
          subItems: [
            { id: 'all-active-contacts', title: 'All Active', route: '/contacts-allactive' },
            { id: 'my-active-contacts', title: 'My Active', route: '/contacts-myactive', disabled: true },
            { id: 'contacts-task', title: 'Task List', route: '/contacts-tasklist', disabled: true },
            { id: 'contacts-activity-log', title: 'Activity Log', route: '/contacts-activity', disabled: true },
            { id: 'contacts-archived', title: 'Archived', route: '/contacts-archived', disabled: true },
            { id: 'contacts-duplicate', title: 'Duplicate List', route: '/contacts-duplicate', disabled: true }
          ]
        }
      ]
    },
    {
      id: 'team',
      title: 'Team Management',
      icon: 'pi pi-user-plus',
      order: 4,
      subItems: [
        {
          id: 'employees',
          title: 'Employees',
          subItems: [
            { id: 'all-active-employees', title: 'All Active', route: '/allactive-employees' },
            { id: 'my-active-employees', title: 'My Active', route: '/myactive-employees', disabled: true },
            { id: 'employees-todo', title: 'To Do List', route: '/todolist-employees' , disabled: true},
            // { id: 'employees-added', title: 'Added by Me', route: '/added-employees' },
            // { id: 'employees-opened', title: 'Opened by Me', route: '/opened-employees' },
            { id: 'employees-archived', title: 'Archived', route: '/archived-employees', disabled: true  }
          ]
        },
        { id: 'timesheet', title: 'Time Sheet', route: '/timesheet' },
        { id: 'kpi-performance', title: 'KPI Tracking', route: '/kpi-tracking' },
        { id: 'kpi-performance', title: 'KPI Performance', route: '/kpi-performance' }
      ]
    },
    {
      id: 'schedule',
      title: 'Schedule & Communication',
      icon: 'pi pi-calendar',
      order: 5,
      subItems: [
        { id: 'scheduling', title: 'Scheduling', route: '/calendar-active' },
        {
          id: 'email-sms',
          title: 'Email/SMS',
          subItems: [
            { id: 'sent-emails', title: 'Sent Emails', route: '/sentemails' },
            { id: 'outbox', title: 'OutBox', route: '/outbox' }
          ]
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management & Settings',
      icon: 'pi pi-cog',
      order: 6,
      subItems: [
        { id: 'users', title: 'Users', route: '/admin-dashboard?selectedTab=0' },
        { id: 'roles', title: 'Roles', route: '/admin-dashboard?selectedTab=0' },
        { id: 'privileges', title: 'Privileges', route: '/' },
        { id: 'master-data', title: 'Master Data', route: '/' },
        { id: 'lookups', title: 'Lookups', route: '/admin-dashboard?selectedTab=2' },
        { id: 'my-profile', title: 'My Profile', route: '/admin-dashboard?selectedTab=3' },
        { id: 'help-support', title: 'Help and Support', route: '/' }
      ]
    }
  ])

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
        parent2.classList.add("mm-show")

        const parent3 = parent2.parentElement
        if (parent3) {
          parent3.classList.add("mm-active")
          parent3.childNodes[0].classList.add("mm-active")
          const parent4 = parent3.parentElement
          if (parent4) {
            parent4.classList.add("mm-show")
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show")
              parent5.childNodes[0].classList.add("mm-active")
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
            parent3.classList.remove("mm-active")
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement
            if (parent4) {
              parent4.classList.remove("mm-show")
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show")
                parent5.childNodes[0].classList.remove("mm-active")
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

  // Drag and Drop Functions
  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e, item) => {
    e.preventDefault()
    setDragOverItem(item)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    // Only clear dragOverItem if we're leaving the container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverItem(null)
    }
  }

  const handleDrop = (e, targetItem) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      return
    }

    const newMenuItems = [...menuItems]
    const draggedIndex = newMenuItems.findIndex(item => item.id === draggedItem.id)
    const targetIndex = newMenuItems.findIndex(item => item.id === targetItem.id)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove dragged item
      const [removed] = newMenuItems.splice(draggedIndex, 1)
      // Insert at target position
      newMenuItems.splice(targetIndex, 0, removed)
      
      // Update order values
      newMenuItems.forEach((item, index) => {
        item.order = index + 1
      })
      
      setMenuItems(newMenuItems)
    }

    setDraggedItem(null)
    setDragOverItem(null)
  }

  // Collapse/Expand all dropdowns
  const handleCollapseAll = () => {
    const menu = document.getElementById("side-menu");
    if (!menu) return;
    const subMenus = menu.querySelectorAll(".sub-menu");
    const parentLis = menu.querySelectorAll("li");

    if (!allCollapsed) {
      // Collapse all
      subMenus.forEach(ul => ul.classList.remove("mm-show"));
      parentLis.forEach(li => li.classList.remove("mm-active"));
    } else {
      // Expand all, but do NOT add mm-active (so text is not bold)
      subMenus.forEach(ul => ul.classList.add("mm-show"));
      parentLis.forEach(li => li.classList.remove("mm-active"));
    }
    setAllCollapsed(!allCollapsed);
  };

  // Render sub-menu items recursively
  const renderSubMenuItems = (items) => {
    return items.map(item => (
      <li key={item.id}>
        {item.disabled ? (
          <span 
            style={{
              color: '#999',
              opacity: '0.6',
              display: 'block',
              textDecoration: 'none',
              padding: '0.4rem 1.5rem 0.4rem 4.5rem',
              fontSize: '13.5px',
            }}
            className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
            title={`${item.title} (Coming Soon)`}
          >
            {props.t(item.title)}
          </span>
        ) : item.route ? (
          <Link to={item.route}>
            <span
              className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
              title={item.title}
            >
              {props.t(item.title)}
            </span>
          </Link>
        ) : (
          <>
            <Link to="/#" className="has-arrow">
              <span
                className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
                title={item.title}
              >
                {props.t(item.title)}
              </span>
            </Link>
            {item.subItems && (
              <ul className="sub-menu" aria-expanded="false">
                {renderSubMenuItems(item.subItems)}
              </ul>
            )}
          </>
        )}
      </li>
    ))
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <SimpleBar style={{ flex: 1, maxHeight: 'calc(100vh - 120px)' }} ref={ref}>
          <Tooltip target=".sidebar-ellipsis" position="top" />
          {/* Collapse/Expand All Button */}


          

        
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              {menuItems.map((menuItem) => (
                <li
                  key={menuItem.id}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, menuItem)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, menuItem)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, menuItem)}
                  style={{
                    cursor: 'move',
                    backgroundColor: dragOverItem?.id === menuItem.id ? 'rgba(0, 122, 217, 0.1)' : 'transparent',
                    borderRadius: '4px',
                    margin: '2px 0',
                    transition: 'all 0.2s ease'
                  }}
                  className={draggedItem?.id === menuItem.id ? 'dragging' : ''}
                >
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className={menuItem.icon}></i>
                    <span
                      className="sidebar-ellipsis"
                      data-pr-tooltip={props.t(menuItem.title)}
                    >
                      {props.t(menuItem.title)}
                    </span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    {renderSubMenuItems(menuItem.subItems)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </SimpleBar>
        
        {/* Fixed User Profile Section */}
        <div className="sidebar-user-profile" style={{
          position: 'sticky',
          bottom: 0,
          background: '#f6f8fc',
          padding: '10px 15px',
          // borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1000,
        }}>

          <div className="d-flex justify-content-end" style={{ padding: "0px" }}>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary w-auto"
              onClick={handleCollapseAll}
               data-pr-tooltip={allCollapsed ? "Expand All" : "Collapse All"}
    id="collapse-expand-btn"
            >
              {/* {allCollapsed ? "Expand All" : "Collapse All"} */}
              <i className={`pi ${allCollapsed ? "pi-chevron-down" : "pi-chevron-up"} `}></i>
            </button>
             <Tooltip target="#collapse-expand-btn" position="top" />
          </div>
          
          <div className="user-profile-container">
            <div 
              className="user-profile-header"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '9px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                backgroundColor: profileDropdownOpen ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
            >
              <div className="user-avatar" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(90deg, #0e527d, #1a87cb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                marginRight: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}>
                MK
              </div>
              <div className="user-info" style={{ flex: 1, color: 'white' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px', color: '#000' }}>
                  Mahesh Kumar
                </div>
                <div style={{ fontSize: '12px', opacity: '0.8', color: '#000' }}>
                  Manager
                </div>
              </div>
              <i className={`pi ${profileDropdownOpen ? 'pi-chevron-up' : 'pi-chevron-down'}`} 
                 style={{ color: '#000', fontSize: '12px' }}></i>
            </div>
            
            {/* Advanced Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="profile-dropdown" style={{
                marginTop: '10px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                animation: 'slideDown 0.3s ease'
              }}>
                <div className="profile-dropdown-header" style={{
                  textAlign: 'center',
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div className="large-avatar" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #0e527d, #1a87cb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    margin: '0 auto 10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    MK
                  </div>
                  <h6 style={{ margin: '0 0 5px', color: '#333', fontWeight: '600' }}>Mahesh Kumar</h6>
                  <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>mahesh@vdm.com</p>
                </div>
                
                <div className="profile-stats" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#007ad9' }}>12</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>Active Projects</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>98%</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>Completion Rate</div>
                  </div>
                </div>
                
                <div className="profile-actions">
                  <Link to="/admin-dashboard?selectedTab=3" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginBottom: '5px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#333',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="pi pi-user" style={{ marginRight: '8px', color: '#007ad9' }}></i>
                    View Profile
                  </Link>
                  
                  <Link to="/settings" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginBottom: '5px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#333',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="pi pi-cog" style={{ marginRight: '8px', color: '#6c757d' }}></i>
                    Settings
                  </Link>
                  
                  <div style={{
                    height: '1px',
                    background: '#eee',
                    margin: '10px 0'
                  }}></div>
                  
                  <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#dc3545',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#fff5f5'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="pi pi-sign-out" style={{ marginRight: '8px' }}></i>
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .dragging {
          opacity: 0.5 !important;
        }
        
        li[draggable="true"]:hover {
          background-color: rgba(0, 122, 217, 0.05);
        }
        
        li[draggable="true"] {
          position: relative;
        }
        
        li[draggable="true"]:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.2s ease;
        }
        
        li[draggable="true"]:hover:before {
          background: #007ad9;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
          .user-profile-header{
            background-color: #d3e3fd !important;
          }
        
        .user-profile-header:hover {
          background-color: rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))