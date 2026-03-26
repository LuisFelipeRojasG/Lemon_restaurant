import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Menu } from './pages/Menu'
import { Booking } from './pages/Booking'
import { Checkout } from './pages/Checkout'
import { OrderConfirmation } from './pages/OrderConfirmation'
import { Dashboard } from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='About' element={<About />} />
          <Route path='Menu' element={<Menu />} />
          <Route path='Booking' element={<Booking />} />
          <Route path='Checkout' element={<Checkout />} />
          <Route path='OrderConfirmation' element={<OrderConfirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App