import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
    const location = useLocation()

    let navigate = useNavigate()

    const clickHandler = (e) => {
        console.log(e.target.value)
        navigate(e.target.value)
    }

    return (
        <>
            <h1>
                This is Login page
                {location.pathname}
            </h1>
            <button onClick={clickHandler} value = "/"> Home</button>
        </>
    )
}

export default Login