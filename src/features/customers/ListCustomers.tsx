import { Box } from '@mui/material';

import { GridFilterModel } from '@mui/x-data-grid';
import { Empty } from '../../components/Empty';
import { CustomerTable } from './components/CustomerTable';
import { useGetCustomersQuery } from './SliceCustomer';
import { useState } from 'react';

export const ListCustomers= () => {

const [page, setPage] = useState(0);
const [perPage, setPerPage] = useState(10);
const [rowsPerPage] = useState([10, 25, 50, 100])

const [options, setOptions] = useState({
  page: page,
  perPage: perPage,
  rowsPerPage: rowsPerPage
});

const { data, error , isFetching} = useGetCustomersQuery({ page: page, perPage: perPage});

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
      <CustomerTable
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