import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCancelOrderMutation, useGetOrdersQuery } from '../orders/SliceOrder';

import { GridFilterModel } from '@mui/x-data-grid';
import { OrderTable } from './components/OrderTable';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export const ListOrders = () => {

const [page, setPage] = useState(0);
const [perPage, setPerPage] = useState(10);
const [rowsPerPage] = useState([10, 25, 50, 100])

const [options, setOptions] = useState({
  page: page,
  perPage: perPage,
  rowsPerPage: rowsPerPage
});

const { data, error , isFetching} = useGetOrdersQuery({ page: page, perPage: perPage});
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
    return setOptions({ ...options });
  }
}

async function handleCancelOrder(id: string) {
  await cancelOrder({ id });
}

useEffect(() => {
  if (deleteSuccess) {
    enqueueSnackbar(`Order cancelled`, { variant: "success" });
  }
  if (deleteError) {
    enqueueSnackbar(`Order not cancelled`, { variant: "error" });
  }
}, [deleteSuccess, deleteError]);


if (error) {
  return <Typography>Error fetching categories</Typography>;
}

    return (
      
      <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="flex-end">
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