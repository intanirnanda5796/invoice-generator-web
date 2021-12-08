import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { USERROUTES } from "routes";
import {
  Login,
  Dashboard,
  DetailInvoice,
  Invoice,
  CreatePayment,
  AdminDashboard,
  ListUser,
  CreateUser,
  SellerDashboard,
  NotFound,
  ListSellerInvoice
} from "pages";
import Template from "template";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path={USERROUTES.ROOT} element={<Login />}></Route>
        <Route path={USERROUTES.NOTFOUND} element={<NotFound />}></Route>
        <Route
          path={USERROUTES.BUYER_DASHBOARD}
          element={
            <Template>
              <Dashboard />
            </Template>
          }
        ></Route>
        <Route
          path={USERROUTES.BUYER_DETAIL_INVOICE}
          element={
            <Template>
              <DetailInvoice />
            </Template>
          }
        ></Route>
        <Route
          path={USERROUTES.SELLER_CREATEPAYMENT}
          element={
            <Template>
              <CreatePayment />
            </Template>
          }
        ></Route>
        <Route path={USERROUTES.SELLER_LIST_INVOICE} element={<Template> <ListSellerInvoice /> </Template>}>

        </Route>
        <Route
          path={USERROUTES.SELLER_DASHBOARD}
          element={
            <Template>
              <SellerDashboard />
            </Template>
          }
        ></Route>
        <Route
          path={USERROUTES.BUYER_INVOICE}
          element={
            <Template>
              <Invoice />
            </Template>
          }
        ></Route>
        <Route
          path={USERROUTES.ADMIN_DASHBOARD}
          element={
            <Template>
              <AdminDashboard />
            </Template>
          }
        ></Route>
        <Route
          path={USERROUTES.ADMIN_LIST_USER}
          element={
            <Template>
              <ListUser />
            </Template>
          }
        ></Route>
        <Route
          path={USERROUTES.ADMIN_CREATE_USER}
          element={
            <Template>
              <CreateUser />
            </Template>
          }
        ></Route>

        <Route
          component={NotFound}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
