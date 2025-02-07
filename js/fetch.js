import firebase from './firebase.js';
import {
  collection,
  doc,
  getDocs
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

var loader = document.getElementById('loader');

export async function setProducts() {
  const products = collection(firebase.db, 'products');
  loader.style.display = 'flex';
  const docSnap = await getDocs(products);
  // ////console.log(docSnap.docs);
  const table = document.getElementById('uploads-table');
  // ////console.log(creatorsTable);
  docSnap.docs.reverse().forEach((doc) => {
    ////console.log(doc.id);
    const data = doc.data();
    // ////console.log(data);
    const tr = document.createElement('tr');
    tr.innerHTML = `
              <td><img src='${data.image}' width='70px' height='70px'/></td>
              <td>${data.email}</td>
              <td><button style="background-color: #ff69b4; padding: 10px; border-radius: 25px; border: none; color: white;font-weight: 4500;cursor: pointer; cursor: pointer;" onclick="window.open('${data.mainFile}')">Download</button></td>
              <td>
              <button style="background-color: #a9203e; padding: 10px; border-radius: 25px; border: none; color: white;font-weight: 4500; cursor: pointer;" id='${doc.id}' class='removeProduct' style="cursor: pointer;">Remove</button>
              <button style="background-color: #a9203e; padding: 10px; border-radius: 25px; border: none; color: white;font-weight: 4500; cursor: pointer;" id='${doc.id}' style="cursor: pointer;" onclick="window.open('https://3dhousemap.in/products/${doc.id}')">View</button>
                </td>
            `;
    table.appendChild(tr);
  });
  loader.style.display = 'none';
}

export async function setCreators() {
  const creators = collection(firebase.db, 'joinedus');
  const docSnap = await getDocs(creators);
  const creatorsTable = document.getElementById('creators-table');
  loader.style.display = 'flex';
  docSnap.docs
    .reverse()
    .slice(0, 5)
    .forEach((doc) => {
      // ////console.log(doc.data());
      const data = doc.data();
      const tr = document.createElement('tr');
      tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${data.contact}</td>
              <td>
              <button style="background-color: #a9203e; padding: 10px; border-radius: 25px; border: none; color: white;font-weight: 4500; cursor: pointer; id='${doc.id}' class='removeButton' style="cursor: pointer;">Remove</button>
                </td>
            `;
      creatorsTable.appendChild(tr);
    });
  loader.style.display = 'none';
}

export async function setAllCreators() {
  const creators = collection(firebase.db, 'joinedus');
  const docSnap = await getDocs(creators);
  const creatorsTable = document.getElementById('creators-table-creators');
  loader.style.display = 'flex';
  // ////console.log(creatorsTable);
  docSnap.docs.reverse().forEach((doc) => {
    // ////console.log(doc.data());
    const data = doc.data();
    // ////console.log(data, doc.id)
    const tr = document.createElement('tr');
    let id = doc.id;
    tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${data.contact}</td>
              <td>
              <button style="background-color: #a9203e; padding: 10px; border-radius: 25px; border: none; color: white;font-weight: 4500; cursor: pointer;" id='${doc.id}' class='removeButton'>Remove</button>
              </td>
            `;
    creatorsTable.appendChild(tr);
  });
  loader.style.display = 'none';
}

export async function fetchIncome() {
  const creators = collection(firebase.db, 'joinedus');
  const docs = await getDocs(creators);
  const incomeTable = document.getElementById('income-table');
  loader.style.display = 'flex';
  let overallIncome = 0;
  docs.docs.forEach((doc) => {
    const data = doc.data();

    const name = data.fullName;
    let totalIncome = 0;
    data.plansSold.map((e) => (totalIncome += parseFloat(e.price)));
    ////console.log(totalIncome)
    const tr = document.createElement('tr');

    let oneMonthIncome = 0;
    var seconds = new Date().getTime() / 1000;
    const todayTS = seconds * 1000;
    const past30thTS = (seconds - 2592000) * 1000;
    overallIncome += totalIncome;
    data.plansSold.map((e) => {
      const purchaseTS = e.timestamp.seconds * 1000;

      if (todayTS - purchaseTS < todayTS - past30thTS) {
        oneMonthIncome += parseFloat(e.price);
      }
    });
    tr.innerHTML = `
              <td><a href="./creator.html?id=${doc.id}">${data.fullName}</a></td>
              <td>${data.email}</td>
              <td>${oneMonthIncome}</td>
              <td>${totalIncome}</td>
              <td>
              </td>
            `;
    incomeTable.appendChild(tr);
  });

  const inc = document.getElementById('income');
  inc.textContent = overallIncome + ' INR';
  loader.style.display = 'none';
}

export const fetchAllStats = async () => {
  const creators = collection(firebase.db, 'joinedus');
  const products = collection(firebase.db, 'products');
  const income = collection(firebase.db, 'joinedus');
  const creatorDocSnap = await getDocs(creators);
  const productDocSnap = await getDocs(products);
  const incomeDocSnap = await getDocs(income);
  const creatorsTable = document.getElementById('stats');
  loader.style.display = 'flex';
  // ////console.log(creatorsTable);
  let overallIncome = 0;
  incomeDocSnap.docs.forEach((doc) => {
    const data = doc.data();
    console.log(data.plansSold);
    let totalIncome = 0;
    data.plansSold.map((e) => (totalIncome += parseFloat(e.price)));
    overallIncome += totalIncome;
  });
  creatorsTable.innerHTML = `
      <div class="main-content-info container">
        <div style="cursor: pointer" onclick="window.location = 'creators.html'" class="mini-card">
          <h2 class="cus-num cus-h"></h2>
          <h2>${creatorDocSnap.docs.length}</h2>
          <p>Creators</p>
        </div>
        <div style="cursor: pointer" onclick="window.location = 'uploads.html'" class="mini-card">
          <h2 class="cus-num cus-pro"></h2>
          <h2>${productDocSnap.docs.length}</h2>
          <p>Uploaded<br/> Content</p>
        </div>
        <div style="cursor: pointer" onclick="window.location = 'income.html'" class="mini-card">
          <h2 class="cus-num cus-inc"></h2>
          <h2>${overallIncome} INR</h2>
          <p>Income</p>
        </div>
        <div class="clear"></div>
      </div>`;
  loader.style.display = 'none';
};
