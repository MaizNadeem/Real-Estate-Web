import { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from './components/Layout/Layout'
import Website from "./pages/Website"
import Properties from './pages/Properties/Properties'
import Property from './pages/Property/Property'
import UserDetailsContext from './context/UserDetailsContext'

import './App.css'

function App() {

    const queryClient = new QueryClient()
    const [ userDetails, setUserDetails ] = useState({
        favourites: [],
        bookings: [],
        token: null
    })

    return (
        <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Website />} />
                                <Route path='/properties' >
                                    <Route index element={<Properties />} />
                                    <Route path=":propertyID" element={<Property />} />
                                </Route>
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </UserDetailsContext.Provider>
    )
}

export default App
