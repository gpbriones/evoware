import GatewayLandingPage from "./components/GatewayLandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
//import EvowareDashboard from "./components/EvowareDashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import {ActivoDashboard} from "./pages/ActivoDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard/PrincipalDashboard";

import SavingsDetailPage from "./modules/ahorro/pages/SavingsDetailPage"
import CuestionariosPage from "./modules/cuestionario/pages/Home"
import BodyPage from "./modules/cuestionario/pages/BodyPage"

import ConfigurationPage from "./modules/cuestionario/pages/ConfigurationPage"

export default function App() {
  return (
    <BrowserRouter>
       <Routes>

        <Route path="/" element={<GatewayLandingPage />} />
         {/**  <Features />*/}

         <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* <Route path="/evowareDashboard" element={ <ProtectedRoute>
                                              <EvowareDashboard />
                                            </ProtectedRoute>
                                           } />
          */}                                  
        <Route path="/principalDashboard" element={ <ProtectedRoute>
                                              <PrincipalDashboard />
                                            </ProtectedRoute>
                                           } /> 

         <Route path="/ahorro/detalle" element={<SavingsDetailPage/>}/>   
         <Route path="/cuestionarios" element={<CuestionariosPage/>}/>  
         <Route path="/body" element={<BodyPage />} />    
         <Route path="/config/user/cuestionario" element={<ConfigurationPage />}/>                              
       </Routes>
       
    </BrowserRouter>
    
  );
}