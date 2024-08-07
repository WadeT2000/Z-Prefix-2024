import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";





export default function EditItem() {
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
            <div className="Backhomebar">
                <button className="homebutt" onClick={() => navigate('/inventory')}>Cancel</button>
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
            <button>Commit changes</button>
        </div>
    )
}