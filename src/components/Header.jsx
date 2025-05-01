import { Link } from 'react-router-dom';

function Header() {
    return (
      <header className="navbar">
        <h1 className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Travel Turkey
          </Link>
        </h1>
        <nav>
          <ul className="nav-links">
            <li>Cities</li>
            <li><button className="saved-btn">To-Visit Bucket List</button></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;