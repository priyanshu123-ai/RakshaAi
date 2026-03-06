import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppTopBar from "./AppTopBar";
import GlobalVoiceButton from "./GlobalVoiceButton";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppTopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {/* Global floating voice button — visible on every page */}
      <GlobalVoiceButton />
    </div>
  );
};

export default AppLayout;
