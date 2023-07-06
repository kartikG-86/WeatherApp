import React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import IconButton from "@mui/material/IconButton";
import { Button, Container } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar = (prop) => {
  return (
    <>
      <Container>
        <AppBar
          position="fixed"
          style={{ background: prop.darkMode == false ? "#EEEEEE" : "" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="Black"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ThermostatRoundedIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: prop.darkMode == false ? "black" : "white",
                flexGrow: 1,
              }}
            >
              Weather App
            </Typography>

            <Button>
              {prop.darkMode ? (
                <LightModeIcon
                  style={{ color: "White" }}
                  onClick={prop.handleDark}
                />
              ) : (
                <DarkModeIcon
                  style={{ color: "black" }}
                  onClick={prop.handleDark}
                />
              )}
            </Button>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};

export default Navbar;
