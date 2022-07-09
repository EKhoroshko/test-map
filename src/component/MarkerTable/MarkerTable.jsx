import React, { useState, useEffect } from 'react';
import css from '../MarkerTable/MarkerTable.module.css';

function MarkerTable({ markerList }) {
  const [array, setArray] = useState(null);

  useEffect(() => {
    if (markerList) {
      const colorConversion =
        Object.values(markerList).reduce((acc, item) => (
          // eslint-disable-next-line no-sequences
          (acc[item.color] = (acc[item.color] || 0) + 1), acc
        )
          , {})
      setArray(colorConversion);
    }
  }, [markerList])

  const handleClickDownload = () => {
    const element = document.createElement("a");
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({ ...markerList })
    )}`;
    element.href = jsonString;
    element.download = "geoMarker.json";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  return (
    <div className={css.box}>
      <table >
        <thead >
          <tr >
            <th>Rating</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {array &&
            <tr>
              <td>Total Marker: </td>
              <td>{Object.keys(markerList).length}</td>
            </tr>
          }
          {array && Object.entries(array).map((item, index) => {
            return (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <button
        className={css.btn}
        onClick={handleClickDownload}
      >
        Download
      </button>
    </div>
  )
}

export default MarkerTable