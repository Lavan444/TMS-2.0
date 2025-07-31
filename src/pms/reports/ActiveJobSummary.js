import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { saveAs } from 'file-saver';


const ActiveJobSummary = () => {
    const [pageState, setPageState] = useState({ first: 0, rows: 10 });
    const [loading, setLoading] = useState(false);
    const onPage = (e) => {
        setPageState({
            first: e.first,
            rows: e.rows
        });
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        openings: { value: null, matchMode: FilterMatchMode.EQUALS },
        shortlisted: { value: null, matchMode: FilterMatchMode.EQUALS },
        offer_released: { value: null, matchMode: FilterMatchMode.EQUALS },
        joined: { value: null, matchMode: FilterMatchMode.EQUALS },
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        owner_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });


    const jobs = [
        {
            job_id: "Job-101",
            job_title: "Software Engineer (Full Stack)",
            priority: "High",
            openings: 12,
            shortlisted: 45,
            offer_released: 8,
            joined: 5,
            candidate: "Rahul Sharma",
            status: "Offer Accepted",
            start_date: "15-01-2025",
            end_date: "14-01-2026",
            location: "Bengaluru, Karnataka",
            skills: ["React", "Node.js", "MongoDB"],
            experience: "3-5 years",
            salary_range: "₹12L - ₹18L PA",
            owner_id: "Harish",
            company: "TechMahindra"
        },
        {
            job_id: "Job-102",
            job_title: "HR Recruiter",
            priority: "Medium",
            openings: 5,
            shortlisted: 23,
            offer_released: 4,
            joined: 3,
            candidate: "Priya Patel",
            status: "Offer Pending",
            start_date: "01-12-2024",
            end_date: "30-11-2025",
            location: "Hyderabad, Telangana",
            skills: ["Talent Acquisition", "LinkedIn Recruiter"],
            experience: "2-4 years",
            salary_range: "₹6L - ₹9L PA",
            owner_id: "Giri",
            company: "Infosys"
        },
        {
            job_id: "Job-103",
            job_title: "Data Analyst",
            priority: "Critical",
            openings: 8,
            shortlisted: 32,
            offer_released: 6,
            joined: 4,
            candidate: "Amit Kumar",
            status: "Joined",
            start_date: "10-02-2025",
            end_date: "09-02-2026",
            location: "Pune, Maharashtra",
            skills: ["Python", "SQL", "Tableau"],
            experience: "4-6 years",
            salary_range: "₹10L - ₹15L PA",
            owner_id: "Pavan",
            company: "TCS"
        },
        {
            job_id: "Job-104",
            job_title: "DevOps Engineer",
            priority: "High",
            openings: 6,
            shortlisted: 18,
            offer_released: 5,
            joined: 3,
            candidate: "Neha Gupta",
            status: "Offer Declined",
            start_date: "05-03-2025",
            end_date: "04-03-2026",
            location: "Gurugram, Haryana",
            skills: ["AWS", "Docker", "Kubernetes"],
            experience: "5-7 years",
            salary_range: "₹15L - ₹22L PA",
            owner_id: "Bhavani",
            company: "Wipro"
        },
        {
            job_id: "Job-105",
            job_title: "Frontend Developer",
            priority: "Medium",
            openings: 10,
            shortlisted: 28,
            offer_released: 7,
            joined: 5,
            candidate: "Sanjay Verma",
            status: "Joined",
            start_date: "20-01-2025",
            end_date: "19-01-2026",
            location: "Chennai, Tamil Nadu",
            skills: ["React", "TypeScript", "Redux"],
            experience: "3-5 years",
            salary_range: "₹9L - ₹14L PA",
            owner_id: "Deepika",
            company: "HCL Technologies"
        },
        {
            job_id: "Job-106",
            job_title: "QA Automation Engineer",
            priority: "Low",
            openings: 4,
            shortlisted: 15,
            offer_released: 3,
            joined: 2,
            candidate: "Anjali Singh",
            status: "Offer Released",
            start_date: "01-11-2024",
            end_date: "31-10-2025",
            location: "Noida, Uttar Pradesh",
            skills: ["Selenium", "Java", "JIRA"],
            experience: "2-4 years",
            salary_range: "₹7L - ₹10L PA",
            owner_id: "Bhavani",
            company: "Accenture"
        },
        {
            job_id: "Job-107",
            job_title: "Product Manager",
            priority: "High",
            openings: 3,
            shortlisted: 12,
            offer_released: 2,
            joined: 1,
            candidate: "Vikram Joshi",
            status: "On Hold",
            start_date: "15-04-2025",
            end_date: "14-04-2026",
            location: "Mumbai, Maharashtra",
            skills: ["Agile", "Product Roadmaps"],
            experience: "8-10 years",
            salary_range: "₹25L - ₹35L PA",
            owner_id: "Pavan",
            company: "Flipkart"
        },
        {
            job_id: "Job-108",
            job_title: "Java Backend Developer",
            priority: "Critical",
            openings: 7,
            shortlisted: 25,
            offer_released: 6,
            joined: 4,
            candidate: "Rajesh Iyer",
            status: "Joined",
            start_date: "10-03-2025",
            end_date: "09-03-2026",
            location: "Kochi, Kerala",
            skills: ["Spring Boot", "Microservices"],
            experience: "5-8 years",
            salary_range: "₹18L - ₹25L PA",
            owner_id: "Harish",
            company: "Cognizant"
        },
        {
            job_id: "Job-109",
            job_title: "UI/UX Designer",
            priority: "Medium",
            openings: 5,
            shortlisted: 20,
            offer_released: 4,
            joined: 3,
            candidate: "Meera Nair",
            status: "Offer Accepted",
            start_date: "05-02-2025",
            end_date: "04-02-2026",
            location: "Ahmedabad, Gujarat",
            skills: ["Figma", "Adobe XD"],
            experience: "4-6 years",
            salary_range: "₹12L - ₹16L PA",
            owner_id: "Giri",
            company: "Zoho"
        },
        {
            job_id: "Job-110",
            job_title: "Cloud Architect",
            priority: "High",
            openings: 2,
            shortlisted: 8,
            offer_released: 1,
            joined: 1,
            candidate: "Arun Malik",
            status: "Joined",
            start_date: "01-01-2025",
            end_date: "31-12-2025",
            location: "Delhi",
            skills: ["Azure", "Terraform"],
            experience: "10+ years",
            salary_range: "₹30L - ₹45L PA",
            owner_id: "Deepika",
            company: "Amazon India"
        }
    ];



    const [selectedJobs, setSelectedJobs] = useState([]);

    const onSelectionChange = (e) => {
        setSelectedJobs(e.value); // Update the selectedJobs state with the selected rows
    };

    const onRowReorder = (e) => {
        setCustomers(e.value);
    };

    // export 

    const dt = useRef(null);

    // Export to CSV
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    // Export to PDF
    const exportPdf = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default();
                const exportColumns = [
                    { title: "Job ID", dataKey: "job_id" },
                    { title: "Job Title", dataKey: "job_title" },
                    { title: "Priority", dataKey: "priority" },
                    { title: "Openings", dataKey: "openings" },
                    { title: "Shortlisted", dataKey: "shortlisted" },
                    { title: "Offer Released", dataKey: "offer_released" },
                    { title: "Joined", dataKey: "joined" },
                    { title: "Candidate", dataKey: "candidate" },
                    { title: "Status", dataKey: "status" },
                    { title: "Start Date", dataKey: "start_date" },
                    { title: "End Date", dataKey: "end_date" },
                    { title: "Owner (User ID)", dataKey: "owner_id" }
                ];
                doc.autoTable({
                    columns: exportColumns,
                    body: jobs
                });
                doc.save("jobs.pdf");
            });
        });
    };

    // xlsx
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(selectedJobs);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'selectedJobs');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };


    return (
        <React.Fragment>
            <div className="page-content allact-tabs">
                <Container fluid={true}>
                    <div className="page-title-box actjobbread">
                        <Row className="align-items-center actjobsum">
                            <Col sm={6} md={6} lg={8}>
                                <h1 class="page-title">Active Job Summary Report</h1>
                            </Col>

                            <Col sm={6} md={6} lg={4}>
                                <div className="allbtns d-flex gap-2 justify-content-end">
                                    <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} tooltip="Export to CSV" tooltipOptions={{ position: 'left' }} className="csvbtn" />
                                    <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} tooltip="Export to XLS" tooltipOptions={{ position: 'top' }} className="xlsbtn" />
                                    <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} tooltip="Export to PDF" tooltipOptions={{ position: 'bottom' }} className="pdfbtn" />
                                    <Button type="button" icon="pi pi-print" severity="warning" rounded tooltip="Print" className="printbtn" tooltipOptions={{ position: 'bottom' }} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <section className="job-datatable-section">
                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                        <DataTable
                                            showGridlines
                                            ref={dt}
                                            value={jobs}
                                            tableStyle={{ minWidth: '50rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                                            // header={header}
                                            // paginator
                                            rows={pageState.rows}
                                            first={pageState.first}
                                            rowsPerPageOptions={[5, 10, 25, 50]}
                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                            onPage={onPage}
                                            dataKey="job_id"
                                            filters={filters}
                                            filterDisplay="row"
                                            loading={loading}
                                            globalFilterFields={[
                                                'job_id',
                                                'job_title',
                                                'priority',
                                                'openings',
                                                'shortlisted',
                                                'offer_released',
                                                'joined',
                                                'candidate',
                                                'status',
                                                'start_date',
                                                'end_date',
                                                'owner_id'
                                            ]}
                                            scrollable
                                            emptyMessage="No jobs found."
                                            selection={selectedJobs}
                                            onSelectionChange={onSelectionChange}
                                            selectionMode="multiple"
                                            reorderableRows
                                            onRowReorder={onRowReorder}
                                            totalRecords={jobs.length}
                                            resizableColumns
                                            columnResizeMode="expand"
                                        >
                                            {/* <Column selectionMode="multiple" headerStyle={{ width: '3em',padding:'12px 12px' }} /> */}
                                            <Column field="job_id" sortable header="Job Id" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="job_title" sortable header="Job Title" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="priority" sortable header="Priority" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="openings" sortable header="Openings" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="shortlisted" sortable header="Shortlisted" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="offer_released" sortable header="Offer Released" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="joined" sortable header="Joined" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="candidate" sortable header="Candidate" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="status" sortable header="Status" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="start_date" sortable header="Start Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="end_date" sortable header="End Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="owner_id" sortable header="Owner (User ID)" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                        </DataTable>
                                    </div>
                                </section>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

        </React.Fragment>
    );
};



export default ActiveJobSummary;