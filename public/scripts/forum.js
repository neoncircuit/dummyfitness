// Function to create a new post element
function createPostElement(post, currentUser) {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
        <div class="post">
            <div class="post-header">
                <div class="post-info">
                    <h2>${post.topic}</h2>
                    <p>${post.author.username}</p>
                    <p>(${post.author.country})</p>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
            </div>
            <div class="post-actions">
                <button onclick="likePost('${post._id}')">Like</button>
                <button onclick="dislikePost('${post._id}')">Dislike</button>
                <span>${post.likes} likes, ${post.dislikes} dislikes</span>
                ${post.author.username === currentUser.username ? `<button onclick="editPost('${post._id}')">Edit</button><button onclick="deletePost('${post._id}')">Delete</button>` : ''}
            </div>
            <div id="comments-${post._id}">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <h3>${comment.author.username}</h3>
                        <p>${comment.content}</p>
                        <small>${new Date(comment.date).toLocaleString()}</small>
                    </div>
                `).join('')}
            </div>
            <form onsubmit="submitComment(event, '${post._id}')">
                <input type="text" id="comment-${post._id}" placeholder="Write a comment...">
                <button type="submit">Comment</button>
            </form>
        </div>
    `;
    return postElement;
}


function updateCharacterCount() {
    const content = document.getElementById('content').value;
    const characterCount = document.getElementById('characterCount');
    characterCount.textContent = `${content.length} / 2000`;
}

// Function to submit a new post
async function submitPost(event) {
    event.preventDefault();
    const topic = document.getElementById('topic').value;
    const content = document.getElementById('content').value;
    if (content.length > 2000) {
        alert('Post content cannot exceed 2000 characters.');
        return;
    }
    const response = await fetch('/forum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic, content: content }),
    });
    const post = await response.json();
    fetchAndDisplayPosts(); // Refresh posts
    document.getElementById('topic').value = '';
    document.getElementById('content').value = '';
}

// Function to edit a post
async function editPost(postId) {
    const newContent = prompt('Enter new content for the post:');
    if (newContent.length > 2000) {
        alert('Post content cannot exceed 2000 characters.');
        return;
    }
    const response = await fetch(`/forum/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
    });
    if (response.ok) {
        const post = await response.json();
        fetchAndDisplayPosts(); // Refresh posts
        document.getElementById('topic').value = '';
        document.getElementById('content').value = '';
    } else {
        console.error(`Error: ${response.status}`);
    }
}

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
    try {
        const response = await fetch('/forum');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const posts = data.posts;
        const currentUser = data.currentUser;
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';
        for (let post of posts) {
            const postElement = createPostElement(post, currentUser);
            postsContainer.appendChild(postElement);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to like a post
async function likePost(postId) {
    const response = await fetch(`/forum/${postId}/like`, {
        method: 'POST',
    });
    if (response.ok) {
        fetchAndDisplayPosts(); // Refresh posts
    } else {
        console.error(`Error: ${response.status}`);
    }
}

// Function to dislike a post
async function dislikePost(postId) {
    const response = await fetch(`/forum/${postId}/dislike`, {
        method: 'POST',
    });
    if (response.ok) {
        fetchAndDisplayPosts(); // Refresh posts
    } else {
        console.error(`Error: ${response.status}`);
    }
}

// Function to delete a post
async function deletePost(postId) {
    const response = await fetch(`/forum/${postId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        fetchAndDisplayPosts(); // Refresh posts
    } else {
        console.error(`Error: ${response.status}`);
    }
}

// Attach the submitPost function to the form submit event
document.getElementById('newPostForm').addEventListener('submit', submitPost);

// Call fetchAndDisplayPosts when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);

//document.addEventListener('DOMContentLoaded', () => fetchAndDisplayPosts(currentUser));