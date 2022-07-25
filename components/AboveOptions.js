import styles from '../styles/TopOptions.module.css'
import TopOption from './AboveOption';
import pauseImage from '../public/pause.png'
import reloadImage from '../public/reload.png'

function TopOptions({ paused, setPaused, restart, setRestart }) {
    return ( 
        <div className={styles.TopOptions}>
            <TopOption img={pauseImage} onOff={ value => setPaused(!paused) } />
            <TopOption img={reloadImage} onOff={ value => {setRestart(true); setPaused(true)} } />
        </div>
    )
}
 
export default TopOptions;