import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetailNav from "@/components/project-detail/ProjectDetailNav";
import ProjectHero from "@/components/project-detail/ProjectHero";
import ProjectInfo from "@/components/project-detail/ProjectInfo";
import ProjectGallery from "@/components/project-detail/ProjectGallery";
import ProjectNav from "@/components/project-detail/ProjectNav";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — Flash Tale",
    };
  }

  return {
    title: `${project.title} — Flash Tale`,
    description:
      project.description ||
      `Visual story and cinematography for ${project.title} by Flash Tale.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <ProjectDetailNav />
      <ProjectHero project={project} />
      <ProjectInfo project={project} />
      <ProjectGallery
        gallery={project.gallery}
        projectTitle={project.title}
      />
      <ProjectNav nextProject={nextProject} />
    </main>
  );
}
