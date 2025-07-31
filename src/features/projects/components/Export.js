import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CascadeSelect } from 'primereact/cascadeselect';
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import { Button } from "primereact/button";

const Export = () => {

    const [importCsvIcons, setImportCsvIcons] = useState(false);

    const dt = useRef(null);

    const exportCSVBtn = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportExcelBtn = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(jobsData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
            saveAsExcelFile(excelBuffer, "jobs_data");
        });
    };

    const exportPdfBtn = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default("landscape"); // Use landscape for better width

                const exportColumns = columns.map((col) => col.header); // Headers
                const exportData = jobsData.map((row) =>
                    columns.map((col) => row[col.field] ?? "-") // Replace undefined/null with '-'
                );

                doc.autoTable({
                    head: [exportColumns], // Column headers
                    body: exportData, // Data rows
                    startY: 20, // Adjust table position
                    styles: { fontSize: 8, cellPadding: 2 }, // Adjust text size for better fit
                    theme: "grid", // Add grid lines
                    margin: { top: 10, left: 5, right: 5 }, // Adjust margins
                    columnStyles: { 0: { cellWidth: 30 } }, // Set width for the first column
                });

                doc.save("jobs_data.pdf");
            });
        });
    };

    const headerBtn = (
        <div className="flex align-items-center justify-content-end gap-1 actionitem-import">
            <Button className="csvbtn p-button" icon="pi pi-file" rounded data-pr-tooltip="CSV" />
            <Button className="xlsbtn p-button" icon="pi pi-file-excel" severity="success" rounded data-pr-tooltip="XLS" />
            <Button className="pdfbtn p-button me-2" icon="pi pi-file-pdf" severity="warning" rounded data-pr-tooltip="PDF" />
        </div>
    );



    return (
        <React.Fragment>

            <button
                type="button"
                className="btn btn-secondary icons-btn me-1 expbtn"
                title="Export"
                onClick={() => setImportCsvIcons(!importCsvIcons)}
            >
                <i className="pi pi-file-export"></i>
            </button>

            {
                importCsvIcons && (<span>
                    {headerBtn}
                </span>)
            }

        </React.Fragment>
    )
}

export default Export;