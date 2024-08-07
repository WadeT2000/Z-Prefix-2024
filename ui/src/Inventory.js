import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";



export default function Inventory() {
    const navigate = useNavigate();
    const [userinventory, setuserinventory] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/inventory', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => setuserinventory(data))
        
    }, [])

    async function deleteItem(itemId) {
        try {
            const response = await fetch(`http://localhost:8080/inventory/${itemId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
    
            if (response.ok) {
                setuserinventory(userinventory.filter(item => item.id !== itemId));
            } else {
                console.error("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    function inventory() {
     if(userinventory.length === 0) {
            return (
                <h4>You have 0 items listed</h4>
            )
        } else {
            return (
        <ul>
            {userinventory.map(item => (
                <>
                <Link to={`/editpage/${item.item_name}`} key={item.item_name}>
                <li key={item.id}>{item.item_name} {truncateDescription(item.description)} {item.quantity}</li>
                </Link>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
                </>
            ))}
        </ul>
            )
        }
    }

    const truncateDescription = (description) => {
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    };

    return (
        <div>
            <button className="homebutt" onClick={() => navigate('/home')}>Home</button>
            <button className="additembutt" onClick={() => navigate('/createitem')}>Add Item</button>
            <button className="logoutbutt" onClick={() => navigate('/')}>Log Out</button><br/>
            <p>Click on an item you would like to edit</p>
            {inventory()}
        </div>
    )
}