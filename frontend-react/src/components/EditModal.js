import '../theme/modal.css'
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import styles from "../theme/EditModal.module.css"
import dataService from '../services/data.service';
import { AiFillWarning} from 'react-icons/ai';

const EditModal = ({ handleClose, show, children, record, update, setRecord }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [input, setInput] = useState({})
  const [checkIP, setCheckIP] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect( () => {

    if(record) {
        Object.keys(record).map( (e) => {
            setInput(inputs => ({...inputs, [e]: record[e]}))
            }
        )
        validateIP(record['ip'])
        
    }

    }, [record, checkIP])

  const submit = (e) => {
    e.preventDefault()
    if(!checkIP){
      dataService.updateData(input, navigate, update)
      setInput('')
      setRecord('')
      handleClose()
    }
    }

    const validateOctet = (octet) => {
      console.log("ocet", octet)
      if(Number(octet) == 0 || Number(octet) && (Number(octet) >= 0 && Number(octet) <= 255)) {
        
      } else {
        return false
      }
      if(octet.indexOf(' ') !== -1 || octet==''){
        return false
      }
      return true;
    }

    const validateIP = (ip) => {
      // console.log(ip.substring(3,5))
      // console.log(ip.indexOf('.' , 3))
      var index = 0
      var octet = ip.indexOf('.')
      
      if(octet == -1){
        return setCheckIP(true)
      }

      if(!validateOctet(ip.substring(index, octet))){
        return setCheckIP(true)
      }

      index = octet + 1
      octet = ip.indexOf('.', octet+1)

      if(octet == -1){
        return setCheckIP(true)
      }

      if(!validateOctet(ip.substring(index, octet))){
        return setCheckIP(true)
      }

      index = octet + 1
      octet = ip.indexOf('.', octet+1)

      if(octet == -1){
        return setCheckIP(true)
      }

      if(!validateOctet(ip.substring(index, octet))){
        return setCheckIP(true)
      }

      if(!validateOctet(ip.substring(ip.length, octet + 1))){
        return setCheckIP(true)
      }

      octet = ip.indexOf('.', octet+1)
      console.log("check", octet)

      if(octet !== -1){
        return setCheckIP(true)
      }

      
      return setCheckIP(false)

    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInput(inputs => ({...inputs, [name]: value}))
        if(event.target.name == 'ip'){
          validateIP(event.target.value)
        }
    }

    const closeModal = () => {
        setInput('')
        setRecord('')
        handleClose()
    }

  return (
    <div className={showHideClassName} >
      <section  className="modal-main" >
      <div className={styles.login_container} >
            <section class={styles.logins}>
                <header>
                    <h2>Edit record</h2>
                </header>
                
                <button className={styles.register_button} onClick={closeModal}>Cancel</button>
                <div className={styles.test}>
                <form className={styles.login_form} onSubmit={submit}>
                    {
                        record &&
                        <>
                        <label className= {styles.login_label}>ID</label>
                        <input type="text" name="id" id="id" className={styles.login_input} defaultValue= {record['id']} />
                        <br></br>

                        <label className= {styles.login_label}>IP</label>
                        <input type="text" name="ip" id="ip" className={styles.login_input} defaultValue={record['ip']} onChange={handleChange} /> 
                        {checkIP && <AiFillWarning style={{color:'red'}}/>}
                        <br></br>

                        <label className= {styles.login_label}>Hostname</label>
                        <input type="text" name="hostname" id="hostname" className={styles.login_input} defaultValue={record['hostname']} onChange={handleChange} />
                        <br></br>

                        <label className= {styles.login_label}>Branch</label>
                        <input type="text" name="branch" id="branch" className={styles.login_input} defaultValue={record['branch']} onChange={handleChange} />
                        <br></br>

                        <label className= {styles.login_label}>Pop</label>
                        <input type="text" name="pop" id="pop" className={styles.login_input} defaultValue={record['pop']} onChange={handleChange} />
                        <br></br>

                        <label className= {styles.login_label}>Type</label>
                        <input type="text" name="type" id="type" className={styles.login_input} defaultValue={record['type']} onChange={handleChange} />
                        <br></br>

                        <label className= {styles.login_label}>Function</label>
                        <input type="text" name="function" id="function" className={styles.login_input} defaultValue={record['function']}  onChange={handleChange}/>
                        <br></br>

                        <label className= {styles.login_label}>Model</label>
                        <input type="text" name="model" id="model" className={styles.login_input} defaultValue={record['model']} onChange={handleChange} />
                        <br></br>

                        <label className= {styles.login_label}>Province</label>
                        <input type="text" name="province" id="province" className={styles.login_input} defaultValue={record['province']} onChange={handleChange} />
                        <br></br>

                        <label className= {styles.login_label}>Total MAC</label>
                        <input type="number" name="total_mac" id="total_mac" className={styles.login_input} defaultValue={record['total_mac']} onChange={handleChange} />
                        <br></br>

                        <label className= {styles.login_label}>Smart Link</label>
                        <select name="smart_link" id="smart_link" className={styles.login_input} onChange={handleChange}>
                            {record['smart_link'] == Boolean(0) ? 
                            <> <option value={0} >No</option>
                            <option value={1}>Yes</option> </> :
                            <><option value={1}>Yes</option>
                            <option value={0}>No</option>
                            </>}    
                        </select>
                        <br></br>

                        <label className= {styles.login_label}>Sep</label>
                        <select name="sep" id="sep" className={styles.login_input} onChange={handleChange}>
                        {record['sep'] == Boolean(0) ? 
                            <> <option value={0} >No</option>
                            <option value={1}>Yes</option> </> :
                            <><option value={1}>Yes</option>
                            <option value={0}>No</option>
                            </>}    
                        </select>
                        <br></br>

                        <label className= {styles.login_label}>Stack</label>
                        <select name="stack" id="stack" className={styles.login_input} onChange={handleChange}>
                        {record['stack'] == Boolean(0) ? 
                            <> <option value={0} >No</option>
                            <option value={1}>Yes</option> </> :
                            <><option value={1}>Yes</option>
                            <option value={0}>No</option>
                            </>}     
                        </select>
                        <br></br>

                        <label className= {styles.login_label}>Number of pop tail </label>
                        <input type="number" name="number_of_pop_tail" id="number_of_pop_tail" className={styles.login_input} defaultValue={record['number_of_pop_tail']}  onChange={handleChange}/>
                        <br></br>

                        <label className= {styles.login_label}>Patch version</label>
                        <input type="text" name="patch_ver" id="patch_ver" className={styles.login_input} defaultValue={record['patch_ver']} onChange={handleChange}/>
                        <br></br>

                        <label className= {styles.login_label}>Software version</label>
                        <input type="text" name="software_ver" id="software_ver" className={styles.login_input} defaultValue={record['software_ver']} onChange={handleChange}/>
                        <br></br>

                        <label className= {styles.login_label}>Switch type</label>
                        <input type="text" name="switch_type" id="switch_type" className={styles.login_input} defaultValue={record['switch_type']} onChange={handleChange}/>
                        <br></br>

                        <label className= {styles.login_label}>Patch state</label>
                        <input type="text" name="patch_state" id="patch_state" className={styles.login_input} defaultValue={record['patch_state']} onChange={handleChange}/>
                        <br></br>

                        <label className= {styles.login_label}>Zone</label>
                        <input type="number" name="zone" id="zone" className={styles.login_input} defaultValue={record['zone']} onChange={handleChange}/>
                        <br></br>

                        </>
                    }

                    <div >
                        <button type="submit" className={styles.login_button}>SAVE</button>
                        <button className={styles.register_button} onClick={closeModal}>Cancel</button>
                    </div> 

                </form>
                </div>
            </section>
        </div>
        {/* <button type="button" onClick={handleClose}>
          Close
        </button> */}
      </section>
    </div>
  );
};
export default EditModal
