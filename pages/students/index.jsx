import { useState, useEffect } from 'react';

import { Link } from 'components';
import { studentService } from 'services';

export default Index;

function Index() {
    const [students, setStudents] = useState(null);

    useEffect(() => {
        studentService.getAll().then(x => setStudents(x));
    }, []);

    function deleteStudent(id) {
        setStudents(students.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        studentService.delete(id).then(() => {
            setStudents(students => students.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Students</h1>
            <Link href="/students/add" className="btn btn-sm btn-success mb-2">Create Student</Link>
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
                                <Link href={`/students/edit/${student.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteStudent(student.id)} className="btn btn-sm btn-danger btn-delete-student" disabled={student.isDeleting}>
                                    {student.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
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
