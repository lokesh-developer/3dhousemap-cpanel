var acceptBtn = document.getElementById("accept");
let email = document.getElementById("email");
let name = document.getElementById("name");

acceptBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Accept button clicked");
    var templateParams = {
        tomail: email.innerText,
        from_name: '3dhousemap',
        to_name: name.innerText,
        message: 'Test email'
    };
    emailjs
      .send('service_nqy2iol', 'template_vlhr40o', templateParams) //Insert your email service ID and email template ID
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
})
