import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotelsPage from "./pages/MyHotelsPage";
import EditHotelPage from "./pages/EditHotelPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingPage from "./pages/MyBookingPage";
import HomePage from "./pages/HomePage";
import MyProfilePage from "./pages/MyProfilePage";
import PolicyPage from "./pages/PolicyPage";
import TermsPage from "./pages/TermsPage";
import NotFoundPage from "./pages/NotFoundPage";

function AppRoutes() {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showSearchBar>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/search/:page"
        element={
          <Layout showSearchBar>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:hotelId"
        element={
          <Layout showSearchBar>
            <DetailPage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/privacy"
        element={
          <Layout>
            <PolicyPage />
          </Layout>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <Layout>
            <TermsPage />
          </Layout>
        }
      />
      {isLoggedIn && (
        <>
          <Route
            path="/profile"
            element={
              <Layout>
                <MyProfilePage />
              </Layout>
            }
          />
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotelsPage />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotelPage />
              </Layout>
            }
          />
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <BookingPage />
              </Layout>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <Layout>
                <MyBookingPage />
              </Layout>
            }
          />
        </>
      )}
      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
