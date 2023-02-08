import React, { useState } from "react";
import { FaBars, FaUser, FaArchive } from "react-icons/fa";
import { BsHouseDoorFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import "./Sidebar.css";
import logo from "../logo.png";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <BsHouseDoorFill />,
    },
    {
      path: "/business",
      name: "Business",
      icon: <FaArchive />,
    },
    {
      path: "/customers",
      name: "Customers",
      icon: <FaUser />,
    },
    {
      path: "/login",
      name: "Login",
      icon: <FaUser />,
    },
  ];
  return (
    <div className="container">
      <React.Fragment>
        <Box  sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
          <div className="top-section">
            <img
              className="logo"
              style={{ display: isOpen ? "block" : "none" }}
              src={logo}
            />

            <div className="bars" style={{ marginLeft: isOpen ? "2%" : "0px" }}>
              <FaBars onClick={toggle} />
            </div>
          </div>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
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
              "&:before": {
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
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
          <Divider />
        </Menu>
      </React.Fragment>
      <div className="main-content">
        <div className="sidebar" style={{ width: isOpen ? "23%" : "60px" }}>
          {menuItem.map((item, index) => {
            return (
              <>
                <NavLink
                  to={item.path}
                  as="Link"
                  key={index}
                  className="link"
                  activeclassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <div
                    className="link_text"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    {item.name}
                  </div>
                </NavLink>
              </>
            );
          })}
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
