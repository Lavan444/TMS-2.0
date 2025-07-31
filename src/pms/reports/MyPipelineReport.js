import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { saveAs } from 'file-saver';
import { Tooltip } from "primereact/tooltip";

const MyPipelineReport = () => {
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
        job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
        userid: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const reports = [
        {
            candidate: "Rajashekar",
            job_id: "Job-101",
            job_title: "Graphic Designer",
            type: "Full-Time",
            date_time: "15-03-2025 10:00 AM",
            userid: "Harish"
        },
        {
            candidate: "Nagendra",
            job_id: "Job-102",
            job_title: "Content Writer",
            type: "Part-Time",
            date_time: "16-03-2025 11:00 AM",
            userid: "Bhavani"
        },
        {
            candidate: "Bhargavi Sunanda",
            job_id: "Job-103",
            job_title: "SEO Specialist",
            type: "Contract",
            date_time: "17-03-2025 02:00 PM",
            userid: "Giri"
        },
        {
            candidate: "Vasanth",
            job_id: "Job-104",
            job_title: "Data Scientist",
            type: "Full-Time",
            date_time: "18-03-2025 09:00 AM",
            userid: "Deepika"
        },
        {
            candidate: "Amit Kumar",
            job_id: "Job-105",
            job_title: "Software Engineer",
            type: "Full-Time",
            date_time: "19-03-2025 10:30 AM",
            userid: "Suresh"
        },
        {
            candidate: "Sumanth Reddy",
            job_id: "Job-106",
            job_title: "Marketing Executive",
            type: "Internship",
            date_time: "20-03-2025 01:00 PM",
            userid: "Anjali"
        },
        {
            candidate: "Priya Sharma",
            job_id: "Job-107",
            job_title: "UI/UX Designer",
            type: "Full-Time",
            date_time: "21-03-2025 03:30 PM",
            userid: "Vikram"
        },
        {
            candidate: "Rahul Verma",
            job_id: "Job-108",
            job_title: "DevOps Engineer",
            type: "Remote",
            date_time: "22-03-2025 05:00 PM",
            userid: "Deepak"
        },
        {
            candidate: "Kavya Nair",
            job_id: "Job-109",
            job_title: "HR Manager",
            type: "Full-Time",
            date_time: "23-03-2025 08:45 AM",
            userid: "Neha"
        },
        {
            candidate: "Manoj Patil",
            job_id: "Job-110",
            job_title: "Business Analyst",
            type: "Contract",
            date_time: "24-03-2025 10:15 AM",
            userid: "Ramesh"
        },
        {
            candidate: "Mounika",
            job_id: "Job-110",
            job_title: "Wordpress Developer",
            type: "Contract",
            date_time: "24-03-2025 10:15 AM",
            userid: "Deepika"
        },
        {
            candidate: "Sindhu",
            job_id: "Job-110",
            job_title: "Seo Strategist",
            type: "Contract",
            date_time: "24-03-2025 10:15 AM",
            userid: "Umesh"
        }
    ];
    

    const [selectedReports, setSelectedReports] = useState([]);
    const onSelectionChange = (e) => {
        setSelectedReports(e.value);
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
                    { title: "Type", dataKey: "type" },
                    { title: "Date & Time", dataKey: "date_time" },
                    { title: "User ID", dataKey: "userid" }
                ];
                doc.autoTable({ columns: exportColumns, body: reports });
                doc.save("pipeline_report.pdf");
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(selectedReports);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'pipeline_report');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], { type: EXCEL_TYPE });
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
                                <h1 className="page-title">My Pipeline Report</h1>
                            </Col>
                            <Col sm={6} md={6} lg={4}>
                                <div className="allbtns d-flex gap-2 justify-content-end">
                                    <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} tooltip="Export to CSV" className="csvbtn" />
                                    <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} tooltip="Export to XLS" className="xlsbtn" />
                                    <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} tooltip="Export to PDF" className="pdfbtn" />
                                    <Button type="button" icon="pi pi-print" severity="warning" rounded tooltip="Print" className="printbtn" tooltipOptions={{ position: 'bottom' }} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <Tooltip target="span[data-pr-tooltip]" />
                                <section className="job-datatable-section">
                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                        <DataTable
                                            ref={dt}
                                            value={reports}
                                            rows={pageState.rows}
                                            first={pageState.first}
                                            onPage={onPage}
                                            filters={filters}
                                            filterDisplay="row"
                                            loading={loading}
                                            selection={selectedReports}
                                            onSelectionChange={onSelectionChange}
                                            selectionMode="multiple"
                                            columnResizeMode="expand" 
                                            resizableColumns
                                        >
                                            <Column field="candidate" sortable header="Candidate" filter />
                                            <Column field="job_id" sortable header="Job ID" filter />
                                            <Column field="job_title" sortable header="Job Title" filter />
                                            <Column field="type" sortable header="Type" filter />
                                            <Column field="date_time" sortable header="Date & Time" filter />
                                            <Column field="userid" sortable header="User ID" filter />
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

export default MyPipelineReport;