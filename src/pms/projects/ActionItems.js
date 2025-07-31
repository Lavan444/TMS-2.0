import React, { useState, useRef, useEffect, useMemo } from "react"
import {
    CardBody,
    Col,
    Container,
    Row,
    // Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from "reactstrap"
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from "primereact/tabview"
import { Link, useLocation } from "react-router-dom"
import moment from "moment";
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import { Editor } from "primereact/editor";
import { Chips } from "primereact/chips";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { MultiSelect } from 'primereact/multiselect'; // Make sure to import MultiSelect correctly
import 'jspdf-autotable';
import { Calendar } from 'primereact/calendar';

import { useForm } from "react-hook-form";
import axios from "axios"
import LinkCandidates from "./LinkCandidates";
// import { Toast } from 'primereact/toast';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Badge } from 'primereact/badge';
import { TreeTable } from 'primereact/treetable';
import { Card } from 'primereact/card';
import { CascadeSelect } from 'primereact/cascadeselect';


const ActionItems = () => {


     const [selectedEmailOption, setSelectedEmailOption] = useState(null);
        const emailOptions = [
            { label: "New Email", icon: "pi pi-envelope" },
            { label: "Selected", icon: "pi pi-check-circle" },
            { label: "Searched", icon: "pi pi-search" },
            { label: "All", icon: "pi pi-inbox" },
            { label: "Jobs", icon: "pi pi-briefcase" },
        ];
    
        const selectedEmailTemplate = (option, props) => {
            if (option) {
                return (
                    <div className="flex align-items-center">
                        <i className={`${option.icon} mr-2`}></i>
                        <div>{option.label}</div>
                    </div>
                );
            }
            return (
                <div className="flex align-items-center">
                    <i className="pi pi-envelope mr-2"></i>
                    <span>{props.placeholder}</span>
                </div>
            );
        };
    
        const emailOptionTemplate = (option) => {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`}></i>
                    <div>{option.label}</div>
                </div>
            );
        };
        // sms
        const [selectedSmsOption, setSelectedSmsOption] = useState(null);
        const smsOptions = [
            { label: "Selected", icon: "pi pi-check-circle" },
            { label: "Searched", icon: "pi pi-search" },
            { label: "All", icon: "pi pi-inbox" },
        ];
    
        const selectedSmsTemplate = (option, props) => {
            if (option) {
                return (
                    <div className="flex align-items-center">
                        <i className={`${option.icon} mr-2`}></i>
                        <div>{option.label}</div>
                    </div>
                );
            }
            return (
                <div className="flex align-items-center">
                    <i className="pi pi-comment mr-2"></i>
                    <span>{props.placeholder}</span>
                </div>
            );
        };
    
        const smsOptionTemplate = (option) => {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`}></i>
                    <div>{option.label}</div>
                </div>
            );
        };
    
    
        //schedule
    
        const [selectedScheduleOption, setSelectedScheduleOption] = useState(null);
    
        const scheduleOptions = [
            { label: "Interview", icon: "pi pi-calendar-plus" },
            { label: "Call", icon: "pi pi-phone" },
            { label: "Meeting", icon: "pi pi-users" },
            { label: "Task", icon: "pi pi-check-square" },
            { label: "Event", icon: "pi pi-calendar" },
            { label: "Other", icon: "pi pi-cog" },
        ];
    
        const selectedScheduleTemplate = (option, props) => {
            if (option) {
                return (
                    <div className="flex align-items-center">
                        <i className={`${option.icon} mr-2`} />
                        <div>{option.label}</div>
                    </div>
                );
            }
            return (
                <div className="flex align-items-center">
                    <i className="pi pi-calendar mr-2" /> {/* Default icon for placeholder */}
                    <span>{props.placeholder}</span>
                </div>
            );
        };
    
        const scheduleOptionTemplate = (option) => {
            return (
                <div className="flex align-items-center">
                    <i className={`${option.icon} mr-2`} />
                    <div>{option.label}</div>
                </div>
            );
        };
    
        // more 
    
        // const [selectedOption, setSelectedOption] = useState(null);
        // const options = [
        //     { label: "Link Jobs", icon: "pi pi-link" },
        //     { label: "Delete", icon: "pi pi-trash" },
        // ];
    
        // const selectedOptionTemplate = (option, props) => {
        //     if (option) {
        //         return (
        //             <div className="flex align-items-center">
        //                 <i className={`${option.icon} mr-2`}></i>
        //                 <div>{option.label}</div>
        //             </div>
        //         );
        //     }
        //     return (
        //         <div className="flex align-items-center">
        //             <i className="pi pi-cog mr-2"></i>
        //             <span>{props.placeholder}</span>
        //         </div>
        //     );
        // };
    
        // const optionTemplate = (option) => {
        //     return (
        //         <div className="flex align-items-center">
        //             <i className={`${option.icon} mr-2`}></i>
        //             <div>{option.label}</div>
        //         </div>
        //     );
        // };


    return(
        <React.Fragment>

            <div>
            <Row className="align-items-center breadcrumb-card ac-items">
                            <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
                                <span className="addcan-ac">

                                    {selectedJobsData.length > 0 ?

                                        <span className="action-icons me-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary import-res-btn me-1 md:w-8rem"

                                            >
                                                <i className="pi pi-briefcase"></i> {selectedJobsData.length} Selected
                                            </button>

                                            <span className="icons-ac">
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1"
                                                    onClick={() => setVisibleViewRight(true)}
                                                >
                                                    <i className="pi pi-eye"></i>
                                                </button>


                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1"
                                                >
                                                    <i className="pi pi-pencil"></i>
                                                </button>


                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1"
                                                >
                                                    <i className="pi pi-trash"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    class="btn btn-secondary icons-btn ms-1"
                                                >
                                                    <i class="pi pi-check-circle"></i>
                                                </button>
                                            </span>

                                        </span>


                                        :
                                        <button
                                            type="button"
                                            className="btn btn-secondary import-res-btn md:w-8rem me-1"
                                            onClick={() => { setVisibleRight(true); reset(); setprimartkey(""); setJobStartDate(""); setJobEndDate(""); setText("") }}

                                        >
                                            <i className="pi pi-briefcase me-1"></i> Add a Job
                                        </button>
                                    }

                                </span>



                                <span className="drop-ac">
                                    <button
                                        type="button"
                                        className="btn btn-secondary import-res-btn me-1"

                                    >

                                        Submit Candidate
                                    </button>

                                    <CascadeSelect
                                        value={selectedSchedule}
                                        // onChange={(e) => setSelectedSchedule(e.value)}
                                        options={actScheduleOptions}
                                        optionLabel="name"
                                        optionGroupLabel="name"
                                        className="md:w-10rem me-1"
                                        optionGroupChildren={['subItems', 'subItems']}
                                        breakpoint="767px"
                                        placeholder="Schedule"
                                    />
                                    <LinkCandidates/>
                                </span>
                            </Col>

                            <Col xxl={3} xl={12} lg={12} sm={12}>
                                <div className="clr-icons">
                                    <button
                                        type="button"
                                        className="btn btn-secondary icons-btn me-1"
                                    >
                                        <i className="pi pi-file"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary icons-btn me-1"
                                    >
                                        <i className="pi pi-file-export"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary icons-btn" Tooltip="Clear Search" onClick={handleClearSearchJobs}
                                    >
                                        <i className="pi pi-sync"></i>
                                    </button>
                                </div>
                            </Col>
                        </Row>
            </div>
        </React.Fragment>
    )
}

export default ActionItems;