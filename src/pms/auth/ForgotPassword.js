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

const ForgotPassword = () => {
    const [email, setEmail] = useState("");


    return (
        <div className="flex justify-content-center align-items-center min-h-screen login-page">

            <Card style={{ width: '30rem' }} className='login-card'>


                <div className="flex justify-content-center align-items-center ">
                    <img src={Logo} width="150" height="64" className='mb-3' />
                </div>
                <div className="p-fluid">


                    {/* Company ID Field */}
                    <Row className='mb-3'>
                        <Col lg={12}>
                            <h3 className='reset-pass mb-3'>Reset Password</h3>
                        </Col>
                        <Col lg={12}>
                            <div className="p-field">
                                <label htmlFor="companyId">Enter Email ID *</label>
                                <InputText
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full"
                                />
                            </div>
                        </Col>
                    </Row>



                    <Row>
                        <Col lg={12}>
                            <div className=''>

                                <Button
                                    color="primary"
                                    className="btn btn-primary btn-main mb-3 mt-2"
                                >
                                    Verify Account
                                </Button>

                                <Link to="/">
                                    <p className='text-center backhome-txt'>Back Home</p>
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

export default ForgotPassword;
