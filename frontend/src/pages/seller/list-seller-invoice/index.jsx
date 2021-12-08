import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Container, Card, CardBody } from "reactstrap";
import moment from "moment";
import { USERROUTES } from "routes";
import Table from "components/table";
import { sellerListInvoice, sellerDeleteInvoice } from "action";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "components/breadcrumb";

const ListSellerInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataSellerListInvoice = useSelector((state) => state.sellerReducer.data);
  const [breadCrumbItems] = useState([
    { title: "Dashboard", link: "/admin/dashboard" },
    { title: "List Seller's Invoices", link: "#" },
  ]);
  const headers = [
    {
      key: "buyer_name",
      name: "Buyer Name",
    },
    {
      key: "no_invoice",
      name: "No Invoice",
    },
    {
      key: "created_at_formatted",
      name: "Created At",
    },
    {
      key: "action",
      name: "Action",
    },
  ];

  const fetchApi = useCallback(async () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(sellerListInvoice(token));
    } else {
      navigate(USERROUTES.ROOT);
    }
  }, [dispatch, navigate]);

  const deleteData = async (id) => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(sellerDeleteInvoice(id, token));
      navigate(0);
    } else {
      navigate(USERROUTES.ROOT);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <>
      <Container fluid>
        <Breadcrumbs
          breadcrumbItems={breadCrumbItems}
        />
        <Card>
          <CardBody>
            <h4 className="card-title">
              <strong>Invoice Seller History</strong>
            </h4>
            <p className="card-title-desc">
              Seller can see list of seller's invoice
            </p>

            <div className="btn-payment">
              <a
                type="button"
                className="waves-effect waves-light me-1 btn btn-primary"
                href={USERROUTES.SELLER_CREATEPAYMENT}
              >
                Generate Invoice
              </a>
            </div>
            <div className="table-responsive table-payment">
              <Table
                headers={headers}
                rows={dataSellerListInvoice.map((val) => {
                  return {
                    ...val,
                    buyer_name: val.buyer ? val.buyer.fullname : null,
                    created_at_formatted: moment(val.created_at)
                      .utc()
                      .utcOffset("+07:00")
                      .format("YYYY-MM-DD HH:mm:ss"),
                    action: (
                      <>
                        <button
                          onClick={() => deleteData(val.id)}
                          className="btn btn-danger"
                        >
                          DELETE
                        </button>
                      </>
                    ),
                  };
                })}
                className="table-payment"
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ListSellerInvoice;
