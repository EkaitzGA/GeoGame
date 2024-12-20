import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchAllCountries } from '../../utils/apiCall';
import HomePage from '../homePage/homePage';
import NavBar from '../navBar/navBar';
/* import Footer from '../footer/footer'; */

const Root = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                await fetchAllCountries();
                setLoading(false);
            } catch (err) {
                setError('Error cargando los países');
                setLoading(false);
            }
        };

        loadCountries();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <header>
                {<NavBar />}
            </header>
            <main>
                {location.pathname === "/" && <HomePage />}
                <Outlet />
            </main>
            <footer>
            {/* <Footer /> */}
            </footer>
        </>
    );
};

export default Root;