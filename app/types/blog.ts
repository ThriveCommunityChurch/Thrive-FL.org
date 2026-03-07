// ============================================
// BLOG POST TYPES
// ============================================

/**
 * Blog post type enum matching the API's BlogPostType
 */
export enum BlogPostType {
  SermonSeries = 0,
  ManualContent = 1,
  Email = 2,
}

/**
 * Blog post category enum matching the API's BlogPostCategory
 * Used for filtering and organizing blog posts by topic
 */
export enum BlogPostCategory {
  FaithFoundations = 0,
  PrayerAndSpiritualGrowth = 1,
  ScriptureAndTeaching = 2,
  IdentityAndPurpose = 3,
  Relationships = 4,
  MentalAndEmotionalHealth = 5,
  CommunityAndBelonging = 6,
  FaithAndCulture = 7,
  LeadershipAndCalling = 8,
  SeasonalAndSpecial = 9,
  Christmas = 10,
  Easter = 11,
  Anxiety = 12,
  Fear = 13,
  Grief = 14,
  Hope = 15,
  Purpose = 16,
  Forgiveness = 17,
  Marriage = 18,
  Family = 19,
  Announcements = 20,
}

/**
 * Human-readable labels for blog post categories
 */
export const BlogCategoryLabels: Record<BlogPostCategory, string> = {
  [BlogPostCategory.FaithFoundations]: 'Faith Foundations',
  [BlogPostCategory.PrayerAndSpiritualGrowth]: 'Prayer & Spiritual Growth',
  [BlogPostCategory.ScriptureAndTeaching]: 'Scripture & Teaching',
  [BlogPostCategory.IdentityAndPurpose]: 'Identity & Purpose',
  [BlogPostCategory.Relationships]: 'Relationships',
  [BlogPostCategory.MentalAndEmotionalHealth]: 'Mental & Emotional Health',
  [BlogPostCategory.CommunityAndBelonging]: 'Community & Belonging',
  [BlogPostCategory.FaithAndCulture]: 'Faith & Culture',
  [BlogPostCategory.LeadershipAndCalling]: 'Leadership & Calling',
  [BlogPostCategory.SeasonalAndSpecial]: 'Seasonal & Special',
  [BlogPostCategory.Christmas]: 'Christmas',
  [BlogPostCategory.Easter]: 'Easter',
  [BlogPostCategory.Anxiety]: 'Anxiety',
  [BlogPostCategory.Fear]: 'Fear',
  [BlogPostCategory.Grief]: 'Grief',
  [BlogPostCategory.Hope]: 'Hope',
  [BlogPostCategory.Purpose]: 'Purpose',
  [BlogPostCategory.Forgiveness]: 'Forgiveness',
  [BlogPostCategory.Marriage]: 'Marriage',
  [BlogPostCategory.Family]: 'Family',
  [BlogPostCategory.Announcements]: 'Announcements',
};

/**
 * Blog post entity
 * Returned by GET /api/Blog endpoints
 */
export interface BlogPost {
  Id: string;
  Title: string;
  Content: string;                // Markdown formatted content
  Type: BlogPostType;
  Category: BlogPostCategory | null;  // Topic category for filtering
  SourceUrl: string | null;       // e.g., /sermons/{seriesId}
  SourceId: string | null;        // ObjectId reference
  CreateDate: string;             // ISO date string
  LastUpdated: string;            // ISO date string
  IsPublished: boolean;
  PublishedDate: string | null;   // ISO date string
  Summary: string | null;         // Brief excerpt for previews/SEO
  Slug: string;                   // URL-friendly slug
}

/**
 * Blog post summary for list views (lighter weight)
 */
export interface BlogPostSummary {
  Id: string;
  Title: string;
  Summary: string | null;
  Slug: string;
  PublishedDate: string | null;
  Type: BlogPostType;
  Category: BlogPostCategory | null;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Paged response from GET /api/Blog
 */
export interface BlogPostPagedResponse {
  Items: BlogPost[];
  TotalCount: number;
  PageNumber: number;
  PageSize: number;
  TotalPages: number;
  HasNextPage: boolean;
  HasPreviousPage: boolean;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface BlogPostCardProps {
  post: BlogPost;
  index?: number;                 // For staggered animations
}

export interface BlogPostGridProps {
  posts: BlogPost[];
  isLoading?: boolean;
}

