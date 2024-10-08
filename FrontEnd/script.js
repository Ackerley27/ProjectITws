async function fetchIceCreams() {
    const iceCreamList = document.getElementById('iceCreamList');
    iceCreamList.innerHTML = '<p>กำลังโหลดข้อมูลไอติม...</p>'; // แสดงข้อความ loading ขณะรอข้อมูล
    
    try {
        const response = await fetch('http://localhost:3000/api/icecreams');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const iceCreams = await response.json();

        if (iceCreams.length === 0) {
            iceCreamList.innerHTML = '<p>ขออภัย, ไม่มีข้อมูลไอติมที่พร้อมให้แสดง</p>';
        } else {
            displayIceCreams(iceCreams);
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        iceCreamList.innerHTML = '<p>เกิดข้อผิดพลาดในการดึงข้อมูลไอติม. กรุณาลองใหม่อีกครั้ง.</p>';
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
