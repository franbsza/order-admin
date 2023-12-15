import { 
    DataGrid ,  
    GridColDef, 
    GridRenderCellParams,
    GridToolbar,
    GridFilterModel
  } from '@mui/x-data-grid';
import { Box,IconButton, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { TechnicianResponse } from "../../../types/Technician";

type Props = {
    data: TechnicianResponse | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    handleOnPageChange: (page:number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
  }

export function TechnicianTable({
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
          field: "name", 
          headerName: "Nome", 
          flex: 1 
        },
        { 
          field: "email", 
          headerName: "Email", 
          flex: 1 
        },
        { 
          field: "phone", 
          headerName: "Telefone", 
          flex: 1         
        },
        { 
          field: "region", 
          headerName: "Region", 
          flex: 1,
          type: "string"
        },
        { 
          field: "isPartner", 
          headerName: "Parceiro", 
          flex: 0.5 ,
          renderCell: renderIsActiveCell
        },
        { 
            field: "isActive", 
            headerName: "Ativo", 
            flex: 0.5 ,
            renderCell: renderIsActiveCell
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

      function mapDataToGridRows(data: TechnicianResponse) {
        const { data: technicians } = data;
        return technicians.map((technician) => ({
          id: technician.id,
          name: technician.name,
          email: technician.email,
          phone: technician.phone,
          isPartner: technician.isPartner,
          region: technician.personalAddress.baseAddress.region,
          isActive: technician.isActive,
        }));
      }

      function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
          <Typography color={rowData.value ? "primary" : "secondary"}>
            {rowData.value ? "Sim" : "Não"}
          </Typography>
        )
      }

      function renderDetailsActionCell(rowData: GridRenderCellParams) {
        return (

        <Link to={`/technicians/details/${rowData.id}`} 
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
        <Link to={`/technicians/edit/${rowData.id}`} 
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