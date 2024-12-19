import { CONFIG } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  const isAdmin = localStorage.getItem("isAdmin") == "true";

  if (!isAdmin) {
    window.location.href = "404.html";
    return;
  }

  const blogFrom = document.getElementById("blogForm");
  if (blogFrom) {
    blogFrom.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(blogForm);

      
      fetch(`${CONFIG.API_BASE_URL}/add_blog.php`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.href = "index.html";
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An Error occurred while creating the blog.");
        });
    });
  } else {
    console.log("blogFrom element not found");
  }
});
