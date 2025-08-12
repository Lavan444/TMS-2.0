import PropTypes from 'prop-types';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { connect } from "react-redux";

// Import Routes all
import { userRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import NonAuthLayout from "./components/NonAuthLayout";

import LoginPage from './features/auth/components/Login';
import ForgotPassword from './features/auth/components/ForgotPassword';

// import "./App.css"
// Import scss
import "./assets/scss/theme.scss";
import "./assets/css/main.css";
import "./assets/css/style-new.css";
import "./assets/css/responsive.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';               
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {

  return (
    <React.Fragment>
      <Routes>

        <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  {route.component}
                </Authmiddleware>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>

      </Routes>

      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      
    </React.Fragment>

  );
};

App.propTypes = {
  layout: PropTypes.any
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
