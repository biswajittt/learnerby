import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import MentorDetails from './components/mentorDetsils/MentorDetails';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Box } from '@mui/system';
import SearchPage from './components/searchPage/SearchPage';
import Profile from './components/Profile/Tabs/Profile';
import Sidebar from './components/Profile/Sidebar';
import PageNotFound from './components/404/PageNotFound';

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
          <Route path='/student/dashboard/:id' element={<Profile />} />
          <Route path='/mentor/dashboard/:id' element={<Sidebar />} />

          {/* //pagenotfound */}
          <Route path='/page-not-found' element={<PageNotFound />} />
          <Route path='*' element={<Navigate to='/page-not-found' />} />
          {/* <Navigate from='*' to='/404' /> */}
        </Routes>
      </Box>

    </BrowserRouter>
  );
}

export default App;

