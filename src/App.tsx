import { BrowserRouter, Routes, Route } from 'react-router-dom'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/item/:id" element={<JobDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
