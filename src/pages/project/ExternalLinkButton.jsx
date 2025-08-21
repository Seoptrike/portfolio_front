import { Button, Stack, Link } from "@mui/material";

const ExternalLinkButton = ({ href, icon, children }) => (
    <Button
        variant="outlined"
        size="small"
        component={Link}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ textTransform: "none" }}
    >
        <Stack direction="row" spacing={1} alignItems="center">
            {icon}
            <span>{children}</span>
        </Stack>
    </Button>

);

export default ExternalLinkButton;