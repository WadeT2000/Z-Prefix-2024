import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './EditPage.css'

export default function EditItem() {
    const { itemname } = useParams();
    const navigate = useNavigate();
    const [singleitem, setSingleItem] = useState({ item_name: '', description: '', quantity: '' });

    useEffect(() => {
        fetch(`http://localhost:8080/items?search=${itemname}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setSingleItem(data[0]);
                }
            });
    }, [itemname]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSingleItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/items/${singleitem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(singleitem)
            });

            if (response.ok) {
                navigate('/inventory');
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div>
            <div className="editnavbar">
                <button className="editcancelbutt" onClick={() => navigate('/inventory')}>Cancel</button>
            </div>
            <h2 className="editheader">Edit {itemname} Info</h2>
            <div className="editIteminfo">
                <div className="editindivitem">
                    <p>Item Name:</p>
                    <input type="text" className="editinameinput" minLength='1' maxLength='30' name="item_name" value={singleitem.item_name} onChange={handleInputChange} />
                    <p>Description:</p>
                    <textarea className="editdescriptioninput" minLength='1' maxLength='500' name="description" value={singleitem.description} onChange={handleInputChange} />
                    <p>Quantity:</p>
                    <input type="number" className="editquantinput" min='1' max='9999' name="quantity" value={singleitem.quantity} onChange={handleInputChange} />
                </div>
            </div>
            <button className='editcommitbutt' onClick={handleSubmit}>Commit changes</button>
        </div>
    );
}