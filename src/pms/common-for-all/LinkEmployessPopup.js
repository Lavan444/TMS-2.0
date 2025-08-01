import React, {useState} from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {  Col,  Row, } from "reactstrap";

const LinkEmployessPopup = () => {

    const [selectedCandidates, setSelectedCandidates] = useState(null);
        const [candidates] = useState([
            { id: 1, name: 'LavanKumar Kalvala', designation: 'Frontend Developer', company: 'Varun Digital Media' },
            { id: 2, name: 'Venkata Laxmi Valle', designation: 'Frontend Developer', company: 'Varun Digital Media' },
            { id: 3, name: 'Ruchitha Emmadi', designation: 'Frontend Developer', company: 'Varun Digital Media' },
            { id: 4, name: 'Vasanth', designation: 'Data Scientist', company: 'Pranathi Software Services' },
            { id: 5, name: 'Saikumar Kunda', designation: 'Backend', company: 'Pranathi Software Services' },
        ]);

    const [searchText, setSearchText] = useState('');
    const [selectedCandidateNames, setSelectedCandidateNames] = useState('');
    const [candidateDetailsVisible, setCandidateDetailsVisible] = useState(false);

    const handleIconClick = () => {
        setCandidateDetailsVisible(true);
    };

    const handleSave = () => {
        const selectedNames = selectedCandidates ? selectedCandidates.name : '';
        setSelectedCandidateNames(selectedNames);
        setCandidateDetailsVisible(false);
    };

    const handleRefresh = () => {
        setSelectedCandidates(null);
        setSearchText('');
    };

    const filteredCandidates = candidates.filter(
        (candidate) =>
            candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.company.toLowerCase().includes(searchText.toLowerCase()) ||
            candidate.id.toString().includes(searchText)
    );

return<>
                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="candidateDetail" className="block mb-1">Link a Employees</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="candidateDetail"
                                    value={selectedCandidateNames}
                                    onChange={(e) => setSelectedCandidateNames(e.target.value)}
                                    placeholder="Select Employees"
                                    className="w-full"
                                    style={{ paddingRight: '2rem' }} // Ensure space for the icon
                                />
                                <i
                                    className="pi pi-chevron-down"
                                    onClick={handleIconClick}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer'
                                    }}
                                ></i>
                            </div>

                            <Dialog
                                header="Link Employees"
                                visible={candidateDetailsVisible}
                                onHide={() => setCandidateDetailsVisible(false)}
                                style={{ width: '40vw' }}
                                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                className="cand-details"
                            >
                                {/* Search Bar */}
                                    <Col lg={6}>
                                        <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                                            <InputText
                                                placeholder="Search Employees"
                                                value={searchText}
                                                onInput={(e) => setSearchText(e.target.value)}
                                                style={{ paddingRight: '2rem' }}
                                            />
                                            <i
                                                className="pi pi-search"
                                                style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '49%',
                                                    transform: 'translateY(-50%)',
                                                }}
                                            ></i>
                                        </div>
                                    </Col>

                                {/* DataTable */}
                                <DataTable
                                    value={filteredCandidates}
                                    paginator
                                    rows={5}
                                    selection={selectedCandidates}
                                    onSelectionChange={(e) => setSelectedCandidates(e.value)}
                                    dataKey="id"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    size="small"
                                >
                                    <Column selectionMode="single" style={{ width: '3em' }} />
                                    <Column field="name" header="Employee Name" />
                                    <Column field="designation" header="Designation" />
                                    <Column field="company" header="Company" />
                                </DataTable>

                                {/* Actions */}
                                <div className="d-flex  mt-3">
                                    <button type="button" className="btn btn-primary me-2 btn-main" onClick={handleSave}>Save</button>
                                    <button type="button" className="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
                                </div>
                            </Dialog>
                        </div>
                    </Col>
</>
}
export default LinkEmployessPopup;