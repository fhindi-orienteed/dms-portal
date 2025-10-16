import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import TermsOfService from "./pages/OtherPage/TermsOfService";
import PrivacyPolicy from "./pages/OtherPage/PrivacyPolicy";
import FAQ from "./pages/OtherPage/FAQ";
import HelpCenter from "./pages/OtherPage/HelpCenter";
import ContactSupport from "./pages/OtherPage/ContactSupport";
import AboutUs from "./pages/OtherPage/AboutUs";
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
import AllPackages from "./pages/packages/AllPackages";
import InTransitPackages from "./pages/packages/InTransitPackages";
import DeliveredPackages from "./pages/packages/DeliveredPackages";
import PendingPackages from "./pages/packages/PendingPackages";
import FailedDeliveryPackages from "./pages/packages/FailedDeliveryPackages";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { AppConfigProvider } from "./context/AppConfig";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import AccountSettings from "./pages/Settings/AccountSettings";
import NotificationSettings from "./pages/Settings/NotificationSettings";
import SystemSettings from "./pages/Settings/SystemSettings";
import MerchantsList from "./pages/merchant/list";
import MerchantDetails from "./pages/merchant/details";
import CustomersList from "./pages/customers/list";
import CustomerDetails from "./pages/customers/details";
import BlacklistCustomers from "./pages/customers/blacklist";
import CustomerSegment from "./pages/customers/segment";
import DriverPerformance from "./pages/drivers/performance";
import DriverAssignments from "./pages/drivers/assignments";
import DriverDetails from "./pages/drivers/details";
import AssignmentDetails from "./pages/assignments/details";
import DriverList from "./pages/drivers/list";
import CustomerFollowUps from "./pages/follow-ups/customers";
import PaymentFollowUps from "./pages/follow-ups/payments";
import DeliveryFollowUps from "./pages/follow-ups/deliveries";
import ReturnsFollowUps from "./pages/follow-ups/returns";
import PackageDetails from "./pages/packages/details";


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

              <Route path="/merchant/list" element={
                <ProtectedRoute>
                  <MerchantsList/>
                </ProtectedRoute>
              } />
                <Route path="/drivers" element={
                <ProtectedRoute>
                 < DriverList/>
                </ProtectedRoute>
              } />
              <Route path="/merchant/:id" element={
                <ProtectedRoute>
                  <MerchantDetails />
                </ProtectedRoute>
              } />

              <Route path="/customers/list" element={
                <ProtectedRoute>
                  <CustomersList />
                </ProtectedRoute>
              } />

              <Route path="/customers/blacklist" element={
                <ProtectedRoute>
                  <BlacklistCustomers />
                </ProtectedRoute>
              } />

              <Route path="/customers/segment" element={
                <ProtectedRoute>
                  <CustomerSegment />
                </ProtectedRoute>
              } />

              <Route path="/customers/details/:id" element={
                <ProtectedRoute>
                  <CustomerDetails />
                </ProtectedRoute>
              } />

              <Route path="/drivers/performance" element={
                <ProtectedRoute>
                  <DriverPerformance />
                </ProtectedRoute>
              } />

              <Route path="/drivers/assignments" element={
                <ProtectedRoute>
                  <DriverAssignments />
                </ProtectedRoute>
              } />

              <Route path="/drivers/:id" element={
                <ProtectedRoute>
                  <DriverDetails />
                </ProtectedRoute>
              } />

              <Route path="/assignments/:id" element={
                <ProtectedRoute>
                  <AssignmentDetails />
                </ProtectedRoute>
              } />

              <Route path="/follow-ups/customers" element={
                <ProtectedRoute>
                  <CustomerFollowUps />
                </ProtectedRoute>
              } />

              <Route path="/follow-ups/payments" element={
                <ProtectedRoute>
                  <PaymentFollowUps />
                </ProtectedRoute>
              } />

              <Route path="/follow-ups/deliveries" element={
                <ProtectedRoute>
                  <DeliveryFollowUps />
                </ProtectedRoute>
              } />

              <Route path="/follow-ups/returns" element={
                <ProtectedRoute>
                  <ReturnsFollowUps />
                </ProtectedRoute>
              } />

              <Route path="/packages/:id" element={
                <ProtectedRoute>
                  <PackageDetails />
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
                  <TermsOfService />
                </ProtectedRoute>
              } />

              <Route path="/privacy" element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              } />

              <Route path="/faq" element={
                <ProtectedRoute>
                  <FAQ />
                </ProtectedRoute>
              } />

              <Route path="/help" element={
                <ProtectedRoute>
                  <HelpCenter />
                </ProtectedRoute>
              } />

              <Route path="/support" element={
                <ProtectedRoute>
                  <ContactSupport />
                </ProtectedRoute>
              } />

              <Route path="/about" element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              } />

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
