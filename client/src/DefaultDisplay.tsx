import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { ImageList } from './ImageList';
import { Links } from './Links';


export function DefaultDisplay(props: any) {

    return (
        <Box sx={{ display: props.showDefaultDisplay, marginTop: '2rem' }}>
            <Box sx={{ m: '2rem', marginBottom: '1rem' }}>
                <Links />
                <Box sx={{ display: 'flex' }}>
                    <img src="images/tunnel_logo.svg" alt="Tunnel Logo" height="80px" />
                    <Box sx={{ marginLeft: '0.5rem', marginTop: '0.7rem' }}>
                        <Typography variant="h4" fontFamily='Droplet'>
                            khulnasoft
                        </Typography>
                        <Typography variant="h2" fontFamily='Droplet'>
                            tunnel
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ marginLeft: '2rem' }}>
                <ImageList width='50%'
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
                />
            </Box>
        </Box>)
}