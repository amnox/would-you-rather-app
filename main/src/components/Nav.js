import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav () {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/new_poll' exact activeClassName='active'>
                        Add Poll
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' exact activeClassName='active'>
                        Add Poll
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/logout' exact activeClassName='active'>
                        Logout
                    </NavLink>
                </li>

            </ul>
        </nav>
    )
}