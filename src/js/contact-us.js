const form = document.getElementById("form");
const closeModal = document.getElementById('x-close-modal');
const modal_msg = document.getElementById('modal-msg');
const modal_img = document.getElementById('modal-img');

//handling form submission by w3 forms
form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        modal.classList.add("grid")
      } else {
        modal.classList.add("grid")
      }
    })
    .catch((error) => {
      console.log(error);
      modal.classList.add("grid")
      modal_msg.innerHTML = "Something went wrong!";
      modal_img.src = "../src/assets/error-svgrepo-com.svg"
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        modal.classList.add("grid")
      }, 5000);
    });
});

closeModal.addEventListener("click",modalToggle)
modal.addEventListener("click",modalToggle)