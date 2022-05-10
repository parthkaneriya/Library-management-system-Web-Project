const api_url = "https://librarymanagementsystemkp.herokuapp.com/api/auth/register";

document.querySelector("#submit").addEventListener("click", () => {
  call(api_url);
});

function call(api_url) {
  let obj = {
    firstName : document.getElementById("firstName").value,
    lastName : document.getElementById("lastName").value,
    rollNo : document.getElementById("rollNo").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    contactNumber : document.getElementById("contact").value,
    course : document.getElementById("course").value,
    gender : document.querySelector('input[name="gender"]:checked').value
  };
  let body = JSON.stringify(obj);
  console.log(body);
  if (!emailValidation(obj)) return;
  if(!phoneValidation(obj)) return;
//   console.log("sh");
  fetch(api_url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if(res.message === "user created sucessfully"){
          window.location.href="login.html"
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function phoneValidation(x) {
    var a = x.contactNumber;
    // console.log(a);
    if (isNaN(a)) {
      alert("Enter Only Numeric value in phone number");
      return false;
    } else if (a.length < 10 || a.length > 10) {
      alert("Mobile Number must be 10 digit");
      return false;
    } else {
      return true;
    }
  }

  function emailValidation(x) {
    var id = x.email;
    // console.log(id);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(id)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }