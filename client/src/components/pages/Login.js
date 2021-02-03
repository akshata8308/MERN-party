import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/authContext/authContext'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const Login = (props) => {
    const {loginUser, userAuth, errors, clearError} = useContext(AuthContext)
    useEffect(()=>{
        if(userAuth){
            props.history.push('/')
        }
    },[userAuth, props.history])
    const [user, setUser] = useState({email:'',password:''})
    const {email, password} = user

    const handleChange = e=> {
        setUser({...user, [e.target.name]: e.target.value})
        clearError()
    }

    const submit = e => {
        e.preventDefault()
            loginUser({email,password})
            clearError()
    }    
    return (
        <div >
            <Grid lg={12} md ={12} sm={12} xs={12} container direction='row' className='img'>
            <Grid lg={7} >
            </Grid>
            <Grid lg={5} style={{}}>
            <div className='login'>
            <Paper elevation={3} style={{padding:'2rem  2rem', }}>
            <div style={{display:'flex'}}>
            
            <img src="profile1.png" style={{justifyContent:'center',height:'5%',width:'15%'}}/>
            
                <h1>Login In</h1>
                </div>
                &nbsp;
                <form onSubmit={submit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={handleChange} style={{}}/>
                &nbsp;
                &nbsp;
                <input type="password" name="password" placeholder="password" value = {password} onChange={handleChange}/>
                &nbsp;
                <input type="submit" name="Sign In" className="btn" onChange={submit}/>
                </form>
                <div className="question">
                {errors !== null && <button className="danger">
                {errors.msg ? errors.msg : errors.error[0].msg}
                <span onClick={()=>clearError()}>X</span></button>}
                    <p>Dont have an account? {" "} <Link to="/register">Sign Up</Link></p>
                </div>
                </Paper>
            </div>
            </Grid>
           
           
            </Grid>
        </div>
    )
}

export default Login
