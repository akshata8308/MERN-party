import React ,{useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/authContext/authContext'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Register = (props) => {
    const {registerUser, userAuth, errors, setError, clearError} = useContext(AuthContext)
    useEffect(()=>{
        if(userAuth){
            props.history.push('/')
        }
    },[userAuth, props.history])
    const [user, setUser] = useState({name:'',email:'',password:'',password2:''})
    const {name, email, password, password2} = user

    const handleChange = e=> {
        setUser({...user, [e.target.name]: e.target.value})
        clearError()
    }

    const submit = e => {
        e.preventDefault()
        if(password !== password2) {
            setError({ msg:"password don't match"})
        } else {
            registerUser({name,email,password})
            clearError()
        }
    }

    return (
        <div>
            <Grid lg={12} md ={12} sm={12} xs={12} container direction='row' className='img'>
            <Grid lg={7} >
            </Grid>
            <Grid lg={5}>
            <div className='login'>
            <Paper elevation={3} style={{padding:'2rem ', }}>
            <div style={{display:'flex',paddingBottom:'3%'}}>
            
            <img src="profile1.png" style={{justifyContent:'center',height:'5%',width:'15%'}}/>
            <h1>Sign Up</h1>
            </div>
            <form onSubmit={submit}>
            <input type="text" name="name" placeholder="name" value={name} onChange={handleChange}/>
            <input type="email" name="email" placeholder="email" value={email} onChange={handleChange}/>
            <input type="password" name="password" placeholder="password" value={password} onChange={handleChange}/>
            <input type="password" name="password2" placeholder="confirm password" value={password2} onChange={handleChange}/>
            <input type="submit" name="Sign Up" className="btn" />
            </form>
            <div className="question">
            {errors !== null && <button className="danger">
            {errors.msg ? errors.msg : errors.error[0].msg}
            <span onClick ={() => clearError()}>X</span></button>}
                <p>Already have an account? {" "} <Link to="/login">Login</Link></p>
            </div>
            
        </Paper>
        </div>
        </Grid>
        </Grid>
        </div>
    )
}

export default Register
