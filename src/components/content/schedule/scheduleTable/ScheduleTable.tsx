import React, {useState} from 'react';
import styles from './schedule.module.css';
import {getScheduleTimeline} from "../../../../helpers/helpers";

const ScheduleTable = React.memo((props: any) => {
    const WORKING_DAY_END = 20;
    const WORKING_DAY_START = 8;
    let classrooms = props.classrooms
    let [disabled, setDisabled] = useState(true);
    let timeSnippets:string[] = getScheduleTimeline(WORKING_DAY_START, WORKING_DAY_END);
    let onChangeAudNumber = (e: any) => {
    }

    return <>
        <div className={styles.scheduleTable}>
            <table className={styles.tg}>
                <thead>
                <tr>
                    <th></th>
                    {timeSnippets.map((el: any) => <th className={styles.tg_0pky}>{el}</th>)}
                </tr>
                </thead>
                <tbody>
                {classrooms.map((cl: any) => {
                    let tempArray = timeSnippets;
                    cl.schedule.map((scheduleUnit: any) => {
                        let unitFrom = timeSnippets.findIndex((el:any) => el === scheduleUnit.from);
                        let unitTo = timeSnippets.findIndex((el:any) => el === scheduleUnit.to);
                        tempArray.fill('del', (unitFrom + 1), unitTo);
                    })
                    return <tr>
                        <td>{cl.name}</td>
                        {
                            tempArray.map((el: any) => {
                                let colSpanNum = cl.schedule.map((scheduleUnit: any) => {
                                    let from = timeSnippets.indexOf(scheduleUnit.from)
                                    let to = timeSnippets.indexOf(scheduleUnit.to)
                                    let term = to - from;
                                    if (scheduleUnit.from === el) {
                                        return term.toString()
                                    } else {
                                        return null
                                    }
                                });
                                return el != "del" ? <td className={styles.tg_0lax} colSpan={colSpanNum
                                    .join()
                                    .replace(',', '')}>
                                    {cl.schedule.map((scheduleUnit: any) => {
                                        if (scheduleUnit.from === el) {
                                            return <div className={styles.occupied}><p>
                                                {
                                                    scheduleUnit.user.lastName +
                                                    " " + scheduleUnit.from + " — " + scheduleUnit.to
                                                }
                                            </p></div>
                                        }
                                    })}
                                </td> : null;
                            })
                        }
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </>
});
export default ScheduleTable;