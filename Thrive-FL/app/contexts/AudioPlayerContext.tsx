"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { SermonMessage } from '../types/sermons';
import { AudioState } from '../lib/audioManager';

interface AudioPlayerContextType {
  currentMessage: SermonMessage | null;
  seriesTitle: string | null;
  seriesArtwork: string | null;
  isPlayerVisible: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playMessage: (message: SermonMessage, seriesTitle: string, seriesArtwork: string) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  closePlayer: () => void;
}

const defaultState: AudioState = {
  currentMessage: null,
  seriesTitle: null,
  seriesArtwork: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

interface AudioPlayerProviderProps {
  children: ReactNode;
}

// Dynamically import to avoid SSR issues
const getManager = () => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { audioManager } = require('../lib/audioManager');
    return audioManager;
  }
  return null;
};

export function AudioPlayerProvider({ children }: AudioPlayerProviderProps) {
  const [audioState, setAudioState] = useState<AudioState>(defaultState);
  const [mounted, setMounted] = useState(false);

  // Subscribe to audio manager updates (client-side only)
  useEffect(() => {
    setMounted(true);
    const manager = getManager();
    if (manager) {
      // Get current state immediately
      setAudioState(manager.getState());
      // Subscribe to updates
      const unsubscribe = manager.subscribe(setAudioState);
      return unsubscribe;
    }
  }, []);

  const playMessage = useCallback((message: SermonMessage, seriesTitle: string, seriesArtwork: string) => {
    const manager = getManager();
    if (manager) {
      manager.playMessage(message, seriesTitle, seriesArtwork);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    const manager = getManager();
    if (manager) {
      manager.togglePlayPause();
    }
  }, []);

  const seek = useCallback((time: number) => {
    const manager = getManager();
    if (manager) {
      manager.seek(time);
    }
  }, []);

  const closePlayer = useCallback(() => {
    const manager = getManager();
    if (manager) {
      manager.close();
    }
  }, []);

  const isPlayerVisible = mounted && audioState.currentMessage !== null;

  return (
    <AudioPlayerContext.Provider
      value={{
        currentMessage: audioState.currentMessage,
        seriesTitle: audioState.seriesTitle,
        seriesArtwork: audioState.seriesArtwork,
        isPlayerVisible,
        isPlaying: audioState.isPlaying,
        currentTime: audioState.currentTime,
        duration: audioState.duration,
        playMessage,
        togglePlayPause,
        seek,
        closePlayer,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}

