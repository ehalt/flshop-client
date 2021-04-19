import React, { useEffect, useState } from 'react'
import './Manage.css';
const Manage = () => {
    const [flowersData, setFlowersData] = useState([]);

    useEffect(() => {
        // load data
        fetch('http://localhost:5000/flowersInfo')
        .then(res => res.json())
        .then(data => setFlowersData(data));
    }, []);

    // delete item form mongoDB
    const deleteItem = (id) => {
        fetch(`http://localhost:5000/deleteInfo/${id}`, {
            method:'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                const newData = flowersData.filter((item) => item._id !== id);
                setFlowersData(newData);
            }
        })
}

    return (
        <>
            <section className="manage-area">
           
                {
                    flowersData.length === 0 ? (
                        <h2 style={{textAlign:'center'}}>You have no product!</h2>
                    ):(
                        <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                       <tbody>
                           {
                               flowersData.map((item) => {
                                   return (
                                       <tr>
                                           <td>{item.name}</td>
                                           <td>${item.price}</td>
                                           <td><button className='delete-btn' onClick={() => deleteItem(item._id)} >Delete</button></td>
                                       </tr>
                                   )
                               })
                           }
                       </tbody>
                    </table>
                    )
                }

            </section>   
        </>
    )
}

export default Manage