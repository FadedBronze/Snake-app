import styles from '../styles/SideOptions.module.css';
import Input from './Input';

const SideOptions = ({size, setSpeed, setGridSize, setSnakeLength, setApplesCount}) => {
    return ( 
        <nav style={{width: size}} className={styles.SideOptionsMenu}>
            <Input type={"number"} label={"game speed"} setState={setSpeed} />
            <Input type={"number"} label={"grid size"} setState={setGridSize} />
            <Input type={"number"} label={"snake size"} setState={setSnakeLength} />
            <Input type={"number"} label={"apples"} setState={setApplesCount} />
        </nav>
    )
}
 
export default SideOptions;