import React, { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardBody, Col, Container, Row, DropdownToggle, DropdownItem, DropdownMenu, } from "reactstrap";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
import { InputText } from "primereact/inputtext";

const MoreACcompanies = () => {


    // change status
    const [changeStatusAction, setChangeStatusAction] = useState(false)
    const [isAttachDocumentVisible, setIsAttachDocumentVisible] = useState(false);


    const [selectedLinkJob, setSelectedLinkJob] = useState(null)
    const moreoptions = [
        {
            name: "Attachments",
            onClick: () => setIsAttachDocumentVisible(true)
        },
        {
            name: "Change Status",
            onClick: () => setChangeStatusAction(true)
        },
        {
            name: "Delete",
        },
    ]

    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const documentTypes = [
        { name: "Company Profiles", code: "INV" },
        { name: "Company Contact Lists", code: "CTR" },
        { name: "Company Invoices", code: "PRP" },
        { name: "Company Feedback Forms", code: "RPT" },
        { name: "Company Policies", code: "AGR" },
        { name: "Company Job Posting Templates", code: "JPT" },
        { name: "Company Evaluation Forms", code: "EF" },
        { name: "Company Tax Documents", code: "TAX" },
        { name: "Company Termination Notices", code: "CTN" },
    ];

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onUpload = (event) => {
        // Store the uploaded files in state
        setUploadedFiles((prevFiles) => [...prevFiles, ...event.files]);
    };

    const [docSubject, setDocSubject] = useState("");


    return (
        <React.Fragment>

            <CascadeSelect
                value={selectedLinkJob}
                onChange={(e) => {
                    if (e.value && e.value.onClick) {
                        e.value.onClick();
                    }
                }}
                options={moreoptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={["jobs"]}
                placeholder="More"
                className="me-1"
            />

            {/* change status starts */}
            <Dialog
                header="Change Status"
                visible={changeStatusAction}
                onHide={() => setChangeStatusAction(false)}
                style={{ width: '30vw' }}
                className="changestatus-popup"
            >
                {/* Search Bar */}
                <Row className="mt-2 align-items-center">
                    <Col xl={2}>
                        <label className="block mb-2"                                  >
                            Status
                        </label>
                    </Col>
                    <Col xl={10}>
                        <div className="card flex justify-content-center mb-0 border-0">
                            <select
                                className='form-select profileDetailsInput' id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                            >
                                <option value=' '>Active</option>
                                <option value='InActive'>InActive</option>
                                <option value='InActive'>Hold</option>
                                <option value='InActive'>Blacklisted</option>
                            </select>
                        </div>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end  mt-4">
                    <button type="button" class="btn btn-primary btn-main" onClick={() => setChangeStatusAction(false)}>Submit</button>
                </div>
            </Dialog>


            {/* attachements starts */}

            <Dialog
                header="Attachments"
                visible={isAttachDocumentVisible}
                onHide={() => setIsAttachDocumentVisible(false)}
                style={{ width: '45vw' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            >
                <Row className="align-items-center">
                    <Col xl={6}>
                        <div className="card flex justify-content-center mb-0 border-0">
                            <label className="block mb-2"                                  >
                                Document Type
                            </label>
                            <Dropdown
                                value={selectedDocumentType}
                                onChange={(e) => setSelectedDocumentType(e.value)}
                                options={documentTypes}
                                optionLabel="name" // Display the "name" property in the dropdown
                                placeholder="Select a Document Type"
                                className="w-full bgclr"
                            />
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="p-field mt-2">
                            <label htmlFor="docSubject" className="block">Document Subject</label>
                            <InputText
                                id="docSubject"
                                value={docSubject}
                                onChange={(e) => setDocSubject(e.target.value)}
                                placeholder="Enter Document Subject"
                                className="p-inputtext-sm w-full"
                            />
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className="card flex justify-content-center mb-0 border-0 mt-2">
                            <label className="block mb-2"                                  >
                                Attach Documents
                            </label>
                            <FileUpload name="demo[]" url="/api/upload" accept="*/*" maxFileSize={1000000} onUpload={onUpload} multiple />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <button className="btn btn-primary btn-main mt-2" onClick={() => setIsAttachDocumentVisible(false)}> Submit </button>
                    </Col>
                </Row>
            </Dialog>

        </React.Fragment>
    );
};



export default MoreACcompanies;