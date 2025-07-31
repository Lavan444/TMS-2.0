import React from "react";


// Dashboard
import Dashboard from "../pages/Dashboard/index";



// import CustomFilterDemo from "pages/Tables/CustomFilterDemo";
import JobsAllactiveemp from "components/jobs/JobsAllactiveemp";


//candidatesf
import AllActiveemp from "../pms/resources/AllActiveemp";
import CandidateEditFrom from "components/candidates/CandidateEditForm";
import CandidateEditFormExtra from "../pms/resources/CandidateEditForm";
import AdminDashboard from "../pms/common-for-all/AdminDashboard";
import CandidatesMyActive from "../pms/resources/CandidatesMyActive";
import CandidatesTaskList from "../pms/resources/CandidatesTaskList";
import CandidatesAddedbyme from "../pms/resources/CandidatesAdded";
import CandidatesOpened from "../pms/resources/CandidatesOpened";
import CandidatesActivityLog from "../pms/resources/CandidatesActivity";
import CandidatesArchived from "../pms/resources/CandidatesArchived";
import CandidatesPool from "../pms/resources/CandidatePool";
import CandidatesDuplicate from "../pms/resources/CandidatesDuplicate";
import CreateCandidate from "../pms/resources/CreateCandidate";
//contacts
import ContactsAllActive from "../pms/contacts/ContactsAllActive";
import ContactsMyActive from "../pms/contacts/ContactsMyActive";
import ContactsTaskList from "../pms/contacts/ContactsTaskList";
import ContactsActivity from "../pms/contacts/ContactsActivity";
import ContactsArchived from "../pms/contacts/ContactsArchived";
import ContactsDuplicate from "../pms/contacts/ContactsDuplicate";
import ContactEditForm from "../pms/contacts/ContactsEditForm";
import ImportResumeCan from "../pms/resources/ImportResumeCan";

//companies
import CompaniesAllActive from "../pms/clients/CompaniesAllActive";
import CompaniesMyActive from "../pms/clients/CompaniesMyActive";
import CompaniesArchived from "../pms/clients/CompaniesArchived";
import CompaniesTaskList from "../pms/clients/CompaniesTaskList";
import CompaniesActivity from "../pms/clients/CompaniesActivity";
import CompaniesDuplicateList from "../pms/clients/CompaniesDuplicateList";
import CompanyEditForm from "../pms/clients/CompanyEditForm";

// jobs
import JobAllActive from "../pms/projects/JobAllActive";
import JobMyActive from "../pms/projects/JobMyActive";
import JobAddedByMe from "../pms/projects/JobAddedByMe";
import JobAssignedToMe from "../pms/projects/JobAssignedToMe";
import JobAllClosed from "../pms/projects/JobAllClosed";
import JobActivityLog from "../pms/projects/JobActivityLog";
import JobArchived from "../pms/projects/JobArchived";

import ActionItems from "../pms/projects/ActionItems";
import AllActiveCompanies from "../pms/clients/CompaniesAllActive";
import UploadResumeForm from "../pms/resources/UploadResumeForm";
import JobsEditForm from "../pms/projects/JobsEditForm";

//reports
import ActiveJobSummary from "../pms/reports/ActiveJobSummary";
import RecruiterPerformanceReport from "../pms/reports/RecruiterPerformanceReport";
import MyPlacementReport from "../pms/reports/MyPlacementReport";
import LoginPage from "../features/auth/components/Login";
import SourcePerformanceReport from "../pms/reports/SourcePerformanceReport";
import CallReport from "../pms/reports/CallReport";
import PlacementReport from "../pms/reports/PlacementReport";
import TimeToHire from "../pms/reports/TimeToHire";
import MyPipelineReport from "../pms/reports/MyPipelineReport";

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

// common
import ImportBulkResume from "../pms/common-for-all/ImportResume";
import ImportFromCSV from "../pms/resources/ImportfromcsvCandidates";
import ImportFromCSVCompanies from "../pms/clients/ImportfromcsvCompanies";
import ImportFromCSVContacts from "../pms/contacts/ImportfromcsvContacts";
import ImportFromCSVJobs from "../pms/projects/ImportfromcsvJobs";
import PharseProjectWorktType from "../pms/resources/PharseProjectWorktType";

// dashboard

import RecruiterDashboard from "../features/dashboard/components/RecruiterDashboard";
import ManagerDashboard from "../features/dashboard/components/ManagerDashboard";

// candidate pipeline
import TableView from "../pms/workflows/TableView";
import KanbanView from "../pms/workflows/KanbanView";

//  emials

import OutBox from "../pms/notifications/OutBox";
import SentEmails from "../pms/notifications/SentEmails";
// import CreateCandidate from "../pms/resources/CreateCandidate";

//login 
// import LoginPage from "../features/auth/components/Login";

import EmailAC from "../pms/resources/EmailAC";
import SubmitCandidatetoJob from "../pms/resources/SubmitCandidatetoJob";
import TalentScan from "../pms/resources/TalentScan";

// Time sheet

import TimeSheet from "../pms/time-tracking/TimeSheet";
import KpiTracking from "../pms/time-tracking/KpiTracking";
import KpiPerformance from "../pms/time-tracking/KpiPerformance";


// Employee 

import EmployeeAllActive from "../pms/teams/EmployeesAllActive";
import EmployeesMyActive from "../pms/teams/EmployeesMyActive";
import EmployeesTodoList from "../pms/teams/EmployeesTodoList";
import EmployeesAddedByMe from "../pms/teams/EmployeesAddedByMe";
import EmployeesOpened from "../pms/teams/EmployeesOpened";
import EmployeesArchived from "../pms/teams/EmployeesArchived";
import EmployeeEditFrom from "../pms/teams/EmployeeEditForm";


const userRoutes = [
  // Jobs
  { path: "/allactive-jobs", component: <JobAllActive /> },

  // Candidates

  { path: "/candidate-edit", component: <CandidateEditFrom /> },
  { path: "/candidate-editform", component: <CandidateEditFormExtra /> },
  { path: "/uploadresumeform", component: <UploadResumeForm /> },
  { path: "/admin-dashboard", component: <AdminDashboard /> },
  { path: "/myactive-candidates", component: <CandidatesMyActive /> },
  { path: "/candidates-tasklist", component: <CandidatesTaskList /> },
  { path: "/candidates-added", component: <CandidatesAddedbyme /> },
  { path: "/candidates-opened", component: <CandidatesOpened /> },
  { path: "/candidates-activity", component: <CandidatesActivityLog /> },
  { path: "/candidates-archived", component: <CandidatesArchived /> },
  { path: "/candidates-pool", component: <CandidatesPool /> },
  { path: "/candidates-duplicate", component: <CandidatesDuplicate /> },
  { path: "/create-candidate", component: <CreateCandidate /> },


  // contacts

  { path: "/contacts-allactive", component: <ContactsAllActive /> },
  { path: "/contacts-myactive", component: <ContactsMyActive /> },
  { path: "/contacts-tasklist", component: <ContactsTaskList /> },
  { path: "/contacts-activity", component: <ContactsActivity /> },
  { path: "/contacts-archived", component: <ContactsArchived /> },
  { path: "/contacts-duplicate", component: <ContactsDuplicate /> },
  { path: "/contacts-editform", component: <ContactEditForm /> },


  // companies

  { path: "/companies-allactive", component: <CompaniesAllActive /> },
  { path: "/companies-myactive", component: <CompaniesMyActive /> },
  { path: "/companies-archived", component: <CompaniesArchived /> },
  { path: "/companies-tasklist", component: <CompaniesTaskList /> },
  { path: "/companies-activity", component: <CompaniesActivity /> },
  { path: "/companies-duplicatelist", component: <CompaniesDuplicateList /> },
  { path: "/companies-editform", component: <CompanyEditForm /> },


  //jobs
  { path: "/allactive-jobs", component: <JobsAllactiveemp /> },
  { path: "/myactive-jobs", component: <JobMyActive /> },
  { path: "/addedbyme-jobs", component: <JobAddedByMe /> },
  { path: "/assignedtome-jobs", component: <JobAssignedToMe /> },
  { path: "/joballclosed-jobs", component: <JobAllClosed /> },
  { path: "/jobactivitylog-jobs", component: <JobActivityLog /> },
  { path: "/jobarchived-jobs", component: <JobArchived /> },
  { path: "/actionitems", component: <ActionItems /> },
  { path: "/jobs-editform", component: <JobsEditForm /> },
  { path: "/jobs-editform/:id", component: <JobsEditForm /> },
  { path: "/dashboard", component: <Dashboard /> },


  //reports
  { path: "/activejob-summary", component: <ActiveJobSummary /> },
  { path: "/recruiter-performance-report", component: <RecruiterPerformanceReport /> },
  { path: "/my-placement-report", component: <MyPlacementReport /> },
  { path: "/time-to-hire", component: <TimeToHire /> },
  { path: "/source-performance-report", component: <SourcePerformanceReport /> },
  { path: "/call-report", component: <CallReport /> },
  { path: "/placement-report", component: <PlacementReport /> },
  { path: "/pipeline-report", component: <MyPipelineReport /> },
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

  { path: "/allactive-candidates", component: <AllActiveemp /> },
  // { path: "/candidate-editform/:id", component: <CandidateEditFormExtra /> },

  // dashboard

  { path: "/recruiter-dashboard", component: <RecruiterDashboard /> },
  { path: "/manager-dashboard", component: <ManagerDashboard /> },

  // candidate pipeline
  { path: "/tableview", component: <TableView /> },
  { path: "/Kanbanview", component: <KanbanView /> },

  // Emails
  { path: "/outbox", component: <OutBox /> },
  { path: "/sentemails", component: <SentEmails /> },

  // common

  { path: "/import-bulkresume", component: <ImportBulkResume /> },
  { path: "/importfromcsv-candidates", component: <ImportFromCSV /> },
  { path: "/importfromcsv-companies", component: <ImportFromCSVCompanies /> },
  { path: "/importfromcsv-contacts", component: <ImportFromCSVContacts /> },
  { path: "/importfromcsv-jobs", component: <ImportFromCSVJobs /> },
  { path: "/pharse-projectworktype", component: <PharseProjectWorktType /> },

  { path: "/email-ac", component: <EmailAC /> },

  { path: "/submitcandidate-job", component: <SubmitCandidatetoJob /> },
  { path: "/import-resume-candidate", component: <ImportResumeCan /> },
  { path: "/talent-scan", component: <TalentScan /> },

  // Time sheet

  { path: "/timesheet", component: <TimeSheet /> },
  { path: "/kpi-tracking", component: <KpiTracking /> },
  { path: "/kpi-performance", component: <KpiPerformance /> },



  // Employee 

  { path: "/allactive-employees", component: <EmployeeAllActive /> },
  { path: "/myactive-employees", component: <EmployeesMyActive /> },
  { path: "/todolist-employees", component: <EmployeesTodoList /> },
  { path: "/added-employees", component: <EmployeesAddedByMe /> },
  { path: "/opened-employees", component: <EmployeesOpened /> },
  { path: "/archived-employees", component: <EmployeesArchived /> },
  { path: "/employee-edit", component: <EmployeeEditFrom /> },

  // { path: "/candidate-editform", component: <CandidateEditFormExtra /> },
  // { path: "/uploadresumeform", component: <UploadResumeForm /> },
  // { path: "/admin-dashboard", component: <AdminDashboard /> },

  // { path: "/candidates-activity", component: <CandidatesActivityLog /> },
  // { path: "/candidates-pool", component: <CandidatesPool /> },
  // { path: "/candidates-duplicate", component: <CandidatesDuplicate /> },
  // { path: "/create-candidate", component: <CreateCandidate /> },



  //Login
  // { path: "/login", component: <LoginPage /> },



  // this route should be at the end of all other routes
  // { path: "/", component: <Dashboard /> },
];


export { userRoutes };


