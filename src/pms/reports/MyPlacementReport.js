import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
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
        candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        placement_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        no_of_days: { value: null, matchMode: FilterMatchMode.EQUALS },
        start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        owner_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const jobs = [
        { candidate: "Ajay Kumar", job_id: "Job-101", job_title: "Python Developer", contact: "Shweta Shashi", placement_date: "30-01-2025", status: "Active", no_of_days: 30, start_date: "01-01-2025", end_date: "31-12-2025", owner_id: "Hari" },
        { candidate: "Rahul Singh", job_id: "Job-102", job_title: "Frontend Developer", contact: "Ankita Mehra", placement_date: "15-02-2025", status: "On Hold", no_of_days: 20, start_date: "01-02-2025", end_date: "31-10-2025", owner_id: "Raj" },
        { candidate: "Priya Verma", job_id: "Job-103", job_title: "Backend Developer", contact: "Nisha Roy", placement_date: "01-03-2025", status: "Inactive", no_of_days: 40, start_date: "01-03-2025", end_date: "30-11-2025", owner_id: "Ravi" },
        { candidate: "Amit Sharma", job_id: "Job-104", job_title: "Software Engineer", contact: "Pooja Gupta", placement_date: "10-04-2025", status: "Active", no_of_days: 50, start_date: "01-04-2025", end_date: "31-12-2025", owner_id: "Neha" },
        { candidate: "Sanya Patel", job_id: "Job-105", job_title: "QA Engineer", contact: "Gaurav Tiwari", placement_date: "12-05-2025", status: "Active", no_of_days: 60, start_date: "01-05-2025", end_date: "30-11-2025", owner_id: "Ravi" },
        { candidate: "Vikas Sharma", job_id: "Job-106", job_title: "Project Manager", contact: "Seema Kapoor", placement_date: "20-06-2025", status: "On Hold", no_of_days: 35, start_date: "01-06-2025", end_date: "31-12-2025", owner_id: "Alok" },
        { candidate: "Aarti Gupta", job_id: "Job-107", job_title: "Data Analyst", contact: "Maya Singh", placement_date: "15-07-2025", status: "Inactive", no_of_days: 25, start_date: "01-07-2025", end_date: "30-11-2025", owner_id: "Alok" },
        { candidate: "Karan Yadav", job_id: "Job-108", job_title: "DevOps Engineer", contact: "Gita Kapoor", placement_date: "05-08-2025", status: "Active", no_of_days: 45, start_date: "01-08-2025", end_date: "31-10-2025", owner_id: "Ravi" },
        { candidate: "Shivani Verma", job_id: "Job-109", job_title: "HR Manager", contact: "Nina Sharma", placement_date: "25-09-2025", status: "On Hold", no_of_days: 30, start_date: "01-09-2025", end_date: "31-12-2025", owner_id: "Vikram" },
        { candidate: "Manish Kumar", job_id: "Job-110", job_title: "UX Designer", contact: "Mitali Desai", placement_date: "01-10-2025", status: "Active", no_of_days: 55, start_date: "01-10-2025", end_date: "31-12-2025", owner_id: "Hari" },
        { candidate: "Rohit Sharma", job_id: "Job-111", job_title: "Backend Developer", contact: "Ayesha Khan", placement_date: "15-01-2025", status: "In Progress", no_of_days: 30, start_date: "15-01-2025", end_date: "14-02-2025", owner_id: "Vikram" },
        { candidate: "Sneha Mehta", job_id: "Job-112", job_title: "Data Analyst", contact: "Rajiv Singh", placement_date: "20-01-2025", status: "Pending", no_of_days: 45, start_date: "20-01-2025", end_date: "05-03-2025", owner_id: "Pooja" }
    ];

    const [selectedJobs, setSelectedJobs] = useState([]);

    const onSelectionChange = (e) => {
        setSelectedJobs(e.value);
    };

    const onRowReorder = (e) => {
        setCustomers(e.value);
    };

    const dt = useRef(null);

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default();
                const exportColumns = [
                    { title: "Candidate", dataKey: "candidate" },
                    { title: "Job ID", dataKey: "job_id" },
                    { title: "Job Title", dataKey: "job_title" },
                    { title: "Contact", dataKey: "contact" },
                    { title: "Placement Date", dataKey: "placement_date" },
                    { title: "Status", dataKey: "status" },
                    { title: "No of Days", dataKey: "no_of_days" },
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
                                <h1 className="page-title">My Placement Report</h1>
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
                                            ref={dt}
                                            value={jobs}
                                            tableStyle={{ minWidth: '50rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
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
                                            globalFilterFields={['candidate', 'job_id', 'job_title', 'contact', 'placement_date', 'status', 'no_of_days', 'start_date', 'end_date', 'owner_id']}
                                            // header={<div className="table-header">Jobs</div>}
                                            selection={selectedJobs}
                                            onSelectionChange={onSelectionChange}
                                            showGridlines
                                            responsiveLayout="scroll"
                                        >
                                            {/* <Column selectionMode="multiple" style={{ width: '3em' }} /> */}
                                            <Column field="candidate" header="Candidate" sortable filter />
                                            <Column field="job_id" header="Job ID" sortable filter />
                                            <Column field="job_title" header="Job Title" ClassName="wrap-word-column" sortable filter />
                                            <Column field="contact" header="Contact" sortable filter />
                                            <Column field="placement_date" header="Placement Date" sortable filter />
                                            <Column field="status" header="Status" sortable filter />
                                            <Column field="no_of_days" header="No. of Days" sortable filter />
                                            <Column field="start_date" header="Start Date" sortable filter />
                                            <Column field="end_date" header="End Date" sortable filter />
                                            <Column field="owner_id" header="User ID" sortable filter />
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
