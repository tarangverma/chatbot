import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Chat, Data, Dashboard } from "@/pages/dashboard";
import { SignIn, SignUp, SignOut } from "@/pages/auth";
import ProtectedRoute from './protectedRoute';

const icon = {
  className: "w-5 h-5 text-inherit",
};

function isLoggedIn() {
  const token = localStorage.getItem('token');
  return token !== null;
}


export const routes = [
  {
    layout: "chat",
    pages: [
      {
        name: "chat",
        path: "/",
        element: <ProtectedRoute component={Chat}/>,
        mb: "mb-40"
      }
    ],
  }
];

export default routes;
