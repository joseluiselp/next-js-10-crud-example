import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { studentService, alertService } from 'services';

export { Edit };

function Edit(props) {
    const student = props?.student;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    const {...defaultValues } = student;
    formOptions.defaultValues = defaultValues;

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return updateStudent(student.id, data);
    }

    function updateStudent(id, data) {
        return studentService.update(id, data)
            .then(() => {
                alertService.success('Student updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Edit Student</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Name</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/students" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}