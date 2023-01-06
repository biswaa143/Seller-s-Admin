function saveToCrud(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;

    let obj = {
        name,
        price
    }

    axios.post("https://crudcrud.com/api/d652953903124652a98c6fffbe82b11b/sellersDetails", obj)
    .then((response) => {
        showDetailsOnScreen(response.data)
        console.log(response);
    })
    .catch((err) => console.log(err))
}

// Display details on screen
function showDetailsOnScreen(details) {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';

    const parentNode = document.getElementById('list')
    const childHTML = `<li id=${details._id}> ${details.name} - ${details.price}
    <button onclick=deleteDetails('${details._id}')>Delete Product</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// Displays details after reload
window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/d652953903124652a98c6fffbe82b11b/sellersDetails")
    .then((response) => {
        for(let i=0; i<response.data.length; i++) {
            showDetailsOnScreen(response.data[i])
        }
    })
    .catch((err) => console.log(err))
})

// Delete Details
function deleteDetails(id) {
    axios.delete(`https://crudcrud.com/api/d652953903124652a98c6fffbe82b11b/sellersDetails/${id}`)
    .then((response) => console.log(response))
    .catch((err) => console.log(err))

    deleteDetailsFromScreen(id)
}

// Delete details from screen
function deleteDetailsFromScreen(id) {
    const parentNode = document.getElementById('list');
    const child = document.getElementById(id);

    parentNode.removeChild(child)
}