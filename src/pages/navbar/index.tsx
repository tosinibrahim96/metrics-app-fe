import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import PixIcon from "@mui/icons-material/Pix";
import GraphBox from "@/components/GraphBox";


const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("/");

  return (
    <GraphBox mb="0.25rem" p="0.5rem 0rem">
      <GraphBox gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Metricsss
        </Typography>
      </GraphBox>

      <GraphBox gap="2rem">
        <Box sx={{"&:hover":{color:palette.grey[700]}}}>
          <Link 
          to="/" 
          onClick={()=> setSelected('dashboard')}
          style={{
            color:selected === 'dashboard' ? 'inherit' : palette.grey[700],
            textDecoration: "Inherit"
          }}
          
          >Dashboard</Link>
        </Box>
        <Box sx={{"&:hover":{color:palette.grey[700]}}}>
          <Link 
          to="/new-metric" 
          onClick={()=> setSelected('new-metric')}
          style={{
            color:selected === 'new-metric' ? 'inherit' : palette.grey[700],
            textDecoration: "Inherit"
          }}
          
          >Create new Metric</Link>
        </Box>
      </GraphBox>
    </GraphBox>
  );
};

export default Navbar;
