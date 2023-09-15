import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../common/Title';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function AvailableProducts({
    availableOptions=[], 
    config=[], 
    primaryField='',
    newSelectionId='', 
    onNewSelection
}) {
    const [selectedModel, setSelectedModal] = React.useState();
    const [filteredRows, setFilteredRows ] = React.useState(availableOptions);
    const [searched, setSearched] = React.useState("");
    const handleChange = (event) => {
        // setSelectedModal(event.target.value);
        onNewSelection(event.target.value);
    };
    const requestSearch = (e) => {
        setSearched(e.target.value);
        const filteredRows = availableOptions.filter((row) => {
          return row.productName.toLowerCase().includes(searched.toLowerCase());
        });
        setFilteredRows(filteredRows);
      };

    React.useEffect(() => {
        if(newSelectionId) {
            setSelectedModal(newSelectionId)
        }
    }, [newSelectionId])
    return (
        <div style={{marginTop: '16px'}}>
            <Title>Available Options</Title>
             {primaryField === 'productId' ?<div className='search-field'><TextField id="standard-basic-search"  InputProps={{ startAdornment: ( <InputAdornment position="start"> <SearchIcon /> </InputAdornment> ), }} variant="standard" 
             placeholder="Search here" value={searched} onChange={requestSearch} onTouch/></div>
               :''}
             {/* <SearchBar availableOptions={availableOptions} handleOnSelect={filterResults}/> */}
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {config.map(field => (
                            <TableCell key={field.fieldName}>{field.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody style={{ maxHeight : 400 }}>
                    {filteredRows.map(option => (
                        <TableRow>
                            <TableCell style={{width: '16px'}}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={selectedModel}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={option[primaryField]} control={<Radio checked={selectedModel === option[primaryField]} />} />
                                </RadioGroup>
                            </TableCell>
                            {config.map(field => (
                                <TableCell key={field.fieldName}>{option[field.fieldName]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}