import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap"
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from "primereact/radiobutton";
// import { C } from "@fullcalendar/core/internal-common";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Editor } from 'primereact/editor';
import { InputTextarea } from 'primereact/inputtextarea';
import { useNavigate } from 'react-router-dom';
import { CascadeSelect } from 'primereact/cascadeselect';
import { PlusIcon } from 'primereact/icons/plus';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';

const ProfileMenu = () => {

  const menuLeft = useRef(null);
  const [visible, setVisible] = useState(false);

  // const [text, setText] = React.useState('');
  const navigate = useNavigate();

  const items = [
    {
      items: [
        {
          label: 'My Account',
          icon: 'pi pi-user',
          command: () => {
            navigate('/admin-dashboard?selectedTab=3');
          }
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          command: () => { setVisible(true); }
        },
        {
          label: 'Admin Module',
          icon: 'pi pi-user',
          command: () => {
            navigate('/admin-dashboard');
          }
        },
        {
          label: 'Log out',
          icon: 'pi pi-sign-out',
        },
      ]
    }
  ];

  // casacadeselect 
  const [selectedAddMenu, setSelectedAddMenu] = useState(null);

  const handleSelectChange = (e) => {
    const selectedOption = e.value;
    setSelectedAddMenu(selectedOption);

    // If an action is defined for the selected option, execute it
    if (selectedOption && selectedOption.action) {
      selectedOption.action();
    }
  };

  const menuAddOptions = [
    {
      name: 'My Account',
      code: 'EM-NE',
      action: () => navigate('/admin-dashboard?selectedTab=3')
    },
    {
      name: 'Admin Module',
      code: 'EM-JO',
      subItems: [

        {
          name: 'User Management', code: 'EM-JO-SE',
          // action: () => navigate('/importfromcsv-jobs')
          action: () => navigate('/admin-dashboard?selectedTab=0')
        },
        {
          name: 'Settings', code: 'EM-JO-SE',
          action: () => setVisible(true)
        },
        {
          name: 'Lookup Customization', code: 'EM-JO-AL',
          action: () => navigate('/admin-dashboard?selectedTab=2')
        }
      ],
    },
    {
      name: 'Log Out',
      code: 'EM-SE',
      action : () => navigate('/')
    },

  ];

  const handlePlusIconClick = () => {
    // Handle the plus icon click event here
    console.log("Plus icon clicked!");
    // You can add your custom logic here
  };



  const itemTemplate = (option) => {
    return (
      <div className="custom-item" style={{ left: '-120%' }}>
        <span>{option.name}</span>
      </div>
    );
  };


  // casacadeselect ends

  const [fontSize, setFontSize] = useState("normal");
  const fontSizeOptions = [
    { label: 'Extra Small', value: '10px' },
    { label: 'Small', value: '12px' },
    { label: 'Normal', value: '16px' },
    { label: 'Large', value: '20px' },
  ];

  const [selectedFolder, setSelectedFolder] = useState(null);

  const folderOptions = [
    { label: 'Dashboards', value: 'dashboards', icon: 'pi pi-th-large' },
    { label: 'Reports', value: 'reports', icon: 'pi pi-chart-line' },
    { label: 'Jobs', value: 'jobs', icon: 'pi pi-briefcase' },
    { label: 'Candidates', value: 'candidates', icon: 'pi pi-users' },
    { label: 'Candidate Pipeline', value: 'pipeline', icon: 'pi pi-sitemap' },
    { label: 'Companies', value: 'companies', icon: 'pi pi-building' },
    { label: 'Contacts', value: 'contacts', icon: 'pi pi-address-book' },
    { label: 'Calendar', value: 'calendar', icon: 'pi pi-calendar' },
    { label: 'Emails', value: 'emails', icon: 'pi pi-envelope' },
    { label: 'Onboarding', value: 'onboarding', icon: 'pi pi-user-plus' },
    { label: 'Admin Module', value: 'admin', icon: 'pi pi-user' }
  ];
  const customTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`}></i>
        <span>{option.label}</span>
      </div>
    );
  };
  const [selectedView, setSelectedView] = useState(null);

  const viewOptions = [
    { label: 'Home', value: 'home' },
    { label: 'Recruiters Dashboard', value: 'recruiters_dashboard' }
  ];
  const [ingredient, setIngredient] = useState('');
  const [addsmtp, setAddsmtp] = useState('');
  const [outgoingServer, setOutgoingServer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [email, setEmail] = useState("");
  const [port, setPort] = useState("");
  const [address, setAddress] = useState("");
  const [useSSL, setUseSSL] = useState(false);
  const [areaCode, setAreaCode] = useState("");
  const [accountKey, setAccountKey] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // State for storing SMTP details
  const [smtpAccounts, setSmtpAccounts] = useState([]);

  // Handle Create button click
  const handleCreate = () => {
    // Add current form data to smtpAccounts array
    const newAccount = {
      outgoingServer,
      port,
      username,
      password,
      email,
      address,
      useSSL,
    };

    setSmtpAccounts([...smtpAccounts, newAccount]);

    // Clear form fields after creating
    setOutgoingServer("");
    setPort("");
    setUsername("");
    setPassword("");
    setFromEmail("");
    setEmail("");
    setAddress("");
    setUseSSL(false);
  };

  // email Signature starts

  const [isNewSignatureVisible, setNewSignatureVisible] = useState(false); // For new signature dialog
  const [isRenameSignatureVisible, setRenameSignatureVisible] = useState(false); // For rename signature dialog
  const [newSignatureName, setNewSignatureName] = useState(''); // New signature name
  const [renameSignatureValue, setRenameSignatureValue] = useState(''); // Rename value
  const [selectedSignature, setSelectedSignature] = useState(''); // Track selected signature name
  const [signatures, setSignatures] = useState([{
    name: 'Default', // Default signature name
    content: `<strong>Best regards,</strong><br>
  [Your Name]<br>
  [Your Position]<br>
  [Your Company]<br>
  [Your Contact Information]` // Default content
  }]); // Signature list with a default signature
  const [signatureContent, setSignatureContent] = useState(''); // Editor content
  const [isSignatureEditing, setIsSignatureEditing] = useState(false); // Track editor changes

  // Set default signature as selected signature when it first loads
  useEffect(() => {
    if (signatures.length > 0) {
      setSelectedSignature(signatures[0].name);
      setSignatureContent(signatures[0].content);
    }
  }, []);

  // Dropdown options
  const signatureOptions = signatures.map(signature => ({
    label: signature.name,
    value: signature.name
  }));

  // Handle selecting a signature from the dropdown
  const handleSelectSignature = (signatureName) => {
    setSelectedSignature(signatureName);
    const selectedSignatureObj = signatures.find(signature => signature.name === signatureName);
    if (selectedSignatureObj) {
      setSignatureContent(selectedSignatureObj.content);
      setIsSignatureEditing(false);
    }
  };

  // Handle the text editing event in the editor
  const handleSignatureEditorChange = (e) => {
    setSignatureContent(e.htmlValue);
    setIsSignatureEditing(true);
  };

  // Handle adding a new signature
  const handleAddSignature = () => {
    const newSignature = { name: newSignatureName, content: '' };
    setSignatures([...signatures, newSignature]);
    setSelectedSignature(newSignatureName);
    setSignatureContent('');
    setIsSignatureEditing(false);
    setNewSignatureVisible(false);
    setNewSignatureName('');
  };

  // Handle renaming a signature
  const handleRenameSignature = () => {
    setSignatures(signatures.map(signature =>
      signature.name === selectedSignature ? { ...signature, name: renameSignatureValue } : signature
    ));
    setSelectedSignature(renameSignatureValue);
    setRenameSignatureVisible(false);
    setRenameSignatureValue('');
  };

  // Handle save button logic
  const handleSaveSignature = () => {
    setSignatures(signatures.map(signature =>
      signature.name === selectedSignature ? { ...signature, content: signatureContent } : signature
    ));
    setIsSignatureEditing(false);
  };

  // Handle deleting a signature
  const handleDeleteSignature = () => {
    setSignatures(signatures.filter(signature => signature.name !== selectedSignature));
    setSelectedSignature('');
    setSignatureContent('');
  };

  // Button enable/disable logic
  const isAnySignatureAdded = signatures.length > 0;
  const isSignatureSaveEnabled = isSignatureEditing;

  const renderSignatureHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <select className="ql-font" aria-label="Font"></select>
        <select className="ql-size" aria-label="Font Size"></select>
        <select className="ql-color" aria-label="Text Color"></select>
        <select className="ql-background" aria-label="Background Color"></select>
        <button className="ql-image" aria-label="Insert Image"></button>
        <button className="ql-link" aria-label="Insert Link"></button>
        <select className="ql-align" aria-label="Text Alignment">
          <option value="" label="Left Align"></option>
          <option value="center" label="Center Align"></option>
          <option value="right" label="Right Align"></option>
          <option value="justify" label="Justify Align"></option>
        </select>
      </span>
    );
  };

  const signatureHeader = renderSignatureHeader();

  // email signature ends

  // email template starts

  const [isNewTemplateVisible, setNewTemplateVisible] = useState(false); // For new template dialog
  const [isRenameTemplateVisible, setRenameTemplateVisible] = useState(false); // For rename template dialog
  const [newTemplateName, setNewTemplateName] = useState(''); // New template name
  const [renameTemplateValue, setRenameTemplateValue] = useState(''); // Rename value
  const [selectedTemplate, setSelectedTemplate] = useState(''); // Track selected template name
  const [templates, setTemplates] = useState([{
    name: 'John', // Default template name
    content: `<strong>Dear [Full name], </strong><br><br>

I hope this email finds you well. My name is [Your Name], and I am [Your Position] at [Company Name]. We recently reviewed your profile and believe your skills 
and experiences align well with the requirements of an exciting position we currently have open: [Job Title].<br>
The Senior Front-End Developer role at Granicus is for developers who lead by example. They regularly take on challenging and complex technical tasks 
and consistently make significant contributions to all areas of the Granicus product suite. In addition to those contributions, 
the Senior Software Engineer is a key contributor when new features are being groomed and planned by their team. Their product and technical 
knowledge are indispensable in this area. <br>
Senior Software Engineers have deep expertise in multiple different technologies and applications and proactively apply their knowledge 
improving the design, interface, and architecture of our products. They fully understand the deployment process and support our applications in all environments. 
They are an excellent mentor to groups and individuals within and outside of the engineering team. 
` // Default content
  }]); // Template list with a default template
  const [templateContent, setTemplateContent] = useState(''); // Editor content
  const [isTemplateEditing, setIsTemplateEditing] = useState(false); // Track editor changes

  // Set default template as selected template when it first loads
  useEffect(() => {
    if (templates.length > 0) {
      setSelectedTemplate(templates[0].name);
      setTemplateContent(templates[0].content);
    }
  }, []);

  // Dropdown options
  const templateOptions = templates.map(template => ({
    label: template.name,
    value: template.name
  }));

  // Handle selecting a template from the dropdown
  const handleSelectTemplate = (templateName) => {
    setSelectedTemplate(templateName);
    const selectedTemplateObj = templates.find(template => template.name === templateName);
    if (selectedTemplateObj) {
      setTemplateContent(selectedTemplateObj.content);
      setIsTemplateEditing(false);
    }
  };

  // Handle the text editing event in the editor
  const handleTemplateEditorChange = (e) => {
    setTemplateContent(e.htmlValue);
    setIsTemplateEditing(true);
  };

  // Handle adding a new template
  const handleAddTemplate = () => {
    const newTemplate = { name: newTemplateName, content: '' };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplateName);
    setTemplateContent('');
    setIsTemplateEditing(false);
    setNewTemplateVisible(false);
    setNewTemplateName('');
  };

  // Handle renaming a template
  const handleRenameTemplate = () => {
    setTemplates(templates.map(template =>
      template.name === selectedTemplate ? { ...template, name: renameTemplateValue } : template
    ));
    setSelectedTemplate(renameTemplateValue);
    setRenameTemplateVisible(false);
    setRenameTemplateValue('');
  };

  // Handle save button logic
  const handleSaveTemplate = () => {
    setTemplates(templates.map(template =>
      template.name === selectedTemplate ? { ...template, content: templateContent } : template
    ));
    setIsTemplateEditing(false);
  };

  // Handle deleting a template
  const handleDeleteTemplate = () => {
    setTemplates(templates.filter(template => template.name !== selectedTemplate));
    setSelectedTemplate('');
    setTemplateContent('');
  };

  // Button enable/disable logic
  const isAnyTemplateAdded = templates.length > 0;
  const isTemplateSaveEnabled = isTemplateEditing;

  const renderTemplateHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <select className="ql-font" aria-label="Font"></select>
        <select className="ql-size" aria-label="Font Size"></select>
        <select className="ql-color" aria-label="Text Color"></select>
        <select className="ql-background" aria-label="Background Color"></select>
        <button className="ql-image" aria-label="Insert Image"></button>
        <button className="ql-link" aria-label="Insert Link"></button>
        {/* Alignment Controls */}
        <select className="ql-align" aria-label="Text Alignment">
          <option value="" label="Left Align"></option>
          <option value="center" label="Center Align"></option>
          <option value="right" label="Right Align"></option>
          <option value="justify" label="Justify Align"></option>
        </select>
      </span>
    );
  };

  const templateHeader = renderTemplateHeader();


  // toast msg

  const toast = useRef(null);

  const showMessageEmail = () => {
    toast.current.show({ severity: 'info', summary: 'SMTP Account Saved' });
  };
  const showCancelEmail = () => {
    toast.current.show({ severity: 'error', summary: 'SMTP Account Cancelled', life: 3000 });
  }

  const showMessagesms = () => {
    toast.current.show({ severity: 'info', summary: 'SMS Settings Saved' });
  };
  const showCancelsms = () => {
    toast.current.show({ severity: 'error', summary: 'SMS Settings Cancelled', life: 3000 });
  }

  return (
    <React.Fragment>
      <div className="profile-dropdown">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              {/* <div className="profilebtn">
                <Menu model={items} popup ref={menuLeft} id="popup_menu_left" className="profile-menu" />
                <Button icon="pi pi-user" className="mr-2" onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
              </div> */}
              <div className="profilebtn">
                <Tooltip target=".custom-profile-icon" content="Profile" position="bottom" style={{ marginTop: "5px" }} />
                <CascadeSelect
                  // value={selectedActEmail}
                  onChange={handleSelectChange}
                  options={menuAddOptions}
                  optionLabel="name"
                  optionGroupLabel="name"
                  optionGroupChildren={['subItems']}
                  className="addcus-cassel custom-cascadeselect"
                  dropdownIcon={<i className="pi pi-user custom-profile-icon" onClick={handlePlusIconClick}></i>}
                  itemTemplate={itemTemplate}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div>
                <Dialog header="Settings" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                  style={{ width: '56vw', height: '90vh' }} breakpoints={{ '1199px': '76vw', '1024px': '80vw', '992px': '80vw', '960px': '80vw', '641px': '90vw' }}>
                  <div className="view-form-sidebar">
                    <TabView className="tabview-sett">
                      <TabPanel header="General" leftIcon="pi pi-calendar mr-2">
                        <Row className="mt-3 mb-4">
                          <Col lg={12} sm={12}>
                            {/* <div className="p-field">
                              <label>Font Size</label>
                              <Dropdown
                                value={fontSize}
                                onChange={(e) => setFontSize(e.value)}
                                options={fontSizeOptions}
                                optionLabel="label"
                                placeholder="Select Font Size"
                                className="w-full"
                              />
                            </div> */}
                            <div className="p-field">
                              <label className="mb-2 fw-500">Font Size</label>
                              {/* <Dropdown
                                value={fontSize}
                                onChange={(e) => setFontSize(e.value)}
                                options={fontSizeOptions}
                                optionLabel="label"
                                placeholder="Select Font Size"
                                className="w-full"
                              /> */}
                              <div>
                                <button type="button" class="btn btn-primary btn-font me-2 mb-2">Extra Small</button>
                                <button type="button" class="btn btn-primary btn-font me-2 mb-2">Small</button>
                                <button type="button" class="btn btn-primary btn-font me-2 mb-2">Normal</button>
                                <button type="button" class="btn btn-primary btn-font me-2 mb-2">Large</button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col lg={12} sm={12}>
                            <label className="mb-2 fw-500">Default Folder</label>
                            <div>
                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-th-large"></i> Dashboards
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-chart-line"></i> Reports
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-briefcase"></i> Jobs
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-users"></i> Candidates
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-sitemap"></i> Candidate Pipeline
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-building"></i> Companies
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-address-book"></i> Contacts
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-calendar"></i> Calendar
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-envelope"></i> Emails
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-user-plus"></i> Onboarding
                              </button>

                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">
                                <i class="pi pi-user"></i> Admin Module
                              </button>

                            </div>
                            {/* <Dropdown
                              value={selectedFolder}
                              onChange={(e) => setSelectedFolder(e.value)}
                              options={folderOptions}
                              optionLabel="label"
                              placeholder="Select a Folder"
                              className="w-full"
                              itemTemplate={customTemplate}
                            /> */}
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4} sm={12}>
                            <label className="mb-2 fw-500">Default View</label>
                            <div>
                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">Home </button>
                              <button type="button" class="btn btn-primary btn-font me-2 mb-2">Recruiters Dashboard</button>
                            </div>
                            {/* <Dropdown
                              value={selectedView}
                              onChange={(e) => setSelectedView(e.value)}
                              options={viewOptions}
                              optionLabel="label"
                              placeholder="Select a Default View"
                              className="w-full"
                            /> */}
                          </Col>
                        </Row>
                      </TabPanel>
                      <TabPanel header="Email Settings" leftIcon="pi pi-envelope mr-2">
                        <Row>
                          <Col lg={12}>
                            <p className="mb-3 mt-3 fw-500">
                              Default Email Field for Mass Mailing or Email Campaigns
                            </p>
                            <div className="flex flex-wrap gap-3">
                              <div className="flex align-items-center">
                                <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                                <label htmlFor="ingredient1" className="ml-2 mb-0">Email1</label>
                              </div>
                              <div className="flex align-items-center">
                                <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                                <label htmlFor="ingredient2" className="ml-2 mb-0">Email2</label>
                              </div>
                              <div className="flex align-items-center">
                                <RadioButton inputId="ingredient3" name="pizza" value="Pepper" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Pepper'} />
                                <label htmlFor="ingredient3" className="ml-2 mb-0">Email1 or Email2</label>
                              </div>
                            </div>

                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <h6 className="mb-3 mt-4">SMTP Email Accounts</h6>
                            <Row className="mb-3">
                              <Col lg={2}>
                                <Button
                                  color="primary"
                                  className="btn btn-primary outlinebtn d-block"
                                >
                                  <i className="pi pi-plus me-1"></i>
                                  Add SMTP
                                </Button>
                              </Col>
                              <Col lg={10} className="m-0">
                                <InputText value={addsmtp} onChange={(e) => setAddsmtp(e.target.value)} className="w-full" />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <DataTable value={smtpAccounts} showGridlines tableStyle={{ minWidth: "50rem" }}>
                              <Column field="outgoingServer" header="Outgoing Server"></Column>
                              <Column field="port" header="Port"></Column>
                              <Column field="username" header="Username"></Column>
                              <Column field="password" header="Password"></Column>
                              <Column field="email" header="Email"></Column>
                              <Column field="address" header="Address"></Column>
                            </DataTable>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <div className="card p-4 pt-0 pb-4 mt-2">
                              <h6 className="mb-2 mt-4">SMTP Account</h6>
                              <Row>
                                <Col lg={9}>
                                  <div className="p-field mb-2">
                                    <label>Outgoing Server</label>
                                    <InputText
                                      id="outgoingServer"
                                      value={outgoingServer}
                                      onChange={(e) => setOutgoingServer(e.target.value)}
                                      placeholder="e.g., smtp.example.com"
                                      required
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="p-field mb-2">
                                    <label htmlFor="port">Port</label>
                                    <InputText
                                      id="port"
                                      value={port}
                                      onChange={(e) => setPort(e.target.value)}
                                      placeholder="Enter port number"
                                      type="number"
                                      className="w-full"
                                    />
                                  </div>
                                </Col>

                              </Row>
                              <Row>
                                <Col lg={6}>
                                  <div className="p-field mb-2">
                                    <label>Username</label>
                                    <InputText
                                      id="username"
                                      value={username}
                                      onChange={(e) => setUsername(e.target.value)}
                                      placeholder="SMTP username"
                                      required
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                                <Col lg={6}>
                                  <div className="p-field mb-2">
                                    <label>Password</label>
                                    <InputText
                                      id="password"
                                      type="password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      placeholder="SMTP password"
                                      required
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={6}>
                                  <div className="p-field mb-2">
                                    <label>From</label>
                                    <InputText
                                      id="fromEmail"
                                      value={fromEmail}
                                      onChange={(e) => setFromEmail(e.target.value)}
                                      placeholder="e.g., no-reply@example.com"
                                      required
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                                <Col lg={6}>
                                  <div className="p-field mb-2">
                                    <label>Email</label>
                                    <InputText
                                      id="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      placeholder="Enter your email"
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row className="d-flex align-items-end">
                                <Col lg={9}>
                                  <div className="p-field">
                                    <label htmlFor="address">Reply Address</label>
                                    <InputText
                                      id="address"
                                      value={address}
                                      onChange={(e) => setAddress(e.target.value)}
                                      placeholder="Enter address"
                                      className="w-full"
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="field-checkbox">
                                    <Checkbox
                                      onChange={(e) => setUseSSL(e.checked)}
                                      checked={useSSL}
                                    />
                                    <label htmlFor="useSSL" className="ml-2">
                                      Use SSL/TLS
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-center mt-3">

                                <Col md={12}>
                                  <div className="d-flex justify-content-end">
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-main me-2"
                                      onClick={handleCreate}
                                    >
                                      <i className="pi pi-check me-1"></i>Create
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <Row className="align-items-center mt-3">

                              <Col md={12}>
                                <div className="d-flex justify-content-end">
                                  <Toast ref={toast} />
                                  <Button type="submit" class="btn btn-success me-2" onClick={showMessageEmail}>  <i className="pi pi-save me-1"></i>Save</Button>
                                  <button type="button" class="btn btn-primary  cancel-outlinebtn" onClick={showCancelEmail}> <i className="pi pi-times me-1"></i>Cancel</button>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </TabPanel>


                      <TabPanel header="SMS Settings" leftIcon="pi pi-comment mr-2">
                        <Row>
                          <Col lg={8}>
                            <h6 className="mb-2 mt-3">
                              BANDWIDTH SMS(FOR INDIVIDUAL TEXTING)
                            </h6>
                            <div className="d-flex align-items-end">

                              <div className="p-field me-2">
                                <label htmlFor="areaCode">Area Code</label>
                                <InputText
                                  id="areaCode"
                                  value={areaCode}
                                  onChange={(e) => setAreaCode(e.target.value)}
                                  placeholder="Enter area code"
                                  maxLength={5}
                                  className="w-full"
                                />
                              </div>
                              <div>
                                <Button
                                  color="primary"
                                  className="btn btn-primary outlinebtn d-block"
                                >
                                  <i className="pi pi-search me-1"></i>
                                  Search
                                </Button>
                              </div>

                            </div>
                            <p className="mt-2">Please, search for area code to view available numbers.</p>
                          </Col>

                        </Row>

                        <Row>
                          <Col lg={8}>
                            <h6 className="mb-2 mt-4">
                              SWIFT SMS(FOR MASS TEXTING)
                            </h6>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6}>
                            <div className="field">
                              <label htmlFor="accountKey">Account Key</label>
                              <InputText
                                id="accountKey"
                                type="password"
                                value={accountKey}
                                onChange={(e) => setAccountKey(e.target.value)}
                                placeholder="Enter your account key"
                                className="w-full"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="field">
                              <label htmlFor="phoneNumber">Senders Phone Number</label>
                              <InputText
                                id="phoneNumber"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="align-items-center mt-3">

                          <Col md={12}>
                            <div className="d-flex justify-content-end">
                              <Toast ref={toast} />
                              <button type="submit" class="btn btn-success me-2" onClick={showMessagesms}>  <i className="pi pi-save me-1"></i>Save</button>
                              <button type="button" class="btn btn-primary  cancel-outlinebtn" onClick={showCancelsms}> <i className="pi pi-times me-1"></i>Cancel</button>
                            </div>
                          </Col>
                        </Row>
                      </TabPanel>


                      <TabPanel header="Email Signature" leftIcon="pi pi-signature mr-2">
                        <Row>
                          <Col lg={10}>
                            <div className="p-field me-2 mb-2">
                              <label className="mb-2 mt-3">Select Signature to edit</label>
                              <Dropdown
                                value={selectedSignature}
                                options={signatureOptions}
                                onChange={(e) => handleSelectSignature(e.value)}
                                placeholder="Select a signature"
                                className="w-full bgclr"
                                disabled={!isAnySignatureAdded}
                              />
                            </div>
                            <div className="d-flex">
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block me-2"
                                disabled={!isAnySignatureAdded}
                                onClick={handleDeleteSignature}
                              >
                                Delete
                              </Button>
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block me-2"
                                onClick={() => setNewSignatureVisible(true)}
                              >
                                New
                              </Button>
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block me-2"
                                disabled={!isSignatureSaveEnabled}
                                onClick={handleSaveSignature}
                              >
                                Save
                              </Button>
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block"
                                disabled={!isAnySignatureAdded}
                                onClick={() => {
                                  setRenameSignatureValue(selectedSignature);
                                  setRenameSignatureVisible(true);
                                }}
                              >
                                Rename
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={10}>
                            <label className="mb-2 mt-4">Edit Signature</label>
                            <Editor
                              value={signatureContent}
                              onTextChange={handleSignatureEditorChange}
                              style={{ height: '360px' }}
                              headerTemplate={signatureHeader}
                            />
                          </Col>
                        </Row>

                        {/* New Signature Dialog */}
                        <Dialog
                          header="New Signature"
                          visible={isNewSignatureVisible}
                          onHide={() => setNewSignatureVisible(false)}
                          style={{ width: '30vw' }}
                          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                        >
                          <div className="p-field mb-2">
                            <label>Type a name for this signature:</label>
                            <InputText
                              id="newSignatureName"
                              value={newSignatureName}
                              onChange={(e) => setNewSignatureName(e.target.value)}
                              placeholder="Signature Name"
                              className="w-full"
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button
                              label="Ok"
                              icon="pi pi-check"
                              className="btn btn-primary me-2 btn-main"
                              onClick={handleAddSignature}
                            />
                          </div>
                        </Dialog>

                        {/* Rename Signature Dialog */}
                        <Dialog
                          header="Rename Signature"
                          visible={isRenameSignatureVisible}
                          onHide={() => setRenameSignatureVisible(false)}
                          style={{ width: '30vw' }}
                          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                        >
                          <div className="p-field mb-2">
                            <label>Enter a new name for the signature:</label>
                            <InputText
                              id="renameSignature"
                              value={renameSignatureValue}
                              onChange={(e) => setRenameSignatureValue(e.target.value)}
                              placeholder="New Signature Name"
                              className="w-full"
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button
                              label="Ok"
                              icon="pi pi-check"
                              className="btn btn-primary me-2 btn-main"
                              onClick={handleRenameSignature}
                            />
                          </div>
                        </Dialog>
                      </TabPanel>

                      <TabPanel header="Email Template" leftIcon="pi pi-envelope mr-2">
                        <Row>
                          <Col lg={12}>
                            <div className="p-field me-2 mb-2">
                              <label className="mb-2 mt-3">Select Template to edit</label>
                              <Dropdown
                                value={selectedTemplate}
                                options={templateOptions}
                                onChange={(e) => handleSelectTemplate(e.value)}
                                placeholder="Select a template"
                                className="w-full"
                                disabled={!isAnyTemplateAdded}
                              />
                            </div>
                            <div className="d-flex">
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block me-2"
                                disabled={!isAnyTemplateAdded}
                                onClick={handleDeleteTemplate}
                              >
                                Delete
                              </Button>
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block me-2"
                                onClick={() => setNewTemplateVisible(true)}
                              >
                                New
                              </Button>
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block me-2"
                                disabled={!isTemplateSaveEnabled}
                                onClick={handleSaveTemplate}
                              >
                                Save
                              </Button>
                              <Button
                                color="primary"
                                className="btn btn-primary emailbtn d-block"
                                disabled={!isAnyTemplateAdded}
                                onClick={() => {
                                  setRenameTemplateValue(selectedTemplate);
                                  setRenameTemplateVisible(true);
                                }}
                              >
                                Rename
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={12}>
                            <label className="mb-2 mt-4">Edit Template</label>
                            <Editor
                              value={templateContent}
                              onTextChange={handleTemplateEditorChange}
                              style={{ height: '360px' }}
                              headerTemplate={templateHeader}
                            />
                          </Col>
                        </Row>

                        {/* New Template Dialog */}
                        <Dialog
                          header="New Template"
                          visible={isNewTemplateVisible}
                          onHide={() => setNewTemplateVisible(false)}
                          style={{ width: '30vw' }}
                          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                        >
                          <div className="p-field mb-2">
                            <label>Type a name for this template:</label>
                            <InputText
                              id="newTemplateName"
                              value={newTemplateName}
                              onChange={(e) => setNewTemplateName(e.target.value)}
                              placeholder="Template Name"
                              className="w-full"
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button
                              label="Ok"
                              icon="pi pi-check"
                              className="btn btn-primary me-2 btn-main"
                              onClick={handleAddTemplate}
                            />
                          </div>
                        </Dialog>

                        {/* Rename Template Dialog */}
                        <Dialog
                          header="Rename Template"
                          visible={isRenameTemplateVisible}
                          onHide={() => setRenameTemplateVisible(false)}
                          style={{ width: '30vw' }}
                          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                        >
                          <div className="p-field mb-2">
                            <label>Enter a new name for the template:</label>
                            <InputText
                              id="renameTemplate"
                              value={renameTemplateValue}
                              onChange={(e) => setRenameTemplateValue(e.target.value)}
                              placeholder="New Template Name"
                              className="w-full"
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button
                              label="Ok"
                              icon="pi pi-check"
                              className="btn btn-primary me-2 btn-main"
                              onClick={handleRenameTemplate}
                            />
                          </div>
                        </Dialog>
                      </TabPanel>

                    </TabView>
                  </div>

                </Dialog>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  );
};



export default ProfileMenu;
