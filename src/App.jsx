import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TradeInterface from './pages/TradeInterface'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<TradeInterface />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
