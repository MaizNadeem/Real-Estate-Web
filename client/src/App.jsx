import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Website from "./pages/Website"

import './App.css'

function App() {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Website />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
