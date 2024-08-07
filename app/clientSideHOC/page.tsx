"use client";
import React from 'react'
import withAuth from '../components/withAuth';

const clientSideHOC = () => {
  return (
    <div>
      This is protected component
    </div>
  )
}

export default withAuth(clientSideHOC);
