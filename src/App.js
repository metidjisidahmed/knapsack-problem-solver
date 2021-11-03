import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import { tableIcons, tableLang } from './materialTableOptions/index';
import { makeStyles } from '@material-ui/core/styles';


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
    /* default table options */
    const tableOptions = {
        filtering: false,
        search: true,
        exportButton: true,
        grouping: true,
        selection: false,
        exportFileName: "Historique_des_réservations"
    };

    /* default table structure */
    const columns = [
        // {field: '_id', title: 'GUID' , export : false},
        { field: 'riderFullName', title: "Nom du client" },
        { field: 'riderPhoneNumber', title: "Telephone du client" },
        { field: 'departureBookingAdress', title: 'Adresse de depart' },
        { field: 'departureDateTrip', title: "Date de depart", defaultGroupOrder: 0, defaultGroupSort: 'desc' },
        { field: 'arrivalBookingAdress', title: "Adresse d'arrivé" },
        // {field : 'arrivalDateTrip' , title: "Date d'arrivé"} ,
        { field: 'bookedSeats', title: 'Nmb de Places reservé' },
        // {field : 'availableSeats' , title: "Place disponible" , export : false} ,
        { field: 'bookingPrice', title: 'Prix de la réservation' },
        { field: 'state', title: 'Etat', export: false },
        // {field : 'homePickUp' , title: 'PickUp' , type : "boolean" , export : false } ,
        // {field : 'homeDrop' , title: 'HomeDrop' , type : "boolean" , export : false } ,
        // {field : 'idTrip' , title: "ID du voayage" } ,
        // {field : 'timestamps' , title: 'Date de creation' } ,
    ];

    return (
    <div className="App">
      <Paper variant="elevation" elevation={8} className={classes.card_paper}  >
        <MaterialTable
            title="Reservations"
            // onRowClick={(event, rowData, toggleDetailPanel)=>{dispatch(copyAndsetSnackBarContent(rowData.riderPhoneNumber))}}
            icons={tableIcons}
            options={tableOptions}
            localization={tableLang}
            columns={columns}
            data={[]}

        />
      </Paper>
    </div>
  );
}

export default App;
