import React, { useState, useRef, useEffect, useMemo } from "react"
import { CascadeSelect } from "primereact/cascadeselect";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import {
    Col,
    Container,
    Row
} from "reactstrap";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { ChevronRightIcon } from "primereact/icons/chevronright"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import WorkType1 from "pms/common-for-all/WorkTypeOne";

const SubmitJobtoCandidate = () => {


    const handleSubmitContact = () => {
        setJobDetailsVisible(true)
    }

    const [fromemailjobs, setFromemailjobs] = useState(["harish@varundigitalmedia.com"])
    const Fromemailcontjobs = item => {
        return (
            <div>
                <span>{item}</span>
            </div>
        )
    }

    // email banner starts

    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const templateOptions = [
        { label: "Template 1" },
        { label: "Template 2" },
        { label: "Template 3" }
    ];

    const [selectedSignature, setSelectedSignature] = useState(null);

    const signatureOptions = [
        { label: "Signature 1" },
        { label: "Signature 2" },
        { label: "Signature 3" }
    ];

    // email banner ends

    // jobs all chip ends

    const footerContent = (
        <div>
            <div className="d-flex align-items-center">
                <Checkbox
                    inputId="checkbox"
                />
                <label htmlFor="username" className="ms-2 mt-1">
                    Private
                </label>
            </div>
        </div>
    )
    const [uploadedFiles, setUploadedFiles] = useState([{ name: "Resume.pdf" }]);


    const onUploadHandler1 = (e) => {
        setUploadedFiles((prevFiles) => {
            const newFiles = e.files.filter(
                (newFile) => !prevFiles.some((file) => file.name === newFile.name)
            );
            return [...prevFiles, ...newFiles]; // Append only new files
        });

        // Clear the FileUpload component's internal state
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }

        setAttachmentfile(true);
    };


    const [attachmentfile, setAttachmentfile] = useState(false)
    const fileListRef = useRef(null)
    const fileUploadRef = useRef(null)

    // submit candidate editor starts

    const [candtextEditor, setCandtextEditor] = useState([])

    // submit candidate editor ends



    const [frominputemail, setFrominputemail] = useState(null)

    const [filterValue, setFilterValue] = useState("");


    // jobs all strats

    const [jobDetailsVisible, setJobDetailsVisible] = useState(false)
    const [selectedJobTitles, setSelectedJobTitles] = useState("")
    const [searchText, setSearchText] = useState("")
    const [selectedJobs, setSelectedJobs] = useState([])
    const [jobDescriptions, setJobDescriptions] = useState([])

    const [jobs, setJobs] = useState([
        {
            id: "1",
            designation: "UI/UX Developer",
            name: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
            company: "Varun Digital Media",
            skills: "HTML, CSS, JavaScript, React.js, Node.js",
            email: "lavan9@infosys.com",
            phno: "UI/UX Developer",
            exp: "2 years"
        },
        {
            id: "2",
            designation: "Software Developer",
            name: "Pavan Kumar",
            contactemail: "pavan@varundigitalmedia.com",
            company: "Varun Digital Media",
            skills: "HTML, CSS, JavaScript, React.js, Node.js",
            email: "venkatalaxmi9@cognizant.com",
            phno: "Software Developer",
            exp: "2 years"
        },
        {
            id: "3",
            designation: "Business Analyst",
            name: "Ravi Teja",
            contactemail: "suresh@varundigitalmedia.com",
            company: "Varun Digital Media",
            skills: "On Page SEO, Off Page SEO",
            email: "bhargavi9@capgemini.com",
            phno: "Business Analyst",
            exp: "2 years"
        },
        {
            id: "4",
            designation: "Backend Developer",
            name: "Teja",
            contactemail: "suresh@varundigitalmedia.com",
            company: "Varun Digital Media",
            skills: "Blog Writing, Article Writing",
            email: "nagendra9@catechnologies.com",
            phno: "Backend Developer",
            exp: "2 years"
        },
        {
            id: "5",
            designation: "Frontend Developer",
            name: "Lavan Kumar",
            contactemail: "aman@varundigitalmedia.com",
            company: "Pranathi Software Services",
            skills: "Python, Flask, Django",
            email: "Saikumar9@l&tmindtre.com",
            phno: "Frontend Developer",
            exp: "2 years"
        }
    ]);


    const filteredJobs = jobs.filter(
        job =>
            job.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            job.name.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    )

    // selected candidate details in table format

    const formatJobsToHTMLTable = (jobs) => {
        if (jobs.length === 0) return ""; // Return empty if no jobs

        const defaultText = `Dear [Contact First name], <br> <br>
        Please find below candidate with resume`

        // Create a vertical table structure for each job's details
        const formattedJobDetails = jobs
            .map(
                (job) => `
           <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
              <tr>
               <th> </th>
               <td><b> Candidate </b></td>
               <td>${job.name} - ${job.designation}</td>
             </tr>
             <tr>
               <th> </th>
               <td><b> Primary Skills </b></td>
               <td>${job.skills}</td>
             </tr>
             <tr>
               <th style="text-align: left;"></th>
               <td><b> Contact Details </b></td>
               <td><b>Phone number:</b> ${job.phno} <b>Email:</b> ${job.email}</td>
             </tr>
             <tr>
               <th style="text-align: left;"> </th>
               <td><b> Work Experience </b></td>
               <td>${job.exp}</td>
             </tr>
             <tr>
               <th style="text-align: left;"></th>
               <td><b> Details </b> </td>
               <td><b>Salary Expectation:</b> RS. 9 lakhs, <b>Availability:</b> 23-03-2025, <b>Employment Type:</b> Full time</td>
             </tr>
           </table>
         `
            )
            .join("");

        const defaultSig = ` Best Regards, <br>
 Harish Jaram <br>
 Senoir HR Recruiter <br>
 Varun Digital Media <br>
 Ph: +91-98765343210 `

        // Combine default text, job details, and signature
        return `${defaultText}<br><br>${formattedJobDetails}<br>${defaultSig}`;
    };

    const handleSave = () => {
        // Extract contact details from selected jobs
        const contactDetails = selectedJobs.map(job => ({
            name: job.designation,
            email: job.contactemail,
        }));

        // Format the contact details for display in Chips
        const formattedContacts = contactDetails.map(
            contact => `${contact.email}`
        );

        // Update the jobDescriptions state with the formatted contacts
        setJobDescriptions(prev => [...prev, ...formattedContacts]);

        const candidatesTableHTML = formatJobsToHTMLTable(selectedJobs);

        setCandtextEditor(candidatesTableHTML);

        // Close the Job Details dialog
        setJobDetailsVisible(false);
        SetJobsallPopup(true);
    }

    const handleRefresh = () => {
        setSelectedJobs([])
        setSearchText("")
    }

    // popup
    const [jobsallpopup, SetJobsallPopup] = useState(false)


    const handleOpenDialogs = () => {
        // Open the first dialog
        SetJobsallPopup(true)

        // Automatically open the second dialog after a short delay
        setTimeout(() => {
            setJobDetailsVisible(true)
        }, 3000)
    }

    // jobs all ends


    // select contacts starts

    const [linkContactsVisible, setLinkContactsVisible] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const contacts = [
        {
            id: "1",
            designation: "UI/UX Manager",
            contact: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
        },
        {
            id: "2",
            designation: "HR Recruiter",
            contact: "Giri Jalagam",
            contactemail: "giri@varundigitalmedia.com",
        },
        {
            id: "3",
            designation: "Sales Manager",
            contact: "Salmanuddin",
            contactemail: "salman@varundigitalmedia.com",
        },
        {
            id: "4",
            designation: "SEO Manager",
            contact: "Suresh Reddy",
            contactemail: "suresh@varundigitalmedia.com",
        },
        {
            id: "5",
            designation: "AIML Lead",
            contact: "Aman Kumar",
            contactemail: "aman@varundigitalmedia.com",
        },
    ];

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contactemail.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.id.toString().includes(searchText)
    );

    const handleSaveContact = () => {
        const contactDetails = selectedContacts.map((contact) => ({
            name: contact.contact,
            email: contact.contactemail,
        }));
        const formattedContacts = contactDetails.map(
            (contact) => `${contact.email}`
        );
        setJobDescriptions((prev) => [...prev, ...formattedContacts]);
        setLinkContactsVisible(false);
    };

    const handleRefresh1 = () => {
        setSelectedContacts([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };


    // select contact ends


    //------------ candidate designation dropdown like worktype code start -------------

    const [designationOptions, setDesignationOptions] = useState([
        { label: "Frontend Developer", value: "Frontend Developer" },
        { label: "Backend", value: "Backend" },
        { label: "SEO", value: "SEO" },
        { label: "Content Writer", value: "Content Writer" },
    ]);

    const designationEditor = (options) => {
        const isNew = filterValue &&
            !designationOptions.some(opt =>
                opt.label.toLowerCase() === filterValue.toLowerCase()
            );

        const dropdownOptions = isNew
            ? [
                ...designationOptions,
                { label: `Add "${filterValue}"`, value: filterValue, __isNew: true }
            ]
            : designationOptions;

        return (
            <Dropdown
                value={options.value}
                options={dropdownOptions}
                onChange={e => {
                    if (e.originalEvent?.target?.innerText?.startsWith('Add "')) {
                        setDesignationOptions(prev => [
                            ...prev,
                            { label: e.value, value: e.value }
                        ]);
                    }
                    options.editorCallback(e.value);
                }}
                onFilter={e => setFilterValue(e.filter)}
                filter
                showClear
                placeholder="Select or add Designation"
                className="w-full"
            />
        );
    };

    //------- candidate designation dropdown like worktype code end ------


    // select cc contacts starts
    const [contactDescriptions, setContactDescriptions] = useState([]);
    const [linkContactsVisible1, setLinkContactsVisible1] = useState(false);
    const [selectedContacts1, setSelectedContacts1] = useState([]);

    const contacts1 = [
        {
            id: "1",
            designation: "UI/UX Manager",
            contact: "Mahesh Kumar Bhoga",
            contactemail: "mahesh@varundigitalmedia.com",
        },
        {
            id: "2",
            designation: "HR Recruiter",
            contact: "Giri Jalagam",
            contactemail: "giri@varundigitalmedia.com",
        },
        {
            id: "3",
            designation: "Sales Manager",
            contact: "Salmanuddin",
            contactemail: "salman@varundigitalmedia.com",
        },
        {
            id: "4",
            designation: "SEO Manager",
            contact: "Suresh Reddy",
            contactemail: "suresh@varundigitalmedia.com",
        },
        {
            id: "5",
            designation: "AIML Lead",
            contact: "Aman Kumar",
            contactemail: "aman@varundigitalmedia.com",
        },
    ];

    const filteredContacts1 = contacts1.filter(
        (contact) =>
            contact.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.contactemail.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.id.toString().includes(searchText)
    );

    const handleSaveContact1 = () => {
        const contactDetails = selectedContacts1.map((contact) => ({
            name: contact.contact,
            email: contact.contactemail,
        }));
        const formattedContacts = contactDetails.map(
            (contact) => `${contact.email}`
        );
        setContactDescriptions((prev) => [...prev, ...formattedContacts]);
        setLinkContactsVisible1(false);
    };

    const handleRefresh2 = () => {
        setSelectedContacts1([]); // Reset selected contacts
        setSearchText(""); // Reset search text
    };

    // select cc contact ends


    // worktype dropdown start

    const [designationWorkTypes, setDesignationWorkTypes] = useState([
        { name: 'Manager', color: '#000', id: 'designation-1', statuses: ['Active', 'Inactive'] },
        { name: 'Team Lead', color: '#000', id: 'designation-2', statuses: ['Active', 'Inactive'] },
        { name: 'BA', color: '#000', id: 'designation-3', statuses: ['Active', 'Inactive'] },
        { name: 'Developer', color: '#000', id: 'designation-4', statuses: ['Active', 'Inactive'] },
        { name: 'QA', color: '#000', id: 'designation-5', statuses: ['Active', 'Inactive'] }
    ]);

    const designationDropdownWorkTypes = [
        ...designationWorkTypes,
        { id: 'divider', disabled: true },
        { name: 'Add Designation', id: 'create-new-designation' },
        { name: 'Edit Designation', id: 'edit-selected-designation' }
    ];

    const [selectedDesignation, setSelectedDesignation] = useState(null);
    // const handleDesignationWorkTypesChange = (updatedWorkTypes) => setDesignationWorkTypes(updatedWorkTypes);
    const handleDesignationSelectionChange = (selectedWorkType) => setSelectedDesignation(selectedWorkType);

    const onCellEditComplete = (e) => {
        const { rowData, newValue, field } = e;
        // Update the row in jobs array
        setJobs(prevJobs =>
            prevJobs.map(job =>
                job.id === rowData.id ? { ...job, [field]: newValue } : job
            )
        );
    };

    const handleDesignationWorkTypesChange = (updatedWorkTypes) => {
        setDesignationWorkTypes(updatedWorkTypes);
        // Optionally update dropdownWorkTypes if needed
    };

    // worktype dropdown end


    return (
        <React.Fragment>

            <button
                type="button"
                className="btn btn-secondary import-res-btn me-1"
                onClick={handleSubmitContact}
            >
                Add Team
            </button>


            {/* submit candidate to job */}
            <Dialog
                header="Submit Job to Candidate"
                visible={jobsallpopup}
                className="interview-popup"
                onHide={() => {
                    SetJobsallPopup(false)
                }}
                style={{ width: "75vw", height: "82%" }}
                maximizable
                modal
                footer={footerContent}
            >
                <Row>
                    <div className="popup-header-bg">
                        <Col lg={12} className="d-flex align-items-center">
                            <Dropdown
                                value={selectedTemplate}
                                // onChange={(e) => setSelectedTemplate(e.value)}
                                options={templateOptions}
                                placeholder="Template"
                                className="w-full md:w-10rem me-2"
                            />
                            <Dropdown
                                value={selectedSignature}
                                // onChange={(e) => setSelectedSignature(e.value)} 
                                options={signatureOptions}
                                placeholder="Signature"
                                className="w-full md:w-10rem me-2"
                            />

                            <div className="d-inline-block">
                                <FileUpload
                                    name="emailAttachments[]"
                                    url={'/api/upload'}
                                    mode="basic"
                                    multiple
                                    accept="image/*,application/pdf"
                                    maxFileSize={5000000}
                                    auto
                                    chooseLabel={<span>Attach File</span>}
                                    customUpload
                                    uploadHandler={onUploadHandler1}
                                    className="me-2"
                                />
                            </div>

                            <Button className="preview-btn me-2">
                                <i className="pi pi-eye me-1"></i> Preview
                            </Button>
                            <Button className="preview-btn ms-auto" onClick={() => { SetJobsallPopup(false) }}>
                                <i className="pi pi-send me-1"></i> Send
                            </Button>
                        </Col>
                    </div>
                </Row>

                <div className="bg-form form-insidepop">
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            value={frominputemail}
                                            // onChange={e => setFrominputemail(e.value)}
                                            onClick={(e) => e.preventDefault()}
                                            // options={fromEmail}
                                            optionLabel="name"
                                            placeholder="From"
                                            className="from-width w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>
                                    <Chips
                                        value={fromemailjobs}
                                        onChange={e => setFromemailjobs(e.value)}
                                        itemTemplate={Fromemailcontjobs}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            placeholder="To"
                                            className="from-width w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible(true);
                                            }}
                                            showClear={false}
                                            showOnFocus={false}
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>

                                    <Chips
                                        value={jobDescriptions}
                                        onChange={(e) => setJobDescriptions(e.value)}
                                        className="size-mail w-full"
                                    />

                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={1} className="pe-0">
                                    <div className="label-input">
                                        <Dropdown
                                            placeholder="Cc"
                                            className="from-width w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setLinkContactsVisible1(true);
                                            }}
                                            showClear={false}
                                            showOnFocus={false}
                                        />
                                    </div>
                                </Col>
                                <Col xl={11}>

                                    <Chips
                                        value={contactDescriptions}
                                        onChange={(e) => setContactDescriptions(e.value)}
                                        className="size-mail w-full"
                                    />
                                </Col>
                            </Row>

                            <Row className="size-mail mb-1">
                                <Col xl={1}>
                                    <label htmlFor="interview">Subject:</label>
                                </Col>
                                <Col xl={11}>
                                    <InputText
                                        id="interview"
                                        aria-describedby="username-help"
                                        placeholder=""
                                        className="w-full"
                                    />
                                </Col>
                            </Row>

                            {/* Attached Files Section */}
                            {uploadedFiles.length > 0 && ( // Always show if there are files
                                <Row className="size-mail mt-2 align-items-baseline">
                                    <Col xl={1}>
                                        <label>Attached:</label>
                                    </Col>

                                    <Col xl={11}>
                                        {/* Scrollable File List */}
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {/* Uploaded Files List */}
                                            <div
                                                ref={fileListRef}
                                                style={{
                                                    display: "flex",
                                                    overflowX: "auto",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "100%",
                                                    padding: "10px 0px",
                                                    borderRadius: "4px",
                                                }}
                                            >
                                                {uploadedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            marginRight: "15px",
                                                            padding: "5px 10px",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            background: "#f9f9f9",
                                                            boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                                                        }}
                                                    >
                                                        <div>
                                                            <i
                                                                className="pi pi-file"
                                                                style={{ marginRight: "5px" }}
                                                            ></i>
                                                            <span>{file.name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Editor
                                // value={emailtextEditor} 
                                // onTextChange={e => setEmailtextEditor(e.htmlValue)}
                                value={candtextEditor}
                                onTextChange={e => setCandtextEditor(e.htmlValue)}
                                className="jobsall-editor"
                            />

                        </Col>
                    </Row>
                </div>
            </Dialog>

            {/* select job popup */}
            <Dialog
                header="Select Team Members"
                visible={jobDetailsVisible}
                onHide={() => setJobDetailsVisible(false)}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details Addteam-popup"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div
                            className="p-inputgroup mb-3"
                            style={{ position: "relative" }}
                        >
                            <InputText
                                placeholder="Search Team Members"
                                value={searchText}
                                onInput={e => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }} // Space for the icon
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    value={filteredJobs}
                    paginator
                    rows={5}
                    selection={selectedJobs}
                    onSelectionChange={e => setSelectedJobs(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small"
                    editMode="cell" // <-- Change to cell editing
                    onCellEditComplete={e => {
                        // Update your jobs array here if you want to persist changes
                        const { rowData, newValue, field } = e;
                        rowData[field] = newValue;
                        // If you want to update the main jobs array, do it here
                    }}
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="name" header="Employee Name" />
                    {/* <Column field="designation" header="Designation" /> */}
                    <Column field="phno" header="Designation" />

                    {/* <Column
                        field="designation"
                        header="Designation"
                        editor={designationEditor}
                        editable
                    /> */}




                    {/* <Column
                    field="designation"
                    header="Project Role"
                    style={{ minWidth: '180px', fontWeight: 'bold' }}
                    body={(rowData, options) => (
                        <WorkType1
                        initialWorkTypes={designationWorkTypes}
                        dropdownWorkTypes={designationDropdownWorkTypes}
                        onWorkTypesChange={() => {}} // No-op: don't update options
                        onSelectionChange={handleDesignationSelectionChange}
                        rowData={rowData}
                        rowIndex={options.rowIndex}
                        mode="display"
                        className="bgclr"
                        />
                    )}
                    editor={(options) => (
                        <WorkType1
                        initialWorkTypes={designationWorkTypes}
                        dropdownWorkTypes={designationDropdownWorkTypes}
                        onWorkTypesChange={() => {}} // No-op: don't update options
                        onSelectionChange={val => options.editorCallback(val.name || val)}
                        rowData={options.rowData}
                        rowIndex={options.rowIndex}
                        mode="edit"
                        editorCallback={options.editorCallback}
                        className="bgclr"
                        />
                    )}
                    onCellEditComplete={onCellEditComplete}
                    /> */}

                    <Column
                        field="designation"
                        header="Project Role"
                        style={{ minWidth: '180px', fontWeight: 'bold' }}
                        body={(rowData, options) => (
                            <WorkType1
                                initialWorkTypes={designationWorkTypes}
                                dropdownWorkTypes={designationDropdownWorkTypes}
                                value={rowData.designation} // Pass the current row's designation
                                onWorkTypesChange={() => { }}
                                onSelectionChange={handleDesignationSelectionChange}
                                rowData={rowData}
                                rowIndex={options.rowIndex}
                                mode="display"
                                className="bgclr"
                            />
                        )}
                        editor={(options) => (
                            <WorkType1
                                initialWorkTypes={designationWorkTypes}
                                dropdownWorkTypes={designationDropdownWorkTypes}
                                value={options.rowData.designation} // Pass the current row's designation
                                onWorkTypesChange={() => { }}
                                onSelectionChange={val => options.editorCallback(val.name || val)}
                                rowData={options.rowData}
                                rowIndex={options.rowIndex}
                                mode="edit"
                                editorCallback={options.editorCallback}
                                className="bgclr"
                            />
                        )}
                        onCellEditComplete={onCellEditComplete}
                    />

                    <Column field="company" header="Company" />

                    {/* Remove the rowEditor column */}
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        // onClick={handleSave}
                        onClick={() => setJobDetailsVisible(false)}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

            {/* select contactsform popup for To */}
            <Dialog
                header="Select Contact"
                visible={linkContactsVisible}
                onHide={() => setLinkContactsVisible(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: "relative" }}>
                            <InputText
                                placeholder="Search Contact"
                                value={searchText}
                                onInput={(e) => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }}
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    key={selectedContacts.length} // Force re-render when selectedContacts changes
                    value={filteredContacts}
                    paginator
                    rows={5}
                    selection={selectedContacts}
                    onSelectionChange={(e) => setSelectedContacts(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small"
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="contact" header="Contact Name" />
                    <Column field="designation" header="Designation" />
                    <Column field="contactemail" header="Email" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSaveContact}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefresh1}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>

            {/* select contactsform popup for cc */}
            <Dialog
                header="Select Contact"
                visible={linkContactsVisible1}
                onHide={() => setLinkContactsVisible1(false)}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: "relative" }}>
                            <InputText
                                placeholder="Search Contact"
                                value={searchText}
                                onInput={(e) => setSearchText(e.target.value)}
                                style={{ paddingRight: "2rem" }}
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "49%",
                                    transform: "translateY(-50%)",
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    key={selectedContacts1.length} // Force re-render when selectedContacts1 changes
                    value={filteredContacts1}
                    paginator
                    rows={5}
                    selection={selectedContacts1}
                    onSelectionChange={(e) => setSelectedContacts1(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small"
                >
                    <Column selectionMode="multiple" style={{ width: "3em" }} />
                    <Column field="contact" header="Contact Name" />
                    <Column field="designation" header="Designation" />
                    <Column field="contactemail" header="Email" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex mt-3">
                    <button
                        type="button"
                        className="btn btn-primary me-2 btn-main"
                        onClick={handleSaveContact1}
                    >
                        Ok
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-main"
                        onClick={handleRefresh2}
                    >
                        Refresh
                    </button>
                </div>
            </Dialog>


        </React.Fragment>
    )
}
export default SubmitJobtoCandidate