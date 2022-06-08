import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component{
    state = {
        showSide: true
    }

    closeSidebarHandler = () => {
        this.setState({
            showSide: false
        })
    }

    toggleSidebar = () => {
        this.setState((prevState) => {
            return {
                showSide: !prevState.showSide
            }
        })
    }

    render () {
        return (
            <>
                <Toolbar toggleSidebar={this.toggleSidebar}/>
                <SideDrawer
                    open={this.state.showSide}
                    closed={this.closeSidebarHandler}
                />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </>
        );
    }
}
export default Layout;
