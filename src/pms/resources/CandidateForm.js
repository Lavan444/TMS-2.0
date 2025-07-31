import React, { useState, useEffect, useRef } from "react"
import { Container, Row, Col } from "reactstrap"

import { Link } from "react-router-dom"

import AtsImg from "../../assets/images/ats-logo2.png"

//i18n
import { withTranslation } from "react-i18next"
import { FileUpload } from "primereact/fileupload"
import { TabView, TabPanel } from "primereact/tabview"
import { Dropdown } from "primereact/dropdown"
import { InputText, InputTextarea } from "primereact"
import { Calendar } from "primereact/calendar"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { MultiSelect } from "primereact/multiselect"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { confirmDialog } from "primereact/confirmdialog"
import { ConfirmDialog } from "primereact/confirmdialog"
import { TriStateCheckbox } from "primereact/tristatecheckbox"
import { InputNumber } from "primereact/inputnumber"
import { TreeSelect } from "primereact/treeselect"

import Thankyou from "../../assets/images/thank-you.jpg"

// Small form
import { Card } from "primereact/card"
// import { Button } from 'primereact/button';
import { Divider } from "primereact/divider"
// import { Grid } from 'primereact/grid';

const CandidateForm = () => {
  const [selectedCity, setSelectedCity] = useState(null)
  const cities = [
    { name: "Work From Office", code: "emp1" },
    { name: "Work From Remote", code: "emp2" },
    { name: "Work From Home", code: "emp3" },
    { name: "Freelancer", code: "emp4" },
  ]

  const [selectedStatus, setSelectedStatus] = useState(null)
  const [dateFromTo, setDateFromTo] = useState(null)

  const [fullname, setFullname] = useState(null)
  const [fullNameDialogVisible, setFullNameDialogVisible] = useState(false)
  const [thankyou, setThankyou] = useState(false)

  const [company, setCompany] = useState(null)
  const [jobtitle, setJobtitle] = useState(null)
  const [email, setEmail] = useState(null)
  const [totalExperience, setTotalExperience] = useState(null)
  const [address, setAddress] = useState("")

  const [currentSalary, setCurrentSalary] = useState(null)
  const [expectedSalary, setExpectedSalary] = useState(null)

  // education

  const [educationDetails, setEducationDetails] = useState([])
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    endYear: "",
    endMonth: "",
    grade: "",
  })

  // Add new education details to the table
  const handleAddEducation = () => {
    if (
      newEducation.degree.trim() &&
      newEducation.institution.trim() &&
      newEducation.year.trim() &&
      newEducation.grade.trim()
    ) {
      setEducationDetails([...educationDetails, { ...newEducation }])
      setNewEducation({ degree: "", institution: "", year: "", grade: "" })
      setIsDialogVisible(false)
    } else {
      alert("Please fill all fields.")
    }
  }

  const handleSave1 = () => {
    if (editIndex !== null) {
      // Update existing record
      const updatedExperiences = [...educationDetails]
      updatedExperiences[editIndex] = newEducation
      setEducationDetails(updatedExperiences)
      setEditIndex(null)
    } else {
      // Add new record
      setEducationDetails([...educationDetails, newEducation])
    }
    setNewEducation({
      degree: " ",
      website: " ",
      jobTitle: " ",
      fromDate: null,
      toDate: null,
      description: " ",
    })
    setIsDialogVisible(false)
  }

  const handleSavedocument = () => {
    if (editIndex1 !== null) {
      // Update existing record
      const updatedExperiences = [...documents]
      updatedExperiences[editIndex] = documentvalu
      setDocuments(updatedExperiences)
      setEditIndex1(null)
    } else {
      // Add new record
      setDocuments([...documents, documentvalu])
    }
    setdocumentvalu({
      degree: " ",
      website: " ",
      jobTitle: " ",
      fromDate: null,
      toDate: null,
      description: " ",
    })
    setDisplayDialog(false)
  }

  const [documentvalu, setdocumentvalu] = useState({
    file: "",
    subject: "",
    selectedDocument: "",
  })

  const handleInputChange1 = (key, value) => {
    setdocumentvalu(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const years = Array.from({ length: 50 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return { label: year.toString(), value: year.toString() }
  })

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ]

  // system fields
  const handleUpload = e => {}

  //edit address
  const [visible, setVisible] = useState(false)
  const [street1, setStreet1] = useState("White house")
  const [street2, setStreet2] = useState(" Block-2, Hyderabad")
  // const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [selectedLabel, setSelectedLabel] = useState(null)
  const [selectedLabel1, setSelectedLabel1] = useState(null)

  const addCities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]

  const addStates = [
    { name: "California", code: "CA" },
    { name: "Texas", code: "TX" },
    { name: "Florida", code: "FL" },
    { name: "New York", code: "NY" },
    { name: "Illinois", code: "IL" },
  ]

  const addCountries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Australia", code: "AU" },
  ]

  const labels = [
    { name: "Work from Office", code: "WORK" },
    { name: "Work from Home", code: "HOME" },
    { name: "Work from Remote", code: "REMOTE" },
    { name: "Work from Hybrid", code: "HYBRID" },
  ]

  const [basicimp, setbasicimp] = useState("")
  const [basictittle, setbasictittle] = useState("")
  const [basicfirst, setbasicfirst] = useState("Venkata")
  const [basiclast, setbasiclast] = useState("laxmi")
  const [basicmiddle, setbasicmiddle] = useState("Valle")

  const updateAddress = () => {
    // setAddress(`${street1}  ${street2} ${postalCode}`.trim());
  }
  useEffect(() => {
    const updatedAddress = [
      street1,
      street2,
      postalCode,
      selectedState?.name,
      selectedCity?.name,
      selectedCountry?.name,
      selectedLabel?.name,
      postalCode,
    ].filter(Boolean)
    setAddress(updatedAddress)

    const updatenamesbasic = [basictittle, basicfirst, basicmiddle, basiclast]
      .filter(Boolean)
      .join(" ")
    setbasicimp(updatenamesbasic)
  }, [
    street1,
    street2,
    postalCode,
    selectedState,
    selectedCity,
    selectedCountry,
    selectedLabel,
    postalCode,
    basictittle,
    basicfirst,
    basicmiddle,
    basiclast,
  ])

  //documents popup type
  const [selectedDocument, setSelectedDocument] = useState(null)

  const groupedDocuments = [
    {
      label: "Proof of Identity",
      items: [
        { label: "Aadhaar Card", value: "Aadhaar Card" },
        { label: "Passport", value: "Passport" },
        { label: "Voter ID", value: "Voter ID" },
        { label: "PAN Card", value: "PAN Card" },
        { label: "Driver's License", value: "Driver's License" },
      ],
    },
    {
      label: "Educational Qualification Documents",
      items: [
        {
          label: "10th, 12th Standard Mark Sheets",
          value: "10th, 12th Standard Mark Sheets",
        },
        {
          label: "Degree/Diploma Certificates",
          value: "Degree/Diploma Certificates",
        },
        {
          label: "Consolidated Mark Sheets",
          value: "Consolidated Mark Sheets",
        },
        {
          label: "Professional Certification Documents",
          value: "Professional Certification Documents",
        },
      ],
    },
    {
      label: "Employment-Related Documents",
      items: [
        { label: "Offer Letter", value: "Offer Letter" },
        { label: "Appointment Letter", value: "Appointment Letter" },
        { label: "Resume/Curriculum Vitae", value: "Resume/Curriculum Vitae" },
        {
          label: "Previous Employment Experience Certificates",
          value: "Previous Employment Experience Certificates",
        },
        {
          label: "Relieving Letters from Previous Employers",
          value: "Relieving Letters from Previous Employers",
        },
        { label: "Service Certificate", value: "Service Certificate" },
        { label: "Last Drawn Salary Slip", value: "Last Drawn Salary Slip" },
      ],
    },
    {
      label: "Contact and Address Proof",
      items: [
        { label: "Permanent Address Proof", value: "Permanent Address Proof" },
        {
          label: "Current Residential Address Proof",
          value: "Current Residential Address Proof",
        },
        { label: "Local Address Proof", value: "Local Address Proof" },
        {
          label: "Address Verification Documents",
          value: "Address Verification Documents",
        },
        {
          label: "Contact Information Form",
          value: "Contact Information Form",
        },
      ],
    },
    {
      label: "Financial and Tax-Related Documents",
      items: [
        { label: "PAN Card", value: "PAN Card" },
        { label: "Bank Account Details", value: "Bank Account Details" },
        { label: "Cancelled Cheque", value: "Cancelled Cheque" },
        {
          label: "Form 16 from Previous Employer",
          value: "Form 16 from Previous Employer",
        },
        {
          label: "Tax Identification Documents",
          value: "Tax Identification Documents",
        },
      ],
    },
    {
      label: "Personal and Medical Documents",
      items: [
        {
          label: "Passport-Size Photographs",
          value: "Passport-Size Photographs",
        },
        { label: "Birth Certificate", value: "Birth Certificate" },
        {
          label: "Marriage Certificate (if applicable)",
          value: "Marriage Certificate (if applicable)",
        },
        { label: "Passport Details", value: "Passport Details" },
        {
          label: "Medical Fitness Certificate",
          value: "Medical Fitness Certificate",
        },
        {
          label: "Police Verification Certificate",
          value: "Police Verification Certificate",
        },
      ],
    },
    {
      label: "Legal and Compliance Documents",
      items: [
        {
          label: "Background Verification Consent Form",
          value: "Background Verification Consent Form",
        },
        {
          label: "Non-Disclosure Agreement (NDA)",
          value: "Non-Disclosure Agreement (NDA)",
        },
        {
          label: "Employment Bond (if applicable)",
          value: "Employment Bond (if applicable)",
        },
        {
          label: "Declaration of No Criminal Record",
          value: "Declaration of No Criminal Record",
        },
      ],
    },
    {
      label: "Statutory Documentation",
      items: [
        {
          label: "Employee Provident Fund (EPF) Registration Form",
          value: "Employee Provident Fund (EPF) Registration Form",
        },
        {
          label: "Employee State Insurance (ESI) Form",
          value: "Employee State Insurance (ESI) Form",
        },
        {
          label: "Professional Tax Registration Details",
          value: "Professional Tax Registration Details",
        },
      ],
    },
    {
      label: "Emergency Contact and Nominee Details",
      items: [
        {
          label: "Emergency Contact Information Form",
          value: "Emergency Contact Information Form",
        },
        {
          label: "Nominee Details for Insurance and Other Benefits",
          value: "Nominee Details for Insurance and Other Benefits",
        },
        { label: "Personal References", value: "Personal References" },
      ],
    },
    {
      label: "Additional Specialized Documents (Depending on Role/Industry)",
      items: [
        {
          label: "Professional License Certificates",
          value: "Professional License Certificates",
        },
        {
          label: "Specialized Skill Certification",
          value: "Specialized Skill Certification",
        },
        {
          label: "Work Permit/Visa Documents (for Foreign Nationals)",
          value: "Work Permit/Visa Documents (for Foreign Nationals)",
        },
        {
          label: "Security Clearance Certificates",
          value: "Security Clearance Certificates",
        },
      ],
    },
  ]

  const groupedItemTemplate = option => {
    return (
      <div className="flex align-items-center">
        <i className="pi pi-file mr-2"></i>
        <div>{option.label}</div>
      </div>
    )
  }

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
  ])

  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null)

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
  ])

  const [selectedGroupKey, setSelectedGroupKey] = useState(null)

  const setstatus = [
    { name: "Active", code: "act" },
    { name: "Inactive", code: "inc" },
  ]

  const [primarySkills, setPrimarySkills] = useState(null)
  const primary = [
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "CSS" },
  ]

  const [secondarySkills, setSecondarySkills] = useState(null)
  const secondary = [
    { name: "SQL" },
    { name: "Python" },
    { name: "Java" },
    { name: "PHP" },
  ]

  const [otherSkills, setOtherSkills] = useState([])
  const other = [
    { name: "Git" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "AWS" },
  ]

  // Templates for Dropdown items
  const skillOptionTemplate = option => {
    return <div>{option.name}</div>
  }

  const customBase64Uploader = async event => {
    // convert file to base64 encoded
    const file = event.files[0]
    const reader = new FileReader()
    let blob = await fetch(file.objectURL).then(r => r.blob()) //blob:url

    reader.readAsDataURL(blob)

    reader.onloadend = function () {
      const base64data = reader.result
    }
  }

  const [dateAvalibility, setDateAvalibility] = useState(null)
  const [dob, setDob] = useState(null)

  const [EmployeeRec, setEmployeeRec] = useState("  ")

  //  work experience variables start

  const [workExperiences, setWorkExperiences] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [showworkexpDialog, setShowworkexpDialog] = useState(false)
  const [formValues, setFormValues] = useState({
    company: "",
    website: "",
    jobTitle: "",
    fromDate: null,
    toDate: null,
    description: "",
  })
  const [editIndex1, setEditIndex1] = useState(null)
  const [editIndex, setEditIndex] = useState(null)

  // Form Handlers
  const handleInputChange = (key, value) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    if (editIndex !== null) {
      // Update existing record
      const updatedExperiences = [...workExperiences]
      updatedExperiences[editIndex] = formValues
      setWorkExperiences(updatedExperiences)
      setEditIndex(null)
    } else {
      // Add new record
      setWorkExperiences([...workExperiences, formValues])
    }
    setFormValues({
      company: "",
      website: "",
      jobTitle: "",
      fromDate: null,
      toDate: null,
      description: "",
    })
    setShowworkexpDialog(false)
  }

  const handleEdit = (rowData, index) => {
    setFormValues(rowData)
    setEditIndex(index)
    setShowworkexpDialog(true)
  }

  // Delete Functionality with Confirmation
  const handleDelete = index => {
    confirmDialog({
      message: "Are you sure you want to delete this work experience?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        setWorkExperiences(prev => prev.filter((_, i) => i !== index))
      },
      reject: () => {},
    })
  }

  // Table Action Buttons
  const actionBodyTemplate = (rowData, column) => {
    const index = column.rowIndex
    return (
      <div className="d-flex">
        <Button
          className="trashbtn mr-1"
          onClick={() => handleEdit(rowData, index)}
        >
          <i className="pi pi-pencil"></i>
        </Button>
        <Button className="trashbtn p-0" onClick={() => handleDelete(index)}>
          <i className="pi pi-trash"></i>
        </Button>
      </div>
    )
  }

  //  work experience variables end

  // Documents variable start

  const [selectedStatus1, setSelectedStatus1] = useState(null) // Renamed to setSelectedStatus1
  const [subject, setSubject] = useState("")
  const [file, setFile] = useState(null)
  const [documents, setDocuments] = useState([])
  const [displayDialog, setDisplayDialog] = useState(false) // Modal visibility state

  // Sample status options (Renamed to setstatus1)
  const setstatus1 = [
    { name: "Draft", code: "draft" },
    { name: "Final", code: "final" },
    { name: "Archived", code: "archived" },
  ]

  // Custom uploader function (Renamed to customBase64Uploader2)
  const customBase64Uploader2 = event => {
    setFile(event.files[0])
  }

  // Handle Add Document
  const handleAddDocument = () => {
    if (selectedStatus1 && subject && file) {
      const newDocument = { type: selectedStatus1.name, subject, file }
      setDocuments([...documents, newDocument])
      alert("Document added successfully!")
      setDisplayDialog(false) // Close the modal after adding the document
    } else {
      alert("Please fill all the fields.")
    }
  }

  // Open the modal to add a new document
  const openAddDocumentDialog = () => {
    setDisplayDialog(true)
  }

  // Close the modal
  const closeAddDocumentDialog = () => {
    setDisplayDialog(false)
  }

  // Documents variable end

  // const navigate = useNavigate();

  const handleSaveClick = () => {
    // Perform any additional logic if needed
    // console.log('Save button clicked');

    // Navigate to another page
    setMerge(true)
  }
  const [pathSegment, setPathSegment] = useState(null)
  useEffect(() => {
    const url = new URL(window.location.href) // Get the current URL
    const pathParts = url.pathname.split("/") // Split the pathname into parts
    const lastSegment = pathParts[pathParts.length - 1] // Get the last part of the path

    setPathSegment(lastSegment) // Set the last segment to state
  }, [])

  const [merge, setMerge] = useState(false)
  const footerContent = (
    <div className="d-flex justify-content-center">
      <button
        type="button"
        onClick={() => {
          navigate("/allactive-candidates")
        }}
        class="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          navigate("/allactive-candidates")
        }}
        class="btn btn-primary waves-effect waves-light outlinebtn btn btn-primary me-2"
      >
        No
      </button>
    </div>
  )

  const {
    register,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
  } = useForm()

  const [linkdinval, setlinkdinval] = useState(null)
  const [facebook, setfacebook] = useState(null)
  const [twitter, settwitter] = useState(null)
  const [Indeed, setIndeed] = useState(null)
  const [HaveImagePan, setHaveImagePan] = useState(false)
  const [HaveImagePan2, setHaveImagePan2] = useState(true)
  const [imageNamepan, setImageNamepan] = useState("")
  const [PoliciesfilesErrorMessagepan, setPoliciesfilesErrorMessagepan] =
    useState()

  const onEmppanphoto = data => {
    const updatedImageValueapan = data.target.files[0].name
    const name = data.target.files[0].name
    const lastDot = name.lastIndexOf(".")
    const ext = name.substring(lastDot + 1)
    setHaveImagePan2(false)
    if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "pdf") {
    } else {
      setValue("panphoto", null)
      setHaveImagePan(false)
      setPoliciesfilesErrorMessagepan("Please select valid file")
      return false
    }

    if (data.target.files[0].size > 2e6) {
      setValue("adharphoto", null)
      setHaveImagePan(false)
      setPoliciesfilesErrorMessagepan("Please select lower 2mb file")
      return false
    }

    if (data.target.files.length === 1) {
      setPoliciesfilesErrorMessagepan("")
      setHaveImagePan(true)
      setImageNamepan(updatedImageValueapan)
    } else {
      setPoliciesfilesErrorMessagepan("This field is required")
      setHaveImagePan(false)
      setImageNamepan("")
      setImageNamepan("")
    }
  }
  const removeFileFromHerepan = () => {
    setValue("panphoto", "")
    setHaveImagePan(false)
  }

  const getcategoriesitem = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/${pathSegment}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        let results = response.data
        setValue("firstname", results.first_name)
        setValue("lastname", results.last_name)
        setValue("jobtitle", results.job_title)
        setValue("personal_email", results.email)
        setValue("Email2", results.email_2)
        setValue("phone", results.mobile_phone)

        setValue("Company", results.country)

        console.log(results)
      }
    } catch (error) {}
  }

  const onSubmit = async data => {
    const formData = new FormData()

    if (basicfirst) {
      formData.append("first_name", basicfirst)
    }

    if (basiclast) {
      formData.append("last_name", basiclast)
    }
    if (basictittle) {
      formData.append("title", basictittle)
    }
    if (basicmiddle) {
      formData.append("middle_name", basicmiddle)
    }
    if (data.JobTitle) {
      formData.append("job_title", data.JobTitle)
    }
    if (data.personal_email) {
      formData.append("email", data.personal_email)
    }
    if (data.Email2) {
      formData.append("email_2", data.Email2)
    }
    if (data.phone) {
      formData.append("mobile_phone", data.phone)
    }
    if (data.Company) {
      formData.append("current_company", data.Company)
    }

    // Serialize skills array into JSON
    // formData.append("primary_skills", JSON.stringify(selectedSkills));

    if (data.relocation) {
      formData.append("relocation", data.relocation ? "true" : "false")
    }
    if (data.EmployeeType) {
      formData.append("EmployeeType", data.EmployeeType)
    }

    if (expectedSalary) {
      formData.append("expectedSalary", expectedSalary)
    }
    if (currentSalary) {
      formData.append("currentSalary", currentSalary)
    }
    if (totalExperience) {
      formData.append("total_experience", totalExperience)
    }
    if (street1) {
      formData.append("street_address", street1)
    }
    if (street2) {
      formData.append("street_address_line_2", street2)
    }
    if (selectedState) {
      formData.append("state", selectedState.name)
    }
    if (selectedCity) {
      formData.append("city", selectedCity.name)
    }
    if (selectedCountry) {
      formData.append("country", selectedCountry.name)
    }
    if (postalCode) {
      formData.append("pincode", postalCode)
    }
    if (selectedLabel1) {
      formData.append("address_label", selectedLabel1.name)
    }
    if (dob) {
      formData.append("dob", dob)
    }

    if (otherSkills) {
      formData.append("other_skills", otherSkills)
    }
    if (primarySkills) {
      formData.append("primary_skills", primarySkills)
    }
    if (secondarySkills) {
      formData.append("secondary_skills", secondarySkills)
    }
    if (expectedSalary) {
      formData.append("expected_salary", expectedSalary)
    }
    if (currentSalary) {
      formData.append("current_salary", currentSalary)
    }
    if (linkdinval) {
      formData.append("linkedin_url", linkdinval)
    }
    if (facebook) {
      formData.append("facebook_url", facebook)
    }
    if (twitter) {
      formData.append("x_url", twitter)
    }
    if (Indeed) {
      formData.append("indeed_url", Indeed)
    }

    if (dateAvalibility) {
      formData.append(
        "dateAvalibility",
        moment(dateAvalibility).format("YYYY-MM-DD")
      )
    }
    if (HaveImagePan) {
      formData.append("resume", data.panphoto[0])
    }

    const findSelectedCategory = (categories, key) => {
      for (const category of categories) {
        if (category.key === key) {
          return category.label
        }
        if (category.children) {
          const result = findSelectedCategory(category.children, key)
          if (result) return result
        }
      }
      return null
    }
    const selectedLabel = findSelectedCategory(categories, selectedCategoryKey)
    if (selectedLabel) {
      formData.append("selectedCategoryKey", selectedLabel)
    }
    let work_details = {}
    const subdepatt = Array.isArray(workExperiences)
      ? workExperiences
          .map(item => {
            if (item.haveError) {
              return {
                ...item,
                haveError: true,
              }
            }
            return item
          })
          .filter(
            item =>
              item.company ||
              item.website ||
              item.jobTitle ||
              item.fromDate ||
              item.toDate ||
              item.description
          ) // Remove empty entries
      : []

    // Only add non-empty `subdepatt` to `formData`
    if (subdepatt.length > 0) {
      formData.append("work_details", JSON.stringify(subdepatt))
    }
    const educations = educationDetails?.filter(
      edu =>
        edu.degree ||
        edu.institution ||
        edu.startDate ||
        edu.endDate ||
        edu.description
    )

    if (educations && educations.length > 0) {
      formData.append("educations", JSON.stringify(educations))
    }

    const certificates = documents?.filter(
      cert =>
        cert.name ||
        cert.institution ||
        cert.issueDate ||
        cert.expiryDate ||
        cert.description
    )

    if (certificates && certificates.length > 0) {
      formData.append("certificates", JSON.stringify(certificates))
    }

    // const educationvalues = Array.isArray(educationDetails)
    //   ? educationDetails.map((item) => {
    //     if (item.haveError) {
    //       return {
    //         ...item,
    //         haveError: true,
    //       };
    //     }
    //     return item;
    //   })
    //   : [];
    // formData.append("educations", JSON.stringify(educationvalues));

    // const documentsfiles = Array.isArray(documents)
    //   ? documents.map((item) => {
    //     if (item.haveError) {
    //       return {
    //         ...item,
    //         haveError: true,
    //       };
    //     }
    //     return item;
    //   })
    //   : [];
    // formData.append("certificates", JSON.stringify(documentsfiles));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_CONDIDATES}/api/v1/candidates/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      navigate("/allactive-candidates")
    } catch (error) {
      console.error("Error sending data to API:", error)
    }
  }

  useEffect(() => {
    if (pathSegment) {
      getcategoriesitem()
      // Call the function once the pathSegment is set
    }
  }, [pathSegment])

  const [otherSkillsval, setotherSkillsval] = useState([])
  const [secondarySkillsval, setsecondarySkillsval] = useState([])
  const [primarySkillsvalu, setprimarySkillsvalu] = useState([])

  const getgroupsitem = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CONDIDATES}/api/v1/skills/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data && response.data.results) {
        const treeData = response.data.results
        setotherSkillsval(treeData)
        setsecondarySkillsval(treeData)
        setprimarySkillsvalu(treeData)
      }
    } catch (error) {}
  }
  useEffect(() => {
    getgroupsitem()
  }, [])

  //handle tabs
  const [activeIndex, setActiveIndex] = useState(0) // Track the active tab

  // Function to go to the next tab
  const nextTab = () => {
    if (activeIndex < 6) {
      // Adjust '2' if you have more tabs
      setActiveIndex(activeIndex + 1)
    }
  }

  // Function to go to the previous tab
  const previousTab = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  // State to hold the submitted data
  const [submittedData, setSubmittedData] = useState({})

  // Handle form submissionfrelocationOptions
  const handleSubmit = () => {
    const formData = {
      fullname,
      company,
      jobtitle,
      // status,
      totalExperience,
      // email1,
      // email2,
      // workPhone,
      // mobilePhone,
      address,
      primarySkills,
      secondarySkills,
      otherSkills,
      currentSalary,
      expectedSalary,
      // employeeType,
      // dateofbirth,
      // relocation,
      dateAvalibility,
      // source,
      // referredBy,
      selectedCategoryKey,
      selectedGroupKey,
      company,
      // website,
      // jobTitle,
      // fromDate,
      // toDate,
      // degree,
      // school,
      // grade,
      // year,
      // type,
      // subject,
      // attachment,
    }

    setSubmittedData(formData)
    setShowDialog(true) // Show the dialog
  }

  const handleCloseDialog = () => {
    setShowDialog(false) // Close the dialog
  }

  const [Upload, setUpload] = useState(false)

useEffect(() => {
  if (Upload) {
    setTimeout(() => {
      const element = document.getElementById("candidateDetails");
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 50, // Adjust offset here (e.g., 50px margin)
          behavior: "smooth",
        });
      }
    }, 100); // Small delay for smooth transition
  }
}, [Upload]);


  const handleSelectResume = () => {
    setUpload(true)
  }

  const navigate = useNavigate()

  // const handleThankyouSubmit = () => {

  //   setThankyou(true)

  // }

  const popupHandleSubmit = () => {
    // navigate('/allactive-candidates');
    setUpload(false)
    setShowDialog(false)
    setThankyou(true)
    // handleThankyouSubmit()
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header candidate-form">
          <Container fluid={true}>
            <Row className="align-items-center justify-content-between">
              <Col lg={8}>
                <div className="d-flex">
                  <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-dark">
                      <span className="logo-sm">
                        <img src={AtsImg} height="50" />
                      </span>
                      <span className="logo-lg">
                        <img src={AtsImg} height="50" />
                      </span>
                    </Link>

                    <Link to="/" className="logo logo-light">
                      <span className="logo-sm favicon-logo">
                        <img src={AtsImg} alt="" height="50" />
                      </span>
                      <span className="logo-lg barath-logo">
                        <img src={AtsImg} alt="" height="50" />
                      </span>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="d-flex justify-content-end">
                  <a
                    href="http://38.77.155.161:3000/allactive-jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3"
                  >
                    Home
                  </a>
                  <a
                    href="http://38.77.155.161:3000/allactive-jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Help
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <div className="page-content candidate-form applyjob-form">
        <Container fluid={true}>
          <Row>
            <Col xl={12}>
              <div className="">
                <div className="job-posting-container">
                  <div className="job-posting-card">
                    {/* Header Section */}
                    <div className="job-header">
                      {/* <div className="job-logo">Varun Digital Media</div> */}
                      <div className="job-header-content">
                        {/* <h1 className="company-name">Varun Digital Media</h1> */}
                        <h2 className="job-title">
                          Web Developer,{" "}
                          <span className="job-id">(Job-101)</span>
                        </h2>
                        <div className="job-badges">
                          <div className="job-badge">
                            {/* <DollarIcon /> */}
                            ₹8LPA - ₹12LPA
                          </div>
                          <div className="job-badge">
                            {/* <MapIcon /> */}
                            Hyderabad, Telangana, India
                          </div>
                          <div className="job-badge">
                            {/* <ClockIcon /> */}
                            Full Time
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="divider"></div>

                    {/* Job Title Section */}
                    <div className="job-section">
                      <h3 className="section-title">Job Title</h3>
                      <p className="section-content">
                        "Web Developer at Varun Digital Media, based out of
                        Hyderabad - Onsite Role"
                      </p>
                    </div>

                    {/* Company Details Section */}
                    <div className="job-section">
                      <h3 className="section-title">Company Details</h3>
                      <p className="section-content">
                        Varun Digital Media, based in Wilmington, Delaware, delivers
                        optimized, eco-friendly packaging solutions worldwide.
                        Through its tech-enabled platform, Varun Digital Media connects
                        buyers and markets facilitating procurement and
                        fostering long-term relationships for flexible
                        packaging, paper bags, and food delivery packaging.
                      </p>
                    </div>

                    {/* Job Roles & Responsibilities Section */}
                    <div className="job-section">
                      <h3 className="section-title">
                        Job Roles & Responsibilities
                      </h3>
                      <ul className="job-list">
                        <li>
                          Develop and maintain web applications using Angular,
                          ensuring seamless functionality and user experience.
                        </li>
                        <li>
                          Collaborate with UX/UI designers to implement
                          responsive and interactive designs.
                        </li>
                        <li>
                          Optimize frontend components for maximum performance
                          and scalability.
                        </li>
                        <li>
                          Troubleshoot and debug application issues to enhance
                          user engagement.
                        </li>
                        <li>
                          Integrate RESTful APIs to facilitate data exchange
                          between frontend and backend systems.
                        </li>
                        <li>
                          Ensure code quality by writing reusable, testable, and
                          efficient code objects.
                        </li>
                        <li>
                          Keep abreast of the latest industry trends in Angular
                          and related technologies.
                        </li>
                        <li>
                          Collaborate with cross-functional teams to deliver
                          tech-enabled solutions for packaging processes.
                        </li>
                      </ul>
                    </div>

                    {/* Cultural Expectations Section */}
                    <div className="job-section">
                      <h3 className="section-title">Cultural Expectations</h3>
                      <ul className="job-list">
                        <li>
                          Embrace innovative approaches and adapt to evolving
                          technologies
                        </li>
                        <li>
                          Foster a collaborative environment with
                          cross-functional teams
                        </li>
                        <li>
                          Maintain a commitment to sustainable and
                          environmentally friendly practices
                        </li>
                        <li>
                          Communicate effectively with diverse stakeholders
                        </li>
                        <li>
                          Uphold high-quality standards in code and design
                          decisions
                        </li>
                      </ul>
                    </div>

                    {/* Hiring Process Section */}
                    <div className="job-section mb-0">
                      <h3 className="section-title">Hiring Process</h3>
                      <ol className="job-list-ordered">
                        <li>Profile shortlisting</li>
                        <li>Tech interview</li>
                        <li>Tech interview</li>
                        <li>Founder/Leader interview</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="apply-small-form">
            <Col lg={12}>
              <div className="application-form-container">
                <Card
                  className="p-shadow-5 application-card"
                  style={{ backgroundColor: "#fff", border: "1px solid #eee" }}
                >
                  <h2 className="form-title">Fill details to apply</h2>
                  <p className="form-subtitle">
                    Choose among the one ways to apply for jobs.
                  </p>
                  {/* <h3 className="quick-apply-title">Quick apply through any 1 of the below</h3> */}

                  <div className="quick-apply-flex">
                    <div className="option-wrapper">
                      <Card className="option-card h-100">
                        <FileUpload
                          mode="basic"
                          name="demo[]"
                          url="/api/upload"
                          accept=".pdf, .doc, .docx, .txt, .rtf, .html, .odt, .gdoc"
                          onSelect={handleSelectResume}
                          maxFileSize={1000000}
                          className="file-upload-input"
                          chooseLabel="Upload Resume"
                          style={{
                            border: "none",
                            borderRadius: "4px !important",
                          }}
                        />

                        {/* <Button
                                icon="pi pi-file"
                                label="Apply with Resume"
                                className="p-button-outlined p-button-secondary"
                            /> */}
                        <p className="option-description">Accepted formats: .pdf, .doc, .docx, .txt, .rtf, .html etc</p>
                      </Card>
                    </div>
                    <div className="option-wrapper">
                      <Card className="option-card h-100">
                        <Button
                          onClick={handleSelectResume}
                          label="Fill the form"
                          className="p-button-outlined p-button-secondary"
                        />
                        <p className="option-description">
                          Fill the Detail form Manually with all the details
                        </p>
                      </Card>
                    </div>
                  </div>

                  {/* <Divider align="center">Or</Divider> */}

                  {/* <div className="apply-email">
                    <Card className="option-card">
                        <Button
                            icon="pi pi-envelope"
                            label="Fill the form"
                            className="p-button-outlined p-button-secondary"
                        />
                        <p className="option-description">8-input Job application</p>
                    </Card>
                </div> */}
                </Card>
              </div>
            </Col>
          </Row>

          {
            Upload && (
              // <div className="application-form-container">

              <Container>
                <Row>
                  <Col lg={12}>
                    <h3 className="candet-head mb-4" id="candidateDetails">
                      Candidates Details Form
                    </h3>
                  </Col>
                </Row>

                {/* start view  */}

                <div
                  className="details-dialog"
                  header="Review Your Details"
                  visible={showDialog}
                  onHide={handleCloseDialog}
                  breakpoints={{ "960px": "75vw" }}
                >
                  {/* Basic Information start */}
                  <Row>
                    <Col lg={12}>
                      {/* Basic Information */}

                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex mb-2">
                              <h4 className="pre-txthead">Basic Information</h4>
                            </div>
                            <div className="">
                              <Row className="mb-3">
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="fullName" className="block">
                                      Full Name
                                    </label>
                                    <div style={{ position: "relative" }}>
                                      <InputText
                                        className="w-full"
                                        placeholder="Ram"
                                        value={basicimp}

                                        // {...register("firstname", {
                                        //   required: "First name is required",
                                        //   pattern: {
                                        //     value: /^[A-Za-z][A-Za-z-\s&]+$/,
                                        //     message:
                                        //       "This field allows only alphabets and spaces, but does not accept a space as the first character.",
                                        //   },
                                        // })}
                                        // onKeyUp={() => { trigger("firstname") }}
                                      />
                                      {/* {errors.firstname && (<small id='personalEmailHelp' className='form-text text-danger'>{errors.firstname.message}</small>)} */}
                                      <i
                                        className="pi pi-pencil"
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          top: "52%",
                                          transform: "translateY(-50%)",
                                          color: "#6c757d",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          setFullNameDialogVisible(true)
                                        }
                                      ></i>
                                    </div>

                                    <Dialog
                                      header="Edit Full Name"
                                      visible={fullNameDialogVisible}
                                      onHide={() =>
                                        setFullNameDialogVisible(false)
                                      }
                                      style={{ width: "30vw" }}
                                      breakpoints={{
                                        "960px": "75vw",
                                        "641px": "100vw",
                                      }}
                                    >
                                      <Row className="mb-2">
                                        <Col xl={12}>
                                          <label
                                            htmlFor="title"
                                            className="block"
                                          >
                                            Title
                                          </label>
                                          <select
                                            className="form-select mb-1"
                                            value={basictittle}
                                            onChange={e => {
                                              setbasictittle(e.target.value)
                                            }}
                                          >
                                            <option value="">
                                              Select Title
                                            </option>
                                            <option value="Mr.">Mr.</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Miss">Miss</option>
                                            <option value="Ms">Ms</option>
                                          </select>
                                        </Col>
                                      </Row>

                                      <Row className="mb-2">
                                        <Col xl={12}>
                                          <label
                                            htmlFor="title"
                                            className="block"
                                          >
                                            First Name
                                          </label>
                                          <InputText
                                            id="title"
                                            className="w-full"
                                            value={basicfirst}
                                            onChange={e => {
                                              setbasicfirst(e.target.value)
                                            }}
                                          />
                                        </Col>
                                      </Row>

                                      <Row className="mb-2">
                                        <Col xl={12}>
                                          <label
                                            htmlFor="title"
                                            className="block"
                                          >
                                            Middle Name
                                          </label>
                                          <InputText
                                            id="title"
                                            className="w-full"
                                            value={basicmiddle}
                                            onChange={e => {
                                              setbasicmiddle(e.target.value)
                                            }}
                                          />
                                        </Col>
                                      </Row>

                                      <Row className="mb-2">
                                        <Col xl={12}>
                                          <label
                                            htmlFor="title"
                                            className="block"
                                          >
                                            Last Name
                                          </label>
                                          <InputText
                                            id="title"
                                            className="w-full"
                                            value={basiclast}
                                            onChange={e => {
                                              setbasiclast(e.target.value)
                                            }}
                                          />
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col xl={12}>
                                          <div className="d-flex justify-content-end mt-2">
                                            <Button
                                              color="primary btn-main mr-2"
                                              onClick={handleSave}
                                            >
                                              Ok
                                            </Button>
                                            <Button color="btn btn-primary cancel-outlinebtn">
                                              <i className="pi pi-times me-1"></i>
                                              Cancel
                                            </Button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Dialog>

                                
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="company" className="block">
                                      Company
                                    </label>
                                    <InputText
                                      className="w-full"
                                      placeholder="Pranathi software services"
                                      {...register("Company", {
                                        required: "Company name is required",
                                        pattern: {
                                          value: /^[A-Za-z][A-Za-z-\s&]+$/,
                                          // message:
                                          //   "This field allows only alphabets and spaces, but does not accept a space as the first character.",
                                        },
                                      })}
                                      onKeyUp={() => {
                                        trigger("Company")
                                      }}
                                    />
                                    {errors.Company && (
                                      <small
                                        id="personalEmailHelp"
                                        className="form-text text-danger"
                                      >
                                        {errors.Company.message}
                                      </small>
                                    )}
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="jobTitle" className="block">
                                      Job Title
                                    </label>
                                    <InputText
                                      className="w-full"
                                      placeholder="React Developer"
                                      {...register("JobTitle", {
                                        required: "JobTitle  is required",
                                        pattern: {
                                          value: /^[A-Za-z][A-Za-z-\s&]+$/,
                                          // message:
                                          //   "This field allows only alphabets and spaces, but does not accept a space as the first character.",
                                        },
                                      })}
                                      onKeyUp={() => {
                                        trigger("JobTitle")
                                      }}
                                    />
                                    {errors.JobTitle && (
                                      <small
                                        id="personalEmailHelp"
                                        className="form-text text-danger"
                                      >
                                        {errors.JobTitle.message}
                                      </small>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label htmlFor="status" className="block">
                                      Status
                                    </label>
                                    <select
                                      className="form-select profileDetailsInput"
                                      id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                                      aria-label="Default select example"
                                      {...register("Status", {
                                        // required: "This field is required",
                                      })}
                                    >
                                      <option value="">--Select --</option>
                                      <option value="Active">Active</option>
                                      <option value="InActive">
                                        InActive{" "}
                                      </option>
                                    </select>
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="p-field">
                                    <label
                                      htmlFor="totalExperience"
                                      className="block"
                                    >
                                      Total Experience
                                    </label>

                                    <InputNumber
                                      inputId="totalExperience"
                                      value={totalExperience}
                                      onValueChange={e =>
                                        setTotalExperience(e.value)
                                      }
                                      placeholder="5 years"
                                      className="w-full drop-clr"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  {/* Basic Information end */}

                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="mb-3">
                          <div className="d-flex mb-2">
                            <h4 className="pre-txthead">Contact Information</h4>
                          </div>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="email1" className="block">
                                Email 1
                              </label>
                              <InputText
                                id="email"
                                name="email"
                                className="w-full"
                                placeholder="venkata@gmail.com"
                                {...register("personal_email", {
                                  required: "Please enter  Email",
                                  pattern: {
                                    value:
                                      /^[A-Z0-9._%+-]+@[A-Z.-]{2,}\.+[A-Z]{2,}$/i,
                                    message: "Please enter valid Email", // JS only: <p>error message</p> TS only support string
                                  },
                                  onChange: event =>
                                    (event.target.value =
                                      event.target.value.toLowerCase()),
                                })}
                              />

                              {errors.personal_email && (
                                <small
                                  id="personalEmailHelp"
                                  className="form-text text-danger"
                                >
                                  {errors.personal_email.message}
                                </small>
                              )}
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="email2" className="block">
                                Email 2
                              </label>
                              <InputText
                                className="w-full"
                                placeholder="venkatalaxmi2@gmail.com"
                                {...register("Email2", {})}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="workPhone" className="block">
                                Work Phone
                              </label>
                              <InputText
                                id="integer"
                                placeholder="9876543210"
                                keyfilter="int"
                                className="w-full"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="mobilePhone" className="block">
                                Mobile Phone
                              </label>
                              <InputText
                                className="w-full"
                                placeholder="1234567890"
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
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={6}>
                            <div className="p-field">
                              <label htmlFor="address" className="block">
                                Address
                              </label>
                              <div
                                className="companie-add"
                                style={{ position: "relative" }}
                              >
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
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setVisible(true)}
                                ></i>
                                <Dialog
                                  header="Edit Address"
                                  className="address-popup"
                                  visible={visible}
                                  onHide={() => {
                                    if (!visible) return
                                    setVisible(false)
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
                                          <label htmlFor="street2">
                                            Street 2
                                          </label>
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
                                          <label htmlFor="country">
                                            Country
                                          </label>
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
                                          <label htmlFor="postalCode">
                                            Label
                                          </label>
                                          <Dropdown
                                            value={selectedLabel1}
                                            onChange={e => {
                                              updateAddress()
                                              setSelectedLabel1(e.value)
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
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex mb-2">
                              <div>
                                <i className="pi pi-info-circle me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Skills </h4>
                            </div>
                            <Row className="mb-3">
                              <Col lg={4}>
                                <div className="p-field">
                                  <label
                                    htmlFor="primarySkills"
                                    className="block"
                                  >
                                    Primary Skills
                                  </label>
                                  <select
                                    className="form-select mb-1"
                                    value={primarySkills}
                                    onChange={e =>
                                      setPrimarySkills(e.target.value)
                                    }
                                  >
                                    <option value="">
                                      Select Primary Skills
                                    </option>
                                    {primarySkillsvalu.map((item, j) => {
                                      return (
                                        <option value={item.skill_id} key={j}>
                                          {item.skill_name}
                                        </option>
                                      )
                                    })}
                                  </select>
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div className="p-field">
                                  <label
                                    htmlFor="secondarySkills"
                                    className="block"
                                  >
                                    Secondary Skills
                                  </label>
                                  <select
                                    className="form-select mb-1"
                                    value={secondarySkills}
                                    onChange={e =>
                                      setSecondarySkills(e.target.value)
                                    }
                                  >
                                    <option value="">
                                      Select Secondary Skills
                                    </option>
                                    {secondarySkillsval.map((item, j) => {
                                      return (
                                        <option value={item.skill_id} key={j}>
                                          {item.skill_name}
                                        </option>
                                      )
                                    })}
                                  </select>
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div className="p-field">
                                  <label
                                    htmlFor="otherSkills"
                                    className="block"
                                  >
                                    Other Skills
                                  </label>
                                  <select
                                    className="form-select mb-1"
                                    value={otherSkills}
                                    onChange={e =>
                                      setOtherSkills(e.target.value)
                                    }
                                  >
                                    <option value="">
                                      Select Other Skills
                                    </option>
                                    {otherSkillsval.map((item, j) => {
                                      return (
                                        <option value={item.skill_id} key={j}>
                                          {item.skill_name}
                                        </option>
                                      )
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
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex mb-2">
                              <div>
                                <i class="pi pi-star me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">
                                General Information
                              </h4>
                            </div>

                            <Row className="mb-3">
                              <Col lg={4}>
                                <div className="p-field">
                                  <label
                                    htmlFor="currentSalary"
                                    className="block"
                                  >
                                    Current Salary
                                  </label>
                                  <InputNumber
                                    inputId="currentSalary"
                                    value={currentSalary}
                                    onValueChange={e =>
                                      setCurrentSalary(e.value)
                                    }
                                    mode="currency"
                                    currency="INR"
                                    locale="en-IN"
                                    placeholder="10LPA"
                                    className="w-full"
                                  />
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div className="p-field">
                                  <label
                                    htmlFor="expectedSalary"
                                    className="block"
                                  >
                                    Expected Salary
                                  </label>
                                  <InputNumber
                                    inputId="expectedSalary"
                                    value={expectedSalary}
                                    onValueChange={e =>
                                      setExpectedSalary(e.value)
                                    }
                                    mode="currency"
                                    currency="INR"
                                    locale="en-IN"
                                    placeholder="15LPA"
                                    className="w-full"
                                  />
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div className="p-field">
                                  <label
                                    htmlFor="employeeType"
                                    className="block"
                                  >
                                    Employee Type
                                  </label>
                                  <select
                                    className="form-select profileDetailsInput"
                                    id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                                    aria-label="Default select example"
                                    {...register("EmployeeType", {
                                      // required: "This field is required",
                                    })}
                                  >
                                    <option value="">--Select --</option>
                                    <option value="Active">
                                      Work From Office
                                    </option>
                                    <option value="Work From Remote">
                                      Work From Remote{" "}
                                    </option>
                                    <option value="Work From Home">
                                      Work From Home{" "}
                                    </option>
                                    <option value="Freelancer">
                                      Freelancer{" "}
                                    </option>
                                  </select>
                                </div>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col lg={4}>
                                <div className="p-field">
                                  <label htmlFor="dob" className="block">
                                    Date of Birth
                                  </label>
                                  <Calendar
                                    className="w-full"
                                    id="buttondisplay"
                                    value={dob}
                                    onChange={e => setDob(e.value)}
                                    showIcon
                                  />
                                </div>
                              </Col>

                              <Col lg={4}>
                                <div className="p-field">
                                  <label
                                    htmlFor="availabilityDate"
                                    className="block"
                                  >
                                    Availability Date
                                  </label>
                                  <Calendar
                                    className="w-100"
                                    id="buttondisplay"
                                    value={dateAvalibility}
                                    onChange={e => setDateAvalibility(e.value)}
                                    showIcon
                                  />
                                </div>
                              </Col>

                              <Col lg={4}>
                                <div className="p-field">
                                  <label htmlFor="relocation" className="block">
                                    Relocation
                                  </label>
                                  <input
                                    type="checkbox"
                                    {...register("relocation", {})}
                                    onKeyUp={() => {
                                      trigger("relocation")
                                    }}
                                    className="me-2"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col lg={4}>
                                <div className="p-field">
                                  <label htmlFor="source" className="block">
                                    Source
                                  </label>
                                  <InputText
                                    id="integer"
                                    keyfilter="int"
                                    className="w-full"
                                    placeholder="LinkedIn"
                                  />
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div className="p-field">
                                  <label htmlFor="referredBy" className="block">
                                    Referred By
                                  </label>
                                  <InputText
                                    id="integer"
                                    keyfilter="int"
                                    className="w-full"
                                    placeholder="Ram"
                                  />
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div className="p-field">
                                  <label htmlFor="categories" className="block">
                                    Categories
                                  </label>
                                  <TreeSelect
                                    value={selectedCategoryKey}
                                    onChange={e =>
                                      setSelectedCategoryKey(e.value)
                                    }
                                    options={categories}
                                    filter
                                    className="w-full"
                                    placeholder="Select Category"
                                  ></TreeSelect>
                                </div>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col lg={4}>
                                <div className="p-field">
                                  <label htmlFor="groups" className="block">
                                    Groups
                                  </label>
                                  <TreeSelect
                                    value={selectedGroupKey}
                                    onChange={e => setSelectedGroupKey(e.value)}
                                    options={groups}
                                    filter
                                    className="w-full"
                                    placeholder="Select Group"
                                  ></TreeSelect>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex mb-2">
                              <div>
                                <i className="pi pi-book me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Experience</h4>
                            </div>

                            <Row className="mb-3">
                              <Col lg={12}>
                                {/* Data Table */}
                                <DataTable
                                  value={workExperiences}
                                  responsiveLayout="scroll"
                                  className="mt-2"
                                  emptyMessage={
                                    <div className="empty-message-custom">
                                      No education details found.
                                    </div>
                                  }
                                >
                                  <Column field="company" header="Company" />
                                  <Column field="website" header="Website" />
                                  <Column field="jobTitle" header="Job Title" />
                                  <Column
                                    field="fromDate"
                                    header="From Date"
                                    body={rowData =>
                                      rowData.fromDate?.toLocaleDateString()
                                    }
                                  />
                                  <Column
                                    field="toDate"
                                    header="To Date"
                                    body={rowData =>
                                      rowData.toDate?.toLocaleDateString()
                                    }
                                  />
                                  {/* <Column field="description" header="Description" /> */}
                                  {/* <Column header="Actions" body={actionBodyTemplate} /> */}
                                </DataTable>

                                <div className="block d-flex align-items-center justify-content-end">
                                  <a
                                    color="primary"
                                    className="anchr-title  mt-3"
                                    onClick={() => setShowworkexpDialog(true)}
                                  >
                                    <i className="pi pi-plus me-1"></i> Add More
                                  </a>
                                </div>

                                {/* Dialog for Adding/Editing */}
                                <Dialog
                                  header={
                                    editIndex !== null
                                      ? "Edit Work Experience"
                                      : "Add Work Experience"
                                  }
                                  visible={showworkexpDialog}
                                  style={{ width: "30vw" }}
                                  onHide={() => setShowworkexpDialog(false)}
                                >
                                  <Row className="mb-2">
                                    <Col xl={12}>
                                      <label
                                        htmlFor="company"
                                        className="block"
                                      >
                                        Company
                                      </label>
                                      <InputText
                                        className="w-full"
                                        value={formValues.company}
                                        onChange={e =>
                                          handleInputChange(
                                            "company",
                                            e.target.value
                                          )
                                        }
                                        // {...register("Company1", {
                                        //   required: "This field is required",
                                        //   pattern: {
                                        //     value: /^[a-zA-Z_ ]*$/,
                                        //     message:
                                        //       "Please enter valid Job Tittle ",
                                        //   },
                                        // })}
                                        // onKeyUp={() => { trigger("Company1") }}
                                      />
                                      {/* {errors.Company1 && (<small id='emailHelp' className='form-text text-danger'>{errors.Company1.message}</small>)} */}
                                    </Col>
                                  </Row>

                                  <Row className="mb-2">
                                    <Col xl={12}>
                                      <label
                                        htmlFor="website"
                                        className="block"
                                      >
                                        Website
                                      </label>
                                      <InputText
                                        id="website"
                                        value={formValues.website}
                                        onChange={e =>
                                          handleInputChange(
                                            "website",
                                            e.target.value
                                          )
                                        }
                                        className="w-full"
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-2">
                                    <Col xl={12}>
                                      <label
                                        htmlFor="jobTitle"
                                        className="block"
                                      >
                                        Job Title
                                      </label>
                                      <InputText
                                        id="jobTitle"
                                        value={formValues.jobTitle}
                                        onChange={e =>
                                          handleInputChange(
                                            "jobTitle",
                                            e.target.value
                                          )
                                        }
                                        className="w-full"
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-2">
                                    <Col xl={12}>
                                      <label
                                        htmlFor="fromDate"
                                        className="block"
                                      >
                                        From Date
                                      </label>
                                      <Calendar
                                        id="fromDate"
                                        value={formValues.fromDate}
                                        onChange={e =>
                                          handleInputChange("fromDate", e.value)
                                        }
                                        showIcon
                                        className="w-full"
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-2">
                                    <Col xl={12}>
                                      <label htmlFor="toDate" className="block">
                                        To Date
                                      </label>
                                      <Calendar
                                        id="toDate"
                                        value={formValues.toDate}
                                        onChange={e =>
                                          handleInputChange("toDate", e.value)
                                        }
                                        showIcon
                                        className="w-full"
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xl={12}>
                                      <div className="d-flex justify-content-end mt-2">
                                        <Button
                                          color="primary btn-main mr-2"
                                          onClick={handleSave}
                                        >
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
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex mb-2">
                              <div>
                                <i className="pi pi-graduation-cap me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Education</h4>
                            </div>

                            <Row className="mb-3">
                              <Col lg={12}>
                                <DataTable
                                  value={educationDetails}
                                  showGridlines
                                  emptyMessage={
                                    <div className="empty-message-custom">
                                      No education details found.
                                    </div>
                                  }
                                  // tableStyle={{ minWidth: '30rem' }}
                                >
                                  <Column
                                    field="degree"
                                    header="Degree"
                                  ></Column>
                                  <Column
                                    field="institution"
                                    header="School"
                                  ></Column>
                                  <Column field="grade" header="Grade"></Column>
                                  <Column field="year" header="Year"></Column>
                                </DataTable>

                                <div className="block d-flex align-items-center justify-content-end">
                                  <a
                                    color="primary"
                                    className="anchr-title mt-3"
                                    onClick={() => setIsDialogVisible(true)}
                                  >
                                    <i className="pi pi-plus me-1"></i> Add More
                                  </a>
                                </div>

                                {/* Dialog for Adding New Education */}
                                <Dialog
                                  header="Add Education"
                                  visible={isDialogVisible}
                                  style={{ width: "30vw" }}
                                  onHide={() => setIsDialogVisible(false)}
                                >
                                  <div className="field">
                                    <label
                                      htmlFor="degree"
                                      className="block mb-2"
                                    >
                                      Degree
                                    </label>
                                    <InputText
                                      id="degree"
                                      value={newEducation.degree}
                                      onChange={e =>
                                        setNewEducation({
                                          ...newEducation,
                                          degree: e.target.value,
                                        })
                                      }
                                      placeholder="Enter Degree"
                                      className="w-full"
                                    />
                                  </div>
                                  <div className="field mt-2">
                                    <label
                                      htmlFor="institution"
                                      className="block mb-2"
                                    >
                                      School
                                    </label>
                                    <InputText
                                      id="institution"
                                      value={newEducation.institution}
                                      onChange={e =>
                                        setNewEducation({
                                          ...newEducation,
                                          institution: e.target.value,
                                        })
                                      }
                                      placeholder="Enter Institution"
                                      className="w-full"
                                    />
                                  </div>
                                  <div className="field mt-2">
                                    <label
                                      htmlFor="grade"
                                      className="block mb-2"
                                    >
                                      Grade
                                    </label>
                                    <InputText
                                      id="grade"
                                      value={newEducation.grade}
                                      onChange={e =>
                                        setNewEducation({
                                          ...newEducation,
                                          grade: e.target.value,
                                        })
                                      }
                                      placeholder="Enter Grade/Percentage"
                                      className="w-full"
                                    />
                                  </div>

                                  <Row>
                                    <Col xl={6}>
                                      <div className="field">
                                        <label
                                          htmlFor="year"
                                          className="block  mb-2"
                                        >
                                          Start Year
                                        </label>
                                        <Dropdown
                                          id="year"
                                          value={newEducation.year}
                                          onChange={e =>
                                            setNewEducation({
                                              ...newEducation,
                                              year: e.value,
                                            })
                                          }
                                          options={years}
                                          placeholder="Select Year"
                                          className="w-full bgclr"
                                        />
                                      </div>
                                    </Col>
                                    <Col xl={6}>
                                      <div className="field">
                                        <label
                                          htmlFor="month"
                                          className="block  mb-2"
                                        >
                                          Start Month
                                        </label>
                                        <Dropdown
                                          id="month"
                                          value={newEducation.month}
                                          onChange={e =>
                                            setNewEducation({
                                              ...newEducation,
                                              month: e.value,
                                            })
                                          }
                                          options={months}
                                          placeholder="Select Month"
                                          className="w-full bgclr"
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row className="mt-2">
                                    {/* End Date */}
                                    <Col xl={6}>
                                      <div className="field">
                                        <label
                                          htmlFor="endYear"
                                          className="block"
                                        >
                                          End Year
                                        </label>
                                        <Dropdown
                                          id="endYear"
                                          value={newEducation.endYear}
                                          onChange={e =>
                                            setNewEducation({
                                              ...newEducation,
                                              endYear: e.value,
                                            })
                                          }
                                          options={years}
                                          placeholder="Select Year"
                                          className="w-full bgclr"
                                        />
                                      </div>
                                    </Col>
                                    <Col xl={6}>
                                      <div className="field">
                                        <label
                                          htmlFor="endMonth"
                                          className="block"
                                        >
                                          End Month
                                        </label>
                                        <Dropdown
                                          id="endMonth"
                                          value={newEducation.endMonth}
                                          onChange={e =>
                                            setNewEducation({
                                              ...newEducation,
                                              endMonth: e.value,
                                            })
                                          }
                                          options={months}
                                          placeholder="Select Month"
                                          className="w-full bgclr"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xl={12}>
                                      <div className="d-flex justify-content-end mt-2">
                                        <Button
                                          color="primary btn-main mr-2"
                                          onClick={handleSave1}
                                        >
                                          Ok
                                        </Button>
                                      </div>
                                    </Col>
                                  </Row>
                                </Dialog>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex mb-2">
                              <div>
                                <i className="pi pi-file me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Documents</h4>
                            </div>

                            <Row className="mt-3">
                              <Col xl={12}>
                                {/* <h5>Added Documents:</h5> */}
                                <DataTable
                                  value={documents}
                                  rows={5}
                                  className="p-datatable-gridlines"
                                  emptyMessage={
                                    <div className="empty-message-custom">
                                      No education details found.
                                    </div>
                                  }
                                >
                                  <Column
                                    field="selectedDocument"
                                    header="Type"
                                  />
                                  <Column field="subject" header="Subject" />
                                  <Column
                                    field="file"
                                    header="Attachment"
                                    body={rowData =>
                                      rowData.file
                                        ? rowData.file.name
                                        : "No file"
                                    }
                                  />
                                </DataTable>

                                <div className="block d-flex justify-content-end align-items-center">
                                  <a
                                    color="primary"
                                    className="anchr-title  mt-3"
                                    onClick={openAddDocumentDialog}
                                  >
                                    <i className="pi pi-plus me-1"></i> Add More
                                  </a>
                                </div>
                              </Col>
                            </Row>

                            <Dialog
                              header="Add Document"
                              visible={displayDialog}
                              onHide={closeAddDocumentDialog}
                              style={{ width: "30vw" }}
                            >
                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label htmlFor="type" className="block mb-2">
                                    Type
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <Dropdown
                                    options={groupedDocuments}
                                    optionLabel="label"
                                    optionGroupLabel="label"
                                    optionGroupChildren="items"
                                    optionGroupTemplate={groupedItemTemplate}
                                    className="w-full bgclr"
                                    placeholder="Select a Document"
                                    value={documentvalu.selectedDocument}
                                    onChange={e =>
                                      handleInputChange1(
                                        "selectedDocument",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label
                                    htmlFor="subject"
                                    className="block mb-2"
                                  >
                                    Subject
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <InputText
                                    id="subject"
                                    value={documentvalu.subject}
                                    onChange={e =>
                                      handleInputChange1(
                                        "subject",
                                        e.target.value
                                      )
                                    }
                                    className="w-full"
                                  />
                                </Col>
                              </Row>

                              <Row className="mt-2 align-items-center">
                                <Col xl={3}>
                                  <label
                                    htmlFor="attachment"
                                    className="block mb-2"
                                  >
                                    Attachment
                                  </label>
                                </Col>
                                <Col xl={9}>
                                  <FileUpload
                                    value={documentvalu.file}
                                    onChange={e =>
                                      handleInputChange1("file", e.target.value)
                                    }
                                    mode="basic"
                                    name="demo"
                                    url="/api/upload"
                                    accept="application/pdf"
                                    maxFileSize={1000000}
                                    onUpload={handleUpload}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xl={12}>
                                  <div className="d-flex justify-content-end mt-2">
                                    <Button
                                      color="primary btn-main mr-2"
                                      onClick={handleSavedocument}
                                    >
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
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-4">
                    {/* <button type="button" onClick={popupHandleSubmit} class="btn btn-primary btn-main">Submit</button> */}
                    <button
                      type="submit"
                      class="btn btn-primary btn-main"
                      onClick={handleSubmit}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {/* view end */}
              </Container>
            )
            // </div>
          }

          <Row>
            <Col lg={12}>
              <div>
                <Dialog
                  className="details-dialog"
                  header="Review Your Details"
                  visible={showDialog}
                  onHide={handleCloseDialog}
                  breakpoints={{ "960px": "75vw" }}
                  style={{ width: "60vw" }}
                >
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="">
                              <span class="profile-icon">
                                <i class="pi pi-user"></i>
                              </span>
                              <h4 className="pre-txthead me-2">
                                Venkata laxmi Valle
                              </h4>
                              <p>
                                Front end Developer at Varun Digital Media Pvt
                                Ltd
                              </p>
                              <p>
                                <i class="pi pi-map-marker me-1"></i> White
                                house, block-2, Begumpet
                              </p>
                              <div className="d-flex">
                                <p className="me-5">Status: Active</p>
                                <p>Experience: 2.5 Years</p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex">
                              <div>
                                <i className="pi pi-phone me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">
                                Contact Information
                              </h4>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Primary Email</p>
                                <strong>laxmivalle120@gmail.com</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Secondary Email</p>
                                <strong>laxmivalle120@gmail.com</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Primary Phone</p>
                                <strong>7890567834</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Secondary Phone</p>
                                <strong>8332989609</strong>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex">
                              <div>
                                <i className="pi pi-info-circle me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">
                                General Information
                              </h4>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Current Salary</p>
                                <strong>Hyderabad</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Expected Salary</p>
                                <strong>Full Time</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Employee Type</p>
                                <strong>Work From Office</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Date of Birth</p>
                                <strong>24-10-2024</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Availability Date</p>
                                <strong>10-10-2025</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Relocation</p>
                                <strong>Yes</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Source</p>
                                <strong>10-10-2025</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Reffered by</p>
                                <strong>Manager</strong>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div>
                                <p className="mb-0">Categories</p>
                                <strong>Skills</strong>
                              </div>
                            </div>
                            <div>
                              <p className="mb-0">Groups</p>
                              <strong>Skills</strong>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex">
                              <div>
                                <i class="pi pi-star me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Skills</h4>
                            </div>
                            <div className="mb-2">
                              <div className="mb-1">
                                <strong>Primary Skills</strong>
                              </div>
                              <div>
                                <Button className="skillbtn me-2">Html</Button>
                                <Button className="skillbtn me-2">CSS</Button>
                                <Button className="skillbtn me-2">
                                  Bootstrap
                                </Button>
                              </div>
                            </div>

                            <div className="mb-2">
                              <div className="mb-1">
                                <strong>Secondary Skills</strong>
                              </div>
                              <div>
                                <Button className="skillbtn me-2">
                                  React Js
                                </Button>
                                <Button className="skillbtn me-2">
                                  Jquery
                                </Button>
                              </div>
                            </div>

                            <div className="mb-2">
                              <div className="mb-1">
                                <strong>Other Skills</strong>
                              </div>
                              <div>
                                <Button className="skillbtn me-2">
                                  Python
                                </Button>
                                <Button className="skillbtn me-2">
                                  AI, ML
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex">
                              <div>
                                <i className="pi pi-book me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Experience</h4>
                            </div>
                            <div className="mb-2 d-flex">
                              <div>
                                <i className="pi pi-user me-2"></i>
                              </div>
                              <div className="mb-1">
                                <strong>Front end developer</strong>
                                <p className="mb-0">
                                  Varun Digital Media Pvt Ltd
                                </p>
                                <div>
                                  <small className="fs13">2022-present</small>
                                </div>
                                <a className="fs13">
                                  www.varundigitalmedia.com
                                </a>
                              </div>
                            </div>
                            <div className="mb-2 d-flex">
                              <div>
                                <i className="pi pi-user me-2"></i>
                              </div>
                              <div className="mb-1">
                                <strong>Front end developer</strong>
                                <p className="mb-0">LTIMindtree</p>
                                <div>
                                  <small className="fs13">2019-2022</small>
                                </div>
                                <a className="fs13">www.ltimindtree.com/</a>
                              </div>
                            </div>
                            <div className="mb-2 d-flex">
                              <div>
                                <i className="pi pi-user me-2"></i>
                              </div>
                              <div className="mb-1">
                                <strong>Front end developer</strong>
                                <p className="mb-0">
                                  Varun Digital Media Pvt Ltd
                                </p>
                                <div>
                                  <small className="fs13">2018-2019</small>
                                </div>
                                <a className="fs13">
                                  www.varundigitalmedia.com
                                </a>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex">
                              <div>
                                <i className="pi pi-graduation-cap me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Education</h4>
                            </div>
                            <div className="mb-2 d-flex">
                              <div>
                                <i className="pi pi-user me-2"></i>
                              </div>
                              <div className="mb-1">
                                <strong>B.Tech</strong>
                                <p className="mb-0">
                                  Rajiv Gandhi University of Knowledge
                                  Technologies
                                </p>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <small className="fs13 me-2">
                                      2022-2024
                                    </small>
                                  </div>
                                  <small className="fs13">Grade:8.0</small>
                                </div>
                              </div>
                            </div>
                            <div className="mb-2 d-flex">
                              <div>
                                <i className="pi pi-user me-2"></i>
                              </div>
                              <div className="mb-1">
                                <strong>Intermediate</strong>
                                <p className="mb-0">
                                  Rajiv Gandhi University of Knowledge
                                  Technologies
                                </p>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <small className="fs13 me-2">
                                      2020-2022
                                    </small>
                                  </div>
                                  <small className="fs13">Grade:8.0</small>
                                </div>
                              </div>
                            </div>
                            <div className="mb-2 d-flex">
                              <div>
                                <i className="pi pi-user me-2"></i>
                              </div>
                              <div className="mb-1">
                                <strong>SSC</strong>
                                <p className="mb-0">Z.P.High school</p>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <small className="fs13 me-2">
                                      2019-2020
                                    </small>
                                  </div>
                                  <small className="fs13">Grade:8.0</small>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="card p-4">
                        <Row className="d-flex justify-content-between">
                          <Col lg={12}>
                            <div className="d-flex">
                              <div>
                                <i className="pi pi-file me-2 diaicon"></i>
                              </div>
                              <h4 className="pre-txthead">Documents</h4>
                            </div>

                            <div>
                              <p className="mb-0">
                                <strong>Proof of Identity</strong>
                              </p>
                              <p>passport.png</p>
                              <p className="mb-0">
                                <strong>Employment-Related Documents</strong>
                              </p>
                              <p>diploma-certificate.pdf</p>
                              <p className="mb-0">
                                <strong>
                                  Financial and Tax-Related Documents
                                </strong>
                              </p>
                              <p>pan-card.png</p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      onClick={popupHandleSubmit}
                      class="btn btn-primary btn-main"
                    >
                      Submit
                    </button>
                  </div>
                </Dialog>
              </div>
            </Col>
          </Row>
        </Container>

      
      </div>
      <footer className="footer footer-back detailsformfooter">
        <Container fluid={true}>
          <Row className="d-flex">
            <Col lg={6} md={6} xs={12}>
              <p className="d-flex justify-content-start mb-0">
                {" "}
                &copy; 2025 Bharat PMS. All rights reserved.
              </p>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div className="d-flex justify-content-start justify-content-md-end">
                {/* <p className="me-3 mb-0"></p> */}
                <a
                  href="#"
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                >
                  Privacy Policy
                </a>
                {/* <p className="me-3 mb-0">Terms of Service</p> */}
                {/* <p className="mb-0">Contact</p> */}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>






      <Dialog
          header="Thank You!"
          visible={thankyou}
          onHide={() => setThankyou(false)}
          style={{ width: "30vw", textAlign: "center" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
          <img
            src={Thankyou}
            alt="Thank You"
            style={{}}
            className="thankyou-img"
          />
          <p
            className="m-0"
            style={{ marginTop: "20px", fontSize: "1rem", color: "#555" }}
          >
            Thank you for your submission! We'll get back to you soon.
          </p>
          <Button
            label="Close"
            icon="pi pi-check"
            onClick={() => setThankyou(false)}
            className="p-button-primary"
            style={{ marginTop: "20px" }}
          />
        </Dialog>











    </React.Fragment>
  )
}

export default CandidateForm
