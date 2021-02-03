import React, {useReducer} from 'react'
import GuestContext from './guestContext'
import axios from 'axios'
import guestReducer from './guestReducer'
import {
    TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    REMOVE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT,
    GET_GUEST,
    GUEST_ERROR,
    SET_LOADER
} from '../type'

const GuestState = (props) => {
    const initialState = {
        filterGuest:false,
        search: null,
        editAble: null,
        guests: [],
        errors:null,
        loading:false,
    }
    const [state, dispatch] = useReducer (guestReducer, initialState)

    //getGuests

    const getGuests =async()=>{
        setLoaderTrue()
        try {
            const res = await axios.get('/guests')
            dispatch({
                type:GET_GUEST,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:GUEST_ERROR,
                payload:err.response.msg
            })
        }
    }

//add guest
    const addGuest = async(guest) => {
        setLoaderTrue()
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const res = await axios.post('/guests', guest, config)
            dispatch({
                type: ADD_GUEST,
                payload:res.data
            })    
        } catch (err) {
            dispatch({
                type:GUEST_ERROR,
                payload:err.response.msg
            })
        }
        
    }
//remove guest
    const removeGuest = async(id)=>{
        setLoaderTrue()
        try {
            await axios.delete(`/guests/${id}`)
            dispatch({
                type:REMOVE_GUEST,
                payload:id
            })
        } catch (err) {
            dispatch({
                type:GUEST_ERROR,
                payload:err.response.msg
            }) 
        }

    }
//update guest
    const updateGuest = async(guest) => {
        setLoaderTrue()
       const config = {
           headers: {
               'Content_Type':'application/json'
           }
       }
       try {
        const res = await axios.put(`/guests/${guest._id}`,guest, config)
        dispatch({
            type: UPDATE_GUEST,
            payload: res.data
        })     
       } catch (err) {
        dispatch({
            type:GUEST_ERROR,
            payload:err.response.msg
        }) 
       }
          
    }

    const editGuest =(guest) => {
        setLoaderTrue()
        dispatch ({
            type: EDIT_GUEST,
            payload: guest
        })
    }
    const clearEdit =() => {
        dispatch ({
            type: CLEAR_EDIT
        })
    }

    const toggleFilter = ()=> {
        setLoaderTrue()
        dispatch ({
            type: TOGGLE_FILTER
        })
    }
    const searchGuest = (guest)=>{
        setLoaderTrue()
        dispatch({
            type: SEARCH_GUEST,
            payload: guest
        })
    }
    const clearSearch = ()=>{
        dispatch({
            type: CLEAR_SEARCH
        })
    }

    //set loader
    const setLoaderTrue = async () => {
        try {
            dispatch({
                type:SET_LOADER,
                payload:true
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GuestContext.Provider
        value= {{
            guests:state.guests,
            filterGuest:state.filterGuest,
            search:state.search,
            editAble: state.editAble,
            loading:state.loading,
            
            getGuests,
            addGuest,
            removeGuest,
            updateGuest,
            editGuest,
            clearEdit,
            toggleFilter,
            searchGuest,
            clearSearch,
            setLoaderTrue,
        }}
        >{props.children}</GuestContext.Provider>
    )
}

export default GuestState
