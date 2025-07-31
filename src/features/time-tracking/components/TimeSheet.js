import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { SplitButton } from 'primereact/splitbutton';
import { Badge } from 'primereact/badge';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Container } from 'reactstrap';
import WorkType1 from 'pms/common-for-all/WorkTypeOne';
import { SelectButton } from 'primereact/selectbutton';

const TimesheetComponent = () => {
  const toast = useRef(null);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState('Mahesh Kumar Bhoga');
  const [workType, setWorkType] = useState('Week'); // Week/Day toggle

  // const [selectedWorkType, setSelectedWorkType] = useState(WORK_TYPE_OPTIONS[0].value);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Week toggle start

  const WORK_TYPE_OPTIONS = [
    { label: 'Week', value: 'Week' },
    { label: 'Day', value: 'Day' }
  ];
  const [selectedWorkType, setSelectedWorkType] = useState(WORK_TYPE_OPTIONS[0].value);


  // Week toggle end



  // Sample data structure
  const [timesheetData, setTimesheetData] = useState([
    {
      id: 1,
      project: 'PSS - ATS v2.0',
      task: 'Layout Design',
      mon: '3:00',
      tue: '5:00',
      wed: '0:30',
      thu: '',
      fri: '',
      total: '8:30'
    },
    {
      id: 2,
      project: 'PSS - ATS v2.0',
      task: 'Workflow',
      mon: '5:00',
      tue: '3:00',
      wed: '',
      thu: '',
      fri: '',
      total: '8:00'
    },
    {
      id: 3,
      project: '[Sample use cases] - Time and Material [Sample project]',
      task: 'Sample Task 1',
      mon: '',
      tue: '',
      wed: '8:00',
      thu: '',
      fri: '',
      total: '8:00'
    },
    {
      id: 4,
      project: 'PSS - ATS v2.0',
      task: 'ATS Revised Architecture',
      mon: '0:30',
      tue: '0:30',
      wed: '0:30',
      thu: '6:00',
      fri: '',
      total: '7:30'
    },

    {
      id: 4,
      project: 'PSS - ATS v2.0',
      task: 'ATS Revised Architecture',
      mon: '0:30',
      tue: '0:30',
      wed: '0:30',
      thu: '6:00',
      fri: '',
      total: '7:30'
    }

  ]);

  const users = [
    // { label: 'Mahesh kumar Bhoga', value: 'Mahesh kumar Bhoga' },
    { label: 'Ravi Teja', value: 'Ravi Teja' },
    { label: 'Lavankumar', value: 'Lavankumar' },
    { label: 'Teja', value: 'Teja' },


  ];

  // Get week dates
  const getWeekDates = (date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startDate.setDate(diff);
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(selectedWeek);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate totals
  const calculateDayTotal = (day) => {
    return timesheetData.reduce((total, row) => {
      const time = row[day] || '0:00';
      const [hours, minutes] = time.split(':').map(Number);
      return total + (hours || 0) * 60 + (minutes || 0);
    }, 0);
  };

  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const calculateRowTotal = (rowData) => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    const totalMinutes = days.reduce((total, day) => {
      const time = rowData[day] || '0:00';
      const [hours, minutes] = time.split(':').map(Number);
      return total + (hours || 0) * 60 + (minutes || 0);
    }, 0);
    return formatMinutes(totalMinutes);
  };

  // Time input editor
  const timeEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value || ''}
        onChange={(e) => options.editorCallback(e.target.value)}
        placeholder="hh:mm"
        className="w-full"
        onBlur={(e) => {
          // Validate time format
          const timeRegex = /^([0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
          if (e.target.value && !timeRegex.test(e.target.value)) {
            toast.current.show({
              severity: 'warn',
              summary: 'Invalid Time',
              detail: 'Please enter time in hh:mm format'
            });
          }
        }}
      />
    );
  };

  // Project/Task editors
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value || ''}
        onChange={(e) => options.editorCallback(e.target.value)}
        className="w-full"
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    if (field === 'project' || field === 'task') {
      rowData[field] = newValue;
    } else {
      // Validate time format for time fields
      const timeRegex = /^([0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
      if (newValue && !timeRegex.test(newValue)) {
        event.preventDefault();
        toast.current.show({
          severity: 'error',
          summary: 'Invalid Time',
          detail: 'Please enter time in hh:mm format'
        });
        return;
      }
      rowData[field] = newValue;
      rowData.total = calculateRowTotal(rowData);
      // Remove highlight after first edit
      if (rowData.isNew) delete rowData.isNew;
    }
    setTimesheetData([...timesheetData]);
  };

  const addNewRow = () => {
    const newRow = {
      id: timesheetData.length + 1,
      project: '',
      task: '',
      mon: '',
      tue: '',
      wed: '',
      thu: '',
      fri: '',
      total: '0:00',
      isNew: true // <-- Add this flag
    };
    setTimesheetData([...timesheetData, newRow]);
  };

  const deleteRow = (rowData) => {
    setTimesheetData(timesheetData.filter(item => item.id !== rowData.id));
  };

  const copyPreviousWeek = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Copy Previous Week',
      detail: 'Previous week data copied'
    });
  };

  // Header template
  const headerTemplate = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <div
          className="flex gap-2"
        >
          <div className="flex gap-2" style={{
            border: '1px solid #ececf1',
            alignItems: 'center',
            padding: '1px',
            borderRadius: '5px'
          }}>
            <Button
              icon="pi pi-chevron-left"
              className="p-button-text timesheet-nav-btn"
              onClick={() => {
                const newDate = new Date(selectedWeek);
                newDate.setDate(selectedWeek.getDate() - 7);
                setSelectedWeek(newDate);
              }}
            />
            <span style={{ fontWeight: "400" }}>
              This week, {weekDates[0].toLocaleDateString()} → {weekDates[6].toLocaleDateString()}
            </span>
            <Button
              icon="pi pi-chevron-right"
              className="p-button-text timesheet-nav-btn"
              onClick={() => {
                const newDate = new Date(selectedWeek);
                newDate.setDate(selectedWeek.getDate() + 7);
                setSelectedWeek(newDate);
              }}
            />
            <span className="timesheet-nav-separator"></span>
            <Button
              icon="pi pi-home"
              className="p-button-text timesheet-nav-btn"
            />
          </div>

          <Dropdown
            value={selectedUser}
            options={users}
            onChange={(e) => setSelectedUser(e.value)}
            placeholder="Mahesh Kumar Bhoga"
            className="w-full md:w-auto bgclr" style={{ height: "40px !important" }}
          />

        </div>

        <div className="flex gap-2">

          <Button label="Submit Approval" className="p-button-outlined but-rad" />
          <Button label="Upload timesheet" icon="pi pi-upload" className="p-button-outlined but-rad" />


          {/* Week/Day toggle */}
          <div className="flex gap-2 align-items-center">

            <div className="segmented-toggle">
              <button
                className={selectedWorkType === 'Week' ? 'active' : ''}
                onClick={() => setSelectedWorkType('Week')}
                type="button"
              >
                Week
              </button>
              <button
                className={selectedWorkType === 'Day' ? 'active' : ''}
                onClick={() => setSelectedWorkType('Day')}
                type="button"
              >
                Day
              </button>
            </div>
            <div className="toggle-switch-wrapper">
              {/* <div
    className={`toggle-switch ${selectedWorkType === 'Day' ? 'toggle-switch-right' : ''}`}
    onClick={() => setSelectedWorkType(selectedWorkType === 'Week' ? 'Day' : 'Week')}
  >
    <span className={`toggle-label ${selectedWorkType === 'Week' ? 'active' : ''}`}>Week</span>
    <span className={`toggle-label ${selectedWorkType === 'Day' ? 'active' : ''}`}>Day</span>
    <div className="toggle-slider" />
  </div> */}
            </div>

            {/*         
             <SelectButton
  value={selectedWorkType}
  onChange={(e) => setSelectedWorkType(e.value)}
  options={WORK_TYPE_OPTIONS}
  optionLabel="label"
  optionValue="value"
/> */}

          </div>
        </div>
      </div>
    );
  };

  // Action buttons template
  const actionTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="delete-bg p-button-text p-button-danger"
        onClick={() => deleteRow(rowData)}
        tooltip="Delete row"
        tooltipOptions={{ position: 'bottom' }}
      />
    );
  };

  // worktype dropdown start

  const [selectedModule, setSelectedModule] = useState(null);
  const handleModuleWorkTypesChange = (updatedWorkTypes) => {
    setModuleWorkTypes(updatedWorkTypes);
  };

  const handleModuleSelectionChange = (selectedWorkType) => {
    setSelectedModule(selectedWorkType);
  };

  const [moduleWorkTypes, setModuleWorkTypes] = useState([
    {
      name: 'AI Generator',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Resume Parser',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Chatbot Assistant',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Image Enhancer AI',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Voice to Text Converter',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'E-commerce Recommender',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'E-commerce Recommender',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    }
  ]);

  const moduleDropdownWorkTypes = [
    ...moduleWorkTypes,
    { id: 'divider', disabled: true },
    { name: 'Add Project', id: 'create-new-work-type' },
    { name: 'Edit Project', id: 'edit-selected-work-type' }
  ];



  // for task


  const [selectedTask, setSelectedTask] = useState(null);
  const handleTaskWorkTypesChange = (updatedWorkTypes) => {
    setTaskWorkTypes(updatedWorkTypes);
  };

  const handleTaskSelectionChange = (selectedWorkType) => {
    setSelectedTask(selectedWorkType);
  };

  const [TaskWorkTypes, setTaskWorkTypes] = useState([
    {
      name: 'Add User Role Feature',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Generate Monthly Report',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Fix Login Timeout Bug',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Integrate PF Calculation',
      color: '#000000',
      id: 'custom-task',
      statuses: ['Pending', 'Processing', 'Completed']
    },

  ]);

  const taskDropdownWorkTypes = [
    ...TaskWorkTypes,
    { id: 'divider', disabled: true },
    { name: 'Add Task', id: 'create-new-work-type' },
    { name: 'Edit Task', id: 'edit-selected-work-type' }
  ];



  // worktype dropdown start

  return (

    <div className="page-content allact-tabs">
      <Container fluid={true}>
        <div className="page-title-box actjobbread">

          <div className="timesheet-container">
            <Toast ref={toast} />
            {/* <h2 className="mb-4">Timesheet</h2>  */}

            <div class="row">
              <div class="col-lg-12">
                <h1 class="page-title mb-4">Timesheet</h1>
              </div>
            </div>
            {headerTemplate()}
            <DataTable
              value={timesheetData}
              editMode="cell"
              className="timesheet-table mt-4"
              scrollable
              scrollHeight="600px"
              showGridlines={false} // Remove table borders
              responsiveLayout="scroll"
            >
              {/* <Column
          field="project"
          header="PROJECT"
          editor={textEditor}
          onCellEditComplete={onCellEditComplete}
          style={{ minWidth: '250px', fontWeight: 'bold' }}
          body={(rowData) => (
            <div className="text-sm">
              {rowData.project || 'Select/create a project...'}
            </div>
          )}
        /> */}

              {/* <Column
  field="project"
  header="PROJECT"
  style={{ maxWidth: '180px', fontWeight: 'bold' }}
  body={(rowData, options) => (
    <WorkType1
      initialWorkTypes={moduleWorkTypes}
      dropdownWorkTypes={moduleDropdownWorkTypes}
      onWorkTypesChange={handleModuleWorkTypesChange}
      onSelectionChange={handleModuleSelectionChange}
      rowData={rowData}
      rowIndex={options.rowIndex}
      mode="display"
      className="bgclr"
    />
  )}
  editor={(options) => (
    <WorkType1
      initialWorkTypes={moduleWorkTypes}
      dropdownWorkTypes={moduleDropdownWorkTypes}
      onWorkTypesChange={handleModuleWorkTypesChange}
      onSelectionChange={handleModuleSelectionChange}
      rowData={options.rowData}
      rowIndex={options.rowIndex}
      mode="edit"
      editorCallback={options.editorCallback}
      className="bgclr"
    />
  )}
  onCellEditComplete={onCellEditComplete}
/> */}


              <Column
                field="project"
                header="PROJECT"
                style={{ minWidth: '230px', fontWeight: 'bold' }}
                body={(rowData, options) => (
                  <WorkType1
                    initialWorkTypes={moduleWorkTypes}
                    dropdownWorkTypes={moduleDropdownWorkTypes}
                    onWorkTypesChange={handleModuleWorkTypesChange}
                    onSelectionChange={handleModuleSelectionChange}
                    rowData={rowData}
                    rowIndex={options.rowIndex}
                    mode="display"
                  />
                )}
                editor={(options) => (
                  <WorkType1
                    initialWorkTypes={moduleWorkTypes}
                    dropdownWorkTypes={moduleDropdownWorkTypes}
                    onWorkTypesChange={handleModuleWorkTypesChange}
                    onSelectionChange={handleModuleSelectionChange}
                    rowData={options.rowData}
                    rowIndex={options.rowIndex}
                    mode="edit"
                    editorCallback={options.editorCallback}
                  />
                )}
                onCellEditComplete={onCellEditComplete}
              />


              {/* <Column
          field="task"
          header="TASK"
          editor={textEditor}
          onCellEditComplete={onCellEditComplete}
          style={{ minWidth: '200px' }}
          body={(rowData) => (
            <div className="text-sm">
              {rowData.task || 'Select/create a task...'}
            </div>
          )}
        /> */}

              <Column
                field="task"
                header="TASK"
                style={{ minWidth: '380px' }}
                body={(rowData, options) => (
                  <WorkType1
                    initialWorkTypes={TaskWorkTypes}
                    dropdownWorkTypes={taskDropdownWorkTypes}
                    onWorkTypesChange={handleTaskWorkTypesChange}
                    onSelectionChange={handleTaskSelectionChange}
                    rowData={rowData}
                    rowIndex={options.rowIndex}
                    mode="display"
                    className="bgclr"
                  />
                )}
                editor={(options) => (
                  <WorkType1
                    initialWorkTypes={TaskWorkTypes}
                    dropdownWorkTypes={taskDropdownWorkTypes}
                    onWorkTypesChange={handleTaskWorkTypesChange}
                    onSelectionChange={handleTaskSelectionChange}
                    rowData={options.rowData}
                    rowIndex={options.rowIndex}
                    mode="edit"
                    editorCallback={options.editorCallback}
                    className="bgclr"
                  />
                )}
                onCellEditComplete={onCellEditComplete}
              />
              {/* <Column
          field="mon"
          header={
            <div className="text-center ms-1">
              <div>{formatDate(weekDates[0])}</div>
              <div className="text-xs text-500" >8:30</div>
            </div>
          }
          editor={timeEditor}
          onCellEditComplete={onCellEditComplete}
          style={{ width: '120px'}}
          className="text-center"
          body={(rowData) => (
            <div className="timeoutline text-center ms-1">
              {rowData.mon || <span className="text-400">hh:mm</span>}
            </div>
          )}
        /> */}

              <Column
                field="mon"
                header={
                  <div
                    className="text-center ms-1"
                    style={{
                      // background: isToday(weekDates[0]) ? "#1976d2" : "#f0f0f0",
                      color: isToday(weekDates[0]) ? "#000" : "#888",

                    }}
                  >
                    <div>{formatDate(weekDates[0])}</div>
                    <div className="text-end" style={{
                      // background: isToday(weekDates[0]) ? "#1976d2" : "#f0f0f0",
                      color: "#000",
                      fontWeight: "300",
                      fontSize: "16px",
                      marginTop: "3px"
                    }}>{formatMinutes(calculateDayTotal('mon'))}</div>
                  </div>
                }
                editor={timeEditor}
                onCellEditComplete={onCellEditComplete}
                style={{ width: '120px' }}
                className="text-center"
                body={(rowData) => (
                  <div
                    className="timeoutline text-center ms-1"
                    style={
                      rowData.isNew
                        ? { background: "#eee", borderRadius: "5px" }
                        : {}
                    }
                  >
                    {rowData.mon || <span className="text-400">hh:mm</span>}
                  </div>
                )}
              />
              <Column
                field="tue"
                header={
                  <div
                    className="text-center"
                    style={{
                      // background: isToday(weekDates[1]) ? "#1976d2" : "#f0f0f0",
                      color: isToday(weekDates[1]) ? "#000" : "#888",
                      borderRadius: "6px",
                      padding: "4px 0"
                    }}
                  >
                    <div>{formatDate(weekDates[1])}</div>
                    <div className="text-end" style={{
                      color: "#000",
                      fontWeight: "300",
                      fontSize: "16px",
                      marginTop: "3px"
                    }}>{formatMinutes(calculateDayTotal('tue'))}</div>
                  </div>
                }
                editor={timeEditor}
                onCellEditComplete={onCellEditComplete}
                style={{ width: '120px' }}
                className="text-center"
                body={(rowData) => (
                  <div
                    className="timeoutline text-center"
                    style={
                      rowData.isNew
                        ? { background: "#eee", borderRadius: "5px" }
                        : {}
                    }
                  >
                    {rowData.tue || <span className="text-400">hh:mm</span>}
                  </div>
                )}
              />
              <Column
                field="wed"
                header={
                  <div
                    className="text-center"
                    style={{
                      // background: isToday(weekDates[2]) ? "#1976d2" : "#f0f0f0",
                      color: isToday(weekDates[2]) ? "#000" : "#888",
                      borderRadius: "6px",
                      padding: "4px 0"
                    }}
                  >
                    <div>{formatDate(weekDates[2])}</div>
                    <div className=" text-end" style={{
                      color: "#000",
                      fontWeight: "300",
                      fontSize: "16px",
                      marginTop: "3px"
                    }}>{formatMinutes(calculateDayTotal('wed'))}</div>
                  </div>
                }
                editor={timeEditor}
                onCellEditComplete={onCellEditComplete}
                style={{ width: '120px' }}
                className="text-center"
                body={(rowData) => (
                  <div
                    className="timeoutline text-center"
                    style={
                      rowData.isNew
                        ? { background: "#eee", borderRadius: "5px" }
                        : {}
                    }
                  >
                    {rowData.wed || <span className="text-400">hh:mm</span>}
                  </div>
                )}
              />
              <Column
                field="thu"
                header={
                  <div
                    className="text-center"
                    style={{
                      // background: isToday(weekDates[3]) ? "#1976d2" : "#f0f0f0",
                      color: isToday(weekDates[3]) ? "#000" : "#888",
                      borderRadius: "6px",
                      padding: "4px 0"
                    }}
                  >
                    <div>{formatDate(weekDates[3])}</div>
                    <div className="text-end" style={{
                      color: "#000",
                      fontWeight: "300",
                      fontSize: "16px",
                      marginTop: "3px"
                    }}>{formatMinutes(calculateDayTotal('thu'))}</div>
                  </div>
                }
                editor={timeEditor}
                onCellEditComplete={onCellEditComplete}
                style={{ width: '120px' }}
                className="text-center"
                body={(rowData) => (
                  <div
                    className="timeoutline text-center"
                    style={
                      rowData.isNew
                        ? { background: "#eee", borderRadius: "5px" }
                        : {}
                    }
                  >
                    {rowData.thu || <span className="text-400">hh:mm</span>}
                  </div>
                )}
              />
              <Column
                field="fri"
                header={
                  <div
                    className="text-center"
                    style={{
                      // background: isToday(weekDates[4]) ? "#1976d2" : "#f0f0f0",
                      color: isToday(weekDates[4]) ? "#000" : "#888",
                      borderRadius: "6px",
                      padding: "4px 0"
                    }}
                  >
                    <div>{formatDate(weekDates[4])}</div>
                    <div className="text-end" style={{
                      color: "#000",
                      fontWeight: "300",
                      fontSize: "16px",
                      marginTop: "3px"
                    }}>{formatMinutes(calculateDayTotal('fri'))}</div>
                  </div>
                }
                editor={timeEditor}
                onCellEditComplete={onCellEditComplete}
                style={{ width: '120px' }}
                className="text-center"
                body={(rowData) => (
                  <div
                    className="timeoutline text-center"
                    style={
                      rowData.isNew
                        ? { background: "#eee", borderRadius: "5px" }
                        : {}
                    }
                  >
                    {rowData.fri || <span className="text-400">hh:mm</span>}
                  </div>
                )}
              />


              <Column
                field="total"
                header={
                  <div className="text-end">
                    <div style={{ fontSize: '16px', marginLeft: '20px' }}>Total</div>
                    <div className="" style={{ fontSize: '16px !important', marginTop: '3px', fontWeight: '300' }} >{formatMinutes(
                      ['mon', 'tue', 'wed', 'thu', 'fri'].reduce(
                        (total, day) => total + calculateDayTotal(day),
                        0
                      )
                    )}</div>
                  </div>
                }
                style={{ width: '100px', }}
                className="text-center"
                body={(rowData) => (
                  <div className="text-center">
                    <Badge value={calculateRowTotal(rowData)} className="timesheet-vertical" />
                  </div>
                )}
              />
              <Column
                body={actionTemplate}
                style={{ width: '60px' }}
                className="text-center"
              />
            </DataTable>

            <div className="col-12 md:col-6">
              <div className="">
                <div className=""
                  style={{
                    display: 'flex',
                    width: '40%',
                    marginLeft: '56%',
                    gap: '58px'

                  }}>
                  <div className="col timesheethorizontal-total">
                    <div className="fnt-num">
                      {formatMinutes(calculateDayTotal('mon'))}
                    </div>
                  </div>
                  <div className="col">
                    <div className="fnt-num">
                      {formatMinutes(calculateDayTotal('tue'))}
                    </div>
                  </div>
                  <div className="col">
                    <div className="fnt-num">
                      {formatMinutes(calculateDayTotal('wed'))}
                    </div>
                  </div>
                  <div className="col">
                    <div className="fnt-num">
                      {formatMinutes(calculateDayTotal('thu'))}
                    </div>
                  </div>
                  <div className="col">
                    <div className="fnt-num">
                      {formatMinutes(calculateDayTotal('fri'))}
                    </div>
                  </div>
                  <div className="col">
                    <div className="fnt-num">
                      {formatMinutes(
                        ['mon', 'tue', 'wed', 'thu', 'fri'].reduce(
                          (total, day) => total + calculateDayTotal(day),
                          0
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer with totals */}
            <div className="border-top-1 surface-border p-3">
              <div className="grid">
                <div className="col-12 md:col-6">
                  <div className="flex gap-3">
                    <Button
                      label="Add timesheet row"
                      icon="pi pi-plus"
                      className="p-button-text but-rad"
                      onClick={addNewRow}
                    />
                    <Button
                      label="Sort"
                      icon="pi pi-sort"
                      className="p-button-text but-rad"
                    />
                    <Button
                      label="Copy previous week"
                      icon="pi pi-copy"
                      className="p-button-text but-rad"
                      onClick={copyPreviousWeek}
                    />
                  </div>
                </div>
                {/* <div className="col-12 md:col-6">
            <div className="">
             <div
  className=""
  style={{
    display: 'flex',
    width: '40%',
    marginLeft: '55%',
    gap: '66px'
  }}
>
                <div className="col">
                  <div className="text-sm font-bold">
                    {formatMinutes(calculateDayTotal('mon'))}
                  </div>
                </div>
                <div className="col">
                  <div className="text-sm font-bold">
                    {formatMinutes(calculateDayTotal('tue'))}
                  </div>
                </div>
                <div className="col">
                  <div className="text-sm font-bold">
                    {formatMinutes(calculateDayTotal('wed'))}
                  </div>
                </div>
                <div className="col">
                  <div className="text-sm font-bold">
                    {formatMinutes(calculateDayTotal('thu'))}
                  </div>
                </div>
                <div className="col">
                  <div className="text-sm font-bold">
                    {formatMinutes(calculateDayTotal('fri'))}
                  </div>
                </div>
                <div className="col">
                  <div className="text-sm font-bold text-blue-600">
                    {formatMinutes(
                      ['mon', 'tue', 'wed', 'thu', 'fri'].reduce(
                        (total, day) => total + calculateDayTotal(day),
                        0
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
              </div>
            </div>
            <style jsx>{`
  .timesheet-table .p-datatable-table,
  .timesheet-table .p-datatable-thead > tr > th,
  .timesheet-table .p-datatable-tbody > tr > td,
  .timesheet-table .p-datatable-tfoot > tr > td {
    border: none !important;
    box-shadow: none !important;
  }
  .timesheet-table .p-datatable-tbody > tr > td {
    padding: 0.5rem;
  }
  .timesheet-table .p-datatable-thead > tr > th {
    padding: 0.75rem 0.5rem;
    background: #f8f9fa;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    .timesheet-table {
      font-size: 0.875rem;
    }
    .timesheet-table .p-datatable-tbody > tr > td,
    .timesheet-table .p-datatable-thead > tr > th {
      padding: 0.25rem;
    }
  }
`}</style>
          </div>
        </div>
      </Container>
    </div>

  );
};

export default TimesheetComponent;