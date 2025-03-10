
import { Box } from '@mui/system';
import Chip from '@mui/material/Chip';
import { GitHub, MenuBook, Forum } from '@mui/icons-material';

export function Links() {

    const handleGithub = () => handleClick("https://github.com/khulnasoft/tunnel")
    const handleDocumentation = () => handleClick("https://khulnasoft.github.io/tunnel")
    const handleSlack = () => handleClick("https://khulnasoft.slack.com")


    const handleClick = (url: string) => {
        { window.ddClient.host.openExternal(url) };
    }

    return (
        <Box sx={{ display: 'flex', marginTop: '1rem', marginBottom: '2rem' }}>
            <Chip icon={<GitHub />} onClick={handleGithub} label="View in GitHub" variant="outlined" sx={{ marginRight: '0.3rem' }} />
            <Chip icon={<MenuBook />} onClick={handleDocumentation} label="View Documentation" variant="outlined" sx={{ marginRight: '0.3rem' }} />
            <Chip icon={<Forum />} onClick={handleSlack} label="Join the Community" variant="outlined" />
        </Box>
    )
}