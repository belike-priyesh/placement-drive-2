import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Drawer from "../components/drawer";
import SignInForm from "../screens/auth/signupModal";
import CarrierResourceDetail from "../screens/carriedResourceDetail";
import CarrieResources from "../screens/carrierResources";
import CompanyProfile from "../screens/companyProfile";
import CompanyProfileDetail from "../screens/companyProfile/detail";
import Feedbacks from "../screens/feedbacks";
import Home from "../screens/home";
import "./routes.css";
import { AuthProvider } from "../screens/auth/context";

export default function WebRoutes() {
  const ref = useRef();
  const drawerRef = useRef();
  return (
    <AuthProvider>
      <div className="RoutesContainer">
        <header>
          <Header
            onClick={(tab) => {
              if (tab.title === "Sign-In") {
                ref.current.toggleModal();
              } else if (tab.title === "drawer") {
                drawerRef.current?.toggleDrawer();
              }
            }}
          />
        </header>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="auth" element={<SignInForm />} />
          </Route>
          <Route path="/carrier_resources" element={<CarrieResources />} />
          <Route
            path="/carrier_resources/:id"
            element={<CarrierResourceDetail />}
          />
          <Route path="/feedbacks" element={<Feedbacks />} />
          <Route path="/company_profile" element={<CompanyProfile />} />
          <Route
            path="/company_profile/:id"
            element={<CompanyProfileDetail />}
          />
        </Routes>
        <SignInForm ref={ref} />
        <Drawer
          ref={drawerRef}
          onClick={(action) => {
            if (action === "sign-in") {
              ref.current.toggleModal();
            }
          }}
        />
      </div>
    </AuthProvider>
  );
}
