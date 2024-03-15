import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  console.log(name);
  if (name === "null null") {
    // If name is null, return a default avatar
    return {
      sx: {
        bgcolor: "#000000", // Set a background color for the default avatar
      },
      children: "N", // Display a default character or icon for the avatar
    };
  }

  // If name is not null, generate an avatar based on the provided name
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function AfterLoginNavbar({ open, setOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state?.persistedReducer.user);
  const notification = 0;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const location = useLocation();
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMdScreen = theme.breakpoints.up("md");

  console.log(location);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <div className="flex gap-3 items-center justify-center">
          <div>
            <Avatar
              id="profile"
              className="uppercase"
              sx={{ width: 70, height: 70 }}
              {...stringAvatar(user?.firstName + " " + user.lastName)}
            />
          </div>
          <div>
            <p className="text-[18px]">
              {user?.firstName}
              {` ${user.lastName}`}
            </p>
          </div>
        </div>
      </MenuItem>
      <hr className="pt-2" />
      <MenuItem
        onClick={() => {
          sessionStorage.clear();
          localStorage.clear();
          navigate("/login");
        }}
      >
        <LogoutIcon color="error" />
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {sessionStorage.getItem("type") === "Trial" && (
        <MenuItem className="flex flex-col items-center">
          <div className="">Current Plan:{sessionStorage.getItem("type")}</div>
          <div>
            expires{" "}
            {moment(sessionStorage.getItem("subscriptionExpiryOn")).fromNow()}
          </div>
        </MenuItem>
      )}
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <ContactSupportIcon />
        </IconButton>
        <Link to="/support">
          <p>Support</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <Badge badgeContent={notification} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            id="profile"
            className="uppercase"
            sx={{ width: 90, height: 90 }}
            {...stringAvatar(user?.firstName + " " + user.lastName)}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          sessionStorage.clear();
          localStorage.clear();
          navigate("/login");
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LogoutIcon color="error" />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "transparent",
          backdropFilter: isMdScreen ? "" : "blur(10px)",
          color: "#26496E",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>

          {!open ? (
            <Link to="/">
              <div className="flex justify-normal items-center gap-3">
                <img src="/Union.png" alt="logo" className="w-[20%]" />
                <p className="text-[24px] space-x-1">Brand Safe</p>
              </div>
            </Link>
          ) : (
            <Link to="/">
              <div className="flex justify-normal items-center gap-3">
                <img src="/logo.png" alt="logo" className="w-[90%]" />
              </div>
            </Link>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/support" className="hover:underline mt-[19px]">
              Support
            </Link>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <Badge badgeContent={notification} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                id="profile"
                className="uppercase"
                sx={{ width: 90, height: 90 }}
                {...stringAvatar(user?.firstName + " " + user?.lastName)}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
