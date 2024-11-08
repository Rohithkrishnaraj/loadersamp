"use client";
import React, { useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = React.useRef(null);

  const songs = [
    { name: "Fire-Song-MassTamilan.dev", file: "/uploads/Fire-Song-MassTamilan.dev.mp3" },
    { name: "Mannippu-MassTamilan.dev", file: "/uploads/Mannippu-MassTamilan.dev.mp3" },
    { name: "Song 3", file: "/uploads/song3.mp3" },
    // Add other songs here
  ];

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSongChange = (file) => {
    setAudioUrl(file);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-black border-b border-gray-800">
        <h1 className="text-3xl font-bold text-green-500">MyMusic</h1>
        <div className="w-1/3 flex items-center bg-gray-800 rounded-full p-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white w-full focus:outline-none px-4"
          />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-1/5 bg-black p-6 space-y-4 border-r border-gray-800">
          <ul className="space-y-2">
            <li><a href="#" className="text-lg hover:text-green-500">Home</a></li>
            <li><a href="#" className="text-lg hover:text-green-500">Search</a></li>
            <li><a href="#" className="text-lg hover:text-green-500">Library</a></li>
          </ul>
        </nav>

        {/* Main area */}
        <main className="flex-1 p-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-500">Now Playing</h2>

            {/* Song list */}
            <div className="space-y-4">
              {songs.map((song, index) => (
                <div
                  key={index}
                  onClick={() => handleSongChange(song.file)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    audioUrl === song.file ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  <span className="text-lg font-medium">{song.name}</span>
                </div>
              ))}
            </div>

            {/* Audio player controls */}
            {audioUrl && (
              <div className="mt-6 space-y-4">
                <audio
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleDurationChange}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src={audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>

                {/* Play/Pause button */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayPause}
                    className="bg-green-500 text-white p-3 rounded-full focus:outline-none"
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <span className="text-gray-400">
                    {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                  </span>
                </div>

                {/* Progress bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full bg-gray-600 rounded-full"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>0:00</span>
                  <span>
                    {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black p-4 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>MyMusic - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default MusicPlayer;
