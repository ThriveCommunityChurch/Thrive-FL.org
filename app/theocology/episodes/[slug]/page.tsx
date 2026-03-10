import EpisodeDetailClient from "./EpisodeDetailClient";

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <EpisodeDetailClient slug={slug} />;
}

