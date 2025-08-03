"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import SearchBox from "@/components/search/search"
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import Tokens from '../Tokens/Tokens';


// let pages = ['shop', 'Hotel', 'AboutUs', 'Arreda', 'search', 'Preferiti'];
// const pagesV2 = ['shop', 'Hotel', 'AboutUs', 'Preferiti', 'cart'];
let pages = ['shop', 'AboutUs', 'search', 'Preferiti'];
const pagesV2 = ['shop', 'AboutUs', 'Preferiti', 'chat']; // cart

const settings = ['Account', 'Setting', 'UploadImg', 'CreateLesson'];

function ResponsiveAppBar() {
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [logName, setlogName] = React.useState<string>("NN");

  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElNav(event.currentTarget); };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); };

  const handleCloseNavMenu = () => { setAnchorElNav(null); };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };


  const [idUserTemp, setIdUserTemp] = React.useState<Number>(-1);

  



  /** Menu avatar */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };




  React.useEffect(() => {
    const fetchData = async () => {
        try {
          let value = await getCookie('idUser');
          let nm_V = await getCookie("Name");


          console.log("value: " + value);
          console.log(value);

          if (value != undefined && nm_V != undefined) {
            setIdUserTemp(Number(value))
            setlogName(nm_V.charAt(0))

            pages = pagesV2;
          }
          
        } catch (error) { console.error('Error sending message:', error); }
    }

    fetchData()
  }, [])


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link
                      href={"/" + page}
                      style={{
                        textDecoration: "none",
                        color: "white"
                      }}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
           </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link 
                  href={"/" + page}
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <SearchBox />
          <Tokens />

          <Box sx={{ flexGrow: 0 }}>
            {idUserTemp == -1 ?
              <Button color="inherit">
                <Link 
                    href="/SignIn"
                    style={{
                      textDecoration: "none",
                      color: "white"
                    }}
                >
                  Login
                </Link>
              </Button>
            : 
            <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                <Avatar
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  className="cursorp Tab8 animate__animated animate__backInLeft"
                >
                  {logName}
                </Avatar>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {settings.map((page) => (
                    <MenuItem key={page} onClick={handleClose}>
                      <Link 
                        href={"/" + page}
                        key={page}
                        style={{
                          textDecoration: "none",
                          color: "black"
                        }}
                      >
                        {page}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
