import React, { useState, useEffect } from 'react';
import formatedDate from './formatedDate';
import './HoursDay.css';
import Swal from "sweetalert2";
// import deleteHourOfADay from '../../requests/DeleteHourOfADay';


let axios = require("axios");


//This component shows the work hours assigned to a specific day
export default function HoursDay(props) {
    const { value } = props;
    const [isLoading, setLoading] = useState(true);
    const [day, setDay] = useState({});
    const [reqFail, setReqFail] = useState(false);
    const getDay = value.format('YYYYMMDD');


    //Redraws the component when getDay changes its value
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}days/${getDay}`)
            .then((response) => {
                setDay(response.data);
                setLoading(false);
                setReqFail(false);
            })
            .catch(() => {
                setReqFail(true);
                setLoading(false);
            });
    }, [getDay]);


    useEffect(() => {
        //To render when delete hour
    }, [day]);


    //2 different views in case cant load hours or day is empty
    if (isLoading) {
        return <h1>Loading . . .</h1>;
    } else if (reqFail) {
        return <h1>No hay horas asignadas para este día</h1>
    }


    //Sort the hours of the day in ascending order
    if (day['hours'] !== undefined) {
        const hoursLength = day['hours'].length;
        for (let j = 0; j < hoursLength; j++) {
            day['hours'].sort((a, b) => {
                if (a['hour'] > b['hour']) {
                    return 1;
                }
                if (a['hour'] < b['hour']) {
                    return -1;
                }
                return 0;
            });
        }
    }


    async function deleteHour(date, element) {
        // let respone = await deleteHourOfADay(date, element);
        // if (respone === true) {
        //     console.log('ELIMINADO');
        // } else {
        //     console.log('CANCELADO');
        // }
        Swal.fire({
            title: "Estás seguro?",
            text: "No podras recuperarla!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminala!",
        }).then((response) => {
            if (response.isConfirmed) {
                var config = {
                    method: "delete",
                    url: `${process.env.REACT_APP_API_URL}days/${date}/hours/${element['hour']}`,
                    headers: {},
                    data: '',
                };
                axios(config)
                    .then(function (response) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Hora eliminada correctamente",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        axios.get(`${process.env.REACT_APP_API_URL}days/${date}`)
                            .then((response) => {
                                setDay(response.data);
                                setLoading(false);
                                setReqFail(false);
                            })
                            .catch(() => {
                                setReqFail(true);
                                setLoading(false);
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Error al eliminar la hora",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
            }
            if (response.isDismissed) {
                console.log('OE');
            }
        });
    }


    //Render all assigned hours per day
    return (
        <div className='booking_list_container'>
            <div className='card'>
                <div className='info_section'>
                    <p>{formatedDate(day.date)}</p>
                </div>
                {day['hours'].map((elem, index) => (
                    <div key={`${elem}${index}`} className='available'>
                        <div key={elem['hour'] + index} className='hour'>
                            {elem['hour']}:00
                        </div>
                        <div key={elem['available']}>
                            Slots disponibles: {elem["available"]}
                        </div>
                        <div>
                            <button
                                className="deleteBtn"
                                onClick={() => { deleteHour(day.date, elem); }}
                            >.
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
