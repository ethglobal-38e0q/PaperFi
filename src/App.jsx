import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TradeInterface from './pages/TradeInterface'
import LaunchpadPage from './pages/LaunchpadPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<TradeInterface />} />
      <Route path="/launchpad" element={<LaunchpadPage  />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
