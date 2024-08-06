import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";






export default function Home() {
    const navigate = useNavigate();
    const [allshopitems, setallshopitems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/items')
        .then(res => res.json())
        .then(data => setallshopitems(data))
}, [])

    return ( 
    <div>
        <div className="NavBar">
            <button className="Inventory" onClick={() => navigate(`/inventory`)}>My Inventory</button>
            <button className="Logoutbutt" onClick={() => navigate('/')}>Log Out</button>
        </div>
        <div>
        <h2>HOME Page</h2>
        </div>
        <div className="itembar">
            <div>
            <p>Name:</p>
            </div>
            <div>
            <p>Description:</p>
            </div>
            <div>
            <p>Quantity</p>
            </div>
        </div>
        <div className="item-names">            
            <ul>
                {allshopitems.map(item => (
                    <Link to={`/individual/${item.item_name}`} key={item.item_name}>
                    <li key={item.id}>{item.item_name}{item.description}{item.quantity}</li>
                    </Link>
                ))}
            </ul>
        </div>

    </div>
    )
}