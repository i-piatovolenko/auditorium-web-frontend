export const getScheduleTimeline = (start: number, end: number):string[] => {
    const MINUTES = [":00", ":15", ":30", ":45"];
    let timeSnippets:string[] = [];
    for(let hour = start; hour<=end; hour++) {
        if(hour===end) {
            timeSnippets.push(hour + ":00")
        } else {
            MINUTES.forEach((minutes) => {
                timeSnippets.push(hour + minutes)
            })
        }
    }
    return timeSnippets;
}