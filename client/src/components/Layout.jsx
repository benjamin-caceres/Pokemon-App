import React from 'react';
import Header from './Header';
import Search from './Search';

const Layout = ({ children }) => (
    <div className="App">
        <Header />
        <Search />
        {children}
    </div>
);

export default Layout;