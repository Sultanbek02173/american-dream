import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { data } from "../studentsTable/StudentsTable";
import bilol from "./image.jpg";
import "./studentsDetail.scss";
import { useState } from "react";
// import { Select } from "antd";

export const StudentsDetail = () => {
  const { id } = useParams();
  const detail = data.find((item) => item.id === id); // Example to find a student by id
  console.log(detail);
  const [value, setValue] = useState("");
  // const navigate = useNavigate();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const menuItemStyle = {
    "&:hover": {
      backgroundColor: "#2DE920",
      color: "#fff",
    },
  };
  const inputStyle = {
    opacity: "60%",
    color: "#fff",
    "& .MuiOutlinedInput-root": {
      "& input": {
        opacity: "100%",
        color: "#fff", // 👈 цвет текста, который вводит пользователь
      },
      "&.Mui-focused fieldset": {
        // opacity: "60%",
        borderColor: "#fff", // при нажатии/фокусе
      },
      "&:hover fieldset": {
        borderColor: "#fff", // при наведении
      },
      "& fieldset": {
        borderColor: "#fff", // обычная граница
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff", // цвет label по умолчанию
    },
    "& .Mui-focused .MuiInputLabel-root": {
      color: "#fff", // цвет label при фокусе
    },
  };
  return (
    <section className="studentsDetail">
      <div className="container">
        <form className="studentsDetail__form">
          <img className="studentsDetail__form-avatar" src={bilol} alt="" />
          <div className="studentsDetail__form-inputs">
            <TextField
              id="outlined-basic"
              label="Имя"
              value={"Алина"}
              variant="outlined"
              sx={{ ...inputStyle, width: "45%" }}
            />
            <TextField
              id="outlined-basic"
              label="Фамилия"
              value={"Жумабаева"}
              variant="outlined"
              sx={{ ...inputStyle, width: "55%" }}
            />
          </div>
          <div className="studentsDetail__form-inputs">
            <TextField
              id="outlined-basic"
              label="Телеграм"
              value={"@alin1244"}
              variant="outlined"
              sx={{ ...inputStyle, width: "55%" }}
            />
            <TextField
              id="outlined-basic"
              label="Телефон номер"
              value={"+996 500 123 456"}
              variant="outlined"
              sx={{ ...inputStyle, width: "45%" }}
            />
          </div>
          <div className="studentsDetail__form-inputs">
            <TextField
              id="outlined-basic"
              label="Логин"
              value={"alinaknzzz12"}
              variant="outlined"
              sx={{ ...inputStyle, width: "45%" }}
            />
            <TextField
              id="outlined-basic"
              label="Пароль"
              value={"r_12lfomt"}
              variant="outlined"
              sx={{ ...inputStyle, width: "55%" }}
            />
          </div>
          <div className="studentsDetail__form-inputs">
            <TextField
              id="outlined-basic"
              label="Преподаватель"
              value={"Алия Калымбекова"}
              variant="outlined"
              sx={{ ...inputStyle, width: "55%" }}
            />
            {/* <TextField
              id="outlined-basic"
              label="Фамилия"
              value={"Жумабаева"}
              variant="outlined"
              sx={{ ...inputStyle, width: "45%" }}
            /> */}
            <FormControl
              sx={{
                width: "45%",
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
                    borderColor: "#fff", // при нажатии/фокусе (например, оранжевый)
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
        </form>
      </div>
    </section>
  );
};
