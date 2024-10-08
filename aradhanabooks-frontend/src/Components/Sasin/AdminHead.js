import '../../Components/Sasin/AdminHead.css';

const AdminHead = () => {
    return(
        <div>
            <div className="SR-AHeadBar">
                <h2 className="SR-AHeadBarName"> ARADHANA BOOKS & STATIONARY® </h2>
                <ul className="SR-AHeadNav1ul">
                    <li className="SR-AHeadNav1li"> <a className="SR-AHeadNav1Link1" href="/home"> HOME </a> </li>
                    <li className="SR-AHeadNav1li"> <a className="SR-AHeadNav1Link2" href="example.com"> LOG OUT </a> </li>
                </ul>
            </div>

            <div className="SR-AHeadBar2">
                <ul className="SR-AHeadNav2ul">
                    <li className="SR-AHeadNav2li"> <a className="SR-AHeadNav2Link" href="/admin-control-panel"> SYSTEM USERS </a> </li>
                    <li className="SR-AHeadNav2li"> <a className="SR-AHeadNav2Link" href="example.com"> ADMIN MESSAGES </a> </li>
                </ul>
            </div>

            <div className="SR-AHeadBar3">
                <ul className="SR-AHeadNav3ul">
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/itemtable"> ITEMS </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/wcall"> WHOLESALE </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/admin/complaints"> COMPLAIN </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/sales-overview"> SALES </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/admin/review/display"> RATINGS </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="example.com"> TRACKING </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/expenses"> EXPENSES </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/delivery"> DELIVERY </a> </li>
                    <li className="SR-AHeadNav3li"> <a className="SR-AHeadNav3Link" href="/discount-manager"> DISCOUNT </a> </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminHead;