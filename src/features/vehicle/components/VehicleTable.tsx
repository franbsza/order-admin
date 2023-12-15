import { VehicleResponse } from "../../../types/Vehicle";
import { 
    DataGrid ,  
    GridColDef, 
    GridRenderCellParams,
    GridToolbar,
    GridFilterModel
  } from '@mui/x-data-grid';
import { Box,IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

type Props = {
    data: VehicleResponse | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    handleOnPageChange: (page:number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
  }

export function VehicleTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange, 
    handleDelete 
}: Props){

    const componentProps={
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
    };

    const columns: GridColDef[] = [
        { 
          field: "plateNumber", 
          headerName: "Placa", 
          flex: 1 
        },
        { 
          field: "year", 
          headerName: "Ano", 
          flex: 1 
        },
        { 
          field: "name", 
          headerName: "Nome", 
          flex: 1
        },
        { 
          field: "renavam", 
          headerName: "Renavam", 
          flex: 1,
          type: "string"
        },
        { 
          field: "isProtected", 
          headerName: "Está protegido?", 
          flex: 1        
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
        },
        { 
          field: "cancelAction", 
          headerName: "Cancelar", 
          type: "string",
          flex: 0.5 ,
          renderCell: renderCancelActionCell
        },
      ];

      function mapDataToGridRows(data: VehicleResponse) {
        const { data: vehicles } = data;
        return vehicles.map((vehicle) => ({
          id: vehicle.id,
          plateNumber: vehicle.plateNumber,
          year: vehicle.year,
          isProtected: vehicle.isProtected,
          name: vehicle.name,
          renavam: vehicle.renavam,
        }));
      }

      function renderDetailsActionCell(rowData: GridRenderCellParams) {
        return (

        <Link to={`/vehicles/details/${rowData.id}`} 
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
        <Link to={`/vehicles/edit/${rowData.id}`} 
        style={{ textDecoration: "none" }}
        >
            <IconButton>
              <BorderColorIcon color='primary'/>
            </IconButton>
            </Link>
        )
      }

      function renderCancelActionCell(rowData: GridRenderCellParams) {
        return (
          <IconButton
          color="secondary"
          onClick={() => handleDelete(rowData.row.id)}
          aria-label="delete">
            <BlockIcon />
          </IconButton>
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
            disableColumnFilter={false}
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