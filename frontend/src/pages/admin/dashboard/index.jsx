import { useState, useEffect, useRef} from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "components/breadcrumb";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { USERROUTES } from "routes";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [menu] = useState(false);
    const [name, setName] = useState("");
    const ref = useRef();
   
    const [breadCrumbItems] = useState([
        { title: "Dashboard", link: "#" },
    ]);

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            ref.current = menu;
            const name = Cookies.get("access_fullname");
            setName(name);
        } else {
            navigate(USERROUTES.ROOT);
        }
      }, [menu, navigate]);

    return (
        <>
            <Container fluid>
                <Breadcrumbs breadcrumbItems={breadCrumbItems}/>
                    <Card>
                        <CardBody>
                            <p className="dashboard-admin__username">Hi, {name} !</p>
                            <h3 className="dashboard-admin__greeting">Welcome to Invoice Generator web application</h3>
                        </CardBody>
                    </Card>
            </Container>
        </>
    )
}

export default AdminDashboard;