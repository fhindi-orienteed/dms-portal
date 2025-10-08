import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import Loaders from "./pages/UiElements/Loaders";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import DataTables from "./components/tables/DataTables/DataTableOne";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AllNotifications from "./pages/AllNotifications";
import AllPackages from "./pages/Packages/AllPackages";
import InTransitPackages from "./pages/Packages/InTransitPackages";
import DeliveredPackages from "./pages/Packages/DeliveredPackages";
import PendingPackages from "./pages/Packages/PendingPackages";
import FailedDeliveryPackages from "./pages/Packages/FailedDeliveryPackages";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import TermsOfServices from "./pages/TermsOFServices";
import { AppConfigProvider } from "./context/AppConfig";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import AccountSettings from "./pages/Settings/AccountSettings";
import NotificationSettings from "./pages/Settings/NotificationSettings";
import SystemSettings from "./pages/Settings/SystemSettings";


export default function App() {
  return (
    <AppConfigProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfiles />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } />
              <Route path="/blank" element={
                <ProtectedRoute>
                  <Blank />
                </ProtectedRoute>
              } />

              <Route path="/form-elements" element={
                <ProtectedRoute>
                  <FormElements />
                </ProtectedRoute>
              } />

              <Route path="/basic-tables" element={
                <ProtectedRoute>
                  <BasicTables />
                </ProtectedRoute>
              } />
              <Route path="/data-tables" element={
                <ProtectedRoute>
                  <DataTables />
                </ProtectedRoute>
              } />

              <Route path="/alerts" element={
                <ProtectedRoute>
                  <Alerts />
                </ProtectedRoute>
              } />
              <Route path="/avatars" element={
                <ProtectedRoute>
                  <Avatars />
                </ProtectedRoute>
              } />
              <Route path="/badge" element={
                <ProtectedRoute>
                  <Badges />
                </ProtectedRoute>
              } />
              <Route path="/buttons" element={
                <ProtectedRoute>
                  <Buttons />
                </ProtectedRoute>
              } />
              <Route path="/loaders" element={
                <ProtectedRoute>
                  <Loaders />
                </ProtectedRoute>
              } />
              <Route path="/images" element={
                <ProtectedRoute>
                  <Images />
                </ProtectedRoute>
              } />
              <Route path="/videos" element={
                <ProtectedRoute>
                  <Videos />
                </ProtectedRoute>
              } />

              <Route path="/line-chart" element={
                <ProtectedRoute>
                  <LineChart />
                </ProtectedRoute>
              } />
              <Route path="/bar-chart" element={
                <ProtectedRoute>
                  <BarChart />
                </ProtectedRoute>
              } />

              <Route path="/notifications" element={
                <ProtectedRoute>
                  <AllNotifications />
                </ProtectedRoute>
              } />

              <Route path="/packages" element={
                <ProtectedRoute>
                  <AllPackages />
                </ProtectedRoute>
              } />
              <Route path="/packages/in-transit" element={
                <ProtectedRoute>
                  <InTransitPackages />
                </ProtectedRoute>
              } />
              <Route path="/packages/delivered" element={
                <ProtectedRoute>
                  <DeliveredPackages />
                </ProtectedRoute>
              } />
              <Route path="/packages/pending" element={
                <ProtectedRoute>
                  <PendingPackages />
                </ProtectedRoute>
              } />
              <Route path="/packages/failed" element={
                <ProtectedRoute>
                  <FailedDeliveryPackages />
                </ProtectedRoute>
              } />

              <Route path="/settings/account" element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              } />

              <Route path="/settings/notifications" element={
                <ProtectedRoute>
                  <NotificationSettings />
                </ProtectedRoute>
              } />

              <Route path="/settings/system" element={
                <ProtectedRoute>
                  <SystemSettings />
                </ProtectedRoute>
              } />

              <Route path="/terms" element={
                  <ProtectedRoute>
                    <TermsOfServices/>
                  </ProtectedRoute>
                }
              />  

            </Route>

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </AppConfigProvider>
  );
}
