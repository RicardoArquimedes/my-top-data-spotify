import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContexts';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './views/Home/Home';
import TopSongs from './views/top-songs/Top-songs';
import TodayPlayed from './views/TodayPlayed/TodayPlayed';
import PlayedCounts from './views/PlayedCounts/PlayedCounts';
import LoginPage from './views/LoginPage/LoginPage';
import CallbackPage from './components/CallbackPage/CallbackPage';

const App: React.FC = () => {
  const { token } = useAuth(); // Utiliza el hook de contexto para obtener el estado de autenticación

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />  {/* Ruta para manejar el callback de Spotify */}
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/today-played" element={ <TodayPlayed />  } />
        <Route path="/top-songs" element={<TopSongs />} />
        <Route path="/played" element={ <PlayedCounts /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
