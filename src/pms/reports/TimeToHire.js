import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { saveAs } from 'file-saver';
import { SelectButton } from 'primereact/selectbutton';

const TimeToHire = () => {
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
        job_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_posting_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        job_start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        job_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        number_of_resumes: { value: null, matchMode: FilterMatchMode.EQUALS },
        screening_start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        screening_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        interview_start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        interview_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        offer_release_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        offer_acceptance_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        hiring_manager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        time_to_hire: { value: null, matchMode: FilterMatchMode.EQUALS },
        time_to_fill: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const timeToHireData = [
        {
            job_id: "Job-101",
            job_title: "Software Engineer",
            job_posting_date: "01-01-2025",
            job_start_date: "05-01-2025",
            job_end_date: "25-01-2025",
            number_of_resumes: 50,
            screening_start_date: "06-01-2025",
            screening_end_date: "10-01-2025",
            interview_start_date: "12-01-2025",
            interview_end_date: "18-01-2025",
            offer_release_date: "20-01-2025",
            offer_acceptance_date: "22-01-2025",
            hiring_manager: "Rajesh Kumar",
            time_to_hire: 21,
            time_to_fill: 25,
        },
        {
            job_id: "Job-102",
            job_title: "Frontend Developer",
            job_posting_date: "01-02-2025",
            job_start_date: "10-02-2025",
            job_end_date: "25-02-2025",
            number_of_resumes: 70,
            screening_start_date: "05-02-2025",
            screening_end_date: "08-02-2025",
            interview_start_date: "12-02-2025",
            interview_end_date: "16-02-2025",
            offer_release_date: "18-02-2025",
            offer_acceptance_date: "20-02-2025",
            hiring_manager: "Priya Sharma",
            time_to_hire: 20,
            time_to_fill: 24,
        },
        {
            job_id: "Job-103",
            job_title: "Backend Developer",
            job_posting_date: "01-03-2025",
            job_start_date: "07-03-2025",
            job_end_date: "21-03-2025",
            number_of_resumes: 90,
            screening_start_date: "03-03-2025",
            screening_end_date: "06-03-2025",
            interview_start_date: "08-03-2025",
            interview_end_date: "12-03-2025",
            offer_release_date: "15-03-2025",
            offer_acceptance_date: "17-03-2025",
            hiring_manager: "Amit Patel",
            time_to_hire: 16,
            time_to_fill: 20,
        },
        {
            job_id: "Job-104",
            job_title: "Data Scientist",
            job_posting_date: "01-04-2025",
            job_start_date: "10-04-2025",
            job_end_date: "30-04-2025",
            number_of_resumes: 120,
            screening_start_date: "03-04-2025",
            screening_end_date: "06-04-2025",
            interview_start_date: "08-04-2025",
            interview_end_date: "13-04-2025",
            offer_release_date: "15-04-2025",
            offer_acceptance_date: "17-04-2025",
            hiring_manager: "Ananya Gupta",
            time_to_hire: 17,
            time_to_fill: 22,
        },
        {
            job_id: "Job-105",
            job_title: "UI/UX Designer",
            job_posting_date: "01-05-2025",
            job_start_date: "15-05-2025",
            job_end_date: "25-05-2025",
            number_of_resumes: 60,
            screening_start_date: "05-05-2025",
            screening_end_date: "08-05-2025",
            interview_start_date: "10-05-2025",
            interview_end_date: "14-05-2025",
            offer_release_date: "16-05-2025",
            offer_acceptance_date: "18-05-2025",
            hiring_manager: "Vikram Singh",
            time_to_hire: 18,
            time_to_fill: 24,
        },
        {
            job_id: "Job-106",
            job_title: "DevOps Engineer",
            job_posting_date: "01-06-2025",
            job_start_date: "20-06-2025",
            job_end_date: "05-07-2025",
            number_of_resumes: 110,
            screening_start_date: "05-06-2025",
            screening_end_date: "10-06-2025",
            interview_start_date: "12-06-2025",
            interview_end_date: "18-06-2025",
            offer_release_date: "22-06-2025",
            offer_acceptance_date: "24-06-2025",
            hiring_manager: "Neha Reddy",
            time_to_hire: 23,
            time_to_fill: 29,
        },
        {
            job_id: "Job-107",
            job_title: "Project Manager",
            job_posting_date: "01-07-2025",
            job_start_date: "15-07-2025",
            job_end_date: "30-07-2025",
            number_of_resumes: 50,
            screening_start_date: "05-07-2025",
            screening_end_date: "07-07-2025",
            interview_start_date: "10-07-2025",
            interview_end_date: "13-07-2025",
            offer_release_date: "16-07-2025",
            offer_acceptance_date: "18-07-2025",
            hiring_manager: "Arjun Mehta",
            time_to_hire: 17,
            time_to_fill: 22,
        },
        {
            job_id: "Job-108",
            job_title: "HR Specialist",
            job_posting_date: "01-08-2025",
            job_start_date: "12-08-2025",
            job_end_date: "28-08-2025",
            number_of_resumes: 40,
            screening_start_date: "04-08-2025",
            screening_end_date: "07-08-2025",
            interview_start_date: "09-08-2025",
            interview_end_date: "12-08-2025",
            offer_release_date: "15-08-2025",
            offer_acceptance_date: "18-08-2025",
            hiring_manager: "Divya Iyer",
            time_to_hire: 17,
            time_to_fill: 27,
        },
        {
            job_id: "Job-109",
            job_title: "Marketing Manager",
            job_posting_date: "01-09-2025",
            job_start_date: "10-09-2025",
            job_end_date: "30-09-2025",
            number_of_resumes: 80,
            screening_start_date: "05-09-2025",
            screening_end_date: "08-09-2025",
            interview_start_date: "10-09-2025",
            interview_end_date: "15-09-2025",
            offer_release_date: "18-09-2025",
            offer_acceptance_date: "20-09-2025",
            hiring_manager: "Rahul Nair",
            time_to_hire: 19,
            time_to_fill: 25,
        },
        {
            job_id: "Job-110",
            job_title: "Quality Assurance Engineer",
            job_posting_date: "01-10-2025",
            job_start_date: "15-10-2025",
            job_end_date: "31-10-2025",
            number_of_resumes: 100,
            screening_start_date: "04-10-2025",
            screening_end_date: "08-10-2025",
            interview_start_date: "10-10-2025",
            interview_end_date: "13-10-2025",
            offer_release_date: "16-10-2025",
            offer_acceptance_date: "18-10-2025",
            hiring_manager: "Pooja Desai",
            time_to_hire: 17,
            time_to_fill: 27,
        },
        {
            job_id: "Job-111",
            job_title: "Frontend Developer",
            job_posting_date: "05-11-2025",
            job_start_date: "20-11-2025",
            job_end_date: "05-12-2025",
            number_of_resumes: 120,
            screening_start_date: "08-11-2025",
            screening_end_date: "12-11-2025",
            interview_start_date: "14-11-2025",
            interview_end_date: "17-11-2025",
            offer_release_date: "22-11-2025",
            offer_acceptance_date: "25-11-2025",
            hiring_manager: "Sanjay Joshi",
            time_to_hire: 15,
            time_to_fill: 25
        }
    ];

    const [selectedJobs, setSelectedJobs] = useState([]);

    const [sizeOptions] = useState([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value); // Default size is 'normal'

    const onSelectionChange = (e) => {
        setSelectedJobs(e.value);
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
                    { title: "Job ID", dataKey: "job_id" },
                    { title: "Job Title", dataKey: "job_title" },
                    { title: "Job Posting Date", dataKey: "job_posting_date" },
                    { title: "Job Start Date", dataKey: "job_start_date" },
                    { title: "Job End Date", dataKey: "job_end_date" },
                    { title: "Number of Resumes", dataKey: "number_of_resumes" },
                    { title: "Screening Start Date", dataKey: "screening_start_date" },
                    { title: "Screening End Date", dataKey: "screening_end_date" },
                    { title: "Interview Start Date", dataKey: "interview_start_date" },
                    { title: "Interview End Date", dataKey: "interview_end_date" },
                    { title: "Offer Release Date", dataKey: "offer_release_date" },
                    { title: "Offer Acceptance Date", dataKey: "offer_acceptance_date" },
                    { title: "Hiring Manager", dataKey: "hiring_manager" },
                    { title: "Time to Hire (Days)", dataKey: "time_to_hire" },
                    { title: "Time to Fill (Days)", dataKey: "time_to_fill" },
                ];
                doc.autoTable({
                    columns: exportColumns,
                    body: timeToHireData
                });
                doc.save("time_to_hire.pdf");
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

            saveAsExcelFile(excelBuffer, 'selectedTimeToHire');
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
                                <h1 className="page-title">Time to Hire Report</h1>
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
                                            value={timeToHireData}
                                            size={size} // Apply the selected size
                                            tableStyle={{ minWidth: '50rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
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
                                                'job_posting_date',
                                                'job_start_date',
                                                'job_end_date',
                                                'number_of_resumes',
                                                'screening_start_date',
                                                'screening_end_date',
                                                'interview_start_date',
                                                'interview_end_date',
                                                'offer_release_date',
                                                'offer_acceptance_date',
                                                'hiring_manager',
                                                'time_to_hire',
                                                'time_to_fill'
                                            ]}
                                            scrollable
                                            emptyMessage="No records found."
                                            selection={selectedJobs}
                                            onSelectionChange={onSelectionChange}
                                            selectionMode="multiple"
                                            totalRecords={timeToHireData.length}
                                            resizableColumns
                                            columnResizeMode="expand"
                                        >
                                            <Column field="job_id" sortable header="Job ID" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="job_title" sortable header="Job Title" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="job_posting_date" sortable header="Job Posting Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="job_start_date" sortable header="Job Start Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="job_end_date" sortable header="Job End Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="number_of_resumes" sortable header="Number of Resumes" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="screening_start_date" sortable header="Screening Start Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="screening_end_date" sortable header="Screening End Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="interview_start_date" sortable header="Interview Start Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="interview_end_date" sortable header="Interview End Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="offer_release_date" sortable header="Offer Release Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="offer_acceptance_date" sortable header="Offer Acceptance Date" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="hiring_manager" sortable header="Hiring Manager" filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="time_to_hire" header="Time to Hire" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="time_to_fill" header="Time to Fill" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
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



export default TimeToHire;