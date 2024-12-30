import { CONFIG } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    console.log("Blog ID:", blogId);
  
    if (blogId) {
      fetch(`${CONFIG.API_BASE_URL}/get_blog_details.php?id=${blogId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          if (data.success) {
            const blog = data.blog;
            const blogImage = document.getElementById("blogImage");
  
            if (blog.image_url) {
              blogImage.src = "../" + blog.image_url;
              blogImage.style.display = "block";
            } else {
              blogImage.style.display = "none";
            }
            document.getElementById("blogTitle").textContent = blog.title;
            document.getElementById("blogContent").textContent = blog.content;
          } else {
            alert(data.message || "Failed to load blog details");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while fetching blog details");
        });
    } else {
      alert("Blog ID is not provided");
    }
  });
  
