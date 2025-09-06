// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Native WebSocket Client</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             max-width: 800px;
//             margin: 0 auto;
//             padding: 20px;
//             background: #f5f5f5;
//         }
//         .container {
//             background: white;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
//         .status {
//             padding: 10px;
//             margin: 10px 0;
//             border-radius: 4px;
//             font-weight: bold;
//         }
//         .connected { background: #d4edda; color: #155724; }
//         .disconnected { background: #f8d7da; color: #721c24; }
//         .connecting { background: #fff3cd; color: #856404; }
//         #messages {
//             height: 300px;
//             overflow-y: auto;
//             border: 1px solid #ddd;
//             padding: 10px;
//             margin: 10px 0;
//             background: #fafafa;
//         }
//         .message {
//             margin: 5px 0;
//             padding: 5px;
//             border-left: 3px solid #007bff;
//             background: white;
//         }
//         .sent { border-left-color: #28a745; }
//         .received { border-left-color: #17a2b8; }
//         .system { border-left-color: #ffc107; background: #fff3cd; }
//         input, button {
//             padding: 8px 12px;
//             margin: 5px;
//             border: 1px solid #ddd;
//             border-radius: 4px;
//         }
//         button {
//             background: #007bff;
//             color: white;
//             cursor: pointer;
//         }
//         button:hover { background: #0056b3; }
//         button:disabled {
//             background: #6c757d;
//             cursor: not-allowed;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>Native WebSocket Client</h1>
        
//         <div id="status" class="status disconnected">Disconnected</div>
        
//         <div>
//             <input type="text" id="serverUrl" placeholder="ws://localhost:8080" value="ws://echo.websocket.org">
//             <button id="connectBtn">Connect</button>
//             <button id="disconnectBtn" disabled>Disconnect</button>
//         </div>
        
//         <div id="messages"></div>
        
//         <div>
//             <input type="text" id="messageInput" placeholder="Enter message..." disabled>
//             <button id="sendBtn" disabled>Send</button>
//         </div>
        
//         <div style="margin-top: 20px;">
//             <h3>Features Demonstrated:</h3>
//             <ul>
//                 <li>Connection management</li>
//                 <li>Message sending/receiving</li>
//                 <li>Connection status tracking</li>
//                 <li>Error handling</li>
//                 <li>Automatic reconnection attempt</li>
//             </ul>
//         </div>
//     </div>

//     <script>
//         class WebSocketClient {
//             constructor() {
//                 this.ws = null;
//                 this.url = '';
//                 this.reconnectAttempts = 0;
//                 this.maxReconnectAttempts = 5;
//                 this.reconnectDelay = 1000;
                
//                 this.initializeElements();
//                 this.attachEventListeners();
//             }
            
//             initializeElements() {
//                 this.statusEl = document.getElementById('status');
//                 this.messagesEl = document.getElementById('messages');
//                 this.serverUrlInput = document.getElementById('serverUrl');
//                 this.messageInput = document.getElementById('messageInput');
//                 this.connectBtn = document.getElementById('connectBtn');
//                 this.disconnectBtn = document.getElementById('disconnectBtn');
//                 this.sendBtn = document.getElementById('sendBtn');
//             }
            
//             attachEventListeners() {
//                 this.connectBtn.addEventListener('click', () => this.connect());
//                 this.disconnectBtn.addEventListener('click', () => this.disconnect());
//                 this.sendBtn.addEventListener('click', () => this.sendMessage());
                
//                 this.messageInput.addEventListener('keypress', (e) => {
//                     if (e.key === 'Enter') {
//                         this.sendMessage();
//                     }
//                 });
//             }
            
//             connect() {
//                 this.url = this.serverUrlInput.value.trim();
//                 if (!this.url) {
//                     this.addMessage('Please enter a valid WebSocket URL', 'system');
//                     return;
//                 }
                
//                 try {
//                     this.updateStatus('connecting', 'Connecting...');
//                     this.ws = new WebSocket(this.url);
                    
//                     this.ws.onopen = (event) => {
//                         this.onOpen(event);
//                     };
                    
//                     this.ws.onmessage = (event) => {
//                         this.onMessage(event);
//                     };
                    
//                     this.ws.onclose = (event) => {
//                         this.onClose(event);
//                     };
                    
//                     this.ws.onerror = (event) => {
//                         this.onError(event);
//                     };
                    
//                 } catch (error) {
//                     this.addMessage(`Connection error: ${error.message}`, 'system');
//                     this.updateStatus('disconnected', 'Disconnected');
//                 }
//             }
            
//             disconnect() {
//                 if (this.ws) {
//                     this.ws.close();
//                 }
//             }
            
//             sendMessage() {
//                 const message = this.messageInput.value.trim();
//                 if (!message || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
//                     return;
//                 }
                
//                 try {
//                     this.ws.send(message);
//                     this.addMessage(message, 'sent');
//                     this.messageInput.value = '';
//                 } catch (error) {
//                     this.addMessage(`Send error: ${error.message}`, 'system');
//                 }
//             }
            
//             onOpen(event) {
//                 this.updateStatus('connected', 'Connected');
//                 this.addMessage('Connected to server', 'system');
//                 this.reconnectAttempts = 0;
                
//                 // Enable UI elements
//                 this.messageInput.disabled = false;
//                 this.sendBtn.disabled = false;
//                 this.connectBtn.disabled = true;
//                 this.disconnectBtn.disabled = false;
//                 this.serverUrlInput.disabled = true;
//             }
            
//             onMessage(event) {
//                 this.addMessage(event.data, 'received');
//             }
            
//             onClose(event) {
//                 this.updateStatus('disconnected', 'Disconnected');
//                 this.addMessage(`Connection closed. Code: ${event.code}, Reason: ${event.reason}`, 'system');
                
//                 // Disable UI elements
//                 this.messageInput.disabled = true;
//                 this.sendBtn.disabled = true;
//                 this.connectBtn.disabled = false;
//                 this.disconnectBtn.disabled = true;
//                 this.serverUrlInput.disabled = false;
                
//                 // Attempt reconnection if it wasn't a clean close
//                 if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
//                     this.attemptReconnect();
//                 }
//             }
            
//             onError(event) {
//                 this.addMessage('WebSocket error occurred', 'system');
//                 console.error('WebSocket error:', event);
//             }
            
//             attemptReconnect() {
//                 this.reconnectAttempts++;
//                 this.addMessage(`Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}...`, 'system');
                
//                 setTimeout(() => {
//                     if (this.reconnectAttempts <= this.maxReconnectAttempts) {
//                         this.connect();
//                     }
//                 }, this.reconnectDelay * this.reconnectAttempts);
//             }
            
//             updateStatus(type, text) {
//                 this.statusEl.className = `status ${type}`;
//                 this.statusEl.textContent = text;
//             }
            
//             addMessage(text, type) {
//                 const messageEl = document.createElement('div');
//                 messageEl.className = `message ${type}`;
//                 messageEl.innerHTML = `<strong>${new Date().toLocaleTimeString()}</strong> ${text}`;
//                 this.messagesEl.appendChild(messageEl);
//                 this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
//             }
//         }
        
//         // Initialize the WebSocket client
//         const wsClient = new WebSocketClient();
//     </script>
// </body>
// </html>