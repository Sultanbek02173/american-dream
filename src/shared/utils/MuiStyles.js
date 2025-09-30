export const inputStyle = {
  color: '#fff',
  '& .MuiOutlinedInput-root': {
    // opacity: '60%',
    '& input': {
      opacity: '100%',
      color: '#fff',
    },
    '& label.Mui-focused': {
      color: '#fff',
    },
    '&.Mui-focused fieldset': {
      opacity: '60%',
      // color: '#fff',
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
      opacity: '60%',
    },
    '& fieldset': {
      borderColor: '#fff',
      opacity: '60%',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
    opacity: '60%',
  },
  '& .Mui-focused .MuiInputLabel-root': {
    color: '#fff',
    opacity: '60%',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
};

export const formControlStyle = {
  opacity: '60%',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
  },
  '& .Mui-focused .MuiInputLabel-root': {
    color: '#fff',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
};

export const menuItemStyle = {
  '&:hover': {
    backgroundColor: '#2DE920',
    color: '#fff',
  },
};

export const firstTextFieldSx = {
  width: '572px',
  color: '#FFFFFF',
  '& label': {
    color: '#ffffff83',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2de920',
    },
  },
};

export const secondTextFieldSx = {
  width: '345px',
  color: '#FFFFFF',
  '& label': {
    color: '#ffffff83',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2de920',
    },
  },
};

export const selectSx = {
  width: '50%',
  color: '#fff',
  '& label': {
    color: '#ffffff83',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2de920',
    },
  },
};

// Текстовое поле DatePicker (вписывается в ваш тёмный стиль)
export const datePickerTextFieldSx = {
  opacity: '60%',
  width: '55%',
  color: '#fff',
  // border: '1px solid #fff',
  '& label': { color: '#fff' },
  '& label.Mui-focused': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    // border: '1px solid #fff',
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
    '& input': { color: '#fff' },
    '& fieldset': { borderColor: '#fff' },
    '&:hover fieldset': { borderColor: '#fff' },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiSvgIcon-root': { color: '#fff' }, // иконка календаря
};

// Попап календаря (тёмная тема + ваш зелёный акцент)
export const datePickerPopperSx = {
  '& .MuiPaper-root': {
    backgroundColor: '#111',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
  // Заголовок месяца/года
  '& .MuiPickersCalendarHeader-label, & .MuiPickersArrowSwitcher-button': {
    color: '#fff',
  },
  // Кнопки переключения месяцев/лет
  '& .MuiIconButton-root': {
    color: '#fff',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
  },
  // Дни
  '& .MuiPickersDay-root': {
    color: '#fff',
    '&:hover': { backgroundColor: 'rgba(45,233,32,0.15)' },
    '&.Mui-selected': {
      backgroundColor: '#2de920',
      color: '#000',
      '&:hover': { backgroundColor: '#2de920' },
    },
    '&.MuiPickersDay-today': {
      border: '1px solid #2de920',
    },
    '&.Mui-disabled': { color: 'rgba(255,255,255,0.3)' },
  },
  // Года в режиме выбора года
  '& .MuiPickersYear-yearButton': {
    color: '#fff',
    '&.Mui-selected': {
      backgroundColor: '#2de920',
      color: '#000',
      '&:hover': { backgroundColor: '#2de920' },
    },
  },
};
