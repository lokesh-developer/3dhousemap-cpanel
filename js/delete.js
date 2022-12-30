import firebase from './firebase.js';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { ref, deleteObject } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js';

export async function deleteRequest() {
  
  const btn = document.getElementsByClassName('removeButton');

  var b = Array.from(btn);

  for (let i = 0; i < b.length; i++) {
    btn[i].addEventListener('click', async function () {
      let ans = confirm('Do You Really Want To Reject Request?');

      if (ans) {
        const del = doc(firebase.db, 'joinedus', `${btn[i].id}`);
        const doc1 = await getDoc(del);
        const q = query(
          collection(firebase.db, 'users'),
          where('email', '==', `${doc1.data().email}`)
        );

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot?.docs[0]?.data()?.uid);
        const uid = querySnapshot?.docs[0]?.data()?.uid;
        if (querySnapshot?.docs.length > 0) {
          const del2 = doc(firebase.db, 'users', `${querySnapshot?.docs[0]?.id}`);
          await deleteDoc(del2);
        }
        const sDRef = ref(firebase.storage, `${doc1.data().sampleDesign}`);
        const eQRef = ref(firebase.storage, `${doc1.data().educationQualification}`);

        deleteObject(sDRef)
          .then(() =>
            deleteObject(eQRef)
              .then(() => console.log('Deletion Completed'))
              .catch(() =>
                console.log('Some Error Occured While Deleting Educational Qualifications')
              )
          )
          .catch(() => console.log('Some Error Occured While Deleting Sample Design'));
        deleteDoc(del)
          .then(() => {
            console.log('Request Rejected');
            window.location.reload();
          })
          .catch(() => console.log('Some Error Occured While Rejecting Request'));
      } else {
        alert('Request Not Deleted!');
      }
    });
  }
}

export async function deleteProduct() {
  const btn = document.getElementsByClassName('removeProduct');
  var b = Array.from(btn);

  for (let i = 0; i < b.length; i++) {
    btn[i].addEventListener('click', async function () {
      let ans = confirm('Do You Really Want To Delete Product?');

      if (ans) {
        const del = doc(firebase.db, 'products', `${btn[i].id}`);
        const doc1 = await getDoc(del);

        const imRef = ref(firebase.storage, `${doc1.data().image}`);
        const mFRef = ref(firebase.storage, `${doc1.data().mainFile}`);

        deleteObject(imRef)
          .then(() =>
            deleteObject(mFRef)
              .then(() => {
                console.log('Deletion Completed');
                window.location.reload();
              })
              .cathc(() => {
                console.log('Some Error Occured While Deleting Main File');
                alert('Some Error Occured While Deleting Main File');
              })
          )
          .catch(() => console.log('Some Error Occured While Deleting Image'));
        deleteDoc(del)
          .then(() => console.log('Request Rejected'))
          .catch(() => console.log('Some Error Occured While Rejecting Request'));
      } else {
        alert('Request Not Deleted!');
      }
    });
  }
}
