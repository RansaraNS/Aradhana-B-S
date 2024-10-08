import mainlogo from '../../Images/Aradhana Books & Stationary Logo.png'
import usericon from '../../Images/userAccount.png'
import shopcart from '../../Images/shoppingCart.png'
import hotline from '../../Images/hotLine.png'
import './HomeHead.css';
import { Link } from "react-router-dom";

const HomeHead = () => {
    return(
        <div className="SR-head">
            <div className="SR-head1">
                <img className="SR-headimg" src={mainlogo} alt="Aradhana Grocery Logo" />

                <div className='SR-headtitleSet'>
                    <h2 className='SR-headtitle'> Aradhana Books & Stationary </h2>
                    <h2 className='SR-headsubtitle'> Experience the Difference in Every Aisle. </h2>
                </div>

                <div className="SR-headtitleSet2">
                    <div className="SR-topsection">
                        <Link to="/login"><img className="SR-icon" src={usericon} alt="User Account Icon" /></Link>
                        <Link to="/cart"><img className="SR-icon" src={shopcart} alt="Shopping Cart Icon" /></Link>
                    </div>
                    <div className="SR-bottomsection">
                        <img className="SR-phoneicon " src={hotline} alt="HotLine Icon" />
                        <span className="SR-phonenumber">+9491 572 0544</span>
                    </div>
                </div>
            </div>
            
            <nav className='SR-headNav'>
                <ul className='SR-headul'>
                    <li className='SR-headli'> <a className='SR-headlink' href='/home'> Home </a> </li>
                    <li className='SR-headli'> <a className='SR-headlink' href='/item'> Items </a> </li>
                    <li className='SR-headli'> <a className='SR-headlink' href='/review/add'> Ratings </a> </li>
                    <li className='SR-headli'> <a className='SR-headlink' href='/wcform'> Whole Sale </a> </li>
                    <li className='SR-headli'> <a className='SR-headlink' href='/complaint/add'> Complain </a> </li>
                    <li className='SR-headli'> <a className='SR-headlink' href='/CusTrack'> Tracking Portal </a> </li>
                    <li className='SR-headli'> <a className='SR-headlink' href='/discount-page'> Loyalty Discount </a> </li>
                    <li className='SR-headli'> <a className='SR-headlink' href='/aboutus'> About Us </a> </li>
                </ul>
            </nav>

        </div>
    );
}

export default HomeHead;