import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from './router';

export default function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
  )
}
