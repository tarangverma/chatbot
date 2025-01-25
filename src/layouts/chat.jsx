import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Chat() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  console.log(routes)
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo_full.png" : "/img/logo_full.png"
        }
      />
      <div className="p-4 xl:ml-80 full-height">
        <DashboardNavbar />
        
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "chat" &&
              pages.map(({ path, element }) => (
                <Route path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
    </div>
  );
}

Chat.displayName = "/src/layout/chat.jsx";

export default Chat;
