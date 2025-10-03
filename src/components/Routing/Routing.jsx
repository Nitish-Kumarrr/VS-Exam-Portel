import { useEffect, useRef, useState } from "react";
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
import {   Routes, Route, Navigate, useLocation } from "react-router-dom";
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

export default function Routing() {
    const location = useLocation();
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    const prevLocation = useRef(location.pathname);

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
    const fromPrivateToPublic =
      prevLocation.current &&
      !publicRoutes.includes(prevLocation.current) &&
      publicRoutes.includes(location.pathname);

    if (fromPrivateToPublic) {
      localStorage.removeItem("role"); 
      setRole(""); 
    }

    prevLocation.current = location.pathname;
  }, [location]);

  

    return (
        <>
            {role === "User" ? <UserHeader /> : <PublicHeader />}

            <Routes>
                {/* Public Routes */}
                <Route
                    path="about"
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


                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/about" />} />
            </Routes>
        </>
    );
}