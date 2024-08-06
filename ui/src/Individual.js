import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



export default function Indevidual() {
    const {itemname} = useParams();
    const navigate = useNavigate();
    const [singleitem, setsingleitem] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8080/items?search=${itemname}`)
            .then(res => res.json())
            .then(data => setsingleitem(data))
    }, [])



    return (
        <div>
            <div className="Backhomebar">
                <button className="homebutt" onClick={() => navigate('/home')}>Home Page</button>
            </div>
            <h2>{itemname} info</h2>
            <div className="Iteminfo">
                {singleitem.map(item => (
                    <div>
                    <p>{item.item_name}</p>
                    <p>{item.description}</p>
                    <p>{item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}