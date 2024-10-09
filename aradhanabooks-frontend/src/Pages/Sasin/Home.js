import { Box } from "@mui/material";
import HomeHead from "../../Components/Sasin/HomeHead"
import HomeBody from "../../Components/Sasin/HomeBody";
import HomeFoot from "../../Components/Sasin/HomeFoot";

const Home = () => {
    return(
        <Box>
            <HomeHead />
            <HomeBody />
            <HomeFoot />
        </Box>
    )
}

export default Home;