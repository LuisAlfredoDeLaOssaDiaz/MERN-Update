import React from 'react'
import {Routes, Route} from "react-router-dom"
import {Auth, Users, Blog, Courses, Menu, Newsletter} from "../pages/admin"
import { AdminLayout } from "../layouts"

const user = null

export function AdminRouter() {
    const loadLayout = (Layout, Page) => {
      return (
        <Layout>
          <Page />
        </Layout>
      )
    }
    
  return (
    <div>
      <Routes>
        {!user ? (
          <Route path="/admin/*" element={<Auth />} />
          ) : (
          <>
          { ["/admin", "/admin/blog"].map((path) => ( 
                <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />
              )
            )
          }
            <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
            <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)} />
            <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
            <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)} />
          </>
        )}
      </Routes>
    </div>
  )
}
