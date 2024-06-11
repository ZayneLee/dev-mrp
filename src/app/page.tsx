"use client";

import Calendar from "@/components/Calendar";
import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Main Page</title>
      </Head>
      <h1 className="text-3xl font-bold underline mb-4">Main Page</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold text-2xl text-gray-700">Calendar</h2>
        <Calendar />
      </div>
    </div>
  );
}
