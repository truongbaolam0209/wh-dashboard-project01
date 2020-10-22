import React, { useMemo } from 'react';
import { useExpanded, useGroupBy, useTable } from 'react-table';
import styled from 'styled-components';



const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { groupBy, expanded }
    } = useTable(
        {
            columns,
            data
        },
        useGroupBy,
        useExpanded
    );

    const firstPageRows = rows.slice(0, 100);

    return (
        <>
            <pre>
                <code>{JSON.stringify({ groupBy, expanded }, null, 2)}</code>
            </pre>
            <Legend />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.canGroupBy ? (
                                        <span {...column.getGroupByToggleProps()}>
                                            {column.isGrouped ? '🛑 ' : '👊 '}
                                        </span>
                                    ) : null}
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}
                                            style={{
                                                background: cell.isGrouped
                                                    ? '#0aff0082'
                                                    : cell.isAggregated
                                                        ? '#ffa50078'
                                                        : cell.isPlaceholder
                                                            ? '#ff000042'
                                                            : 'white',
                                            }}
                                        >
                                            {cell.isGrouped ? (
                                                <>
                                                    <span {...row.getExpandedToggleProps()}>
                                                        {row.isExpanded ? '👇' : '👉'}
                                                    </span>{' '}
                                                    {cell.render('Cell')} ({row.subRows.length})
                                                </>
                                            )
                                                : cell.isAggregated ? cell.render('Aggregated')
                                                    : cell.isPlaceholder ? null
                                                        : (cell.render('Cell'))}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div>Showing the first 100 results of {rows.length} rows</div>
        </>
    );
};

const Legend = () => {
    return (
        <div style={{ padding: '0.5rem 0' }}>
            <span style={{
                display: 'inline-block',
                background: '#0aff0082',
                padding: '0.5rem',
            }}>
                Grouped
            </span>{' '}
            <span style={{
                display: 'inline-block',
                background: '#ffa50078',
                padding: '0.5rem',
            }}>
                Aggregated
            </span>{' '}
            <span style={{
                display: 'inline-block',
                background: '#ff000042',
                padding: '0.5rem',
            }}>
                Repeated Value
            </span>
        </div>
    );
};


const roundedMedian = (leafValues) => {
    let min = leafValues[0] || 0;
    let max = leafValues[0] || 0;

    leafValues.forEach(value => {
        min = Math.min(min, value)
        max = Math.max(max, value)
    });

    return Math.round((min + max) / 2);
};

const TableDrawingList = ({data}) => {

    const columns = useMemo(() => [
        {
            Header: 'Name',
            columns: [
                {
                    Header: 'Drawing Number',
                    accessor: 'drawingNumber',
                    // aggregate: 'count',
                    // Aggregated: ({ value }) => `${value} Names`,
                },
                {
                    Header: 'Drawing Name',
                    accessor: 'drawingName',
                    // aggregate: 'uniqueCount',
                    // Aggregated: ({ value }) => `${value} Unique Names`,
                },
            ],
        },
        {
            Header: 'Info',
            columns: [
                {
                    Header: 'Drg Type',
                    accessor: 'drgType',
                    // aggregate: 'average',
                    // Aggregated: ({ value }) => `${value} Drg Type`,
                },
                {
                    Header: 'Use For',
                    accessor: 'useFor',
                    // aggregate: 'sum',
                    // Aggregated: ({ value }) => `${value} (total)`,
                },
                {
                    Header: 'Coordinator In Charge',
                    accessor: 'coordinatorInCharge',
                },
                {
                    Header: 'Modeller',
                    accessor: 'modeller',
                    // aggregate: roundedMedian,
                    // Aggregated: ({ value }) => `${value} (med)`,
                },
                {
                    Header: 'Rev',
                    accessor: 'rev',
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                },
            ],
        },
    ], []);

    // const data = useMemo(() => makeData(200), []);

    
    return (
        <Container>
            <Table columns={columns} data={data ? data: []} />
        </Container>
    );
};

export default TableDrawingList;


const Container = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th, td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`;
