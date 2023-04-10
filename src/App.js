import * as React from 'react';
import { useSelector } from 'react-redux'
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
import GasData from './GasData';
import GasImg from './gas_map.png';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

const drawerWidth = 200;

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

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const rows = useSelector((state) => state.database.rows);
  let index = 0;
  let minPrice = rows[0].ppg;
  for (let i in rows) {
    if (parseFloat(rows[i].ppg) < minPrice) {
      minPrice = rows[i].ppg;
      index = i;
    }
  }

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
                <ListItemText primary="Gas Prices" sx={{ opacity: open ? 1 : 0 }} />
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
          <Link to="/report" style={{ textDecoration: "initial", color: "black" }}>
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
      <Box component="main" sx={{ flexGrow: 1, left: "64px", right: "0px", position: "fixed", height: "100%", overflowY: "auto", bgcolor: '#E7EBF0', p: 3 }}>
        <DrawerHeader />
        <Grid container spacing={2}>
          <Grid item xs='auto'>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <img src={GasImg} alt="Local Gas Stations" border="3px solid #000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs='auto'>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div">Cheapest Gas in Area</Typography>
                <Typography variant="h3">${parseFloat(rows[index].ppg).toFixed(2)}</Typography>
                <Typography variant="body" component="div">{rows[index].name}</Typography>
                <Typography variant="body2" component="div">{rows[index].address}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <GasData />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}