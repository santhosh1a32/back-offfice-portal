import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../common/Title';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
    const handleChange = (event) => {
        // setSelectedModal(event.target.value);
        onNewSelection(event.target.value);
    };
    React.useEffect(() => {
        if(newSelectionId) {
            setSelectedModal(newSelectionId)
        }
    }, [newSelectionId])
    return (
        <div style={{marginTop: '16px'}}>
            <Title>Available Options</Title>
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
                    {availableOptions.map(option => (
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