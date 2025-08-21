// src/constants/iconMap.js
import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiVuedotjs, SiExpress,
    SiSpringboot, SiSpring, SiPython, SiMysql, SiPostgresql, SiMongodb,
    SiDocker, SiNginx, SiAmazon, SiVercel, SiJira, SiNotion
} from 'react-icons/si';
import { FaNodeJs, FaJava, FaGithub } from 'react-icons/fa';

export const ICON_MAP = {
    HTML: { Icon: SiHtml5, color: '#E34F26' },
    CSS: { Icon: SiCss3, color: '#1572B6' },
    JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
    React: { Icon: SiReact, color: '#61DAFB' },
    Vue: { Icon: SiVuedotjs, color: '#42B883' },
    'Node.js': { Icon: FaNodeJs, color: '#68A063' },
    Express: { Icon: SiExpress, color: '#000' },
    Java: { Icon: FaJava, color: '#f89820' },
    'Spring Boot': { Icon: SiSpringboot, color: '#6DB33F' },
    Spring: { Icon: SiSpring, color: '#6DB33F' },
    Python: { Icon: SiPython, color: '#3776AB' },
    MySQL: { Icon: SiMysql, color: '#00758F' },
    PostgreSQL: { Icon: SiPostgresql, color: '#336791' },
    MongoDB: { Icon: SiMongodb, color: '#47A248' },
    Docker: { Icon: SiDocker, color: '#2496ED' },
    Nginx: { Icon: SiNginx, color: '#009639' },
    AWS: { Icon: SiAmazon, color: '#FF9900' },
    Vercel: { Icon: SiVercel, color: '#000' },
    GitHub: { Icon: FaGithub, color: '#000' },
    Jira: { Icon: SiJira, color: '#0052CC' },
    Notion: { Icon: SiNotion, color: '#000' },
};
