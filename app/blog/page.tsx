import { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faExclamationTriangle, 
  faClock,
  faArrowRight 
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { getPublishedBlogPosts, formatBlogDate, getReadingTime } from "../services/blogService";
import { BlogPost } from "../types/blog";

// No caching - always fetch fresh on pageload
// API will cache responses server-side
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog | Thrive Community Church",
  description: "Explore articles and reflections from Thrive Community Church. Dive deeper into our sermon series with practical insights for everyday faith.",
  openGraph: {
    title: "Blog | Thrive Community Church",
    description: "Articles and reflections on faith, community, and everyday life from Thrive Community Church in Estero, FL.",
    url: "https://thrive-fl.org/blog",
  },
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;

  try {
    posts = await getPublishedBlogPosts();
  } catch (err) {
    console.error('Failed to load blog posts:', err);
    error = 'Failed to load blog posts. Please try again later.';
  }

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-blog">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Blog</h1>
          <p className="page-hero-subtitle">
            Practical insights and reflections from our sermon series
          </p>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="section blog-section">
        <div className="container">
          {error ? (
            <div className="sermon-error-state">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <h3>Unable to Load Blog Posts</h3>
              <p>{error}</p>
              <Link href="/blog" className="btn btn-primary">
                Try Again
              </Link>
            </div>
          ) : posts.length === 0 ? (
            <div className="blog-empty-state">
              <h3>No Blog Posts Yet</h3>
              <p>Check back soon for new articles and reflections.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post, index) => (
                <Link
                  key={post.Id}
                  href={`/blog/${post.Slug}`}
                  className="blog-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="blog-card__content">
                    <h2 className="blog-card__title">{post.Title}</h2>
                    <p className="blog-card__summary">
                      {post.Summary || 'Read more about this topic...'}
                    </p>
                    <div className="blog-card__meta">
                      <span className="blog-card__date">
                        <FontAwesomeIcon icon={faCalendar} />
                        {formatBlogDate(post.PublishedDate || post.CreateDate)}
                      </span>
                      <span className="blog-card__reading-time">
                        <FontAwesomeIcon icon={faClock} />
                        {getReadingTime(post.Content)} min read
                      </span>
                    </div>
                    <span className="blog-card__action">
                      Read Article
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section blog-cta-section">
        <div className="container">
          <div className="sermons-cta-content">
            <div className="sermons-cta-text">
              <h3>Want to Hear the Full Message?</h3>
              <p>These articles are based on our sermon series. Watch or listen to get the complete teaching.</p>
            </div>
            <Link href="/sermons" className="btn btn-primary">
              Browse Sermons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

