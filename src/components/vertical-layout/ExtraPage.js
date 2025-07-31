import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { CardBody } from "reactstrap";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";

// Mapping of route paths to user-friendly names
const ROUTE_NAME_MAP = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/user-management': 'User Management',
  '/reports': 'Reports',
  // Add more routes as needed
};

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to manage open pages/tabs
  const [openPages, setOpenPages] = useState([
    { name: 'Home', path: '/' }
  ]);

  // State to manage active tab index
  const [activeIndex, setActiveIndex] = useState(0);

  // Effect to handle URL-based tab addition
  useEffect(() => {
    const currentPath = location.pathname;

    // Check if the current path is already in open pages
    const existingTabIndex = openPages.findIndex(page => page.path === currentPath);

    if (existingTabIndex === -1) {
      // Get user-friendly name for the route
      const routeName = ROUTE_NAME_MAP[currentPath] || 
                        currentPath.split('/').pop()?.replace(/-/g, ' ') || 
                        'New Page';

      // Add new tab
      const newTab = { 
        name: routeName.charAt(0).toUpperCase() + routeName.slice(1), 
        path: currentPath 
      };

      setOpenPages(prevPages => {
        // Limit max number of tabs (optional)
        const updatedPages = prevPages.length >= 10 
          ? [...prevPages.slice(1), newTab]
          : [...prevPages, newTab];
        
        return updatedPages;
      });

      // Set new tab as active
      setActiveIndex(openPages.length);
    } else {
      // If tab exists, set it as active
      setActiveIndex(existingTabIndex);
    }
  }, [location.pathname]);

  // Function to remove a tab
  const removeTab = (index) => {
    // Prevent removing the first (Home) tab
    if (index === 0) return;

    const updatedTabs = openPages.filter((_, i) => i !== index);
    setOpenPages(updatedTabs);

    // Adjust active index and navigate
    if (index <= activeIndex) {
      const newActiveIndex = Math.max(0, activeIndex - 1);
      setActiveIndex(newActiveIndex);
      
      // Navigate to the new active tab's path
      navigate(updatedTabs[newActiveIndex].path);
    }
  };

  // Handle tab change
  const onTabChange = (e) => {
    const selectedTab = openPages[e.index];
    setActiveIndex(e.index);
    
    // Navigate to the selected tab's path
    navigate(selectedTab.path);
  };

  return (
    <footer className="footer footer-back">
      <Container fluid={true} className="ps-0">
        <Row className="align-items-center">
          <Col lg={12} md={12} sm={12} className="footer-tabsec pe-0">
            <CardBody className="cardbody pe-0">
              <div className="accordian-menu footer-align close-tabssection">
                <TabView 
                  activeIndex={activeIndex} 
                  onTabChange={onTabChange}
                >
                  {openPages.map((tab, index) => (
                    <TabPanel
                      key={tab.path}
                      header={
                        <div className="footer-tabsec">
                          <span>{tab.name}</span>
                          {index !== 0 && (
                            <Button
                              icon="pi pi-times"
                              className="p-button-text p-button-sm ms-2"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent tab switch
                                removeTab(index);
                              }}
                            />
                          )}
                        </div>
                      }
                    >
                      {/* Optional: Add content for each tab if needed */}
                      <p className="m-0">Content for {tab.name}</p>
                    </TabPanel>
                  ))}
                </TabView>
              </div>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;