const form = document.getElementById('form');
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
        thankYou()
        form.reset()
      if (!response.ok) {
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
function thankYou(){
    window.location.replace(`${window.location.origin}/thankyou`)
}
form.addEventListener("submit", handleSubmit)