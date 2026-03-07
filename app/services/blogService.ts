// app/services/blogService.ts

import { BlogPost, BlogPostPagedResponse } from '../types/blog';

// ============================================
// CONFIGURATION
// ============================================

// API Base URL - uses environment variable with fallback to production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api2.thrive-fl.org';

// ============================================
// ERROR HANDLING
// ============================================

export class BlogApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'BlogApiError';
  }
}

async function handleResponse<T>(response: Response, endpoint: string): Promise<T> {
  if (!response.ok) {
    throw new BlogApiError(
      `API request failed: ${response.statusText}`,
      response.status,
      endpoint
    );
  }
  return response.json();
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Get paged published blog posts
 * @param pageNumber - Page number (1-based)
 * @param pageSize - Number of items per page (default 10, max 100)
 */
export async function getPagedBlogPosts(
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<BlogPostPagedResponse> {
  const endpoint = `/api/Blog?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<BlogPostPagedResponse>(response, endpoint);
}

/**
 * Get all published blog posts
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const endpoint = '/api/Blog/published';
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<BlogPost[]>(response, endpoint);
}

/**
 * Get a blog post by ID
 * @param blogPostId - The blog post ID
 */
export async function getBlogPostById(blogPostId: string): Promise<BlogPost> {
  const endpoint = `/api/Blog/${blogPostId}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<BlogPost>(response, endpoint);
}

/**
 * Get a blog post by slug
 * @param slug - URL-friendly slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const endpoint = `/api/Blog/slug/${slug}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<BlogPost>(response, endpoint);
}

/**
 * Search blog posts by title or content
 * @param term - Search term
 */
export async function searchBlogPosts(term: string): Promise<BlogPost[]> {
  const endpoint = `/api/Blog/search?term=${encodeURIComponent(term)}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<BlogPost[]>(response, endpoint);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format published date to readable format
 * Note: timeZone is specified to ensure consistent rendering between server and client
 * to prevent React hydration mismatches.
 */
export function formatBlogDate(dateString: string | null): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  });
}

/**
 * Get estimated reading time for blog content
 * Assumes average reading speed of 200 words per minute
 */
export function getReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

/**
 * Get a truncated excerpt from markdown content
 * Strips markdown formatting for clean preview
 */
export function getExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown headers, bold, italic, links
  const stripped = content
    .replace(/#{1,6}\s+/g, '')       // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1')    // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/\n+/g, ' ')             // Replace newlines with spaces
    .trim();

  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).trim() + '...';
}

