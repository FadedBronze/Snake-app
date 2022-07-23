import styles from '../../styles/TopOption.module.css'
import Image from 'next/dist/client/image';

const TopOption = ({img, onOff}) => {
    return (  
        <button className={styles.TopOption} onClick={onOff}>
            <img src={img} />
        </button>
    )
}
 
export default TopOption;