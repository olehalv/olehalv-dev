import { Link } from 'react-router';

const NotFoundPage = () => (
  <div className="centered-state">
    <h1>404</h1>
    <p>That page does not exist.</p>
    <Link to="/">Back to the front page</Link>
  </div>
);

export default NotFoundPage;
