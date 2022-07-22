import styles from '../../styles/SideOptions.module.css';
import Input from './Input';

const SideOptions = ({size}) => {
    return ( 
        <nav style={{width: size}} className={styles.SideOptionsMenu}>
            <Input type={"color"} label={"snake color"} setState={() => 0} />
            <Input type={"color"} label={"background color"} setState={() => 0} />
            <Input type={"color"} label={"apple color"} setState={() => 0} />

            <Input type={"number"} label={"game speed"} setState={() => 0} />
            <Input type={"number"} label={"grid size"} setState={() => 0} />
            <Input type={"number"} label={"snake size"} setState={() => 0} />
            <Input type={"number"} label={"apples"} setState={() => 0} />
        </nav>
    )
}
 
export default SideOptions;