import { CONFIG } from "./config.js";

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

          if (isAdmin) {
            const actions = document.createElement("div");
            actions.classList.add("actions");

            const editIcon = document.createElement("i");
            editIcon.classList.add("fas", "fa-edit");
            editIcon.onclick = () =>
              openModal(blog.id, blog.title, blog.content, blog.image_url);

            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fas", "fa-trash-alt");
            deleteIcon.onclick = () => deleteBlog(blog.id);

            actions.appendChild(editIcon);
            actions.appendChild(deleteIcon);
            actionRow.appendChild(actions)
          }

          card.appendChild(actionRow);
          container.appendChild(card);
        });
      });
  }

  function closeModal() {
    document.getElementById("editModal").style.display = "none";
  }

  document.querySelector(".close-button").addEventListener("click", closeModal);
  document.getElementById("cancelEdit").addEventListener("click", closeModal);

  function openModal(id, currentTitle, currentContent, currentImageUrl) {
    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = currentTitle;
    document.getElementById("editContent").value = currentContent;
    document.getElementById("editModal").style.display = "block";

    const editImageInput = document.getElementById("editImage");
    const removeImageIcon = document.getElementById("removeImageIcon");

    if (currentContent) {
      const fileName = currentImageUrl.spilt("/").pop();
      const dataTransfer = new DataTransfer();
      const file = new File([""], fileName);
      dataTransfer.items.add(file);
      editImageInput.files = dataTransfer.files;

      removeImageIcon.style.display = "inline-block";
    } else {
      editImageInput.value = "";
      removeImageIcon.style.display = "none";
    }

    editImageInput.addEventListener("change", () => {
      if (editImageInput.file.length > 0) {
        removeImageIcon.style.display = "inline-block";
      }
    });

    removeImageIcon.onclick = function () {
      editImageInput.value = "";
      removeImageIcon.style.display = "none";
    };
  }

  document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("editId").value;
    const title = document.getElementById("editTitle").value;
    const content = document.getElementById("editContent").value;
    const editImageInput = document.getElementById("editImage");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("content", content);

    if (editImageInput.files.length > 0) {
      formData.append("image", editImageInput.files[0]);
    } else if (editImageInput.files.length === 0) {
      formData.append("removeImage", true);
    }

    fetch(`${CONFIG.API_BASE_URL}/update_blog.php`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchBlogs(true);
          closeModal();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An Error occurred while updating the blog.");
      });
  });

  function deleteBlog(id) {
    if (confirm("Are you sure you want to delete this blog?")) {
      fetch(`${CONFIG.API_BASE_URL}/delete_blog.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}`,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            fetchBlogs(true);
          } else {
            alert(data.message);
          }
        });
    }
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
