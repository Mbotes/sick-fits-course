import Nav from './Nav';

const Header = () => (
    <div>
        <div className="bar">
            <a href="">Sick Fits!</a>
            <Nav/>
        </div>
        <div className="sub-par">
            <p>Search</p>
        </div>
        <div>
            <p>Cart</p>
        </div>
    </div>
);

export default Header;