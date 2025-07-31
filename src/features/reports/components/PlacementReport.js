import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { saveAs } from 'file-saver';


const PlacementReport = () => {
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
        placement_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        role_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidate_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        placement_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        duration_days: { value: null, matchMode: FilterMatchMode.EQUALS },
        start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        recruiter_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const placements = [
        {
            placement_id: "Job-101",
            role_title: "Sr Python Developer",
            candidate_name: "Arjun Sharma",
            status: "Placed",
            placement_date: "25/5/2025",
            duration_days: 25,
            start_date: "1/5/2025",
            end_date: "30/5/2025",
            recruiter_id: "Pavan"
        },
        {
            placement_id: "Job-102",
            role_title: "Frontend Developer",
            candidate_name: "Priya Patel",
            status: "Placed",
            placement_date: "10/6/2025",
            duration_days: 30,
            start_date: "1/6/2025",
            end_date: "30/6/2025",
            recruiter_id: "Ravi"
        },
        {
            placement_id: "Job-103",
            role_title: "Backend Developer",
            candidate_name: "Rahul Gupta",
            status: "In Progress",
            placement_date: "15/6/2025",
            duration_days: 45,
            start_date: "10/6/2025",
            end_date: "25/7/2025",
            recruiter_id: "Anita"
        },
        {
            placement_id: "Job-104",
            role_title: "Full Stack Developer",
            candidate_name: "Ananya Reddy",
            status: "Placed",
            placement_date: "20/6/2025",
            duration_days: 60,
            start_date: "15/6/2025",
            end_date: "14/8/2025",
            recruiter_id: "Vikram"
        },
        {
            placement_id: "Job-105",
            role_title: "DevOps Engineer",
            candidate_name: "Vikram Singh",
            status: "Pending",
            placement_date: "30/6/2025",
            duration_days: 30,
            start_date: "25/6/2025",
            end_date: "25/7/2025",
            recruiter_id: "Pavan"
        },
        {
            placement_id: "Job-106",
            role_title: "Data Scientist",
            candidate_name: "Divya Iyer",
            status: "Placed",
            placement_date: "5/7/2025",
            duration_days: 90,
            start_date: "1/7/2025",
            end_date: "29/9/2025",
            recruiter_id: "Ravi"
        },
        {
            placement_id: "Job-107",
            role_title: "Machine Learning Engineer",
            candidate_name: "Rajiv Menon",
            status: "In Progress",
            placement_date: "15/7/2025",
            duration_days: 45,
            start_date: "10/7/2025",
            end_date: "24/8/2025",
            recruiter_id: "Anita"
        },
        {
            placement_id: "Job-108",
            role_title: "UI/UX Designer",
            candidate_name: "Meera Nair",
            status: "Placed",
            placement_date: "20/7/2025",
            duration_days: 30,
            start_date: "15/7/2025",
            end_date: "14/8/2025",
            recruiter_id: "Vikram"
        },
        {
            placement_id: "Job-109",
            role_title: "QA Engineer",
            candidate_name: "Suresh Kumar",
            status: "Pending",
            placement_date: "25/7/2025",
            duration_days: 30,
            start_date: "20/7/2025",
            end_date: "19/8/2025",
            recruiter_id: "Pavan"
        },
        {
            placement_id: "Job-110",
            role_title: "Project Manager",
            candidate_name: "Deepika Sharma",
            status: "Placed",
            placement_date: "30/7/2025",
            duration_days: 60,
            start_date: "25/7/2025",
            end_date: "23/9/2025",
            recruiter_id: "Ravi"
        },
        {
            placement_id: "Job-111",
            role_title: "Business Analyst",
            candidate_name: "Nitin Joshi",
            status: "In Progress",
            placement_date: "5/8/2025",
            duration_days: 30,
            start_date: "1/8/2025",
            end_date: "30/8/2025",
            recruiter_id: "Anita"
        }
    ];

    const [selectedPlacements, setSelectedJobs] = useState([]);
    const onSelectionChange = (e) => {
        setSelectedJobs(e.value);
    };

    const dt = useRef(null);
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    // Export to PDF
    const exportPdf = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default();
                const exportColumns = [
                    { title: "Job ID", dataKey: "placement_id" },
                    { title: "Job Title", dataKey: "role_title" },
                    { title: "Candidate Name", dataKey: "candidate_name" },
                    { title: "Status", dataKey: "status" },
                    { title: "Placement Date", dataKey: "placement_date" },
                    { title: "No of Days", dataKey: "duration_days" },
                    { title: "Start Date", dataKey: "start_date" },
                    { title: "End Date", dataKey: "end_date" },
                    { title: "User ID", dataKey: "recruiter_id" }
                ];
                doc.autoTable({
                    columns: exportColumns,
                    body: selectedPlacements.length ? selectedPlacements : placements
                });
                doc.save("placement_report.pdf");
            });
        });
    };

    // Export to Excel
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(selectedPlacements.length ? selectedPlacements : placements);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'placement_report');
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
                                <h1 class="page-title">Placement Report</h1>
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
                                            value={placements}
                                            // paginator
                                            rows={pageState.rows}
                                            first={pageState.first}
                                            onPage={onPage}
                                            dataKey="placement_id"
                                            filters={filters}
                                            filterDisplay="row"
                                            loading={loading}
                                            selection={selectedPlacements}
                                            onSelectionChange={onSelectionChange}
                                            selectionMode="multiple"
                                            totalRecords={placements.length}
                                            resizableColumns
                                            columnResizeMode="expand"
                                        >
                                            <Column field="placement_id" sortable header="Job Id" filter style={{ minWidth: '10rem' }} />
                                            <Column field="role_title" sortable header="Job Title" filter style={{ minWidth: '10rem' }} />
                                            <Column field="candidate_name" sortable header="Candidate Name" filter style={{ minWidth: '10rem' }} />
                                            <Column field="status" sortable header="Status" filter style={{ minWidth: '10rem' }} />
                                            <Column field="placement_date" sortable header="Placement Date" filter style={{ minWidth: '10rem' }} />
                                            <Column field="duration_days" sortable header="No of Days" filter style={{ minWidth: '10rem' }} />
                                            <Column field="start_date" sortable header="Start Date" filter style={{ minWidth: '10rem' }} />
                                            <Column field="end_date" sortable header="End Date" filter style={{ minWidth: '10rem' }} />
                                            <Column field="recruiter_id" sortable header="User ID" filter style={{ minWidth: '10rem' }} />
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



export default PlacementReport;