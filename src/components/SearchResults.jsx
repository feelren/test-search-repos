import { React, useEffect } from 'react';
import s from '../styles/dist/SearchResults.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getReposThunk } from '../store/reducer';

const SearchResults = () => {
    const isFetching = useSelector(state => state.root.isFetching);
    const noResults = useSelector((state) => state.root.noResults);
    const repos = useSelector((state) => state.root.repos);
    const searchText = useSelector((state) => state.root.searchText);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchText) dispatch(getReposThunk(searchText));
    }, [searchText, dispatch])

    return (
        <ul className={s.wrapper}>
            {isFetching && <div className={s.notification}>Загрузка списка..</div>}
            {noResults && !isFetching ? <div className={s.notification}>Нет результатов</div> : null}

            {
                repos.map(repo => {
                    return (

                        <li key={repo.id} className={s.item}>
                            <a href={repo.html_url} target='_blank' rel="noreferrer">{repo.name}</a>
                            <div className={s.row}>
                                <p>Stargazers_count: <span>{repo.stargazers_count}</span></p>
                                <p>Watchers_count: <span>{repo.watchers_count}</span></p>
                            </div>
                        </li>

                    )
                })
            }
        </ul >

    );
}

export default SearchResults;
