import React, { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardBody, Col, Container, Row, DropdownToggle, DropdownItem, DropdownMenu, } from "reactstrap";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { Editor } from "primereact/editor";
import { Sidebar } from "primereact/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import Select from 'react-select';
import { TreeSelect } from "primereact/treeselect";
import { Tooltip } from 'primereact/tooltip';
import { InputTextarea } from "primereact/inputtextarea";

const AddContact = () => {
    const [visibleRightContacts, setVisibleRightContacts] = useState(false);

    // view pages input values
    const [email1, setEmail1] = useState("info@varundigitalmedia.com");
    const [jobtitle1, setJobtitle1] = useState("UI/UX Manager");
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [phno1, setPhno1] = useState("9876543210");
  
    const [userid1, setUserid1] = useState("Harish");
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

    const [address, setAddress] = useState("")
    const [selectedState, setSelectedState] = useState("Telangana")
    const [selectedCity, setSelectedCity] = useState("Hyderabad")
    const [selectedCountry, setSelectedCountry] = useState("India")
    const [selectedLabel, setSelectedLabel] = useState(null)
    const [postalCode, setPostalCode] = useState("500016")
    const [street1, setStreet1] = useState("White house, Block - III")
    const [street2, setStreet2] = useState("Begumpet")

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

    const [visible, setVisible] = useState(false)

    const addCities = [
        { name: 'Hyderabad', code: 'HYD' },
        { name: 'Chennai', code: 'CHN' },
        { name: 'Mumbai', code: 'MUM' },
        { name: 'Bangalore', code: 'BLR' },
        { name: 'Delhi', code: 'DEL' },
    ]

    const addStates = [
        { name: 'Andhra Pradesh', code: 'AP' },
        { name: 'Telangana', code: 'TG' },
        { name: 'Tamil Nadu', code: 'TN' },
        { name: 'Karnataka', code: 'KA' },
        { name: 'Kerala', code: 'KL' },
    ]

    const addCountries = [
        { name: "India", code: "IN" },
        { name: "United States", code: "US" },
        { name: "Canada", code: "CA" },
        { name: "Germany", code: "DE" },
        { name: "Australia", code: "AU" },
    ]

    const labels = [
        { name: "Work from Office (WFO)", code: "WORK" },
        { name: "Work from Home (WFH)", code: "HOME" },
        { name: "Work from Remote (WFR)", code: "REMOTE" }
    ]


    return (

        <React.Fragment>
            <button
                type="button"
                className="btn btn-secondary import-res-btn  ms-1  me-1"
                onClick={() => setVisibleRightContacts(true)}
            >
                Add Contact
            </button>

            <Sidebar visible={visibleRightContacts} position="right" className="sidebar" onHide={() => setVisibleRightContacts(false)}>
                <div className="sidebar-header">

                    <h3>Create a Contact</h3>
                    <div className="d-flex align-items-center">
                        {/* <Link to="/candidate-editform">
                                          <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
                                        </Link> */}
                        <Tooltip target=".closeside" content="Close" position="bottom" style={{ marginBottom: "5px" }} />

                        <Button
                            icon="pi pi-times"
                            className="p-button-text close-btn closeside"
                            onClick={() => setVisibleRightContacts(false)}
                        />
                    </div>

                </div>
                <div className="card sidebardetails">
                    <form>

                        <Row className="mb-3">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="firstName">First Name</label>
                                    <InputText
                                        id="firstName"
                                        placeholder="Mahesh Kumar"
                                    // value={}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="lastName">Last Name</label>
                                    <InputText
                                        id="lastName"
                                        placeholder="Bhoga"
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="email">Email</label>
                                    <InputText
                                        type="email"
                                        placeholder=""
                                        value={email1}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <InputText
                                        placeholder="9876543210"
                                        value={phno1}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobTitle" className="p-d-block">Designation</label>
                                    <InputText
                                        placeholder=""
                                        className="p-d-block"
                                        value={jobtitle1}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Company</label>
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

                        <Row className="mb-3">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Department</label>
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

                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Reporting Person</label>
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

                        <Row className="mb-3">
                            <Col lg={12}>
                                <div className="p-field companie-add" style={{ position: "relative" }}>
                                    <label htmlFor="address">Address</label>
                                    <InputTextarea
                                        id="address"
                                        value={address}
                                        // onChange={(e) => setAddress(e.target.value)}
                                        readOnly
                                        placeholder="Enter your address"
                                        style={{ paddingRight: "2rem" }} // Optional styling
                                        rows={3} // Specify number of rows
                                        cols={30} // Specify width
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
                                            cursor: "pointer"
                                        }}
                                        onClick={() => setVisible(true)}
                                    ></i>
                                    <Dialog header="Edit Address" className="address-popup" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                                        style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                                        <div className="card sidebardetails">
                                            <form>

                                                <Row className="mb-3">
                                                    <Col lg={6}>
                                                        <div className="p-field">
                                                            <label htmlFor="street1">Street 1</label>
                                                            <InputText
                                                                id="street1"
                                                                value={street1}
                                                                onChange={(e) => { setStreet1(e.target.value); updateAddress(); }}
                                                                placeholder="Enter Street 1"
                                                                className="w-full activejobdrop"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <label htmlFor="street2">Street 2</label>
                                                        <InputText
                                                            id="street2"
                                                            value={street2}
                                                            onChange={(e) => { setStreet2(e.target.value); updateAddress(); }}
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
                                                            onChange={(e) => { updateAddress(); setSelectedCity(e.value) }}
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
                                                            onChange={(e) => { updateAddress(); setSelectedState(e.value) }}
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
                                                            onChange={(e) => { updateAddress(); setSelectedCountry(e.value) }}
                                                            options={addCountries}
                                                            optionLabel="name"
                                                            filter
                                                            filterPlaceholder="Search Country"
                                                            className="w-full activejobdrop"
                                                            placeholder="India"
                                                        />
                                                    </Col>
                                                    <Col lg={6}>
                                                        <label htmlFor="postalCode">Postal Code</label>
                                                        <InputText
                                                            id="postalCode"
                                                            value={postalCode}
                                                            onChange={(e) => { updateAddress(); setPostalCode(e.target.value) }}
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
                                                            onChange={(e) => { updateAddress(); setSelectedLabel(e.value) }}
                                                            options={labels}
                                                            optionLabel="name"
                                                            placeholder="Work From Office"
                                                            className="w-full activejobdrop"
                                                        />
                                                    </Col>
                                                </Row>


                                                {/* <Row>
                                                    <Col>
                                                      <Button color="primary" className="btn btn-primary waves-effect waves-light me-2 sidebarbtn">
                                                        <i className="pi pi-check me-1"></i>  Ok
                                                      </Button>
                                                      <Button color="primary" className="btn btn-primary waves-effect waves-light cancelbtn me-2">
                                                        <i className="pi pi-times me-1"></i>
                                                        Cancel
                                                      </Button>
                                                    </Col>
                                                  </Row> */}
                                            </form>
                                        </div>
                                    </Dialog>
                                </div>
                            </Col>

                        </Row>

                        <Row className="mb-2">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Categories</label>
                                    <Dropdown
                                        id="category"
                                        value={selectedCategory1}
                                        onChange={(e) => setSelectedCategory1(e.value)}
                                        options={categoryOptions}
                                        placeholder="Large Enterprise"
                                        className="w-full bgclr"
                                    />
                                </div>
                            </Col >

                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Groups</label>
                                    <Dropdown
                                        id="group"
                                        value={selectedGroup1}
                                        onChange={(e) => setSelectedGroup1(e.value)}
                                        options={groupOptions}
                                        placeholder="Above 250 Crore"
                                        className="w-full bgclr"
                                    />
                                </div>
                            </Col>
                        </Row >

                        <Row className="d-flex align-items-end mb-2">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobType">UserIDs</label>
                                    <InputText
                                        placeholder="Enter User ID" value={userid1} />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <input
                                        type='checkbox'
                                        className="me-2"
                                        checked
                                    />
                                    <label htmlFor="jobType">Private</label>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>

                                <Button type="submit" color="primary" className="btn btn-primary waves-effect waves-light me-2 sidebarbtn float-end" onClick={() => setVisibleRightContacts(false)}  >
                                    Create
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </div>

            </Sidebar>
        </React.Fragment>
    );
}

export default AddContact;