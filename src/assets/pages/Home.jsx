import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [options, setOptions] = useState([]);
  const [info, setInfo] = useState([]);
  const [id, setId] = useState("1");
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/");
        const data = response.data;
        let help = [];
        for (const item in data) {
          help.push({ label: item, url: data[item] });
        }
        setOptions(help);
        setSelected(help[0].url);
      } catch (error) {
        setError(error);
      }
    };
    getData();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${selected}${id}`;
    const getData = async () => {
      try {
        const res = await axios.get(url);
        let data = res.data;

        let aux = [];
        for (const item in data) {
          let name = item.split("_");
          name = name.map((word) => {
            return (
              word[0].toUpperCase()+ word.slice(1)
            )
          });
          name = name.join(" ");
          console.log(name);
          aux.push({ label: name, info: data[item] })
        }
        setInfo(aux);
      } catch (error) {
        setError(error);
      }
    };
    getData();
    setId(1);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Search for:</label>
          <select
            id="topic"
            selected={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {options.map((item, idx) => {
              return (
                <option key={idx} value={item.url}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>id</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <div className="results">
        <h1>Results</h1>
        {
          info.map((item, idx) => {
            return (
              <div key={item.label + idx}>
                <h4>{item.label}:</h4> 
                <p>{item.info}</p>
              </div>
            )
        })
        }

        {
          // error handling
          error && <h3>{error.message}</h3>
        }
      </div>
    </>
  );
};

export default Home;
