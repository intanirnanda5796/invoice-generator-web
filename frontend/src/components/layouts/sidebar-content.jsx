import Cookies from "js-cookie";
import { USERROUTES } from "routes";

const SidebarContent = () => {
  return (
    <>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">Menu</li>

          <li>
            <a
              href={
                Cookies.get("access_role") === "ADMIN"
                  ? USERROUTES.ADMIN_DASHBOARD
                  : Cookies.get("access_role") === "SELLERS"
                  ? USERROUTES.SELLER_DASHBOARD
                  : USERROUTES.BUYER_DASHBOARD
              }
              className="waves-effect"
            >
              <i className="ri-dashboard-line"></i>
              <span className="ms-1">Dashboard</span>
            </a>
          </li>

          {Cookies.get("access_role") === "ADMIN" ? (
            <li>
              <a href={USERROUTES.ADMIN_LIST_USER} className="waves-effect">
                <i className="ri-bank-card-line"></i>
                <span className="ms-1">User</span>
              </a>
            </li>
          ) : Cookies.get("access_role") === "SELLERS" ? (
            <li>
              <a href={USERROUTES.SELLER_LIST_INVOICE} className="waves-effect">
                <i className="ri-bank-card-line">
                  <span className="ms-1">Payment</span>
                </i>
              </a>
            </li>
          ) : (
            <li>
              <a href={USERROUTES.BUYER_INVOICE} className="waves-effect">
                <i className="ri-bank-card-line"></i>
                <span className="ms-1">Invoice</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default SidebarContent;
