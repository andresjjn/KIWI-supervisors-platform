const formatedDate = (date) => {
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    // console.log(date);
    // console.log('Year', year)
    // console.log('Month', month)
    // console.log('Day', day);

    const monthList = {
        '01' : "Enero",
        '02' : "Febrero",
        '03' : "Marzo",
        '04' : "Abril",
        '05' : "Mayo",
        '06' : "Junio",
        '07' : "Julio",
        '08' : "Agosto",
        '09' : "Septiembre",
        '10' : 'Octubre',
        '11' : 'Noviembre',
        '12' : 'Diciembre'
    };

    const finalDate = `${monthList[month]} ${day}`;

    return finalDate;

};

export default formatedDate;
