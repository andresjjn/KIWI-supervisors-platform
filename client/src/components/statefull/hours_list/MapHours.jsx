import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';


/**
 * MapHours - Create a list of hours.
 * @param day Array to map.
 * @param onClick Function to pass to onClick child.
 */
const MapHours = ({ isAdmin, day, onClick, userId }) => {
    const beforeDay = Number(day.date);
    const today = Number(Moment().format('YYYYMMDD'));

    function isAdded(slots) {
        for (let slot of slots) {
            if (!isAdmin && slot.id === userId) {
                return true;
            }
        }
        return false;
    }

    return day.hours.map((elem, index) =>
        <div key={`available ${elem.hour}`} className={isAdded(elem.slots) ? 'assigned' : 'available'}>
            <div key={`hour ${elem.hour}`} className='hour'>{elem['hour']}:00</div>
            <div key={elem['available']}>Slots disponibles: {elem["available"]}</div>
            <div key={`price ${elem.price}`} >Precio: {elem["price"]}</div>
            <div>
                {isAdmin && (beforeDay >= today) &&
                    <button className="deleteBtn" onClick={() => onClick[0](day.date, elem.hour, index)}>.
                </button>}
                {!isAdmin && (beforeDay >= today) && !isAdded(elem.slots) &&
                    <button className="addBtn" onClick={() => onClick[1](day.date, elem.hour, index)}>.
                </button>}
                {!isAdmin && (beforeDay >= today) && isAdded(elem.slots) &&
                    <button className="minusBtn" onClick={() => onClick[2](day.date, elem.hour, index)}>.
                </button>}
            </div>
        </div>
    );
}

const mapStoreToProps = state => ({
    isAdmin: state.isAdmin,
    userId: state.userId
})

export default connect(mapStoreToProps, {})(MapHours);
