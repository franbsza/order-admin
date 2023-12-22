import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCancelOrderMutation, useGetOrdersQuery } from '../orders/SliceOrder';
import { GridFilterModel } from '@mui/x-data-grid';
import { OrderTable } from './components/OrderTable';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Empty } from '../../components/Empty';
import { useAppSelector } from '../../app/hooks';
import { selectRoles, selectUserDetails } from '../auth/SliceAuth';

export const ListOrdersByUser = () => {

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

const { data, error , isFetching} = useGetOrdersQuery({ 
    page: page, 
    perPage: perPage, 
    email: email, 
});

const [cancelOrder, { error: deleteError, isSuccess: deleteSuccess }] =
useCancelOrderMutation();

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

async function handleCancelOrder(id: string) {
  await cancelOrder({ id });
}

useEffect(() => {
  if (deleteSuccess) {
    enqueueSnackbar(`Ordem de serviço cancelada`, { variant: "success" });
  }
  if (deleteError) {
    enqueueSnackbar(`Ordem de serviço não pode ser cancelada`, { variant: "error" });
  }
}, [deleteSuccess, deleteError]);


if (error) {
  return <Empty></Empty>;
}

    return (

      <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="flex-end" visibility={roles.includes("USER") ? "visible" : "hidden"}>
          <Button 
              variant="contained"
              component={Link}
              color="primary"
              to="/orders/create"
              style={{ marginBottom: "1rem" }}
              >
            Nova ordem de serviço
          </Button>
        </Box>

        <OrderTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
        handleDelete={handleCancelOrder}
      />
      </Box>
    );
  }