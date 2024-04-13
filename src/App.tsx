import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './views/Home/Home';
import TopSongs from './views/top-songs/Top-songs';
import TodayPlayed from './views/TodayPlayed/TodayPlayed';
import PlayedCounts from './views/PlayedCounts/PlayedCounts';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/today-played" element={<TodayPlayed />} />
        <Route path="/top-songs" element={<TopSongs />} />
        <Route path="/played" element={<PlayedCounts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
