import ShopIcon from '../../Images/shopicon.png'
import '../../Components/Sasin/HomeReqBar.css'
import { Link } from "react-router-dom";

const HomeReqBar = () => {
    return(
        <div className='SR-reqBarTop'>
            <div className='SR-reqBar'>
                <div className='SR-reqBarImgBack'>
                    <img className='SR-reqBarImg' src={ShopIcon} alt='Re Seller Shop Icon' />
                </div>

                <div className='SR-reqBarTitle'>
                    <h2 className='SR-reqBarHeading'> Become a Authorized Distributor </h2>
                    <div className='SR-reqBarApplyBar'>
                    <Link to="/wcform"><button className='SR-reqBarApply'> APPLY NOW </button></Link>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default HomeReqBar;