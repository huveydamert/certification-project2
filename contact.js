document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const thankYou = document.getElementById("thank-you");
    const userName = document.getElementById("user-name");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      userName.textContent = name;
      form.style.display = "none";
      thankYou.style.display = "block";
    });
  });
  