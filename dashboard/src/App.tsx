import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ScreenTimePage from "./pages/ScreenTimePage";
import SchedulesPage from "./pages/SchedulesPage";
import CategoriesPage from "./pages/CategoriesPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/screen-time" element={<ScreenTimePage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
