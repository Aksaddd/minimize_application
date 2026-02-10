import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface-root">
      <Sidebar />
      <main className="flex-1 ml-sidebar p-sp-8">
        <div className="max-w-[1200px]">{children}</div>
      </main>
    </div>
  );
}
