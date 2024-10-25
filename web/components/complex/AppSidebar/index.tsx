import { Home } from "lucide-react";
import { Suspense } from "react";
import AppSidebar from "./root";

const AppSidebarWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppSidebar
        items={[
          {
            title: "Dashboard",
            url: "/",
            icon: Home,
          },
        ]}
      />
    </Suspense>
  );
};

AppSidebarWrapper.displayName = "AppSidebarWrapper";

export default AppSidebarWrapper;
