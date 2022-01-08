import React from 'react';
import classes from './BuildingTable.module.css';

const CommandTable = (props) => {
    return(
        <div style={{position:'relative'}}>
            <div  className={`${classes.buildingName}`}>
                <h2>{props.selectedBuilding.Name} - Level {props.selectedBuilding.Level}</h2>
            </div>
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
                            <td className="text-right">{props.selectedBuilding[key]}</td>
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
                {props.selectedBuilding.Name === 'Command Center' &&
                    
                    props.selectedBuilding.Level > 1 && 
                        <tfoot>
                            <tr>
                                <td className="text-center text-600" style={{fontSize:"1rem"}} colSpan={3}>
                                    Required Buildings
                                </td>
                            </tr>
                            {props.selectedBuilding.Buildings[0].map((building, i) => {
                                return(
                                    <tr key={building.name + 'i'}>
                                        <td>
                                            {building['name']}
                                        </td>
                                        <td colSpan={2} className="text-right">
                                            Level {building['level']}
                                        </td>
                                    </tr>
                                )
                                
                            })}
                        </tfoot>
                }
            </table>
        </div>
    )
}

export default CommandTable