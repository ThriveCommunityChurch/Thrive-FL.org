import { fetchTheocologyEpisodes } from "../../../services/theocologyService";
import PodcastClient from "./PodcastClient";

// ISR: refresh the RSS-backed episode list hourly (matches the service cache)
export const revalidate = 3600;

export default async function TheocologyPodcastPage() {
  const episodes = await fetchTheocologyEpisodes();
  // Show the five most recent episodes on the landing page
  return <PodcastClient episodes={episodes.slice(0, 5)} />;
}
