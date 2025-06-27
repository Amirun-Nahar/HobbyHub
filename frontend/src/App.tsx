import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './providers/AuthProvider'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Groups from './pages/Groups'
import GroupDetails from './pages/GroupDetails'
import CreateGroup from './pages/CreateGroup'
import UpdateGroup from './pages/UpdateGroup'
import MyGroups from './pages/MyGroups'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import Support from './pages/Support'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import './index.css'

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="groups" element={<Groups />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="support" element={<Support />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="groups/:id"
              element={
                <PrivateRoute>
                  <GroupDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="create-group"
              element={
                <PrivateRoute>
                  <CreateGroup />
                </PrivateRoute>
              }
            />
            <Route
              path="update-group/:id"
              element={
                <PrivateRoute>
                  <UpdateGroup />
                </PrivateRoute>
              }
            />
            <Route
              path="my-groups"
              element={
                <PrivateRoute>
                  <MyGroups />
                </PrivateRoute>
              }
            />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </Suspense>
  )
}

export default App