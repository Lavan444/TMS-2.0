import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";


const UploadResumeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeData = location.state?.resumeData?.data[0];
  const toast = useRef(null);

  const [firstname, setFirstname] = useState(resumeData?.contact_info?.first_name || "");
  const [lastname, setLastname] = useState(resumeData?.contact_info?.last_name || "");
  const [company, setCompany] = useState(resumeData?.employment_history?.employer_1?.employer_name || "");
  const [jobtitle, setJobtitle] = useState(resumeData?.employment_history?.employer_1?.position || "");
  const [email, setEmail] = useState(resumeData?.contact_info?.email || "");
  const [phone, setPhone] = useState(resumeData?.contact_info?.phone || "");
  const [address, setAddress] = useState(`${resumeData?.contact_info?.country || ""}, ${resumeData?.contact_info?.city || ""}, ${resumeData?.contact_info?.postal_code || ""}, ${resumeData?.contact_info?.region || ""}` || "");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [primarySkills, setPrimarySkills] = useState(resumeData?.primary_skills || []);
  const [secondarySkills, setSecondarySkills] = useState(resumeData?.secondary_skills || []);
  const [dateAvailability, setDateAvailability] = useState(null);
  const [dob, setDob] = useState(null);
  const [employeeRec, setEmployeeRec] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [dateFromTo, setDateFromTo] = useState(null);
  const [merge, setMerge] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const setstatus = [
    { name: "Active", code: "act" },
    { name: "Inactive", code: "inc" },
  ];

  const cities = [
    { name: "Freelancer", code: "emp1" },
    { name: "WFH", code: "emp2" },
    { name: "WFO", code: "emp3" },
  ];

  useEffect(() => {
    if (!resumeData) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong. No data available.', life: 3000 });
    } else {
      setFirstname(resumeData.contact_info?.first_name || "");
      setLastname(resumeData.contact_info?.last_name || "");
      setCompany(resumeData.employment_history?.employer_1?.employer_name || "");
      setJobtitle(resumeData.employment_history?.employer_1?.position || "");
      setEmail(resumeData.contact_info?.email || "");
      setPhone(resumeData.contact_info?.phone || "");
      setAddress(`${resumeData?.contact_info?.country || ""}, ${resumeData?.contact_info?.city || ""}, ${resumeData?.contact_info?.postal_code || ""}, ${resumeData?.contact_info?.region || ""}` || "");
      setPrimarySkills(resumeData.primary_skills || []);
      setSecondarySkills(resumeData.secondary_skills || []);
      // Set other state variables...
    }
  }, [resumeData]);

  const handleSaveClick = () => {
    setMerge(true);
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    navigate("/allactive-candidates");
  };

  const handleDeclineCancel = () => {
    setShowCancelDialog(false);
  };

  const footerContent = (
    <div className="d-flex justify-content-center">
      <button
        type="button"
        onClick={() => {
          navigate("/allactive-candidates");
        }}
        className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/allactive-candidates");
        }}
        className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
      >
        No
      </button>
    </div>
  );

  const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob());

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
      console.log("Base64 Data:", base64data);
      // You can handle the base64data as needed, e.g., send it to an API
    };
  };

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={6}>
                <h6 className="page-title">Create a Candidate</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Add a new candidate by entering their details, skills, and
                    contact information. Streamline recruitment by creating
                    comprehensive profiles.
                  </li>
                </ol>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary"
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </div>

          <Row>
            <Col xl={4}>
              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Basic Information</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12}>
                            <Row className="mt-2 align-items-center">
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
                                  placeholder="Mahesh"
                                  value={firstname}
                                  onChange={(e) => setFirstname(e.target.value)}
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
                                  value={lastname}
                                  onChange={(e) => setLastname(e.target.value)}
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
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
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
                                  value={jobtitle}
                                  onChange={(e) => setJobtitle(e.target.value)}
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
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
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
                    <Col xl={12}>
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
                                    options={resumeData?.primary_skills?.map(skill => ({ name: skill, code: skill })) || []}
                                    optionLabel="name"
                                    placeholder="Select primary skills"
                                    maxSelectedLabels={3}
                                    className="w-full"
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
                                    options={resumeData?.secondary_skills?.map(skill => ({ name: skill, code: skill })) || []}
                                    optionLabel="name"
                                    placeholder="Select Secondary Skills"
                                    maxSelectedLabels={3}
                                    className="w-full"
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
                                />
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
                          <Col xl={12}>
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
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
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
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
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
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
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
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
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

            <Col xl={4}>
              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Social Pages</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12}>
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
                                />
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
                          <Col xl={12}>
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
                                    placeholder="Select Employee type"
                                    className="w-full drop-clr"
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
                                <div className="d-flex align-items-center mb-0 bg-backclr">
                                  <TriStateCheckbox
                                    invalid
                                    value={employeeRec}
                                    onChange={e => setEmployeeRec(e.value)}
                                    className="me-2"
                                  />
                                  <label>{String(employeeRec)}</label>
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
                                <Calendar
                                  className="w-100"
                                  id="buttondisplay"
                                  value={dateAvailability}
                                  onChange={e => setDateAvailability(e.value)}
                                  showIcon
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
                                <Calendar
                                  className="w-100"
                                  id="buttondisplay"
                                  value={dob}
                                  onChange={e => setDob(e.value)}
                                  showIcon
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
                                />
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
                          <Col xl={12}>
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
                                <FileUpload
                                  mode="basic"
                                  name="demo[]"
                                  url="/api/upload"
                                  accept="/"
                                  customUpload
                                  uploadHandler={customBase64Uploader}
                                />
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

            <Col xl={4}>
              <Card className="bg-form">
                <CardBody>
                  <h4 className="card-title mb-4">Work Experience</h4>
                  <Row>
                    <Col xl={12}>
                      <div className="">
                        <Row>
                          <Col xl={12}>
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
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
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
                                  value={jobtitle}
                                  onChange={(e) => setJobtitle(e.target.value)}
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
                                    <label
                                      htmlFor="buttondisplay"
                                      className="mb-2"
                                    >
                                      From
                                    </label>
                                    <Calendar
                                      id="buttondisplay"
                                      value={dateFromTo}
                                      onChange={e => setDateFromTo(e.value)}
                                      showIcon
                                      className="w-full"
                                    />
                                  </div>
                                  <div className="flex-auto">
                                    <label
                                      htmlFor="buttondisplay"
                                      className="mb-2"
                                    >
                                      To
                                    </label>

                                    <Calendar
                                      value={dateFromTo}
                                      onChange={e => setDateFromTo(e.value)}
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
                                  Project Description
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
                          <Col xl={12}>
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
                                />
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
                          <Col xl={12}>
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
                                />
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
          </Row>

          <Row className="align-items-center mb-3">
            <Col md={12}>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>

          <Dialog
            header="Duplicate Resumes"
            visible={merge}
            style={{ width: "30vw" }}
            onHide={() => {
              if (!merge) return;
              setMerge(false);
            }}
            footer={footerContent}
          >
            <p className="m-0">
              <h4 className="popup-merge">
                The candidate already exists. Do you want to merge?
              </h4>
            </p>
          </Dialog>

          <Dialog
            header="Confirm Cancel"
            visible={showCancelDialog}
            style={{ width: "30vw" }}
            onHide={() => {
              setShowCancelDialog(false);
            }}
            footer={
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={handleDeclineCancel}
                  className="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
                >
                  No
                </button>
              </div>
            }
          >
            <p className="m-0">
              <h4 className="popup-merge">
                Are you sure you want to go back?
              </h4>
            </p>
          </Dialog>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UploadResumeForm;
