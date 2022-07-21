import { useEffect, useRef, useState } from 'react'

import useInterval from '../../hooks/useInterval'
import styles from '../../../styles/Game.module.css'

const tileData = []
const snakeTileIndexs = []
const appleTileIndexs = []
let running = true

let snakeDir = {x: 0, y: 1}

const Game = ({ wn, canvasSize }) => {
    const c = useRef(null)

    const gridSize = 16
    const gameSpeed = 150
    const canvasColor = "rgb(10, 10, 10)"
    const snakeColor = "green"
    const appleColor = "red"
    const snakeLength = 4
    const snakeStartPos = {x: 0, y: 0}
    const applesCount = 3

    const tileSize = Math.ceil(canvasSize / gridSize)

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

    const addTileByIndex = (tileIndex, tile) => {
        
        tileData.splice(
            tileIndex, 
            1,
            tile
        )
    }

    const getTileIndex = (x, y) => {
        return tileData.findIndex(
            tile => 
            tile.x == x &&
            tile.y == y
        )
    }

    const spawnApple = () => {
        const possibleSpawns = tileData.filter(
            (tile, index) => 
            !(snakeTileIndexs.some( 
                snakeTileIndex => index == snakeTileIndex
            ) &&
            appleTileIndexs.some(
                appleTileIndex => index == appleTileIndex
            )) 
        )

        const replaced = possibleSpawns[
            Math.floor(
                Math.random() * tileData.length
            ) - 1
        ]

        return addTile({x: replaced.x, y: replaced.y, color: appleColor, type: "apple"})
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

        //initalApples

        for (let i = 0; i < applesCount; i++) {
            appleTileIndexs.push(
                spawnApple()
            )
        }

    }, [])

    useInterval(() => {
        if (!running) return

        //add head

        const head = tileData[snakeTileIndexs[snakeTileIndexs.length - 1]]

        //

        const newHeadPos = {x: head.x + snakeDir.x, y: head.y + snakeDir.y}

        if (newHeadPos.x >= gridSize || newHeadPos.y >= gridSize || newHeadPos.x < 0 || newHeadPos.y < 0) {
            running = false
            updateTiles()
            return
        }

        //

        const newHeadIndex = getTileIndex(newHeadPos.x, newHeadPos.y)
        const newHead = tileData[newHeadIndex]

        if (snakeTileIndexs.some(snakeTileIndex => snakeTileIndex == newHeadIndex)) {
            running = false
            updateTiles()
            return
        }

        if (!appleTileIndexs.some(
            (appleTileIndex, index) => {
                if (appleTileIndex == newHeadIndex) {
                    appleTileIndexs.splice(index, 1)
                }

                if (appleTileIndexs.length < applesCount) {
                    appleTileIndexs.push(
                        spawnApple()
                    )
                }

                return appleTileIndex == newHeadIndex
            }
        )) {
            //remove tail

            const removedTailIndex = snakeTileIndexs.shift()
            const removedTail = tileData[removedTailIndex]
        
            addTileByIndex(removedTailIndex, {x: removedTail.x, y: removedTail.y, type: "empty", color: canvasColor})
        } 

        addTileByIndex(newHeadIndex, {x: newHead.x, y: newHead.y, type: "snake", color: snakeColor})

        snakeTileIndexs.push(
            newHeadIndex
        )
        
        updateTiles()
    }, gameSpeed)

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