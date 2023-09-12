import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CustomChip = () => {
    return (
        <div style={
            {
                border: '1px solid #53536f',
                background: '#53536f',
                color: '#FFF',
                padding: '1px',
                marginLeft: '5px'
            }
        }>
            Current Plan
        </div>
    )
}

const getColumns = (selection=[]) => {
    const columns = [
        { 
          field: 'name', 
          headerName: 'EP Name', 
          width: 350 ,
          renderCell:(params) => (
              <React.Fragment>
                  {params.value}
                  {selection && selection.length && selection.includes(params.row.id) && <CustomChip />}
              </React.Fragment>
              
          )
        },
        { field: 'type', headerName: 'EP Type', width: 130 },
        { field: 'grossAmount', headerName: 'Gross Amount', width: 70 },
        { field: 'netAmount', headerName: 'Net Amount', width: 70 },
        { field: 'tax', headerName: 'Tax', width: 70 },
      //   {
      //     field: 'age',
      //     headerName: 'Age',
      //     type: 'number',
      //     width: 90,
      //   },
      //   {
      //     field: 'fullName',
      //     headerName: 'Full name',
      //     description: 'This column has a value getter and is not sortable.',
      //     sortable: false,
      //     width: 160,
      //     valueGetter: (params) =>
      //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      //   },
      ];
      return columns; 
}


const rows = [
  { experinceProductId: 'a0U5i0000081ugREAQ', epName: 'Additional Driver', epType: 'Add On', grossAmount: 20, netAmount: 35, tax: 20},
  { experinceProductId: 2, epName: 'Fuel Card', epType: 'Add On', grossAmount: 30, netAmount: 42, tax: 20},
  { experinceProductId: 3, epName: 'Addiional Insurance', epType: 'Add On', grossAmount: 30, netAmount: 45, tax: 20},
  { experinceProductId: 4, epName: 'Child Safety', epType: 'Add On', grossAmount: 20, netAmount: 16, tax: 20},
  { experinceProductId: 5, epName: 'Extra Service', epType: 'Add On', grossAmount: 30, netAmount: 23, tax: 20},
  { experinceProductId: 6, epName: 'Dep Insurance', epType: 'Add On', grossAmount: 30, netAmount: 150, tax: 20},
];

export default function ManageExpProduct({
  availableExpProducts, 
  currentSelectionDetails=[], 
  newSelectionData=[],
  onNewSelection
}) {
    const [currentSelection, setCurrentSelection] = React.useState(['a0U5i0000081ugREAQ', 'a0U5i0000081ugYEAQ']);
    const [newSelection, setNewSelection] = React.useState();
    const availableOptions = availableExpProducts.map(item => {
        return {
            ...item,
            id: item.experienceProductId
        }
    })
    const setSelection = (selection) => {
        // setNewSelection(selection);
        onNewSelection(selection)
    }
    React.useEffect(() => {
      setNewSelection(newSelectionData);
    }, [newSelectionData])
    React.useEffect(()=> {
        let tempSelection = []
        currentSelectionDetails.forEach(item => {
            tempSelection.push(item.experienceProductId || item.contractVersionEPId);
        })
        setCurrentSelection(tempSelection);
        if(!newSelectionData || !newSelectionData.length) {
          setNewSelection(tempSelection);
        }
    },[])
    const columns = getColumns(currentSelection)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={availableOptions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowSelectionModel={newSelection}
        onRowSelectionModelChange={(rowSelectionModel) => {setSelection(rowSelectionModel)}}
      />
    </div>
  );
}
