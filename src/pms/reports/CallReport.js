import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { saveAs } from 'file-saver';
import { Tooltip } from "primereact/tooltip";


const CallReport = () => {
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
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        subtype: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        start_datetime: { value: null, matchMode: FilterMatchMode.DATE_IS },
        end_datetime: { value: null, matchMode: FilterMatchMode.DATE_IS },
        stakeholder_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        subject: { value: null, matchMode: FilterMatchMode.CONTAINS },
        scheduled_by: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        completed_on: { value: null, matchMode: FilterMatchMode.DATE_IS },
        stakeholder: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const calls = [
        {
            type: "Interview",
            subtype: "Video",
            start_datetime: "10-01-2025 14:00",
            end_datetime: "05-01-2025 23:00",
            stakeholder_name: "Arjun Patel",
            subject: "Interview: Arjun Patel video call on 10/01/2025 4:00 PM",
            scheduled_by: "Harish",
            completed_on: "05-01-2025",
            stakeholder: "Candidates"
        },
        {
            type: "Interview",
            subtype: "Phone",
            start_datetime: "15-02-2025 10:00",
            end_datetime: "15-02-2025 11:00",
            stakeholder_name: "Priya Sharma",
            subject: "Interview: Priya Sharma phone call on 15/02/2025 10:00 AM",
            scheduled_by: "Bhavani",
            completed_on: "15-02-2025",
            stakeholder: "Candidates"
        },
        {
            type: "Meeting",
            subtype: "Video",
            start_datetime: "20-03-2025 09:30",
            end_datetime: "20-03-2025 10:30",
            stakeholder_name: "Rajesh Iyer",
            subject: "Meeting: Rajesh Iyer video call on 20/03/2025 9:30 AM",
            scheduled_by: "Giri",
            completed_on: "20-03-2025",
            stakeholder: "Team"
        },
        {
            type: "Interview",
            subtype: "In-Person",
            start_datetime: "05-04-2025 13:00",
            end_datetime: "05-04-2025 15:00",
            stakeholder_name: "Ananya Reddy",
            subject: "Interview: Ananya Reddy in-person on 05/04/2025 1:00 PM",
            scheduled_by: "Pavan",
            completed_on: "05-04-2025",
            stakeholder: "Candidates"
        },
        {
            type: "Discussion",
            subtype: "Video",
            start_datetime: "22-05-2025 14:00",
            end_datetime: "22-05-2025 15:30",
            stakeholder_name: "Vikram Joshi",
            subject: "Discussion: Vikram Joshi video call on 22/05/2025 2:00 PM",
            scheduled_by: "Harish",
            completed_on: "22-05-2025",
            stakeholder: "Client"
        },
        {
            type: "Follow-up",
            subtype: "Phone",
            start_datetime: "15-06-2025 11:00",
            end_datetime: "15-06-2025 11:30",
            stakeholder_name: "Divya Nair",
            subject: "Follow-up: Divya Nair phone call on 15/06/2025 11:00 AM",
            scheduled_by: "Bhavani",
            completed_on: "15-06-2025",
            stakeholder: "Candidates"
        },
        {
            type: "Meeting",
            subtype: "Video",
            start_datetime: "08-07-2025 16:00",
            end_datetime: "08-07-2025 17:00",
            stakeholder_name: "Sanjay Gupta",
            subject: "Meeting: Sanjay Gupta video call on 08/07/2025 4:00 PM",
            scheduled_by: "Giri",
            completed_on: "08-07-2025",
            stakeholder: "Team"
        },
        {
            type: "Interview",
            subtype: "Video",
            start_datetime: "18-08-2025 10:00",
            end_datetime: "18-08-2025 11:00",
            stakeholder_name: "Neha Kapoor",
            subject: "Interview: Neha Kapoor video call on 18/08/2025 10:00 AM",
            scheduled_by: "Pavan",
            completed_on: "18-08-2025",
            stakeholder: "Candidates"
        },
        {
            type: "Interview",
            subtype: "Phone",
            start_datetime: "10-09-2025 15:00",
            end_datetime: "10-09-2025 15:30",
            stakeholder_name: "Amit Deshmukh",
            subject: "Interview: Amit Deshmukh phone call on 10/09/2025 3:00 PM",
            scheduled_by: "Harish",
            completed_on: "10-09-2025",
            stakeholder: "Candidates"
        },
        {
            type: "Meeting",
            subtype: "Video",
            start_datetime: "05-10-2025 09:00",
            end_datetime: "05-10-2025 10:00",
            stakeholder_name: "Pooja Menon",
            subject: "Meeting: Pooja Menon video call on 05/10/2025 9:00 AM",
            scheduled_by: "Giri",
            completed_on: "05-10-2025",
            stakeholder: "Team"
        },
        {
            type: "Follow-up",
            subtype: "Phone",
            start_datetime: "12-11-2025 14:30",
            end_datetime: "12-11-2025 15:00",
            stakeholder_name: "Rahul Srinivasan",
            subject: "Follow-up: Rahul Srinivasan phone call on 12/11/2025 2:30 PM",
            scheduled_by: "Bhavani",
            completed_on: "12-11-2025",
            stakeholder: "Clients"
        },
        {
            type: "Discussion",
            subtype: "In-Person",
            start_datetime: "20-12-2025 11:00",
            end_datetime: "20-12-2025 12:30",
            stakeholder_name: "Kavita Choudhary",
            subject: "Discussion: Kavita Choudhary in-person meeting on 20/12/2025 11:00 AM",
            scheduled_by: "Pavan",
            completed_on: "20-12-2025",
            stakeholder: "Team"
        }
    ];

    const [selectedCalls, setSelectedCalls] = useState([]);

    const onSelectionChange = (e) => {
        setSelectedCalls(e.value);
    };

    const onRowReorder = (e) => {
        setSelectedCalls(e.value);
    };

    // Export 
    const dt = useRef(null);

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default();
                const exportColumns = [
                    { title: "Type", dataKey: "type" },
                    { title: "Subtype", dataKey: "subtype" },
                    { title: "Start Date Time", dataKey: "start_datetime" },
                    { title: "End Date Time", dataKey: "end_datetime" },
                    { title: "Stakeholder Name", dataKey: "stakeholder_name" },
                    { title: "Subject", dataKey: "subject" },
                    { title: "Scheduled By", dataKey: "scheduled_by" },
                    { title: "Completed On", dataKey: "completed_on" },
                    { title: "Stakeholder", dataKey: "stakeholder" }
                ];
                doc.autoTable({
                    columns: exportColumns,
                    body: calls
                });
                doc.save("callreports.pdf");
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(selectedCalls);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'selectedCalls');
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

    const subjectTemplate = (rowData) => {
        const words = rowData.subject.split(" ").slice(0, 2).join(" ") + "..."; // Show only first 2 words
        return (
            <span data-pr-tooltip={rowData.subject} data-pr-position="top">
                {words}
            </span>
        );
    };


    return (
        <React.Fragment>
            <div className="page-content allact-tabs">
                <Container fluid={true}>
                    <div className="page-title-box actjobbread">
                        <Row className="align-items-center actjobsum">
                            <Col sm={6} md={6} lg={8}>
                                <h1 class="page-title">Call Report</h1>
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
                                <Tooltip target="span[data-pr-tooltip]" />
                                <section className="job-datatable-section">
                                    <div className="card1 mt-3 mb-4 actjobsumtable">
                                        <DataTable
                                            ref={dt}
                                            value={calls}
                                            rows={pageState.rows}
                                            first={pageState.first}
                                            onPage={onPage}
                                            filters={filters}
                                            filterDisplay="row"
                                            loading={loading}
                                            globalFilterFields={['type', 'subtype', 'start_datetime', 'end_datetime', 'stakeholder_name', 'subject', 'scheduled_by', 'completed_on', 'stakeholder']}
                                            selection={selectedCalls}
                                            onSelectionChange={onSelectionChange}
                                            selectionMode="multiple"
                                        >
                                            <Column field="type" sortable header="Type" filter />
                                            <Column field="subtype" sortable header="Subtype" filter />
                                            <Column field="start_datetime" sortable header="Start Date Time" filter />
                                            <Column field="end_datetime" sortable header="End Date Time" filter />
                                            <Column field="stakeholder_name" sortable header="Stakeholder Name" filter />
                                            {/* <Column field="subject" sortable header="Subject" filter /> */}
                                            <Column field="subject" sortable header="Subject" filter body={subjectTemplate} />
                                            <Column field="scheduled_by" sortable header="Scheduled By" filter />
                                            <Column field="completed_on" sortable header="Completed On" filter />
                                            <Column field="stakeholder" sortable header="Stakeholder" filter />
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



export default CallReport;