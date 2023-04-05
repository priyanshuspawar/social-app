import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Suspense, lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";

const HomePage = lazy(()=>import ("./scenes/homePage"))
const ProfilePage = lazy(()=>import ("./scenes/profilePage"))
const LoginPage = lazy(()=>import ("./scenes/loginPage"))

function App() {
  const mode = useSelector((state) => state.persistedReducer.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.persistedReducer.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Suspense fallback={<p>loading ...</p>}>
              <LoginPage/>
            </Suspense>} />
            <Route
              path="/home"
              element={isAuth?
                <Suspense fallback={<p>loading ..</p>}>
                  <HomePage/>
                </Suspense>
                :
                <Navigate to={"/"}/>
              }
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Suspense fallback={<p>loading ..</p>}>
                <ProfilePage/>
              </Suspense> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
