import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const AccessDenied = () => {
  return (
    <div className="access-denied">
      <div className="container">
            <Link to={`/`}>
              <Button>Voltar para pagina inicial</Button>
            </Link>
      </div>
    </div>
  );
};