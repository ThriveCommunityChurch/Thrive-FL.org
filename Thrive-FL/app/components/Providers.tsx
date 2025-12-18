"use client";

import { ReactNode } from 'react';
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext';
import GlobalAudioPlayer from './sermons/GlobalAudioPlayer';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AudioPlayerProvider>
      {children}
      <GlobalAudioPlayer />
    </AudioPlayerProvider>
  );
}

