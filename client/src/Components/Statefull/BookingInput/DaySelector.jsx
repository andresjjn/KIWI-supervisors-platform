import React from 'react'

export default function DaySelector(props) {
    const { arr, onClick } = props;

    return (
        <div className="daySelection">
            <button onClick={() => onClick(arr[0])}>LUN-{Number(arr[0])}</button>
            <button onClick={() => onClick(arr[1])}>MAR-{Number(arr[1])}</button>
            <button onClick={() => onClick(arr[2])}>MIÉ-{Number(arr[2])}</button>
            <button onClick={() => onClick(arr[3])}>JUE-{Number(arr[3])}</button>
            <button onClick={() => onClick(arr[4])}>VIE-{Number(arr[4])}</button>
            <button onClick={() => onClick(arr[5])}>SÁB-{Number(arr[5])}</button>
            <button onClick={() => onClick(arr[6])}>DOM-{Number(arr[6])}</button>
        </div>
    );
}
