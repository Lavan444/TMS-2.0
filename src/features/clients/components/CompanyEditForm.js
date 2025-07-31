import PropTypes from "prop-types"
import React, { useState, useEffect, useRef } from "react"
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

import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Link } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
//i18n

const CompanyEditForm = () => {

    // company edit form starts

    const [company, setCompany] = useState(["Varun Digital Media"]);
    const [website, setWebsite] = useState(["www.varundigitalmedia.com"]);
    const [email, setEmail] = useState(["info@varundigitalmedia.com"]);
    const [phno, setPhno] = useState(["9876543210"]);
    const [yearFounded, setYearFounded] = useState(["2010"]);
    const [specialties, setSpecialties] = useState(["Digital Marketing Services"]);

    const [industry, setIndustry] = useState(null)

    const industries = [
        { name: "Information Technology", code: "IT" },
        { name: "Healthcare", code: "HC" },
        { name: "Finance", code: "FN" },
        { name: "Manufacturing", code: "MN" },
        { name: "Retail", code: "RT" },
        // Add more industries here
    ]

    const [companySize, setCompanySize] = useState(null)

    const companySizes = [
        { name: "1-10 employees", code: "1-10" },
        { name: "11-50 employees", code: "11-50" },
        { name: "51-200 employees", code: "51-200" },
        { name: "201-500 employees", code: "201-500" },
        { name: "501-1000 employees", code: "501-1000" },
        { name: "1001-5000 employees", code: "1001-5000" },
        { name: "5001+ employees", code: "5001+" },
    ]

    const [overview1, setOverview1] = useState("Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence and drive growth across various industries.");

    const [selectedCategory1, setSelectedCategory1] = useState(null);

    const categoryOptions = [
        { label: "Micro Enterprise", value: "micro" },
        { label: "Small Enterprise", value: "small" },
        { label: "Medium Enterprise", value: "medium" },
        { label: "Large Enterprise", value: "large" },
    ];

    const [selectedGroup1, setSelectedGroup1] = useState(null);

    const groupOptions = [
        { label: "Up to 5 Crore", value: "5cr" },
        { label: "Up to 50 Crore", value: "50cr" },
        { label: "Up to 250 Crore", value: "250cr" },
        { label: "Above 250 Crore", value: "above250cr" },
    ];

    const [userid1, setUserid1] = useState("Harish");

    const onUpload = (event) => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: `${event.files.length} file(s) uploaded` });
    };

    const labels = [
        { name: "Work from Office (WFO)", code: "WORK" },
        { name: "Work from Home (WFH)", code: "HOME" },
        { name: "Work from Remote (WFR)", code: "REMOTE" }
    ]

    const [visible, setVisible] = useState(false)
    const [street1, setStreet1] = useState("White house, Block - III")
    const [street2, setStreet2] = useState("Begumpet")
    const [selectedCity, setSelectedCity] = useState("Hyderabad")
    const addCities = [
        { name: 'Hyderabad', code: 'HYD' },
        { name: 'Chennai', code: 'CHN' },
        { name: 'Mumbai', code: 'MUM' },
        { name: 'Bangalore', code: 'BLR' },
        { name: 'Delhi', code: 'DEL' },
    ]
    const [selectedState, setSelectedState] = useState("Telangana")
    const addStates = [
        { name: 'Andhra Pradesh', code: 'AP' },
        { name: 'Telangana', code: 'TG' },
        { name: 'Tamil Nadu', code: 'TN' },
        { name: 'Karnataka', code: 'KA' },
        { name: 'Kerala', code: 'KL' },
    ]
    const [selectedCountry, setSelectedCountry] = useState("India")
    const addCountries = [
        { name: "India", code: "IN" },
        { name: "United States", code: "US" },
        { name: "Canada", code: "CA" },
        { name: "Germany", code: "DE" },
        { name: "Australia", code: "AU" },
    ]

    const [postalCode, setPostalCode] = useState("500016")
    const [selectedLabel, setSelectedLabel] = useState(null)

    const [address, setAddress] = useState("")

    const updateAddress = () => {
        // setAddress(`${street1}  ${street2} ${postalCode}`.trim());
    }
    useEffect(() => {
        const updatedAddress = [
            street1,
            street2,
            selectedCity,
            selectedState,
            selectedCountry,
            postalCode,
            selectedLabel?.name,
        ].filter(Boolean)
        setAddress(updatedAddress)
    }, [
        street1,
        street2,
        postalCode,
        selectedState,
        selectedCity,
        selectedCountry,
        selectedLabel,
    ])
    const [createdBy, setcreatedBy] = useState("Harish")


    // company edit form ends

    // toast msg

    const toast = useRef(null);

    const showMessage = () => {
        toast.current.show({ severity: 'info', summary: 'Job ID 3048 Saved' });
    };
    const showCancel = () => {
        toast.current.show({ severity: 'error', summary: 'Cancelled', life: 3000 });
    }


    return (
        <React.Fragment>
            <div className="page-content create-ajob">
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={6}>
                                <h1 className="page-title">Create a Company</h1>
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item active">
                                        Create a company with essential details, including company information and company details, to maintain accurate records and streamline business operations.
                                    </li>
                                </ol>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex justify-content-end">
                                    <Toast ref={toast} />
                                    {/* <Link to="/">
                                    </Link> */}
                                    <Link to="/companies-allactive">
                                        <button type="submit" class="btn btn-success me-2" >  <i className="pi pi-save me-1"></i> Save </button>
                                    </Link>

                                    <Link to="/companies-allactive">
                                        <Button
                                            color="primary"
                                            className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                        >
                                            <i className="pi pi-times me-1"></i>
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        {/* 1st Row */}
                        <Col xl={6}>
                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Basic Information</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="company">Company</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText id="company" value={company} readOnly className="w-full" />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label
                                                            htmlFor="website"
                                                            className=" block mb-2"
                                                        >
                                                            Website
                                                        </label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="website"

                                                            className="w-full"
                                                            value={website}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="email">Email</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <div className="p-field mb-0">
                                                            <InputText
                                                                id="email"
                                                                className="w-full"
                                                                value={email}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="currentSalary" className="block mb-2">
                                                            Phone Number
                                                        </label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText
                                                            id="email"
                                                            className="w-full"
                                                            value={phno}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="yearFounded" className="block mb-2">
                                                            Year Founded
                                                        </label>
                                                    </Col>
                                                    <Col xl={9}>

                                                        <InputText
                                                            id="yearFounded"
                                                            value={yearFounded}
                                                            className="w-full"
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="specialities" className="block mb-2">
                                                            Specialties
                                                        </label>
                                                    </Col>
                                                    <Col xl={9}>

                                                        <InputText
                                                            id="specialities"
                                                            value={specialties}
                                                            className="w-full"
                                                        />
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>


                        {/* 2nd Row */}

                        <Col xl={6}>
                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Company Details</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="company">Industry</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <div className="card mb-0">
                                                            <Dropdown
                                                                id="industry"
                                                                value={industry}
                                                                onChange={e => setIndustry(e.value)}
                                                                options={industries}
                                                                optionLabel="name"
                                                                filter
                                                                filterPlaceholder="Search Industry"
                                                                className="w-full activejobdrop"
                                                                placeholder="Technology"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="companySize">Company Size</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <div className="card mb-0">
                                                            <Dropdown
                                                                id="companySize"
                                                                value={companySize}
                                                                onChange={e => setCompanySize(e.value)}
                                                                options={companySizes}
                                                                optionLabel="name"
                                                                filter
                                                                filterPlaceholder="Search Company Size"
                                                                className="w-full activejobdrop"
                                                                placeholder="100 employees"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="overview">Overview</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <div className="p-field mb-0">
                                                            <InputTextarea
                                                                autoResize
                                                                rows={4}
                                                                cols={30}
                                                                placeholder="Enter a description..."
                                                                value={overview1}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="currentSalary" className="block mb-2">
                                                            Categories
                                                        </label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <Dropdown
                                                            id="category"
                                                            value={selectedCategory1}
                                                            onChange={(e) => setSelectedCategory1(e.value)}
                                                            options={categoryOptions}
                                                            placeholder="Large Enterprise"
                                                            className="w-full bgclr"
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="yearFounded" className="block mb-2">
                                                            Groups
                                                        </label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <Dropdown
                                                            id="group"
                                                            value={selectedGroup1}
                                                            onChange={(e) => setSelectedGroup1(e.value)}
                                                            options={groupOptions}
                                                            placeholder="Above 250 Crore"
                                                            className="w-full bgclr"
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col lg={6}>
                                                        <Row>
                                                            <Col xl={6}>
                                                                <label htmlFor="userids" className="block mb-2">
                                                                    UserIDs
                                                                </label>
                                                            </Col>
                                                            <Col xl={6}>
                                                                <InputText
                                                                    placeholder="Enter User ID" value={userid1} className="w-full" />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Row>
                                                            <Col xl={12}>
                                                                <input type="checkbox" className="me-2" checked />
                                                                <label htmlFor="jobType">Private</label>
                                                            </Col>

                                                        </Row>
                                                    </Col>

                                                </Row>


                                                <Row className="mt-2 align-items-center mb-2">
                                                    <Col xl={3}>
                                                        <label htmlFor="attachment">Attach Document</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <FileUpload
                                                            name="demo[]"
                                                            url="/api/upload"
                                                            multiple
                                                            accept="image/*"
                                                            maxFileSize={1000000}
                                                            onUpload={onUpload}
                                                            mode="basic"
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={3}>
                                                        <label htmlFor="address">Address</label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <div
                                                            className="p-field companie-add"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <InputTextarea
                                                                id="address"
                                                                value={address}
                                                                onChange={e => setAddress(e.target.value)}
                                                                placeholder="Enter your address"
                                                                style={{ paddingRight: "2rem" }} // Optional styling
                                                                rows={3} // Specify number of rows
                                                                cols={30} // Specify width
                                                                className="w-full"
                                                            />
                                                            {/* Edit Icon */}
                                                            <i
                                                                className="pi pi-pencil"
                                                                style={{
                                                                    position: "absolute",
                                                                    right: "10px",
                                                                    top: "70%",
                                                                    transform: "translateY(-50%)",
                                                                    color: "#6c757d",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => setVisible(true)}
                                                            ></i>
                                                        </div>
                                                    </Col>



                                                    <Dialog
                                                        header="Edit Address"
                                                        className="address-popup"
                                                        visible={visible}
                                                        onHide={() => {
                                                            if (!visible) return
                                                            setVisible(false)
                                                        }}
                                                        style={{ width: "30vw" }}
                                                        breakpoints={{
                                                            "960px": "75vw",
                                                            "641px": "100vw",
                                                        }}
                                                    >
                                                        <div className="card sidebardetails">
                                                            <form>
                                                                <Row className="mb-3">
                                                                    <Col lg={6}>
                                                                        <div className="p-field">
                                                                            <label htmlFor="street1">
                                                                                Street 1
                                                                            </label>
                                                                            <InputText
                                                                                id="street1"
                                                                                value={street1}
                                                                                onChange={e => {
                                                                                    setStreet1(e.target.value)
                                                                                    updateAddress()
                                                                                }}
                                                                                placeholder=""
                                                                                className="w-full activejobdrop"
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={6}>
                                                                        <label htmlFor="street2">Street 2</label>
                                                                        <InputText
                                                                            id="street2"
                                                                            value={street2}
                                                                            onChange={e => {
                                                                                setStreet2(e.target.value)
                                                                                updateAddress()
                                                                            }}
                                                                            placeholder="Enter Street 2 (Optional)"
                                                                            className="w-full activejobdrop"
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                <Row className="mb-3">
                                                                    <Col lg={6}>
                                                                        <label htmlFor="city">City</label>
                                                                        <Dropdown
                                                                            id="city"
                                                                            value={selectedCity}
                                                                            onChange={e => {
                                                                                updateAddress()
                                                                                setSelectedCity(e.value)
                                                                            }}
                                                                            options={addCities}
                                                                            optionLabel="name"
                                                                            filter
                                                                            filterPlaceholder="Search City"
                                                                            className="w-full activejobdrop"
                                                                            placeholder="Hyderabad"
                                                                        />
                                                                    </Col>
                                                                    <Col lg={6}>
                                                                        <label htmlFor="state">State</label>
                                                                        <Dropdown
                                                                            id="state"
                                                                            value={selectedState}
                                                                            onChange={e => {
                                                                                updateAddress()
                                                                                setSelectedState(e.value)
                                                                            }}
                                                                            options={addStates}
                                                                            optionLabel="name"
                                                                            filter
                                                                            filterPlaceholder="Search State"
                                                                            className="w-full activejobdrop"
                                                                            placeholder="Telangana"
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                <Row className="mb-3">
                                                                    <Col lg={6}>
                                                                        <label htmlFor="country">Country</label>
                                                                        <Dropdown
                                                                            id="country"
                                                                            value={selectedCountry}
                                                                            onChange={e => {
                                                                                updateAddress()
                                                                                setSelectedCountry(e.value)
                                                                            }}
                                                                            options={addCountries}
                                                                            optionLabel="name"
                                                                            filter
                                                                            filterPlaceholder="Search Country"
                                                                            className="w-full activejobdrop"
                                                                            placeholder="India"
                                                                        />
                                                                    </Col>
                                                                    <Col lg={6}>
                                                                        <label htmlFor="postalCode">
                                                                            Postal Code
                                                                        </label>
                                                                        <InputText
                                                                            id="postalCode"
                                                                            value={postalCode}
                                                                            onChange={e => {
                                                                                updateAddress()
                                                                                setPostalCode(e.target.value)
                                                                            }}
                                                                            placeholder=""
                                                                            className="w-full activejobdrop"
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                <Row className="mb-3">
                                                                    <Col lg={12}>
                                                                        <label htmlFor="postalCode">Label</label>
                                                                        <Dropdown
                                                                            value={selectedLabel}
                                                                            onChange={e => {
                                                                                updateAddress()
                                                                                setSelectedLabel(e.value)
                                                                            }}
                                                                            options={labels}
                                                                            optionLabel="name"
                                                                            placeholder="Work From Office"
                                                                            className="w-full activejobdrop"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </form>
                                                        </div>
                                                    </Dialog>


                                                </Row>

                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row >

                    <Row>
                        <Col xl={6}>
                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">System Fields</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">
                                                <Row>
                                                    <Col xl={12}>
                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label

                                                                    className=" block"
                                                                >
                                                                    Create Date
                                                                </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <Calendar
                                                                    id="createDate"
                                                                    placeholder="27/02/2025"
                                                                    className="w-full"
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label

                                                                    className=" block"
                                                                >
                                                                    Edit Date
                                                                </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <Calendar
                                                                    id="editDate"
                                                                    disabled
                                                                    className="w-full"
                                                                    placeholder="27/02/2025"
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label

                                                                    className=" block"
                                                                >
                                                                    Created By
                                                                </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <InputText
                                                                    id="integer"
                                                                    className="w-full"
                                                                    disabled
                                                                    value={createdBy}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label

                                                                    className=" block"
                                                                >
                                                                    Last Activity Type
                                                                </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <InputText
                                                                    id="integer"
                                                                    className="w-full"
                                                                    placeholder="Interview"
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label

                                                                    className=" block"
                                                                >
                                                                    Last Activity Date
                                                                </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <Calendar
                                                                    id="lastActivityDate"
                                                                    className="w-full"
                                                                    placeholder="27/02/2025"
                                                                    disabled
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
                        <Col xl={6}>
                            <Card className="bg-form">
                                <CardBody>
                                    <h4 className="card-title mb-2">Social Pages</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">
                                                <Row>
                                                    <Col xl={12}>
                                                        <Row className="align-items-center mt-2">
                                                            <Col xl={3}>
                                                                <label

                                                                    className=" block"
                                                                >
                                                                    LinkedIn URL
                                                                </label>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <InputText
                                                                    id="integer"
                                                                    className="w-full"
                                                                    style={{ position: "relative" }}
                                                                    placeholder="https://www.linkedin.com/in/"
                                                                />
                                                                <i
                                                                    className="pi pi-linkedin linkd-icon"
                                                                    style={{
                                                                        position: "absolute",
                                                                        right: "26px",
                                                                        top: "34%",
                                                                        transform: "translateY(-50%)",
                                                                        // cursor: "pointer"
                                                                    }}
                                                                ></i>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <label

                                                                    className=" block"
                                                                >
                                                                    Facebook URL
                                                                </label>

                                                            </Col>
                                                            <Col xl={9}>
                                                                <InputText
                                                                    id="integer"
                                                                    className="w-full"
                                                                    style={{ position: "relative" }}
                                                                    placeholder="https://www.facebook.com/in/"
                                                                />
                                                                <i
                                                                    className="pi pi-facebook facebook-icon"
                                                                    style={{
                                                                        position: "absolute",
                                                                        right: "26px",
                                                                        top: "51%",
                                                                        transform: "translateY(-50%)",
                                                                        // cursor: "pointer"
                                                                    }}
                                                                ></i>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>
                                                                <div className="d-flex align-items-start">
                                                                    {/* <div>
                                                            <i className="pi pi-twitter me-1 twitter-icon"></i>
                                                          </div> */}

                                                                    <label

                                                                        className=" block"
                                                                    >
                                                                        Twitter URL
                                                                    </label>
                                                                </div>

                                                            </Col>
                                                            <Col xl={9}>
                                                                <InputText
                                                                    id="integer"
                                                                    className="w-full"
                                                                    style={{ position: "relative" }}
                                                                    placeholder="https://www.twitter.com/in/"
                                                                />
                                                                <i
                                                                    className="pi pi-twitter twitter-icon"
                                                                    style={{
                                                                        position: "absolute",
                                                                        right: "26px",
                                                                        top: "69%",
                                                                        transform: "translateY(-50%)",
                                                                        // cursor: "pointer"
                                                                    }}
                                                                ></i>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-2 align-items-center">
                                                            <Col xl={3}>

                                                                <div className="d-flex align-items-start">
                                                                    {/* <div>
                                                            <i className="pi pi-info me-1 indeed-icon"></i>
                                                          </div> */}
                                                                    <label

                                                                        className=" block"
                                                                    >
                                                                        Indeed URL
                                                                    </label>
                                                                </div>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <InputText
                                                                    id="integer"
                                                                    className="w-full"
                                                                    placeholder="https://www.indeed.com/in/"
                                                                />
                                                                <i
                                                                    className="pi pi-info me-1 indeed-icon"
                                                                    style={{
                                                                        position: "absolute",
                                                                        right: "22px",
                                                                        top: "86%",
                                                                        transform: "translateY(-50%)",
                                                                        // cursor: "pointer"
                                                                    }}
                                                                ></i>
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
                                <Link to="/companies-allactive">
                                    <button type="submit" class="btn btn-success me-2">  <i className="pi pi-save me-1"></i>Save</button>
                                </Link>

                                <Link to="/companies-allactive">
                                    <Button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                        onClick={showCancel}
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container >
            </div >
        </React.Fragment >
    )
}

export default CompanyEditForm;
