import styles from '../../styles/Input.module.css'

const Input = ({ type, label, setState }) => {

    return ( 
        <div className={styles.Input}>
            <h1>{label}:</h1>
            <input type={type} onChange={
                e => {
                    setState(e.target.value)
                }
            }/>
        </div>
    )
}
 
export default Input;