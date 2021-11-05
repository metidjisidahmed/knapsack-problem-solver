import { Table } from 'react-bootstrap';

export default function KnapsackTable({ P, maxCapacity, nbObjects }) {

    return <div className="ks">
        <Table striped bordered width={20}>
            <tbody>
                {
                    P.map((row, rindex) =>
                        rindex !== 0 ?
                            <tr key={rindex}>
                                {row.map((data, cindex) =>
                                    cindex !== 0 ?
                                        <td key={rindex * 100 + cindex} >{data}</td>
                                        : null
                                )}
                            </tr> : null
                    )
                }
            </tbody>
        </Table>

        <h2>The maximum profit is {P[nbObjects][maxCapacity]}</h2>
    </div>
}
