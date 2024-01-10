const form = document.getElementById("form");
const modal = document.getElementById('modal-con');
const closeModal = document.getElementById('x-close-modal');
const modal_msg = document.getElementById('modal-msg');
const modal_img = document.getElementById('modal-img');

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
    modal.classList.add("grid")
      form.reset()
    if (response.ok) {
        
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          (error => error["message"]).join(", ")
        } else {
            modal_img.src = `../src/assets/error-svgrepo-com.svg`
            modal_msg.innerText = `Error occured`
            modal.classList.add("grid")
          
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