"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ComingSoon() {
  const videoRef = useRef(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://script.google.com/macros/library/d/1xqkvNEto1EpcfkvcuFj0EMB2L1M-xKVb4bDWRwWrsk3N9NXMGluFe3sS/3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("თქვენი ნომერი წარმატებით გაიგზავნა!");
        setPhone(""); // Clear the input field
      } else {
        alert("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
          src="/video.mp4"
          autoPlay
          loop
          muted
          suppressHydrationWarning
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center p-5">
        {/* Logo */}
        <Image
          src="/logo.png"
          width={200}
          height={200}
          alt="Dragon Motors Logo"
          priority
        />
        <h1 className="text-5xl font-bold mt-5 text-blue-400">Coming Soon</h1>
        <p className="mt-2 text-lg text-gray-300">
          აკრიფეთ ნომერი და ჩვენ დაგიკავშირდებით
        </p>
        {/* Phone Number Form */}
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="tel"
            placeholder="თქვენი ტელ.ნომერი"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="p-2 rounded-lg text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            გაგზავნა
          </button>
        </form>
      </div>
    </div>
  );
}