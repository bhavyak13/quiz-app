import { Outlet } from 'react-router-dom'

import './TempLay.css'
import Navbar from '../Navbar/Navbar'

function TempLay() {
    // club header and navbar
    return (
        <div>
            <Navbar />
            <div className='root'>
                <Outlet />
            </div>
        </div>
    );
}
export default TempLay;