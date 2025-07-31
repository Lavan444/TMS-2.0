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
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputNumber } from "primereact/inputnumber";
import { TreeSelect } from "primereact/treeselect";
import { Checkbox } from "primereact/checkbox";
import { Editor } from "primereact/editor";
import Select from 'react-select';
import { Toast } from 'primereact/toast';
import { Link } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
//i18n

const ContactEditForm = () => {

    // contact edit form starts

    const [fullname, setFullname] = useState(["Mahesh Kumar Boga"]);
    const [email, setEmail] = useState(["mahesh9@varundigitalmedia.com"]);
    const [phno, setPhno] = useState(["9876543210"]);
    const [designation, setDesignation] = useState(["UI/UX Manager"]);

    const [selectedCompany, setSelectedCompany] = useState(null);

    const companyOptions = [
        { name: 'Varun Digital Media', code: 'VDM' },
        { name: 'Pranathi Software Services', code: 'PSS' },
        { name: 'Green Ventures pvt Ltd', code: 'GV' },
        { name: 'Future Tech Solutions', code: 'FTS' },
        { name: 'Healthify Solutions pvt Ltd', code: 'MS' },

    ];

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departmentOptions = [
        { name: 'Account Finance Team', code: 'HR' },
        { name: 'SPG US Staffing', code: 'FIN' },
        { name: 'Vitel Development Team', code: 'MKT' },
        { name: 'Support Team', code: 'ENG' },
        { name: 'NOC Team', code: 'SAL' },
        { name: 'Digital Marketing Team', code: 'DIG' },
        { name: 'Executive Team', code: 'EXE' },
        { name: 'Operations Team', code: 'OPE' }
    ];

    const [selectedPerson, setSelectedPerson] = useState(null);

    const personOptions = [
        { name: 'Salmanuddin Syed', role: 'Operation Head', code: 'OH' },
        { name: 'Girish Bodepu', role: 'Manager', code: 'MGR' },
        { name: 'Suresh Reddy', role: 'Team Lead', code: 'TL' },
        { name: 'Ravi Kumar', role: 'Team Lead', code: 'TL' },
        { name: 'Neha Patel', role: 'Team Lead', code: 'TL' }
    ];

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
                                <h1 className="page-title">Create a Contact</h1>
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item active">
                                        Create a contact with essential details, including basic information and contact details, to maintain accurate records and facilitate communication.
                                    </li>
                                </ol>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex justify-content-end">
                                    <Toast ref={toast} />
                                    {/* <Link to="/">
                                    </Link> */}
                                    <Link to="/contacts-allactive">
                                        <button type="submit" class="btn btn-success me-2" >  <i className="pi pi-save me-1"></i> Save </button>
                                    </Link>

                                    <Link to="/contacts-allactive">
                                        <Button
                                            color="primary"
                                            className="btn btn-primary me-2 cancel-outlinebtn"
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
                                                        <label htmlFor="fullname">Full name</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <InputText id="fullname" value={fullname} readOnly className="w-full" />
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
                                                        <label htmlFor="designation" className="block mb-2">
                                                            Designation
                                                        </label>
                                                    </Col>
                                                    <Col xl={9}>

                                                        <InputText
                                                            id="designation"
                                                            value={designation}
                                                            className="w-full"
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="company">Company</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <div className="card mb-0 border-0">
                                                            <Dropdown
                                                                value={selectedCompany}
                                                                onChange={(e) => setSelectedCompany(e.value)}
                                                                options={companyOptions}
                                                                optionLabel="name"
                                                                placeholder="Varun Digital Media"
                                                                filter
                                                                className="w-full bgclr"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="company">Department</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <div className="card mb-0 border-0">
                                                            <Dropdown
                                                                value={selectedDepartment}
                                                                onChange={(e) => setSelectedDepartment(e.value)}
                                                                options={departmentOptions}
                                                                optionLabel="name"
                                                                placeholder="UI/UX"
                                                                filter
                                                                className="w-full bgclr"
                                                            />
                                                        </div>
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
                                    <h4 className="card-title mb-2">Contact Details</h4>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="">

                                                <Row className="mt-2 align-items-center">
                                                    <Col xl={3}>
                                                        <label htmlFor="company">Reporting Person</label>
                                                    </Col>
                                                    <Col xl={9}>
                                                        <div className="card mb-0 border-0">
                                                            <Dropdown
                                                                value={selectedPerson}
                                                                options={personOptions}
                                                                onChange={(e) => setSelectedPerson(e.value)}
                                                                optionLabel={(option) => `${option.name}, ${option.role}`}
                                                                placeholder="Salmanuddin Syed"
                                                                className="bgclr"
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
                    </Row>


                    <Row className="align-items-center mb-3">
                        <Col md={12}>
                            <div className="d-flex justify-content-end">
                                <Link to="/contacts-allactive">
                                    <button type="submit" class="btn btn-success me-2">  <i className="pi pi-save me-1"></i>Save</button>
                                </Link>

                                <Link to="/contacts-allactive">
                                    <Button
                                        color="primary"
                                        className="btn btn-primary me-2 cancel-outlinebtn"
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

export default ContactEditForm;
