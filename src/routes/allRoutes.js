import React from "react";

// Work Type
import WorkTypeAllActive from "../pms/resources/WorkTypeAllActive";
import WorkTypeEditForm from "../pms/resources/WorkTypeEditForm";

// Admin Dashboard

import AdminDashboard from "../pms/common-for-all/AdminDashboard";



//contacts

import ContactsAllActive from "../pms/contacts/ContactsAllActive";
import ContactEditForm from "../pms/contacts/ContactsEditForm";

//companies
import CompaniesAllActive from "../pms/clients/CompaniesAllActive";
import CompanyEditForm from "../pms/clients/CompanyEditForm";

// Projects

import ProjectAllActive from "../pms/projects/ProjectAllActive";


import ActionItems from "../pms/projects/ActionItems";
import AllActiveCompanies from "../pms/clients/CompaniesAllActive";
import ProjectEditForm from "../pms/projects/ProjectEditForm";

//reports


import LoginPage from "../features/auth/components/Login";


// New reports
import ProjectStatus from "../pms/reports/ProjectStatus";
import ProjectPhasesReport from "../pms/reports/ProjectPhasesReport";
import WorkTypeReport from "../pms/reports/WorkTypeReport";
import ResourceUtilization from "../pms/reports/ResourceUtilization";
import WeeklyReport from "../pms/reports/WeeklyReport";
import DailyReport from "../pms/reports/DailyReport";



// calender
import CalenderActive from "../pms/calendar/CalenderActive";
import CalenderAll from "../pms/calendar/CalenderAll";

// Add Menu

import ImportfromCsvWorkType from "../pms/resources/ImportfromCsvWorkType";
import ImportFromCSVCompanies from "../pms/clients/ImportfromcsvCompanies";
import ImportFromCSVContacts from "../pms/contacts/ImportfromcsvContacts";
import ImportfromcsvProject from "../pms/projects/ImportfromcsvProject";
import PharseProjectWorktType from "../pms/resources/PharseProjectWorktType";

// dashboard

// import RecruiterDashboard from "../features/dashboard/components/RecruiterDashboard";
import ManagerDashboard from "../pms/dashboard/ManagerDashboard";

// candidate pipeline
import TableView from "../pms/workflows/TableView";
import KanbanView from "../pms/workflows/KanbanView";

//  emials

import OutBox from "../pms/notifications/OutBox";
import SentEmails from "../pms/notifications/SentEmails";

//login 
// import LoginPage from "../features/auth/components/Login";

import EmailAC from "../pms/resources/EmailAC";
import TalentScan from "../pms/resources/TalentScan";

// Time sheet

import TimeSheet from "../pms/time-tracking/TimeSheet";
import KpiTracking from "../pms/time-tracking/KpiTracking";
import KpiPerformance from "../pms/time-tracking/KpiPerformance";


// Employee 

import EmployeeAllActive from "../pms/teams/EmployeesAllActive";
import EmployeeEditFrom from "../pms/teams/EmployeeEditForm";


const userRoutes = [

  
  // Work Type
  
  { path: "/worktype-editform", component: <WorkTypeEditForm /> },

  // Admin Dashboard

  { path: "/admin-dashboard", component: <AdminDashboard /> },

  
  
  // contacts
  
  { path: "/contacts-allactive", component: <ContactsAllActive /> },
  { path: "/contacts-editform", component: <ContactEditForm /> },
  
  
  // companies
  
  { path: "/companies-allactive", component: <CompaniesAllActive /> },
  { path: "/companies-editform", component: <CompanyEditForm /> },


  //Projects

  { path: "/allactive-project", component: <ProjectAllActive /> },
  { path: "/project-editform", component: <ProjectEditForm /> },
  { path: "/actionitems", component: <ActionItems /> },
  // { path: "/dashboard", component: <Dashboard /> },


  //reports

  { path: "/project-status", component: <ProjectStatus /> },
  { path: "/project-phases-report", component: <ProjectPhasesReport /> },
  { path: "/work-type-report", component: <WorkTypeReport /> },
  { path: "/resource-utilization", component: <ResourceUtilization /> },
  { path: "/weekly-report", component: <WeeklyReport /> },
  { path: "/daily-report", component: <DailyReport /> },

  // Calender
  { path: "/calendar-active", component: <CalenderActive /> },
  { path: "/calendar-all", component: <CalenderAll /> },


  // Tables

  { path: "/allactive-worktype", component: <WorkTypeAllActive /> },

  // dashboard

  { path: "/manager-dashboard", component: <ManagerDashboard /> },

  // Work Type pipeline
  { path: "/tableview", component: <TableView /> },
  { path: "/Kanbanview", component: <KanbanView /> },

  // Emails
  { path: "/outbox", component: <OutBox /> },
  { path: "/sentemails", component: <SentEmails /> },

  // Add Menu

  { path: "/importfromcsv-worktype", component: <ImportfromCsvWorkType /> },
  { path: "/importfromcsv-companies", component: <ImportFromCSVCompanies /> },
  { path: "/importfromcsv-contacts", component: <ImportFromCSVContacts /> },
  { path: "/importfromcsv-project", component: <ImportfromcsvProject /> },
  { path: "/pharse-projectworktype", component: <PharseProjectWorktType /> },

  { path: "/email-ac", component: <EmailAC /> },

  
  { path: "/talent-scan", component: <TalentScan /> },

  // Time sheet

  { path: "/timesheet", component: <TimeSheet /> },
  { path: "/kpi-tracking", component: <KpiTracking /> },
  { path: "/kpi-performance", component: <KpiPerformance /> },



  // Employee 

  { path: "/allactive-employees", component: <EmployeeAllActive /> },
  
  { path: "/employee-edit", component: <EmployeeEditFrom /> },

 



  //Login
  // { path: "/login", component: <LoginPage /> },



  // this route should be at the end of all other routes
  // { path: "/", component: <Dashboard /> },
];


export { userRoutes };


