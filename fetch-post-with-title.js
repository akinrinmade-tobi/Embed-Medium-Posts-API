function fetchCodeSnippetPosts(username, count) {
    const mediumUsername = username || 'akinrinmade-tobi';
    const mediumAPI = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
    const postCount = count || 3;

    fetch(mediumAPI)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                const codePosts = data.items
                    .filter(post => post.title.toLowerCase().includes('code')) // Looking for blog titles with the keyword "Code"
                    .slice(0, postCount);
                displayCodeSnippetPosts(codePosts);
            }
        })
        .catch(error => console.error('Error fetching Medium posts:', error));
}

function displayCodeSnippetPosts(posts) {
    const codeSnippetContainer = document.getElementById('code-snippet');
    codeSnippetContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('col-md-4', 'mb-4');

        // Use the first image in the post body as the thumbnail
        const thumbnailSrc = getFirstImage(post.content) || 'https://placehold.it/300x200'; // Placeholder image if no image found

        // Use the first text paragraph in the post body as the card text
        const cardText = getFirstParagraph(post.content, 95);

        postElement.innerHTML = `
            <div class="card medium-post">
                <img src="${thumbnailSrc}" class="card-img-top" alt="Post Image">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${cardText}</p>
                </div>
                <div class="card-footer">
                    <a href="${post.link}" class="button-card stretched-link" target="_blank">Read more</a>
                </div>
            </div>
        `;

        codeSnippetContainer.appendChild(postElement);
    });
}

// Function to extract the first image from the post content
function getFirstImage(content) {
    const matches = content.match(/<img[^>]+src="([^">]+)"/);
    return matches ? matches[1] : null;
}

// Function to extract the first text paragraph from the post content
function getFirstParagraph(content, maxLength) {
    const matches = content.match(/<p>(.+?)<\/p>/);
    const firstParagraph = matches ? matches[1] : '';
    return firstParagraph.length > maxLength ? `${firstParagraph.substring(0, maxLength)}...` : firstParagraph;
}

// Fetch the latest 3 code-related posts from the Medium page
fetchCodeSnippetPosts('akinrinmade-tobi', 3);
