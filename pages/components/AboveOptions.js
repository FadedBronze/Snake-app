import styles from '../../styles/TopOptions.module.css'
import TopOption from './AboveOption';

function TopOptions({ paused, setPaused, restart, setRestart }) {
    return ( 
        <div className={styles.TopOptions}>
            <TopOption img={''} onOff={ value => setPaused(!paused) } />
            <TopOption img={''} onOff={ value => {setRestart(true); setPaused(true)} } />
        </div>
    )
}
 
export default TopOptions;