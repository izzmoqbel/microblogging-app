import { CONFIG } from "./config.js";

loginForm.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      console.log("Form submitted");

      const formData = new FormData(loginForm);

      fetch(`${CONFIG.API_BASE_URL}:3000/login.php`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            localStorage.setItem("isAdmin", "true");
            window.location.href = "index.html";
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while trying to log in. Please try again.");
        });
    });
  } else {
    console.error("Login form not found.");
  }
});
