import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Individual.css'


export default function Indevidual() {
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
                <button className="indivhomebutt" onClick={() => navigate('/home')}>Home Page</button>
            </div>
            <h2 className="indivheader">{itemname} info</h2>
            <div className="indivIteminfo">
                {singleitem.map(item => (
                    <div className="indivitem">
                    <p>{item.item_name}</p>
                    <p>{item.description}</p>
                    <p>{item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}