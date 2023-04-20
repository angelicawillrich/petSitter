import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router-dom'
import Header from './baseComponents/header'

const Layout = () => (
  <div>
    <div className="flex flex-col flex-1 w-full">
      <Header />
      <div className="flex flex-col w-full items-center justify-center px-[5%] md:px-[10%] py-[5%]">
        <Outlet />
      </div>
    </div>
  </div>
)

export default Layout
