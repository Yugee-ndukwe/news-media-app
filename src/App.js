import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasicExample } from "./Component/Navbar/navbar";
// import { NewsWrapper } from './Component/Body/newswrapper';
import { NewsBoard } from './Component/Body/newsboard';
import { NewsDetail } from './Component/Body/newsdetail';
import { NewsCategory } from './Component/Body/newscategory';
import { HealthCategory } from './Component/Body/health';
import { SportCategory } from './Component/Body/sports';
import { ScienceCategory } from './Component/Body/science';
import { EntertainmentCategory } from './Component/Body/entertainment';
import { BusinessCategory } from './Component/Body/business';
import {SignUp} from './pages/signup'
import { HeaderNav } from './header/headernav';
import {Forum} from './pages/forum'
// import { Login } from './pages/login';
import { ProfileEdit } from './pages/profile';

import { News } from './Component/Body/news';

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          {/* <Route path='/news' element={<BasicExample />}>General</Route> */}
          {/* <Route path='/' element= {NewsWrapper}></Route> */}
          {/* <Route path='/news'element={<HeaderNav/>}></Route> */}
          {/* <Route path='/' element={<News/>}></Route> */}
          <Route path="/" element={<NewsBoard />} />
          <Route path="/news/detail" element={<NewsDetail />} />
          {/* <Route path="/category/general" element={<NewsBoard />}>General</Route> */}
          {/* <Route path="/category/technology" element={<NewsCategory category="technology" />}></Route> */}
           {/* <Route path="/category/health" element={<HealthCategory category="health" />}>Health</Route> */}
          {/* <Route path="/category/sports" element={<SportCategory category="sports" />}>Sports</Route> */}
          {/* <Route path="/category/entertainment" element={<EntertainmentCategory category="entertainment" />}>Entertainment</Route> */}
          {/* <Route path="/category/science" element={<ScienceCategory category="sports" />}>Science</Route> */}
           {/* <Route path="/category/business" element={<BusinessCategory category="sports" />}>Business</Route>  */}
          <Route path="/pages" element={<SignUp />}></Route>
          <Route path='/pages/forum' element={<Forum/>}></Route>
          <Route path='/pages/profile' element={<ProfileEdit/>}></Route>
          {/* <Route path='/uk' element={<Uk/>}/>
          <Route path='/nigeria' element={<NgNews/>}>{NgNews}</Route>
          <Route path='/china' element={China}>{China}</Route>
          <Route path='/france' element={France}>{France}</Route>
          <Route path='/iran' element={Iran}>{Iran}</Route> */}
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
