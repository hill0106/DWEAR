import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Liked from '../Liked';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from "./styles.module.scss";


export default function ClothesCard({clothes}) {

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
    <Card className={styles.clothes}>
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
            <CardMedia
                component="img"
                image={clothes.img === "" ?  "https://images.unsplash.com/photo-1614631446501-abcf76949eca?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : clothes.img}
                alt="closet"
            />
            <CardContent>
              <h3>{clothes.name}</h3>
              <Stack direction="row" spacing={1} style={{marginBottom: "1rem"}}>
                <Chip label={clothes.category} style={{fontSize: "1.7rem", fontWeight: "700"}}/>
                <Chip label={clothes.color} style={{fontSize: "1.7rem", fontWeight: "700"}}/>
                <Chip label={clothes.brand} style={{fontSize: "1.7rem", fontWeight: "700"}}/>
                <Chip label={clothes.season} style={{fontSize: "1.7rem", fontWeight: "700"}}/>
              </Stack>
              <Liked clothId={clothes._id}/>
            </CardContent>

    </Card>
  );
}
