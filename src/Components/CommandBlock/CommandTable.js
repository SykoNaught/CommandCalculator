import React from 'react';
import classes from './CommandTable.module.css';

const CommandTable = (props) => {
    return(
        <table style={{width:"100%"}}>
            <thead className={`${classes.tableHead}`}>
                <tr>
                    <th colSpan={2}>Requirements</th>
                    <th className="text-right">Difference</th>
                </tr>
            </thead>
            <tbody className={`${classes.tableBody}`}>
                {
                props.calculatedRequirements.map((rss, i) => {
                    const key = Object.keys(rss)
                    const val = Object.values(rss)
                    return(
                    <tr key={i}>
                        <td><div style={{width:"80px"}}>{key}</div></td>
                        <td className="text-right">{props.selectedCommand[key]}</td>
                        {parseInt(val) > 0 ? 
                        
                            <td className="text-right text-600"><div style={{color:"Green", maxWidth:"200px", marginLeft:"auto"}} >Extra: {val}</div></td>
                        : 
                            parseInt(val) === 0 ?
                                <td className="text-right text-600"><div style={{maxWidth:"200px", marginLeft:"auto"}}>{val}</div></td>
                            :
                                <td className="text-right text-600"><div style={{color:"#a70000", maxWidth:"200px", marginLeft:"auto"}}>Need: {props.addCommas(parseInt(props.removeCommas(val)) * 1)}</div></td>
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