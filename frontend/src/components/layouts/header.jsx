import { useState, useEffect, useRef } from "react";
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { USERROUTES } from "routes";

const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const ref = useRef();

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("access_role");
    Cookies.remove("access_fullname");
    navigate(USERROUTES.ROOT);
  };

  const toggle = () => {
    setMenu(!ref.current);
  };

  useEffect(() => {
    ref.current = menu;
    const name = Cookies.get("access_fullname");
    const role = Cookies.get("access_role");
    setName(name);
    setRole(role);
  }, [menu]);

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex header__menu-bar">
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <Form className="p-3">
                  <FormGroup className="m-0">
                    <InputGroup>
                      <Input type="text" className="form-control" />
                      <InputGroupAddon addonType="append">
                        <Button color="primary" type="submit">
                          <i className="ri-search-line"></i>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </div>
            </div>

            <Dropdown
              isOpen={menu}
              toggle={toggle}
              className="d-inline-block user-dropdown"
            >
              <DropdownToggle
                tag="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
              >
                <span className="d-none d-xl-inline-block ms-1 text-transform">
                  hi, {name} {`(${role.toLowerCase()})`}
                </span>
                <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem className="text-danger" onClick={handleLogout}>
                  <i className="ri-shut-down-line align-middle me-1 text-danger"></i>{" "}
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
