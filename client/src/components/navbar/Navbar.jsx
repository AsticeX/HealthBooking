import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import Carousel from 'react-material-ui-carousel';
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import SettingsIcon from "@mui/icons-material/Settings";
const drawerWidth = 240;
const navItems = [
  { name: "Home", href: "/" },
  { name: "Search", href: "/hospital" },
  { name: "Contact", href: "/contact" },
];

const Navbar = (props) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/logout");
      dispatch({ type: "LOGOUT_SUCCESS", payload: res.data.details });
      handleCloseAvatar();
      navigate("/", { state: { fromLogin: true } });
    } catch (err) {
      dispatch({ type: "LOGOUT_FAILURE", payload: err.response.data });
    }
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Grid container justifyContent="center" alignItems="center">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ maxWidth: "128px", maxHeight: "128px" }} />
        </Grid>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#32b372" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Grid container>
              <a href="/">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ maxWidth: "64px", maxHeight: "64px" }} />
              </a>
            </Grid>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: "#fff" }} href={item.href}>
                {item.name}
              </Button>
            ))}
          </Box>
          {user ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <React.Fragment>
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                  {user ? (
                    user.username + " " + user.lastname
                  ) : (
                    <div className="navItems" style={{ marginLeft: "auto" }}>
                      <Button variant="contained" href="/login" sx={{ background: "#32b372", fontSize: 16 }}>
                        LOGIN
                      </Button>
                    </div>
                  )}
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                      <Avatar sx={{ width: 32, height: 32 }}>{user.username}</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleCloseAvatar}
                  onClick={handleCloseAvatar}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseAvatar}>
                    <ListItemIcon>
                      <PersonOutlineIcon fontSize="medium" />
                    </ListItemIcon>{" "}
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleCloseAvatar}>
                    <ListItemIcon>
                      <VaccinesIcon fontSize="medium" />
                    </ListItemIcon>{" "}
                    My Vaccine
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleCloseAvatar}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="medium" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="medium" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </div>
          ) : (
            <Button href="/login" style={{ color: "#fff", backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center" }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
