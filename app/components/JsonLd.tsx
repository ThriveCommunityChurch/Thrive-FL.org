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
