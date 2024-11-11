// Generate random chat code
document.getElementById('generate-code-btn').addEventListener('click', function() {
    let code = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a random 6-character alphanumeric code
    document.getElementById('chat-code').textContent = code;  // Display the generated code
});

// Simulate Join Chat functionality
document.getElementById('join-chat-btn').addEventListener('click', function() {
    let enteredCode = document.getElementById('join-code-input').value;

    if (enteredCode) {
        alert("Joining chat with code: " + enteredCode);
    } else {
        alert("Please enter a code to join the chat.");
    }
});
