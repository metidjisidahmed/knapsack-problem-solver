import { Table } from 'react-bootstrap';

export default function KnapsackTable({ P, maxCapacity, nbObjects }) {

    return <>
        <Table striped bordered width={20}>
            <tbody>
                {
                    P.map((row, rindex) =>
                        rindex !== 0 ?
                            <tr>
                                {row.map((data, cindex) =>
                                    cindex !== 0 ?
                                        <td >{data}</td>
                                        : null
                                )}
                            </tr> : null
                    )
                }
            </tbody>
        </Table>

        <div>
            The maximum profit is {P[nbObjects - 1][maxCapacity - 1]}
        </div>
    </>
}