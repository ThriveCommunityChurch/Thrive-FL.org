// JSON-LD Structured Data Components for SEO
// See: https://schema.org/

// Church/Organization data used across the site
export const churchData = {
  name: "Thrive Community Church",
  description: "A Lutheran Church—Missouri Synod congregation in Estero, FL offering contemporary worship, biblical teaching, and genuine community.",
  url: "https://thrive-fl.org",
  logo: "https://d2v6hk6f64og35.cloudfront.net/thrive-logo.png",
  image: "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg",
  telephone: "+1-239-687-3430",
  email: "info@thrive-fl.org",
  address: {
    streetAddress: "20041 South Tamiami Trail #1",
    addressLocality: "Estero",
    addressRegion: "FL",
    postalCode: "33928",
    addressCountry: "US",
  },
  geo: {
    latitude: 26.430716,
    longitude: -81.793833,
  },
  openingHours: "Su 10:00-12:00",
  sameAs: [
    "https://www.facebook.com/thriveFL",
    "https://www.instagram.com/thrive_fl",
    "https://x.com/Thrive_FL",
    "https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig",
  ],
};

// Organization JSON-LD for the homepage
export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Church", "Organization"],
    name: churchData.name,
    description: churchData.description,
    url: churchData.url,
    logo: churchData.logo,
    image: churchData.image,
    telephone: churchData.telephone,
    email: churchData.email,
    address: {
      "@type": "PostalAddress",
      ...churchData.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: churchData.geo.latitude,
      longitude: churchData.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "12:00",
    },
    sameAs: churchData.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Church Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sunday Worship Service",
            description: "Weekly worship service with contemporary music and biblical teaching",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Event JSON-LD for event pages
interface EventJsonLdProps {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  isOnline?: boolean;
  onlineUrl?: string;
  url: string;
  image?: string;
}

export function EventJsonLd({
  name,
  description,
  startDate,
  endDate,
  location,
  isOnline,
  onlineUrl,
  url,
  image,
}: EventJsonLdProps) {
  const eventLocation = isOnline
    ? {
        "@type": "VirtualLocation",
        url: onlineUrl || url,
      }
    : {
        "@type": "Place",
        name: location?.name || churchData.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: location?.address || churchData.address.streetAddress,
          addressLocality: location?.city || churchData.address.addressLocality,
          addressRegion: location?.state || churchData.address.addressRegion,
          postalCode: location?.zipCode || churchData.address.postalCode,
          addressCountry: churchData.address.addressCountry,
        },
      };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description: description || `Join us for ${name} at ${churchData.name}`,
    startDate,
    endDate: endDate || startDate,
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: eventLocation,
    organizer: {
      "@type": "Organization",
      name: churchData.name,
      url: churchData.url,
    },
    url,
    image: image || churchData.image,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// WebSite JSON-LD for search box functionality
export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: churchData.name,
    url: churchData.url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Sermon Series JSON-LD for series pages with episodes
interface SermonSeriesJsonLdProps {
  seriesId: string;
  name: string;
  description?: string | null;
  image?: string;
  startDate?: string | null;
  endDate?: string | null;
  messages: Array<{
    MessageId: string;
    Title: string;
    Speaker: string;
    Date: string | null;
    AudioUrl: string | null;
    AudioDuration: number | null; // in seconds
    Summary: string | null;
    PassageRef: string | null;
  }>;
}

export function SermonSeriesJsonLd({
  seriesId,
  name,
  description,
  image,
  startDate,
  endDate,
  messages,
}: SermonSeriesJsonLdProps) {
  // Format duration from seconds to ISO 8601 duration (e.g., PT30M for 30 minutes)
  const formatDuration = (seconds: number | null): string | undefined => {
    if (!seconds) return undefined;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    let duration = "PT";
    if (hours > 0) duration += `${hours}H`;
    if (minutes > 0) duration += `${minutes}M`;
    if (secs > 0 || duration === "PT") duration += `${secs}S`;
    return duration;
  };

  // Create episode list from messages
  const episodes = messages
    .filter(msg => msg.AudioUrl) // Only include messages with audio
    .map((msg, index) => ({
      "@type": "PodcastEpisode",
      name: msg.Title,
      url: `https://thrive-fl.org/sermons/${seriesId}`,
      datePublished: msg.Date || undefined,
      description: msg.Summary || `${msg.Title} - A sermon from the "${name}" series`,
      duration: formatDuration(msg.AudioDuration),
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: msg.AudioUrl,
        encodingFormat: "audio/mpeg",
      },
      partOfSeries: {
        "@type": "PodcastSeries",
        name: name,
        url: `https://thrive-fl.org/sermons/${seriesId}`,
      },
      author: {
        "@type": "Person",
        name: msg.Speaker,
      },
      ...(msg.PassageRef && {
        about: {
          "@type": "Thing",
          name: msg.PassageRef,
        },
      }),
      position: index + 1,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: name,
    description: description || `Listen to the "${name}" sermon series from ${churchData.name}`,
    url: `https://thrive-fl.org/sermons/${seriesId}`,
    image: image || churchData.image,
    author: {
      "@type": "Organization",
      name: churchData.name,
      url: churchData.url,
    },
    publisher: {
      "@type": "Organization",
      name: churchData.name,
      logo: {
        "@type": "ImageObject",
        url: churchData.logo,
      },
    },
    inLanguage: "en-US",
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    numberOfEpisodes: messages.length,
    episode: episodes,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Individual Sermon Message JSON-LD for message detail pages
interface SermonMessageJsonLdProps {
  seriesId: string;
  seriesName: string;
  messageId: string;
  title: string;
  speaker: string;
  date?: string | null;
  summary?: string | null;
  passageRef?: string | null;
  audioUrl?: string | null;
  audioDuration?: number | null;
  image?: string;
  transcript?: string | null; // Truncated transcript for JSON-LD
}

export function SermonMessageJsonLd({
  seriesId,
  seriesName,
  messageId,
  title,
  speaker,
  date,
  summary,
  passageRef,
  audioUrl,
  audioDuration,
  image,
  transcript,
}: SermonMessageJsonLdProps) {
  // Format duration from seconds to ISO 8601 duration
  const formatDuration = (seconds: number | null | undefined): string | undefined => {
    if (!seconds) return undefined;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    let duration = "PT";
    if (hours > 0) duration += `${hours}H`;
    if (minutes > 0) duration += `${minutes}M`;
    if (secs > 0 || duration === "PT") duration += `${secs}S`;
    return duration;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: title,
    url: `https://thrive-fl.org/sermons/${seriesId}/${messageId}`,
    datePublished: date || undefined,
    description: summary || `${title} - A sermon from the "${seriesName}" series at ${churchData.name}`,
    duration: formatDuration(audioDuration),
    image: image || churchData.image,
    ...(audioUrl && {
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: audioUrl,
        encodingFormat: "audio/mpeg",
      },
    }),
    partOfSeries: {
      "@type": "PodcastSeries",
      name: seriesName,
      url: `https://thrive-fl.org/sermons/${seriesId}`,
    },
    author: {
      "@type": "Person",
      name: speaker,
    },
    publisher: {
      "@type": "Organization",
      name: churchData.name,
      logo: {
        "@type": "ImageObject",
        url: churchData.logo,
      },
    },
    ...(passageRef && {
      about: {
        "@type": "Thing",
        name: passageRef,
      },
    }),
    // Include truncated transcript for SEO (first ~1000 chars)
    ...(transcript && {
      transcript: transcript.length > 1000
        ? transcript.substring(0, 1000) + "..."
        : transcript,
    }),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Mobile App JSON-LD for app install links in search results
export function MobileAppJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        name: "Thrive Church Official App",
        operatingSystem: "iOS",
        applicationCategory: "LifestyleApplication",
        description: "Stay connected with sermons, notes, events, and your church community—all in one place.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        installUrl: "https://apps.apple.com/us/app/thrive-church-official-app/id1138008288",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 5,
          ratingCount: 2,
        },
      },
      {
        "@type": "MobileApplication",
        name: "Thrive Church Official App",
        operatingSystem: "Android",
        applicationCategory: "LifestyleApplication",
        description: "Stay connected with sermons, notes, events, and your church community—all in one place.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        installUrl: "https://play.google.com/store/apps/details?id=com.thrivefl.ThriveCommunityChurch",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
