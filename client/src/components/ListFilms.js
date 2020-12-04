import React, {useState, useMemo, useCallback} from 'react';
import {Link} from 'react-router-dom'
export const ListFilms =  ({films}) => {
    const {items, requestSort, sortConfig} = useSortableData(films);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

        return (
            <table className='table table-bordered'>
                <caption>
                    <h1>FILMS</h1>
                </caption>
                <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('name')}
                            className={getClassNamesFor('name')}
                        >
                            Title
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('release')}
                            className={getClassNamesFor('release')}
                        >
                            YEAR
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('format')}
                            className={getClassNamesFor('format')}
                        >
                            Format
                        </button>
                    </th>
                    <th>
                        Details
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.release}</td>
                        <td>{item.format}</td>
                        <td>
                            <Link to ={`/detail/${item.name}`}>
                                <button className="btn blue">
                                   Detail
                                </button>
                            </Link>
                        </td>
                        <td>
                            <Link to ={`/delete/${item.name}`}>
                                <button className="btn red">
                                    DELETE
                                </button>
                            </Link>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        );
};

const useSortableData = (items, config = null) => {

    const [sortConfig, setSortConfig] = useState(config);
    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};
