"use client"

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function SearchBox() {


  const [searchValue, setSearchValue] = React.useState<string>("");


 
  return(
    <>
      <Search>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSearchValue(event.target.value); }}
        />
        <Button
          href={"/search/" + searchValue}
          style={{
            textDecoration: "none",
            color: "white",
            height: "30px",
            background: "ghostwhite",
            margin: "2px 10px 2px 0"
          }}
        >
          <SearchIconWrapper>
            <SearchIcon style={{color: "black"}}/>
          </SearchIconWrapper>
        </Button>
        
      </Search>
    </>
  )

}


export default SearchBox;
