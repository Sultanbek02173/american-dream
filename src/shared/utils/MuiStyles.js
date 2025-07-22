export const inputStyle = {
  opacity: '60%',
  color: '#fff',
  '& .MuiOutlinedInput-root': {
    '& input': {
      opacity: '100%',
      color: '#fff',
    },
    '&.Mui-focused fieldset': {
      // opacity: "60%",
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '& fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
  },
  '& .Mui-focused .MuiInputLabel-root': {
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
};

export const menuItemStyle = {
  '&:hover': {
    backgroundColor: '#2DE920',
    color: '#fff',
  },
};
