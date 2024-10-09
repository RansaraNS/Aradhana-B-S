import mainlogo from '../../Images/Aradhana Books & Stationary Logo.png';
import '../../Components/Sasin/HomeFoot.css';

const HomeFoot = () => {
    return(
        <div className="SR-homeFooter">
            <div className="SR-homeFootUpLine">
                    
            </div>

            <div className="SR-homeFootbody">
                <div className='SR-homeFootbodyArea1'>
                    <img className="SR-homeFootbodyImg" src={mainlogo} alt="Aradhana Books & Stationary" />
                    <h3 clasName="SR-homeFootbodyt1"> Address: “Aradhana” 76 A, Elpitiya Road, </h3>
                    <h3 clasName="SR-homeFootbodyt1"> Hennathota, Dodanduwa. (80250) </h3>
                    <h3 clasName="SR-homeFootbodyt1"> Hotline: +94 91 572 0544 </h3>
                    <h3 clasName="SR-homeFootbodyt1"> Email: support@aradhanaexbooks.com </h3>
                </div>

                <div className='SR-homeFootbodyArea2'>
                    <h2 clasName="SR-homeFootbodyt2title"> MEDIA </h2>
                    <h3 clasName="SR-homeFootbodyt2"> <a className='SR-homeFootbodyt2link' href='/fblink'> Facebook </a> </h3>
                    <h3 clasName="SR-homeFootbodyt2"> <a className='SR-homeFootbodyt2link' href='/xlink'> Twitter </a> </h3>
                    <h3 clasName="SR-homeFootbodyt2"> <a className='SR-homeFootbodyt2link' href='/instalink'> Instagram </a> </h3>
                    <h3 clasName="SR-homeFootbodyt2"> <a className='SR-homeFootbodyt2link' href='/threadlink'> Thread </a> </h3>
                    <h3 clasName="SR-homeFootbodyt2"> <a className='SR-homeFootbodyt2link' href='/ytlink'> YouTube </a> </h3>
                    <h3 clasName="SR-homeFootbodyt2"> <a className='SR-homeFootbodyt2link' href='/lilink'> LinkedIn </a> </h3>
                </div>

                <div className='SR-homeFootbodyArea3'>
                    <h2 clasName="SR-homeFootbodyt3title"> POLICIES </h2>
                    <h3 clasName="SR-homeFootbodyt3"> <a className='SR-homeFootbodyt3link' href='/pplink'> Privacy Policy </a> </h3>
                    <h3 clasName="SR-homeFootbodyt3"> <a className='SR-homeFootbodyt3link' href='/rplink'> Return Policy </a> </h3>
                    <h3 clasName="SR-homeFootbodyt3"> <a className='SR-homeFootbodyt3link' href='/terms'> Terms & Condition </a> </h3>
                </div>

                <div className='SR-homeFootbodyArea4'>
                    <h2 clasName="SR-homeFootbodyt4title"> QUICK LINKS </h2>
                    <h3 clasName="SR-homeFootbodyt4"> <a className='SR-homeFootbodyt4link' href='/fblink'> Cart </a> </h3>
                    <h3 clasName="SR-homeFootbodyt4"> <a className='SR-homeFootbodyt4link' href='/xlink'> Tracking Portal </a> </h3>
                    <h3 clasName="SR-homeFootbodyt4"> <a className='SR-homeFootbodyt4link' href='/complaint/add'> Complain </a> </h3>
                    <h3 clasName="SR-homeFootbodyt4"> <a className='SR-homeFootbodyt4link' href='/threadlink'> About Us </a> </h3>
                    <h3 clasName="SR-homeFootbodyt4"> <a className='SR-homeFootbodyt4link' href='/ytlink'> My Account </a> </h3>
                </div>
            </div>

            <div className="SR-homeFootdownLine">
                <h2 className='SR-homeFootdownLinetitle'> COPYRIGHT © ARADHANA BOOKS & STATIONARY DESIGN BY ITP24R_B2_04 </h2>
            </div>
        </div>
    );
}

export default HomeFoot;