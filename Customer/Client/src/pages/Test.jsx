import React from 'react'
import { useHistory } from "react-router-dom";

function Test() {
    
    const history = useHistory();
    function hey() {
        console.log("in hey");
        history.push("/welcome");
    }
    return (
        <div>
            <button onClick = {hey}>Hello</button>
        </div>
    )
}

export default Test
