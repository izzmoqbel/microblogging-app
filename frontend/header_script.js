fetch("header.html")
  .then((respose) => respose.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const backToBlogsBtn = document.getElementById("backToBlogs");
    const loginBtn = document.getElementById("login");
    const createBlogBtn = document.getElementById("createBlog");
    const signoutBtn = document.getElementById("signout");

    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (isAdmin) {
      signoutBtn.style.display = "inline-block";

      if (page === "index.html") {
        createBlogBtn.style.display = "inline-block";
      } else if (page === "create_blog.html" || page === "blog_details.html") {
        backToBlogsBtn.style.display = "inline-block";
      }
    } else {
      loginBtn.style.display = "inline-block";
      if (page === "blog_details.html") {
        backToBlogsBtn.style.display = "inline-block";
      }
    }

    signoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isAdmin");
      window.location.href = "index.html";
    });
  })
  .catch((error) => {
    console.error("Error loading header:", error);
  });
