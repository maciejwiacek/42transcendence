const {
	handlePrivateChatConnection,
	sendMessageToFriend,
} = require('../services/privateChatService')

const privateChatHandler = (socket, req) => {
	const userId = req.params.userId

	if (!userId) {
		socket.close(4000, 'User ID is required')
		return
	}

	handlePrivateChatConnection(userId, socket)

	socket.on('message', (message) => {
		const parsedMessage = JSON.parse(message.toString())
		const recipientId = parsedMessage.recipientId
		const text = parsedMessage.text

		sendMessageToFriend(userId, recipientId, text)
	})

	socket.on('close', () => {
		handlePrivateChatDisconnection(userId, socket)
	})
}

module.exports = { privateChatHandler }
