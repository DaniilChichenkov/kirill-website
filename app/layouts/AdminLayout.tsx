import { Outlet } from "react-router";
import { Drawer } from "~/components/admin";

export function meta() {
  return [
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ];
}

const AdminLayout = () => {
  return (
    <div className="bg-blue-50">
      <Drawer>
        <Outlet />
      </Drawer>
    </div>
  );
};

export default AdminLayout;
