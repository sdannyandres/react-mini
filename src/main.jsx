import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Home} from './componentes/Home'
import {Producto} from './componentes/Producto'
import { QueryClient, QueryClientProvider } from 'react-query'
import {Balance} from './componentes/Balance'
import './index.css'

export const Context = createContext(null)

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}>
      <Route path="/productos" element={<Producto></Producto>}/>
      <Route path="/balance" element={<Balance></Balance>}/>
      </Route>
          
    </Routes>
    
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

