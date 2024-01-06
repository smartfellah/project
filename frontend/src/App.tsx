import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import pages
import { MainPage } from "./pages/main-page";

//Import components
import { Header } from "./components/header/header";
import { FavoritesPage } from "./pages/favorites-page";
import { ProfilePage } from "./pages/profile-page";
import { SearchPage } from "./pages/search-page";
import { LoginPage } from "./pages/login-page";
import { SignupPage } from "./pages/signup-page";
import { SingleVacancy } from "./pages/single-vacancy-page";
import { Footer } from "./components/footer/footer";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/favorites" element={<FavoritesPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="vacancies/:id" element={<SingleVacancy />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
