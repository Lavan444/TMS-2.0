import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const WorkTypeManager = () => {
  // State for work types and dialogs
  const [workTypes, setWorkTypes] = useState([
    { id: 1, name: 'Task', description: 'A single actionable item', icon: 'pi pi-check' },
    { id: 2, name: 'Bug', description: 'An issue that needs fixing', icon: 'fas fa-bug' },
    { id: 3, name: 'Doc', description: 'Documents created by BAs and PMs', icon: 'pi pi-file' },
  ]);
  
  const [selectedWorkType, setSelectedWorkType] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newWorkType, setNewWorkType] = useState({ name: '', description: '', icon: 'pi pi-file' });

  // Icon options for selection
  const iconOptions = [
    { label: 'File', value: 'pi pi-file' },
    { label: 'Check', value: 'pi pi-check' },
    { label: 'Bug', value: 'fas fa-bug' },
    { label: 'Star', value: 'pi pi-star' },
  ];

  // Handle adding a new work type
  const handleAddWorkType = () => {
    if (newWorkType.name.trim()) {
      const newId = workTypes.length > 0 ? Math.max(...workTypes.map(wt => wt.id)) + 1 : 1;
      setWorkTypes([...workTypes, { ...newWorkType, id: newId }]);
      setNewWorkType({ name: '', description: '', icon: 'pi pi-file' });
      setShowAddDialog(false);
    }
  };

  // Handle editing an existing work type
  const handleEditWorkType = () => {
    if (selectedWorkType && selectedWorkType.name.trim()) {
      const updatedWorkTypes = workTypes.map(wt => 
        wt.id === selectedWorkType.id ? { 
          ...selectedWorkType, 
          name: selectedWorkType.name.trim(),
          description: selectedWorkType.description.trim()
        } : wt
      );
      
      setWorkTypes(updatedWorkTypes);
      setShowEditDialog(false);
    }
  };

  // Custom template for dropdown items
  const workTypeTemplate = (option) => {
    if (!option) {
      return <span>Select a work type</span>;
    }
    
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`} />
        <span>{option.name}</span>
      </div>
    );
  };

  // Dialog footer for Add and Edit dialogs
  const addDialogFooter = (
    <div>
      <Button 
        label="Cancel" 
        icon="pi pi-times" 
        onClick={() => setShowAddDialog(false)} 
        className="p-button-text mr-2" 
      />
      <Button 
        label="Create" 
        icon="pi pi-check" 
        onClick={handleAddWorkType} 
        disabled={!newWorkType.name.trim()}
      />
    </div>
  );

  const editDialogFooter = (
    <div>
      <Button 
        label="Cancel" 
        icon="pi pi-times" 
        onClick={() => setShowEditDialog(false)} 
        className="p-button-text mr-2" 
      />
      <Button 
        label="Save" 
        icon="pi pi-check" 
        onClick={handleEditWorkType} 
        disabled={!selectedWorkType?.name?.trim()}
      />
    </div>
  );

  return (
    <div className="mb-3">
      {/* Dropdown for selecting work type */}
      <div className="flex flex-column">
        <label htmlFor="worktype" className="mb-2">Work type *</label>
        <Dropdown
          id="worktype"
          value={selectedWorkType}
          options={workTypes}
          onChange={(e) => setSelectedWorkType(e.value)}
          optionLabel="name"
          placeholder="Select a work type"
          itemTemplate={workTypeTemplate}
          valueTemplate={workTypeTemplate}
          className="w-full md:w-14rem mb-2 w-100 change-clr"
          showClear
        />
      </div>

      {/* Links for adding and editing work types */}
      <div className="flex flex-wrap gap-2 mt-0">
        <Button
          label="Add work type"
          link
          onClick={() => setShowAddDialog(true)}
        />
        <Button
          label="Edit work type"
          link
          onClick={() => setShowEditDialog(true)}
          disabled={!selectedWorkType}
        />
      </div>

      {/* Add Work Type Dialog */}
      <Dialog
        header="Create work type"
        visible={showAddDialog}
        style={{ width: '30rem' }}
        onHide={() => setShowAddDialog(false)}
        footer={addDialogFooter}
      >
        <div className="p-fluid">
          <div className="p-field mb-3">
            <label htmlFor="newWorkTypeName" className="mb-2">Work type name *</label>
            <InputText
              id="newWorkTypeName"
              value={newWorkType.name}
              onChange={(e) => setNewWorkType({ ...newWorkType, name: e.target.value })}
              placeholder="Enter work type name"
            />
          </div>
          <div className="p-field mb-3">
            <label htmlFor="newWorkTypeDesc" className="mb-2">Description</label>
            <InputTextarea
              id="newWorkTypeDesc"
              value={newWorkType.description}
              onChange={(e) => setNewWorkType({ ...newWorkType, description: e.target.value })}
              placeholder="Let people know when to use this issue type"
              rows={3}
            />
          </div>
          <div className="p-field mb-3">
            <label className="mb-2">Icon</label>
            <div className="flex align-items-center">
              <i className={`${newWorkType.icon} mr-2`} style={{ fontSize: '1.5rem' }} />
              <Dropdown
                value={newWorkType.icon}
                options={iconOptions}
                onChange={(e) => setNewWorkType({ ...newWorkType, icon: e.value })}
                placeholder="Select an icon"
                className="ml-2"
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* Edit Work Type Dialog */}
      <Dialog
        header="Edit work type"
        visible={showEditDialog}
        style={{ width: '30rem' }}
        onHide={() => setShowEditDialog(false)}
        footer={editDialogFooter}
      >
        {selectedWorkType && (
          <div className="p-fluid">
            <div className="p-field mb-3">
              <label htmlFor="editWorkTypeName" className="mb-2">Work type name *</label>
              <InputText
                id="editWorkTypeName"
                value={selectedWorkType.name}
                onChange={(e) => setSelectedWorkType({ ...selectedWorkType, name: e.target.value })}
              />
            </div>
            <div className="p-field mb-3">
              <label htmlFor="editWorkTypeDesc" className="mb-2">Description</label>
              <InputTextarea
                id="editWorkTypeDesc"
                value={selectedWorkType.description}
                onChange={(e) => setSelectedWorkType({ ...selectedWorkType, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="p-field mb-3">
              <label className="mb-2">Icon</label>
              <div className="flex align-items-center">
                <i className={`${selectedWorkType.icon} mr-2`} style={{ fontSize: '1.5rem' }} />
                <Dropdown
                  value={selectedWorkType.icon}
                  options={iconOptions}
                  onChange={(e) => setSelectedWorkType({ ...selectedWorkType, icon: e.value })}
                  placeholder="Select an icon"
                  className="ml-2"
                />
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default WorkTypeManager;