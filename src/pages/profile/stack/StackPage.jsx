import React, { useMemo } from 'react';
import { Box, Chip, Typography, Rating, Tooltip } from '@mui/material';
import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiVuedotjs, SiExpress,
    SiSpring, SiSpringboot, SiPython, SiMysql, SiPostgresql, SiMongodb,
    SiDocker, SiNginx, SiAmazon, SiVercel, SiJira, SiNotion
} from 'react-icons/si';
import { FaNodeJs, FaJava, FaGithub } from 'react-icons/fa';

const ICON_MAP = {
    HTML: { Icon: SiHtml5, color: '#E34F26' }, CSS: { Icon: SiCss3, color: '#1572B6' },
    JavaScript: { Icon: SiJavascript, color: '#F7DF1E' }, React: { Icon: SiReact, color: '#61DAFB' },
    Vue: { Icon: SiVuedotjs, color: '#42B883' }, 'Node.js': { Icon: FaNodeJs, color: '#68A063' },
    Express: { Icon: SiExpress, color: '#000' }, Java: { Icon: FaJava, color: '#f89820' },
    'Spring Boot': { Icon: SiSpringboot, color: '#6DB33F' }, Spring: { Icon: SiSpring, color: '#6DB33F' },
    Python: { Icon: SiPython, color: '#3776AB' }, MySQL: { Icon: SiMysql, color: '#00758F' },
    PostgreSQL: { Icon: SiPostgresql, color: '#336791' }, MongoDB: { Icon: SiMongodb, color: '#47A248' },
    Docker: { Icon: SiDocker, color: '#2496ED' }, Nginx: { Icon: SiNginx, color: '#009639' },
    AWS: { Icon: SiAmazon, color: '#FF9900' }, Vercel: { Icon: SiVercel, color: '#000' },
    GitHub: { Icon: FaGithub, color: '#000' }, Jira: { Icon: SiJira, color: '#0052CC' }, Notion: { Icon: SiNotion, color: '#000' },
};

const StackPage = ({ stack = [] }) => {
    const list = useMemo(() => {
        const arr = (Array.isArray(stack) ? stack : [])
            .filter(s => s && typeof s.name === 'string' && s.name.trim().length > 0)
            .map(s => ({
                stackId: s.stackId ?? s.stack_id ?? s.id,
                name: s.name ?? s.stack_name ?? '',
                usageCount: s.usageCount ?? s.usage_count ?? 0,
            }));
        return arr.sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? ''));
    }, [stack]);

    return (
        <Box>
            <Box
                sx={{
                    display: 'grid',
                    gap: 0.6,
                    // ✅ 컨텐츠가 줄어들 수 있게 minmax(0,1fr) 사용
                    gridTemplateColumns: {
                        xs: 'repeat(2, minmax(0,1fr))',
                        sm: 'repeat(3, minmax(0,1fr))',
                        md: 'repeat(4, minmax(0,1fr))',  // ✅ 데스크탑: 4칸 (별점 너비 고려)
                        xl: 'repeat(5, minmax(0,1fr))',  // 초광폭에서만 5칸
                    },
                }}
            >
                {list.map(s => {
                    const m = ICON_MAP[s.name] || {};
                    const Icon = m.Icon;
                    const color = m.color || '#666';
                    const stars = Math.min(s.usageCount ?? 0, 5);

                    return (
                        <Chip
                            key={s.stackId}
                            icon={
                                Icon ? (
                                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Icon size={18} color={color} />
                                    </Box>
                                ) : null
                            }
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 0.25,
                                        width: '100%',
                                        minWidth: 0,         // ✅ 칩 내부도 줄어들 수 있게
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.95rem',
                                            fontWeight: 600,
                                            lineHeight: 1.15,
                                            textAlign: 'center',
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {s.name}
                                    </Typography>

                                    <Tooltip title={`사용 횟수: ${s.usageCount ?? 0}`} arrow>
                                        <Rating
                                            name={`rating-${s.stackId}`}
                                            value={stars}
                                            max={5}
                                            precision={1}
                                            readOnly
                                            size="small"
                                            sx={{
                                                // ✅ 별 크기/간격 살짝 축소해서 칩 폭에 잘 맞게
                                                '& .MuiRating-icon': { fontSize: 16, mr: 0.25 },
                                                '& .MuiRating-iconEmpty': { mr: 0.25 },
                                            }}
                                        />
                                    </Tooltip>
                                </Box>
                            }
                            variant="outlined"
                            color="default"
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                minWidth: 0,          // ✅ grid item 줄어들 수 있게
                                boxSizing: 'border-box',
                                height: 'auto',
                                py: 1,
                                px: 1.2,
                                borderRadius: 2,
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                transition: 'transform .18s ease, box-shadow .18s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                                },
                                '.MuiChip-icon': { mr: 0.5 },
                                '.MuiChip-label': {
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                    px: 0,
                                    minWidth: 0,        // ✅ 라벨도 줄어듦
                                    overflow: 'hidden',
                                },
                            }}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default StackPage;
