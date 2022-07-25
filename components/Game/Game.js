import { useEffect, useRef, useState } from 'react'

import useInterval from '../../hooks/useInterval'
import styles from '../../styles/Game.module.css'

let tileData = []
let snakeTileIndexs = []
let appleTileIndexs = []
let running = true

let snakeDir = {x: 0, y: 1}

const Game = ({ wn, canvasSize, paused, setPaused, restart, setRestart, speed, gridSize, snakeLength, applesCount}) => {
    const c = useRef(null)

    const canvasColor = "rgb(0, 150, 0)"
    const appleColor = "rgb(200, 50, 75)"
    const snakeColor = "rgb(0, 200, 0)"

    const snakeStartPos = {x: 0, y: 0}
    const tileSize = canvasSize / gridSize

    const updateTiles = () => {
        const ctx = c.current.getContext('2d')

        tileData.map(tile => {
            ctx.fillStyle = tile.type === "snake" ? snakeColor : 
                            tile.type === "apple" ? appleColor : 
                            tile.type === "empty" ? canvasColor : 
                            "white"
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
        const possibleSpawns = tileData.filter((tile, index) => 
        
            !snakeTileIndexs.some(
                snakeTileIndex => index == snakeTileIndex
            ) && 
            !appleTileIndexs.some(
                appleTileIndex => index == appleTileIndex
            )
        )

        const replacedIndex = Math.floor(
            Math.random() * (possibleSpawns.length)
        )

        const replaced = possibleSpawns[
            replacedIndex
        ]
        
        console.log(replaced, "replaced", replacedIndex, "index", appleTileIndexs, "apples")
        
        appleTileIndexs.push(
            addTile({x: replaced.x, y: replaced.y, type: "apple"})       
        )
    }

    const init = () => {

        running = true
        snakeDir = {x: 0, y: 1}
        tileData = []
        snakeTileIndexs = []
        appleTileIndexs = []

        c.current.focus()

        //setting up game tiles
    
    
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                tileData.push({ x: j, y: i, type: "empty" })
            }
        }

        //creating snake tiles

        for (let i = 0; i < snakeLength; i++) {
            snakeTileIndexs.push(
                addTile({ x: i + snakeStartPos.x, y: snakeStartPos.y, type: "snake" })
            )
        }

        updateTiles()

        //initalApples

        for (let i = 0; i < applesCount; i++) {
            spawnApple()
        }
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (restart == true) {
            setRestart(false)
            init()
        }
    }, [restart])

    useEffect(() => {
        c.current.focus()
    }, [paused])

    useInterval(() => {
        if (!running || paused) return

        //console.log(appleTileIndexs, snakeTileIndexs)

        //add head

        const head = tileData[snakeTileIndexs[snakeTileIndexs.length - 1]]

        //

        const newHeadPos = {x: head.x + snakeDir.x, y: head.y + snakeDir.y}

        if (newHeadPos.x >= gridSize || newHeadPos.y >= gridSize || newHeadPos.x < 0 || newHeadPos.y < 0) {
            running = false
            return
        }

        //

        const newHeadIndex = getTileIndex(newHeadPos.x, newHeadPos.y)
        const newHead = tileData[newHeadIndex]

        if (snakeTileIndexs.some(snakeTileIndex => snakeTileIndex == newHeadIndex)) {
            running = false
            return
        }

        let eatenApple = appleTileIndexs.findIndex(
            (appleTileIndex) => appleTileIndex == newHeadIndex
        )

        if (eatenApple == -1) {
            //remove tail

            const removedTailIndex = snakeTileIndexs.shift()
            const removedTail = tileData[removedTailIndex]
        
            addTileByIndex(removedTailIndex, {x: removedTail.x, y: removedTail.y, type: "empty"})
            
        } else {

            appleTileIndexs.splice(eatenApple, 1)
            spawnApple()
        }

        addTileByIndex(newHeadIndex, {x: newHead.x, y: newHead.y, type: "snake"})

        snakeTileIndexs.push(
            newHeadIndex
        )
        
        updateTiles()
    }, speed)

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

            if (e.key == "p") {
                setPaused(!paused)
            }

            if (e.key == "r") {
                if (restart == false) {
                    setRestart(true)
                    setPaused(true)
                }
            }

          }}
        />
    );
}

export default Game;