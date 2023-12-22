import { 
    DataGrid ,  
    GridColDef, 
    GridRenderCellParams,
    GridToolbar,
    GridFilterModel
  } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { CustomerResponse } from '../../../types/Customer';

type Props = {
    data: CustomerResponse | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    handleOnPageChange: (page:number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
  }

export function CustomerTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange
}: Props){

    const componentProps={
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
    };

    const columns: GridColDef[] = [
        { 
          field: "id", 
          headerName: "ID", 
          flex: 1 
        },
        { 
          field: "firstName", 
          headerName: "Nome", 
          flex: 1 
        },
        { 
          field: "status", 
          headerName: "Status", 
          flex: 1,
          renderCell: renderStatusCell
        },
        { 
          field: "phone", 
          headerName: "Telefone", 
          flex: 1,
          type: "string"
        },
        { 
            field: "email", 
            headerName: "Email", 
            flex: 1,
            type: "string"
        },
        { 
            field: "neighborhood", 
            headerName: "Bairro", 
            flex: 1 ,
            type: "string"
        },
        { 
          field: "detailsAction", 
          headerName: "Detalhes", 
          flex: 0.5 ,
          renderCell: renderDetailsActionCell
        },
        { 
          field: "editAction", 
          headerName: "Editar", 
          flex: 0.5 ,
          renderCell: renderEditActionCell
        }
      ];

      function mapDataToGridRows(data: CustomerResponse) {
        const { data: customers } = data;
        return customers.map((customer) => ({
          id: customer.id,
          firstName: customer.firstName + " " + customer.lastName,
          status: customer.status,
          phone: customer.phone,
          email: customer.email,
          neighborhood: customer.address.neighborhood,
        }));
      }

      function mapStatus(status: string){
        switch (status) {
          case "PENDING_ACTIVATION":
            return "Ativação pendente";
          case "ACTIVE":
            return "Ativo";
          case "INACTIVE":
            return "Inativo";
          case "BLOCKED":
            return "Bloqueado";
          case "FINANCIAL_PENDING":
            return "Pendência financeira";
          default:
            return "Indefinido";
        }
      }

      function renderStatusCell(rowData: GridRenderCellParams) {
        let status = rowData.row.status;
        return (
          <span>{mapStatus(status)}</span>
        );
      }

      function renderDetailsActionCell(rowData: GridRenderCellParams) {
        return (
        <Link to={`/customers/details/${rowData.row.email}`} 
        style={{ textDecoration: "none" }}
        >
            <IconButton>
              <VisibilityIcon color='info'/>
            </IconButton>
            </Link>
        )
      }
      
      function renderEditActionCell(rowData: GridRenderCellParams) {
        return (
        <Link to={`/customers/edit/${rowData.row.id}`} 
        style={{ textDecoration: "none" }}
        >
            <IconButton>
              <BorderColorIcon color='primary'/>
            </IconButton>
            </Link>
        )
      }

      const rows = data ? mapDataToGridRows(data) : [];
      const rowCount = data?.meta.total || 0;

      return (
        <Box sx={{ display: 'flex', height: 500, width: '100%' }}>
            <DataGrid
            rows={rows}
            pagination={true}
            columns={columns}
            pageSize={perPage}
            filterMode="server"
            rowCount={rowCount}
            loading={isFetching}
            paginationMode="server"
            checkboxSelection={false}
            disableColumnFilter={true}
            disableColumnSelector={true}
            disableDensitySelector={true}
            rowsPerPageOptions={rowsPerPage}
            componentsProps={componentProps}
            onPageChange={handleOnPageChange}
            components={{ Toolbar: GridToolbar }}
            onFilterModelChange={handleFilterChange}
            onPageSizeChange={handleOnPageSizeChange}
            />
        </Box>
      );
}