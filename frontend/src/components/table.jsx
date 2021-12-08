import { Table as TableStrap } from "reactstrap";
import classNames from "classnames";

const Table = ({ rows, headers, className }) => {
  return (
    <TableStrap className={classNames("mb-0", className)}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {headers.map((header) => (
              <td key={`${row.id}_${header.key}`}>{row[header.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableStrap>
  );
};

export default Table;
