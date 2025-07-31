import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  BreadcrumbItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import LinearDemo from "pages/Tables/LinearDemo"
import ProductsDemo from "pages/Tables/ProductsDemo"

const Breadcrumb = props => {
  const [setting_Menu, setsetting_Menu] = useState(false)
  const [settingMenu, setSettingMenu] = useState(false)
  // State for the first dropdown
  const [candidateOption, setCandidateOption] = useState("Add as a Candidate")
  const [dropdown1Open, setDropdown1Open] = useState(false)
  // State for the second dropdown
  const [emailOption, setEmailOption] = useState("Email")
  const [dropdown2Open, setDropdown2Open] = useState(false)

  const [smsOption, setSmsOption] = useState("SMS")
  const [dropdown3Open, setDropdown3Open] = useState(false)

  const [moreOption, setmoreOption] = useState("More..")
  const [dropdown4Open, setDropdown4Open] = useState(false)

  // Handlers for each dropdown
  const handleCandidateSelect = option => setCandidateOption(option)
  const handleEmailSelect = option => setEmailOption(option)
  const handleSmsSelect = option => setSmsOption(option)
  const handlemoreSelect = option => setmoreOption(option)

  return (
    <Row className="align-items-center pt-3 pb-3 breadcrumb-card">
      <Col sm={6}>
        <div className="d-none d-md-block">
          <Dropdown
            isOpen={setting_Menu}
            toggle={() => {
              setsetting_Menu(!setting_Menu)
            }}
             className="inline-dropdown"
          >
            <DropdownToggle color="primary" className="main-btn dropdown-toggle waves-effect waves-light">
            <i class="fa-regular fa-user me-1"></i> Add as a Candidate <i class="ion ion-md-arrow-dropdown ms-2"></i>
            </DropdownToggle>
            <DropdownMenu start>
              <DropdownItem tag="a" href="#">Action</DropdownItem>
              <DropdownItem tag="a" href="#">Another action</DropdownItem>
              <DropdownItem tag="a" href="#">Something else here</DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag="a" href="#">Separated link</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* <ProductsDemo/> */}

          {/* Second Dropdown */}
          <Dropdown
            isOpen={dropdown2Open}
            toggle={() => setDropdown2Open(!dropdown2Open)}
            className="inline-dropdown"
          >
            <DropdownToggle
              color="primary"
              className="btn btn-secondary dropdown-toggle waves-effect waves-light add-pad"
            >
              <i className="fa-regular fa-envelope me-1"></i> {emailOption}{" "}
              <i className="ion ion-md-arrow-dropdown ms-2"></i>
            </DropdownToggle>
            <DropdownMenu start>
              <DropdownItem onClick={() => handleEmailSelect("Action 2")}>
                Action 2
              </DropdownItem>
              <DropdownItem onClick={() => handleEmailSelect("Another action")}>
                Another action
              </DropdownItem>
              <DropdownItem
                onClick={() => handleEmailSelect("Something else here")}
              >
                Something else here
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleEmailSelect("Separated link")}>
                Separated link
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* Third Dropdown */}
          <Dropdown
            isOpen={dropdown3Open}
            toggle={() => setDropdown3Open(!dropdown3Open)}
            className="inline-dropdown"
          >
            <DropdownToggle
              color="primary"
              className="btn btn-secondary dropdown-toggle waves-effect waves-light add-pad"
            >
              <i className="fa-regular fa-message me-1"></i> {smsOption}{" "}
              <i className="ion ion-md-arrow-dropdown ms-2"></i>
            </DropdownToggle>
            <DropdownMenu start>
              <DropdownItem onClick={() => handleSmsSelect("Action 3")}>
                Action 3
              </DropdownItem>
              <DropdownItem onClick={() => handleSmsSelect("Another action")}>
                Another action
              </DropdownItem>
              <DropdownItem
                onClick={() => handleSmsSelect("Something else here")}
              >
                Something else here
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleSmsSelect("Separated link")}>
                Separated link
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown
            isOpen={dropdown4Open}
            toggle={() => setDropdown4Open(!dropdown4Open)}
            className="inline-dropdown"
          >
            <DropdownToggle
              color="primary"
              className="btn btn-secondary dropdown-toggle waves-effect waves-light add-pad"
            >
               {moreOption}{" "}
              <i className="ion ion-md-arrow-dropdown ms-2"></i>
            </DropdownToggle>
            <DropdownMenu start>
              <DropdownItem onClick={() => handlemoreSelect("Submit Candidate")}>
              <i className="fa-regular fa-message me-1"></i>Submit Candidate
              </DropdownItem>
              <DropdownItem onClick={() => handlemoreSelect("Link")}>
              Link
              </DropdownItem>
              <DropdownItem
                onClick={() => handlemoreSelect("Merge Duplicates")}
              >
                Merge Duplicates
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handlemoreSelect("Delete")}>
              Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>


          {/* <button
            type="button"
            class="btn btn-secondary waves-effect"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-placement="top"
            data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
          >
           <i className="mdi mdi-cog me-1"></i> Add as a Candidate <i class="ion ion-md-arrow-dropdown ms-2"></i>
          </button> */}
          {/* <button
            type="button"
            class="btn btn-secondary waves-effect ms-1"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-placement="top"
            data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
          >
           <i class="ion ion-md-basket me-1"></i> Email<i class="ion ion-md-arrow-dropdown ms-2"></i>
          </button>
          <button
            type="button"
            class="btn btn-secondary waves-effect ms-1"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-placement="top"
            data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
          >
            <i class="ion ion-md-mail me-1"></i> Add candidiate to the list <i class="ion ion-md-arrow-dropdown ms-2"></i>
          </button> */}
        </div>
        {/* <div className="page-title-box">
          <h4 className="font-size-18">{props.breadcrumbItem}</h4>
          <ol className="breadcrumb mb-0">
            {
              (props.maintitle) ?
            <>
            <BreadcrumbItem>
              <Link to="/#">{props.maintitle}</Link>
            </BreadcrumbItem>
            </> : ''
            }
            <BreadcrumbItem>
              <Link to="/#">{props.title}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {props.breadcrumbItem}
            </BreadcrumbItem>
          </ol>
        </div> */}
      </Col>

      <Col sm={5}>
        <div className="float-end right-btn">
          <button
            type="button"
            class="btn btn-secondary import-res-btn waves-effect ms-1"
            className="mainbtn"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-placement="top"
            data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
          >
            <i class="mdi mdi-export-variant"></i> Import Resume
          </button>

          <button
            type="button"
            class="btn btn-secondary import-res-btn waves-effect ms-1"
            className="mainbtn"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-placement="top"
            data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
          >
            <i class="fa-solid fa-xmark"></i> Clear Search
          </button>
          {/* <ProductsDemo/> */}

        </div>
      </Col>

      <Col sm={1}>
        <div className="d-flex justify-content-start">
          <LinearDemo />
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
}

export default Breadcrumb
