import './App.css';
import MaterialTable, { MTableHeader } from "material-table";
import { tableIcons, tableLang } from './materialTableOptions/index';
import { makeStyles } from '@material-ui/core/styles';
import KnapsackTable from "./components/KnapsackTable";
import { solver, objects, maxCapacity } from './noyau/noyau';
import { useState } from 'react';
import { Button, TextField, Paper, Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Delete } from "@material-ui/icons";
import { Calculate, Replay, Menu } from "@mui/icons-material";
import React from "react";


const useStyles = makeStyles((theme) => ({
    card_paper: {
        padding: "5px", borderRadius: "5px", backgroundColor: "#ffdd00"
    },
    icon_button_green: {
        color: "#39e600"
    },
    icon_button_blue: {
        color: "cyan"
    },
    icon_button_red: {
        color: "#ff3333"
    },
    icon_button_yellow: {
        color: "yellow"
    },
    details_list_root: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
    },
    details_list_inline: {
        display: 'inline',
    },
    details_cards: {
        borderRadius: "15px",
        backgroundColor: "#ffdd00",
    },
    heading_acc: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading_acc: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

}));


function App() {
    const classes = useStyles();
    const [W, setW] = useState(0);
    const [objects, setObjects] = useState([
        {
            weight: 2,
            value: 5
        },
        {
            weight: 1,
            value: 3
        },
        {
            weight: 4,
            value: 7
        },
        {
            weight: 3,
            value: 1
        },
        {
            weight: 5,
            value: 6
        },
    ]);
    const [resultatMode, setResultatMode] = useState(false);
    /* default table options */
    const tableOptions = {
        sorting: true,
        pageSize: 5
    };

    /* default table structure */
    const columns = [
        {
            field: 'weight', title: "Poids ( Wi )", render: rowData => (
                <div className="text-center" style={{ fontSize: '0.8rem' }}>{rowData.weight}</div>
            )
        },
        {
            field: 'value', title: "Profit ( Vi )", render: rowData => (
                <div className="text-center" style={{ fontSize: '0.8rem' }}>{rowData.value}</div>
            )
        },
    ];
    const Header = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            KnapSack Problem solver
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        )


    }
    return (
        <React.Fragment>
            <Header />
            <div className="App pe-5 ps-5 mt-4 mb-4">
                <div className="col-10 offset-1 pt-2 pb-2">
                    <TextField disabled={resultatMode} value={W} onChange={(e) => setW(e.target.value)} error={W <= 0} helperText={'Le poids maximum doit avoit une valeur strictement positive !'} type={'number'} className={'w-100'} label="Spécifiez le poids maximum de votre sac à dos ( W ) :" variant="outlined" />
                </div>
                <Paper variant="elevation" elevation={8} className={classes.card_paper}  >
                    <MaterialTable
                        components={{
                            Header: props => (
                                <MTableHeader {...props} style={{ textAlign: 'center' }} />
                            )
                        }}
                        title="Introduire les objets disponibles ici : "
                        // onRowClick={(event, rowData, toggleDetailPanel)=>{dispatch(copyAndsetSnackBarContent(rowData.riderPhoneNumber))}}
                        icons={tableIcons}
                        options={tableOptions}
                        localization={tableLang}
                        columns={columns}
                        data={objects}
                        editable={!resultatMode ?
                            {
                                onRowAdd: newData => new Promise((resolve, reject) => {
                                    if (newData.weight && newData.value) {
                                        setObjects(oldState => oldState.concat(newData));
                                        resolve();
                                    } else {
                                        reject();
                                    }
                                }),
                                onRowUpdate: (newData, oldData) => {
                                    return new Promise((resolve, reject) => {
                                        let actualData = objects.filter((obj, index) => {
                                            return (obj.weight === oldData.weight && obj.value === oldData.value)

                                        })[0];
                                        let actualIndex = objects.indexOf(actualData);
                                        console.log('Actual index =', actualIndex, 'Actual Data =', actualData);
                                        let newObjects = [...objects];
                                        newObjects[oldData.tableData.id] = newData;
                                        setObjects(newObjects);
                                        resolve();
                                    })
                                },
                                onRowDelete: oldData => {
                                    return new Promise((resolve, reject) => {
                                        let newObjects = [...objects];
                                        newObjects.splice(1, 1);
                                        setObjects(newObjects);
                                        resolve();
                                    })
                                }
                            } : false

                        }
                    />
                </Paper>
                <hr />
                {
                    !resultatMode ? (
                        <div className="col-12 justify-content-center d-flex mb-3">
                            <Button disabled={W <= 0 || !objects.length} onClick={() => setResultatMode(true)} style={!(W <= 0 || !objects.length) ? { color: '#325aa8', borderColor: '#325aa8' } : {}} variant="outlined" startIcon={<Calculate />}>
                                Calculer le résultat
                            </Button>
                        </div>
                    ) : (
                        <div className="col-12 justify-content-center d-flex mb-3">
                            <Button disabled={W <= 0 || !objects.length} onClick={() => setResultatMode(false)} color="secondary" variant="outlined" startIcon={<Replay />}>
                                Réessayer
                            </Button>
                        </div>
                    )
                }

                {
                    resultatMode ? (
                        <KnapsackTable maxCapacity={Number(W)} P={solver([{}, ...objects], Number(W) + 1)} nbObjects={objects.length} />
                    ) : null
                }


            </div>

        </React.Fragment>
    );
}

export default App;
