import { DialogContentText } from '@material-ui/core';
import { DialogContent } from '@mui/material';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export default function AboutDialog({ open, onClose }) {
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>KnapSack Solver</DialogTitle>
        <DialogContent>
            <DialogContentText>
                <h3>Problem description</h3>
                <p>
                    The knapsack problem is a problem in combinatorial optimization:
                    Given a set of items, each with a weight and a value,
                    determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

                </p>
                <h3>App description</h3>
                <p>
                    This App uses the dynamic programming technique to solve this problem.
                    We provide also a way to simualte the algorithm by generating a table demonstrating the steps

                </p>

                <h3>About the authors</h3>
                <div style={{ marginBottom: 20 }}>
                    <h5>Sid Ahmed Metidji</h5>
                    <p>
                        2CS Software engineering student at ESI

                    </p>
                    <Link href="https://github.com/metidjisidahmed/" underline="none">
                        Github
                    </Link>
                </div>
                <div style={{ marginTop: 20 }}>
                    <h5>Mohamed Dhiya Eddine</h5>
                    <p>2CS Software engineering student at ESI

                    </p>
                    <Link href="https://github.com/MohamedGouaouri" underline="none">
                        Github
                    </Link>
                </div>
            </DialogContentText>
        </DialogContent>
    </Dialog>
}