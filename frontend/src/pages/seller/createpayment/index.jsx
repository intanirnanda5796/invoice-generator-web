import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Label,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { USERROUTES } from "routes";
import Breadcrumbs from "components/breadcrumb";
import { sellerListBuyer, sellerCreateInvoice } from "action";
import { useDispatch, useSelector } from "react-redux";

const CreatePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const dataSellerListBuyer = useSelector(state => state.sellerReducer.data);
  const [product, setProduct] = useState([
    { product_name: "", qty: 0, price: 0, total: 0 },
  ]);
  const [modal, setModal] = useState(false);
  const [breadCrumbItems] = useState([
    { title: "Dashboard", link: "/seller/dashboard" },
    { title: "List Seller's Invoice", link: "/seller/list-invoice" },
    { title: "Create New Invoice", link: "#" },
  ]);

  const fetchApi = useCallback(async () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(sellerListBuyer(token));
    } else {
      navigate(USERROUTES.ROOT);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...product];
    list[index][name] = value;
    list.forEach((val) => {
      val.total = parseInt(val.qty) * parseInt(val.price);
    });
    setProduct(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...product];
    list.splice(index, 1);
    setProduct(list);
  };

  const handleAddClick = () => {
    setProduct([...product, { product_name: "", qty: 0, price: 0, total: 0 }]);
  };

  const handleSubmit = async () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(sellerCreateInvoice(userId, product, token));
      navigate(USERROUTES.SELLER_LIST_INVOICE);
    } else {
      navigate(USERROUTES.ROOT);
    }
  };

  const handleModal = () => {
    setModal(!modal);
    removeBodyCss();
  };

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  return (
    <>
      <Container fluid>
      <Breadcrumbs
          breadcrumbItems={breadCrumbItems}
        />
        <Card>
          <CardBody>
            <h4 className="card-title">
              <strong>Create New Invoice</strong>
            </h4>
            <p className="card-title-desc">
              Seller can make new invoice for buyer
            </p>

            <div className="payment-input">
              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label">
                  User
                </Label>
                <Col md={10}>
                  <select
                    className="form-control"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}>
                    <option value="">-- Choose User --</option>
                    {dataSellerListBuyer.map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.fullname}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label">
                  Product
                </Label>
                <Col md={10}>
                  {product.map((val, i) => {
                    return (
                      <div style={{ marginBottom: "10px" }} key={i}>
                        <Row>
                          <Col md={3}>
                            <Input
                            type="text"
                            name="product_name"
                            className="payment-form__product-input"
                            value={val.product_name}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="input your product name"/>
                            <FormFeedback>invalid input</FormFeedback>
                          </Col>

                          <Col md={2}>
                            <Input
                            type="number"
                            name="qty"
                            className="payment-form__product-detail"
                            value={val.qty}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="input your product qty"/>
                            <FormFeedback>invalid input</FormFeedback>
                          </Col>

                          <Col md={2}>
                            <Input
                            type="number"
                            name="price"
                            className="payment-form__product-detail"
                            value={val.price}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="input your product price"/>
                            <FormFeedback>invalid input</FormFeedback>
                          </Col>

                          <Col md={3}>    
                            <Input
                            type="number"
                            name="total"
                            className="payment-form__product-detail"
                            value={val.qty * val.price}
                            readOnly/>
                          </Col>

                          <Col md={2}> 
                            {i === 0 ? <button
                                onClick={() => handleAddClick(i)}
                                className="btn btn-primary btn-add">
                                Add
                              </button> :
                              <button
                            onClick={() => handleRemoveClick(i)}
                            className="btn btn-primary btn-remove">
                            Remove
                          </button>}
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </Col>
              </Row>

              <Modal isOpen={modal} toggle={handleModal} backdrop="static">
                <ModalHeader
                  toggle={handleModal}>
                  <h4>Success</h4>
                </ModalHeader>
                <ModalBody>
                  <p>
                    You've successfully created new payment
                  </p>
                  <ModalFooter>
                    <Button type="button" color="primary" onClick={handleModal}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalBody>
              </Modal>

              <div className="btn-submit">
                <Button
                  type="submit"
                  color="primary"
                  className="waves-effect waves-light me-1 btn"
                  onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
export default CreatePayment;
