import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { useSelector } from "react-redux"

const RecruiterPerformanceReport = () => {

    const { first, rows,  } = useSelector(
          state => state.calendar.pagination
        )

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        candidates: { value: null, matchMode: FilterMatchMode.EQUALS },
        jobs: { value: null, matchMode: FilterMatchMode.EQUALS },
        received: { value: null, matchMode: FilterMatchMode.EQUALS },
        potential: { value: null, matchMode: FilterMatchMode.EQUALS },
        submitted: { value: null, matchMode: FilterMatchMode.EQUALS },
        interviews: { value: null, matchMode: FilterMatchMode.EQUALS },
        placements: { value: null, matchMode: FilterMatchMode.EQUALS },
        calendar: { value: null, matchMode: FilterMatchMode.EQUALS },
        notes: { value: null, matchMode: FilterMatchMode.EQUALS },
        other: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    // chat
    const [recruiterData, setRecruiterData] = useState([
        { user_id: 'Harish', candidates: 45, jobs: 3, received: 45, potential: 20, submitted: 8, interviews: 6, placements: 4, calendar: 35, notes: 20, other: 30 },
        { user_id: 'Pavan', candidates: 25, jobs: 1, received: 25, potential: 10, submitted: 10, interviews: 6, placements: 3, calendar: 10, notes: 20, other: 25 },
        { user_id: 'Bhavani', candidates: 30, jobs: 2, received: 30, potential: 15, submitted: 12, interviews: 7, placements: 5, calendar: 20, notes: 15, other: 28 },
        { user_id: 'Ushodaya', candidates: 40, jobs: 3, received: 40, potential: 18, submitted: 10, interviews: 8, placements: 4, calendar: 25, notes: 22, other: 26 },
        { user_id: 'Karuna', candidates: 35, jobs: 2, received: 35, potential: 17, submitted: 9, interviews: 7, placements: 5, calendar: 30, notes: 18, other: 29 },
        { user_id: 'Deepika', candidates: 28, jobs: 1, received: 28, potential: 12, submitted: 8, interviews: 5, placements: 4, calendar: 18, notes: 16, other: 24 },
        { user_id: 'Priya', candidates: 50, jobs: 4, received: 50, potential: 25, submitted: 15, interviews: 9, placements: 6, calendar: 40, notes: 25, other: 35 },
        { user_id: 'Anil', candidates: 22, jobs: 1, received: 22, potential: 11, submitted: 7, interviews: 4, placements: 3, calendar: 15, notes: 14, other: 23 },
        { user_id: 'Meena', candidates: 42, jobs: 3, received: 42, potential: 20, submitted: 11, interviews: 8, placements: 5, calendar: 36, notes: 19, other: 31 },
        { user_id: 'Vikram', candidates: 38, jobs: 2, received: 38, potential: 18, submitted: 10, interviews: 6, placements: 4, calendar: 28, notes: 21, other: 27 },
        { user_id: 'Suresh', candidates: 38, jobs: 2, received: 38, potential: 18, submitted: 10, interviews: 6, placements: 4, calendar: 28, notes: 21, other: 27 },
        { user_id: 'Sravan', candidates: 25, jobs: 1, received: 25, potential: 10, submitted: 10, interviews: 6, placements: 3, calendar: 10, notes: 20, other: 25 },
        { user_id: 'Karuna', candidates: 35, jobs: 2, received: 35, potential: 17, submitted: 9, interviews: 7, placements: 5, calendar: 30, notes: 18, other: 29 },
        { user_id: 'Deepika', candidates: 28, jobs: 1, received: 28, potential: 12, submitted: 8, interviews: 5, placements: 4, calendar: 18, notes: 16, other: 24 },
        { user_id: 'Priya', candidates: 50, jobs: 4, received: 50, potential: 25, submitted: 15, interviews: 9, placements: 6, calendar: 40, notes: 25, other: 35 },
        { user_id: 'Anil', candidates: 22, jobs: 1, received: 22, potential: 11, submitted: 7, interviews: 4, placements: 3, calendar: 15, notes: 14, other: 23 },
        { user_id: 'Meena', candidates: 42, jobs: 3, received: 42, potential: 20, submitted: 11, interviews: 8, placements: 5, calendar: 36, notes: 19, other: 31 },
        { user_id: 'Bhavani', candidates: 30, jobs: 2, received: 30, potential: 15, submitted: 12, interviews: 7, placements: 5, calendar: 20, notes: 15, other: 28 },
        { user_id: 'Ushodaya', candidates: 40, jobs: 3, received: 40, potential: 18, submitted: 10, interviews: 8, placements: 4, calendar: 25, notes: 22, other: 26 },
        { user_id: 'Karuna', candidates: 35, jobs: 2, received: 35, potential: 17, submitted: 9, interviews: 7, placements: 5, calendar: 30, notes: 18, other: 29 },
        
    ]);

    const [selectedRecruiterData, setSelectedRecruiterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState({ rows: 10, first: 0 });

    const onPage = (event) => {
        setPageState({ rows: event.rows, first: event.first });
    };

    const [sizeOptions] = useState([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value); // Default size is 'normal'


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
                    { title: "User IDs", dataKey: "user_id" },
                    { title: "Candidates", dataKey: "candidates" },
                    { title: "Jobs", dataKey: "jobs" },
                    { title: "Received", dataKey: "received" },
                    { title: "Potential", dataKey: "potential" },
                    { title: "Submitted", dataKey: "submitted" },
                    { title: "Interviews", dataKey: "interviews" },
                    { title: "Placements", dataKey: "placements" },
                    { title: "Calendar", dataKey: "calendar" },
                    { title: "Notes", dataKey: "notes" },
                    { title: "Other", dataKey: "other" }
                ];

                doc.autoTable({
                    columns: exportColumns,
                    body: recruiterData
                });
                doc.save("recruiter-data.pdf");
            });
        });
    };

    // xlsx
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(selectedRecruiterData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'selectedRecruiterData');
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
                    <div className="page-title-box actjobbread mb-0">
                        <Row className="align-items-center actjobsum">
                            <Col sm={6} md={6} lg={6}>
                                <h1 class="page-title">Recruiter Performance Report</h1>
                            </Col>

                            <Col sm={6} md={6} lg={6}>
                                <div className="d-flex justify-content-end gap-5">
                                    <div className="allbtns d-flex gap-2 justify-content-end">
                                        <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} tooltip="Export to CSV" className="csvbtn" tooltipOptions={{ position: 'left' }} />
                                        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} tooltip="Export to XLS" tooltipOptions={{ position: 'top' }} className="xlsbtn" />
                                        <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} tooltip="Export to PDF" className="pdfbtn" tooltipOptions={{ position: 'bottom' }} />
                                        <Button type="button" icon="pi pi-print" severity="warning" rounded tooltip="Print" className="printbtn" tooltipOptions={{ position: 'bottom' }} />
                                    </div>
                                    <div className="flex justify-content-end mb-2 sizebtns">
                                        <SelectButton
                                            value={size}
                                            onChange={(e) => setSize(e.value)}
                                            options={sizeOptions}
                                        />
                                    </div>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <section className="job-datatable-section">
                                    <div className="card1 mt-3 mb-4 recruiter-table">
                                        <DataTable
                                            ref={dt}
                                            value={recruiterData.slice(first, first + rows)}
                                            tableStyle={{ minWidth: '50rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                                            rows={rows}
                                            first={first}
                                            size={size} // Apply the selected size
                                            // rowsPerPageOptions={[5, 10, 25, 50]}
                                            // paginator
                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                            onPage={onPage}
                                            dataKey="user_id"
                                            loading={loading}
                                            scrollable
                                            emptyMessage="No records found."
                                            selection={selectedRecruiterData}
                                            onSelectionChange={(e) => setSelectedRecruiterData(e.value)}
                                            selectionMode="multiple"
                                            filters={filters}
                                            filterDisplay="row"
                                            reorderableRows
                                            resizableColumns
                                            columnResizeMode="expand"
                                        >
                                            <Column field="user_id" header="User IDs" sortable filter filterPlaceholder="" style={{ minWidth: '12rem' }} />
                                            <Column field="candidates" header="Candidates" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="jobs" header="Jobs" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="received" header="Received" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="potential" header="Potential" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="submitted" header="Submitted" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="interviews" header="Interviews" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="placements" header="Placements" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="calendar" header="Calendar" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="notes" header="Notes" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
                                            <Column field="other" header="Other" sortable filter filterPlaceholder="" style={{ minWidth: '10rem' }} />
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



export default RecruiterPerformanceReport;