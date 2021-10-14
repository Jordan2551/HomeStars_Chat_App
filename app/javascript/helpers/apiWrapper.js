import history from "./history";

class APIWrapper{
    /**
     * 
     * @param {Function(axios)} func - An axios function that the API handler will execute 
     * @param {Function(setErrors(errors<Array>))} setErrors - (OPTIONAL) if the handler encounters any errors in request, the handler will provide the errors in an array
     * @returns 
     */
    static async handleAPIRequest(func, setErrors, redirect = true){
        try{
            const result = await func();
            return result.data.data ? result.data.data : result.data;
        }catch(error){
            if(error.response){     
                // Handle error by looking at status code
                switch(error.response.status){
                    case 404:
                        history.replace("/404");
                    break;
                        
                    case 401:
                        let errorContent = error.response.data.error;
                        if(setErrors !== undefined)
                            setErrors([errorContent]);

                        if(redirect)
                            history.replace("/login");
                    break;

                    case 403:
                        alert(error.response.data.errors.content);

                        if(redirect)
                            history.replace("/channels");
                    break;

                    case 422:
                        errorContent = error.response.data.error.content;
                        if(setErrors !== undefined)
                            setErrors(errorContent);
                    break;
                }
                console.error("API_WRAPPER LOGGER:", error.response);
            }
        }
    }
}

export default APIWrapper;