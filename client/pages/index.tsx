"use client";

import { useRouter } from 'next/router';
import React from 'react'

function index() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to my app.</h1>
      <button onClick={() => router.push("/login")}>LOGIN</button>
      <button onClick={() => router.push("/register")}>REGISTER</button>
      <button onClick={() => router.push("/home")}>HOME</button>
    </div>
  );
}

export default index;