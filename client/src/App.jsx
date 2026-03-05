import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages'
import AppLayout from './components/AppLayout'
import SafeJourney from './pages/SafeJourney'
import SOSPage from './pages/SOSPage'
import InnerCirclePage from './pages/InnerCirclePage'
import HeatmapPage from './pages/HeatmapPage'
import EvidencePage from './pages/EvidencePage'
import DisguiseMode from './pages/DisguiseMode'
import SettingsPage from './pages/SettingsPage'

import Auth from './pages/Auth'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route element={<AppLayout />}>
          <Route path='/' element={<Index />} />
          <Route path="/safe-journey" element={<SafeJourney />} />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/inner-circle" element={<InnerCirclePage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/disguise" element={<DisguiseMode />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App