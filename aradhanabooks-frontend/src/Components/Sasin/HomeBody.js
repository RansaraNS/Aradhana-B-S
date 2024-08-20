import '../Sasin/HomeBody.css';
import HomeSlide from '../Sasin/HomeSlide.js';
import Allitems from './AllItems.js';
import HomeReqBar from './HomeReqBar.js';


const HomeBody = () => {
    return(
        <div className="SR-body">
            <HomeSlide />
            <Allitems />
            <HomeReqBar />
        </div>
    );
}

export default HomeBody;