import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Person = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [error, setError] = useState("");
  const [home, setHome] = useState("");
  

  useEffect(() => {
    const getData = async () => {
    try {
      if (isNaN(id)) throw new Error("Please input a valid number");
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        const data = response.data;
        let aux = [];
        
        for (const item in data) {
          let name = item.split("_").map(word => word[0].toUpperCase()+word.slice(1)).join(" ");
          aux.push({ label: name, info: data[item] });
        }
        console.log(aux)
        setInfo(aux);
      } catch (error) {
        setError(error.message);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      let url = info?.filter(item => item.label == "Homeworld");
      console.log(url[0].info);
      url = url[0].info;
      const response = await axios.get(url);
      setHome(response.data.name);
      navigate(`/${id}/${home}`);
    }
    getData();
  }, [info]);
  

  return (
    <div>
        { 
        error ? <h1>{error}</h1> 
        :
        <h1>People with ID: {id}</h1>
        }

        {
          info?.map((item, idx) => {
              return (
                <div key={item.label + idx} className={item.label == "Name" ? "name" : ""}>
                  <h4>{item.label}:</h4> 
                  <p>{!item.info ? "No data" : item.info}</p>
                </div>
              )
          })
        }

    </div>
  )
}

export default Person;