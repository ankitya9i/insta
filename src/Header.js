import React, {useState}from 'react'
import { Link } from 'react-router-dom';
import I1 from "./img2.png"
import { auth } from './firebase';
import {signOut } from "firebase/auth";
import InstagramIcon from '@material-ui/icons/Instagram';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avator from "@material-ui/core/Avatar";
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import Uploadpost from './Uploadpost';
import "./header.css"
import {onAuthStateChanged } from "firebase/auth";
import { borderRadius } from '@mui/system';
import { useUserContext } from './UserContext';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid lightgrey',
  borderRadius:'8px',
  boxShadow: 24,
  p: 4,
};
function Header() {
  const handleLogout = () => {
    auth.signOut()
        .then(() => {
            // User signed out
            alert('User signed out');
            
        })
        .catch(error => {
            alert('error: ' + error);
        });
};

  const [openn, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user=useUserContext();
  const open = Boolean(anchorEl);
 const parentfunction=(val)=>{
        setOpen(val);
 }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosee = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App-header">
       
        <div className='header2'>

        <div className='nav'>
        <InstagramIcon fontSize='large'/>
        <img className='img' src={I1}/>
        </div>
          <div className='nav'><HomeIcon className='nav1' fontSize="large"/>
          <p>Home</p>
          </div>
          <div className='nav'><SearchIcon className='nav1' fontSize="large" SearchIcon/>
          <p>Explore</p>
          </div>
          <div className='nav'><ExploreIcon className='nav1' fontSize="large" ExploreIcon/>
          <p>Reels</p>
          </div>
          <div className='nav'><FavoriteBorderSharpIcon className='nav1' fontSize="large"/>
          <p>Messages</p>
          </div>
          
          <div className='nav'onClick={handleOpen} >
            <AddCircleOutlineIcon className='nav1' fontSize="large"/>
        <p>Create</p>
          </div>
          
          <Modal
       open={openn}
       onClose={handleClose}
       aria-labelledby="parent-modal-title"
       aria-describedby="parent-modal-description"
     >
       <Box sx={{ ...style, width: 400 }}>
      <Uploadpost handleClosefromchild={parentfunction} />
       </Box>
     </Modal>
          <div className='nav'><Avator className='nav1' fontSize="large"/>
          <p>Profile</p>
          </div>
          
        </div>
      
        <div className='header3'>
        
      <Button
      
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleLogout}
      ><MenuSharpIcon className='nav1' fontSize="large"/>
        LogOut
      </Button>
     
    </div>
          
    </div>
  )
}

export default Header
