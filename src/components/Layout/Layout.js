import React from 'react';
import classes from './Layout.css';

const Layout = (props) => {
    return (
        <>
            <div>Header, Sidebar</div>
            <main className={classes.Content}>
                { props.children }
            </main>
        </>
    );
};
export default Layout;
