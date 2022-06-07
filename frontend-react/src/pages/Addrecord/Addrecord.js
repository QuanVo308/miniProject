import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../../services/authen.service"
import styles from './Addrecord.module.css'
import { Form, Input, Button, Checkbox, Select } from 'antd';
import dataService from '../../services/data.service';


const Addrecord = ({user, setUser}) => {

    const [input, setInput] = useState({})
    const navigate = useNavigate()

    useEffect( () => {
        setInput(inputs => ({...inputs, smart_link: 0}))
        setInput(inputs => ({...inputs, sep: 0}))
        setInput(inputs => ({...inputs, stack: 0}))

        if(!user){
            alert("You not have permission ")
            navigate('/')
        }

        // axios.get("http://localhost:8000/api/getpermission",  {withCredentials : true})
        // .then((res) => {
        //     if(res.data!='KTHT'){
        //         alert("You not have permission")
        //         navigate('/')
        //     }
        // })

    }, [])

    const submit = (e) => {
        e.preventDefault()
        dataService.addData(input, navigate)
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
                    <h2>New record</h2>
                </header>
                <form className={styles.login_form} onSubmit={submit}>

                    <label className= {styles.login_label}>IP</label>
                    <input type="text" name="ip" id="ip" className={styles.login_input} placeholder= "192.168.12.15" onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Hostname</label>
                    <input type="text" name="hostname" id="hostname" className={styles.login_input} placeholder="HNIB03405HW50" onChange={handleChange} />
                    <br></br>
                    
                    <label className= {styles.login_label}>Branch</label>
                    <input type="text" name="branch" id="branch" className={styles.login_input} placeholder="BTHT1" onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Pop</label>
                    <input type="text" name="pop" id="pop" className={styles.login_input} placeholder="HNIB034" onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Type</label>
                    <input type="text" name="type" id="type" className={styles.login_input} placeholder="HUAWEI" onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Type</label>
                    <input type="text" name="type" id="type" className={styles.login_input} placeholder="HUAWEI" onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Function</label>
                    <input type="text" name="function" id="function" className={styles.login_input} placeholder="SW-FTI-BB"  onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Model</label>
                    <input type="text" name="model" id="model" className={styles.login_input} placeholder="HW50" onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Province</label>
                    <input type="text" name="province" id="province" className={styles.login_input} placeholder="HNI" onChange={handleChange} />
                    <br></br>

                    <label className= {styles.login_label}>Total MAC</label>
                    <input type="number" name="total_mac" id="total_mac" className={styles.login_input} placeholder={3850} onChange={handleChange} />
                    <br></br>
                    
                    <label className= {styles.login_label}>Smart Link</label>
                    <select name="smart_link" id="smart_link" className={styles.login_input} onChange={handleChange} >
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>    
                    </select>
                    <br></br>

                    <label className= {styles.login_label}>Sep</label>
                    <select name="sep" id="sep" className={styles.login_input} onChange={handleChange}>
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>   
                    </select>
                    <br></br>

                    <label className= {styles.login_label}>Stack</label>
                    <select name="stack" id="stack" className={styles.login_input} onChange={handleChange}>
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>    
                    </select>
                    <br></br>

                    <label className= {styles.login_label}>Number of<br></br> pop tail </label>
                    <input type="number" name="number_of_pop_tail" id="number_of_pop_tail" className={styles.login_input} placeholder={4}  onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Patch version</label>
                    <input type="text" name="patch_ver" id="patch_ver" className={styles.login_input} placeholder="s5720si-v200r011sph007" onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Software version</label>
                    <input type="text" name="software_ver" id="software_ver" className={styles.login_input} placeholder="S5720 V200R011C10SPC600" onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Switch type</label>
                    <input type="text" name="switch_type" id="switch_type" className={styles.login_input} placeholder="S5720-28X-" onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Patch state</label>
                    <input type="text" name="patch_state" id="patch_state" className={styles.login_input} placeholder="running" onChange={handleChange}/>
                    <br></br>

                    <label className= {styles.login_label}>Zone</label>
                    <input type="number" name="zone" id="zone" className={styles.login_input} placeholder={1} onChange={handleChange}/>
                    <br></br>

                    <div >
                        <button type="submit" className={styles.login_button}>ADD</button>
                    </div> 

                </form>
            </section>
        </div>

        </>
    )
}

export default Addrecord