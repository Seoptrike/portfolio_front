import { Stack, Typography, Chip } from "@mui/material";

const ProjectStackList = ({ stacks }) => {
    if (!stacks || stacks.length === 0) return null;

    return (
        <Stack spacing={0.5} sx={{my:1}}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                기술 스택
            </Typography>

            <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"        // ✅ 핵심: 줄바꿈 허용
                rowGap={1}             // ✅ 줄 간 간격
            >
                {stacks.map((s) => {
                    const id = s?.stackId ?? s?.id ?? s;
                    const name = s?.name ?? String(s);
                    return (
                        <Chip
                            key={id}
                            label={name}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 1.5 }}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default ProjectStackList;
