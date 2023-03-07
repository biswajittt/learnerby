import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import MentorDetails from './components/mentorDetsils/MentorDetails';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Box } from '@mui/system';
import SearchPage from './components/searchPage/SearchPage';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mentordetails/:id' element={<MentorDetails />} />
          <Route path='/searchpage/searchquery/:searchquery/mentordetails/:id' element={<MentorDetails />} />
          <Route path='/searchpage/searchquery/:searchquery' element={<SearchPage />} />
          <Route path='/profile/user/:id' element={<Profile />} />
          <Route path='/profile/mentor/:id' element={<Profile />} />
        </Routes>
      </Box>

    </BrowserRouter>
  );
}

export default App;

