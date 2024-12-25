import { CONFIG } from './config.js';

document.addEventListener("DOMContentLoaded", function () {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  fetchBlogs(isAdmin); 

  const signout = document.getElementById("signout");
  if (signout) {
    signout.addEventListener("click", function () {
      localStorage.removeItem("isAdmin");
      window.location.href = "index.html";
    });
  }

  function fetchBlogs(isAdmin) {
    fetch(`${CONFIG.API_BASE_URL}/fetch_blogs.php`)
      .then((response) => response.json()) 
      .then((data) => {
        console.log(data);
        const container = document.getElementById("blogsContainer");
        container.innerHTML = "";

        data.forEach((blog) => {
          const card = document.createElement("div");
          card.classList.add("blog-card");

          const title = document.createElement("h3");
          title.textContent = blog.title;

          if (blog.image_url) {
            const img = document.createElement("img");
            img.src = blog.image_url;
            img.alt = blog.title;
            img.classList.add("blog-image");
            card.appendChild(img);
          }

          const content = document.createElement("p");
          content.textContent = blog.content;

          card.appendChild(title);
          card.appendChild(content);

          const actionRow = document.createElement("div");
          actionRow.classList.add("action-row");

          const readMoreLink = document.createElement("span");
          readMoreLink.innerHTML =
            'Read More <i class="fas fa-chevron-right"></i>';
          readMoreLink.classList.add("read-more-link");
          readMoreLink.onclick = () => {
            window.location.href = `blog_details.html?id=${blog.id}`;
          };
          actionRow.appendChild(readMoreLink);

          card.appendChild(actionRow);
          container.appendChild(card);
        });
      });
  }

window.searchBlogs = function () {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const cards = document.getElementsByClassName("blog-card");

  for (let i = 0; i < cards.length; i++) { 
    const title = cards[i].querySelector("h3").textContent || "";
    const content = cards[i].querySelector("p").textContent || "";

    if (
      title.toLowerCase().includes(filter) || 
      content.toLowerCase().includes(filter)
    ) {
      cards[i].style.display = ""; 
    } else {
      cards[i].style.display = "none"; 
    }
  }
};
});








