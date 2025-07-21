// import { Select } from "antd";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import searchIcon from "./images/search.svg";
import "./studentsTable.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const data = [
  {
    id: 1,
    name: "Алина Жумабаева",
    group: "Группа (A3)",
    direction: "Английский",
    teacher: "Наталья Светлановна",
  },
  {
    id: 2,
    name: "Алина Жумабаева",
    group: "Группа (A3)",
    direction: "Английский",
    teacher: "Наталья Светлановна",
  },
  {
    id: 3,
    name: "Алина Жумабаева",
    group: "Группа (A3)",
    direction: "Английский",
    teacher: "Наталья Светлановна",
  },
  {
    id: 4,
    name: "Алина Жумабаева",
    group: "Группа (A3)",
    direction: "Английский",
    teacher: "Наталья Светлановна",
  },
  {
    id: 5,
    name: "Алина Жумабаева",
    group: "Группа (A3)",
    direction: "Английский",
    teacher: "Наталья Светлановна",
  },
];
export const StudentsTable = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const menuItemStyle = {
    "&:hover": {
      backgroundColor: "#2DE920",
      color: "#fff",
    },
  };

  return (
    <section className="studentsTable">
      <div className="container">
        <div className="studentsTable__head">
          <div className="studentsTable__head-search">
            <input placeholder="Поиск" type="text" />
            <img src={searchIcon} alt="" />
          </div>
          <FormControl
            sx={{
              width: "35%",
              height: "100%",
              opacity: "60%",
              "& .MuiOutlinedInput-root": {
                color: "#fff", // цвет текста
                "& fieldset": {
                  borderColor: "#fff", // обычная граница
                },
                "&:hover fieldset": {
                  borderColor: "#fff", // при наведении
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2de920", // при нажатии/фокусе (например, оранжевый)
                },
              },
              "& .MuiInputLabel-root": {
                color: "#fff", // цвет label по умолчанию
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#fff", // цвет label при фокусе
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">Направление</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Направление"
              onChange={handleChange}
            >
              <MenuItem value="english" sx={menuItemStyle}>
                Английский
              </MenuItem>
              <MenuItem value="mentalArithmetic" sx={menuItemStyle}>
                Ментальная арифметика
              </MenuItem>
              <MenuItem value="robotics" sx={menuItemStyle}>
                Робототехника
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <table
          border="0"
          cellSpacing="0"
          style={{ borderRadius: "6px" }}
          className="studentsTable__table"
        >
          <thead className="studentsTable__table-head">
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>Группа</th>
              <th>Направление</th>
              <th>Преподаватель</th>
            </tr>
          </thead>
          <tbody className="studentsTable__table-body">
            {data.map((student) => {
              return (
                <tr
                  onClick={() =>
                    navigate(`/admin/students-table/${student.id}`)
                  }
                  key={student.id}
                >
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.group}</td>
                  <td>{student.direction}</td>
                  <td>{student.teacher}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
