import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const RecruiterDashboard = () => {

 

  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <div className="page-title-box mb-0 recruiter-dashboard actjobsum">

            <Row>
              <Col lg={12}>
                <h1 class="page-title mb-4">Employee Dashboard
                </h1>
              </Col>
            </Row>          
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RecruiterDashboard;
