import { Typography } from "@mui/material"
import React from "react"

const FormErrors = ({errors}) => {
    return (
        <div style={{color: "#E64A19", marginTop: "1em"}}>
            {errors.length > 0 && (
                <>
                    <Typography component="p" fontWeight="bold">
                        The following errors have occurred while processing your request:
                    </Typography>
                    <ul style={{listStylePosition: "inside"}}>
                        {errors.map(error => (
                            <li>{error}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default FormErrors
