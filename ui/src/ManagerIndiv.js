import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Individual.css'


export default function ManagerIndevidual() {
    const {itemname} = useParams();
    const navigate = useNavigate();
    const [singleitem, setsingleitem] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8080/items?search=${itemname}`)
            .then(res => res.json())
            .then(data => setsingleitem(data))
    }, [itemname])



    return (
        <div>
            <div className="indivBackhomebar">
                <button className="indivhomebutt" onClick={() => navigate('/inventory')}>Back</button>
            </div>
            <h2 className="indivheader">{itemname} info</h2>
            <div className="indivIteminfo">
                {singleitem.map(item => (
                    <div className="indivitem">
                    <p>Seller: {item.user_name}</p>
                    <p>Description: {item.description}</p>
                    <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}