import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Home
            </Breadcrumb.Item>

            {pathnames.map((value, index) => {
                const to = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;

                return (
                    <Breadcrumb.Item
                        key={to}
                        linkAs={Link}
                        linkProps={{ to }}
                        active={isLast}
                    >
                        {value}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
