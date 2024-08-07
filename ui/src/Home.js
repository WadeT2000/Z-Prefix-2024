import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './App';






export default function Home() {
    const navigate = useNavigate();
    const [allshopitems, setallshopitems] = useState([]);
    const [username, setusername] = useState()

    useEffect(() => {
        fetch('http://localhost:8080/items')
        .then(res => res.json())
        .then(data => setallshopitems(data))
}, [])

const truncateDescription = (description) => {
    return description.length > 100 ? description.substring(0, 100) + "..." : description;
};

// const loggbutton = () => {
//     if (!auth) {

//     }
// }

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
                {allshopitems.map(item => (
                    <Link to={`/individual/${item.item_name}`} key={item.item_name}>
                    <p key={item.id}>{item.item_name} {truncateDescription(item.description)} {item.quantity}</p>
                    </Link>
                ))}
        </div>

    </div>
    )
}