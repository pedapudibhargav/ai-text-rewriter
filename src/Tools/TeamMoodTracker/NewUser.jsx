import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField, Button } from "@mui/material";

export default function NewUser() {
    const [name, setName] = useState("");

    useEffect(() => {
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setName(storedName);
      }
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem("name", name);
      console.log('user name saved:', name);
    };

    return (
        <>
            <Grid className="mood-test-container" container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Paper>
                    <h2>Let's get to know each other-{name}</h2>
                    <p>
                        Hey, there! What's your name so we can make your visit more enjoyable?
                    </p>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Enter your name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}
