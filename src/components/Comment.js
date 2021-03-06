import React from 'react';
import './Comment.css';


const Comment = (props) => {
//using a function component and react hooks to keep the form state seperate from the comment state
    const [formState,setFormState] = React.useState({
        author: "",
        comment: "",
        password: ""
    })


//Functions


    //this function handles the form entry
    const handleChange = (event) => {
        setFormState(formState => ({...formState, [event.target.name]:event.target.value}));
        event.persist();

    }

    //this function handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const createData = {
            restid: props.restid,
            author: formState.author,
            comment: formState.comment,
            password: formState.password
        }
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://savvyhotspotsapi.herokuapp.com/api/comments`, {
          body: JSON.stringify(createData),
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
                }
            });
        const json = await response.json;
        await console.log(json);
        props.get();

    }


//below a form to add comments

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input maxLength="30" type="text" name="author" placeholder="name" onChange={handleChange}/>
                <input maxLength="140" type="text" name="comment" placeholder="comment" onChange={handleChange}/>
                <input maxLength="8" type="text" name="password" placeholder="password" onChange={handleChange}/>
                <input type="submit" value="submit"/>
            </form>
        </div>

    )



}

export default Comment
