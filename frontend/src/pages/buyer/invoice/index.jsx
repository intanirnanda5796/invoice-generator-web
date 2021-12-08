import { Card, CardBody, Container} from "reactstrap";
import { useCallback, useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { USERROUTES } from "routes";
import Table from "components/table";
import { buyerListInvoice } from "action";
import Breadcrumbs from "components/breadcrumb";

const Invoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataListInvoice = useSelector((state) => state.buyerReducer.data);
  const [breadCrumbItems] = useState([
    { title: "Dashboard", link: "/buyer/dashboard" },
    { title: "List Invoices", link: "/buyer/invoice" },
  ]);
  const headers = [
    {
      key: "no_invoice",
      name: "No Invoice",
    },
    {
      key: "action",
      name: "Action",
    },
  ];

  const fetchApi = useCallback(async () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(buyerListInvoice(token));
    } else {
      navigate(USERROUTES.ROOT);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);
  return (
    <>
      <Container fluid>
        <Breadcrumbs breadcrumbItems={breadCrumbItems} />
        <Card>
          <CardBody>
            <h4 className="card-title">
              <strong>Invoice History</strong>
            </h4>
            <p className="card-title-desc">Buyer can see list of Invoices</p>

            <div className="table-responsive table-payment">
              <Table
                headers={headers}
                rows={dataListInvoice.map((val) => {
                  return {
                    ...val,
                    action: (
                      <>
                        <Link
                          to={USERROUTES.BUYER_DETAIL_INVOICE.replace(
                            ":id",
                            val.id
                          )}
                          className="btn btn-primary"
                        >
                          Preview PDF
                        </Link>
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
export default Invoice;
