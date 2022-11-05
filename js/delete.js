import firebase from './firebase.js'

export function fetchB(){
    const btn = document.getElementsByClassName('removeButton');
    console.log(btn)
    var b = Array.from(btn);
    console.log(b)
}
// function removeRequest(){
//     const id = btn.id;
//     console.log(id)
// }
// fetchB()
// console.log(btn[0], btn.length)

// console.log(len(btn[0]))
// btn.addEventListener('click', console.log('Clicked'))