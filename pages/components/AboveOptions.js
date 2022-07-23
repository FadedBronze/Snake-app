import styles from '../../styles/TopOptions.module.css'
import TopOption from './AboveOption';

function TopOptions() {
    return ( 
        <div className={styles.TopOptions}>
            <TopOption img={"#"} setState={value => value} />
            <TopOption img={"#"} setState={value => value} />
            <TopOption img={"#"} setState={value => value} />
            <TopOption img={"#"} setState={value => value} />
        </div>
    )
}
 
export default TopOptions;