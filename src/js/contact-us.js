const form = document.getElementById("form");
        
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
        //thanks page
        alert("thanks for your message")
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
form.addEventListener("submit", handleSubmit)
