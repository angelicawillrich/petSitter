import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router-dom'
import Header from './baseComponents/header'

const Layout = () => (
  <div className="flex flex-col flex-1 w-full justify-center items-center">
    <Header />

    <div className="flex flex-col max-w-6xl w-full md:w-auto items-center justify-center px-[5%] md:px-[10%] py-[5%]">
      <Outlet />
    </div>
  </div>
)

export default Layout
