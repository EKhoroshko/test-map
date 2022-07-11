import React, { useState, useEffect } from 'react';
import { colors, colorWeight } from '../../helper/colors';
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

  const sumOneMarker = (count, color) => {
    return colorWeight[color] * count;
  }

  const totalMarkerWeight = () => {
    if (array) {
      return Object.entries(array).map(item => {
        return colorWeight[item[0]] * item[1]
      }).reduce((acc, item) => acc + item, 0)
    }
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
              <td>Total: </td>
              <td>{totalMarkerWeight()}</td>
            </tr>
          }
          {array && Object.entries(array).map((item, index) => {
            return (
              <tr key={index}>
                <td>{colors.get(item[0])}</td>
                <td>{sumOneMarker(item[1], item[0])}</td>
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