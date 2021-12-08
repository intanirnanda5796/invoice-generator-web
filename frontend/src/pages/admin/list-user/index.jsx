import { Container, Card, CardBody } from "reactstrap";
import Table from "components/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USERROUTES } from "routes";
import Cookies from "js-cookie";
import { listUser, deleteUser } from "action";
import Breadcrumbs from "components/breadcrumb";

const ListUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminReducer.data);
  const [breadCrumbItems] = useState([
    { title: "Dashboard", link: "/admin/dashboard" },
    { title: "List Users", link: "#" },
  ]);

  const headers = [
    {
      key: "email",
      name: "Email",
    },
    {
      key: "fullname",
      name: "Fullname",
    },
    {
      key: "address",
      name: "Address",
    },
    {
      key: "phone_number",
      name: "Phone Number",
    },
    {
      key: "action",
      name: "Action",
    },
  ];

  const fetchApi = useCallback(async () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(listUser(token));
    } else {
      navigate(USERROUTES.ROOT);
    }
  }, [dispatch, navigate]);

  const deleteData = async (id) => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(deleteUser(id, token));
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
              <strong>List Users</strong>
            </h4>
            <p className="card-title-desc">
              Admin can see list of users
            </p>

            <div className="btn-payment">
              <a
                type="button"
                className="waves-effect waves-light me-1 btn btn-primary"
                href={USERROUTES.ADMIN_CREATE_USER}
              >
                Add new User
              </a>
            </div>
            <div className="table-responsive table-payment">
              <Table
                headers={headers}
                rows={data && data.map((val) => {
                  return {
                    ...val,
                    action: (
                      <button
                        onClick={() => deleteData(val.id)}
                        className="btn btn-danger"
                      >
                        DELETE
                      </button>
                    ),
                  };
                })}
                className="table-payment"
              ></Table>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ListUser;
