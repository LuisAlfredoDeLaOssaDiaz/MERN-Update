import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from './router';
import {AuthProvider} from "./contexts"

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
        {/* <Routes> */}
          <WebRouter />
          <AdminRouter />
        {/* </Routes> */}
      </BrowserRouter>
    </AuthProvider>
  )
}
  