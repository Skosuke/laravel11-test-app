import React from 'react';
import { Link } from '@inertiajs/react';
import '../../css/header.css';

type CurrentUser = {
  id: number;
  name: string;
  email: string;
};

type HeaderProps = {
  currentUser: CurrentUser;
};

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Flare</h1>
      </div>
      <div className="header-right">
        <Link href="/profile" className="header-link">
          <span className="header-user">
            {currentUser.name} ({currentUser.email})
          </span>
        </Link>
        <Link
          href="/logout"
          method="post"
          as="button"
          className="header-link logout-link"
          aria-label="Log out from your account"
        >
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
