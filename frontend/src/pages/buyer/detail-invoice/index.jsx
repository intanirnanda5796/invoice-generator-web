import { Card, CardBody, Col, Row, Container, Table, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState} from "react";
import Cookies from "js-cookie";
import { USERROUTES } from "routes";
import moment from 'moment';
import { buyerDetailInvoice } from "action";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Breadcrumbs from "components/breadcrumb";

const DetailInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataDetailInvoice = useSelector(state => state.buyerReducer.detail);
  const [breadCrumbItems] = useState([
    { title: "Dashboard", link: "/buyer/dashboard" },
    { title: "List Invoices", link: "#" },
    { title: "Detail Invoice", link: "#" },
  ]);

  const fetchApi = useCallback(async () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(buyerDetailInvoice(id, token));
    } else {
      navigate(USERROUTES.ROOT);
    }
  }, [id, dispatch, navigate]);

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("Invoice.pdf");
      })
    ;
  }

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <Button color="primary" type="button" onClick={printDocument}>Export to PDF</Button>
          </Col>
          <Col xs={6} className="invoice-breadcrumb">
            <Breadcrumbs breadcrumbItems={breadCrumbItems}/>
          </Col>
        </Row>
        <Card id="divToPrint">
          <CardBody>
            <Row>
              <Col xs={6} className="detail-seller">
                <h5 className="detail-seller__name-seller">
                  <strong>{dataDetailInvoice ? dataDetailInvoice.seller.fullname : "-"}</strong>
                </h5>
                <p className="detail-seller__email-seller">
                  {dataDetailInvoice ? dataDetailInvoice.seller.email : "-"}
                </p>
                <p className="detail-seller__address-seller">
                  {dataDetailInvoice ? dataDetailInvoice.seller.address : "-"}
                </p>
              </Col>
              <Col xs={6} className="detail-invoice">
                <h4 className="detail-invoice__invoice-number">
                  <strong>Invoice {dataDetailInvoice ? dataDetailInvoice.no_invoice : "-"}</strong>
                </h4>
                <p className="detail-invoice__payment-due">
                  Payment Due : {dataDetailInvoice ? moment(dataDetailInvoice.created_at).utc().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss') : "-"}
                </p>
              </Col>
            </Row>

            <Row className="client">
              <Col xs={6} className="detail-client">
                <h5 className="detail-client__name-client">
                  <strong>{dataDetailInvoice ? dataDetailInvoice.buyer.fullname : "-"}</strong>
                </h5>
                <p className="detail-client__email-client">
                  {dataDetailInvoice ? dataDetailInvoice.buyer.email : "-"}
                </p>
                <p className="detail-client__address-client">
                  {dataDetailInvoice ? dataDetailInvoice.buyer.address : "-"}
                </p>
              </Col>
              <Col xs={6} className="detail-note">
                <h5 className="detail-note__note-title">
                  <strong>Note :</strong>
                </h5>
                <p className="detail-note__note-desc">
                  If the product you receive does not match the requirement,
                  please request a refund/refund within 2 days of receiving your
                  order
                </p>
              </Col>
            </Row>

            <div className="table-responsive table-product">
              <Table className="mb-0 table-product">
                <thead className="table-product__row-title">
                  <tr>
                    <th className="table-product__row-title-each">
                      <strong>No.</strong>
                    </th>
                    <th className="table-product__row-title-each">
                      <strong>Product Name</strong>
                    </th>
                    <th className="table-product__row-title-each">
                      <strong>Quantity</strong>
                    </th>
                    <th className="table-product__row-title-each">
                      <strong>Price</strong>
                    </th>
                    <th className="table-product__row-title-each">
                      <strong>Sub Total</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataDetailInvoice ? (
                    dataDetailInvoice.product.map((val, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{val.product_name}</td>
                        <td>
                          {new Intl.NumberFormat("id", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                            .format(val.qty)
                            .replace(",", ".")}
                        </td>
                        <td>
                          {new Intl.NumberFormat("id", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                            .format(val.price)
                            .replace(",", ".")}
                        </td>
                        <td>
                          {new Intl.NumberFormat("id", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                            .format(val.total)
                            .replace(",", ".")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>-</td>
                    </tr>
                  )}

                  <tr className="table-product__row-total">
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td className="table-product__total">
                      <strong>Total</strong>
                    </td>
                    <td className="table-product__total-amount">
                      <strong>
                        Rp.{" "}
                        {dataDetailInvoice
                          ? new Intl.NumberFormat("id", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })
                              .format(dataDetailInvoice.sub_total)
                              .replace(",", ".")
                          : "-"}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default DetailInvoice;
