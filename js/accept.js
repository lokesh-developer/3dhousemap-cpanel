import firebase from './firebase.js';
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

export async function getUser() {
  const id = window.location.search.slice(4);
  const docRef = doc(firebase.db, 'joinedus', id);
  const userDoc = await getDoc(docRef);
  const user = userDoc.data();
  const fileFormat = user.sampleDesign
    ?.split('joinedus')[1]
    .split('?alt=')[0]
    .replace('%2F', '/')
    .replace('%20', ' ')
    .replace('%2F', '/')
    .replace('%20', ' ')
    .replace('%20', ' ')
    .split('/')[2]
    .slice(0, -13)
    .split('.')[1];
  let name = document.getElementById('name');
  name.textContent = user.fullName;
  let email = document.getElementById('email');
  email.textContent = user.email;

  let creator = document.getElementById('creator-desc');
  creator.textContent = 'Creator : ' + user.fullName;

  var acceptBtn = document.getElementById('accept');
  var img = document.getElementById('mainImage');
  if (fileFormat === 'png' || fileFormat === 'jpg' || fileFormat === 'jpeg') {
    img.src = `${user.sampleDesign}`;
  } else {
    img.src = 'https://th.bing.com/th/id/OIP.eIaVXCWVby6f6b4iKrx4FAHaHa?pid=ImgDet&rs=1';
  }

  var fD = document.getElementById('fileDownload');
  const ff = user.sampleDesign
    ?.split('joinedus')[1]
    .split('?alt=')[0]
    .replace('%2F', '/')
    .replace('%20', ' ')
    .replace('%2F', '/')
    .replace('%20', ' ')
    .replace('%20', ' ')
    .split('/')[2]
    .slice(0, -13);
  fD.href = `${user.educationQualification}`;
  fD.download = `${ff}`;

  acceptBtn.addEventListener('click', (e) => {
    e.preventDefault();
    try {
      function generateP() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';

        for (let i = 1; i <= 8; i++) {
          var char = Math.floor(Math.random() * str.length + 1);

          pass += str.charAt(char);
        }

        return pass;
      }

      const password = generateP();

      var templateParams = {
        tomail: `${user.email}`,
        from_name: '3dhousemap',
        to_name: name.innerText,
        message: `Greetings ${user.fullName}, \n \t We're glad to announce that you are now a creator at 3dhousemap.in with your credentials as :- \n Email - ${user.email} \n and \n Password - ${password} \n Thanking you, Team 3dhousemap`
      };

      emailjs
        .send('service_mzj810r', 'template_edub2nx', templateParams) //Insert your email service ID and email template ID
        .then(
          function (response) {
            try {
              createUserWithEmailAndPassword(firebase.auth, user.email, password)
                .then(async (userCredential) => {
                  const dbRef = collection(firebase.db, 'users');
                  addDoc(dbRef, {
                    uid: userCredential.user.uid,
                    email: user.email,
                    name: user.fullName,
                    photo: '',
                    collections: []
                  })
                    .then((docRef) => {
                      console.log('Added To Users');
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  document.getElementById('accept').textContent = 'Accepted!';
                  document.getElementById('decline').style.display = 'none';
                  await updateDoc(docRef, {
                    creator: true,
                    credentials: userCredential
                  });
                })

                .catch((error) => {
                  switch (error.code) {
                    case 'auth/email-already-in-use':
                      alert(`Email address ${user.email} already in use.`);
                      document.getElementById('accept').textContent = 'Already Accepted!';
                      document.getElementById('decline').style.display = 'none';
                      break;
                    case 'auth/invalid-email':
                      //console.log(`Email address ${this.state.email} is invalid.`);
                      break;
                    case 'auth/operation-not-allowed':
                      //console.log(`Error during sign up.`);
                      break;
                    case 'auth/weak-password':
                      //console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                      break;
                    default:
                      //console.log(error.message);
                      break;
                  }
                });
            } catch (error) {
              alert('Some Error Occured');
            }
          },
          function (error) {
            console.log('FAILED...', error);
            alert('Some Error Occured, Reach out to technical help!');
            //   window.location = 'creators.html';
          }
        );
    } catch (error) {
      console.log(error);
      // alert('Some Error Occured');
      // window.location = 'creators.html';
    }
  });

  var rejectBtn = document.getElementById('decline');

  if (userDoc.creator) {
    rejectBtn.style.display = 'none';
  }

  rejectBtn.addEventListener('click', async function () {
    ////console.log(id)

    let ans = confirm('Do You Really Want To Reject Request?');
    if (ans) {
      const del = doc(firebase.db, 'joinedus', id);
      const doc1 = await getDoc(del);
      deleteDoc(del).then(() => (window.location = 'creators.html'));
      const q = query(
        collection(firebase.db, 'users'),
        where('email', '==', `${doc1.data().email}`)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot?.docs.length > 0) {
        const del2 = doc(firebase.db, 'users', `${querySnapshot?.docs[0]?.id}`);
        await deleteDoc(del2);
      }
    } else {
      alert('Request Not Deleted!');
    }
  });
}
