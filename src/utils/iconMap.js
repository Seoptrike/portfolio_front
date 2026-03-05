/**
 * 기술 스택 아이콘 매핑 유틸리티
 * 각 기술 스택에 해당하는 아이콘과 색상을 정의하여 일관성 있는 UI 제공
 *
 * @fileoverview 프로젝트에서 사용되는 기술 스택들의 아이콘과 브랜드 색상 매핑 정보
 */

import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiVuedotjs, SiExpress,
    SiSpringboot, SiSpring, SiPython, SiMysql, SiPostgresql, SiMongodb,
    SiDocker, SiNginx, SiAmazon, SiVercel, SiJira, SiNotion,
    SiKubernetes, SiHelm, SiGitlab, SiArgo, SiRedis,
    SiOpentelemetry, SiGrafana, SiElasticsearch, SiLogstash, SiKibana
} from 'react-icons/si';
import { FaNodeJs, FaJava, FaGithub } from 'react-icons/fa';

/**
 * 기술 스택명과 해당 아이콘, 브랜드 색상을 매핑하는 객체
 *
 * 각 기술 스택에 대해 다음 정보를 포함:
 * - Icon: React Icons 컴포넌트
 * - color: 해당 기술의 공식 브랜드 색상 (HEX 코드)
 *
 * @type {Object.<string, {Icon: React.ComponentType, color: string}>}
 *
 * @example
 * const { Icon, color } = ICON_MAP['React'];
 * return <Icon style={{ color }} />;
 */
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
    Kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
    Helm: { Icon: SiHelm, color: '#0F1689' },
    GitLab: { Icon: SiGitlab, color: '#FC6D26' },
    ArgoCD: { Icon: SiArgo, color: '#EF7B4D' },
    Redis: { Icon: SiRedis, color: '#FF4438' },
    OpenTelemetry: { Icon: SiOpentelemetry, color: '#000' },
    Grafana: { Icon: SiGrafana, color: '#F46800' },
    Elasticsearch: { Icon: SiElasticsearch, color: '#00BFB3' },
    Logstash: { Icon: SiLogstash, color: '#00BFB3' },
    Kibana: { Icon: SiKibana, color: '#E8478B' },
    'Spring WebFlux': { Icon: SiSpring, color: '#6DB33F' },
    'Spring Cloud Gateway': { Icon: SiSpring, color: '#6DB33F' },
    'Spring Batch': { Icon: SiSpring, color: '#6DB33F' },
    JPA: { Icon: FaJava, color: '#f89820' },
};
