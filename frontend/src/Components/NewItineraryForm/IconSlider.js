import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)({
  height: 8,
  width: "100%",
  "& .airbnb-bar": {
    height: 9,
    width: 1,
    backgroundColor: "currentColor",
    marginLeft: 1,
    marginRight: 1,
  },

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },

    "&:hover": {
      boxShadow: "0 0 0 7px rgba(25, 118, 210, 0.36)",
    },

    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#1976d2",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

{
  /* <IconSlider
              min={1}
              max={10}
              control={control}
              name={interest.i_Key}
              Icon={interest.i_Icon}
            ></IconSlider> */
}

const IconSlider = ({ Icon, ...otherProps }) => {
  //const { form, setForm } = useContext(FormStateContext);
  // const { max, min, control, name, Icon } = props;
  // const [value, setValue] = useState(0);
  const { value } = otherProps;

  function IconThumbComponent({ children, ...other }) {
    return (
      <SliderThumb {...other}>
        {children}
        <Icon style={{ fontSize: "20px" }} />
      </SliderThumb>
    );
  }

  return (
    <PrettoSlider
      {...otherProps}
      valueLabelDisplay="auto"
      // aria-label={name}
      // min={min}
      // max={max}
      // value={value}
      // value={field.value}
      slots={{ thumb: IconThumbComponent }}
    />
  );
};

export default IconSlider;
