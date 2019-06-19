console.log("Client side file javascript loaded!");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

// messageOne.textContent = "";
// messageTwo.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = input.value;

  messageOne.textContent = "Searching...";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }

      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
});
