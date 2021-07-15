import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div>
            <h1>DBAccess Test Jose Mendoza</h1>
            <p><Link href="/instructors">&gt;&gt; Manage Instructors</Link></p>
            <p><Link href="/students">&gt;&gt; Manage Students</Link></p>
            <p><Link href="/courses">&gt;&gt; Manage Students</Link></p>
        </div>
    );
}
