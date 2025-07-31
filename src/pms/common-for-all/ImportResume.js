import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import {
    Container,
    Row,
    Col,
    Button,
} from "reactstrap";

import { FileUpload } from "primereact/fileupload";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from "primereact/treeselect";

const ImportBulkResume = () => {
    const [activeIndex, setActiveIndex] = useState(0); // State to track the current step
    // const toast = useRef(null);

    const [visible, setVisible] = useState(false);

    const steps = [
        { label: "Choose" },
        { label: "Duplicate Check" },
        { label: "Tag Resumes" },
        { label: "Finish" },
    ];
      const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
    

    const [categories] = useState([
        {
          key: "0",
          label: "Skills",
          children: [
            {
              key: "0-0",
              label: "Frontend",
              children: [
                { key: "0-0-0", label: "React" },
                { key: "0-0-1", label: "Angular" },
                { key: "0-0-2", label: "Bootstrap" },
              ],
            },
            {
              key: "0-1",
              label: "Backend",
              children: [
                { key: "0-1-0", label: "Python" },
                { key: "0-1-1", label: "Java" },
                { key: "0-1-2", label: "C#" },
              ],
            },
            {
              key: "0-2",
              label: "QA",
              children: [
                { key: "0-2-0", label: "Manual" },
                { key: "0-2-1", label: "Automation" },
              ],
            },
          ],
        },
      ]);

    // Content for each step
    const renderStepContent = () => {
        switch (activeIndex) {
            case 0:
                return (
                    <>
                        <h6 className="page-title mb-3">Upload Resumes</h6>
                        <div className="upload-resumes">
                            <Toast ref={toast}></Toast>

                            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                        </div>
                    </>
                );
            case 1:
                return (
                    <>
                        <Row>
                            <Col md={12}>
                                <h6 className="page-title mb-3">Duplicate Check</h6>
                                <div className="card p-3">

                                    <div className="mb-3">
                                        <label className="mb-2 import-head">Please choose an action to take if a duplicate resume is detected during the upload.</label>
                                        <div className="mt-2">
                                            <div className="mb-3">
                                                <input type="radio" id="add_as_a_resume" name="category" value="add_as_a_resume" />
                                                <label htmlFor="add_as_a_resume" className="ms-2 mb-0 import-fw">Add as a Resume
                                                </label>
                                                <p className="mb-0">Select this option to create a new candidate profile in the system.
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <input type="radio" id="overwrite_existing" name="category" value="overwrite_existing" />
                                                <label htmlFor="overwrite_existing" className="ms-2 mb-0 import-fw">Overwrite Existing</label>
                                                <p className="mb-0">Choose this option to replace the existing resume with the new one, moving the old resume to the documents section.</p>
                                            </div>

                                            <div className="mb-3">
                                                <input type="radio" id="do_nothing" name="category" value="do_nothing" />
                                                <label htmlFor="do_nothing" className="ms-2 mb-0 import-fw">Do Nothing</label>
                                                <p className="mb-0">Opting for this option means the system will take no action upon detecting a duplicate record.
                                                </p>
                                            </div>

                                            <div>
                                                <p className="import-fw mb-2">Criteria for Identifying Duplicates:</p>
                                                <select className="form-select w-50">
                                                    <option>Email</option>
                                                    <option>Phone Number</option>
                                                   
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Col>

                        </Row>
                    </>
                );
            case 2:
                return (
                    <>
                        <Row>
                            <Col md={12}>
                                <h6 className="page-title mb-3">Tag Resumes</h6>
                                <div className="card p-3">
                                    {/* Example Tagging Resumes UI */}
                                    <div className="mb-3">
                                        <label className="import-fw mb-2">Candidate Source:</label>
                                        <select className="form-select w-50">
                                            <option>Monster</option>
                                            <option>LinkedIn</option>
                                        </select>
                                        <label>Select value update candidates Source to all imported Candidates.</label>

                                    </div>

                                    <div className="mb-3">


                                         <Row className="mt-2 align-items-center mb-3">
                                                                        <Col xl={12}>
                                                                          <label
                                        
                                                                            className="block mb-3 import-fw"
                                                                          >
                                                                            Categories
                                                                          </label>
                                                                        </Col>
                                                                        <Col xl={12}>
                                        
                                                                          <TreeSelect
                                                                            value={selectedCategoryKey}
                                                                            onChange={(e) => setSelectedCategoryKey(e.value)}
                                                                            options={categories}
                                                                            filter
                                                                            className="w-50"
                                                                            placeholder="Select Category"
                                                                          ></TreeSelect>
                                                                          
                                                                        </Col>
                                                                        <Col xl={12}>
                                                                        <label className="mt-1">Categories candidates with the selected values</label>

                                                                        </Col>
                                                                      </Row>

                                        {/* <label className="import-fw mb-2">Categories:</label>

                                        <select className="form-select mb-1 w-50">
                                            <option>UX Designer</option>
                                            <option>Froentend Developer</option>
                                        </select>
                                        <label>Categories candidates with the selected values</label> */}

                                        <div className="mt-2">
                                        <label htmlFor="received" className="">
                                            <input type="radio" id="received" name="category" value="Received" defaultChecked className="me-2"  />
                                            Received</label>

                                            <label htmlFor="potential" className="ms-2">
                                            <input type="radio" id="potential" name="category" value="Potential" className="ms-4 me-2" />
                                            Potential</label>
                                            
                                            <label htmlFor="none" className="ms-2">
                                            <input type="radio" id="none" name="category" value="None" className="ms-4 me-2" />
                                            None</label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="import-fw">Link Jobs:</label>
                                        <select className="form-select w-50">
                                            <option>Job-1736 - Graphic Designer</option>
                                            <option>Job-1234 - UX Designer</option>
                                        </select>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </>
                );
            case 3:
                return (
                    <>
                        <Row>
                            <Col md={12}>
                                <h6 className="page-title mb-3">Finish</h6>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Resume File</th>
                                            <th>Size</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Anup - Sr.Python Developer <i className="pi pi-eye ms-2" onClick={() => setVisible(true)}></i> <i className="pi pi-pencil ms-2"></i> </td>
                                            <td>1.4 MB</td>
                                            <td>pdf</td>
                                            <td>Not started</td>
                                        </tr>
                                        <tr>
                                            <td>Krishna - Sr.React Developer <i className="pi pi-eye ms-2" onClick={() => setVisible(true)}></i> <i className="pi pi-pencil ms-2"></i> </td>
                                            <td>2.0 MB</td>
                                            <td>txt</td>
                                            <td>Processing</td>
                                        </tr>
                                        <tr>
                                            <td>Ravi - Data Science<i className="pi pi-eye ms-2" onClick={() => setVisible(true)}></i> <i className="pi pi-pencil ms-2"></i> </td>
                                            <td>3.0 MB</td>
                                            <td>html</td>
                                            <td>Completed</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>

                    </>
                );
            default:
                return null;
        }
    };

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {/* {uploadButton} */}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap bulk-resume">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="page-title-box">
                        {/* Steps Header */}
                        <Row className="mb-3">
                            <Col xl={12}>
                                <Toast ref={toast}></Toast>
                                <Steps
                                    model={steps}
                                    activeIndex={activeIndex}
                                    onSelect={(e) => setActiveIndex(e.index)}
                                    readOnly={false}
                                />
                            </Col>
                        </Row>

                        {/* Content Based on Active Step */}
                        <Row>
                            <Col xl={12}>{renderStepContent()}</Col>
                        </Row>

                        {/* Navigation Buttons */}
                        <Row className="mt-3">
                            <Col className="d-flex justify-content-between">
                                <Button
                                    // color="secondary"
                                    onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                                    disabled={activeIndex === 0}
                                    className="main-button"
                                >
                                    Previous
                                </Button>
                                {activeIndex < steps.length - 1 && (
                                    <Button
                                        // color="main-btn"
                                        className="main-button"
                                        onClick={() => setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1))}
                                    >
                                        Next
                                    </Button>
                                )}
                            </Col>
                        </Row>

                        <div className=" flex justify-content-center">
                            {/* <Button label="Show" icon="pi pi-external-link"  /> */}
                            <Dialog header="PROFILE INFORMATION" visible={visible} style={{ width: '60vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                <p className="mb-5">
                                    <Row>
                                        <Col xl={12}>
                                            <div className="mt-5">
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    <div className="flex-auto">
                                                        <label htmlFor="integer" className="block mb-2">
                                                            Display name
                                                        </label>
                                                        <InputText id="integer" keyfilter="int" className="w-full" />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <label htmlFor="number" className="block mb-2">
                                                            Job Tite
                                                        </label>
                                                        <InputText id="number" keyfilter="num" className="w-full" />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <label htmlFor="money" className="block mb-2">
                                                            City
                                                        </label>
                                                        <InputText id="money" keyfilter="money" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    <div className="flex-auto">
                                                        <label htmlFor="hex" className="block mb-2">
                                                            Referred By
                                                        </label>
                                                        <InputText id="hex" keyfilter="hex" className="w-full" />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <label htmlFor="alphabetic" className="block mb-2">
                                                            Country
                                                        </label>
                                                        <InputText id="alphabetic" keyfilter="alpha" className="w-full" />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <label htmlFor="alphanumeric" className="block mb-2">
                                                            State
                                                        </label>
                                                        <InputText id="alphanumeric" keyfilter="alphanum" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                    <div className="flex-auto">
                                                        <label htmlFor="pint" className="block mb-2">
                                                            Email
                                                        </label>
                                                        <InputText id="pint" keyfilter="pint" className="w-full" />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <label htmlFor="pnum" className="block mb-2">
                                                            Job function
                                                        </label>
                                                        <InputText id="pnum" keyfilter="pnum" className="w-full" />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <label htmlFor="email" className="block mb-2">
                                                            Edit Date
                                                        </label>
                                                        <InputText id="email" keyfilter="email" className="w-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </p>

                            </Dialog>
                        </div>

                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ImportBulkResume;
