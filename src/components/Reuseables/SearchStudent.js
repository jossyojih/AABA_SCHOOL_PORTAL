import React, { useState, useEffect } from 'react';
import { HOST_URL } from '../../config'
import { useHistory } from 'react-router-dom'

// import { useStateValue } from '../StateProvider';
// import { actionTypes } from '../../reducer';
import './Reuseables.css'
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';

function SearchStudent({ handleSearchFocus, handleSearchBlur }) {
    //   const [{user,showTopNav}, dispatch ] = useStateValue ()
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const [suggestions, setSuggestions] = useState([])
    const [search, setSearch] = useState('')
    const [showIcon, setShowIcon] = useState(true)

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);

    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    const fetchUsers = (query) => {

        const abortController = new AbortController()
        const signal = abortController.signal

        fetch(`${HOST_URL}/api/admin/search-students`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                query
            })
        })
            .then(res => res.json())
            .then(data => {
                setSuggestions(data.students)
            }).catch(err => {
                console.log(err)
            })
        return () => {
            abortController.abort()
        };

    }


    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.

    /************Take Note Of This Line of Code. It can break the search property */
    const getSuggestionValue = suggestion => `${suggestion.firstname} ${suggestion.middlename} ${suggestion.lastname}`;

    // Use your imagination to render suggestions.
    const renderSuggestion = suggestion => (
        <div className='suggestion_result'>

            <Link to={`/${user.role === "accountant" ? "accountportal" : "adminportal"}/studentprofile/${suggestion._id}`}>
                <img src={suggestion.photo} className='suggestion_result_image' alt='' />
                {suggestion.firstname} {suggestion.middlename} {suggestion.lastname}
            </Link>
        </div>
    );
    const onSuggestionsFetchRequested = ({ value }) => {

        fetchUsers(value)

    };

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        setSuggestions([])

    };

    const onChange = (event, { newValue }) => {
        setSearch(newValue)
    };

    const onfocus = () => {
        if (windowWidth < 420) {
            setShowIcon(false)
            handleSearchFocus()
        }
    }

    const onblur = () => {
        if (windowWidth < 420) {
            setShowIcon(true)
            handleSearchBlur()
        }
    }

    const inputProps = {
        placeholder: 'Search Students',
        value: search,
        onChange: onChange,
        onFocus: onfocus,
        onBlur: onblur


    };

    return (



        //  <form >
        <div className="form-group has-search">
            {showIcon && <span className="fa fa-search form-control-feedback"></span>}
            <form onSubmit={(e) => {
                e.preventDefault()
                fetchUsers(search)
            }}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <button type='submit' className='navbar_search_submit'>Search</button>
            </form>
            {/* <input type="text" className="form-control" placeholder="Search"/> */}
        </div>


        //  </form>



    )
}

export default SearchStudent;
