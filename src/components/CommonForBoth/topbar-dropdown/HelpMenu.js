import React, { useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Tooltip } from 'primereact/tooltip';
import { useNavigate } from "react-router-dom";

const HelpMenu = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const items = [
    {
      items: [
        {
          label: "Help",
          icon: "pi pi-question-circle",
        },
        {
          label: "Training",
          icon: "pi pi-graduation-cap",
        },
        {
          label: "Updates",
          icon: "pi pi-refresh",
        },
        {
          label: "Send Feedback",
          icon: "pi pi-send",
        },
        {
          label: "Apply Job",
          icon: "pi pi-briefcase",
          // disabled: true,
          command: () => navigate("/apply-job/job-101"),
          className: "apply-job"
        },
        {
          label: "Job Details",
          icon: "pi pi-info-circle",
          // disabled: true,
          command: () => navigate("/job-details"),
          className: "apply-job"
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Tooltip target=".help-icon-btn" content="Help & Info" position="bottom" />
              <div className="profilebtn">
                <Menu model={items} popup ref={menuRef} id="help_menu" className="profile-menu" />
                <Button
                  icon="pi pi-info-circle"
                  className="help-icon-btn"
                  onClick={(event) => menuRef.current.toggle(event)}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default HelpMenu;