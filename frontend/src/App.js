import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./screens/adminsScreen/auth";
import Home from "./screens/adminsScreen/home";
import { Welcome, AddAdmin, AddUser, AnnualSubscriptionRecord, AnnualSubscriptionRecordDetails, DisplayAdmin, DisplayCommodityRevenue, DisplaySubscription, DisplayUser, FoundationSubscription, ManageAdmin, ManageCommodityRevenue, ManageSubscription, ManageUser, ManagingLatePayments, ModifySubscriptionAmount, MonthlySubscription, OrderToPurchaseGoods, PaymentOfSubscriptions, RegisterMemberFinancialData, SubscriptionHistory, UpdateAdmin, UpdateUser, CommodityPurchaseOrderForm, PaymentOfInstallments, InstallmentSchedule, GoodsRevenueRecord, FormContributionPurchaseCommodity, RecordContributionPurchaseCommodity, RecordAnnual, RecordAnnualDetails, ManageContributionRevenue, DisplayContributionRevenue, RecordContributions, ConsolidatedRecordRevenues, ManageStock, ContributionRormForPurchasingShares, CommodityPurchase, FormContribution, InvestmentBox, DisplayContributionRecord, ContributionForm, DisplayContributionForm, FinancialCompany, DisplayContributionfinancialCompanyRecord, FinancialCompanyForm, DisplayfinancialCompanyForm, Loans, LoansData, RecordInstallments, LoansHistory, UnreimbursedExpenses, RecordUnrecoveredExpenses, DisplayRecordUnrecoveredExpenses, AddExpenseType, PaymentExpenses, ExpenseRequest, ReimbusedExpenses, RecordRecoveredExpenses, DisplayRecordRecoveredExpenses, ReimbursedExpenseRequest, AddReimbursedExprensesType, Stocks, RegisterOfStockContributions, StocksContributionForm, DisplayStocksContributionForm, LoansOrder, PayMonthlySubscriptions, ManageContest, DisplayContest, AddContest, ControllerContest, CompetitionBranches, AddQuestion, ManageVote, DisplayVote, AddVote, VoteDetails, ManageAdvertising, DisplayAdvertising, AddAd, Agreements, DisplayAgreements, AddAgreements, FamilyTree, DisplayFamilyTree, AddFamilyTree, Dashboard, Contest, AgreementsClient, Election, ElectionDetails, AdvertisingClient, UnrecoverExpenses, RecoverExpenses, PrintRecordInstallments, ContestStart, EnterToContest, EnterToBranches, StartResponse, UserResultContest } from "./components";
import Print from "./screens/adminsScreen/print";
import AuthClient from "./screens/clientScreen/authClient";
import HomeClient from "./screens/clientScreen/homeClient";


function App() {
  return (
    <div dir="rtl" lang="ar" className="fontCairo">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route exact path="/" element={<Welcome />} />
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
              <Route path="/subscription/modifySubscriptionAmount" element={<ModifySubscriptionAmount />} />
              <Route path="/subscription/annualSubscriptionRecord" element={<AnnualSubscriptionRecord />} />
              <Route path="/subscription/annualSubscriptionRecordDetails" element={<AnnualSubscriptionRecordDetails />} />
              <Route path="/subscription/registerMemberFinancialData" element={<RegisterMemberFinancialData />} />
              <Route path="/subscription/subscriptionHistory" element={<SubscriptionHistory />} />
              <Route path="/subscription/payMonthlySubscriptions" element={<PayMonthlySubscriptions />} />
              <Route path="/subscription/paymentOfSubscriptions" element={<PaymentOfSubscriptions />} />
              <Route path="/subscription/managingLatePayments" element={<ManagingLatePayments />} />
            </Route>
            <Route exact path="/commodityRevenue" element={<ManageCommodityRevenue />}>
              <Route exact path="/commodityRevenue" element={<DisplayCommodityRevenue />} />
              <Route path="/commodityRevenue/goodsRevenueRecord" element={<GoodsRevenueRecord />} />
              <Route path="/commodityRevenue/formContributionPurchaseCommodity" element={<FormContributionPurchaseCommodity />} />
              <Route path="/commodityRevenue/recordContributionPurchaseCommodity" element={<RecordContributionPurchaseCommodity />} />
              <Route path="/commodityRevenue/orderToPurchaseGoods" element={<OrderToPurchaseGoods />} />
              <Route path="/commodityRevenue/commodityPurchaseOrderForm" element={<CommodityPurchaseOrderForm />} />
              <Route path="/commodityRevenue/paymentOfInstallments" element={<PaymentOfInstallments />} />
              <Route path="/commodityRevenue/installmentSchedule" element={<InstallmentSchedule />} />
            </Route>
            <Route exact path="/contributionRevenue" element={<ManageContributionRevenue />}>
              <Route exact path="/contributionRevenue" element={<DisplayContributionRevenue />} />
              <Route path="/contributionRevenue/recordContributions" element={<RecordContributions />} />
              <Route path="/contributionRevenue/consolidatedRecordRevenues" element={<ConsolidatedRecordRevenues />} />
            </Route>
            <Route exact path="/stocks" element={<Stocks />}>
              <Route path="/stocks" element={<RegisterOfStockContributions ></RegisterOfStockContributions>} />
              <Route path="/stocks/contributionForm" element={<StocksContributionForm />} />
              <Route path="/stocks/displayContributionForm" element={<DisplayStocksContributionForm />} />
            </Route>
            <Route exact path="/investmentBox" element={<InvestmentBox />}>
              <Route exact path="/investmentBox" element={<DisplayContributionRecord />} />
              <Route path="/investmentBox/contributionForm" element={<ContributionForm />} />
              <Route path="/investmentBox/displayContributionForm" element={<DisplayContributionForm />} />
            </Route>
            <Route exact path="/financialCompany" element={<FinancialCompany />}>
              <Route exact path="/financialCompany" element={<DisplayContributionfinancialCompanyRecord />} />
              <Route path="/financialCompany/contributionForm" element={<FinancialCompanyForm />} />
              <Route path="/financialCompany/displayContributionForm" element={<DisplayfinancialCompanyForm />} />
            </Route>
            <Route exact path="/loans" element={<Loans />}>
              <Route path="/loans" element={<LoansData />} />
              <Route path="/loans/recordInstallments" element={<RecordInstallments />} />
              <Route path="/loans/history" element={<LoansHistory />} />
              <Route path="/loans/order" element={<LoansOrder />} />
            </Route>
            <Route exact path="/unreimbursedExpenses" element={<UnreimbursedExpenses />}>
              <Route path="/unreimbursedExpenses" element={<RecordUnrecoveredExpenses />} />
              <Route path="/unreimbursedExpenses/displayRecord" element={<DisplayRecordUnrecoveredExpenses />} />
              <Route path="/unreimbursedExpenses/expenseRequest" element={<ExpenseRequest />} />
              <Route path="/unreimbursedExpenses/paymentExpenses" element={<PaymentExpenses />} />
              <Route path="/unreimbursedExpenses/addExpenseType" element={<AddExpenseType />} />
            </Route>
            <Route exact path="/reimbusedExpenses" element={<ReimbusedExpenses />}>
              <Route path="/reimbusedExpenses" element={<RecordRecoveredExpenses />} />
              <Route path="/reimbusedExpenses/displayRecord" element={<DisplayRecordRecoveredExpenses />} />
              <Route path="/reimbusedExpenses/expenseRequest" element={<ReimbursedExpenseRequest />} />
              <Route path="/reimbusedExpenses/addExpenseType" element={<AddReimbursedExprensesType />} />
            </Route>
            <Route exact path="/manageContest" element={<ManageContest />}>
              <Route path="/manageContest/" element={<DisplayContest />} />
              <Route path="/manageContest/addContest" element={<AddContest />} />
              <Route path="/manageContest/controllerContest" element={<ControllerContest />} />
              <Route path="/manageContest/competitionBranches" element={<CompetitionBranches />} />
              <Route path="/manageContest/competitionBranches/addQuestion" element={<AddQuestion />} />
            </Route>
            <Route exact path="/manageVote" element={<ManageVote />}>
              <Route path="/manageVote" element={<DisplayVote />} />
              <Route path="/manageVote/addVote" element={<AddVote />} />
              <Route path="/manageVote/voteDetails" element={<VoteDetails />} />
            </Route>
            <Route exact path="/manageAdvertising/" element={<ManageAdvertising />}>
              <Route path="/manageAdvertising/" element={<DisplayAdvertising />} />
              <Route path="/manageAdvertising/addAd" element={<AddAd />} />
            </Route>
            <Route exact path="/agreements/" element={<Agreements />}>
              <Route path="/agreements/" element={<DisplayAgreements />} />
              <Route path="/agreements/add" element={<AddAgreements />} />
            </Route>
            <Route exact path="/familyTree" element={<FamilyTree />}>
              <Route path="/familyTree" element={<DisplayFamilyTree />} />
              <Route path="/familyTree/manage" element={<AddFamilyTree />} />
            </Route>
          </Route>
          <Route exact path="/client" element={<HomeClient />}>
            <Route exact path="/client" element={<Dashboard />} />
            <Route path="/client/contest" element={<Contest />} />
            <Route path="/client/agreements" element={<AgreementsClient />} />
            <Route path="/client/election" element={<Election />} />
            <Route path="/client/electionDetails" element={<ElectionDetails />} />
            <Route path="/client/advetising" element={<AdvertisingClient />} />
            <Route path="/client/contestStart" element={<ContestStart />} />
            <Route path="/client/contestStart/enterToCompetiton" element={<EnterToContest />} />
            <Route path="/client/contestStart/enterToBranches" element={<EnterToBranches />} />
            <Route path="/client/contestStart/startResponse" element={<StartResponse />} />
            <Route path="/client/contestStart/userResult" element={<UserResultContest />} />
            {/*<Route path="/client/contestStart" element={<ContestStart />}>
              <Route path="/client/contestStart/enterToCompetiton" element={<EnterToContest />}/>
              <Route path="/client/contestStart/enterToBranches" element={<EnterToBranches />}/>
              <Route path="/client/contestStart/startResponse" element={<StartResponse />}/>
              <Route path="/client/contestStart/userResult" element={<UserResultContest />}/>
            </Route>*/}
          </Route>
          <Route exact path="/authClient" element={<AuthClient />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/print" element={<Print />}>
            <Route path="/print/recordAnnual" element={<RecordAnnual />} />
            <Route path="/print/recordAnnualDetails" element={<RecordAnnualDetails />} />
            <Route path="/print/commodityPurchaseOrderForm" element={<CommodityPurchase />} />
            <Route path="/print/formContribution" element={<FormContribution />} />
            <Route path="/print/unrecoverdExpenses" element={<UnrecoverExpenses />} />
            <Route path="/print/recoverdExpenses" element={<RecoverExpenses />} />
            <Route path="/print/loans/recordInstallments" element={<PrintRecordInstallments />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
