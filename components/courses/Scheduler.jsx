import { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { courseService } from 'services';
export { Scheduler };

function Scheduler() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
        setCourses([]);
        courseService.getAll().then(
            (x) => {
                x.map(y => {
                  console.log(y);
                  data.push({Id: y.id, Subject: y.name, StartTime: new Date(1970, 1, 1, y.start_hour.substring(0,2), y.start_hour.substring(3,5)),EndTime: new Date(1970, 1, 1, y.end_hour.substring(0,2), y.end_hour.substring(3,5)),RecurrenceRule: 'FREQ=DAILY',IsAllDay:false});
                });
                setCourses(x);
                setLoading(false);
                setData(data);
            });
    }, []);

  return( 
    <div className="form-row">
      <div className="form-group col-12">
        {loading ? (
            'Loading...'
          ):(
        <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={{ dataSource: data }}>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>
        )}
      </div>
    </div>
    )
}