import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="not-found-page">
      {/* Background image of empty tomb */}
      <div className="not-found-background">
        <Image
          src="https://images.unsplash.com/photo-1521106581851-da5b6457f674?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=1920&q=80"
          alt="Empty tomb at sunrise"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="not-found-overlay"></div>
      </div>

      <div className="not-found-content">
        <h1 className="not-found-title">He Is Not Here</h1>
        <p className="not-found-code">404</p>
        <p className="not-found-subtitle">
          The page you&apos;re looking for has moved on.
        </p>
        <p className="not-found-verse">
          &ldquo;He is not here; he has risen!&rdquo;
          <span className="verse-ref">— Luke 24:6</span>
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faHome} />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
