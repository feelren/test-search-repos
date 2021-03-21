import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from '../styles/dist/SearchField.module.css'
import { clearRepos, changeSearchText, setNoResultsFalse } from './../store/reducer';

function SearchField() {
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.root.searchText);
    let searchInput = React.createRef();

    const inputValueChangeHandler = () => {
        let text = searchInput.current.value;

        dispatch(changeSearchText(text))
        if (!text) {
            dispatch(clearRepos())
            dispatch(setNoResultsFalse())
        }
    }


    return (
        <div className={s.wrapper}>
            <input type="text" value={searchText} ref={searchInput} onChange={() => inputValueChangeHandler()} />
        </div>
    );
}

export default SearchField;