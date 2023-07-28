"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/signin');
  }, []);

  return null;
};

export default HomePage;
