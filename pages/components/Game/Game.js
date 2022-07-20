import { useEffect, useRef, useState } from 'react'

import styles from '../../../styles/Game.module.css'

const Game = ({ wn, canvasSize }) => {
    const c = useRef(null)
    const tileData = []
    const gridSize = 20
    const tileSize = canvasSize / gridSize
    const canvasColor = "rgb(10, 10, 10)"

    const updateTiles = () => {
        tileData.map(tile => {
            const ctx = c.current.getContext('2d')
            ctx.fillStyle = tile.color
            ctx.fillRect(tile.x * tileSize + 1, tile.y * tileSize + 1, tileSize - 2, tileSize - 2)
        })
    }

    const addTile = (tile) => {
        tileData.splice(
            tileData.findIndex(_tile => _tile.x == tile.x && _tile.y == tile.y), 
            1,
            tile
        )
    }

    useEffect(() => {
        console.log(wn)
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                tileData.push({ x: j, y: i, type: "empty", color: canvasColor })
            }
        }

        addTile({ x: 9, y: 9, type: "apple", color: "red" })
        addTile({ x: 8, y: 8, type: "apple", color: "red" })
        addTile({ x: 7, y: 7, type: "apple", color: "red" })
        addTile({ x: 6, y: 6, type: "apple", color: "red" })
        addTile({ x: 5, y: 5, type: "apple", color: "red" })
        addTile({ x: 4, y: 4, type: "apple", color: "red" })
        addTile({ x: 3, y: 3, type: "apple", color: "red" })
        addTile({ x: 2, y: 2, type: "apple", color: "red" })
        addTile({ x: 1, y: 1, type: "apple", color: "red" })
        addTile({ x: 0, y: 0, type: "apple", color: "red" })

        console.log(tileData)
        updateTiles()
    }, [wn])

    return ( 
        <canvas 
          ref={c}
          className={styles.gameCanvas} 
          width={canvasSize}
          height={canvasSize}
        />
    );
}

export default Game;