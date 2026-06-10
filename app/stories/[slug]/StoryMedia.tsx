// app/stories/[slug]/StoryMedia.tsx
"use client";

interface StoryMediaProps {
  name: string;
  youtubeId?: string;
  vimeoId?: string;
  audioUrl?: string;
}

/**
 * Renders the best available media for a story:
 *  - youtubeId present  -> responsive YouTube embed
 *  - else vimeoId       -> responsive Vimeo embed
 *  - else audioUrl      -> native audio player
 *  - else               -> nothing (transcript stands alone)
 */
export default function StoryMedia({ name, youtubeId, vimeoId, audioUrl }: StoryMediaProps) {
  if (youtubeId) {
    return (
      <div className="story-media story-media--video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={`${name} — Why Thrive?`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className="story-media story-media--video">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title={`${name} — Why Thrive?`}
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (audioUrl) {
    return (
      <div className="story-media story-media--audio">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls preload="metadata" src={audioUrl}>
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return null;
}
