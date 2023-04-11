import * as React from 'react';
import { useDispatch } from 'react-redux'
import { addDatapoint } from './Database'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MailIcon from '@mui/icons-material/Mail';
import ReportIcon from '@mui/icons-material/Report';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const drawerWidth = 200;

const ERROR_NOTIF = "ERROR_NOTIF";
const SUCCESS_NOTIF = "SUCCESS_NOTIF";

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function GasForm() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false); // state for the menu drawer
    const [showAlert, setShowAlert] = React.useState(""); // state for the success notification
    const [ppgError, setPpgError] = React.useState({ error: false, helperText: "" }); // state for the ppg input processing

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (ppgError.error) {
            setShowAlert(ERROR_NOTIF);
            return;
        }
        const months = { 0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec" };
        const data = new FormData(event.currentTarget);
        let dataObj = {}
        for (const pair of data.entries()) {
            dataObj[pair[0]] = pair[1];
        }
        const date = new Date();
        let currentDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
        dataObj['date'] = currentDate;
        console.log(dataObj);
        dispatch(addDatapoint(dataObj));
        setShowAlert(SUCCESS_NOTIF);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Gas Prices
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link to="/" style={{ textDecoration: "initial", color: "black" }}>
                        <ListItem key="Gas Prices" disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LocalGasStationIcon />
                                </ListItemIcon>
                                <ListItemText primary="Gas Prices" variant="button" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/gas-form" style={{ textDecoration: "initial", color: "black" }}>
                        <ListItem key='Submit a Price' disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <BorderColorIcon />
                                </ListItemIcon>
                                <ListItemText primary='Submit a Price' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: "initial", color: "black" }}>
                        <ListItem key='Contact Us' disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary='Contact Us' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/report" style={{ textDecoration: "initial", color: "black" }} >
                        <ListItem key='Report' disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ReportIcon />
                                </ListItemIcon>
                                <ListItemText primary='Report' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <Box component="main" sx={{
                flexGrow: 1, left: "64px", right: "0px", position: "fixed", height: "100%", overflowY: "auto", bgcolor: '#E7EBF0', p: 3
            }}>
                <DrawerHeader />
                <Card sx={{ margin: "auto", width: "fit-content" }}>
                    <CardContent>
                        <Box
                            sx={{

                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <BorderColorOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Submit a Price</Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={ppgError.error}
                                            helperText={ppgError.helperText}
                                            autoComplete="price"
                                            name="ppg"
                                            required
                                            fullWidth
                                            id="ppg"
                                            label="Price Per Gallon"
                                            autoFocus
                                            onChange={(event) => {
                                                if (isNaN(event.target.value))
                                                    setPpgError({ error: true, helperText: "Entry must be a number." });
                                                else
                                                    setPpgError({ error: false, helperText: "" });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="name"
                                            label="Gas Station Name"
                                            name="name"
                                            autoComplete="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="address"
                                            label="Street Address"
                                            name="address"
                                            autoComplete="address"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >Submit Price</Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {showAlert === "SUCCESS_NOTIF" ? <Alert sx={{ position: "absolute", bottom: "25px", right: "25px" }} severity="success" variant="filled" onClose={() => { setShowAlert("") }}>
                    <AlertTitle>Success</AlertTitle>
                    Price submitted to the database
                </Alert> : null}
                {showAlert === "ERROR_NOTIF" ? <Alert sx={{ position: "absolute", bottom: "25px", right: "25px" }} severity="error" variant="filled" onClose={() => { setShowAlert("") }}>
                    <AlertTitle>Error</AlertTitle>
                    Fix the form before submitting
                </Alert> : null}
            </Box>
        </Box >
    );
}