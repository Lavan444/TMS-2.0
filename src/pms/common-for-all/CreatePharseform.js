import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
// PrimeReact CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// Custom Styles
import '../../styles/custom.css';
import WorkType from './WorkType';

const CreatePharseform = ({ visible = false, onHide = () => { }, onProjectCreated = () => { } }) => {
  const [showAllProjectFields, setShowAllProjectFields] = useState(false);
  const [showAllWorkItemFields, setShowAllWorkItemFields] = useState(false);
  const [showAIWriter, setShowAIWriter] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [workItems, setWorkItems] = useState([{}]);
  const [projectFiles, setProjectFiles] = useState([]);
  const [addMoreWorkItems, setAddMoreWorkItems] = useState(false);
  const toast = React.useRef(null);

  // Wizard State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [isProjectDetailsComplete, setIsProjectDetailsComplete] = useState(false);
  const [isWorkTypeComplete, setIsWorkTypeComplete] = useState(false);
  const [projectDetailsSaved, setProjectDetailsSaved] = useState(false);
  const [isProjectDetailsExpanded, setIsProjectDetailsExpanded] = useState(true);
  const [isWorkTypeExpanded, setIsWorkTypeExpanded] = useState(false);

  // Wizard step configuration
  const wizardSteps = [
    { id: 1, label: 'Project Details', icon: 'pi pi-file' },
    { id: 2, label: 'Work Type Details', icon: 'pi pi-check-circle', description: 'Define tasks and deliverables' },
    { id: 3, label: 'Review & Submit', icon: 'pi pi-flag-fill', description: 'Review and create project' }
  ];

  const [projectData, setProjectData] = useState({
    projectName: 'New Project Initiative',
    company: '',
    projectManager: '',
    startDate: null,
    endDate: null,
    projectDescription: ''
  });

  // Dropdown options
  const projectOptions = [
    { label: 'Select project...', value: '' },
    { label: 'Main Project', value: 'main-project' },
    { label: 'Sub Project A', value: 'sub-project-a' },
    { label: 'Sub Project B', value: 'sub-project-b' },
    { label: 'Phase 1', value: 'phase-1' },
    { label: 'Phase 2', value: 'phase-2' }
  ];
  const moduleOptions = [
    { label: 'Select module...', value: '' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Database', value: 'database' },
    { label: 'API', value: 'api' },
    { label: 'UI/UX', value: 'ui-ux' },
    { label: 'Testing', value: 'testing' },
    { label: 'Deployment', value: 'deployment' },
    { label: 'Documentation', value: 'documentation' }
  ];
  const assigneeOptions = [
    { label: 'Select assignee...', value: '' },
    { label: 'John Doe', value: 'john-doe' },
    { label: 'Jane Smith', value: 'jane-smith' },
    { label: 'Mike Johnson', value: 'mike-johnson' },
    { label: 'Sarah Wilson', value: 'sarah-wilson' },
    { label: 'David Brown', value: 'david-brown' },
    { label: 'Unassigned', value: 'unassigned' }
  ];
  const watcherOptions = [
    { label: 'Select watcher...', value: '' },
    { label: 'Project Manager', value: 'project-manager' },
    { label: 'Team Lead', value: 'team-lead' },
    { label: 'Stakeholder 1', value: 'stakeholder-1' },
    { label: 'Stakeholder 2', value: 'stakeholder-2' },
    { label: 'Quality Assurance', value: 'quality-assurance' },
    { label: 'Client', value: 'client' }
  ];
  const workTypeOptions = [
    { label: 'Select work type...', value: '' },
    { label: 'Task', value: 'task' },
    { label: 'User Story', value: 'story' },
    { label: 'Bug Fix', value: 'bug' },
    { label: 'Epic', value: 'epic' },
    { label: 'Feature', value: 'feature' },
    { label: 'Research', value: 'research' }
  ];
  const statusOptions = [
    { label: 'Select status...', value: '' },
    { label: 'Not Started', value: 'not-started' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'In Review', value: 'review' },
    { label: 'Testing', value: 'testing' },
    { label: 'Completed', value: 'completed' },
    { label: 'Blocked', value: 'blocked' }
  ];

  // Company dropdown options
  const companyOptions = [
    { label: 'Select company...', value: '' },
    { label: 'Acme Corporation', value: 'acme-corp' },
    { label: 'TechSolutions Inc.', value: 'techsolutions-inc' },
    { label: 'Global Industries', value: 'global-industries' },
    { label: 'Innovative Systems', value: 'innovative-systems' },
    { label: 'Digital Dynamics', value: 'digital-dynamics' },
    { label: 'Future Enterprises', value: 'future-enterprises' },
    { label: 'Other', value: 'other' }
  ];

  // Project Manager dropdown options
  const projectManagerOptions = [
    { label: 'Select project manager...', value: '' },
    { label: 'John Smith', value: 'john-smith' },
    { label: 'Sarah Johnson', value: 'sarah-johnson' },
    { label: 'Michael Chen', value: 'michael-chen' },
    { label: 'Emily Davis', value: 'emily-davis' },
    { label: 'Robert Wilson', value: 'robert-wilson' },
    { label: 'Lisa Anderson', value: 'lisa-anderson' },
    { label: 'David Thompson', value: 'david-thompson' },
    { label: 'Assign Later', value: 'assign-later' }
  ];

  const generateAIDescription = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = `This is a comprehensive project focused on ${aiPrompt}. The project aims to deliver high-quality solutions that meet business objectives and stakeholder requirements. Key deliverables include strategic planning, implementation phases, and thorough testing to ensure optimal results. The scope encompasses all necessary activities to achieve project success within the defined timeline and budget constraints.`;
      handleProjectInputChange('projectDescription', response.trim());
      setShowAIWriter(false);
      setAiPrompt('');
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'AI description generated successfully!' });
    } catch (error) {
      console.error('Error generating AI description:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error generating description. Please try again.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProjectInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkItemChange = (index, field, value) => {
    const updatedWorkItems = [...workItems];
    updatedWorkItems[index] = {
      ...updatedWorkItems[index],
      [field]: value
    };
    setWorkItems(updatedWorkItems);
  };

  const onProjectFileUpload = (event) => {
    const files = event.files;
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setProjectFiles(prev => [...prev, ...newFiles]);
    toast.current.show({ severity: 'info', summary: 'Files Uploaded', detail: `${files.length} file(s) uploaded successfully` });
  };

  const onWorkItemFileUpload = (index, event) => {
    const files = event.files;
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    const updatedWorkItems = [...workItems];
    updatedWorkItems[index] = {
      ...updatedWorkItems[index],
      files: [...(updatedWorkItems[index].files || []), ...newFiles]
    };
    setWorkItems(updatedWorkItems);
    toast.current.show({ severity: 'info', summary: 'Files Uploaded', detail: `${files.length} file(s) uploaded for work item ${index + 1}` });
  };

  const removeProjectFile = (fileId) => {
    setProjectFiles(prev => prev.filter(file => file.id !== fileId));
    toast.current.show({ severity: 'warn', summary: 'File Removed', detail: 'Project file removed successfully' });
  };

  const removeWorkItemFile = (workItemIndex, fileId) => {
    const updatedWorkItems = [...workItems];
    updatedWorkItems[workItemIndex].files = updatedWorkItems[workItemIndex].files.filter(file => file.id !== fileId);
    setWorkItems(updatedWorkItems);
    toast.current.show({ severity: 'warn', summary: 'File Removed', detail: 'Work item file removed successfully' });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addWorkItem = () => {
    setWorkItems([...workItems, {}]);
    toast.current.show({ severity: 'success', summary: 'Work Item Added', detail: 'New work item added successfully' });
  };

  const removeWorkItem = (index) => {
    if (workItems.length > 1) {
      confirmDialog({
        message: 'Are you sure you want to remove this work item?',
        header: 'Confirm Removal',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const updatedWorkItems = workItems.filter((_, i) => i !== index);
          setWorkItems(updatedWorkItems);
          toast.current.show({ severity: 'warn', summary: 'Work Item Removed', detail: 'Work item removed successfully' });
        }
      });
    }
  };

  const validateProjectDetails = () => {
    if (!projectData.projectName.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Error', detail: 'Project Name is required!' });
      return false;
    }
    return true;
  };

  const isProjectDetailsValid = () => {
    return projectData.projectName.trim().length > 0;
  };

  const validateWorkTypeDetails = () => {
    const firstWorkItem = workItems[0];
    if (!firstWorkItem?.workType?.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Error', detail: 'Work Type is required!' });
      return false;
    }
    if (!firstWorkItem?.summary?.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Error', detail: 'Summary is required!' });
      return false;
    }
    if (showAllWorkItemFields) {
      for (let i = 1; i < workItems.length; i++) {
        const workItem = workItems[i];
        if (!workItem.workType?.trim()) {
          toast.current.show({ severity: 'error', summary: 'Validation Error', detail: `Work Item ${i + 1}: Work Type is required!` });
          return false;
        }
        if (!workItem.summary?.trim()) {
          toast.current.show({ severity: 'error', summary: 'Validation Error', detail: `Work Item ${i + 1}: Summary is required!` });
          return false;
        }
      }
    }
    return true;
  };

  const isWorkTypeDetailsValid = () => {
    const firstWorkItem = workItems[0];
    if (!firstWorkItem?.workType?.trim() || !firstWorkItem?.summary?.trim()) {
      return false;
    }
    if (showAllWorkItemFields) {
      for (let i = 1; i < workItems.length; i++) {
        const workItem = workItems[i];
        if (!workItem.workType?.trim() || !workItem.summary?.trim()) {
          return false;
        }
      }
    }
    return true;
  };

  const saveProjectDetails = () => {
    setProjectDetailsSaved(true);
    setIsProjectDetailsComplete(true);
    toast.current.show({
      severity: 'success',
      summary: 'Project Details Saved',
      detail: 'Project details have been saved successfully',
      life: 2000
    });
  };

  const saveWorkTypeDetails = () => {
    setIsWorkTypeComplete(true);
    toast.current.show({
      severity: 'success',
      summary: 'Work Type Details Saved',
      detail: 'Work type details have been saved successfully',
      life: 2000
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateProjectDetails()) return;
      saveProjectDetails();
      setIsProjectDetailsExpanded(false);
      setIsWorkTypeExpanded(true);
      setCurrentStep(2);

      // Smooth scroll to Work Type section after render
      setTimeout(() => {
        const workTypeSection = document.querySelector('[data-section="work-type-details"]');
        if (workTypeSection) {
          workTypeSection.classList.add('scroll-highlight');
          workTypeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => workTypeSection.classList.remove('scroll-highlight'), 1500);
        }
      }, 300);
    } else if (currentStep === 2) {
      if (!validateWorkTypeDetails()) return;
      saveWorkTypeDetails();
      setIsWorkTypeExpanded(false);
      setCurrentStep(3);

      setTimeout(() => {
        const reviewSection = document.querySelector('[data-section="review-submit"]');
        if (reviewSection) {
          reviewSection.classList.add('scroll-highlight');
          reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => reviewSection.classList.remove('scroll-highlight'), 1500);
        }
      }, 300);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setIsProjectDetailsExpanded(true);
      setIsWorkTypeExpanded(false);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setIsWorkTypeExpanded(true);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setIsProjectDetailsComplete(false);
    setIsWorkTypeComplete(false);
    setProjectDetailsSaved(false);
    setIsProjectDetailsExpanded(true);
    setIsWorkTypeExpanded(false);
    setShowAllProjectFields(false);
    setShowAllWorkItemFields(false);
    setAddMoreWorkItems(false);
  };

  const handleSubmit = () => {
    if (!validateProjectDetails() || !validateWorkTypeDetails()) return;

    console.log('Project Data:', projectData);
    console.log('Project Files:', projectFiles);
    console.log('Work Items:', workItems);

    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Project created successfully! Check console for data.' });
    onProjectCreated();

    setTimeout(() => {
      resetWizard();
      onHide();
    }, 1500);
  };

  const handleModalHide = () => {
    resetWizard();
    onHide();
  };

  const projectFieldsHeader = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-3">
        <div>
          <h3 className="m-0 text-lg font-semibold flex align-items-center gap-2">
            Project Details
            {isProjectDetailsComplete && <i className="pi pi-check-circle text-green-500"></i>}
          </h3>
          <p className="m-0" style={{ fontWeight: 'normal' }}>Basic information about your project</p>
        </div>
      </div>
    </div>
  );

  const workItemsHeader = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-3">
        <div>
          <h3 className="m-0 text-lg font-semibold flex align-items-center gap-2">
            Work Type Details
            {isWorkTypeComplete && <i className="pi pi-check-circle text-green-500"></i>}
          </h3>
          <p className="m-0" style={{ fontWeight: 'normal' }}>Define tasks and deliverables for your project</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog
        header={
          <div className="flex align-items-center gap-3 create-projectwizard">
            <i className="pi pi-briefcase text-xl text-white"></i>
            <div>
              <h1 className="text-lg m-0">Parse Document</h1>
            </div>
          </div>
        }
        visible={visible}
        onHide={handleModalHide}
        style={{ width: '60vw', maxWidth: '100%', maxHeight: '100%' }}
        contentStyle={{ height: '65vh', overflow: 'auto' }}
        maximizable
        modal
        draggable={false}
        resizable={false}
        className="create-project-dialog"
        blockScroll={true}
      >
        <div className="p-2">
          {/* Wizard Progress Indicator */}
          <div className="flex align-items-center justify-content-center mb-2 px-4">
            <div className="flex align-items-center w-full max-w-600 wizard-step-indicator">
              {wizardSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-column align-items-center">
                    <div className={`w-2rem h-2rem border-circle flex align-items-center justify-content-center font-semibold text-sm transition-all transition-duration-300 ${
                      step.id < currentStep || (step.id === 1 && isProjectDetailsComplete) || (step.id === 2 && isWorkTypeComplete)
                        ? 'bg-green-100 text-green-600 border-2 border-green-300 wizard-step-completed'
                        : step.id === currentStep
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-300 shadow-2 wizard-step-active'
                        : 'bg-gray-100 text-gray-500 border-2 border-gray-300'
                    }`}>
                      {(step.id === 1 && isProjectDetailsComplete) || (step.id === 2 && isWorkTypeComplete) || step.id < currentStep
                        ? <i className="pi pi-check"></i>
                        : <i className={step.icon}></i>
                      }
                    </div>
                    <p className="text-xs text-center mt-2 font-medium" style={{ minWidth: '80px' }}>
                      {step.label}
                    </p>
                  </div>
                  {index < wizardSteps.length - 1 && (
                    <div className={`flex-1 wizard-progress-line mx-3 transition-all transition-duration-300 ${
                      step.id < currentStep || (step.id === 1 && isProjectDetailsComplete)
                        ? 'bg-green-300'
                        : 'bg-gray-300'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Project Details Section */}
          <Panel
            header={projectFieldsHeader}
            className="mb-4"
            toggleable
            collapsed={!isProjectDetailsExpanded}
            onToggle={(e) => setIsProjectDetailsExpanded(!e.value)}
          >
            <div className="grid">
              {/* Project Name - Always visible and REQUIRED */}
              <div className="col-12">
                <label className="block text-sm font-medium text-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <InputText
                  value={projectData.projectName}
                  onChange={(e) => handleProjectInputChange('projectName', e.target.value)}
                  className={`w-full ${projectData.projectName.trim() ? 'p-inputtext-success' : ''}`}
                  placeholder="Enter project name..."
                />
              </div>

              {/* Next Button - Only shown when required fields are completed */}
              {currentStep === 1 && isProjectDetailsValid() && (
                <div className="col-12 mt-2">
                  <div className="flex justify-content-between align-items-center">
                    <div className="flex align-items-center gap-2 text-600">
                      <i className="pi pi-check-circle text-green-500"></i>
                      <span className="text-sm">All required fields completed! Ready to proceed or add more details.</span>
                    </div>
                    <div className="flex align-items-center gap-2">
                      <Button
                        label={showAllProjectFields ? 'Show Less' : 'Add More'}
                        icon={showAllProjectFields ? 'pi pi-chevron-up' : 'pi pi-chevron-down'}
                        onClick={() => setShowAllProjectFields(!showAllProjectFields)}
                        className="p-button but-rad"
                      />
                      <Button
                        label="Submit & Next"
                        icon="pi pi-arrow-right"
                        iconPos="right"
                        onClick={handleNextStep}
                        className="p-button but-rad"
                        style={{ minWidth: '120px' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Helper message when required fields are not completed */}
              {currentStep === 1 && !isProjectDetailsValid() && (
                <div className="col-12 mt-6">
                  <div className="flex align-items-center gap-2 text-orange-600 bg-orange-50 border-1 border-orange-200 border-round p-3 validation-message">
                    <i className="pi pi-exclamation-triangle"></i>
                    <span className="text-sm">Please complete the required Project Name field to continue.</span>
                  </div>
                </div>
              )}

              {/* Additional fields shown when "Add More" is clicked */}
              {showAllProjectFields && (
                <>
                  <div className="col-6 md:col-6 mt-2">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-building"></i>
                      Company
                    </label>
                    <Dropdown
                      value={projectData.company}
                      onChange={(e) => handleProjectInputChange('company', e.value)}
                      options={companyOptions}
                      className="w-full bgclr"
                      placeholder="Select company..."
                    />
                  </div>
                  <div className="col-6 md:col-6 mt-2">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-user"></i>
                      Project Manager
                    </label>
                    <Dropdown
                      value={projectData.projectManager}
                      onChange={(e) => handleProjectInputChange('projectManager', e.value)}
                      options={projectManagerOptions}
                      className="w-full bgclr"
                      placeholder="Select project manager..."
                    />
                  </div>
                  <div className="col-6 md:col-6 mt-2">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-calendar"></i>
                      Start Date
                    </label>
                    <Calendar
                      value={projectData.startDate}
                      onChange={(e) => handleProjectInputChange('startDate', e.value)}
                      className="w-full"
                      placeholder="Select start date"
                      dateFormat="mm/dd/yy"
                    />
                  </div>
                  <div className="col-6 md:col-6 mt-2">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-calendar"></i>
                      End Date
                    </label>
                    <Calendar
                      value={projectData.endDate}
                      onChange={(e) => handleProjectInputChange('endDate', e.value)}
                      className="w-full"
                      placeholder="Select end date"
                      dateFormat="mm/dd/yy"
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <div className="flex align-items-center justify-content-between mb-2">
                      <label className="block text-sm font-medium text-700">
                        Project Description
                      </label>
                      <Button
                        label="Write with AI"
                        icon="pi pi-sparkles"
                        onClick={() => setShowAIWriter(!showAIWriter)}
                        className="p-button but-rad"
                      />
                    </div>
                    {showAIWriter && (
                      <div className="mb-2 p-4 bg-purple-50 border-1 border-purple-200 border-round">
                        <div className="flex gap-2">
                          <InputText
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Describe your project briefly (e.g., 'e-commerce website for clothing store')"
                            className="flex-1"
                            onKeyPress={(e) => e.key === 'Enter' && generateAIDescription()}
                          />
                          <Button
                            label={isGenerating ? 'Generating...' : 'Generate'}
                            icon={isGenerating ? null : 'pi pi-sparkles'}
                            onClick={generateAIDescription}
                            disabled={isGenerating || !aiPrompt.trim()}
                            className="p-button but-rad"
                          >
                            {isGenerating && <ProgressSpinner style={{ width: '16px', height: '16px' }} className="mr-2" />}
                          </Button>
                        </div>
                      </div>
                    )}
                    <InputTextarea
                      rows={4}
                      value={projectData.projectDescription}
                      onChange={(e) => handleProjectInputChange('projectDescription', e.target.value)}
                      className="w-full"
                      placeholder="Describe the project scope and objectives..."
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-upload"></i>
                      Project Files
                    </label>
                    <FileUpload
                      mode="basic"
                      multiple
                      accept="*/*"
                      maxFileSize={10000000}
                      onUpload={onProjectFileUpload}
                      auto
                      chooseLabel="Upload Project Files"
                      className="w-full bgclr"
                    />
                    {projectFiles.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-700 mb-2">Uploaded Files:</p>
                        <div className="flex flex-wrap gap-2">
                          {projectFiles.map((file) => (
                            <Tag
                              key={file.id}
                              value={`${file.name} (${formatFileSize(file.size)})`}
                              icon="pi pi-file"
                              severity="info"
                              className="cursor-pointer"
                              onClick={() => removeProjectFile(file.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {isProjectDetailsValid() && (
                    <div className="col-12 mt-3">
                      <div className="flex justify-content-between align-items-center">
                        <Button
                          label={showAllProjectFields ? 'Show Less' : 'Add More'}
                          icon={showAllProjectFields ? 'pi pi-chevron-up' : 'pi pi-chevron-down'}
                          onClick={() => setShowAllProjectFields(!showAllProjectFields)}
                          className="p-button but-rad"
                        />
                        <Button
                          label="Next - Continue to Work Type Details"
                          icon="pi pi-arrow-right"
                          iconPos="right"
                          onClick={handleNextStep}
                          className="p-button but-rad"
                          style={{ minWidth: '280px' }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Panel>

          {/* Work Item Details Section - Only rendered after clicking "Submit & Next" */}
          {currentStep >= 2 && (
            <Panel
              header={workItemsHeader}
              className="mb-4"
              toggleable
              collapsed={!isWorkTypeExpanded}
              onToggle={(e) => setIsWorkTypeExpanded(!e.value)}
              data-section="work-type-details"
            >
              <div className="grid">
                {/* Work Type - Always visible and REQUIRED */}
                <div className="col-6 md:col-6 mt-0">
                  <label className="block text-sm font-medium text-700 mb-2">
                    Work Type <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    value={workItems[0]?.workType || ''}
                    onChange={(e) => handleWorkItemChange(0, 'workType', e.value)}
                    options={workTypeOptions}
                    className={`w-full ${workItems[0]?.workType?.trim() ? 'p-inputtext-success' : ''} bgclr`}
                    placeholder="Select work type..."
                  />
                </div>

                {/* Summary - Always visible and REQUIRED */}
                <div className="col-12 mt-0">
                  <label className="block text-sm font-medium text-700 mb-2">
                    Summary <span className="text-red-500">*</span>
                  </label>
                  <InputTextarea
                    rows={2}
                    value={workItems[0]?.summary || ''}
                    onChange={(e) => handleWorkItemChange(0, 'summary', e.target.value)}
                    className={`w-full ${workItems[0]?.summary?.trim() ? 'p-inputtext-success' : ''}`}
                    placeholder="Brief summary of the work type..."
                  />
                </div>

                {/* Next Button - Only shown when required fields are completed */}
                {currentStep === 2 && isWorkTypeDetailsValid() && (
                  <div className="col-12 mt-2">
                    <div className="flex justify-content-between align-items-center">
                      <div className="flex align-items-center gap-2 text-600">
                        <i className="pi pi-check-circle text-green-500"></i>
                        <span className="text-sm">All required fields completed! Ready to proceed or add more details.</span>
                      </div>
                      <div className="flex align-items-center gap-2">
                        <Button
                          label={showAllWorkItemFields ? 'Show Less' : 'Add More'}
                          icon={showAllWorkItemFields ? 'pi pi-chevron-up' : 'pi pi-chevron-down'}
                          onClick={() => setShowAllWorkItemFields(!showAllWorkItemFields)}
                          className="p-button but-rad"
                        />
                        <Button
                          label="Next"
                          icon="pi pi-arrow-right"
                          iconPos="right"
                          onClick={handleNextStep}
                          className="p-button but-rad"
                          style={{ minWidth: '120px' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Helper message when required fields are not completed */}
                {currentStep === 2 && !isWorkTypeDetailsValid() && (
                  <div className="col-12 mt-3">
                    <div className="flex align-items-center gap-2 text-orange-600 bg-orange-50 border-1 border-orange-200 border-round p-3 validation-message">
                      <i className="pi pi-exclamation-triangle"></i>
                      <span className="text-sm">Please complete the required Work Type and Summary fields to continue.</span>
                    </div>
                  </div>
                )}

                {/* Additional fields shown when "Add More" is clicked */}
                {showAllWorkItemFields && (
                  <>
                    <div className="col-12 mt-2">
                      <label className="block text-sm font-medium text-700 mb-2">
                        Description
                      </label>
                      <InputTextarea
                        rows={3}
                        value={workItems[0]?.description || ''}
                        onChange={(e) => handleWorkItemChange(0, 'description', e.target.value)}
                        className="w-full"
                        placeholder="Detailed description of the work item..."
                      />
                    </div>
                    <div className="col-6 md:col-6 mt-1">
                      <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                        <i className="pi pi-user"></i>
                        Assigned To
                      </label>
                      <Dropdown
                        value={workItems[0]?.assignedTo || ''}
                        onChange={(e) => handleWorkItemChange(0, 'assignedTo', e.value)}
                        options={assigneeOptions}
                        className="w-full bgclr"
                        placeholder="Select assignee..."
                      />
                    </div>
                    <div className="col-6 md:col-6 mt-1">
                      <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                        <i className="pi pi-clock"></i>
                        Work Hours
                      </label>
                      <InputNumber
                        value={workItems[0]?.workHours || 0}
                        onValueChange={(e) => handleWorkItemChange(0, 'workHours', e.value)}
                        className="w-full"
                        min={0}
                        step={0.5}
                        placeholder="0"
                        suffix=" hours"
                      />
                    </div>
                    <div className="col-6 md:col-6 mt-1">
                      <label className="block text-sm font-medium text-700 mb-2">Work Type Status</label>
                      <Dropdown
                        value={workItems[0]?.status || ''}
                        onChange={(e) => handleWorkItemChange(0, 'status', e.value)}
                        options={statusOptions}
                        className="w-full bgclr"
                        placeholder="Select status..."
                      />
                    </div>

                    <div className="col-12 mt-1">
                      <Divider align="center">
                        <span className="text-600 font-medium">Additional Work Items</span>
                      </Divider>
                      <div className="bg-blue-50 border-1 border-blue-200 border-round p-4 mt-3">
                        <div className="flex align-items-center gap-3">
                          <Checkbox
                            inputId="addMoreWorkItems"
                            checked={addMoreWorkItems}
                            onChange={(e) => {
                              setAddMoreWorkItems(e.checked);
                              if (e.checked && workItems.length === 1) {
                                addWorkItem();
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="addMoreWorkItems" className="text-sm font-medium cursor-pointer flex align-items-center gap-2">
                            <i className="pi pi-plus-circle text-blue-600"></i>
                            Add More Work Items to Project
                          </label>
                        </div>
                        <small className="text-600 ml-7 block mt-1">
                          Check this to add additional work items to your project. Each work item can have its own timeline, assignee, and requirements.
                        </small>
                      </div>
                    </div>

                    {addMoreWorkItems && workItems.length > 1 && (
                      <>
                        {workItems.slice(1).map((workItem, index) => (
                          <div key={index + 1} className="col-12 mt-4">
                            <Card className="border-1 border-200">
                              <div className="flex justify-content-between align-items-center mb-4">
                                <div className="flex align-items-center gap-2">
                                  <div className="w-2rem h-2rem bg-blue-100 text-blue-600 border-circle flex align-items-center justify-content-center font-semibold text-sm">
                                    {index + 2}
                                  </div>
                                  <h4 className="m-0 font-medium">Work Item {index + 2}</h4>
                                </div>
                                <Button
                                  icon="pi pi-times"
                                  onClick={() => removeWorkItem(index + 1)}
                                  className="p-button but-rad"
                                  tooltip="Remove work item"
                                />
                              </div>
                              <div className="grid">
                                <div className="col-12">
                                  <label className="block text-sm font-medium text-700 mb-2">
                                    Work Type <span className="text-red-500">*</span>
                                  </label>
                                  <Dropdown
                                    value={workItem.workType || ''}
                                    onChange={(e) => handleWorkItemChange(index + 1, 'workType', e.value)}
                                    options={workTypeOptions}
                                    className={`w-full ${workItem.workType?.trim() ? 'p-inputtext-success' : ''}`}
                                    placeholder="Select work type..."
                                  />
                                  <small className="text-500">Category or type of work to be performed. (Required)</small>
                                </div>
                                <div className="col-12 mt-3">
                                  <label className="block text-sm font-medium text-700 mb-2">
                                    Summary <span className="text-red-500">*</span>
                                  </label>
                                  <InputTextarea
                                    rows={2}
                                    value={workItem.summary || ''}
                                    onChange={(e) => handleWorkItemChange(index + 1, 'summary', e.target.value)}
                                    className={`w-full ${workItem.summary?.trim() ? 'p-inputtext-success' : ''}`}
                                    placeholder="Brief summary of the work type..."
                                  />
                                  <small className="text-500">Concise overview of what this work type entails. (Required)</small>
                                </div>
                                <div className="col-12 mt-3">
                                  <label className="block text-sm font-medium text-700 mb-2">
                                    Description
                                  </label>
                                  <InputTextarea
                                    rows={3}
                                    value={workItem.description || ''}
                                    onChange={(e) => handleWorkItemChange(index + 1, 'description', e.target.value)}
                                    className="w-full"
                                    placeholder="Detailed description of the work item..."
                                  />
                                  <small className="text-500">Provide a detailed description of what this work item involves.</small>
                                </div>
                                <div className="col-12 md:col-6 mt-3">
                                  <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                                    <i className="pi pi-user"></i>
                                    Assigned To
                                  </label>
                                  <Dropdown
                                    value={workItem.assignedTo || ''}
                                    onChange={(e) => handleWorkItemChange(index + 1, 'assignedTo', e.value)}
                                    options={assigneeOptions}
                                    className="w-full"
                                    placeholder="Select assignee..."
                                  />
                                  <small className="text-500">Team member responsible for completing this work.</small>
                                </div>
                                <div className="col-12 md:col-6 mt-3">
                                  <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                                    <i className="pi pi-clock"></i>
                                    Work Hours
                                  </label>
                                  <InputNumber
                                    value={workItem.workHours || 0}
                                    onValueChange={(e) => handleWorkItemChange(index + 1, 'workHours', e.value)}
                                    className="w-full"
                                    min={0}
                                    step={0.5}
                                    placeholder="0"
                                    suffix=" hours"
                                  />
                                  <small className="text-500">Estimated time required to complete this work type.</small>
                                </div>
                                <div className="col-12 mt-3">
                                  <label className="block text-sm font-medium text-700 mb-2">Work Type Status</label>
                                  <Dropdown
                                    value={workItem.status || ''}
                                    onChange={(e) => handleWorkItemChange(index + 1, 'status', e.value)}
                                    options={statusOptions}
                                    className="w-full"
                                    placeholder="Select status..."
                                  />
                                  <small className="text-500">Current progress status of this work type.</small>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))}
                      </>
                    )}

                    {addMoreWorkItems && (
                      <div className="col-12 mt-4">
                        <Button
                          label="Add Another Work Item"
                          icon="pi pi-plus"
                          onClick={addWorkItem}
                          className="w-full p-button but-rad"
                          tooltip="Add one more work item to this project"
                        />
                      </div>
                    )}

                    {isWorkTypeDetailsValid() && (
                      <div className="col-12 mt-6">
                        <div className="flex justify-content-between align-items-center">
                          <Button
                            label={showAllWorkItemFields ? 'Show Less' : 'Add More'}
                            icon={showAllWorkItemFields ? 'pi pi-chevron-up' : 'pi pi-chevron-down'}
                            onClick={() => setShowAllWorkItemFields(!showAllWorkItemFields)}
                            className="p-button but-rad"
                          />
                          <Button
                            label="Next - Review Project"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            onClick={handleNextStep}
                            className="p-button but-rad"
                            style={{ minWidth: '200px' }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Panel>
          )}

          {/* Review & Submit Section */}
          {currentStep === 3 && (
            <Panel
              header={
                <div className="flex align-items-center gap-3">
                  <div>
                    <h3 className="m-0 text-lg font-semibold">Review & Submit</h3>
                    <p className="m-0" style={{ fontWeight: 'normal' }}>Review your project details before creation</p>
                  </div>
                </div>
              }
              className="mb-2 wizard-success-slide"
              data-section="review-submit"
            >
              <div className="grid">
                <div className="col-12">
                  <div className="project-summary-section p-2 mb-0">
                    <h4 className="text-lg font-semibold mb-3 flex align-items-center gap-2">
                      <i className="pi pi-file text-blue-500"></i>
                      Project Summary
                    </h4>
                    <div className="grid">
                      <div className="col-12 md:col-6">
                        <p className="mb-0"><strong>Project Name:</strong> {projectData.projectName}</p>
                        {projectData.company && <p className="mb-0"><strong>Company:</strong> {projectData.company}</p>}
                        {projectData.projectManager && <p className="mb-0"><strong>Project Manager:</strong> {projectData.projectManager}</p>}
                      </div>
                      <div className="col-12 md:col-6">
                        {projectData.startDate && <p className="mb-2"><strong>Start Date:</strong> {projectData.startDate.toLocaleDateString()}</p>}
                        {projectData.endDate && <p className="mb-2"><strong>End Date:</strong> {projectData.endDate.toLocaleDateString()}</p>}
                        <p className="mb-2"><strong>Project Files:</strong> {projectFiles.length} file(s) uploaded</p>
                      </div>
                      {projectData.projectDescription && (
                        <div className="col-12">
                          <p className="mb-2"><strong>Description:</strong></p>
                          <p className="text-color-secondary line-height-3">{projectData.projectDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {showAllWorkItemFields && workItems.length > 0 && (
                    <div className="project-summary-section p-1 fade-in-up">
                      <h4 className="text-lg font-semibold mb-3 flex align-items-center gap-2">
                        <i className="pi pi-check-circle text-green-500"></i>
                        Work Items Summary
                      </h4>
                      <p className="mb-3"><strong>Total Work Items:</strong> {workItems.length}</p>
                      {workItems.map((item, index) => (
                        <div key={index} className="work-item-card bg-white border-round p-1 mb-2">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                            <span className="font-medium">{item.workType || `Work Item ${index + 1}`}</span>
                          </div>
                          {item.summary && <p className="text-sm text-color-secondary m-0">{item.summary}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-content-between align-items-center pt-3">
                <Button
                  label="Previous"
                  icon="pi pi-arrow-left"
                  onClick={handlePreviousStep}
                  className="p-button but-rad"
                />
                <Button
                  label="Create Project"
                  icon="pi pi-check"
                  onClick={handleSubmit}
                  className="p-button but-rad"
                />
              </div>
            </Panel>
          )}

          {/* Navigation Buttons for Steps 1 & 2 */}
          {currentStep < 3 && (
            <div className="flex justify-content-between pt-4">
              <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={handleModalHide}
                className="p-button but-rad"
              />
              <div className="flex gap-2">
                {currentStep > 1 && (
                  <Button
                    label="Previous"
                    icon="pi pi-arrow-left"
                    onClick={handlePreviousStep}
                    className="p-button but-rad"
                  />
                )}
                <Button
                  label={currentStep === 2 ? "Review" : "Next"}
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={handleNextStep}
                  disabled={currentStep === 1 ? !isProjectDetailsValid() : !isWorkTypeDetailsValid()}
                  className={`p-button but-rad ${
                    (currentStep === 1 && !isProjectDetailsValid()) || (currentStep === 2 && !isWorkTypeDetailsValid())
                      ? 'p-button-secondary'
                      : ''
                  }`}
                />
              </div>
            </div>
          )}

          {/* Cancel button for review step */}
          {currentStep === 3 && (
            <div className="flex justify-content-start pt-4">
              <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={handleModalHide}
                className="p-button but-rad"
              />
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default CreatePharseform;