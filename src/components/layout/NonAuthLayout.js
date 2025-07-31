import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * NonAuthLayout - Layout component for non-authenticated pages
 * Modernized functional component with hooks
 */
const NonAuthLayout = ({ children }) => {
  const location = useLocation();
  
  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  // Set document title based on current route
  React.useEffect(() => {
    const currentPage = capitalizeFirstLetter(location.pathname);
    document.title = `${currentPage} | PMS2-1.0 - Project Management System`;
  }, [location.pathname]);

  return <React.Fragment>{children}</React.Fragment>;
};

NonAuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NonAuthLayout;
