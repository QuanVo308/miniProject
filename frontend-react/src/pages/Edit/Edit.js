import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../../services/authen.service"
import styles from "./Edit.module.css"
import dataService from '../../services/data.service';
import { confirmAlert } from 'react-confirm-alert'; // Import

const Edit = (props) => {

    const [input, setInput] = useState({})

    const location = useLocation()
    const navigate = useNavigate()

    useEffect( () => {

        if(!props.user){
            alert("You not have permission ")
            navigate('/')
        }

        Object.keys(location.state).map( (e) => {
            setInput(inputs => ({...inputs, [e]: location.state[e]}))
        }
        )

    }, [])
    
    useEffect( () => {
        console.log("input: ", input)
    })

    const submit = (e) => {
        e.preventDefault()
        dataService.updateData(input, navigate)
    }
    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInput(inputs => ({...inputs, [name]: value}))
    }


    return (
        <>
            <div className={styles.login_container}>
            <section class={styles.logins}>
                <header>
                    <h2>Edit record</h2>
                </header>
                <form className={styles.login_form} onSubmit={submit}>

                    <label className= {styles.login_label}>ID</label>
                    <input type="text" name="id" id="id" className={styles.login_input} value={location.state.id} />
                    <br></br>

                    <label className= {styles.login_label}>IP</label>
                    <input type="text" name="ip" id="ip" className={styles.login_input} defaultValue={location.state.ip} onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Hostname</label>
                    <input type="text" name="hostname" id="hostname" className={styles.login_input} defaultValue={location.state.hostname} onChange={handleChange} />
                    <br></br>
                    
                    <label className= {styles.login_label}>Branch</label>
                    <input type="text" name="branch" id="branch" className={styles.login_input} defaultValue={location.state.branch} onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Pop</label>
                    <input type="text" name="pop" id="pop" className={styles.login_input} defaultValue={location.state.pop} onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Type</label>
                    <input type="text" name="type" id="type" className={styles.login_input} defaultValue={location.state.type} onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Function</label>
                    <input type="text" name="function" id="function" className={styles.login_input} defaultValue={location.state.function}  onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Model</label>
                    <input type="text" name="model" id="model" className={styles.login_input} defaultValue={location.state.model} onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Province</label>
                    <input type="text" name="province" id="province" className={styles.login_input} defaultValue={location.state.province} onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Total MAC</label>
                    <input type="number" name="total_mac" id="total_mac" className={styles.login_input} defaultValue={location.state.total_mac} onChange={handleChange} />
                    <br></br>
                    
                    <label className= {styles.login_label}>Smart Link</label>
                    <select name="smart_link" id="smart_link" className={styles.login_input} onChange={handleChange}>
                        {location.state.smart_link == Boolean(0) ? 
                        <> <option value={0} >No</option>
                        <option value={1}>Yes</option> </> :
                        <><option value={1}>Yes</option>
                        <option value={0}>No</option>
                         </>}    
                    </select>
                    <br></br>

                    <label className= {styles.login_label}>Sep</label>
                    <select name="sep" id="sep" className={styles.login_input} onChange={handleChange}>
                    {location.state.sep == Boolean(0) ? 
                        <> <option value={0} >No</option>
                        <option value={1}>Yes</option> </> :
                        <><option value={1}>Yes</option>
                        <option value={0}>No</option>
                         </>}    
                    </select>
                    <br></br>

                    <label className= {styles.login_label}>Stack</label>
                    <select name="stack" id="stack" className={styles.login_input} onChange={handleChange}>
                    {location.state.stack == Boolean(0) ? 
                        <> <option value={0} >No</option>
                        <option value={1}>Yes</option> </> :
                        <><option value={1}>Yes</option>
                        <option value={0}>No</option>
                         </>}     
                    </select>
                    <br></br>

                    <label className= {styles.login_label}>Number of<br></br> pop tail </label>
                    <input type="number" name="number_of_pop_tail" id="number_of_pop_tail" className={styles.login_input} defaultValue={location.state.number_of_pop_tail}  onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Patch version</label>
                    <input type="text" name="patch_ver" id="patch_ver" className={styles.login_input} defaultValue={location.state.patch_ver} onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Software version</label>
                    <input type="text" name="software_ver" id="software_ver" className={styles.login_input} defaultValue={location.state.software_ver} onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Switch type</label>
                    <input type="text" name="switch_type" id="switch_type" className={styles.login_input} defaultValue={location.state.switch_type} onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Patch state</label>
                    <input type="text" name="patch_state" id="patch_state" className={styles.login_input} defaultValue={location.state.patch_state} onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Zone</label>
                    <input type="number" name="zone" id="zone" className={styles.login_input} defaultValue={location.state.zone} onChange={handleChange}/>
                    <br></br>

                    <div >
                        <button type="submit" className={styles.login_button}>SAVE</button>
                    </div> 

                </form>
            </section>
        </div>

        </>
    )
}

export default Edit