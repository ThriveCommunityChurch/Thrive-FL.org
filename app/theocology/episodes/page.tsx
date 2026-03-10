import EpisodesListClient from "./EpisodesListClient";

export const metadata = {
  title: "All Episodes | Theocology Podcast",
  description: "Browse all episodes of Theocology, the podcast from ThriveFGCU exploring faith, doubt, identity, and community.",
};

export default function TheocologyEpisodesPage() {
  return <EpisodesListClient />;
}

