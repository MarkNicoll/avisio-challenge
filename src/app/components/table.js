import React from "react";

const TableComponent = (props) => {
  const { rows, headers } = props;

  return (
    <div className="tableContainer">
      <table>
        <tr>
          {headers.map((header) => {
            return (
              <th key={header} align="right">
                <b>{header}</b>
              </th>
            );
          })}
        </tr>
        {rows.map((columns) => {
          return (
            <tr>
              {columns.map((column, i) => {
                return (
                  <td key={"item_" + i} align="right">
                    {column}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableComponent;
