import { Route, Routes } from "react-router-dom";
import { ErrorPage, MovieDetailPage, MoviesPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/detail/:id" element={<MovieDetailPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
