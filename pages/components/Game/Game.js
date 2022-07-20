import { useEffect, useRef, useState } from 'react'

import styles from '../../../styles/Game.module.css'

const tileData = []
const snakeTileIndexs = []

const Game = ({ wn, canvasSize }) => {
    const c = useRef(null)

    const gridSize = 15
    const tileSize = Math.ceil(canvasSize / gridSize)
    const canvasColor = "rgb(10, 10, 10)"
    const snakeColor = "green"
    const snakeLength = 10
    const snakeStartPos = {x: 0, y: 0}

    const updateTiles = () => {
        tileData.map(tile => {
            const ctx = c.current.getContext('2d')
            ctx.fillStyle = tile.color
            ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize)
        })
    }

    const addTile = (tile) => {
        
        let replaced = tileData.findIndex(
            oldtile => 
            oldtile.x == tile.x &&
            oldtile.y == tile.y
        )

        console.log(replaced, tile)

        tileData.splice(
            replaced, 
            1,
            tile
        )

        return replaced
    }

    useEffect(() => {
        if (tileData.length > 0) return

        //setting up game tiles
    
        console.log(wn)
    
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                tileData.push({ x: j, y: i, type: "empty", color: canvasColor })
            }
        }

        //creating snake tiles

        for (let i = 0; i < snakeLength; i++) {
            snakeTileIndexs.push(
                addTile({ x: i + snakeStartPos.x, y: snakeStartPos.y, type: "snake", color: snakeColor })
            )
        }

        console.log(tileData)

        updateTiles()

        //

        setInterval(() => {
            console.log('ran')
        }, 70)
    }, [])

    useEffect(() => {
        updateTiles()

        console.log(tileData)
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