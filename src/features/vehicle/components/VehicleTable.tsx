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
          headerName: "Seguro ativo?", 
          flex: 1,
          renderCell: renderIsProtectedCell       
        },
        { 
          field: "activation", 
          headerName: "Ativar/Desativar", 
          type: "string",
          flex: 1 ,
          renderCell: renderActivationActionCell
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

      function renderIsProtectedCell(rowData: GridRenderCellParams) {
        return (
          <span style={{ color: rowData.row.isProtected ? "green" : "red" }}>
            {rowData.row.isProtected ? "Sim" : "Não"}</span>
        )
      }

      function renderActivationActionCell(rowData: GridRenderCellParams) {
        return (
          <IconButton
          onClick={() => handleDelete(rowData.row.id)}
          aria-label="delete">
            { rowData.row.isProtected ? 
            <BlockIcon color="secondary"/> : 
            <BorderColorIcon color="primary" /> }
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