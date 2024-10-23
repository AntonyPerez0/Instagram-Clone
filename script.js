// Handle login form submission
document
  .getElementById("login-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
      window.location.href = "feed.html";
    } else {
      alert("Please enter a valid username and password.");
    }
  });

// Feed functionality
let currentPage = 1;
const feedContainer = document.querySelector(".feed");
let isLoading = false;

function createPostElement(i) {
  const post = document.createElement("div");
  post.classList.add("post");
  post.innerHTML = `
      <div class="post-header">
          <a href="account.html"><img src="https://picsum.photos/40?random=${currentPage}-${i}" alt="Profile image of Username" class="profile-img" /></a>
          <p><strong>Multigram User</strong></p>
      </div>
      <img src="https://picsum.photos/400/500?random=${currentPage}-${i}" alt="Description of the post image" class="post-img" />
      <div class="post-actions">
          <button class="like-button">❤️ Like</button>
          <button class="comment-button">💬 Comment</button>
      </div>
      <div class="post-info">
          <p>Caption for the image goes here.</p>
      </div>
    `;
  return post;
}

function loadPosts() {
  if (isLoading) return;
  isLoading = true;

  setTimeout(() => {
    if (Math.random() < 0.2) {
      alert("Failed to load posts. Please try again.");
      isLoading = false;
      return;
    }

    for (let i = 0; i < 5; i++) {
      const post = createPostElement(i);
      feedContainer.appendChild(post);
    }
    isLoading = false;
  }, 500);
}

if (feedContainer) {
  loadPosts();

  let debounceTimer;
  window.addEventListener("scroll", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isLoading
      ) {
        currentPage++;
        loadPosts();
      }
    }, 200);
  });

  feedContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      console.log("Liked!");
    } else if (event.target.classList.contains("comment-button")) {
      console.log("Commented!");
    }
  });
}
