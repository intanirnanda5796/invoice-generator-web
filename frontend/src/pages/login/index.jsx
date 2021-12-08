import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Button,
  Container,
  Label,
  FormFeedback,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { loginAction } from "action";
import { USERROUTES } from "routes";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dateAddOneHour = new Date(Date.now() + 3600000);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  const handleSubmit = () => {
    dispatch(loginAction(email, password))
      .then((data) => {
        Cookies.set("access_fullname", data.fullname, {
          expires: dateAddOneHour,
        });
        Cookies.set("access_token", data.token, {
          expires: dateAddOneHour,
        });
        Cookies.set("access_role", data.role, { expires: dateAddOneHour });
        if (data.role === "ADMIN") {
          navigate(USERROUTES.ADMIN_DASHBOARD);
        } else if (data.role === "SELLERS") {
          navigate(USERROUTES.SELLER_DASHBOARD);
        } else if (data.role === "BUYERS") {
          navigate(USERROUTES.BUYER_DASHBOARD);
        }
      })
      .catch(e => {
        if (typeof e.message === 'object') {
          setEmailErrorMessage(e.message.email);
          setPasswordErrorMessage(e.message.password);
        }
      });
  };

  useEffect(() => {
    document.body.classList.add("auth-body-bg");

    return () => {
      document.body.classList.remove("auth-body-bg");
    };
  }, []);

  return (
    <>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={9}>
                      <div>
                        <div className="text-center">
                          <div>
                            <Link to="/" className="">
                            </Link>
                          </div>

                          <h4 className="font-size-18 mt-4">Welcome There !</h4>
                          <p className="text-muted">
                            Sign in to invoice generator web application
                          </p>
                        </div>

                        <div className="p-2 mt-5">
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-user-2-line auti-custom-input-icon"></i>
                            <Label htmlFor="username">Email</Label>
                            <Input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              placeholder="Enter username"
                              invalid={
                                emailErrorMessage !== null && emailErrorMessage !== ''
                              }
                            />
                            {emailErrorMessage && (
                              <FormFeedback>{emailErrorMessage}</FormFeedback>
                            )}
                          </div>

                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                            <Label htmlFor="userpassword">Password</Label>
                            <Input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                              placeholder="enter password"
                              invalid={
                                passwordErrorMessage !== null && passwordErrorMessage !== ''
                              }
                            />
                            {passwordErrorMessage && (
                              <FormFeedback>
                                {passwordErrorMessage}
                              </FormFeedback>
                            )}
                          </div>

                          <div className="mt-4 text-center">
                            <Button
                              color="primary"
                              className="w-md waves-effect waves-light"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Log In
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="authentication-bg">
                <div className="bg-overlay"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
