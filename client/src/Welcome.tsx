import { Card, CardContent, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { ImageList } from './ImageList';


export function Welcome(props: any) {
    let showLoginHelp = props.loggedIn ? 'none' : 'flex';

    const goToTunnel = () => {
        window.ddClient.host.openExternal("https://tunnel.khulnasoft.com")
    }

    return (
        <Box flexDirection='column' alignItems="center" sx={{
            minWidth: 275, m: '4rem', flexDirection: "column", display: props.showWelcome, justifyContent: 'center', alignItems: "center"
        }}>
            <Box sx={{ display: 'flex' }}>
                <img src="images/tunnel_logo.svg" alt="Tunnel Logo" height="160px" />
                <Box sx={{ marginLeft: '0.8rem', marginTop: '1.8rem' }}>
                    <Typography variant="h3" fontFamily='Droplet'>
                        khulnasoft
                    </Typography>
                    <Typography variant="h1" fontFamily='Droplet'>
                        tunnel
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h4" component="div" gutterBottom sx={{ marginTop: '2.5rem' }}>
                Free, open-source container image scanning.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: '2rem' }}>
                <img src="images/tada.svg" alt="Tada Logo" height="30px" /> Scan unlimited images, no sign up required! Scans run on your machine!
            </Typography>
            <Typography variant="h5" sx={{ marginTop: '2rem' }}>
                Select from a local stored image or enter the name of a remote image you wish to scan.

            </Typography>
            <Box marginTop='4rem' width='80%' maxWidth='800px'>
                <ImageList
                    disableScan={props.disableScan}
                    setDisableScan={props.setDisableScan}
                    scanImage={props.scanImage}
                    setScanImage={props.setScanImage}
                    runScan={props.runScan}
                    imageUpdated={props.imageUpdated}
                    fixedOnly={props.fixedOnly}
                    setFixedOnly={props.setFixedOnly}
                    SBOMOutput={props.SBOMOutput}
                    setSBOMOutput={props.setSBOMOutput}
                    uploadKhulnasoft={props.uploadKhulnasoft}
                    setUploadKhulnasoft={props.setUploadKhulnasoft}
                    showUploadKhulnasoft={props.showUploadKhulnasoft}
                    textAlign='center'
                />
            </Box>
            <Box width='50%' minWidth='400px' maxWidth='700px' marginTop='2.5rem'>
                <Card sx={{ display: 'flex', p: '2rem', justifyContent: 'center' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6" marginTop='6px' marginRight='20px' >New to Tunnel?
                                <Button sx={{ fontSize: '12pt', marginTop: '-2px' }} onClick={() => { goToTunnel() }}>Learn more...</Button></Typography>

                        </Box>
                        <Box sx={{ display: showLoginHelp, justifyContent: 'center' }}>
                            <Typography variant="h6" marginTop='6px' marginRight='20px' >Khulnasoft Customer?
                                <Button sx={{ fontSize: '12pt', marginTop: '-2px' }} onClick={() => { props.openLogin(true) }}>Sign in</Button></Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box >
    )
}