import '../../Components/Sasin/CustomerHead.css';

const CusHead = () => {
    return(
        <div>
            <div className="SR-CHeadBar">
                <h2 className="SR-CHeadBarName"> ARADHANA BOOKS & STATIONARY® </h2>
                <ul className="SR-CHeadNav1ul">
                    <li className="SR-CHeadNav1li"> <a className="SR-CHeadNav1Link1" href="/Myaccount"> MY ACCOUNT </a> </li>
                    <li className="SR-CHeadNav1li"> <a className="SR-CHeadNav1Link2" href="/home"> Home </a> </li>
                </ul>
            </div>

           

            <div className="SR-CHeadBar3">
                <ul className="SR-CHeadNav3ul">
                    
                    <li className="SR-CHeadNav3li"> <a className="SR-CHeadNav3Link" href="/wcusview"> WHOLESALE </a> </li>
                    <li className="SR-CHeadNav3li"> <a className="SR-CHeadNav3Link" href="example.com"> COMPLAIN </a> </li>
                    <li className="SR-CHeadNav3li"> <a className="SR-CHeadNav3Link" href="example.com"> ORDERS </a> </li>
                    <li className="SR-CHeadNav3li"> <a className="SR-CHeadNav3Link" href="example.com"> RATINGS </a> </li>
                    <li className="SR-CHeadNav3li"> <a className="SR-CHeadNav3Link" href="example.com"> TRACKING </a> </li>
                    <li className="SR-CHeadNav3li"> <a className="SR-CHeadNav3Link" href="example.com"> DISCOUNTS </a> </li>
                    
                </ul>
            </div>
        </div>
    );
}

export default CusHead;