import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Dashboard = ({ token }) => {
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
            } catch (error) {
                console.log('Error fetching data', error);
            }
        };
        fetchData();
    }, [token]);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:4000/api/upload-csv', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded successfully');
            setFile(null);
        } catch (error) {
            alert('Failed to upload file');
        }
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <div className="csv-upload">
                <h3>Upload CSV File</h3>
                <input type="file" accept=".csv" onChange={ handleFileChange } />
                <button onClick={ handleFileUpload }>Upload</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((row, index) => (
                        <tr key={ index }>
                            <td>{ row.name }</td>
                            <td>{ row.age }</td>
                            <td>{ row.city }</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};


