import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const AccessDenied = () => {
  return (
    <div className="access-denied">
      <div className="container">
            <Link to={`/orders`}>
              <Button>Back to Dashboard</Button>
            </Link>
      </div>
    </div>
  );
};