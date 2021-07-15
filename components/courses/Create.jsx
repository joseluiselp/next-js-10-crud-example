import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { courseService, instructorService, alertService } from 'services';

import { TextField, MenuItem } from '@material-ui/core';

export { Create };

function Create(props) {
    const router = useRouter();
    const [instructors, setInstructors] = useState([]);
    const [instructor, setInstructor] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        instructorService.getAll().then(
            (x) => {
                setInstructors(x);
                setLoading(false);
            });
    }, []);
    const formOptions= {};
    formOptions.defaultValues = {'name': "", 'start_hour':'07:00', 'duration': 60};
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return createCourse(data);
    }

    function createCourse(data) {
        return courseService.create(data)
            .then((x) => {
                alertService.success('Course added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch((x)=>{alertService.error('Instructor is busy in this period');});
    }


    const { ref: nameRef, ...nameProps } = register("name");
    const { ref: instructorRef, ...instructorProps } = register("instructor_id");
    const { ref: startHourRef, ...startHourProps } = register("start_hour");
    const { ref: durationRef, ...durationProps } = register("duration");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create Course</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <TextField 
                      inputRef={nameRef}
                      {...nameProps}
                      type="text" 
                      label="Name"
                      required
                      fullWidth />
                </div>
                <div className="form-group col-5">
                {loading ? (
                    'Loading...'
                    ):(
                    <TextField
                      inputRef={instructorRef}
                      {...instructorProps}
                      select
                      fullWidth
                      value={instructor}
                      onChange={(e)=>setInstructor(e.target.value)}
                      label="Instructor"
                      required
                    >
                      {instructors.map((option) => (
                        <MenuItem value={option.id} key={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    )}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <TextField
                        inputRef={startHourRef}
                        {...startHourProps}
                        id="time"
                        label="Start Hour"
                        type="time"
                        fullWidth
                        required
                      />
                </div>
                <div className="form-group col-5">
                    <TextField
                        inputRef={durationRef}
                        {...durationProps}
                        id="duration"
                        label="Duration (Minutes)"
                        type="number"
                        fullWidth
                        required
                      />
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/courses" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}