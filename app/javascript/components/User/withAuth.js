import React, {useState, useEffect} from "react";
import axios from 'axios';
import APIWrapper from "../../helpers/apiWrapper";
import { API_PATH } from "../../helpers/consts";
import history from "../../helpers/history";

/**
 * A HOC that provides hooks into various authentication related functions
 * @returns A component with user and auth capabilities.
 */
const withAuth = (WrappedComponent) => {   
    return (props) => {
        const [isLoggedin, setIsLoggedin] = useState(false);
        const [user, setUser] = useState({});

        // Ping the API on mount to see if we have a bearer token generated for this user to determine sign-in state
        useEffect(async () => {
            await login('', '');
        }, []);
        
        const login = async (email, password, setErrors) => {
            try{
                const body = {user: { email, password}};
    
                const result = await axios.post(`${API_PATH}/users/sign_in`, body);
                setIsLoggedin(true);
                setUser(result.data);

                // Redirect to channels path after login
                history.push("/channels");
            }catch(error){
                const errorContent = error.response.data.error;

                if(setErrors !== undefined)
                    setErrors([errorContent])
            }
        }

        const logout = async () => {
            const body = {
                user: { email: user.email}
            }

            await APIWrapper.handleAPIRequest(() => axios.delete(`${API_PATH}/users/sign_out`, body));
            
            setIsLoggedin(false);
            setUser({});

            // Redirect to the root path after logout
            history.push("/");
        }

        return(
            <WrappedComponent isLoggedin={isLoggedin} login={login} logout={logout} user={user} {...props} />
        )
    }
}

export default withAuth
