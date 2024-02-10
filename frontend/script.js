let userMessages = [];
let assistantMessages = [];

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';
    userBubble.textContent = message;
    document.getElementById('fortuneResponse').appendChild(userBubble);

    userMessages.push(messageInput.value);

    messageInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                userMessages: userMessages,
                assistantMessages: assistantMessages,
             })
        });

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();
        console.log('Response:', data.assistant);

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot-bubble';
        botBubble.textContent = data.assistant;
        document.getElementById('fortuneResponse').appendChild(botBubble);

        assistantMessages.push(data.assistant);
    } catch (error) {
        console.error('Error:', error);
    }
}
