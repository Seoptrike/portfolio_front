// components/ProjectCard/index.jsx
import React from "react";
import DesktopCard from "./DesktopCard";
import MobileCard from "./MobileCard";

const ProjectCard = ({ project, editMode, onUpdate, isMobile }) => {
    const stacks = Array.isArray(project.stackNames)
        ? project.stackNames.map((s) => (typeof s === "string" ? s : s?.name))
        : [];

    const links = {
        notion: project.notionUrl || project.notion_url,
        github: project.githubUrl || project.github_url,
        deploy: project.deployUrl || project.deploy_url,
    };

    return isMobile
        ? <MobileCard project={project} stacks={stacks} editMode={editMode} onUpdate={onUpdate} links={links} />
        : <DesktopCard project={project} stacks={stacks} editMode={editMode} onUpdate={onUpdate} links={links} />;
};

export default ProjectCard;
