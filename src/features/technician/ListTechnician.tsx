import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { GridFilterModel } from '@mui/x-data-grid';
import { TechnicianTable } from './components/TechnicianTable';
import { useGetTechniciansQuery } from './SliceTechnician';
import { useState } from 'react';
import { Empty } from '../../components/Empty';
import { useAppSelector } from '../../app/hooks';
import { selectRoles } from '../auth/SliceAuth';

export const ListTechnician = () => {

const [page, setPage] = useState(0);
const [perPage, setPerPage] = useState(10);
const [rowsPerPage] = useState([10, 25, 50, 100])

const [options, setOptions] = useState({
  page: page,
  perPage: perPage,
  rowsPerPage: rowsPerPage
});

const { data, error , isFetching} = useGetTechniciansQuery({ page: page, perPage: perPage});
const roles = useAppSelector(selectRoles) as string[];

function handleOnPageChange(page: number) {
  setPage(page+1);
  setOptions({ ...options, page: page});
}

function handleOnPageSizeChange(perPage: number) {
  setPerPage(perPage);
  setOptions({ ...options, perPage: perPage});
}

function handleFilterChange(filterModel: GridFilterModel) {
  if (!filterModel.quickFilterValues?.length) {
    return setOptions({ ...options });
  }
}

if (error) {
  return <Empty></Empty>;
}

return (
  
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end" 
      visibility={roles.includes("STAFF") || roles.includes("ADMIN") ? "visible" : "hidden"}>
        <Button 
            variant="contained"
            component={Link}
            color="primary"
            to="/technicians/create"
            style={{ marginBottom: "1rem" }}
            >
          Novo cadastro
        </Button>
      </Box>

      <TechnicianTable
      data={data}
      isFetching={isFetching}
      perPage={options.perPage}
      rowsPerPage={options.rowsPerPage}
      handleOnPageChange={handleOnPageChange}
      handleOnPageSizeChange={handleOnPageSizeChange}
      handleFilterChange={handleFilterChange}
      />
    </Box>
  );
}