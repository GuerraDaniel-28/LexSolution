import Fondo3 from '../Imagenes/Fondo3.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/navegacionIs.module.css'

export const Bajoin = () => {
  return (
    <div className={styles.bgimage}>
      <div className="text-center d-flex align-items-center justify-content-center vh-100">
        <h1 className="text-white display-1" style={{ fontFamily: 'DM Serif Display', textSizeAdjust: "auto" }}>
          LexSolution
        </h1>
      </div>
    </div>
  )
}
