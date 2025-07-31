import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
} from "reactstrap"
import Logo from '../../assets/images/ats-logo.png';

const LoginPage = () => {
    const [companyId, setCompanyId] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleLogin = () => {
        if (companyId === 'company1' && userId === 'user1' && password === 'password') {
            setLoginError(false);
            alert('Login Successful!');
            // Handle login success (e.g., redirect to another page)
        } else {
            setLoginError(true);
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen login-page">

            <Card style={{ width: '30rem' }} className='login-card'>

                {loginError && (
                    <Message severity="error" text="Invalid Company ID, User ID, or Password." />
                )}
                <div className="flex justify-content-center align-items-center ">
                    <img src={Logo} width="150" height="64" className='mb-2' />
                </div>
                <div className="p-fluid">


                    {/* Company ID Field */}
                    <Row className='mb-3'>
                        <Col lg={12}>
                            <h3 className='login-head mb-3'>Sign In</h3>
                        </Col>
                        <Col lg={12}>
                            <div className="p-field">
                                <label htmlFor="companyId">Company ID</label>
                                <InputText
                                    id="companyId"
                                    value={companyId}
                                    onChange={(e) => setCompanyId(e.target.value)}
                                    placeholder="PSS-001"
                                />
                            </div>
                        </Col>
                    </Row>


                    {/* User ID Field */}
                    <Row className='mb-3'>
                        <Col lg={12}>
                            <div className="p-field">
                                <label htmlFor="userId">User ID</label>
                                <InputText
                                    id="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="Recruiter-001"
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row className='mb-3'>
                        <Col lg={12}>
                            {/* Password Field */}
                            <div className="p-field">
                                <label htmlFor="password">Password</label>
                                <Password
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    toggleMask
                                    placeholder="***********"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* Forgot Password Link */}
                    <div className="p-field d-flex justify-content-end mb-2">
                        <Link to="/forgot-password" className="p-link">Forgot Password?</Link>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <div className='d-flex justify-content-center'>
                                <Link to="/manager-dashboard">
                                    <Button
                                        color="primary"
                                        className="btn btn-primary btn-main mb-4"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </Button>
                                </Link>

                            </div>

                        </Col>
                    </Row>



                </div>
            </Card>

            <footer className="footer footer-back detailsformfooter loginfooter">
                <Container fluid={true}>
                    <Row className="d-flex">
                        <Col lg={6}>
                            <p className="d-flex justify-content-start mb-0"> &copy; 2025 Pranathi Software Services Pvt. Ltd., All rights reserved.</p>
                        </Col>
                        <Col lg={6}>
                            <div className="d-flex justify-content-end">
                                <Link to="">
                                    <p className="me-3 mb-0">Privacy Policy</p>
                                </Link>
                                <Link to="">
                                    <p className="me-3 mb-0">Terms of Service</p>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default LoginPage;
