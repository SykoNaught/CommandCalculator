import React from 'react';

const CommandTable = (props) => {
    return(
        <table style={{width:"100%"}}>
            <thead style={{borderBottom:"15px solid transparent"}}>
                <tr>
                <th colSpan={2}>Requirements</th>
                <th style={{textAlign:"right"}}>Difference</th>
                </tr>
            </thead>
            <tbody>
                {
                props.calculatedRequirements.map((rss, i) => {
                    const key = Object.keys(rss)
                    const val = Object.values(rss)
                    return(
                    <tr>
                        <td>{key}</td>
                        <td style={{textAlign:"right"}}>{props.selectedCommand[key]}</td>
                        {parseInt(val) > 0 ? 
                        
                        <td style={{textAlign:"right", width:"200px", color:"Green", fontWeight:"bold"}}>Extra: {val}</td>
                        : 
                            parseInt(val) === 0 ?
                            <td style={{textAlign:"right", width:"200px", fontWeight:"bold"}}>{val}</td>
                            :
                            <td style={{textAlign:"right", width:"200px", color:"Red", fontWeight:"bold"}}>Need: {props.addCommas(parseInt(props.removeCommas(val)) * 1)}</td>
                        }
                        
                    </tr>
                    )
                    
                })
                }
            </tbody>
        </table>
    )
}

export default CommandTable