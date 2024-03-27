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
                <span id="likes-${post._id}">${post.likes} likes</span>, <span id="dislikes-${post._id}">${post.dislikes} dislikes</span>
                ${post.author.username === currentUser.username ? `<button onclick="editPost('${post._id}')">Edit</button><button onclick="deletePost('${post._id}')">Delete</button>` : ''}
            </div>
            <div id="comments-${post._id}">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <h3>${comment.author.username}</h3>
                        <p>${comment.content}</p>
                        <small>${new Date(comment.date).toLocaleString()}</small>
                        ${comment.author._id === currentUser._id ? `<button onclick="editComment('${comment._id}')">Edit</button><button onclick="deleteComment('${comment._id}')">Delete</button>` : ''}
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

async function submitComment(event, postId) {
    event.preventDefault();
    const content = document.getElementById(`comment-${postId}`).value;
    const response = await fetch(`/forum/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content }),
    });
    if (response.ok) {
        fetchAndDisplayPosts(); // Refresh posts
        document.getElementById(`comment-${postId}`).value = '';
    } else {
        console.error(`Error: ${response.status}`);
    }
}

async function editComment(commentId) {
    const newContent = prompt('Enter new content for the comment:');
    const response = await fetch(`/forum/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
    });
    if (response.ok) {
        fetchAndDisplayPosts(); // Refresh posts
    } else {
        console.error(`Error: ${response.status}`);
    }
}

async function deleteComment(commentId) {
    const response = await fetch(`/forum/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        fetchAndDisplayPosts(); // Refresh posts
    } else {
        console.error(`Error: ${response.status}`);
    }
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

async function likePost(postId) {
    const response = await fetch(`/forum/${postId}/like`, {
        method: 'POST',
    });
    if (response.ok) {
        const post = await response.json();
        document.getElementById(`likes-${postId}`).textContent = `${post.likes} likes`;
        // Also update the dislike count
        document.getElementById(`dislikes-${postId}`).textContent = `${post.dislikes} dislikes`;
    } else {
        console.error(`Error: ${response.status}`);
    }
}

async function dislikePost(postId) {
    const response = await fetch(`/forum/${postId}/dislike`, {
        method: 'POST',
    });
    if (response.ok) {
        const post = await response.json();
        document.getElementById(`dislikes-${postId}`).textContent = `${post.dislikes} dislikes`;
        // Also update the like count
        document.getElementById(`likes-${postId}`).textContent = `${post.likes} likes`;
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

