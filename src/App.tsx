import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./lib/theme-provider"
import { MainLayout } from "./components/layout/main-layout"
import { Toaster } from "@/components/ui/sonner"
import LoginPage from "./pages/auth/login"
import SignupPage from "./pages/auth/signup"
import ForgotPasswordPage from "./pages/auth/forgot-password"
import DashboardPage from "./pages/dashboard"
import StudentsPage from "./pages/students"
import StudentProfilePage from "./pages/students/profile"
import TeachersPage from "./pages/teachers"
import CoursesPage from "./pages/courses"
import CourseDetailPage from "./pages/courses/detail"
import AttendancePage from "./pages/attendance"
import ResultsPage from "./pages/results"
import FeesPage from "./pages/fees"
import SettingsPage from "./pages/settings"
import NotificationsPage from "./pages/notifications"
import NotFoundPage from "./pages/error/not-found"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"
import { useAuthStore } from "./store/use-auth-store"

// Guard for protected routes (optional simulation)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="sms-portal-theme">
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          <Route element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="students">
              <Route index element={<StudentsPage />} />
              <Route path="profile" element={<StudentProfilePage />} />
            </Route>
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="courses">
              <Route index element={<CoursesPage />} />
              <Route path="detail" element={<CourseDetailPage />} />
            </Route>
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
