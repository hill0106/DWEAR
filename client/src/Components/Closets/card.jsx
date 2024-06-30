import * as React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from "./styles.module.scss";


export default function ClosetCard({closet}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleEdit = () => {

    };
    const handleDelete = () => {

    };


  return (
    <Card className={styles.closet} id={closet._id}>
      <CardHeader
        action={
            <div>
                <IconButton         
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                    <MoreVertIcon style={{color: "var(--primary)", fontSize: "2rem"}}/>
                </IconButton>
                <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                      width: '20ch',
                    },
                  }}
                >
                    <MenuItem key="edit" onClick={handleEdit} style={{fontSize: "1.6rem"}}>Edit</MenuItem>
                    <MenuItem key="delete" onClick={handleDelete} style={{fontSize: "1.6rem"}}>Delete</MenuItem>
                </Menu>
            </div>
        }
      />
       <Link to={`/closet/${closet._id}`} key={closet._id}>
            <CardMedia
                component="img"
                image={closet.img === "" ?  "https://images.unsplash.com/photo-1614631446501-abcf76949eca?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : closet.img}
                alt="closet"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {closet.desc}
                </Typography>
            </CardContent>
        </Link>
    </Card>
  );
}
