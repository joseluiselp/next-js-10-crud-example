import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { courseService, studentService, alertService } from 'services';

import { TextField, MenuItem } from '@material-ui/core';
import { StudentTable } from './StudentTable'

export { Assing };

function Assing() {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        courseService.getAll().then(
            (x) => {
                setCourses(x);
                setLoading(false);
            });
    }, []);

    const courseChange = (e) => {
        setCourse(e.target.value);
    }

    return (
        <div>
            <h1>Assing Course</h1>
            <div className="form-row">
                <div className="form-group col-5">
                {loading ? (
                    'Loading...'
                    ):(
                    <TextField
                      select
                      fullWidth
                      value={course}
                      onChange={courseChange}
                      label="Course"
                    >
                      {courses.map((option) => (
                        <MenuItem value={option.id} key={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    )}
                </div>
                <div className="form-group col-5">
                {loading ? (
                    'Loading...'
                    ):(
                    <StudentTable id={course}/>
                    )}
                </div>
            </div>
            <div className="form-group">
                <Link href="/courses" className="btn btn-link">Back</Link>
            </div>
        </div>
    );
}