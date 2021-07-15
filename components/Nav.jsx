import { NavLink } from '.';

export { Nav };

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/instructors" className="nav-item nav-link">Instructors</NavLink>
                <NavLink href="/students" className="nav-item nav-link">Students</NavLink>
                <NavLink href="/courses" className="nav-item nav-link">Courses</NavLink>
                <NavLink href="/courses/scheduler" className="nav-item nav-link">Agenda</NavLink>
            </div>
        </nav>
    );
}