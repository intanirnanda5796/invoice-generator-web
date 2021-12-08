import Header from "components/layouts/header";
import Sidebar from "components/layouts/sidebar";
import Footer from "components/layouts/footer";
const Template = ({ children }) => {
    return (
        <>
          <div id="layout-wrapper">
          <Header />
            <Sidebar
            />
                <div className="main-content">
                  <div className="page-content">
                  {children}
                  </div>
                  <Footer/>
                </div>
          </div>
        </>
      );
}

export default Template;