import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExclamationTriangle,
  faClock,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { getBlogPostBySlug, formatBlogDate, getReadingTime } from "../../services/blogService";
import { getSeriesById } from "../../services/sermonService";
import { BlogPostType } from "../../types/blog";
import BlogContent from "./BlogContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// No caching - always fetch fresh on pageload
// API will cache responses server-side
export const revalidate = 0;

// Generate dynamic metadata based on blog post data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPostBySlug(slug);

    const description = post.Summary
      ? post.Summary.slice(0, 160)
      : `Read "${post.Title}" from Thrive Community Church.`;

    return {
      title: `${post.Title} | Blog | Thrive Community Church`,
      description,
      openGraph: {
        title: `${post.Title} | Thrive Community Church`,
        description,
        url: `https://thrive-fl.org/blog/${slug}`,
        type: 'article',
        publishedTime: post.PublishedDate || undefined,
        modifiedTime: post.LastUpdated,
      },
    };
  } catch {
    return {
      title: "Blog Post | Thrive Community Church",
      description: "Read articles and reflections from Thrive Community Church in Estero, FL.",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = null;
  let seriesName: string | null = null;
  let error: string | null = null;

  try {
    post = await getBlogPostBySlug(slug);

    // If this is a sermon series blog post, fetch the series name
    if (post?.Type === BlogPostType.SermonSeries && post?.SourceUrl) {
      // Extract seriesId from SourceUrl (format: /sermons/{seriesId})
      const seriesIdMatch = post.SourceUrl.match(/\/sermons\/([^/]+)/);
      if (seriesIdMatch?.[1]) {
        try {
          const series = await getSeriesById(seriesIdMatch[1]);
          seriesName = series.Name;
        } catch {
          // Series fetch failed - continue without series name
        }
      }
    }
  } catch (err) {
    console.error('Failed to load blog post:', err);
    error = 'Failed to load blog post. Please try again later.';
  }

  if (!post && !error) {
    notFound();
  }

  const readingTime = post ? getReadingTime(post.Content) : 0;
  const showSeriesLink = post?.Type === BlogPostType.SermonSeries && post?.SourceUrl;

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <Link href="/blog" className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            All Articles
          </Link>
        </div>
      </nav>

      {/* Blog Post Content */}
      <article className="section blog-detail-section">
        <div className="container blog-detail-container">
          {error ? (
            <div className="sermon-error-state">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <h3>Unable to Load Article</h3>
              <p>{error}</p>
              <Link href="/blog" className="btn btn-primary">Back to Blog</Link>
            </div>
          ) : post ? (
            <>
              {/* Article Header */}
              <header className="blog-detail-header">
                <h1 className="blog-detail-title">{post.Title}</h1>
                <div className="blog-detail-meta">
                  {post.PublishedDate && (
                    <span className="blog-detail-date">
                      <FontAwesomeIcon icon={faCalendar} />
                      {formatBlogDate(post.PublishedDate)}
                    </span>
                  )}
                  <span className="blog-detail-reading-time">
                    <FontAwesomeIcon icon={faClock} />
                    {readingTime} min read
                  </span>
                  {showSeriesLink && seriesName && (
                    <Link href={post.SourceUrl!} className="blog-detail-series-link">
                      <FontAwesomeIcon icon={faBookOpen} />
                      View Series
                    </Link>
                  )}
                </div>
              </header>

              {/* Article Content - Client component for markdown rendering */}
              <BlogContent content={post.Content} />

              {/* Blog Post Footer - Church Attribution */}
              <footer className="blog-detail-footer">
                <hr />
                <p>
                  {seriesName && post.SourceUrl ? (
                    <>
                      This post is based on the{' '}
                      <Link href={post.SourceUrl}>{seriesName}</Link> series from{' '}
                    </>
                  ) : (
                    <>Written by </>
                  )}
                  <Link href="/">Thrive Community Church</Link> in Estero, Southwest Florida.
                </p>
              </footer>

              {/* Series Link CTA */}
              {showSeriesLink && (
                <div className="blog-detail-cta">
                  <p>Want to explore this topic deeper?</p>
                  <Link href={post.SourceUrl!} className="btn btn-primary">
                    Watch the Full Series
                  </Link>
                </div>
              )}
            </>
          ) : null}
        </div>
      </article>
    </div>
  );
}

