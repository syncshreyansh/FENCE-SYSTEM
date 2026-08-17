import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopAppBar from './TopAppBar';

export default function DashboardShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopAppBar />
        <main className="flex-1 overflow-y-auto p-margin-page relative">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-gutter-grid h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
