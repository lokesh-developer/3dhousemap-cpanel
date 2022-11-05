import firebase from './firebase.js'
import { collection, doc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

// const { app, db} = firebase
export async function fetchB(){
    const btn = document.getElementsByClassName('removeButton');
    console.log(btn)
    var b = Array.from(btn);
    console.log(b.length)
    for(let i=0; i<b.length; i++){
        btn[i].addEventListener('click', async function(){
            console.log(btn[i].id)
            
            let ans = confirm('Do You Really Want To Reject Request?')
            if(ans){
                const del = doc(firebase.db, 'joinedus', `${btn[i].id}`)
                deleteDoc(del).then(()=>window.location.reload())
            } else {
                alert('Request Not Deleted!')
            }
        })
    }
}
// function removeRequest(){
//     const id = btn.id;
//     console.log(id)
// }
// fetchB()
// console.log(btn[0], btn.length)

// console.log(len(btn[0]))
// btn.addEventListener('click', console.log('Clicked'))