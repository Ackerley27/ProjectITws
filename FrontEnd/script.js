async function fetchIceCreams() {
    try {
        const response = await fetch('http://localhost:3000/api/icecreams');
        const iceCreams = await response.json();
        displayIceCreams(iceCreams);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
}

function displayIceCreams(iceCreams) {
    const iceCreamList = document.getElementById('iceCreamList');
    iceCreamList.innerHTML = ''; // Clear previous items

    iceCreams.forEach(iceCream => {
        const iceCreamItem = document.createElement('div');
        iceCreamItem.className = 'iceCreamItem';
        iceCreamItem.innerHTML = `
            <h2>${iceCream.name}</h2>
            <img src="${iceCream.imageUrl}" alt="${iceCream.name}">
            <p>ราคา: ${iceCream.price} บาท</p>
            <p>${iceCream.description}</p>
        `;
        iceCreamList.appendChild(iceCreamItem);
    });
}

fetchIceCreams();
