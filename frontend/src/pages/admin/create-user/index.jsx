import {
  Card,
  CardBody,
  Container,
  Row,
  Label,
  Col,
  Input,
  FormFeedback,
} from "reactstrap";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { USERROUTES } from "routes";
import { createUser } from "action";
import Breadcrumbs from "components/breadcrumb";
import { useDispatch } from "react-redux";

const CreateUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("SELLERS");
  const dispatch = useDispatch();
  const [breadCrumbItems] = useState([
    { title: "Dashboard", link: "/admin/dashboard" },
    { title: "List Users", link: "/admin/list-user" },
    { title: "Create New User", link: "#" },
  ]);

  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [fullnameErrorMessage, setFullnameErrorMessage] = useState(null);
  const [addressErrorMessage, setAddressErrorMessage] = useState(null);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(null);

  const handleSubmit = () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(createUser(email, password, fullname, address, phoneNumber, role, token))
      .then(data => {
        navigate(USERROUTES.ADMIN_LIST_USER);
      })
      .catch(e => {
        if (typeof e.message === 'object') {
          setEmailErrorMessage(e.message.email);
          setPasswordErrorMessage(e.message.password);
          setFullnameErrorMessage(e.message.fullname);
          setAddressErrorMessage(e.message.address);
          setPhoneNumberErrorMessage(e.message.phoneNumber);
        }
      });
        

    } else {
      navigate(USERROUTES.ROOT);
    }
  };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      navigate(USERROUTES.ROOT);
    }
  });

  return (
    <>
      <Container fluid>
        <Breadcrumbs breadcrumbItems={breadCrumbItems} />
        <Card>
          <CardBody>
            <h4 className="card-title">
              <strong>Create New User</strong>
            </h4>
            <p className="card-title-desc">Admin can create new user</p>

            <div className="payment-input">
              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Email
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    placeholder="Input your email"
                    id="example-text-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    invalid={emailErrorMessage !== null && emailErrorMessage !== ''}
                  />
                  {emailErrorMessage && (
                    <FormFeedback>{emailErrorMessage}</FormFeedback>
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Password
                </Label>
                <Col md={10}>
                  <Input
                    type="password"
                    placeholder="Input your password"
                    id="example-text-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    invalid={passwordErrorMessage !== null && passwordErrorMessage !== ''}
                  />
                  {passwordErrorMessage && <FormFeedback>{passwordErrorMessage}</FormFeedback>}
                </Col>
              </Row>

              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Fullname
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    placeholder="Input your fullname"
                    id="example-text-input"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    invalid={fullnameErrorMessage !== null && fullnameErrorMessage !== ''}
                  />
                  {fullnameErrorMessage && <FormFeedback>{fullnameErrorMessage}</FormFeedback>}
                </Col>
              </Row>

              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Address
                </Label>
                <Col md={10}>
                  <textarea
                    rows="10"
                    value={address}
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                  {addressErrorMessage && <FormFeedback>{addressErrorMessage}</FormFeedback>}
                </Col>
              </Row>

              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Phone Number
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    placeholder="Input your phone number"
                    id="example-text-input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    invalid={phoneNumberErrorMessage !== null && phoneNumberErrorMessage !== ''}
                  />
                  {phoneNumberErrorMessage && <FormFeedback>{phoneNumberErrorMessage}</FormFeedback>}
                </Col>
              </Row>

              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Role
                </Label>
                <Col md={10}>
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="SELLERS">SELLERS</option>
                    <option value="BUYERS">BUYERS</option>
                  </select>
                </Col>
              </Row>

              <div className="btn-submit">
                <button
                  type="submit"
                  className="waves-effect waves-light me-1 btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default CreateUser;
