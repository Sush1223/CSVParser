import Papa from 'papaparse';
import { useState } from 'react';
import "./App.css";

function App() {
   // State to store parsed data
   const [parsedData, setParsedData] = useState([]);
	 
	//  State to store the error
	 const [error, setError] = useState("");

   //State to store table Column name
   const [tableRows, setTableRows] = useState([]);

   //State to store the values
   const [values, setValues] = useState([]);
  const changeHandler = (event) => {
    console.log(event.target.files[0])
		if(event.target.files[0].type==='application/vnd.ms-excel')
		{
				console.log("Valid File");
			Papa.parse(event.target.files[0], {
				header: true,
				skipEmptyLines: true,
				complete: function (results) {
	
					console.log(results.data);
					const rowsArray = [];
					const valuesArray = [];
	
					// Iterating data to get column name and their values
					results.data.map((d) => {
						rowsArray.push(Object.keys(d));
						valuesArray.push(Object.values(d));
					});
	
					// Parsed Data Response in array format
					setParsedData(results.data);
					// console.log(results.data);
	
					// Filtered Column Names
					setTableRows(rowsArray[0]);
	
					// Filtered Values
					setValues(valuesArray);
				},
			});
		}
		else
		{
			console.log("Please Enter a valid File");
			setError("Please Enter a valid File");
			
		}
    
  };
  return (
    <div>
      {/* File Uploader */}
			<div style={{textAlign:"center"}}><h1>CSV PARSER USING PAPAPARSE</h1></div>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
       <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {error ? <div style={{textAlign:"center" ,marginLeft:"350px"}}>
							<h1>Please Enter a valid File</h1>;
						</div> :tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
