import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SendMetric } from './Metrics';

export function ConfigureCreds(props: any) {

    let loginDisplay = !props.loggedIn ? "flex" : "none";
    let logoutDisplay = props.loggedIn ? "block" : "none";

    const handleSignInClick = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSaveDetails = () => {
        let payload = { khulnasoft_key: props.khulnasoftKey, khulnasoft_secret: props.khulnasoftSecret, khulnasoft_cspm_url: props.khulnasoftCSPMUrl };
        console.log(payload);
        window.ddClient.extension.vm.service.request({ url: "/credentials", method: "POST", headers: { 'Content-Type': 'application/json' }, data: payload })
            .then(() => {
                window.ddClient.desktopUI.toast.success(
                    `Successfully logged in`
                );
                SendMetric("tunnel_khulnasoft_login_successful", { khulnasoftKey: props.khulnasoftKey });
                props.setLoggedIn(true);
                props.setOpen(false);
            })
            .catch((error: any) => {
                window.ddClient.desktopUI.toast.error(
                    `Failed to validate login credentials`
                );
                SendMetric("tunnel_khulnasoft_login_failed", { khulnasoftKey: props.khulnasoftKey });
                props.setKhulnasoftKey("");
                props.setKhulnasoftSecret("");
                props.setKhulnasoftCSPMUrl("");
                console.log(error);
            });
    };

    const handleSignOutClick = () => {
        props.setKhulnasoftKey("");
        props.setKhulnasoftSecret("");
        props.setKhulnasoftCSPMUrl("");
        props.setLoggedIn(false);

        let payload = { khulnasoft_key: "", khulnasoft_secret: "" };
        console.log(payload);
        window.ddClient.extension.vm.service.delete("/credentials")
            .then(() => {
                window.ddClient.desktopUI.toast.success(
                    `Successfully logged out`
                );
                props.setOpen(false);
            })
            .catch((error: any) => {
                window.ddClient.desktopUI.toast.error(
                    `Failed to logout`
                );
                console.log(error);
            });
    };

    const handleAVDLinkClick = (e: any) => {
        { window.ddClient.host.openExternal("https://cloud.khulnasoft.com/cspm/#/apikeys") };
    }

    return (
        <Box sx={{ float: 'right', marginTop: '0.5rem' }}>
            <Button onClick={handleSignInClick} sx={{ display: loginDisplay, fontSize: '12pt', marginTop: '-2px' }}>
                Sign in to Khulnasoft
            </Button>
            <Button onClick={handleSignOutClick} sx={{ display: logoutDisplay, fontSize: '12pt', marginTop: '-2px' }}>
                Sign out
            </Button>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your Khulnasoft Security API credentials, these are available in your Khulnasoft CSPM Account
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="khulnasoftKey"
                        label="Khulnasoft Key"
                        type="password"
                        value={props.khulnasoftKey}
                        onChange={(e) => props.setKhulnasoftKey(e.target.value)}
                        fullWidth
                        variant="standard"
                        helperText="KHULNASOFT_KEY provided in your CSPM account"
                    />
                    <TextField
                        margin="dense"
                        id="khulnasoftSecret"
                        label="Khulnasoft Secret"
                        type="password"
                        value={props.khulnasoftSecret}
                        onChange={(e) => props.setKhulnasoftSecret(e.target.value)}
                        fullWidth
                        variant="standard"
                        helperText="KHULNASOFT_SECRET provided in your CSPM account"
                    />
                  <TextField
                    margin="dense"
                    id="khulnasoftCSPMUrl"
                    label="Khulnasoft CSPM Url"
                    type="text"
                    value={props.khulnasoftCSPMUrl}
                    onChange={(e) => props.setKhulnasoftCSPMUrl(e.target.value)}
                    fullWidth
                    variant="standard"
                    helperText="KHULNASOFT_CSPM_URL provided in your CSPM account"
                  />

                </DialogContent>
                <DialogActions>
                    <Button sx={{ float: 'left' }} onClick={handleAVDLinkClick}>Get API Keys</Button>
                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                    <Button variant="contained" onClick={handleSaveDetails}>Login</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}
