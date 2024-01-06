import socket from '../socket'

function handleStartPrivateGame(connectionMode, gameMode, setIsHost) {
    return new Promise((resolve, reject) => {
        socket.emit('createRoom', connectionMode, gameMode)

        socket.on('roomCreated', (roomId) => {
            setIsHost(true)
            resolve(roomId)
        })

        socket.on('error', reject)
        setTimeout(() => reject(new Error('Timeout')), 5000)
    })
}

function handleStartPublicGame(connectionMode, gameMode) {
    return new Promise((resolve, reject) => {
        socket.emit('findMatch', gameMode)

        socket.on('matchFound', (roomId) => {
            handleMatchFound(roomId)
        })
        socket.on('noMatchesFound', () => {
            handleNoMatchesFound(connectionMode, gameMode)
        })
        socket.on('roomCreated', (roomId) => {
            handleRoomCreated(roomId)
        })
        socket.on('error', reject)
        setTimeout(() => reject(new Error('Timeout')), 5000)

        function handleMatchFound(roomId) {
            cleanupAllSocketListeners()
            resolve(roomId)
        }
        
        function handleNoMatchesFound(connectionMode, gameMode) {
            socket.emit('createRoom', connectionMode, gameMode)
            socket.off('matchFound')
            socket.off('noMatchesFound')
        }
        
        function handleRoomCreated(roomId) {
            cleanupAllSocketListeners()
            resolve(roomId)
        }
        
        function cleanupAllSocketListeners() {
            socket.off('matchFound')
            socket.off('noMatchesFound')
            socket.off('roomCreated')
            socket.off('error')
        }
    })
}

export { handleStartPrivateGame, handleStartPublicGame }