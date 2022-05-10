const api_url = "https://librarymanagementsystemkp.herokuapp.com/api/auth/signin";

document.querySelector("#submit").addEventListener("click", () => {
  call(api_url);
});

function call(api_url) {
  let obj = {
    email: document.getElementById("uname").value,
    password: document.getElementById("pass").value,
  };
  let body = JSON.stringify(obj);

  if (!loginValidation(obj)) return;
  // console.log("sh");
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
      if(res.message==="Invalid Details" || res.message==="Server Error.."){
        displaypopup(res);
      }
      document.cookie=`token=${res.token}`;
      localStorage.setItem("id",`${res.id}`);
      if(res.role==="Student"){
        window.location.href="./Student/Studenthome.html"
      }
      if(res.role==="Admin"){
          window.location.href="./Admin/Admin_home.html"
      }
      
      //   getData(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function loginValidation(body) {
  // console.log(body.email, body.password);
  var id = body.email;
  // console.log(id);
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(id)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
};


document.getElementById("okbtn").addEventListener("click",removepopup);
        function displaypopup(res)
        {
          // console.log(res.message);
          document.getElementById("popup").children[0].innerHTML=res.message;  
          document.getElementById("popup").style.display="block"; 
        }
        function removepopup()
        {
          document.getElementById("popup").style.display="none";
          window.location.reload();
        }