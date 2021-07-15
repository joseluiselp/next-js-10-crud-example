import { useState, useEffect } from 'react';

import { Link } from 'components';
import { instructorService } from 'services';

export default Index;

function Index() {
    const [instructors, setInstructors] = useState(null);

    useEffect(() => {
        instructorService.getAll().then(x => setInstructors(x));
    }, []);

    function deleteInstructor(id) {
        setInstructors(instructors.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        instructorService.delete(id).then(() => {
            setInstructors(instructors => instructors.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Instructors</h1>
            <Link href="/instructors/add" className="btn btn-sm btn-success mb-2">Create Instructor</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Name</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {instructors && instructors.map(instructor =>
                        <tr key={instructor.id}>
                            <td>{instructor.name} </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/instructors/edit/${instructor.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteInstructor(instructor.id)} className="btn btn-sm btn-danger btn-delete-instructor" disabled={instructor.isDeleting}>
                                    {instructor.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!instructors &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {instructors && !instructors.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Instructors To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
