import { useState, Fragment, useEffect } from "react";
import Closets from "../../Components/Closets";
import ClosetModel from "../../Components/ClosetModel";
import Clothes from "../../Components/Clothes";
import Button from "../../Components/Button";
import styles from "./styles.module.scss";
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as React from 'react';
import {Tabs, Tab, Box, Menu, MenuItem} from '@mui/material';
import { styled } from '@mui/system';

const CustomMenuItem = styled(MenuItem)({
    fontSize: '1.5rem', // Customize font size here
});

// Sample clothes data
const clothes1 = [/* your clothes data here */];
const clothes2 = [/* your clothes data here */];

// Sample closets data
const closets = [
    {_id: 1, img: "", desc: "Default Closet 1", clothes: clothes1},
    {_id: 2, img: "", desc: "Default Closet 2", clothes: clothes2},
];

const ClosetsPage = () => {
    const [model, setModel] = useState(false);
    const { id } = useParams();
    const closetId = parseInt(id);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [tabValue, setTabValue] = React.useState('all');
    const [menuType, setMenuType] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [colorValue, setColorValue] = useState('');
    const [seasonValue, setSeasonValue] = useState('');

    const [selectedCloset, setSelectedCloset] = useState(null); // Change initial state to null
    const [loading, setLoading] = useState(true); // Add loading state

    // Menu items
    const categoryMenuItems = [/* your menu items here */];
    const colorMenuItems = [/* your menu items here */];
    const seasonMenuItems = [/* your menu items here */];

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue !== 'all') {
            setAnchorEl(event.currentTarget);
            setMenuType(newValue);
        } else {
            setAnchorEl(null);
        }
    };

    const handleCategoryClick = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuType('category');
    };

    const handleColorClick = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuType('color');
    };

    const handleSeasonClick = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuType('season');
    };

    const handleClose = (value) => {
        setAnchorEl(null);
        setMenuType('');
        setCategoryValue(value);
        console.log(value);
    };

    useEffect(() => {
      const storedClosetData = localStorage.getItem('closetData');
      if (storedClosetData) {
        try {
          const parsedClosetData = JSON.parse(storedClosetData);
          const closet = [parsedClosetData.data];
          setSelectedCloset(closet);
          
        } catch (error) {
          console.error('Error parsing Data:', error);
        }
      }
      setLoading(false); // Set loading to false after data is fetched
    }, [closetId]);

    useEffect(() => {
        if (!selectedCloset && !loading) {
            //navigate("/not-found");
        }
    }, [selectedCloset, navigate, loading]);
    console.log();

    return(
        <Fragment>
            {loading ? (
                <p>Loading...</p> // Show loading indicator while loading
            ) : (
                selectedCloset ? (
                    <div className={styles.container}>
                        <div className={styles.top}>
                            <h1>{selectedCloset.desc}</h1>
                            <Link to="/create_clothes">
                                <Button label="Create New Clothes" style={{ width: "20rem", marginRight: "5rem"}} />
                            </Link>
                        </div>
                        <Box sx={{ width: '100%' }} style={{marginLeft: "2rem"}}>
                            <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                aria-label="secondary tabs example"
                            >
                                <Tab value="all" label="All" style={{fontSize: "1.6rem"}}/>
                                <Tab value="category" label="By Category" style={{fontSize: "1.6rem"}} onClick={handleCategoryClick}/>
                                <Tab value="color" label="By Color" style={{fontSize: "1.6rem"}} onClick={handleColorClick}/>
                                <Tab value="season" label="By Season" style={{fontSize: "1.6rem"}} onClick={handleSeasonClick}/>
                            </Tabs>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => handleClose('')}
                            >
                                {menuType === 'category' &&  categoryMenuItems.map(item => (
                                    <CustomMenuItem
                                        key={item.value}
                                        onClick={() => handleClose(item.value)}
                                        className={styles.customMenuItem}
                                    >
                                        {item.label}
                                    </CustomMenuItem>
                                ))}
                                {menuType === 'color' &&  colorMenuItems.map(item => (
                                    <CustomMenuItem
                                        key={item.value}
                                        onClick={() => handleClose(item.value)}
                                        className={styles.customMenuItem}
                                    >
                                        {item.label}
                                    </CustomMenuItem>
                                ))}
                                {menuType === 'season' &&  seasonMenuItems.map(item => (
                                    <CustomMenuItem
                                        key={item.value}
                                        onClick={() => handleClose(item.value)}
                                        className={styles.customMenuItem}
                                    >
                                        {item.label}
                                    </CustomMenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <div className={styles.closets_container}>
                            {selectedCloset[0].clothes.map(cloth => (
                                <Fragment key={cloth._id}>
                                    <Clothes clothes={cloth} />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Closet not found</p> // Show error message if closet not found
                )
            )}
        </Fragment>
    );
};

export default ClosetsPage;
