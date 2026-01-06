"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { LivestreamPlayerProps, LivestreamStatus } from '../../types/youtube';
import {
  checkLiveStatus,
  getEmbedUrl,
  getPollInterval,
  THRIVE_CHANNEL_ID
} from '../../services/youtubeService';
import LivestreamSkeleton from './LivestreamSkeleton';
import LivestreamOffline from './LivestreamOffline';

/**
 * Main livestream player component
 * Automatically checks for live streams and displays the appropriate state
 */
export default function LivestreamPlayer({
  channelId = THRIVE_CHANNEL_ID,
  pollInterval,
  onStatusChange,
  showStatusInfo = false,
}: LivestreamPlayerProps) {
  const [status, setStatus] = useState<LivestreamStatus>({
    isLive: false,
    isLoading: true,
    error: null,
    videoId: null,
    title: null,
    thumbnail: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check live status and update state
  const checkStatus = useCallback(async () => {
    const newStatus = await checkLiveStatus(channelId);
    setStatus(prev => ({
      ...newStatus,
      isLoading: false,
    }));
    onStatusChange?.(newStatus);
  }, [channelId, onStatusChange]);

  // Stop polling when stream is live
  useEffect(() => {
    if (status.isLive && intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, [status.isLive]);

  // Set up polling with visibility awareness
  useEffect(() => {
    // Initial check
    checkStatus();

    // Set up polling function with dynamic interval based on time of week
    const startPolling = () => {
      const scheduleNextPoll = () => {
        // Don't schedule if already live
        if (status.isLive) return;

        const interval = pollInterval || getPollInterval();

        // null interval = cooloff period, don't poll but check again in 30 min
        // to see if we've entered a service window
        const actualInterval = interval ?? 30 * 60 * 1000;

        intervalRef.current = setTimeout(() => {
          // Only poll when page is visible and not in cooloff
          if (document.visibilityState === 'visible' && interval !== null) {
            checkStatus();
          }
          // Schedule next poll (recalculates interval each time)
          scheduleNextPoll();
        }, actualInterval);
      };
      scheduleNextPoll();
    };

    // Handle visibility change - check immediately when page becomes visible
    // but only if not already live
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !status.isLive) {
        checkStatus();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkStatus, pollInterval, status.isLive]);

  // Loading state
  if (status.isLoading) {
    return <LivestreamSkeleton showStatusInfo={showStatusInfo} />;
  }

  // Live state - show embedded player
  if (status.isLive && status.videoId) {
    return (
      <div className="livestream-player">
        {/* Live badge */}
        <div className="livestream-live-badge">
          <span className="livestream-live-dot"></span>
          LIVE NOW
        </div>

        {/* Video container */}
        <div className="livestream-video-container">
          <iframe
            src={getEmbedUrl(status.videoId)}
            title={status.title || 'Thrive Church Live Stream'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="livestream-iframe"
          />
        </div>

        {/* Status info */}
        {showStatusInfo && status.title && (
          <div className="livestream-status-info">
            <p className="livestream-now-playing">Now streaming: {status.title}</p>
          </div>
        )}
      </div>
    );
  }

  // Offline state - show friendly message
  return (
    <div className="livestream-player">
      <div className="livestream-video-container">
        <LivestreamOffline />
      </div>
    </div>
  );
}

