"use client"
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks/hooks';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const { token } = useAppSelector((state)=> state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/login');
      }
    }, [token]);

    if (!token) {
      return null; // Or a loading spinner, etc.
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
