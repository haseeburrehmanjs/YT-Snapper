import React, { useRef, useState } from "react";

const App = () => {
  const inputRef = useRef("");
  const [thumbnails, setThumbnails] = useState(null);

  const handleForm = (e) => {
    e.preventDefault();
    const url = inputRef.current.value.trim();

    if (!url) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    const fetchedThumbnails = getYouTubeThumbnail(url);
    if (fetchedThumbnails) {
      setThumbnails(fetchedThumbnails);
    } else {
      alert("Invalid YouTube URL");
    }

    inputRef.current.value = ""; // Clear input after submission
  };

  function getYouTubeThumbnail(videoUrl) {
    const videoIdMatch = videoUrl.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );

    if (!videoIdMatch) {
      return null;
    }

    const videoId = videoIdMatch[1];

    return {
      highQuality: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      mediumQuality: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      lowQuality: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      defaultQuality: `https://img.youtube.com/vi/${videoId}/default.jpg`
    };
  }

  const openThumbnail = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleForm} className="flex flex-col gap-3 items-center bg-white p-6 shadow-md rounded-lg">
        <input
          ref={inputRef}
          className="border w-[500px] p-2 outline-none text-black rounded-md"
          placeholder="Enter YouTube Video URL Here..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Get Thumbnail Images
        </button>
      </form>

      {thumbnails && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {Object.entries(thumbnails).map(([quality, url]) => (
            <div key={quality} className="flex flex-col items-center bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold capitalize">{quality.replace("Quality", " Quality")}</h2>
              <img
                src={url}
                alt={`YouTube Thumbnail - ${quality}`}
                className="w-[500px] rounded-lg shadow-md cursor-pointer"
                onClick={() => openThumbnail(url)}
              />
              <button
                onClick={() => openThumbnail(url)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Open in New Tab
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
