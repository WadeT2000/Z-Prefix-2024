import { useNavigate } from "react-router-dom";
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


    return (
        <div>
            <button className="homebutt" onClick={() => navigate('/home')}>Home</button>
            <button className="logoutbutt" onClick={() => navigate('/')}>Log Out</button>
            <ul>
                {userinventory.map(item => (
                    <li>{item.item_name} {item.description} {item.quantity}</li>
                ))}
            </ul>
        </div>
    )
}