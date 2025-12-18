// Singleton audio manager using Howler.js
// Uses window global to truly persist across Next.js navigations

import { Howl } from 'howler';
import { SermonMessage } from '../types/sermons';

export interface AudioState {
  currentMessage: SermonMessage | null;
  seriesTitle: string | null;
  seriesArtwork: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

type Listener = (state: AudioState) => void;

// Extend window type
declare global {
  interface Window {
    __THRIVE_AUDIO_MANAGER__?: AudioManager;
  }
}

class AudioManager {
  private howl: Howl | null = null;
  private listeners: Set<Listener> = new Set();
  private updateInterval: ReturnType<typeof setInterval> | null = null;

  public state: AudioState = {
    currentMessage: null,
    seriesTitle: null,
    seriesArtwork: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  };

  constructor() {
    console.log('[AudioManager] Constructor called');
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Immediately notify with current state
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  private startTimeUpdates() {
    if (this.updateInterval) return;
    this.updateInterval = setInterval(() => {
      if (this.howl && this.state.isPlaying) {
        this.state.currentTime = this.howl.seek() as number;
        this.notify();
      }
    }, 250);
  }

  private stopTimeUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  playMessage(message: SermonMessage, seriesTitle: string, seriesArtwork: string) {
    console.log('[AudioManager] playMessage called', message.Title);
    if (!message.AudioUrl) return;

    // If same message, toggle play/pause
    if (this.state.currentMessage?.MessageId === message.MessageId) {
      this.togglePlayPause();
      return;
    }

    // Stop current audio
    if (this.howl) {
      this.howl.unload();
    }

    // Create new Howl instance
    this.howl = new Howl({
      src: [message.AudioUrl],
      html5: true,
      onplay: () => {
        console.log('[AudioManager] onplay');
        this.state.isPlaying = true;
        this.state.duration = this.howl?.duration() || 0;
        this.startTimeUpdates();
        this.notify();
      },
      onpause: () => {
        console.log('[AudioManager] onpause');
        this.state.isPlaying = false;
        this.stopTimeUpdates();
        this.notify();
      },
      onend: () => {
        console.log('[AudioManager] onend');
        this.state.isPlaying = false;
        this.state.currentTime = 0;
        this.stopTimeUpdates();
        this.notify();
      },
      onload: () => {
        console.log('[AudioManager] onload');
        this.state.duration = this.howl?.duration() || 0;
        this.notify();
      },
    });

    // Update state BEFORE playing
    this.state.currentMessage = message;
    this.state.seriesTitle = seriesTitle;
    this.state.seriesArtwork = seriesArtwork;
    this.state.currentTime = 0;
    this.state.duration = 0;
    this.notify();

    // Play
    this.howl.play();
  }

  togglePlayPause() {
    if (!this.howl) return;

    if (this.state.isPlaying) {
      this.howl.pause();
    } else {
      this.howl.play();
    }
  }

  seek(time: number) {
    if (!this.howl) return;
    this.howl.seek(time);
    this.state.currentTime = time;
    this.notify();
  }

  close() {
    console.log('[AudioManager] close');
    if (this.howl) {
      this.howl.unload();
      this.howl = null;
    }
    this.stopTimeUpdates();
    this.state = {
      currentMessage: null,
      seriesTitle: null,
      seriesArtwork: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    };
    this.notify();
  }

  getState(): AudioState {
    return { ...this.state };
  }
}

// Get or create the singleton on the window object
function getAudioManager(): AudioManager {
  if (typeof window === 'undefined') {
    // Server-side: return a new instance (won't be used)
    return new AudioManager();
  }

  if (!window.__THRIVE_AUDIO_MANAGER__) {
    console.log('[AudioManager] Creating new instance on window');
    window.__THRIVE_AUDIO_MANAGER__ = new AudioManager();
  } else {
    console.log('[AudioManager] Using existing instance from window');
  }

  return window.__THRIVE_AUDIO_MANAGER__;
}

export const audioManager = getAudioManager();

