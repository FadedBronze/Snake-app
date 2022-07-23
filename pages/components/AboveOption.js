import styles from '../../styles/TopOption.module.css'
import Image from 'next/dist/client/image';

const TopOption = (img, setState) => {
    return (  
        <button className={styles.TopOption} onClick={() => setState(true)}>
            <img src={img} />
        </button>
    )
}
 
export default TopOption;