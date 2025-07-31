import React, { useState, useRef, useEffect, useMemo } from "react"
import { Col, Row } from "reactstrap";
import { CascadeSelect } from "primereact/cascadeselect";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TalentScan = () => {

    const [selectedTalentScan, setSelectedTalentScan] = useState(null);

    const talentScanOptions = [
        { name: "AI Screening", code: "TS-SC", onClick: () => SetInterviewpop(true) },
        { name: "AI Shortlisting", code: "TS-SL", onClick: () => setShortlistpop(true) },
    ];

    // interview popup starts
    const [interviewpop, SetInterviewpop] = useState(false)
    const [shortlistpop, setShortlistpop] = useState(false)


    const [intertype, setintertype] = useState("Call bot")

    const [subtype, setSubtype] = useState(null)
    const [startdate, setStartdate] = useState(new Date())
    const [starttime, setStarttime] = useState(new Date())
    const [endtime, setendtime] = useState(new Date(new Date().setHours(new Date().getHours() + 1)));
    const [enddate, setenddate] = useState(new Date());
    const [popTextares, setPopTextares] = useState("")
    const [priority, setPriority] = useState(null)
    const [condidatevalu, setcondidatevalu] = useState([])

    const typeInterview = [
        { name: "Agent Calling", value: "AC" },
    ]

    const priorityValue = [
        { name: "Low", value: "low" },
        { name: "Medium", value: "medium" },
        { name: "High", value: "high" },
    ]

    const [typeInterviewcondi, settypeInterviewcondi] = useState([])
    const [subjectval, setsubjectval] = useState(null)
    const [popchecked2, setPopchecked2] = useState(false)
    const handlePopupCheckbox2 = e => {
        setPopchecked2(e.checked)
    }

    const [userid, setUserid] = useState(["Harish"])
    const customChip = item => {
        return (
            <div>
                <span>{item}</span>
                {/* <i className="pi pi-user-plus"></i> */}
            </div>
        )
    }
    const [popchecked, setPopchecked] = useState(false)
    const handlePopupCheckbox = e => {
        setPopchecked(e.checked)
    }
    // interview popup ends

    // date changes

    useEffect(() => {
        setenddate(startdate);
    }, [startdate]);


    const handleStartTimeChange = (e) => {
        const selectedTime = e.value;
        setStarttime(selectedTime);

        // Set end time to be 1 hour ahead of start time
        const newEndTime = new Date(selectedTime);
        newEndTime.setHours(selectedTime.getHours() + 1);
        setenddate(newEndTime);
    };

    // job details popup

    const [selectedJobTitles, setSelectedJobTitles] = useState('');
    const [selectedContact, setSelectedContact] = useState('');
    const [jobDetailsVisible, setJobDetailsVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedJobs, setSelectedJobs] = useState([]);

    const [jobs] = useState([
        { id: "Job-101", title: 'Web Developer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-102", title: 'Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-103", title: 'Project Manager', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-104", title: 'Jr. Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-105", title: 'HR Specialist', contact: 'Giri Jalagam' },
    ]);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    );

    const handleSave = () => {
        const selectedJobTitles = selectedJobs.map((job) => `${job.title}, ${job.id}`).join(', ');
        const selectedContact = selectedJobs.map((job => `${job.contact}`));
        setSelectedJobTitles(selectedJobTitles);
        setSelectedContact(selectedContact);
        setJobDetailsVisible(false);
    };

    const handleRefresh = () => {
        setSelectedJobs([]);
        setSearchText('');
    };

    const handleIconClick = () => {
        setJobDetailsVisible(true);
    };

    // job details popup for shortlisting

    const [selectedJobTitles1, setSelectedJobTitles1] = useState('');
    const [selectedContact1, setSelectedContact1] = useState('');
    const [jobDetailsVisible1, setJobDetailsVisible1] = useState(false);
    const [searchText1, setSearchText1] = useState('');
    const [selectedJobs1, setSelectedJobs1] = useState([]);

    const [jobs1] = useState([
        { id: "Job-101", title: 'Web Developer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-102", title: 'Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-103", title: 'Project Manager', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-104", title: 'Jr. Graphic Designer', contact: 'Mahesh Kumar Bhoga' },
        { id: "Job-105", title: 'HR Specialist', contact: 'Giri Jalagam' },
    ]);

    const filteredJobs1 = jobs1.filter(
        (job) =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    );

    const handleSave1 = () => {
        const selectedJobTitles1 = selectedJobs1.map((job) => `${job.title}, ${job.id}`).join(', ');
        const selectedContact1 = selectedJobs1.map((job => `${job.contact}`));
        setSelectedJobTitles1(selectedJobTitles1);
        setSelectedContact1(selectedContact1);
        setJobDetailsVisible1(false);
    };

    const handleRefresh1 = () => {
        setSelectedJobs1([]);
        setSearchText1('');
    };

    const handleIconClick1 = () => {
        setJobDetailsVisible1(true);
    };

    return (
        <React.Fragment>

            <Dropdown
                options={talentScanOptions}
                onChange={(e) => {
                    setSelectedTalentScan(e.value);
                    if (e.value && e.value.onClick) {
                        e.value.onClick();
                    }
                }}
                optionLabel="name"
                className="md:w-11rem me-1 ms-1 screendrp bgclr"
                placeholder="Talent Scan"
            />


            {/* screening popup starts */}
            <Dialog
                header="AI Screening"
                visible={interviewpop}
                className="interview-popup"
                style={{ width: "50vw" }}
                onHide={() => {
                    SetInterviewpop(false)
                }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText
                                            disabled
                                            value={intertype}
                                            onChange={e => setintertype(e.target.value)}
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="integer" className=" block">
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={e => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"
                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={e => setStartdate(e.value)}
                                                    dateFormat="dd-mm-yy"
                                                    showIcon
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={e => setStarttime(e.value)}
                                                    showIcon
                                                    hourFormat="12"
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={e => setenddate(e.value)}
                                                    dateFormat="dd-mm-yy"
                                                    showIcon
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={e => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                    hourFormat="12"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div className="mb-4">
                            <Row className="mb-2">

                                {/* <LinkContactsPopup /> */}

                                <Col xl={6}>
                                    <label htmlFor="job" className="block mb-0">Jobs</label>

                                    <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                        <InputText
                                            id="job"
                                            value={selectedJobTitles}
                                            onChange={(e) => setSelectedJobTitles(e.target.value)}
                                            placeholder="Select Jobs"
                                            className="w-full"
                                            style={{ paddingRight: '2rem' }}
                                        />
                                        <i
                                            className="pi pi-chevron-down"
                                            onClick={handleIconClick}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                        ></i>
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <label htmlFor="contact" className="block mb-0">Contact</label>
                                    <InputText
                                        id="contact"
                                        className="w-full"
                                        value={selectedContact}
                                        onChange={(e) => setSelectedContact(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => {
                                                condidatelist(e)
                                            }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Lavankumar Kalvala, Venkata laxmi, bhargavi..`}
                                            maxSelectedLabels={0}
                                            className="w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText
                                            placeholder="Subject"
                                            value={subjectval}
                                            onChange={e => setsubjectval(e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={e => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div>
                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label For="Priority" className=" block">
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={e => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>
                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">
                                                            Completed
                                                        </label>
                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">
                                                            Private
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips
                                        value={userid}
                                        onChange={e => setUserid(e.value)}
                                        itemTemplate={customChip}
                                        className="w-full"
                                    />
                                </Col>
                            </Row>
                        </div>

                        <Row className="mt-2">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                                        onClick={() => SetInterviewpop(false)}
                                    >
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                        onClick={() => SetInterviewpop(false)}
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </p>
                </form>
            </Dialog>
            {/* screening popup ends */}

            {/* job details popup starts */}

            <Dialog
                header="Link Jobs"
                visible={jobDetailsVisible}
                onHide={() => setJobDetailsVisible(false)}
                style={{ width: '40vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                            <InputText
                                placeholder="Search Jobs"
                                value={searchText}
                                onInput={(e) => setSearchText(e.target.value)}
                                style={{ paddingRight: '2rem' }} // Space for the icon
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '49%',
                                    transform: 'translateY(-50%)',
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
                    onSelectionChange={(e) => setSelectedJobs(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small" // Set size to small
                >
                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                    <Column field="id" header="Job ID" />
                    <Column field="title" header="Job Title" />
                    <Column field="contact" header="Contact" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex  mt-3">
                    {/* <Button label="Save" icon="pi pi-save" onClick={handleSave} />
                                                                    <Button label="Refresh" icon="pi pi-refresh" onClick={handleRefresh} className="p-button-secondary" /> */}
                    <button type="button" class="btn btn-primary me-2 btn-main" onClick={handleSave}>Submit to Call bot</button>
                    <button type="button" class="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
                </div>
            </Dialog>

            {/* job details popup ends */}


            {/* shortlisting popup starts */}

            <Dialog
                header="AI Shortlisting"
                visible={shortlistpop}
                className="interview-popup"
                style={{ width: "50vw" }}
                onHide={() => {
                    setShortlistpop(false)
                }}
            >
                <form>
                    <p className="bg-form">
                        <div className="mb-4">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="interview">Type</label>
                                        <InputText
                                            disabled
                                            value={intertype}
                                            onChange={e => setintertype(e.target.value)}
                                        />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="integer" className=" block">
                                            Sub-Type
                                        </label>
                                        <Dropdown
                                            value={subtype}
                                            onChange={e => setSubtype(e.value)}
                                            options={typeInterview}
                                            optionLabel="name"
                                            placeholder="Subtype"
                                            className="w-full search-option"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Start date
                                                </label>
                                                <Calendar
                                                    value={startdate}
                                                    onChange={e => setStartdate(e.value)}
                                                    dateFormat="dd-mm-yy"
                                                    showIcon
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <div className="p-field flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>
                                                <Calendar
                                                    value={starttime}
                                                    onChange={e => setStarttime(e.value)}
                                                    showIcon
                                                    hourFormat="12"
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xl={6}>
                                    <Row className="mb-2">
                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    End date
                                                </label>
                                                <Calendar
                                                    value={enddate}
                                                    onChange={e => setenddate(e.value)}
                                                    dateFormat="dd-mm-yy"
                                                    showIcon
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <div className="flex-auto">
                                                <label htmlFor="buttondisplay" className="block">
                                                    Time
                                                </label>

                                                <Calendar
                                                    value={endtime}
                                                    onChange={e => setendtime(e.value)}
                                                    showIcon
                                                    timeOnly
                                                    icon={() => <i className="pi pi-clock" />}
                                                    hourFormat="12"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div className="mb-4">
                            <Row className="mb-2">

                                {/* <LinkContactsPopup /> */}

                                <Col xl={6}>
                                    <label htmlFor="job" className="block mb-0">Jobs</label>

                                    <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                        <InputText
                                            id="job"
                                            value={selectedJobTitles1}
                                            onChange={(e) => setSelectedJobTitles1(e.target.value)}
                                            placeholder="Select Jobs"
                                            className="w-full"
                                            style={{ paddingRight: '2rem' }}
                                        />
                                        <i
                                            className="pi pi-chevron-down"
                                            onClick={handleIconClick1}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                        ></i>
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <label htmlFor="contact" className="block mb-0">Contact</label>
                                    <InputText
                                        id="contact"
                                        className="w-full"
                                        value={selectedContact1}
                                        onChange={(e) => setSelectedContact1(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label For="Candidate">Candidate</label>
                                        <MultiSelect
                                            value={condidatevalu}
                                            disabled
                                            onChange={e => {
                                                condidatelist(e)
                                            }}
                                            options={typeInterviewcondi}
                                            optionLabel="name"
                                            placeholder={`Lavankumar Kalvala, Venkata laxmi, bhargavi..`}
                                            maxSelectedLabels={0}
                                            className="w-full"
                                        />
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="p-field flex flex-column">
                                        <label htmlFor="username">Subject</label>
                                        <InputText
                                            placeholder="Subject"
                                            value={subjectval}
                                            onChange={e => setsubjectval(e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-3">
                                <Col xl={12}>
                                    <div className="">
                                        <InputTextarea
                                            className="w-full"
                                            value={popTextares}
                                            onChange={e => setPopTextares(e.target.value)}
                                            placeholder="Interview Test"
                                            rows={3}
                                            cols={20}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div>
                            <Row className="mb-2">
                                <Col lg={6}>
                                    <Row>
                                        <Col xl={6}>
                                            <div className="p-field flex flex-column">
                                                <label For="Priority" className=" block">
                                                    Priority
                                                </label>
                                                <Dropdown
                                                    value={priority}
                                                    onChange={e => setPriority(e.value)}
                                                    options={priorityValue}
                                                    optionLabel="name"
                                                    placeholder="Priority"
                                                    className="w-full search-option"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6}>
                                            <Row className="mt-2">
                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked}
                                                            onChange={handlePopupCheckbox}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">
                                                            Completed
                                                        </label>
                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="d-flex align-items-center mt-4">
                                                        <Checkbox
                                                            inputId="checkbox"
                                                            checked={popchecked2}
                                                            onChange={handlePopupCheckbox2}
                                                        />
                                                        <label htmlFor="username" className="ms-1 mt-2">
                                                            Private
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={6}>
                                    <label htmlFor="username">User Id's</label>
                                    <Chips
                                        value={userid}
                                        onChange={e => setUserid(e.value)}
                                        itemTemplate={customChip}
                                        className="w-full"
                                    />
                                </Col>
                            </Row>
                        </div>

                        <Row className="mt-2">
                            <Col xl={12}>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                                        onClick={()=>setShortlistpop(false)}
                                    >
                                        <i className="pi pi-save me-1"></i>
                                        Save
                                    </button>
                                    <button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                        onClick={() => setShortlistpop(false)}
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </p>
                </form>
            </Dialog>

            {/* shortlisting popup ends */}


            {/* job details popup for shortlisting starts */}

            <Dialog
                header="Link Jobs"
                visible={jobDetailsVisible1}
                onHide={() => setJobDetailsVisible1(false)}
                style={{ width: '40vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                className="cand-details"
            >
                {/* Search Bar */}
                <Row>
                    <Col lg={12}>
                        <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                            <InputText
                                placeholder="Search Jobs"
                                value={searchText1}
                                onInput={(e) => setSearchText1(e.target.value)}
                                style={{ paddingRight: '2rem' }} // Space for the icon
                            />
                            <i
                                className="pi pi-search"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '49%',
                                    transform: 'translateY(-50%)',
                                }}
                            ></i>
                        </div>
                    </Col>
                </Row>

                {/* DataTable */}
                <DataTable
                    value={filteredJobs1}
                    paginator
                    rows={5}
                    selection={selectedJobs1}
                    onSelectionChange={(e) => setSelectedJobs1(e.value)}
                    dataKey="id"
                    rowsPerPageOptions={[5, 10, 25]}
                    size="small" // Set size to small
                >
                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                    <Column field="id" header="Job ID" />
                    <Column field="title" header="Job Title" />
                    <Column field="contact" header="Contact" />
                </DataTable>

                {/* Actions */}
                <div className="d-flex  mt-3">
                    {/* <Button label="Save" icon="pi pi-save" onClick={handleSave} />
                                                                    <Button label="Refresh" icon="pi pi-refresh" onClick={handleRefresh} className="p-button-secondary" /> */}
                    <button type="button" class="btn btn-primary me-2 btn-main" onClick={handleSave1}>Submit to Call bot</button>
                    <button type="button" class="btn btn-primary btn-main" onClick={handleRefresh1}>Refresh</button>
                </div>
            </Dialog>

            {/* job details popup for shortlisting ends */}

        </React.Fragment>
    )
}

export default TalentScan;