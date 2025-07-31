import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Container } from "reactstrap";


//i18n
import { withTranslation } from "react-i18next";

const NotificationDropdown3 = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [candidateOption, setCandidateOption] = useState("Select Option");
  const [dropdown1Open, setDropdown1Open] = useState(false);

  const handleCandidateSelect = (option) => setCandidateOption(option);


  const [formValues, setFormValues] = useState({
    from: "",
    to: "",
    subject: "",
    hasWords: "",
    doesntHave: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with Values:", formValues);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect slider-icon" style={{ height: "auto" }}
          tag="button"
          id="page-header-notifications-dropdown"
        >
          {/* <i class="ion ion-md-settings"></i> */}
          <i class="fa-solid fa-sliders"></i>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 searchbar-dropdown">

          <SimpleBar style={{ height: "auto" }}>
            <Container fluid={true}>



              <form onSubmit={handleSubmit} className="search-form">


                <Row>
                  <Col lg={12}>
                    <Dropdown
                      isOpen={dropdown1Open}
                      toggle={() => setDropdown1Open(!dropdown1Open)}
                      className="inline-dropdown mt-4"
                    >
                      <DropdownToggle
                        color="primary"
                        className="btn btn-secondary dropdown-toggle waves-effect waves-light"
                      >
                        {/* <i className="mdi mdi-cog me-2"></i>  */}
                        {candidateOption}{" "}
                        <i className="ion ion-md-arrow-dropdown ms-2"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => handleCandidateSelect("Resume")}>
                          Resume
                        </DropdownItem>
                        <DropdownItem onClick={() => handleCandidateSelect("Notes")}>
                          Notes
                        </DropdownItem>
                        <DropdownItem onClick={() => handleCandidateSelect("Job Title")}>
                          Job Title
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => handleCandidateSelect("Primary Skills")}>
                          Primary Skills
                        </DropdownItem>
                        <DropdownItem onClick={() => handleCandidateSelect("Summary")}>
                          Summary
                        </DropdownItem>
                        <DropdownItem onClick={() => handleCandidateSelect("Documents")}>
                          Documents
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                </Row>

                {/* Required Field */}
                <Row>
                  <Col lg={2}>
                    <label>
                      <h6 className="mt-3 mb-1">Required</h6>
                    </label>
                  </Col>
                  <Col lg={10}>
                    <input
                      type="text"
                      name="required"
                      value={formValues.required}
                      onChange={handleChange}
                      className="search-input w-100"
                    />
                  </Col>
                </Row>

                {/* Optional Field */}
                <Row>
                  <Col lg={2}>
                    <label>
                      <h6 className="mt-3 mb-1">Optional</h6>
                    </label>
                  </Col>
                  <Col lg={10}>
                    <input
                      type="text"
                      name="optional"
                      value={formValues.optional}
                      onChange={handleChange}
                      className="search-input w-100"
                    />
                  </Col>
                </Row>

                {/* Excluded Field */}
                <Row>
                  <Col lg={2}>
                    <label>
                      <h6 className="mt-3 mb-1">Excluded</h6>
                    </label>
                  </Col>
                  <Col lg={10}>
                    <input
                      type="text"
                      name="excluded"
                      value={formValues.excluded}
                      onChange={handleChange}
                      className="search-input w-100"
                    />
                  </Col>
                </Row>

                {/* Exact Field */}
                <Row>
                  <Col lg={2}>
                    <label>
                      <h6 className="mt-3 mb-1">Exact</h6>
                    </label>
                  </Col>
                  <Col lg={10}>
                    <input
                      type="text"
                      name="exact"
                      value={formValues.exact}
                      onChange={handleChange}
                      className="search-input w-100"
                    />
                  </Col>
                </Row>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-secondary import-res-btn waves-effect ms-1 mt-4"
                >
                  Search
                </button>
                <button
                  type="submit"
                  className="btn btn-secondary import-res-btn waves-effect ms-1 mt-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-secondary import-res-btn waves-effect ms-1 mt-4"
                >
                  Reset
                </button>
              </form>
            </Container>

          </SimpleBar>

        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown3);

NotificationDropdown3.propTypes = {
  t: PropTypes.any
};
