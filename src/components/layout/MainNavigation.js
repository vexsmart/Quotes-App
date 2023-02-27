import { NavLink } from "react-router-dom"
import classes from './MainNavigation.module.css'


const MainNavigtion = props => {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>Imagine Quotes</h1>
            <nav className={classes.nav}>
                <ul>
                    <li><NavLink to='/quotes' activeClassName={classes.active}>All Quotes</NavLink></li>
                    <li><NavLink to='/new-quote' activeClassName={classes.active}>Create a Quote</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigtion