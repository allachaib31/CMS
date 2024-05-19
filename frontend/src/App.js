import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./screens/adminsScreen/auth";
import Home from "./screens/adminsScreen/home";
import { AddAdmin, AddUser, DisplayAdmin, DisplaySubscription, DisplayUser, ManageAdmin, ManageSubscription, ManageUser, ModifySubscriptionAmount, RegisterMemberFinancialData, SubscriptionHistory, UpdateAdmin, UpdateUser } from "./components";
import Welcome from "./components/adminComponents/welcome/welcome";

function App() {
  return (
    <div dir="rtl" lang="ar" className="fontCairo">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route exact path="/" element={<Welcome />}/>
            <Route exact path="/user" element={<ManageUser />}>
              <Route exact path="/user" element={<DisplayUser />} />
              <Route path="/user/addUser" element={<AddUser />} />
              <Route path="/user/updateUser" element={<UpdateUser />} />
            </Route>
            <Route exact path="/admin" element={<ManageAdmin />}>
              <Route exact path="/admin" element={<DisplayAdmin />} />
              <Route path="/admin/addAdmin" element={<AddAdmin />} />
              <Route path="/admin/updateAdmin" element={<UpdateAdmin />} />
            </Route>
            <Route exact path="/subscription" element={<ManageSubscription />}>
              <Route exact path="/subscription" element={<DisplaySubscription />} />
              <Route path="/subscription/modifySubscriptionAmount" element={<ModifySubscriptionAmount />}/>
              <Route path="/subscription/registerMemberFinancialData" element={<RegisterMemberFinancialData />}/>
              <Route path="/subscription/subscriptionHistory" element={<SubscriptionHistory />}/>
            </Route>
          </Route>
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
