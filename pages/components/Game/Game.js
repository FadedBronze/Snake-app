import { useEffect, useRef, useState } from 'react'

import useInterval from '../../hooks/useInterval'
import styles from '../../../styles/Game.module.css'

const tileData = []
const snakeTileIndexs = []
let snakeDir = {x: 0, y: 1}

const Game = ({ wn, canvasSize }) => {
    const c = useRef(null)

    const gridSize = 25
    const tileSize = Math.ceil(canvasSize / gridSize)
    const canvasColor = "rgb(10, 10, 10)"
    const snakeColor = "green"
    const snakeLength = 10
    const snakeStartPos = {x: 0, y: 0}

    const updateTiles = () => {
        const ctx = c.current.getContext('2d')

        tileData.map(tile => {
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

        updateTiles()

        //
        
    }, [])

    useInterval(() => {
        const removedTail = tileData[snakeTileIndexs.shift()]

        addTile({x: removedTail.x, y: removedTail.y, type: "empty", color: canvasColor})

        const head = tileData[snakeTileIndexs[snakeTileIndexs.length - 1]]

        snakeTileIndexs.push(
            addTile({x: head.x + snakeDir.x, y: head.y + snakeDir.y, type: "snake", color: snakeColor})
        )

        updateTiles()
    }, 100)

    useEffect(() => {
        updateTiles()
    }, [wn])

    return ( 
        <canvas 
          ref={c}
          className={styles.gameCanvas} 
          width={canvasSize}
          height={canvasSize}
          tabIndex="0"
          onKeyDown={(e) => {

            if (e.key == "ArrowUp") {
                snakeDir = {x: 0, y: -1}
            }
            
            if (e.key == "ArrowDown") {
                snakeDir = {x: 0, y: 1}
            }
            
            if (e.key == "ArrowLeft") {
                snakeDir = {x: -1, y: 0}
            }

            if (e.key == "ArrowRight") {
                snakeDir = {x: 1, y: 0}
            }

            console.log(snakeDir)
          }}
        />
    );
}

export default Game;