import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Form, DropdownMenu, DropdownItem, DropdownToggle, Input, Button, Container, Row, Col, Card, CardBody } from "reactstrap";

import { Link } from "react-router-dom";
import { Dialog } from 'primereact/dialog';

import { Dropdown } from 'primereact/dropdown';

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/topbar-dropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/topbar-dropdown/NotificationDropdown";
import HelpMenu from "../CommonForBoth/topbar-dropdown/HelpMenu";
import NotificationDropdown3 from "../CommonForBoth/topbar-dropdown/NotificationDropdown3";
import ProfileMenu from "../CommonForBoth/topbar-dropdown/ProfileMenu";

import AtsImg from "../../assets/images/ats-logo2.png";
import { InputText } from "primereact/inputtext";
import AddMenu from 'components/CommonForBoth/topbar-dropdown/AddMenu';

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
import ReminderPopup from 'pms/common-for-all/ReminderPopup';
import CreateShortform from 'pms/common-for-all/CreateShortform';

const Header = props => {

  // Advanced search start

  const [advansearch, setAdvansearch] = useState(false);
  const [popAdvance, setPopAdvance] = useState(null);
  const searchpopup = [
    { name: 'Resumes', code: 'resume' },
    { name: 'Job Titles', code: 'job' },
    { name: 'Primary Skills', code: 'primary' },
    { name: 'Secondary Skills', code: 'secondary' },
    { name: 'Notes', code: 'notes' },
  ];

  const [fields, setFields] = useState([]);

  const dropdownOptions = [
    { label: "City", value: "city" },
    { label: "Company", value: "company" },
    { label: "Primary Skill", value: "primary skill" },
    { label: "Postal Code", value: "postal code" },
    { label: "Job Title", value: "job title" },
  ];

  const handleAddField = () => {
    setFields([...fields, { id: Date.now(), value: null }]);
  };

  const handleFieldChange = (id, value) => {
    setFields(fields.map(field => (field.id === id ? { ...field, value } : field)));
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  // Advanced search end

  const [menu, setMenu] = useState(false);
  const [candidateOption, setCandidateOption] = useState("Select Option");
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [toggleChange, setToggleChange] = useState(false);
  const handleCandidateSelect = (option) => setCandidateOption(option);

  const [formValues, setFormValues] = useState({
    from: " ",
    to: " ",
    subject: " ",
    hasWords: " ",
    doesntHave: " ",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with Values:", formValues);
  };

  const [search, setsearch] = useState(false);
  const [singlebtn, setSinglebtn] = useState(false);
  const [showCreateShortform, setShowCreateShortform] = useState(false);


  console.log('propsprops', props.toggleMenuCallback);


  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    setToggleChange(!toggleChange)
    if (window.screen.width <= 992) {
      body.classList.toggle("sidebar-enable");
    }
    else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }



  useEffect(() => {
    console.log('toggleChange', toggleChange);
    if (toggleChange) {
      localStorage.setItem('true', 'footerClass')
    } else {
      localStorage.setItem('false', 'footerClass')
    }
  }, [toggleChange])

  // clear the fields in Advance search start

  const handleResetAdvancepop = () => {
    setPopAdvance(null);
    setInputContains("");
    setExcludedSearch("");
    setExactSearch("");
    setFields([]); // Reset additional fields
  };

  // clear the fields in Advance search start

  // advance seearch start for making 

  const [inputContains, setInputContains] = useState("");
  const [excludedSearch, setExcludedSearch] = useState("");
  const [exactSearch, setExactSearch] = useState("");

  const handleInputContains = (e) => {
    setInputContains(e.target.value); // Update state when user types
  };

  // advance seearch end for making

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">

          <div className="d-flex">

            <button type="button" className="btn btn-sm px-4 font-size-24 header-item "
              id="vertical-menu-btn"
              onClick={() => {
                tToggle();
              }}
              data-target="#topnav-menu-content"
            >
              <i className="pi pi-bars fs-6"></i>
            </button>


            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="https://varundigital.bharatpayroll.com/static/media/hrms-logo6.1a823c0d278b5300afda.png" />
                  <h4> ATS </h4>

                </span>
                <span className="logo-lg">
                  <h4> ATS </h4>
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm favicon-logo">
                  <img src={AtsImg} alt="" height="50" />
                </span>
                <span className="logo-lg barath-logo">
                  <img src={AtsImg} alt="" height="50" />
                </span>
              </Link>
            </div>

            <div className="app-search d-none d-lg-block" >
              <div className="position-relative d-flex align-items-center" style={{ backgroundColor: "#eaf1fb", borderRadius: "30px" }}>
                <div className="input-wrapper" style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={props.t("Advanced Search") + "..."}
                    style={{ paddingRight: "40px", width: "600px", fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <i className="pi pi-sliders-h" onClick={() => setAdvansearch(true)}></i>
                  </span>
                </div>

                <div className="card flex justify-content-center headpop-main">
                  <Dialog
                    className="header-pop"
                    header="ADVANCED SEARCH"
                    visible={advansearch}
                    onHide={() => {
                      if (!advansearch) return;
                      setAdvansearch(false);
                    }}
                  >
                    <div>
                      <Row>

                        <Col xl={12} className="bg-form advan-modal pe-0">
                          <Card className="popoup-clr bg-form">
                            <CardBody>
                              <Row>
                                <Col xl={12}>
                                  <div className="">
                                    <Row>
                                      <Col xl={12}>
                                        <Row className="mt-2 align-items-center"   >
                                          <Col xl={12}>
                                            <label
                                              htmlFor="integer"
                                              className=" block mb-2"
                                            >
                                              Keyword Search In
                                            </label>

                                            <Dropdown
                                              value={popAdvance}
                                              onChange={(e) => setPopAdvance(e.value)}
                                              options={searchpopup}
                                              optionLabel="name"
                                              placeholder="Search In"
                                              className="w-full search-option"
                                            />
                                          </Col>
                                        </Row>

                                        <Row className="mt-3 align-items-center">
                                          <Col xl={12}>
                                            <label
                                              className="block mb-2"
                                            >
                                              Search In
                                            </label>

                                            <InputText
                                              id="integer"
                                              className="w-full"
                                              placeholder="Contains"
                                              value={inputContains}
                                              onChange={handleInputContains}
                                            />
                                          </Col>
                                        </Row>

                                        <Row className="mt-2 align-items-center">
                                          <Col xl={12}>
                                            <InputText
                                              id="contains"
                                              value={excludedSearch}
                                              className="w-full"
                                              placeholder="Excluded"
                                              onChange={(e) => setExcludedSearch(e.target.value)}
                                            />
                                          </Col>
                                        </Row>

                                        <Row className="mt-2 align-items-center">
                                          <Col xl={12}>
                                            <InputText
                                              id="exact"
                                              value={exactSearch}
                                              className="w-full"
                                              placeholder="Exact"
                                              onChange={(e) => setExactSearch(e.target.value)}
                                            />
                                          </Col>
                                        </Row>

                                        <Col xl={12} className="bg-form mt-4">
                                          <Card className="popoup-clr bg-form">
                                            <CardBody className="pt-0">
                                              <Row className="advance-sr2">
                                                <Col xs={12}>
                                                  <div className="d-flex">
                                                    <h4 className=" mb-0">ADDITIONAL SEARCH CRITERIA</h4>
                                                  </div>
                                                </Col>
                                              </Row>


                                              <Row>
                                                <Col xl={12}>
                                                  <div className="add-selectoption">
                                                    <Row>
                                                      <Col xl={12}>
                                                        <div className="">

                                                          {/* Render dropdown fields */}
                                                          {fields.map(field => (
                                                            <div key={field.id} className="p-field p-grid p-align-center p-mb-2 mt-2">

                                                              <button
                                                                type="button"
                                                                onClick={() => handleRemoveField(field.id)}
                                                                className="select-close"

                                                              >
                                                                <i className="fa-solid fa-xmark"></i>
                                                              </button>


                                                              <Dropdown
                                                                value={field.value}
                                                                options={dropdownOptions}
                                                                onChange={(e) => handleFieldChange(field.id, e.value)}
                                                                placeholder="Select a Field"
                                                                className="p-mr-2"
                                                                style={{ width: "200px" }}
                                                              />

                                                            </div>
                                                          ))}

                                                          <button
                                                            type="button"
                                                            onClick={handleAddField}
                                                            className="btn btn-secondary import-res-btn  mainbtn me-1 mt-3 addfield-pop"

                                                          >
                                                            <i className="fa-regular fa-add me-1"></i> Add a Field to Search
                                                          </button>

                                                        </div>

                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </Col>
                                              </Row>
                                            </CardBody>
                                          </Card>
                                        </Col>
                                      </Col>
                                    </Row>
                                  </div>
                                </Col>
                              </Row>

                              {/* Buttons start  */}
                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-center">
                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn  mainbtn me-1 mt-3 addfield-pop"

                                    >
                                      <i className="pi pi-search"></i> Search
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn  mainbtn me-1 mt-3 addfield-pop"

                                    >
                                      <i className="pi pi-times"></i> Cancel
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-secondary import-res-btn  mainbtn me-1 mt-3 addfield-pop" onClick={handleResetAdvancepop}
                                    >
                                      <i className="pi pi-ban"></i> Clear
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                              {/* Buttons end  */}

                            </CardBody>
                          </Card>
                        </Col>
                        {/* 1st Row */}
                      </Row>
                    </div >
                  </Dialog>
                </div>
              </div>
            </div>





            <AddMenu />

            {/* Create Project Button */}
            {/* <div className="d-flex align-items-center me-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowCreateShortform(true)}
                style={{
                  backgroundColor: '#3b82f6',
                  borderColor: '#3b82f6',
                  color: 'white',
                  fontSize: '13px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.2)';
                }}
              >
                <i className="pi pi-plus me-1" style={{ fontSize: '12px' }}></i>
                Create Project
              </button>
            </div> */}

          </div>

          {/* <CreateShortform
            visible={showCreateShortform}
            onHide={() => setShowCreateShortform(false)}
          /> */}

          <div className="d-flex" >

            <HelpMenu />

            {/* <NotificationDropdown /> */}

            <ProfileMenu />
            <ReminderPopup />




            <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >

            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));  