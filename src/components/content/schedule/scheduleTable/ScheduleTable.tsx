import React, {useState} from 'react';
import styles from './schedule.module.css';

const ScheduleTable = React.memo((props: any) => {
    let classrooms = props.classrooms
    let [disabled, setDisabled] = useState(true);
    let timeline = ["8:00", "8:15", "8:30", "8:45",
        "9:00", "9:15", "9:30", "9:45",
        "10:00", "10:15", "10:30", "10:45",
        "11:00", "11:15", "11:30", "11:45",
        "12:00", "12:15", "12:30", "12:45",
        "13:00", "13:15", "13:30", "13:45",
        "14:00", "14:15", "14:30", "14:45",
        "15:00", "15:15", "15:30", "15:45",
        "16:00", "16:15", "16:30", "16:45",
        "17:00", "17:15", "17:30", "17:45",
        "18:00", "18:15", "18:30", "18:45",
        "19:00", "19:15", "19:30", "19:45", "20:00"];
    let onChangeAudNumber = (e: any) => {
    }
    return <>
        <div className={styles.scheduleTable}>
            <table className={styles.tg}>
                <thead>
                <tr>
                    <th></th>
                    {timeline.map((el: any) => <th className={styles.tg_0pky}>{el}</th>)}
                </tr>
                </thead>
                <tbody>
                {classrooms.map((cl: any) => {
                    let tempArray = timeline;
                    cl.schedule.map((scheduleUnit: any) => {
                        let unitFrom = timeline.findIndex((el:any) => el === scheduleUnit.from);
                        let unitTo = timeline.findIndex((el:any) => el === scheduleUnit.to);
                        tempArray.fill('del', (unitFrom + 1), unitTo);
                    })
                    return <tr>
                        <td>{cl.name}</td>
                        {
                            tempArray.map((el: any) => {
                                let colSpanNum = cl.schedule.map((scheduleUnit: any) => {
                                    let from = timeline.indexOf(scheduleUnit.from)
                                    let to = timeline.indexOf(scheduleUnit.to)
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