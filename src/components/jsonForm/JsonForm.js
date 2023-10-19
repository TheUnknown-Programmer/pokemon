import React, { useState } from 'react';
import styles from './JsonForm.module.css';

function JsonForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            });
            const json = await response.json();
            console.log(json);  // Response from the server
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email:</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className={styles.input} />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>

            
        </div>
    );
    
}

export default JsonForm;