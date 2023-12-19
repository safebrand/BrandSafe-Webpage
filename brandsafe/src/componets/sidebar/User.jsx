import * as React from 'react';
import { createMuiTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useLocation } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Tooltip } from '@mui/material';


const drawerWidth = 270;
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
    width: `calc(${theme.spacing(0)} + 1px)`,
    [theme.breakpoints.up('md')]: {
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


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        fontFamily: "Poppins",
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

export default function User({ open, setOpen }) {
    const theme = useTheme();
    //const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = React.useState(location.pathname);

    React.useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location.pathname])





    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} >
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(!open)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : ""}
                    </IconButton>
                </DrawerHeader>
                <List sx={{ backgroundColor: "#02C3FF", height: "100vh" }}>
                    <Link to="/dashboard">
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    backgroundColor: currentLocation?.includes('/dashboard') && "#B4EDFF",
                                    color: currentLocation?.includes('/dashboard') && "#000",
                                }}
                            >
                                {open ? <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DashboardIcon size={'23px'} />
                                </ListItemIcon> : <Tooltip title={"Dashboard"} placement='right'>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <DashboardIcon size={'23px'} />
                                    </ListItemIcon>
                                </Tooltip>}
                                <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0, fontFamily: "fantasy" }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/Evidence-Expertise" >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    backgroundColor: (currentLocation?.includes('/Evidence-Expertise') || currentLocation?.includes('/track-applications')) && "#f0f0f0"
                                }}
                            >
                                {open ? <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                    <DashboardIcon size={'23px'} />
                                </ListItemIcon> : <Tooltip title={"Profile"} placement='right'>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <DashboardIcon size={'23px'} />
                                    </ListItemIcon>
                                </Tooltip>}
                                <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0, fontFamily: "fantasy" }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, overflow: "hidden", overflowY: "auto", minWidth: "400px" }}>
                <Box>
                    <Outlet />
                </Box>

            </Box>
        </Box>
    );
}
