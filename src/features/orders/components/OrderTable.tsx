import { OrderResponse } from "../../../types/Order";
import { 
    DataGrid ,  
    GridColDef, 
    GridRenderCellParams,
    GridToolbar,
    GridFilterModel
  } from '@mui/x-data-grid';
import { Box,IconButton, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

type Props = {
    data: OrderResponse | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    handleOnPageChange: (page:number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
  }

export function OrderTable({
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
          field: "dateTime", 
          headerName: "Data", 
          flex: 1 
        },
        { 
          field: "orderStatus", 
          headerName: "Status", 
          flex: 1,
          renderCell: renderStatusCell
        },
        { 
          field: "period", 
          headerName: "Período", 
          flex: 1 ,
          renderCell: renderPeriodCell
        },
        { 
          field: "vehicleName", 
          headerName: "Veículo", 
          flex: 1
        },
        { 
          field: "detailsAction", 
          headerName: "Details", 
          flex: 0.5 ,
          renderCell: renderDetailsActionCell
        },
        { 
          field: "editAction", 
          headerName: "Edit", 
          flex: 0.5 ,
          renderCell: renderEditActionCell
        }
      ];

      function mapDataToGridRows(data: OrderResponse) {
        const { data: orders } = data;
        return orders.map((order) => ({
          id: order.id,
          description: order.description,
          orderStatus: order.orderStatus,
          period: order.period,
          dateTime: new Date(order.dateTime).toLocaleDateString("pt-BR"),
          vehicleName: order.vehicle.name,
        }));
      }

      function mapStatus(status: string){
        switch (status) {
          case "OPEN":
            return "Em aberto";
          case "IN_PROGRESS":
            return "Em andamento";
          case "PENDING":
            return "Pendente";
          case "CANCELED":
            return "Cancelada";
          case "COMPLETED_SUCCESS":
            return "Concluído";
          default:
            return "Indefinido";
        }
      }

      function renderStatusCell(rowData: GridRenderCellParams) {
        let status = rowData.row.orderStatus;
        return (
          <span>{mapStatus(status)}</span>
        );
      }

      function renderDetailsActionCell(rowData: GridRenderCellParams) {
        return (

        <Link to={`/orders/details/${rowData.id}`} 
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
        <Link to={`/orders/edit/${rowData.id}`} 
        style={{ textDecoration: "none" }}
        >
            <IconButton>
              <BorderColorIcon color='primary'/>
            </IconButton>
            </Link>
        )
      }
      
      function renderPeriodCell(rowData: GridRenderCellParams) {
        var periodTranslated = null;
        if(rowData.value === "MORNING"){
          periodTranslated = "Manhã";
        }
        else{
          periodTranslated = "Tarde";
        }
        return (
          <Typography>
            {periodTranslated}
          </Typography>
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