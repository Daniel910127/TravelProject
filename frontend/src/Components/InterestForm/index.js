import { useState,useEffect } from "react";
import { Button, Grid, Box, Typography, } from "@mui/material";
import axios from 'axios';
import { useSession } from '../../contexts/SessionContext';
import {
  ParkOutlined,
  HikingOutlined,
  EmojiNatureOutlined,
  YardOutlined,
  ColorLensOutlined,
  MuseumOutlined,
  LandscapeOutlined,
  StorefrontOutlined,
  TempleBuddhistOutlined,
  Shop2Outlined,
  TempleHinduOutlined,
  FactoryOutlined,
  AttractionsOutlined,
} from "@mui/icons-material";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	page: {
		marginTop: theme.spacing(12),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));
const PrettoSlider = styled(Slider)({

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


function Interest() {
  const {id,account,username,access,refresh, login, logout } = useSession();
  axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    si_pg: 0,
    si_os: 0,
    si_tp: 0,
    si_ee: 0,
    si_ff: 0,
    si_la: 0,
    si_le: 0,
    si_ns: 0,
    si_np: 0,
    si_rt: 0,
    si_se: 0,
    si_ha: 0,
    si_tf: 0
  });
   useEffect(() => {
    axios.post('http://127.0.0.1:8000/api/interest-list/',{ id }).then(response => {
        setFormData({
          id:id,
            si_pg: response.data.si_pg,
            si_os: response.data.si_os,
            si_tp: response.data.si_tp,
            si_ee: response.data.si_ee,
            si_ff: response.data.si_ff,
            si_la: response.data.si_la,
            si_le: response.data.si_le,
            si_ns: response.data.si_ns,
            si_np: response.data.si_np,
            si_rt: response.data.si_rt,
            si_se: response.data.si_se,
            si_ha: response.data.si_ha,
            si_tf: response.data.si_tf,
        });
      })
      .catch(error => console.error(error));
  }, []);

  const interests = [
    {
      i_Key: "si_pg",
      i_Name: "公園綠地",
      i_Icon: ParkOutlined,
      value:formData.si_pg
    },
    { i_Key: "si_os", i_Name: "戶外運動", i_Icon: HikingOutlined },
    { i_Key: "si_tp", i_Name: "主題園區", i_Icon: AttractionsOutlined},
    { i_Key: "si_ee", i_Name: "生態教育", i_Icon: EmojiNatureOutlined },
    { i_Key: "si_ff", i_Name: "休閒農漁", i_Icon: YardOutlined},
    { i_Key: "si_la", i_Name: "在地藝文", i_Icon: ColorLensOutlined},
    { i_Key: "si_le", i_Name: "地方展館", i_Icon: MuseumOutlined},
    { i_Key: "si_ns", i_Name: "自然景觀", i_Icon: LandscapeOutlined},
    { i_Key: "si_np", i_Name: "夜市夜遊", i_Icon: StorefrontOutlined},
    { i_Key: "si_rt", i_Name: "宗教廟宇", i_Icon: TempleBuddhistOutlined},
    { i_Key: "si_se", i_Name: "消費娛樂", i_Icon: Shop2Outlined },
    { i_Key: "si_ha", i_Name: "歷史古蹟", i_Icon: TempleHinduOutlined},
    { i_Key: "si_tf", i_Name: "觀光工廠", i_Icon: FactoryOutlined },
  ];


  const handleSubmit= event => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/interest-update/', formData)
      .then(response => {
        console.log(response.data['message']);
        setEditing(false);
      })
      .catch(error => console.error(error));
  };
  return (
    <Box
      component="form"
      noValidate
      className={classes.page}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        {interests.map((interest) => (
          <Grid item xs={6} key={interest.i_Key}>
            <interest.i_Icon color="primary"/>
            <Typography gutterBottom>{interest.i_Name}</Typography>
            <PrettoSlider
              valueLabelDisplay="auto"
              min={0}
              max={10}
              value={formData[interest.i_Key]} 
              onChange={(event, data) => {
              const updatedFormData = {
              ...formData,
              [interest.i_Key]: data
              };
            setFormData(updatedFormData);
            setEditing(true);
        }}
    />
          </Grid>
        ))}
        
      </Grid>
      {editing ? (
      <Button type="submit" size="medium"variant="contained" color="primary">儲存</Button>):
      (<Typography></Typography>)
    }
    </Box>
  );
}
export default Interest;