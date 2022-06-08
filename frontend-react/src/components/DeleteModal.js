import '../theme/modal.css'
import formStyles from "../theme/DeleteModal.module.css"
import dataService from '../services/data.service';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const DelteModal = ({ handleClose, show, children, record, update }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <div className={formStyles.login_container}>
            <section class={formStyles.logins}>
                <header>
                    <h2>Delete?</h2>
                </header>
                <h5 className={formStyles.noti}>This action cannot be undone</h5>
                <button className={formStyles.register_button} onClick={ () => {
                  dataService.deleteData(record.id, update)
                  toast('Record deleted', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                  handleClose()
                }}>DELETE</button>
                <button className={formStyles.register_button} onClick={handleClose}>Cancel</button>
            </section>
        </div>
        {/* <button type="button" onClick={handleClose}>
          Close
        </button> */}
      </section>
    </div>
  );
};
export default DelteModal
