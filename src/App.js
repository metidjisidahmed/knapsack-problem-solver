import logo from './logo.svg';
import './App.css';
import { Paper } from "@material-ui/core";
import MaterialTable , {MTableHeader} from "material-table";
import { tableIcons, tableLang } from './materialTableOptions/index';
import { makeStyles } from '@material-ui/core/styles';
import KnapsackTable from "./components/KnapsackTable";
import {solver , objects , maxCapacity} from './noyau/noyau';
import { useState} from 'react'


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
    const [objects, setObjects] = useState([
        {
            weight : 2,
            value : 5
        },
        {
            weight : 1,
            value :3
        },
        {
            weight :4 ,
            value :7
        },
        {
            weight :3 ,
            value :1
        },
        {
            weight :5 ,
            value :6
        },
    ]);
    /* default table options */
    const tableOptions = {
        sorting : true,
        pageSize : 5
    };

    /* default table structure */
    const columns = [
        { field: 'weight', title: "Poids" , render: rowData => (
        <div className="text-center" style={{fontSize : '0.8rem'}}>{rowData.weight}</div>
    )  },
        { field: 'value', title: "Profit" , render: rowData => (
                <div className="text-center" style={{fontSize : '0.8rem'}}>{rowData.value}</div>
            ) },
    ];

    return (
    <div className="App pe-5 ps-5 mt-4 mb-4">
      <Paper variant="elevation" elevation={8} className={classes.card_paper}  >
        <MaterialTable
            components={{
                Header: props => (
                       <MTableHeader {...props}  style={{textAlign : 'center'}}/>
                )
            }}
            title="Introduire les objets disponibles ici : "
            // onRowClick={(event, rowData, toggleDetailPanel)=>{dispatch(copyAndsetSnackBarContent(rowData.riderPhoneNumber))}}
            icons={tableIcons}
            options={tableOptions}
            localization={tableLang}
            columns={columns}
            data={objects}
            editable={
                {
                    onRowAdd : newData=>new Promise((resolve , reject)=>{
                        if(newData.weight && newData.value){
                            setObjects(oldState => oldState.concat(newData));
                            resolve();
                        }else{
                            reject();
                        }
                    }),
                    onRowUpdate: (newData, oldData) => {
                        return new Promise((resolve , reject)=>{
                            let actualData = objects.filter((obj, index) => {
                                return (obj.weight === oldData.weight && obj.value === oldData.value)

                            })[0];
                            let actualIndex = objects.indexOf(actualData);
                            console.log('Actual index =', actualIndex , 'Actual Data =', actualData);
                            let newObjects = [...objects];
                            newObjects[oldData.tableData.id] = newData;
                            setObjects(newObjects);
                            resolve();
                        })
                    },
                    onRowDelete : oldData => {
                        return new Promise((resolve , reject)=>{
                            let newObjects = [...objects];
                            newObjects.splice(1, 1);
                            setObjects(newObjects);
                            resolve();
                        })
                    }
                }

            }
        />
      </Paper>
        <hr/>
        <KnapsackTable maxCapacity={maxCapacity} P={solver(objects , 10+1)} nbObjects={objects.length}/>
    </div>
  );
}

export default App;
