export function VideoElement({ content }: { content: VideoContent }) {
  if (content === null)
    return <p className="text-tertiary-text">add video...</p>;
}
