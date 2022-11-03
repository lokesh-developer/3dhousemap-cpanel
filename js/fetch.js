import firebase from "./firebase.js";
import { collection, doc, getDocs } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";


export async function setProducts() {
    const products = collection(firebase.db, "products");
    const docSnap = await getDocs(products);
    console.log(docSnap.docs);
    const table = document.getElementById("uploads-table");
    // console.log(creatorsTable);
    docSnap.docs.reverse().forEach((doc) => {
        // console.log(doc.data());
        const data = doc.data();
        console.log(data);
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td><img src='${data.image}' width='70px' height='70px'/></td>
              <td>${data.email}</td>
              <td><button style="cursor: pointer;" onclick="window.open('${data.mainFile}')">Download</button></td>
              <td>
              <button style="cursor: pointer;" onclick="window.location = '/creators.html'">Remove</button>
                        <button  style="cursor: pointer;" onclick="window.location = '/creators.html'">View</button>
                </td>
            `;
        table.appendChild(tr);
    });
}

export async function setCreators() {
    const creators = collection(firebase.db, "joinedus");
    const docSnap = await getDocs(creators);
    const creatorsTable = document.getElementById("creators-table");
    // console.log(creatorsTable);
    docSnap.docs.reverse().slice(0, 5).forEach((doc) => {
        // console.log(doc.data());
        const data = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${data.contact}</td>
              <td>
              <button style="cursor: pointer;" onclick="window.location = '/creators.html'">Remove</button>
                        <button  style="cursor: pointer;" onclick="window.location = '/creators.html'">View</button>
                </td>
            `;
        creatorsTable.appendChild(tr);
    });
}

export async function setAllCreators() {
    const creators = collection(firebase.db, "joinedus");
    const docSnap = await getDocs(creators);
    const creatorsTable = document.getElementById("creators-table-creators");
    // console.log(creatorsTable);
    docSnap.docs.reverse().forEach((doc) => {
        // console.log(doc.data());
        const data = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${data.contact}</td>
              <td>
              <button style="cursor: pointer;" onclick="window.location = '/creators.html'">Remove</button>
                        <button  style="cursor: pointer;" onclick="window.location = '/creators.html'">View</button>
                </td>
            `;
        creatorsTable.appendChild(tr);
    });
}