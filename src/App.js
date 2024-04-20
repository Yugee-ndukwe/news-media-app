import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasicExample } from "./Component/Navbar/navbar";
// import { NewsWrapper } from './Component/Body/newswrapper';
import { NewsBoard } from './Component/Body/newsboard';
import { NewsDetail } from './Component/Body/newsdetail';
import {SignUp} from './pages/signup'
// import { HeaderNav } from './header/headernav';
import {Forum} from './pages/forum'
// import { Login } from './pages/login';
import { ProfileEdit } from './pages/profile';

import { News } from './Component/Body/news';

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<News/>}></Route> */}
          <Route path="/" element={<NewsBoard />} />
          <Route path="/news/detail" element={<NewsDetail />} />
          {/* <Route path="/category/general" element={<NewsBoard />}>General</Route> */}
          <Route path="/pages" element={<SignUp />}></Route>
          <Route path='/pages/forum' element={<Forum/>}></Route>
          <Route path='/pages/profile' element={<ProfileEdit/>}></Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
