import { Outlet } from "react-router";
import { Drawer } from "~/components/admin";

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
