import ShopIcon from '../../Images/shopicon.png'
import '../../Components/Sasin/HomeReqBar.css'

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
                        <h3 className='SR-reqBarApply'> APPLY NOW </h3>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default HomeReqBar;