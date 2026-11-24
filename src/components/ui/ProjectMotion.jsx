export default function ProjectMotion({ project }) {
  return (
    <video
      className="project-motion"
      controls
      playsInline
      muted
      preload="none"
      width={960}
      height={600}
      poster={`/media/${project.slug}.webp`}
      aria-label={`${project.title} animated cover, silent`}
    >
      <source src={`/media/${project.slug}.mp4`} type="video/mp4" />
      <a href={`/media/${project.slug}.mp4`}>Watch the {project.title} animated cover</a>
    </video>
  );
}
