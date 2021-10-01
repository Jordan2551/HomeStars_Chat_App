import history from "./history";

class APIWrapper{
    /**
     * 
     * @param {Function(axios)} func - An axios function that the API handler will execute 
     * @param {Function(setErrors(errors<Array>))} setErrors - (OPTIONAL) if the handler encounters any errors in request, the handler will provide the errors in an array
     * @returns 
     */
    static async handleAPIRequest(func, setErrors){
        try{
            const result = await func();
            return result.data.data;
        }catch(error){
            if(error.response){     
                // Handle error by looking at status code
                switch(error.response.status){
                    case 404:
                        history.replace("/404");
                    break;
                        
                    case 401:
                        history.replace("/login");
                    break;

                    case 403:
                        history.replace("/channels");
                        alert(error.response.data.errors.content);
                    break;

                    case 422:
                        const errorContent = error.response.data.error.content;
                        if(setErrors !== undefined)
                            setErrors(errorContent);
                    break;
                }
                console.error(error.response);
                // Send out a snack message with error content
            }
        }
    }
}

export default APIWrapper;