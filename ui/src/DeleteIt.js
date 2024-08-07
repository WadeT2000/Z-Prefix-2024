
// export default async function deleteItem(itemId) {
//     try {
//         const response = await fetch(`http://localhost:8080/inventory/${itemId}`, {
//             method: 'DELETE',
//             credentials: 'include'
//         });

//         if (response.ok) {
//             setUserInventory(userinventory.filter(item => item.id !== itemId));
//         } else {
//             console.error("Failed to delete item");
//         }
//     } catch (error) {
//         console.error("Error deleting item:", error);
//     }
// };