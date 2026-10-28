import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import ProfileGate from '@/lib/ProfileContext';
import AppLayout, { PageNotFound, UserNotRegisteredError, ProtectedRoute } from '@/components/AppLayout';
import BuildTool from '@/components/BuildTool';
import { toolForPage } from '@/lib/tools';
import { PageSkeleton } from "@/components/shared/ToolKit";

// Pages load on demand. The AI tools are built into a member's app one at a time: until a tool's page is
// in the app, its route shows the "Build your ..." screen with the one Base44 message that adds it.
const PAGES = import.meta.glob('./pages/*.jsx');
const StillInstalling = () => (
  <div className="max-w-xl mx-auto py-24 px-6 text-center">
    <h1 className="text-2xl font-semibold">This page is still installing</h1>
    <p className="mt-3 text-app-muted">Let Base44 finish the install message. It appears here when it's done.</p>
  </div>
);
const LoadFailed = ({ error }) => (
  <div className="max-w-xl mx-auto py-24 px-6 text-center">
    <h1 className="text-2xl font-semibold">This page didn't load</h1>
    <p className="mt-3 text-app-muted">Check your internet connection, then refresh the page.</p>
    {error?.message && <p className="mt-3 text-xs text-app-muted break-words">Details: {error.message}</p>}
  </div>
);
// After Base44 adds or rebuilds files, an open preview can still point at a page's old address and fail to
// load it. Reload once to pick up the new build (at most once a minute); if it still fails, say so plainly.
const loadPage = (load) => () =>
  load().catch((e) => {
    try {
      const last = Number(sessionStorage.getItem('sf-page-reload') || 0);
      if (Date.now() - last > 60000) {
        sessionStorage.setItem('sf-page-reload', String(Date.now()));
        window.location.reload();
        return new Promise(() => {});
      }
    } catch {
      /* storage blocked: show the error instead of reloading in a loop */
    }
    return { default: () => <LoadFailed error={e} /> };
  });
// A tool is switched on only when its build's last file (src/tools/<id>.ready.js) is in, so a build that
// stops partway keeps showing the Build screen instead of a half-copied tool.
const READY = import.meta.glob('./tools/*.ready.js', { eager: true });
// file: the page file when it holds more than one page (the sign-in pages share Auth.jsx).
const page = (name, file = name) => {
  const tool = toolForPage(name);
  if (tool && !READY[`./tools/${tool.id}.ready.js`]) return () => <BuildTool tool={tool} />;
  const load = PAGES[`./pages/${file}.jsx`];
  if (load) {
    const pick = (m) => (file === name ? m : { default: m[name] });
    return lazy(loadPage(() => load().then(pick)));
  }
  return tool ? () => <BuildTool tool={tool} /> : StillInstalling;
};
const Login = page('Login', 'Auth');
const Register = page('Register', 'Auth');
const ForgotPassword = page('ForgotPassword', 'Auth');
const ResetPassword = page('ResetPassword', 'Auth');
const Onboarding = page('Onboarding');
const Dashboard = page('Dashboard');
const OfferBuilder = page('OfferBuilder');
const OfferWizard = page('OfferWizard');
const OfferResult = page('OfferResult');
const Profile = page('Profile');
const SetupCheck = page('SetupCheck');
const GetClients = page('GetClients');
const ProspectDetail = page('ProspectDetail');
const AdsHome = page('AdsHome');
const AdCampaign = page('AdCampaign');
const ContentHome = page('ContentHome');
const ContentPlan = page('ContentPlan');
const BuildLab = page('BuildLab');

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <PageSkeleton />
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center"><PageSkeleton /></div>}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<ProfileGate />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/offer-builder" element={<OfferBuilder />} />
            <Route path="/offer-builder/:offerId" element={<OfferWizard />} />
            <Route path="/offer/:offerId" element={<OfferResult />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setup-check" element={<SetupCheck />} />
            <Route path="/clients" element={<GetClients />} />
            <Route path="/clients/:prospectId" element={<ProspectDetail />} />
            <Route path="/ads" element={<AdsHome />} />
            <Route path="/ads/:campaignId" element={<AdCampaign />} />
            <Route path="/content" element={<ContentHome />} />
            <Route path="/content/:planId" element={<ContentPlan />} />
            <Route path="/build-lab" element={<BuildLab />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App