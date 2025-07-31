import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";

const KanbanView = () => {
  const toast = useRef(null);
  const containerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  // Initial data structure
  const initialData = {
    todo: [
      {
        id: "Proj-101",
        name: "AI Generator",
        project: "AI Generator",
        code: "Proj-101",
        status: "Todo",
        workType: "Development",
        assigned: "Mahesh Kumar Bhoga",
        group: "AI Team",
        dueDate: "24-05-2025",
        startDate: "01-01-2025",
        endDate: "31-12-2025",
        blockers: "Due some issues",
        tasks: 13,
        completedTasks: 9,
      },
      {
        id: "Proj-104",
        name: "Image Enhancer AI",
        project: "Image Enhancer AI",
        code: "Proj-104",
        status: "Todo",
        workType: "Design",
        assigned: "Sneha Rao",
        group: "Frontend",
        dueDate: "05-08-2025",
        startDate: "10-01-2025",
        endDate: "20-12-2025",
        blockers: "Awaiting design mockups",
        tasks: 19,
        completedTasks: 10,
      },
      {
        id: "Proj-110",
        name: "Smart Form Autofill",
        project: "Smart Form Autofill",
        code: "Proj-110",
        status: "Done",
        workType: "Browser Plugin",
        assigned: "Harika Nair",
        group: "Frontend",
        dueDate: "20-07-2025",
        startDate: "22-01-2025",
        endDate: "31-10-2025",
        blockers: "Blocked on browser plugin API",
        tasks: 22,
        completedTasks: 16,
      }
    ],
    inProgress: [
      {
        id: "Proj-102",
        name: "Resume Parser",
        project: "Resume Parser",
        code: "Proj-102",
        status: "In Progress",
        workType: "Integration",
        assigned: "Anjali Mehta",
        group: "Backend",
        dueDate: "15-06-2025",
        startDate: "01-03-2025",
        endDate: "30-11-2025",
        blockers: "Awaiting data source integration",
        tasks: 17,
        completedTasks: 12,
      },
      {
        id: "Proj-106",
        name: "E-commerce Recommender",
        project: "E-commerce Recommender",
        code: "Proj-106",
        status: "In Progress",
        workType: "Analytics",
        assigned: "Arjun Varma",
        group: "AI Team",
        dueDate: "28-06-2025",
        startDate: "01-03-2025",
        endDate: "30-10-2025",
        blockers: "Blocked on analytics integration",
        tasks: 15,
        completedTasks: 8,
      },
    ],
    inReview: [
      {
        id: "Proj-103",
        name: "Chatbot Assistant",
        project: "Chatbot Assistant",
        code: "Proj-103",
        status: "In Review",
        workType: "API Integration",
        assigned: "Rahul Dev",
        group: "AI Team",
        dueDate: "10-07-2025",
        startDate: "05-02-2025",
        endDate: "15-12-2025",
        blockers: "Dependency on third-party API",
        tasks: 21,
        completedTasks: 14,
      },
      {
        id: "Proj-108",
        name: "Bug Tracker Tool",
        project: "Bug Tracker Tool",
        code: "Proj-108",
        status: "In Review",
        workType: "Testing",
        assigned: "Deepika Singh",
        group: "QA Team",
        dueDate: "25-06-2025",
        startDate: "10-02-2025",
        endDate: "30-09-2025",
        blockers: "Stalled on test case setup",
        tasks: 18,
        completedTasks: 13,
      },
    ],
    readyForQA: [
      {
        id: "Proj-109",
        name: "Performance Testing",
        project: "Performance Testing",
        code: "Proj-109",
        status: "Ready for QA",
        workType: "Testing",
        assigned: "Rajesh Kumar",
        group: "QA Team",
        dueDate: "30-06-2025",
        startDate: "01-06-2025",
        endDate: "15-07-2025",
        blockers: "",
        tasks: 10,
        completedTasks: 10,
      },
    ],
    qaInProgress: [
      {
        id: "Proj-111",
        name: "Security Audit",
        project: "Security Audit",
        code: "Proj-111",
        status: "QA in Progress",
        workType: "Security",
        assigned: "Nina Patel",
        group: "QA Team",
        dueDate: "15-07-2025",
        startDate: "16-06-2025",
        endDate: "31-07-2025",
        blockers: "Waiting for developer feedback",
        tasks: 8,
        completedTasks: 5,
      },
    ],
    blocked: [
      {
        id: "Proj-112",
        name: "API Rate Limiting",
        project: "API Rate Limiting",
        code: "Proj-112",
        status: "Blocked",
        workType: "Development",
        assigned: "Sam Wilson",
        group: "AI Team",
        dueDate: "20-07-2025",
        startDate: "01-07-2025",
        endDate: "31-07-2025",
        blockers: "Exceeded API call quota",
        tasks: 5,
        completedTasks: 2,
      },
    ],
    done: [
      {
        id: "Proj-107",
        name: "Social Media Scheduler",
        project: "Social Media Scheduler",
        code: "Proj-107",
        status: "Done",
        workType: "UI Design",
        assigned: "Vikas Jain",
        group: "Frontend",
        dueDate: "14-07-2025",
        startDate: "20-01-2025",
        endDate: "01-12-2025",
        blockers: "Delay in UI feedback",
        tasks: 11,
        completedTasks: 15,
      },
      {
        id: "Proj-110",
        name: "Smart Form Autofill",
        project: "Smart Form Autofill",
        code: "Proj-110",
        status: "Done",
        workType: "Browser Plugin",
        assigned: "Harika Nair",
        group: "Frontend",
        dueDate: "20-07-2025",
        startDate: "22-01-2025",
        endDate: "31-10-2025",
        blockers: "Blocked on browser plugin API",
        tasks: 22,
        completedTasks: 16,
      },
    ],
  };

  const [kanbanData, setKanbanData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [selectedCard, setSelectedCard] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter states
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedWorkType, setSelectedWorkType] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Drag and Drop state
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [dragSourceColumn, setDragSourceColumn] = useState(null);
  const [dragOverItemId, setDragOverItemId] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentHoverColumn, setCurrentHoverColumn] = useState(null);

  // Expanded columns
  const [expandedColumns, setExpandedColumns] = useState({});
  const CARDS_TO_SHOW = 3; // Limit visible cards to 3

  // Column structure
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inProgress", title: "In Progress" },
    { id: "inReview", title: "In Review" },
    { id: "readyForQA", title: "Ready for QA" },
    { id: "qaInProgress", title: "QA in Progress" },
    { id: "blocked", title: "Blocked" },
    { id: "done", title: "Done" },
  ];

  // Clear filters
  const handleClear = () => {
    setSelectedStatus(null);
    setSelectedWorkType(null);
    setSelectedAssignee(null);
    setSelectedGroup(null);
    setSearchTerm("");
    setKanbanData(originalData);
  };

  // Apply filters
  const applyFilters = () => {
    const filteredData = {};
    let hasResults = false;
    Object.keys(originalData).forEach(columnId => {
      filteredData[columnId] = originalData[columnId].filter(item => {
        if (selectedStatus && item.status !== selectedStatus.value) return false;
        if (selectedWorkType && item.workType !== selectedWorkType.name) return false;
        if (selectedAssignee && item.assigned !== selectedAssignee.name) return false;
        if (selectedGroup && item.group !== selectedGroup.name) return false;
        if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        hasResults = true;
        return true;
      });
    });

    if (!hasResults) {
      toast.current?.show({
        severity: 'warn',
        summary: 'No Matches Found',
        detail: 'Try adjusting your filters.',
        life: 3000,
      });
    }

    setKanbanData(filteredData);
  };

  // Toggle column expand
  const toggleColumnExpand = (columnId) => {
    setExpandedColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  // Auto-scroll when dragging near edges
  useEffect(() => {
    if (!isDragging || !containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollSpeed = 15;
    const scrollThreshold = 100;

    if (scrollTimerRef.current) clearInterval(scrollTimerRef.current);
    scrollTimerRef.current = null;

    if (dragPosition.x > containerRect.right - scrollThreshold) {
      scrollTimerRef.current = setInterval(() => container.scrollLeft += scrollSpeed, 30);
    } else if (dragPosition.x < containerRect.left + scrollThreshold) {
      scrollTimerRef.current = setInterval(() => container.scrollLeft -= scrollSpeed, 30);
    }

    return () => {
      if (scrollTimerRef.current) clearInterval(scrollTimerRef.current);
    };
  }, [isDragging, dragPosition]);

  const onDragOver = (event, columnId = null) => {
    event.preventDefault();
    setDragPosition({ x: event.clientX, y: event.clientY });
    if (columnId && columnId !== currentHoverColumn) setCurrentHoverColumn(columnId);
  };

  const onDragStart = (event, itemId, columnId) => {
    event.dataTransfer.setData('itemId', itemId);
    event.dataTransfer.setData('sourceColumnId', columnId);
    setDraggedItemId(itemId);
    setDragSourceColumn(columnId);
    setIsDragging(true);
    if (event.target.classList) event.target.classList.add('dragging');
  };

  const onDragEnter = (event, itemId) => {
    if (draggedItemId !== itemId) setDragOverItemId(itemId);
  };

  const onDragEnd = (event) => {
    if (event.target.classList) event.target.classList.remove('dragging');
    setDragOverItemId(null);
    setIsDragging(false);
    setCurrentHoverColumn(null);
    if (scrollTimerRef.current) clearInterval(scrollTimerRef.current);
  };

  const onDrop = (event, dropColumnId) => {
    event.preventDefault();

    const itemId = event.dataTransfer.getData('itemId');
    const sourceColumnId = event.dataTransfer.getData('sourceColumnId');

    if (itemId && sourceColumnId && sourceColumnId !== dropColumnId) { // Ensure source and target columns are different
      const newFilteredData = { ...kanbanData };
      const newOriginalData = { ...originalData };

      const sourceItems = [...newFilteredData[sourceColumnId]];
      const itemIndex = sourceItems.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const movedItem = { ...sourceItems[itemIndex] }; // Clone the item to modify its status
        movedItem.status = columns.find(column => column.id === dropColumnId)?.title || "Unknown"; // Update status

        sourceItems.splice(itemIndex, 1);
        newFilteredData[sourceColumnId] = sourceItems;

        const targetItems = [...newFilteredData[dropColumnId], movedItem];
        newFilteredData[dropColumnId] = targetItems;

        const originalSourceItems = [...newOriginalData[sourceColumnId]];
        const originalItemIndex = originalSourceItems.findIndex(item => item.id === itemId);
        if (originalItemIndex !== -1) {
          originalSourceItems.splice(originalItemIndex, 1);
          newOriginalData[sourceColumnId] = originalSourceItems;
        }

        const originalTargetItems = [...newOriginalData[dropColumnId], movedItem];
        newOriginalData[dropColumnId] = originalTargetItems;

        // Get source and target column names
        const sourceColumnName = columns.find(column => column.id === sourceColumnId)?.title || "Unknown";
        const targetColumnName = columns.find(column => column.id === dropColumnId)?.title || "Unknown";

        // Show toast message with the project name, source, and target columns
        if (toast.current) {
          toast.current.clear(); // Clear any existing toast messages to avoid overlap
          toast.current.show({
            severity: 'info',
            summary: `Project: ${movedItem.name}`, // Display project name
            detail: `Moved from "${sourceColumnName}" to "${targetColumnName}"`, // Display source and target columns
            life: 3000,
          });
        }

        setKanbanData(newFilteredData);
        setOriginalData(newOriginalData);
      }

      setDraggedItemId(null);
      setDragSourceColumn(null);
      setDragOverItemId(null);
      setIsDragging(false);
    }
  };

  const renderCard = (item, columnId) => (
    <div
      key={item.id}
      draggable
      onDragStart={(e) => onDragStart(e, item.id, columnId)}
      onDragEnd={onDragEnd}
      onDragEnter={(e) => onDragEnter(e, item.id)}
      onDragOver={onDragOver}
      className={`card-container ${dragOverItemId === item.id ? 'drag-over' : ''}`}
      style={{ cursor: 'move', transition: 'all 0.3s ease', position: 'relative' }}
      onClick={() => {
        setSelectedCard(item);
        setSidebarOpen(true);
      }}
    >
      <Card className="p-2 shadow-sm border mb-2 bg-white">
        <div className="flex justify-content-between align-items-center">
          <div>
            <div className="text-gray-800 font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">Project: {item.project}</div>
            <div className="text-xs text-gray-400">Code: {item.code}</div>
          </div>
          {/* <Avatar label={item.assigned[0]} size="small" shape="circle" /> */}
        </div>
        <div className="text-xs text-gray-400">Due: {item.dueDate}</div>
        <div className="text-xs text-gray-500 mt-1">Group: {item.group}</div>
        <div className="text-xs text-gray-500 mt-1">Assigned: {item.assigned}</div>
      </Card>
      {dragOverItemId === item.id && draggedItemId !== item.id && (
        <div className="drop-indicator"></div>
      )}
    </div>
  );

  const renderColumnContent = (columnId) => {
    const visibleCards = getVisibleCards(columnId);
    if (visibleCards.length === 0) {
      return (
        <div className="text-center text-gray-500 py-3">
          No cards available in this column.
        </div>
      );
    }
    return visibleCards.map((item) => renderCard(item, columnId));
  };

  const getVisibleCards = (columnId) => {
    const cards = kanbanData[columnId] || [];
    if (cards.length <= CARDS_TO_SHOW || expandedColumns[columnId]) return cards;
    return cards.slice(0, CARDS_TO_SHOW); // Show only the first 3 cards
  };

  const hasMoreCards = (columnId) => (kanbanData[columnId]?.length || 0) > CARDS_TO_SHOW;

  // Global drag over listener
  useEffect(() => {
    const handleGlobalDragOver = (e) => {
      if (isDragging) {
        e.preventDefault();
        setDragPosition({ x: e.clientX, y: e.clientY });
      }
    };
    document.addEventListener('dragover', handleGlobalDragOver);
    return () => document.removeEventListener('dragover', handleGlobalDragOver);
  }, [isDragging]);

  // Updated filter options
  const statuses = [
    { label: "Todo", value: "Todo" },
    { label: "In Progress", value: "In Progress" },
    { label: "In Review", value: "In Review" },
    { label: "Ready for QA", value: "Ready for QA" },
    { label: "QA in Progress", value: "QA in Progress" },
    { label: "Blocked", value: "Blocked" },
    { label: "Done", value: "Done" },
  ];

  const workTypes = [
    { name: "Development", code: "DEV" },
    { name: "Integration", code: "INT" },
    { name: "API Integration", code: "API" },
    { name: "Design", code: "DES" },
  ];

  const assignees = [
    { name: "Mahesh Kumar Bhoga", id: "MK001" },
    { name: "Anjali Mehta", id: "AM002" },
    { name: "Rahul Dev", id: "RD003" },
  ];

  const groups = [
    { name: "AI Team", code: "AIT" },
    { name: "Backend", code: "BACK" },
    { name: "Frontend", code: "FRONT" },
  ];

  // Updated filter application logic
  const handleFilterChange = (filterType, value) => {
    const updatedFilters = {
      selectedStatus: filterType === "status" ? value : selectedStatus,
      selectedWorkType: filterType === "workType" ? value : selectedWorkType,
      selectedAssignee: filterType === "assignee" ? value : selectedAssignee,
      selectedGroup: filterType === "group" ? value : selectedGroup,
    };

    setSelectedStatus(updatedFilters.selectedStatus);
    setSelectedWorkType(updatedFilters.selectedWorkType);
    setSelectedAssignee(updatedFilters.selectedAssignee);
    setSelectedGroup(updatedFilters.selectedGroup);

    const filteredData = {};
    Object.keys(originalData).forEach((columnId) => {
      filteredData[columnId] = originalData[columnId].filter((item) => {
        if (updatedFilters.selectedStatus && item.status !== updatedFilters.selectedStatus) return false;
        if (updatedFilters.selectedWorkType && item.workType !== updatedFilters.selectedWorkType.name) return false;
        if (updatedFilters.selectedAssignee && item.assigned !== updatedFilters.selectedAssignee.name) return false;
        if (updatedFilters.selectedGroup && item.group !== updatedFilters.selectedGroup.name) return false;
        return true;
      });
    });

    setKanbanData(filteredData);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Toast ref={toast} />
        <Container fluid>
          <Row className="align-items-center breadcrumb-card ac-items">
            <Col xl={12}>
              <span className="icons-ac">
                <Dropdown
                  value={selectedStatus}
                  onChange={(e) => handleFilterChange("status", e.value)}
                  options={statuses}
                  optionLabel="label"
                  placeholder="Status"
                  className="w-full md:w-10rem icons-btn bgclr me-1"
                />
                <Dropdown
                  value={selectedWorkType}
                  onChange={(e) => handleFilterChange("workType", e.value)}
                  options={workTypes}
                  optionLabel="name"
                  placeholder="Group"
                  className="w-full md:w-11rem icons-btn bgclr me-1"
                />
                <Dropdown
                  value={selectedAssignee}
                  onChange={(e) => handleFilterChange("assignee", e.value)}
                  options={assignees}
                  optionLabel="name"
                  placeholder="Assignee"
                  className="w-full md:w-10rem icons-btn bgclr me-1"
                />
                <Dropdown
                  value={selectedGroup}
                  onChange={(e) => handleFilterChange("group", e.value)}
                  options={groups}
                  optionLabel="name"
                  placeholder="Group"
                  className="w-full md:w-10rem icons-btn bgclr me-1"
                />
                <InputText
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleFilterChange("search", e.target.value);
                  }}
                  placeholder="Search"
                  className="me-1 md:w-8rem"
                />
                <button type="button" className="btn btn-secondary icons-btn me-1" onClick={handleClear}>
                  Clear
                </button>
              </span>
            </Col>
          </Row>

          <Row className="pt-3" style={{ flex: 1, overflow: 'hidden' }}>
            <Col lg={12}>
              <div
                ref={containerRef}
                className="flex gap-3 kanban-scroll-container"
                style={{
                  width: '100%',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  paddingBottom: '16px',
                }}
              >
                {columns.map((column) => (
                  <div
                    key={column.id}
                    id={`column-${column.id}`}
                    className={`flex-none w-80 kanban-view ${currentHoverColumn === column.id ? 'column-hover' : ''}`}
                    onDragOver={(e) => onDragOver(e, column.id)}
                    onDrop={(e) => onDrop(e, column.id)}
                  >
                    <Card className="bg-gray-100">
                      <div className="flex justify-content-between mb-2 align-items-start">
                        <h3 className="text-gray-700 font-semibold">{column.title}</h3>
                        <Badge value={kanbanData[column.id]?.length || 0} className="bg-blue-500 text-white mb-2" />
                      </div>
                      <div
                        className="min-h-40 p-2 rounded kanban-column-content"
                        style={{
                          minHeight: '200px',
                          maxHeight: 'calc(100vh - 200px)',
                          overflowY: 'auto',
                          padding: '8px',
                          transition: 'background-color 0.3s ease',
                        }}
                      >
                        {renderColumnContent(column.id)}
                        {kanbanData[column.id]?.length > CARDS_TO_SHOW && (
                          <div className="text-center mt-2">
                            <Button
                              className="p-button-text p-button-sm"
                              onClick={() => toggleColumnExpand(column.id)}
                              icon={expandedColumns[column.id] ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                              label={expandedColumns[column.id] ? "Show Less" : `Show More (${kanbanData[column.id].length - CARDS_TO_SHOW})`}
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
                {isDragging && (
                  <>
                    <div className="scroll-indicator left" />
                    <div className="scroll-indicator right" />
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sidebar for Task Details */}
      <Dialog
          header={<h3 className="text-white font-bold text-left">Task Details</h3>}
        visible={sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        modal
        style={{ width: '50vw', borderRadius: '10px' }}
        className="p-dialog-custom"
      >
        {selectedCard && (
          <div className="p-4 bg-light">
            <h3 className="text-primary font-bold mb-4">
              <i className="pi pi-folder-open text-primary mr-2"></i>
              {selectedCard.name}
            </h3>
            <div className="grid">
              <div className="col-6">
                <div className="mb-3">
                  <i className="pi pi-briefcase text-blue-500 mr-2"></i>
                  <strong>Project:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.project}</p>
                </div>
                <div className="mb-3">
                  <i className="pi pi-hashtag text-green-500 mr-2"></i>
                  <strong>Code:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.code}</p>
                </div>
                <div className="mb-3">
                  <i className="pi pi-tag text-orange-500 mr-2"></i>
                  <strong>Status:</strong>
                  <Badge value={selectedCard.status} className="bg-blue-500 text-white ml-4" />
                </div>
                <div className="mb-3">
                  <i className="pi pi-cog text-purple-500 mr-2"></i>
                  <strong>Work Type:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.workType}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <i className="pi pi-user text-teal-500 mr-2"></i>
                  <strong>Assigned:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.assigned}</p>
                </div>
                <div className="mb-3">
                  <i className="pi pi-users text-pink-500 mr-2"></i>
                  <strong>Group:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.group}</p>
                </div>
                <div className="mb-3">
                  <i className="pi pi-calendar text-yellow-500 mr-2"></i>
                  <strong>Due Date:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.dueDate}</p>
                </div>
                <div className="mb-3">
                  <i className="pi pi-calendar-plus text-cyan-500 mr-2"></i>
                  <strong>Start Date:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.startDate}</p>
                </div>
                <div className="mb-3">
                  <i className="pi pi-calendar-minus text-red-500 mr-2"></i>
                  <strong>End Date:</strong>
                  <p className="text-gray-700 ml-4">{selectedCard.endDate}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <i className="pi pi-tasks text-green-500 mr-2"></i>
              <strong>Tasks:</strong>
              <p className="text-gray-600 ml-4">
                {selectedCard.completedTasks} of {selectedCard.tasks} tasks completed
              </p>
            </div>
            <div className="mt-4">
              <i className="pi pi-exclamation-circle text-red-500 mr-2"></i>
              <strong>Blockers:</strong>
              <p className="text-gray-600 ml-4">{selectedCard.blockers || "No blockers reported."}</p>
            </div>
          </div>
        )}
      </Dialog>

      <style jsx>{`
        .kanban-scroll_container {
          position: relative;
          overflow-x: auto;
          scrollbar-width: thin; /* For Firefox */
        }

        .kanban-scroll_container::-webkit-scrollbar {
          height: 8px; /* Horizontal scrollbar height */
        }

        .kanban-scroll_container::-webkit-scrollbar-thumb {
          background-color: #f7f7f7; /* Much lighter scrollbar thumb color */
          border-radius: 4px;
        }

        .kanban-scroll_container::-webkit-scrollbar-thumb:hover {
          background-color: #eeeeee; /* Slightly darker on hover */
        }

        .kanban-scroll_container::-webkit-scrollbar-track {
          background-color: #fcfcfc; /* Much lighter scrollbar track color */
        }

        .kanban-column-content::-webkit-scrollbar {
          width: 8px; /* Vertical scrollbar width for column content */
        }

        .kanban-column-content::-webkit-scrollbar-thumb {
          background-color: #d3d3d3; /* Light scrollbar thumb color */
          border-radius: 4px;
        }

        .kanban-column-content::-webkit-scrollbar-thumb:hover {
          background-color: #b0b0b0; /* Slightly darker on hover */
        }

        .kanban-column-content::-webkit-scrollbar-track {
          background-color: #f9f9f9; /* Light scrollbar track color */
        }

        .kanban-view {
          min-width: 250px;
        }
        .card-container {
          transition: all 0.3s ease;
        }
        .dragging {
          opacity: 0.5;
        }
        .drag-over {
          transform: translateY(2px);
        }
        .column-hover {
          z-index: 5;
        }
        .drop-indicator {
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: #3b82f6;
          border-radius: 2px;
          z-index: 10;
        }
        .scroll-indicator {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 20px;
          pointer-events: none;
          z-index: 10;
        }
        .scroll-indicator.left {
          left: 0;
          background: linear-gradient(to right, rgba(59, 130, 246, 0.2), transparent);
        }
        .scroll-indicator.right {
          right: 0;
          background: linear-gradient(to left, rgba(59, 130, 246, 0.2), transparent);
        }
        .p-dialog-custom .p_dialog_header {
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
          text-align: left; /* Align header to the left */
        }
        .p-dialog-custom .p_dialog_content {
          background-color: #f9f9f9;
        }
        .p-dialog-custom .p_dialog_footer {
          background-color: #f1f1f1;
        }
        .bg-light {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
        }
        .text-primary {
          color: #007bff;
        }
      `}</style>
    </React.Fragment>
  );
};

export default KanbanView;