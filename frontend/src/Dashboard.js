import React, {useEffect, useMemo, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from "./main/Content";
import SidebarDrawer from "./sidebar/Drawer";
import {WidthContext} from "./WidthContext";


const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      backgroundColor: "#F4F4F4",
  },
}));


export default function Dashboard() {
    const [open, setOpen] = useState(1);
    const providerValue = useMemo(() => ({open, setOpen}), [open, setOpen]);

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < 600) {
                setOpen(0)
            }
            else if(window.innerWidth < 720 && window.innerWidth > 600) {
                setOpen(1);
            }
            else {
                setOpen(2);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);

    }, []); // Empty array ensures that effect is only run on mount

      const classes = useStyles();


  return (
    <div className={classes.root}>
      <CssBaseline />
        <WidthContext.Provider value={providerValue}>
            <SidebarDrawer/>
            <Content/>
        </WidthContext.Provider>

    </div>
  );
}
