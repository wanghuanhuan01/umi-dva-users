import styles from './index.css';
import Header from './Header';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
      <Header location={props.location} />
      {props.children}
    </div>
  );
}

export default BasicLayout;
