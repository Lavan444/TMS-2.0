import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
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
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { Editor } from "primereact/editor";


import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { TriStateCheckbox } from "primereact/tristatecheckbox"
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from 'primereact/inputtextarea';
import { TreeSelect } from "primereact/treeselect";
import { useForm } from "react-hook-form";
//i18n

const JobsPostForm = props => {
    const [menu, setMenu] = useState(false)
    const toggle = () => {
        setMenu(!menu)
    }
    // document.title = "CandidateEditForm | Pms - React Admin & CandidateEditForm Template";

    const [selectedCity, setSelectedCity] = useState(null)
    const cities = [
        { name: "Work From Office", code: "emp1" },
        { name: "Work From Remote", code: "emp2" },
        { name: "Work From Home", code: "emp3" },
        { name: "Freelancer", code: "emp4" },

    ]


    const [totalExperience, setTotalExperience] = useState(null);
    const [address, setAddress] = useState();


    const [otherSkillsval, setotherSkillsval] = useState([])
    const [secondarySkillsval, setsecondarySkillsval] = useState([])
    const [primarySkillsvalu, setprimarySkillsvalu] = useState([])


    // education

    const [educationDetails, setEducationDetails] = useState([]);
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

    const handleSave1 = () => {
        if (editIndex !== null) {
            // Update existing record
            const updatedExperiences = [...educationDetails];
            updatedExperiences[editIndex] = newEducation;
            setEducationDetails(updatedExperiences);
            setEditIndex(null);
        } else {
            // Add new record
            setEducationDetails([...educationDetails, newEducation]);
        }
        setNewEducation({
            degree: " ",
            website: " ",
            jobTitle: " ",
            fromDate: null,
            toDate: null,
            description: " ",
        });
        setIsDialogVisible(false);
    };

    const handleSavedocument = () => {
        if (editIndex1 !== null) {
            // Update existing record
            const updatedExperiences = [...documents];
            updatedExperiences[editIndex] = documentvalu;
            setDocuments(updatedExperiences);
            setEditIndex1(null);
        } else {
            // Add new record
            setDocuments([...documents, documentvalu]);
        }
        setdocumentvalu({
            degree: " ",
            website: " ",
            jobTitle: " ",
            fromDate: null,
            toDate: null,
            description: " ",
        });
        setDisplayDialog(false);
    };

    const [documentvalu, setdocumentvalu] = useState({
        file: "",
        subject: "",
        selectedDocument: ""
    })


    const handleInputChange1 = (key, value) => {
        setdocumentvalu((prev) => ({
            ...prev,
            [key]: value,
        }));
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

    const [selectedJobFunction, setSelectedJobFunction] = useState(null);

    const jobFunctions = [
        { name: 'Software Engineer', code: 'SE' },
        { name: 'Product Manager', code: 'PM' },
        { name: 'Data Scientist', code: 'DS' },
        { name: 'UX/UI Designer', code: 'UI' },
        { name: 'Marketing Manager', code: 'MM' }
    ];

    const [selectedSeniority, setSelectedSeniority] = useState(null);

    const seniorityLevels = [
        { name: 'Junior', code: 'JR' },
        { name: 'Mid-Level', code: 'ML' },
        { name: 'Senior', code: 'SR' },
        { name: 'Lead', code: 'LD' },
        { name: 'Manager', code: 'MG' },
        { name: 'Director', code: 'DIR' },
        { name: 'VP', code: 'VP' },
        { name: 'C-Level', code: 'C' }
    ];

    // screening questions
    const [queVisible, setQueVisible] = useState(false);
    const [isQualificationRequired, setIsQualificationRequired] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // Handle form submission
    const handleCreate = () => {
        // Add the new question data to the DataTable
        const newQuestion = {
            question: question,
            answer: answer,
            qualificationRequired: isQualificationRequired ? "Yes" : "No"
        };
        setQuestionsData([...questionsData, newQuestion]);

        // Reset the form fields
        setQuestion("");
        setAnswer("");
        setIsQualificationRequired(false);

        // Close the dialog
        setQueVisible(false);
    };


    // screening questions
    const [questions, setQuestions] = useState([]);

    // Function to add a new question card
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { skill: "", experience: "", qualification: false },
        ]);
    };

    // Function to update a question
    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    // Function to remove a question card
    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    //edit address
    const [visible, setVisible] = useState(false);
    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    // const [selectedCity, setSelectedCity] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [postalCode, setPostalCode] = useState('');
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [selectedLabel1, setSelectedLabel1] = useState(null);



    const [basicimp, setbasicimp] = useState()
    const [basictittle, setbasictittle] = useState('');
    const [basicfirst, setbasicfirst] = useState('');
    const [basiclast, setbasiclast] = useState('');
    const [basicmiddle, setbasicmiddle] = useState('');

    const updateAddress = () => {
        // setAddress(`${street1}  ${street2} ${postalCode}`.trim());
    };
    useEffect(() => {
        const updatedAddress = [street1, street2, postalCode, selectedState?.name, selectedCity?.name, selectedCountry?.name, selectedLabel?.name, postalCode].filter(Boolean);
        setAddress(updatedAddress);

        const updatenamesbasic = [basictittle, basicfirst, basicmiddle, basiclast].filter(Boolean).join(" ");
        setbasicimp(updatenamesbasic)

    }, [street1, street2, postalCode, selectedState, selectedCity, selectedCountry, selectedLabel, postalCode, basictittle, basicfirst, basicmiddle, basiclast]);




    const [workplaceType, setWorkplaceType] = useState(null);

    const workplaceOptions = [
        { name: 'Work from Office', code: 'WFO' },
        { name: 'Work from Home', code: 'WFH' },
        { name: 'Work from Remote', code: 'WFR' }
    ];

    const [jobType, setJobType] = useState(null);

    const jobTypeOptions = [
        { name: 'Full Time', code: 'FT' },
        { name: 'Part Time', code: 'PT' },
        { name: 'Contract', code: 'CON' }
    ];

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departments = [
        { label: 'Human Resources', value: 'Human Resources' },
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Finance', value: 'Finance' },
        { label: 'Operations', value: 'Operations' }
    ];

    const [jobLocation, setJobLocation] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [jobLocations, setjobLocations] = useState([])
    const [companies, setcompanies] = useState([])

    const getcity = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_Jobs}/api/v1/cities/`, {

            });
            console.log(response.data)
            // Transform data if needed to match the Dropdown format
            const transformedData = response.data.results.map((city) => ({
                name: city.name,
                code: city.city_id,
            }));
            setjobLocations(transformedData);

        }
        catch (error) {
            console.error('Error fetching states:', error);
        }
    };
    const getCompany = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/company/`, {

            });
            console.log(response.data)
            // Transform data if needed to match the Dropdown format
            const transformedData = response.data.results.map((company) => ({
                name: company.company_name,
                code: company.company_id,
            }));
            setcompanies(transformedData);


        }
        catch (error) {
            console.error('Error fetching states:', error);
        }
    };
    useEffect(() => {
        getcity()
        getCompany()
    }, [])


    const [openings, setOpenings] = useState(null);

    const [minSalary, setMinSalary] = useState(null);
    const [maxSalary, setMaxSalary] = useState(null);
    const [jobStatus, setJobStatus] = useState(null);

    const jobStatusOptions = [
        { label: 'Open', value: 'Open' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Hold', value: 'Hold' }
    ];
    const [nodes, setNodes] = useState(null);


    // categories
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [selectedgroupKey, setselectedgroupKey] = useState(null);
    const [categoriesitem, setcategoriesitem] = useState([])
    const [selectedCategoryKey, setSelectedCategoryKey] = useState();
    const [groupitem, setgroupitem] = useState([])
    const [selectedGroupKey, setSelectedGroupKey] = useState(null);


    const buildTree = (data) => {
        const map = {};
        const tree = [];

        data.forEach((item) => {
            map[item.category_id] = {
                ...item,
                key: item.category_id,
                label: item.name,
                children: [],
            };
        });

        data.forEach((item) => {
            if (item.parent_category) {
                if (map[item.parent_category]) {
                    map[item.parent_category].children.push(map[item.category_id]);
                }
            } else {
                tree.push(map[item.category_id]);
            }
        });

        return tree;
    };

    const getcategoriesitem = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/categories/`, {

            });

            if (response.data && response.data.results) {
                const treeData = buildTree(response.data.results);
                setcategoriesitem(treeData);
            }
        } catch (error) {

        }
    };

    //groups


    const buildTreegroup = (data) => {
        const map = {};
        const tree = [];

        data.forEach((item) => {
            map[item.group_id] = {
                ...item,
                key: item.group_id,
                label: item.name,
                children: [],
            };
        });

        data.forEach((item) => {
            if (item.parent_groups) {
                if (map[item.parent_groups]) {
                    map[item.parent_groups].children.push(map[item.group_id]);
                }
            } else {
                tree.push(map[item.group_id]);
            }
        });

        return tree;
    };


    const getgroupsitemsub = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/groups/`, {

            });
            if (response.data && response.data.results) {
                const treeData = buildTreegroup(response.data.results);
                setgroupitem(treeData);
            }

        } catch (error) {

        }
    };



    const [primarySkills, setPrimarySkills] = useState();
    const [secondarySkills, setSecondarySkills] = useState(null);
    const [otherSkills, setOtherSkills] = useState();



    const [dateAvalibility, setDateAvalibility] = useState(null);
    const [dob, setDob] = useState(null);


    const [EmployeeRec, setEmployeeRec] = useState("  ")

    //  work experience variables start

    const [workExperiences, setWorkExperiences] = useState([]);

    const [editIndex1, setEditIndex1] = useState(null);
    const [editIndex, setEditIndex] = useState(null);


    const [selectedStatus1, setSelectedStatus1] = useState(null);  // Renamed to setSelectedStatus1
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);

    const navigate = useNavigate();

    const handleSaveClick = () => {
        setMerge(true);

    };
    const [pathSegment, setPathSegment] = useState(null);
    const [text, setText] = useState('');

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
                navigate('/allactive-candidates');

            }} class="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2">Yes</button>

            <button type="button" onClick={() => {
                navigate('/allactive-candidates');

            }} class="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2">No</button>
        </div>
    );

    const { register, handleSubmit, reset, trigger, clearErrors, formState: { errors }, setValue, getValues } = useForm();


    const onSubmit = async (data) => {

        if (!selectedCompany) {
            alert("select company ")
            return false

        }
        let req = {};

        if (data.JobTitle) {
            req.job_title = data.JobTitle;
        }
        if (data.hirringmanager) {
            req.hiring_manager = data.hirringmanager;
        }
        if (data.department) {
            req.department = data.department;
        }

        if (jobStatus) {
            req.status = jobStatus;
        }
        if (openings) {
            req.openings = openings;
        }
        if (totalExperience) {
            req.required_experience = totalExperience;
        }
        if (selectedCompany) {
            req.company_id = selectedCompany.code;
        }
        if (jobLocation) {
            req.location = jobLocation.name;
        }
        if (workplaceType) {
            req.workplace_types = workplaceType.name;
        }
        if (jobType) {
            req.job_type = jobType.name;
        }
        if (minSalary) {
            req.salary_min = minSalary;
        }
        if (maxSalary) {
            req.salary_max = maxSalary;
        }
        if (primarySkills) {
            req.required_skills = primarySkills;
        }
        if (secondarySkills) {
            req.preferred_skills = secondarySkills;
        }
        if (selectedJobFunction) {
            req.job_function = selectedJobFunction.name;
        }
        if (selectedSeniority) {
            req.seniority = selectedSeniority.name;
        }
        if (text) {
            req.job_description = text;
        }
        const validQuestions = formValues.filter(
            (question) =>
                !question.isDeleted &&
                (question.section1 || question.skills || question.idealAnswer || question.qualification)
        );

        if (validQuestions.length > 0) {
            req.screening_questions = validQuestions.map((question) => ({
                question_text: question.section1 || "",
                skill: question.skills || "",
                ideal_answer: question.idealAnswer || "",
                must_have: question.qualification || false,
            }));
        }


        try {
            const response = await axios.post(`${process.env.REACT_APP_Jobs}/api/v1/jobs/`, req, {

            }
            );
            navigate('/allactive-jobs');

        } catch (error) {
            console.error("Error sending data to API:", error);
        }
    };


    useEffect(() => {
        if (pathSegment) {
            // geteditvaluescondidates();
            // Call the function once the pathSegment is set
        }
    }, [pathSegment]);



    const getgroupsitem = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_CONDIDATES}/api/v1/skills/`, {

            });
            if (response.data && response.data.results) {
                const treeData = response.data.results;
                setotherSkillsval(treeData);
                setsecondarySkillsval(treeData)
                setprimarySkillsvalu(treeData)
            }

        } catch (error) {

        }
    };
    useEffect(() => {
        getgroupsitem()
        getgroupsitemsub()
        getcategoriesitem()
        getHirringmanager()
        getDepartments()
    }, [])

    const [hirringdata, sethirringdata] = useState([])
    const [departitems, setdepartitems] = useState([])

    const getHirringmanager = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/contacts/`, {

            });
            if (response.data) {
                let results = response.data.results;
                sethirringdata(results);
            }
        } catch (error) {

        }
    };
    const getDepartments = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_Company_Contact}/api/v1/departments/`, {

            });
            if (response.data) {
                let results = response.data.results;
                setdepartitems(results);
            }
        } catch (error) {

        }
    };
    /////////////////////

    const [formValues, setFormValues] = useState([{ questions: "" }]);
    const [errorFromBackend, setErrorFromBackend] = useState("");
    const [errorFromBackend2, setErrorFromBackend2] = useState("");
    const [setnameError, setSetnameError] = useState(null);
    const [questionError, setQuestionError] = useState(null);

    const handleChange = (index, field, value) => {
        // Clone the current form values
        const newFormValues = [...formValues];

        // Ensure the object at the specified index exists
        if (newFormValues[index]) {
            newFormValues[index][field] = value; // Update the field
            if (field === "qualification" && typeof value === "string") {
                value = value.trim();  // Only trim if it's a string
            }// Set error flag
            setFormValues(newFormValues); // Update the state
        } else {
            console.error(`Index ${index} is out of bounds for formValues array.`);
        }
    };
    let addFormFields = () => {
        setQuestionError('');
        setFormValues([...formValues, { questions: "", isDeleted: false, haveError: false }]);
        // console.log(formValues,'formValues on add click')
    };

    let removeFormFields = (index) => {
        let updatedFormValues = [...formValues];
        updatedFormValues[index].isDeleted = true; // Mark as deleted
        setFormValues(updatedFormValues);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={6}>
                                <h1 className="page-title">Create a Job</h1>
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item active">
                                        Add a new Jon by entering their details, skills, and contact information to streamline recruitment.
                                    </li>
                                </ol>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex justify-content-end">
                                    {/* <button type="button" onClick={handleSaveClick} class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main">Save</button> */}
                                    {/* <button type="button" class="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary">Cancel</button> */}
                                    {/* <Button
                                        color="primary"
                                        className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                                    >
                                        <i className="pi pi-times me-1"></i>
                                        Cancel
                                    </Button> */}
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

                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="jobId">Job ID</label>
                                                        </Col>
                                                        <Col xl={9}>
                                                            <InputText id="jobId" value="3048" readOnly className="w-full" />
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="integer" className=" block mb-2">
                                                                JobTitle
                                                            </label>
                                                        </Col>
                                                        <Col xl={9}>
                                                            <InputText
                                                                id="integer"
                                                                className="w-full"
                                                                {...register("JobTitle", {
                                                                    required: "JobTitle  is required",
                                                                    pattern: {
                                                                        value: /^[A-Za-z][A-Za-z-\s&]+$/,
                                                                        // message:
                                                                        //   "This field allows only alphabets and spaces, but does not accept a space as the first character.",
                                                                    },
                                                                })}
                                                                onKeyUp={() => { trigger("JobTitle") }}
                                                            />
                                                            {errors.JobTitle && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.JobTitle.message}</small>)}
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="jobStatus">Job Status</label>
                                                        </Col>
                                                        <Col xl={9}>
                                                            <div className="p-field card mb-0">
                                                                <Dropdown
                                                                    id="jobStatus"
                                                                    value={jobStatus}
                                                                    options={jobStatusOptions}
                                                                    onChange={(e) => setJobStatus(e.value)}
                                                                    placeholder="Select Job Status"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="currentSalary" className="block mb-2">
                                                                No of Openings
                                                            </label>
                                                        </Col>
                                                        <Col xl={9}>
                                                            <InputNumber
                                                                id="openings"
                                                                value={openings}
                                                                onValueChange={(e) => setOpenings(e.value)}
                                                                placeholder=""
                                                                className="w-full"
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="totalExperience" className="block mb-2">
                                                                Experience Required
                                                            </label>
                                                        </Col>
                                                        <Col xl={9}>

                                                            <InputNumber
                                                                inputId="totalExperience"
                                                                value={totalExperience}
                                                                onValueChange={(e) => setTotalExperience(e.value)}
                                                                placeholder=""
                                                                className="w-full drop-clr"
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="jobStartDate">Job Start Date</label>
                                                        </Col>
                                                        <Col xl={9}>

                                                            <Calendar
                                                                id="jobStartDate"
                                                                placeholder="Select Job Start Date"
                                                                className="w-full"
                                                                showIcon
                                                                dateFormat="yy-mm-dd" // Customize the format as needed
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="jobEndDate">Job End Date</label>
                                                        </Col>
                                                        <Col xl={9}>
                                                            <Calendar
                                                                id="jobEndDate"
                                                                placeholder="Select Job End Date"
                                                                className="w-full"
                                                                showIcon
                                                                dateFormat="yy-mm-dd" // Customize the format as needed
                                                            />
                                                        </Col>
                                                    </Row>


                                                    <Row className="mt-2 align-items-center">
                                                        <Col xl={3}>
                                                            <label htmlFor="jobType">Private</label>
                                                        </Col>
                                                        <Col xl={9}>
                                                            <input
                                                                type='checkbox'
                                                                className="me-2"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>


                                <Card className="bg-form">
                                    <CardBody>
                                        <h4 className="card-title mb-2">Hiring Details</h4>
                                        <Row>
                                            <Col xl={12}>
                                                <div className="">
                                                    <Row>
                                                        <Col xl={12} >

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="employeeType"
                                                                        className="block mb-2"
                                                                    >
                                                                        Hiring Manager
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="card flex justify-content-center mb-0">
                                                                        <select
                                                                            className='form-select profileDetailsInput' id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                                                                            aria-label='Default select example'
                                                                            {...register("hirringmanager", {
                                                                                // required: "This field is required",
                                                                            })}
                                                                        >
                                                                            <option value=''>--Select --</option>
                                                                            {hirringdata.map((item, j) => {
                                                                                return (
                                                                                    <option value={item.contact_id} key={j}>
                                                                                        {item.first_name}    {item.last_name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="integer"
                                                                        className=" block mb-2"
                                                                    >
                                                                        Company
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="card flex justify-content-center mb-0">
                                                                        <Dropdown
                                                                            id="company"
                                                                            value={selectedCompany}
                                                                            options={companies}
                                                                            onChange={(e) => setSelectedCompany(e.value)}
                                                                            placeholder="Select Company"
                                                                            optionLabel="name"
                                                                            filter
                                                                            filterBy="label" // Enables search by company name
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>


                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="integer"
                                                                        className=" block mb-2"
                                                                    >
                                                                        Job location
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="card flex justify-content-center mb-0">
                                                                        <Dropdown
                                                                            id="jobLocation"
                                                                            value={jobLocation}
                                                                            onChange={(e) => setJobLocation(e.value)}
                                                                            options={jobLocations}
                                                                            optionLabel="name"
                                                                            filter
                                                                            filterPlaceholder="Search Location"
                                                                            className="w-full activejobdrop"
                                                                            placeholder="Enter job location..."
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="employeeType"
                                                                        className="block mb-2"
                                                                    >
                                                                        Workplace Type
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="card flex justify-content-center mb-0">
                                                                        <Dropdown
                                                                            value={workplaceType}
                                                                            onChange={(e) => setWorkplaceType(e.value)}
                                                                            options={workplaceOptions}
                                                                            optionLabel="name"
                                                                            placeholder="Select Workplace Type"
                                                                            className="w-full"
                                                                            filter
                                                                            filterBy="label"
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="employeeType"
                                                                        className="block mb-2"
                                                                    >
                                                                        Job Type
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="card flex justify-content-center mb-0">
                                                                        <Dropdown
                                                                            value={jobType}
                                                                            onChange={(e) => setJobType(e.value)}
                                                                            options={jobTypeOptions}
                                                                            optionLabel="name"
                                                                            placeholder="Select Job Type"
                                                                            className="w-full"
                                                                            filter
                                                                            filterBy="label"
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>


                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label htmlFor="minSalary" className="block mb-2">
                                                                        Min Salary
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <InputNumber
                                                                        inputId="minSalary"
                                                                        value={minSalary}
                                                                        onValueChange={(e) => setMinSalary(e.value)}
                                                                        mode="currency"
                                                                        currency="INR"
                                                                        locale="en-IN"
                                                                        placeholder=""
                                                                        className="w-full"
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label htmlFor="maxSalary" className="block mb-2">
                                                                        Max Salary
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <InputNumber
                                                                        inputId="maxSalary"
                                                                        value={maxSalary}
                                                                        onValueChange={(e) => setMaxSalary(e.value)}
                                                                        mode="currency"
                                                                        currency="INR"
                                                                        locale="en-IN"
                                                                        placeholder=""
                                                                        className="w-full"
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="employeeType"
                                                                        className="block mb-2"
                                                                    >
                                                                        Department
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="card flex justify-content-center mb-0">
                                                                        <select
                                                                            className='form-select profileDetailsInput' id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                                                                            aria-label='Default select example'

                                                                            {...register("department", {
                                                                                // required: "This field is required",
                                                                            })}>
                                                                            <option value=''>--Select --</option>
                                                                            {departitems.map((item, j) => {
                                                                                return (
                                                                                    <option value={item.department_id} key={j}>
                                                                                        {item.name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
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
                                                                        Category
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <TreeSelect
                                                                        value={selectedNodeKey}
                                                                        onChange={(e) => setSelectedNodeKey(e.value)}
                                                                        options={categoriesitem}
                                                                        filter
                                                                        className=" w-full"
                                                                        placeholder="Select Item"
                                                                    ></TreeSelect>
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        className=" block"
                                                                    >
                                                                        Group
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <TreeSelect
                                                                        value={selectedgroupKey}
                                                                        onChange={(e) => setselectedgroupKey(e.value)}
                                                                        options={groupitem}
                                                                        filter
                                                                        className="w-full"
                                                                        placeholder="Select Item"
                                                                    ></TreeSelect>
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="integer"
                                                                        className=" block"
                                                                    >
                                                                        Create Date
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <Calendar
                                                                        id="createDate"
                                                                        placeholder=""
                                                                        className="w-full"
                                                                        disabled
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="integer"
                                                                        className=" block"
                                                                    >
                                                                        Edit Date
                                                                    </label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <Calendar
                                                                        id="editDate"
                                                                        disabled
                                                                        placeholder=""
                                                                        className="w-full"
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="integer"
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

                            <Col xl={8}>
                                <Card className="bg-form">
                                    <CardBody>
                                        <h4 className="card-title mb-2">Job Description</h4>
                                        <Row>
                                            <Col xl={12}>
                                                <div className="">

                                                    <Row>
                                                        <Col xl={12}>
                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label htmlFor="primarySkills" className="mb-0">Primary Skills</label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="p-field mb-0">
                                                                        {/* <MultiSelect value={selectedCities}
                                                                         onChange={(e) => setSelectedCities(e.value)}
                                                                          options={cities} optionLabel="name"
                                                                            placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" /> */}
                                                                        <Chips value={primarySkills}
                                                                            onChange={(e) => setPrimarySkills(e.target.value)} className="w-full" />
                                                                        {/* <select
                                                                            className="form-select mb-1"
                                                                            value={primarySkills}
                                                                            onChange={(e) => setPrimarySkills(e.target.value)}
                                                                        >
                                                                            <option value="">Select Primary Skills</option>
                                                                            {primarySkillsvalu.map((item, j) => {
                                                                                return (
                                                                                    <option value={item.skill_id} key={j}>
                                                                                        {item.skill_name}
                                                                                    </option>
                                                                                );
                                                                            })}

                                                                        </select> */}

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xl={12}>
                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label htmlFor="secondarySkills" className="mb-0">Secondary Skills</label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="p-field mb-0">
                                                                        <Chips value={secondarySkills}
                                                                            onChange={(e) => setSecondarySkills(e.target.value)} className="w-full" />
                                                                        {/* <select
                                                                            className="form-select mb-1"
                                                                            value={secondarySkills}
                                                                            onChange={(e) => setSecondarySkills(e.target.value)}
                                                                        >
                                                                            <option value="">Select Secondary Skills</option>
                                                                            {secondarySkillsval.map((item, j) => {
                                                                                return (
                                                                                    <option value={item.skill_id} key={j}>
                                                                                        {item.skill_name}
                                                                                    </option>
                                                                                );
                                                                            })}


                                                                        </select> */}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xl={12}>
                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label className="mb-0">Job Function</label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="p-field mb-0 card">
                                                                        <Dropdown
                                                                            value={selectedJobFunction}
                                                                            onChange={(e) => setSelectedJobFunction(e.value)}
                                                                            options={jobFunctions}
                                                                            optionLabel="name"
                                                                            placeholder="Select a Job Function"
                                                                            className="w-full"
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xl={12}>
                                                            <Row className="mt-2 align-items-center">
                                                                <Col xl={3}>
                                                                    <label className="mb-0">Seniority</label>
                                                                </Col>
                                                                <Col xl={9}>
                                                                    <div className="p-field mb-0 card">
                                                                        <Dropdown
                                                                            value={selectedSeniority}
                                                                            onChange={(e) => setSelectedSeniority(e.value)}
                                                                            options={seniorityLevels}
                                                                            optionLabel="name"
                                                                            placeholder="Select Seniority Level"
                                                                            className="w-full"
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xl={12}>
                                                            <Row className="sidebar d-flex align-items-center">
                                                                <Col xl={3}>
                                                                    <label
                                                                        htmlFor="integer"
                                                                        className=" block mb-2"
                                                                    >
                                                                        Description
                                                                    </label>

                                                                </Col>

                                                                <Col lg={9} className="d-flex justify-content-end mt-2">
                                                                    <div className="w-full">
                                                                        <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '200px' }}
                                                                        // {...register("Description", {
                                                                        //     required: "This field is required",
                                                                        //     // pattern: {
                                                                        //     //     value: /^[a-zA-Z_ ]*$/,
                                                                        //     //     message:
                                                                        //     //         "Please enter valid Job Tittle ",
                                                                        //     // },
                                                                        // })}
                                                                        // onKeyUp={() => { trigger("Description") }}
                                                                        />
                                                                        {/* {errors.Description && (<small id='emailHelp' className='form-text text-danger'>{errors.Description.message}</small>)} */}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mt-2 align-items-center">

                                                                <Col xl={12}>
                                                                    <div className="p-field mb-0">
                                                                        {/* <Editor value={content} onTextChange={handleEditorChange} headerTemplate={header} style={{ height: '320px' }}
                                                                            className="w-full" /> */}

                                                                    </div>
                                                                    <div style={{ marginTop: "10px", textAlign: "right" }}>
                                                                        <span>
                                                                            {/* {currentWordCount}/{maxWords} words */}
                                                                        </span>
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

                                <Card className="bg-form screening-que">
                                    <CardBody>
                                        <h4 className="card-title mb-3">Screening Questions</h4>
                                        <p>We suggest including at least three questions. Applicants are required to answer all questions.</p>
                                        {/* <DataTable rows={5} value={questionsData} showGridlines
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                        <Column field="question" header="Skill"></Column>
                                        <Column field="answer" header="Years of experience"></Column>
                                        <Column field="qualificationRequired" header="Must Have Qualification" style={{ width: '12vw' }}></Column>
                                    </DataTable> */}

                                        {/* <div className="block d-flex align-items-center justify-content-end">
                                        <a color="primary" className="anchr-title mt-3">
                                            <i className="pi pi-plus me-1"></i> Add Questions
                                        </a>
                                    </div>

                                    <div class="add-que-card">
                                    <p>How many years of experience do you have with [skill]?</p>
                                        <Row className="mb-2">
                                            <Col xl={4}>
                                                <label htmlFor="question" className="block">
                                                    Skill
                                                </label>
                                                <InputText
                                                    id="question"
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}
                                                    className="w-full"
                                                />
                                            </Col>
                                            <Col xl={4}>
                                                <label htmlFor="answer" className="block">
                                                    Years of experience
                                                </label>
                                                <InputText
                                                    id="answer"
                                                    value={answer}
                                                    onChange={(e) => setAnswer(e.target.value)}
                                                    className="w-full"
                                                />
                                            </Col>
                                            <Col xl={4}>
                                                <div className="d-flex">
                                                    <Checkbox
                                                        inputId="qualification"
                                                        onChange={e => setIsQualificationRequired(e.checked)}
                                                        checked={isQualificationRequired}
                                                    />
                                                    <label htmlFor="qualification" className="block mb-2 ms-2">Must Have Qualification</label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div> */}




                                        <div>
                                            <div className="block d-flex align-items-center justify-content-end">
                                                {/* <a
                                                    color="primary"
                                                    className="anchr-title mb-2"
                                                    onClick={handleAddQuestion}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <i className="pi pi-plus me-1"></i> Add Questions
                                                </a> */}
                                                <button type='button' className='btn addNewDeptBtn btn-outline-primary waves-effect' id='addNewDesigantionNameBtn' onClick={() => addFormFields()}>
                                                    <span>
                                                        add
                                                        <i className='fa fa-plus' aria-hidden='true'></i>
                                                    </span>
                                                    <small className='addBtnText'> </small>
                                                </button>
                                            </div>

                                            {/* Render dynamic question cards */}


                                            {formValues.map((question, index) =>
                                                question.isDeleted === false ? (
                                                    <div className=' mb-2' key={index}>
                                                        <label htmlFor='addNewSubDeptNameInput' className='form-field-label'>
                                                            Question {index + 0}
                                                            <InputText
                                                                className={`form-control ${errors.description && "invalid"}`} name={"name"} autoComplete="off"
                                                                value={question.section1}
                                                                onChange={(e) => handleChange(index, "section1", e.target.value)}
                                                            />
                                                        </label>
                                                        <div className='row'>
                                                            <div className=''>
                                                                <Row>
                                                                    <Col xl={4}>
                                                                        <label htmlFor={`skill-${index}`} className="block">
                                                                            Skill *
                                                                        </label>
                                                                        <InputText
                                                                            className={`form-control ${question.haveError && "is-invalid"}`}
                                                                            value={question.skills}
                                                                            onChange={(e) => handleChange(index, "skills", e.target.value)}
                                                                            placeholder="Enter skill"
                                                                        />
                                                                    </Col>
                                                                    <Col xl={4}>
                                                                        <label htmlFor={`experience-${index}`} className="block">
                                                                            Ideal Answer (Minimum)
                                                                        </label>
                                                                        <InputText
                                                                            className={`form-control ${question.haveError && "is-invalid"}`}
                                                                            value={question.idealAnswer}
                                                                            onChange={(e) => handleChange(index, "idealAnswer", e.target.value)}
                                                                            placeholder="Enter ideal answer"
                                                                        />
                                                                    </Col>
                                                                    <Col xl={4}>
                                                                        <div className="d-flex align-items-center mt-4">
                                                                            <Checkbox inputId={`qualification-${index}`}
                                                                                checked={question.qualification}
                                                                                onChange={(e) => handleChange(index, "qualification", e.checked)}
                                                                            />
                                                                            <label htmlFor={`qualification-${index}`} className="ms-2 mt-1">
                                                                                Must Have Qualification
                                                                            </label>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                {/* <textarea placeholder='Questions' className={`form-control ${errors.description && "invalid"}`} name={"name"} autoComplete="off"
                                                                    value={question.questions}
                                                                    onChange={(e) => {
                                                                        handleChange(index, e);
                                                                        question.questions = e.target.value;
                                                                        setQuestionError('')
                                                                    }}
                                                                /> */}
                                                            </div>
                                                            {question.haveError ? "" : <small className='text-danger'>{questionError}</small>}
                                                            {index ? (
                                                                <div className='rebuttonsin'>
                                                                    <button type='button' className='text-danger  rembutt1' onClick={() => removeFormFields(index)}>
                                                                        X
                                                                    </button>
                                                                </div>
                                                            ) : null}

                                                            {question.haveError ? <small className='text-danger'>Please enter valid question </small> : ""}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                            )}



                                        </div>

                                        {/* <Dialog
                                        header="Screening Questions"
                                        visible={queVisible}
                                        onHide={() => setQueVisible(false)}
                                        style={{ width: '30vw' }}
                                        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                    >

                                        <p>How many years of experience do you have with [skill]?</p>
                                        <Row className="mb-2">
                                            <Col xl={12}>
                                                <label htmlFor="question" className="block">
                                                    Skill
                                                </label>
                                                <InputText
                                                    id="question"
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}
                                                    className="w-full"
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col xl={12}>
                                                <label htmlFor="answer" className="block">
                                                    Years of experience
                                                </label>
                                                <InputText
                                                    id="answer"
                                                    value={answer}
                                                    onChange={(e) => setAnswer(e.target.value)}
                                                    className="w-full"
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col xl={12}>
                                                <div className="d-flex">
                                                    <Checkbox
                                                        inputId="qualification"
                                                        onChange={e => setIsQualificationRequired(e.checked)}
                                                        checked={isQualificationRequired}
                                                    />
                                                    <label htmlFor="qualification" className="block mb-2 ms-2">Must Have Qualification</label>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="align-items-center mt-3">
                                            <Col md={12}>
                                                <div className="d-flex justify-content-end">
                                                    <button type="button" className="btn btn-primary btn-main me-2" onClick={handleCreate}>
                                                        Create
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Dialog> */}

                                        <ConfirmDialog />
                                    </CardBody>
                                </Card>

                            </Col>



                            {/* 3rd Row */}

                            {/* <Col xl={4}>

                           


                        </Col> */}
                        </Row >

                        <Row className="align-items-center mb-3">

                            <Col md={12}>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main" >Save</button>
                                    <Link to={`/allactive-jobs`} > <button type="button" class="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn" >Cancel<i className="pi pi-times me-1"></i></button></Link>

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
                            <h4 className="popup-merge">The candidate already exists. Do you want to merge?</h4>
                        </p>
                    </Dialog>
                </Container >
            </div >
        </React.Fragment >
    )
}

export default JobsPostForm;
