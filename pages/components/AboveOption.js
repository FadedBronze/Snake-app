import styles from '../../styles/TopOption.module.css'
import Image from 'next/dist/client/image';

const TopOption = ({img, onOff}) => {
    return (  
        <button className={styles.TopOption} onClick={onOff}>
            <Image responsive="true" src={img} width={120} height={120} />
        </button>
    )
}
 
export default TopOption;