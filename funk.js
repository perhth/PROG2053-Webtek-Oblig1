
let currentPage = 1;
const postsPerPage = 6; // 6 poster per side

loadPosts(currentPage); 


// Hovedfunksjon for å hente API innhold
function loadPosts(page) {
  const postContainer = document.querySelector('.post-cont');
  
  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`)
    .then(response => response.json())
    .then(posts => {
      // Loop gjennom og lag poster
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        // Post strukturen
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>`;

        postContainer.appendChild(postElement); 
      });

      // For å sørge for at den laster inn selv om siden er i fullscreen og 
      // ikke kan scrolle for å aktivere innlastning av nye poster.
      if (window.innerHeight >= document.body.offsetHeight) {
        currentPage++; 
        loadPosts(currentPage);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Dynamisk innlastning av poster
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100){
    currentPage++;
    loadPosts(currentPage);
  }
});




