"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface VideoWatchClientProps {
  messageId: string;
  messageTitle: string;
}

export default function VideoWatchClient({ messageId, messageTitle }: VideoWatchClientProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadTranscript = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Fetch transcript from API
      const response = await fetch(`/api/transcript/${messageId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch transcript");
      }
      
      const data = await response.json();
      
      if (!data.FullText) {
        alert("No transcript available for this message.");
        return;
      }
      
      // Create and download the file
      const blob = new Blob([data.FullText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${messageTitle} - Transcript.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading transcript:", error);
      alert("Unable to download transcript. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownloadTranscript}
      disabled={isDownloading}
      className="video-watch-download-btn"
      title="Download Transcript"
    >
      <FontAwesomeIcon icon={isDownloading ? faSpinner : faDownload} spin={isDownloading} />
      {isDownloading ? "Downloading..." : "Download Transcript"}
    </button>
  );
}

