const form = document.getElementById("form");
const modal = document.getElementById('modal-con');
const closeModal = document.getElementById('x-close-modal');

async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
        modal.classList.add("grid")
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          (error => error["message"]).join(", ")
        } else {
          alert("Oops! There was a problem submitting your form")
        }
      })
    }
  }).catch(error => {

  });
}
function modalToggle(){
  modal.classList.remove("grid")
}
form.addEventListener("submit", handleSubmit)
closeModal.addEventListener("click",modalToggle)
modal.addEventListener("click",modalToggle)