import PropTypes from "prop-types"
import React, { useState, useEffect, useRef } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import axios from "axios"
import moment from "moment";
import { Toast } from 'primereact/toast';

import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { TriStateCheckbox } from "primereact/tristatecheckbox"
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from 'primereact/inputtextarea';
import { TreeSelect } from "primereact/treeselect";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import WorkType1 from "../common-for-all/WorkTypeOne"

//i18n

const EmployeeEditForm = props => {
  const [menu, setMenu] = useState(false)
  const toggle = () => {
    setMenu(!menu)
  }
  // document.title = "CandidateEditForm | Pms - React Admin & CandidateEditForm Template";
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU3VwZXJ1c2VyIFJvbGUiXSwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3JvbGVzIiwibWFuYWdlX3Blcm1pc3Npb25zIiwibWFuYWdlX3JvbGVfdG9fZW1wbG95ZWUiXSwiZXhwIjoxNzM3MDIwOTEwLCJpYXQiOjE3MzQ0Mjg5MTB9.E8kanEh13Hf17sceMHgLvcl2SCpn7Bj5XvU5BdnSFV8`

  const [selectedCity, setSelectedCity] = useState("Hyderabad")
  const cities = [
    { name: "Work From Office", code: "emp1" },
    { name: "Work From Remote", code: "emp2" },
    { name: "Work From Home", code: "emp3" },
    { name: "Freelancer", code: "emp4" },

  ]

  const [selectedStatus, setSelectedStatus] = useState(null)
  const [dateFromTo, setDateFromTo] = useState(null);


  const [fullname, setFullname] = useState("Lavankumar Kalvala");
  const [fullNameDialogVisible, setFullNameDialogVisible] = useState(false);

  // Private functionality state
  const [privateDrop, setPrivateDrop] = useState(false);
  const [PrivetDropdown, setPrivetDropdown] = useState([]);
  const PrivetDropdownValues = [
    { name: 'Mahesh', value: 'mahesh' },
    { name: 'Lavan', value: 'lavan' },
    { name: 'Vinay', value: 'vinay' },
    { name: 'Vasantha', value: 'vasantha' }
  ];

  const [company, setCompany] = useState("Varun Digital Media");

  // Company work type start
  const [selectedModule, setSelectedModule] = useState(null)
  
  const [moduleWorkTypes, setModuleWorkTypes] = useState([
    {
      name: "Pranathi Software Services",
      color: "#000000",
      id: "custom-task",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Varun Digital Media",
      color: "#000000",
      id: "custom-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Vitel Global Communication",
      color: "#000000",
      id: "custom-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "SPG",
      color: "#000000",
      id: "custom-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const moduleDropdownWorkTypes = [
    ...moduleWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Company", id: "create-new-work-type" },
    { name: "Edit Company", id: "edit-selected-work-type" },
  ]

  const handleModuleWorkTypesChange = updatedWorkTypes => {
    setModuleWorkTypes(updatedWorkTypes)
  }

  const handleModuleSelectionChange = selectedWorkType => {
    setSelectedModule(selectedWorkType)
  }
  // Company work type end

  // Designation work type start
  const [selectedDesignation, setSelectedDesignation] = useState(null)
  
  const [designationWorkTypes, setDesignationWorkTypes] = useState([
    {
      name: "Software Engineer",
      color: "#000000",
      id: "designation-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Senior Software Engineer",
      color: "#000000",
      id: "designation-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Team Lead",
      color: "#000000",
      id: "designation-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Project Manager",
      color: "#000000",
      id: "designation-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Frontend Developer",
      color: "#000000",
      id: "designation-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const designationDropdownWorkTypes = [
    ...designationWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Designation", id: "create-new-work-type" },
    { name: "Edit Designation", id: "edit-selected-work-type" },
  ]

  const handleDesignationWorkTypesChange = updatedWorkTypes => {
    setDesignationWorkTypes(updatedWorkTypes)
  }

  const handleDesignationSelectionChange = selectedWorkType => {
    setSelectedDesignation(selectedWorkType)
  }
  // Designation work type end

  // Department work type start
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  
  const [departmentWorkTypes, setDepartmentWorkTypes] = useState([
    {
      name: "Information Technology",
      color: "#000000",
      id: "department-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Human Resources",
      color: "#000000",
      id: "department-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Finance",
      color: "#000000",
      id: "department-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Marketing",
      color: "#000000",
      id: "department-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Sales",
      color: "#000000",
      id: "department-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const departmentDropdownWorkTypes = [
    ...departmentWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Department", id: "create-new-work-type" },
    { name: "Edit Department", id: "edit-selected-work-type" },
  ]

  const handleDepartmentWorkTypesChange = updatedWorkTypes => {
    setDepartmentWorkTypes(updatedWorkTypes)
  }

  const handleDepartmentSelectionChange = selectedWorkType => {
    setSelectedDepartment(selectedWorkType)
  }
  // Department work type end

  // Work Location work type start
  const [selectedWorkLocation, setSelectedWorkLocation] = useState(null)
  
  const [workLocationWorkTypes, setWorkLocationWorkTypes] = useState([
    {
      name: "Hyderabad Office",
      color: "#000000",
      id: "worklocation-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Bangalore Office",
      color: "#000000",
      id: "worklocation-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Mumbai Office",
      color: "#000000",
      id: "worklocation-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Remote Work",
      color: "#000000",
      id: "worklocation-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Client Location",
      color: "#000000",
      id: "worklocation-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const workLocationDropdownWorkTypes = [
    ...workLocationWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Work Location", id: "create-new-work-type" },
    { name: "Edit Work Location", id: "edit-selected-work-type" },
  ]

  const handleWorkLocationWorkTypesChange = updatedWorkTypes => {
    setWorkLocationWorkTypes(updatedWorkTypes)
  }

  const handleWorkLocationSelectionChange = selectedWorkType => {
    setSelectedWorkLocation(selectedWorkType)
  }
  // Work Location work type end

  // Shift Timings work type start
  const [selectedShiftTimings, setSelectedShiftTimings] = useState(null)
  
  const [shiftTimingsWorkTypes, setShiftTimingsWorkTypes] = useState([
    {
      name: "Day Shift (9:00 AM - 6:00 PM)",
      color: "#000000",
      id: "shift-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Night Shift (9:00 PM - 6:00 AM)",
      color: "#000000",
      id: "shift-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Evening Shift (2:00 PM - 11:00 PM)",
      color: "#000000",
      id: "shift-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Flexible Hours",
      color: "#000000",
      id: "shift-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Rotational Shift",
      color: "#000000",
      id: "shift-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const shiftTimingsDropdownWorkTypes = [
    ...shiftTimingsWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Shift Timing", id: "create-new-work-type" },
    { name: "Edit Shift Timing", id: "edit-selected-work-type" },
  ]

  const handleShiftTimingsWorkTypesChange = updatedWorkTypes => {
    setShiftTimingsWorkTypes(updatedWorkTypes)
  }

  const handleShiftTimingsSelectionChange = selectedWorkType => {
    setSelectedShiftTimings(selectedWorkType)
  }
  // Shift Timings work type end

  // Employee Status work type start
  const [selectedEmpStatus, setSelectedEmpStatus] = useState(null)
  
  const [empStatusWorkTypes, setEmpStatusWorkTypes] = useState([
    {
      name: "Active",
      color: "#000000",
      id: "empstatus-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Inactive",
      color: "#000000",
      id: "empstatus-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "On Leave",
      color: "#000000",
      id: "empstatus-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Probation",
      color: "#000000",
      id: "empstatus-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Terminated",
      color: "#000000",
      id: "empstatus-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const empStatusDropdownWorkTypes = [
    ...empStatusWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Employee Status", id: "create-new-work-type" },
    { name: "Edit Employee Status", id: "edit-selected-work-type" },
  ]

  const handleEmpStatusWorkTypesChange = updatedWorkTypes => {
    setEmpStatusWorkTypes(updatedWorkTypes)
  }

  const handleEmpStatusSelectionChange = selectedWorkType => {
    setSelectedEmpStatus(selectedWorkType)
  }
  // Employee Status work type end

  // Reporting Manager work type start
  const [selectedReportingManager, setSelectedReportingManager] = useState(null)
  
  const [reportingManagerWorkTypes, setReportingManagerWorkTypes] = useState([
    {
      name: "John Smith - Project Manager",
      color: "#000000",
      id: "manager-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Sarah Johnson - Team Lead",
      color: "#000000",
      id: "manager-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Michael Brown - Senior Manager",
      color: "#000000",
      id: "manager-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Emily Davis - Technical Lead",
      color: "#000000",
      id: "manager-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "David Wilson - Department Head",
      color: "#000000",
      id: "manager-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const reportingManagerDropdownWorkTypes = [
    ...reportingManagerWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Reporting Manager", id: "create-new-work-type" },
    { name: "Edit Reporting Manager", id: "edit-selected-work-type" },
  ]

  const handleReportingManagerWorkTypesChange = updatedWorkTypes => {
    setReportingManagerWorkTypes(updatedWorkTypes)
  }

  const handleReportingManagerSelectionChange = selectedWorkType => {
    setSelectedReportingManager(selectedWorkType)
  }
  // Reporting Manager work type end

  // Employee Type work type start
  const [selectedEmployeeType, setSelectedEmployeeType] = useState(null)
  
  const [employeeTypeWorkTypes, setEmployeeTypeWorkTypes] = useState([
    {
      name: "Full-time",
      color: "#000000",
      id: "emptype-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Part-time",
      color: "#000000",
      id: "emptype-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Contract",
      color: "#000000",
      id: "emptype-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Intern",
      color: "#000000",
      id: "emptype-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Consultant",
      color: "#000000",
      id: "emptype-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const employeeTypeDropdownWorkTypes = [
    ...employeeTypeWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Employee Type", id: "create-new-work-type" },
    { name: "Edit Employee Type", id: "edit-selected-work-type" },
  ]

  const handleEmployeeTypeWorkTypesChange = updatedWorkTypes => {
    setEmployeeTypeWorkTypes(updatedWorkTypes)
  }

  const handleEmployeeTypeSelectionChange = selectedWorkType => {
    setSelectedEmployeeType(selectedWorkType)
  }
  // Employee Type work type end

  // Sub Department work type start
  const [selectedSubDepartment, setSelectedSubDepartment] = useState(null)
  
  const [subDepartmentWorkTypes, setSubDepartmentWorkTypes] = useState([
    {
      name: "Frontend Development",
      color: "#000000",
      id: "subdept-task1",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Backend Development",
      color: "#000000",
      id: "subdept-task2",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "Quality Assurance",
      color: "#000000",
      id: "subdept-task3",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "DevOps",
      color: "#000000",
      id: "subdept-task4",
      statuses: ["Pending", "Processing", "Completed"],
    },
    {
      name: "UI/UX Design",
      color: "#000000",
      id: "subdept-task5",
      statuses: ["Pending", "Processing", "Completed"],
    },
  ])

  const subDepartmentDropdownWorkTypes = [
    ...subDepartmentWorkTypes,
    { id: "divider", disabled: true },
    { name: "Add Sub Department", id: "create-new-work-type" },
    { name: "Edit Sub Department", id: "edit-selected-work-type" },
  ]

  const handleSubDepartmentWorkTypesChange = updatedWorkTypes => {
    setSubDepartmentWorkTypes(updatedWorkTypes)
  }

  const handleSubDepartmentSelectionChange = selectedWorkType => {
    setSelectedSubDepartment(selectedWorkType)
  }
  // Sub Department work type end

  
  const [jobtitle, setJobtitle] = useState("Frontend Developer");
  const [email, setEmail] = useState(null);
  const [totalExperience, setTotalExperience] = useState("2");
  const [address, setAddress] = useState();

  const [currentSalary, setCurrentSalary] = useState("600000");
  const [expectedSalary, setExpectedSalary] = useState("800000");


  // education

  const [educationDetails, setEducationDetails] = useState([{
    degree: "Bachelor of Computer Science",
    institution: "JNTU",
    grade: "A",
    year: "2022",
  },]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    endYear: '',
    endMonth: '',
    grade: '',
  });

  // Add new education details to the table
  const handleAddEducation = () => {
    if (
      newEducation.degree.trim() &&
      newEducation.institution.trim() &&
      newEducation.year.trim() &&
      newEducation.grade.trim()
    ) {
      setEducationDetails([...educationDetails, { ...newEducation }]);
      setNewEducation({ degree: '', institution: '', year: '', grade: '' });
      setIsDialogVisible(false);
    } else {
      alert("Please fill all fields.");
    }
  };

  const years = Array.from({ length: 50 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  });

  const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];

  // system fields
  const handleUpload = (e) => {
  };



  //edit address
  const [visible, setVisible] = useState(false);
  const [street1, setStreet1] = useState('White house, Block-III, Begumpet, Hyderabad, Telangana, India, 500016');
  const [street2, setStreet2] = useState(' ');
  // const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(null);

  const addCities = [
    { name: 'Hyderabad', code: 'HYD' },
    { name: 'Chennai', code: 'CHN' },
    { name: 'Mumbai', code: 'MUM' },
    { name: 'Bangalore', code: 'BLR' },
    { name: 'Delhi', code: 'DEL' },
  ]

  const addStates = [
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Telangana', code: 'TG' },
    { name: 'Tamil Nadu', code: 'TN' },
    { name: 'Karnataka', code: 'KA' },
    { name: 'Kerala', code: 'KL' },
  ]

  const addCountries = [
    { name: "India", code: "IN" },
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "Australia", code: "AU" },
  ]

  const labels = [
    { name: "Work from Office", code: "WORK" },
    { name: "Work from Home", code: "HOME" },
    { name: "Work from Remote", code: "REMOTE" }
  ]


  const updateAddress = () => {
    // setAddress(`${street1}  ${street2} ${postalCode}`.trim());
  };
  useEffect(() => {
    const updatedAddress = [street1, street2, postalCode, selectedState?.name, selectedCity?.name, selectedCountry?.name, selectedLabel?.name, postalCode].filter(Boolean);
    setAddress(updatedAddress);
  }, [street1, street2, postalCode, selectedState, selectedCity, selectedCountry, selectedLabel, postalCode]);


  //documents popup type
  const [selectedDocument, setSelectedDocument] = useState(null);

  const groupedDocuments = [
    {
      label: 'Proof of Identity',
      items: [
        { label: 'Aadhaar Card', value: 'Aadhaar Card' },
        { label: 'Passport', value: 'Passport' },
        { label: 'Voter ID', value: 'Voter ID' },
        { label: 'PAN Card', value: 'PAN Card' },
        { label: 'Driver\'s License', value: 'Driver\'s License' }
      ]
    },
    {
      label: 'Educational Qualification Documents',
      items: [
        { label: '10th, 12th Standard Mark Sheets', value: '10th, 12th Standard Mark Sheets' },
        { label: 'Degree/Diploma Certificates', value: 'Degree/Diploma Certificates' },
        { label: 'Consolidated Mark Sheets', value: 'Consolidated Mark Sheets' },
        { label: 'Professional Certification Documents', value: 'Professional Certification Documents' }
      ]
    },
    {
      label: 'Employment-Related Documents',
      items: [
        { label: 'Offer Letter', value: 'Offer Letter' },
        { label: 'Appointment Letter', value: 'Appointment Letter' },
        { label: 'Resume/Curriculum Vitae', value: 'Resume/Curriculum Vitae' },
        { label: 'Previous Employment Experience Certificates', value: 'Previous Employment Experience Certificates' },
        { label: 'Relieving Letters from Previous Employers', value: 'Relieving Letters from Previous Employers' },
        { label: 'Service Certificate', value: 'Service Certificate' },
        { label: 'Last Drawn Salary Slip', value: 'Last Drawn Salary Slip' }
      ]
    },
    {
      label: 'Contact and Address Proof',
      items: [
        { label: 'Permanent Address Proof', value: 'Permanent Address Proof' },
        { label: 'Current Residential Address Proof', value: 'Current Residential Address Proof' },
        { label: 'Local Address Proof', value: 'Local Address Proof' },
        { label: 'Address Verification Documents', value: 'Address Verification Documents' },
        { label: 'Contact Information Form', value: 'Contact Information Form' }
      ]
    },
    {
      label: 'Financial and Tax-Related Documents',
      items: [
        { label: 'PAN Card', value: 'PAN Card' },
        { label: 'Bank Account Details', value: 'Bank Account Details' },
        { label: 'Cancelled Cheque', value: 'Cancelled Cheque' },
        { label: 'Form 16 from Previous Employer', value: 'Form 16 from Previous Employer' },
        { label: 'Tax Identification Documents', value: 'Tax Identification Documents' }
      ]
    },
    {
      label: 'Personal and Medical Documents',
      items: [
        { label: 'Passport-Size Photographs', value: 'Passport-Size Photographs' },
        { label: 'Birth Certificate', value: 'Birth Certificate' },
        { label: 'Marriage Certificate (if applicable)', value: 'Marriage Certificate (if applicable)' },
        { label: 'Passport Details', value: 'Passport Details' },
        { label: 'Medical Fitness Certificate', value: 'Medical Fitness Certificate' },
        { label: 'Police Verification Certificate', value: 'Police Verification Certificate' }
      ]
    },
    {
      label: 'Legal and Compliance Documents',
      items: [
        { label: 'Background Verification Consent Form', value: 'Background Verification Consent Form' },
        { label: 'Non-Disclosure Agreement (NDA)', value: 'Non-Disclosure Agreement (NDA)' },
        { label: 'Employment Bond (if applicable)', value: 'Employment Bond (if applicable)' },
        { label: 'Declaration of No Criminal Record', value: 'Declaration of No Criminal Record' }
      ]
    },
    {
      label: 'Statutory Documentation',
      items: [
        { label: 'Employee Provident Fund (EPF) Registration Form', value: 'Employee Provident Fund (EPF) Registration Form' },
        { label: 'Employee State Insurance (ESI) Form', value: 'Employee State Insurance (ESI) Form' },
        { label: 'Professional Tax Registration Details', value: 'Professional Tax Registration Details' }
      ]
    },
    {
      label: 'Emergency Contact and Nominee Details',
      items: [
        { label: 'Emergency Contact Information Form', value: 'Emergency Contact Information Form' },
        { label: 'Nominee Details for Insurance and Other Benefits', value: 'Nominee Details for Insurance and Other Benefits' },
        { label: 'Personal References', value: 'Personal References' }
      ]
    },
    {
      label: 'Additional Specialized Documents (Depending on Role/Industry)',
      items: [
        { label: 'Professional License Certificates', value: 'Professional License Certificates' },
        { label: 'Specialized Skill Certification', value: 'Specialized Skill Certification' },
        { label: 'Work Permit/Visa Documents (for Foreign Nationals)', value: 'Work Permit/Visa Documents (for Foreign Nationals)' },
        { label: 'Security Clearance Certificates', value: 'Security Clearance Certificates' }
      ]
    }
  ];

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <i className="pi pi-file mr-2"></i>
        <div>{option.label}</div>
      </div>
    );
  };

  // categories

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

  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);

  //groups

  const [groups] = useState([
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

  const [selectedGroupKey, setSelectedGroupKey] = useState(null);

  const setstatus = [
    { name: "Active", code: "act" },
    { name: "Inactive", code: "inc" },
  ]

  const [primarySkills, setPrimarySkills] = useState(null);
  const primary = [
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'CSS' }
  ];


  const [secondarySkills, setSecondarySkills] = useState(null);
  const secondary = [
    { name: 'SQL' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'PHP' }
  ];

  const [otherSkills, setOtherSkills] = useState([]);
  const other = [
    { name: 'Git' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'AWS' }
  ];

  const [skillsOptions, setSkillsOptions] = useState([
    { value: "java", label: "Java" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    // Add more skill options as needed
  ]);

  const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([]);
  // Handle Primary Skills Selection
  const handlePrimarySkillsChange = (selectedOptions) => {
    setSelectedPrimarySkills(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  // Templates for Dropdown items
  const skillOptionTemplate = (option) => {
    return <div>{option.name}</div>;
  };


  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
    };
  };


  const [dateAvalibility, setDateAvalibility] = useState(null);
  const [dob, setDob] = useState(null);
  const [dateOfJoining, setDateOfJoining] = useState(null);


  const [EmployeeRec, setEmployeeRec] = useState("  ")

  //  work experience variables start

  const [workExperiences, setWorkExperiences] = useState([{
    company: "Varun Digital Media",
    jobTitle: "Frotend Developoer",
    fromDate: new Date(2023, 2, 15),
    toDate: new Date(2025, 1, 21),
  }]);
  const [showDialog, setShowDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    company: "",
    website: "",
    jobTitle: "",
    fromDate: null,
    toDate: null,
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Form Handlers
  const handleInputChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      // Update existing record
      const updatedExperiences = [...workExperiences];
      updatedExperiences[editIndex] = formValues;
      setWorkExperiences(updatedExperiences);
      setEditIndex(null);
    } else {
      // Add new record
      setWorkExperiences([...workExperiences, formValues]);
    }
    setFormValues({
      company: "",
      website: "",
      jobTitle: "",
      fromDate: null,
      toDate: null,
      description: "",
    });
    setShowDialog(false);
  };

  const handleEdit = (rowData, index) => {
    setFormValues(rowData);
    setEditIndex(index);
    setShowDialog(true);
  };

  // Delete Functionality with Confirmation
  const handleDelete = (index) => {
    confirmDialog({
      message: "Are you sure you want to delete this work experience?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        setWorkExperiences((prev) => prev.filter((_, i) => i !== index));
      },
      reject: () => {
      },
    });
  };



  // Table Action Buttons
  const actionBodyTemplate = (rowData, column) => {
    const index = column.rowIndex;
    return (
      <div className="d-flex">
        <Button className="trashbtn mr-1" onClick={() => handleEdit(rowData, index)}>
          <i className="pi pi-pencil"></i>
        </Button>
        <Button className="trashbtn p-0" onClick={() => handleDelete(index)}>
          <i className="pi pi-trash"></i>
        </Button>
      </div>
    );
  };


  //  work experience variables end




  // Documents variable start


  const [selectedStatus1, setSelectedStatus1] = useState(null);  // Renamed to setSelectedStatus1
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([{
    type: "Aadhar",
    subject: "Aadhar card",
    // file: "lavan-file.pdf"
  }]);
  const [displayDialog, setDisplayDialog] = useState(false); // Modal visibility state

  // Sample status options (Renamed to setstatus1)
  const setstatus1 = [
    { name: 'Draft', code: 'draft' },
    { name: 'Final', code: 'final' },
    { name: 'Archived', code: 'archived' },
  ];

  // Custom uploader function (Renamed to customBase64Uploader2)
  const customBase64Uploader2 = (event) => {
    setFile(event.files[0]);
  };

  // Handle Add Document
  const handleAddDocument = () => {
    if (selectedStatus1 && subject && file) {
      const newDocument = { type: selectedStatus1.name, subject, file };
      setDocuments([...documents, newDocument]);
      alert('Document added successfully!');
      setDisplayDialog(false); // Close the modal after adding the document
    } else {
      alert('Please fill all the fields.');
    }
  };

  // Open the modal to add a new document
  const openAddDocumentDialog = () => {
    setDisplayDialog(true);
  };

  // Close the modal
  const closeAddDocumentDialog = () => {
    setDisplayDialog(false);
  };


  // Documents variable end




  const navigate = useNavigate();

  const handleSaveClick = () => {
    // Perform any additional logic if needed
    // console.log('Save button clicked');

    // Navigate to another page
    setMerge(true);

  };
  const [pathSegment, setPathSegment] = useState(null);
  useEffect(() => {
    const url = new URL(window.location.href); // Get the current URL
    const pathParts = url.pathname.split('/'); // Split the pathname into parts
    const lastSegment = pathParts[pathParts.length - 1]; // Get the last part of the path

    setPathSegment(lastSegment); // Set the last segment to state

  }, []);

  const [merge, setMerge] = useState(false);
  const footerContent = (
    <div className="d-flex justify-content-center">
      <button type="button" onClick={() => {
        navigate('/allactive-employees');

      }} class="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2">Yes</button>

      <button type="button" onClick={() => {
        navigate('/allactive-employees');

      }} class="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2">No</button>
    </div>
  );

  const { register, handleSubmit, reset, trigger, clearErrors, formState: { errors }, setValue, getValues } = useForm();


  const getcategoriesitem = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/${pathSegment}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        let results = response.data;
        setValue("firstname", results.first_name);
        setValue("lastname", results.last_name);
        setValue("jobtitle", results.job_title);
        setValue("personal_email", results.email);
        setValue("Email2", results.email_2);
        setValue("phone", results.mobile_phone);

        setValue("Company", results.country);

        console.log(results)

      }
    } catch (error) {

    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("first_name", data.firstname);
    formData.append("last_name", data.lastname);
    formData.append("job_title", data.JobTitle);
    formData.append("email", data.personal_email);
    formData.append("email_2", data.Email2);
    formData.append("mobile_phone", data.phone);
    formData.append("country", data.Company);

    // Serialize skills array into JSON
    // formData.append("primary_skills", JSON.stringify(selectedSkills));

    if (data.relocation) {
      formData.append("relocation", data.relocation ? "true" : "false");
    }
    if (data.EmployeeType) {
      formData.append("EmployeeType", data.EmployeeType);
    }

    if (expectedSalary) {
      formData.append("expectedSalary", expectedSalary);
    }
    if (currentSalary) {
      formData.append("currentSalary", currentSalary);
    }
    if (dob) {
      formData.append("dob", dob);
    }
    if (dateAvalibility) {
      formData.append("dateAvalibility", moment(dateAvalibility).format("YYYY-MM-DD"));
    }
    const findSelectedCategory = (categories, key) => {
      for (const category of categories) {
        if (category.key === key) {
          return category.label;
        }
        if (category.children) {
          const result = findSelectedCategory(category.children, key);
          if (result) return result;
        }
      }
      return null;
    };
    const selectedLabel = findSelectedCategory(categories, selectedCategoryKey);
    if (selectedLabel) {
      formData.append("selectedCategoryKey", selectedLabel);
    }

    const subdepatt = Array.isArray(workExperiences)
      ? workExperiences.map((item) => {
        if (item.haveError) {
          return {
            ...item,
            haveError: true,
          };
        }
        return item;
      })
      : [];
    formData.append("work_details", JSON.stringify(subdepatt));
    console.log(subdepatt)

    try {
      const response = await axios.patch(`${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/${pathSegment}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      navigate('/allactive-candidates');

    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };


  useEffect(() => {
    if (pathSegment) {
      getcategoriesitem(); // Call the function once the pathSegment is set
    }
  }, [pathSegment]);
  const toast = useRef(null);

  const showMessage = () => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Saved' });
  };



  const showCancel = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Canceled', life: 3000 });
  }


  const [createdBy, setcreatedBy] = useState("Harish")

  const handleSavenavi = () => {
    navigate("/allactive-employees");
  }

  return (
    <React.Fragment>
      <div className="page-content can-editform">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={6}>
                <h1 className="page-title">Create a Employees</h1>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Add a new employees by entering their details, skills, and contact information to streamline recruitment.
                  </li>
                </ol>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-end">
                  <Toast ref={toast} />
                  <button type="button" onClick={handleSavenavi} class="btn btn-success me-2"> <i className="pi pi-save me-1"></i> Save</button>

                  <Button
                    color="primary"
                    className="btn btn-primary me-2 cancel-outlinebtn"
                    onClick={handleSavenavi}
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </Button>
                </div>

              </Col>
            </Row>
          </div>


          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* 1st Row */}
              <Col xl={4}>
                <Card className="bg-form">
                  <CardBody>
                    <h4 className="card-title mb-2">Basic Information</h4>
                    <Row>
                      <Col xl={12}>
                        <div className="">
                          <Row>
                            <Col xl={12}>
                              <Row className="mt-2 align-items-center"   >
                                <Col xl={3}>
                                  <label className=" block mb-2">
                                    Full name
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText

                                    className="w-full"
                                    placeholder=""
                                    value={fullname}
                                    style={{ position: "relative" }}
                                    {...register("firstname", {
                                      required: "First name is required",
                                      pattern: {
                                        value: /^[A-Za-z][A-Za-z-\s&]+$/,
                                        message:
                                          "This field allows only alphabets and spaces, but does not accept a space as the first character.",
                                      },
                                    })}
                                    onKeyUp={() => { trigger("firstname") }}
                                  />
                                  {errors.firstname && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.firstname.message}</small>)}
                                  <i className="pi pi-pencil" style={{ position: "absolute", right: "26px", top: "28%", transform: "translateY(-50%)", color: "#6c757d", cursor: "pointer" }}
                                    onClick={() => setFullNameDialogVisible(true)}
                                  ></i>

                                  <Dialog
                                    header="Edit Full Name"
                                    visible={fullNameDialogVisible}
                                    onHide={() => setFullNameDialogVisible(false)}
                                    style={{ width: '30vw' }}
                                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                  >

                                    <Row className="mb-2">
                                      <Col xl={12}>
                                        <label htmlFor="title" className="block">
                                          Title
                                        </label>
                                        <InputText
                                          id="title"
                                          className="w-full"
                                          placeholder="Mr"
                                        />
                                      </Col>
                                    </Row>

                                    <Row className="mb-2">
                                      <Col xl={12}>
                                        <label htmlFor="title" className="block">
                                          First Name
                                        </label>
                                        <InputText
                                          id="title"
                                          className="w-full"
                                          placeholder="Lavankumar"
                                        />
                                      </Col>
                                    </Row>

                                    <Row className="mb-2">
                                      <Col xl={12}>
                                        <label htmlFor="title" className="block">
                                          Middle Name
                                        </label>
                                        <InputText
                                          id="title"
                                          className="w-full"
                                          placeholder=""
                                        />
                                      </Col>
                                    </Row>

                                    <Row className="mb-2">
                                      <Col xl={12}>
                                        <label htmlFor="title" className="block">
                                          Last Name
                                        </label>
                                        <InputText
                                          id="title"
                                          className="w-full"
                                          placeholder="Kalvala"
                                        />
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col xl={12}>
                                        <div className="d-flex justify-content-end mt-2">
                                          <Button color="primary btn-main mr-2" onClick={handleSave}>
                                            Ok
                                          </Button>
                                          {/* <Button color="btn btn-primary cancel-outlinebtn" onClick={() => setShowDialog(false)}>
                                            <i className="pi pi-times me-1"></i>
                                            Cancel
                                          </Button> */}
                                        </div>
                                      </Col>
                                    </Row>
                                  </Dialog>
                                </Col>
                              </Row>


                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className=" block mb-2">
                                    Company
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={moduleWorkTypes}
                                    dropdownWorkTypes={moduleDropdownWorkTypes}
                                    onWorkTypesChange={handleModuleWorkTypesChange}
                                    onSelectionChange={handleModuleSelectionChange}
                                  />
                                  {errors.Company && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.Company.message}</small>)}

                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className=" block mb-2">
                                    Designation
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={designationWorkTypes}
                                    dropdownWorkTypes={designationDropdownWorkTypes}
                                    onWorkTypesChange={handleDesignationWorkTypesChange}
                                    onSelectionChange={handleDesignationSelectionChange}
                                  />
                                  {errors.Designation && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.Designation.message}</small>)}

                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2"                                  >
                                    Status
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <div className="card flex justify-content-center mb-0">
                                    <select
                                      className='form-select profileDetailsInput' id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                                    >
                                      <option value=' '>Active</option>
                                      {/* <option value='Active'>Active</option> */}
                                      <option value='InActive'>InActive </option>
                                      <option value='InActive'>DND (Do Not Disturb) </option>
                                      <option value='InActive'>Blacklisted </option>

                                    </select>
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label htmlFor="totalExperience" className="block mb-2">
                                    Total Experience
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputNumber
                                    inputId="totalExperience"
                                    value={totalExperience}
                                    onValueChange={(e) => setTotalExperience(e.value)}
                                    minFractionDigits={1}
                                    maxFractionDigits={1}
                                    mode="decimal"
                                    placeholder=""
                                    className="w-full drop-clr"
                                  />
                                </Col>
                              </Row>

                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card className="bg-form">
                  <CardBody>
                    <h4 className="card-title mb-2">Contact Information</h4>
                    <Row>
                      <Col xl={12}>
                        <div className="">
                          <Row>
                            <Col xl={12}>
                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block mb-2"
                                  >
                                    Email 1
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    id="email"
                                    name="email"
                                    className="w-full"
                                    {...register("personal_email", {
                                      // required: "Please enter  Email",
                                      // pattern: {
                                      //   value:
                                      //     /^[A-Z0-9._%+-]+@[A-Z.-]{2,}\.+[A-Z]{2,}$/i,
                                      //   message:
                                      //     "Please enter valid Email", // JS only: <p>error message</p> TS only support string
                                      // },
                                      // onChange: (event) => event.target.value = event.target.value.toLowerCase()
                                    })}
                                    placeholder="lavan@varundigitalmedia.com"
                                  />

                                  {/* {errors.personal_email && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.personal_email.message}</small>)} */}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className=" block mb-2">
                                    Email 2
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    className="w-full"
                                    {...register("Email2", {})}
                                    placeholder="lavan9@gmail.com"
                                  />

                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block mb-2"
                                  >
                                    Work Phone
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    id="integer"
                                    keyfilter="int"
                                    className="w-full"
                                    placeholder="9876543211"
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className=" block mb-2"                                  >
                                    Mobile Phone
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    className="w-full"
                                    placeholder="9876543200"
                                    {...register("phone", {
                                      // required: "This field is required",
                                      // pattern: {
                                      //   value:
                                      //     /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                                      //   message: "Please enter a valid mobile number.",
                                      // },
                                      // minLength: {
                                      //   value: 10,
                                      //   message: "Please enter Min and Max 10 digits ",
                                      // },
                                      // maxLength: {
                                      //   value: 10,
                                      //   message: "Please enter Min and Max 10 digits ",
                                      // },

                                    })}

                                  // onKeyUp={(e) => {
                                  //   trigger("phone");

                                  // }}
                                  />
                                  {/* {errors.phone && (<small id='phoneNoHelp' className='form-text text-danger'>{errors.phone.message}</small>)} */}
                                </Col>
                              </Row>

                              {/* <Row className="mt-2 align-items-center">
                              <Col xl={4}>
                                <label
                                 
                                  className=" block mb-2"
                                >
                                  Address
                                </label>
                              </Col>
                              <Col xl={8}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                  placeholder="Country, Street address, Street address line 2, City*,Pincode,State, Label(work/home/other)"
                                />
                              </Col>
                            </Row> */}

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label htmlFor="address">Address</label>
                                </Col>
                                <Col xl={9}>

                                  <div className="companie-add" style={{ position: "relative" }}>
                                    <InputTextarea
                                      id="address"
                                      value={address}
                                      // onChange={(e) => setAddress(e.target.value)}
                                      readOnly
                                      placeholder=""
                                      rows={3}
                                      cols={20}
                                      className="w-full"
                                    />

                                    {/* Edit Icon */}
                                    <i
                                      className="pi pi-pencil"
                                      style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "70%",
                                        transform: "translateY(-50%)",
                                        color: "#6c757d",
                                        cursor: "pointer"
                                      }}
                                      onClick={() => setVisible(true)}
                                    ></i>
                                    <Dialog header="Edit Address" className="address-popup" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                                      style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                                      <div className="card sidebardetails">
                                        <form>

                                          <Row className="mb-3">
                                            <Col lg={6}>
                                              <div className="p-field">
                                                <label htmlFor="street1">Street 1</label>
                                                <InputText
                                                  id="street1"
                                                  value={street1}
                                                  onChange={(e) => { setStreet1(e.target.value); updateAddress(); }}
                                                  placeholder="Enter Street 1"
                                                  className="w-full activejobdrop"
                                                />
                                              </div>
                                            </Col>
                                            <Col lg={6}>
                                              <label htmlFor="street2">Street 2</label>
                                              <InputText
                                                id="street2"
                                                value={street2}
                                                onChange={(e) => { setStreet2(e.target.value); updateAddress(); }}
                                                placeholder="Enter Street 2 (Optional)"
                                                className="w-full activejobdrop"
                                              />
                                            </Col>
                                          </Row>



                                          <Row className="mb-3">


                                            <Col lg={6}>
                                              <label htmlFor="city">City</label>
                                              <Dropdown
                                                id="city"
                                                value={selectedCity}
                                                onChange={(e) => { updateAddress(); setSelectedCity(e.value) }}
                                                options={addCities}
                                                optionLabel="name"
                                                filter
                                                filterPlaceholder="Search City"
                                                className="w-full activejobdrop"
                                                placeholder="Hyderabad"
                                              />
                                            </Col>
                                            <Col lg={6}>
                                              <label htmlFor="state">State</label>
                                              <Dropdown
                                                id="state"
                                                value={selectedState}
                                                onChange={(e) => { updateAddress(); setSelectedState(e.value) }}
                                                options={addStates}
                                                optionLabel="name"
                                                filter
                                                filterPlaceholder="Search State"
                                                className="w-full activejobdrop"
                                                placeholder="Telangana"
                                              />
                                            </Col>
                                          </Row>

                                          <Row className="mb-3">
                                            <Col lg={6}>
                                              <label htmlFor="country">Country</label>
                                              <Dropdown
                                                id="country"
                                                value={selectedCountry}
                                                onChange={(e) => { updateAddress(); setSelectedCountry(e.value) }}
                                                options={addCountries}
                                                optionLabel="name"
                                                filter
                                                filterPlaceholder="Search Country"
                                                className="w-full activejobdrop"
                                                placeholder="India"
                                              />
                                            </Col>
                                            <Col lg={6}>
                                              <label htmlFor="postalCode">Postal Code</label>
                                              <InputText
                                                id="postalCode"
                                                value={postalCode}
                                                onChange={(e) => { updateAddress(); setPostalCode(e.target.value) }}
                                                placeholder="500016"
                                                className="w-full activejobdrop"
                                              />
                                            </Col>
                                          </Row>

                                          <Row className="mb-3">
                                            <Col lg={12}>
                                              <label htmlFor="postalCode">Label</label>
                                              <Dropdown
                                                value={selectedLabel}
                                                onChange={(e) => { updateAddress(); setSelectedLabel(e.value) }}
                                                options={labels}
                                                optionLabel="name"
                                                placeholder="Work From Office"
                                                className="w-full activejobdrop"
                                              />
                                            </Col>
                                          </Row>

                                        </form>
                                      </div>
                                    </Dialog>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

             


              </Col>
              {/* 1st Row */}

              {/* 2nd Row */}

              <Col xl={4}>
                <Card className="bg-form">
                  <CardBody>
                    <h4 className="card-title mb-2">General Information</h4>
                    <Row>
                      <Col xl={12}>
                        <div className="">
                          <Row>
                            <Col xl={12} >

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                 
                                </Col>
                                <Col xl={9}>
                                 
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Department
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={departmentWorkTypes}
                                    dropdownWorkTypes={departmentDropdownWorkTypes}
                                    onWorkTypesChange={handleDepartmentWorkTypesChange}
                                    onSelectionChange={handleDepartmentSelectionChange}
                                  />
                                  {errors.Department && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.Department.message}</small>)}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Sub Department
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={subDepartmentWorkTypes}
                                    dropdownWorkTypes={subDepartmentDropdownWorkTypes}
                                    onWorkTypesChange={handleSubDepartmentWorkTypesChange}
                                    onSelectionChange={handleSubDepartmentSelectionChange}
                                  />
                                  {errors.SubDepartment && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.SubDepartment.message}</small>)}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Work Location
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={workLocationWorkTypes}
                                    dropdownWorkTypes={workLocationDropdownWorkTypes}
                                    onWorkTypesChange={handleWorkLocationWorkTypesChange}
                                    onSelectionChange={handleWorkLocationSelectionChange}
                                  />
                                  {errors.WorkLocation && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.WorkLocation.message}</small>)}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Shift Timings
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={shiftTimingsWorkTypes}
                                    dropdownWorkTypes={shiftTimingsDropdownWorkTypes}
                                    onWorkTypesChange={handleShiftTimingsWorkTypesChange}
                                    onSelectionChange={handleShiftTimingsSelectionChange}
                                  />
                                  {errors.ShiftTimings && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.ShiftTimings.message}</small>)}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Employee Status
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={empStatusWorkTypes}
                                    dropdownWorkTypes={empStatusDropdownWorkTypes}
                                    onWorkTypesChange={handleEmpStatusWorkTypesChange}
                                    onSelectionChange={handleEmpStatusSelectionChange}
                                  />
                                  {errors.EmployeeStatus && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.EmployeeStatus.message}</small>)}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Employee Type
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={employeeTypeWorkTypes}
                                    dropdownWorkTypes={employeeTypeDropdownWorkTypes}
                                    onWorkTypesChange={handleEmployeeTypeWorkTypesChange}
                                    onSelectionChange={handleEmployeeTypeSelectionChange}
                                  />
                                  {errors.EmployeeType && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.EmployeeType.message}</small>)}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Reporting Manager
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <WorkType1
                                    initialWorkTypes={reportingManagerWorkTypes}
                                    dropdownWorkTypes={reportingManagerDropdownWorkTypes}
                                    onWorkTypesChange={handleReportingManagerWorkTypesChange}
                                    onSelectionChange={handleReportingManagerSelectionChange}
                                  />
                                  {errors.ReportingManager && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.ReportingManager.message}</small>)}
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className="block mb-2">
                                    Date of Joining
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <Calendar className="w-100"
                                    id="dateOfJoining"
                                    value={dateOfJoining}
                                    onChange={(e) => setDateOfJoining(e.value)}
                                    placeholder="01/01/2025"
                                    showIcon
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block mb-2"
                                  >
                                    DoB
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <Calendar className="w-100"
                                    id="buttondisplay"
                                    value={dob}
                                    onChange={(e) => setDob(e.value)}
                                    placeholder="20/02/2025"
                                    showIcon
                                  />
                                </Col>
                              </Row>



                              {/* <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className=" block mb-2">
                                    Availability Date
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <Calendar className="w-100"
                                    id="buttondisplay"
                                    value={dateAvalibility}
                                    onChange={(e) => setDateAvalibility(e.value)}
                                    placeholder="28/02/2025"
                                    showIcon
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label className=" block mb-2">
                                    Source
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    id="integer"
                                    keyfilter="int"
                                    className="w-full"
                                    placeholder="LinkedIn"
                                  />
                                </Col>
                              </Row>



                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block mb-2"
                                  >
                                    Referred By
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    id="integer"
                                    keyfilter="int"
                                    className="w-full"
                                    placeholder="Salmanuddin Syed"
                                  />
                                </Col>
                              </Row> */}

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block mb-2"
                                  >
                                    Categories
                                  </label>
                                </Col>
                                <Col xl={9}>

                                  <TreeSelect
                                    value={selectedCategoryKey}
                                    onChange={(e) => setSelectedCategoryKey(e.value)}
                                    options={categories}
                                    filter
                                    className="w-full"
                                    placeholder="Frontend"
                                  ></TreeSelect>
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block mb-2"
                                  >
                                    Groups
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <TreeSelect
                                    value={selectedGroupKey}
                                    onChange={(e) => setSelectedGroupKey(e.value)}
                                    options={groups}
                                    filter
                                    className="w-full"
                                    placeholder="React"
                                  ></TreeSelect>
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center justify-content-end">
                                {/* <Col lg={12}>
                                  <Row>
                                    <Col xl={6}>
                                      <label

                                        className=" block mb-2"
                                      >
                                        Relocation
                                      </label>
                                    </Col>
                                    <Col xl={6}>
                                      <div className="relocation">
                                        <input
                                          type='checkbox'
                                          className="me-2"
                                          checked
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </Col> */}
                                <Col lg={12}>
                                  <Row className="align-items-center">
                                    <Col xl={3}>
                                      <label className="block mb-2">
                                        Private
                                      </label>
                                    </Col>
                                    <Col xl={1}>
                                      <div className="d-flex align-items-center">
                                        <Checkbox
                                          inputId="privateCheckbox"
                                          checked={privateDrop}
                                          onChange={(e) => setPrivateDrop(e.checked)}
                                        />
                                      </div>
                                         </Col>
                                         <Col xl={8}>
                                      {privateDrop && (
                                        <div className="p-field">
                                          {/* <label htmlFor="userIds">User Id's</label> */}
                                          <MultiSelect
                                            value={PrivetDropdown}
                                            onChange={(e) => setPrivetDropdown(e.value)}
                                            options={PrivetDropdownValues}
                                            optionLabel="name"
                                            display="comma"
                                            placeholder="Select User Id's"
                                            maxSelectedLabels={10}
                                            className="w-full"
                                          />
                                        </div>
                                      )}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card className="bg-form">
                  <CardBody>
                    <h4 className="card-title mb-2">Resume </h4>
                    <Row>
                      <Col xl={12}>
                        <div className="">
                          <Row>
                            <Col xl={12}>
                              {/* <Row className="mt-2 align-items-center">
                              <Col xl={3}>
                                <label
                                 
                                  className=" block mb-2"
                                >
                                  Resume
                                </label>
                              </Col>
                              <Col xl={9}>
                                <InputText
                                  id="integer"
                                  keyfilter="int"
                                  className="w-full"
                                />

                              </Col>
                            </Row> */}

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block mb-2"
                                  >
                                    Resume Attachment
                                  </label>
                                </Col>
                                <Col xl={9}>

                                  <FileUpload
                                    mode="basic"
                                    name="resume[]"
                                    url="/api/upload"
                                    accept="*/*"
                                    maxFileSize={5000000}
                                    chooseLabel="Choose"
                                    uploadLabel="Upload"
                                  />
                                </Col>
                              </Row>


                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                
              </Col>

              {/* 2nd Row */}

              {/* 3rd Row */}

              <Col xl={4}>

                 <Card className="bg-form">
                  <CardBody>
                    <h4 className="card-title mb-2">Skills</h4>
                    <Row>
                      <Col xl={12}>
                        <div className="">
                          <Row>
                            <Col xl={12}>
                              {/* Primary Skills Dropdown */}
                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label htmlFor="primary" className="block mb-2">Primary Skills</label>
                                </Col>
                                <Col xl={9}>
                                  <div className="flex justify-content-center mb-0">
                                    <Select
                                      id="primarySkills"
                                      name="primarySkills"
                                      isMulti
                                      options={skillsOptions}
                                      value={skillsOptions.filter(option => selectedPrimarySkills.includes(option.value))}
                                      onChange={handlePrimarySkillsChange}
                                      placeholder="Javascript, React"
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              {/* Secondary Skills Dropdown */}
                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label htmlFor="secondary" className="block mb-2">Secondary Skills</label>
                                </Col>
                                <Col xl={9}>
                                  <div className="card flex justify-content-center mb-0">
                                    <Dropdown
                                      value={secondarySkills}
                                      onChange={(e) => setSecondarySkills(e.value)}
                                      options={secondary}
                                      optionLabel="name"
                                      placeholder="Typescript"
                                      className="w-full"
                                      filter
                                      editable
                                      itemTemplate={skillOptionTemplate}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              {/* Other Skills Dropdown */}
                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label htmlFor="other" className="block mb-2">Other Skills</label>
                                </Col>
                                <Col xl={9}>
                                  <div className="card flex justify-content-center mb-0">
                                    <Dropdown
                                      value={otherSkills}
                                      onChange={(e) => setOtherSkills(e.value)}
                                      options={other}
                                      optionLabel="name"
                                      placeholder="Python, Django"
                                      className="w-full"
                                      filter
                                      editable
                                      itemTemplate={skillOptionTemplate}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>


                
                                <Card className="bg-form">
                  <CardBody>
                    <h4 className="card-title mb-2">Documents</h4>
                    <Row>
                      <Col xl={12}>
                        <div>
                          {/* Button to trigger the modal */}
                          {/* <Button
                          label="Add Document"
                          icon="pi pi-plus"
                          className="p-button-success"
                          onClick={openAddDocumentDialog}
                        /> */}



                          {/* DataTable to display added documents */}
                          <Row className="mt-2">
                            <Col xl={12}>
                              {/* <h5>Added Documents:</h5> */}
                              <DataTable value={documents} rows={5} className="p-datatable-gridlines"
                                emptyMessage={<div className="empty-message-custom">No education details found.</div>}>
                                <Column field="type" header="Type" />
                                <Column field="subject" header="Subject" />
                                <Column field="file" header="Attachment" body={(rowData) => rowData.file ? rowData.file.name : 'No file'} />
                              </DataTable>
                            </Col>
                          </Row>
                          <div className="block d-flex justify-content-end align-items-center">
                            <a color="primary" className="anchr-title  mt-3" onClick={openAddDocumentDialog}>
                              <i className="pi pi-plus me-1"></i> Add More
                            </a>
                          </div>

                        </div>
                      </Col>
                    </Row>
                  </CardBody>

                  {/* Dialog for adding document */}
                  <Dialog
                    header="Add Document"
                    visible={displayDialog}
                    onHide={closeAddDocumentDialog}
                    style={{ width: "30vw" }}
                    footer={
                      <div>
                        {/* <Button label="Cancel" icon="pi pi-times" onClick={closeAddDocumentDialog} className="p-button-text" />

                      <Button label="Add" icon="pi pi-check" onClick={handleAddDocument} className="p-button-success" /> */}
                        <Button color="primary btn-main mr-2" onClick={closeAddDocumentDialog}>
                          Ok
                        </Button>
                        {/* <Button color="btn btn-primary cancel-outlinebtn" onClick={handleAddDocument}>
                        <i className="pi pi-times me-1"></i>
                        Cancel
                      </Button> */}
                      </div>
                    }
                  >
                    <Row className="mt-2 align-items-center">
                      <Col xl={3}>
                        <label htmlFor="type" className="block mb-2">
                          Type
                        </label>
                      </Col>
                      <Col xl={9}>
                        {/* <Dropdown
                        id="type"
                        value={selectedStatus1}
                        onChange={(e) => setSelectedStatus1(e.value)} 
                        options={setstatus1} 
                        optionLabel="name"
                        placeholder="Select a Status"
                        className="w-full drop-clr bgclr"
                      /> */}
                        <Dropdown
                          value={selectedDocument}
                          onChange={(e) => setSelectedDocument(e.value)}
                          options={groupedDocuments}
                          optionLabel="label"
                          optionGroupLabel="label"
                          optionGroupChildren="items"
                          optionGroupTemplate={groupedItemTemplate}
                          className="w-full bgclr"
                          placeholder="Select a Document"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2 align-items-center">
                      <Col xl={3}>
                        <label htmlFor="subject" className="block mb-2">
                          Subject
                        </label>
                      </Col>
                      <Col xl={9}>
                        <InputText
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2 align-items-center">
                      <Col xl={3}>
                        <label htmlFor="attachment" className="block mb-2">
                          Attachment
                        </label>
                      </Col>
                      <Col xl={9}>
                        <FileUpload
                          mode="basic"
                          name="demo[]"
                          url="/api/upload"
                          accept="*/*" // Accept all file types
                          maxFileSize={1000000}
                          onUpload={handleUpload}
                        />
                      </Col>
                    </Row>
                  </Dialog>
                </Card>


                <Card className="bg-form">
                  <CardBody>
                    <h4 className="card-title mb-2">System Fields</h4>
                    <Row>
                      <Col xl={12}>
                        <div className="">
                          <Row>
                            <Col xl={12}>
                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block"
                                  >
                                    Create Date
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <Calendar
                                    id="createDate"
                                    placeholder="27/02/2025"
                                    className="w-full"
                                    disabled
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block"
                                  >
                                    Edit Date
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <Calendar
                                    id="editDate"
                                    disabled
                                    className="w-full"
                                    placeholder="27/02/2025"
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block"
                                  >
                                    Created By
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    id="integer"
                                    className="w-full"
                                    disabled
                                    value={createdBy}
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label

                                    className=" block"
                                  >
                                    Edited By
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    id="integer"
                                    className="w-full"
                                    placeholder="Harish"
                                    disabled
                                  />
                                </Col>
                              </Row>

                            


                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              {/* 3rd Row */}
            </Row >

            <Row className="align-items-center mb-3">

              <Col md={12}>
                <div className="d-flex justify-content-end">
                  <button type="submit" class="btn btn-success me-2" onClick={handleSavenavi}> <i className="pi pi-save me-1"></i> Save</button>

                  <button type="button" class="btn btn-primary  me-2 cancel-outlinebtn" onClick={handleSavenavi}> <i className="pi pi-times me-1"></i> Cancel</button>


                </div>

              </Col>
            </Row>
          </form>


          <Dialog
            header="Duplicate Resumes"
            visible={merge}
            style={{ width: '30vw' }}
            onHide={() => {
              if (!merge) return;
              setMerge(false);
            }}
            footer={footerContent}
          >
            <p className="m-0">
              <h4 className="popup-merge">The employees already exists. Do you want to merge?</h4>
            </p>
          </Dialog>
        </Container >
      </div >
    </React.Fragment >
  )
}

export default EmployeeEditForm;
