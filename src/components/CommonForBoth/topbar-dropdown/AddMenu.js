import React, { useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useState, useEffect } from 'react';
import { CascadeSelect } from 'primereact/cascadeselect';
import { PlusIcon } from 'primereact/icons/plus';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Editor } from 'primereact/editor';
import { TreeSelect } from 'primereact/treeselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import Select from 'react-select';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import CreateShortform from 'pms/common-for-all/CreateShortform';

const AddMenu = () => {

    const [visibleRight, setVisibleRight] = useState(false);
    const [showCreateShortform, setShowCreateShortform] = useState(false);

    const toggleSidebar = () => {
        console.log("Toggling sidebar. Current state:", visibleRight);
        setVisibleRight(!visibleRight);
    };

    const [selectedAddMenu, setSelectedAddMenu] = useState(null);
    const [showImportBulkResume, setShowImportBulkResume] = useState(false);
    const navigate = useNavigate(); // Hook to manage navigation
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const menuAddOptions = [
        {
            name: 'Project Wizard',
            code: 'EM-NE',
            action: () => {
                console.log("Opening Project Wizard...");
                setShowCreateShortform(true);
            }
        },
        // {
        //     name: 'Parse bulk resumes',
        //     code: 'EM-SE',
        //     action: () => navigate('/import-bulkresume')
        // },

        {
            name: 'Parse Documents to Project / Work Type',
            code: 'EM-JO',
            action: () => {
                console.log('Navigating to /pharse-projectworktype');
                navigate('/pharse-projectworktype');
            }
        },
        {
            name: 'Import stakeholder from CSV / Excel',
            code: 'EM-JO',
            subItems: [
                {
                    name: 'Projects', code: 'EM-JO-AL',
                    action: () => navigate('/importfromcsv-project')

                },
                {
                    name: 'Work Type', code: 'EM-JO-SE',
                    action: () => navigate('/importfromcsv-worktype')
                },
                {
                    name: 'Companies', code: 'EM-JO-SE',
                    action: () => navigate('/importfromcsv-companies')
                },
                {
                    name: 'Contacts', code: 'EM-JO-SE',
                    action: () => navigate('/importfromcsv-contacts')
                }
            ],
        },
        {
            name: 'Export stakeholder from CSV / Excel',
            code: 'EM-JO',
            subItems: [
                {
                    name: 'Projects', code: 'EM-JO-AL',
                    action: () => exportcandCSV(false)
                },
                {
                    name: 'Work Type', code: 'EM-JO-SE',
                    action: () => jobsexportCSV(false)
                },

                {
                    name: 'Companies', code: 'EM-JO-SE',
                    action: () => exportCSV(false)
                },
                { name: 'Contacts', code: 'EM-JO-SE', action: () => contactexportCSV(false) },

            ],
        }
    ];

    const handlePlusIconClick = () => {
        // Handle the plus icon click event here
        console.log("Plus icon clicked!");
        // You can add your custom logic here
    };

    const handleSelectChange = (e) => {
        const selectedOption = e.value;
        setSelectedAddMenu(selectedOption);

        // If an action is defined for the selected option, execute it
        if (selectedOption && selectedOption.action) {
            selectedOption.action();
        }
    };

    {/* Side bar start */ }

    // Toggle dropdown open/close
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    const [hiringManager, setHiringManager] = useState(null);
    const [company, setCompany] = useState(null);
    const [jobLocation, setJobLocation] = useState(null);
    const [experience, setExperience] = useState("");



    // Example data for each field
    const hiringManagers = [
        { name: 'John', code: 'J1' },
        { name: 'Michael', code: 'M1' },
        { name: 'Sarah', code: 'S1' },
        { name: 'James', code: 'J2' },
    ];

    const companies = [
        { name: 'Tech Corp', code: 'TC' },
        { name: 'BizCorp', code: 'BC' },
        { name: 'Creative Solutions', code: 'CS' },
        { name: 'Innovative Tech', code: 'IT' },
    ];

    const jobLocations = [
        { name: 'Hyderabad', code: 'HYD' },
        { name: 'Chennai', code: 'CHN' },
        { name: 'Mumbai', code: 'MUM' },
        { name: 'Bangalore', code: 'BLR' },
        { name: 'Delhi', code: 'DEL' },
    ];


    const [jobStartDate, setJobStartDate] = useState(null);
    const [jobEndDate, setJobEndDate] = useState(null);


    //des

    const [text, setText] = useState(`Job Description: 
 We are looking for a talented and experienced Web Developer with at least 3 years of experience to join our team. The ideal candidate should have strong expertise in HTML, CSS, and JavaScript and a passion for creating responsive, user-friendly web applications. 
 
 Key Responsibilities:
 Develop and maintain web applications using HTML, CSS, and JavaScript. Ensure cross-browser compatibility and responsive design. Optimize web applications for performance and scalability. Collaborate with designers and back-end developers to implement UI/UX improvements. Debug and troubleshoot website issues and implement solutions. Stay updated with the latest web development trends and best practices. 
 
 Required Skills:
 Strong proficiency in HTML, CSS, and JavaScript. Experience with CSS frameworks (e.g., Bootstrap, Tailwind CSS). Knowledge of JavaScript frameworks (e.g., React, Vue, or Angular) is a plus. Understanding of responsive web design and cross-browser compatibility. Familiarity with version control systems (e.g., Git). Strong problem-solving and debugging skills. 
 
 Preferred Qualifications: 
 Experience with RESTful APIs and AJAX. Basic understanding of SEO best practices. Familiarity with CMS platforms like WordPress or Shopify. Experience with task runners/build tools like Webpack, Gulp, or npm.`);

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = renderHeader();


    const [skills, setSkills] = useState([]);
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [primartkey, setprimartkey] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);


    const handleAddSkill = () => {
        setIsAddingSkill(true);
    };

    const handleSkillChange = (e) => {
        const newSkills = e.value.filter((skill) => !skills.includes(skill));
        if (newSkills.length > 0) {
            setSkills((prevSkills) => [...prevSkills, ...newSkills]); // Add new skills
            setIsAddingSkill(false); // Hide the input field after a skill is added
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };


    {/* Side bar end */ }


    // candidates sidebar 

    const [isCandidatesSidebarVisible, setIsCandidatesSidebarVisible] = useState(false);

    const toggleCandidatesSidebar = () => {
        setIsCandidatesSidebarVisible(!isCandidatesSidebarVisible);
    };

    // contacts sidebar

    const [isContactsSidebarVisible, setIsContactsSidebarVisible] = useState(false);

    const toggleContactsSidebar = () => {
        setIsContactsSidebarVisible(prevState => !prevState);
    };


    const [isAddSidebarVisible, setIsAddSidebarVisible] = useState(false);


    // companies sidebar

    const [isCompaniesSidebarVisible, setIsCompaniesSidebarVisible] = useState(false);

    const toggleCompaniesSidebar = () => {
        setIsCompaniesSidebarVisible(prevState => !prevState);
    };

    const [isAddsSidebarVisible, setIsAddsSidebarVisible] = useState(false);


    // short form strats

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

    const [selectedCity, setSelectedCity] = useState(null);

    const cityOptions = [
        { name: 'Hyderabad', code: 'HYD' },
        { name: 'Chennai', code: 'CHN' },
        { name: 'Mumbai', code: 'MUM' },
        { name: 'Bangalore', code: 'BLR' },
        { name: 'Delhi', code: 'DEL' },
    ];

    const [selectedgroupKey, setselectedgroupKey] = useState(null);
    const [groupitem, setgroupitem] = useState([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [categoriesitem, setcategoriesitem] = useState([])

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

    const [industry, setIndustry] = useState(null)

    const industries = [
        { name: "Information Technology", code: "IT" },
        { name: "Healthcare", code: "HC" },
        { name: "Finance", code: "FN" },
        { name: "Manufacturing", code: "MN" },
        { name: "Retail", code: "RT" },
        // Add more industries here
    ]

    const [companySize, setCompanySize] = useState(null)

    const companySizes = [
        { name: "1-10 employees", code: "1-10" },
        { name: "11-50 employees", code: "11-50" },
        { name: "51-200 employees", code: "51-200" },
        { name: "201-500 employees", code: "201-500" },
        { name: "501-1000 employees", code: "501-1000" },
        { name: "1001-5000 employees", code: "1001-5000" },
        { name: "5001+ employees", code: "5001+" },
    ]

    const [selectedCompany, setSelectedCompany] = useState(null);

    const companyOptions = [
        { name: 'Google', code: 'GOO' },
        { name: 'Microsoft', code: 'MS' },
        { name: 'Apple', code: 'APL' },
        { name: 'Amazon', code: 'AMZ' },
        { name: 'Facebook', code: 'FB' }
    ];

    const [selectedPerson, setSelectedPerson] = useState(null);

    const personOptions = [
        { name: 'Ram Mohan', role: 'HR', code: 'HR' },
        { name: 'Sita Verma', role: 'Manager', code: 'MGR' },
        { name: 'Amit Sharma', role: 'Team Lead', code: 'TL' },
        { name: 'Ravi Kapoor', role: 'CEO', code: 'CEO' },
        { name: 'Neha Patel', role: 'Intern', code: 'INT' }
    ];

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departmentOptions = [
        { name: 'Account Finance Team', code: 'HR' },
        { name: 'SPG US Staffing', code: 'FIN' },
        { name: 'Vitel Development Team', code: 'MKT' },
        { name: 'Support Team', code: 'ENG' },
        { name: 'NOC Team', code: 'SAL' },
        { name: 'Digital Marketing Team', code: 'DIG' },
        { name: 'Executive Team', code: 'EXE' },
        { name: 'Operations Team', code: 'OPE' }
    ];

    // short form ends

    // companies table starts
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        website: { value: null, matchMode: FilterMatchMode.CONTAINS },
        industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
        companySize: { value: null, matchMode: FilterMatchMode.EQUALS },
        yearFounded: { value: null, matchMode: FilterMatchMode.EQUALS },
        overview: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        mobilePhone: { value: null, matchMode: FilterMatchMode.CONTAINS },
        address: { value: null, matchMode: FilterMatchMode.CONTAINS },
        notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        group: { value: null, matchMode: FilterMatchMode.CONTAINS },
        userIds: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
        lastActivityDate: { value: null, matchMode: FilterMatchMode.EQUALS },
        createDate: { value: null, matchMode: FilterMatchMode.EQUALS },
        editDate: { value: null, matchMode: FilterMatchMode.EQUALS },
    })

    const [companyData, setCompanyData] = useState([
        {
            company: "Tech Corp",
            website: "www.techcorp.com",
            industry: "Technology",
            companySize: "500",
            yearFounded: "2010",
            overview: "Leading technology solutions provider",
            email: "contact@techcorp.com",
            mobilePhone: "1234567890",
            address: "123 Tech Street",
            notes: "Key client",
            category: "Enterprise",
            group: "Group A",
            userIds: "User123",
            createdBy: "Admin",
            lastActivityDate: "2025-01-08",
            createDate: "2023-05-10",
            editDate: "2024-12-01",
        },
        {
            company: "Innovate Solutions",
            website: "www.innovatesolutions.com",
            industry: "Software Development",
            companySize: "250",
            yearFounded: "2015",
            overview: "Providing innovative software solutions worldwide.",
            email: "info@innovatesolutions.com",
            mobilePhone: "9876543210",
            address: "456 Innovate Lane",
            notes: "Potential partnership opportunity.",
            category: "Mid-Sized",
            group: "Group B",
            userIds: "User456",
            createdBy: "John Doe",
            lastActivityDate: "2025-01-05",
            createDate: "2020-02-15",
            editDate: "2024-11-30",
        },
        {
            company: "Green Ventures",
            website: "www.greenventures.com",
            industry: "Renewable Energy",
            companySize: "120",
            yearFounded: "2008",
            overview: "Specializing in sustainable energy solutions.",
            email: "contact@greenventures.com",
            mobilePhone: "1122334455",
            address: "789 Eco Park Avenue",
            notes: "Awarded for sustainability initiatives.",
            category: "Small Business",
            group: "Group C",
            userIds: "User789",
            createdBy: "Admin",
            lastActivityDate: "2025-01-02",
            createDate: "2018-06-20",
            editDate: "2024-10-15",
        },
        {
            company: "Future Tech",
            website: "www.futuretech.com",
            industry: "Artificial Intelligence",
            companySize: "1000",
            yearFounded: "2005",
            overview: "Leader in AI and machine learning technologies.",
            email: "info@futuretech.com",
            mobilePhone: "2233445566",
            address: "321 AI Boulevard",
            notes: "Hosted AI conference in 2024.",
            category: "Enterprise",
            group: "Group A",
            userIds: "User101",
            createdBy: "Jane Smith",
            lastActivityDate: "2025-01-07",
            createDate: "2019-01-10",
            editDate: "2024-12-05",
        },
        {
            company: "Healthify Solutions",
            website: "www.healthifysolutions.com",
            industry: "Healthcare",
            companySize: "750",
            yearFounded: "2012",
            overview: "Delivering advanced healthcare solutions.",
            email: "support@healthifysolutions.com",
            mobilePhone: "3344556677",
            address: "654 Wellness Street",
            notes: "Major client in the healthcare sector.",
            category: "Enterprise",
            group: "Group D",
            userIds: "User202",
            createdBy: "Admin",
            lastActivityDate: "2025-01-04",
            createDate: "2021-08-18",
            editDate: "2024-11-12",
        },
        {
            company: "Bright Minds Inc.",
            website: "www.brightminds.com",
            industry: "Education",
            companySize: "300",
            yearFounded: "2010",
            overview: "Innovating in educational technology.",
            email: "info@brightminds.com",
            mobilePhone: "4455667788",
            address: "567 Knowledge Lane",
            notes: "Developed e-learning platforms.",
            category: "Mid-Sized",
            group: "Group B",
            userIds: "User303",
            createdBy: "John Doe",
            lastActivityDate: "2025-01-06",
            createDate: "2022-03-22",
            editDate: "2024-12-10",
        },
        {
            company: "Urban Designs",
            website: "www.urbandesigns.com",
            industry: "Architecture",
            companySize: "150",
            yearFounded: "2018",
            overview: "Specializing in modern architectural designs.",
            email: "contact@urbandesigns.com",
            mobilePhone: "5566778899",
            address: "789 Modernist Drive",
            notes: "Recently expanded to Europe.",
            category: "Small Business",
            group: "Group E",
            userIds: "User404",
            createdBy: "Admin",
            lastActivityDate: "2025-01-03",
            createDate: "2020-07-25",
            editDate: "2024-10-01",
        },
        {
            company: "Tech Pioneers",
            website: "www.techpioneers.com",
            industry: "IT Services",
            companySize: "600",
            yearFounded: "2000",
            overview: "Providing comprehensive IT solutions.",
            email: "info@techpioneers.com",
            mobilePhone: "6677889900",
            address: "123 Pioneer Street",
            notes: "Strong presence in Asia.",
            category: "Enterprise",
            group: "Group A",
            userIds: "User505",
            createdBy: "Jane Smith",
            lastActivityDate: "2025-01-05",
            createDate: "2019-11-12",
            editDate: "2024-09-30",
        },
        {
            company: "Eco Builders",
            website: "www.ecobuilders.com",
            industry: "Construction",
            companySize: "200",
            yearFounded: "2016",
            overview: "Experts in sustainable building practices.",
            email: "support@ecobuilders.com",
            mobilePhone: "7788990011",
            address: "432 Eco Road",
            notes: "Won sustainability award in 2023.",
            category: "Mid-Sized",
            group: "Group C",
            userIds: "User606",
            createdBy: "Admin",
            lastActivityDate: "2025-01-02",
            createDate: "2021-05-30",
            editDate: "2024-12-15",
        },
        {
            company: "Creative Pixels",
            website: "www.creativepixels.com",
            industry: "Design",
            companySize: "50",
            yearFounded: "2020",
            overview: "Offering cutting-edge design solutions.",
            email: "info@creativepixels.com",
            mobilePhone: "8899001122",
            address: "987 Art Avenue",
            notes: "Collaborated with Fortune 500 companies.",
            category: "Startup",
            group: "Group F",
            userIds: "User707",
            createdBy: "John Doe",
            lastActivityDate: "2025-01-01",
            createDate: "2022-02-14",
            editDate: "2024-11-25",
        },
        {
            company: "Global Traders",
            website: "www.globaltraders.com",
            industry: "E-Commerce",
            companySize: "800",
            yearFounded: "2011",
            overview: "A leading platform for global trade.",
            email: "contact@globaltraders.com",
            mobilePhone: "9900112233",
            address: "101 Trade Center",
            notes: "Expanded to 20 countries in 2024.",
            category: "Enterprise",
            group: "Group A",
            userIds: "User808",
            createdBy: "Jane Smith",
            lastActivityDate: "2025-01-08",
            createDate: "2018-09-10",
            editDate: "2024-12-20",
        }
    ])

    const [selectedCompanyData, setSelectedCompanyData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageState, setPageState] = useState({ rows: 10, first: 0 })

    const onPage = event => {
        setPageState({ rows: event.rows, first: event.first })
    }

    const comdt = useRef(null)

    const exportCSV = (selectionOnly) => {
        comdt.current.exportCSV({ selectionOnly });
    };

    const [year, setYear] = useState(null)

    const [address, setAddress] = useState("")

    const [selectedState, setSelectedState] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedLabel, setSelectedLabel] = useState(null)
    const [postalCode, setPostalCode] = useState("")
    const [street1, setStreet1] = useState("")
    const [street2, setStreet2] = useState("")

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

    }
    // companies table ends

    // candidates table starts
    const [candidatefilters, setcandidateFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        candidateId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        jobTitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        companyName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yearsOfExperience: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        currentStatus: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        availabilityDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        relocationStatus: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        group: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        resume: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        primarySkills: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        editDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const [candidates, setCandidates] = useState([
        {
            "id": 1,
            "Firstname": "John",
            "Lastname": "Doe",
            "Company": "Tech Corp",
            "JobTitle": "Software Engineer",
            "PrimarySkills": "JavaScript, React",
            "Email": "john.doe@example.com",
            "MobilePhone": "1234567890",
            "City": "New York",
            "Status": "Active",
            "EmployeeType": "Full-Time",
            "Relocation": "Yes",
            "AvailabilityDate": "2024-12-01",
            "ResumeAttachment": "john_doe_resume.pdf",
            "Categories": "Engineering",
            "Groups": "Development",
            "CreateDate": "2024-01-01",
            "EditDate": "2024-11-15",
            "CreatedBy": "Admin",
            "Yearsofexperience": "3"
        },
        {
            "id": 2,
            "Firstname": "Jane",
            "Lastname": "Smith",
            "Company": "Innovate Inc",
            "JobTitle": "Project Manager",
            "PrimarySkills": "Leadership, Agile",
            "Email": "jane.smith@example.com",
            "MobilePhone": "9876543210",
            "City": "San Francisco",
            "Status": "Inactive",
            "EmployeeType": "Contract",
            "Relocation": "No",
            "AvailabilityDate": "2024-11-30",
            "ResumeAttachment": "jane_smith_resume.pdf",
            "Categories": "Management",
            "Groups": "Project Team",
            "CreateDate": "2023-08-15",
            "EditDate": "2024-10-20",
            "CreatedBy": "HR",
            "Yearsofexperience": "3"
        },
        {
            "id": 3,
            "Firstname": "Michael",
            "Lastname": "Johnson",
            "Company": "Future Works",
            "JobTitle": "Data Analyst",
            "PrimarySkills": "Python, SQL",
            "Email": "michael.johnson@example.com",
            "MobilePhone": "4567891234",
            "City": "Chicago",
            "Status": "Active",
            "EmployeeType": "Part-Time",
            "Relocation": "Yes",
            "AvailabilityDate": "2024-12-15",
            "ResumeAttachment": "michael_johnson_resume.pdf",
            "Categories": "Analytics",
            "Groups": "Data Science",
            "CreateDate": "2024-02-10",
            "EditDate": "2024-11-10",
            "CreatedBy": "Admin",
            "Yearsofexperience": "3"
        },
        {
            "id": 4,
            "Firstname": "Emily",
            "Lastname": "Brown",
            "Company": "Bright Ideas",
            "JobTitle": "Marketing Specialist",
            "PrimarySkills": "SEO, Content Creation",
            "Email": "emily.brown@example.com",
            "MobilePhone": "6543219870",
            "City": "Los Angeles",
            "Status": "Active",
            "EmployeeType": "Full-Time",
            "Relocation": "No",
            "AvailabilityDate": "2024-12-20",
            "ResumeAttachment": "emily_brown_resume.pdf",
            "Categories": "Marketing",
            "Groups": "Content Team",
            "CreateDate": "2024-05-20",
            "EditDate": "2024-11-12",
            "CreatedBy": "Manager",
            "Yearsofexperience": "3"
        },
        {
            "id": 5,
            "Firstname": "Chris",
            "Lastname": "Wilson",
            "Company": "Next Gen",
            "JobTitle": "UI/UX Designer",
            "PrimarySkills": "Figma, Sketch",
            "Email": "chris.wilson@example.com",
            "MobilePhone": "1239874560",
            "City": "Austin",
            "Status": "Inactive",
            "EmployeeType": "Freelancer",
            "Relocation": "No",
            "AvailabilityDate": "2024-12-05",
            "ResumeAttachment": "chris_wilson_resume.pdf",
            "Categories": "Design",
            "Groups": "UI Team",
            "CreateDate": "2023-09-01",
            "EditDate": "2024-10-30",
            "CreatedBy": "HR",
            "Yearsofexperience": "3"
        },
        {
            "id": 6,
            "Firstname": "Sophia",
            "Lastname": "Davis",
            "Company": "Alpha Solutions",
            "JobTitle": "HR Manager",
            "PrimarySkills": "Recruitment, Payroll",
            "Email": "sophia.davis@example.com",
            "MobilePhone": "4561237890",
            "City": "Seattle",
            "Status": "Active",
            "EmployeeType": "Full-Time",
            "Relocation": "Yes",
            "AvailabilityDate": "2024-12-10",
            "ResumeAttachment": "sophia_davis_resume.pdf",
            "Categories": "Human Resources",
            "Groups": "HR Team",
            "CreateDate": "2023-12-01",
            "EditDate": "2024-11-18",
            "CreatedBy": "Admin",
            "Yearsofexperience": "3"
        },
        {
            "id": 7,
            "Firstname": "James",
            "Lastname": "Anderson",
            "Company": "Green Tech",
            "JobTitle": "DevOps Engineer",
            "PrimarySkills": "AWS, Jenkins",
            "Email": "james.anderson@example.com",
            "MobilePhone": "7891234560",
            "City": "Boston",
            "Status": "Active",
            "EmployeeType": "Full-Time",
            "Relocation": "Yes",
            "AvailabilityDate": "2024-11-25",
            "ResumeAttachment": "james_anderson_resume.pdf",
            "Categories": "Engineering",
            "Groups": "DevOps",
            "CreateDate": "2024-03-15",
            "EditDate": "2024-11-15",
            "CreatedBy": "Admin",
            "Yearsofexperience": "3"
        },
        {
            "id": 8,
            "Firstname": "Isabella",
            "Lastname": "Miller",
            "Company": "Smart Tech",
            "JobTitle": "QA Engineer",
            "PrimarySkills": "Testing, Automation",
            "Email": "isabella.miller@example.com",
            "MobilePhone": "3214567890",
            "City": "Denver",
            "Status": "Inactive",
            "EmployeeType": "Contract",
            "Relocation": "No",
            "AvailabilityDate": "2024-12-18",
            "ResumeAttachment": "isabella_miller_resume.pdf",
            "Categories": "Quality Assurance",
            "Groups": "QA Team",
            "CreateDate": "2024-06-10",
            "EditDate": "2024-10-15",
            "CreatedBy": "HR",
            "Yearsofexperience": "3"
        },
        {
            "id": 9,
            "Firstname": "Daniel",
            "Lastname": "Taylor",
            "Company": "Tech World",
            "JobTitle": "Business Analyst",
            "PrimarySkills": "Data Analysis, Communication",
            "Email": "daniel.taylor@example.com",
            "MobilePhone": "6547893210",
            "City": "Miami",
            "Status": "Active",
            "EmployeeType": "Part-Time",
            "Relocation": "Yes",
            "AvailabilityDate": "2024-11-30",
            "ResumeAttachment": "daniel_taylor_resume.pdf",
            "Categories": "Business",
            "Groups": "Analysis",
            "CreateDate": "2023-11-05",
            "EditDate": "2024-11-20",
            "CreatedBy": "Manager",
            "Yearsofexperience": "3"
        },
        {
            "id": 10,
            "Firstname": "Olivia",
            "Lastname": "White",
            "Company": "Global Services",
            "JobTitle": "Customer Support",
            "PrimarySkills": "CRM, Problem Solving",
            "Email": "olivia.white@example.com",
            "MobilePhone": "9873216540",
            "City": "Phoenix",
            "Status": "Inactive",
            "EmployeeType": "Full-Time",
            "Relocation": "No",
            "AvailabilityDate": "2024-12-01",
            "ResumeAttachment": "olivia_white_resume.pdf",
            "Categories": "Customer Service",
            "Groups": "Support Team",
            "CreateDate": "2023-10-01",
            "EditDate": "2024-11-18",
            "CreatedBy": "HR",
            "Yearsofexperience": "3"
        },
        {
            "id": 11,
            "Firstname": "Liam",
            "Lastname": "Brown",
            "Company": "Innovatech Solutions",
            "JobTitle": "Software Developer",
            "PrimarySkills": "JavaScript, React, Node.js",
            "Email": "liam.brown@example.com",
            "MobilePhone": "9876543210",
            "City": "San Francisco",
            "Status": "Active",
            "EmployeeType": "Contract",
            "Relocation": "Yes",
            "AvailabilityDate": "2025-03-15",
            "ResumeAttachment": "liam_brown_resume.pdf",
            "Categories": "Software Development",
            "Groups": "Frontend Team",
            "CreateDate": "2023-08-15",
            "EditDate": "2024-12-20",
            "CreatedBy": "Recruiter",
            "Yearsofexperience": "5"
        }
    ]);

    const condt = useRef(null)

    const exportcandCSV = (selectionOnly) => {
        condt.current.exportCSV({ selectionOnly });
    };

    // candidates table ends


    // jobs table starts
    const [jobsfilters, setjobsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_status: { value: null, matchMode: FilterMatchMode.EQUALS },
        openings: { value: null, matchMode: FilterMatchMode.EQUALS },
        hiring_manager: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_location: { value: null, matchMode: FilterMatchMode.CONTAINS },
        workplace_type: { value: null, matchMode: FilterMatchMode.EQUALS },
        job_type: { value: null, matchMode: FilterMatchMode.EQUALS },
        primary_skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
        experience_required: { value: null, matchMode: FilterMatchMode.EQUALS },
        min_salary: { value: null, matchMode: FilterMatchMode.EQUALS },
        max_salary: { value: null, matchMode: FilterMatchMode.EQUALS },
        department: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        job_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        job_hiring_goal: { value: null, matchMode: FilterMatchMode.EQUALS },
        job_function: { value: null, matchMode: FilterMatchMode.CONTAINS },
        seniority: { value: null, matchMode: FilterMatchMode.EQUALS },
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        group: { value: null, matchMode: FilterMatchMode.CONTAINS },
        create_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        edit_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        created_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [jobsData, setJobsData] = useState([
        {
            job_id: 'J001',
            job_title: 'Software Developer',
            job_status: 'Open',
            openings: 5,
            hiring_manager: 'John Doe',
            company: 'TechCorp',
            job_location: 'New York, USA',
            workplace_type: 'Remote',
            job_type: 'Full-time',
            primary_skills: 'React, Node.js',
            experience_required: '3-5 years',
            min_salary: 60000,
            max_salary: 80000,
            department: 'Engineering',
            job_start_date: '2025-01-01',
            job_end_date: '2025-12-31',
            job_hiring_goal: 10,
            job_function: 'Development',
            seniority: 'Mid-level',
            category: 'IT',
            group: 'Tech Team',
            create_date: '2024-12-15',
            edit_date: '2025-01-05',
            created_by: 'Admin'
        },
        {
            job_id: 'J002',
            job_title: 'Data Analyst',
            job_status: 'Closed',
            openings: 2,
            hiring_manager: 'Jane Smith',
            company: 'DataPro',
            job_location: 'San Francisco, USA',
            workplace_type: 'On-site',
            job_type: 'Part-time',
            primary_skills: 'Python, SQL',
            experience_required: '2-4 years',
            min_salary: 50000,
            max_salary: 70000,
            department: 'Analytics',
            job_start_date: '2025-02-01',
            job_end_date: '2025-08-31',
            job_hiring_goal: 5,
            job_function: 'Analysis',
            seniority: 'Junior-level',
            category: 'Analytics',
            group: 'Business Insights',
            create_date: '2024-11-20',
            edit_date: '2025-01-08',
            created_by: 'Manager'
        },
        {
            job_id: 'J003',
            job_title: 'Project Manager',
            job_status: 'Open',
            openings: 3,
            hiring_manager: 'Michael Lee',
            company: 'BuildIt',
            job_location: 'Chicago, USA',
            workplace_type: 'Hybrid',
            job_type: 'Contract',
            primary_skills: 'Agile, Scrum',
            experience_required: '5-7 years',
            min_salary: 75000,
            max_salary: 95000,
            department: 'Management',
            job_start_date: '2025-03-01',
            job_end_date: '2026-02-28',
            job_hiring_goal: 6,
            job_function: 'Management',
            seniority: 'Senior-level',
            category: 'Management',
            group: 'Operations',
            create_date: '2024-10-10',
            edit_date: '2025-01-07',
            created_by: 'Director'
        },
        {
            job_id: 'J004',
            job_title: 'Graphic Designer',
            job_status: 'Open',
            openings: 1,
            hiring_manager: 'Emily Brown',
            company: 'Creative Studios',
            job_location: 'Los Angeles, USA',
            workplace_type: 'Remote',
            job_type: 'Freelance',
            primary_skills: 'Photoshop, Illustrator',
            experience_required: '2-3 years',
            min_salary: 40000,
            max_salary: 60000,
            department: 'Design',
            job_start_date: '2025-04-15',
            job_end_date: '2025-12-31',
            job_hiring_goal: 2,
            job_function: 'Design',
            seniority: 'Junior-level',
            category: 'Creative',
            group: 'Design Team',
            create_date: '2024-12-01',
            edit_date: '2025-01-02',
            created_by: 'Creative Lead'
        },
        {
            job_id: 'J005',
            job_title: 'HR Specialist',
            job_status: 'On Hold',
            openings: 2,
            hiring_manager: 'Karen Wilson',
            company: 'PeopleFirst',
            job_location: 'Seattle, USA',
            workplace_type: 'On-site',
            job_type: 'Full-time',
            primary_skills: 'Recruitment, Communication',
            experience_required: '3-6 years',
            min_salary: 55000,
            max_salary: 75000,
            department: 'Human Resources',
            job_start_date: '2025-05-01',
            job_end_date: '2025-12-31',
            job_hiring_goal: 4,
            job_function: 'HR',
            seniority: 'Mid-level',
            category: 'HR',
            group: 'Recruitment',
            create_date: '2024-11-30',
            edit_date: '2025-01-09',
            created_by: 'HR Manager'
        },
        {
            job_id: 'J006',
            job_title: 'Marketing Manager',
            job_status: 'Open',
            openings: 2,
            hiring_manager: 'Sara Green',
            company: 'MarketPlus',
            job_location: 'Boston, USA',
            workplace_type: 'Hybrid',
            job_type: 'Full-time',
            primary_skills: 'SEO, Digital Marketing',
            experience_required: '4-6 years',
            min_salary: 70000,
            max_salary: 90000,
            department: 'Marketing',
            job_start_date: '2025-06-01',
            job_end_date: '2025-12-31',
            job_hiring_goal: 3,
            job_function: 'Marketing',
            seniority: 'Mid-level',
            category: 'Marketing',
            group: 'Brand Strategy',
            create_date: '2024-12-10',
            edit_date: '2025-01-08',
            created_by: 'Marketing Head'
        },
        {
            job_id: 'J007',
            job_title: 'Cybersecurity Analyst',
            job_status: 'Open',
            openings: 3,
            hiring_manager: 'Tom Watson',
            company: 'SecureTech',
            job_location: 'Austin, USA',
            workplace_type: 'On-site',
            job_type: 'Contract',
            primary_skills: 'Network Security, Penetration Testing',
            experience_required: '3-5 years',
            min_salary: 80000,
            max_salary: 100000,
            department: 'IT Security',
            job_start_date: '2025-03-15',
            job_end_date: '2025-09-30',
            job_hiring_goal: 5,
            job_function: 'Security',
            seniority: 'Mid-level',
            category: 'IT Security',
            group: 'Cyber Defense',
            create_date: '2024-12-20',
            edit_date: '2025-01-09',
            created_by: 'Security Lead'
        },
        {
            job_id: 'J008',
            job_title: 'Content Writer',
            job_status: 'Closed',
            openings: 1,
            hiring_manager: 'Liam Taylor',
            company: 'ContentWorks',
            job_location: 'Remote',
            workplace_type: 'Remote',
            job_type: 'Part-time',
            primary_skills: 'Copywriting, Blogging',
            experience_required: '2-4 years',
            min_salary: 40000,
            max_salary: 55000,
            department: 'Content',
            job_start_date: '2025-01-15',
            job_end_date: '2025-06-30',
            job_hiring_goal: 2,
            job_function: 'Writing',
            seniority: 'Junior-level',
            category: 'Content',
            group: 'Editorial',
            create_date: '2024-11-25',
            edit_date: '2025-01-07',
            created_by: 'Editor-in-Chief'
        },
        {
            job_id: 'J009',
            job_title: 'UI/UX Designer',
            job_status: 'Open',
            openings: 2,
            hiring_manager: 'Nina Roberts',
            company: 'DesignIt',
            job_location: 'San Diego, USA',
            workplace_type: 'Hybrid',
            job_type: 'Full-time',
            primary_skills: 'Figma, Sketch, Prototyping',
            experience_required: '3-5 years',
            min_salary: 65000,
            max_salary: 85000,
            department: 'Design',
            job_start_date: '2025-04-01',
            job_end_date: '2025-12-31',
            job_hiring_goal: 3,
            job_function: 'Design',
            seniority: 'Mid-level',
            category: 'Creative',
            group: 'UI/UX Team',
            create_date: '2024-12-05',
            edit_date: '2025-01-04',
            created_by: 'Design Lead'
        },
        {
            job_id: 'J010',
            job_title: 'Operations Coordinator',
            job_status: 'On Hold',
            openings: 1,
            hiring_manager: 'Oliver King',
            company: 'OpsManage',
            job_location: 'Miami, USA',
            workplace_type: 'On-site',
            job_type: 'Full-time',
            primary_skills: 'Organization, Communication',
            experience_required: '3-6 years',
            min_salary: 50000,
            max_salary: 70000,
            department: 'Operations',
            job_start_date: '2025-05-01',
            job_end_date: '2025-11-30',
            job_hiring_goal: 4,
            job_function: 'Coordination',
            seniority: 'Mid-level',
            category: 'Operations',
            group: 'Logistics',
            create_date: '2024-12-01',
            edit_date: '2025-01-05',
            created_by: 'Operations Head'
        },
        {
            "job_id": "J011",
            "job_title": "Logistics Manager",
            "job_status": "Active",
            "openings": 2,
            "hiring_manager": "Sophia Martinez",
            "company": "LogiCorp",
            "job_location": "Chicago, USA",
            "workplace_type": "Hybrid",
            "job_type": "Full-time",
            "primary_skills": "Supply Chain Management, Leadership",
            "experience_required": "5-8 years",
            "min_salary": 60000,
            "max_salary": 85000,
            "department": "Logistics",
            "job_start_date": "2025-06-15",
            "job_end_date": "2025-12-31",
            "job_hiring_goal": 3,
            "job_function": "Management",
            "seniority": "Senior",
            "category": "Logistics",
            "group": "Supply Chain",
            "create_date": "2024-11-15",
            "edit_date": "2025-02-10",
            "created_by": "Logistics Director"
        }
    ]);


    const [selectedJobsData, setSelectedJobsData] = useState([]);

    const jobsdt = useRef(null)

    const jobsexportCSV = (selectionOnly) => {
        jobsdt.current.exportCSV({ selectionOnly });
    };

    // jobs table ends


    // contacts table starts
    const [contactsfilters, setcontactsFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        mobile: { value: null, matchMode: FilterMatchMode.CONTAINS },
        department: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [contactData, setContactData] = useState([
        {
            firstName: 'John',
            lastName: 'Doe',
            company: 'TechCorp',
            jobTitle: 'Software Engineer',
            email: 'john.doe@techcorp.com',
            mobile: '123-456-7890',
            associatedContacts: 5,
            department: 'Engineering',
            address: '123 Main St, New York, USA',
            notes: 'Potential client for project X.',
            category: 'Client',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'JD001',
            lastActivityDate: '2025-01-05',
            createDate: '2024-12-15',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            company: 'BizWorld',
            jobTitle: 'Marketing Manager',
            email: 'jane.smith@bizworld.com',
            mobile: '987-654-3210',
            associatedContacts: 3,
            department: 'Marketing',
            address: '456 Oak St, Chicago, USA',
            notes: 'Interested in joint marketing campaigns.',
            category: 'Partner',
            group: 'Medium Priority',
            createdBy: 'Admin',
            userId: 'JS002',
            lastActivityDate: '2025-01-03',
            createDate: '2024-11-20',
            editDate: '2025-01-09',
        },
        {
            firstName: 'Michael',
            lastName: 'Brown',
            company: 'FinancePro',
            jobTitle: 'Accountant',
            email: 'michael.brown@financepro.com',
            mobile: '555-789-1234',
            associatedContacts: 2,
            department: 'Finance',
            address: '789 Pine St, San Francisco, USA',
            notes: 'Handling tax consultations.',
            category: 'Vendor',
            group: 'Low Priority',
            createdBy: 'Admin',
            userId: 'MB003',
            lastActivityDate: '2025-01-07',
            createDate: '2024-10-10',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Emily',
            lastName: 'White',
            company: 'HealthCo',
            jobTitle: 'HR Manager',
            email: 'emily.white@healthco.com',
            mobile: '444-555-6666',
            associatedContacts: 4,
            department: 'Human Resources',
            address: '101 Maple Ave, Boston, USA',
            notes: 'Looking for recruitment solutions.',
            category: 'Client',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'EW004',
            lastActivityDate: '2025-01-08',
            createDate: '2024-12-01',
            editDate: '2025-01-09',
        },
        {
            firstName: 'David',
            lastName: 'Taylor',
            company: 'Innovatech',
            jobTitle: 'CTO',
            email: 'david.taylor@innovatech.com',
            mobile: '333-222-1111',
            associatedContacts: 6,
            department: 'Technology',
            address: '202 Birch St, Seattle, USA',
            notes: 'Exploring partnership for AI projects.',
            category: 'Partner',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'DT005',
            lastActivityDate: '2025-01-04',
            createDate: '2024-09-15',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Sophia',
            lastName: 'Green',
            company: 'EcoWorks',
            jobTitle: 'Project Manager',
            email: 'sophia.green@ecoworks.com',
            mobile: '123-987-6543',
            associatedContacts: 4,
            department: 'Sustainability',
            address: '303 Cedar Rd, Denver, USA',
            notes: 'Discussing renewable energy initiatives.',
            category: 'Client',
            group: 'Medium Priority',
            createdBy: 'Admin',
            userId: 'SG006',
            lastActivityDate: '2025-01-06',
            createDate: '2024-12-10',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Chris',
            lastName: 'Wilson',
            company: 'DevNet',
            jobTitle: 'Software Developer',
            email: 'chris.wilson@devnet.com',
            mobile: '321-654-9870',
            associatedContacts: 2,
            department: 'Development',
            address: '404 Spruce Dr, Austin, USA',
            notes: 'Involved in API development.',
            category: 'Client',
            group: 'Low Priority',
            createdBy: 'Admin',
            userId: 'CW007',
            lastActivityDate: '2025-01-09',
            createDate: '2024-11-25',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Olivia',
            lastName: 'Johnson',
            company: 'MediCare',
            jobTitle: 'Operations Manager',
            email: 'olivia.johnson@medicare.com',
            mobile: '888-777-9999',
            associatedContacts: 3,
            department: 'Operations',
            address: '505 Elm St, Houston, USA',
            notes: 'Needs assistance with logistics.',
            category: 'Vendor',
            group: 'Medium Priority',
            createdBy: 'Admin',
            userId: 'OJ008',
            lastActivityDate: '2025-01-02',
            createDate: '2024-12-05',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Liam',
            lastName: 'Martinez',
            company: 'BuildTech',
            jobTitle: 'Architect',
            email: 'liam.martinez@buildtech.com',
            mobile: '666-555-4444',
            associatedContacts: 1,
            department: 'Architecture',
            address: '606 Walnut St, San Diego, USA',
            notes: 'Discussing design collaboration.',
            category: 'Partner',
            group: 'High Priority',
            createdBy: 'Admin',
            userId: 'LM009',
            lastActivityDate: '2025-01-05',
            createDate: '2024-10-20',
            editDate: '2025-01-09',
        },
        {
            firstName: 'Ava',
            lastName: 'Lopez',
            company: 'FoodWorld',
            jobTitle: 'Chef',
            email: 'ava.lopez@foodworld.com',
            mobile: '777-888-9999',
            associatedContacts: 2,
            department: 'Culinary',
            address: '707 Cherry Ln, Miami, USA',
            notes: 'Planning catering for the event.',
            category: 'Vendor',
            group: 'Low Priority',
            createdBy: 'Admin',
            userId: 'AL010',
            lastActivityDate: '2025-01-07',
            createDate: '2024-11-10',
            editDate: '2025-01-08',
        },
        {
            firstName: 'Ethan',
            lastName: 'Martinez',
            company: 'TechSphere',
            jobTitle: 'IT Consultant',
            email: 'ethan.martinez@techsphere.com',
            mobile: '666-555-4444',
            associatedContacts: 4,
            department: 'IT Solutions',
            address: '901 Oak St, Austin, USA',
            notes: 'Assisting with cloud migration strategy.',
            category: 'Vendor',
            group: 'High Priority',
            createdBy: 'Manager',
            userId: 'EM021',
            lastActivityDate: '2025-01-15',
            createDate: '2024-10-05',
            editDate: '2025-01-10',
        }
        // Add more sample data as needed
    ]);

    const [selectedContacts, setSelectedContacts] = useState([]);

    const contactsdt = useRef(null)

    const contactexportCSV = (selectionOnly) => {
        contactsdt.current.exportCSV({ selectionOnly });
    };

    // contacts table ends



    return (
        <React.Fragment>
            <div>
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Tooltip target=".addbtn" content="Add" position="right" style={{ marginBottom: "5px" }} />

                            <div className="addbtn">
                                <CascadeSelect
                                    // value={selectedActEmail}
                                    onChange={handleSelectChange}
                                    options={menuAddOptions}
                                    optionLabel="name"
                                    optionGroupLabel="name"
                                    optionGroupChildren={['subItems']}
                                    className="addcus-cassel"
                                    dropdownIcon={<PlusIcon onClick={handlePlusIconClick} className="custom-plus-icon" />}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* jobs sidebar starts */}
            <Sidebar visible={visibleRight} position="right" className="sidebar" onHide={() => setVisibleRight(false)}>
                <div className="sidebar-header">

                    <h3>Create a Job</h3>
                    <div className="d-flex align-items-center">
                        <Link to="/jobs-editform">
                            <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
                        </Link>
                        <Button
                            icon="pi pi-times"
                            className="p-button-text close-btn"
                            onClick={() => setVisibleRight(false)}
                        />
                    </div>

                </div>
                <div className="card sidebardetails">

                    <form>

                        <Row className="mb-0">
                            <Col lg={6}>
                                <div className="field">
                                    <label htmlFor="jobId">Job ID</label>
                                    <InputText
                                        id="jobId"

                                        placeholder="Job-101"
                                        className="w-full"
                                    />
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobTitle" className="p-d-block">Job Title</label>
                                    <InputText
                                        id="jobTitle"
                                        placeholder="Web Developer"
                                        className="p-d-block"
                                        onKeyUp={() => { trigger("jobtitle") }}
                                    />
                                </div>
                            </Col>

                        </Row>


                        <Row className="mb-2">

                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Company</label>
                                    <Dropdown
                                        value={selectedCompany}
                                        onChange={(e) => setSelectedCompany(e.value)}
                                        options={companyOptions}
                                        optionLabel="name"
                                        placeholder="Varun Digital Media"
                                        filter
                                        className="w-full bgclr"
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="hiringManager">Hiring Manager</label>
                                    <Dropdown
                                        value={selectedPerson}
                                        options={personOptions}
                                        onChange={(e) => setSelectedPerson(e.value)}
                                        optionLabel={(option) => `${option.name}, ${option.role}`}
                                        placeholder="Mahesh Kumar Bhoga"
                                        className="bgclr"
                                    />
                                </div>
                            </Col>

                        </Row>


                        <Row className="mb-2">
                            <Col lg={6}>
                                <label htmlFor="experience">Experience in Years</label>
                                <InputNumber inputId="experience" value={experience} onValueChange={(e) => setExperience(e.value)}
                                    minFractionDigits={1} maxFractionDigits={100} step={0.1}
                                    className="w-full activejobdrop"
                                    placeholder="3 Years" />
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobLocation">Job Location</label>
                                    <Dropdown
                                        id="jobLocation"
                                        value={jobLocation}
                                        onChange={(e) => setJobLocation(e.value)}
                                        options={jobLocations}
                                        optionLabel="name"
                                        // filter
                                        filterPlaceholder="Search Location"
                                        className="w-full activejobdrop"
                                        placeholder="Hyderabad"
                                    />
                                </div>
                            </Col>

                        </Row>


                        <Row className="mb-2">
                            <Col lg={6}>
                                <label htmlFor="jobStartDate" className="p-mb-2">Job Start Date</label>
                                <Calendar
                                    id="jobStartDate"
                                    value={jobStartDate}
                                    onChange={(e) => setJobStartDate(e.value)}
                                    dateFormat="dd/mm/yy"
                                    placeholder="20/02/2025"
                                    className="w-full activejobdrop"
                                    showIcon
                                />
                            </Col>
                            <Col lg={6}>
                                <label htmlFor="jobEndDate" className="mr-2">Job End Date</label>
                                <Calendar
                                    id="jobEndDate"
                                    value={jobEndDate}
                                    onChange={(e) => setJobEndDate(e.value)}
                                    dateFormat="dd/mm/yy"
                                    placeholder="26/02/2025"
                                    className="w-full activejobdrop"
                                    showIcon
                                />
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <label htmlFor="jobEndDate" className="mr-2">Primary Skills</label>
                            <Select
                                id="primarySkills"
                                name="primarySkills"
                                isMulti
                                options={skillsOptions}
                                value={skillsOptions.filter(option => selectedPrimarySkills.includes(option.value))}
                                onChange={handlePrimarySkillsChange}
                                placeholder="Html, CSS, Javascript"
                            />

                        </Row>

                        <Row className="mb-2">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="hiringManager">Workplace Type</label>
                                    <select
                                        className='form-select profileDetailsInput w-full' id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                                        aria-label='Default select example'

                                    >
                                        <option value=''>Work From Office (WFO)</option>
                                        <option value='Office'>Work From Office (WFO)</option>
                                        <option value='Remote'>Work From Home (WFH)</option>
                                        <option value='Hybrid'>Work From Remote (WFR)</option>
                                    </select>
                                </div>
                            </Col>

                            <Col lg={6}>

                                <div className="p-field">
                                    <label htmlFor="jobType">UserIDs</label>
                                    <InputText
                                        id="userIds"
                                        placeholder="Harish"
                                        className="block w-full"
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobType">Categories</label>
                                    <TreeSelect
                                        value={selectedCategoryKey}
                                        onChange={(e) => setSelectedCategoryKey(e.value)}
                                        options={categories}
                                        filter
                                        className="w-full"
                                        placeholder="Frontend"
                                    ></TreeSelect>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobType">Groups</label>
                                    <TreeSelect
                                        value={selectedGroupKey}
                                        onChange={(e) => setSelectedGroupKey(e.value)}
                                        options={groups}
                                        filter
                                        className="w-full"
                                        placeholder="Html, CSS"
                                    ></TreeSelect>
                                </div>
                            </Col>
                        </Row>


                        <Row className="mb-2 d-flex justify-content-between align-items-end">
                            <Col lg={6}>
                                <div className="">
                                    <label htmlFor="descriptionEditor">Description</label>
                                </div>
                            </Col>
                            <Col lg={6} className="d-flex justify-content-end mt-2">
                                <Button color="primary" className="btn btn-primary aibtn">
                                    <i class="pi pi-star me-1"></i>
                                    Write with AI
                                </Button>
                            </Col>

                        </Row>

                        <Row className="mb-2">
                            <Col lg={12}>
                                <div className="">
                                    <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} headerTemplate={header} style={{ height: '140px' }} />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <Button color="primary" className="btn btn-primary me-2 sidebarbtn float-end mt-2" onClick={() => setVisibleRight(false)}>
                                    Create
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </Sidebar>
            {/* jobs sidebar ends */}

            {/*Candidates Side bar start */}

            <Sidebar
                visible={isCandidatesSidebarVisible}
                position="right"
                onHide={() => setIsCandidatesSidebarVisible(false)}
                className="sidebar"
            >

                <div className="sidebar-header">
                    <h3>Create a Candidate</h3>
                    <div className="d-flex align-items-center">
                        <Link to="/candidate-editform">
                            <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
                        </Link>
                        <Button
                            icon="pi pi-times"
                            className="p-button-text close-btn"
                            onClick={() => setIsCandidatesSidebarVisible(false)}
                        />
                    </div>

                </div>
                <div className="card sidebardetails">
                    <form>
                        <Row className="mb-3">
                            <Col lg={6}>
                                <label className="mb-0">First Name</label>
                                <InputText
                                    placeholder="Lavankumar"
                                />

                            </Col>
                            <Col lg={6}>
                                <label htmlFor="lastName" className="mb-0">Last Name</label>
                                <InputText
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Kalvala"
                                />
                            </Col>

                        </Row>
                        <Row className="mb-3">
                            <Col lg={6}>
                                <label htmlFor="email" className="mb-0">Email</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    placeholder="lava9@infosys.com"
                                />
                            </Col>

                            <Col lg={6}>
                                <label htmlFor="phoneNumber" className="mb-0">Phone Number</label>
                                <InputText
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="9876543211"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg={6}>
                                <label htmlFor="jobTitle" className="mb-0">Job Title</label>
                                <InputText
                                    id="jobTitle"
                                    name="jobTitle"
                                    placeholder="Web Developer"
                                />
                            </Col>
                            <Col lg={6}>
                                <label htmlFor="company" className="mb-0">Company</label>
                                <InputText
                                    id="company"
                                    name="company"
                                    placeholder="Infosys Limited"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg={12}>
                                <label htmlFor="primarySkills" className="mb-0">Primary Skills</label>
                                <Select
                                    id="primarySkills"
                                    name="primarySkills"
                                    isMulti
                                    options={skillsOptions}
                                    value={skillsOptions.filter(option => selectedPrimarySkills.includes(option.value))}
                                    onChange={handlePrimarySkillsChange}
                                    placeholder="Javascript, React"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg={6}>
                                <label htmlFor="city" className="mb-0">City</label>
                                <Dropdown
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.value)}
                                    options={cityOptions}
                                    optionLabel="name"
                                    placeholder="Hyderabad"
                                    filter
                                    className="bgclr"
                                />

                            </Col>

                            <Col lg={6}>
                                <label htmlFor="availabilityDate" className="mb-0 avbdate">Availability Date</label>
                                <input
                                    type="date"
                                    id="availabilityDate"
                                    name="availabilityDate"
                                    className="form-control"
                                    placeholder="02-04-2025"
                                />
                            </Col>
                        </Row>


                        <Row className="mb-3">
                            <Col lg={12}>
                                <label htmlFor="availabilityDate" className="mb-0 avbdate">Resume Attachment</label>

                                <input type='file' accept='image/jpg,image/jpeg,image/png,image/pdf'
                                    className='form-control addEmp_ProfilePhoto'
                                    id="MyPro_UploadedProfilePhoto_Modal_FilesInput"
                                />
                                <small className="text-muted">Eg:  (jpeg,png,pdf,jpg)</small>


                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Categories</label>
                                    <TreeSelect
                                        value={selectedCategoryKey}
                                        onChange={(e) => setSelectedCategoryKey(e.value)}
                                        options={categories}
                                        filter
                                        className="w-full"
                                        placeholder="Frontend"
                                    ></TreeSelect>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="company">Group</label>
                                    <TreeSelect
                                        value={selectedGroupKey}
                                        onChange={(e) => setSelectedGroupKey(e.value)}
                                        options={groups}
                                        filter
                                        className="w-full"
                                        placeholder="React"
                                    ></TreeSelect>
                                </div>
                            </Col>

                        </Row>

                        <Row className="mb-3 align-items-end">
                            <Col lg={6}>
                                <div className="p-field">
                                    <label htmlFor="jobType">UserIDs</label>
                                    <InputText
                                        id="userIds"
                                        // value={userIds}
                                        // onChange={(e) => setUserIds(e.target.value)}
                                        placeholder="Harish"
                                        className="block w-full"
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col lg={6}>
                                        <div className="relocation">
                                            <input
                                                type='checkbox'

                                                className="me-2"
                                                checked
                                            />
                                            <label htmlFor="relocation" className="mb-2">Relocation</label>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <input
                                                type='checkbox'
                                                className="me-2"
                                            />
                                            <label htmlFor="jobType">Private</label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <div className="buttons float-end">
                            <Button type='submit' color="primary" className="btn btn-primary me-2 sidebarbtn" onClick={() => setIsCandidatesSidebarVisible(false)}>
                                Create
                            </Button>
                            <Button
                                color="primary"
                                className="btn btn-primary  outlinebtn"

                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </Sidebar>
            {/*Candidates Side bar end */}

            {/*contacts Side bar start */}
            <Row>
                <Col lg={12}>

                    <Sidebar visible={isContactsSidebarVisible} position="right" className="sidebar" onHide={() => setIsContactsSidebarVisible(false)}>
                        <div className="sidebar-header">

                            <h3>Create a Contact</h3>
                            <div className="d-flex align-items-center">
                                {/* <Link to="/candidate-editform">
                                    <p className="mb-0 text-white"> <i class="fa-regular fa-pen-to-square me-3"></i> </p>
                                </Link> */}
                                <Button
                                    icon="pi pi-times"
                                    className="p-button-text close-btn"
                                    onClick={() => setIsContactsSidebarVisible(false)}
                                />
                            </div>

                        </div>
                        <div className="card sidebardetails">
                            <form>

                                <Row className="mb-3">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="firstName">First Name</label>
                                            <InputText
                                                id="firstName"
                                                placeholder="Mahesh Kumar"

                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="lastName">Last Name</label>
                                            <InputText
                                                id="lastName"

                                                placeholder="Boga"
                                                onKeyUp={() => { trigger("lastname") }}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="email">Email</label>
                                            <InputText
                                                type="email"
                                                placeholder="mahesh9@varundigitalmedia.com"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <InputText
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="jobTitle" className="p-d-block">Job Title</label>
                                            <InputText
                                                placeholder="UI/UX Manager"
                                                className="p-d-block"


                                            />

                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Company</label>
                                            <Dropdown
                                                value={selectedCompany}
                                                onChange={(e) => setSelectedCompany(e.value)}
                                                options={companyOptions}
                                                optionLabel="name"
                                                placeholder="Varun Digital Media"
                                                filter
                                                className="w-full bgclr"
                                            />

                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Department</label>
                                            <Dropdown
                                                value={selectedDepartment}
                                                onChange={(e) => setSelectedDepartment(e.value)}
                                                options={departmentOptions}
                                                optionLabel="name"
                                                placeholder="UI/UX"
                                                filter
                                                className="w-full bgclr"
                                            />
                                        </div>

                                    </Col>

                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Related Person</label>
                                            <Dropdown
                                                value={selectedPerson}
                                                options={personOptions}
                                                onChange={(e) => setSelectedPerson(e.value)}
                                                optionLabel={(option) => `${option.name}, ${option.role}`}
                                                placeholder="Salmanuddin Syed"
                                                className="bgclr"
                                            />
                                        </div>

                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col lg={12}>
                                        <div className="p-field companie-add" style={{ position: "relative" }}>
                                            <label htmlFor="address">Address</label>
                                            <InputTextarea
                                                id="address"
                                                // value={address}
                                                // onChange={(e) => setAddress(e.target.value)}
                                                readOnly
                                                placeholder="White house, Block - III,Begumpet,Hyderabad,Telangana,500016,India"
                                                style={{ paddingRight: "2rem" }} // Optional styling
                                                rows={3} // Specify number of rows
                                                cols={30} // Specify width
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
                                                onClick={() => setIsAddSidebarVisible(true)}
                                            ></i>
                                            <Dialog header="Edit Address" className="address-popup" isAddSidebarVisible={isAddSidebarVisible} onHide={() => { if (!isAddSidebarVisible) return; setIsAddSidebarVisible(false); }}
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
                                                                    placeholder="Enter city details..."
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
                                                                    placeholder="Enter state details..."
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
                                                                    placeholder="Enter country details..."
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor="postalCode">Postal Code</label>
                                                                <InputText
                                                                    id="postalCode"
                                                                    value={postalCode}
                                                                    onChange={(e) => { updateAddress(); setPostalCode(e.target.value) }}
                                                                    placeholder="Enter Postal Code"
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
                                                                    placeholder="Select a Label"
                                                                    className="w-full activejobdrop"
                                                                />
                                                            </Col>
                                                        </Row>


                                                        {/* <Row>
                                                          <Col>
                                                            <Button color="primary" className="btn btn-primary waves-effect waves-light me-2 sidebarbtn">
                                                              <i className="pi pi-check me-1"></i>  Ok
                                                            </Button>
                                                            <Button color="primary" className="btn btn-primary waves-effect waves-light cancelbtn me-2">
                                                              <i className="pi pi-times me-1"></i>
                                                              Cancel
                                                            </Button>
                                                          </Col>
                                                        </Row> */}
                                                    </form>
                                                </div>
                                            </Dialog>
                                        </div>
                                    </Col>

                                </Row>

                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Categories</label>
                                            <TreeSelect
                                                value={selectedCategoryKey}
                                                onChange={(e) => setSelectedCategoryKey(e.value)}
                                                options={categories}
                                                filter
                                                className="w-full"
                                                placeholder="Large Enterprise"
                                            ></TreeSelect>
                                        </div>
                                    </Col >
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Groups</label>
                                            <TreeSelect
                                                value={selectedGroupKey}
                                                onChange={(e) => setSelectedGroupKey(e.value)}
                                                options={groups}
                                                filter
                                                className="w-full"
                                                placeholder="Above 250 Crore"
                                            ></TreeSelect>
                                        </div>
                                    </Col>
                                </Row >

                                <Row className="d-flex align-items-end mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="jobType">UserIDs</label>
                                            <InputText
                                                placeholder="Enter User ID" />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <input
                                                type='checkbox'
                                                className="me-2"
                                            />
                                            <label htmlFor="jobType">Private</label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Button type="submit" color="primary" className="btn btn-primary waves-effect waves-light me-2 sidebarbtn" onClick={() => setIsContactsSidebarVisible(false)}>
                                            Create
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </div>

                    </Sidebar>
                </Col>
            </Row>
            {/*contacts Side bar end */}

            {/*companies Side bar start */}
            <Row>
                <Col lg={12}>
                    <Sidebar
                        visible={isCompaniesSidebarVisible}
                        position="right"
                        className="sidebar"
                        onHide={() => setIsCompaniesSidebarVisible(false)}
                    >
                        <div className="sidebar-header">
                            <h3>Create a Company</h3>
                            <div className="d-flex align-items-center">
                                {/* <Link to="/candidate-editform">
                                    <p className="mb-0 text-white">
                                        {" "}
                                        <i class="fa-regular fa-pen-to-square me-3"></i>{" "}
                                    </p>
                                </Link> */}
                                <Button
                                    icon="pi pi-times"
                                    className="p-button-text close-btn"
                                    onClick={() => setIsCompaniesSidebarVisible(false)}
                                />
                            </div>
                        </div>
                        <div className="card sidebardetails">
                            <form>
                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Company</label>
                                            <InputText aria-label="Default select example" placeholder="Varun Digital Media" />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="website">Website</label>
                                            <InputText
                                                id="website"
                                                // value={website}
                                                // onChange={e => setWebsite(e.target.value)}
                                                placeholder="www.varundigitalmedia.com"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="work-email">Email</label>
                                            <InputText placeholder="info@varundigitalmedia.com" />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <InputText placeholder="9876543210" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={12}>
                                        <div
                                            className="p-field companie-add"
                                            style={{ position: "relative" }}
                                        >
                                            <label htmlFor="address">Address</label>
                                            <InputTextarea
                                                id="address"
                                                value={address}
                                                onChange={e => setAddress(e.target.value)}
                                                placeholder="White house, Block - III,Begumpet,Hyderabad,Telangana,India,500016"
                                                style={{ paddingRight: "2rem" }} // Optional styling
                                                rows={3} // Specify number of rows
                                                cols={30} // Specify width
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
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => setIsAddsSidebarVisible(true)}
                                            ></i>
                                            <Dialog
                                                header="Edit Address"
                                                className="address-popup"
                                                visible={isAddsSidebarVisible}
                                                onHide={() => {
                                                    if (!isAddsSidebarVisible) return
                                                    setIsAddsSidebarVisible(false)
                                                }}
                                                style={{ width: "30vw" }}
                                                breakpoints={{
                                                    "960px": "75vw",
                                                    "641px": "100vw",
                                                }}
                                            >
                                                <div className="card sidebardetails">
                                                    <form>
                                                        <Row className="mb-3">
                                                            <Col lg={6}>
                                                                <div className="p-field">
                                                                    <label htmlFor="street1">
                                                                        Street 1
                                                                    </label>
                                                                    <InputText
                                                                        id="street1"
                                                                        value={street1}
                                                                        onChange={e => {
                                                                            setStreet1(e.target.value)
                                                                            updateAddress()
                                                                        }}
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
                                                                    onChange={e => {
                                                                        setStreet2(e.target.value)
                                                                        updateAddress()
                                                                    }}
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
                                                                    onChange={e => {
                                                                        updateAddress()
                                                                        setSelectedCity(e.value)
                                                                    }}
                                                                    options={addCities}
                                                                    optionLabel="name"
                                                                    filter
                                                                    filterPlaceholder="Search City"
                                                                    className="w-full activejobdrop"
                                                                    placeholder="Enter city details..."
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor="state">State</label>
                                                                <Dropdown
                                                                    id="state"
                                                                    value={selectedState}
                                                                    onChange={e => {
                                                                        updateAddress()
                                                                        setSelectedState(e.value)
                                                                    }}
                                                                    options={addStates}
                                                                    optionLabel="name"
                                                                    filter
                                                                    filterPlaceholder="Search State"
                                                                    className="w-full activejobdrop"
                                                                    placeholder="Enter state details..."
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-3">
                                                            <Col lg={6}>
                                                                <label htmlFor="country">Country</label>
                                                                <Dropdown
                                                                    id="country"
                                                                    value={selectedCountry}
                                                                    onChange={e => {
                                                                        updateAddress()
                                                                        setSelectedCountry(e.value)
                                                                    }}
                                                                    options={addCountries}
                                                                    optionLabel="name"
                                                                    filter
                                                                    filterPlaceholder="Search Country"
                                                                    className="w-full activejobdrop"
                                                                    placeholder="Enter country details..."
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor="postalCode">
                                                                    Postal Code
                                                                </label>
                                                                <InputText
                                                                    id="postalCode"
                                                                    value={postalCode}
                                                                    onChange={e => {
                                                                        updateAddress()
                                                                        setPostalCode(e.target.value)
                                                                    }}
                                                                    placeholder="Enter Postal Code"
                                                                    className="w-full activejobdrop"
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-3">
                                                            <Col lg={12}>
                                                                <label htmlFor="postalCode">Label</label>
                                                                <Dropdown
                                                                    value={selectedLabel}
                                                                    onChange={e => {
                                                                        updateAddress()
                                                                        setSelectedLabel(e.value)
                                                                    }}
                                                                    options={labels}
                                                                    optionLabel="name"
                                                                    placeholder="Select a Label"
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

                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="yearFounded">Year Founded</label>
                                            <Calendar
                                                id="year"
                                                value={year}
                                                onChange={e => setYear(e.value)}
                                                view="year"
                                                dateFormat="yy"
                                                yearRange="2000:2030"
                                                placeholder="2010"
                                                className="w-full"
                                                showIcon
                                            />

                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label>Specialties</label>
                                            <InputText
                                                placeholder="Digital marekting services"
                                                className="w-full activejobdrop"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="industry">Industry</label>
                                            <Dropdown
                                                id="industry"
                                                value={industry}
                                                onChange={e => setIndustry(e.value)}
                                                options={industries}
                                                optionLabel="name"
                                                filter
                                                filterPlaceholder="Search Industry"
                                                className="w-full activejobdrop"
                                                placeholder="Technology"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="companySize">Company Size</label>
                                            <Dropdown
                                                id="companySize"
                                                value={companySize}
                                                onChange={e => setCompanySize(e.value)}
                                                options={companySizes}
                                                optionLabel="name"
                                                filter
                                                filterPlaceholder="Search Company Size"
                                                className="w-full activejobdrop"
                                                placeholder="100 employees"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={12}>
                                        <div className="">
                                            <label htmlFor="jobType">Overview</label>
                                            <InputTextarea
                                                autoResize
                                                rows={5}
                                                cols={40}
                                                placeholder="Varun Digital Media is a digital marketing agency specializing in SEO, social media marketing, and website development. They help businesses enhance their online presence and drive growth across various industries."
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Categories</label>
                                            <TreeSelect
                                                value={selectedCategoryKey}
                                                onChange={(e) => setSelectedCategoryKey(e.value)}
                                                options={categories}
                                                filter
                                                className="w-full"
                                                placeholder="Large Enterprise"
                                            ></TreeSelect>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="company">Group</label>
                                            <TreeSelect
                                                value={selectedGroupKey}
                                                onChange={(e) => setSelectedGroupKey(e.value)}
                                                options={groups}
                                                filter
                                                className="w-full"
                                                placeholder="Above 250 Crore"
                                            ></TreeSelect>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="align-items-end mb-2">
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <label htmlFor="jobType">UserIDs</label>
                                            <InputText placeholder="Harish" />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-field">
                                            <input type="checkbox" className="me-2" checked />
                                            <label htmlFor="jobType">Private</label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12}>
                                        <Button
                                            color="primary"
                                            className="btn btn-primary waves-effect waves-light me-2 sidebarbtn float-end"
                                            onClick={() => setIsCompaniesSidebarVisible(false)}
                                        >
                                            Create
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Sidebar>
                </Col>
            </Row>
            {/*companies Side bar end */}


            {/* candidates table starts */}
            <div className="d-none">
                <DataTable
                    ref={condt}
                    value={candidates}
                    filters={candidatefilters}
                    filterDisplay="row"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    globalFilterFields={['candidateId', 'firstName', 'lastName', 'phone', 'jobTitle', 'email', 'companyName', 'editDate', 'yearsOfExperience', 'city', 'createDate', 'currentStatus', 'relocationStatus', 'category', 'group', 'availabilityDate', 'primarySkills', 'createdBy', 'resume']}
                    emptyMessage="No candidates found."
                    dataKey="candidateId"
                >
                    <Column field="Firstname" sortable header="First Name" filter filterPlaceholder="Search by first name" />
                    <Column field="Lastname" sortable header="Last Name" filter filterPlaceholder="Search by last name" />
                    <Column field="JobTitle" sortable header="Job Title" filter filterPlaceholder="Search by job title" />
                    <Column field="Email" sortable header="Email" filter filterPlaceholder="Search by email" />
                    <Column field="MobilePhone" sortable header="Mobile Phone" filter filterPlaceholder="Search by mobile" />
                    <Column field="Company" sortable header="Company" filter filterPlaceholder="Search by company" />
                    <Column field="Yearsofexperience" sortable header="Years of Experience" filter filterPlaceholder="Search by experience" />
                    <Column field="City" sortable header="City" filter filterPlaceholder="Search by city" />
                    <Column field="Status" sortable header="Status" filter filterPlaceholder="Search by status" />
                    <Column field="Relocation" sortable header="Relocation" filter filterPlaceholder="Search by relocation" />
                    <Column field="Categories" sortable header="Categories" filter filterPlaceholder="Search by category" />
                    <Column field="Groups" sortable header="Groups" filter filterPlaceholder="Search by group" />
                    <Column field="PrimarySkills" sortable header="Primary Skills" filter filterPlaceholder="Search by skills" />
                    <Column field="CreateDate" sortable header="Create Date" filter filterPlaceholder="Search by creation date" />
                    <Column field="EditDate" sortable header="Edit Date" filter filterPlaceholder="Search by edit date" />
                    <Column field="CreatedBy" sortable header="Created By" filter filterPlaceholder="Search by creator" />
                    <Column field="AvailabilityDate" sortable header="Availability Date" filter filterPlaceholder="Search by availability" />
                    <Column field="ResumeAttachment" sortable header="Resume Attachment" filter filterPlaceholder="Search by resume" />
                </DataTable>
            </div>
            {/* candidates table ends */}

            {/* jobs table starts */}

            <section className="allactjobs-table d-none">
                <div className="card1 mt-4 mb-4 actjobsumtable">
                    <DataTable
                        ref={jobsdt}
                        value={jobsData}
                        rows={pageState.rows}
                        first={pageState.first}
                        onPage={onPage}
                        dataKey="job_id"
                        loading={loading}
                        scrollable
                        emptyMessage="No records found."
                        selection={selectedJobsData}
                        onSelectionChange={(e) => setSelectedJobsData(e.value)}
                        selectionMode="multiple"
                        filters={jobsfilters}
                        filterDisplay="row"
                        reorderableRows
                        resizableColumns
                        columnResizeMode="expand"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                        <Column field="job_id" header="Job ID" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="job_title" header="Job Title" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="job_status" header="Job Status" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="openings" header="Openings" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="hiring_manager" header="Hiring Manager" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="company" header="Company" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="job_location" header="Location" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="workplace_type" header="Workplace Type" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="job_type" header="Job Type" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="primary_skills" header="Primary Skills" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="experience_required" header="Experience Required" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="min_salary" header="Min Salary" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="max_salary" header="Max Salary" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="department" header="Department" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="job_start_date" header="Start Date" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="job_end_date" header="End Date" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="job_hiring_goal" header="Hiring Goal" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="job_function" header="Function" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="seniority" header="Seniority" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="category" header="Category" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="group" header="Group" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="create_date" header="Create Date" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="edit_date" header="Edit Date" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="created_by" header="Created By" sortable filter style={{ minWidth: '10rem' }} />
                    </DataTable>
                </div>
            </section>

            {/* jobs table ends */}

            {/* companies datatable starts */}
            <section className="allactjobs-table d-none">
                <div className="card1 mt-4 mb-4 actjobsumtable">
                    <DataTable
                        ref={comdt}
                        value={companyData}
                        rows={pageState.rows}
                        first={pageState.first}
                        onPage={onPage}
                        loading={loading}
                        // selection={selectedCompanyData}
                        onSelectionChange={e => setSelectedCompanyData(e.value)}
                        selectionMode="multiple"
                        filters={filters}
                        filterDisplay="row"
                        scrollable
                        selection={selectedCompanyData}
                        resizableColumns
                    >
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                        />
                        <Column
                            field="company"
                            header="Company"
                            sortable
                            filter
                        />
                        <Column
                            field="website"
                            header="Website"
                            sortable
                            filter
                        />
                        <Column
                            field="industry"
                            header="Industry"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="companySize"
                            header="Company Size"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="yearFounded"
                            header="Year Founded"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        {/* <Column field="overview" header="Overview" sortable filter /> */}
                        <Column
                            field="email"
                            header="Email"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="mobilePhone"
                            header="Mobile Phone"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="address"
                            header="Address"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="notes"
                            header="Notes"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="category"
                            header="Category"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="group"
                            header="Group"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="userIds"
                            header="User IDs"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="createdBy"
                            header="Created By"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="lastActivityDate"
                            header="Last Activity Date"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="createDate"
                            header="Create Date"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="editDate"
                            header="Edit Date"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                        />
                    </DataTable>
                </div>
            </section>
            {/* companies datatable ends */}

            {/* contacts table starts */}
            <section className="allactjobs-table d-none">
                <div className="card1 mt-4 mb-4 actjobsumtable">
                    <DataTable
                        value={contactData}
                        ref={contactsdt}
                        rows={pageState.rows}
                        first={pageState.first}
                        onPage={onPage}
                        dataKey="userId"
                        loading={loading}
                        scrollable
                        emptyMessage="No records found."
                        selection={selectedContacts}
                        onSelectionChange={(e) => setSelectedContacts(e.value)}
                        selectionMode="multiple"
                        filters={contactsfilters}
                        filterDisplay="row"
                        reorderableRows
                        resizableColumns
                        columnResizeMode="expand"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                        <Column field="firstName" header="First Name" frozen sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="lastName" header="Last Name" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="company" header="Company" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="jobTitle" header="Job Title" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="email" header="Email" sortable filter style={{ minWidth: '14rem' }} />
                        <Column field="mobile" header="Mobile Phone" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="associatedContacts" header="Associated Contacts" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="department" header="Department" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="lastActivityDate" header="Last Activity Date" sortable filter style={{ minWidth: '12rem' }} />
                        <Column field="createDate" header="Create Date" sortable filter style={{ minWidth: '10rem' }} />
                        <Column field="editDate" header="Edit Date" sortable filter style={{ minWidth: '10rem' }} />
                    </DataTable>
                </div>
            </section>
            {/* contacts table ends */}

            {/* CreateShortform Modal */}
            <CreateShortform
                visible={showCreateShortform}
                onHide={() => setShowCreateShortform(false)}
            />

            {/* <CreateParseform
                visible={showCreateParseform}
                onHide={() => setShowCreateParseform(false)}
            /> */}

        </React.Fragment>
    );
};

export default AddMenu;