import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav () {
    return (
        <nav className='nav'>
            
            <div>
                <NavLink to='/' exact activeClassName='active'>
                    Home
                </NavLink>
            </div>
            <div>
                <NavLink to='/new_poll' exact activeClassName='active'>
                    Add Poll
                </NavLink>
            </div>
            <div>
                <NavLink to='/leaderboard' exact activeClassName='active'>
                    leaderboard
                </NavLink>
            </div>
            <div>
                <NavLink to='/logout' exact activeClassName='active'>
                    Logout
                </NavLink>
            </div>

            
        </nav>
    )
}