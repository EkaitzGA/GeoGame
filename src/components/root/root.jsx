import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { fetchAllCountries } from '../../utils/apiCall';
import HomePage from '../homePage/homePage';
import NavBar from '../navBar/navBar';

const Root = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

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

    if (loading) return <div>Loading...</div>;
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
        </>
    );
};

export default Root;