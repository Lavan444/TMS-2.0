import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Link } from "react-router-dom"
import { InputText } from "primereact/inputtext"
import { FloatLabel } from "primereact/floatlabel"
import { Dropdown } from "primereact/dropdown"
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';

// Custom Scrollbar
import SimpleBar from "simplebar-react"

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png"
import servicesIcon2 from "../../assets/images/services-icon/02.png"
import servicesIcon3 from "../../assets/images/services-icon/03.png"
import servicesIcon4 from "../../assets/images/services-icon/04.png"
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"
import smimg1 from "../../assets/images/small/img-1.jpg"
import smimg2 from "../../assets/images/small/img-2.jpg"

// Charts
// import LineAreaChart from "../AllCharts/apex/lineareachart";
// import RadialChart from "../AllCharts/apex/apexdonut";
// import Apexdonut from "../AllCharts/apex/apexdonut1";
// import SparkLine from "../AllCharts/sparkline/sparkline"
// import SparkLine1 from "../AllCharts/sparkline/sparkline1"
// import Salesdonut from "../AllCharts/apex/salesdonut"
import { TriStateCheckbox } from "primereact/tristatecheckbox"
import { FileUpload } from 'primereact/fileupload';

//i18n

const Dashboard = props => {
  const [menu, setMenu] = useState(false)
  const toggle = () => {
    setMenu(!menu)
  }
  // document.title = "Dashboard | Pms - React Admin & Dashboard Template";

  const [selectedCity, setSelectedCity] = useState(null)
  const cities = [
    { name: "Employee type-1", code: "emp1" },
    { name: "Employee type-2", code: "emp2" },
    { name: "Employee type-3", code: "emp3" },
  ]

  const [selectedStatus, setSelectedStatus] = useState(null)
  const [dateFromTo, setDateFromTo] = useState(null);


  // const [fieldsDisabled , setFieldsDisabled]= useState(false)
  const [fieldsDisabledSkills , setFieldsDisabledSkills]= useState(false)
  const [fieldsDisabledContact , setfieldsDisabledContact]= useState(false)
  const [fieldsDisabledSocial , setFieldsDisabledSocial]= useState(false)
  const [fieldsDisabledGeneral , setFieldsDisabledGeneral]= useState(false)
  const [fieldsDisabledResume , setFieldsDisabledResume]= useState(false)
  const [fieldsDisabledWork , setFieldsDisabledWork]= useState(false)
  const [fieldsDisabledDocument , setFieldsDisabledDocument]= useState(false)
  const [fieldsDisabledSystemfields , setFieldsDisabledSystemfields]= useState(false)

  const setstatus = [
    { name: "Active", code: "act" },
    { name: "Inactive", code: "inc" },
  ]

  const [primarySkills, setPrimarySkills] = useState(null);
  const primary = [
    { name: 'Java', code: 'Java' },
    { name: 'C++', code: 'C++' },
    { name: 'Python', code: 'Python' },
    { name: 'Javascript', code: 'Javascript' },
    
  ];

  const [secondarySkills, setSecondarySkills] = useState(null);
  const secondary = [
    { name: 'HTML', code: 'html' },
    { name: 'CSS', code: 'css' },
    { name: 'C', code: 'c' },
    
  ];

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
        const base64data = reader.result;
    };
};


  const [dateAvalibility, setDateAvalibility] = useState(null);
  const [dob, setDob] = useState(null);
  

  const [EmployeeRec, setEmployeeRec] = useState(null)


  // const handleDisable=()=>{
    
  //   setFieldsDisabled(true)
  //   console.log("1stttttt");
    
  // }

  const handleDisableSkills=()=>{
    setFieldsDisabledSkills(true)
    console.log("2ndddddddddd");

  }

  const handleDisableContact = () =>{
    setfieldsDisabledContact(true)
  }

  const handleDisableSocial = () =>{
    setFieldsDisabledSocial(true)
  }

  const handleDisableGeneral = () =>{
    setFieldsDisabledGeneral(true)
  }

  const handleDisableResume = () =>{
    setFieldsDisabledResume(true)
  }

  const handleDisableWork = () =>{
    setFieldsDisabledWork(true)
  }

  const handleDisableDocument = () =>{
    setFieldsDisabledDocument(true)
  }
  const handleDisableSystemfields = () =>{
    setFieldsDisabledSystemfields(true)
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={12}>
                <h6 className="page-title">Create a Candidate</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                  Add a new candidate by entering their details, skills, and contact information. Streamline recruitment by creating comprehensive profiles.
                  </li>
                </ol>
              </Col>
            </Row>
          </div>

          <Row>
            {/* 1st Row */}
            <Col xl={4}>
              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Basic Information</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12}>
                            <Row className="mt-2 align-items-center"   >
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  First name
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                
                                  
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Last name
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Company
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  JobTitle
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Email
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="employeeType"
                                  className="block mb-2"
                                >
                                  Status
                                </label>
                              </Col>
                              <Col xl={9}>
                                <div className="card flex justify-content-center mb-0">
                                  <Dropdown
                                    value={selectedStatus}
                                    onChange={e => setSelectedStatus(e.value)}
                                    options={setstatus}
                                    optionLabel="name"
                                    placeholder="Select a Status"
                                    className="w-full drop-clr"
                                    
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Skills</h4>
                  <Row>
                    <Col xl={12} onClick={()=>handleDisableSkills()} className={!fieldsDisabledSkills ? 'formDisable' : 'formEnable'}>
                      <div className="">
                        <Row>
                          <Col xl={12}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Primary Skills
                                </label>
                              </Col>
                              <Col xl={9}>
                                <div className="card flex justify-content-center mb-0">
                                  <MultiSelect
                                    value={primarySkills}
                                    onChange={e => setPrimarySkills(e.value)}
                                    options={primary}
                                    optionLabel="name"
                                    placeholder="Select primary skills"
                                    maxSelectedLabels={3}
                                    className="w-full"
                                    disabled={!fieldsDisabledSkills}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="secondary"
                                  className=" block mb-2"
                                >
                                  Secondary Skills
                                </label>
                              </Col>
                              <Col xl={9}>
                              <div className="card flex justify-content-center mb-0">
                                  <MultiSelect
                                    value={secondarySkills}
                                    onChange={e => setSecondarySkills(e.value)}
                                    options={secondary}
                                    optionLabel="name"
                                    placeholder="Select Secondary Skills"
                                    maxSelectedLabels={3}
                                    className="w-full"
                                    disabled={!fieldsDisabledSkills}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Other Skills
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSkills}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledSkills}
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Contact Information</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12} onClick={()=>handleDisableContact()} className={!fieldsDisabledContact ? 'formDisable' : 'formEnable'}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Email 1
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledContact}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Email 2
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledContact}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Work Phone
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledContact}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Mobile Phone
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledContact}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Address
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  placeholder="Country, Street address, Street address line 2, City*,Pincode,State, Label(work/home/other)"
                                  disabled={!fieldsDisabledContact}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledContact}
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            {/* 1st Row */}

            {/* 2nd Row */}

            <Col xl={4}>
              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Social Pages</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12} onClick={()=>handleDisableSocial()} className={!fieldsDisabledSocial ? 'formDisable' : 'formEnable'}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  LinkedIn URL
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSocial}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Facebook URL
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSocial}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  X URL
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSocial}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Indeed URL
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSocial}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledSocial}
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">General Information</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12} onClick={()=>handleDisableGeneral()} className={!fieldsDisabledGeneral ? 'formDisable' : 'formEnable'}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="employeeType"
                                  className="block mb-2"
                                >
                                  Employee Type
                                </label>
                              </Col>
                              <Col xl={9}>
                                <div className="card flex justify-content-center mb-0">
                                  <Dropdown
                                    value={selectedCity}
                                    onChange={e => setSelectedCity(e.value)}
                                    options={cities}
                                    optionLabel="name"
                                    placeholder="Select a City"
                                    className="w-full drop-clr"
                                    disabled={!fieldsDisabledGeneral}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Source
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledGeneral}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Relocation
                                </label>
                              </Col>
                              <Col xl={9}>
                                <div className="d-flex mb-0 bg-backclr">
                                  <TriStateCheckbox
                                    invalid
                                    value={EmployeeRec}
                                    onChange={e => setEmployeeRec(e.value)}
                                    disabled={!fieldsDisabledGeneral}
                                    className="me-2"
                                  />
                                  <label>{String(EmployeeRec)}</label>
                                  
                                </div>
                              </Col>
                            </Row>

                            

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Availability Date
                                </label>
                              </Col>
                              <Col xl={9}>
                              <Calendar className="w-100"
                                    id="buttondisplay"
                                    value={dateAvalibility}
                                    onChange={(e) => setDateAvalibility(e.value)}
                                    showIcon
                                    disabled={!fieldsDisabledGeneral}
                                    />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  DoB
                                </label>
                              </Col>
                              <Col xl={9}>
                              <Calendar className="w-100"
                                    id="buttondisplay"
                                    value={dob}
                                    onChange={(e) => setDob(e.value)}
                                    showIcon
                                    disabled={!fieldsDisabledGeneral}
                                    />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Referred By
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledGeneral}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Categories
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledGeneral}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Groups
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledGeneral}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledGeneral}
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Resume </h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12} onClick={()=>handleDisableResume()} className={!fieldsDisabledResume ? 'formDisable' : 'formEnable'}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Structured resume
                                </label>
                              </Col>
                              <Col xl={9}>
                              <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledResume}
                                />
                              
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Candidate submitted resume
                                </label>
                              </Col>
                              <Col xl={9}>
                              <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader} />
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledResume}
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            {/* 2nd Row */}

            {/* 3rd Row */}

            <Col xl={4}>
              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Work Experience</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12} onClick={()=>handleDisableWork()} className={!fieldsDisabledWork ? 'formDisable' : 'formEnable'}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Company
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledWork}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Website
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledWork}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Job Title
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledWork}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  From Date, To Date
                                </label>
                              </Col>
                              <Col xl={9}>
                              <div className="fromto">
                                 <div className="flex-auto w-full">
                                      <label htmlFor="buttondisplay" className="mb-2">
                                        From
                                      </label>
                                      <Calendar
                                        id="buttondisplay"
                                        value={dateFromTo}
                                        onChange={(e) => setDateFromTo(e.value)}
                                        showIcon
                                        className="w-full"
                                      />
                                    </div>
                                    <div className="flex-auto">
                                      <label htmlFor="buttondisplay" className="mb-2">
                                        To
                                      </label>

                                      <Calendar
                                        value={dateFromTo}
                                        onChange={(e) => setDateFromTo(e.value)}
                                        showIcon
                                        className="w-full"
                                      />
                                    </div>
                                    </div>
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Project Descritpion
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledWork}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledWork}
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Documents</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12} onClick={()=>handleDisableDocument()} className={!fieldsDisabledDocument ? 'formDisable' : 'formEnable'}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Documents Type
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledDocument}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Documents Subject
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledDocument}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Document Attachment
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledDocument}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledDocument}
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">System Fields</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12} onClick={()=>handleDisableSystemfields()} className={!fieldsDisabledSystemfields ? 'formDisable' : 'formEnable'}>
                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Create Date
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSystemfields}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Edit Date
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSystemfields}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Created By
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSystemfields}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Last Activity Type
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSystemfields}
                                />
                              </Col>
                            </Row>

                            <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                  htmlFor="integer"
                                  className=" block mb-2"
                                >
                                  Last Activity Date
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  disabled={!fieldsDisabledSystemfields}
                                />
                              </Col>
                            </Row>

                            <Row className={!fieldsDisabledSystemfields ? 'dis-none mt-4' : 'dis-bloc mt-4'}>
                              <Col
                                xl={12}
                                className="d-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary import-res-btn waves-effect ms-1 mainbtn form-btn"
                                  data-bs-container="body"
                                  data-bs-toggle="popover"
                                  data-bs-placement="top"
                                  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                                  disabled={!fieldsDisabledSystemfields}
                                  onClick={()=>handleDisableSystemfields()} 
                                >
                                  Save & Next
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            {/* 3rd Row */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

// export default withTranslation()(Dashboard);
export default Dashboard
