import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../orders/SliceOrder';

import { GridFilterModel } from '@mui/x-data-grid';
import { OrderTable } from './components/OrderTable';
import { useState } from 'react';

export const ListOrders = () => {

const [page, setPage] = useState(0);
const [perPage, setPerPage] = useState(10);
const [search] = useState(""); 
const [rowsPerPage] = useState([10, 25, 50, 100])

const [options, setOptions] = useState({
  page: page,
  search: search,
  perPage: perPage,
  rowsPerPage: rowsPerPage,
});

const { data, error , isFetching} = useGetOrdersQuery();

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
    return setOptions({ ...options, search: "" });
  }

  const search = filterModel.quickFilterValues.join("");
  setOptions({ ...options, search });
}

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
      />
      </Box>
    );
  }