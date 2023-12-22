import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
    Typography
  } from '@mui/material';
import { Link } from 'react-router-dom';
import { TechnicianDto } from '../../../types/Technician';
  
  type Props = {
      technician: TechnicianDto;
      errors: any;
      isDisabled?: boolean;
      isLoading?: boolean;
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      hadleSelectChange: (e: SelectChangeEvent<Number>) => void;
      handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  
  export function TechnicianForm({
      technician,
      errors,
      isDisabled = false,
      isLoading = false,
      handleSubmit,
      hadleChange,
      hadleSelectChange,
      handleToggle
  }: Props) {

    const baseAddressList = [
        { id: 1, name: 'Centro' },
        { id: 2, name: 'Zona Oeste' }
    ]

    if(isLoading) {
        return <Typography>Carregando...</Typography>
    }

    return (
    
        <Box>
        <form onSubmit={handleSubmit}>

        <Grid container spacing={2} sx={{p: 2}}>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                <TextField 
                    label="número do documento" 
                    name="documentNumber"
                    value={technician.documentNumber}
                    disabled={isDisabled} 
                    onChange={hadleChange}
                    error={errors.documentNumber}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                <TextField 
                    label="nome" 
                    name="name"
                    value={technician.name}
                    disabled={isDisabled} 
                    onChange={hadleChange}
                    error={errors.name}
                    />
                </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                <TextField 
                    label="telefone" 
                    name="phone"
                    value={technician.phone}
                    disabled={isDisabled} 
                    onChange={hadleChange}
                    error={errors.phone}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                <TextField 
                    label="email" 
                    name="email"
                    value={technician.email}
                    disabled={isDisabled} 
                    onChange={hadleChange}
                    error={errors.email}
                    />
                </FormControl>
            </Grid>
           
            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                <TextField 
                    label="endereço" 
                    name="address"
                    value={technician.personalAddress.address}
                    disabled={isDisabled} 
                    onChange={hadleChange}
                    error={errors.address}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                <TextField 
                  label="número" 
                  name="number"
                  value={technician.personalAddress.number || ''}
                  disabled={isDisabled} 
                  onChange={hadleChange}
                  error={errors.number}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
              <TextField 
                  label="bairro" 
                  name="neighborhood"
                  value={technician.personalAddress.neighborhood || ''}
                  disabled={isDisabled} 
                  onChange={hadleChange}
                  error={errors.neighborhood}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
              <TextField 
                  label="cidade" 
                  name="city"
                  value={technician.personalAddress.city || ''}
                  disabled={isDisabled} 
                  onChange={hadleChange}
                  error={errors.city}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
              <TextField 
                  label="estado" 
                  name="state"
                  value={technician.personalAddress.state || ''}
                  disabled={isDisabled} 
                  onChange={hadleChange}
                  error={errors.state}
                  />
              </FormControl>

            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
              <TextField 
                  label="cep" 
                  name="zipCode"
                  value={technician.personalAddress.zipCode || ''}
                  disabled={isDisabled} 
                  onChange={hadleChange}
                  error={errors.zipCode}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <InputLabel id="baseAddress">endereço base</InputLabel>
                  <Select
                    label="endereço base"
                    id="baseAddress"
                    disabled={isDisabled} 
                    name="baseAddressId"
                    displayEmpty
                    value={technician.personalAddress.baseAddress.id} 
                    onChange={hadleSelectChange}
                    >
                    <MenuItem key={0} value={0} selected={true}>
                      {baseAddressList.length > 0 ?  "Selecione um endereço base" : "Sem endereço base"}
                    </MenuItem>
                    {
                      baseAddressList.length > 0 &&
                      baseAddressList.map((baseAddress) => (
                          <MenuItem key={baseAddress.id} value={baseAddress.id}>
                            {baseAddress.name}
                          </MenuItem>
                        ))
                      }
                  </Select>
                  </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isPartner"
                        color="primary"
                        onChange={handleToggle}
                        checked={technician.isPartner || false}
                        inputProps={{ "aria-label": "controlled" }}
                        data-testid="isPartner"
                        disabled={isDisabled}
                      />
                    }
                    label="parceiro?"
                  />
                </FormGroup>
            </Grid>


            <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
              {errors.phone && <p>{errors.phone}</p>}
              {errors.documentNumber && <p>{errors.documentNumber}</p>}
              {errors.name && <p>{errors.name}</p>}
              {errors.email && <p>{errors.email}</p>}
              {errors.address && <p>{errors.address}</p>}
              {errors.number && <p>{errors.number}</p>}
              {errors.neighborhood && <p>{errors.neighborhood}</p>}
              {errors.city && <p>{errors.city}</p>}
              {errors.state && <p>{errors.state}</p>}
              {errors.zipCode && <p>{errors.zipCode}</p>}
            </Grid>

            <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
                <Box display="flex" gap={2} justifyContent="center">
                <Button 
                component={Link} 
                to="/technicians"
                variant="contained" 
                color="primary"
                disabled={isLoading}
                >
                Back
                </Button>

                <Button 
                type="submit" 
                variant="contained" 
                color="success"
                disabled={isDisabled}
                >
                {isLoading ? "Loading..." : "Save"}
                </Button>
                </Box>
            </Grid>
        </Grid>
        </form>
    </Box>
    );
}