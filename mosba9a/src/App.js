import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './screens/home';
import Auth from './screens/auth';
import { AddContest, AddQuestion, Admin, Branches, CompetitionBranches, ControllerContest, DisplayContest, LandingPage, ManageContest, PreviousContest, Result, ResultBranche, StartResponse, User, UserResult, Welcome } from './components';
import HomeAdmin from './screens/homeAdmin';
import AuthAdmin from './screens/authAdmin';
import SignUp from './screens/signUp';

function App() {
  return (
    <div dir="rtl" lang="ar" className="fontCairo">
      <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage />}/>
          <Route exact path='/home' element={<Home />}>
            <Route path='/home' element={<Welcome />}/>
            <Route path='/home/branches' element={<Branches />}/>
            <Route path='/home/start' element={<StartResponse />}/>
            <Route path='/home/result' element={<Result />}/>
            <Route path='/home/previousContest' element={<PreviousContest />}/>
            <Route path='/home/userResult' element={<UserResult />}/>
          </Route>
          <Route exact path='/admin' element={<HomeAdmin />}>
            <Route path='/admin' element={<Admin />}/>
            <Route path='/admin/manageUser' element={<User />}/>
            <Route  path="/admin/manageContest" element={<ManageContest />}>
              <Route path="/admin/manageContest/" element={<DisplayContest />} />
              <Route path="/admin/manageContest/addContest" element={<AddContest />} />
              <Route path="/admin/manageContest/controllerContest" element={<ControllerContest />} />
              <Route path="/admin/manageContest/competitionBranches" element={<CompetitionBranches />} />
              <Route path="/admin/manageContest/resultBranche" element={<ResultBranche />}/>
              <Route path="/admin/manageContest/competitionBranches/addQuestion" element={<AddQuestion />} />
            </Route>
          </Route>
          <Route exact path='/authAdmin' element={<AuthAdmin />}/>
          <Route exact path='/auth' element={<Auth />}/>
          <Route exact path='/signUp' element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
