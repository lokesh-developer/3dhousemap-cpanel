import firebase from "./firebase.js";
import { collection, doc, getDocs } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";


export async function setProducts() {
    const products = collection(firebase.db, "products");
    const docSnap = await getDocs(products);
    // ////console.log(docSnap.docs);
    const table = document.getElementById("uploads-table");
    // ////console.log(creatorsTable);
    docSnap.docs.reverse().forEach((doc) => {
        ////console.log(doc.id);
        const data = doc.data();
        // ////console.log(data);
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td><img src='${data.image}' width='70px' height='70px'/></td>
              <td>${data.email}</td>
              <td><button style="cursor: pointer;" onclick="window.open('${data.mainFile}')">Download</button></td>
              <td>
              <button id='${doc.id}' class='removeProduct' style="cursor: pointer;">Remove</button>
                </td>
            `;
        table.appendChild(tr);
    });
}
{/* <button id='${doc.id}' class='viewProfile' style="cursor: pointer;">View</button> */}


export async function setCreators() {
    const creators = collection(firebase.db, "joinedus");
    const docSnap = await getDocs(creators);
    const creatorsTable = document.getElementById("creators-table");
    // ////console.log(creatorsTable);
    docSnap.docs.reverse().slice(0, 5).forEach((doc) => {
        // ////console.log(doc.data());
        const data = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${data.contact}</td>
              <td>
              <button id='${doc.id}' class='removeButton' style="cursor: pointer;">Remove</button>
              <button id='${doc.id}' class='viewProfile' style="cursor: pointer;">View</button>
                </td>
            `;
        creatorsTable.appendChild(tr);
    });
}

export async function setAllCreators() {
    const creators = collection(firebase.db, "joinedus");
    const docSnap = await getDocs(creators);
    const creatorsTable = document.getElementById("creators-table-creators");
    // ////console.log(creatorsTable);
    docSnap.docs.reverse().forEach((doc) => {
        // ////console.log(doc.data());
        const data = doc.data();
        // ////console.log(data, doc.id)
        const tr = document.createElement("tr");
        let id = doc.id;
        tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${data.contact}</td>
              <td>
              <button id='${doc.id}' class='removeButton'  style="cursor: pointer;">Remove</button>
              <button id='${doc.id}' class='viewProfile' style="cursor: pointer;">View</button>
              </td>
            `;
        creatorsTable.appendChild(tr);
    });
}

export async function fetchIncome() {
    const creators = collection(firebase.db, 'joinedus');
    const docs = await getDocs(creators);
    const incomeTable = document.getElementById('income-table');
    let overallIncome = 0;
    docs.docs.forEach((doc) => {
        const data = doc.data();

        const name = data.fullName;
        let totalIncome = 0;
        data.plansSold.map((e) => totalIncome += parseFloat(e.price))
        ////console.log(totalIncome)
        const tr = document.createElement("tr");
        
        let oneMonthIncome = 0;
        var seconds = new Date().getTime() / 1000;
        const todayTS = seconds * 1000;
        const past30thTS = (seconds  -2592000)*1000;
        overallIncome += totalIncome;
        data.plansSold.map((e) => {
                ////console.log(e.timestamp.seconds * 1000) //Timestamp Of The Date When The Product Was Purchased
                ////console.log(seconds * 1000) //Today's Timestamp
                ////console.log((seconds  -2592000)*1000) //Timestamp Of Past 30th Day From Today
                
                const purchaseTS = e.timestamp.seconds * 1000; 

                if(todayTS - purchaseTS <  todayTS - past30thTS){
                    oneMonthIncome+=parseFloat(e.price)
                }
        })
        tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${oneMonthIncome}</td>
              <td>${totalIncome}</td>
              <td>
              </td>
            `;
        incomeTable.appendChild(tr);
    })

    const inc = document.getElementById('income')
    inc.textContent = overallIncome + ' INR';
    // inc.innerText({oneMonthIncome}))
}