import { Route, Routes } from 'react-router-dom'

import { Suspense, lazy } from 'react'
import { Loading } from './components/loading'

const HomePage = lazy(() => import('./pages/home-page'))
const ChartPage = lazy(() => import('./pages/chart-page'))
const CharacterPage = lazy(() => import('./pages/character-page'))

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path='/chart'
        element={
          <Suspense fallback={<Loading />}>
            <ChartPage />
          </Suspense>
        }
      />
      <Route
        path='/characters/:characterId'
        element={
          <Suspense fallback={<Loading />}>
            <CharacterPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
