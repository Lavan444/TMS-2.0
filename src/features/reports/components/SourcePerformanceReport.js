import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { CardBody, Col, Container, Row, DropdownToggle, DropdownItem, DropdownMenu, } from "reactstrap"
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';



const SourcePerformanceReport = () => {
    const [sourceData, setSourceData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        // Sample data for the Source Performance Report
        const fetchedData = [
            {
                source: 'Naukari.com',
                candidateName: 'Aman Gupta',
                jobId: 'Job-101',
                jobTitle: 'Software Engineer',
                received: '22-12-2024',
                potentialDate: '25-12-2024',
                interviewDate: '02-01-2025',
                offerDate: '05-01-2025',
                joiningDate: '10-01-2025',
                closureDuration: '18 days',
                placementStatus: 'Joined',
            },
            {
                source: 'Naukari.com',
                candidateName: 'Aman Gupta',
                jobId: 'Job-101',
                jobTitle: 'Software Engineer',
                received: '22-12-2024',
                potentialDate: '25-12-2024',
                interviewDate: '02-01-2025',
                offerDate: '05-01-2025',
                joiningDate: '10-01-2025',
                closureDuration: '18 days',
                placementStatus: 'Joined',
            },
            {
                source: 'Linkedin',
                candidateName: 'Neha Sharma',
                jobId: 'Job-102',
                jobTitle: 'Project Manager',
                received: '20-12-2024',
                potentialDate: '23-12-2024',
                interviewDate: '30-12-2024',
                offerDate: '03-01-2025',
                joiningDate: '12-01-2025',
                closureDuration: '23 days',
                placementStatus: 'Joined',
            },
            {
                source: 'Linkedin',
                candidateName: 'Simran Kapoor',
                jobId: 'Job-103',
                jobTitle: 'HR Manager',
                received: '19-12-2024',
                potentialDate: '22-12-2024',
                interviewDate: '29-12-2024',
                offerDate: '02-01-2025',
                joiningDate: '07-01-2025',
                closureDuration: '19 days',
                placementStatus: 'Joined',
            },
            {
                source: 'Linkedin',
                candidateName: 'Rajesh Kumar',
                jobId: 'Job-104',
                jobTitle: 'Software Developer',
                received: '22-12-2024',
                potentialDate: '26-12-2024',
                interviewDate: '31-12-2024',
                offerDate: '04-01-2025',
                joiningDate: '15-01-2025',
                closureDuration: '24 days',
                placementStatus: 'Joined',
            },
            {
                source: 'Linkedin',
                candidateName: 'Priya Desai',
                jobId: 'Job-105',
                jobTitle: 'Business Analyst',
                received: '18-12-2024',
                potentialDate: '21-12-2024',
                interviewDate: '27-12-2024',
                offerDate: '31-12-2024',
                joiningDate: '10-01-2025',
                closureDuration: '23 days',
                placementStatus: 'Joined',
            },
            {
                source: 'Employee Job Referral',
                candidateName: 'Rohan Mehta',
                jobId: 'Job-106',
                jobTitle: 'Data Analyst',
                received: '18-12-2024',
                potentialDate: '21-12-2024',
                interviewDate: '28-12-2024',
                offerDate: '02-01-2025',
                joiningDate: '09-01-2025',
                closureDuration: '22 days',
                placementStatus: 'Joined',
            }
            // Add more entries as needed
        ];
        setSourceData(fetchedData);
    }, []);

    const headerTemplate = (data) => {
        const totalCandidates = calculateTotalCandidates(data.source);
    
        // Map sources to their respective logos
        const sourceLogos = {
            "Naukari.com": "https://www.naukri.com/favicon.ico",
            "Linkedin": "https://cdn-icons-png.flaticon.com/512/174/174857.png", // LinkedIn logo URL
            "Employee Job Referral": "https://cdn-icons-png.flaticon.com/512/306/306473.png", // Employee Referral logo URL
        };
    
        return (
            <React.Fragment>
                <span className="font-bold line-height-3 gap-2">
                    {/* Display logo if source matches */}
                    {sourceLogos[data.source] && (
                        <img
                            src={sourceLogos[data.source]}
                            alt={`${data.source} Logo`}
                            width="24"
                            height="24"
                            style={{ verticalAlign: 'middle', marginRight:'10px'}}
                        />
                    )}
                    {data.source}
                </span>
                <span className="font-bold line-height-3 float-end me-4">
                    Total Candidates: {totalCandidates}
                </span>
            </React.Fragment>
        );
    };
    
    // const footerTemplate = (data) => {
    //     return (
    //         <React.Fragment>
    //             <td colSpan={10}>
    //                 <div className="flex justify-content-end font-bold">
    //                     Total Candidates in {data.source}: {calculateTotalCandidates(data.source)}
    //                 </div>
    //             </td>
    //         </React.Fragment>
    //     );
    // };

    const calculateTotalCandidates = (source) => {
        return sourceData.filter((entry) => entry.source === source).length;
    };

    // const statusBodyTemplate = (rowData) => {
    //     return <Tag value={rowData.placementStatus} severity={getPlacementStatusSeverity(rowData.placementStatus)} />;
    // };

    // const getPlacementStatusSeverity = (status) => {
    //     switch (status) {
    //         case 'Joined':
    //             return 'success';
    //         case 'Not Joined':
    //             return 'danger';
    //         default:
    //             return null;
    //     }
    // };


    // exports
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
                    { title: "Candidate Name", dataKey: "candidateName" },
                    { title: "Job ID", dataKey: "jobId" },
                    { title: "Job Title", dataKey: "jobTitle" },
                    { title: "Received", dataKey: "received" },
                    { title: "Potential Date", dataKey: "potentialDate" },
                    { title: "Interview Date", dataKey: "interviewDate" },
                    { title: "Offer Date", dataKey: "offerDate" },
                    { title: "Joining Date", dataKey: "joiningDate" },
                    { title: "Closure Duration", dataKey: "closureDuration" },
                    { title: "Placement Status", dataKey: "placementStatus" }
                ];
                doc.autoTable({
                    columns: exportColumns,
                    body: sourceData
                });
                doc.save("source_performance_report.pdf");
            });
        });
    };

    // Export to Excel
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(sourceData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            saveAsExcelFile(excelBuffer, 'source_performance_report');
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
                                <h1 class="page-title">Source Performance Report</h1>
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
                                <div className="page-title-box actjobsumtable mb-0">
                                    <DataTable
                                        value={sourceData}
                                        rowGroupMode="subheader"
                                        groupRowsBy="source"
                                        expandableRowGroups
                                        expandedRows={expandedRows}
                                        onRowToggle={(e) => setExpandedRows(e.data)}
                                        rowGroupHeaderTemplate={headerTemplate}
                                        // rowGroupFooterTemplate={footerTemplate}
                                        tableStyle={{ minWidth: '70rem' }}
                                    >
                                        {/* <Column field="source" header="Source" style={{ minWidth: '10rem' }}></Column> */}
                                        <Column field="candidateName" header="Candidate Name" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="jobId" header="Job ID" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="jobTitle" header="Job Title" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="received" header="Received" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="potentialDate" header="Potential Date" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="interviewDate" header="Interview Date" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="offerDate" header="Offer Date"  style={{ minWidth: '10rem' }}></Column>
                                        <Column field="joiningDate" header="Joining Date" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="closureDuration" header="Closure Duration (Days)" style={{ minWidth: '10rem' }}></Column>
                                        <Column field="placementStatus" header="Placement Status" style={{ minWidth: '10rem' }}></Column>
                                        {/* <Column
                                        field="placementStatus"
                                        header="Placement Status"
                                        body={statusBodyTemplate}
                                        style={{ width: '10%' }}
                                    ></Column> */}
                                    </DataTable>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

        </React.Fragment>
    );
};



export default SourcePerformanceReport;