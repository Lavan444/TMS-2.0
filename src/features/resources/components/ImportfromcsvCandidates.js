import React, { useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { useState, useEffect } from 'react';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const ImportFromCSV = () => {

    const stepperRef = useRef(null);

    // import csv table starts

    const [mappingFields, setMappingFields] = useState([
        { atsField: 'First name', defaultValue: '' },
        { atsField: 'Last name', defaultValue: '' },
        { atsField: 'Middle name', defaultValue: '' },
        { atsField: 'Primary Skills', defaultValue: '' },
        { atsField: 'Job title', defaultValue: '' }
    ]);

    const csvColumnOptions = [
        { label: 'First name', value: 'First name' },
        { label: 'Middle name', value: 'Middle name' },
        { label: 'Last name', value: 'Last name' },
        { label: 'Primary skills', value: 'Primary skills' },
        { label: 'Job title', value: 'Job title' }
    ];

    const onATSFieldChange = (e, index) => {
        let updatedMappingFields = [...mappingFields];
        updatedMappingFields[index].atsField = e.target.value;
        setMappingFields(updatedMappingFields);
    };

    const onCSVColumnChange = (e, index) => {
        let updatedMappingFields = [...mappingFields];
        updatedMappingFields[index].csvColumn = e.value;
        setMappingFields(updatedMappingFields);
    };

    const onDefaultValueChange = (e, index) => {
        let updatedMappingFields = [...mappingFields];
        updatedMappingFields[index].defaultValue = e.target.value;
        setMappingFields(updatedMappingFields);
    };

    // import csv table ends

    return (
        <React.Fragment>
            <div className="page-content allact-tabs">
                <Container fluid={true}>
                    <div className="page-title-box actjobbread">
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <h1 className="page-title"> Import Candidates</h1>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <div>
                                    <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                                        <StepperPanel header="Choose">
                                            <div className="flex flex-column">
                                                {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div> */}
                                                <h6 className="page-title mb-3">Upload CSV / Excel file</h6>

                                                <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                                            </div>
                                            <div className="flex pt-4 justify-content-end">
                                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                                            </div>
                                        </StepperPanel>

                                        <StepperPanel header="Duplicate Check">
                                            <div className="flex flex-column">
                                                <Row>
                                                    <Col md={12}>
                                                        <h6 className="page-title mb-3">Duplicate Check</h6>
                                                        <div className="card p-3 dup-check">

                                                            <div className="mb-3">
                                                                <label className="mb-2 import-head">Please choose an action to take if a duplicate candidate is detected during the upload.</label>
                                                                <div className="mt-2">
                                                                    <div>
                                                                        <input type="radio" id="add_as_a_resume" name="category" value="add_as_a_resume" />
                                                                        <label htmlFor="add_as_a_resume" className="ms-2 mb-0 import-fw">Add as a Candidate
                                                                        </label>
                                                                        <p className="txt">Select this option to create a new candidate in the system.
                                                                        </p>
                                                                    </div>

                                                                    <div>
                                                                        <input type="radio" id="overwrite_existing" name="category" value="overwrite_existing" />
                                                                        <label htmlFor="overwrite_existing" className="ms-2 mb-0 import-fw">Overwrite Existing</label>
                                                                        <p className="txt" >Choose this option to replace the existing candidate with the new one, moving the old candidate to the documents section.</p>
                                                                    </div>

                                                                    <div>
                                                                        <input type="radio" id="do_nothing" name="category" value="do_nothing" />
                                                                        <label htmlFor="do_nothing" className="ms-2 mb-0 import-fw">Do Nothing</label>
                                                                        <p className="txt">Opting for this option means the system will take no action upon detecting a duplicate record.
                                                                        </p>
                                                                    </div>

                                                                    <div>
                                                                        <p className="import-fw">Criteria for Identifying Duplicates:</p>
                                                                        <select className="form-select">
                                                                            <option>Email</option>
                                                                            <option>Phone Number</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="flex pt-4 justify-content-between">
                                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                                            </div>
                                        </StepperPanel>

                                        <StepperPanel header="Import from CSV / Excel">
                                            <h6 className="page-title mb-3">Import from CSV/Excel</h6>
                                            <div className="flex flex-column">
                                                <Row>
                                                    <Col lg={12}>
                                                        <DataTable value={mappingFields} stripedRows tableStyle={{ minWidth: '50rem' }}>
                                                            <Column field="atsField" header="ATS Fields" style={{ width: '30%' }}
                                                                body={(rowData, { rowIndex }) => (
                                                                    <InputText
                                                                        value={rowData.atsField}
                                                                        onChange={(e) => onATSFieldChange(e, rowIndex)}
                                                                        disabled
                                                                    />
                                                                )}
                                                            ></Column>
                                                            <Column
                                                                field="csvColumn"
                                                                header="CSV/Excel Columns"
                                                                style={{ width: '30%' }}
                                                                body={(rowData, { rowIndex }) => (
                                                                    <Dropdown
                                                                        value={rowData.csvColumn}
                                                                        options={csvColumnOptions}
                                                                        onChange={(e) => onCSVColumnChange(e, rowIndex)}
                                                                        placeholder="Select"
                                                                        className="bgclr"
                                                                    />
                                                                )}
                                                            ></Column>
                                                            <Column
                                                                field="defaultValue"
                                                                header="Default Values"
                                                                style={{ width: '30%' }}
                                                                body={(rowData, { rowIndex }) => (
                                                                    <InputText
                                                                        value={rowData.defaultValue}
                                                                        onChange={(e) => onDefaultValueChange(e, rowIndex)}
                                                                    />
                                                                )}
                                                            ></Column>
                                                        </DataTable>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="flex pt-4 justify-content-between">
                                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                                            </div>
                                        </StepperPanel>

                                        <StepperPanel header="Finish">
                                            <div className="flex flex-column">
                                                <Row>
                                                    <Col md={12}>
                                                        <h6 className="page-title mb-3">Finish</h6>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Total Records</th>
                                                                    <th>Count</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td> Total New Records Added </td>
                                                                    <td> 300 </td>
                                                                
                                                                </tr>
                                                                <tr>
                                                                    <td> Total Duplicate Records Found </td>
                                                                    <td> 50 </td>

                                                                </tr>
                                                                <tr>
                                                                    <td> Total Corrupt Records Found </td>
                                                                    <td> 10 </td>
                                                                </tr>
                                                                <tr>
                                                                    <td> Total Processed Records </td>
                                                                    <td> 240 </td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="flex pt-4 justify-content-start">
                                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                                            </div>
                                        </StepperPanel>
                                    </Stepper>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ImportFromCSV;