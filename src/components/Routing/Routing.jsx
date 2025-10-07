import { useEffect, useState } from "react";
import PublicHeader from "../Headers/publicHeader";
import UserHeader from "../Headers/UserHeader";
import About from "../publicRoutes/About/About";
import Customer from "../publicRoutes/About/Customer";
import Heroslider from "../publicRoutes/About/HeroSlider";
import KeyFeatures from "../publicRoutes/About/KeyFeatures";
import Workflow from "../publicRoutes/About/Workflow";
import Contact from "../publicRoutes/Contact";
import Login from "../publicRoutes/Login";
import Matters from "../publicRoutes/OMR-Exams/Matters";
import Matter from "../publicRoutes/OMR-Exams/Matter";
import Omr from "../publicRoutes/OMR-Exams/omr";
import Features from "../publicRoutes/Pricing/Features";
import Pricing from "../publicRoutes/Pricing/Pricing";
import Signup from "../publicRoutes/Signup";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import OnlineExams from "../user/OnlineExams";
import Forgot from "../publicRoutes/Forgot";
import ProtectedRoute from "../ProtectedRoute";
import Analysis from "../user/Analysis";
import NoticeBoard from "../user/NoticeBoard";
import Settings from "../user/Settings";
import SideBar from "../user/SideBar";
import Home from "../publicRoutes/OnlineExams/Home";
import Exams from "../publicRoutes/OnlineExams/Exams";
import Protections from "../publicRoutes/OnlineExams/Protections";
import Questions from "../publicRoutes/OnlineExams/Questions";
import Webcam from "../publicRoutes/OnlineExams/Webcam";
import Secure from "../publicRoutes/OnlineExams/Secure";
import Sidebar from "../admin/Sidebar";
import AdminExams from "../admin/AdminExams";
import Students from "../admin/Students";
import AdminSettings from "../admin/AdminSettings";
import UpgradePlans from "../admin/UpgradePlans";
import CustomizeSite from "../admin/CustomizeSite";
import Tickets from "../admin/Tickets";
import DemoVideo from "../admin/DemoVideo";
import Test from "../Test/Test";
import SuperAdminHeader from "../Headers/SuperAdminHeader";
import Organisations from "../superAdmin/Organisations";
import AddOrganisation from "../superAdmin/AddOrganisation";
import Billing from "../superAdmin/Billing";
import SupportChat from "../superAdmin/SupportChat";
import GlobalDashboard from "../superAdmin/GlobalDasboard";
import SuperAdminSidebar from "../superAdmin/superAdminSidebar";
import Notifications from "../superAdmin/Notifications";
import AdminProfile from "../superAdmin/AdminProfile";
import CardSetup from "../superAdmin/CardSetup";
import UpiSetup from "../superAdmin/UpiSetup";
import FindUpiId from "../superAdmin/FindUpiId";

export default function Routing() {
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = [
    "/about",
    "/contact",
    "/pricing",
    "/login",
    "/signup",
    "/forgot-password",
    "/omr-exams"
  ];

  useEffect(() => {
    // const isPublic = publicRoutes.includes(location.pathname);
    // console.log(role,"check")
    // console.log(isPublic,"checking")
    // if (role && isPublic) {
    //     localStorage.clear();
    //     setRole("");
    //     navigate("/login", { replace: true });
    // }
    console.log(location.pathname.includes("super-admin/notifications"))
    console.log(location.pathname, "pathname")
  }, [location.pathname, role]);


  return (
    <>
      {/* {role === "User" ? <UserHeader /> : !role ? <PublicHeader /> : ""} */}
      {role === "User" && location.pathname !== "/online-exams/test" ? (
        <UserHeader />
      ) : !role ? (
        <PublicHeader />
      ) : role === "superAdmin" && (!location.pathname.includes("super-admin/profile") && !location.pathname.includes("/super-admin/card-setup") && !location.pathname.includes("/super-admin/card-setup") && !location.pathname.includes("/super-admin/FindUpiID") && !location.pathname.includes("/super-admin/AutoPay")) ? (
        <SuperAdminHeader />
      ) : ""}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/about"
          element={
            <>
              <Heroslider />
              <About />
              <Workflow />
              <Customer />
              <KeyFeatures />
            </>
          }
        />
        <Route path="/login" element={<Login role={role} setRole={setRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route
          path="omr-exams"
          element={
            <>
              <Omr />
              <Matter />
              <Matters />
            </>
          }
        />
        <Route
          path="pricing"
          element={
            <>
              <Pricing />
              <Features />
            </>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/online-exams" element={<OnlineExams />} /> */}

        {/* User Routes (after login) */}
        <Route
          path="/online-exams"
          element={
            role === "User" ? (
              <ProtectedRoute role={role} allowedRoles={["User"]}>
                <SideBar>
                  <OnlineExams />
                </SideBar>
              </ProtectedRoute>
            ) : (
              <>
                <Home />
                <Exams />
                <Protections />
                <Questions />
                <Webcam />
                <Secure />
              </>
            )
          }
        />

        {/* Other user-only routes */}
        <Route
          path="/analysis"
          element={
            <ProtectedRoute role={role} allowedRoles={["User"]}>
              <SideBar>
                <Analysis />
              </SideBar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notice-board"
          element={
            <ProtectedRoute role={role} allowedRoles={["User"]}>
              <SideBar>
                <NoticeBoard />
              </SideBar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute role={role} allowedRoles={["User"]}>
              <SideBar>
                <Settings />
              </SideBar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/online-exams/test"
          element={
            <ProtectedRoute role={role} allowedRoles={["User"]}>
              <Test />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role={role} allowedRoles={["Admin"]}>
              <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                  <Routes>
                    <Route path="/exams" element={<AdminExams />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/settings" element={<AdminSettings />} />
                    <Route path="/upgrade-plans" element={<UpgradePlans />} />
                    <Route path="/customize-site" element={<CustomizeSite />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/demovideo" element={<DemoVideo />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/*"
          element={
            <Routes>
              <Route
                path="organisation"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <SuperAdminSidebar>
                      <Organisations />
                    </SuperAdminSidebar>
                  </ProtectedRoute>
                }
              />
              <Route
                path="add-organisation"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <SuperAdminSidebar>
                      <AddOrganisation />
                    </SuperAdminSidebar>
                  </ProtectedRoute>
                }
              />
              <Route
                path="add-organisation/:id"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <SuperAdminSidebar>
                      <AddOrganisation />
                    </SuperAdminSidebar>
                  </ProtectedRoute>
                }
              />
              <Route
                path="billing"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <SuperAdminSidebar>
                      <Billing />
                    </SuperAdminSidebar>
                  </ProtectedRoute>
                }
              />
              <Route
                path="global"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <SuperAdminSidebar>
                      <GlobalDashboard />
                    </SuperAdminSidebar>
                  </ProtectedRoute>
                }
              />
              <Route
                path="support"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <SuperAdminSidebar>
                      <SupportChat />
                    </SuperAdminSidebar>
                  </ProtectedRoute>
                }
              />
              <Route
                path="notifications"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <SuperAdminSidebar>
                      <Notifications />
                    </SuperAdminSidebar>
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/card-setup"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <CardSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AutoPay"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <UpiSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/FindUpiID"
                element={
                  <ProtectedRoute role={role} allowedRoles={["superAdmin"]}>
                    <FindUpiId />
                  </ProtectedRoute>
                }
              />

            </Routes>
          }
        />


        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/about" />} />
      </Routes>
    </>
  );
}