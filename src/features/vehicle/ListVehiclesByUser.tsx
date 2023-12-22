import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { GridFilterModel } from '@mui/x-data-grid';
import { VehicleTable } from './components/VehicleTable';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useGetVehiclesQuery, useUpdateVehicleMutation } from './SliceVehicle';
import { Empty } from '../../components/Empty';
import { useAppSelector } from '../../app/hooks';
import { selectRoles, selectUserDetails } from '../auth/SliceAuth';

export const ListVehiclesByUser = () => {

const [page, setPage] = useState(0);
const [perPage, setPerPage] = useState(5);
const [rowsPerPage] = useState([5, 10, 50])

const [options, setOptions] = useState({
  page: page,
  perPage: perPage,
  rowsPerPage: rowsPerPage,
});

const roles = useAppSelector(selectRoles) as Array<string>;
const userDetails = useAppSelector(selectUserDetails);
const email = roles.includes("USER") ? userDetails.email : "";

const { data, error , isFetching} = useGetVehiclesQuery({ 
    page: page, 
    perPage: perPage, 
    email: email
});

const [handleDesactivateVehicle, { error: deleteError, isSuccess: deleteSuccess }] =
useUpdateVehicleMutation();

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
      return setOptions({ ...options});
    }
}

async function handleVehicleDelete(id: string) {
  await handleDesactivateVehicle({ id });
}

useEffect(() => {
  if (deleteSuccess) {
    enqueueSnackbar(`Veiculo desativado`, { variant: "success" });
  }
  if (deleteError) {
    enqueueSnackbar(`Houve um erro ao desativar o veiculo`, { variant: "error" });
  }
}, [deleteSuccess, deleteError]);

  if (error) {
    return <Empty></Empty>;
  }

    return (
      
      <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="flex-end" 
        visibility={roles.includes("USER") ? "visible" : "hidden"}>
          <Button 
              variant="contained"
              component={Link}
              color="primary"
              to="/vehicles/create"
              style={{ marginBottom: "1rem" }}
              >
            Cadastrar veículo
          </Button>
        </Box>

        <VehicleTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
        handleDelete={handleVehicleDelete}
      />
      </Box>
    );
  }