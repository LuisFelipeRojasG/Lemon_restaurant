import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Menu } from './pages/Menu'
import { Booking } from './pages/Booking'
import { Dashboard } from './components/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='About' element={<About />} />
          <Route path='Menu' element={<Menu />} />
          <Route path='Booking' element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
