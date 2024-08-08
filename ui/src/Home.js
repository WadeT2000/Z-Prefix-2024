import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './App';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const [allshopitems, setallshopitems] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8080/items')
        .then(res => res.json())
        .then(data => setallshopitems(data))
    }, []);

    const truncateDescription = (description) => {
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    };

    const handleInventoryClick = () => {
        if (auth) {
            navigate('/inventory');
        } else {
            alert('Please log in to view your inventory.');
        }
    };

    return ( 
        <div>
            <div className="homeNavBar">
                <button className="homeInventory" onClick={handleInventoryClick}>My Inventory</button>
                {auth ? (
                    <button className="homeLogoutbutt" onClick={() => navigate('/logout')}>Log Out</button>
                ) : (
                    <button className="homeLoginbutt" onClick={() => navigate('/')}>Log In</button>
                )}
            </div>
            <div>
                <h2 className="homeheader">HOME PAGE</h2>
            </div>
            <div className="homeitembar">
                <div className="">
                    <p>Name:</p>
                </div>
                <div>
                    <p>Description:</p>
                </div>
                <div>
                    <p>Quantity</p>
                </div>
            </div>
            <div className="homeitemnames">            
                {allshopitems.map(item => (
                    <Link to={`/individual/${item.item_name}`} key={item.item_name} className="homeitemlink">
                        <div className="homeitementry">
                            <p className="homeitemname">{item.item_name}</p>
                            <p className="homeitemdescription">{truncateDescription(item.description)}</p>
                            <p className="homeitemquantity">{item.quantity}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}