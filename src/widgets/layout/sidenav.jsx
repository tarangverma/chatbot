import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} 
      border border-gray-300 p-4 m-4 rounded bg-white ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4  h-[calc(100vh-32px)] w-60 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="flex items-center py-2 px-4">
          Rumi
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="items-center h-full relative">
  <div className="absolute top-5 p-1 w-full">
  <ul>
    {routes[0].pages.map(({ icon, name, path, hide }) => {
      if (hide) return null;
      return (
        <li key={name}>
          <NavLink to={`/${routes[0].layout}${path}`}>
            {({ isActive }) => (
              <Button
              variant="text"
              className="capitalize"
              fullWidth
              style={{
                borderRadius: 6,
                backgroundColor: isActive ? "#8CFFA5" : "#EAEBEA",
                fontWeight: 700,
                color: "black",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                padding: "6px 12px",
                fontSize: "14px",
                color: "#3F3C40",
                fontWeight: 900,
                fontFamily: "Poppins",
                fontStyle: "normal"
              }}
            >
                {icon}
                <Typography 
                style={{
                  fontSize: "14px",
                  color: "#3F3C40",
                  fontWeight: 900,
                  fontFamily: "Poppins",
                  fontStyle: "normal"
                }}
                 className="font-medium capitalize">
                  {name}
                </Typography>
              </Button>
            )}
          </NavLink>
        </li>
      );
    })}
  </ul>
  </div>
  <div className="absolute bottom-40 p-1 w-full">
    {routes.slice(1).map(({ layout, title, pages }, key) => (
      <ul key={`${key}-bottom`} className="mb-8">
        {pages.map(({ icon, name, path, hide }) => {
          if (hide) return null;
          return (
            <li key={name} className="mb-2">
              <NavLink to={`/${layout}${path}`}>
                {({ isActive }) => (
                  <Button
                  variant="text"
                  className="capitalize"
                  fullWidth
                  style={{
                    borderRadius: 6,
                    backgroundColor: isActive ? "#8CFFA5" : "#EAEBEA",
                    color: "black",
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                    padding: "6px 12px",
                    fontSize: "14px"
                  }}
                >
                
                    {icon}
                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "#3F3C40",
                        fontWeight: 900,
                        fontFamily: "Poppins",
                        fontStyle: "normal"
                      }}
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    ))}
  </div>
</div>


    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo_full.png",
  brandName: "Rumi Chat",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
