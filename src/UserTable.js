import React, { useState } from "react";
import "./UserTable.css";

const UserTable = ({ users }) => {
  const widthRatios = [0.3, 0.1, 0.1, 0.2, 0.3];

  if (widthRatios.reduce((acc, current) => acc + current, 0) !== 1) {
    throw new Error("Недопустимое соотношение ширин колонок");
  }

  var widths = widthRatios.map((percent) => window.innerWidth * percent);

  const [columnWidths, setColumnWidths] = useState(widths);

  const onResize = (e, index) => {
    e.preventDefault();
    const startX = e.clientX || e.touches[0].clientX;
    const startWidth = columnWidths[index];

    const mouseMoveHandler = (e) => {
      const currentX = e.clientX || e.touches[0].clientX;
      const newWidth = Math.max(50, startWidth + (currentX - startX)) + "px";
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        newWidths[index] = newWidth;
        return newWidths;
      });
    };

    const mouseUpHandler = () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("touchmove", mouseMoveHandler);
      window.removeEventListener("touchend", mouseUpHandler);
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("touchmove", mouseMoveHandler);
    window.addEventListener("touchend", mouseUpHandler);
  };
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {["ФИО", "Возраст", "Пол", "Номер телефона", "Адрес"].map(
              (header, index) => (
                <th
                  className="table-column table-column__head"
                  key={index}
                  style={{ width: columnWidths[index] }}
                >
                  {header}
                  <div
                    className="resizer"
                    onMouseDown={(e) => onResize(e, index)}
                    onTouchStart={(e) => onResize(e, index)}
                  />
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="table-column">
                {user.firstName} {user.lastName}
              </td>
              <td className="table-column table-column__center">{user.age}</td>
              <td className="table-column table-column__center">
                {user.gender}
              </td>
              <td className="table-column">{user.phone}</td>
              <td className="table-column">
                {user.address.city}, {user.address.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
