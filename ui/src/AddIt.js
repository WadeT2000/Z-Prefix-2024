const additemServer = 'http://localhost:8080/additem';

export default async function addItem(uID, uName, iName, description, quantity) {
  const response = await fetch(additemServer, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: uID,
      username: uName,
      itemname: iName,
      description: description,
      quantity: quantity
    }),
  })
  .then(res => res.json())
  .then(res => {return res;})
  .catch(error => {
    console.log(error);
    return { message: 'Error Connecting to the Server' };
  });
  
  return response;
}