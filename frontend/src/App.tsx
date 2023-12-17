import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import pages
import { MainPage } from "./pages/main-page";

//Import components
import { Header } from "./components/header/header";
import { FavoritesPage } from "./pages/favorites-page";
import { ProfilePage } from "./pages/profile-page";
import { SearchPage } from "./pages/search-page";

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
      </Routes>
    </Router>
  );
}

export default App;
