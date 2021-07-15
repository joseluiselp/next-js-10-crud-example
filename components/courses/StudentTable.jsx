import { useState, useEffect } from 'react';

import { Link } from 'components';
import { studentService, alertService } from 'services';

export { StudentTable };

function StudentTable(props) {
    const courseId = props.id;
    const [students, setStudents] = useState(null);

    useEffect(() => {
        setStudents(null);
        studentService.getAll().then(
            (x) => {
                x.map(y => {
                    if (y.courses.findIndex(el => el == courseId)>=0)
                        y.enrolled = true; 
                    else
                        y.enrolled = false;
                    return y;
                });
                setStudents(x);
            });
    }, [courseId]);

    function toggleStudent(id, courseId) {
        var formdata = new FormData();
        formdata.append("id", id);
        formdata.append("course_id", courseId);
        setStudents(students.map(x => {
            if (x.id === id) { 
                x.isToggling = true;
            }
            return x;
        }));
        studentService.toggleCourse(formdata).then(() => {
            setStudents(students.map(x => {
                if (x.id === id) { 
                    x.isToggling = false;
                    x.enrolled = !x.enrolled; 
                }
                return x;
            }))            
            }
        ).catch((x)=>{
            alertService.error('Can\'t enroll mixed hours');
            setStudents(students.map(x => {
                x.isToggling = false;
                return x;
            }));
        });
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Name</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {students && students.map(student =>
                        <tr key={student.id}>
                            <td>{student.name} </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button onClick={() => toggleStudent(student.id, courseId)} className={`btn btn-sm btn-delete-student ${student.enrolled ? 'btn-danger' : 'btn-success'}`} disabled={student.isToggling}>
                                    {student.isToggling 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : student.enrolled ? <span>Remove</span>
                                        : <span>Enroll</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!students &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {students && !students.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Students To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
