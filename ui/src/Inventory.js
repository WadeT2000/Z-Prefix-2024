import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './Inventory.css';

export default function Inventory() {
    const navigate = useNavigate();
    const [userinventory, setuserinventory] = useState([]);
    const [invname, setinvenName] = useState('');
    const [isEditPage, setIsEditPage] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/inventory', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.length === 0) {
            } else {
            setuserinventory(data)
            setinvenName(data[0].user_name)
            }
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/userinfo', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setinvenName(data[0].username)
            }
        )
    }, []);

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
    }

    const handleToggleChange = (event) => {
        setIsEditPage(event.target.value === "editpage");
    };

    function inventory() {
        if (userinventory.length === 0) {
            return (
                <h4>You have 0 items listed</h4>
            );
        } else {
            return (
                <div className="invitemnames">            
                {userinventory.map(item => (
                    <div key={item.item_name} className="invitementry">
                        <Link to={isEditPage ? `/editpage/${item.item_name}` : `/managerindiv/${item.item_name}`} className="invitemlink">
                            <p className="invitemname">{item.item_name}</p>
                            <p className="invitemdescription">{truncateDescription(item.description)}</p>
                            <p className="invitemquantity">{item.quantity}</p>
                        </Link>
                        <button className="invdeletebutton" onClick={() => deleteItem(item.id)}>Delete</button>
                    </div>
                ))}
            </div>
            );
        }
    }

    const truncateDescription = (description) => {
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    };

    return (
        <div className="inventorycontainer">
            <div className="inventorynavbar">
                <button className="invhomebutt" onClick={() => navigate('/home')}>Home</button>
                <button className="invadditembutt" onClick={() => navigate('/createitem')}>Add Item</button>
                <button className="invlogoutbutt" onClick={() => navigate('/logout')}>Log Out</button>
            </div>
            <h3>{invname}'s Inventory</h3>
            <div>
                <input type="radio" id="editpage" className="edittoggle" value="editpage" checked={isEditPage} onChange={handleToggleChange} />
                <label htmlFor="editpage">Toggle to edit page</label>
            </div>
            <p>Click on an item you would like to edit</p>
            <div className="invitembar">
                <div>
                    <p>Name:</p>
                </div>
                <div>
                    <p>Description:</p>
                </div>
                <div className="invquant">
                    <p>Quantity:</p>
                </div>
                <div>
                    <p>Action:</p>
                </div>
            </div>
            {inventory()}
        </div>
    )
}