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
import { Link } from 'react-router-dom';

type Props = {
    data: OrderResponse | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (page:number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
  }

export function OrderTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,

    
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
          field: "dateTime", 
          headerName: "Data", 
          flex: 1 
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
          field: "orderStatus", 
          headerName: "Status", 
          flex: 1,
          type: "string",
          renderCell: renderStatusCell
        },
        { 
          field: "editAction", 
          headerName: "Edit", 
          flex: 1 ,
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
          vehicleName: order.vehicleName
        }));
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

      function renderStatusCell(rowData: GridRenderCellParams) {
        var statusTranslated = null;
        switch(rowData.value) {
          case "OPEN":
            statusTranslated = "Em aberto";
            break;
          case "IN_PROGRESS":
            statusTranslated = "Em andamento";
            break;
          case "PENDING":
            statusTranslated = "Pendente";
            break;
          case "CANCELED":
            statusTranslated = "Cancelado";
            break;
          case "COMPLETED_SUCCESS":
            statusTranslated = "Concluído";
            break;
          default:
            statusTranslated = "Indefinido";
        }
        return (
          <Typography>
            {statusTranslated}
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