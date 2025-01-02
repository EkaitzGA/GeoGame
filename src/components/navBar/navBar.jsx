import "./navBar.css";
import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <>
            <nav className="navBar">
                <ul className="navBarList">
                    <li className="navBarAssets">
                        <Link to="/"
                            className={location.pathname === '/' ? 'active' : ''}
                        >Home</Link>
                    </li>
                    <li className="navBarAssets">
                        <Link to="/flags"
                            className={location.pathname === '/flags' ? 'active' : ''}
                        >Flags</Link>
                    </li>
                    <li className="navBarAssets">
                        <Link to="/capitals"
                            className={location.pathname === '/capitals' ? 'active' : ''}
                        >Capitals</Link>
                    </li>
                    <li className="navBarAssets">
                        <Link to="/scoreboard"
                            className={location.pathname === '/scoreboard' ? 'active' : ''}
                        >Scoreboard</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
