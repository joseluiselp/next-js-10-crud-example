import { Edit } from 'components/instructors';
import { instructorService } from 'services';

export default Edit;

export async function getServerSideProps({ params }) {
    const instructor = await instructorService.getById(params.id);

    return {
        props: { instructor }
    }
}