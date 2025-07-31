import React, { useState, useMemo } from 'react';
import { Tree } from 'primereact/tree';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';
import { Toolbar } from 'primereact/toolbar';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Sample project data structured for PrimeReact Tree
const projectData = [
  {
    key: 'project-1',
    label: 'AI Generator',
    data: {
      name: 'AI Generator',
      // module: 'MODULE 1',
      type: 'project',
      // status: 'active',
      // priority: 'high'
    },
    icon: 'pi pi-folder-open',
    children: [
      {
        key: 'task-1',
        label: 'User Management',
        data: {
          name: 'Task 1',
          type: 'task',
          // status: 'active',
          // priority: 'medium'
        },
        icon: 'pi pi-check-circle text-success',
        children: [
          {
            key: 'subtask-1-1',
            label: 'Create registration form',
            data: {
              name: 'Authentication',
              type: 'subtask',
              // status: 'in-progress',
              // priority: 'low'
            },
            icon: 'pi pi-list text-warning',
            children: [
              {
                key: 'bug-1-1',
                label: 'Session not invalidated on logout',
                data: {
                  name: 'Bug 1.1',
                  type: 'bug',
                  // status: 'open',
                  // priority: 'high'
                },
                icon: 'pi pi-exclamation-triangle text-danger'
              }
            ]
          },
          {
            key: 'subtask-1-2',
            label: 'User Login',
            data: {
              name: 'Sub Task 1.2',
              type: 'Build login form',
              // status: 'in-progress',
              // priority: 'low'
            },
            icon: 'pi pi-list text-warning',
            children: [
              {
                key: 'bug-1-2-1',
                label: 'Implement authentication logic',
                data: {
                  name: 'Bug 1.2.1',
                  type: 'bug',
                  // status: 'open',
                  // priority: 'high'
                },
                icon: 'pi pi-exclamation-triangle text-danger'
              },
              {
                key: 'bug-1-2-2',
                label: 'Handle session or token (JWT) creation',
                data: {
                  name: 'Bug 1.2.2',
                  type: 'bug',
                  // status: 'open',
                  // priority: 'high'
                },
                icon: 'pi pi-exclamation-triangle text-danger'
              }
            ]
          }
        ]
      },
      {
        key: 'task-2',
        label: 'User Roles and Permissions',
        data: {
          name: 'Task 2',
          type: 'task',
          // status: 'active',
          // priority: 'medium'
        },
        icon: 'pi pi-check-circle text-success',
        children: [
          {
            key: 'bug-2-1-1',
            label: 'Bug 2.1.1',
            data: {
              name: 'Bug 2.1.1',
              type: 'bug',
              // status: 'open',
              // priority: 'high'
            },
            icon: 'pi pi-exclamation-triangle text-danger'
          },
          {
            key: 'bug-2-1-2',
            label: 'Bug 2.1.2',
            data: {
              name: 'Bug 2.1.2',
              type: 'bug',
              // status: 'open',
              // priority: 'high'
            },
            icon: 'pi pi-exclamation-triangle text-danger'
          },
          {
            key: 'bug-2-1-3',
            label: 'Bug 2.1.3',
            data: {
              name: 'Bug 2.1.3',
              type: 'bug',
              // status: 'open',
              // priority: 'high'
            },
            icon: 'pi pi-exclamation-triangle text-danger'
          }
        ]
      },
      {
        key: 'task-3',
        label: 'Task 3',
        data: {
          name: 'Task 3',
          type: 'task',
          // status: 'active',
          // priority: 'medium'
        },
        icon: 'pi pi-check-circle text-success',
        children: [
          {
            key: 'subtask-2-1',
            label: 'Sub Task 2.1',
            data: {
              name: 'Sub Task 2.1',
              type: 'subtask',
              // status: 'in-progress',
              // priority: 'low'
            },
            icon: 'pi pi-list text-warning'
          },
          {
            key: 'subtask-2-2',
            label: 'Sub Task 2.2',
            data: {
              name: 'Sub Task 2.2',
              type: 'subtask',
              // status: 'in-progress',
              // priority: 'low'
            },
            icon: 'pi pi-list text-warning'
          }
        ]
      }
    ]
  }
];

const PrimeReactProjectTree = () => {
  const [expandedKeys, setExpandedKeys] = useState({
    'project-1': true,
    'task-1': true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeys, setSelectedKeys] = useState({});

  // Filter tree nodes based on search term
  const filteredNodes = useMemo(() => {
    if (!searchTerm) return projectData;
    
    const filterNodes = (nodes) => {
      return nodes.filter(node => {
        const matchesSearch = node.label.toLowerCase().includes(searchTerm.toLowerCase());
        const hasMatchingChildren = node.children && filterNodes(node.children).length > 0;
        
        if (matchesSearch || hasMatchingChildren) {
          return {
            ...node,
            children: node.children ? filterNodes(node.children) : undefined
          };
        }
        return false;
      }).filter(Boolean);
    };
    
    return filterNodes(projectData);
  }, [searchTerm]);

  const expandAll = () => {
    const getAllKeys = (nodes) => {
      let keys = {};
      nodes.forEach(node => {
        keys[node.key] = true;
        if (node.children) {
          keys = { ...keys, ...getAllKeys(node.children) };
        }
      });
      return keys;
    };
    setExpandedKeys(getAllKeys(projectData));
  };

  const collapseAll = () => {
    setExpandedKeys({ 'project-1': true });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { severity: 'success', value: 'Active' },
      'in-progress': { severity: 'warning', value: 'In Progress' },
      'open': { severity: 'danger', value: 'Open' },
      'completed': { severity: 'info', value: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig['active'];
    return <Badge value={config.value} severity={config.severity} />;
  };

  const getPriorityChip = (priority) => {
    const priorityConfig = {
      'high': { className: 'p-chip-danger', label: 'High' },
      'medium': { className: 'p-chip-warning', label: 'Medium' },
      'low': { className: 'p-chip-success', label: 'Low' }
    };
    
    const config = priorityConfig[priority] || priorityConfig['low'];
    return <Chip label={config.label} className={config.className} />;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'project': return 'text-dark-500 font-bold';
      case 'task': return 'text-dark-500 font-semibold';
      case 'subtask': return 'text-dark-500';
      case 'bug': return 'text-dark-500';
      default: return 'text-dark-500';
    }
  };

  const countItems = (nodes) => {
    let count = { tasks: 0, subtasks: 0, bugs: 0 };
    
    const traverse = (items) => {
      items.forEach(item => {
        if (item.data.type === 'task') count.tasks++;
        else if (item.data.type === 'subtask') count.subtasks++;
        else if (item.data.type === 'bug') count.bugs++;
        
        if (item.children) {
          traverse(item.children);
        }
      });
    };
    
    traverse(nodes);
    return count;
  };

  const nodeTemplate = (node) => {
    const nodeData = node.data;
    
    return (
      <div className="projectover-view flex align-items-center justify-content-between w-full">
        <div className="flex align-items-center gap-2">
          <span className={`${getTypeColor(nodeData.type)}`}>
            {node.label}
          </span>
          {nodeData.type === 'project' && nodeData.module && (
            <Chip label={nodeData.module} className="p-chip-outlined" />
          )}
        </div>
        
        <div className="flex align-items-center gap-2">
          {nodeData.priority && getPriorityChip(nodeData.priority)}
          {nodeData.status && getStatusBadge(nodeData.status)}
          {node.children && (
            <Chip 
              label={`${node.children.length} items`} 
              className="p-chip-outlined p-chip-sm"
            />
          )}
        </div>
      </div>
    );
  };

  const renderStatsCards = () => {
    const stats = countItems(projectData);
    
    return (
      <div className="grid">
        <div className="col-4 md:col-4">
          <Card className="" style={{boxShadow: "none", border: "1px solid #eee", backgroundColor: "#f9fafb"}}>
            <div className="d-flex justify-content-between align-items-start">
              <i className="pi pi-check-circle text-dark-600 text-2xl mr-3"></i>
              <div>
                <div className="text-2xl font-bold text-dark-700">{stats.tasks}</div>
                <div className="text-sm text-dark-600">Tasks</div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="col-4 md:col-4">
          <Card className="" style={{boxShadow: "none", border: "1px solid", border: "1px solid #eee", backgroundColor: "#f9fafb"}}>
            <div className="d-flex justify-content-between align-items-start">
              <i className="pi pi-list text-dark-600 text-2xl mr-3"></i>
              <div>
                <div className="text-2xl font-bold text-dark-700">{stats.subtasks}</div>
                <div className="text-sm text-dark-600">Subtasks</div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="col-4 md:col-4">
          <Card className="" style={{boxShadow: "none", border: "1px solid", border: "1px solid #eee", backgroundColor: "#f9fafb"}}>
            <div className="d-flex justify-content-between align-items-start">
              <i className="pi pi-exclamation-triangle text-dark-600 text-2xl mr-3"></i>
              <div>
                <div className="text-2xl font-bold text-dark-700">{stats.bugs}</div>
                <div className="text-sm text-dark-600">Bugs</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex align-items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-800 m-0">Project Overview</h2>
        {/* <Divider layout="vertical" /> */}
        {/* <p className="text-gray-600 text-sm m-0">Hierarchical view of tasks, subtasks, and bugs</p> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex align-items-center gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText 
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </span>
        <Button 
          label="Expand All"
          icon="pi pi-plus"
          size="small"
          onClick={expandAll}
          className="p-button-outlined"
        />
        <Button 
          label="Collapse All"
          icon="pi pi-minus"
          size="small"
          onClick={collapseAll}
          className="p-button-outlined"
        />
      </div>
    );
  };

  const legendTemplate = () => {
    return (
      <div className="flex align-items-center gap-4 text-sm text-gray-600">
        <div className="flex align-items-center gap-1">
          <i className="pi pi-check-circle text-success"></i>
          <span>Task</span>
        </div>
        <div className="flex align-items-center gap-1">
          <i className="pi pi-list text-warning"></i>
          <span>Subtask</span>
        </div>
        <div className="flex align-items-center gap-1">
          <i className="pi pi-exclamation-triangle text-danger"></i>
          <span>Bug</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-2">
      <style>{`
        .p-tree .p-tree-container .p-treenode .p-treenode-content {
          padding: 0.5rem;
        }
        .p-tree .p-tree-container .p-treenode .p-treenode-content:hover {
          background-color: #f8f9fa;
        }
        .p-chip-danger {
          background-color: #fecaca;
          color: #dc2626;
        }
        .p-chip-warning {
          background-color: #fef3c7;
          color: #d97706;
        }
        .p-chip-success {
          background-color: #dcfce7;
          color: #16a34a;
        }
        .p-chip-outlined {
          background-color: transparent;
          border: 1px solid #e5e7eb;
        }
        .p-chip-sm {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
        }
      `}</style>
      
      <Card className="">
        <Toolbar 
          left={leftToolbarTemplate} 
          right={rightToolbarTemplate}
          className="mb-4"
        />
        
        {renderStatsCards()}
        
        {/* <Divider /> */}
        
        <Panel 
          header="Project Structure" 
          className="mt-4"
          headerTemplate={(options) => (
            <div className="flex align-items-center justify-content-between w-full">
              <span className="text-lg font-semibold text-gray-700">
                {options.titleElement}
              </span>
              {legendTemplate()}
            </div>
          )}
        >
          <Tree 
            value={filteredNodes}
            expandedKeys={expandedKeys}
            onToggle={(e) => setExpandedKeys(e.value)}
            // selectionMode="checkbox"
            selectionKeys={selectedKeys}
            onSelectionChange={(e) => setSelectedKeys(e.value)}
            nodeTemplate={nodeTemplate}
            className="w-full"
            filter
            filterMode="lenient"
            filterPlaceholder="Search in tree..."
          />
        </Panel>
        
        {/* <Divider /> */}
        
        {/* <div className="text-center text-sm text-gray-500 mt-4">
          <i className="pi pi-info-circle mr-2"></i>
          Click on nodes to expand/collapse • Use search to filter items • Select items with checkboxes
        </div> */}
      </Card>
    </div>
  );
};

export default PrimeReactProjectTree;