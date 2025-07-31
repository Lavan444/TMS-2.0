import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const EstimateDelay = () => {
  const [phases, setPhases] = useState([
    {
      phase: 'Planning / Requirements',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-14'),
      actualEndDate: new Date('2024-04-16'),
      reasonsForDelay: ['Insufficient Resources ', 'Poor Communication & Collaboration '],
      deliverables: [
        'Insufficient Resources ', 'Poor Communication & Collaboration '
      ],
      responsible: 'Business Analyst'
    },
    {
      phase: 'Design (UI/UX & Architecture)',
      startDate: new Date('2024-04-14'),
      endDate: new Date('2024-04-28'),
      actualEndDate: new Date('2024-05-12'),
      reasonsForDelay: [],
      deliverables: [
        'Ineffective Project Management ',
        'Delayed Decision Making '
      ],
      responsible: 'UI/UX Designer'
    },
    {
      phase: 'Development (Iterations / Sprints)',
      startDate: new Date('2024-04-28'),
      endDate: new Date('2024-05-12'),
      actualEndDate: new Date('2024-05-26'),
      reasonsForDelay: [],
      deliverables: [
        'Delayed Decision Making',
        'Vendor or Third-party Delays '
      ],
      responsible: 'Software Developer'
    },
    {
      phase: 'Testing (QA & UAT)',
      startDate: new Date('2024-05-12'),
      endDate: new Date('2024-05-26'),
      actualEndDate: new Date('2024-06-09'),
      reasonsForDelay: [],
      deliverables: [
        'Delayed Feedback or Approvals ',
        'Changing Business Priorities '
      ],
      responsible: 'QA Engineer'
    },
    {
      phase: 'Deployment & Go-Live',
      startDate: new Date('2024-05-26'),
      endDate: new Date('2024-06-09'),
      actualEndDate: new Date('2024-06-23'),
      reasonsForDelay: [],
      deliverables: [
        'Changing Business Priorities',
        'Delayed Decision Making'
      ],
      responsible: 'DevOps Engineer'
    },
    {
      phase: 'Post-Go-Live Support',
      startDate: new Date('2024-06-09'),
      endDate: new Date('2024-06-23'),
      actualEndDate: new Date('2024-06-30'),
      reasonsForDelay: [],
      deliverables: [
        'Conflicting Stakeholder Expectations ',
        'Insufficient User Involvement '
      ],
      responsible: 'Support Engineer'
    }
  ]);

  const [displayDialog, setDisplayDialog] = useState(false);
  const [currentPhase, setCurrentPhase] = useState({
    phase: '',
    startDate: null,
    endDate: null,
    actualEndDate: null,
    reasonsForDelay: [],
    deliverables: [],
    responsible: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errorDialog, setErrorDialog] = useState({ visible: false, message: '' });
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, rowIndex: null });

  const responsibleOptions = [
    'Project Manager',
    'Business Analyst',
    'UI/UX Designer',
    'Software Developer',
    'DevOps Engineer',
    'QA Engineer',
    'Product Owner',
    'Scrum Master',
    'Technical Lead',
    'System Architect'
  ];

  const delayReasonOptions = [
    'Resource Unavailability',
    'Scope Change',
    'Technical Issues',
    'External Dependencies',
    'Testing Delays',
    'Budget Constraints',
    'Communication Gaps'
  ];

  const openNewPhaseDialog = () => {
    setCurrentPhase({
      phase: '',
      startDate: null,
      endDate: null,
      actualEndDate: null,
      reasonsForDelay: [],
      deliverables: [],
      responsible: ''
    });
    setEditIndex(null);
    setDisplayDialog(true);
  };

  const openEditPhaseDialog = (rowData, rowIndex) => {
    setCurrentPhase({ ...rowData });
    setEditIndex(rowIndex);
    setDisplayDialog(true);
  };

  const savePhase = () => {
    if (!currentPhase.phase) {
      setErrorDialog({ visible: true, message: 'Phase is required' });
      return;
    }

    if (
      currentPhase.endDate &&
      currentPhase.actualEndDate &&
      currentPhase.actualEndDate < currentPhase.endDate
    ) {
      setErrorDialog({ visible: true, message: 'Actual End Date must be after End Date' });
      return;
    }

    const phaseToSave = {
      ...currentPhase,
      reasonsForDelay: Array.isArray(currentPhase.reasonsForDelay)
        ? currentPhase.reasonsForDelay
        : [],
      deliverables: Array.isArray(currentPhase.deliverables)
        ? currentPhase.deliverables
        : []
    };

    if (editIndex !== null) {
      const updatedPhases = [...phases];
      updatedPhases[editIndex] = phaseToSave;
      setPhases(updatedPhases);
    } else {
      setPhases([...phases, phaseToSave]);
    }

    setDisplayDialog(false);
  };

  const confirmDeletePhase = (rowIndex) => {
    setDeleteDialog({ visible: true, rowIndex });
  };

  const handleDeleteConfirmed = () => {
    const updatedPhases = phases.filter((_, idx) => idx !== deleteDialog.rowIndex);
    setPhases(updatedPhases);
    setDeleteDialog({ visible: false, rowIndex: null });
  };

  const handleDeleteCancelled = () => {
    setDeleteDialog({ visible: false, rowIndex: null });
  };

  const formatDateRange = (startDate, endDate, actualEndDate) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const start = new Date(startDate).toLocaleDateString(undefined, options);
    const planned = new Date(endDate).toLocaleDateString(undefined, options);
    const actual = actualEndDate
      ? new Date(actualEndDate).toLocaleDateString(undefined, options)
      : '--';

    let diffDays = '';
    if (actualEndDate && endDate) {
      const diffInTime = actualEndDate.getTime() - endDate.getTime();
      diffDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    }

    return {
      main: `${start} - ${actual}`,
      extra: diffDays > 0 ? `Delayed by ${diffDays} day(s)` : ''
    };
  };

  const dateRangeBody = (rowData) => {
    const { main, extra } = formatDateRange(
      rowData.startDate,
      rowData.endDate,
      rowData.actualEndDate
    );
    return (
      <div>
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {main}
        </div>
        <div style={{ fontSize: '0.85em', color: '#6b7280', marginTop: '2px' }}>
          {extra}
        </div>
      </div>
    );
  };

  const reasonTemplate = (rowData) => {
    const reasons = Array.isArray(rowData.reasonsForDelay) ? rowData.reasonsForDelay : [];

    return <Chips value={reasons} disabled />;
  };

  const deliverablesTemplate = (rowData) => {
    const deliverables = Array.isArray(rowData.deliverables) ? rowData.deliverables : [];
    const maxLen = 25;

    return (
      <div>
        {deliverables.map((item, i) => {
          const showEllipsis = item.length > maxLen;
          const shortText = showEllipsis ? item.slice(0, maxLen) + '...' : item;
          const tooltipId = `deliverable-tooltip-${i}`;

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{
                display: 'inline-block',
                minWidth: 16,
                marginRight: 8,
                fontWeight: 'bold',
                fontSize: '1.1em',
                lineHeight: 1,
                color: '#4f46e5'
              }}>•</span>
              <span
                id={tooltipId}
                style={{
                  cursor: showEllipsis ? 'pointer' : 'default',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  maxWidth: 200,
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}
              >
                {shortText}
              </span>
              {showEllipsis && (
                <Tooltip target={`#${tooltipId}`} content={item} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const actionsBodyTemplate = (rowData, { rowIndex }) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-sm"
        onClick={() => openEditPhaseDialog(rowData, rowIndex)}
        tooltip="Edit"
        type="button"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-sm"
        onClick={() => confirmDeletePhase(rowIndex)}
        tooltip="Delete"
        type="button"
        severity="danger"
      />
    </div>
  );

  const ellipsisBodyTemplate = (content) => {
    const maxLength = 30;
    const showEllipsis = content && content.length > maxLength;
    const shortContent = showEllipsis ? content.slice(0, maxLength) + '...' : content;

    return (
      <div>
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            maxWidth: '100%',
            cursor: showEllipsis ? 'pointer' : 'default'
          }}
          title={showEllipsis ? content : ''}
        >
          {shortContent}
        </span>
      </div>
    );
  };

  return (
    <div className="mx-auto">
      <style>
        {`
          .custom-ats-table .p-datatable-thead > tr > th {
            border: none !important;
            background: #f8fafc !important;
            color: #22223b !important;
            font-weight: 600;
            font-size: 1rem;
            padding: 14px 18px !important;
            text-align: left !important;
          }
          .custom-ats-table .p-datatable-thead > tr > th:last-child {
            text-align: center !important;
          }
          .custom-ats-table .p-datatable-tbody > tr {
            background: #fff !important;
            transition: background 0.2s;
          }
          .custom-ats-table .p-datatable-tbody > tr:hover {
            background: #f1f5f9 !important;
          }
          .custom-ats-table .p-datatable-tbody > tr > td {
            border: none !important;
            color: #22223b !important;
            font-size: 0.97rem;
            padding: 12px 18px !important;
            vertical-align: middle;
            text-align: left !important;
          }
          .custom-ats-table .p-datatable-tbody > tr > td:last-child {
            text-align: center !important;
          }
          .custom-ats-table .p-button-rounded.p-button-sm {
            width: 28px !important;
            height: 28px !important;
            padding: 0 !important;
          }
          .doc-table {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: none !important;
            border: none !important;
            background: #fff;
          }
          .custom-ats-table.p-datatable {
            border: none !important;
            box-shadow: none !important;
          }
          .custom-ats-table .p-datatable-wrapper {
            border: none !important;
            box-shadow: none !important;
          }
          .bold-phase-row {
            font-weight: bold !important;
            background: #f5f7fa !important;
          }
        `}
      </style>

      <div className="flex justify-content-end align-items-center mb-3">
        <Button icon="pi pi-plus" label="Add Phase" onClick={openNewPhaseDialog} />
      </div>

      <div className="doc-table">
        <DataTable
          value={phases}
          responsiveLayout="scroll"
          className="p-datatable-sm custom-ats-table"
          rowClassName={(rowData) =>
            rowData.phase === 'Development (Iterations / Sprints)' ? 'bold-phase-row' : ''
          }
        >
          <Column
            field="phase"
            header="Phase"
            body={(rowData) => ellipsisBodyTemplate(rowData.phase)}
            style={{ width: '20%' }}
          ></Column>
          <Column
            field="dateRange"
            header="Duration"
            body={dateRangeBody}
            style={{ width: '25%' }}
          ></Column>
          {/* <Column
            header="Reason for Delay"
            body={reasonTemplate}
            style={{ width: '20%' }}
          ></Column> */}
          <Column
            header="Reason for Delay"
            body={deliverablesTemplate}
            style={{ width: '30%' }}
          ></Column>
          <Column
            header="Actions"
            body={actionsBodyTemplate}
            style={{ width: '5%', textAlign: 'center' }}
          />
        </DataTable>
      </div>

      {/* Modal */}
      <Dialog
        visible={displayDialog}
        onHide={() => setDisplayDialog(false)}
        header={editIndex !== null ? 'Edit Phase' : 'Add New Phase'}
        style={{ width: '40vw', maxWidth: 600 }}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayDialog(false)} severity="secondary" />
            <Button label="Save" icon="pi pi-check" onClick={savePhase} />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="field mb-4">
            <label className="font-semibold mb-2 block">Phase *</label>
            <InputText
              value={currentPhase.phase}
              onChange={(e) => setCurrentPhase({ ...currentPhase, phase: e.target.value })}
              className="w-full"
              placeholder="Enter phase name"
            />
          </div>
          <div className="formgrid grid mb-2">
            <div className="field col-6">
              <label className="font-semibold mb-2 block">Start Date</label>
              <Calendar
                value={currentPhase.startDate}
                onChange={(e) => setCurrentPhase({ ...currentPhase, startDate: e.value })}
                showIcon
                className="w-full"
                placeholder="Select start date"
              />
            </div>
            <div className="field col-6">
              <label className="font-semibold mb-2 block">End Date</label>
              <Calendar
                value={currentPhase.endDate}
                onChange={(e) => setCurrentPhase({ ...currentPhase, endDate: e.value })}
                minDate={currentPhase.startDate}
                showIcon
                className="w-full"
                placeholder="Select end date"
              />
            </div>
            <div className="field col-6">
              <label className="font-semibold mb-2 block">Actual End Date</label>
              <Calendar
                value={currentPhase.actualEndDate}
                onChange={(e) => setCurrentPhase({ ...currentPhase, actualEndDate: e.value })}
                minDate={currentPhase.endDate || currentPhase.startDate}
                showIcon
                className="w-full"
                placeholder="Select actual end date"
              />
            </div>
          </div>
          <div className="field mb-2">
            <label className="font-semibold mb-2 block">Reason for Delay</label>
            <MultiSelect
              value={currentPhase.reasonsForDelay || []}
              options={delayReasonOptions}
              onChange={(e) => setCurrentPhase({ ...currentPhase, reasonsForDelay: e.value })}
              placeholder="Select Reasons"
              display="chip"
              className="w-full"
            />
          </div>
          <div className="field mb-2">
            <label className="font-semibold mb-2 block">Key Deliverables</label>
            <InputText
              value={currentPhase.deliverables.join(', ')}
              onChange={(e) => setCurrentPhase({ ...currentPhase, deliverables: e.target.value.split(',') })}
              className="w-full"
              placeholder="Enter deliverables separated by commas"
            />
          </div>
        </div>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        visible={errorDialog.visible}
        onHide={() => setErrorDialog({ visible: false, message: '' })}
        header="Validation Error"
        style={{ width: '350px' }}
        footer={
          <Button
            label="OK"
            icon="pi pi-check"
            onClick={() => setErrorDialog({ visible: false, message: '' })}
            autoFocus
          />
        }
        modal
      >
        <div>{errorDialog.message}</div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        visible={deleteDialog.visible}
        onHide={handleDeleteCancelled}
        header="Confirm Delete"
        style={{ width: '350px' }}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button label="Cancel" icon="pi pi-times" onClick={handleDeleteCancelled} severity="secondary" />
            <Button label="Delete" icon="pi pi-trash" onClick={handleDeleteConfirmed} severity="danger" />
          </div>
        }
        modal
      >
        <div>Are you sure you want to delete this phase?</div>
      </Dialog>
    </div>
  );
};

export default EstimateDelay;