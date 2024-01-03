import React from 'react'

import GameBoard from './GameBoard'

function GameBoardContainer({
    connectionMode,
    board,
    username,
    userInfo,
}) {

    function otherUserInfo() {
        return userInfo.slice(1) || []
    }

  return (
    <>
        {connectionMode === 'offline' ? (
            <GameBoard board={board} username={username} connectionMode={connectionMode}/>
        ) : (
            <div className='boards-container'>
                {userInfo.length > 0 && (
                    <GameBoard
                    key={userInfo[0].userId}
                    board={board}
                    username={userInfo[0].username}
                    points={userInfo[0].points}
                    connectionMode={connectionMode}
                    isUserBoard={true}
                    />
                )}
                {otherUserInfo().map((obj) => (
                    <GameBoard
                        key={obj.userId}
                        board={obj.gameBoard}
                        username={obj.username}
                        points={obj.points}
                        connectionMode={connectionMode}
                        isUserBoard={false}
                    />
                ))}
            </div>
        )}
    </>

  )
}

export default GameBoardContainer