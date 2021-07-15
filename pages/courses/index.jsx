import { useState, useEffect } from 'react';

import { Link } from 'components';
import { courseService } from 'services';

export default Index;

function Index() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        courseService.getAll().then(x => setCourses(x));
    }, []);

    function deleteCourse(id) {
        setCourses(courses.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        courseService.delete(id).then(() => {
            setCourses(courses => courses.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Courses</h1>
            <Link href="/courses/add" className="btn btn-sm btn-success mb-2" style={{margin: "0 5px 0 0"}}>Create Course</Link>
            <Link href="/courses/assing" className="btn btn-sm btn-success mb-2">Assing Students</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Instructor</th>
                        <th style={{ width: '15%' }}>Starts at</th>
                        <th style={{ width: '15%' }}>Ends at</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {courses && courses.map(course =>
                        <tr key={course.id}>
                            <td>{course.name} </td>
                            <td>{course.instructor} </td>
                            <td>{course.start_hour} </td>
                            <td>{course.end_hour} </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button onClick={() => deleteCourse(course.id)} className="btn btn-sm btn-danger btn-delete-course" disabled={course.isDeleting}>
                                    {course.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!courses &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {courses && !courses.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Courses To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
